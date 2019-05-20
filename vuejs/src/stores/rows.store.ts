import { Row } from '@/domain/row.types';
import { Module } from 'vuex';

export type RowsState = {
  rows: Row[];
  areRowsReady: boolean;
};

export const rowsStore: Module<RowsState, RowsState> = {
  state: {
    rows: [],
    areRowsReady: false,
  },
  mutations: {
    setRows(state: RowsState, rows: Row[]) {
      state.rows = rows;
      state.areRowsReady = true;
    },
    addRow(state: RowsState, row: Row) {
      state.rows = [...state.rows, row];
    },
    updateRow(state: RowsState, updatedRow: Row) {
      state.rows = state.rows.map(row => (row.id === updatedRow.id ? updatedRow : row));
    },
    deleteRow(state: RowsState, rowId: string) {
      state.rows = state.rows.filter(row => row.id !== rowId);
    },
    deleteAllRows(state: RowsState) {
      state.rows = [];
    },
  },
  actions: {
    setRows({ commit }, rows: Row[]) {
      commit('setRows', rows);
    },
    updateRow({ commit }, row: Row) {
      commit('updateRow', row);
    },
    addRow({ commit }, row: Row) {
      commit('addRow', row);
    },
    deleteRow({ commit }, rowId: number) {
      commit('deleteRow', rowId);
    },
    deleteAllRows({ commit }) {
      commit('deleteAllRows');
    },
  },
  getters: {
    rows({ rows }) {
      return rows;
    },
    areRowsReady({ areRowsReady }) {
      return areRowsReady;
    },
  },
};
