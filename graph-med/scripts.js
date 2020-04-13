Vue.component('line-chart', {
  extends: VueChartJs.Line,
  props: ['info'],
  data: function () {
    return {
      config: this.info,
      opitions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              type: 'linear',
              display: true,
              position: 'left'
            }
          ]
        }
      },
      renderData: {
        labels: [],
        datasets: [
          {
            label: 'Левый глаз',
            backgroundColor: '#f87979',
            data: [],
            borderColor: "green",
            backgroundColor: "green",
            borderWidth: 2,
            pointRadius: 0,
            fill: false,
            dataId: 'left',
          },
          {
            label: 'Правый глаз',
            backgroundColor: '#f87979',
            data: [],
            borderColor: "red",
            backgroundColor: "red",
            borderWidth: 2,
            pointRadius: 0,
            fill: false,
            dataId: 'right'
          },
        ]
      }
    }
  },
  methods: {
    xAxesGenerate() {
      let startAge = +this.config.age
      let endAge = this.config.sex === 'sex-1' ? 18 : 17
      let agesArr = []
      for (let i = startAge; i <= endAge; i++) {
        agesArr.push(i)
      }
      this.renderData.labels = agesArr
    },
    getNUMB_myopiaDegree(eyeSide) {
      let myopiaDegree = null;
      if (this.info.eye[eyeSide].myopia <= 3) {
        myopiaDegree = 0.1
      } else if (this.info.eye[eyeSide].myopia > 3) {
        myopiaDegree = 0.2
      }
      return myopiaDegree
    },
    NUMB_riskFactors() {
      let NUMB_riskFactors = null;
      if (this.info.risksFactors.length === 1) {
        NUMB_riskFactors = 0.1
      } else if (this.info.risksFactors.length >= 2) {
        NUMB_riskFactors = 0.22
      } else {
        NUMB_riskFactors = 0;
      }
      return NUMB_riskFactors
    },
    NUMB_controlMethods(eyeSide) {
      let myopiaDegree = null;
      let cMethod = this.info.controlMethods
      let numb_control = null
      if (this.info.eye[eyeSide].myopia <= 3) {
        myopiaDegree = 1
      } else if (this.info.eye[eyeSide].myopia > 3 && this.info.eye[eyeSide].myopia < 6.25) {
        myopiaDegree = 2
      } else if (this.info.eye[eyeSide].myopia >= 6.25) {
        myopiaDegree = 3
      }

      if (cMethod == 1 && myopiaDegree == 1) {
        numb_control = 0.2
      } else if (cMethod == 1 && myopiaDegree == 2) {
        numb_control = 0.3
      } else if (cMethod == 1 && myopiaDegree == 3) {
        numb_control = 0.3
      } else if (cMethod == 2 && myopiaDegree == 1) {
        numb_control = 0.15
      } else if (cMethod == 2 && myopiaDegree == 2) {
        numb_control = 0.11
      } else if (cMethod == 2 && myopiaDegree == 3) {
        numb_control = 0.111
      } else if (cMethod == 3) {
        numb_control = 0
      }

      return numb_control
    },
    getAnnualIncrNumb(eyeSide) {
      if (!this.info.eye[eyeSide].annualIncr) {
        let NUMB_myopiaDegree = this.getNUMB_myopiaDegree(eyeSide)
        let NUMB_riskFactors = this.NUMB_riskFactors()
        let NUMB_controlMethods = this.NUMB_controlMethods(eyeSide)
        this.info.eye[eyeSide].annualIncrNumb = (NUMB_myopiaDegree + NUMB_riskFactors - NUMB_controlMethods).toFixed(2)
        this.yAxesGenerateAnnualData(eyeSide)
      } else {
        this.yAxesGenerateAnnualData(eyeSide)
      }
      this.$emit('refractio-method', { eyeSide: eyeSide, annualIncrNumb: this.info.eye[eyeSide].annualIncrNumb})
    },
    yAxesGenerateAnnualData(eyeSide) {
      let y0 = +this.info.eye[eyeSide].eyeSize
      let arrOfSizes = [y0]

      for (let i = 1; i < this.renderData.labels.length; i++) {
        y0 += +this.info.eye[eyeSide].annualIncrNumb
        arrOfSizes.push(y0)
      }
      this.renderData.datasets.find(item => item.dataId === eyeSide).data = arrOfSizes
    }
  },
  watch: {
    info: {
      handler: function () {
        this.xAxesGenerate()
        this.info.eye.right.isTrue ? this.getAnnualIncrNumb('right') : false;
        this.info.eye.left.isTrue ? this.getAnnualIncrNumb('left') : false;
        this.renderChart(this.renderData, this.opitions)
      },
      deep: true
    },
  }
})




