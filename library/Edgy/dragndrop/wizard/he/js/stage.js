window.cet = window.cet || {}; window.cet.dragndrop = window.cet.dragndrop || {};
(function () {
  //#region meta declarations
  var Audio;
  var option;
  var Baskets;
  var Content;
  var App;

  //#endregion
  var Stage = (function () {
    var scaleFactor;
    return {


      resetScale: function () {
        scaleFactor = null;
      },
      trigger: function (event, data) {
        Stage.jqElement.trigger(event, data);
      },
      bind: function (event, method) {
        //drgNdrp behaviour
        //Stage.jqElement.on(event, function (event) { method(event.data); })
        Stage.jqElement.on(event, function (event, data) {
          method(data);
        })
      },
      unbind: function (event) {
        Stage.jqElement.off(event)
      },
      on: function (event, method) {
        //drgNdrp behaviour
        //Stage.jqElement.on(event, function (event) { method(event.data); })
        Stage.jqElement.on(event, function (event, data) {
          method(data);
        })
      },
      off: function (event) {
        Stage.jqElement.off(event)
      },
      getSymbolTypeNameBySelector: function (selector) {
        return Stage.getSymbol(selector).getSymbolTypeName();

      },
      createSymbol: function (typeName, parentElementName) {
        return Stage.symbol.createChildSymbol(typeName, parentElementName);

      },
      width: function (size) {
        if (size)
          Stage.jqElement.width(size);
        return Stage.jqElement.width();
      },
      height: function (size) {
        if (size)
          Stage.jqElement.height(size);
        return Stage.jqElement.height();
      },
      scale: function (size) {

        if (size) {
          Stage.jqElement.css({
            '-moz-transform': 'scale(' + size + ')',
            '-webkit-transform': 'scale(' + size + ')',
            '-ms-transform': 'scale(' + size + ')',
            'transform': 'scale(' + size + ')'

          });
          scaleFactor = size;
        }
        if (!scaleFactor) {
          var propertyValue = Stage.jqElement.css('transform');
          if (!propertyValue)
            propertyValue = Stage.jqElement.css('-webkit-transform');
          if (propertyValue && propertyValue != 'none')
            scaleFactor = parseFloat(propertyValue.replace(/^matrix(3d)?\((.*)\)$/, '$2').split(/, /)[0]);
          else
            scaleFactor = 1;
        }
        return scaleFactor;
      },
      css: function (cssObj) {
        if (cssObj)
          this.jqElement.css(cssObj);
        if (typeof cssObj == 'string')
          return this.jqElement.css(cssObj);
      },
      fontSize: function () {
        var fs = this.jqElement[0].style.fontSize;
        if (!fs)
          fs = this.css('font-size');
        return fs;

      },
      addClass: function (name) {
        Stage.jqElement.addClass(name)

      },
      append: function ($element) {
        Stage.jqElement.append($element);
      },
      isReadOnly: function () {
        return Stage.jqElement.hasClass('readonly');
      },
      setAsReadOnly: function () {
        Stage.addClass('readonly')
      },
      unsetAsReadOnly: function () {
        Stage.jqElement.removeClass('readonly');
      },
      init: function () {
        //#region meta declarations
        Audio = cet.dragndrop.Audio;
        option = cet.dragndrop.option;
        Baskets = cet.dragndrop.Baskets;
        Content = cet.dragndrop.Content;
        App = cet.dragndrop.App;
        //#endregion
        cet.dragndrop.Stage.$element = $('#stage');
        cet.dragndrop.Stage.jqElement = cet.dragndrop.Stage.$element;
      },
      getSymbol: function (selector) {
        return new symbol(selector);
      },
      eliminateIPadBounceEffect: function () { }
    };
  })();



  cet.dragndrop.Stage = Stage;


})();
