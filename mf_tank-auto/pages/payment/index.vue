<template>
  <main class="main">
    <section class="hero hero--delivery" style="background-image: url(/images/hero-delivery.jpg)">
      <basket-price></basket-price>
      <div class="container">
        <div class="hero__inner">
          <h1 class="hero__title">Способы оплаты</h1>
          <form class="hero__search">
            <div class="form__group">
              <div class="form__group-input"><input type="text" name="hero-search" placeholder="Поиск по артикулу или названию товара"><span class="form__group-message">Поле должно быть заполнено</span></div>
            </div><button class="btn btn--upper hero__search-btn">Найти</button>
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
                <div class="sidebar__item-head-title"><i><img src="/images/info.png" alt="alt"></i><span>Информация</span></div><button class="sidebar__item-head-burger"><img src="/images/burger.png" alt="alt"></button>
              </div>
              <ul class="sidebar__item-list">
                <li><nuxt-link to="/delivery"><i><img src="/images/list.png" alt="alt"></i><span>Доставка</span></nuxt-link></li>
                <li><nuxt-link to="/payment"><i><img src="/images/list.png" alt="alt"></i><span>Оплата</span></nuxt-link></li>
                <li><nuxt-link to="/contact"><i><img src="/images/list.png" alt="alt"></i><span>Контакты</span></nuxt-link></li>
              </ul>
            </div>
          </aside>
          <div class="inner__wrap">
            <div class="inner__top">
              <h1 class="inner__title">Способы оплаты</h1>
              <ul class="breadcrumbs">
                <li><nuxt-link to="/">Главная</nuxt-link></li>
                <li><a>Способы оплаты</a></li>
              </ul>
            </div>
            <div class="payment__content delivery__content inner--border">
              <div class="delivery__content-top">
                <p class="delivery__content-title">Оплата заказа</p>
                <div class="delivery__content-text">
                  <p>Для работы с заказами в системе используются внутренние Персональные счета клиентов. Все средства полученные от клиента попадают на Персональный счет клиента в системе и могут быть использованы для работы с заказами. В случае заказа товарных позиций со сроком доставки 1 и более дней - необходима предоплата. Средства попадают на персональный счет и используются для выполнения заказа. В случае снятия заказа или отказа клиента от заказа клиент вправе получить средства тем способом которым был оплачен заказ. Условия возврата и гарантии. Все виды платежей необходимо производить лично в офисе или при помощи банковского перевода. Оn-Line платежи выполненные при помощи банковской карты не принадлежащей вам приняты не будут.</p>
                  <p><strong>На текущий момент мы можем предложить Вам способы оплаты:</strong></p>
                </div>
              </div>
              <div class="delivery__items">
                <div class="delivery__item">
                  <div class="delivery__item-icon">
                    <p class="delivery__item-title">Наличный способ оплаты</p><i><img src="/images/payment/icon.png" alt="alt"></i>
                  </div>
                  <div class="delivery__item-info">
                    <div class="delivery__item-text">
                      <p>Предполагает внесение денежных средств через кассу офиса в котором вы зарегистрированы для пополнения Персонального счета</p>
                    </div>
                  </div>
                </div>
                <div class="delivery__item">
                  <div class="delivery__item-icon">
                    <p class="delivery__item-title">Безналичный способ</p><i><img src="/images/payment/icon-2.png" alt="alt"></i>
                  </div>
                  <div class="delivery__item-info">
                    <div class="delivery__item-text">
                      <p>Предполагает безналичный перевод денег из банка в банк. </p>
                      <ul class="ul-list">
                        <li>Безналичные переводы денег при оплате заказов в интернет-магазине должны осуществляться с указанием вашего персонального «кода клиента».</li>
                        <li>Узнать Ваш код вы можете в вашем личном кабинете после авторизации.</li>
                        <li>В случае самостоятельного оформления платежных документов в наименовании платежа вам необходимо указать: «Предоплата за автозапчасти от клиента № __ВАШ КОД__»</li>
                        <li>Если Вы — частное лицо, вашим банком могут взиматься комиссионные сборы. Размер сборов вы можете уточнить в вашем банке.</li>
                        <li>Для Юридических лиц плательщиком является организация указанная при регистрации.</li>
                        <li>Для Частных лиц плательщиком является лицо указанное при регистрации. Юридическим лицам - бланк счета для оплаты выставляется вашим менеджером на странице "Заказы" в разделе "Счета". В случае отсутствия счета обратитесь, пожалуйста, к вашему менеджеру.</li>
                      </ul>
                      <p>Частным лицам - квитанцию вы можете распечатать на странице "Баланс" </p>
                    </div>
                  </div>
                </div>
                <div class="delivery__item">
                  <div class="delivery__item-icon">
                    <p class="delivery__item-title">Банковской картой On-Line</p><i><img src="/images/payment/icon-3.png" alt="alt"></i>
                  </div>
                  <div class="delivery__item-info">
                    <div class="delivery__item-text">
                      <p>При оформлении заказа выберите способ оплаты "Банковской картой". По окончании оформления заказа вам будет доступна форма оплаты. Нажмите "перейти на сайт платежной системы". Далее следуйте инструкциям на сайте платежной системы. Использовать для оплаты разрешается только вашу личную банковскую карту. Все действия с персональными данными осуществляются при помощи защищенного канала на сервере платежной системы. В систему заказов персональные данные о ваших банковских картах не передаются. Также вы можете пополнить счет со страницы состояние счета и архив заказов. В случае, если осуществить платеж не удается, свяжитесь, пожалуйста, с представителем вашего банка для выяснения причины отказа в платеже.</p>
                    </div>
                  </div>
                </div>
                <div class="delivery__item">
                  <div class="delivery__item-icon">
                    <p class="delivery__item-title">Безналичный перевод с о счета в Альфа-Банке</p><i><img src="/images/payment/icon-4.png" alt="alt"></i>
                  </div>
                  <div class="delivery__item-info">
                    <div class="delivery__item-text">
                      <p>Для клиентов банка "Альфа-Банк" в Москве и МО - оплата заказов оформленных с оплатой по безналичному расчету может быть выполнена при помощи сервиса банка "Альфа-Клик/Альфа-Мобайл". Для осуществления безналичного перевода необходимо выставить счет в личном кабинете в разделе "Баланс" на сайте и, затем, подтвердить его на сайте Альфа-Банка в разделе "Альфа-Клик/Альфа-Мобайл".</p>
                    </div>
                  </div>
                </div>
                <div class="delivery__item">
                  <div class="delivery__item-icon">
                    <p class="delivery__item-title">Яндекс Деньги</p><i><img src="/images/payment/icon-5.png" alt="alt"></i>
                  </div>
                  <div class="delivery__item-info">
                    <div class="delivery__item-text">
                      <p>Это сервис онлайн-платежей, который работает 24 часа в сутки и 7 дней в неделю. Пользоваться Яндекс.Деньгами можно сразу после создания электронного кошелька.</p>
                    </div>
                  </div>
                </div>
                <div class="delivery__item">
                  <div class="delivery__item-icon">
                    <p class="delivery__item-title">QIWI</p><i><img src="/images/payment/icon-6.png" alt="alt"></i>
                  </div>
                  <div class="delivery__item-info">
                    <div class="delivery__item-text">
                      <p>Оплатить заказ можно при помощи сервиса QIWI - через терминал (адреса всех терминалов) или при помощи Visa Qiwi Wallet. Данный способ пополнения счета доступен для жителей Москвы и Московской област</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <loader v-if="loading"></loader>
  </main>
</template>
<script>
  import Loader from '~/components/Loader.vue'
  import BasketPrice from "../../components/BasketPrice";

  export default {
    name: 'Payment',
    components: {
      BasketPrice,
      Loader
    },
    data() {
      return {
        loading: false,
        userCart: []
      }
    },
    mounted() {},
    computed: {},
    methods: {}
  }
</script>
