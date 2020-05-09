<template>
  <div id="colorModal">
    <modal @close="close" :removeclose="true">
      <template v-slot:header>{{caption}}</template>
      <template v-slot:body>
        
          <vuecolor :value="color" @input="update"/>
       
      </template>
      <template v-slot:footer>
        <button @click="select">
          <i class="fas fa-check"></i> Select
        </button>
      </template>
    </modal>
  </div>
</template>

<script src="./index.js"></script>
<style lang="sass" src="./index.sass"></style>

