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
  head() {
    return {
      title: this.title
    }
  },
  data() {
    return {
      currentModifications: [],
      loading: true,
      title: ''
    };
  },
  mounted() {
    let model = this.$store.getters["getSelectedModel"] ? this.$store.getters["getSelectedModel"] : JSON.parse(localStorage.getItem(this.$route.params.model))
    let selectedManufacturer = this.$route.params.auto
      if (model) {
        api
          .getModifications(selectedManufacturer, model.description)
          .then(response => {
            this.currentModifications = response;
            this.loading = false;
              this.title = `Запчасти для ${model.fulldescription} - Интернет-магазин автозапчастей в Казани - ТЕЛЕФОНПОМЕНЯТЬ`
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.$router.push("/");
      }
    if(!this.$store.getters["getSelectedModel"] && !this.$store.getters.getSelectedManufacturer) {
      let manufacturerObj = JSON.parse(localStorage.getItem(this.$route.params.auto))

      this.$store.commit('setSelectedModel', model)
      this.$store.commit('setSelectedManufacturer', manufacturerObj)
    }
  },
  created() {
    this.loading = true;
  },
  methods: {
    routeToGarage(selectedModification) {
      const manufacturer = this.$store.getters.getSelectedManufacturer;
      this.$store.commit("setSelectedModification", selectedModification);
      localStorage.setItem(selectedModification.fulldescription, JSON.stringify(selectedModification))
      let garageRoute = selectedModification.fulldescription
      console.log
      this.$router.push(this.$route.fullPath + '/' + garageRoute)
    },
    transliterate(payload) {
      let word = payload
        .toLowerCase()
        .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "")
        .replace(/ /g, "_");
      let a = {
        Ё: "YO",
        Й: "I",
        Ц: "TS",
        У: "U",
        К: "K",
        Е: "E",
        Н: "N",
        Г: "G",
        Ш: "SH",
        Щ: "SCH",
        З: "Z",
        Х: "H",
        Ъ: "'",
        ё: "yo",
        й: "i",
        ц: "ts",
        у: "u",
        к: "k",
        е: "e",
        н: "n",
        г: "g",
        ш: "sh",
        щ: "sch",
        з: "z",
        х: "h",
        ъ: "'",
        Ф: "F",
        Ы: "I",
        В: "V",
        А: "a",
        П: "P",
        Р: "R",
        О: "O",
        Л: "L",
        Д: "D",
        Ж: "ZH",
        Э: "E",
        ф: "f",
        ы: "i",
        в: "v",
        а: "a",
        п: "p",
        р: "r",
        о: "o",
        л: "l",
        д: "d",
        ж: "zh",
        э: "e",
        Я: "Ya",
        Ч: "CH",
        С: "S",
        М: "M",
        И: "I",
        Т: "T",
        Ь: "'",
        Б: "B",
        Ю: "YU",
        я: "ya",
        ч: "ch",
        с: "s",
        м: "m",
        и: "i",
        т: "t",
        ь: "'",
        б: "b",
        ю: "yu"
      };
      return word
        .split("")
        .map(function(char) {
          return a[char] || char;
        })
        .join("");
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