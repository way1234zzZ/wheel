import Vue from 'vue'
import VueRouter from 'vue-router'
// import tools from '../views/tools.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import("@/views/tools")
  },
  {
    path: '/testtaobao',
    name: 'testtaobao',
    component: () => import("@/views/testTaoBao")
  },
  {
    path: '/test',
    name: 'test',
    component: () => import("@/views/test")
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/testLayout',
    name: 'testLayout',
    component: () => import("@/views/testLayout")
  },
  {
    path: '/testPopOver',
    name: 'testPopOver',
    component: () => import("@/views/testPopOver")
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
