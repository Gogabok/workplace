<template lang="pug">
  main.main
    loader(v-if="loading")
    section.hero.hero--delivery(style="background-image: url(/images/hero-delivery.jpg)")
      basket-price
      .container
        .hero__inner
          h1.hero__title Способ доставки
          form.hero__search
            .form__group
              .form__group-input
                input(type="text" name="hero-search" placeholder="Поиск по артикулу или названию товара")
                span.form__group-message Поле должно быть заполнено
            button.btn.btn--upper.hero__search-btn Найти
    section.inner.inner--flex.inner--delivery
      .container
        .inner__content
          aside.sidebar
            .sidebar__item
              .sidebar__item-head
                .sidebar__item-head-title
                  i
                    img(src="/images/info.png" alt="alt")
                  span Информация
                button.sidebar__item-head-burger
                  img(src="/images/burger.png" alt="alt")
              ul.sidebar__item-list
                li
                  nuxt-link(to="/delivery")
                    i
                      img(src="/images/list.png" alt="alt")
                    span Доставка
                li
                  nuxt-link(to="/payment")
                    i
                      img(src="/images/list.png" alt="alt")
                    span Оплата
                li
                  nuxt-link(to="/contact")
                    i
                      img(src="/images/list.png" alt="alt")
                    span Контакты

          .inner__wrap
            .inner__top
              h1.inner__title Способ доставки
              ul.breadcrumbs
                li
                  nuxt-link(to="/") Главная
                li
                  a() Способ доставки
            .delivery__content.inner--border
              .delivery__content-top
                p.delivery__content-title Доставка заказа
                .delivery__content-text
                  p В городах, где есть представительство — Вы можете получить заказ непосредственно в офисе представительства в вашем городе. Или, в случае доступности курьерской доставки, получить заказ курьером.
              .delivery__items
                .delivery__item
                  .delivery__item-icon
                    p.delivery__item-title Самовывоз
                    i
                      img(src="/images/bike.png" alt="alt")
                  .delivery__item-info
                    .delivery__item-text
                      p Этот способ следует выбирать, если Вы сможете забрать заказ самостоятельно или через доверенное лицо в офисе регистрации. Шаблон доверенности
                .delivery__item
                  .delivery__item-icon
                    p.delivery__item-title Курьер
                    i
                      img(src="/images/courier.png" alt="alt")
                  .delivery__item-info
                    .delivery__item-text
                      p Доставка курьером есть не во всех регионах. Для уточнения возможности доставки курьером обращайтесь, пожалуйста, к Вашему персональному менеджеру
                .delivery__item
                  .delivery__item-icon
                    p.delivery__item-title Транспортная компания
                    i
                      img(src="/images/delivery.png" alt="alt")
                  .delivery__item-info
                    .delivery__item-text
                      p Этот способ может быть выбран если в вашем регионе пока не открыто представительство и вы работаете напрямую с офисом в Москве. При этом способе доставки заказ отправляется авиа-, авто- или железнодорожным транспортом, в зависимости от того, какая схема доставки в Ваш регион принята на данный момент.
                .delivery__item
                  .delivery__item-icon
                    p.delivery__item-title Почта России
                    i
                      img(src="/images/rus-post.png" alt="alt")
                  .delivery__item-info
                    .delivery__item-text
                      p Отправка груза будет произведена строго “Почтой России”. По тарифам соответствующим внутренним затратам компании + тарифы почты. Существуют ограничения по товарам отправляемым “Почтой России”, ознакомиться с ними вы сможете на сайте russianpost.ru. При невозможности отправки груза система не посчитает тариф. Для отслеживания вашего отправления используйте сайт "Почта России" и номер вашего отправления из оповещений.
                .delivery__item
                  .delivery__item-icon
                    p.delivery__item-title DHL
                    i
                      img(src="/images/dhl.png" alt="alt")
                  .delivery__item-info
                    .delivery__item-text
                      p В некоторые регионы России доставка может быть осуществлена транспортной компанией DHL. Для уточнения пожалуйста обращайтесь к вашему менеджеру.



</template>

<script>
  import Loader from '~/components/Loader.vue'
  import BasketPrice from '~/components/BasketPrice'

  export default {
    name: 'Delivery',
    components: {
        Loader,
        BasketPrice
    },
    data() {
      return {
        loading: false,
      }
    },
    mounted() {},
    computed: {
    },
    methods: {

    }
  }
</script>

<style lang="sass">

</style>

