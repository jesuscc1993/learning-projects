import { Product } from '@/domain/products';
import Vuex, { ActionContext } from 'vuex';

type State = {
  products: Product[];
};
type Context = ActionContext<State, State>;

export const productsStore = new Vuex.Store({
  state: {
    products: [],
  },
  mutations: {
    setProducts(state: State, products: Product[]) {
      state.products = products;
    },
    addProduct(state: State, product: Product) {
      state.products = [...state.products, product];
    },
    updateProduct(state: State, updatedProduct: Product) {
      state.products = state.products.map(product => (product.id === updatedProduct.id ? updatedProduct : product));
    },
    deleteProduct(state: State, productId: number) {
      state.products = state.products.filter(product => product.id !== productId);
    },
  },
  actions: {
    setProducts(context: Context, products: Product[]) {
      context.commit('setProducts', products);
    },
    updateProduct(context: Context, product: Product) {
      context.commit('updateProduct', product);
    },
    addProduct(context: Context, product: Product) {
      context.commit('addProduct', product);
    },
    deleteProduct(context: Context, productId: number) {
      context.commit('deleteProduct', productId);
    },
  },
  getters: {
    products(state: State) {
      return state.products;
    },
  },
});
