<template>
  <main class="main">
    <loader v-if="loading"></loader>
    <section class="hero hero--delivery" style="background-image: url(/images/hero-delivery.jpg);">
      <basket-price></basket-price>
      <div class="container">
        <div class="hero__inner">
          <h1 class="hero__title">Способ доставки</h1>
          <form class="hero__search">
            <div class="form__group">
              <div class="form__group-input">
                <input
                  type="text"
                  name="hero-search"
                  placeholder="Поиск по артикулу или названию товара"
                />
                <span class="form__group-message">Поле должно быть заполнено</span>
              </div>
            </div>
            <button class="btn btn--upper hero__search-btn">Найти</button>
          </form>
        </div>
      </div>
    </section>
    <section class="inner inner--flex inner--delivery">
      <div class="container">
        <div class="inner__content">
          <aside class="sidebar">
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
                  <nuxt-link to="/delivery">
                    <i>
                      <img src="/images/list.png" alt="alt" />
                    </i>
                    <span>Доставка</span>
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link to="/payment">
                    <i>
                      <img src="/images/list.png" alt="alt" />
                    </i>
                    <span>Оплата</span>
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link to="/contact">
                    <i>
                      <img src="/images/list.png" alt="alt" />
                    </i>
                    <span>Контакты</span>
                  </nuxt-link>
                </li>
              </ul>
            </div>
          </aside>
          <div class="inner__wrap">
            <div class="inner__top">
              <h1 class="inner__title">Способ доставки</h1>
              <ul class="breadcrumbs">
                <li>
                  <nuxt-link to="/">Главная</nuxt-link>
                </li>
                <li>
                  <a>Способ доставки</a>
                </li>
              </ul>
            </div>
            <div class="delivery__content inner--border">
              <div class="delivery__content-top">
                <p class="delivery__content-title">Доставка заказа</p>
                <div class="delivery__content-text">
                  <p>В городах, где есть представительство — Вы можете получить заказ непосредственно в офисе представительства в вашем городе. Или, в случае доступности курьерской доставки, получить заказ курьером.</p>
                </div>
              </div>
              <div class="delivery__items">
                <div class="delivery__item">
                  <div class="delivery__item-icon">
                    <p class="delivery__item-title">Самовывоз</p>
                    <i>
                      <img src="/images/bike.png" alt="alt" />
                    </i>
                  </div>
                  <div class="delivery__item-info">
                    <div class="delivery__item-text">
                      <p>Этот способ следует выбирать, если Вы сможете забрать заказ самостоятельно или через доверенное лицо в офисе регистрации. Шаблон доверенности</p>
                    </div>
                  </div>
                </div>
                <div class="delivery__item">
                  <div class="delivery__item-icon">
                    <p class="delivery__item-title">Курьер</p>
                    <i>
                      <img src="/images/courier.png" alt="alt" />
                    </i>
                  </div>
                  <div class="delivery__item-info">
                    <div class="delivery__item-text">
                      <p>Доставка курьером есть не во всех регионах. Для уточнения возможности доставки курьером обращайтесь, пожалуйста, к Вашему персональному менеджеру</p>
                    </div>
                  </div>
                </div>
                <div class="delivery__item">
                  <div class="delivery__item-icon">
                    <p class="delivery__item-title">Транспортная компания</p>
                    <i>
                      <img src="/images/delivery.png" alt="alt" />
                    </i>
                  </div>
                  <div class="delivery__item-info">
                    <div class="delivery__item-text">
                      <p>
                        Этот способ может быть выбран если в вашем регионе пока не открыто представительство и вы работаете напрямую с офисом в Москве. При этом способе доставки заказ отправляется авиа-, авто- или железнодорожным транспортом,
                        в зависимости от того, какая схема доставки в Ваш регион принята на данный момент.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="delivery__item">
                  <div class="delivery__item-icon">
                    <p class="delivery__item-title">Почта России</p>
                    <i>
                      <img src="/images/rus-post.png" alt="alt" />
                    </i>
                  </div>
                  <div class="delivery__item-info">
                    <div class="delivery__item-text">
                      <p>
                        Отправка груза будет произведена строго “Почтой России”. По тарифам соответствующим внутренним затратам компании + тарифы почты. Существуют ограничения по товарам отправляемым “Почтой России”, ознакомиться с ними
                        вы сможете на сайте russianpost.ru. При невозможности отправки груза система не посчитает тариф. Для отслеживания вашего отправления используйте сайт "Почта России" и номер вашего отправления из оповещений.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="delivery__item">
                  <div class="delivery__item-icon">
                    <p class="delivery__item-title">DHL</p>
                    <i>
                      <img src="/images/dhl.png" alt="alt" />
                    </i>
                  </div>
                  <div class="delivery__item-info">
                    <div class="delivery__item-text">
                      <p>В некоторые регионы России доставка может быть осуществлена транспортной компанией DHL. Для уточнения пожалуйста обращайтесь к вашему менеджеру.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import Loader from "~/components/Loader.vue";
import BasketPrice from "~/components/BasketPrice";

export default {
  name: "Delivery",
  components: {
    Loader,
    BasketPrice
  },
  data() {
    return {
      loading: false
    };
  },
  mounted() {},
  computed: {},
  methods: {}
};
</script>

<style lang="sass">

</style>

