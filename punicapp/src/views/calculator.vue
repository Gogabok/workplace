<template>
  <div class="home">
    <price-calculate></price-calculate>
    <app-footer></app-footer>
  </div>
</template>

<script>
// @ is an alias to /src
import PriceCalculate from "../components/pages/PriceCalculate";
import AppFooter from "../components/pages/appfooter";

export default {
  name: "Calculator",
  components: {
    PriceCalculate, AppFooter
  }
};
</script>
