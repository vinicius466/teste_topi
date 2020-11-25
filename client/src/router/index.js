import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(Router)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/', 
    redirect: '/home'
  },
  { 
    path: '*', 
    redirect: '/home' }
]

const router = new Router({
  mode: 'history',
  routes,
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})

export default router