import './plugins/vuetify';
import './plugins/vuex';

import Vue from 'vue';

import App from './app.vue';
import { i18n } from './plugins/i18n';
import { router } from './plugins/router';

Vue.config.productionTip = false;

new Vue({
  router,
  i18n,
  render: h => h(App),
}).$mount('#app');
