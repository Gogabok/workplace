<template>
  <div class="home">
    <section-one></section-one>
    <section-two></section-two>
    <section-three></section-three>
    <section-four></section-four>
    <app-footer></app-footer>
  </div>
</template>

<script>

import AppFooter from '../components/pages/appfooter'

import sectionOne from '../components/pages/home-sections/section-1'
import sectionTwo from '../components/pages/home-sections/section-2'
import sectionThree from '../components/pages/home-sections/section-3'
import sectionFour from '../components/pages/home-sections/section-4'

export default {
  name: 'Home',
  components: {
    AppFooter, sectionOne, sectionTwo, sectionThree, sectionFour
  }
}
</script>
