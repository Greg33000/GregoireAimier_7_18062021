import Vue from 'vue'
import VueRouter from 'vue-router'
import Signin from '../views/Signin.vue'
import Signup from '../views/Signup.vue'
import Home from '../views/Home.vue'
import NewPost from '../views/NewPost.vue'

// import Reddit from '../views/Reddit.vue'
import store from '../store'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Redirection',
    redirect:'/home'
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/reddit',
    name: 'reddit',
    component: () => import(/* webpackChunkName: "about" */ '../views/Reddit.vue')
  },
  {
    path: '/reddit/comments',
    name: 'redditId',
    component: () => import(/* webpackChunkName: "about" */ '../views/RedditComments.vue')
  },
  {
    path: '/reddit/new',
    name: 'NewPost',
    component: NewPost,
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
    redirect: '/signin'
  }
]


const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/signin','/signup'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = store.state.user;
  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/signin');
  } else {
    next();
  }
  if (!authRequired && loggedIn) {
    next('/');
  } else {
    next();
  }
});

export default router
