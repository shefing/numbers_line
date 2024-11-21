window.cet = window.cet || {};

(function () {

  var Utils = (function () {
    return {
      getDistanceFromStage: function (elem) {

        var pos = { top: 0, left: 0 };

        while (elem.attr('id') != 'Stage') {
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
  cet.Utils = Utils;

})();
