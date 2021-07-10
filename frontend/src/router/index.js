import Vue from 'vue'
import VueRouter from 'vue-router'
import Signin from '../views/Signin.vue'
import Signup from '../views/Signup.vue'
import Home from '../views/Home.vue'
import EditText from '../views/EditText.vue'
import ImgShared from '../views/ImgShared.vue'
import TxtShared from '../views/TxtShared.vue'
import TxtComments from '../views/TxtComments.vue'
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
    path: '/texts',
    name: 'texts',
    component: TxtShared,
  },
  {
    path: '/texts/comments',
    name: 'textId',
    component: TxtComments,
  },
  {
    path: '/texts/modify',
    name: 'TextModify',
    component: EditText,
  },
  {
    path: '/texts/new',
    name: 'NewText',
    component: EditText,
  },
  {
    path: '/images',
    name: 'images',
    component: ImgShared,
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

// verification of unauthorizing access 
router.beforeEach((to, from, next) => {
  const publicPages = ['/signin','/signup'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = store.state.user;

  // if not logged, go to login page
  if (authRequired && !loggedIn) {
    next('/signin');
  } else {
    next();
  }

  // if there is not route, go to home page
  if (!authRequired && loggedIn) {
    next('/');
  } else {
    next();
  }
});

export default router
