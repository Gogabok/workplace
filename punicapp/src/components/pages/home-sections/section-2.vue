<template>
  <section class="section section-2">
    <div class="container-custom">
      <p class="title">Наши услуги</p>
      <p class="subtitle">Разработка мобильных приложений и веб-проектов для бизнеса и стартапов</p>
      <div class="icons">
        <div :class="'icon-' + icon" class="icon" v-for="icon of 25" :key="icon">
          <img
            ondragstart="return false"
            :src="require(`../../../assets/images/section-2/icon-${icon}.svg`)"
            alt
          />
        </div>
      </div>
      <div class="cards-services">
        <div @click="open(1)" :class="cards[1].isOpen ? 'openedTop' : ''" class="cards-services-item cards-services-item-1">
          <div v-show="cards[1].isOpen" class="opened">
            <p class="title">Разработка мобильных приложений <img ondragstart="return false" src="../../../assets/images/section-2/arrow-mobile.svg" alt=""></p>
            <p class="subtitle">iOS, Android</p>
            <transition name="zoom-out" mode="out-in">
              <div class="text" v-show="cards[1].isOpen || document.body.clientWidth < 969">
                <p class="desc">
                  Мы создаём мобильные приложения, которые помогают вам зарабатывать. Уникальный дизайн, понятный функционал, удобный интерфейс привлекают пользователей и увеличивают число ваших клиентов.
                </p>
                <p class="desc">
                  Качественное мобильное приложение укрепляет имидж вашей компании и лояльность клиентов, делает бизнес более узнаваемым и положительно влияет на увеличение прибыли.  
                </p>
                <p class="link">Читать далее...</p>
              </div>
            </transition>
            <div class="desktop">
              <img class="icon" ondragstart="return false" src="../../../assets/images/section-2/services-1-icon-big.svg" alt="">
              <img ondragstart="return false" class="card-decor-1" src="../../../assets/images/section-2/card-decor-2.svg" alt="">
              <img ondragstart="return false" class="card-decor-2" src="../../../assets/images/section-2/card-decor-2.svg" alt="">
              <img ondragstart="return false" class="card-decor-3" src="../../../assets/images/section-2/card-decor-3.svg" alt="">
              <img ondragstart="return false" class="card-decor-4" src="../../../assets/images/section-2/card-decor-3.svg" alt="">
            </div>
            <div class="mobile">
              <img ondragstart="return false" class="card-mobile-decor-1" src="../../../assets/images/section-2/sec-2-mobile-icons/1.png" alt="">
              <img ondragstart="return false" class="card-mobile-decor-2" src="../../../assets/images/section-2/sec-2-mobile-icons/2.png" alt="">
              <img ondragstart="return false" class="card-mobile-decor-3" src="../../../assets/images/section-2/sec-2-mobile-icons/3.png" alt="">
            </div>
          </div>
          <div v-show="!cards[1].isOpen" class="closed">
            <p class="title">Разработка мобильных приложений <img ondragstart="return false" src="../../../assets/images/section-2/arrow-mobile.svg" alt=""></p>
            <p class="subtitle">iOS, Android</p>
            <div class="desktop">
              <img class="icon" ondragstart="return false" src="../../../assets/images/section-2/services-1-icon-small.svg" alt="">
              <img ondragstart="return false" class="card-decor-1" src="../../../assets/images/section-2/card-decor-1.svg" alt="">
              <img ondragstart="return false" class="card-decor-2" src="../../../assets/images/section-2/card-decor-2.svg" alt="">
              <img ondragstart="return false" class="card-decor-3" src="../../../assets/images/section-2/card-decor-3.svg" alt="">
            </div>
            <div class="mobile">
              <img ondragstart="return false" class="card-mobile-decor-1" src="../../../assets/images/section-2/sec-1-mobile-icons/1.png" alt="">
              <img ondragstart="return false" class="card-mobile-decor-2" src="../../../assets/images/section-2/sec-1-mobile-icons/2.png" alt="">
              <img ondragstart="return false" class="card-mobile-decor-3" src="../../../assets/images/section-2/sec-1-mobile-icons/3.png" alt="">
            </div>
          </div>
        </div>






        <div @click="open(2)" :class="cards[2].isOpen ? 'openedTop' : ''" class="cards-services-item cards-services-item-1">
          <div v-show="cards[2].isOpen" class="opened">
            <p class="title">Web разработка <img ondragstart="return false" src="../../../assets/images/section-2/arrow-mobile.svg" alt=""></p>
            <p class="subtitle">Frontend, Backend</p>
            <transition name="zoom-out" mode="out-in">
              <div class="text" v-show="cards[2].isOpen">
                <p class="desc">
                  Разрабатываем сайты персонально под ваш бизнес. Анализируем рынок и целевую аудиторию в соответствии с задачами, которые вы хотите решить с помощью веб-сайта.
                </p>
                <p class="desc">
                  Создаём web-сервисы для любого направления бизнеса: продажи, коммуникации, управление, серверную часть и API, гибкие административные инструменты для управления приложениями и сбора статистики.
                </p>
                <p class="desc">
                  Вы получаете продукт, привлекательный для пользователей и функциональный для вас.
                </p>
                <p class="link">Читать далее...</p>
              </div>
            </transition>
            <div class="desktop">
              <img class="icon" ondragstart="return false" src="../../../assets/images/section-2/services-2-icon-big.svg" alt="">
              <img ondragstart="return false" class="card-decor-1" src="../../../assets/images/section-2/card-decor-2.svg" alt="">
              <img ondragstart="return false" class="card-decor-2" src="../../../assets/images/section-2/card-decor-2.svg" alt="">
              <img ondragstart="return false" class="card-decor-3" src="../../../assets/images/section-2/card-decor-3.svg" alt="">
              <img ondragstart="return false" class="card-decor-4" src="../../../assets/images/section-2/card-decor-3.svg" alt="">
            </div>
            <div class="mobile">
              <img ondragstart="return false" class="card-mobile-decor-1" src="../../../assets/images/section-2/sec-2-mobile-icons/1.png" alt="">
              <img ondragstart="return false" class="card-mobile-decor-2" src="../../../assets/images/section-2/sec-2-mobile-icons/2.png" alt="">
              <img ondragstart="return false" class="card-mobile-decor-3" src="../../../assets/images/section-2/sec-2-mobile-icons/3.png" alt="">
            </div>
          </div>
          <div v-show="!cards[2].isOpen" class="closed">
            <p class="title">Web разработка <img ondragstart="return false" src="../../../assets/images/section-2/arrow-mobile.svg" alt=""></p>
            <p class="subtitle">Frontend, Backend</p>
            <div class="desktop">
              <img class="icon" ondragstart="return false" src="../../../assets/images/section-2/services-2-icon-small.svg" alt="">
              <img ondragstart="return false" class="card-decor-1" src="../../../assets/images/section-2/card-decor-1.svg" alt="">
              <img ondragstart="return false" class="card-decor-2" src="../../../assets/images/section-2/card-decor-2.svg" alt="">
              <img ondragstart="return false" class="card-decor-3" src="../../../assets/images/section-2/card-decor-3.svg" alt="">
            </div>
            <div class="mobile">
              <img ondragstart="return false" class="card-mobile-decor-1" src="../../../assets/images/section-2/sec-1-mobile-icons/1.png" alt="">
              <img ondragstart="return false" class="card-mobile-decor-2" src="../../../assets/images/section-2/sec-1-mobile-icons/2.png" alt="">
              <img ondragstart="return false" class="card-mobile-decor-3" src="../../../assets/images/section-2/sec-1-mobile-icons/3.png" alt="">
            </div>
          </div>
        </div>
























        <div @click="open(3)" :class="cards[3].isOpen ? 'openedTop' : ''" class="cards-services-item cards-services-item-1">
          <div v-show="cards[3].isOpen" class="opened">
            <p class="title">Проектирование мобильного приложения <img ondragstart="return false" src="../../../assets/images/section-2/arrow-mobile.svg" alt=""></p>
            <p class="subtitle">Дизайн, ТЗ</p>
            <transition name="zoom-out" mode="out-in">
              <div class="text" v-show="cards[3].isOpen">
                <p class="desc">
                  Мы создаём мобильные приложения, которые помогают вам зарабатывать. Уникальный дизайн, понятный функционал, удобный интерфейс привлекают пользователей и увеличивают число ваших клиентов.
                </p>
                <p class="desc">
                  Качественное мобильное приложение укрепляет имидж вашей компании и лояльность клиентов, делает бизнес более узнаваемым и положительно влияет на увеличение прибыли.  
                </p>
                <p class="link">Читать далее...</p>
              </div>
            </transition>
            <div class="desktop">
              <img class="icon" ondragstart="return false" src="../../../assets/images/section-2/services-3-icon-big.svg" alt="">
              <img ondragstart="return false" class="card-decor-1" src="../../../assets/images/section-2/card-decor-2.svg" alt="">
              <img ondragstart="return false" class="card-decor-2" src="../../../assets/images/section-2/card-decor-2.svg" alt="">
              <img ondragstart="return false" class="card-decor-3" src="../../../assets/images/section-2/card-decor-3.svg" alt="">
              <img ondragstart="return false" class="card-decor-4" src="../../../assets/images/section-2/card-decor-3.svg" alt="">
            </div>
            <div class="mobile">
              <img ondragstart="return false" class="card-mobile-decor-1" src="../../../assets/images/section-2/sec-2-mobile-icons/1.png" alt="">
              <img ondragstart="return false" class="card-mobile-decor-2" src="../../../assets/images/section-2/sec-2-mobile-icons/2.png" alt="">
              <img ondragstart="return false" class="card-mobile-decor-3" src="../../../assets/images/section-2/sec-2-mobile-icons/3.png" alt="">
            </div>
          </div>
          <div v-show="!cards[3].isOpen" class="closed">
            <p class="title">Проектирование мобильного приложения <img ondragstart="return false" src="../../../assets/images/section-2/arrow-mobile.svg" alt=""></p>
            <p class="subtitle">Дизайн, ТЗ</p>
            <div class="desktop">
              <img class="icon" ondragstart="return false" src="../../../assets/images/section-2/services-3-icon-small.svg" alt="">
              <img ondragstart="return false" class="card-decor-1" src="../../../assets/images/section-2/card-decor-1.svg" alt="">
              <img ondragstart="return false" class="card-decor-2" src="../../../assets/images/section-2/card-decor-2.svg" alt="">
              <img ondragstart="return false" class="card-decor-3" src="../../../assets/images/section-2/card-decor-3.svg" alt="">
            </div>
            <div class="mobile">
              <img ondragstart="return false" class="card-mobile-decor-1" src="../../../assets/images/section-2/sec-1-mobile-icons/1.png" alt="">
              <img ondragstart="return false" class="card-mobile-decor-2" src="../../../assets/images/section-2/sec-1-mobile-icons/2.png" alt="">
              <img ondragstart="return false" class="card-mobile-decor-3" src="../../../assets/images/section-2/sec-1-mobile-icons/3.png" alt="">
            </div>
          </div>
        </div>
      </div>
      <div class="howMuch">
        <div class="info">
          <p class="title">Сколько стоит разработка?</p>
          <div class="calculator">
            <div class="buttons">
              <input @input="inputValue($event.target)" class="value" :value="value">
              <div class="buttons-row">
                <div @click="calculate('num', '7')" class="btn num">7</div>
                <div @click="calculate('num', '8')" class="btn num">8</div>
                <div @click="calculate('num', '9')" class="btn num">9</div>
                <div @click="calculate('method', '*')" class="btn method">×</div>
              </div>
              <div class="buttons-row">
                <div @click="calculate('num', '4')" class="btn num">4</div>
                <div @click="calculate('num', '5')" class="btn num">5</div>
                <div @click="calculate('num', '6')" class="btn num">6</div>
                <div @click="calculate('method', '-')" class="btn method">-</div>
              </div>
              <div class="buttons-row">
                <div @click="calculate('num', '1')" class="btn num">1</div>
                <div @click="calculate('num', '2')" class="btn num">2</div>
                <div @click="calculate('num', '3')" class="btn num">3</div>
                <div @click="calculate('method', '+')" class="btn method">+</div>
              </div>
              <div class="buttons-row buttons-row-last">
                <div @click="calculate('num', '0')" class="btn btn-last-1 num">0</div>
                <div @click="calculate('num', '.')" class="btn btn-last-2 num">.</div>
                <div @click="calculate('method', '=')" class="btn btn-last-3 equal"> = </div>
              </div>
            </div>
          </div>
          <router-link tag="button" to="/calculator" class="calculate">Рассчитать стоимость</router-link>
        </div>
      </div>
    </div>
    
    <img ondragstart="return false" class="bg-1" src="../../../assets/images/section-2/calculatorBackground.png" alt="">
    <img ondragstart="return false" class="bg-2" src="../../../assets/images/section-2/calculatorDecor.png" alt="">
    <img ondragstart="return false" class="bg-3" src="../../../assets/images/section-2/bg-icon-1.svg" alt="">
    <img ondragstart="return false" class="bg-4" src="../../../assets/images/section-2/bg-icon-2.png" alt="">
    
  </section>
