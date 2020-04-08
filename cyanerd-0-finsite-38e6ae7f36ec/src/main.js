import VueRouter from 'vue-router';
import Vue from 'vue';
import App from '@/App.vue';

import router from './router';
import './directives';
import config from './config';
import store from './store';

import Default from '@/layouts/Default.vue';
Vue.component('default-layout', Default);

import Index from '@/layouts/Index.vue';
Vue.component('index-layout', Index);

import Promo from '@/layouts/Promo.vue';
Vue.component('promo-layout', Promo);

import Static from '@/layouts/Static.vue';
Vue.component('static-layout', Static);

import LoadScript from 'vue-plugin-load-script';
Vue.use(LoadScript);

import VueTheMask from 'vue-the-mask';
Vue.use(VueTheMask);

import {VueMasonryPlugin} from 'vue-masonry';
Vue.use(VueMasonryPlugin);

Vue.prototype.$config = config;
Vue.use(VueRouter);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
