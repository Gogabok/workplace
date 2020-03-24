<template>
  <div class="page flex fd-c jc-sb" id="page">
    <AppHeader></AppHeader>
    <nuxt/>
    <AppFooter></AppFooter>
    <Hidden></Hidden>
  </div>
</template>
<script>
import AppHeader from "../components/AppHeader";
import AppFooter from "../components/AppFooter";
import Hidden from "../components/Hidden";
export default {
  components: {
    AppHeader,
    AppFooter,
    Hidden
  }
};
</script>
<style>
</style>

