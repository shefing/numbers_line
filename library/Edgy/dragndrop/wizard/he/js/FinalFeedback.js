window.cet = window.cet || {}; window.cet.dragndrop = window.cet.dragndrop || {};
(function () {

  var Content;
  var Stage;
  var App;
  var Audio;

  var Feedback = (function () {

    var jqElement = null;

    var jqElementSuccess = null;
    var jqElementFailure = null;

    var symbolSuccess = null;
    var symbolFailure = null;

    function restart() {
      if (jqElementFailure.is(':visible'))
        App.restart();
    }
    return {
      init: function () {

        Content = cet.dragndrop.Content;
        Stage = cet.dragndrop.Stage;
        App = cet.dragndrop.App;
        Audio = cet.dragndrop.Audio;

        if (!Content.getShowFinalFeedback())
          return;
        jqElement = $('.final-feedback');
        jqElement.css('z-index', 1000);
        jqElement.hide();

        jqElementSuccess = jqElement.find('.final-feedback-success');
        symbolSuccess = Stage.getSymbol(jqElementSuccess);

        jqElementFailure = jqElement.find('.final-feedback-failure');
        symbolFailure = Stage.getSymbol(jqElementFailure);

        jqElement.find('.button-feedback-close').on('click', Feedback.hide)
        jqElement.find('.try-again').on('click', restart);

        Stage.on('enterPress', restart);
        
      },
      showSuccess: function () {
        //logic removal of the success message 
        return;
        if (!jqElement || Feedback.isVisible())
          return;
        jqElement.show();

        if (jqElementSuccess.length == 0)
          return;
        jqElementFailure.hide();
        jqElementSuccess.show();

        if (symbolSuccess)
          symbolSuccess.play();

      },
      showFailure: function () {
        jqElement.show();
        jqElementSuccess.hide();
        jqElementFailure.show();
        symbolFailure.play();
        
      },
      hide: function () {

        if (!jqElement)
          return;
        if (!jqElementSuccess.is(':visible') && !jqElementFailure.is(':visible'))
          return;

        jqElement.hide();
        jqElementSuccess.hide();
        jqElementFailure.hide();
        Stage.trigger('hidefinalfeedback', self);
      },
      isVisible: function () {
        return jqElement && jqElement.is(':visible');
      }
    }
  })();

  cet.dragndrop.Feedback = Feedback;

})();
