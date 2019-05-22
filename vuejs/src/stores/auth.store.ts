import { Module } from 'vuex';

import { User } from '../domain/auth.types';

export type AuthState = {
  user?: User;
};

export const authStore: Module<AuthState, AuthState> = {
  state: {
    user: undefined,
  },
  mutations: {
    setUser(state: AuthState, user?: User) {
      state.user = user;
    },
  },
  actions: {
    setUser({ commit }, user?: User) {
      commit('setUser', user);
    },
    removeUser({ commit }) {
      commit('setUser', undefined);
    },
  },
  getters: {
    user({ user }) {
      return user;
    },
  },
};
