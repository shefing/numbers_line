import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  he: {
    translation: {
      line_defination: "הגדרת הישר",
      ruler_jump_size_10: "(קפיצות של 10)",
      ruler_jump_size_1: "(קפיצות של 1)",
      hide_everything: "הסתר הכל",
      hide_partially: "הסתר חלקית",
      hide_manually: "הסתר ידנית",
      show_manually: "הצג ידנית",
      show_all: "הצג הכל",
      delete_all: "מחק הכל",
      stay: "הישארו",
    },
  },
  ar: {
    translation: {
      line_defination: "הגדרת ערבית הישר",
      ruler_jump_size_10: "(קפיצו תערבית  של 10)",
      ruler_jump_size_1: "(קפיצות ערבית של 1)",
      hide_everything: "הסתר ערבית הכל",
      hide_partially: "הסתר ערבית חלקית",
      hide_manually: "הסתר ערבית ידנית",
      show_manually: "הצג ערבית ידנית",
      show_all: "הצג ערבית הכל",
      delete_all: "מחק ערבית הכל",
      stay: "ערבית הישארו",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "he", // set default language
  fallbackLng: "he", // fallback language
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
