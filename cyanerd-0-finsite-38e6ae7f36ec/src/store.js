import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import request from '@/api/axios';

Vue.use(Vuex);

const getDefaultState = () => {
  return {
    user: null
  }
};

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: getDefaultState,
  actions: {
    async getUser({commit, state}) {
      try {
        const response = await request({action: 'user'});
        if (response.status === true && response.user) {
          commit('login', response.user);
        } else {
          commit('logout');
        }
      } catch (e) {
        console.log(e);
      }
    }
  },
  getters: {},
  mutations: {
    logout(state) {
      state.user = null;
    },
    login(state, user) {
      state.user = user;
    }
  }
});