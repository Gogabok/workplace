<template>
  <div class="home">
    <section-one></section-one>
    <section-two></section-two>
  </div>
</template>

<script>

import sectionOne from '../components/pages/home-sections/section-1'
import sectionTwo from '../components/pages/home-sections/section-2'

export default {
  name: 'Home',
  components: {
    sectionOne, sectionTwo
  }
}
</script>
