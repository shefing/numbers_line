window.cet = window.cet || {};

(function () {

 var Buttons = (function () {
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
  var App;

  //#endregion


  var btnCheck;
  var btnRestart;
  var successTimeoutId;
  var frontZIndex = 1000;



  function btnCheckClickHandler() {
  
    Baskets.showFeedback();

   if (Baskets.isPerfectSolution()) {

    successTimeoutId = setTimeout(function () {
     Feedback.showSuccess();
     Stage.trigger('change', self);

    }, 1000);
    return;
   }
   if (Content.getFeedbackErrorRemoval() == 'automaticaly')
    Baskets.removeAllErrors();

   Stage.trigger('change', self);
  }

  function btnRestartClickHandler() {
   clearTimeout(successTimeoutId);
   App.restart();
   Stage.trigger('change', self);


  }

  function setInteractionVisualEffects() {

   var btnCheckSymbol = Stage.getSymbol(btnCheck);
   btnCheck.hover(function () { btnCheckSymbol.stop('hover'); }, function () { btnCheckSymbol.stop('normal'); })
   btnCheck.on('mousedown touchstart', function () { btnCheckSymbol.stop('down'); })
   btnCheck.on('mouseup touchend', function () { btnCheckSymbol.stop('hover'); })

   var btnRestartSymbol = Stage.getSymbol(btnRestart);
   btnRestart.hover(function () { btnRestartSymbol.stop('hover'); }, function () { btnRestartSymbol.stop('normal'); })
   btnRestart.on('mousedown touchstart', function () { btnRestartSymbol.stop('down'); })
   btnRestart.on('mouseup touchend', function () { btnRestartSymbol.stop('hover'); })

  }

  return {
   init: function () {
    //#region meta declarations
    App = cet.App;
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


    btnCheck = $('.button-check');
    btnCheck.css('z-index', frontZIndex);
    btnCheck.on('mouseup touchend', btnCheckClickHandler);;
    
    
    btnRestart = $('.button-restart');
    btnRestart.css('z-index', frontZIndex);
    btnRestart.on('mouseup touchend', btnRestartClickHandler);
    setInteractionVisualEffects();

   },
   disableAll: function () {
     btnCheck.off('mouseup touchend mousedown touchstart');
     btnRestart.off('mouseup touchend mousedown touchstart');
   },
   enableAll: function () {
    Buttons.disableAll();

    btnCheck.on('mouseup touchend', btnCheckClickHandler);;
    btnRestart.bind('mouseup touchend', btnRestartClickHandler);

    setInteractionVisualEffects();
   },
   hideCheckButton: function () {
    btnCheck.hide();
   },
   setZindexes: function (val) {
    
    btnCheck.css('z-index', val);
    btnRestart.css('z-index', val);
   },
   removeFromFront: function () {
     
     this.setZindexes(0);

   },
   bringToFront: function () {
     btnCheck.css('z-index', frontZIndex);
     btnRestart.css('z-index', frontZIndex);
   }

  }
 })();
 cet.Buttons = Buttons;

})();
