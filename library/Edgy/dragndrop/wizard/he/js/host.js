/// <reference path="App.js"/>
/// <reference path="xapi.js"/>
(function () {

  //#region meta declarations
  var Stage;
  var Buttons;
  var App;
  var Baskets;
  var Xapi;
  //#endregion

  var Host = (function () {

    var userInteractionAccurred = false;
    var isHostApiImplemented = false;
    function finishImplementingHostApi() {
      if (cet.content.lms.Activity.engagement.mode === 'review' || cet.content.lms.Activity.engagement.mode === 'browse_review') {
        App.showFeedback(true);
      }

      if (cet.content.lms.Activity.engagement.access === 'read') {
        App.setAsReadOnly();
      }

      Host.setExternalButtonsVisibility();

      cet.content.lms.Activity.bind('check', outerCheckEventHandler);
      cet.content.lms.Activity.bind('reset', outerResetEventHandler);
      cet.content.lms.Activity.bind('showsolution', outerShowSolutionEventHandler);

    }

    function isAnswered() {
      var bAns = false;
      var answers = cet.dragndrop.App.getFullAnswers();
      for (var key in answers) {
        if (answers[key]) {
          bAns = true;
          break;
        }
      }
      return bAns;
    }

    function outerCheckEventHandler() {
      cet.dragndrop.App.showFeedback();

      cet.content.lms.Activity.isAnswered(isAnswered());
      cet.content.lms.Activity.score(cet.dragndrop.App.getScore());
      Xapi.sendMessage(Xapi.actions.asked_check, cet.dragndrop.App.getScore(), cet.dragndrop.App.getScores(), cet.dragndrop.App.getFullAnswers());
    }

    function outerResetEventHandler() {
      cet.dragndrop.App.restart();
      userInteractionAccurred = false;
      cet.content.lms.Activity.isAnswered(false);
      cet.content.lms.Activity.score(0);
      Xapi.sendMessage(Xapi.actions.cleared, cet.dragndrop.App.getScore(), cet.dragndrop.App.getScores(), cet.dragndrop.App.getFullAnswers());
    }

    function outerShowSolutionEventHandler() {
      cet.dragndrop.App.showSolution();
      cet.content.lms.Activity.isAnswered(false);
      cet.content.lms.Activity.score(0);
      Xapi.sendMessage(Xapi.actions.asked_showAnswer, cet.dragndrop.App.getScore(), cet.dragndrop.App.getScores(), cet.dragndrop.App.getFullAnswers());
    }

    return {
      init: function () {
        //#region meta declarations
        Stage = cet.dragndrop.Stage;
        Buttons = cet.dragndrop.Buttons;
        App = cet.dragndrop.App;
        Baskets = cet.dragndrop.Baskets;
        Xapi = cet.dragndrop.Xapi;
        //#endregion

        cet.content.on('clientready', Host.implementHostApi);

      },
      implementHostApi: function () {
        if (isHostApiImplemented)
          return;
        isHostApiImplemented = true;
        if (cet.content.lms.Settings.supported && cet.content.lms.Activity.engagement.store === 'readwrite') {

          Stage.bind('dragended', function () {
            var trySendXapi = function () {  // sometime there are errors, because of the multitude of bags in the code.
              try {
                cet.content.lms.Activity.score(cet.dragndrop.App.getScore());
                Xapi.sendMessage(Xapi.actions.answered, cet.dragndrop.App.getScore(), cet.dragndrop.App.getScores(), cet.dragndrop.App.getFullAnswers());
                Host.save();
              } catch (e) {
                requestAnimationFrame(trySendXapi);
              }
            }
            trySendXapi();
          });
          Stage.bind('allbasketoptionsincorrectandreturnedtostorage', Host.save);

          cet.content.Messaging.getValue('isSilentSaveSupported', function (key, value) {
            var silentSaveOrDefault = null;
            if (value)
              silentSaveOrDefault = cet.dragndrop.Host.silentSave;
            else
              silentSaveOrDefault = cet.dragndrop.Host.save;

            Stage.bind('showsolution', silentSaveOrDefault);
            Stage.bind('showfeedback', silentSaveOrDefault);
            Stage.bind('removeallerrors', silentSaveOrDefault);
            Stage.bind('hidefinalfeedback', silentSaveOrDefault);
          });

        }

        if (cet.content.lms.Settings.supported) {

          if (Buttons.hideCheckButton)
            Buttons.hideCheckButton();
          if (Buttons.hideRestartButton)
            Buttons.hideRestartButton();

          if (cet.content.lms.Activity.engagement.mode === 'solved') {
            App.showSolution();
            finishImplementingHostApi();
            return;
          }

          if (cet.content.lms.Activity.engagement.store !== 'disabled') {
            cet.content.State.load(function (data) {
              App.restoreState(data);
              finishImplementingHostApi();
            });
          }
          else {
            finishImplementingHostApi();
          }

        }
      },
      silentSave: function () {

        if (cet.content.lms.Settings.supported) {

          if (cet.content.lms.Activity.engagement.store === 'readwrite') {
            var state = App.getState();
            if (!state)
              return;
            cet.content.State.silentSave(state);
          }
        }
      },
      save: function () {

        if (cet.content.lms.Settings.supported) {

          if (cet.content.lms.Activity.engagement.store === 'readwrite') {
            if (!userInteractionAccurred) {
              userInteractionAccurred = true;
              cet.content.lms.Activity.start();
              cet.content.lms.Activity.isAnswered(isAnswered());
            }
            var state = App.getState();
            if (!state)
              return;
            cet.content.State.save(state);
            var score = cet.dragndrop.App.getScore();
            cet.content.lms.Activity.score(score);
            cet.content.lms.Activity.isAnswered(isAnswered());

          }
        }
      },

      isBrowseMode: function () {
        return !cet.content.lms.Settings.supported || cet.content.lms.Activity.engagement.mode === 'browse';
      },

      setExternalButtonsVisibility: function () {
        cet.content.lms.Activity.settings.supportsCheck(true);
        cet.content.lms.Activity.settings.supportsRegenerate(false);
        cet.content.lms.Activity.settings.supportsReset(true);
        cet.content.lms.Activity.settings.supportsShowSolution(true);
        cet.content.lms.Activity.settings.supportsHostFullscreen(true);
      }
    };
  })();

  cet.dragndrop.Host = Host;

})();
