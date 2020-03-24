<template>
  <div
    class="mobile-menu d-lg-none d-md-block"
    id="mobile-menu"
    :class="$store.getters.getMobileMenuOpened ? 'active' : ''"
  >
    <button class="mobile-menu__close" id="menu-close" @click="closeMenu()">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.642 15.642">
        <path
          fill-rule="evenodd"
          d="M8.882 7.821l6.541-6.541A.75.75 0 1 0 14.362.219L7.821 6.76 1.28.22A.75.75 0 1 0 .219 1.281L6.76 7.822l-6.54 6.54a.75.75 0 0 0 1.06 1.061l6.541-6.541 6.541 6.541a.75.75 0 1 0 1.06-1.061l-6.54-6.541z"
        />
      </svg>
    </button>
    <div class="mobile-menu__inner">
      <nav class="mobile-menu__nav mobile-menu__nav--main">
        <ul>
          <li
            v-for="category in $store.getters.getPartsCategories.slice(0, 8)"
            :key="category.parent.description + category.id"
          >
            <nuxt-link to="/">
              <span>{{category.parent.description}}</span>
            </nuxt-link>
          </li>
        </ul>
      </nav>
      <div class="mobile-menu__sidebar">
        <div class="sidebar__item">
          <div class="sidebar__item-head">
            <div class="sidebar__item-head-title">
              <i>
                <img src="/images/folder-search.png" alt="alt" />
              </i>
              <span>Каталоги</span>
            </div>
            <button class="sidebar__item-head-burger">
              <img src="/images/burger.png" alt="alt" />
            </button>
          </div>
          <ul class="sidebar__item-list">
            <li class="sidebar__item-list--inner">
              <a href="#">
                <i>
                  <img src="/images/folder.png" alt="alt" />
                </i>
                <span>Оригинальные каталоги</span>
              </a>
              <i class="sidebar__item-list-arrow"></i>
              <div class="sidebar__item-dropdown">
                <div class="sidebar__item-dropdown-links">
                  <a href="#">Abarth</a>
                  <a href="#">Alfa Romeo</a>
                  <a href="#">Audi</a>
                  <a href="#">BMW</a>
                  <a href="#">Abarth</a>
                  <a href="#">Alfa Romeo</a>
                  <a href="#">Audi</a>
                  <a href="#">BMW</a>
                  <a href="#">Abarth</a>
                  <a href="#">Alfa Romeo</a>
                  <a href="#">Audi</a>
                  <a href="#">BMW</a>
                  <a href="#">Abarth</a>
                  <a href="#">Alfa Romeo</a>
                  <a href="#">Audi</a>
                  <a href="#">BMW</a>
                  <a href="#">Abarth</a>
                  <a href="#">Alfa Romeo</a>
                  <a href="#">Audi</a>
                  <a href="#">BMW</a>
                  <a href="#">Abarth</a>
                  <a href="#">Alfa Romeo</a>
                  <a href="#">Audi</a>
                  <a href="#">BMW</a>
                  <a href="#">Abarth</a>
                  <a href="#">Alfa Romeo</a>
                  <a href="#">Audi</a>
                  <a href="#">BMW</a>
                  <a href="#">Abarth</a>
                  <a href="#">Alfa Romeo</a>
                  <a href="#">Audi</a>
                  <a href="#">BMW</a>
                  <a href="#">Abarth</a>
                  <a href="#">Alfa Romeo</a>
                  <a href="#">Audi</a>
                  <a href="#">BMW</a>
                </div>
                <a class="sidebar__item-dropdown-all" href="#">Смотреть все</a>
              </div>
            </li>
            <li>
              <a href="#">
                <i>
                  <img src="/images/tag.png" alt="alt" />
                </i>
                <span>Аксессуары и Тюнинг</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i>
                  <img src="/images/car.png" alt="alt" />
                </i>
                <span>Запчасти для ТО</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i>
                  <img src="/images/clean.png" alt="alt" />
                </i>
                <span>Масла и Автохимия</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i>
                  <img src="/images/light.png" alt="alt" />
                </i>
                <span>Автомобильные лампы</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i>
                  <img src="/images/accumulator.png" alt="alt" />
                </i>
                <span>Аккумуляторы</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i>
                  <img src="/images/details.png" alt="alt" />
                </i>
                <span>Гайки, колпаки, болты</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i>
                  <img src="/images/oil.png" alt="alt" />
                </i>
                <span>Моторное масло</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i>
                  <img src="/images/glass.png" alt="alt" />
                </i>
                <span>Стекла и щетки</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i>
                  <img src="/images/body.png" alt="alt" />
                </i>
                <span>Кузовные детали</span>
              </a>
            </li>
          </ul>
        </div>
        <div class="sidebar__item">
          <div class="sidebar__item-head">
            <div class="sidebar__item-head-title">
              <i>
                <img src="/images/info.png" alt="alt" />
              </i>
              <span>Информация</span>
            </div>
            <button class="sidebar__item-head-burger">
              <img src="/images/burger.png" alt="alt" />
            </button>
          </div>
          <ul class="sidebar__item-list">
            <li>
              <a href="#">
                <i>
                  <img src="/images/list.png" alt="alt" />
                </i>
                <span>Бренды</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i>
                  <img src="/images/list.png" alt="alt" />
                </i>
                <span>Вопрос - Ответ</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i>
                  <img src="/images/list.png" alt="alt" />
                </i>
                <span>Записаться на СТО</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i>
                  <img src="/images/list.png" alt="alt" />
                </i>
                <span>Запрос по VIN</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i>
                  <img src="/images/list.png" alt="alt" />
                </i>
                <span>Новости</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i>
                  <img src="/images/list.png" alt="alt" />
                </i>
                <span>Статьи</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i>
                  <img src="/images/list.png" alt="alt" />
                </i>
                <span>Шинный калькулятор</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i>
                  <img src="/images/list.png" alt="alt" />
                </i>
                <span>Контакты</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <nav class="mobile-menu__nav mobile-menu__nav--additional mobile-menu__divider">
        <ul>
          <li>
            <a href="#">О компании</a>
          </li>
          <li>
            <a href="#">Доставка</a>
          </li>
          <li>
            <a href="#">Оплата</a>
          </li>
          <li>
            <a href="#">Контакты</a>
          </li>
        </ul>
      </nav>
      <div class="mobile-menu__divider mobile-menu__contacts">
        <div class="header__contacts-left">
          <div class="header__contacts-top">
            <div class="header__contacts-icons">
              <i class="header__contacts-icon">
                <img src="/images/whatsapp.png" alt="whatsapp" />
              </i>
              <i class="header__contacts-icon">
                <img src="/images/telegram.png" alt="telegram" />
              </i>
            </div>
            <a class="header__contacts-phone" href="tel:+74952666903">+7 (495) 266-6903</a>
          </div>
          <a
            class="header__contacts-cta"
            data-fancybox="data-fancybox"
            href="#"
            data-src="#callback-modal"
          >Заказать обратный звонок</a>
        </div>
        <div class="header__contacts-right">
          <div class="header__contacts-top">
            <div class="header__contacts-icons">
              <i class="header__contacts-icon">
                <img src="/images/phone.png" alt="phone" />
              </i>
            </div>
            <a class="header__contacts-phone" href="tel:+74952666903">+7 (495) 266-6903</a>
          </div>
          <div class="header__contacts-address">
            <i class="header__contacts-icon">
              <img src="/images/location.png" alt="location" />
            </i>
            <span>Г. Казань, ул. Фаттыха Амирхана дом 9 оф 318</span>
          </div>
        </div>
      </div>
    </div>
    <div class="modal modal--callback" id="callback-modal" style="display: none;">
      <div class="modal__inner">
        <p class="modal__title">Отправить заявку</p>
        <form class="modal__form">
          <div class="form__group-inputs">
            <div class="form__group">
              <div class="form__group-input">
                <input class="only-text-input" type="text" placeholder="Введите Ваше имя:" />
              </div>
              <span class="form__group-message">Неправильный ввод</span>
            </div>
            <div class="form__group">
              <div class="form__group-input">
                <input class="mask-phone" type="text" placeholder="Введите Ваш телефон:" />
              </div>
              <span class="form__group-message">Неправильный ввод</span>
            </div>
          </div>
          <button class="btn modal__form-btn">Отправить</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Hidden",
  components: {},
  methods: {
    closeMenu() {
      this.$store.commit("setMobileMenuOpened", false);
    }
  }
};
</script>
<style lang="sass">

</style>
