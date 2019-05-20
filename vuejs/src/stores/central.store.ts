import Vuex, { ModuleTree } from 'vuex';

import { ListsState, listsStore } from './lists.store';
import { ProductsState, productsStore } from './products.store';
import { RowsState, rowsStore } from './rows.store';

export default new Vuex.Store(<ModuleTree<ListsState | ProductsState | RowsState>>{
  modules: {
    listsStore,
    productsStore,
    rowsStore,
  },
});
