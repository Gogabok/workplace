<template>
    <div id="app">
        <component :is="layout">
            <router-view/>
        </component>
    </div>
</template>

<script>
  const DEFAULT_LAYOUT = 'default'; // todo: вынести в отдельный файл

  export default {
    name: 'app',
    computed: {
      layout() {
        return (this.$route.meta.layout || DEFAULT_LAYOUT) + '-layout';
      }
    }
  }
</script>

<style src='./assets/css/fonts.css'></style>
<style src='./assets/css/media.css'></style>
<style src='./assets/css/base.css'></style>
<style src='./assets/css/vendor.css'></style>
<style src='./assets/css/main.css'></style>
<style src='./assets/css/styles.css'></style>