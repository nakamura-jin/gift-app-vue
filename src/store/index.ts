import Vue from "vue";
import Vuex from 'vuex';
import User from '@/modules/users';
import Owner from '@/modules/owners';
import Admin from '@/modules/admins';
import axios from 'axios';
import { login, getLoginData } from '@/apis/login_api';
import Cookies from 'js-cookie';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    error: '',
    loginData: [] as User[] | Owner[] | Admin[],
  },


  mutations: {
    ERROR(state, data) {
      setTimeout(() => {
        state.error = data
      }, 3000)
    },

    ERROR_CLEAR(state) {
      state.error = ''
    },

    LOGIN(state, data) {
      state.loginData = data
    },

    LOGOUT(state) {
      state.loginData = []
    },
  },


  actions: {
    async getData({ commit }) {
      try {
        const response = await getLoginData()
        commit('LOGIN', response)
      } catch (err) {
        return err
      }
    },

    async login({ commit }, { email, password, type }) {
      try {
        const response = await login({
          email: email,
          password: password,
          type: type
        })
        Cookies.set('_myapp_token', response.access_token)
        commit('LOGIN', response.loginData)
      } catch (err) {
        commit('ERROR', err)
      }
    },
  },
  modules: {},
});
