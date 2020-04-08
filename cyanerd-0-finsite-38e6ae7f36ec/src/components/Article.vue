<template>
    <div class="articles" v-if="article">
        <article class="row format-standard">
            <div class="s-content__header col-full">
                <h1 class="s-content__header-title">{{ article.name }}</h1>
                <ul class="s-content__header-meta">
                    <li class="date">{{ article.date }}</li>
                </ul>
            </div>
            <div class="col-full s-content__main">
                <p class="lead" v-html="article.preview_text"></p>
                <div v-html="article.detail_text"></div>
                <div class="s-content__pagenav">
                    <div class="s-content__nav">
                        <div class="s-content__prev">
                            <router-link to="/" rel="prev">
                                <span>Вернуться на главную</span>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    </div>
</template>

<script>
  import request from '@/api/axios';
  import eventsBus from '@/api/events';

  export default {
    data: () => {
      return {
        article: null
      }
    },
    async created() {
      let data = (await request({
        action: 'get_article',
        options: {code: this.$route.params.code.replace('.html', '')}
      }))?.data;
      if (data.status === false) {
        this.$router.push('/login');
      } else {
        this.article = data.article;
      }
      eventsBus.$emit('page-ready');
    },
    methods: {}
  }
</script>