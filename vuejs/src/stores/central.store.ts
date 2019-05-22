import Vuex, { ModuleTree } from 'vuex';

import { AuthState, authStore } from './auth.store';
import { ListsState, listsStore } from './lists.store';
import { ProductsState, productsStore } from './products.store';
import { RowsState, rowsStore } from './rows.store';
import { SnackbarState, snackbarStore } from './snackbar.store';

export default new Vuex.Store(<ModuleTree<AuthState | ListsState | ProductsState | RowsState | SnackbarState>>{
  modules: {
    authStore,
    listsStore,
    productsStore,
    rowsStore,
    snackbarStore,
  },
});
