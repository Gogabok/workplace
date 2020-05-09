<template>
  <div class="userpic">
    <div v-if="fl">
      {{fl}}
    </div>
    <div v-else>
      <i class="fas fa-user"></i>
    </div>
  </div>
</template>

<script src="./index.js"></script>
<style scoped lang="sass" src="./index.sass"></style>

