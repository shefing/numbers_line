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

    //#endregion

    var animationStopped = false;
    var pause = false;
    var disableAll = false;
    var $window;
    var $body;
    var myWidth = 0;
    (function ($, sr) {

      // debouncing function from John Hann
      // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
      var debounce = function (func, threshold, execAsap) {
        var timeout;
        return function debounced() {
          var obj = this, args = arguments;
          function delayed() {
            if (!execAsap) func.apply(obj, args);
            timeout = null;
          };

          if (timeout)
            clearTimeout(timeout);
          else if (execAsap)
            func.apply(obj, args);

          timeout = setTimeout(delayed, threshold || 300);
        };
      }
      // smartresize 
      jQuery.fn[sr] = function (fn) { return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

    })(jQuery, 'smartresize');



    $(window).smartresize(function () { // do it on the window resize

      resizeHandle($(window).height());

    });

    var resizeHandle = function (winSize) {
      App.resizeAdjustments(winSize);
    };
    var Preloader = (function () {
      var preloader = '<img src="data:image/gif;base64,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">'
      var html = '<div id="cet-preloader" style="width:100%; height:100%; position: absolute; z-index:1111111; top: 0; left: 0; background-color:#323539; ">' +
                  '<div style="width:32px; height:32px; position: fixed;  top: 50%;  left: 50%;  margin-top: -16px;  margin-left: -16px;">' + preloader + '</div>' +
                 '</div>';

      return {

        show: function () {
          var preloader = $('#cet-preloader');
          if (!preloader.length) {
            $('body').append(html);
          }
        },
        hide: function () {

          var tmp = $('#cet-preloader');
          tmp.fadeOut(100, tmp.remove);

        },
        waitOneSecAndHide: function () {
          setTimeout(Preloader.hide, 1000);
        }


      }
    })();


    cet.Preloader = Preloader;



    function dropCompletedHandler(droppedOption) {

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

      var selectedBasket = Baskets.getSelectedBasket(droppedOption);
      if (selectedBasket.isFull()) {

        Storage.addOption(droppedOption);

        Audio.play('wrong');
        selectedBasket.showErrorFeedback();
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
      cet.display.getHostClientSize(function (size) {

        //AZ iPad workaround
        var jqBody = $('body');
        jqBody.css({ display: "none" });

        var jqWindow = $(window);               // take host window - may be correct size
        var jqWindowWidth = jqWindow.width();
        var jqWindowHeight = jqWindow.height();
        jqBody.css({ display: "block" });


        //        Stage.css({ display: "none" });
        var windowMaxPossibleHeight = size.height;
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
          Stage.css({ width: newWidth, height: '100%', fontSize: newFontSize });
          cet.content.UI.setHeight(newHeight);
        }
      });
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
    var i = 0;
    function initMessaging() {
      cet.content.Messaging.subscribe('getreq', 'userDidSomeWork', function (app, msg) {

        var baskets = Baskets.getBaskets();
        var isFull = true;
        for (var k1 in baskets) {
          if (!baskets[k1].isFull()) {
            isFull = false;
            break;
          }
        }
        if (isFull) {
          return false;
        }

        var basketsPopulation = Baskets.getPopulation();
        for (var k2 in basketsPopulation) {
          if (basketsPopulation[k2].length > 0) {
            return true;
          }
        }
        return false;
      })

      cet.content.Messaging.subscribe('set', 'new.content', function (content) {
        cet.Preloader.show();
        //App.restart();
        //Stage.trigger('change', this);
        //     pause = false;
        DroppingOptions.pause();
        Feedback.hide();
        Baskets.unpopulate();
        Lifes.restart();
        //DroppingOptions.removeAll()
        if (!DroppingOptions.isEmpty()) {
          Storage.addOptions(DroppingOptions.removeAll());
        }


        cet.Content.newContent = content.value.preset;
        Content.init(content.value.preset);
        var state = App.getState();

        App.restoreState(state);
        cet.Preloader.hide();

        StartDialog.show();

        //  Lms.isBrowseMode() ? Storage.shuffleOptions() : Storage.reloadOptionsContent();
        if (content.toRestart) {
          pause = false;

          DroppingOptions.startDropping();

        }
        else {
          StartDialog.show();
        }

      })

      cet.content.Messaging.subscribe('set', 'mute', function (cond) {
        Buttons.mute(cond.value);

      });

    }

    var inited = false;



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

        //#endregion

        $body = $('body');
        $window = $(window);

        var self = this;
        self.addNoScaleMetaTag();
        self.composition(AdobeEdge.getComposition(compId));
        Stage.init();
        //Stage.eliminateIPadBounceEffect();


        Stage.bind('contentReady', function () {

          Audio.init();
          Proportions.init();
          Baskets.init();
          Storage.init();
          Buttons.init();
          Lms.init();
          Feedback.init();
          Lifes.init();

          initLmsBrowseMode();
          setLocalizedResources();
          adjustSize();


          cet.Button.init();
          if (inited) {
            return;
          }
          StartDialog.init();
          initMessaging();
          $('#Stage_start-dialog_disableBG').css('height', '62px');

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
            applyTabletsSoundsHack();
            applyAndroidRendringFix()
            DroppingOptions.startDropping();
          })
          inited = true;
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
      },
      resizeAdjustments: function (winSize) {
        Baskets.resizeAdjustment(winSize);
        Storage.resizeAdjustment(winSize);
        DroppingOptions.resizeAdjustment(winSize);
      }
    }
  })();


  $.extend(cet.App, App);

})();