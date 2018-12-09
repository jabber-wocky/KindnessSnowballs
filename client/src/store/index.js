import Vue from 'vue'
import Vuex from 'vuex'
import story from './modules/story'
import * as types from './mutationTypes'
import authService from '@/services/auth'
import VuexPersist from 'vuex-persist'

const persist = new VuexPersist({
  key: 'snowball-kindness',
  storage: sessionStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    siteKey: '6LeXon8UAAAAAF22Z8YBKuUdMlO-0V7oRmOq_ooR'
  },
  getters: {
    hasAuth(state) {
      return state.hasOwnProperty("auth")
    }
  },
  mutations: {
    [types.LOGIN](state, data) {
      state.auth = data
    }
  },
  actions: {
    async login({ commit }, data) {
      try {
        await authService.auth(data)
        commit(types.LOGIN, {
          username: data.username,
          password: data.password
        })
      }
      catch(error) {
        throw error
      }
    }
  },
  modules: {
    story
  },
  plugins: [persist.plugin]
})
