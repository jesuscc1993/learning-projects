import Vue from 'vue';
import Router, { RouteConfig } from 'vue-router';

import HomeView from './../views/home.view.vue';
import ProductsView from './../views/products.view.vue';
import RowsView from './../views/rows.view.vue';

Vue.use(Router);

export const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/list',
    name: 'list',
    component: RowsView,
  },
  {
    path: '/catalog',
    name: 'catalog',
    component: ProductsView,
  },
];

export const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
