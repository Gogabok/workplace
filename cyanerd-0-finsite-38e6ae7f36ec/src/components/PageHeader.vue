<template>
    <header class="header">
        <preloader/>
        <div class="header__content row">
            <div class="menu-button-container">
                <a href="#" class="menu-button" @click.prevent="showMenu"></a>
            </div>
            <div class="auth-container">
                <router-link to="/login" class="login" v-if="user === null"></router-link>
                <template v-else>
                    <a href="#" class="logout" @click.prevent="showLogoutModal"
                       v-if="this.$route.name === 'profile'"></a>
                    <router-link to="/profile" class="user-pic" v-else></router-link>
                </template>
            </div>
            <div class="header__logo">
                <router-link class="logo" v-on:click.native="closeSiteMenu" to="/">{{$config.site.title}}</router-link>
            </div>
            <nav class="header__nav-wrap" v-if="this.$route.meta.layout === 'index'">
                <ul class="header__nav">
                    <li class="current">
                        <router-link class="logo" to="/">Новые возможности ваших финансов.</router-link>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
</template>

<script>
  import eventsBus from '@/api/events';
  import Preloader from '@/components/base/Preloader';

  export default {
    data: () => {
      return {
        modal: false
      }
    },
    components: {Preloader},
    computed: {
      user() {
        return this.$store.state.user;
      }
    },
    async created() {
      if (this.$config.production) await this.$store.dispatch('getUser');
    },
    methods: {
      showLogoutModal() {
        eventsBus.$emit('show-modal', 'logout');
      },
      showMenu() {
        document.body.classList.toggle('active-menu');
      },
      closeSiteMenu() {
        document.body.classList.remove('active-menu');
      }
    }
  }
</script>