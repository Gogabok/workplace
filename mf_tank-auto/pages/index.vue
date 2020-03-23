<template lang="pug">
  main.main
    section.hero.hero--home(style="background-image: url(/images/hero-home.jpg)")
      basket-price
      .container
        .hero__inner
          h1.hero__title Интернет магазин
            br
            | автозапчастей
            br
            | в Казани
          form.hero__search
            .form__group
              .form__group-input
                input(type="text" name="hero-search" placeholder="Поиск по артикулу или названию товара")
            button.btn.btn--upper.hero__search-btn Найти
    section.choose
      .container
        .choose__inner
          .choose__top
            p.choose__title Начните поиск с выбора года выпуска или с марки автомобиля
            p.choose__subtitle Выбор автомобиля позволяет отобразить только те запчасти, которые подходят к вашему автомобилю
          .choose__tabs
            .choose__tab.choose__tab--manufacturer(:class="selectedTabTop === 'manufacturer' ? 'active' : ''")
              .choose__tab-btn(@click="() => {selectedTabTop !== '' ? selectedTabTop = '' : selectedTabTop = 'manufacturer'}")
                span Марка
                i.choose__tab-arrow
              .choose__tab-body.scrollbar-outer.select-scrollbar-mobile.top-tabs
                .top-tabs-wrapper
                  .choose__tab-car-wrapper-column(v-for="(pass_key, pass_key_index) in Object.keys(groupedPassengers)")
                    a(href="#" @click="formattedModels(passenger, $event)" v-for="(passenger, pass_index) in groupedPassengers[pass_key]" :key="passenger.id" :class="pass_key_index % 2 === 0 && pass_index === 0 ? 'choose__tab-letter choose__tab-letter--odd' : (pass_key_index % 2 !== 0 && pass_index === 0 ? 'choose__tab-letter choose__tab-letter--even' : '')")
                      template(v-if="pass_index === 0")
                        i {{pass_key.toUpperCase()}}
                        span {{passenger.description.replace(' ', '&nbsp;')}}
                      template(v-if="pass_index !== 0") {{passenger.description}}
            .choose__tab.choose__tab--year(:class="selectedTabTop === 'model' ? 'active' : ''")
              .choose__tab-btn(@click="() => {selectedTabTop !== '' ? selectedTabTop = '' : selectedTabTop = 'model'}" :class="selectedManufacturer ? '' : 'hidden'")
                span Модель
                i.choose__tab-arrow
              .choose__tab-body.scrollbar-outer.select-scrollbar-mobile.top-tabs.models
                .top-tabs-wrapper.models
                  a(@click="formattedModifications(model, $event)" href="#" v-for="model in modelsForManufacturer" :key="model.description") {{model.description}}
            .choose__tab.choose__tab--model(:class="selectedTabTop === 'modifications' ? 'active' : ''")
              .choose__tab-btn(@click="() => {selectedTabTop !== '' ? selectedTabTop = '' : selectedTabTop = 'modifications'}" :class="selectedModel ? '' : 'hidden'")
                span Модификация
                i.choose__tab-arrow
              .choose__tab-body.scrollbar-outer.select-scrollbar-mobile.top-tabs.models
                .top-tabs-wrapper.models
                  a(href="#" @click="routeToGarage(modification)" v-for="modification in modificationsForModel" :key="modification.description") {{modification.fulldescription}}
    section.type
      .container
        .row.justify-content-center
          .col-lg-10
            .type__inner
              .type__tabs.tabs
                .type__tabs-top.tabs__top
                  .type__tabs-button.tabs__btn.active(data-target="#car") Легковой автомобиль
                  .type__tabs-button.tabs__btn(data-target="#truck") Грузовой автомобиль
                .type__tabs-content.tabs__content
                  .type__tabs-body.tabs__body#car.active
                    .choose__tab.choose__tab--manufacturer.light
                      .choose__tab-body.scrollbar-outer.select-scrollbar-mobile.light-auto
                        .choose__tab-car-wrapper-column(v-for="(pass_key, pass_key_index) in Object.keys(groupedPassengers)")
                          a(href="#" @click="routeSearchAuto(passenger, $event)" v-for="(passenger, pass_index) in groupedPassengers[pass_key]" :key="passenger.id" :class="pass_key_index % 2 === 0 && pass_index === 0 ? 'choose__tab-letter choose__tab-letter--odd' : (pass_key_index % 2 !== 0 && pass_index === 0 ? 'choose__tab-letter choose__tab-letter--even' : '')")
                            template(v-if="pass_index === 0")
                              i {{pass_key.toUpperCase()}}
                              span {{passenger.description.replace(' ', '&nbsp;')}}
                            template(v-if="pass_index !== 0") {{passenger.description}}

                  .type__tabs-body.tabs__body#truck
                    .choose__tab.choose__tab--manufacturer
                      .choose__tab-body.scrollbar-outer.select-scrollbar-mobile
                        .choose__tab-col

              a(href="#").btn.type__btn Показать все автомобили
    section.popular
      .container
        .popular__inner
          p.popular__title Популярные группы запчастей
          .popular__category
            .popular__category-item(v-for="(category, cat_index) in shuffle(formattedPartsCategories).slice(0, 8)" :key="category.id")
              i.popular__category-icon
                img(src="/images/engine.png" alt="alt")
              p.popular__category-title {{category.parent.description}}
              .popular__category-links
                nuxt-link(:to="'/catalog/' + child.passangercarid + '/section/' + child.number" v-for="child in category.children" :key="child.id")
                  span {{child.description}}

    section.promotions
      .container
        .promotions__inner
          .promotions__item(style="background-image: url('/images/promotions-1.jpg')")
            p.promotions__item-title Lamp & Lights
              span MEGA SALE
            p.promotions__item-price from
              span  500$
            a(href="#").btn.promotions__item-btn Купить
          .promotions__item(style="background-image: url('/images/promotions-2.jpg')")
            p.promotions__item-title Lamp & Lights
              span MEGA SALE
            p.promotions__item-price from
              span  500$
            a(href="#").btn.promotions__item-btn Купить
          .promotions__item(style="background-image: url('/images/promotions-3.jpg')")
            p.promotions__item-title Lamp & Lights
              span MEGA SALE
            p.promotions__item-price from
              span  500$
            a(href="#").btn.promotions__item-btn Купить
          .promotions__item(style="background-image: url('/images/promotions-4.jpg')")
            p.promotions__item-title Lamp & Lights
              span MEGA SALE
            p.promotions__item-price from
              span  500$
            a(href="#").btn.promotions__item-btn Купить

    section.about
      .container
        .about__text
          p Звоните и заказывайте автозапчасти по телефону: +7 (495) 266-69-03. Внимание! Для точного подбора запчастей обращайтесь к нашим менеджерам и помните, что радость из-за низкой цены длится гораздо меньше, чем горе из-за низкого качества.
            br
            | БиБи-Партс.ру – онлайн гипермаркет автозапчастей, предлагает Вам широкий ассортимент оригинальных и неоригинальных автозапчастей для иномарок всех марок. Независимо от того, нужны ли детали для внепланового ремонта или регламентных работ по техническому осмотру, в нашем интернет магазине вы найдете основной ассортимент из наличия, а менее ходовые узлы автомобиля под заказ.
          p Мы предоставляем первоклассный клиентский сервис в обслуживании и соблюдаем сроки поставки. Запчасти из наличия отгружаются текущим днем или следующим. Конкурентные цены делают нас одним из ведущих продавцов автозапчастей на рынке. Обширный и удобный онлайн каталог запчастей, позволяет оперативно выбрать детали на Ваш автомобиль. Наша команда специалистов всегда на связи с Вами, с использованием ВИН кода проконсультируют по применимости запчастей, о возможности использования аналогов, ответят на все вопросы и помогут вам оформить заказ.
          p Среди других преимуществ, предлагаемых bb-parts.ru, вы можете также отметить высокое качество деталей. В общем ассортименте запчастей представлено более 300 производителей из стран Германии, Италии, Японии, Китая, США и России. Качество предлагаемых нами автозапчастей подтверждено сертификатами производителей, дилерскими документами или бланками соответствия.
          .about__img(style="background-image: url('/images/about-img.jpg')")
          .about__bg(style="background-image: url('/images/about-text.jpg')")


