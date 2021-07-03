import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// plugins
import BootstrapVue from 'bootstrap-vue'
// import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

Vue.use(BootstrapVue)
// Vue.use(BootstrapVueIcons)

// bootstrap
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './main.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
