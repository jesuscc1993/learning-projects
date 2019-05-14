import { LocaleMessages } from 'vue-i18n';

import enUs from './en-US.json';
import esEs from './es-ES.json';

export const locales: LocaleMessages = {
  'en-US': enUs,
  'es-ES': esEs,
};
export const defaultLocale = Object.keys(locales)[0];
