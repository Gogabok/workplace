<template>
    <div>
        <div class="s-pageheader s-pageheader--home" id="top">
            <page-header/>
            <div class="pageheader-content row" v-if="articles.special">
                <div class="col-full">
                    <div
                            class="active-color-tab active"
                            :style="'background: ' + category.color + ';'"
                            v-if="category !== null">
                        <span>{{ category.name }}</span> <router-link to="/" class="close"></router-link>
                    </div>
                    <div class="featured">
                        <template v-for="(article, index) in articles.special">
                            <div class="featured__column" :class="{
                            'featured__column--big': !index,
                            'featured__column--small': index,
                        }" :key="'article-special-'+article.id">
                                <router-link tag="div" class="entry"
                                     :to="article.url"
                                     :style="{'background-image': 'url(\''+$config.hostname+article.image+'\')'}">
                                    <div class="entry__content">
                                <span class="entry__category">
                                    <router-link :to="article.url"
                                       :style="'background-color: '+article.categoryData.color+'!important;'">{{article.categoryData.name}}</router-link>
                                </span>
                                        <h1><router-link :to="article.url" :title="article.name">{{article.name}}</router-link></h1>
                                        <div class="entry__info">
                                            <ul class="entry__meta">
                                                <li>{{article.date}}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </router-link>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>

        <section class="s-content" v-if="articles.simple">
            <div class="row masonry-wrap">
                <div class="masonry" v-masonry="articlesContainer" transition-duration="0.3s"
                     item-selector=".masonry__brick-item">
                    <div class="grid-sizer"></div>
                    <div v-masonry-tile class="masonry__brick-item"
                         v-for="article in articles.simple"
                         :key="'article-simple-'+article.id">
                        <vue-aos animation-class="fadeInUp animated" :threshold="0.3">
                            <article class="masonry__brick entry format-standard">
                                <div class="entry__thumb">
                                    <router-link :to="article.url" class="entry__thumb-link">
                                        <img :alt="article.name" :src="$config.hostname+article.image">
                                    </router-link>
                                </div>
                                <div class="entry__text">
                                    <div class="entry__header">
                                        <div class="entry__date">
                                            <router-link :to="article.url">{{article.date}}</router-link>
                                        </div>
                                        <h1 class="entry__title">
                                            <router-link :to="article.url">{{article.name}}</router-link>
                                        </h1>
                                    </div>
                                    <div class="entry__excerpt" v-html="article.description"></div>
                                </div>
                            </article>
                        </vue-aos>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
  import request from '@/api/axios';
  import PageHeader from "./PageHeader";
  import VueAos from 'vue-aos'
  import 'animate.css/animate.min.css';
  import eventsBus from '@/api/events';

  export default {
    data: () => {
      return {
        data: {},
        dataFiltered: {},
        category: null,
        articlesContainer: 'articlesContainer'
      }
    },
    components: {
      PageHeader,
      VueAos
    },
    watch: {
      $route(to, from) {
        if (to.path && to.path.indexOf('/category/') > -1) {
          this.setCategory(to.path.replace('/category/', ''));
        } else {
          this.setCategory(null);
        }
      }
    },
    computed: {
      articles() {
        return {
          special: this.data?.articles?.filter(article => this.category === null || this.category.id === article.category)?.slice(0, 3),
          simple: this.data?.articles?.filter(article => this.category === null || this.category.id === article.category)?.slice(3)
        }
      },
      categories() {
        return this.data?.categories;
      }
    },
    async created() {
      this.data = await this.getData();
      this.data.articles = this.data.articles.map(item => {
        item.categoryData = this.data.categories.find(category => category.id === item.category);
        item.url = '/article' + item.url;
        return item;
      });
      if (this.$route.params.code) {
        this.setCategory(this.$route.params.code);
      }

      const root = document.getElementsByTagName('html')[0];
      root.classList.remove('cl-preload');
      root.classList.add('cl-loaded');
      eventsBus.$emit('page-ready');
    },
    mounted() {
      const root = document.getElementsByTagName('html')[0];
      root.classList.add('cl-preload');
    },
    methods: {
      async getData() {
        return (await request({action: 'get_articles'})).data;
      },
      async setCategory(code) {
        document.body.classList.remove('active-menu');

        if (code === null) {
          this.category = null;
        } else {
          const category = this.data.categories.find(category => category.code === code);
          if (category) {
            this.category = category;
          } else {
            this.$router.push('/');
          }
        }
        this.onLoad();
      },
      async onLoad() {
        await this.sleep(250);
        this.$nextTick(() => this.$redrawVueMasonry(this.articlesContainer));
      },
      sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
    }
  }
</script>