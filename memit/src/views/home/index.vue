<template>
  <div class="home">
    <div class="work">
      <div class="sections">

       

        <div class="section">
          <div class="search">
            <div class="caption">
              Fast meme
            </div>
            <div class="sectioncnt">
              <memesearch/>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="actions">
            <div class="caption">
              Actions
            </div>
            <div class="sectioncnt">
              <actions/>
            </div>
          </div>
        </div>

        <!--<div class="recent">
          <div class="caption">
            Recent
          </div>
        </div>-->

        <div class="section">
          <div class="activities">
            <div class="caption">
              Your memes
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped lang="sass" src="./index.sass"></style>

<script>

import actions from '@/components/memit/actions/index.vue'
import memesearch from '@/components/memit/memesearch/index.vue'

export default {
  name: 'home',
  components: {
    actions,
    memesearch
  }
}
</script>
