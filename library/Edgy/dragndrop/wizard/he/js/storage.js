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
    var jqOptionsWidth;
    var options;
    var order;
    var positions;
    var distanceFromStage;

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

    function getStorageLeft() {
      return parseFloat(jqStorage[0].style.left.replace('%', ''))
    }
    function getStoragePixelWidth() {
      return jqStorage.width();
    }
    function getStoragePixelHeight() {
      return jqStorage.height();
    }
    function isHiddenOnRight(option) {

      var optionsContainerPixelLeft = parseFloat(jqOptions.css('left').replace('px', ''))
      var optionRight = optionsContainerPixelLeft + option.pixelLeft() + option.pixelWidth();

      if (optionRight > getStoragePixelWidth())
        return true;
      return false;
    }
    function isHiddenOnLeft(option) {
      var optionsContainerPixelLeft = parseFloat(jqOptions.css('left').replace('px', ''))
      var tmp = optionsContainerPixelLeft + option.pixelLeft();

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
      var optionsContainerPixelLeft = parseFloat(jqOptions.css('left').replace('px', ''))
      var pixelPosition = ((positions[index] * jqOptions.width()) / 100);
      var tmp = optionsContainerPixelLeft + pixelPosition;

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
      var anchor = getStorageLeft();
      var delta = jqStorage.width() / numberOfVisiblePositions;
      var orderIndexOfFirstVisibleOption = getOrderIndexOfFirstVisibleOption()
      if (orderIndexOfFirstVisibleOption == -1)
        return 0;
      for (var i = 0; i < numberOfVisiblePositions; i++) {
        anchor += delta;
        if (option.units.percentage.left < anchor)
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
      throw -1;
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

      //var delta = ((optionsContainerWidth - cet.dragndrop.HtmlBuilder.OptionPercentageMargin) / numberOfOptions);
      var delta = delta = 16.775;
      optionsContainerLeft = optionsContainerLeft + delta;
      jqOptions.css('left', optionsContainerLeft + '%');
    }
    function shiftAllRight() {

      //var delta = ((optionsContainerWidth - cet.dragndrop.HtmlBuilder.OptionPercentageMargin) / numberOfOptions);
      var delta = delta = 16.775;
      optionsContainerLeft = optionsContainerLeft - delta;
      jqOptions.css('left', optionsContainerLeft + '%');
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

    function initNavigationArrows () {

      navigationArrowLeft = $('.button-navigation-left');
      navigationArrowRight = $('.button-navigation-right');
      navigationArrowLeftSymbol = new symbol(navigationArrowLeft);
      navigationArrowRightSymbol = new symbol(navigationArrowRight);

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
        navigationArrowLeftClickHandler();
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
        //$('.console').text('click')
        navigationArrowRightSymbol.stop('hover');
        navigationArrowRight.removeClass('active');
        nevigationArrowRightClickHandler();
      });
    }

    function navigationArrowLeftClickHandler() {
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
        if (order[i]) {//option exists
          for (var j = i + 1; j < order.length; j++) {
            if (!order[j]) {//missing option
              for (var k = j + 1; k < order.length; k++) {
                if (order[k])//options exists
                  return true;
              }
            }
          }
        }
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
      //fix merge

      var widthWithMargin = options[order[1]].left() - options[order[0]].left();
      var width = options[order[0]].width();

      var calculatedWidth = width;
      var counter = 0;
      while (calculatedWidth < jqStorage.width()) {
        calculatedWidth += widthWithMargin;
        counter++;

      }
      numberOfVisiblePositions = counter;


      numberOfVisiblePositions = parseInt(getStoragePixelWidth() / options[order[0]].pixelWidth());
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

    return {
      getOrder: function () { return order; },
      init: function () {
        var self = this;

        option = cet.dragndrop.option;
        Baskets = cet.dragndrop.Baskets;
        Content = cet.dragndrop.Content;
        Stage = cet.dragndrop.Stage;
        App = cet.dragndrop.App;


        jqStorage = $('.storage');
        jqOptions = $('.options');
        jqOptionsWidth = jqOptions.width();
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
      
        optionsContainerLeft = parseFloat(jqOptions[0].style.left.replace('%', ''));

        optionsContainerWidth = parseFloat(jqOptions[0].style.width.replace('%', ''));

        //this call is important, for an IPAD issue 67299
        self.eliminateSpaces();


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

        var targetCss = {
          width: cet.dragndrop.HtmlBuilder.OptionPercentageWidth + '%',
          height: cet.dragndrop.HtmlBuilder.OptionPercentageHeight + '%'
        }

        option.animate(targetCss);

        option.width(targetCss.width);
        option.height(targetCss.height);

        //option.width(cet.dragndrop.HtmlBuilder.OptionPercentageWidth + '%')
        //option.height(cet.dragndrop.HtmlBuilder.OptionPercentageHeight + '%')

        jqOptions.append(option.jqElement);
        option.enableHorizontalAnimationInStorage();
        setOptionsVisibility();
        option.removeFromFront();
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

        newRoomPosition.left = cet.dragndrop.Units.Utils.percentageToPixel(newRoomPosition.left, jqOptions.width());
        newRoomPosition.top = cet.dragndrop.Units.Utils.percentageToPixel(newRoomPosition.top, jqOptions.height());

        return newRoomPosition;

      },
      getAvailableRoom: function () {

        var orderIndex = Storage.getAvailableOrderIndex();
        if (orderIndex == null)
          return null;
        //var leftPosition = cet.dragndrop.Utils.percentageToPixel(positions[orderIndex], getStoragePixelWidth());
        var leftPosition = cet.dragndrop.Units.Utils.percentageToPixel(positions[orderIndex], jqOptions.width());
        var topPosition = cet.dragndrop.Units.Utils.percentageToPixel(cet.dragndrop.HtmlBuilder.OptionPercentageTop, jqOptions.height());

        return { left: leftPosition, top: topPosition };

      },
      getAvailableOrderIndex: function () {

        //var lastLeftHiddenOption = (order.length - numberOfVisiblePositions) / 2;
        //var firstRightHiddenOption = order.length - lastLeftHiddenOption;

        if (isStorageEmpty()) {
          return parseInt(getFirstLeftVisibleOrderIndex());
          //return parseInt((getFirstLeftVisibleOrderIndex() + (numberOfVisiblePositions / 2)) - 1);
        }

        if (hangingElement) {

          for (var i = 0; i < order.length; i++) {
            if (order[i] == hangingElement.getId())
              return i;

          }
        }

        //for (var i = lastLeftHiddenOption; i < firstRightHiddenOption; i++) {

        //  //when more then one index available, return the one next the a populated one
        //  if (order[i] == null && order[i + 1] != null)
        //    return i;

        //  //when the available index is the last one.
        //  //if (order[i] == null && i == (firstRightHiddenOption - 1))
        //  if (order[i] == null && order[i - 1] != null)
        //    return i;
        //}

        var availableIndex = null;
        for (var i = 0; i < order.length; i++) {
          if (isOrderIndexVisible(i)) {
            if (!order[i])
              availableIndex = i;
            else if ((i + 1) < order.length && !order[i + 1] && isOrderIndexVisible(i + 1))
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
        if (!distanceFromStage) {
          var pos = { top: 0, left: 0 };
          var $elem = jqOptions;

          while ($elem.attr('id') != 'stage') {

            //pos.left += cet.dragndrop.Utils.percentageToPixel(parseFloat($elem[0].style.left.replace('%', '')), $elem.parent().width());
            //pos.top += cet.dragndrop.Utils.percentageToPixel(parseFloat($elem[0].style.top.replace('%', '')), $elem.parent().height());
            pos.left += parseFloat($elem.css('left').replace('%', ''));
            pos.top += parseFloat($elem.css('top').replace('px', ''));
            $elem = $elem.parent();
          }

          distanceFromPage = pos;
        }
        return distanceFromPage;
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
        if (Baskets.count() > 6) {
          navigationArrowLeft.show();
          navigationArrowRight.show();
        }
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
          if (options[key] != option)
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
      getPositions: function () {
        return positions;
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
      },
      getPositionByPercentage: function (posByPixel) {
        jqOptionsWidth = jqOptions.width();
        return {
          left: (100 * (posByPixel.left / jqOptionsWidth)) + '%',
          top: cet.dragndrop.HtmlBuilder.OptionPercentageTop + '%'
        };
      },
      optionsHeight: function () {
        return jqOptions.height();

      },
      optionsWidth: function () {
        return jqOptions.width();
      },
      resizeOptions: function () { },
      adjustOptionsSize: function () {
        for (var key in options) {
          options[key].adjustOptionSize();
        }
        
      }


    }
  })();



  cet.dragndrop.Storage = Storage;


})();
