var Textit = Textit || {};

Textit.i18n.defaultLanguage = 'en';
Textit.i18n = {};
Textit.i18n.strings = {
  ui :{
    comments : {
      'en' : 'comments',
      'he' : 'הערות'
    }
  },
  questions: {
    question_done : {
      'en': 'Done',
      'he': 'סיימתי'
    },
    question_clue :{
      'en': 'clue',
      'he': 'רמז'
    },
    cloze_question_bank: {
      'en': 'Bank',
      'he': 'מחסן'
    }
  }
}

Textit.i18n.get = function (stringName, lang) {
  lang = lang || Textit.i18n.defaultLanguage;
  var steps = stringName.split('.');
  var index = 0;
  var obj = Textit.i18n.strings[steps[index]];
  while (index < steps.length) {
    obj = obj[steps[index]];
    index++;
  }
  return obj[lang];
}

Textit.i18n.t = function () {
  
}