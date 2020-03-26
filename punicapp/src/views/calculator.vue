<template>
  <div class="calculator">
    <app-header></app-header>
    <price-calculate></price-calculate>
    <app-footer></app-footer>
  </div>
</template>

<script>
// @ is an alias to /src
import PriceCalculate from "../components/pages/PriceCalculate";
import AppHeader from "../components/pages/appheader";
import AppFooter from "../components/pages/appfooter";

export default {
  name: "Calculator",
  components: {
    PriceCalculate, AppHeader, AppFooter
  }
};
</script>
