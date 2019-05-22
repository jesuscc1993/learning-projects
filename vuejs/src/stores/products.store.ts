import { Module } from 'vuex';

import { Product } from '../domain/product.types';

export type ProductsState = {
  products: Product[];
  areProductsReady: boolean;
};

export const productsStore: Module<ProductsState, ProductsState> = {
  state: {
    products: [],
    areProductsReady: false,
  },
  mutations: {
    setProducts(state: ProductsState, products: Product[]) {
      state.products = products.sort((a, b) => (a.name > b.name ? 1 : -1));
      state.areProductsReady = true;
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
    setProducts({ commit }, products: Product[]) {
      commit('setProducts', products);
    },
    updateProduct({ commit }, product: Product) {
      commit('updateProduct', product);
    },
    addProduct({ commit }, product: Product) {
      commit('addProduct', product);
    },
    deleteProduct({ commit }, productId: number) {
      commit('deleteProduct', productId);
    },
  },
  getters: {
    products({ products }) {
      return products;
    },
    areProductsReady({ areProductsReady }) {
      return areProductsReady;
    },
  },
};
