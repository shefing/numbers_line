/// <reference path="../../../lib/js/external/jquery/2.0.3/jquery-2.0.3.js" />
/// 

/*jshint multistr: true */

var translationProxyHotspot = (function () {
  var self = this;

  self.init = function () {

  };

  function getPresetObject(preset) {
    var oPreset = {};


    if (!preset) {
      alert('no preset');
    }
    else {
      if (preset.substr(0, 8) == "%3CHotsp") {
        preset = decodeURIComponent(preset)
        preset = preset.substr(18);
      }

      // convert Json string to real object
      var oPreset = JSON.parse(preset);
    }
    return oPreset;
  }


  function getTranslationObject(preset) {

    var oPreset = getPresetObject(preset);

    var translationArr = [];

    var oHotspots = oPreset.hotspots;

    if (oHotspots) {
      for (var id in oHotspots) {

        var type = oHotspots[id].type;

        var value = '';
        var keyType = '';

        switch (type) {
          case 'info':
            value = oHotspots[id].infoText;
            if (value) {
              keyType = 'infoText';
              addTranslationObj(id, value, keyType);
            }
            break;
          case 'correct':
            value = oHotspots[id].correctText;
            if (value) {
              keyType = 'correctText';
              addTranslationObj(id, value, keyType);
            }
            break;
          case 'false':
            value = oHotspots[id].falseText;
            if (value) {
              keyType = 'falseText';
              addTranslationObj(id, value, keyType);
            }
            break;
        }

        // helper function - populate translation array
        function addTranslationObj(id, value, keyType) {

          var data = {
            key: {
              hotspotId: id,
              hotspotType: keyType
            },
            type: 'html',
            value: encodeURIComponent(value),
            description: 'Hotspot ' + (translationArr.length + 1),
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

      var hotspotId = translatedObj.key.hotspotId;
      var hotspotType = translatedObj.key.hotspotType;

      oPreset.hotspots[hotspotId][hotspotType] = decodeURIComponent(translatedObj.value);

    }


    var sPreset = "<HotspotsTemplate>";
    sPreset += JSON.stringify(oPreset, null, 2);
    sPreset = encodeURIComponent(sPreset);


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
  proxy: translationProxyHotspot,
});