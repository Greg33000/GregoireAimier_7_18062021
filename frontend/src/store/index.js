import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    token: null,
    roles: [],
  },
  mutations: {
    // keep in the store the username
    setUser(state, user) {
      state.user = user;
    },
    // keep in the store the token
    setToken(state, token) {
      state.token = token;
    },
    // keep in the store the roles for the user
    setRoles(state, roles) {
      state.roles = roles;
    },
    // keep in the store the email of the user
    setEmail(state, email) {
      state.email = email;
    },
  },
  actions: {
  },
  modules: {
  }
})
