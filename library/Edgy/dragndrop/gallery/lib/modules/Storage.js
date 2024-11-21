(function () {

  var Storage = (function () {
    var numberOfVisiblePositions;
    var hangingElement = null;
    var optionsContainerLeft;
    var optionsContainerWidth;
    var numberOfOptions;
    var navigationArrowLeft;
    var navigationArrowRight;
    var navigationArrowLeftSymbol;
    var navigationArrowRightSymbol;
    var jqStorage;
    var jqOptions

    var options;
    var order;
    var positions;


    var moving = false;

    var option;
    var Baskets;
    var Content;
    var Stage;
    var App;


    function hideOverflow() {

      jqStorage.css('overflow', 'hidden');
    }
    function showOverflow() {

      jqStorage.css('overflow', 'visible');
    }
    function showAll() {
      for (var key in options) {
        options[key].show();
      }
    }
    function getOptionClass(elem) {
      var classes = elem.attr('class').split(' ');
      for (var i in classes) {
        if (i && classes[i].indexOf('option') != -1 && classes[i].length == 7)
          return classes[i];
      }
      return null;

    }


    function isHiddenOnRight(option) {

      var optionsContainerLeft = parseInt(jqOptions.css('left').replace('px', ''))
      var optionRight = optionsContainerLeft + option.left() + option.width();

      if (optionRight > jqStorage.width())
        return true;
      return false;
    }
    function isHiddenOnLeft(option) {
      var optionsContainerLeft = parseInt(jqOptions.css('left').replace('px', ''))
      var tmp = optionsContainerLeft + option.left();

      if (tmp <= 0)
        return true;
      return false;
    }
    function isOptionVisible(option) {
      if (isHiddenOnLeft(option) || isHiddenOnRight(option))
        return false;
      return true;

    }
    function isOrderIndexVisible(index) {
      var optionsContainerLeft = parseInt(jqOptions.css('left').replace('px', ''))
      var tmp = optionsContainerLeft + positions[index];

      if (tmp < 0 || tmp + 5 > jqStorage.width())
        return false;
      return true;

    }
    function setOptionsVisibility() {

      for (var key in options) {
        var opt = options[key];
        if (isOptionVisible(opt))
          opt.show();
        else
          opt.hide();
      }

      setNavigationArrowsVisibility();

    }
    function getOptionByOrder(index) {
      return options[order[index]];
    }
    function getRequiredIndex(option) {
      var anchor = parseInt(jqStorage.css('left').replace('px'));
      var delta = jqStorage.width() / numberOfVisiblePositions;
      var orderIndexOfFirstVisibleOption = getOrderIndexOfFirstVisibleOption()
      if (orderIndexOfFirstVisibleOption == -1)
        return 0;
      for (var i = 0; i < numberOfVisiblePositions; i++) {
        anchor += delta;
        if (option.left() < anchor)
          return i + orderIndexOfFirstVisibleOption;
      }


      return orderIndexOfFirstVisibleOption + numberOfVisiblePositions;

      //for (var i = 0; i < order.length; i++) {
      // var option = options[order[i]];
      // if (isOptionVisible(option))
      //  return i + 2;
      //}
      throw 'no required index'
    }
    function isLastLeftOptionVisible() {
      return isOptionVisible(options[order[0]]);
    }
    function getOrderIndexOfFirstVisibleOption() {
      for (var i = 0; i < order.length; i++) {
        var option = getOptionByOrder(i);
        if (option && isOptionVisible(option))
          return i;
      }
      return -1;
    }
    function getOrderIndexOfLastVisibleOption() {
      for (var i = order.length - 1; i >= 0; i--) {
        var option = getOptionByOrder(i);
        if (option && isOptionVisible(option))
          return i;
      }
      return -1;
    }
    function sortOptionsbyLeftPosition(id1, id2) {
      var option1 = options[id1];
      var option2 = options[id2];

      if (option1.left() < option2.left())
        return -1

      return 1;
    }
    function initStoragePositions() {

      for (var i = 0; i < order.length; i++) {
        positions[i] = options[order[i]].left();
      }
    }
    function emptyPositionExits() {

      var orderIndexOfFirstVisibleOption = getOrderIndexOfFirstVisibleOption();
      if (orderIndexOfFirstVisibleOption == -1)
        return false;
      //var lastLeftHiddenOption = orderIndexOfFirstVisibleOption == 0 ? 0 : orderIndexOfFirstVisibleOption;
      for (var i = 0; i < numberOfVisiblePositions; i++) {
        if (!order[i + orderIndexOfFirstVisibleOption])
          return true;
      }
      return false;

    }
    function hiddenOptionsExists() {
      return hiddenLeftOptionsExists() || hiddenRightOptionsExists();
    }
    function hiddenLeftOptionsExists() {
      var index = 0;
      for (var i = order.length; i >= 0 ; i--) {
        if (order[i])
          index = i;
      }

      if (!order[index])
        return false;

      var lastOption = options[order[index]];
      if (isHiddenOnLeft(lastOption))
        return true;
      return false;
    }
    function hiddenRightOptionsExists() {
      var index = 0;
      for (var i = 0; i < order.length; i++) {
        if (order[i])
          index = i;
      }

      if (!order[index])
        return false;
      var lastOption = options[order[index]];
      if (isHiddenOnRight(lastOption))
        return true;
      return false;
    }
    function shiftAllLeft() {
      optionsContainerLeft = optionsContainerLeft + (optionsContainerWidth / numberOfOptions);
      jqOptions.css('left', optionsContainerLeft);
    }
    function shiftAllRight() {
      optionsContainerLeft = optionsContainerLeft - (optionsContainerWidth / numberOfOptions);
      jqOptions.css('left', optionsContainerLeft);
    }
    function getFirstLeftVisibleOrderIndex() {
      //if (!order[getVisibilityLeftBoundry()])
      //  return getVisibilityLeftBoundry();
      for (var i = 0; i < order.length; i++) {
        if (isOrderIndexVisible(i)) {
          return i;
        }
      }
      throw 'no visible options';
    }
    function getFirstRightVisibleOrderIndex() {
      for (var i = order.length - 1; i >= 0; i--) {
        if (isOrderIndexVisible(i)) {
          return i;
        }
      }
      throw 'no visible options';
    }
    function getVisibilityLeftBoundry() {
      return (numberOfOptions - numberOfVisiblePositions) / 2;
    }
    function getVisibilityRightBoundry() {
      return ((numberOfOptions - numberOfVisiblePositions) / 2) + numberOfVisiblePositions - 1;
    }
    function isStorageEmpty() {

      for (var i = 0; i < order.length; i++) {
        if (order[i])
          return false;
      }
      return true;
    }
    function isMovingRight() {

      var lastIndex = order[order.length - 1];
      return lastIndex == null;

    }
    function shiftRight(requiredIndex) {
      var newRoomPosition;
      for (var i = order.length - 1; i > requiredIndex; i--) {
        var key = order[i - 1];
        if (!key)
          continue;
        var option = options[key];

        newRoomPosition = option.position();
        option.shift(positions[i]);

        order[i] = order[i - 1];
        order[i - 1] = null;

      }

      return newRoomPosition;
    }
    function shiftLeft(requiredIndex) {
      var newRoomPosition;
      for (var i = 0; i < requiredIndex; i++) {
        var key = order[i + 1];
        if (!key)
          continue;

        var option = options[key];

        newRoomPosition = option.position();
        option.shift(positions[i]);

        order[i] = order[i + 1];
        order[i + 1] = null;

      }
      return newRoomPosition;
    }
    function getNextRightOptionIndex(index) {
      for (var i = 1; i + index < order.length; i++) {
        if (order[i + index])
          return i + index;
      }
      return -1;

    }
    function getNextLeftOptionIndex(index) {
      for (var i = index; i >= 0; i--) {
        if (order[i])
          return i;
      }
      return -1;

    }

    function setNavigationArrowsVisibility() {

      /************* left *******************/
      if (!navigationArrowLeft.hasClass('active')) {
        if (hiddenLeftOptionsExists()) {
          enableNavigationLeftArrow();
        }
        else {
          disableNavigationLeftArrow();
        }
      }

      /************* right *******************/
      if (!navigationArrowRight.hasClass('active')) {
        if (hiddenRightOptionsExists()) {
          enableNavigationRightArrow();
        }
        else {
          disableNavigationRightArrow();
        }
      }
    }

    function disableNavigationArrows() {
      disableNavigationLeftArrow();
      disableNavigationRightArrow();
    }
    function disableNavigationLeftArrow() {
      navigationArrowLeftSymbol.stop('disable');
      navigationArrowLeft.removeClass('disable hover').addClass('disable');
    }
    function disableNavigationRightArrow() {
      navigationArrowRightSymbol.stop('disable');
      navigationArrowRight.removeClass('disable hover').addClass('disable');
    }

    function enableNavigationArrows() {
      if (hiddenRightOptionsExists()) {
        enableNavigationRightArrow();
      }
      if (hiddenLeftOptionsExists()) {
        enableNavigationLeftArrow();
      }
    }

    function enableNavigationRightArrow() {
      bringNavigationButtonsToFront();
      navigationArrowRight.removeClass('disable');
      var label = navigationArrowRight.hasClass('hover') ? 'hover' : 'normal'
      navigationArrowRightSymbol.stop(label);
    }
    function enableNavigationLeftArrow() {
      bringNavigationButtonsToFront();
      navigationArrowLeft.removeClass('disable');
      var label = navigationArrowLeft.hasClass('hover') ? 'hover' : 'normal'
      navigationArrowLeftSymbol.stop(label);
    }

    function initNavigationArrows() {

      navigationArrowLeft = $('.button-navigation-left');
      navigationArrowRight = $('.button-navigation-right');
      navigationArrowLeftSymbol = Stage.getSymbol(navigationArrowLeft);
      navigationArrowRightSymbol = Stage.getSymbol(navigationArrowRight);

      /********************* left ******************************/
      navigationArrowLeft.hover(
       function () {
         if (navigationArrowLeft.hasClass('disable'))
           return;
         navigationArrowLeftSymbol.stop('hover');
         navigationArrowLeft.addClass('hover')
       },
       function () {
         if (navigationArrowLeft.hasClass('disable'))
           return;
         navigationArrowLeft.removeClass('hover')
         navigationArrowLeftSymbol.stop('normal');
       }
      )
      navigationArrowLeft.on('mousedown', function () {
        if (navigationArrowLeft.hasClass('disable'))
          return;
        navigationArrowLeftSymbol.stop('down');
        navigationArrowLeft.removeClass('active').addClass('active');
      });
      navigationArrowLeft.on('mouseup', function () {
        if (navigationArrowLeft.hasClass('disable'))
          return;
        navigationArrowLeftSymbol.stop('hover');
        navigationArrowLeft.removeClass('active');
        nevigationArrowLeftClickHandler();
      });

      /******************** right ******************************/
      navigationArrowRight.hover(
       function () {
         if (navigationArrowRight.hasClass('disable'))
           return;
         navigationArrowRightSymbol.stop('hover');
         navigationArrowRight.addClass('hover')
       },
       function () {
         if (navigationArrowRight.hasClass('disable'))
           return;
         navigationArrowRight.removeClass('hover')
         navigationArrowRightSymbol.stop('normal');
       }
      )
      navigationArrowRight.on('mousedown', function () {
        if (navigationArrowRight.hasClass('disable'))
          return;
        navigationArrowRightSymbol.stop('down');
        navigationArrowRight.removeClass('active').addClass('active');

      });
      navigationArrowRight.on('mouseup', function () {
        if (navigationArrowRight.hasClass('disable'))
          return;
        navigationArrowRightSymbol.stop('hover');
        navigationArrowRight.removeClass('active');
        nevigationArrowRightClickHandler();
      });
    }

    function nevigationArrowLeftClickHandler() {
      setNavigationArrowsVisibility();

      if (moving)
        return;
      if (navigationArrowLeft.hasClass('disable'))
        return;

      moving = true;
      hideOverflow();
      showAll();
      shiftAllLeft();


      setTimeout(function () {
        setOptionsVisibility();
        showOverflow();
        moving = false;
      }, 500);
    }
    function nevigationArrowRightClickHandler() {
      setNavigationArrowsVisibility();

      if (moving)
        return;

      if (navigationArrowRight.hasClass('disable'))
        return;

      moving = true;
      hideOverflow()
      showAll();

      shiftAllRight();


      setTimeout(function () {

        setOptionsVisibility();
        showOverflow();
        moving = false;

      }, 500);
    }

    function isEliminateSpacesNecessary() {

      if (hiddenOptionsExists())
        return true;

      for (var i = 0; i < order.length - 2; i++) {
        if (order[i] && !order[i + 1] && order[i + 2])
          return true;
      }
    }
    function setStorageAnimationClass() {
      if (jqOptions.hasClass('animate-transition'))
        return;
      jqOptions.addClass('animate-transition');
    }
    function bringNavigationButtonsToFront() {
      navigationArrowLeft.css('z-index', '');
      navigationArrowRight.css('z-index', '');
    }
    function initNumberOfVisibleOptions() {
      var widthWithMargin = options[order[1]].left() - options[order[0]].left();

      var width = options[order[0]].width();

      var calculatedWidth = width;
      var counter = 0;
      while (calculatedWidth < jqStorage.width()) {
        calculatedWidth += widthWithMargin;
        counter++;

      }
      numberOfVisiblePositions = counter;

    }

    function initNavigationArrows() {

      navigationArrowLeft = $('.button-navigation-left');
      navigationArrowRight = $('.button-navigation-right');
      navigationArrowLeftSymbol = Stage.getSymbol(navigationArrowLeft);
      navigationArrowRightSymbol = Stage.getSymbol(navigationArrowRight);

      /********************* left ******************************/
      navigationArrowLeft.hover(
       function () {
         if (navigationArrowLeft.hasClass('disable'))
           return;
         navigationArrowLeftSymbol.stop('hover');
         navigationArrowLeft.addClass('hover')
       },
       function () {
         if (navigationArrowLeft.hasClass('disable'))
           return;
         navigationArrowLeft.removeClass('hover')
         navigationArrowLeftSymbol.stop('normal');
       }
      )
      navigationArrowLeft.on('mousedown', function () {
        if (navigationArrowLeft.hasClass('disable'))
          return;
        navigationArrowLeftSymbol.stop('down');
        navigationArrowLeft.removeClass('active').addClass('active');
      });
      navigationArrowLeft.on('mouseup', function () {
        if (navigationArrowLeft.hasClass('disable'))
          return;
        navigationArrowLeftSymbol.stop('hover');
        navigationArrowLeft.removeClass('active');
        nevigationArrowLeftClickHandler();
      });

      /******************** right ******************************/
      navigationArrowRight.hover(
       function () {
         if (navigationArrowRight.hasClass('disable'))
           return;
         navigationArrowRightSymbol.stop('hover');
         navigationArrowRight.addClass('hover')
       },
       function () {
         if (navigationArrowRight.hasClass('disable'))
           return;
         navigationArrowRight.removeClass('hover')
         navigationArrowRightSymbol.stop('normal');
       }
      )
      navigationArrowRight.on('mousedown', function () {
        if (navigationArrowRight.hasClass('disable'))
          return;
        navigationArrowRightSymbol.stop('down');
        navigationArrowRight.removeClass('active').addClass('active');

      });
      navigationArrowRight.on('mouseup', function () {
        if (navigationArrowRight.hasClass('disable'))
          return;
        navigationArrowRightSymbol.stop('hover');
        navigationArrowRight.removeClass('active');
        nevigationArrowRightClickHandler();
      });
    }

    return {
      getOrder: function () { return order; },
      init: function () {
        var self = this;

        option = cet.option;
        Baskets = cet.Baskets;
        Content = cet.Content;
        Stage = cet.Stage;
        App = cet.App;


        jqStorage = $('.storage');
        jqOptions = $('.options');

        options = {};
        order = [];
        positions = [];


        var optionJqElements = jqOptions.find('.option');
        if (optionJqElements.length != Content.getOptions().length)
          throw 'number of options on page do not match number of options on content.js';
        $.each(optionJqElements, function (index, elem) {
          var optionData = Content.getOptionByIndex(index)
          if (!optionData)
            debugger;
          var newOption = new option(elem, optionData);


          options[newOption.getId()] = newOption;
          order.push(newOption.getId());
        });

        initNavigationArrows();
        order.sort(sortOptionsbyLeftPosition);
        initNumberOfVisibleOptions();
        initStoragePositions();
        setOptionsVisibility();
        setStorageAnimationClass();

        numberOfOptions = optionJqElements.length;
        optionsContainerLeft = parseInt(jqOptions.css('left').replace('px', ''));

        optionsContainerWidth = parseInt(jqOptions.css('width').replace('px', ''));


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
        if (!options[option.getId()])
          options[option.getId()] = option;
        order[Storage.getAvailableOrderIndex()] = option.getId();
        jqOptions.append(option.jqElement);
        option.enableHorizontalAnimationInStorage();
        setOptionsVisibility();

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
      removeOptionAndEliminateSpaces: function (option) {
        Storage.removeOption(option);
        Storage.eliminateSpaces();

      },
      eliminateSpaces: function () {
        var duration = App.animationStopped() ? 0 : 500;
        hideOverflow();
        showAll();
        if (hiddenRightOptionsExists()) {

          for (var i = getFirstLeftVisibleOrderIndex() ; i < order.length - 1; i++) {
            var currentOption = order[i];
            if (currentOption == null) {

              var nextOptionIndex = getNextRightOptionIndex(i);
              if (nextOptionIndex == -1) {
                if (emptyPositionExits() && hiddenOptionsExists())
                  shiftLeft();

                setTimeout(function () {
                  setOptionsVisibility();
                  showOverflow();
                }, duration);
                return;
              }
              var nextOption = order[nextOptionIndex];
              options[nextOption].shift(positions[i]);
              order[i] = nextOption;
              order[nextOptionIndex] = null;
            }
          }

          setTimeout(function () {
            setOptionsVisibility();
            showOverflow();
          }, duration);
        }
        else if (hiddenLeftOptionsExists()) {

          for (var i = getFirstRightVisibleOrderIndex() ; i >= 0 && isEliminateSpacesNecessary() ; i--) {
            var currentOption = order[i];
            if (currentOption == null) {
              var nextOptionIndex = getNextLeftOptionIndex(i);
              if (nextOptionIndex == -1) {
                if (emptyPositionExits() && hiddenOptionsExists())
                  shiftLeft();
                setTimeout(function () {
                  setOptionsVisibility();
                  showOverflow();
                }, duration);
                return;
              }
              var nextOption = order[nextOptionIndex];
              options[nextOption].shift(positions[i]);
              order[i] = nextOption;
              order[nextOptionIndex] = null;
            }
          }



          setTimeout(function () {
            //fixOrderGaps();
            setOptionsVisibility();
            showOverflow();
          }, duration);
        }
        else {
          for (var i = getOrderIndexOfLastVisibleOption() ; i >= 0 && isEliminateSpacesNecessary() ; i--) {
            var currentOption = order[i];
            if (currentOption == null) {
              var nextOptionIndex = getNextLeftOptionIndex(i);
              if (nextOptionIndex == -1) {
                if (emptyPositionExits() && hiddenOptionsExists())
                  shiftLeft();
                setTimeout(function () {
                  setOptionsVisibility();
                  showOverflow();
                }, duration);
                return;
              }
              var nextOption = order[nextOptionIndex];
              options[nextOption].shift(positions[i]);
              order[i] = nextOption;
              order[nextOptionIndex] = null;
            }
          }



          setTimeout(function () {
            //fixOrderGaps();
            setOptionsVisibility();
            showOverflow();
          }, duration);
        }
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
      bringToFront: function () {
        bringNavigationButtonsToFront();
      },
      removeFromFront: function () {
        this.setZindexes(0);
      },

      setZindexes: function (val) {
        jqStorage.css('z-index', val);
        navigationArrowLeft.css('z-index', val);
        navigationArrowRight.css('z-index', val);

        for (var key in options) {
          options[key].setZindex(val);
        }
      },
      makeRoom: function (option) {

        var newRoomPosition = Storage.getAvailableRoom();
        if (newRoomPosition) {
          return newRoomPosition;
        }
        hideOverflow();

        var requiredIndex = getRequiredIndex(option);

        if (isMovingRight()) {
          newRoomPosition = shiftRight(requiredIndex);
        }
        else {
          newRoomPosition = shiftLeft(requiredIndex);
        }

        var duration = App.animationStopped() ? 0 : 500;
        setTimeout(function () {

          setOptionsVisibility();
          showOverflow();

        }, duration);



        return newRoomPosition;
      },
      getAvailableRoom: function () {

        var orderIndex = Storage.getAvailableOrderIndex();
        if (orderIndex == null)
          return null;

        return { left: positions[orderIndex], top: 0 };

      },
      getAvailableOrderIndex: function () {

        if (isStorageEmpty()) {
          var index = parseInt((getFirstLeftVisibleOrderIndex() + (numberOfVisiblePositions / 2)) - 1);
          if (numberOfVisiblePositions == 1)
            index++;
          return index;

        }

        if (hangingElement) {

          for (var i = 0; i < order.length; i++) {
            if (order[i] == hangingElement.getId())
              return i;
          }
        }

        var availableIndex = null;
        for (var i = 0; i < order.length; i++) {
          if (isOrderIndexVisible(i)) {
            if (!order[i])
              availableIndex = i;
            else if (order.length < i + 1 && !order[i + 1] && isOrderIndexVisible(i + 1))
              return i + 1;
          }

        }

        return availableIndex;
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
        var elem = jqOptions;
        while (elem.attr('id') != 'Stage') {
          pos.left += parseInt(elem.css('left').replace('px', ''));
          pos.top += parseInt(elem.css('top').replace('px', ''));
          elem = elem.parent();
        }
        return pos;
      },
      setOptionsVisibility: function () {

        for (var key in options) {
          var opt = options[key];
          if (isOptionVisible(opt))
            opt.show();
          else
            opt.hide();
        }

      },
      setElementAsHanging: function (option) {
        hangingElement = option;

      },
      getOptionById: function (id) {
        id = cet.Utils.supportOldIds(id);
        return options[id];

      },
      hideContainer: function () {
        jqStorage.hide();
      },
      showContainer: function () {
        jqOptions.show();
        jqStorage.show();
      },
      hide: function () {
        jqStorage.hide();
        navigationArrowLeft.hide();
        navigationArrowRight.hide();
      },
      show: function () {
        jqStorage.show();
        navigationArrowLeft.show();
        navigationArrowRight.show();
      },
      enableNavigationArrows: function () {
        enableNavigationArrows();
      },
      disableNavigationArrows: function () {
        disableNavigationArrows();
      },
      disableAllOptions: function () {
        for (var key in options) {
          options[key].disable();
        }
      },
      disableAll: function () {
        Storage.disableAllOptions();
        disableNavigationArrows();
      },
      enableAll: function () {
        Storage.enableAllOptions();
        setNavigationArrowsVisibility();

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
      resizeHandler: function () {
        for (var key in options) {
          options[key].resizeHandler();
        }
      },
      isOptionInValidStoragePosition: function (option) {
        var self = this;
        var optionDistanceFromStage = option.getDistanceFromStage();
        var storageDistanceFromStage = Storage.getDistanceFromStage();
        if (optionDistanceFromStage.top < storageDistanceFromStage.top)
          return false;
        var positionLeft = optionDistanceFromStage.left - storageDistanceFromStage.left;
        for (var i = 0; i < positions.length; i++) {
          if (positionLeft == positions[i])
            return true;
        }

        return false;
      }


    };
  })();



  cet.Storage = Storage;

})();
