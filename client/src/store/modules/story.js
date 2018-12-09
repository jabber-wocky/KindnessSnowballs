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
    },
    [types.REMOVE](state, id) {
      var index = state.data.map(x => x.Id).indexOf(id)
      state.data.splice(index, 1)
    },
    [types.REMOVE_ALL](state) {
      state.data = []
    }
  },
  actions: {
    async load({ commit }) {
      
      commit(types.REMOVE_ALL)

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
        var request = await storyService.add(story)
        commit(types.ADD_RANGE, request.data)
      }
      catch {
        console.error("could not save story", story)
        alert("Error: could not save story");
      }
    },
    async remove({ dispatch  }, id) {
      await storyService.remove(id)
      dispatch('load')
    }

  }
}
