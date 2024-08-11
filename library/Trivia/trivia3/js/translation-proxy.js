/// <reference path="../../../lib/js/external/jquery/2.0.3/jquery-2.0.3.js" />
/// 

/*jshint multistr: true */

var translationProxyTrivia = (function () {
  var self = this;

  self.init = function () {

  };


  function getPresetObject(preset) {
    var oPreset = {};


    if (!preset) {
      alert('no preset');
    }
    else {
      if (preset.substr(0, 3) == '%7B') {
        preset = decodeURIComponent(preset);
      }
      // convert Json string to real object
      var oPreset = JSON.parse(preset);
    }
    return oPreset;
  }


  function getTranslationObject(preset) {

    var oPreset = getPresetObject(preset);

    var translationArr = [];

    var questions = oPreset.questions;

    for (var i = 0; i < questions.length; i++) {

      var data = {
        key: {
          questionIndex: i,
        },
        type: 'html',
        value: encodeURIComponent(questions[i].title),
        description: 'Question ' + (i + 1),
      }

      translationArr.push(data);



      for (var j = 0; j < questions[i].options.length; j++) {

        var data = {
          key: {
            questionIndex: i,
            optionIndex: j,
          },
          type: 'html',
          value: encodeURIComponent(questions[i].options[j].text),
          description: 'Question ' + (i + 1) + ' - Option ' + (j + 1),
        }

        translationArr.push(data);
      }

    }


    return translationArr;
  }


  function getTranslatedPreset(translationArr, preset) {

    var oPreset = getPresetObject(preset);

    var oTranslationArr = translationArr;

    for (var i = 0; i < oTranslationArr.length; i++) {

      var translatedObj = oTranslationArr[i];


      var questionIndex = translatedObj.key.questionIndex;

      if (translatedObj.key.optionIndex != undefined) {
        // this is an "option"
        var optionIndex = translatedObj.key.optionIndex;

        oPreset.questions[questionIndex].options[optionIndex].text = decodeURIComponent(translatedObj.value);

      } else {
        // this is a "question"

        oPreset.questions[questionIndex].title = decodeURIComponent(translatedObj.value);

      }

    }



    var sPreset = encodeURIComponent(JSON.stringify(oPreset));


    return sPreset;
  }


  return {
    getTranslatedPreset: function (translationObject, preset) {
      return getTranslatedPreset(translationObject, preset);
    },
    getTranslationObject: function (preset) {
      return getTranslationObject(preset);
    }
  };

})();

$(window).trigger({
  type: "translatorProxyReady",
  proxy: translationProxyTrivia,
});