</template>

<script>
import api from '~/assets/js/api.js'
import Loader from '~/components/Loader.vue'
import BasketPrice from '~/components/BasketPrice'

export default {
  head: {
    title: 'Интернет-магазин автозапчастей в Казани - ТЕЛЕФОНПОМЕНЯТЬ'
  },
  components: {
    Loader,
    BasketPrice
  },
  async fetch ({store, params}) {
    let passengers = await api.getPassengers();
    store.commit('setPassengers', passengers);
    let partsCategories = await api.getPartsCategories();
    store.commit('setPartsCategories', partsCategories);
  },
  data() {
    return {
      selectedTabTop: 'manufacturer',
      selectedManufacturer: null,
      selectedModel: null,
      selectedModifications: null,
      modelsForManufacturer: [],
      modificationsForModel: [],
      loading: false
    }
  },
  mounted() {

  },
  computed: {
    groupedPassengers() {
      const result = {};
      const all_passengers = [...this.$store.getters.getPassengers];
      all_passengers.forEach((passenger, index) => {
        if(!result[passenger.matchcode[0]]) {
          result[passenger.matchcode[0]] = [];
          passenger.index = index;
          result[passenger.matchcode[0]].push(passenger)
        } else {
          passenger.index = index;
          result[passenger.matchcode[0]].push(passenger);
        }
      });
      let items = [];
      this.$router.options.routes.forEach(route => {
        items.push({
            name: route.name,
            path: route.path
        })
      });
      return result;
    },
    formattedPartsCategories() {
      const result = [...this.$store.getters.getPartsCategories];
      return result;
    },
  },
  methods: {
    shuffle(a) {
      let j, x, i;
      for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
      }
      return a;
    },
    formattedModels(manufacturer, event) {
      event.preventDefault();
      this.selectedManufacturer = manufacturer;
      this.$store.commit('setSelectedManufacturer', manufacturer);
      api.getModels(manufacturer.description)
        .then(response => {
          this.modelsForManufacturer = [...response];
          this.selectedTabTop = 'model'
        })
        .catch(error => {
          console.log('error: ', error)
        })
    },
    formattedModifications(model, event) {
      event.preventDefault()
      this.selectedModel = model
      this.$store.commit('setSelectedModel', model);
      api.getModifications(this.selectedManufacturer.description, model.description)
        .then(response => {
          this.modificationsForModel = [...response];
          this.selectedTabTop = 'modifications'
        })
        .catch(error => {
          console.log('error: ', error)
        })
    },
    routeToGarage(selectedModification) {
      this.selectedModification = selectedModification;
      this.$store.commit('setSelectedModification', selectedModification);

      localStorage.setItem(this.selectedManufacturer.description, JSON.stringify(this.selectedManufacturer))
      localStorage.setItem(this.selectedModel.description, JSON.stringify(this.selectedModel))
      localStorage.setItem(this.selectedModification.fulldescription, JSON.stringify(this.selectedModification))

      this.$router.push(`${this.selectedManufacturer.description.replace('/', '%2F')}/${this.selectedModel.description.replace('/', '%2F')}/${this.selectedModification.fulldescription.replace('/', '%2F')}`)
    },
    routeSearchAuto(manufacturer, event) {
      event.preventDefault();
      localStorage.setItem(manufacturer.description, JSON.stringify(manufacturer))
      this.$store.commit('setSelectedManufacturer', manufacturer);
      let pageParams = manufacturer.description.replace('/', '%2F')
      this.$router.push(`${pageParams}`)
    }
  }
}
</script>

