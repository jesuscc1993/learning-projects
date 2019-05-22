import { Module } from 'vuex';

import { Snackbar } from '../domain/snackbar.types';

export type SnackbarState = {
  snackbar: Snackbar;
};

export const snackbarStore: Module<SnackbarState, SnackbarState> = {
  state: {
    snackbar: { text: '' },
  },
  mutations: {
    setSnackbar(state: SnackbarState, snackbar: Snackbar) {
      state.snackbar = { ...snackbar, isVisible: true };
    },
  },
  actions: {
    setSnackbar({ commit }, snackbar?: Snackbar) {
      commit('setSnackbar', snackbar);
    },
  },
  getters: {
    snackbar({ snackbar }) {
      return snackbar;
    },
  },
};
