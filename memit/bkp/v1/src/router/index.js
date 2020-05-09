import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },

  {
    path: '/editor',
    name: 'editor',
    component: () => import(/* webpackChunkName: "authorization" */ '../views/editor/index.vue')
  },

  {
    path: '/authorization',
    name: 'authorization',
    component: () => import(/* webpackChunkName: "authorization" */ '../views/Authorization.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: "authorization" */ '@/components/rx/user/index.vue')
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
