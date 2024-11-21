window.cet = window.cet || {}; window.cet.dragndrop = window.cet.dragndrop || {};

(function () {

  var Utils = (function () {
    return {
      getDistanceFromStage: function (elem) {

        var pos = { top: 0, left: 0 };

        while (elem.attr('id') != 'stage') {
          pos.left += parseInt(elem.css('left').replace('px', ''));
          pos.top += parseInt(elem.css('top').replace('px', ''));
          elem = elem.parent();
        }
        return pos;
      },
      getDistanceFromBody: function (elem) {

        var pos = { top: 0, left: 0 };

        while (!elem.is('body')) {
          pos.left += parseInt(elem.css('left').replace('px', ''));
          pos.top += parseInt(elem.css('top').replace('px', ''));
          elem = elem.parent();
        }
        return pos;
      },
      supportOldIds: function (id) {
        if (id.indexOf('-') == -1) {
          return id.replace('basket', 'basket-').replace('option', 'option-');
        }
        return id;
      }
    }
  })();
  cet.dragndrop.Utils = Utils;

})();
