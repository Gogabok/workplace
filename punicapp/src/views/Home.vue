<template>
  <div class="home">
    <section-one></section-one>
    <section-two></section-two>
    <section-three></section-three>
  </div>
</template>

<script>

import sectionOne from '../components/pages/home-sections/section-1'
import sectionTwo from '../components/pages/home-sections/section-2'
import sectionThree from '../components/pages/home-sections/section-3'

export default {
  name: 'Home',
  components: {
    sectionOne, sectionTwo, sectionThree
  }
}
</script>
