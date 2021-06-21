import Vue from 'vue'
import VueRouter from 'vue-router'
import Connection from '../views/Connection.vue'
import Home from '../views/Home.vue'
import Reddit from '../views/Reddit.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Redirection',
    redirect:'/connexion'
  },
  {
    path: '/connexion',
    name: 'Connection',
    component: Connection
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/reddit',
    name: 'reddit',
    component: Reddit
  },
  {
    path: '/9gag',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Ninegag.vue')
  },
  {
    path:'*',
    name: 'notFound',
    redirect: '/connexion'
  }
]

const router = new VueRouter({
  routes
})

export default router
