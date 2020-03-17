<template>
  <main class="main">
    <section class="hero hero--delivery" style="background-image: url(/images/hero-delivery.jpg)">
      <basket-price></basket-price>
      <div class="container">
        <div class="hero__inner">
          <h1 class="hero__title">МОЙ ГАРАЖ</h1>
          <form class="hero__search">
            <div class="form__group">
              <div class="form__group-input"><input type="text" name="hero-search" placeholder="Поиск по артикулу или названию товара"></div>
            </div><button class="btn btn--upper hero__search-btn">Найти</button>
          </form>
        </div>
      </div>
    </section>
    <section class="garage inner inner--flex inner--delivery">
      <div class="container">
        <div class="row">
          <div class="col-sm-12">
            <div class="inner__top">
              <h1 class="inner__title">Мой гараж</h1>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6">
            <div class="garage-info">
              <div class="garage-info-car">
                <span>{{selectedManufacturer.description}}</span>
                <span>{{selectedModel.description}}</span>
                <span>{{selectedModification.fulldescription}}</span>
              </div>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="garage-img-car">
              <img src="/images/garage/garage-img-car.png" alt="photo">
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="garage-catalog inner inner--flex inner--delivery">
      <div class="container">
        <div class="row">
          <div class="col-sm-12">
            <div class="inner__top">
              <h1 class="inner__title">{{selectedModification.fulldescription}}</h1>
              <ul class="breadcrumbs">
                <li><nuxt-link to="/">Главная</nuxt-link></li>
                <li><nuxt-link to="/garage">Гараж</nuxt-link></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="row" v-for="section in currentSections" :key="section.parent.id">
          <div class="col-sm-12">
            <div class="garage-catalog-title">
              <h4>{{section.parent.description}}</h4>
            </div>
            <div class="row">
              <div class="col-sm-2" v-for="child in section.children" :key="child.parent.id" @click="routeToChildrenProducts(child.parent.passangercarid, child.parent.number, child.parent.description)">
                <div class="garage-catalog-product">
                  <h6>{{child.parent.description}}</h6>
                  <div class="garage-catalog-product-img">
                    <img src="/images/garage/product.png">
                  </div>
                  <button class="btn btn-primary">Перейти в каталог</button>
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
  import BasketPrice from "../../../../components/BasketPrice";
  export default {
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
        selectedManufacturer: this.$store.getters.getSelectedManufacturer,
        selectedModel: this.$store.getters.getSelectedModel,
        selectedModification: this.$store.getters.getSelectedModification,
        currentSections: [],
        loading: false,
        title: ''
      }
    },
    created() {
      this.loading = true;
      let pageTitle = this.$store.getters.getSelectedModification.fulldescription
      this.title = `Запчасти для ${pageTitle} - Интернет-магазин автозапчастей в Казани - ТЕЛЕФОНПОМЕНЯТЬ`
      api.getGarageSections(this.$store.state.selectedModification.id)
        .then(response => {
          this.$store.commit('setSections', response);
          this.currentSections = response;
          this.loading = false
        })
    },
    mounted() {},
    middleware: 'garageGuard',
    computed: {},
    methods: {
      routeToChildrenProducts(sectionChildId, parentId, sectionDescription) {
        this.$router.push({name: 'catalog-modification-section-id', params: {
          id: parentId,
          parentId: sectionChildId,
          modification: this.$store.state.selectedModification.id,
          sectionDescription: sectionDescription
        }})
      }
    }
  }
</script>

<style lang="sass">

</style>

