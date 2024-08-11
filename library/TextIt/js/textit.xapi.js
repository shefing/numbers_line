var Textit = Textit || {};

Textit.XAPI = {};

Textit.XAPI.sendEvent = function(event){
}

Textit.XAPI.XAPIEmitter = function (article) {
  var self = {};
  var questionTypes = {};
  var fullAnswers = {};
  var fullScore = {};
  function start() {
    // initiate and listen
    article.forEachQuestion(function (i, question) {
      numQuestions = i + 1;
      var question_id = Textit.externalQuestions.getQuestionGUID(i) || i;
      var question_type = question.questionType;
      questionTypes['ti_' + i] = question_type;
      fullAnswers['ti_' + i] = question.getUserResponse();
      fullScore['ti_' + i] = to2Digits(question.getScore());
      var question_number = i;
      question.on('answer', function () {
        fullAnswers['ti_' + i] = question.getUserResponse();
        fullScore['ti_' + i] = to2Digits(question.getScore());
        if (self.onChange)
          self.onChange();
      })
    });
  }
  function getOverallScore() {
    return scores.reduce(add) / numQuestions;
  }
  // helper for addition
  function sum(a, b) {
    return a + b;
  }
  function to2Digits(f) {
    return Math.round(f * 100) / 100;
  }
  /*
  * @private
  * emit the xapi statement through cet.content
  */
  self.getData = function (verb) {
    var score = to2Digits(article.getOverallScore());
    return {
      verb: verb || 'answered',
      object: {
        definition: {
          type: "http://adlnet.gov/expapi/activities/cmi.interaction.asset." + "TextIt",
          extensions: {
            'http://xapi.cet.ac.il/types': questionTypes
          }
        }
      },
      fullAnswer: {
        currentState: {}
      }, // all the answers from all the questions
      result: {
        scaled: score,
        raw: score * 100,
        completion: true,
        success: score == 1,
        extensions: {
          'http://xapi.cet.ac.il/score': fullScore,
          'http://xapi.cet.ac.il/full_answer': fullAnswers
        }
      },
      fullQuestion: { initialState: {} }
    }
  }
  //start
  start();

  return self;
 }


/*
Textit.XAPI.statements = {
  extend: function (name, sender, options) {
    return Textit.XAPI.statements[name](sender, options);
  },
  construct : function(statementType, sender){
    return Textit.XAPI.statements[statementType](sender);
  },
  'base': function () {
    return {
      version: Textit.XAPI.config.VERSION,
      timestamp: Textit.XAPI.util.timeStamp(),
      id: Textit.XAPI.util.randomUUID(),
      actor: Textit.XAPI.getActor(),
      object: {
        objectType: "Activity"
      }
    };
  },
  'base:answered': function (sender, options) {
    var statement = Textit.XAPI.statements.extend('base', sender);
    statement.verb = Textit.XAPI.verb('answered');
    statement.object.definition = Textit.XAPI.interaction(options.interaction, 'he', question.getInstruction());
    statement.result = Textit.XAPI.result(question.getScore(), false, true);
    return statement;
  },
  'multiplechoice:answered': function(question, action){
    var statement = Textit.XAPI.statements.extend('base:answered', sender, { interaction: 'choice' });
    var response = question.response;
    if (response.index) // i.e, is of format {index: 5, text: text}, and not the xapi string format option5: text
      statement.result.response = 'option' + response.index + ': ' + response.text;
    else
      statement.result.response = response;
    var full_answer = question.answers;
    if (full_answer instanceof Array) // convert to xapi format {MC_1: ___, MC_2: ___}
    Textit.XAPI.extend(statement.result, Textit.XAPI.config.CET_XAPI, 'full_answer', full_answer);
    return statement;
  }
}

Textit.XAPI.createStatement = function (sender, action) {
  var VERSION = '1.0.0';
  +action.verb
  if (sender.questionType) { // if is a question
    return Textit.XAPI.statements[sender.questionType + ':' + action.verb](sender, action);
  }
}

Textit.XAPI.getActor = function () {
  return {
    objectType: "Agent"
  }
}

Textit.XAPI.config = {
  VERSION: '1.0.0',
  CET_XAPI: 'http://xapi.cet.ac.il/',
  VERB_OPENID_URL: "http://adlnet.gov/expapi/verbs/",
  INTERACTION_OPENID_URL: "http://adlnet.gov/expapi/activities/cmi.interaction"
}

Textit.XAPI.verb = function (shorthand) {
  return {
    id: Textit.XAPI.config.VERB_OPENID_URL + shorthand,
    display: {
      'en-US': shorthand
    }
  }
}
Textit.XAPI.interaction = function(shorthand, language, instruction){
  var _i = {type: Textit.XAPI.config.INTERACTION_OPENID_URL + '.' + shorthand, name: {}};
  _i.name[language] = instruction;
  return _i;
}

Textit.XAPI.result = function (score, success, completion) {
  var result = {
    score: {
      raw: score,
      scaled: score
    },
    success: success,
    completion:completion
  }
  return result;
}


//add addtributes which are outside of the XAPI's specification
Textit.XAPI.extend = function (xapiStatement, extendingDomain, extendedProperty, value) {
  if (!xapiStatement.extensions) xapiStatement.extensions = {};
  xapiStatement.extensions[extendingDomain + extendedProperty] = value;
}

Textit.XAPI.util = {
  randomUUID: (function () {
    return function b(a) { return a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, b) }
  })(),
  timeStamp : function() {
    function pad(number) {
      return number < 10 ? '0' + number : number;
    }
    var now = new Date();
    var timeZone = -now.getTimezoneOffset() / 60;
    return now.getFullYear() +
      '-' + pad(now.getMonth() + 1) +
      '-' + pad(now.getDate()) +
      'T' + pad(now.getHours()) +
      ':' + pad(now.getMinutes()) +
      ':' + pad(now.getSeconds()) +
      (timeZone >= 0 ? '+' : '-') + pad(Math.abs(timeZone)) + ':00';
  }
}

*/