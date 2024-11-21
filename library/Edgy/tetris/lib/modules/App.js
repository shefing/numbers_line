window.cet = window.cet || {};

(function () {

  var App = (function () {

    //#region meta declarations

    var Audio;
    var option;
    var Baskets;
    var Content;
    var Stage;
    var Buttons;
    var Lms;
    var Feedback;
    var Lifes
    var Proportions;
    var StartDialog;
    var Resources;
    var DroppingOptions;
    var Localization;

    //#endregion

    var animationStopped = false;
    var pause = false;
    var disableAll = false;
    var $window;
    var $body;
    var myWidth = 0;


  
    this.actionStrings = ["", "answered", "asked_check", "asked_showAnswer", "cleared", "launched", "loaded", "asked_generate"];
    this.actNONE = 0;
    this.actANSWER = 1;
    this.actCHECK = 2;
    this.actSOLUTION = 3;
    this.actCLEAN = 4;
    this.actLAUNCH = 5;
    this.actLOAD = 6;
    this.actGENERATE = 7;

    this.lastAction = this.actNONE;

    cet.content.xapiSupported = true;

    function dropCompletedHandler(droppedOption) {
      lastAction = actCHECK;
      var selectedBasket = Baskets.getSelectedBasket(droppedOption);
      cet.DroppingOptions.removeLeadingOption();

      if (selectedBasket.isFull()) {
        Storage.addOption(droppedOption);
        selectedBasket.showErrorFeedback();
        setTimeout(function () { selectedBasket.hideFeedback(); }, 300)
      }
      else {
        selectedBasket.addOption(droppedOption);
        Stage.trigger('change');
        if (cet.Storage.isEmpty() && DroppingOptions.isEmpty()) {
          return;
        }

      }

      if (DroppingOptions.isEmpty()) {
        DroppingOptions.startDropping();
      }

    }

    function dropCompletedBrowseModeHandler(droppedOption) {
      lastAction = actCHECK;
      var selectedBasket = Baskets.getSelectedBasket(droppedOption);
      if (selectedBasket.isFull()) {

        Storage.addOption(droppedOption);

        Audio.play('wrong');
        selectedBasket.showFullFeedback();
        Lifes.killOne();

      }
      else if (!droppedOption.isCorrectBasket(selectedBasket)) {
        Storage.addOption(droppedOption);
        Audio.play('wrong');
        selectedBasket.showErrorFeedback();

        Lifes.killOne();
      }
      else {
        Audio.play('correct');
        selectedBasket.showCorrectFeedback();
        selectedBasket.addOption(droppedOption);
      }

      cet.DroppingOptions.removeLeadingOption();


      Stage.trigger('change');

      setTimeout(function () { selectedBasket.hideFeedback(); }, 300)

      setTimeout(function () {
        if (!Lifes.anyLeft()) {
          Feedback.showFailure();
          App.pause();
          return;
        }

        if (cet.Storage.isEmpty() && DroppingOptions.isEmpty()) {
          Feedback.showSuccess();
          return;
        }

        if (DroppingOptions.isEmpty()) {
          DroppingOptions.startDropping();
        }
      }, 600)

    }

    function initLmsBrowseMode() {
      if (!Lms.isBrowseMode())
        Lifes.hide();
    }

    function adjustSize() {
      
        var size = cet.content.UI.getSizingSettings();
        //AZ iPad workaround
        var jqBody = $('body');
        jqBody.css({ display: "none" });

        var jqWindow = $(window);               // take host window - may be correct size
        var jqWindowWidth = jqWindow.width();
        var jqWindowHeight = jqWindow.height();
        jqBody.css({ display: "block" });


        //        Stage.css({ display: "none" });
        var windowMaxPossibleHeight = size.maxHeight;
        // az - tablet issue - leave spare for upper and bottom player bars
        var windowHeight;
        if (Modernizr.touch)
          windowHeight = windowMaxPossibleHeight - 50;
        else
          windowHeight = Math.max(jqWindowHeight, windowMaxPossibleHeight);

        var xRatio = jqWindowWidth / Stage.width();
        //var yRatio = $window.height() / Stage.height();
        var yRatio = windowHeight / Stage.height();
        var ratio = xRatio > yRatio ? yRatio : xRatio;
        //        Stage.css({ display: "block" });
        var newWidth = Stage.width() * ratio;
        var newHeight = Stage.height() * ratio;
        var newFontSize = parseInt($body.css('font-size'), 10) * ratio;

        if (myWidth != newWidth) {
          myWidth = newWidth;
          Stage.css({ width: newWidth, height: newHeight, fontSize: newFontSize });
          cet.content.UI.setHeight(newHeight);
        }
     
    }

    function setLocalizedResources() {
      $('.final-feedback-success .feedback-text').text(Content.getFinalFeedbackSuccessText())
      $('.final-feedback-failure .feedback-text').text(Content.getFinalFeedbackFailureText())
    }

    function applyAndroidRendringFix() {
      if (!cet.Utils.isAndroid())
        return;
      setTimeout(function () {
        var ratio = 0.5;
        var newWidth = Stage.width() * ratio;
        var newHeight = Stage.height() * ratio;
        myWidth = newWidth;
        Stage.css({ width: newWidth, height: newHeight });
        adjustSize();



      }, 100);




    }

    function applyTabletsSoundsHack() {
      //helps tablets who refuse to play sound without user interaction
      Audio.play('quartersec');
    }

    return {
      init: function (compId) {
        //#region meta declarations
        Audio = cet.Audio;
        option = cet.option;
        Baskets = cet.Baskets;
        Content = cet.Content;
        Stage = cet.Stage;
        Buttons = cet.Buttons;
        Lms = cet.Lms;
        Feedback = cet.Feedback;
        Storage = cet.Storage;
        Lifes = cet.Lifes;
        Proportions = cet.Proportions;
        StartDialog = cet.StartDialog;
        Resources = cet.Resources;
        DroppingOptions = cet.DroppingOptions;
        Localization = cet.Localization;

        //#endregion

        $body = $('body');
        $window = $(window);

        var self = this;
        self.addNoScaleMetaTag();
        self.composition(AdobeEdge.getComposition(compId));
        Stage.init();
        //Stage.eliminateIPadBounceEffect();

        Stage.bind('contentReady', function () {

          Localization.init();
          Audio.init();
          Proportions.init();
          Baskets.init();
          Storage.init();
          StartDialog.init();
          Buttons.init();
          Lms.init();
          Feedback.init();
          Lifes.init();


          initLmsBrowseMode();
          setLocalizedResources();
          adjustSize();




          cet.Button.init();

          Stage.on('leftArrowDown', function () {
            if (!DroppingOptions.getLeadingOption() || !DroppingOptions.getLeadingOption().canMoveLeft())
              return;
            DroppingOptions.getLeadingOption().shiftLeft();
          })
          Stage.on('rightArrowDown', function () {
            if (!DroppingOptions.getLeadingOption() || !DroppingOptions.getLeadingOption().canMoveRight())
              return;
            DroppingOptions.getLeadingOption().shiftRight();
          })

          Stage.on('downArrowKeyDown', function () {
            if (DroppingOptions.getLeadingOption())
              DroppingOptions.getLeadingOption().dropFaster();
          })
          Stage.on('downArrowKeyUp', function () {

            if (DroppingOptions.getLeadingOption())
              DroppingOptions.getLeadingOption().dropSlower();
          })
          Stage.on('dropCompleted', function (droppedOption) {

            if (Lms.isBrowseMode()) {
              dropCompletedBrowseModeHandler(droppedOption);
            }
            else {
              dropCompletedHandler(droppedOption);
            }

          })

          Stage.on('pauseResume', function () {
            App.isPaused() ? App.resume() : App.pause();
          })

          Stage.on('startClick', function () {
            lastAction = actLAUNCH;
            Lms.save();
            applyTabletsSoundsHack();
            applyAndroidRendringFix()
            DroppingOptions.startDropping();
          })

        });

        Content.init();
        $(window).resize(function () { adjustSize(); });

      },
      restoreState: function (state) {
        if (!state)
          return;
        var options = state.options ? state.options : state;

        Content.loadSpecificOptions(options);

        Storage.reloadOptionsContent();

        Baskets.init();

        for (var i = 0; i < options.length; i++) {

          var restoreMe = options[i];

          if (!restoreMe.basket)
            continue;
          var basket = Baskets.getBasketById(restoreMe.basket);

          var option = Storage.getOptionById(restoreMe.option);
          Storage.removeOption(option);
          basket.addOption(option);
          if (restoreMe.feedbackExists)
            basket.showFeedback();

        }

        if (state.finalFeedback) {
          setTimeout(Feedback.showSuccess, 240);
          StartDialog.hide();
        }

      },
      getState: function () {
        var options = [];
        var storageOptions = Storage.getOptions();
        for (var key in storageOptions) {
          options.push({ option: storageOptions[key].getId() });
        }

        if (!DroppingOptions.isEmpty())
          options.concat(cet.DroppingOptions.getState());

        var baskets = Baskets.getPopulation();

        for (var key in baskets) {
          var basketOptions = baskets[key];
          for (var i = 0; i < basketOptions.length; i++) {
            options.push({
              option: basketOptions[i],
              basket: key
            });
          }
        }

        if (options.length != Content.getOptions().length)
          return null;

        var result = {
          options: options,
          finalFeedback: Feedback.isVisible()
        }
        return result;
      },
      restart: function () {

        lastAction = actCLEAN;
        pause = false;
        DroppingOptions.pause();
        Feedback.hide();
        Baskets.unpopulate();
        Lifes.restart();
        if (!DroppingOptions.isEmpty()) {
          Storage.addOptions(DroppingOptions.removeAll());
        }
        Lms.isBrowseMode() ? Storage.shuffleOptions() : Storage.reloadOptionsContent();
        DroppingOptions.startDropping();

      },
      showSolution: function () {
        App.pause();
        if (!DroppingOptions.isEmpty())
          Storage.addOptions(DroppingOptions.removeAll());
        Baskets.unpopulate();
        StartDialog.hide();
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
      pause: function () {
        if (!pause) {
          DroppingOptions.pause();
          pause = true;
        }
      },
      resume: function () {
        DroppingOptions.resume()
        pause = false;
      },
      isPaused: function () {
        return pause;
      },
      check: function () {

        Baskets.showFeedback();
        if (Baskets.isPerfectSolution()) {

          successTimeoutId = setTimeout(function () {
            Feedback.showSuccess();
            Stage.trigger('change', self);

          }, 1000);
          return;
        }
        //if (Content.getFeedbackErrorRemoval() == 'automaticaly')
        // Baskets.removeAllErrors();

        Stage.trigger('change', self);
      },
      setAsReadOnly: function () {
        App.pause();
        
        Buttons.disableAll();
        StartDialog.hide();
      },
      showFeedback: function () {
        Baskets.showFeedback();
        StartDialog.hide();

      }
    }
  })();


  $.extend(cet.App, App);

})();
