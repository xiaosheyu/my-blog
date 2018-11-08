import Vue from 'vue'
import  Vuex from 'vuex'

Vue.use(Vuex)


const store = new Vuex.Store({ 
    state: {
    },
        
    mutations: {
        setUser(state,data){
            state.user = data;
        }
    },
        
    actions: {
        commitUser:({commit}, user)=> commit('setUser', user)
    }
        
})
export default store;