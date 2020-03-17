<template>
  <main class="main">
    <section class="hero hero--home hero-product" style="background-image: url(/images/product/product-back.png)">
      <basket-price></basket-price>
      <div class="container">
        <div class="hero__inner">
          <h1 class="hero__title">{{productInfo.view.supplier_name}} {{productInfo.view.product_name}}</h1>
          <form class="hero__search">
            <div class="form__group">
              <div class="form__group-input"><input type="text" name="hero-search" placeholder="Поиск по артикулу или названию товара"></div>
            </div><button class="btn btn--upper hero__search-btn">Найти</button>
          </form>
        </div>
      </div>
    </section>
    <section class="product-page">
      <div class="container">
        <div class="inner__top">
          <h1 class="inner__title">{{productInfo.view.supplier_name}} {{productInfo.view.product_name}}</h1>
          <ul class="breadcrumbs">
            <li><nuxt-link to="/">Главная</nuxt-link></li>
            <li><nuxt-link to="/garage">Гараж</nuxt-link></li>
            <li><nuxt-link to="/">Масла и Автохимия</nuxt-link></li>
            <li><nuxt-link to="/">Масла трансмиссионные</nuxt-link></li>
            <li><nuxt-link to="/">{{productInfo.view.supplier_name}}</nuxt-link></li>
          </ul>
        </div>
        <div class="product-main">
          <div class="row">
            <div class="col-sm-5">
              <div class="product-img">
                <img :src="productImage(productInfo)" :alt="productInfo.view.supplier_name + productInfo.view.product_name">
              </div>
            </div>
            <div class="col-sm-7">
              <div class="row product-price">
                <div class="col-sm-4">
                  <div class="product-price">
                    <span>{{isNaN(parseFloat(productInfo.view.price)) ? '0' : parseFloat(productInfo.view.price)}} руб</span>
                  </div>
                </div>
                <div class="col-sm-5 button-cart-mob">
                  <div class="product-add-to-cart" :class="alreadyInCart ? 'disabled' : ''">
                    <button @click="addToCart"><img src="/images/product/add-cart.png" alt="Добавить в корзину">{{alreadyInCart ? 'Добавлен' : 'В корзину'}}</button>
                  </div>
                </div>
              </div>
              <div class="product-attribute">
                <table>
                  <tbody>
                  <tr v-for="attribute in productInfo.attributes" :key="attribute.id">
                    <td>{{attribute.description}}</td>
                    <td>{{attribute.displayvalue}}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <div class="product-revies">
                <div class="row">
                  <div class="col-sm-8">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="product-footer">
          <div class="row">
            <div class="col-lg-12 col-12">
              <div class="title title-last">
                <h2>Аналоги (заменители) для запрошенного артикула {{productInfo.view.part_number}}</h2>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12 col-12">
              <table class="product-footer-table-last">
                <tr v-for="cross in productInfo.crosses" :key="cross.part_number">
                  <td><h3>{{cross.supplier_name}}</h3></td>
                  <td>{{cross.part_number}}</td>
                  <td><nuxt-link class="art-mob" :to="'/product/' + cross.part_number">{{cross.product_name}}</nuxt-link></td>
                  <td><nuxt-link class="art-mob" :to="'/product/' + cross.part_number">Доп. информация</nuxt-link></td>
                  <td style="display: none"><button>Купить</button></td>
                </tr>
              </table>
              <div class="product-footer-table-mob">
                <table class="mobile-cross-table" v-for="cross in productInfo.crosses" :key="cross.part_number">
                  <tbody>
                  <tr class="cross-mobile-name">
                    <th scope="col">Бренд</th>
                    <th scope="col">{{cross.supplier_name}}</th>
                  </tr>
                  <tr>
                    <th scope="col">Название</th>
                    <th scope="col">{{cross.product_name}}</th>
                  </tr>
                  <tr>
                    <th scope="col">Артикул</th>
                    <th scope="col" class="art-mob"><nuxt-link :to="'/product/' + cross.part_number">{{cross.part_number}}</nuxt-link></th>
                  </tr>
                  <tr>
                    <th scope="col">Доп. информация</th>
                    <th scope="col" class="art-mob"><nuxt-link :to="'/product/' + cross.part_number">Посмотреть</nuxt-link></th>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12 col-12">
              <div class="product-footer-text">
                <p>Информация о товаре предоставлена для ознакомления и не является публичной офертой. Производители оставляют за собой право изменять внешний вид, характеристики и комплектацию товара, предварительно не уведомляя продавцов и потребителей. Просим вас отнестись с пониманием к данному факту и заранее приносим извинения за возможные неточности в описании и фотографиях товара. Будем благодарны вам за сообщение об ошибках — это поможет сделать наш каталог еще точнее!</p>
                <p>Информация о товаре предоставлена для ознакомления и не является публичной офертой. Производители оставляют за собой право изменять внешний вид, характеристики и комплектацию товара, предварительно не уведомляя продавцов и потребителей. Просим вас отнестись с пониманием к данному факту и заранее приносим извинения за возможные неточности в описании и фотографиях товара. Будем благодарны вам за сообщение об ошибках — это поможет сделать наш каталог еще точнее!</p>
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
  name: 'Product',
  components: {
    BasketPrice,
    Loader
  },
  head() {
    return {
      title: this.title
    }
  },
  data() {
    return {
      productInfo: {
        view: {}
      },
      loading: false,
      userCart: null,
      alreadyInCart: false,
      title: ''
    }
  },
  computed: {},
  created() {
    this.loading = true;
    api.getProductByCode(this.$route.params.id)
      .then(response => {
        this.productInfo = response;
        this.loading = false;
        console.log(response)
        console.log(this.$store.getters['getSelectedModification'])
        if(this.$store.getters['getSelectedModification'].fulldescription) {
          this.title = `${response.view.supplier_name} ${response.view.product_name} для ${this.$store.getters['getSelectedModification'].fulldescription}, ${response.view.supplierid}`
        } else {
          this.title = `${response.view.supplier_name} ${response.view.product_name}, ${response.view.supplierid}`
        }
      })
  },
  mounted() {
    /*
    api.getUserCart(this.$cookie.get('user_hash'))
      .then(response => {
        this.userCart = response;
        if(this.userCart.filter(item => item.article === this.$route.params.id).length > 0) {
          this.alreadyInCart = true
        }
      });
     */
  },
  methods: {
    productImage(product) {
      let image = product.images ? product.images[0] && product.images[0].PictureName : '';
      let ext = image ? image.split('.')[1] : '';
      return image && (ext === 'PNG' || ext === 'png' || ext === 'jpg' || ext === 'JPG') ? `${api.baseUrl}/auto/${image.split('_')[0]}/${image.split('.')[0]}.${ext.toLowerCase()}` : '/images/cart/cart.png'
    },
    addToCart() {
      if(!this.alreadyInCart) {
        if(!this.$cookie.get('user_hash')) {
          api.getUserHash()
            .then(response => {
              this.$cookie.set('user_hash', response.str);
              return api.addItemToCart(
                this.productInfo.view.modification_id,
                this.productInfo.view.section_id,
                this.$route.params.id,
                this.$cookie.get('user_hash'))
            })
            .then(response => {
              this.loading = false;
              this.alreadyInCart = true;
              this.$root.$emit('basketChangeSum');
            })
            .catch(error => {
              this.loading = false;
              console.log(error)
            })
        } else {
          this.loading = true;
          let price = 0;
          if(this.productInfo.view.price !== 'Неизвестно') {
            price = this.productInfo.view.price
          }
          api.addItemToCart(
            this.productInfo.view.modification_id,
            this.productInfo.view.section_id,
            this.$route.params.id,
            this.$cookie.get('user_hash'),
            price)
            .then(response => {
              this.loading = false;
              this.alreadyInCart = true;
              this.$root.$emit('basketChangeSum');
            })
            .catch(error => {
              this.loading = false;
              this.alreadyInCart = true;
              console.log(error)
            })
        }
      } else {
        this.$router.push({name: 'cart'})
      }
    }
  }
}
</script>
<style lang="scss">
  .product-add-to-cart.disabled {
    & button {
      background: #00d629;
    }
  }
  .mobile-cross-table:first-of-type ~ .mobile-cross-table {
    margin-top: 60px;
  }
  .cross-mobile-name th {
    font-weight: 700!important;
  }
  .art-mob {
    text-decoration: underline;
  }
  .button-cart-mob {
    width: 130px;
    height: 50px;
  }
  h3 {
    font-size: 16px;
  }
  h2 {
    font-size: 22px;
    font-weight: 600;
  }
</style>
