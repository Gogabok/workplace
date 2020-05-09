<template>
  <div class="editor">

    <editor/>
     
  </div>
</template>

<style scoped lang="sass" src="./index.sass"></style>

<script>

import editor from '@/components/memit/editor/index.vue'

export default {
  name: 'home',
  components: {
    editor
  }
}
</script>
