<template>
  <div class="loader">
    <div class="lds-dual-ring"></div>
  </div>
</template>

<script>
  export default {
    name: 'Loader',
    components: {},
    props: {
    },
    data() {
      return {
      }
    }
  }
</script>

<style scoped lang="scss">
  .loader {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(255,255,255, 0.75);
    z-index: 999999;
  }
  .lds-dual-ring {
    display: inline-block;
    width: 80px;
    height: 80px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .lds-dual-ring:after {
    content: " ";
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #fff;
    border-color: #fff transparent #fff transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }
  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
