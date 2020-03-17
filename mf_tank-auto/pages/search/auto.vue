<template lang="pug">
  main.main
    .container
      .column-models
        .column-models__title {{selectedTab === 'models' ? 'Модели' : 'Модификации'}}
        .column-models__inner(v-if="selectedTab === 'models'")
          a(@click="loadModifications(model)" href="#" v-for="model in currentModels" :key="model.description") {{model.description}}
        .column-models__inner(v-if="selectedTab === 'modifications'")
          a(@click="routeToGarage(modification)" href="#" v-for="modification in currentModifications" :key="modification.description") {{modification.fulldescription}}
    loader(v-if="loading")
</template>

<script>
  import api from '~/assets/js/api.js'
  import Loader from '~/components/Loader.vue'
  export default {
    components: {
      Loader
    },
    created() {
      const manufacturer = this.$store.getters.getSelectedManufacturer
      api.getModels(manufacturer.id)
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
        currentModifications: [],
        selectedTab: 'models',
        selectedModel: null,
        loading: true
      }
    },
    mounted() {

    },
    methods: {
      loadModifications(model) {
        this.selectedModel = model
        this.$store.commit('setSelectedModel', model)
        this.loading = true
        api.getModifications(model.id)
          .then(response => {
            this.selectedTab = 'modifications'
            this.currentModifications = response
            this.loading = false
          })
          .catch(error => {
            console.log(error)
          })

      },
      routeToGarage(selectedModification) {
        const manufacturer = this.$store.getters.getSelectedManufacturer
        this.$store.commit('setSelectedModification', selectedModification)
        this.$router.push({name: 'garage', params: {
          selectedManufacturer: manufacturer,
          selectedModel: this.selectedModel,
          selectedModification: selectedModification
        }})
      },
    },
    middleware: 'autoGuard'
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

