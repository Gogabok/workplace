<template>
  <main class="main">
    <section class="hero hero--delivery" style="background-image: url(/images/hero-delivery.jpg)">
      <div class="container">
        <div class="hero__inner">
          <h1 class="hero__title">Корзина</h1>
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
          <div class="cart__wrap inner__wrap">
            <div class="inner__top">
              <h1 class="inner__title">Корзина</h1>
              <ul class="breadcrumbs">
                <li><nuxt-link to="/">Главная</nuxt-link></li>
                <li><nuxt-link to="/cart">Корзина</nuxt-link></li>
              </ul>
            </div>
            <div class="cart__content delivery__content contact--border">
              <div class="row">
                <div class="col-lg-12 col-12">
                  <div class="cart-title">
                    <h3>Готовые к заказу ({{userCart.length}})</h3>
                  </div>
                  <div class="cart-tb" v-if="userCart.length > 0">
                    <table class="table">
                      <tr>
                        <th scope="col">Картинка</th>
                        <th scope="col">Бренд</th>
                        <th scope="col">Артикул</th>
                        <th scope="col">Название</th>
                        <th scope="col">Цена</th>
                        <th scope="col">Количество</th>
                        <th scope="col">Сумма</th>
                      </tr>
                      <tr v-for="product in userCart" :key="product.article + Math.random()">
                        <td scope="col"><img :src="product.image" alt=""></td>
                        <td scope="col">{{product.supplier_name}}</td>
                        <td scope="col">{{product.article}}</td>
                        <td scope="col">{{product.product_name}}</td>
                        <td scope="col">{{!isNaN(parseFloat(product.price)) ? parseFloat(product.price).toFixed(2) : product.price}} руб.</td>
                        <td scope="col">
                          <div class="qty-block">
                            <div class="qty-input">
                              <i class="less" @click="productAmountChange('minus', product)">-</i>
                              <input type="text" disabled v-model="product.count">
                              <i class="more" @click="productAmountChange('plus', product)">+</i>
                            </div>
                          </div>
                        </td>
                        <td scope="col">{{!isNaN(parseFloat(getProductSum(product))) ? parseFloat(getProductSum(product)).toFixed(2) : getProductSum(product)}} руб.</td>
                      </tr>
                    </table>
                  </div>
                  <div class="cart-tb-mob" v-if="userCart.length > 0" v-for="product in userCart" :key="product.article + 'mob-2' + Math.random()">
                    <div class="cart-tb-mob-head">
                      Наименование<br>
                      <span>{{product.product_name}} </span>
                    </div>
                    <table>
                      <tbody>
                      <tr>
                        <th scope="col">Бренд</th>
                        <th scope="col">{{product.supplier_name}}</th>
                      </tr>
                      <tr>
                        <th scope="col">Артикул</th>
                        <th scope="col">{{product.article}}</th>
                      </tr>
                      <tr>
                        <th scope="col">Цена (руб)</th>
                        <th scope="col">{{product.price}} руб</th>
                      </tr>
                      <tr>
                        <th scope="col">Кол-во  </th>
                        <th scope="col">
                          <div class="qty-block-2">
                            <div class="qty-input-2">
                              <i class="less-2" @click="productAmountChange('minus', product)">-</i>
                              <input type="text" disabled v-model="product.count">
                              <i class="more-2" @click="productAmountChange('plus', product)">+</i>
                            </div>
                          </div>
                        </th>
                      </tr>
                      <tr>
                        <th scope="col">Сумма (руб)</th>
                        <th scope="col">{{getProductSum(product)}} руб</th>
                      </tr>
                      </tbody>
                    </table>
                    <div class="table-img"><img src="/images/cart/cart.png" alt=""></div>
                  </div>
                  <div class="cart-total" v-if="userCart.length > 0">
                    <h4>Итого: <span>{{getTotalSum.toFixed(2)}} руб</span></h4>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-6 col-sm-6">
                  <div class="cart-title">
                    <h4>Оформление заказа</h4>
                  </div>
                  <div class="cart-form">
                    <form>
                      <div class="form-row">
                        <div class="col-md-12 mb-12">
                          <label>Введите Ваши даные:</label>
                          <span class="form__group-message sent" v-if="formSent">Заявка отправленна</span>
                          <input v-model="form.name" type="text" class="form-control" id="contact-name" placeholder="Ваше имя:">
                          <span class="form__group-message" v-if="nameError" >{{nameErrorMessage}}</span>
                        </div>
                        <div class="col-md-12 mb-12">
                          <input v-model="form.phone" type="phone" v-mask="'+#(###)###-##-##'" class="form-control" id="contact-phone" placeholder="Ваш телефон">
                          <span class="form__group-message" v-if="phoneError" >{{phoneErrorMessage}}</span>
                        </div>
                      </div>
                      <button class="btn btn-primary send-loan" :class="userCart.length > 0 ? '' : 'disabled'" @click="sendForm($event)">{{userCart.length > 0 ? 'Оформить заказ' : 'Корзина пуста'}}</button>
                    </form>
                  </div>
                </div>
                <div class="col-lg-6 col-sm-6">
                  <div class="cart-map">
                    <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A411c17532eb3603e58557aafd24d7ae9670e3002edb88d0f7b923c8371180254&amp;source=constructor" width="100%" height="585" frameborder="0"></iframe>
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
  export default {
    name: 'Cart',
    components: {
      Loader
    },
    data() {
      return {
        userCart: [],
        loading: true,
        form: {
          name: '',
          phone: '',
          comment: ''
        },
        nameError: false,
        phoneError: false,
        commentError: false,
        formSent: false,
        nameErrorMessage: '',
        phoneErrorMessage: '',
        commentErrorMessage: '',
      }
    },
    mounted() {
      api.getUserCart(this.$cookie.get('user_hash'))
        .then(response => {
          this.userCart = response;
          let productsInfo = [];
          this.userCart.forEach(product => {
            productsInfo.push(
              api.getProductByCode(product.article)
            )
          });
          return api.axios.all(productsInfo)
        })
        .then((response) => {
          response.forEach(productInfo => {
            this.userCart.forEach(productInCart => {
              if(productInCart.article === productInfo.view.part_number) {
                Object.keys(productInfo.view).forEach(key => {
                  if(key !== 'price') {
                    this.$set(productInCart, key, productInfo.view[key])
                  }
                });
                this.$set(productInCart, 'price', productInfo.view.price);
                let image = productInfo.images[0] && productInfo.images[0].PictureName;
                if(image) {
                  this.$set(productInCart, 'image', `${api.baseUrl}/auto/${image.split('_')[0]}/${image}`)
                }
              }
            })
          });
          this.loading = false
        })
        .catch(error => {
          this.loading = false;
          // return this.$nuxt.error({ statusCode: 404, message: error })
        })
    },
    computed: {
      getTotalSum() {
        let total = 0;
        this.userCart.forEach(product => {
          total += (
            !isNaN(Number.parseFloat(product.price)) ? Number.parseFloat(product.price) : 0)
            * Number(product.count)
        });
        return total
      },
    },
    methods: {
      getProductSum(product) {
        return !isNaN(Number.parseFloat(product.price)) ? parseFloat(product.price) * parseInt(product.count) : '0'
      },
      productAmountChange(type, product) {
        this.loading = true;
        switch (type) {
          case 'plus' : {
            api.updateProductInCart(product.id, product.count + 1)
              .then(() => {
                this.loading = false;
                product.count += 1;
              })
              .catch(error => {
                this.loading = false;
              })
          } break;
          case 'minus' : {
            api.updateProductInCart(product.id, product.count - 1)
              .then(() => {
                this.loading = false;
                product.count -= 1;
              })
              .catch(error => {
                this.loading = false;
              })
          } break;
        }
      },
      sendForm(event) {
        event.preventDefault()
        if(this.userCart.length < 1) {
          return;
        }
        this.nameError = false;
        this.phoneError = false;
        this.commentError = false;
        if(!this.nameError && !this.phoneError && !this.commentError) {
          const name = this.form.name;
          const phone = this.form.phone;
          const text = this.form.comment;
          this.loading = true;
          this.formSent = false;
          api.createOrder(this.$cookie.get('user_hash'), name, phone)
            .then(response => {
              this.loading = false;
              this.formSent = true;
              this.form.name = '';
              this.form.phone = '';
              this.form.comment = '';
              this.nameError = false;
              this.phoneError = false;
              this.commentError = false;
              this.userCart = [];
              this.$cookie.delete('user_hash')
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
  .send-loan.disabled {
    background-color: #c2c2c2;
    cursor: not-allowed;
  }
</style>
