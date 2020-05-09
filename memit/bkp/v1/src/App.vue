<template>
  <div id="app">

    <rxmenu/>

    <div class="content">
      <router-view/>
    </div>

    <rxfooter/>


  </div>

</template>

<script>

import rxfooter from '@/components/rx/footer/index.vue'
import rxmenu from '@/components/rx/menu/index.vue'


export default {
    components: {
      rxfooter,
      rxmenu
    }
}

</script>

<style lang="sass" src="./index.sass"></style>


