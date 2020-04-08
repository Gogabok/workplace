<template>
    <div>
        <site-menu/>
        <slot/>
    </div>
</template>
<script>
  import Menu from '@/components/Menu';

  export default {
    data: () => {
      return {}
    },
    components: {
      siteMenu: Menu
    }
  }
</script>