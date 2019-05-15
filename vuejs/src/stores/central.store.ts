import Vuex, { ModuleTree } from 'vuex';

import { ProductsState, productsStore } from './products.store';
import { RowsState, rowsStore } from './rows.store';

export default new Vuex.Store(<ModuleTree<ProductsState | RowsState>>{
  modules: {
    productsStore,
    rowsStore,
  },
});
