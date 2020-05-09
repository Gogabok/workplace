<template>
  <div id="rx-menu">

      <div class="work">

        <div class="sections">

          <div class="section">
            <div class="items">
              <div class="item">
                <div class="logo">
                  <img src="@/assets/memit20.png">
                </div>
              </div>
             
            </div>
          </div>

          <div class="section">
            <div class="items center">
              <div class="item">
                
              </div>
            </div>
          </div>
          <!--
          <div class="section">
            <div class="items right">
              
              <div v-if="auth == 1" class="item">
                <router-link to="/user">
                  <userpic/>
                </router-link>
              </div>
              <div v-if="auth == 2" class="item">
                <linepreloader/>
              </div>
              <div v-if="auth < 1" class="item">
                <router-link to="/authorization">
                  Sign in
                </router-link>
              </div>
              
            </div>
          </div> -->

        </div>
      </div>

  </div>
</template>

<script src="./index.js"></script>
<style scoped lang="sass" src="./index.sass"></style>

