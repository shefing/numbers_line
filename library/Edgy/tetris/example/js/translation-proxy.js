/// <reference path="../../../lib/js/external/jquery/2.0.3/jquery-2.0.3.js" />
/// 

/*jshint multistr: true */

var translationProxyTetris = (function () {
  var self = this;

  // AZ - bOldStyle means - preset isn't encoded but inner elements are and needed be decoded on loading
  var bOldStyle = true;

  function decode(str) {
    return (bOldStyle) ? decodeURIComponent(str) : str;
  }

  self.init = function () {

  };


  function getPresetObject(preset) {
    var oPreset = {};


    if (!preset) {
      alert('no preset');
    }
    else {
      if (preset.substr(0, 3) == '%7B') {
        bOldStyle = false;
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

    if (oPreset.baskets) {
      for (var i = 0; i < oPreset.baskets.length; i++) {

        var basketId = oPreset.baskets[i].id;
        var basketName = decode(oPreset.baskets[i].name);

        var data = {
          key: {
            basketId: basketId,
          },
          type: 'text',
          value: encodeURIComponent(basketName),
          description: basketId,
        }

        translationArr.push(data);

      }

    }
    if (oPreset.options) {
      for (var i = 0; i < oPreset.options.length; i++) {

        var optionId = oPreset.options[i].id;
        var optionText = decode(oPreset.options[i].text);

        var data = {
          key: {
            optionId: optionId,
          },
          type: 'text',
          value: encodeURIComponent(optionText),
          description: oPreset.options[i].baskets[0] + ' ' + optionId,
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


      if (translatedObj.key.optionId != undefined) {
        // this is an "option"
        var optionId = translatedObj.key.optionId;

        // find the option with this optionId
        for (var j = 0; j < oPreset.options.length; j++) {
          if (oPreset.options[j].id == optionId) {
            oPreset.options[j].text = decodeURIComponent(translatedObj.value);
            break;
          }
        }

      } else {

        if (translatedObj.key.basketId != undefined) {
          // this is a "basket"
          var basketId = translatedObj.key.basketId;

          // find the basket with this basketId
          for (var j = 0; j < oPreset.baskets.length; j++) {
            if (oPreset.baskets[j].id == basketId) {
              oPreset.baskets[j].name = decodeURIComponent(translatedObj.value);
              break;
            }
          }

        }
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
  proxy: translationProxyTetris,
});