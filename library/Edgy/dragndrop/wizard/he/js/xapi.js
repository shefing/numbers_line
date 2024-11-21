(function () {
  var Xapi = (function () {
    //var supported;

    return {
      init: function () {
        //supported = cet.content.xapiSupported;
      },
      sendMessage: function (action, score, scores, fullAnswer) {
        if (!cet.content.xapiSupported)
          return;
        var request = {}
        request.fullQuestion = {};
        request.fullQuestion.initialState = {};

        request.verb = action;
        request.fullAnswer = {};
        request.fullAnswer.currentState = {};

        request.result = {};
        request.result.extensions = {};
        request.result.extensions['http://xapi.cet.ac.il/full_answer'] = fullAnswer;
        request.result.extensions['http://xapi.cet.ac.il/score'] = scores;

        request.result.scaled = score / 100;
        request.result.success = (score == 100);
        request.result.completion = true; 
        cet.content.xapi.send(request);
      },
      actions: {
        "answered": "answered",
        "asked_check": "asked_check",
        "asked_showAnswer": "asked_showAnswer",
        "cleared": "cleared"
      }
    }
    

  })();

  cet.dragndrop.Xapi = Xapi;

})();