<template>
  <div class="page flex fd-c jc-sb" id="page">
    <app-header></app-header>
    <nuxt></nuxt>
    <app-footer></app-footer>
    <hidden></hidden>
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

