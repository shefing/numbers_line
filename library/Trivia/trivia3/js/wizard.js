/// <reference path="http://cdn.cet.ac.il/libs/cet.content/1/client.js" />
/// <reference path="http://cdn.cet.ac.il/libs/cet.content.designtime/1/client.min.js" />
/// 

var triviaWizard = function () {
  var self = this;

  var _L = document.webL10n.get;

  var sPreset;
  var sDir;
  //var bShuffle;
  var bTransparency;
  var bShowSolution;
  var sTextAlign;

  var bValid = false;
  var myHeight;


  var answerGroupCounter = 1;

  self.init = function () {


    cet.content.DesignTime.onValidationRequested = validateWizard;
    cet.content.DesignTime.onPresetRequested = buildPreset;

    initAccordion();
    initSortable();


    // prepare empty
    initDefaults();

    // load preset
    loadPreset();

  }

  function initAccordion() {

    var icons = {
      header: "ui-icon-circle-arrow-e",
      activeHeader: "ui-icon-circle-arrow-s"
    };

    $("#accordion")
			.accordion({
			  header: "> div > h3",
			  icons: icons,
			  heightStyle: "content",
			  active: false,
			  collapsible: true
			})


    changesDone();
  }

  function initSortable() {
    $("#accordion")
	.sortable({
	  axis: "y",
	  handle: ".draggable-handle",
	  stop: function (event, ui) {
	    ui.item.children("h3").triggerHandler("focusout");
	    changeQuestionsNumberByAscendingOrder();
	  }
	});
  }

  function initDefaults() {
    //bShuffle = true;

  }

  function loadPreset() {

    sPreset = cet.content.DesignTime.preset;

    if (!sPreset) {
      // no preset - add one empty element
      addElement();
      // open the last added panel
      $("#accordion").accordion("option", "active", ($('.group').length - 1));
    }
    else {

      if (sPreset.substr(0, 3) == '%7B') {
        sPreset = decodeURIComponent(sPreset);
      }

      // convert Json string to real object
      var myJsonObject = JSON.parse(sPreset);

      // update wizard with questions
      for (var i = 0; i < myJsonObject.questions.length; i++) {
        addElement(myJsonObject.questions[i]);
      }

      // open the first panel
      $("#accordion").accordion("option", "active", 0);

      //#region updateWizardWithCommonData

      // update RTL
      //if (myJsonObject.common.direction == 'rtl') {
      //  $('#directionRTL').prop("checked", true);
      //}
      //else {
      //  $('#directionLTR').prop("checked", true);
      //}

      // update LANGUAGE
      //if (myJsonObject.common.language == 'hebrew') {
      //  $('#languageHebrew').prop("checked", true);
      //}
      //else {
      //  $('#languageArabic').prop("checked", true);
      //}

      // update FONTSIZE
      switch (myJsonObject.common.fontSize) {
        case 'small':
          $('#fontSmall').prop("checked", true);
          break;
        case 'medium':
          $('#fontMedium').prop("checked", true);
          break;
        case 'large':
          $('#fontLarge').prop("checked", true);
          break;
        default:
      }

      // update SHUFFLE
      if (myJsonObject.random.questions) {
        $('#shuffleQuestionsYes').prop("checked", true);
      }
      else {
        $('#shuffleQuestionsNo').prop("checked", true);
      }

      // update TIMER
      if (myJsonObject.common.timer) {
        $('#timerYes').prop("checked", true);
      }
      else {
        $('#timerNo').prop("checked", true);
      }

      // update HELPERS
      if (myJsonObject.common.helpers) {
        $('#helpersYes').prop("checked", true);
      }
      else {
        $('#helpersNo').prop("checked", true);
      }


      //#endregion updateWizardWithCommonData
    }


    // listener for contenteditable size changes
    // myHeight already set by addElement -> changesDone

    setInterval(function () {
      // 
      var $wrapper = $(".wizard-wrapper");
      if (myHeight != $wrapper.outerHeight())
        changesDone();
    }, 100);

  }

  function validateWizard() {
    bValid = true;

    var $questions = $(".group");

    var minNumberOfQuestions = 11;

    var questionsWithOnlyTwoAnswers = new Array();

    if ($questions.length < minNumberOfQuestions) {
      bValid = false;
     
      return [_L('notEnoughQuestionsError', { minNumberOfQuestions: minNumberOfQuestions, numberOfShownQuestion: (minNumberOfQuestions - 1) })];
    }


    // check all questions
    for (var i = 0; i < $questions.length; i++) {

      var $content = $questions.eq(i).find('.question-content');

      var questionNumber = (i + 1).toString();

      // check if question is empty
      if (isEmpty($content)) {       
        return [_L('missingTextError', { questionNumber: questionNumber })];
      }

      // init number of submitted answers
      var numberOfSubmittedAnswers = 4;

      var $answers = $questions.eq(i).find('.answer-content');

      // check if at least 2 answers submitted
      for (var j = 0; j < 4; j++) {
        if (isEmpty($answers.eq(j))) {
          numberOfSubmittedAnswers--;
        }
      }

      // add question number to array of all question that have only two answers
      if (numberOfSubmittedAnswers == 2) {
        questionsWithOnlyTwoAnswers.push(i + 1);
      }

      // alert if less than two answers submitted
      if (numberOfSubmittedAnswers < 2) {       
        return [_L('inputAtLeastTwoDistructorsError', { questionNumber: questionNumber })];
      }

      var $answersRadio = $questions.eq(i).find('.answer-radio');

      // check if empty question is selected as correct
      for (var k = 0; k < 4; k++) {
        if ($answersRadio.eq(k).is(':checked') && isEmpty($answers.eq(k))) {       
          return [_L('cantSelectEmptyAnswerError', { questionNumber: questionNumber })];
        }
      }

      var correctAnswerChecked = false;

      for (var n = 0; n < 4; n++) {
        if ($answersRadio.eq(n).is(':checked')) {
          correctAnswerChecked = true;
        }
      }
      // check if no correct answer was selected
      if (!correctAnswerChecked) {        
        return [_L('selectOneAnswerError', { questionNumber: questionNumber })];
      }

    }


    // check if there is at least one question with only two answers
    // and also helpers are enabled.
    // if so, present a list of all relevant question numbers
    if (questionsWithOnlyTwoAnswers.length > 0) {
      if ($('#helpersYes').is(':checked')) {

        var questionsList = '';

        for (var i = 0; i < questionsWithOnlyTwoAnswers.length; i++) {
          questionsList += questionsWithOnlyTwoAnswers[i] + '  ';
        }

        //return ['לא ניתן להשתמש בגלגלי הצלה באם יש שאלה עם שני מסיחים בלבד. יש לבטל את גלגלי ההצלה או להוסיף מסיחים לשאלות:  ' + questionsList + '   '];
        return [_L('cantUseHelpersError')];
      }
    }


    // check if trivia has no timer but user wanted hints
    if ($('#helpersYes').is(':checked') && $('#timerNo').is(':checked')) {

      return [_L('removeHelpersOrAddTimerError')];
    }




    return null;
  }

  function isEmpty(el) {
    return $.trim(el.text()) === '';
  }


  function buildSinglePreset($quesion) {

    var $correntGroup,
			$correntOption;

    var contentJson = new Object();

    var common = new Object();
    var questions = new Array();
    var random = new Object();

    // random default values
    random.options = true;
    random.numberOfQuestions = 1;


    // common default values
    common.backgroundImage = '';
    common.timer = 30;
    //common.scoreInterval = 10;

    //#region  updateCommonData

    common.direction = 'rtl';

    common.language = cet.content.RunTime.language;

    random.questions = false;
    common.timer = true;
    common.helpers = true;

    common.fontSize = $('input:radio[name=fontSize]:checked').val();


    contentJson.random = random;

    contentJson.common = common;

    //#endregion updateCommonData


    //#region updateQuestions



    var singleQuestion = new Object();

    singleQuestion.questionNumber = 1;

    singleQuestion.title = $quesion.find('.question-content').html();

    var options = new Array();

    // update options for single question
    for (var j = 0; j < 4; j++) {

      var singleOption = new Object();

      $correntOption = $quesion.find('li').eq(j);

      singleOption.text = $correntOption.find('.answer-content').html();

      // option is not empty
      if (singleOption.text != '') {
        // this option should be saved
        if ($correntOption.find('.answer-radio').is(':checked')) {
          singleOption.correct = true;
        }
        else {
          singleOption.correct = false;
        }

        options.push(singleOption);
      }

    }

    // update single question with all options
    singleQuestion.options = options;

    questions.push(singleQuestion);


    //#endregion updateQuestions

    contentJson.questions = questions;



    contentJson.previewMode = true;

    return contentJson;
  }


  function buildPreset() {
    //var sPresetOut = "";

    if (bValid) {

      //sPresetOut = "<![CDATA[" + sOut + "]]>";

      var $correntGroup,
				$correntOption;

      var contentJson = new Object();

      var common = new Object();
      var questions = new Array();
      var random = new Object();

      // random default values
      random.options = true;
      random.numberOfQuestions = 10;


      // common default values
      common.backgroundImage = '';
      common.timer = 30;
      //common.scoreInterval = 10;

      //#region  updateCommonData

      // check RTL
      //if ($('#directionRTL').is(':checked')) {
      //  common.direction = 'rtl';
      //}
      //else {
      //  common.direction = 'ltr';
      //}

      // check LANGUAGE
      //common.language = $('input:radio[name=language]:checked').val();
      common.language = cet.content.RunTime.language;

      // check RANDOM
      if ($('#shuffleQuestionsYes').is(':checked')) {
        random.questions = true;
      }
      else {
        random.questions = false;
      }

      // check TIMER
      if ($('#timerYes').is(':checked')) {
        common.timer = true;
      }
      else {
        common.timer = false;
      }

      // check HELPERS
      if ($('#helpersYes').is(':checked')) {
        common.helpers = true;
      }
      else {
        common.helpers = false;
      }

      // check FONTSIZE
      common.fontSize = $('input:radio[name=fontSize]:checked').val();



      contentJson.random = random;

      contentJson.common = common;

      //#endregion updateCommonData

      var numberOfQuestions = $('.group').length;

      //#region updateQuestions

      for (var i = 0; i < numberOfQuestions; i++) {

        var singleQuestion = new Object();

        $correntGroup = $('.group').eq(i);

        singleQuestion.questionNumber = (i + 1);

        singleQuestion.title = $correntGroup.find('.question-content').html();

        var options = new Array();

        // update options for single question
        for (var j = 0; j < 4; j++) {

          var singleOption = new Object();

          $correntOption = $correntGroup.find('li').eq(j);

          singleOption.text = $correntOption.find('.answer-content').html();

          // option is not empty
          if (singleOption.text != '') {
            // this option should be saved
            if ($correntOption.find('.answer-radio').is(':checked')) {
              singleOption.correct = true;
            }
            else {
              singleOption.correct = false;
            }

            options.push(singleOption);
          }


        }

        // update single question with all options
        singleQuestion.options = options;

        questions.push(singleQuestion);
      }

      //#endregion updateQuestions

      contentJson.questions = questions;

      // convert Json to string
      var myJsonText = encodeURIComponent(JSON.stringify(contentJson));
    }
    return myJsonText;
  }

  function changesDone() {
    cet.content.DesignTime.notifyChange();

    var $wrapper = $(".wizard-wrapper");
    myHeight = $wrapper.outerHeight();
    cet.content.UI.setHeight(myHeight);
  }



  function createQuestionPreview($question) {


    var url = '/simple.aspx?app=/library/trivia/trivia3/he/index.htm';
    var options = { preset: encodeURIComponent(JSON.stringify(buildSinglePreset($question))) };
    window.open(url, 'preview', 'opener,width=800,height=500', true);
    window['optionsCallback'] = function () { return options; };

    return;

  }

  function addElement(content) {

    var html = '';

    html += '<div class="group elements-wrapper">';
    html += '	<div class="sprite-ow-bullet_arrow_down_up-cet ui-sprite draggable-handle"></div>';
    html += '	<div class="group-actions">';
    html += '		<div class="question-delete"></div>';
    //html += '		<div class="question-preview">' + _L('questionPreview') + '</div>';
    html += '	</div>';
    html += '	<h3>' + _L('triviaQuestion') + ' <span class="question-number">';
    if (content) {
      html += content.questionNumber;
    }
    else {
      html += '1';
    }

    html += '	</span>';
    html += '<div class="question-content-preview">';
    if (content) {


      html += truncateString($($.parseHTML(content.title)).text());
    }
    html += '</div>';
    html += '</h3>';
    html += '	<div>';
    html += '<div class="question-content ow-content" contenteditable="true">';

    if (content) {
      html += content.title;
    }

    html += '</div>';

    html += '		<div class="answers-container">';
    html += '			<div class="answer-title">' + _L('triviaQuestionInstuction') + '</div>';
    html += '			<ol>';

    for (var i = 0; i < 4; i++) {
      html += '				<li>';
      html += '				<input class="answer-radio" type="radio"';
      if (content) {
        if (content.options[i]) {
          if (content.options[i].correct == true) {
            html += 'checked="checked"';
          }
        }
      }

      html += 'name="q' + answerGroupCounter + '" value="answer-' + (i + 1) + '">';

      html += '<div class="answer-content ow-content" contenteditable="true">';

      if (content) {
        if (content.options[i]) {
          //var tempDiv = $(content.options[i].text);
          //html += tempDiv.find('.table-cell').html();
          html += content.options[i].text;
        }
      }

      html += '</div>';
      html += '</li>';
    }

    // update glogal answer group counter
    // used only in the wizard
    answerGroupCounter++;

    html += '			</ol>';
    html += '		</div>';
    html += '	</div>';
    html += '</div>';


    $("#accordion").append(html);

    $("#accordion").accordion('destroy');

    initAccordion();

    changeQuestionsNumberByAscendingOrder();

    changesDone();
  }

  function removeElement(el) {
    $(el).remove();
    changeQuestionsNumberByAscendingOrder();
    changesDone();
  }

  function changeQuestionsNumberByAscendingOrder() {
    var length = $('.question-number').length;

    //var checked = false;


    //var answerStateArray = new Array();
    //var answers = new Object();

    for (var i = 0; i < length; i++) {
      $($('.question-number')[i]).text(i + 1);


      //for (var j = 0; j < 4; j++) {

      //	var radio = $('.group').eq(i).find('.answer-radio').eq(j);

      //	checked = radio.is(':checked');

      //	radio.attr({
      //		'name': 'q' + (i + 1)
      //	})

      //	if (checked) {
      //		radio.prop("checked", true);
      //	}
      //}

    }


  }


  function truncateString(str) {

    var newStr;

    if (str.length > 30) {
      newStr = str.substring(0, 30) + '...';
    }
    else {
      newStr = str;
    }

    return newStr;
  }


  self.registerEvents = function () {


    $('.wizard-wrapper').on('focusout', '.question-content', function () {
      var $group = $(this).parent().parent();
      var $preview = $group.find('.question-content-preview');
      $preview.text(truncateString($(this).text()));
    });


    $("#accordion").on("click", ".question-preview", function () {
      createQuestionPreview($(this).parent().parent());
    });

    // add element
    $("#add-element").click(function () {
      addElement();


      // open the last added panel
      $("#accordion").accordion("option", "active", ($('.group').length - 1));
    });

    // delete element
    $("#accordion").on("click", ".question-delete", function () {
      removeElement((this.parentElement).parentElement);
    });


    $('.wizard-wrapper').on('change', 'input:radio', function () {
      changesDone();
    });

    $('.wizard-wrapper').on('blur', '.answer-content', function () {
      changesDone();
    });

  }
}
