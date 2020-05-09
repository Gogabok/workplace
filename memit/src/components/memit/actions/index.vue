<template>
  <div id="actions">
    <div class="actionsflexbox">
      <div class="action" v-for="action in actions">
        <router-link :to="{path : 'editor', params : action.id}">
          <div class="actioncnt">
            <div class="actioncnttext">
              <div class="icon" v-html="action.icon"></div>
              <div class="namce"> {{ $t(action.name) }} </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
    
  </div>
</template>

<script src="./index.js"></script>
<style scoped lang="sass" src="./index.sass"></style>

