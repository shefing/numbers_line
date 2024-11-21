var cet;
(function (cet) {
  (function (Buttons) {
    var btnCheck;
    var btnRestart;


    function btnCheckClickHandler() {
      cet.dragndrop.Stage.trigger('checkClick', self);
    }

    function btnRestartClickHandler() {
      cet.dragndrop.Stage.trigger('restartClick', self);
    }

    function setInteractionVisualEffects() {
      var btnCheckSymbol = cet.dragndrop.Stage.getSymbol(btnCheck);
      btnCheck.hover(function () {
        btnCheckSymbol.stop('hover');
      }, function () {
        btnCheckSymbol.stop('normal');
      });
      btnCheck.on('mousedown', function () {
        btnCheckSymbol.stop('down');
      });
      btnCheck.on('mouseup', function () {
        btnCheckSymbol.stop('hover');
      });

      var btnRestartSymbol = cet.dragndrop.Stage.getSymbol(btnRestart);
      btnRestart.hover(function () {
        btnRestartSymbol.stop('hover');
      }, function () {
        btnRestartSymbol.stop('normal');
      });
      btnRestart.on('mousedown', function () {
        btnRestartSymbol.stop('down');
      });
      btnRestart.on('mouseup', function () {
        btnRestartSymbol.stop('hover');
      });
    }

    function init() {
      btnCheck = $('.button-check');
      btnCheck.css('z-index', 1000);
      btnCheck.on('mouseup', btnCheckClickHandler);
      ;

      btnRestart = $('.button-restart');
      btnRestart.css('z-index', 1000);
      btnRestart.on('mouseup', btnRestartClickHandler);

      setInteractionVisualEffects();
    }
    Buttons.init = init;
    function disableAll() {
      btnCheck.off('mouseup mousedown');
      btnRestart.off('mouseup mousedown');
    }
    Buttons.disableAll = disableAll;
    function enableAll() {
      Buttons.disableAll();

      btnCheck.on('mouseup', btnCheckClickHandler);
      ;
      btnRestart.bind('mouseup', btnRestartClickHandler);

      setInteractionVisualEffects();
    }
    Buttons.enableAll = enableAll;
    function hideCheckButton() {
      btnCheck.hide();
    }
    Buttons.hideCheckButton = hideCheckButton;
    function hideRestartButton() {
      btnRestart.hide();
    }
    Buttons.hideRestartButton = hideRestartButton;
    function setZindexes(val) {
      btnCheck.css('z-index', val);
      btnRestart.css('z-index', val);
    }
    Buttons.setZindexes = setZindexes;

  })(cet.dragndrop.Buttons || (cet.dragndrop.Buttons = {}));
  var Buttons = cet.dragndrop.Buttons;
})(cet || (cet = {}));
