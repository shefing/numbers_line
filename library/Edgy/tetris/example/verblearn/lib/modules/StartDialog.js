
//#region meta declarations
var Stage;
var Buttons;
var App;
var Baskets;
var Stage;
//#endregion

var StartDialog = (function () {

  var jqElement;
  return {
    init: function () {
      Stage = cet.Stage;

      jqElement = $('.start-dialog');
      jqElement.css('z-index', 111111);


      Stage.on('enterPress', function () {

        if (StartDialog.isVisible()) {
          StartDialog.hide();
          Stage.trigger('startClick');
        }
      })
      $('.button-start').on('mousedown touchstart', function () {
        StartDialog.hide();
        Stage.trigger('startClick');
      })

    },
    hide: function () {
      jqElement.hide();
    },
    isVisible: function () {
      return jqElement.is(':visible');

    },
    show: function () {
      jqElement.show();
    }
  }
})();

cet.StartDialog = StartDialog;

