window.cet = window.cet || {}; window.cet.dragndrop = window.cet.dragndrop || {};

(function () {

  var Baskets = (function () {
    //#region meta declarations

    var App;
    var Audio;
    var option;
    var Content;
    var Stage;
    var Storage;
    var Buttons;
    var Feedback;
    var DragSync;
    var basket;

    //#endregion

    var count;
    function unpopulateBasket(basket, delay) {
      //App.animationStopped(true);
      //Stage.jqElement.addClass('animation-stopped');


      setTimeout(function () {
        var option = basket.getOption();
        basket.unpopulate(function () {
          option.disable();
        });
      }, delay);


    }

    return {
      init: function () {
        //#region meta declarations

        App = cet.dragndrop.App;
        Audio = cet.dragndrop.Audio;
        option = cet.dragndrop.option;
        Content = cet.dragndrop.Content;
        Stage = cet.dragndrop.Stage;
        Storage = cet.dragndrop.Storage;
        Buttons = cet.dragndrop.Buttons;
        Feedback = cet.dragndrop.Feedback;
        DragSync = cet.dragndrop.DragSync;
        basket = cet.dragndrop.basket;
        //#endregion

        Baskets.baskets = {};
        var baskets = $('.basket');
        Baskets.count(baskets.length);
        $.each(baskets, function (index, elem) {
          var newBasket = new basket(elem);
          Baskets.baskets[newBasket.getId()] = newBasket;
        });
      },
      getBasketByJqElement: function (elem) {
        if (!elem.hasClass('basket'))
          elem = elem.parents('.basket');
        if (elem.length == 0)
          return null;
        var classes = elem.attr('class').split(' ')
        var basketId;
        for (var i = 0; i < classes.length; i++) {
          if (classes[i].indexOf('basket-') != -1)
            basketId = classes[i];
        }
        return Baskets.baskets[basketId];
      },
      showFeedback: function () {
        for (var key in Baskets.baskets) {
          Baskets.baskets[key].showFeedback();
        }
      },
      unpopulateErrors: function (completeMethod) {

        var delay = 0;
        for (var key in Baskets.baskets) {

          if (Baskets.baskets[key].isPopulated()) {
            if (!Baskets.baskets[key].isValid()) {

              unpopulateBasket(Baskets.baskets[key], delay);
              delay += 550;
            }
          }
          else
            Baskets.baskets[key].removeFeedback();
        }
        Storage.eliminateSpaces();
        if (completeMethod)
          setTimeout(completeMethod, delay);

      },
      isPerfectSolution: function () {

        for (var key in Baskets.baskets) {
          if (!Baskets.baskets[key].isValid()) {
            return false;
          }
        }
        return true;

      },
      unpopulate: function () {

        App.animationStopped(true);
        Stage.jqElement.addClass('animation-stopped');

        for (var key in Baskets.baskets) {
          if (Baskets.baskets[key].isPopulated()) {
            Baskets.baskets[key].unpopulate();
          }
          else
            Baskets.baskets[key].removeFeedback();
        }


        setTimeout(function () {
          Stage.jqElement.removeClass('animation-stopped');
          App.animationStopped(false);
          Storage.eliminateSpaces();
        }, 150);


      },
      getPopulation: function () {
        var population = {}
        for (var key in Baskets.baskets) {

          var option = Baskets.baskets[key].getOption();

          if (option)
            population[key] = option.getId();

        }

        return population;

      },
      getBasketByOption: function (option) {
        var self = this;
        option = option.jqElement ? option.jqElement : option;

        return Baskets.getBasketByJqElement(option.parents('.basket'));

      },
      setAllzIndexesToZero: function () {

        for (var key in Baskets.baskets) {
          var basket = Baskets.baskets[key];
          basket.setZindex(0);

        }

      },
      setZindexes: function (val) {

        for (var key in Baskets.baskets) {
          var basket = Baskets.baskets[key];
          basket.setZindex(val);

        }

      },
      getBasketById: function (id) {
        id = cet.dragndrop.Utils.supportOldIds(id);
        return Baskets.baskets[id]
      },
      disableAllOptions: function () {
        for (var key in Baskets.baskets) {
          if (Baskets.baskets[key].isPopulated())
            Baskets.baskets[key].getOption().disable();
        }
      },
      disableAllOptionsExceptMe: function (option) {
        for (var key in Baskets.baskets) {
          if (Baskets.baskets[key].isPopulated() && Baskets.baskets[key].getOption() != option)
            Baskets.baskets[key].getOption().disable();
        }
      },
      enableAllOptions: function () {

        for (var key in Baskets.baskets) {
          if (Baskets.baskets[key].isPopulated())
            Baskets.baskets[key].getOption().enable();
        }
      },
      getHoveredBasket: function (point, updateHover) {
        if (updateHover == null)
          updateHover == true;
        var hovered = [];
        for (var key in Baskets.baskets) {
          var basket = Baskets.baskets[key];
          if (basket.isPointContained(point)) {
            hovered.push(basket)
          }
          if (updateHover)
            basket.hideHover();
        }

        var winner = null;

        for (var i = 0; i < hovered.length; i++) {
          if (winner == null) {
            winner = hovered[i];
            continue;
          }

          if (updateHover && hovered[i].getContainmentSize(point) >= winner.getContainmentSize(point))
            winner.hideHover();
          winner = hovered[i];
        }
        if (winner && updateHover)
          winner.showHover();

        return winner;
      },
      updateAndGetHoveredBasket: function (point) {
        var hovered = [];
        for (var key in Baskets.baskets) {
          var basket = Baskets.baskets[key];
          if (basket.isPointContained(point)) {
            hovered.push(basket)
          }
          basket.hideHover();
        }

        var winner = null;

        for (var i = 0; i < hovered.length; i++) {
          if (winner == null) {
            winner = hovered[i];
            continue;
          }

          if (hovered[i].getContainmentSize(point) >= winner.getContainmentSize(point))
            winner.hideHover();
          winner = hovered[i];
        }
        if (winner)
          winner.showHover();

        return winner;
      },
      removeAllErrors: function () {
        if (!Baskets.errorFeedbackExists())
          return;
        Storage.disableAll();
        Baskets.disableAllOptions();
        Buttons.disableAll();

        App.resizeLocked(true);

        setTimeout(function () {
          Baskets.unpopulateErrors(function () {
            Storage.enableAll();
            Baskets.enableAllOptions();
            Buttons.enableAll();
            Stage.trigger('removeallerrors', self);
            App.resizeLocked(false);
            
            // remove feedback and add the LO TEST button only after all options are in stage 
            // to avoid clicking the button while options are returning to stage
            if (!cet.dragndrop.Baskets.anyValidBaskets() && !cet.dragndrop.Baskets.anyPopulatedBasket()) {
              cet.dragndrop.Stage.trigger('allbasketoptionsincorrectandreturnedtostorage', self);
            }  
          });
        }, 1000);
      },
      errorFeedbackExists: function () {

        for (var key in Baskets.baskets) {
          if (Baskets.baskets[key].feedbackExists() && !Baskets.baskets[key].isValid())
            return true;
        }
        return false;


      },
      anyFeedbackExists: function () {

        for (var key in Baskets.baskets) {
          if (Baskets.baskets[key].feedbackExists())
            return true;
        }
        return false;
      },
      removeAllErrorFeedbacks: function () {
        for (var key in Baskets.baskets) {
          if (Baskets.baskets[key].feedbackExists() && !Baskets.baskets[key].isValid())
            Baskets.baskets[key].removeFeedback()
        }
      },
      count: function (countParam) {
        if (countParam)
          count = countParam;
        if (!count)
          count = $('.basket').length;
        return count;

      },
      anyValidBaskets: function () {
        for (var key in Baskets.baskets) {
          if (Baskets.baskets[key].isValid()) {
            return true;
          }
        }
        return false;
      },
      anyPopulatedBasket: function () {
        for (var key in Baskets.baskets) {
          if (Baskets.baskets[key].isPopulated()) {
            return true;
          }
        }
        return false;
      },

      updateDropBoxes: function () {
        for (var key in Baskets.baskets) {
          Baskets.baskets[key].updateDropBox();
        }
      },
      resizeHandler: function () {

        for (var key in Baskets.baskets) {
          Baskets.baskets[key].resizeHandler();
        }
      },
      removeFromFront: function () {
        this.setAllzIndexesToZero();
      },
      add: function (basket) {
        Baskets.baskets[basket.getId()] = basket;
        Baskets.count(Baskets.count() + 1);
      },
      remove: function (basket) {
        delete Baskets.baskets[basket.getId()];
        Baskets.count(Baskets.count() - 1);
      },
      all: function () {
        return this.baskets;
      },
      createBasket: function (options) {
        if (!options.id)
          options.id = 'basket-' + Math.random().toString().replace('.', '');
        var bsktHtml = cet.dragndrop.HtmlBuilder.buildBasketHtml(options);
        var $basket = $(bsktHtml);
        if (options.isExtra)
          $basket.addClass('extra');
        $('.canvas').append($basket);
        var newBasket = new cet.dragndrop.basket($basket);
        cet.dragndrop.Baskets.add(newBasket);
        return newBasket;

      },
      restoreOriginalPozitions: function () {
        var contentBaskets = cet.dragndrop.Content.getBaskets();
        for (var key in contentBaskets) {
          var contentBasket = contentBaskets[key];
          var actualBasket = Baskets.getBasketById(contentBasket.id);
          actualBasket.position({
            top: contentBasket.top + '%',
            left: contentBasket.left + '%'
          })
          
        }
      },

    }

  })();

  cet.dragndrop.Baskets = Baskets;

})();
