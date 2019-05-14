import Vue from 'vue';
import VueI18n from 'vue-i18n';

import { defaultLocale, locales } from '../assets/i18n';

Vue.use(VueI18n);

export const i18n = new VueI18n({
  locale: navigator.languages[0],
  fallbackLocale: defaultLocale,
  messages: locales,
});
