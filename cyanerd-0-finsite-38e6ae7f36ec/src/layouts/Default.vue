<template>
    <div>
        <site-menu/>
        <div class="s-pageheader" id="top">
            <page-header/>
        </div>
        <section class="s-content s-content--narrow" :class="{black: this.$route.name !== 'article'}">
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
  import PageHeader from '../components/PageHeader';
  import PageFooter from '../components/PageFooter';
  import Menu from '@/components/Menu';

  export default {
    components: {
      PageHeader,
      PageFooter,
      siteMenu: Menu
    }
  }

</script>