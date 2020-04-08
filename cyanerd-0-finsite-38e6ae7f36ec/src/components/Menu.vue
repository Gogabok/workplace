<template>
    <div class="menu">
        <div class="main-nav-container">
            <ul class="main-nav" v-if="categories">
                <li v-for="category in categories" :key="'category-' + category.id">
                    <router-link
                            :class="{active: active === category.code}"
                            :to="'/category/'+category.code"
                            :data-color="category.color">{{category.name}}
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="sub-nav-container">
            <ul class="sub-nav">
                <li><router-link to="/about">О сервисе</router-link></li>
                <li><a href="/upload/oferta.pdf">Оферта</a></li>
                <li><router-link to="/feedback">Контакты</router-link></li>
            </ul>
        </div>

        <div class="menu-copyright">
            © Любое использование либо копирование материалов сайта, элементов дизайна и оформления допускается лишь
            с письменного разрешения правообладателя и при указании ссылки на первоисточник
        </div>
    </div>
</template>
<script>
  import request from '@/api/axios';

  export default {
    data: () => {
      return {
        categories: [],
        active: null
      }
    },
    watch: {
      $route(to, from) {
        this.setCurrentCategory(to.path);
      }
    },
    async created() {
      this.categories = (await request({action: 'get_articles'}))?.data?.categories;
      this.setCurrentCategory(this.$route.path);
    },
    methods: {
      setCurrentCategory(path) {
        if (path && path.indexOf('/category/') > -1) {
          const category = this.categories.find(category => category.code === path.replace('/category/', ''));
          if (category) {
            this.active = category.code;
          } else {
            this.active = null;
          }
        } else {
          this.active = null;
        }
      }
    }
  }
</script>

<style>
    .menu {
        display: none;
        position: absolute;
        left: 0;
        z-index: 99;
        width: 100%;
        top: 0;
        min-height: 100vh;
        min-height: -webkit-fill-available;
        background-color: #fff;
        padding: 0 16px;
        padding-top: 81px;
        flex-direction: column;
        justify-content: space-between;
        box-sizing: border-box;
    }

    body.active-menu .menu {
        display: flex;
    }

    body.active-menu .main-content {
        display: none;
    }

    body.active-menu .menu-button:before,
    body.active-menu .menu-button:after {
        background-color: #000;
    }

    body.active-menu .menu-button:after {
        width: 12px;
    }

    .menu-copyright {
        margin-top: 20px;
        transition: opacity ease 0.3s;
        font-size: 14px;
        line-height: 16px;
        color: #111;
        opacity: 0.5;
        padding: 20px 0;
        margin-right: 4px;
        border-top: 1px solid #888;
    }

    .main-nav-container {
        padding-bottom: 50px;
    }

    body.active-menu .login,
    body.active-menu .user-pic,
    body.active-menu .logout {
        filter: invert(100%);
        -webkit-filter: invert(100%);
    }

    body.active-menu .header-container {
        background-color: #fff;
        color: #000;
        z-index: 100;
    }

    .main-nav {
        font-family: 'YesevaOne';
        font-size: 48px;
        line-height: 55px;
        color: #111;
        padding-top: 34px;
    }

    .main-nav li {
        margin-top: 24px;
    }

    .main-nav li:first-child {
        margin-top: 0;
    }

    .main-nav li a {
        color: #111;
        transition: color ease 0.3s;
    }

    .main-nav li:nth-child(1) a:hover,
    .main-nav li:nth-child(1) a.active {
        color: #18CE56;
    }

    .main-nav li:nth-child(2) a:hover,
    .main-nav li:nth-child(2) a.active {
        color: #149FED;
    }

    .main-nav li:nth-child(3) a:hover,
    .main-nav li:nth-child(3) a.active {
        color: #EDB014;
    }

    .main-nav li:nth-child(4) a:hover,
    .main-nav li:nth-child(4) a.active {
        color: #ED66A1;
    }

    .sub-nav-container {
        padding-bottom: 30px;
    }

    .sub-nav li:first-child {
        margin-top: 0;
    }

    .sub-nav li {
        margin-top: 10px;
    }

    .sub-nav li a {
        transition: opacity ease 0.3s;
        font-size: 14px;
        line-height: 16px;
        color: #111;
        opacity: 0.5;
    }

    .sub-nav li a:hover {
        opacity: 1;
    }
</style>