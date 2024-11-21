window.cet = window.cet || {};

(function () {

  var Baskets = (function () {
    //#region meta declarations

    var App;
    var Audio;
    var option;
    var Content;
    var Stage;
    var Buttons;
    var Lms;
    var Feedback;
    var basket;
    var Proportions;

    //#endregion

    var baskets;
    var basketsArray;
    var basketTop;
    var horizontalShift;



    var count;

    function sortBasketsByLeftPosition(a, b) {
      return a.leftAsNumber() > b.leftAsNumber();
    }

    return {
      init: function () {
        //#region meta declarations

        App = cet.App;
        Audio = cet.Audio;
        option = cet.option;
        Content = cet.Content;
        Stage = cet.Stage;
        Buttons = cet.Buttons;
        Lms = cet.Lms;
        Feedback = cet.Feedback;
        basket = cet.basket;
        Proportions = cet.Proportions;

        //#endregion

        baskets = {};
        basketsArray = [];

        var basketIds = Content.getBasketIds();
        Baskets.count(basketIds.length);

        var basketMarginLeft = Proportions.getBasketMarginLeft();
        var basketsLeft = Proportions.getBasketsLeft();
        var basketsTop = Proportions.getBasketsTop();
        var basketWidth = Proportions.getBasketWidth();

        for (var i = 0; i < basketIds.length; i++) {
          var currLeft = basketsLeft + (i * (basketWidth + basketMarginLeft));
          var newBasket = new basket(basketIds[i], { left: currLeft + '%', top: basketsTop + '%' });
          baskets[newBasket.getId()] = newBasket;
          basketsArray.push(newBasket);
        }


        basketsArray.sort(sortBasketsByLeftPosition)
        this.setBasketsBackground();

      },
      setBasketsBackground: function () {

        var style = {
          position: 'absolute',
          width: '100%',
          height: (Proportions.getBasketHeight() - Proportions.getBasketTitleHeight() + 1) + '%',
          backgroundColor: '#363437',
          left: 0,
          top: (Proportions.getBasketsTop() + Proportions.getBasketTitleHeight()) + '%'
        }
        var background = $('<div id="baskets-background" ></div>').css(style);

        $('#Stage').append(background);

      },
      getBasketByJqElement: function (elem) {
        if (!elem.hasClass('basket'))
          elem = elem.parents('.basket');
        if (elem.length == 0)
          return null;
        var basketId = elem.attr('class').split(' ')[2];
        return baskets[basketId];
      },
      showFeedback: function () {
        for (var key in baskets) {
          baskets[key].showFeedback();
        }
      },
      isPerfectSolution: function () {

        for (var key in baskets) {
          if (!baskets[key].isValid()) {
            return false;
          }
        }
        return true;

      },
      unpopulate: function () {

        for (var key in baskets) {
          if (baskets[key].isPopulated()) {
            baskets[key].unpopulate();
          }
          else
            baskets[key].removeFeedback();
        }


      },
      getPopulation: function () {
        var population = {}
        for (var key in baskets) {

          var options = baskets[key].getOptions();

          if (options)
            population[key] = options;

        }

        return population;

      },
      getBasketByOption: function (option) {
        var self = this;
        option = option.jqElement ? option.jqElement : option;

        return Baskets.getBasketByJqElement(option.parents('.basket'));

      },
      setAllzIndexesToZero: function () {

        for (var key in baskets) {
          var basket = baskets[key];
          basket.setZindex(0);

        }

      },
      getBasketById: function (id) {
        return baskets[id]
      },
      count: function (countParam) {
        if (countParam)
          count = countParam;
        if (!count)
          count = $('.basket').length;
        return count;

      },
      getBasketTop: function () {
        if (!basketTop) {
          basketTop = this.getRandomBasket().top();
        }
        return basketTop;
      },
      getRandomBasket: function () {

        for (var key in baskets) {
          return baskets[key];
        }

      },
      getHorizontalShift: function () {
        if (horizontalShift)
          return horizontalShift;

        horizontalShift = 11111111111111;
        for (var i = 1; i < basketsArray.length; i++) {
          var tmpShift = basketsArray[i].leftAsNumber() - basketsArray[0].leftAsNumber();
          if (tmpShift < horizontalShift)
            horizontalShift = tmpShift;
        }
        return horizontalShift;
      },
      getBaskets: function () {
        return baskets;
      },
      getSelectedBasket: function (droppedOption) {
        try {
          for (var i = 0; i < basketsArray.length - 1; i++) {
            var optionLeft = Math.ceil(droppedOption.leftAsNumber());
            var currentBasketLeft = Math.floor(basketsArray[i].leftAsNumber())
            var nextBasketLeft = Math.floor(basketsArray[i + 1].leftAsNumber())

            if (optionLeft >= currentBasketLeft && optionLeft < nextBasketLeft) {
              return basketsArray[i];
            }
          }
          return basketsArray[basketsArray.length - 1];
        }
        catch (e) {
          //debugger;

        }

      },
      getNumberOfCorrectOptions: function () {
        var corrects = 0;
        for (basketKey in baskets) {
          corrects += baskets[basketKey].getNumberOfCorrectOptions();
        }
        return corrects;
      }
    }

  })();

  cet.Baskets = Baskets;

})();
