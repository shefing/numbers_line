/// <reference path="../../../lib/js/external/jquery/2.0.3/jquery-2.0.3.js" />
/// 

/*jshint multistr: true */

var translationProxyDotToDot = (function () {
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

    var pairs = oPreset.pairs;

    for (var i = 0; i < pairs.length; i++) {

      var data = {};

      if (pairs[i].leftMember.type == 'text') {
        data = {
          key: {
            pairIndex: i,
            memberPosition: 'leftMember'
          },
          type: 'text',
          value: encodeURIComponent(pairs[i].leftMember.data),
          description: 'Pair ' + (i + 1) + ' member 1',
        }
        translationArr.push(data);
      }

      if (pairs[i].rightMember.type == 'text') {
        data = {
          key: {
            pairIndex: i,
            memberPosition:'rightMember'
          },
          type: 'text',
          value: encodeURIComponent(pairs[i].rightMember.data),
          description: 'Pair ' + (i + 1) + ' member 2',
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

      var pairIndex = translatedObj.key.pairIndex;
      var memberPosition = translatedObj.key.memberPosition;

      oPreset.pairs[pairIndex][memberPosition]['data'] = decodeURIComponent(translatedObj.value);

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
  proxy: translationProxyDotToDot,
});