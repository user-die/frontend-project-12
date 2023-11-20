import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import ru from "./locales/ru/translation";
import en from "./locales/en/translation";

i18next.use(initReactI18next).init({
  debug: true,
  lng: "ru",
  resources: {
    en: {
      translation: en,
    },
    ru: {
      translation: ru,
    },
  },
});
