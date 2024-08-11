/// <reference path="http://cdn.cet.ac.il/libs/cet.content/1/client.js" />
/// <reference path="http://cdn.cet.ac.il/libs/cet.content.lms/1/client.js" />
/// <reference path="../he/localization.js" />
/// 
var hotspotsTemplate = function () {
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
  var oHotspots;
  var nImageWidth;
  var nImageHeight;
  var leftOffset = 0;
  var topOffset = 0;
  var templateWidth = 0;
  var bBlock;

  var workStyle;
  var lastHotspotClickedId;
  var activeBubble = null;
  var activeBubbleSpot = null;
  var bResizing = false;

  var X_OFFSET = 21;
  var Y_OFFSET = 54;
  var PIC_PERCENT = 10000;

  var bViewport = false;
  var isMobile = false;
  var currZoomFactor = null;

  var bSilentSave = true;
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
  var isIE;

  var ariaLabel = "";

  self.init = function () {

    isMobile = (jQuery.browser.mobile)
    isIE = detectIE();
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

    cet.content.onresize(function () {
      resizeTemplate();
    });

    $(function () {
      $(window).resize(function () {
        resizeTemplate();
      });
    });
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

    if (sPreset.substr(0, 8) == "%3CHotsp") {
      sPreset = decodeURIComponent(sPreset)
      sPreset = sPreset.substr(18);
    }
    oPreset = JSON && JSON.parse(sPreset) || $.parseJSON(sPreset);

    bInit = true;

    State = dataState || State;

    bJustChecked = State.justChecked;


    // direction
    //sDir = oPreset.direction;

    sDir = cet.localization.direction;
    if (State.currZoomFactor != undefined) {
      oPreset.currZoomFactor = State.currZoomFactor;
      oPreset.viewport.left = State.viewport.left;
      oPreset.viewport.top = State.viewport.top;
    }

    bViewport = (oPreset.viewport && oPreset.viewport.left != undefined);

    $('.template-wrapper').addClass('dir-' + sDir);

    // image
    sImage = oPreset.image;
    // take rid of protocol
    var ar = sImage.split(":");
    if (ar.length > 1)
      sImage = ar[1];

    nImageWidth = oPreset.imagewidth;
    nImageHeight = oPreset.imageheight;

    var oImage = new Image();
    oImage.onload = function () {
      var pictureDescription = oPreset.backgroundDescription ? oPreset.backgroundDescription : cet.localization.pictureAlt;
      var img = "<img src='" + sImage + "' alt= '" + pictureDescription + "' onmousedown='return false;' style='display: block;'/>";
      $(".picture-self").html(img);
      wait4Image(function () {
        continueInit();
      });

    }
    oImage.src = sImage;
  }

  function wait4Image(callback) {
    requestAnimationFrame(function () {
      nImageWidth = $(".picture-self img")[0].naturalWidth;
      if (nImageWidth > 0)
        callback();
      else {
        wait4Image(callback);
      }
    });

  }

  function continueInit() {
    if (!bViewport)
      $(".picture-wrapper").css('max-width', nImageWidth);
    resizeTemplate();

    //var img = "<img src='" + sImage + "' onmousedown='return false;' style='display: block;'/>";
    //$(".picture-self").html(img);
    //// take a break - let the picture load
    //setTimeout(resizeTemplate, 1000);

    //cet.content.UI.setHeight(nImageHeight);
    //nImageWidth = $(".picture-self img")[0].naturalWidth;
    //$(".picture-wrapper").css('max-width', nImageWidth);

    // hotspots
    oHotspots = oPreset.hotspots;
    var nCorrectAnswers = 0;
    if (oHotspots) {
      for (var id in oHotspots) {
        var type;

        if (oHotspots[id].type == "info") {
          type = "hw-info";
          ariaLabel = cet.localization.ariaLabelInfo;
        }
        else if (oHotspots[id].type == "link") {
          type = "hw-link";
          var linkDescription = oHotspots[id].linkDescription || cet.localization.ariaLabelLink;
          //|| oPreset.linkDescription 
          ariaLabel = linkDescription;
        }
        else {
          ariaLabel = cet.localization.ariaLabelQuestion;
          if (oHotspots[id].type == 'correct' && State[id] && State[id] == true) {
            type = ((workMode == "Learning") ? 'hw-correct' : 'hw-select');
          }
          else if (oHotspots[id].type == 'false' && State[id] && State[id] == true) {
            if (workMode == "Learning") {
              type = 'hw-default';
              State[id] = false;
            }
            else {
              type = 'hw-select';
            }
          }
          else
            type = "hw-default";
        }

        if (oHotspots[id].type == 'correct')
          nCorrectAnswers++;

        var pos = {};
        worldToDisplay(oHotspots[id].position, pos);

        var div = "<div id='" + id + "'class='hotspot " + type +
          "' style='position:absolute; top:" + pos.top + "px; left:" + pos.left + "px;' role='button' aria-label='" + ariaLabel + "' tabindex='0'>";

        div += "<div class='sprite-Pin_blank ui-sprite'></div>";
        div += "<div class='sprite-Pin_link ui-sprite'></div>";
        div += "<div class='sprite-Pin_info ui-sprite'></div>";
        div += "<div class='sprite-Pin_red ui-sprite'></div>";
        div += "<div class='sprite-Pin_green ui-sprite'></div>";
        div += "<div class='sprite-Pin_select ui-sprite'></div>";
        //div += "<div class='hotspot-value'>" + ((oHotspots[id].type == "info") ? "&nbsp;" : oHotspots[id].value) + "</div>";
        div += "<div class='hotspot-value'>" + oHotspots[id].value + "</div>";
        div += "</div>";

        $(".hotspots").append(div);
      }


    }

    if (bViewport && workMode != "Results") {
      $('.picture-wrapper').draggable({
        cursor: "move",
        //start: function (event, ui) {
        //  debugger;
        //},
        drag: function (event, ui) {
          var l = 0;
          var r = -(ui.helper.width() - $('.viewport').width());
          ui.position.left = Math.max(r, Math.min(l, ui.position.left));
          var t = 0;
          var b = -(ui.helper.height() - $('.viewport').height());
          ui.position.top = Math.max(b, Math.min(t, ui.position.top));
        },
        stop: function (event, ui) {
          var vp = $('.viewport');
          var coefX = PIC_PERCENT / nImageWidth;
          var coefY = PIC_PERCENT / nImageHeight;
          oPreset.viewport.left = Math.round(-ui.position.left) * coefX;
          oPreset.viewport.top = Math.round(-ui.position.top) * coefY;
          leftOffset = -ui.position.left;
          topOffset = -ui.position.top;
          lastAction = actNONE;
          changesMade();
        }
      });
      $('.zoom').show();
    }

    if (nCorrectAnswers == 0)
      workStyle = 'info';
    else if (nCorrectAnswers == 1) {
      workStyle = 'single';
      // support external events

      lms.Activity.settings.supportsCheck(true);
      lms.Activity.bind('check', function () { externalCheck(); });

      lms.Activity.settings.supportsReset(true);
      lms.Activity.bind('reset', function () { restart(); });
      lms.Activity.settings.supportsShowSolution(true);
      lms.Activity.bind('showsolution', function () { showSolution(); });
    }
    else {
      workStyle = 'multi';
      lms.Activity.settings.supportsCheck(true);
      lms.Activity.bind('check', function () { externalCheck(); });
      lms.Activity.settings.supportsReset(true);
      lms.Activity.bind('reset', function () { restart(); });
      lms.Activity.settings.supportsShowSolution(true);
      lms.Activity.bind('showsolution', function () { showSolution(); });
    }

    lms.Activity.settings.supportsHostFullscreen(true);

    if (workStyle == 'info')
      workMode = "Training";


    Xapi.fullQuestion = {};
    Xapi.fullQuestion.initialState = {};

    bInit = false;

    block(true);

    if (workMode == "Learning" || workMode == "Evaluation") {
      // save current state
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

  }

  function resizeTemplate() {
    bResizing = true;

    if (oPreset.currZoomFactor != undefined) {
      currZoomFactor = oPreset.currZoomFactor;
    }

    var sizing = cet.content.UI.getSizingSettings();
    var width = sizing.width || sizing.maxWidth;
    var height = sizing.height || sizing.maxHeight;

    if ($(".picture-self img")[0] != undefined) {
      var imageWidth = $(".picture-self img")[0].naturalWidth;
      var imageHeight = $(".picture-self img")[0].naturalHeight;
    }
    else {
      bResizing = false;
      return;
    }

    if (!bViewport) {
      var curWidth = Math.max(400, Math.min(imageWidth, width));
      var curHeight = imageHeight * (curWidth / imageWidth);
      if (curHeight > height) {
        curHeight = Math.max(300, Math.min(curHeight, height));
        curWidth = imageWidth * (curHeight / imageHeight);
      }

      $('.template-wrapper').width(curWidth);

      nImageWidth = curWidth;
      nImageHeight = curHeight;
    }
    else {
      // get "real" size of the viewport
      var viewportWidth = oPreset.viewport.width * imageWidth / PIC_PERCENT;
      var viewportHeight = oPreset.viewport.height * imageHeight / PIC_PERCENT;

      if (currZoomFactor == null)
        currZoomFactor = imageWidth / viewportWidth;



      var maxW = Math.max(400, Math.min(imageWidth, width));


      if (viewportWidth < maxW)
        curWidth = maxW;
      else
        curWidth = viewportWidth;

      // make sure vieport width is not bigger than iframe width
      curWidth = Math.min(curWidth, width);

      curHeight = viewportHeight * (curWidth / viewportWidth);
      if (curHeight > height) {
        curHeight = Math.max(300, Math.min(curHeight, height));
        curWidth = viewportWidth * (curHeight / viewportHeight);
      }



      //nImageWidth = imageWidth * curWidth / viewportWidth;

      if (workMode == "Results")
        currZoomFactor = 1;

      nImageWidth = curWidth * currZoomFactor;

      $('.template-wrapper').width(nImageWidth);
      nImageHeight = $('.template-wrapper').outerHeight();

      if (workMode == "Results") {
        leftOffset = topOffset = 0;
      }
      else {
        leftOffset = Math.abs(oPreset.viewport.left * nImageWidth / PIC_PERCENT);
        topOffset = Math.abs(oPreset.viewport.top * nImageHeight / PIC_PERCENT);
      }

      $('.picture-wrapper').css('left', -leftOffset);
      $('.picture-wrapper').css('top', -topOffset);
    }



    $('.viewport').width(curWidth);
    $('.viewport').height(curHeight);

    relocateHotspots();

    relocateBubble();
    if ($('.template-wrapper').outerHeight() > 0)
      cet.content.UI.resizeTo({ width: curWidth, height: curHeight });

    bResizing = false;
  }

  function relocateHotspots() {
    oHotspots = oPreset.hotspots;
    if (oHotspots) {
      for (var id in oHotspots) {
        var pos = {};
        worldToDisplay(oHotspots[id].position, pos);
        $('#' + id).css('left', pos.left);
        $('#' + id).css('top', pos.top);
      }
    }
  }

  function relocateBubble() {
    if (activeBubble) {
      if (activeBubbleSpot) {
        hotspotClickHandler(activeBubbleSpot);
      }
    }
  }


  function displayToWorld(dPosition, wPosition) {
    wPosition.left = (dPosition.left + X_OFFSET) * PIC_PERCENT / nImageWidth;
    wPosition.top = (dPosition.top + Y_OFFSET) * PIC_PERCENT / nImageHeight;
  }

  function worldToDisplay(wPosition, dPosition) {
    dPosition.left = Math.round((wPosition.left * nImageWidth / PIC_PERCENT) - X_OFFSET);
    dPosition.top = Math.round((wPosition.top * nImageHeight / PIC_PERCENT) - Y_OFFSET);
  }

  function block() {
    bBlock = true;
    $('.hotspot').css('cursor', 'default');
  }

  function unblock() {
    bBlock = false;
    $('.hotspot').css('cursor', 'pointer');
  }

  function showFeedbacks() {

    // Results or Review mode - show feedback
    if (oHotspots) {
      for (var id in oHotspots) {
        if (oHotspots[id].type == 'correct' || oHotspots[id].type == 'false') {
          if (State[id] && State[id] == true) {
            $('#' + id).removeClass('hw-default hw-select');
            $('#' + id).addClass('hw-' + oHotspots[id].type);
          }
        }
      }
    }
  }

  function restart() {
    hideFeedbacks();
    State.justChecked = false;
    lmsVisited = false;
    if (oHotspots) {
      for (var id in oHotspots) {
        if (oHotspots[id].type == 'correct' || oHotspots[id].type == 'false') {
          $('#' + id).removeClass('hw-' + oHotspots[id].type + ' hw-select');
          $('#' + id).addClass('hw-default');
          State[id] = false;
        }
      }
    }
    lastAction = actCLEAN;
    changesMade();
    unblock();
  }

  function showSolution() {
    bSilentSave = true;
    hideFeedbacks();
    if (oHotspots) {
      for (var id in oHotspots) {
        if (oHotspots[id].type == 'correct' || oHotspots[id].type == 'false') {
          //$('#' + id).removeClass('hw-default');
          //$('#' + id).addClass('hw-' + oHotspots[id].type);

          // fix 160193 - show only correct ones

          $('#' + id).removeClass('hw-' + oHotspots[id].type + ' hw-select');
          $('#' + id).addClass('hw-default');
          if (oHotspots[id].type == 'correct')
            $('#' + id).addClass('hw-correct');

        }
      }
    }

    block();
    lastAction = actSOLUTION;
    changesMade();
  }

  function changesMade() {
    if (bInit)
      return;
    if (lmsSave || cet.content.xapiSupported) {
      if (lmsSave) {
        if (!lmsVisited) {
          lmsVisited = true;
          cet.content.lms.Activity.start();
        }
      }
      updateContent();
    }
  }

  function updateContent() {
    if (lmsSave || cet.content.xapiSupported) {

      if (currZoomFactor != null)
        State.currZoomFactor = currZoomFactor;
      if (bViewport)
        State.viewport = { left: oPreset.viewport.left, top: oPreset.viewport.top };
      var score = calculateScore();
      if (lmsSave) {
        cet.content.State.silentSave(State, bSilentSave);

        if (!bSilentSave) {
          cet.content.lms.Activity.score(score);
          cet.content.lms.Activity.isAnswered(isAnswered());
        }
        bSilentSave = false;
      }

      if (cet.content.xapiSupported === true) {

        if (lastAction != actNONE) {
          Xapi.verb = actionStrings[lastAction];
          Xapi.fullAnswer = {};
          Xapi.fullAnswer.currentState = {};

          Xapi.result = {};
          Xapi.result.scaled = score / 100;
          Xapi.result.success = (score == 100);
          Xapi.result.completion = true; // (score == 100 && bJustChecked);
          cet.content.xapi.send(Xapi);
        }
      }
    }
  }

  function isAnswered() {
    for (var key in State) {
      if (key != 'justChecked') {
        if (State[key] === true)
          return true;
      }
    }
    return false;
  }

  function calculateScore() {
    if (workStyle == 'info')
      return 100;

    var totalAnswers = 0;
    var correctAnswers = 0;
    var falseAnswers = 0;

    if (oHotspots) {
      for (var id in oHotspots) {
        if (oHotspots[id].type == 'correct') {
          totalAnswers++;
          if (State[id] && State[id] == true)
            correctAnswers++;
        }
        if (oHotspots[id].type == 'false') {
          if (State[id] && State[id] == true)
            falseAnswers++;
        }
      }
    }

    // 249876 - send final score relevant to final feedback


    if (correctAnswers == 0) {
      return 0;
    }
    else if (correctAnswers < totalAnswers) {
      if (workStyle == 'single')
        return ((correctAnswers == 1 & falseAnswers == 0) ? 100 : 0);
      if (workStyle == 'multi')
        return (correctAnswers * 100 / (totalAnswers + falseAnswers));
    }
    else if (correctAnswers == totalAnswers) {
      return 100;
    }

    //if (workStyle == 'single')
    //  return ((correctAnswers == 1 & falseAnswers == 0) ? 100 : 0);
    //if (workStyle == 'multi')
    //  return (correctAnswers * 100 / (totalAnswers + falseAnswers));
  }

  function externalCheck() {

    var totalAnswers = 0;
    var correctAnswers = 0;
    var falseAnswers = 0;

    if (oHotspots) {
      for (var id in oHotspots) {
        if (oHotspots[id].type == 'correct') {
          totalAnswers++;
          if (State[id] && State[id] == true)
            correctAnswers++;
        }
        if (oHotspots[id].type == 'false') {
          if (State[id] && State[id] == true)
            falseAnswers++;
        }
      }
    }
    var message;
    var caption;
    var icon;

    if (correctAnswers == 0) {
      caption = "";
      message = cet.localization.feedbackNoCorrectAnswersText;   //"בחרו את התשובות הנכונות.";
      icon = "none";
    }
    else if (correctAnswers < totalAnswers) {
      caption = cet.localization.feedbackPartialCorrectCaption;  //"נסו שוב,";
      message = cet.localization.feedbackPartialCorrectText;     //"מצאתם רק חלק מהתשובות הנכונות.";
      icon = "false";
    }
    else if (correctAnswers == totalAnswers) {
      caption = cet.localization.feedbackAllCorrectCaption;      //"כל הכבוד!";
      message = cet.localization.feedbackAllCorrectText;         //"מצאתם את כל התשובות הנכונות.";
      icon = "true";
    }


    hideFeedbacks();

    showFinalFeedback(caption, message, icon);
    //var result = check(false);
    bJustChecked = true;
    State.justChecked = true;
    lastAction = actCHECK;
    updateContent();
  }

  function showFinalFeedback(caption, message, icon) {

    var html = "<div class='sprite-feedback_bg ui-sprite2'>";
    html += "<div class='sprite-Icon_close ui-sprite caption-info' aria-label='" + cet.localization.ariaLabelClose + "' style='top:10px;'></div>";
    html += "<div class='feedback-caption_" + icon + "'>" + caption + "</div>";
    html += "<div class='feedback-message'>" + message + "</div>";
    html += "<div class='sprite-LocationPin_" + icon + " ui-sprite2'></div>";
    html += "</div>";
    $('.feedback').html(html);

    style = {
      borderWidth: 2,
      borderColor: "#f17015",
      borderRadius: 1,
      backgroundColor: "#f27f2d",
      pointerColor: "#c65d17",
      boxShadow: "10px 10px 40px rgba(0, 0, 0, 0.7)"
    };

    $('.feedback').bubblePop({
      showPointer: false,
      minWidth: 300,
      minHeight: 160,
      draggable: true,
      position: {
        boxCenter: { left: $('.viewport').width() / 2 + leftOffset, top: $('.viewport').height() / 2 + topOffset }
      },
      modal: false,
      showCloseButton: false,
      closeElementSelector: '.sprite-Icon_close',
      style: style,
      close: function () {
        activeBubble = null;
      }
    });
    activeBubble = $('.feedback');
  }

  function hideFeedbacks() {
    hideBubble();
  }

  function adjustPointerPosition(position) {
    var leftPos = position.left;
    var rightPos = position.left + 2 * X_OFFSET;
    var l = leftPos - leftOffset;
    var r = leftOffset + $('.viewport').width() - leftPos;

    pointerPosition = {};
    if (l > r) {
      pointerPosition.left = leftPos;
      style = 'left';
    }
    else {
      pointerPosition.left = rightPos;
      style = 'right';
    }
    pointerPosition.top = position.top + 21;
    return [pointerPosition, style];
  }

  function showBubble(imgIcon, message, position, maxWidth, minWidth, style) {
    var pointerPosition = adjustPointerPosition(position);
    $('.bubble').html(imgIcon + message);

    setAriaAttributes(); // Setting ARIA attributes immediately after setting the content

    $('.bubble').bubblePop({
      maxWidth: maxWidth,
      minWidth: minWidth,
      maxHeight: Math.min(300, $('.viewport').height()),
      position: {
        pointer: { left: pointerPosition[0].left, top: pointerPosition[0].top },
        orientation: pointerPosition[1],
        pointerOffset: { dx: 5, dy: 25 }
      },
      modal: false,
      //draggable: !bViewport,
      closeOnClickOutside: true,
      showCloseButton: false,
      closeElementSelector: '.sprite-Icon_close',
      style: style,
      inOutAnimation: !bResizing,
      close: function () {
        activeBubble = null;
        lastHotspotClickedId = null;
        switchOffNegativeFeedback();
        $(document).off('keydown.bubbleTrap');
      },

      contentReady: function () {
        addScrollbar();
        var closeIconInfo = document.querySelector('.sprite-Icon_close.ui-sprite.caption-info');
        var closeIconCorrectAnswer = document.querySelector('.sprite-Icon_close.ui-sprite.caption-correct');
        var closeIconWrongAnswer = document.querySelector('.sprite-Icon_close.ui-sprite.caption-false');
        if (closeIconInfo) {
          closeIconInfo.focus();
        }
        else if (closeIconCorrectAnswer) {
          closeIconCorrectAnswer.focus();
        }
        else if (closeIconWrongAnswer) {
          closeIconWrongAnswer.focus();
        }
      },
      viewport: {
        left: Math.abs($('.picture-wrapper').position().left),
        top: Math.abs($('.picture-wrapper').position().top),
        width: $('.viewport').width(),
        height: $('.viewport').height()
      },
    });
    activeBubble = $('.bubble');
    $('.bubblePop_outerBox, .bubblePop_innerBox').height($('.bubble').height());

    activeBubble.attr({
      'role': "dialog",
      'aria-modal': 'true',
      'aria-labelledby': 'content-text',
      'aria-describedby': 'bubble-content'
    });

    var closeIcon = $('.bubble').find('.sprite-Icon_close');

    closeIcon.on('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        hideBubble();
        e.preventDefault();
      }
    });

    $(document).on('keydown.bubbleTrap', function (e) {
      var focusableEls = $('.bubble').find('a, button, textarea, input, select, [tabindex]:not([tabindex="-1"])').filter(':visible');
      var firstFocusableEl = focusableEls.first();
      var lastFocusableEl = focusableEls.last();

      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusableEl[0]) {
            lastFocusableEl.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastFocusableEl[0]) {
            firstFocusableEl.focus();
            e.preventDefault();
          }
        }
      } else if (e.key === 'Escape') {
        hideBubble();
        e.preventDefault();
      }
    });

    $(document).on('focusin.bubbleTrap', function (e) {
      if (activeBubble && !activeBubble[0].contains(e.target)) {
        e.stopPropagation();
        closeIcon.focus();
      }
    });

    closeIcon.focus();

    // Move focus to the first focusable element in the popup
    //activeBubble.find('[tabindex]:not([tabindex="-1"])').first().focus();

    // }, 300);


    //$('.bubble').bubblePop({
    //  maxWidth: maxWidth,
    //  minWidth: minWidth,
    //  maxHeight: Math.min(300, $('.viewport').height()),
    //  position: {
    //    pointer: { left: pointerPosition[0].left, top: pointerPosition[0].top },
    //    orientation: pointerPosition[1],
    //    pointerOffset: { dx: 5, dy: 25 }
    //  },
    //  modal: false,
    //  //draggable: !bViewport,
    //  closeOnClickOutside: true,
    //  showCloseButton: false,
    //  closeElementSelector: '.sprite-Icon_close',
    //  style: style,
    //  inOutAnimation: !bResizing,
    //  close: function () {
    //    activeBubble = null;
    //    switchOffNegativeFeedback();
    //  },

    //  contentReady: function () {
    //    addScrollbar();
    //  },
    //  viewport: {
    //    left: Math.abs($('.picture-wrapper').position().left),
    //    top: Math.abs($('.picture-wrapper').position().top),
    //    width: $('.viewport').width(),
    //    height: $('.viewport').height()
    //  },
    //});
    //activeBubble = $('.bubble');
  }
  function setAriaAttributes() {
    if (activeBubble) {
      activeBubble.attr({
        'role': 'dialog',
        'aria-modal': 'true',
        'aria-labelledby': 'bubble-title',
        'aria-describedby': 'bubble-content'
      });
    }
  }

  function showLinkBubble(imgIcon, message, position, maxWidth, maxHeight, style) {
    var pointerPosition = adjustPointerPosition(position);
    $('.bubble').html(imgIcon + message);

    $('.bubble').bubblePop({
      maxWidth: Math.min(maxWidth, $('.viewport').width()),
      minWidth: 300,
      maxHeight: Math.min(maxHeight, $('.viewport').height()),
      minHeight: 200,
      position: {
        pointer: { left: pointerPosition[0].left, top: pointerPosition[0].top },
        boxCenter: { left: $('.viewport').width() / 2, top: $('.viewport').height() / 2 },
        orientation: pointerPosition[1],
        pointerOffset: { dx: 5, dy: 25 }
      },
      modal: false,
      //draggable: !bViewport,
      closeOnClickOutside: true,
      showCloseButton: false,
      closeElementSelector: '.sprite-Icon_close',
      style: style,
      inOutAnimation: !bResizing,
      close: function () {
        activeBubble = null;
        lastHotspotClickedId = null;
        switchOffNegativeFeedback();

        $(document).off('keydown.bubbleTrap');
        $(document).off('focusin.bubbleTrap');
      },

      contentReady: function () {
        //addScrollbar();
        var closeIconLink = document.querySelector('.sprite-Icon_close.ui-sprite.caption-link');
        if (closeIconLink) {
          closeIconLink.focus();
        }
      },
      viewport: {
        left: Math.abs($('.picture-wrapper').position().left),
        top: Math.abs($('.picture-wrapper').position().top),
        width: $('.viewport').width(),
        height: $('.viewport').height()
      },
    });

    activeBubble = $('.bubble');
    $('.bubblePop_outerBox, .bubblePop_innerBox').height($('.bubble').height());

    activeBubble.attr({
      'role': 'dialog',
      'aria-modal': 'true',
      'aria-labelledby': 'bubble-title',
      'aria-describedby': 'bubble-content'
    });

    var closeIcon = $('.bubble').find('.sprite-Icon_close');
    closeIcon.attr('tabindex', '0').attr('aria-label', cet.localization.ariaLabelClose).focus();

    closeIcon.on('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        hideBubble();
        e.preventDefault();
      }
    });

    $(document).on('keydown.bubbleTrap', function (e) {
      if (e.key === 'Tab' || e.key === 'Shift') {
        e.preventDefault();
        closeIcon.focus();
      } else if (e.key === 'Escape' || (e.key === 'Enter' && document.activeElement === closeIcon[0])) {
        hideBubble();
        e.preventDefault();
      }
    });

    $(document).on('focusin.bubbleTrap', function (e) {
      if (!activeBubble[0].contains(e.target)) {
        e.stopPropagation();
        closeIcon.focus();
      }
    });

    closeIcon.focus();

    //setTimeout(function () {
    //  activeBubble = $('.bubble');
    //  $('.bubblePop_outerBox, .bubblePop_innerBox').height($('.bubble').height());
    //}, 300);

  }

  function hideBubble() {
    if (activeBubble) {
      activeBubble.bubblePop("close", true);
      activeBubble = null;
      switchOffNegativeFeedback();
      activeBubbleSpot = null;
    }
  }

  function switchOffNegativeFeedback() {
    if (lastHotspotClickedId) {
      if (workMode != "Evaluation") {
        if (oHotspots[lastHotspotClickedId].type == 'false') {
          $('#' + lastHotspotClickedId).removeClass('hw-false');
          $('#' + lastHotspotClickedId).addClass('hw-default');
          State[lastHotspotClickedId] = false;
        }
      }
    }
  }

  function addScrollbar() {



    if ($('.scroller').outerHeight() > 234) {
      //$('#scroll-wrapper').css("margin-top","10px");
      //$('#scroll-wrapper').css("margin-bottom","10px");
      //$('.scroll-wrapper-super').css("padding", "10px 0px");
      $('#scroll-wrapper').mCustomScrollbar();
    }
    //else {
    //  $('.bubblePop_innerBox').css({ height: (40 + $('.scroller').outerHeight()) + 'px' });
    //  $('.bubblePop_outerBox').css({ height: (40 + $('.scroller').outerHeight()) + 'px' });
    //}
  }

  function hotspotClickHandler(spot) {
    if (bBlock)
      return;

    if (workMode == "Repair") {
      if (oHotspots) {
        for (var id in oHotspots) {
          if ((oHotspots[id].type == 'correct' || oHotspots[id].type == 'false') &&
            (State[id] && State[id] == true)) {
            $('#' + id).removeClass('hw-' + oHotspots[id].type);
            $('#' + id).addClass('hw-select');
          }
        }
      }
    }
    var id = $(spot).attr('id');
    if (!bResizing) {
      if (lastHotspotClickedId == id) {
        hideBubble();
        // do nothing
        lastHotspotClickedId = null;
        lastAction = actANSWER;
        changesMade();
        return;
      }
    }

    hideBubble();

    var hotspot = oPreset.hotspots[id];
    var pos = {};
    worldToDisplay(hotspot.position, pos);

    var message;
    var imgIcon;
    var caption;
    var style;

    activeBubbleSpot = spot;

    if (hotspot.type == "info") {
      caption = "<div><div class='sprite-Icon_close ui-sprite caption-info' aria-label='" + cet.localization.ariaLabelClose + "' role='button' tabindex='0' ></div>" +
        "<div class='caption-content caption-info' style='min-width:300px'><div class='content-text' id='content-text'>" +
        cet.localization.feedbackInfo +
        //((sDir == 'rtl') ? 'כדאי לדעת' : 'Nice to know') +
        " </div></div>"
      "<div class='sprite-Icon_info ui-sprite caption-info'></div></div>";
      style = {
        borderWidth: 2,
        borderColor: "#f17015",
        borderRadius: 1,
        backgroundColor: "#ffffff",
        pointerColor: "#c65d17",
        boxShadow: "10px 10px 40px rgba(0, 0, 0, 0.7)"
      };

      message = "<div class='scroll-wrapper-super'><div id='scroll-wrapper' class='bubble-message'>" +
        "<div class='scroller' role='dialog' id='bubble-content'>" +
        hotspot.infoText + "</div>" +
        "</div></div>";


      showBubble(caption, message, pos, 350, 300, style);

      lastHotspotClickedId = id;
      lastAction = actANSWER;
      changesMade();
      return;
    }


    if (hotspot.type == "link") {
      caption = "<div><div class='sprite-Icon_close ui-sprite caption-link' role='button' tabindex='0' aria-label='" + cet.localization.ariaLabelClose + "'></div>" +
        "<div class='caption-content caption-link'><div class='content-text'>" +
        cet.localization.feedbackLink +
        //((sDir == 'rtl') ? 'כדאי לדעת' : 'Nice to know') +
        " </div></div>" +
        "<div class='sprite-Icon_link ui-sprite caption-link'></div></div>";
      style = {
        borderWidth: 2,
        borderColor: "#1a898f",
        borderRadius: 1,
        backgroundColor: "#ffffff",
        pointerColor: "#1a898f",
        boxShadow: "10px 10px 40px rgba(0, 0, 0, 0.7)"
      };

      //message = "<div class='scroll-wrapper-super'><div id='scroll-wrapper' class='bubble-message'>" +
      //  "<div class='scroller'>" +
      //  hotspot.linkText + "</div>" +
      //  "</div></div>";


      //var div = document.getElementById(target);
      //div.innerHTML = '<iframe style="width:100%;height:100%;" frameborder="0" src="' + url + '" />';

      var isIFrame = hotspot.linkText.indexOf('iframe') != -1;
      if (isIFrame) {
        hotspot.linkText = hotspot.linkText.split('&lt;').join('<').split('&gt;').join('>');

        var src = $(hotspot.linkText).attr('src');

      }
      else {
        var isYoutube = (hotspot.linkText.indexOf('youtube') != -1 ||
          hotspot.linkText.indexOf('.be') != -1);
        if (hotspot.linkText.indexOf('.be') != -1) {
          src = hotspot.linkText.split('/');
          src = "https://www.youtube.com/embed/" + src[src.length - 1]
        }


        else if (hotspot.linkText.indexOf('watch') != -1) {
          var src = hotspot.linkText.split('=')[1];
          if (src.indexOf('&') != -1) {
            src = src.split('&')[0];
          }
          src = "https://www.youtube.com/embed/" + src;
        }
        else isYoutube = false;
      }
      var maxW = Math.min(hotspot.linkWidth * $('.viewport').width() / 100, $('.viewport').width());
      var maxH = Math.min(hotspot.linkHeight * $('.viewport').height() / 100, $('.viewport').height());

      message = "<div class='bubble-message' style='padding-right: 0;'>";
      if (isIFrame)
        message += '<iframe style="width:' + maxW + 'px;height:' + (maxH - 40) + 'px;" frameborder="0" id="linkIFrame" allow="autoplay; encrypted-media" />';
      else
        message += '<iframe style="width:' + maxW + 'px;height:' + (maxH - 40) + 'px;" frameborder="0" id="linkIFrame" />';
      message += '<div class="cssload-container"><div class="cssload-double-torus"></div></div></div>';

      showLinkBubble(caption, message, pos, maxW, maxH, style);  
      // add // to address if no http (or https) defined
      var prefix = (hotspot.linkText.indexOf('http') == -1) ? "//" : "";

      if (!isIFrame && !isYoutube)
        $('iframe#linkIFrame').attr('src', prefix + hotspot.linkText);
      else
        $('iframe#linkIFrame').attr('src', src);


      $('iframe#linkIFrame').load(function (fr) {
        //if (lastHotspotClickedId) {
        //  try {
        //    fr.target.contentDocument
        //  }
        //  catch (err) {
        //    alert(fr.currentTarget.src + " can't be loaded");
        //  };
        //}
        hideSpinner();
      });

      lastHotspotClickedId = id;
      lastAction = actANSWER;
      changesMade();
      return;
    }

    if (workStyle == 'multi' || workStyle == 'single') {
      if (!bResizing && State[id] == true) {
        State[id] = false;
        if (workMode == "Evaluation" || workMode == "Repair") {
          $(spot).removeClass('hw-select');
        }
        else {
          $(spot).removeClass('hw-correct hw-false');
        }
        $(spot).addClass('hw-default');
        $(spot).attr('aria-label', cet.localization.ariaLabelQuestion);
      }
      else {
        State[id] = true;

        $(spot).removeClass('hw-default');
        if (workMode == "Evaluation" || workMode == "Repair") {
          $(spot).addClass('hw-select');
        }
        else {
          $(spot).addClass('hw-' + hotspot.type);

          if (hotspot.type == "correct") {
            $(spot).attr('aria-label', cet.localization.ariaLabelTrueAnswer);
          } else if (hotspot.type == "false") {
            $(spot).attr('aria-label', cet.localization.ariaLabelFalseAnswer);
          }
          if (hotspot.type == "correct") {
            caption = "<div class='sprite-Icon_close ui-sprite caption-correct' role='button' tabindex='0' aria-label='" + cet.localization.ariaLabelTrueAnswer + " " + cet.localization.ariaLabelClose + "'></div>" +
              "<div class='caption-content caption-correct'><div class='content-text'>" +
              cet.localization.feedbackCorrect +
              //((sDir == 'rtl') ? 'יפה מאוד!' : 'Very good!') +
              "</div></div>" +
              "<div class='sprite-Icon_correct ui-sprite caption-correct'></div>";
            message = "<div id='scroll-wrapper' class='bubble-message'>" +
              ((hotspot.feedbackChecked) ? "<div class='scroller'>" + hotspot.correctText + "</div>" : "") + "</div>";

            style = {
              borderWidth: 2,
              borderColor: "#458124",
              borderRadius: 1,
              backgroundColor: "#ffffff",
              pointerColor: "#346718",
              boxShadow: "10px 10px 40px rgba(0, 0, 0, 0.7)",
            };
          }
          else if (hotspot.type == "false") {
            caption = "<div class='sprite-Icon_close ui-sprite caption-false' aria-label='" + cet.localization.ariaLabelFalseAnswer + " " + cet.localization.ariaLabelClose + "' role='button' tabindex='0'></div>" +
              "<div class='caption-content caption-false'><div class='content-text'>" +
              cet.localization.feedbackFalse +
              //((sDir == 'rtl') ? 'נסו שוב' : 'Try again') +
              "</div></div>" +
              "<div class='sprite-Icon_false ui-sprite caption-false'></div>";
            message = "<div id='scroll-wrapper' class='bubble-message'>" +
              ((hotspot.feedbackChecked) ? "<div class='scroller'>" + hotspot.falseText + "</div>" : "") + "</div>";

            style = {
              borderWidth: 2,
              borderColor: "#bc0f0f",
              borderRadius: 1,
              backgroundColor: "#ffffff",
              pointerColor: "#931111",
              boxShadow: "10px 10px 40px rgba(0, 0, 0, 0.7)",
            };
          }

          showBubble(caption, message, pos, 300, 220, style);
        }

        lastHotspotClickedId = id;
      }
    }
    lastAction = actANSWER;
    changesMade();
  }

  function hideSpinner() {
    if ($('.cssload-container').is(':visible')) {
      $('.cssload-container').hide();
      $('.cssload-double-torus')[0].style.animationPlayState = "paused";
      if (!isIE) {
        if ($('#linkIFrame').attr('src').indexOf('embed') == -1) {
          if ($('#linkIFrame')[0].contentWindow.length == 0) {

            var err = createErrorPage($('.bubble-message').height());

            $('.bubble-message').html(err);
          }
        }
      }
    }
  }

  function detectIE() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
      // IE 10 or older => return version number
      return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
      // IE 11 => return version number
      var rv = ua.indexOf('rv:');
      return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
      // IE 12 => return version number
      return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
  }
  function createErrorPage(height) {
    var html = '';

    //html += '<html>';
    //html += '<head>';
    //html += '<style>';
    //html += '.wrapper{margin-left:auto;margin-right:auto;margin-top:72px;min-width:320px;max-width:600px;direction:ltr}';
    //html += 'td,table{vertical-align:top;border-collapse:collapse;border-spacing:0px;direction:ltr}';
    //html += 'h1{line-height:28px;font-size:24px;color:#1f1f1f;margin:0;padding:4px 0 0 0;}';
    //html += 'p{line-height:20px;font-size=15px;color:#1f1f1f;margin:16px 0 0 0;padding:0;}';
    //html += '</style>';
    //html += '</head>';
    //html += '<body';
    html += '<div class="wrapper" style="height:' + height + 'px">';
    html += '<table>';
    html += '<tr>';
    html += '<td style="width:78px;"></td>';
    html += '<td>';
    html += "<h1 class='header' style='line-height: 28px;font-size: 24px;font-weight: normal;'>This content can't be shown in a frame</h1>";
    html += "<p class='body1' style='line-height: 20px;font-size: 15px;font-weight: normal;'>There is supposed to be some content here, but the publisher doesn’t allow it to be displayed in a frame. This is to help protect the security of any information you might enter into this site.</p>";
    html += '</td>';
    html += '</tr>';
    html += '</table>';
    html += '</div>';
    //html += '</body';
    //html += '</html>';
    return html;
  }


  function onwheel(e) {
    e.preventDefault();
    var deltaY;
    if (e.deltaY) { // FireFox 17+ (IE9+, Chrome 31+?)
      deltaY = e.deltaY;
    } else if (e.wheelDelta) {
      deltaY = -e.wheelDelta;
    }

    if (deltaY > 0)
      zoomOut();
    else
      zoomIn();
    lastAction = actNONE;
    changesMade();
  }

  $(document).ready(function () {
    $('.zoomin').attr('role', 'button')
      .attr('tabindex', '0')
      .attr('aria-label', cet.localization.ariaLabelZoomIn)
      .on('click', function () {
        zoomIn();
      });

    $('.zoomout').attr('role', 'button')
      .attr('tabindex', '0')
      .attr('aria-label', cet.localization.ariaLabelZoomOut)
      .on('click', function () {
        zoomOut();
      });
  });

  function zoomIn(zoomFactor) {
    var factor = (zoomFactor != undefined) ? zoomFactor : 1.1;
    var viewportWidth = $('.viewport').width();
    if (nImageWidth > 10 * viewportWidth) {
      $('.zoomin')[0].disabled = true;
      $('.zoomin').toggleClass('disabled', true);
      $('.zoomin').removeClass('hover');
      return;
    }
    zoomTo(factor);
    $('#aria-live-message').text('');
    setTimeout(function () {
      $('#aria-live-message').text(cet.localization.voicePromptZoomIn);
    }, 1000);
    $('.zoomout')[0].disabled = false;
    $('.zoomout').toggleClass('disabled', false);
  }

  function zoomOut(zoomFactor) {
    var factor = (zoomFactor != undefined) ? zoomFactor : 0.9;
    var viewportWidth = $('.viewport').width();
    if (nImageWidth == viewportWidth) {
      $('.zoomout')[0].disabled = true;
      $('.zoomout').toggleClass('disabled', true);
      $('.zoomout').removeClass('hover');
      return;
    }
    $('.zoomin')[0].disabled = false;
    $('.zoomin').toggleClass('disabled', false);
    zoomTo(factor);
    $('#aria-live-message').text('');
    setTimeout(function () {
      $('#aria-live-message').text(cet.localization.voicePromptZoomOut);
    }, 1000);
  }

  function zoomTo(zoomCoef) {
    var viewportWidth = Math.round($('.viewport').width());
    var viewportHeight = Math.round($('.viewport').height());



    var newWidth = nImageWidth * zoomCoef;
    if (newWidth < viewportWidth) {
      newWidth = viewportWidth;
      zoomCoef = newWidth / nImageWidth;
    }
    var newHeight = nImageHeight * zoomCoef;
    var newLeft = Math.max(0, (leftOffset + viewportWidth / 2) * zoomCoef - viewportWidth / 2);
    var newTop = Math.max(0, (topOffset + viewportHeight / 2) * zoomCoef - viewportHeight / 2);

    newLeft = Math.min(newLeft, newWidth - viewportWidth);
    newTop = Math.min(newTop, newHeight - viewportHeight);

    nImageWidth = newWidth;
    nImageHeight = newHeight;
    leftOffset = newLeft;
    topOffset = newTop;

    //$('.template-wrapper').animate({ width: nImageWidth }, 0, function () {
    //  $('.picture-wrapper').animate({ left: -leftOffset, top: -topOffset }, 1000);
    //});

    currZoomFactor = nImageWidth / $(".viewport").width();

    $('.template-wrapper').width(nImageWidth);

    $('.picture-wrapper').css('left', -leftOffset);
    $('.picture-wrapper').css('top', -topOffset);

    var coefX = PIC_PERCENT / nImageWidth;
    var coefY = PIC_PERCENT / nImageHeight;
    oPreset.viewport.left = Math.round(-leftOffset) * coefX;
    oPreset.viewport.top = Math.round(-topOffset) * coefY;
    relocateHotspots();
    relocateBubble();
  }

  function onPinch(ev) {
    if (ev.type == 'pinchout')
      zoomIn(1.05);
    else
      zoomOut(0.95);
    lastAction = actNONE;
    changesMade();
  }

  var aniCount = 0;
  var aniId;
  function aniZoomIn() {
    aniCount = 10;
    aniId = setInterval(doZoomIn, 50);
  }
  function aniZoomOut() {
    aniCount = 10;
    aniId = setInterval(doZoomOut, 50);
  }
  function doZoomIn() {
    aniCount--;
    if (aniCount == 0) {
      clearInterval(aniId);
      lastAction = actNONE;
      changesMade();
    }
    zoomIn(1.02);
  }
  function doZoomOut() {
    aniCount--;
    if (aniCount == 0) {
      clearInterval(aniId);
      lastAction = actNONE;
      changesMade();
    }
    zoomOut(0.98);
  }
  self.registerEvents = function () {
    //window.onerror = function (message, file, line, col, error) {
    //  alert("Error occurred: " + error.message);
    //  return false;
    //};

    registerHoverStates($('.zoomin'));
    registerHoverStates($('.zoomout'));

    function registerHoverStates(el) {
      var $this = $(el);
      $this.on('touchstart', function () {
        $this.addClass('hover');
      });
      $this.on('touchend', function () {
        $this.removeClass('hover');
      });

      $this.on('mouseenter', function () {
        if (!isMobile)
          $this.addClass('hover');
      });
      $this.on('mouseleave', function () {
        if (!isMobile)
          $this.removeClass('hover');
      });
    }

    if (isMobile && bViewport) {
      var el = $('.hotspots')[0];
      var mc = new Hammer.Manager(el);
      mc.add(new Hammer.Pinch({ threshold: 0 }));
      mc.on('pinchin pinchout', onPinch);
    }

    $('.hotspots').on('vclick', '.hotspot', function () {
      //hideBubble();
      hotspotClickHandler(this);
      return false;
    });

    $('.hotspots').on('keydown', '.hotspot', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault(); 
        hotspotClickHandler(this);
        return false;
      }
    });

    //$('.hotspots').on('mousedown', '.hotspot', function (e) {
    //  debugger;
    //  //e.stopPropagation();
    //  //return false;
    //});
    $('.hotspots').on('vclick', function () {
      hideBubble();
      return false;
    });

    $('.hotspots').on('wheel', function (e) {
      if (bViewport && workMode != "Results") {
        onwheel(e.originalEvent);
        return false;
      }
    });
    $('.zoomin').on('click keydown', function (event) {
      if (aniCount == 0 && (event.type === 'click' || event.key === 'Enter' || event.key === ' ')) {
        aniZoomIn();
        event.preventDefault(); // מניעת פעולה ברירת מחדל
      }
    });
    
    $('.zoomout').on('click keydown', function (event) {
      if (aniCount == 0 && (event.type === 'click' || event.key === 'Enter' || event.key === ' ')) {
        aniZoomOut();
        event.preventDefault(); // מניעת פעולה ברירת מחדל
      }
    });

    $('.template-wrapper').on('mouseleave', function () {
      $('.ui-draggable-dragging').trigger('mouseup');
    });
  }
}