<style lang="scss">
  @media screen and (max-width: 1440px) {
    .choose__tab-body {
      max-width: 950px;
      min-width: 950px!important;
    }
    .top-tabs-wrapper {
      min-width: unset;
      min-height: 2000px!important;
    }
    .choose__tab--manufacturer.light {
      overflow-x: hidden;
    }
  }
  @media screen and (max-width: 1024px) {
    .choose__tab--manufacturer.light {
      overflow-x: hidden;
      .choose__tab-body.light-auto {
        min-width: 770px!important;
      }
    }
    .choose__tab-body {
      max-width: 750px!important;
      min-width: 750px!important;
      overflow-x: hidden;

    }
    &.choose__tab--year {
      .choose__tab-body {
        max-width: 700px!important;
        min-width: 700px!important;
      }
    }
    &.choose__tab--model {
      .choose__tab-body {
        max-width: 650px!important;
        min-width: 650px!important;
      }
    }
    .top-tabs-wrapper {
      min-width: 800px!important;
      min-height: 2000px!important;
    }
  }
  @media screen and (max-width: 768px) {
    .choose__tab--manufacturer.light {
      overflow-x: hidden;
      overflow-y: unset;
      .choose__tab-body.light-auto {
        overflow-y: visible;
        min-width: 100%!important;
        min-height: 5600px!important;
      }
      .choose__tab-letter {
        span {
          padding-left: 33px!important;
        }
      }
    }
    .choose__tab-body {
      max-width: 600px!important;
      min-width: 600px!important;
      overflow-x: hidden;
      .top-tabs-wrapper {
        min-width: 600px!important;
        min-height: 2000px!important;
      }
    }
    &.choose__tab--year {
      .choose__tab-body {
        max-width: 500px!important;
        min-width: 500px!important;
      }
    }
    &.choose__tab--model {
      .choose__tab-body {
        max-width: 450px!important;
        min-width: 450px!important;
      }
    }
  }
  @media screen and (max-width: 425px) {
    .choose__tab--manufacturer.light {
      overflow-x: hidden;
      .choose__tab-body.light-auto {
        min-width: 395px!important;
        overflow-y: hidden;
        min-height: 5600px!important;
      }
      .choose__tab-letter {
        span {
          padding-left: 33px!important;
        }
      }
    }
    .choose__tab-body {
      max-width: 300px!important;
      min-width: 300px!important;
      overflow-x: hidden;
      .top-tabs-wrapper {
        min-width: 300px!important;
        min-height: 2000px!important;
      }
      .choose__tab-letter {
        span {
          padding-left: 33px!important;
        }
      }
    }
    &.choose__tab--year {
      .choose__tab-body {
        padding-left: 0!important;
        left: -100px;
        max-width: 300px!important;
        min-width: 300px!important;
        .top-tabs-wrapper {
          min-width: 300px!important;
          min-height: 300px!important;
          a {
            padding-left: 0!important;
          }
        }
      }
    }
    &.choose__tab--model {
      .choose__tab-body {
        left: 0px;
        padding-left: 0!important;
        max-width: 300px!important;
        min-width: 300px!important;
      }
      .top-tabs-wrapper {
        min-width: 300px!important;
        min-height: 300px!important;
      }
    }
  }
</style>

