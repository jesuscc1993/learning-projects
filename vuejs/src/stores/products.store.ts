import { Product } from '@/domain/product.types';
import { ActionContext, Module } from 'vuex';

type ProductsContext = ActionContext<ProductsState, ProductsState>;

export type ProductsState = {
  products: Product[];
};

export const productsStore: Module<ProductsState, ProductsState> = {
  state: {
    products: [],
  },
  mutations: {
    setProducts(state: ProductsState, products: Product[]) {
      state.products = products.sort((a, b) => (a.name > b.name ? 1 : -1));
    },
    addProduct(state: ProductsState, product: Product) {
      state.products = [...state.products, product];
    },
    updateProduct(state: ProductsState, updatedProduct: Product) {
      state.products = state.products.map(product => (product.id === updatedProduct.id ? updatedProduct : product));
    },
    deleteProduct(state: ProductsState, productId: string) {
      state.products = state.products.filter(product => product.id !== productId);
    },
  },
  actions: {
    setProducts(context: ProductsContext, products: Product[]) {
      context.commit('setProducts', products);
    },
    updateProduct(context: ProductsContext, product: Product) {
      context.commit('updateProduct', product);
    },
    addProduct(context: ProductsContext, product: Product) {
      context.commit('addProduct', product);
    },
    deleteProduct(context: ProductsContext, productId: number) {
      context.commit('deleteProduct', productId);
    },
  },
  getters: {
    products(state: ProductsState) {
      return state.products;
    },
  },
};
