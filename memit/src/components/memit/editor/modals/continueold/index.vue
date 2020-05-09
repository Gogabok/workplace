<template>
  <div id="modalContinueOld" >
    <modal @close="close">
      <template v-slot:header>Would you like to continue old project?</template>
      <template v-slot:body>
        
          <div class="item" @click="continueold">
            <div class="mwork">
              <div class="label">
                Continue
              </div>
            </div>
          </div>

          <div class="item" @click="createnew">
            <div class="mwork">
              <div class="label">
                Create new
              </div>
            </div>
          </div>
       
      </template>
      <template v-slot:footer></template>
    </modal>
  </div>
</template>

<script src="./index.js"></script>
<style scoped lang="sass" src="./index.sass"></style>

