<template>
  <main class="main">
    <section class="hero hero--delivery" style="background-image: url(/images/product/product-back-2.png)">
      <basket-price></basket-price>
      <div class="container">
        <div class="hero__inner">
          <!-- <h1 class="hero__title">{{currentSection && currentSection.description}}</h1> -->
          <h1 class="hero__title">{{ title }}</h1>
          <form class="hero__search">
            <div class="form__group">
              <div class="form__group-input"><input type="text" name="hero-search" placeholder="Поиск по артикулу или названию товара"></div>
            </div><button class="btn btn--upper hero__search-btn">Найти</button>
          </form>
        </div>
      </div>
    </section>
    <section class="min-product inner inner--flex inner--delivery">
      <div class="container">
        <div class="min-product-header">
          <div class="row">
            <div class="col-sm-9">
              <div class="inner__top">
                <h2 class="inner__title">{{currentSection && currentSection.description}} для {{carInfo && carInfo.modification.fulldescription}}</h2>
                <ul class="breadcrumbs">
                  <li><nuxt-link to="/">Главная</nuxt-link></li>
                  <li><nuxt-link :to="`/${$route.params.auto}/${$route.params.model}/${$route.params.modification}`">Гараж</nuxt-link></li>
                  <li><nuxt-link :to="`/${$route.params.auto}/${$route.params.model}/${$route.params.modification}/${$route.params.id}`">{{currentSection && currentSection.description}}</nuxt-link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="min-product-content inner__content">
          <aside class="sidebar">
            <div class="sidebar__item sidebar__item-2">
              <div class="sidebar__item-head">
                <div class="sidebar__item-head-title"><span>Каталог</span></div>
              </div>
              <div class="sidebar-filter-product">
                <div class="sidebar-filter-menu">
                  <a href="#">Вернуться в каталог</a>
                  <div class="sidebar-filter-menu-ul" id="sidebar-filter-menu">
                    <section-tree :depth="0" :modificationId="$route.params.modification.id" :selectedSectionId="$route.params.id"></section-tree>
                  </div>
                </div>
              </div>
            </div>
          </aside>
          <div class="inner__wrap">
            <div class="product__content">
              <div class="products-page">
                <div class="row">
                  <div class="col-sm-4 prod-col" v-for="product in currentGoods" :key="product.part_nubmer + Math.random()">
                    <!-- <nuxt-link :to="{name: 'product-id', params: {id: product.part_number}}"> -->
                      
                      <nuxt-link :to="{name: 'product-id', params: {id: product.id, code: product.part_number}}">
                      <div class="products-list products-list-2">
                        <div class="products-list-title">
                          <h3>{{product.supplier_name}} {{product.part_number}} {{product.product_name}}</h3>
                        </div>
                        <div class="products-list-img">
                          <img :src="productImage(product)">
                        </div>
                        <div class="products-list-info">
                          <p>На складе 4 (шт.)<br>Доставим за 2 дн.</p>
                        </div>
                        <div class="products-list-price">
                          <span class="price">{{isNaN(parseFloat(product.price)) ? '0' : parseFloat(product.price)}} руб</span>
                          <button class="btn btn-primary btn-pr-buy">Купить</button>
                        </div>
                      </div>
                    </nuxt-link>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-12 col-12">
                <div class="blog-navigation link-navigation">
                  <b-pagination-nav
                    v-if="productCount > maxProductPerPage"
                    :link-gen="pageLink"
                    :number-of-pages="productCount < maxProductPerPage ? 1 : Math.ceil(productCount / maxProductPerPage)" use-router>
                  </b-pagination-nav>
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
  import SectionTree from '~/components/SectionTree.vue'
  import Loader from '~/components/Loader.vue'
  import BasketPrice from "../../../../components/BasketPrice";

  export default {
    components: {
      BasketPrice,
      SectionTree, Loader
    },
    head() {
      return {
        title: this.title + ' - Интернет-магазин автозапчастей в Казани - ТЕЛЕФОНПОМЕНЯТЬ'
      }
    },
    data() {
      return {
        currentGoods: [],
        productCount : 1,
        loading: false,
        maxProductPerPage: 15,
        currentSection: null,
        carInfo: null
      }
    },
    created() {
      this.loading = true;
    },
    mounted() {
      let selectedManufacturer = this.$route.params.auto
      let selectedModel = this.$route.params.model
      let selectedModification = JSON.parse(localStorage.getItem(this.$route.params.modification))
      let selectedProduct = this.$route.params.id
      if(!this.$route.query.page) {
        api.getChildSection(selectedModification.id, selectedProduct)
          .then(response => {
            this.currentGoods = response;
            this.productCount  = parseInt(response.count);
            console.log('created', this.productCount);
            delete this.currentGoods.count;
            return api.getSectionById(selectedProduct, selectedModification.id)
          })
          .then(response => {
            this.currentSection = response;
            return api.getCarInfoByModificationId(selectedModification.id)
          })
          .then(response => {
            this.carInfo = response;
            this.loading = false
            console.log(this.carInfo)
          })
          .catch(error => {
            return this.$nuxt.error({ statusCode: 404, message: error })
          })
      } else {
        api.getChildSection(selectedModification.id, selectedProduct, this.$route.query.page)
          .then(response => {
            this.currentGoods = response;
            this.productCount  = response.count;
            delete this.currentGoods.count;
            return api.getSectionById(selectedProduct, selectedModification.id)
          })
          .then(response => {
            this.currentSection = response;
            return api.getCarInfoByModificationId(selectedModification.id)
          })
          .then(response => {
            this.carInfo = response;
            this.loading = false
          })
          .catch(error => {
            return this.$nuxt.error({ statusCode: 404, message: error })
          })
      }
    },
    computed: {
      page () {
        return this.$route.query.page || 1
      },
      title() {
        if(this.currentSection && this.currentSection.description) {
          return `${this.currentSection && this.currentSection.description} для ${this.carInfo && this.carInfo.modification.fulldescription}`
        }
        else {
          return 'Интернет-магазин автозапчастей в Казани - ТЕЛЕФОНПОМЕНЯТЬ'
        }
      },
      sectionName() {
        return ''
      },
    },
    methods: {
      pageLink(pageNum) {
        return {
          path: `?page=${pageNum}`
        }
      },
      productImage(product) {
        let image = product.images ? product.images[0] && product.images[0].PictureName : '';
        let ext = image ? image.split('.')[1] : '';
        return image && (ext === 'PNG' || ext === 'png' || ext === 'jpg' || ext === 'JPG') ? `${api.baseUrl}/auto/${image.split('_')[0]}/${image.split('.')[0]}.${ext.toLowerCase()}` : '/images/cart/cart.png';
      }
    },
    watch: {
      page() {
        this.loading = true;
        api.getChildSection(this.$route.params.modification, this.$route.params.id, this.page)
          .then(response => {
            this.currentGoods = response;
            this.productCount  = parseInt(response.count);
            console.log('watch', this.productCount);
            delete this.currentGoods.count;
            this.loading = false
          })
      }
    }
  }
</script>

<style lang="scss">
  .products-list-title {
    h3 {
      height: 72px;
      font-size: 16px;
      text-decoration: underline;
      font-weight: 700;
    }
  }
  .products-list-img {
    max-height: 199px;
    height: 199px;
    overflow: hidden;

  }
  .products-list-2 {
    height: 468px;

  }
  @media screen  and (max-width: 1000px){
    .products-list-img{
      height: 100px;
    }
    .products-list-2 {
      height: 400px;
    }
  }
</style>

