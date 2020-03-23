<template lang="pug">
#mobile-menu.mobile-menu.d-lg-none.d-md-block(:class="$store.getters.getMobileMenuOpened ? 'active' : ''")
  button.mobile-menu__close#menu-close(@click="closeMenu()")
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.642 15.642"><path fill-rule="evenodd" d="M8.882 7.821l6.541-6.541A.75.75 0 1 0 14.362.219L7.821 6.76 1.28.22A.75.75 0 1 0 .219 1.281L6.76 7.822l-6.54 6.54a.75.75 0 0 0 1.06 1.061l6.541-6.541 6.541 6.541a.75.75 0 1 0 1.06-1.061l-6.54-6.541z"/></svg>
  .mobile-menu__inner
    nav.mobile-menu__nav.mobile-menu__nav--main
      ul
        li(v-for="(category, cat_index) in $store.getters.getPartsCategories.slice(0, 8)" :key="category.id")
          nuxt-link(to="/")
            span {{category.parent.description}}
    .mobile-menu__sidebar
      .sidebar__item
        .sidebar__item-head
          .sidebar__item-head-title
            i
              img(src="/images/folder-search.png" alt="alt")
            span Каталоги
          button.sidebar__item-head-burger
            img(src="/images/burger.png" alt="alt")
        ul.sidebar__item-list
          li.sidebar__item-list--inner
            a(href="#")
              i
                img(src="/images/folder.png" alt="alt")
              span Оригинальные каталоги
            i.sidebar__item-list-arrow
            .sidebar__item-dropdown
              .sidebar__item-dropdown-links
                a(href="#") Abarth
                a(href="#") Alfa Romeo
                a(href="#") Audi
                a(href="#") BMW
                a(href="#") Abarth
                a(href="#") Alfa Romeo
                a(href="#") Audi
                a(href="#") BMW
                a(href="#") Abarth
                a(href="#") Alfa Romeo
                a(href="#") Audi
                a(href="#") BMW
                a(href="#") Abarth
                a(href="#") Alfa Romeo
                a(href="#") Audi
                a(href="#") BMW
                a(href="#") Abarth
                a(href="#") Alfa Romeo
                a(href="#") Audi
                a(href="#") BMW
                a(href="#") Abarth
                a(href="#") Alfa Romeo
                a(href="#") Audi
                a(href="#") BMW
                a(href="#") Abarth
                a(href="#") Alfa Romeo
                a(href="#") Audi
                a(href="#") BMW
                a(href="#") Abarth
                a(href="#") Alfa Romeo
                a(href="#") Audi
                a(href="#") BMW
                a(href="#") Abarth
                a(href="#") Alfa Romeo
                a(href="#") Audi
                a(href="#") BMW
              a(href="#").sidebar__item-dropdown-all Смотреть все
          li
            a(href="#")
              i
                img(src="/images/tag.png" alt="alt")
              span Аксессуары и Тюнинг
          li
            a(href="#")
              i
                img(src="/images/car.png" alt="alt")
              span Запчасти для ТО
          li
            a(href="#")
              i
                img(src="/images/clean.png" alt="alt")
              span Масла и Автохимия
          li
            a(href="#")
              i
                img(src="/images/light.png" alt="alt")
              span Автомобильные лампы
          li
            a(href="#")
              i
                img(src="/images/accumulator.png" alt="alt")
              span Аккумуляторы
          li
            a(href="#")
              i
                img(src="/images/details.png" alt="alt")
              span Гайки, колпаки, болты
          li
            a(href="#")
              i
                img(src="/images/oil.png" alt="alt")
              span Моторное масло
          li
            a(href="#")
              i
                img(src="/images/glass.png" alt="alt")
              span Стекла и щетки
          li
            a(href="#")
              i
                img(src="/images/body.png" alt="alt")
              span Кузовные детали
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
            a(href="#")
              i
                img(src="/images/list.png" alt="alt")
              span Бренды
          li
            a(href="#")
              i
                img(src="/images/list.png" alt="alt")
              span Вопрос - Ответ
          li
            a(href="#")
              i
                img(src="/images/list.png" alt="alt")
              span Записаться на СТО
          li
            a(href="#")
              i
                img(src="/images/list.png" alt="alt")
              span Запрос по VIN
          li
            a(href="#")
              i
                img(src="/images/list.png" alt="alt")
              span Новости
          li
            a(href="#")
              i
                img(src="/images/list.png" alt="alt")
              span Статьи
          li
            a(href="#")
              i
                img(src="/images/list.png" alt="alt")
              span Шинный калькулятор
          li
            a(href="#")
              i
                img(src="/images/list.png" alt="alt")
              span Контакты
    nav.mobile-menu__nav.mobile-menu__nav--additional.mobile-menu__divider
      ul
        li
          a(href="#") О компании
        li
          a(href="#") Доставка
        li
          a(href="#") Оплата
        li
          a(href="#") Контакты
    .mobile-menu__divider.mobile-menu__contacts
      .header__contacts-left
        .header__contacts-top
          .header__contacts-icons
            i.header__contacts-icon
              img(src="/images/whatsapp.png" alt="whatsapp")
            i.header__contacts-icon
              img(src="/images/telegram.png" alt="telegram")
          a(href="tel:+74952666903").header__contacts-phone +7 (495) 266-6903
        a.header__contacts-cta(data-fancybox href="#" data-src="#callback-modal") Заказать обратный звонок
      .header__contacts-right
        .header__contacts-top
          .header__contacts-icons
            i.header__contacts-icon
              img(src="/images/phone.png" alt="phone")
          a(href="tel:+74952666903").header__contacts-phone +7 (495) 266-6903
        .header__contacts-address
          i.header__contacts-icon
            img(src="/images/location.png" alt="location")
          span Г. Казань, ул. Фаттыха Амирхана дом 9 оф 318


  .modal.modal--callback#callback-modal(style="display: none")
    .modal__inner
      p.modal__title Отправить заявку
      form.modal__form
        .form__group-inputs
          .form__group
            .form__group-input
              input.only-text-input(type="text" placeholder="Введите Ваше имя:")
            span.form__group-message Неправильный ввод
          .form__group
            .form__group-input
              input.mask-phone(type="text" placeholder="Введите Ваш телефон:")
            span.form__group-message Неправильный ввод
        button.btn.modal__form-btn Отправить
</template>
<script>
  export default {
    name: 'Hidden',
    components: {

    },
    methods: {
      closeMenu() {
        this.$store.commit('setMobileMenuOpened', false)
      }
    }
  }
</script>
<style lang="sass">

</style>
