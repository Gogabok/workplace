Vue.component('line-chart', {
  extends: VueChartJs.Line,
  props: ['info'],
  data: function () {
    return {
      config: this.info,
      opitions: ''
    }
  },
  mounted() {
    this.renderChart({
      labels: [6, this.info.sex],
      datasets: [
        {
          label: 'Левый глаз',
          backgroundColor: '#f87979',
          data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
          borderColor: "rgba(57, 181, 74, 1)",
          backgroundColor: "rgba(57, 181, 74, 0.4)",
          borderWidth: 1,
          pointRadius: 0
        },
      ]
    }, { responsive: true, maintainAspectRatio: false })
  },
  watch: {
    info: {
     handler: function () {
        console.log(this.info)
        this.renderChart()
     }, 
     deep: true 
    }
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
            myopia: '',
            eyeSize: '',
            keratometries: '',
            annualIncr: false,
            annualIncrNumb: ''
          },
          right: {
            isTrue: false,
            myopia: '',
            eyeSize: '',
            keratometries: '',
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


