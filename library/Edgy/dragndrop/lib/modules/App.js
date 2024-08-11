window.cet = window.cet || {};

(function () {

  var App = (function () {
    var version = '1.0.9';
    //#region meta declarations

    var Audio;
    var option;
    var Baskets;
    var Content;
    var Stage;
    var Storage;
    var Buttons;
    var Lms;
    var Feedback;
    var DragSync;


    //#endregion

    var animationStopped = false;

    var resizeLocked = 0;

    var ratio;
    function getRatio() {
      if (!ratio)
        ratio = cet.Stage.height() / cet.Stage.width();
      return ratio;
    }
    function adjustSize(sizing) {

      if (!sizing)
        sizing = cet.content.UI.getSizingSettings();


      var ratio = getRatio();

      var width = sizing.width || sizing.maxWidth;
      var height = sizing.height || sizing.maxHeight;

      if (height > ratio * width) {
        height = ratio * width;
      }
      else {
        width = height / ratio;
      }

      var newsize = { width: width, height: height };

      if (sizing.height == undefined || sizing.width == undefined) { // otherwize calling resize does not take effect
        cet.content.UI.resizeTo(newsize);
      }
      
    }

    function initResizeHandlers() {
      cet.content.onresize(adjustSize);
      $(window).resize(function () {
        Stage.resetScale();
        Baskets.resizeHandler();
        Storage.resizeHandler();
      });
    }

    return {
      init: function (compId) {
        //#region meta declarations
        Audio = cet.Audio;
        option = cet.option;
        Baskets = cet.Baskets;
        Content = cet.Content;
        Stage = cet.Stage;
        Storage = cet.Storage;
        Buttons = cet.Buttons;
        Lms = cet.Lms;
        Feedback = cet.Feedback;
        DragSync = cet.DragSync;
        //#endregion

        var self = this;
        self.addNoScaleMetaTag();
        self.composition(AdobeEdge.getComposition(compId));
        Stage.init();
        Stage.eliminateIPadBounceEffect();
        Audio.init();

        Stage.bind('contentReady', function () {
          DragSync.init();
          Storage.init();
          Baskets.init();
          Buttons.init();
          Lms.init();
          Feedback.init();
          initResizeHandlers();
          

        });

        Content.init();
      },
      restoreState: function (state) {
        if (!state)
          return;
        Storage.hideContainer();
        var options = state.options ? state.options : state;

        Content.loadSpecificOptions(options);

        Storage.reloadOptionsContent();

        for (var i = 0; i < options.length; i++) {

          var restoreMe = options[i];

          if (!restoreMe.basket)
            continue;
          var basket = Baskets.getBasketById(restoreMe.basket);
          basket.unpopulate(false)
          var option = Storage.getOptionById(restoreMe.option);
          Storage.removeOption(option);
          basket.addOption(option);
          if (restoreMe.feedbackExists)
            basket.showFeedback();

        }

        Storage.eliminateSpaces();
        setTimeout(Storage.eliminateSpaces, 200);
        setTimeout(Storage.showContainer, 220);
        if (state.finalFeedback)
          setTimeout(Feedback.showSuccess, 240);
      },
      getState: function () {
        var options = [];
        var storageOptions = Storage.getOptions();
        for (var key in storageOptions) {
          options.push({ option: storageOptions[key].getId() });
        }
        var baskets = Baskets.getPopulation();
        for (var key in baskets) {
          options.push({
            option: baskets[key],
            basket: key,
            feedbackExists: Baskets.getBasketById(key).feedbackExists()
          });
        }
        if (options.length != Content.getOptions().length)
          return null;

        var result = {
          options: options,
          finalFeedback: Feedback.isVisible()
        }
        return result;
      },
      setAsReadOnly: function () {
        setTimeout(function () {

          Storage.disableAllOptions();
          Baskets.disableAllOptions();
          Buttons.disableAll();

        }, 500);
      },
      restart: function () {
        Audio.stopAll();
        Storage.show();
        Feedback.hide();
        Baskets.unpopulate();

      },
      showSolution: function () {
       
        Baskets.unpopulate();
        setTimeout(function () {
          App.restoreState(Content.getSolution());
        }, 200);

      },
      animationStopped: function (val) {
        if (typeof val != 'undefined') {
          animationStopped = val;
        }
        return animationStopped;
      },
      showFeedback: function () {
        Baskets.showFeedback();
      },
      isPercentageHtml: function () {
        return false;
      },
      getVersion: function () {
        return version;
      },
      resizeLocked: function (val) {
        if (typeof val != 'undefined') {

          if (val === true) {
            resizeLocked = resizeLocked + 1;
          } else if (val === false) {
            resizeLocked = resizeLocked - 1;
          }
        }

        if (resizeLocked > 0) {
          return true;
        }
        else {
          return false;
        }
      },

    }
  })();


  $.extend(cet.App, App);

})();
