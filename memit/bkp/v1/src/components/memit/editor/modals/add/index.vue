<template>
  <div id="editorModalAdd" >
    <modal @close="close">
      <template v-slot:header>Add media</template>
      <template v-slot:body>
        
          <div class="item">
            <fileuploader @loaded="addimage" v-bind:multiple='false' extensions="jpg,png,bmp,jpeg" v-bind:maxsize='10'>
              <template v-slot:content>
                <div class="mwork">
                  <div class="label">
                    Load picture
                  </div>
                </div>
              </template>
            </fileuploader>
          </div>

          <div class="item" @click="addtext">
            <div class="mwork">
              <div class="label">
                Add text Label
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

