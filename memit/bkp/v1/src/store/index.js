import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({

  state : {
    auth : undefined,
  },
  
  mutations: {

    auth(state, value){

      state.auth = value

    } 
  }, 

  modules : {

    account : {
      namespaced: true,
      state: {

        lastlogin : null,
        info : null,

      },

      mutations: {

        info(state, value){

          state.info = value

        },

        lastlogin(state, value){

          state.lastlogin = value

          localStorage.setItem('lastlogin', value)

        } 
      },

      actions: {
        init(store){

          store.commit('lastlogin', localStorage.getItem('lastlogin') || '')

        },

      },

      mounted: () => {
        this.$store.dispath('init')
      }
    }

  }

  
})
