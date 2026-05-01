import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en.i18n";
import ar from "./ar.i18n";

const savedLang = localStorage.getItem("lang") || "en";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar },
  },
  lng: savedLang,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
