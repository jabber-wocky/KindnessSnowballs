import storyService from '@/services/stories'
import * as types from '@/store/mutationTypes'

export default {
  namespaced: true,
  state: {
    data: []
  },
  getters: {
    all(state) {
      return state.data
        .sort((a, b) => {
          a = new Date(a.posted)
          b = new Date(b.posted)
          return a > b ? -1 : a < b ? 1 : 0
        })
    }
  },
  mutations: {
    [types.ADD_RANGE](state, stories) {
      state.data.push(...stories)
    }
  },
  actions: {
    async load({ commit }) {
      try {
        var request = await storyService.getAll();
        commit(types.ADD_RANGE, request.data)
      }
      catch {
        console.error("Could not load stories.")
        commit(types.ADD_RANGE, [])
      }
    },
    async add({ commit }, story) {
      try {
        var request = await storyService.add(story);
        commit(types.ADD_RANGE, request.data)
      }
      catch {
        console.error("could not save story", story)
        alert("Error: could not save story");
      }
    },

  }
}
