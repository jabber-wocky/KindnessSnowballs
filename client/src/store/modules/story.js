import storyService from '@/services/stories'
import * as types from '@/store/mutationTypes'

export default {
  namespaced: true,
  state: {
    data: []
  },
  getters: {
    all (state) {
      return state.data
      .sort((a,b) => {
        a = new Date(a.posted)
        b = new Date(b.posted)
        return a > b ? -1 : a < b ? 1 : 0
      })
    }
  },
  mutations: {
    [types.ADD](state, story) {
      state.data.push(story)
    },
    [types.ADD_RANGE](state, stories) {
      state.data.push(...stories)
    }
  },
  actions: {
    async load ({ commit}) {
      var request = await storyService.getAll();
      
      if (request.status === 200) {
        commit(types.ADD_RANGE, request.data)
        return
      }
      
      commit(types.ADD_RANGE, [])
    },
    async add ({ commit }, story) {
      var request = await storyService.add(story);
      
      if (request.status === 200) {
        commit(types.ADD, request.data)
        return;
      }
      alert("problems saving story");
    },

  }
}
