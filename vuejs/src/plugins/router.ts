import Vue from 'vue';
import Router, { RouteConfig } from 'vue-router';

import CatalogView from './../views/catalog.view.vue';
import EmptyView from './../views/empty.view.vue';
import HomeView from './../views/home.view.vue';

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
    component: EmptyView,
  },
  {
    path: '/catalog',
    name: 'catalog',
    component: CatalogView,
  },
];

export const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
