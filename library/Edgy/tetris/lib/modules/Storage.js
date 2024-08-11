(function () {

  var Storage = (function () {

    var hangingElement = null;
    var numberOfOptions;
    var jqStorage;
    var options;
    var order;
    var option;
    var Baskets;
    var Content;
    var Stage;
    var App;


    function getOptionClass(elem) {
      var classes = elem.attr('class').split(' ');
      for (var i in classes) {
        if (i && classes[i].indexOf('option') != -1 && classes[i].length == 7)
          return classes[i];
      }
      return null;

    }
    function getOptionByOrder(index) {
      return options[order[index]];
    }
    function isStorageEmpty() {

      for (var i = 0; i < order.length; i++) {
        if (order[i])
          return false;
      }
      return true;
    }

    return {
      init: function () {

        option = cet.option;
        Baskets = cet.Baskets;
        Content = cet.Content;
        Stage = cet.Stage;
        App = cet.App;

        options = {};
        order = [];


        numberOfOptions = Content.getNumberOfOptions();

        for (var index = 0; index < numberOfOptions; index++) {
          var optionData = Content.getOptionByIndex(index)
          if (!optionData)
            debugger;

          var newOption = new option(optionData);


          options[newOption.getId()] = newOption;
          order.push(newOption.getId());
        }

      },
      shuffleOptions: function () {

        Content.shuffleWithoutReload();
        Storage.reloadOptionsContent();


      },
      reloadOptionsContent: function () {
        var optionsData = Content.getOptions();

        var tmpOrder = order;
        order = [];

        var tmpOptions = options;
        options = {};

        for (var i = 0; i < optionsData.length; i++) {
          var optionData = optionsData[i];
          //var option = tmpOptions[optionData.id];
          var option = tmpOptions[tmpOrder[i]];
          if (!option)
            debugger;
          option.reloadData(optionData);
          options[option.getId()] = option;
          order.push(option.getId());
        };

      },
      addOption: function (option) {
        if (!options[option.getId()]) {
          options[option.getId()] = option;
          //add option in a random order index
          var randomIndex = Math.floor((Math.random() * order.length));
          order.splice(randomIndex, 0, option.getId());
          option.showAsInStorage();
        }
      },
      addOptions: function (options) {
        for (var i = 0; i < options.length; i++) {
          Storage.addOption(options[i]);
        }
      },
      removeOption: function (option) {

        if (!options[option.getId()])
          return;//throw 'cannot add existing option to storage'

        delete options[option.getId()];
        var optionIndex = order.indexOf(option.getId());
        order[optionIndex] = null;
        order = order.filter(function (n) { return n });
        hangingElement = null;
      },
      forgetOption: function (option) {
        delete options[option.getSymbolTypeName()];
      },
      getOptionByJQueryElement: function (jqElement) {
        var optionId = getOptionClass(jqElement);
        if (optionId)
          return this.options[optionId];
        return null;
      },
      setZindexes: function (val) {
        jqStorage.css('z-index', val);
        for (var key in options) {
          options[key].setZindex(val);
        }
      },
      getNumberOfOptionsInStorage: function () {
        var count = 0;
        for (var i = 0; i < order.length; i++) {
          if (order[i])
            count++;
        }
        return count;
      },
      getDistanceFromStage: function () {

        var pos = { top: 0, left: 0 };
        var elem = jqStorage;
        while (elem.attr('id') != 'Stage') {
          pos.left += parseInt(elem.css('left').replace('px', ''));
          pos.top += parseInt(elem.css('top').replace('px', ''));
          elem = elem.parent();
        }
        return pos;
      },
      getOptionById: function (id) {
        return options[id];

      },
      hide: function () {
        jqStorage.hide();
        navigationArrowLeft.hide();
        navigationArrowRight.hide();
      },
      show: function () {
        jqStorage.show();
      },
      getOptions: function () {
        return options;
      },
      getOrder: function () {
        return order;
      },
      dropOption: function () {
        var dropId = order[order.length - 1];
        var imDropping = options[dropId];
        imDropping.startDropping();
        order.pop();
        options[dropId] = null;
        delete options[dropId];
        return imDropping;
      },
      hasMoreOptions: function () {
        return order.length > 0;
      },
      isEmpty: function () {
        return !Storage.hasMoreOptions();
      }


    };
  })();


  cet.Storage = Storage;

})();
