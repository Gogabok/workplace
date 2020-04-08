<template>
    <div>
        <site-menu/>
        <div class="s-pageheader" id="top">
            <page-header/>
        </div>
        <section class="s-content s-content--narrow">
            <div class="row">
                <div class="form">
                    <div class="profile-container">
                        <slot/>
                    </div>
                </div>
            </div>
        </section>
        <page-footer/>
    </div>
</template>
<script>
  import eventsBus from '@/api/events';
  import PageHeader from '../components/PageHeader';
  import PageFooter from '../components/PageFooter';
  import Menu from '@/components/Menu';

  export default {
    data: () => {
      return {}
    },
    components: {
      PageHeader,
      PageFooter,
      siteMenu: Menu
    },
    mounted() {
      eventsBus.$emit('page-ready');
    }
  }
</script>