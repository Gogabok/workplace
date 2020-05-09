<template>
  <div id="rx-user">
    <div class="work">

      <div class="contents">
        <div class="main">

          <div v-for="item in contents" class="item">
            {{item.name}}
          </div>

        </div>

        <div class="second">

          <div class="item">
            Sign out
          </div>
          
        </div>
        
      </div>

      <div class="pagecontent">
      </div>

    </div>
    
  </div>
</template>

<script src="./index.js"></script>
<style scoped lang="sass" src="./index.sass"></style>