Vue.component('line-chart-refractio', {
  extends: VueChartJs.Line,
  props: ['info'],
  data: function () {
    return {
      config: this.info,
      opitions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              type: 'linear',
              display: true,
              position: 'left'
            }
          ]
        }
      },
      renderData: {
        labels: [],
        datasets: [
          {
            label: 'Левый глаз',
            backgroundColor: '#f87979',
            data: [],
            borderColor: "green",
            backgroundColor: "green",
            borderWidth: 2,
            pointRadius: 0,
            fill: false,
            dataId: 'left',
          },
          {
            label: 'Правый глаз',
            backgroundColor: '#f87979',
            data: [],
            borderColor: "red",
            backgroundColor: "red",
            borderWidth: 2,
            pointRadius: 0,
            fill: false,
            dataId: 'right'
          },
        ]
      }
    }
  },
  methods: {
    xAxesGenerate() {
      let startAge = +this.config.age
      let endAge = this.config.sex === 'sex-1' ? 18 : 17
      let agesArr = []
      for (let i = startAge; i <= endAge; i++) {
        agesArr.push(i)
      }
      this.renderData.labels = agesArr
    },
    yAxesGenerateAnnualData(eyeSide) {
      let currentRefractio = +this.info.eye[eyeSide].annualIncrNumb * 0.33 / 0.1
      let z0 = +this.info.eye[eyeSide].myopia
      let zArr = [z0]
      for (let i = 1; i < this.renderData.labels.length; i++) {
        z0 += +currentRefractio
        zArr.push(z0)
      }
      this.renderData.datasets.find(item => item.dataId === eyeSide).data = zArr
    }
  },
  watch: {
    info: {
      handler: function () {
        this.xAxesGenerate()
        this.info.eye.right.isTrue ? this.yAxesGenerateAnnualData('right') : false;
        this.info.eye.left.isTrue ? this.yAxesGenerateAnnualData('left') : false;
        
        this.renderChart(this.renderData, this.opitions)
      },
      deep: true
    },
  }
})



var vm = new Vue({
  el: '#calc-app',
  data () {
    return {
      info: {
        sex: '',
        age: 11,
        risksFactors: [],
        controlMethods: '',
        eye: {
          left: {
            isTrue: false,
            myopia: 0,
            eyeSize: 0,
            keratometries: 0,
            annualIncr: false,
            annualIncrNumb: ''
          },
          right: {
            isTrue: false,
            myopia: 0,
            eyeSize: 0,
            keratometries: 0,
            annualIncr: false,
            annualIncrNumb: ''
          },
        }
      }
    }
  },
  methods: {
    riskFactorsMethod (e) {
      if(e.checked) {
        this.info.risksFactors.push(e.value)
      } else {
        this.info.risksFactors.splice(this.info.risksFactors.findIndex(i => i ===e.value), 1)
      }
    },
    refractioMethod (obj) {
      this.info.eye[obj.eyeSide].annualIncrNumb = obj.annualIncrNumb
    },
    CHOOSING_sex(item) {
      this.info.sex = item
    },
    CHOOSING_riskFactors(item) {
      let isSelected = this.info.risksFactors.find(i => i === item) ? true : false
      if(isSelected) {
        this.info.risksFactors.splice(this.info.risksFactors.findIndex(i => i === item), 1)
      } else {
        this.info.risksFactors.push(item)
      }
    }
  },
  computed: {
    getYears() {
      let arr = []
      for (let i = this.info.age; i < (this.info.sex === 'sex-1' ? 18 : 17) + 1; i++) {
        arr.push(i)
      }
      return arr
    }
  },
  watch: {
    'info.age': function () {
      let ind = this.info.risksFactors.findIndex(i => i === '7')
      if(this.info.age <= 7) {
        this.info.risksFactors.push('7')
      } else if (this.info.age > 7 && ind >= 0) {
        this.info.risksFactors.splice(ind, 1)
      }
    }
  }
})