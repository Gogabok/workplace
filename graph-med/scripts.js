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
              position: 'left',
              id: 'y-axis-1'
            },
            {
              type: 'linear',
              display: true,
              position: 'right',
              id: 'y-axis-2',
              gridLines: {
                drawOnChartArea: false,
              },
            },
          ]
        }
      },
      renderData: {
        labels: [],
        datasets: [
          {
            label: 'Рефракция',
            backgroundColor: '#f87979',
            data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
            borderColor: "green",
            backgroundColor: "green",
            borderWidth: 1,
            pointRadius: 0,
            fill: false,
            yAxisID: 'y-axis-1'
          },
          {
            label: 'ПЗО',
            backgroundColor: '#f87979',
            data: [10, -20, 112, 69, 20, 30, 39, 80, 40, 20, 12, 61],
            borderColor: "red",
            backgroundColor: "red",
            borderWidth: 1,
            pointRadius: 0,
            fill: false,
            yAxisID: 'y-axis-2'
          },
        ]
      }
    }
  },
  mounted() {
    // this.renderChart({
    //   labels: [6, this.info.sex],
    //   datasets: [
    //     {
    //       label: 'Левый глаз',
    //       backgroundColor: '#f87979',
    //       data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
    //       borderColor: "rgba(57, 181, 74, 1)",
    //       backgroundColor: "rgba(57, 181, 74, 0.4)",
    //       borderWidth: 1,
    //       pointRadius: 0
    //     },
    //   ]
    // }, { responsive: true, maintainAspectRatio: false })
  },
  methods: {
    xAxesGenerate () {
      let startAge = +this.config.age
      let endAge = this.config.sex === 'sex-1' ? 18 : 17
      let agesArr = []
      for (let i = startAge; i <= endAge; i++) {
        agesArr.push(i)
      }
      this.renderData.labels = agesArr
    },
    yAxesGenerate() {
      // let y0 = this.eye.right.myopia
    }
  },
  watch: {
    info: {
     handler: function () {
        this.xAxesGenerate()
        this.yAxesGenerate()

        console.log(this.renderData)
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
        age: '',
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
  }
})



// А - Пол ребенка 
// B - Возраст ребенка
// С - Возраст выявления
// D - Факторы риска (D1 - D7)
// K - способ коррекции (K1 - K3)
// Е - какой глаз (Е1 - правый; Е2 - левый)
// F - Степень близорукости
// G - аксиальный размер глаза
// H - показатель кератометрии
// L - известин ли прирост аксиаольного размера глаза?
// M - годовой прирост аксиального размера глаза


// Измерение рефракции, если известен ПЗО производится по формуле 
// R1 = M1 * 0, 33 / 0, 1

// Если нет, то при F1 ---- R1 += 0,1мм, а при F2/F3 ---- R1 += 0,2мм    /год

// - Коррекция (пункт 2.3)

// 