import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/dashboard',
    name: 'Index',
    component: Index
  },
  {
    path: '/advanced',
    name: 'index2',
    component: () => import('../views/index2.vue')
  },
  {
    path: '/deviceList',
    name: 'index3',
    component: () => import('../views/index3.vue')
  },
  {
    path: '/photo',
    name: 'index4',
    component: () => import('../views/index4.vue')
  },
  {
    path: '/alarmLog',
    name: 'index5',
    component: () => import('../views/index5.vue')
  },
  {
    path: '/',
    name: 'Index',
    component: Index
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
