<template>
  <main class="main">
    <div class="container">
      <div class="column-models">
        <div class="column-models__title">Модификации</div>
        <div class="column-models__inner">
          <a
            @click.prevent="routeToGarage(modification)"
            href="#"
            v-for="modification in currentModifications"
            :key="modification.description"
          >{{modification.fulldescription}}</a>
        </div>
      </div>
    </div>
    <loader v-if="loading"></loader>
  </main>
</template>

<script>
import api from "~/assets/js/api.js";
import Loader from "~/components/Loader.vue";
export default {
  components: {
    Loader
  },
  name: "model-modifications",
  // middleware: 'autoGuard',
  data() {
    return {
      currentModifications: [],
      loading: true
    };
  },
  created() {
    let model = this.$store.getters["getSelectedModel"];
    this.loading = true
    if (model) {
      api
        .getModifications(model.id)
        .then(response => {
          this.currentModifications = response;
          this.loading = false;
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      this.$router.push("/");
    }
  },
  methods: {
    routeToGarage(selectedModification) {
      const manufacturer = this.$store.getters.getSelectedManufacturer;
      this.$store.commit("setSelectedModification", selectedModification);
      this.$router.push({
        name: "garage",
        // params: {
          selectedManufacturer: manufacturer,
          selectedModel: this.selectedModel,
          selectedModification: selectedModification
        // }
      });
    }
  }
};
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