</template>

<script>
export default {
  name: "Section-2",
  data: () => ({
    values: [''],
    valueHistory: '',
    cards: {
      1: {
        isOpen: false
      },
      2: {
        isOpen: true
      },
      3: {
        isOpen: false
      },
    }
  }),
  computed: {
    value() {
      return this.values.join(' ')
    }
  },
  methods: {
    open(item) {
      let isOpen = this.cards[item].isOpen
      this.cards[item].isOpen = true
      setTimeout(() => {
        for(let i = 0; i < Object.keys(this.cards).length; i++) {
          if(Object.keys(this.cards)[i] != item) {
            this.cards[Object.keys(this.cards)[i]].isOpen = false
          }
        }
      }, 1);
    },
    calculate (type, value) {
      let previusValue = this.values[this.values.length - 1]
      if(type === 'num') {
        if(Number(previusValue)) {
          this.values.splice([this.values.length - 1], 1)
          this.valueHistory = previusValue + value.toString()
        } else {
          this.valueHistory = value.toString()
        }
        this.values.push(this.valueHistory)
      } else if (type === 'method') {
        if(value !== '=') {
          if(Number(this.values[this.values.length - 1])) {
            this.values.push(value)
          } else {
            this.values.splice([this.values.length - 1], 1)
            this.values.push(value)
          }
        } else {
          // this.values = []
          // let calculatedValue = ''
          // console.log(typeof *)
          let arr = []
          let val = eval(this.value)
          arr.push(val)
          this.values = arr
          // setTimeout(() => {
          //   this.values.push(val)
          // }, 100);
        }
      }
    },
    inputValue(e) {
      let str = e.value.toString()
      this.values = str.split(' ')
    }
  }
};
</script>
