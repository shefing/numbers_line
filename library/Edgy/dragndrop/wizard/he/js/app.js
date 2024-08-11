/// <reference path="Baskets.js"/>
window.cet = window.cet || {}; window.cet.dragndrop = window.cet.dragndrop || {};
cet.content.clientLoaded();
(function () {

  var App = (function () {

    //#region meta declarations

    var option;
    var Baskets;
    var Content;
    var Stage;
    var Storage;
    var Buttons;
    var Host;
    var Feedback;
    var DragSync;
    var HtmlBuilder;
    var Groups;
    var GroupsLinks;
    var Localization;
    var Xapi;

    //#endregion

    cet.dragndrop.Preloader.show();
    var version = '1.0.2';
    var composition;
    var hidedElements;
    var initiated = false;
    var animationStopped = false;
    var resizeLocked = 0;
    var ratio;
    var restored = false;
    var successTimeoutId;
    var showSolutionTimeoutId;
    //some tablets have less height then app requires in config file (plugins xml).
    //so we decrease app height in order to show app without the need to scroll.
    //var hostClientHeight;
    setTimeout(function () { App.init(); }, 1);

    var originalFontSize;
    var originalWidth;

    function getRatio() {
      if (!ratio)
        ratio = cet.dragndrop.Stage.height() / cet.dragndrop.Stage.width();
      return ratio;
    }

    function initResizeHandlers() {

      $(window).resize(function () {
        //window.onresize();//cet.content.onresize(adjustSize);//
        adjustSize();
        Stage.resetScale();
        Baskets.resizeHandler();
        Storage.resizeHandler();
      });
    }

    function adjustSize(sizing) {

      var MIN_SCREEN_WIDTH = 1024;

      if (!sizing)
        sizing = cet.content.UI.getSizingSettings();

      var optimalWidth = 860, optimalHeight = 557;//631;
      var ratio = optimalHeight / optimalWidth; // content height/width

      var width = sizing.width || sizing.maxWidth;
      var height = sizing.height || sizing.maxHeight;

      //var height = width / optimalWidth * optimalHeight;

      if (height > ratio * width) {
        height = ratio * width;
      }

      var isFullScreen = (window.screen.width > MIN_SCREEN_WIDTH && window.screen.width * 0.85 < width) ? true : false;
      if (isFullScreen) {
        var width = width * 0.58;
        var height = height * 0.58;
      }


      if (!originalFontSize)
        originalFontSize = parseFloat(Stage.fontSize().replace('px'));
      if (!originalWidth)
        originalWidth = Stage.width();

      var newFontSize = originalFontSize * width / originalWidth;

      Stage.css({
        'width': width,
        'height': height,
        'font-size': newFontSize
      });

      var newsize = { width: width, height: height };

      //if (sizing.height === undefined || sizing.width === undefined) { // otherwize calling resize does not take effect
      //  cet.content.UI.resizeTo(newsize);
      //}

      setTimeout(function() {
        cet.dragndrop.Baskets.updateDropBoxes();
        cet.dragndrop.Groups.updateDropBoxes();
        cet.dragndrop.Storage.adjustOptionsSize();
        cet.dragndrop.Storage.setOptionsVisibility();
      }, 0);
    }

    function setLocalizedResources() {
      $('.final-feedback-success .feedback-text').text(Content.getFinalFeedbackSuccessText());
      $('.final-feedback-failure .feedback-text').text(Content.getFinalFeedbackFailureText());
    }

    function fixIPadOverflowIssue() {
      //for an IPAD issue 67299
      setTimeout(function () {
        var opts = $('.options');
        opts.hide();
        $('.storage').css('overflow', 'visible');
        opts.show();
      }, 1200);
    }

    function restoreFreeGroupsState(state) {
      if (!cet.dragndrop.Content.isFreeGroupMode())
        return;
      if (!state.groups)
        return;

      var groups = state.groups;
      for (var i = 0; i < groups.length; i++) {
        var group = cet.dragndrop.Groups.getGroupById(groups[i].id);
        for (var j = 0; j < groups[i].baskets.length; j++) {
          var basket = cet.dragndrop.Baskets.getBasketById(groups[i].baskets[j].id);
          if (!basket) {
            basket = group.createBasket(groups[i].baskets[j].id)
            group.addBasket(basket);
          }
          basket.position(groups[i].baskets[j].position);
        }
      }
    }

    function restoreFreeGroupsStateFeedbackAfterOptionsRestore(state) {
      if (!cet.dragndrop.Content.isFreeGroupMode())
        return;
      if (!state.groups)
        return;

      var groups = state.groups;
      for (var i = 0; i < groups.length; i++) {
        var group = cet.dragndrop.Groups.getGroupById(groups[i].id);
        if (groups[i].feedbackExists)
          group.showFeedback();
      }
    }

    function restoreOptionsState(state) {
      var options = state.options ? state.options : state;
      for (var i = 0; i < options.length; i++) {

        var restoreMe = options[i];

        if (!restoreMe.basket)
          continue;
        var basket = Baskets.getBasketById(restoreMe.basket);
        basket.unpopulate(false);
        var option = Storage.getOptionById(restoreMe.option);

        if (cet.dragndrop.Content.isNonePerishableStorage()) {
          option = option.clone();
        }
        else {
          Storage.removeOption(option);
        }

        basket.addOption(option);
        if (restoreMe.feedbackExists)
          basket.showFeedback();

      }
    }

    function getOptionsState() {
      var options = [];
      var storageOptions = Storage.getOptions();
      for (var key in storageOptions) {
        options.push({ option: storageOptions[key].getId() });
      }
      var basketsPopulation = Baskets.getPopulation();
      for (var pkey in basketsPopulation) {
        options.push({
          option: basketsPopulation[pkey],
          basket: pkey,
          feedbackExists: Baskets.getBasketById(pkey).feedbackExists()
        });
      }
      return options;
    }

    function getGroupsState() {
      var groups = Groups.all();
      var groupsData = [];
      for (var key in groups) {
        var group = groups[key];
        var groupData = {
          id: key,
          feedbackExists: group.feedbackExists(),
          baskets: []
        };

        for (var bkey in group.baskets) {
          groupData.baskets.push({
            id: group.baskets[bkey].getId(),
            position: group.baskets[bkey].position()
          });
        }
        groupsData.push(groupData);
      }
      return groupsData;
    }

    function nonePerishableStorageWEIRDConditionIsTrue(options) {
      return !cet.dragndrop.Content.isNonePerishableStorage() && options.length !== Content.getOptions().length;
    }

    function getScorePerBasket() {

      var errors = 0;
      var total = 0;

      //var score = new Array();
      var optionBasket = {};
      var scoreBasket = {};
      var optionCounter = 0;

      for (basketKey in cet.dragndrop.Baskets.baskets) {

        optionCounter++;
        optionBasket[basketKey] = "option-" + optionCounter;

        var basket = cet.dragndrop.Baskets.baskets[basketKey];
        //isDistractingOption is not relevant to score
        if (!basket.isVisible)
          continue;

        //extra baskets are never a part of score calculation,
        //since it always populate an 'error' option, which will be calculated on its valid basket.
        if (basket.isExtra())
          continue;
        total++;

        if (!basket.isPopulated()) {
          errors++;
          scoreBasket[basketKey] = 0;
        }
        else if (!basket.isValid()) {
          errors++;
          scoreBasket[basketKey] = 0;
        } else {
          scoreBasket[basketKey] = 1;
        }
      }
      return scoreBasket;

    }

    return {
      recoverEdgeDelay: function () {
        if (initiated)
          return;
        if (window.location.href.indexOf('recoveryAtempt') !== -1) {
          alert('Due to network limitations, page cannot be loaded.');
          return;
        }
        window.location.href = window.location.search ? window.location.href + 'recoveryAtempt' : window.location.href + '?recoveryAtempt';
      },
      composition: function (val) {
        if (val)
          composition = val;
        return composition;
      },
      disableAll: function () {

      },
      adjustSize: function () {
        var jqWindow = $(window);

        var xRatio = jqWindow.width() / Stage.width();
        var yRatio = jqWindow.height() / Stage.height();
        var ratio = xRatio > yRatio ? yRatio : xRatio;
        Stage.scale(ratio);

      },
      addNoScaleMetaTag: function () {
        if ($('meta[name=viewport]').length !== 0)
          return;
        var viewPortTag = document.createElement('meta');
        viewPortTag.id = "viewport";
        viewPortTag.name = "viewport";
        viewPortTag.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
        document.getElementsByTagName('head')[0].appendChild(viewPortTag);
      },
      getVersion: function () {
        return version;
      },
      resizeLocked: function (val) {
        if (typeof val !== 'undefined') {

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
      init: function () {
        //#region meta declarations
        option = cet.dragndrop.option;
        Baskets = cet.dragndrop.Baskets;
        Content = cet.dragndrop.Content;
        Stage = cet.dragndrop.Stage;
        Storage = cet.dragndrop.Storage;
        Buttons = cet.dragndrop.Buttons;
        Host = cet.dragndrop.Host;
        Feedback = cet.dragndrop.Feedback;
        DragSync = cet.dragndrop.DragSync;
        HtmlBuilder = cet.dragndrop.HtmlBuilder;
        Groups = cet.dragndrop.Groups;
        GroupsLinks = cet.dragndrop.GroupsLinks;
        Localization = cet.dragndrop.Localization;
        Xapi = cet.dragndrop.Xapi;
        //#endregion

        var self = this;

        cet.dragndrop.App.addNoScaleMetaTag();
        Stage.init();
        Stage.eliminateIPadBounceEffect();

        Stage.bind('contentReady', function () {

          Localization.init();
          HtmlBuilder.build();
          DragSync.init();
          Storage.init();
          Baskets.init();
          Groups.init();
          GroupsLinks.init();
          Buttons.init();
          Host.init();
          Feedback.init();
          initResizeHandlers();
          Xapi.init();
          adjustSize();//$(window).onresize();//cet.content.onresize(adjustSize);//
          cet.dragndrop.Preloader.waitOneSecAndHide();
          setLocalizedResources();

          fixIPadOverflowIssue();//this call is important, for an IPAD issue 67299
        });
        Stage.bind('restartClick', self.restart);
        Stage.bind('checkClick', self.showFeedback);
        Content.init();

      },
      restoreState: function (state) {
        if (!state)
          return;
        if (restored)
          return;
        restored = true;
        //next line remark: free group was having problems here, while switching the options from % to px.
        //Storage.hideContainer();

        restoreFreeGroupsState(state);

        restoreOptionsState(state);
        
        restoreFreeGroupsStateFeedbackAfterOptionsRestore(state);

        Storage.eliminateSpaces();
        setTimeout(Storage.eliminateSpaces, 400);
        //next line remark: free group was having problems here, while switching the options from % to px.
        //setTimeout(Storage.showContainer, 220);
        if (state.finalFeedback)
          setTimeout(Feedback.showSuccess, 240);

        if (state.readonly)
          App.setAsReadOnly();
      },
      getState: function () {

        var options = getOptionsState();
        if (nonePerishableStorageWEIRDConditionIsTrue(options))
          return null;
        var groups = getGroupsState();

        var result = {
          options: options,
          groups: groups,
          finalFeedback: Feedback.isVisible(),
          readonly: Stage.isReadOnly()
        };
        return result;
      },
      setAsReadOnly: function () {
        //delayed in order to enable restored options to be set in basket.
        Stage.setAsReadOnly();
        setTimeout(function () {
          Storage.disableAll();
          Baskets.disableAllOptions();
          Buttons.disableAll();
        }, 300);
      },
      unsetAsReadOnly: function () {
        //delayed in order to enable restored options to be set in basket.
        setTimeout(function () {
          Storage.enableAll();
          Baskets.enableAllOptions();
          Buttons.enableAll();
          Stage.unsetAsReadOnly();
        }, 300);
      },
      restart: function () {

        //check if studio param errorRemoval is ON and remove errors 'manually'
        if (cet.dragndrop.Content.getFeedbackErrorRemoval() === null) {
          Baskets.unpopulate();
        }
        //check all errors are back to storage and only then clean
        if (!Baskets.errorFeedbackExists()) {
          var timeOut = 0;
          if (Baskets.anyFeedbackExists()) {
          //wait till errors go back to storage
            timeOut = 500;
          }
          setTimeout(function () {
            clearTimeout(successTimeoutId);
            clearInterval(showSolutionTimeoutId);
            //reset score to sero
            cet.content.lms.Activity.score(0);
            Storage.show();
            Feedback.hide();
            Baskets.unpopulate();
            Groups.removeFeedback();
            App.unsetAsReadOnly();
            restored = false;
          }, timeOut);
        }
      },
      showSolution: function () {
        var self = this;
        Baskets.unpopulate();

        showSolutionTimeoutId = setInterval(function () {
          if (!Baskets.anyFeedbackExists()) {
            clearInterval(showSolutionTimeoutId);
            setTimeout(function () {
                restored = false;

                App.restoreState(Content.getSolution());
                Baskets.restoreOriginalPozitions();
                App.setAsReadOnly();
                Stage.trigger('showsolution', self);
            }, 0);
          }
        }, 600);
      },
      animationStopped: function (val) {
        if (typeof val !== 'undefined') {
          animationStopped = val;
        }
        return animationStopped;
      },
      showFeedback: function (avoidAutomaticErrorRemoval) {

        var self = this;
        cet.dragndrop.Groups.rearrangeBaskets();
        cet.dragndrop.GroupsLinks.validate();
        cet.dragndrop.Baskets.showFeedback();
        cet.dragndrop.Groups.showFeedback();

        if (cet.dragndrop.Baskets.isPerfectSolution()) {
          successTimeoutId = setTimeout(function () {
            cet.dragndrop.Feedback.showSuccess();
            cet.dragndrop.Stage.trigger('showfeedback', self);
          }, 1000);
          return;
        }

        if (!avoidAutomaticErrorRemoval && cet.dragndrop.Content.getFeedbackErrorRemoval() === 'automaticaly') {
          cet.dragndrop.Baskets.removeAllErrors();
          cet.dragndrop.Groups.removeAllErrors();

        }

      },
      isPercentageHtml: function () {
        return true;
      },
      getScore: function () {

        var errors = 0;
        var total = 0;

        for (basketKey in cet.dragndrop.Baskets.baskets) {
          var basket = cet.dragndrop.Baskets.baskets[basketKey];
          //isDistractingOption is not relevant to score
          if (!basket.isVisible)
            continue;

          //extra baskets are never a part of score calculation,
          //since it always populate an 'error' option, which will be calculated on its valid basket.
          if (basket.isExtra())
            continue;

          total++;
          
          if (!basket.isPopulated()) {
            errors++;
          }
          else if (!basket.isValid()) {
            errors++;
          }
        }

        var corrects = total - errors;
        var score = parseInt(100 * (corrects / total));
        return score;
      },
      getScores: function () {

        // get all groups' baskets
        var groups = cet.dragndrop.App.getState().groups;
        var baskets = cet.dragndrop.Baskets.baskets;

        // get all scores per basket
        var allScores = getScorePerBasket();

        var totalAnswersPerGroup = {};
        var correctGroupScores = {};
        var totalGroupScore = {};

        // groups don't have option data if the question failed so we need to join opitons in baskets and baskets in groups
        // check if there are groups or baskets
        if (groups.length === 0) {
          return allScores;
        } else {
          for (var i = 0; i < groups.length; i++) {
            var group = groups[i];
            for (var j = 0; j < group.baskets.length; j++) {
              var basket = group.baskets[j].id;
              if (allScores[basket] != undefined) {
                totalGroupScore[group.id + "|" + basket] = allScores[basket];
              } else {
                // Distracting option
                totalGroupScore[group.id + "|" + basket] = 0;
              }
            }
          }
          return totalGroupScore;
        }
      },
      getFullAnswers: function () {
        var groups = cet.dragndrop.App.getState().groups;
        var baskets = cet.dragndrop.Baskets.baskets;
        var answers = {};
        var groupAnswers = {};

        // get all baskets' optionts
        var options = cet.dragndrop.App.getState().options;
        for (var basket in baskets) {
          if (baskets[basket]['option'] != undefined) {
            answers[basket] = baskets[basket]['option']['id'];
          } else if (baskets[basket].isVisible) {
            answers[basket] = '';
          }
        }

          // groups don't have option data if the question failed so we need to join opitons in baskets and baskets in groups
          // check if there are groups or baskets
        if (groups.length === 0) {
          return answers;
        } else {
          // join options in basket with baskets in groups
          for (var i = 0; i < groups.length; i++) {
            var group = groups[i];
            for (var j = 0; j < group.baskets.length; j++) {
              var basket = group.baskets[j].id;
              if(answers[basket]!= undefined){
                groupAnswers[group.id + "|" + basket] = answers[basket];
              } else {
                // Distracting option
                groupAnswers[group.id + "|" + basket] = '';
              }
            }
          }

          // append all baskets which "defined" outside of groups to "special" group
          var extra = cet.dragndrop.App.getSpecialGroup(answers, groupAnswers);
          $.extend(groupAnswers, extra);
          return groupAnswers;
        }
      },
      getSpecialGroup: function (answers, groupAnswers) {
        // clone answers;
        var ans = JSON.parse(JSON.stringify(answers));
        for (key in groupAnswers) {
          var basketId = key.split('|')[1];
          if (ans[basketId] !== undefined)
            delete ans[basketId];
        }
        var extraGroup = {};
        var extraId = 'group-Z';
        for (key in ans) {
          extraGroup[extraId + "|" + key] = ans[key];
        }
        return extraGroup;
      }
  }
  })();

  cet.dragndrop.App = App;

})();


