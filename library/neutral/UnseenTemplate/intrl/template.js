/// <reference path="http://cdn.cet.ac.il/libs/cet.content/1/client.js" />
/// <reference path="http://cdn.cet.ac.il/libs/cet.content.lms/1/client.js" />
/// <reference path="../he/localization.js" />
///
var unseenTemplate = function () {
  var self = this;
  $('html').attr('lang', cet.localization.language);
  $('html').attr('data-dir', cet.localization.direction);
  /// global vars
  /// ======================================================================
  var lms;
  var lmsSupported;
  var lmsRead;
  var lmsSave;
  var lmsVisited;
  var lmsPreset;
  var lmsData;

  var lmsMode;
  var lmsAccess;
  var lmsStore;
  var workMode;

  var oPreset = {};
  var State = {};

  var sDir;
  var fontFamily;
  var fontSize;

  var bBlock;
  var bFeedbacksVisible;

  var workStyle;

  var arMarkers = [];
  var arIndices;

  var dropZoneHolder = '__________';

  var fontFamily = '0';
  var fontSize = '0';
  var myHeight = 0;
  var myWidth = 0;
  var bDropping;

  var arFontFamily = ['Arial', 'Arial', 'Comic Sans MS', 'Courier New', 'Helvetica', 'Tahoma', 'Times New Roman', 'Traditional Arabic', 'Lateef', 'David', 'Alef'];

  var bInit;
  var bLearningReview = false;

  var xapiSupported;
  var Xapi = {};

  var actionStrings = ["", "answered", "asked_check", "asked_showAnswer", "cleared"];
  var actNONE = 0;
  var actANSWER = 1;
  var actCHECK = 2;
  var actSOLUTION = 3;
  var actCLEAN = 4
  var lastAction = actNONE;

  var customEvent;

  var seededRandomString = (seed) => {
    const a = 1664525
    const c = 1013904223
    const m = 2 ** 32
    const questionIdNumbers = extractAndConvertNumber()
    let randomSeed = questionIdNumbers * ((parseInt(seed) + 8) * 4)
    let length = 20

    function extractAndConvertNumber() {
      const questionId = window.location.search.split('?cid=application_')[1]
      const numbersOnly = questionId
        .replace(/\D/g, '')
        .padEnd(8, '0')
        .substring(0, 8)
      return parseInt(numbersOnly, 10)
    }

    function seededRandom() {
      randomSeed = (a * randomSeed + c) % m
      return randomSeed / m
    }

    let randomString = ''
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(seededRandom() * characters.length)
      randomString += characters.charAt(randomIndex)
    }

    return randomString
  }

  self.init = function () {

    // lms support
    lms = cet.content.lms;

    xapiSupported = cet.content.xapiSupported;

    lmsSupported = lms.Settings.supported;
    lmsPreset = cet.content.Settings.preset;
    lmsSave = false;
    lmsRead = false;
    lmsVisited = false;

    // default for offline or no lms
    workMode = "Training";

    if (!lmsPreset) {
      lmsPreset = "";
      alert("No preset!!!");
    }



    // set workMode according to lms
    if (lmsSupported) {
      workMode = "Learning";
      lmsMode = cet.content.lms.Activity.engagement.mode;
      lmsAccess = cet.content.lms.Activity.engagement.access;
      lmsStore = cet.content.lms.Activity.engagement.store;

      lmsRead = (lmsStore == "read" || lmsStore == "readwrite");
      lmsSave = (lmsStore == "readwrite");

      if (lmsMode == "solved")
        workMode = "Solution";
      else if (lmsMode == "browse")
        workMode = "Learning";
      else if (lmsMode == "browse_review") {
        workMode = "Learning";
        bLearningReview = true;
      }
      else if (lmsMode == "normal")
        workMode = "Evaluation";
      else if (lmsMode == "review") {
        if (lmsAccess == "read")
          workMode = "Results";
        else
          workMode = "Repair";
      }
    }

    loadData();

    //$(function () {
    //  $(window).resize(function () {
    //    resizeTemplate();
    //  });
    //});
  }

  function loadData() {
    if (lmsRead) {
      cet.content.State.load(function (lmsData) {
        if (!lmsData) {
          initTemplate(lmsPreset, null);
        }
        else {
          initTemplate(lmsPreset, lmsData);
        }
      })
    }
    else {
      initTemplate(lmsPreset, null);
    }
  }

  // init template
  function initTemplate(sPreset, dataState) {

    if (sPreset.substr(0, 8) == "%3CUnsee") {
      sPreset = decodeURIComponent(sPreset)
    }

    bInit = true;

    lms.Activity.settings.supportsCheck(true);
    lms.Activity.bind('check', function () { externalCheck(); });
    lms.Activity.settings.supportsReset(true);
    lms.Activity.bind('reset', function () { restart(); });
    lms.Activity.settings.supportsShowSolution(true);
    lms.Activity.bind('showsolution', function () { showSolution(); });
    lms.Activity.settings.supportsHostFullscreen(true);

    State = dataState || State;

    bJustChecked = State.justChecked;


    // direction
    sDir = $(sPreset).attr('direction');
    fontFamily = $(sPreset).attr('font');
    fontSize = $(sPreset).attr('size');

    var sFontFamily = arFontFamily[fontFamily];
    var sFontSize = (fontSize == '0') ? '18px' : fontSize + 'px';

    var fontSkin = cet.content.UI.getSkinStyle('font');
    //cet.content.Settings.skin.styles
    if (fontSkin) {
      if (fontFamily == '0')
        sFontFamily = fontSkin.fontFamily;
      if (fontSize == '0')
        sFontSize = fontSkin.fontSize;
    }


    $('.target').addClass(sDir);
    $('.storage').addClass(sDir);

    $('body').css({ 'font-family': sFontFamily });
    $('body').css({ 'font-size': sFontSize });

    // take initial markers
    arMarkers = $(sPreset).find('.marker');
    // make clone of initial html
    var targetHTML = sPreset;
    targetHTML = targetHTML.replaceAll('class="marker"', 'class="dropHere"');

    var $targetHTML = $(targetHTML);
    $targetHTML.find('.dropHere').each(function (i, obj) {
      $(obj).attr('id', i);
      $(obj).html(dropZoneHolder);

    });

    $('.target').html($targetHTML.html());

    if (State.arIndices && State.arIndices.length === arMarkers.length) {
      arIndices = State.arIndices;
    }
    else {
      arIndices = initSet(0, arMarkers.length - 1);
      arIndices.completeDisorder();
      State.arIndices = arIndices;
    }




    State.arIndices = arIndices;

    buildStorage();
    accessibility();
    // Get the specific div where you want to target captions
    const myDiv = document.getElementsByClassName('target')[0];

    // Get all child nodes of the div
    const childNodes = myDiv.childNodes;

    // Loop through each child node
    childNodes.forEach(node => {
    // Check if the node is a text node and not empty
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== "") {
        // Wrap the text node in a span tag
        const span = document.createElement('span');
        node.parentNode.insertBefore(span, node);
        span.appendChild(node);
        span.setAttribute('aria-label', node.textContent);
        span.setAttribute('tabindex', '0');
      }
    });


    // create feedbacks
    var fb_html = "";
    for (var i = 0; i < $('.dropHere').length; i++) {
      fb_html += '<div class="fb_bg fb_dummy" id="' + i + '"></div>';
    }
    $('.feedback-wrapper').html(fb_html);

    Xapi.fullQuestion = pairsToString();;

    bInit = false;

    block(true);

    if (workMode == "Learning" || workMode == "Evaluation") {
      // save current state
      saveDraggablesState();
      updateContent();
    }

    if (workMode == "Results" || workMode == "Repair" || (workMode == "Learning" && bJustChecked)) {
      // show feedbacks
      showFeedbacks();
      bJustChecked = false;
      State.justChecked = false;
    }
    else if (workMode == "Learning" && bLearningReview) {
      showFeedbacks();
      bLearningReview = false;
    }

    if (workMode != "Results") {
      // enable hotspots
      unblock();
    }

    if (workMode == "Solution") {
      showSolution();
    }

    setInterval(function () {
      //
      var $wrapper = $(".template-wrapper");
      if (myHeight != $wrapper.outerHeight()) {
        myHeight = $wrapper.outerHeight();
        cet.content.UI.setHeight(myHeight);
      }

    }, 100);

  }

  function buildStorage() {
    var wordWarehouse = document.getElementById('wordWarehouse');
    wordWarehouse.innerHTML = cet.localization.wordWarehouse;
    wordWarehouse.setAttribute('style', 'direction:' + cet.localization.direction);
    wordWarehouse.setAttribute('tabindex', '0');
    wordWarehouse.setAttribute('aria-label', cet.localization.wordWarehouse);
    var storageHTML = ""
    for (var i = 0; i < arMarkers.length; i++) {
      storageHTML +=
        "<span tabindex='0' role='button' class='dragMe inStorage' id='" +
        seededRandomString(arIndices[i]) +
        "'>" +
        $(arMarkers[arIndices[i]]).html() +
        '</span>'
    }
    $('.storage').html(storageHTML);

    // relocate draggables

    var width = $('.storage').width();
    var sx = 20;
    var sy = 8;
    var draggables = $('.dragMe');
    for (var i = 0; i < draggables.length; i++) {
      var dragObj = draggables.eq(i);
      var dragWidth = Math.round(dragObj.width());
      var dragHeight = Math.round(dragObj.height());

      if (sx + dragWidth + 20 > width) {
        sx = 20;
        sy += dragHeight + 15;
      }
      if (sDir == 'ltr')
        dragObj.css('left', sx);
      else {
        dragObj.css('right', sx);
        dragObj.css('left', dragObj.position().left);
        dragObj.css('right', 'auto');
      }
      dragObj.css('top', sy);
      sx += dragWidth + 20;

      var position = dragObj.position();
      dragObj.attr('sx', position.left);
      dragObj.attr('sy', position.top);

    }
    $('.storage').height(sy += dragObj.height() + 14);

    $('.dropHere').droppable({
      tolerance: 'pointer',
      //greedy: true,
      hoverClass: "dropOver",

    });

    $('.dragMe').draggable({
      revert: 'invalid',
      zIndex: 10,
      cursor: 'pointer',
      containment: 'document',
      //cursorAt: {left: 10, top:10},
      start: function (event, ui) {
        if (!bBlock) {
          hideFeedbacks();
          ui.helper.css('opacity', 1);
          ui.originalPosition.top = Number(ui.helper.attr('sy'));
          ui.originalPosition.left = Number(ui.helper.attr('sx'));
          // בדיקה אם מדובר בגרירה
          if (ui.helper.attr('droppedTo') && (customEvent == null || customEvent.detail.eventEnterOrSpace == false)) {
            var dropZone = $($('.dropHere')[$(this).attr('droppedTo')]);
            dropZone.html(dropZoneHolder);
            dropZone.removeAttr('occupiedBy');
            dropZone.removeClass('dropHere-occupiedBy');
            $(this).removeAttr('droppedTo');
            $(this).addClass('inStorage');
            $(this).attr('tabindex', '0');
            relocateDraggables();
          }
        }

      },
      stop: function (event, ui) {
        var droppable;
        // בדיקה אם זה אלמנט שהיה בתא אחר
        if ($(this).attr('droppedTo')) {
          droppable = $(document.elementFromPoint(event.pageX, event.pageY));
          if (this[0] == droppable[0])
            droppable = $(document.getElementsByClassName("storage rtl")[0]);
          var dropZone = $($('.dropHere')[$(this).attr('droppedTo')]);
          dropZone.html(dropZoneHolder);
          dropZone.removeAttr('occupiedBy');
          dropZone.removeClass('dropHere-occupiedBy');
          $(this).removeAttr('droppedTo');
          $(this).addClass('inStorage');
          $(this).attr('tabindex', '0');
          relocateDraggables();
        }
        var bUndefined = false;
        // find dropzone
        $(this).hide();
        if (event.pageX == undefined || event.pageY == undefined)
          // 189021 patch to fix chrome v64 bug
          bUndefined = true;
        else if (!droppable)
          droppable = $(document.elementFromPoint(event.pageX, event.pageY));
        $(this).show();
        if (!bUndefined) {

          if (!(droppable.hasClass('dragMe')) && !(droppable.hasClass('dropHere'))) {
             $(this).animate({ top: $(this).attr('sY'), left: $(this).attr('sX') }, 400, function () { });
            lastAction = actANSWER;
            changesMade();
            customEvent = null;
            return;
          }

          if (droppable.hasClass('dragMe')) {
            if (droppable.attr('droppedTo'))
              droppable = $($('.dropHere[id=' + droppable.attr('droppedTo') + ']'));
          }


          if (droppable.hasClass('dropHere')) {
            bDropping = true;
            if (droppable.attr('occupiedBy')) {
              var draggable = $($('.dragMe[id=' + droppable.attr('occupiedBy') + ']'));
              draggable.css('opacity', 1);
              draggable.removeAttr('droppedTo');
              draggable.addClass('inStorage');
              draggable.attr('tabindex', '0');
              droppable.removeAttr('occupiedBy');
              droppable.removeClass('dropHere-occupiedBy');
              droppable.html(dropZoneHolder);
              draggable.animate({ top: draggable.attr('sY'), left: draggable.attr('sX') }, 400, function () { });
            }
            droppable.html($(this).html());
            $(this).offset(droppable.offset());
            $(this).removeClass('inStorage');
            $(this).attr('droppedTo', droppable.attr('id'));
            droppable.attr('occupiedBy', $(this).attr('id'));
            droppable.addClass('dropHere-occupiedBy');
            $(this).css('opacity', 0);
            relocateDraggables();

          }
        }
        bDropping = false;
        lastAction = actANSWER;
        changesMade();
        customEvent = null;
      },
    });

    if (State.arDraggables) {
      restoreDraggablesState();
    }

    Array.from(document.getElementsByClassName('dragMe inStorage')).forEach(item => {
      item.addEventListener("keydown", function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
          if (customEvent != null && typeof customEvent.detail.target.css === 'function') {
            customEvent.detail.target.css('opacity', 0);
            customEvent = null;
            return;
          }         
          const { top, left } = event.currentTarget.getBoundingClientRect();
          const clientX = left + (event.currentTarget.offsetWidth / 2); // Calculate the center X position of the element
          const clientY = top + (event.currentTarget.offsetHeight / 2); // Calculate the center Y position of the element
          customEvent = new CustomEvent('dragstop', {
            bubbles: true,
            clientX: clientX,
            clientY: clientY,
            screenX: event.screenX,
            screenY: event.screenY,
            offsetX: event.offsetX,
            offsetY: event.offsetY,
            pageX: event.pageX,
            pageY: event.pageY,
            button: event.button,
            buttons: event.buttons,
            which: event.which,
            detail: {
              target: event.target,
              eventEnterOrSpace: false
            }
          });
          document.getElementsByClassName('dropHere')[0].focus();
          event.preventDefault(); // Prevent default action of Enter key press
          var ui = {
            helper: $(item),
            offset: $(item).offset(),
            originalPosition: {
              top: 0,
              left: 0
            },
            position: {
              top: 0,
              left: 0
            }
          };
          $(item).draggable("option", "start")(null, ui);
        }
      })
    });
  }

  function relocateDraggables() {
    var droppables = $('.dropHere');
    for (var i = 0; i < droppables.length; i++) {
      var droppable = droppables.eq(i);
      if (droppable.attr('occupiedBy')) {
        var draggable = $($('.dragMe[id=' + droppable.attr('occupiedBy') + ']'));

        var rects = droppable[0].getClientRects();
        var bounds = rects[0];
        draggable.offset({ left: bounds.left, top: bounds.top });
        //draggable.offset(droppable.offset());
      }
    }

  }

  function saveDraggablesState() {
    var draggables = $('.dragMe');
    var arDraggables = [];
    for (var i = 0; i < draggables.length; i++) {
      var draggable = $(draggables.eq(i));
      var id = draggable.attr('id');
      var droppedTo = draggable.attr('droppedTo');
      arDraggables.push([id, droppedTo]);
    }
    State.arDraggables = arDraggables;
  }

  function restoreDraggablesState() {
    for (var i = 0; i < State.arDraggables.length; i++) {
      if (State.arDraggables[i][1]) {
        var draggable = $($('.dragMe[id=' + State.arDraggables[i][0] + ']'));
        var droppable = $($('.dropHere[id=' + State.arDraggables[i][1] + ']'));
        droppable.html(draggable.html());
        draggable.offset(droppable.offset());
        draggable.removeClass('inStorage');
        draggable.attr('droppedTo', State.arDraggables[i][1]);
        droppable.attr('occupiedBy', State.arDraggables[i][0]);
        droppable.addClass('dropHere-occupiedBy');
        droppable.addClass('')
        draggable.css('opacity', 0);
      }
    }
    relocateDraggables();
  }


  function block() {
    bBlock = true;
    $('.dragMe').css('cursor', 'default');
    $('.dropHere').css('cursor', 'default');
    $('.dragMe').draggable('disable');
  }

  function unblock() {
    bBlock = false;
    $('.dragMe').css('cursor', 'pointer');
    $('.dropHere').css('cursor', 'pointer');
    $('.dragMe').draggable('enable');
  }



  function restart() {
    hideFeedbacks();
    State.justChecked = false;
    lmsVisited = false;

    // TODO
    var draggables = $('.dragMe');
    for (var i = 0; i < draggables.length; i++) {
      var draggable = draggables.eq(i);
      if (draggable.attr('droppedTo')) {
        var droppable = $($('.dropHere')[draggable.attr('droppedTo')]);
        droppable.html(dropZoneHolder);
        droppable.removeAttr('occupiedBy');
        droppable.removeClass('dropHere-occupiedBy');
        droppable.removeClass('dropOver');
        draggable.css('opacity', 1);
        draggable.removeAttr('droppedTo');
        draggable.addClass('inStorage');
        draggable.animate({ top: draggable.attr('sY'), left: draggable.attr('sX') }, 400, function () { });
        draggable.attr('tabindex', '0');
      }
    }

    lastAction = actCLEAN;
    changesMade();
    unblock();
  }

  var bSilentSave = true;
  function showSolution() {
    hideFeedbacks();

    var droppables = $('.dropHere');
    for (var i = 0; i < droppables.length; i++) {
      var droppable = droppables.eq(i);
      var draggable = $(`.dragMe#${seededRandomString(droppable.attr('id'))}`);
      droppable.html(draggable.html());
      draggable.offset(droppable.offset());
      draggable.removeClass('inStorage');
      draggable.attr('droppedTo', droppable.attr('id'));
      droppable.attr('occupiedBy', draggable.attr('id'));
      droppable.addClass('dropHere-occupiedBy');
      draggable.css('opacity', 0);

    }
    relocateDraggables();
    lastAction = actSOLUTION;
    block();
    bSilentSave = true;
    changesMade();

  }

  function changesMade() {
    if (bInit)
      return;


    saveDraggablesState();
    if (lmsSave || cet.content.xapiSupported) {
      if (lmsSave) {
        if (!lmsVisited) {
          lmsVisited = true;
          cet.content.lms.Activity.start();
        }
        updateContent();
      }
    }
  }

  function updateContent() {
    if (lmsSave || cet.content.xapiSupported) {

      if (lmsSave)
        cet.content.State.save(State, bSilentSave);
      // save score
      if (!bSilentSave) {
        var score = calculateScore();
        if (lmsSave) {
          cet.content.lms.Activity.score(score);
          cet.content.lms.Activity.isAnswered(isAnswered());
        }
      }
      bSilentSave = false;

      if (cet.content.xapiSupported != undefined) {

        if (lastAction != actNONE) {
          Xapi.verb = actionStrings[lastAction];
          Xapi.fullAnswer = pairsToString();

          Xapi.result = {};
          Xapi.result.scaled = score / 100;
          Xapi.result.success = (score == 100);
          Xapi.result.completion = true; // (score == 100 && bJustChecked);
          Xapi.result.extensions = {};
          Xapi.result.extensions['http://xapi.cet.ac.il/full_answer'] = answersToXapi();
          Xapi.result.extensions['http://xapi.cet.ac.il/score'] = scoresToXapi();
          cet.content.xapi.send(Xapi);
        }
      }
    }

  }

  function isAnswered() {
    var bAns = false;

    if (lastAction != actSOLUTION) {
      var answers = answersToXapi();
      for (var key in answers) {
        if (answers[key]) {
          bAns = true;
          break;
        }
      }
    }
    return bAns;

  }

  function pairsToString() {
    var arPairs = new Array();
    var droppables = $('.dropHere');

    for (var i = 0; i < droppables.length; i++) {
      var droppable = droppables.eq(i);
      var id = droppable.attr('id');
      var occupiedBy = droppable.attr('occupiedBy');
      if (occupiedBy != undefined)
        arPairs.push("T" + id + ":" + "W" + occupiedBy);
      else
        arPairs.push("T" + id + ":" + "null");
    }
    return arPairs.join(',');
  }

  function answersToXapi() {
    var answers = {};
    var droppables = $('.dropHere');

    for (var i = 0; i < droppables.length; i++) {
      var droppable = droppables.eq(i);
      var id = droppable.attr('id');
      var occupiedBy = droppable.attr('occupiedBy');
      if (occupiedBy != undefined)
        answers["T" + id] = "W" + occupiedBy;
      else
        answers["T" + id] = "";
    }
    return answers;
  }

  function scoresToXapi() {
    var scores = {};
    var droppables = $('.dropHere');
    for (var i = 0; i < droppables.length; i++) {
      var droppable = droppables.eq(i);
      var id = droppable.attr('id');
      var occupiedBy = droppable.attr('occupiedBy');
      if (occupiedBy != undefined)
        scores["T" + id] = (id == occupiedBy) ? 1 : 0;
      else
        scores["T" + id] = 0;
    }
    return scores;
  }

  function calculateScore() {

    var correctAnswers = 0;

    for (var i = 0; i < State.arDraggables.length; i++) {
      if (State.arDraggables[i][1]) {
        correctAnswers +=
          State.arDraggables[i][0] ==
          seededRandomString(State.arDraggables[i][1]);
      }
    }

    return (correctAnswers * 100 / (State.arDraggables.length));
  }

  function externalCheck() {

    showFeedbacks();

    //showFinalFeedback();
    //var result = check(false);
    bJustChecked = true;
    State.justChecked = true;
    saveDraggablesState();
    lastAction = actCHECK;
    updateContent();
  }

  function showFinalFeedback() {

    // TODO
  }

  function showFeedbacks() {

    // Results or Review mode - show feedback
    var droppables = $('.dropHere');
    for (var i = 0; i < droppables.length; i++) {
      var droppable = droppables.eq(i);
      var id = droppable.attr('id');
      var occupiedBy = droppable.attr('occupiedBy');
      var feedbackPlaceholder = droppable.find('.feedback');
      var feedback = $($('.fb_bg[id=' + id + ']'));

      var rects = droppable[0].getClientRects();
      var bounds = rects[rects.length - 1];
      if (sDir == 'ltr')
        feedback.offset({ left: bounds.right - 6, top: bounds.top - 6 });
      else
        feedback.offset({ left: bounds.left - feedback.width() + 6, top: bounds.top - 6 });
      //feedback.offset({ left: feedbackPlaceholder.offset().left - 15, top: feedbackPlaceholder.offset().top - 15 });
      if (seededRandomString(id) == occupiedBy)
        feedback.removeClass('fb_dummy').addClass('fb_correct');
      else
        feedback.removeClass('fb_dummy').addClass('fb_wrong');
    }
    bFeedbacksVisible = true;
  }

  function hideFeedbacks() {
    $('.fb_bg').each(function (i, obj) {
      $(obj).removeClass('fb_correct fb_wrong').addClass('fb_dummy');
      $(obj).offset({ left: 0, top: 0 });
    });
    bFeedbacksVisible = false;
  }

  function accessibility() {
    var elements = document.querySelectorAll('.dropHere');
    elements.forEach(element => {
      element.setAttribute('role', "textbox");
      element.setAttribute('aria-label', cet.localization.emptyCell + " " + (parseInt(element.id, 10) + 1) + " " + cet.localization.of + " " + elements.length);
      element.setAttribute('tabindex', "0");
      element.addEventListener("keydown", function (event) {
        if ((event.key === 'Enter' || event.key === ' ') && customEvent) {
          const { top, left } = event.currentTarget.getBoundingClientRect();
          const clientX = left + (event.currentTarget.offsetWidth / 2); // Calculate the center X position of the element
          const clientY = top + (event.currentTarget.offsetHeight / 2); // Calculate the center Y position of the element
          customEvent.clientX = clientX;
          customEvent.clientY = clientY;
          customEvent.pageX = clientX;
          customEvent.pageY = clientY;
          $(customEvent.detail.target).draggable("option", "stop").call(customEvent.detail.target, customEvent, null);
          return;
        }
        // עבור מקרה שרוצה להעביר ערך מתא אחד לתא אחר - לחיצה ראשונה
        if ((event.key === 'Enter' || event.key === ' ') && customEvent == null && event.currentTarget.textContent != '__________') {
          const { top, left } = event.currentTarget.getBoundingClientRect();
          const clientX = left + (event.currentTarget.offsetWidth / 2); // Calculate the center X position of the element
          const clientY = top + (event.currentTarget.offsetHeight / 2); // Calculate the center Y position of the element
          var dragMe = $(document.elementFromPoint(clientX, clientY));
          if (dragMe[0].classList.contains('ui-state-disabled'))
            return;
          customEvent = new CustomEvent('dragstop', {
            bubbles: true,
            clientX: clientX,
            clientY: clientY,
            screenX: event.screenX,
            screenY: event.screenY,
            offsetX: event.offsetX,
            offsetY: event.offsetY,
            pageX: event.pageX,
            pageY: event.pageY,
            button: event.button,
            buttons: event.buttons,
            which: event.which,
            detail: {
              target: dragMe,
              eventEnterOrSpace: true
            },
          });
          var nextDropHere = document.getElementById(parseInt(event.currentTarget.id) + 1)
          if (nextDropHere)
            nextDropHere.focus();
          else
            document.getElementById('0').focus();
          event.preventDefault(); // Prevent default action of Enter key press

          var ui = {
            helper: $(dragMe),
            offset: $(dragMe).offset(),
            originalPosition: {
              top: 0,
              left: 0
            },
            position: {
              top: 0,
              left: 0
            }
          };
          $(customEvent.detail.target).draggable("option", "start").call(customEvent.detail.target, null, ui);
        }
      })
    })
  }
    
  /**
  * ReplaceAll by Fagner Brack (MIT Licensed)
  * Replaces all occurrences of a substring in a string
  */
  String.prototype.replaceAll = function (token, newToken, ignoreCase) {
    var _token;
    var str = this + "";
    var i = -1;

    if (typeof token === "string") {

      if (ignoreCase) {

        _token = token.toLowerCase();

        while ((
            i = str.toLowerCase().indexOf(
                token, i >= 0 ? i + newToken.length : 0
            )) !== -1
        ) {
          str = str.substring(0, i) +
              newToken +
              str.substring(i + token.length);
        }

      } else {
        return this.split(token).join(newToken);
      }

    }
    return str;
  };


  self.registerEvents = function () {

    $('.template-wrapper').on('mouseleave', function () {
      $('.ui-draggable-dragging').trigger('mouseup');
    });

    $('.target').on('mousedown', '.dropHere', function (e) {
      if (!bBlock) {
        if ($(this).attr('occupiedBy')) {
          var draggable = $($('.dragMe[id=' + $(this).attr('occupiedBy') + ']'));
          draggable.offset({ left: e.offsetX - draggable.width() / 2, top: e.offsetY - draggable.height() / 2 });
          draggable.trigger(e);
        }
      }
    });

    $(window).resize(function () {
      if (bInit) return;
      // wait 500 ms after the last window resize event
      if (this.resizeTO) clearTimeout(this.resizeTO);
      this.resizeTO = setTimeout(function () {
        $(this).trigger('resizeEnd');
      }, 500);
    });

    $(window).bind('resizeEnd', function () {
      //do something, window hasn't changed size in 500ms
      var $wrapper = $(".template-wrapper");
      if (myWidth != $wrapper.outerWidth()) {
        myWidth = $wrapper.outerWidth();
        buildStorage();
        if (bBlock)
          $('.dragMe').draggable('disable');

      }
      if (bFeedbacksVisible) {
        hideFeedbacks();
        showFeedbacks();
      }
    });
  }
  document.getElementById('wordWarehouse').addEventListener('keydown', function (event) {
    const isTabKey = event.key === 'Tab';
    const isShiftKey = event.shiftKey;
    if (isTabKey) {
      if (isShiftKey) {
        // Shift+Tab: הפוך את ה-tabindex של אלמנטים עם tabindex="-1" ל-0
        const elementsWithTabIndexMinus1 = document.querySelectorAll('.storage :not(.inStorage)');
        elementsWithTabIndexMinus1.forEach(el => {
          if (el.tabIndex === -1) {
            el.tabIndex = 0;
          }
        });
      } else {
        // Tab: שנה את ה-tabindex של כל האלמנטים בתוך .storage ואין להם את הקלאס .inStorage ל-1
        const storageElements = document.querySelectorAll('.storage *:not(.inStorage)');
        storageElements.forEach(el => {
          el.tabIndex = -1;
        });
      }
    }
  });
}