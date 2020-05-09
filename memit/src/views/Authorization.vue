<template>
  <div class="authorizationpage">

    <div>
      <authorization caption="message.signin"/>
    </div>

  </div>
 
</template>

<script>
// @ is an alias to /src
import authorization from '@/components/common/authorization/index.vue'

export default {
  name: 'authorizationpage',
  components: {
    authorization
  }
}
</script>