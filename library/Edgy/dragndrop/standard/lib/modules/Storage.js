(function () {

  var Storage = (function () {

    var hangingElement = null;
    var numberOfOptions;
    var jqStorage;
    var options;
    var order;
    var positions;
    var option;
    var Baskets;
    var Content;
    var Stage;
    var App;

    function bringNavigationButtonsToFront() { }

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
    function initStoragePositions() {
      for (var key in options) {
        positions[key] = options[key].position();
      }

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


        jqStorage = $('.storage');

        options = {};
        order = [];
        positions = {};


        var optionJqElements = jqStorage.find('.option');
        if (optionJqElements.length != Content.getOptions().length)
          throw 'number of options on page do not match number of options on content.js';
        $.each(optionJqElements, function (index, elem) {
          var optionData = Content.getOptionByIndex(index)
          if (!optionData)
            debugger;
          var newOption = new option(elem, optionData);


          options[newOption.getId()] = newOption;
          //order.push(newOption.getId());
        });


        initStoragePositions();


        numberOfOptions = optionJqElements.length;





      },

      reloadOptionsContent: function () {
        var optionsData = Content.getOptions();

        var tmpOptions = options;
        options = {};

        for (var i = 0; i < optionsData.length; i++) {
          var optionData = optionsData[i];
          var option = tmpOptions[optionData.id];
          if (!option)
            debugger;
          option.reloadData(optionData);
          options[option.getId()] = option;
        };

      },
      addOption: function (option) {
        if (!options[option.getId()])
          options[option.getId()] = option;
        jqStorage.append(option.jqElement);
        option.jqElement.css(positions[option.getId()]);
        option.enableHorizontalAnimationInStorage();
        hangingElement = null;
      },
      removeOption: function (option) {

        if (!options[option.getId()])
          return;//throw 'cannot add existing option to storage'

        delete options[option.getId()];
        var optionIndex = order.indexOf(option.getId());
        order[optionIndex] = null;
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
      setElementAsHanging: function (option) {
        hangingElement = option;

      },
      getOptionById: function (id) {
        id = cet.Utils.supportOldIds(id);
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
      disableAllOptions: function () {
        for (var key in options) {
          options[key].disable();
        }
      },
      disableAll: function () {
        Storage.disableAllOptions();
      },
      enableAll: function () {
        Storage.enableAllOptions();
        //setNavigationArrowsVisibility();

      },
      disableAllOptionsExceptMe: function (option) {
        for (var key in options) {
          if (options[key].getId() != option.getId())
            options[key].disable();
        }
      },
      enableAllOptions: function () {
        for (var key in options) {
          options[key].enable();
        }
      },
      getOptions: function () {
        return options;
      },
      bringToFront: function () { },
      eliminateSpaces: function () { },
      removeOptionAndEliminateSpaces: function (option) {
        this.removeOption(option);
      },
      makeRoom: function (option) {
        return positions[option.getId()];
      },
      isOptionInValidStoragePosition: function (option) {
        return this.getOptionById(option.getId());
      },
      disableNavigationArrows: function () { },
      enableNavigationArrows: function () { },
      hideContainer: function () {
        jqStorage.hide();
      },
      showContainer: function () {
        jqStorage.show();
      },
      getOrder: function () {
        return order;
      },
      getPositions: function () {
        return positions;
      },
      resizeHandler: function () {
        for (var key in options) {
          options[key].resizeHandler();
        }
      },
      bringToFront: function () {
        bringNavigationButtonsToFront();
      },
      removeFromFront: function () {
        this.setZindexes(0);
      }
      

    };
  })();


  cet.Storage = Storage;

})();
