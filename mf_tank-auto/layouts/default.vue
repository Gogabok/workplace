<template lang="pug">
  #page.page.flex.fd-c.jc-sb
    app-header
    nuxt
    app-footer
    hidden

</template>
<script>
  import AppHeader from "../components/AppHeader";
  import AppFooter from "../components/AppFooter";
  import Hidden from "../components/Hidden";
  export default{
    components: {
      AppHeader, AppFooter, Hidden
    }
  }
</script>
<style>

</style>

