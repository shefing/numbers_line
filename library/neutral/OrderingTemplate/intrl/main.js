/// <reference path="http://cdn.cet.ac.il/libs/cet.content/1/client.js" />
/// <reference path="http://cdn.cet.ac.il/libs/cet.content.lms/1/client.js" />
/// 
var orderingTemplate = function () {
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

  var bShuffle;
  var sLayout;
  var bTransparency;
  //var bShowSolution;
  var sDir;
  var sFontFamily;
  //var sFontSize;
  var sTextAlign;
  var sWidth;
  var bFeedback;
  var bJustChecked;
  var bShowSolutionToTeacher
  var nSequences;

  var $XML;
  var $Common;
  var $sortables;
  var State = {};
  var bInit;
  var bDragging;
  var indices;
  var bLearningReview = false;
  var nTemplateHeight;
  var nCurHeight;

  var xapiSupported;
  var Xapi = {};

  var actionStrings = ["", "answered", "asked_check", "asked_showAnswer", "cleared", "launched", "loaded", "asked_generate"];
  var actNONE = 0;
  var actANSWER = 1;
  var actCHECK = 2;
  var actSOLUTION = 3;
  var actCLEAN = 4;
  var actLAUNCH = 5;
  var actLOAD = 6;
  var actGENERATE = 7;

  var lastAction = actNONE;

  var itemIndex;

  //cet.content.xapiSupported = true;

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

      // support external events
      lms.Activity.settings.supportsCheck(true);
      lms.Activity.settings.supportsReset(true);
      lms.Activity.settings.supportsShowSolution(true);
      lms.Activity.settings.supportsHostFullscreen(true);

      lms.Activity.bind('check', function () { externalCheck(); });
      lms.Activity.bind('reset', function () { restart(); });
      lms.Activity.bind('showsolution', function () { showSolution(false); });
    }

    loadData();

    $(function () {
      $(window).resize(function () {
        resizeSortables();
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
  function initTemplate(dataXML, dataState) {

    var data = dataXML;
    if (dataXML.substr(0, 8) == "%3COrder")
      data = decodeURIComponent(dataXML)
    bInit = true;

    $XML = $(data);

    if (dataState != null) {
      lastAction = actLOAD;
    }

    State = dataState || State;

    $Common = $XML.find("Common");

    bShuffle = ($Common.attr("shuffle") == "true");
    bTransparency = ($Common.attr("transparency") == "true");

    //todo: add support later
    sLayout = $Common.attr("layout").toLowerCase();
    //bShowSolution = ($Common.attr("showSolution") == "true");
    //if (lmsSupported && bShowSolution)
    //  lms.Activity.bind('showsolution', function () { showSolution(false); });

    sDir = $Common.attr("direction");
    if (sDir == undefined) sDir = "rtl";

    if (sLayout == "horizontal")
      sTextAlign = "center";
    else
      sTextAlign = (sDir == "rtl") ? "right" : "left";

    sWidth = $Common.attr("width");

    bFeedback = ($Common.attr("feedback") == "true");


    sFontFamily = $Common.attr("fontFamily");
    if (sFontFamily == undefined) {
      (cet.localization.language == "ar") ? FontFamily = "Abraham" : FontFamily = "Alef";
    }
    $(":root")[0].style.setProperty("--font-family", sFontFamily);

    //sFontSize = $Common.attr("fontSize");
    //if (sFontSize == undefined)
    //  sFontSize = "1em";
    //else {
    //  sFontSize = sFontSize.split("px")[0] / 20 + "em";//TODO: change px to em!
    //}
    //$(":root")[0].style.setProperty("--font-size", sFontSize);

    var $Elements = $XML.find("Element");

    if (dataState) {
      // take saved order
      indices = State.currentOrder;
    }
    else {
      indices = initSet(0, $Elements.length - 1);
      if (bShuffle) {
        //indices = subSet($Elements.length, indices, true);
        indices.completeDisorder();
      }
      // save initial order for future reset
      State.initialOrder = indices;
    }

    // prepare html

    if (sLayout == "vertical")
      $('.sortable-wrapper').addClass("layout-vertical");
    else
      $('.sortable-wrapper').addClass("layout-horizontal");
    if (sDir == "rtl")
      $('.sortable-wrapper').addClass("dir-rtl");
    else
      $('.sortable-wrapper').addClass("dir-ltr");

    var htmlSortables = "";
    htmlSortables += "<ul id='sortable'>";

    for (var i = 0; i < indices.length; i++) {
      var $element = $Elements.eq(indices[i]);
      var dataOrder = $element.attr("order");
      var content = $element.html();

      // get rid of cursors defs
      var ind = content.indexOf("cursor");
      while (ind != -1) {
        var rest = content.substr(ind);
        var ind2 = rest.indexOf(";");
        content = content.substr(0, ind - 1) + rest.substr(ind2 + 1);
        ind = content.indexOf("cursor");
      }
      itemIndex = i + 1;
      //htmlSortables += "<li class='ot-default' data-order=" + dataOrder + " data-position='" + indices[i] + "'>";
      htmlSortables += "<li data-dynamic-variable='" + itemIndex + "' class='ot-default' tabindex='0' role='button' aria-label='" + content + " " + cet.localization.answer + " " + itemIndex + " " + cet.localization.of + " " + indices.length + "' data-order=" + LZString.compressToBase64(dataOrder) + " data-position='" + LZString.compressToBase64(indices[i].toString()) + "'>";
      htmlSortables += "<div class='ot-feedback'><div class='sprite-ot-correct ui-sprite'></div><div class='sprite-ot-wrong ui-sprite'></div></div>";
      htmlSortables += "<div class='ot-content' ";
      htmlSortables += "style='direction:" + sDir + "; text-align:" + sTextAlign + ";' >";
      htmlSortables += content;
      htmlSortables += "</div>";
      htmlSortables += "<div class='ot-handle'><div class='sprite-ot-dots ui-sprite'></div></div>";
      htmlSortables += "</li>";
    }

    htmlSortables += "</ul";

    $('.sortable-wrapper').html("");
    $('.sortable-wrapper').html(htmlSortables);


    trySize();

    // make sure all images (if we have such in content) are loaded

    //$('.sortable-wrapper').hide();
    var notLoadedImages = Array.prototype.slice.call(document.querySelectorAll('.ot-content img'))
      .filter(function (img) { return !img.complete; });

    $(notLoadedImages).load(function () { testImageIsloaded(); });

    $('.sortable-wrapper').data('init', false);
    // test also images in cache
    testImageIsloaded();
    setTimeout(setupSortable, 7000); //if we have a problem downloading one of the images, we will anyway continue after x miliseconds
  }

  function trySize() {
    if (!$('.sortable-wrapper').size()) {
      window.requestAnimationFrame(trySize);
    } else {
      $('.sortable-wrapper').hide();
    }
  };


  function testImageIsloaded() {
    if (!Array.prototype.slice.call(document.querySelectorAll('.ot-content img')).every(function (img) { return img.complete; })) {
      //not all images are ready, so wait for the next load event to call us.
      return;
    }
    setupSortable();
  }

  function setupSortable() {
    if ($('.sortable-wrapper').data('init') === true) return;
    $('.sortable-wrapper').data('init', true);
    $('.sortable-wrapper').show();


    // define sortables

    $sortables = $(".ot-default");

    $("#sortable").sortable();

    if (sLayout == "vertical") {
      $("#sortable").sortable("option", "axis", "y");
    }

    $("#sortable").sortable({ tolerance: "pointer" });

    $("#sortable").sortable("option", "opacity", (bTransparency) ? 0.5 : 1);
    $("#sortable").sortable({ cursor: "-webkit-grabbing" });
    $("#sortable").sortable({ placeholder: "ui-state-highlight" });
    //$("#sortable").disableSelection();

    // resize to same height
    resizeSortables();

    setInterval(function () {
      var wrapperHeight = $(".sortable-wrapper").height();
      var containerheight = $("#sortable-container").height();

      if (wrapperHeight >= (nTemplateHeight + nCurheight)) {
        $("#sortable-container").height(wrapperHeight + 40);
        cet.content.UI.setHeight(wrapperHeight + 40);

      }
    }, 100);

    resizeSortables();

    $("#sortable").sortable({
      forcePlaceholderSize: true,
      start: function (event, ui) {
        if (sLayout == "vertical")
          ui.placeholder.height(ui.item.height());
        else if (sLayout == "horizontal") {
          $(event.target).data("ui-sortable").floating = true;
          ui.placeholder.addClass("ot-default");
          ui.placeholder.html("&nbsp;");
          ui.placeholder.height(ui.item.height());
          ui.placeholder.width(ui.item.width());

        }

        hideFeedbacks();
        bDragging = true;
      },
      stop: function (event, ui) {
        hideFeedbacks();
        lastAction = actANSWER;
        changesMade();
        bDragging = false;
      }
    });

    $("#sortable").disableSelection();

    bJustChecked = State.justChecked;



    bInit = false;
    // disable sortables
    block(true);

    if (workMode == "Learning" || workMode == "Evaluation" || workMode == "Repair") {
      // save current state

      updateContent();
    }

    if (workMode == "Results" || workMode == "Repair" || (workMode == "Learning" && bJustChecked)) {
      // show feedbacks
      check(false);
      bJustChecked = false;
      State.justChecked = false;
    }
    else if (workMode == "Learning" && bLearningReview) {
      // showFeedbacks();
      bLearningReview = false;
    }

    if (workMode != "Results") {
      // enable sortables
      unblock();
    }

    if (workMode == "Solution") {
      if (!bShowSolutionToTeacher)
        showSolution(true);
    }

  }

  function resizeSortables() {
    if ($('.sortable-wrapper').data('init') !== true) return;

    var curHeight = -1;
    var curWidth = -1;

    $sortables = $(".ot-default");
    for (var i = 0; i < $sortables.length; i++) {
      $sortables.eq(i).removeAttr('style');
      curHeight = Math.max(curHeight, $sortables.eq(i).height());
      curWidth = Math.max(curWidth, $sortables.eq(i).width());
    }

    if (sLayout == "horizontal")
      curHeight += 19;

    curHeight = Math.max(curHeight, 40);


    for (var i = 0; i < $sortables.length; i++) {
      $sortables.eq(i).height(curHeight);
    }

    if (sLayout == "horizontal") {
      if (sWidth == 'constant') {
        curWidth = Math.max(curWidth, ($(".sortable-wrapper").width() - $sortables.length * 4) / $sortables.length);

        for (var i = 0; i < $sortables.length; i++) {
          $sortables.eq(i).width(curWidth);
        }
      }
      else {
        for (var i = 0; i < $sortables.length; i++) {
          // workaround for IE: increasing width by 1px to avoid stupid word-wrapping 
          $sortables.eq(i).width(Math.max($sortables.eq(i).width() + 1, 45));
        }
      }
    }
    $("#sortable").sortable("refreshPositions");

    nTemplateHeight = $(".sortable-wrapper").height();
    nCurheight = curHeight;

    if (sLayout == "horizontal") {
      if (nTemplateHeight < curHeight * 2)
        $("#sortable").sortable("option", "axis", "x");
      else
        $("#sortable").sortable("option", "axis", "xy");
    }

    $("#sortable-container").height(nTemplateHeight + 40);

    $("#sortable").sortable({ containment: "#sortable-container" });

    // vertically center content
    for (var i = 0; i < $sortables.length; i++) {
      var $content = $sortables.eq(i).find(".ot-content");
      if (sLayout == "horizontal") {
        $content.css('top', (curHeight - 19 - $content.height()) / 2 - 2 + 19);
      }
      else {
        $content.css('top', (curHeight - $content.height()) / 2 - 2);
      }
    }

    cet.content.UI.setHeight(nTemplateHeight + 40);
  }


  function block() {
    blockSortables(true);
  }

  function unblock() {
    blockSortables(false);
  }

  function blockSortables(bDisable) {
    if (bDisable)
      $("#sortable").sortable("disable");
    else
      $("#sortable").sortable("enable");
  }

  function check(silently) {

    hideFeedbacks();

    var bCorrect = true;
    var arSequence = new Array();
    $sortables = $(".ot-default");
    for (var i = 0; i < $sortables.length; i++) {

      if (!silently) {
        arSequence.push(getData($sortables.eq(i).data("position")));

        if (getData($sortables.eq(i).data("order")) == $sortables.eq(i).index()) {
          $sortables.eq(i).addClass("ot-correct");
        }
        else {
          $sortables.eq(i).addClass("ot-wrong");
          bCorrect = false;
        }
      }
    }
    countSequences(arSequence);
    return bCorrect;
  }

  function countSequences(arr) {
    nSequences = 0;
    var f = false;
    for (var i = 1; i < arr.length; i++) {
      //if (arr[i] - arr[i-1] == 1 ) {
      //  if (!f) {
      //    nSequences++;
      //    f = true
      //  }
      //}
      //else
      //  f = false;

      if (arr[i] - arr[i - 1] == 1) {
        nSequences++;
      }

    }
  }

  function getData(str) {
    var out = LZString.decompressFromBase64(str);
    if (out == '' || out == null)
      return str;
    else
      return out;
  }

  function hideFeedbacks() {
    $sortables.removeClass("ot-correct");
    $sortables.removeClass("ot-wrong");
    $sortables.removeClass("ot-solution");
    //$("#hint-wrapper").hide();
  }

  function restart() {
    hideFeedbacks();
    hideFinalFeedback();
    State.currentOrder = State.initialOrder;
    State.justChecked = false;

    lmsVisited = false;
    bNoSave = true;
    initTemplate(lmsPreset, State);
    bNoSave = false;

    lastAction = actCLEAN;
    changesMade();
    unblock();
  }

  var bSilentSave = true; // first save always silent

  var bNoSave = false;
  function showSolution(entry) {
    bNoSave = true;
    hideFeedbacks();
    bShowSolutionToTeacher = entry;
    var solution = new Array($sortables.length);
    for (var i = 0; i < $sortables.length; i++) {
      var order = parseInt(getData($sortables.eq(i).data("order")));
      var pos = parseInt(getData($sortables.eq(i).data("position")));
      solution[order] = pos;
    }
    State.justChecked = false;
    State.currentOrder = solution;
    initTemplate(lmsPreset, State);
    $sortables = $(".ot-default");
    for (var i = 0; i < $sortables.length; i++) {
      $sortables.eq(i).addClass("ot-solution");
    }
    block();
    lastAction = actSOLUTION;
    bShowSolutionToTeacher = false;
    bNoSave = false;
    bSilentSave = true;
    changesMade();
  }

  function changesMade() {
    if (bInit || bNoSave)
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


  var currentOrder;
  function updateContent() {
    var score = 0;
    if (bInit || bNoSave)
      return;
    if (lmsSave || cet.content.xapiSupported) {
      $sortables = $(".ot-default");
      var curOrder = new Array()
      for (var i = 0; i < $sortables.length; i++) {
        curOrder.push(parseInt(getData($sortables.eq(i).data("position"))));
      }

      State.currentOrder = curOrder;

      var a = document.getElementsByClassName('ot-default');
      for (var i = 0; i < $sortables.length; i++) {
        if (a[i].dataset.dynamicVariable != i + 1) {
          a[i].dataset.dynamicVariable = i + 1;
          $sortables.eq(i).attr('aria-label', $sortables.eq(i).attr('aria-label').replace(/\d+/, i + 1));
        }
      }

      score = calculateScore();


      if (lmsSave)
        cet.content.State.save(State, bSilentSave);

      if (!bSilentSave) {
        // save score

        if (lmsSave) {
          cet.content.lms.Activity.score(score);
          // isAnswered = not showsolution and order differs from initial
          cet.content.lms.Activity.isAnswered((lastAction != actSOLUTION) && (State.currentOrder.join(',') != State.initialOrder.join(',')));
        }
      }
      bSilentSave = false;

      if (cet.content.xapiSupported === true) {
        Xapi = {};
        if (lastAction != actNONE) {
          Xapi.verb = actionStrings[lastAction];
          Xapi.result = {};
          if (lastAction == actANSWER || lastAction == actCHECK) {

            currentOrder = ordersToArray();
            Xapi.result.extensions = {};
            Xapi.result.extensions['http://xapi.cet.ac.il/full_answer'] = fieldsResponce();
            Xapi.result.extensions['http://xapi.cet.ac.il/score'] = fieldsScore();
          }
          Xapi.result.scaled = Math.round((score / 100) * 100) / 100;
          Xapi.result.success = (score == 100);
          Xapi.result.completion = true; // (score == 100 && bJustChecked);

          if (lastAction == actGENERATE || lastAction == actLOAD) {
            Xapi.result.additionalInformation = State;
          }
          cet.content.xapi.send(Xapi);
        }
      }

    }
  }

  function calculateScore() {
    var correctAnswers = 0;
    for (var i = 0; i < $sortables.length; i++) {
      if (getData($sortables.eq(i).data("order")) == $sortables.eq(i).index()) {
        correctAnswers++;
      }
    }
    return Math.round((100 * correctAnswers / $sortables.length) * 100) / 100;
  }

  function fieldsResponce() {
    res = {};
    for (var i = 0; i < currentOrder.length; i++) {
      res['O' + (i + 1)] = currentOrder[i];
    }
    return res;
  }
  function fieldsScore() {
    res = {};
    for (var i = 0; i < currentOrder.length; i++) {
      res['O' + (i + 1)] = (currentOrder[i] * 1 == (i)) ? 1 : 0;
    }
    return res;
  }


  function ordersToArray() {
    var aOrders = new Array();
    for (var i = 0; i < $sortables.length; i++) {
      aOrders.push(getData($sortables.eq(i).data("order")) * 1);
    }
    return aOrders;
  }

  function externalCheck() {
    var result = check(false);
    bJustChecked = true;
    State.justChecked = true;
    lastAction = actCHECK;
    updateContent();
    blockSortables(result);
    if (result && bFeedback)
      showFinalFeedback();
    //else if (!result)
    //  showHint();
  }

  function showFinalFeedback() {
    $('.feedback-caption').html(cet.localization.feedbackAllCorrect);
    $('.feedback-caption').attr('aria-label', cet.localization.feedbackAllCorrect);
    $("#final-feedback").show();
  }

  function hideFinalFeedback() {
    $("#final-feedback").hide();
  }

  //function showHint() {
  //  if (nSequences == 0)
  //    return;
  //  else if (nSequences == 1) {
  //    // one correct
  //    $("#hint-wrapper").html("שים לב. יש לך רצף נכון, אבל יתכן שאינו ממוקם במקום הנכון.");
  //  }
  //  else {
  //    // two or more
  //    $("#hint-wrapper").html("שים לב. יש לך רצפים נכונים, אבל יתכן שאינם ממוקמים במקום הנכון.");
  //  }
  //  $("#hint-wrapper").show();
  //}

  self.registerEvents = function () {

    $('body').on('mouseleave', function (e) {
      if (bDragging) {
        $(document).trigger('mouseup');
      }
    });

    //$("#Check-button").on('click', function () {
    //  externalCheck();
    //  return false;
    //})

    //$("#Restart-button").on('click', function () {
    //  restart();
    //})

    //$("#Solution-button").on('click', function () {
    //  showSolution(false);
    //})

    $("#feedback-close").on('click', function () {
      hideFinalFeedback();
    })
    $("#feedback-close").on('keydown', function (event) {
      if (event.key === ' ' || event.key === 'Enter')
        hideFinalFeedback();
    })
  }
}
document.addEventListener('DOMContentLoaded', function () {
  document.addEventListener('keydown', function (event) {
    const container = document.getElementById("sortable");
    if (container.classList.contains('ui-sortable-disabled'))
      return;
    const focusedElement = document.activeElement;
    if (focusedElement.classList.contains('ot-default')) {
      const items = Array.from(container.children);
      const currentIndex = items.indexOf(focusedElement);

      if ((event.key === 'ArrowUp' || event.key === 'ArrowRight') && currentIndex > 0) {
        // Move the focused element up
        items[currentIndex].setAttribute('data-dynamic-variable', items[currentIndex].getAttribute('data-dynamic-variable') - 1);
        items[currentIndex].setAttribute('aria-label', items[currentIndex].getAttribute('aria-label').replace(/\d+/, items[currentIndex].getAttribute('data-dynamic-variable')));
        items[currentIndex - 1].setAttribute('data-dynamic-variable', parseInt(items[currentIndex - 1].getAttribute('data-dynamic-variable')) + 1);
        items[currentIndex - 1].setAttribute('aria-label', items[currentIndex - 1].getAttribute('aria-label').replace(/\d+/, items[currentIndex - 1].getAttribute('data-dynamic-variable')));
        container.insertBefore(focusedElement, items[currentIndex - 1]);
        focusedElement.focus();
        event.preventDefault();
        $("#sortable").sortable("option", "stop")(null, null);
      } else if ((event.key === 'ArrowDown' || event.key === 'ArrowLeft') && currentIndex < items.length - 1) {
        // Move the focused element down
        items[currentIndex].setAttribute('data-dynamic-variable', parseInt(items[currentIndex].getAttribute('data-dynamic-variable')) + 1);
        items[currentIndex].setAttribute('aria-label', items[currentIndex].getAttribute('aria-label').replace(/\d+/, items[currentIndex].getAttribute('data-dynamic-variable')));
        items[currentIndex + 1].setAttribute('data-dynamic-variable', parseInt(items[currentIndex + 1].getAttribute('data-dynamic-variable')) - 1);
        items[currentIndex + 1].setAttribute('aria-label', items[currentIndex + 1].getAttribute('aria-label').replace(/\d+/, items[currentIndex + 1].getAttribute('data-dynamic-variable')));
        container.insertBefore(items[currentIndex + 1], focusedElement);
        focusedElement.focus();
        event.preventDefault();
        $("#sortable").sortable("option", "stop")(null, null);
      }
    }
  });
  $(document).on('focusin.bubbleTrap', function (e) {
    const activeBubble = $('.feedback-back');
    const closeIcon = $('#feedback-close')
    if (activeBubble && !activeBubble[0].contains(e.target)) {
      e.stopPropagation();
      closeIcon.focus();
    }
  });
});