<template>

  <div id="editor">

    <GlobalEvents
      @:keydown.space="dragmodeon"
      @:keyup.space="dragmodeoff"
    />

    <div class="menu">
      <div class="work">

        <div v-for="(menuc,index) in menu" :class="index + 'menu menupart'">

          <div v-for="item in menuc" v-if="item.active" class='item' :menuitem="item.id" :menu="index" :right="item.right || 'false'" @click="menuclick($event, index, item.id)">

            <div class="itemcnt">
              <div>
                <div class="icon">
                  <i :class="item.icon"></i>
                </div>

                <div class="text">
                  {{item.text.toUpperCase()}}
                </div>
              </div>

            </div>

          </div>

        </div>

      
      </div>
    </div>

    <div class="workspace">
    </div>

    <div class="zoommenu">
      <div class="work">

        <div class="item empty">
          <div class="itemcnt">
            <div>
             
            </div>

          </div>
        </div>

        <div class="item" @click="zoomout">
          <div class="itemcnt">
            <div>
              <div class="icon">
                <i class="fas fa-search-minus"></i>
              </div>
            </div>

          </div>
        </div>

        <div class="item" @click="zoomin">
          <div class="itemcnt">
            <div>
              <div class="icon">
                <i class="fas fa-search-plus"></i>
              </div>
            </div>
          </div>
        </div>

        <div class="item" @click="zoom100">
          <div class="itemcnt">
            <div>
              <div class="text">
                {{zoom.toFixed(0)}} %
              </div>
            </div>
          </div>
        </div>


        
        
      </div>
    </div>

    <div class="modals">
      <editorModalAdd @addimage="addimage" @addtext="addtext" @close="closeModal('add')" v-if="modals.add"/>
    </div>

  </div>
</template>

<script src="./index.js"></script>
<style scoped lang="sass" src="./index.sass"></style>

