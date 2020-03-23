<template>
    <main class="main">
      <div class="container">
        <div class="column-models">
          <div class="column-models__title">Модели</div>
          <div class="column-models__inner" v-if="currentModels.length > 0">
            <a @click.prevent="loadModifications(model)" href="#" v-for="model in currentModels" :key="model.description">
              {{model.description}}
            </a>
          </div>
          <div class="column-models__inner" v-else>
            <p>Извините, для данного бренда отсутсвуют модели</p>
            <nuxt-link to="/" tag="a" style="text-decoration: underline;">Вернуться</nuxt-link>
          </div>
        </div>
      </div>
      <loader v-if="loading"></loader>
    </main>
</template>



<script>
  import api from '~/assets/js/api.js'
  import Loader from '~/components/Loader.vue'
  export default {
    head() {
      return {
        title: this.title
      }
    },
    components: {
      Loader
    },
    created() {
      const manufacturer = this.$store.getters.getSelectedManufacturer ? this.$store.getters.getSelectedManufacturer.description : this.$route.params.auto

      this.title = `Запчасти для ${manufacturer} - Интернет-магазин автозапчастей в Казани - ТЕЛЕФОНПОМЕНЯТЬ`
      api.getModels(manufacturer)
        .then(response => {
          this.currentModels = [...response]
          this.loading = false
        })
        .catch(error => {
          console.log(error)
        })
    },
    data() {
      return {
        currentModels: [],
        loading: true,
        title: ''
      }
    },
    mounted() {
      if(!this.$store.getters.getSelectedManufacturer) {
        let manufacturerObj = JSON.parse(localStorage.getItem(this.$route.params.auto))
        this.$store.commit('setSelectedManufacturer', manufacturerObj)
      }
    },
    methods: {
      loadModifications(model) {
        this.selectedModel = model
        localStorage.setItem(model.description, JSON.stringify(model))
        this.$store.commit('setSelectedModel', model)
        this.loading = true
        // let modelRoute = this.transliterate(model.description)
        let modelRoute = model.description.replace('/', '%2F')
        this.$router.push(this.$route.fullPath + '/' + modelRoute)
      },
      // transliterate(text, engToRus) {
      //   var
      //       rus = "щ   ш  ч  ц  ю  я  ё  ж  ъ  ы  э  а б в г д е з и й к л м н о п р с т у ф х ь".split(/ +/g),
      //       eng = "shh sh ch cz yu ya yo zh `` y' e` a b v g d e z i j k l m n o p r s t u f x `".split(/ +/g);
      //   var x;
      //   for(x = 0; x < rus.length; x++) {
      //     text = text.split(engToRus ? eng[x] : rus[x]).join(engToRus ? rus[x] : eng[x]);
      //     text = text.split(engToRus ? eng[x].toUpperCase() : rus[x].toUpperCase()).join(engToRus ? rus[x].toUpperCase() : eng[x].toUpperCase());
      //   }
      //     return text;
      // }
    },
    // middleware: 'autoGuard'
  }
</script>

<style lang="sass" scoped>
  .main
    background-color: #0f141d
    padding: 20px 0
  .column-models
    display: flex
    flex-direction: column
    align-items: center
    &__inner
      display: flex
      flex-direction: column
      align-items: center
      background: #fff
      border-radius: 2px
      max-height: 350px
      overflow-y: scroll
      padding: 20px
      width: 400px
      text-align: center
    &__inner > a:first-of-type ~ *
      margin-top: 5px
    &__inner > a:hover
      color: #E62E04
    &__title
      letter-spacing: 0.02em
      font-size: 1.125em
      text-align: center
      color: #ffffff
      cursor: pointer
      border-radius: 6px 6px 0 0
      padding: 1.375rem 60px
      background-color: #e62e04
</style>

