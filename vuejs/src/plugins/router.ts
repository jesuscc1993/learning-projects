import Vue from 'vue';
import Router, { RouteConfig } from 'vue-router';

import ProductsView from './../views/products.view.vue';
import RowsView from './../views/rows.view.vue';

Vue.use(Router);

export const sections = [
  {
    path: '/list',
    name: 'list',
    icon: 'list',
    component: RowsView,
  },
  {
    path: '/products',
    name: 'products',
    icon: 'developer_board',
    component: ProductsView,
  },
  { path: '*', redirect: '/list' },
];

export const routes: RouteConfig[] = sections.map(({ icon, ...section }) => section);

export const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
