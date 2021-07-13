import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        collection: []
    },
    mutations: {
        starVideo(state, video) {
            // 防止重复添加相同视频
            state.collection.unshift(video)
            var result = []
            var obj = {}
            for (var i = 0; i < state.collection.length; i++) {
                if (!obj[state.collection[i].id]) {
                    result.push(state.collection[i])
                    obj[state.collection[i].id] = true
                }
            }
            state.collection = result
        },
        removeVideo(state, video) {
            var index = state.collection.indexOf(video)
            state.collection.splice(index, 1)
        }
    },
    actions: {},
    modules: {},
    // 默认为 localStorage 这里改为 sessionStorage
    plugins: [createPersistedState({
        storage: window.sessionStorage
    })]
})