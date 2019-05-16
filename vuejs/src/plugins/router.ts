import Vue from 'vue';
import Router, { RouteConfig } from 'vue-router';

import ProductsView from './../views/products.view.vue';
import RowsView from './../views/rows.view.vue';

Vue.use(Router);

export const routes: RouteConfig[] = [
  // {
  //   path: '/',
  //   name: 'home',
  //   icon: 'home',
  //   component: HomeView,
  // },
  {
    path: '/list',
    name: 'list',
    icon: 'list',
    component: RowsView,
  },
  {
    path: '/catalog',
    name: 'catalog',
    icon: 'developer_board',
    component: ProductsView,
  },
  { path: '*', redirect: '/list' },
];

export const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
