<template>
    <div id="preloader" v-if="run">
        <div id="loader">
            <div class="line-scale">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    </div>
</template>
<script>
  import eventsBus from '@/api/events';

  export default {
    data: () => {
      return {
        run: true
      }
    },
    created() {
      eventsBus.$on('page-ready', type => {
        this.run = false;
      });
    }
  }
</script>