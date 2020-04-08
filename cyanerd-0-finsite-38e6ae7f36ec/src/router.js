import VueRouter from 'vue-router';
import VueBodyClass from 'vue-body-class';
import store from './store';

import MainPage from '@/components/MainPage';
import Article from '@/components/Article';
import Login from '@/components/Login';
import Profile from '@/components/Profile';
import Promo from '@/components/Promo';
import About from '@/components/static/About';
import Feedback from '@/components/static/Feedback';

const routes = [
  {
    path: '/',
    component: MainPage,
    meta: {
      layout: 'index'
    }
  },
  {
    path: '/category/:code',
    component: MainPage,
    meta: {
      layout: 'index'
    }
  },
  {
    path: '/article/:code',
    component: Article,
    name: 'article',
    meta: {
      bodyClass: 'article-page'
    }
  },
  {
    path: '/about',
    component: About,
    meta: {
      layout: 'static',
      bodyClass: 'article-page'
    }
  },
  {
    path: '/feedback',
    component: Feedback,
    meta: {
      layout: 'static',
      bodyClass: 'article-page'
    }
  },
  {
    path: '/login',
    component: Login,
    meta: {
      guest: true,
      bodyClass: 'login-page'
    }
  },
  {
    path: '/profile',
    component: Profile,
    name: 'profile',
    meta: {
      requiresAuth: true,
      bodyClass: 'profile-page'
    }
  },
  {
    path: '/promo',
    component: Promo,
    name: 'promo',
    meta: {
      guest: true,
      bodyClass: 'promo-page',
      layout: 'promo'
    }
  },
  {
    path: '*',
    redirect: '/'
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

const vueBodyClass = new VueBodyClass(routes);
router.beforeEach((to, from, next) => {
  vueBodyClass.guard(to, next);

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.state.user === null) {
      next({
        path: '/login',
        params: {nextUrl: to.fullPath}
      })
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (store.state.user === null) {
      next();
    } else {
      next({path: '/'})
    }
  } else {
    next();
  }
});

export default router;