import Vue from 'vue'
import Vuex from 'vuex'
import story from './modules/story'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    siteKey: '6LeXon8UAAAAAF22Z8YBKuUdMlO-0V7oRmOq_ooR'
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    story
  }
})
