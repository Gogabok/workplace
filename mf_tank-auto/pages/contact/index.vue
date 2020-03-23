<template>
  <main class="main">
    <section class="hero hero--delivery" style="background-image: url(/images/hero-delivery.jpg)">
      <basket-price></basket-price>
      <div class="container">
        <div class="hero__inner">
          <h1 class="hero__title">Контакты</h1>
          <form class="hero__search">
            <div class="form__group">
              <div class="form__group-input"><input type="text" name="hero-search" placeholder="Поиск по артикулу или названию товара"></div>
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
              <h1 class="inner__title">Контакты</h1>
              <ul class="breadcrumbs">
                <li><nuxt-link to="/">Главная</nuxt-link></li>
                <li><a>Контакты</a></li>
              </ul>
            </div>
            <div class="contact__content delivery__content contact--border">
              <div class="row">
                <div class="col-lg-12 col-12">
                  <div class="contact-info">
                    <a href="tel:+7 (495) 266-6903">+7 (495) 266-6903</a>
                    <a href="tel:+7 (495) 266-6903">+7 (495) 266-6903</a>
                    <span>Г. Казань, ул. Фаттыха<br> Амирхана дом 9 оф 318</span>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-12 col-12">
                  <div class="contact-form">
                    <span>Форма обратной связи</span>
                    <p>Введите Ваши даные:</p>
                    <form>
                      <div class="form-row">
                        <div class="col-md-12 mb-12">
                          <span class="form__group-message sent" v-if="formSent">Заявка отправленна</span>
                          <input type="text" class="form-control" id="contact-name" v-model="form.name" placeholder="Ваше имя:" >
                          <span class="form__group-message" v-if="nameError" >{{nameErrorMessage}}</span>
                        </div>
                        <div class="col-md-12 mb-12">
                          <input type="phone" v-mask="'+#(###)###-##-##'" class="form-control" id="contact-phone" v-model="form.phone"  placeholder="Ваш телефон" >
                          <span class="form__group-message" v-if="phoneError" >{{phoneErrorMessage}}</span>
                        </div>
                        <div class="col-md-12 mb-12">
                          <textarea type="text" v-model="form.comment" class="form-control only-text-input t-area contact" id="contact-posts" rows="5" placeholder="Текст сообщения: " ></textarea>
                          <span class="form__group-message" v-if="commentError">{{commentErrorMessage}}</span>
                        </div>
                      </div>
                      <button class="btn btn-primary" @click="sendForm($event)">Отправить</button>
                    </form>
                    <p>Политика обработки персональных данных (согласно пункта 2 статьи 18.1 <br>Закона от 27 июля 2006 г. № 152-ФЗ.)</p>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-12 col-12">
                  <div class="contact-map">
                    <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A411c17532eb3603e58557aafd24d7ae9670e3002edb88d0f7b923c8371180254&amp;source=constructor" width="100%" height="421" frameborder="0"></iframe>
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
  import api from '~/assets/js/api.js'
  import Loader from '~/components/Loader.vue'
  import BasketPrice from "../../components/BasketPrice";

  export default {
    name: 'Contact',
    components: {
      BasketPrice,
      Loader
    },
    data() {
      return {
        form: {
          name: '',
          phone: '',
          comment: ''
        },
        loading: false,
        nameError: false,
        phoneError: false,
        commentError: false,
        formSent: false,
        nameErrorMessage: '',
        phoneErrorMessage: '',
        commentErrorMessage: '',
      }
    },
    mounted() {},
    computed: {},
    methods: {
      sendForm(event) {
        event.preventDefault();
        this.nameError = false;
        this.phoneError = false;
        this.commentError = false;
        if(!this.nameError && !this.phoneError && !this.commentError) {
          const name = this.form.name;
          const phone = this.form.phone;
          const text = this.form.comment;
          this.loading = true;
          this.formSent = false;
          api.sendForm(name, phone, text)
            .then(response => {
              this.loading = false;
              this.formSent = true;
              this.form.name = '';
              this.form.phone = '';
              this.form.comment = '';
              this.nameError = false;
              this.phoneError = false;
              this.commentError = false;
            })
            .catch(error => {
              this.loading = false;
              error.response.data.forEach(err => {
                switch (err.field) {
                  case 'name' : {
                    this.nameError = true;
                    this.nameErrorMessage = err.message
                  } break;
                  case 'phone' : {
                    this.phoneError = true;
                    this.phoneErrorMessage = err.message
                  } break;
                  case 'text' : {
                    this.commentError = true;
                    this.commentErrorMessage = err.message
                  } break;
                }
              })
              //this.$emit('closeModal')
            })
        }
      },
      checkEmpty(type) {
        switch(type) {
          case 'name': {
            this.nameError = this.form.name === '';
          } break;

          case 'phone': {
            this.phoneError = this.form.phone === '';
          } break;

          case 'comment': {
            this.commentError = this.form.comment === '';
          } break;
        }
      }
    }
  }
</script>
<style>
  .contact-form .form__group-message {
    font-size: .8em;
  }
  .t-area.contact {
    max-width: 400px;
  }
</style>
