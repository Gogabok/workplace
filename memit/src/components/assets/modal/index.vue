<template>
  <transition name="fade">
    <div id="modal" class="modal-backdrop">
      <div class="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">

        <div class="modal-header" id="modalTitle">
          <slot name="header">
            Header            
          </slot>
        </div>

        <div class="modal-body" id="modalDescription">
          <slot name="body">
            Body!
          </slot>
        </div>

        <div class="modal-footer">
            <slot name="footer"/> 
            <div v-if="!removeclose">
              <button @click="close">
                <i class="fas fa-times"></i> Close
              </button>
            </div>
        </div>

        <div class="modal-close" @click="close">
          <i class="fas fa-times"></i>
        </div>

      </div>
    </div>
  </transition>
</template>

<script src="./index.js"></script>
<style  lang="sass" src="./index.sass"></style>

