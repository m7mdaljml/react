import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en.i18n";
import ar from "./ar.i18n";
import fr from "./fr.i18n";

const savedLang =
  localStorage.getItem("lang") ||
  window.appConfig.cultures.find((c) => c.isDefault)?.lang;

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar },
    fr: { translation: fr },
  },
  lng: savedLang,
  fallbackLng: savedLang,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
