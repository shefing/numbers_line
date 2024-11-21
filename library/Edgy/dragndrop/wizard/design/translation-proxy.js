/// <reference path="../../../lib/js/external/jquery/2.0.3/jquery-2.0.3.js" />
/// 

/*jshint multistr: true */

var translationProxyDragAndDrop = (function () {
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

    if (oPreset.options) {
      for (var i = 0; i < oPreset.options.length; i++) {

        var optionText = oPreset.options[i].text;

        if (optionText != '') {

          var optionId = oPreset.options[i].id;

          var data = {
            key: {
              optionId: optionId,
            },
            type: 'text',
            value: encodeURIComponent(optionText),
            description: optionId,
          }

          translationArr.push(data);
        }
      }
    }

    if (oPreset.medias) {
    for (var i = 0; i < oPreset.medias.length; i++) {
      var mediaText = oPreset.medias[i].text;

      if (mediaText != '') {
        var mediaId = oPreset.medias[i].id;

        var data = {
          key: {
            mediaId: mediaId,
          },
          type: 'text',
          value: encodeURIComponent(mediaText),
          description: mediaId,
        }

        translationArr.push(data);
      }
    }
  }

    return translationArr;
  }


  function getTranslatedPreset(translationArr, preset) {

    var oPreset = getPresetObject(preset);

    var oTranslationArr = translationArr;

    for (var i = 0; i < oTranslationArr.length; i++) {

      var translatedObj = oTranslationArr[i];


      if (translatedObj.key.mediaId != undefined) {
        // this is a "media"
        var mediaId = translatedObj.key.mediaId;

        // find the medias with this mediaId and update them
        for (var j = 0; j < oPreset.medias.length; j++) {
          if (oPreset.medias[j].id == mediaId) {
            oPreset.medias[j].text = decodeURIComponent(translatedObj.value);
            break;
          }
        }

      } else {

        if (translatedObj.key.optionId != undefined) {
          // this is an "option"
          var optionId = translatedObj.key.optionId;

          // find the option with the same id and update it
          for (var j = 0; j < oPreset.options.length; j++) {
            if (oPreset.options[j].id == optionId) {

              // update the correct option with new text
              var optionText = decodeURIComponent(translatedObj.value);
              oPreset.options[j].text = optionText;

              //#region Update all the relevant baskets according to new option

              // check if the option is linked
              if (oPreset.options[j].isLinked == true) {

                var optionIds = [];
                optionIds = oPreset.options[j].id.split('|');

                // update all basket that hold the linked option
                for (var k = 0; k < optionIds.length; k++) {
                  var basketIdNumArr = optionIds[k].split('option-');

                  if (basketIdNumArr.length > 1 && basketIdNumArr[1] != '') {
                    // find the correct basket and update it with option text
                    var basketId = 'basket-' + basketIdNumArr[1];
                    updateBasketWithText(basketId, optionText);
                  }
                }

              } else {
                // the option is not linked
                var basketId = oPreset.options[j].baskets[0];

                // find the correct basket and update it with option text
                updateBasketWithText(basketId, optionText);
              }

              //#endregion

              break;
            }
          }

        }
      }

    }


    // helper function
    function updateBasketWithText(basketId, optionText) {
      for (var k = 0; k < oPreset.baskets.length; k++) {
        if (oPreset.baskets[k].id == basketId) {
          oPreset.baskets[k].text = optionText;
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
  proxy: translationProxyDragAndDrop,
});