(function () {

  var NonPerishableStorage = (function () {

    return {
      addOption: function (option) {
        option.remove();
      },
      removeOption: function (option) { },
      removeOptionAndEliminateSpaces: function (option) { },
      overrideOption: function (option) {
        var options = cet.dragndrop.Storage.getOptions();
        options[option.getId()] = option;
      },
      eliminateSpaces: function () {
        if (cet.dragndrop.Storage.getNumberOfOptionsInStorage() < 7) {
          $('.button-navigation-left').hide();
          $('.button-navigation-right').hide();
        }
      },
      getOptionPosition: function (option) {

        var order = cet.dragndrop.Storage.getOrder();
        var positions = cet.dragndrop.Storage.getPositions();

        var index;
        for (var i = 0; i < order.length; i++) {
          if (order[i] == option.getId())
            index = i;
        }

        return positions[index];
      },

      makeRoom: function (option) {
        var optionPosition = cet.dragndrop.Storage.getOptionPosition(option);
        var leftPosition = cet.dragndrop.Units.Utils.percentageToPixel(optionPosition, cet.dragndrop.Storage.optionsWidth());
        var topPosition = cet.dragndrop.Units.Utils.percentageToPixel(cet.dragndrop.HtmlBuilder.OptionPercentageTop, cet.dragndrop.Storage.optionsHeight());
        return { left: leftPosition, top: topPosition };
      }
    }
  })();

  cet.dragndrop.NonPerishableStorage = NonPerishableStorage;

})();


 