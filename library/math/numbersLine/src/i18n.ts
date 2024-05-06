import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  he: {
    translation: {
      line_defination: "הגדרת הישר",
      ruler_jump_size_10: "(קפיצות של 10) 0-100",
      ruler_jump_size_1: "(קפיצות של 1) 0-100",
      hide_everything: "הסתר הכל",
      hide_partially: "הסתר חלקית",
      hide_manually: "הסתר ידנית",
      show_manually: "הצג ידנית",
      show_all: "הצג הכל",
      restart_question: "?אתם רוצים להתחיל מחדש",
      delete_all: "מחק הכל",
      stay: "הישארו",
    },
  },
  ar: {
    translation: {
      line_defination: "تعريف مستقيم الأعداد",
      ruler_jump_size_10: "(قفزات من 10) 100-0",
      ruler_jump_size_1: "(قفزات من 1) 100-0",
      hide_everything: "إخفاء كل شيء",
      hide_partially: "إخفاء جزئيا",
      hide_manually: "إخفاء يدويا",
      show_manually: "عرض يدويا",
      show_all: "عرض الكل",
      restart_question: "هل تريدون البدء من جديد؟",
      delete_all: "احذف الكلّ",
      stay: "ابقوا هن",
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
