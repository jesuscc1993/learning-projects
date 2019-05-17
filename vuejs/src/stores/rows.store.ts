import { Row } from '@/domain/row.types';
import { ActionContext, Module } from 'vuex';

type RowsContext = ActionContext<RowsState, RowsState>;

export type RowsState = {
  rows: Row[];
};

export const rowsStore: Module<RowsState, RowsState> = {
  state: {
    rows: [],
  },
  mutations: {
    setRows(state: RowsState, rows: Row[]) {
      state.rows = rows;
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
    setRows(context: RowsContext, rows: Row[]) {
      context.commit('setRows', rows);
    },
    updateRow(context: RowsContext, row: Row) {
      context.commit('updateRow', row);
    },
    addRow(context: RowsContext, row: Row) {
      context.commit('addRow', row);
    },
    deleteRow(context: RowsContext, rowId: number) {
      context.commit('deleteRow', rowId);
    },
    deleteAllRows(context: RowsContext) {
      context.commit('deleteAllRows');
    },
  },
  getters: {
    rows(state: RowsState) {
      return state.rows;
    },
  },
};
