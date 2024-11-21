window.cet = window.cet || {}; window.cet.dragndrop = window.cet.dragndrop || {};

(function () {

  cet.dragndrop.Localization = (function () {
    var data;
    var language;

    function getLang() {
      return cet.dragndrop.Content.getFontFamily();
    }
    return {
      init: function () {
        language = getLang();
        data = cet.localization[language];
      },
      get language() {
        return language;
      },
      get data() {
        if (!data) return undefined;
        return data;
      }
    }
  })();
})();
