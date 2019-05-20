import { List } from '@/domain/list.types';
import { Module } from 'vuex';

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
    deleteList(state: ListsState, listId: string) {
      state.lists = state.lists.filter(list => list.id !== listId);
    },
  },
  actions: {
    setLists({ commit }, lists: List[]) {
      commit('setLists', lists);
    },
    addList({ commit }, list: List) {
      commit('addList', list);
    },
    deleteList({ commit }, listId: number) {
      commit('deleteList', listId);
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
