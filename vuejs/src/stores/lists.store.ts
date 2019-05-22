import { Module } from 'vuex';

import { List } from '../domain/list.types';

export type ListsState = {
  lists: List[];
  areListsReady: boolean;
};

export const listsStore: Module<ListsState, ListsState> = {
  state: {
    lists: [],
    areListsReady: false,
  },
  mutations: {
    setLists(state: ListsState, lists: List[]) {
      state.lists = lists;
      state.areListsReady = true;
    },
    addList(state: ListsState, list: List) {
      state.lists = [...state.lists, list];
    },
  },
  actions: {
    setLists({ commit }, lists: List[]) {
      commit('setLists', lists);
    },
    addList({ commit }, list: List) {
      commit('addList', list);
    },
  },
  getters: {
    lists({ lists }) {
      return lists;
    },
    areListsReady({ areListsReady }) {
      return areListsReady;
    },
  },
};
