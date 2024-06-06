import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import ru from './locales/ru/translation.json';
import en from './locales/en/translation.json';

i18next.use(initReactI18next).init({
  debug: true,
  lng: 'ru',
  resources: {
    en: {
      translation: en,
    },
    ru: {
      translation: ru,
    },
  },
});
