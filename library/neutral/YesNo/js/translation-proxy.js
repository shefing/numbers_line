/// <reference path="../../../lib/js/external/jquery/2.0.3/jquery-2.0.3.js" />

/*jshint multistr: true */

var translationProxyOrdering = (function () {
  var self = this;


  self.init = function () {

  };


  function getPresetXML(preset) {
    var $XML;


    if (!preset) {
      alert('no preset');
    }
    else {

      if (preset.substr(0, 8) == "%3COrder") {
        preset = decodeURIComponent(preset)
      }

      $XML = $(preset);

    }
    return $XML;
  }


  function getTranslationObject(preset) {

    var $XML = getPresetXML(preset);
    var $Elements = $XML.find("element");

    var translationArr = [];

    for (var i = 0; i < $Elements.length; i++) {

      var $element = $Elements.eq(i);
      var content = $element.html();

      var data = {
          key: {
            itemIndex: i,
          },
          type: 'html',
          value: encodeURIComponent(content),
          description: 'Item ' + (i + 1),
      }

        translationArr.push(data);
    }


    return translationArr;
  }


  function getTranslatedPreset(translationArr, preset) {

    var $XML = getPresetXML(preset);
    var $Elements = $XML.find("element");

    var oTranslationArr = translationArr;

    for (var i = 0; i < oTranslationArr.length; i++) {

      var translatedObj = oTranslationArr[i];

      var itemIndex = translatedObj.key.itemIndex;
      var content = decodeURIComponent(translatedObj.value);

      $XML.find('element').eq(itemIndex).html(content);
    }


    var sPreset = encodeURIComponent('<OrderingTemplate>' + $XML.html() + '</OrderingTemplate>');


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
  proxy: translationProxyOrdering,
});