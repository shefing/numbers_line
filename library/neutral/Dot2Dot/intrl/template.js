/// <reference path="http://cdn.cet.ac.il/libs/cet.content/1/client.js" />
/// <reference path="http://cdn.cet.ac.il/libs/cet.content.lms/1/client.js" />
/// <reference path="raphael-min.js" />
/// <reference path="../he/localization.js" />
/// <reference path="../../../lib/js/external/jquery/2.0.3/jquery-2.0.3.js" />
/// <reference path="../../../lib/js/internal/plugins/cet.math.helpers.js" />
/// 
var dotToDotTemplate = function () {

  //#region Global vars
  var self = this;

  //#region Lms global vars

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
  var bLearningReview = false;
  //#endregion

  var oPreset = {};
  var State = {};

  State.aGroupLeft = [];
  State.aGroupRight = [];
  State.aCouples = [];

  var arSoundObjects = [];

  var sDir = 'rtl';
  var sTextAlign = 'center';
  var sFontFamily = 'Arial';
  var sFontSize = '18px';

  var arFontFamily = ['Arial', 'Arial', 'Comic Sans MS', 'Courier New', 'Helvetica', 'Tahoma', 'Times New Roman', 'Traditional Arabic', 'Lateef', 'David', 'Alef', 'Arimo', 'Abraham'];

  var sFontWeight = 'normal';

  var theSound;
  // default background settings
  var background = {
    image: '',
    color: 'dde3e3',
    opacity: '100'
  };


  var oPairs;

  var bBlock;
  var touching = false;
  var totalNumberOfPairs;
  var maxNumberOfPairs = 5;
  var pairSize = 'large';
  var myWidth = 0;
  var bInit = false;


  var screenHeightMatrix = {
    pairs_2: { small: { appHeight: 80, boxHeight: 70 }, medium: { appHeight: 130, boxHeight: 80 }, large: { appHeight: 180, boxHeight: 90 } },
    pairs_3: { small: { appHeight: 120, boxHeight: 70 }, medium: { appHeight: 195, boxHeight: 80 }, large: { appHeight: 270, boxHeight: 90 } },
    pairs_4: { small: { appHeight: 160, boxHeight: 70 }, medium: { appHeight: 260, boxHeight: 80 }, large: { appHeight: 360, boxHeight: 90 } },
    pairs_5: { small: { appHeight: 200, boxHeight: 70 }, medium: { appHeight: 315, boxHeight: 80 }, large: { appHeight: 450, boxHeight: 90 } },
    pairs_6: { small: { appHeight: 240, boxHeight: 70 }, medium: { appHeight: 380, boxHeight: 80 }, large: { appHeight: 500, boxHeight: 90 } },
    pairs_7: { small: { appHeight: 280, boxHeight: 70 }, medium: { appHeight: 445, boxHeight: 80 }, large: { appHeight: 500, boxHeight: 90 } },
    pairs_8: { small: { appHeight: 320, boxHeight: 70 }, medium: { appHeight: 500, boxHeight: 80 }, large: { appHeight: 500, boxHeight: 90 } },
    pairs_9: { small: { appHeight: 360, boxHeight: 70 }, medium: { appHeight: 500, boxHeight: 80 }, large: { appHeight: 500, boxHeight: 90 } },
    pairs_10: { small: { appHeight: 400, boxHeight: 70 }, medium: { appHeight: 500, boxHeight: 80 }, large: { appHeight: 500, boxHeight: 90 } },
  };


  //#region svg stuff
  var $content = $('.template-wrapper');
  var $body = $('body');
  var $html = $('html');

  var $svg = $('#svg');
  var r = Raphael("svg", $content.innerWidth(), $content.innerHeight());
  var spring = 0.4;
  var friction = 0.9;

  var halfDotWidth;
  var halfDotHeight;

  var progress = 1;

  var dots = [];
  var lines = [];
  //#endregion

  //#endregion 

  var xapiSupported;
  var Xapi = {};

  var actionStrings = ["", "answered", "asked_check", "asked_show_answer", "cleared"];
  var actNONE = 0;
  var actANSWER = 1;
  var actCHECK = 2;
  var actSOLUTION = 3;
  var actCLEAN = 4
  var lastAction = actNONE;

  self.init = function () {

    $('html').attr('lang', cet.localization.language);
    $('html').attr('data-dir', cet.localization.direction);



    // resize template with no call to server
    //bInit = true;
    //fit($('.template-wrapper'));
    //bInit = false;

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


    // This is here because STUPID IE9 does not understand CSS property "user-select: none;".
    // So help us GOD not to fall on this bug again. 
    setTimeout(function () {
      if (document.documentMode == '9') {
        $('#boxes *').attr('unselectable', 'on');
      }
    }, 1500)
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

  function initTemplate(sPreset, dataState) {

    if (sPreset.substr(0, 3) == '%7B') {
      sPreset = decodeURIComponent(sPreset);
    }

    oPreset = JSON && JSON.parse(sPreset) || $.parseJSON(sPreset);


    totalNumberOfPairs = oPreset.pairs ? oPreset.pairs.length : 0;

    if (oPreset.showNumberOfPairs) {
      maxNumberOfPairs = oPreset.showNumberOfPairs;
    }

    if (oPreset.pairSize) {
      pairSize = oPreset.pairSize;
    }

    bInit = true;

    if (dataState) {
      State = dataState;
    }
    else {
      createRandomPairs(totalNumberOfPairs);
    }

    bJustChecked = State.justChecked;

    // direction
    sDir = oPreset.direction;

    $('.template-wrapper').addClass('dir-' + cet.localization.direction);

    $('.template-wrapper').addClass(pairSize + '-box-size');

    // text align
    if (oPreset.alignment) {
      sTextAlign = oPreset.alignment;
    }

    if (oPreset.fontFamily) {
      sFontFamily = arFontFamily[oPreset.fontFamily];
    }

    if (oPreset.fontSize) {
      sFontSize = oPreset.fontSize + 'px';
    }

    if (oPreset.fontWeight) {
      sFontWeight = oPreset.fontWeight;
    }

    if (oPreset.background) {
      background = oPreset.background;
      var imageDescription = oPreset.backgroundDescription;

      var $imageElement = $('.template-background');

      if ($imageElement.length) {
        $imageElement.attr('alt', imageDescription);
      } else {
        $('.template-background').attr('alt', imageDescription);

      }

    }


    lms.Activity.settings.supportsCheck(true);
    lms.Activity.bind('check', function () { externalCheck(); });
    lms.Activity.settings.supportsReset(true);
    lms.Activity.bind('reset', function () { restart(); });
    lms.Activity.settings.supportsShowSolution(true);
    lms.Activity.bind('showsolution', function () { showSolution(); });
    lms.Activity.settings.supportsHostFullscreen(true);

    oPairs = oPreset.pairs

    createTemplate();

    Xapi.fullQuestion = {};
    Xapi.fullQuestion.initialState = {};

    bInit = false;

    block(true);

    if (workMode == "Learning" || workMode == "Evaluation" || cet.content.xapiSupported) {
      // save current state
      updateContent();
    }

    if (workMode == "Results" || workMode == "Repair" || (workMode == "Learning" && bJustChecked)) {
      showFeedbacks();
      bJustChecked = false;
      State.justChecked = false;
    }
    else if (workMode == "Learning" && bLearningReview) {
      showFeedbacks();
      bLearningReview = false;
    }

    if (workMode != "Results") {

      unblock();
    }

    if (workMode == "Solution") {
      showSolution();
    }


    //TODO: DIMA - fit should run first time after we have the data
    fit($('.template-wrapper'));

  }

  function setTemplateBackground() {

    var $templateBackground = $('.template-background');

    $templateBackground.css({
      'background-color': '#' + background.color,
      'opacity': background.opacity / 100,
    });


    if (background.image != '') {
      var imageDescription = oPreset.backgroundDescription;
      $('.template-background').attr('alt', imageDescription);

      $templateBackground.css({
        'background-size': 'cover',
        'background-repeat': 'no-repeat',
        'background-image': 'url(' + '"' + background.image + '"' + ')',
      });
    }

  }


  function createTemplate() {
    // set background setTemplateBackground();


    var html = '';
    var dt = 100 / maxNumberOfPairs;

    for (var i = 0; i < maxNumberOfPairs; i++) {
      var leftMemberType = oPairs && oPairs[State.aGroupLeft[i]].leftMember.type;
      var rightMemberType = oPairs && oPairs[State.aGroupRight[i]].rightMember.type;
      var leftMemberData = oPairs[State.aGroupLeft[i]].leftMember.data;
      var rightMemberData = oPairs[State.aGroupRight[i]].rightMember.data;
      var leftMemberDataUnEntity = unEntity(leftMemberData);
      var rightMemberDataUnEntity = unEntity(rightMemberData);

      $('#boxes').append('<div data-order="' + (i * 2) + '" role="button" tabindex="0"  data-name="' + leftMemberDataUnEntity + '" class="box left-box" style="top:' + (dt * i) + '%;height:' + dt + '%;"></div>');
      $('#boxes').append('<div data-order="' + (i * 2 + 1) + '" role="button" tabindex="0" data-name="' + rightMemberDataUnEntity + '" class="box right-box" style="top:' + (dt * i) + '%;height:' + dt + '%;"></div>');


      $('.left-box').eq(i).addClass(leftMemberType);
      switch (leftMemberType) {
        case 'text':
          var $leftBox = $('.left-box').eq(i);
          $leftBox.html('<div class="text-box dir-' + sDir + ' alignment-' + sTextAlign + '">\n\
            <div class="content-wrapper">\n\
            <div class="vertical-pos-parent">\n\
            <div class="vertical-pos-child" style="font-family:' + sFontFamily + '; font-size:' + sFontSize + '; font-weight: ' + sFontWeight + ';">\n\
            ' + leftMemberDataUnEntity + '\n\
            </div>\n\
            </div>\n\
            </div>\n\
            </div>');

          $leftBox.attr('aria-label', leftMemberDataUnEntity);
          break;
        case 'image':
          $('.left-box').eq(i).html('<div class="image-box">\n\
            <div class="content-wrapper">\n\
            ' + leftMemberData + '\n\
            </div>\n\
          </div>');
          $('#boxes [data-order="' + (i * 2) + '"]').attr('data-name', 'תמונה'); //todo
          break
        case 'sound':
          $('.left-box').eq(i).html('<div class="sound-box" >\n\
            <div class="content-wrapper">\n\
            '+ leftMemberData + '\n\
            </div>\n\
          </div>');
          $('#boxes [data-order="' + (i * 2) + '"]').attr('data-name', 'שמע').attr('aria-label', 'שמע'); //todo
          var sound = leftMemberData;
          var str = (sound.substring(0, sound.length - 8)).split('data-file="');
          var sSound = str[1];
          createSound((i + 1), "left", sSound);
          break;
      }

      $('.right-box').eq(i).addClass(rightMemberType);
      switch (rightMemberType) {
        case 'text':
          var $rightBox = $('.right-box').eq(i);
          $rightBox.html('<div class="text-box dir-' + sDir + ' alignment-' + sTextAlign + '">\n\
              <div class="content-wrapper">\n\
              <div class="vertical-pos-parent">\n\
              <div class="vertical-pos-child" style="font-family:' + sFontFamily + '; font-size:' + sFontSize + '; font-weight: ' + sFontWeight + ';">\n\
              ' + rightMemberDataUnEntity + '\n\
              </div>\n\
              </div>\n\
              </div>\n\
              </div>');

          $rightBox.attr('aria-label', rightMemberDataUnEntity);
          break;
        case 'image':
          $('.right-box').eq(i).html('<div class="image-box">\n\
            <div class="content-wrapper">\n\ ' + rightMemberData + '\n\
            </div>\n\
          </div>');
          $('#boxes [data-order="' + (i * 2 + 1) + '"]').attr('data-name','תמונה'); //todo
          break;
        case 'sound':
          $('.right-box').eq(i).html('<div class="sound-box">\n\
            <div class="content-wrapper">\n\
            ' + rightMemberData + '\n\
            </div>\n\
          </div>');
          $('#boxes [data-order="' + (i * 2 + 1) + '"]').attr('data-name', 'שמע').attr('aria-label', 'שמע'); //todo
          var sound = rightMemberData;
          var str = (sound.substring(0, sound.length - 8)).split('data-file="');
          var sSound = str[1];
          createSound((i + 1), "right", sSound);
          break;
      }
    }
    $('.box').append('<div class="feedback-box"></div>');
    createDots();
    manageTabOrder();
  }


  function handleTabKey(e, boxes, currentIndex, otherBoxes) {
    if (!e.shiftKey) {
      currentIndex = boxes.index(e.target);
      if (currentIndex < boxes.length - 1) {
        boxes.eq(currentIndex + 1).focus();
        e.preventDefault();
      } else {
        boxes.last().attr('tabindex', 0);
        otherBoxes.attr('tabindex', -1);
      }
    } else {
      currentIndex = boxes.index(e.target);
      if (currentIndex > 0) {
        boxes.eq(currentIndex - 1).focus();
        e.preventDefault();
      } else {
        boxes.first().focus();
        e.preventDefault();
      }
    }
    return currentIndex;
  }

  function handleEnterOrSpaceKey(e, boxes, otherBoxes, currentClass) {
    var currentIndex = boxes.index(e.target);
    boxes.attr('tabindex', -1);
    otherBoxes.attr('tabindex', 0);
    otherBoxes.first().focus();
    return currentIndex;
  }

  function manageTabOrder() {
    var leftBoxes = $('.left-box');
    var rightBoxes = $('.right-box');
    var currentLeftIndex = 0;
    var currentRightIndex = 0;

    leftBoxes.on('keydown', function (e) {
      if (e.key === 'Tab') {
        currentLeftIndex = handleTabKey(e, leftBoxes, currentLeftIndex, rightBoxes);
      } else if ((e.key === 'Enter' || e.key === ' ') && $(this).hasClass('left-box')) {
        currentLeftIndex = handleEnterOrSpaceKey(e, leftBoxes, rightBoxes, 'left-box');
      }
    });

    rightBoxes.on('keydown', function (e) {
      if (e.key === 'Tab') {
        currentRightIndex = handleTabKey(e, rightBoxes, currentRightIndex, leftBoxes);
      } else if ((e.key === 'Enter' || e.key === ' ') && $(this).hasClass('right-box')) {
        currentRightIndex = handleEnterOrSpaceKey(e, rightBoxes, leftBoxes, 'right-box');
        //connectMembers(currentLeftIndex, currentRightIndex);
        //setConnected();
        leftBoxes.first().focus();
      }
    });

    leftBoxes.first().attr('tabindex', 0).focus();
  }

  function unEntity(str) {
    //return $("<textarea></textarea>").html(str).text();
  
    //return str.replace(/'<'/g, '&lt;').replace(/'>'/g, '&gt;');
    return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    //return str.replace('<', '&lt;');
  }
  
/**************************sounds***********************************/

function stopSounds() {
  $(".speaker").removeClass("play").addClass("stop");
  soundManager.stopAll();
}

function createSound(pairNumber, memberSide, sSound) {
  if (arSoundObjects[pairNumber] == undefined) arSoundObjects[pairNumber] = {};
  //arSoundObjects[pairNumber][memberSide] = soundManager.createSound({
  //  url: sSound
  //});
  arSoundObjects[pairNumber][memberSide] = sSound;
}


  /**************************dots***********************************/

  function createDots() { //Places dots for each drawing and passes to createLines for mouse events.
    for (var i = 0; i < maxNumberOfPairs * 2; i++) { //create dots on stage
      var dot = $("<div/>", { class: 'dot' });
      dots.push(dot[0]); //store each dot in dots array 
    }
    var populatingCount = 0;
    var populatingTimer = window.setInterval(function () { //display dots in sequence
      if (populatingCount > dots.length - 1) {
        clearInterval(populatingTimer);
        halfDotWidth = $('.dot').width() / 2;
        halfDotHeight = $('.dot').height() / 2;
        // all dots are created in this point
        // moved here because we need to draw existing lines according to LMS state
        // and we need the dots positions to
        createLines();
        return;
      }
      $($('.box[data-order="' + populatingCount + '"] .feedback-box')).append(dots[populatingCount]);
      populatingCount++;
      //TODO actavate SFX
      //sfx.pop();
    }, 1000 / 15);
  };
  /*************************lines***********************************/

  function loadLinesFromLms() {
    for (var i = 0; i < maxNumberOfPairs; i++) {
      if (State.aCouples[i] >= 0) {
        createStraightLine((i * 2), (State.aCouples[i] * 2 + 1));
      }
    }
  }
  

  function createStraightLine(startDot, endDot) {

    var ax = 0;
    var ay = 0;
    var cx = 0;
    var cy = 0;
    var color = "#ff0000";
    var correct = false;
  
    ax = $($('.box[data-order="' + startDot + '"] .dot')).offset().left + halfDotWidth - $('.template-wrapper').offset().left;
    ay = $($('.box[data-order="' + startDot + '"] .dot')).offset().top + halfDotHeight - $('.template-wrapper').offset().top;
  
    cx = $($('.box[data-order="' + endDot + '"] .dot')).offset().left + halfDotWidth - $('.template-wrapper').offset().left;
    cy = $($('.box[data-order="' + endDot + '"] .dot')).offset().top + halfDotHeight - $('.template-wrapper').offset().top;
  
    var line = {
  
      curve: r.path('M ' + ax + ' ' + ay + ' L ' + cx + ' ' + cy + '').attr({ stroke: color, "stroke-width": 10, "stroke-linecap": "round" }),
      controls: r.set(),
      elastic: {
      },
      startDot: startDot,
      endDot: endDot,
      correct: correct,
      loop: null
    };

    // update dots to full
    $($('.box[data-order="' + startDot + '"] .dot')).addClass('full');
    $($('.box[data-order="' + endDot + '"] .dot')).addClass('full');

    setConnectedAriaLabels(startDot, endDot);
    lines.push(line);
  }
  function setInitialAriaLabel(elemIndex) {
    var elem = $($('.box[data-order="' + elemIndex + '"]'));
    elem.removeAttr('data-connected').attr("aria-label", elem.attr("data-name"));
  }
  function setConnectedAriaLabels(dotStartIndex, dotEndIndex) {
    var startElem = $($('.box[data-order="' + dotStartIndex + '"]'));
    var endElem = $($('.box[data-order="' + dotEndIndex + '"]'));
    startElem.attr('aria-label', cet.localization.connected + " " + startElem.attr('data-name') + " " + endElem.attr('data-name')).attr('data-connected', endElem.attr("data-order")).removeAttr('selected');
    endElem.attr('aria-label', cet.localization.connected + " " + endElem.attr('data-name') + " " + startElem.attr('data-name')).attr('data-connected', startElem.attr("data-order")).removeAttr('selected');
  }

  function removeLine(existingLine) {

    if (existingLine >= 0) { //remove existing line

      var currentLine = lines[existingLine];
      disconnectMembers(currentLine.startDot, currentLine.endDot);

    // update dots to NOT full
      $($('.box[data-order="' + currentLine.startDot + '"] .dot')).removeClass('full');
      $($('.box[data-order="' + currentLine.endDot + '"] .dot')).removeClass('full');

      setInitialAriaLabel(currentLine.startDot);
      setInitialAriaLabel(currentLine.endDot);

      if (currentLine.loop) {
        window.clearInterval(currentLine.loop);
      }
      currentLine.curve.remove();
      currentLine.controls.remove();
      lines.splice(existingLine, 1);
    }
  }

  var createLines = function () { //handles mouse events for line creation. Passes to finishedShape() when drawing is completed.

    // this can run safely because all dots are already created on screen
    loadLinesFromLms();

    var newLine = function (ax, ay, bx, by, cx, cy, color) {
      var line = {
        path: [["M", ax, ay], ["Q", bx, by, cx, cy]],
        curve: r.path(this.path).attr({ stroke: color, "stroke-width": 10, "stroke-linecap": "round" }),
        controls: r.set(
          r.circle(ax, ay, 5).attr({ fill: "#fff", stroke: "none" }),
          r.circle(bx, by, 5).attr({ fill: "none", stroke: "none" }),
          r.circle(cx, cy, 5).attr({ fill: "none", stroke: "none" })
        ),
        elastic: {
          currentX: ax,
          currentY: ay,
          targetX: ax,
          targetY: ay,
          vX: 0,
          vY: 0
        },
        startDot: null,
        endDot: null,
        correct: false,
        loop: null
      };
      return line;
    };

    var endLine = function (state, dotStartIndex, dotEndIndex, event) {
      var lineIndex = lines.length - 1; //allowing for setTimeout to finish
      $(dots).off('mouseover');
      $body.off(); //removes mousemove and mouseup for line
      $(document).off(); //removes mouseout of page for line
  

      if (state === true) {//checking if line ends on suitable dot
        var line = lines[lineIndex],
          x = $(dots[dotEndIndex]).offset().left + halfDotWidth - $('.template-wrapper').offset().left,
          y = $(dots[dotEndIndex]).offset().top + halfDotHeight - $('.template-wrapper').offset().top;
        line.controls[2].attr({ cx: x, cy: y }); //snapping end of line to center of end dot
        line.path[1][3] = x;
        line.path[1][4] = y;
        line.elastic.targetX = line.controls[0].attr("cx") + (x - line.controls[0].attr("cx")) * 1 / 2;
        line.elastic.targetY = line.controls[0].attr("cy") + (y - line.controls[0].attr("cy")) * 1 / 2;
        var loop = lines[lineIndex].loop; //declare to allow for loop to finish
        window.setTimeout(function () {
          window.clearInterval(loop);
        }, 4000); //four seconds for animation to subside
  
        // update line endDot index
        line.endDot = dotEndIndex;


        //check if end dot of current line is already full and disconnect the line and the member it connected to
        // (lines.length - 1) because we are checking all lines except the last one, the one we connected right now
        removeLinesByDotValues([dotEndIndex], true);
        // check line direction (left to right or right to left)
        // connect the members
        // update line.correct
        if (dotStartIndex % 2 == 0) {
          line.correct = connectMembers((dotStartIndex / 2), (dotEndIndex - 1) / 2);
        }
        else {
          line.correct = connectMembers((dotEndIndex / 2), (dotStartIndex - 1) / 2);
        }
        $(dots[dotEndIndex]).addClass('full');
        setConnectedAriaLabels(dotStartIndex, dotEndIndex);
      } else { //line doesn't end on suitable dot
        $(dots[dotStartIndex]).removeClass('full');
        window.clearInterval(lines[lineIndex].loop);
        lines[lines.length - 1].curve.remove();
        lines[lines.length - 1].controls.remove();
        lines.splice(lines.length - 1, 1);
      }
    };
    var lineHandler = function (e) { //touch functionality

      if (bBlock) return;
  
      //remove existing line if there is any
      removeLinesByDotValues([dots.indexOf(e)]);
  
      // add full dot to start dot
      $(e).addClass('full');
  
  
      lines.push(
        newLine(
          $(e).offset().left + halfDotWidth - $('.template-wrapper').offset().left,
          $(e).offset().top + halfDotHeight - $('.template-wrapper').offset().top,
          $(e).offset().left + halfDotWidth - $('.template-wrapper').offset().left,
          $(e).offset().top + halfDotHeight - $('.template-wrapper').offset().top,
          $(e).offset().left + halfDotWidth - $('.template-wrapper').offset().left,
          $(e).offset().top + halfDotHeight - $('.template-wrapper').offset().top,
  
          "#e1f6f1")
      );//initial co-ords and color for 3-point curve
  
      var line = lines[lines.length - 1];
      line.startDot = dots.indexOf(e);
  

      $body.on('mousemove touchmove', function (event) {
        event.preventDefault();//prevent page scrolling

        if (event.type == 'mousemove') {
          var x = event.pageX - $('.template-wrapper').offset().left,
            y = event.pageY - $('.template-wrapper').offset().top;

        } else {
          var x = event.originalEvent.changedTouches[0].pageX - $('.template-wrapper').offset().left,
            y = event.originalEvent.changedTouches[0].pageY - $('.template-wrapper').offset().top;
        }


        line.controls[2].attr({ cx: x, cy: y });
        line.path[1][3] = x;
        line.path[1][4] = y;
        line.elastic.targetX = line.controls[0].attr("cx") + (x - line.controls[0].attr("cx")) * 1 / 2;
        line.elastic.targetY = line.controls[0].attr("cy") + (y - line.controls[0].attr("cy")) * 1 / 2;
        if (!line.loop) {
          line.loop = window.setInterval(function () {
            var el = line.elastic;
            el.vX += (el.targetX - el.currentX) * spring; //spring: elastic coefficient
            el.currentX += (el.vX *= friction); //friction: friction force
            el.vY += (el.targetY - el.currentY) * spring; //spring: elastic coefficient
            el.currentY += (el.vY *= friction); //friction: friction force
            line.controls[1].attr({ cx: el.currentX, cy: el.currentY });
            line.path[1][1] = el.currentX;
            line.path[1][2] = el.currentY;
            line.curve.attr({ path: line.path });
          }, 1000 / 30);
        }
        $(dots).each(function (i, f) {
          if (dots.indexOf(e) !== dots.indexOf(f)) { //ensuring different start and finish dot, ignore self
            if ((dots.indexOf(e) % 2) != (dots.indexOf(f) % 2)) { //ensuring different start and finish dot groups, ignore self group
              var hotpointX = $(f).offset().left - $('.template-wrapper').offset().left, hotpointY = $(f).offset().top - $('.template-wrapper').offset().top;
              if (x > hotpointX && y > hotpointY && x < (hotpointX + 30) && y < (hotpointY + 30)) {
                touching = false;
                endLine(true, dots.indexOf(e), dots.indexOf(f));
              }
            }
          }
        });
    });

      $body.on('mouseup touchend', function (event) {
        event.preventDefault();//prevent page scrolling
        touching = false;
        endLine(false, dots.indexOf(e));//unsuccessful
      });


      $(document).on('mouseout', function (event) {
        event = event ? event : window.event;
        var from = event.relatedTarget || event.toElement;
        if (!from || from.nodeName == "HTML") {
          touching = false; // only in case we are using super smart touchscreen projector 
          // that uses a regular mouse but thinks he is a touch device
          endLine(false, dots.indexOf(e));
        }
      });

    };

    if (bBlock) {
      return
    }
    else {

      $(dots).each(function (i, e) {

        $(e).on('mousedown touchstart', function (event) {
          event.preventDefault();//prevent page scrolling

          if (touching == false) {
            touching = true;
            lineHandler(e);
          }
        });
      });

    }
  };

  /***************************pairs***********************************/

  function connectMembers(leftMemberNumber, rightMemberNumber) {
    State.aCouples[leftMemberNumber] = rightMemberNumber;
    lastAction = actANSWER;
    changesMade();
  

    //returns true if connection is correct
    if (State.aGroupLeft[leftMemberNumber] == State.aGroupRight[rightMemberNumber]) {
      return true;
    }
    else {
      return false;
    }
  }

  function disconnectMembers(startDot, endDot) {
    if (startDot % 2 == 0) {
      //conection from Left to Right
      State.aCouples[startDot / 2] = "-1";
    }
    else {
      //conection from Right to left
      State.aCouples[endDot / 2] = "-1";
    }
    lastAction = actANSWER;
    changesMade();
  }

  function createRandomPairs(numberOfPairs) {

    var aGroupLeft = [];
    var aGroupRight = [];
    var aCouples = [];
    var aTemp = [];

    // initSet is from - cet.math.helpers
    aTemp = initSet(0, numberOfPairs - 1);
    aTemp.completeDisorder();

    aGroupLeft = aTemp.slice(0, maxNumberOfPairs);
    aGroupRight = aTemp.slice(0, maxNumberOfPairs);
  

    // this is needed because when we do "completeDisorder" on 2 elements for the same amount of time for both groups
    // the order stays the same as in the beggining
    if (maxNumberOfPairs != 2) {
      aGroupLeft.completeDisorder();
    }

    aGroupRight.completeDisorder();

    // init couples array with "-1"
    for (var i = 0; i < maxNumberOfPairs; i++) {
      aCouples[i] = -1;
    }
  
    State.aGroupLeft = aGroupLeft;
    State.aGroupRight = aGroupRight;
    State.aCouples = aCouples;
  
  }

/*****************************results*********************************/
var bSilentSave = true; // by default first save always silent
function showSolution() {
  //hideFeedbacks();
  block();

  for (var i = 0; i < maxNumberOfPairs; i++) {
    State.aCouples[i] = State.aGroupRight.indexOf(State.aGroupLeft[i]);
  }

  showFeedbacks();
  fit($('.template-wrapper'));
  lastAction = actSOLUTION;
  bSilentSave = true;
  changesMade();
}

function calculateScore() {

  var correctAnswers = 0;
  var falseAnswers = 0;

  for (var i = 0; i < maxNumberOfPairs; i++) {
    if (State.aCouples[i] == '-1') {
      falseAnswers++;
    }
    else {
      if (State.aGroupLeft[i] == State.aGroupRight[State.aCouples[i]]) {
        correctAnswers++
      }
      else {
        falseAnswers++;
      }
    }
  }

  return (correctAnswers * 100 / maxNumberOfPairs);
}

function externalCheck() {

  showFeedbacks();

  if (calculateScore() == 100) {
    showFinalFeedback(cet.localization.feedbackAllCorrectCaption, cet.localization.feedbackAllCorrectText);
  }

  bJustChecked = true;
  State.justChecked = true;
  lastAction = actCHECK;
  updateContent();
}

/***************************feedbacks*********************************/

function showFeedbacks() {

  $('.box').addClass('wrong');

  for (var i = 0; i < maxNumberOfPairs; i++) {
    if (State.aCouples[i] != '-1') {
      if (State.aGroupLeft[i] == State.aGroupRight[State.aCouples[i]]) {
        $('.left-box').eq(i).removeClass('wrong').addClass('correct');
        $('.right-box').eq(State.aCouples[i]).removeClass('wrong').addClass('correct');
      }
    }
  }
}

function showFinalFeedback(caption, message) {

  $('.final-feedback-wrapper').show();

  $('.final-feedback .caption').html(caption);
  $('.final-feedback .message').html(message);
}

function hideFinalFeedback() {
  $('.final-feedback-wrapper').hide();
}

function hideFeedbacks() {
  $('.box').removeClass('wrong').removeClass('correct');
}

/*********************************************************************/

function block() {
  bBlock = true;
}

function unblock() {
  bBlock = false;
}

function restart() {
  bInit = true;

  hideFeedbacks();

  hideFinalFeedback();

  State.justChecked = false;
  lmsVisited = false;

  // removes all lines and
  // reset all couples connections
  var totalNumberOfLinesOnScreen = lines.length;
  for (var i = 0; i < totalNumberOfLinesOnScreen; i++) {
    removeLine(0);
  }

  bInit = false;
  touching = false;
  lastAction = actCLEAN;
  changesMade();
  unblock();
}

function changesMade() {
  if (bInit)
    return;

  hideFeedbacks();

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

    if (lmsSave) {
      cet.content.State.save(State, bSilentSave);

    }
    if (!bSilentSave) {
      // save score
      var score = calculateScore()
      if (lmsSave) {
        cet.content.lms.Activity.score(score);
        cet.content.lms.Activity.isAnswered(isAnswered());
      }
    }
    bSilentSave = false;



    if (cet.content.xapiSupported === true) {

      if (lastAction != actNONE) {
        Xapi.verb = actionStrings[lastAction];
        //Xapi.fullAnswer = {};
        //Xapi.fullAnswer.currentState = couplesToXapi();
        Xapi.fullAnswer = couplesToXapi();

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

function couplesToXapi() {
  var str = "";
  for (var i = 0; i < maxNumberOfPairs; i++) {
    str += "L" + State.aGroupLeft[i] + ":";
    str += (State.aCouples[i] != '-1') ? ("R" + State.aGroupRight[State.aCouples[i]] + " ") : ("null" + " ");
  }
  return str;
}

function answersToXapi() {
  
  var answers = {};
  for (var i = 0; i < maxNumberOfPairs; i++) {
    answers["L" + State.aGroupLeft[i]] = (State.aCouples[i] != '-1') ? "R" + State.aGroupRight[State.aCouples[i]] : "";
  }
  return answers;
  }


  function scoresToXapi() {
    var scores = {};
    for (var i = 0; i < maxNumberOfPairs; i++) {
      var itemScore;
      if (State.aCouples[i] == '-1') {
        itemScore = 0;
      }
      else {
        if (State.aGroupLeft[i] == State.aGroupRight[State.aCouples[i]]) {
          itemScore = 1;
        }
        else {
          itemScore = 0;
        }
      }
      scores['L' + State.aGroupLeft[i]] = itemScore;
    }
    return scores;
  }

function fit($element) {

  //var windowMaxPossibleHeight;

  //if (bInit) {
  //  // local resize on init without call to server
  //  windowMaxPossibleHeight = $(window).height();
  //  doResize($element);
  //}
  //else {
  //  // call to server with calback
  //  cet.display.getHostClientSize(function (size) {
  //    windowMaxPossibleHeight = size.height;
  //    doResize($element);
  //  });
  //}

  //function doResize($element) {
  //  $element.hide();
  //  var aspect = $element.width() / $element.height();
  //  var windowWidth = $(window).width();
  //  var windowHeight = Math.max($(window).height(), windowMaxPossibleHeight);
  //  $element.show();

  //  var divAspect = windowWidth / windowHeight;

  //  var resizedHeight, resizedWidth, left, top;

  //  if (divAspect > aspect) {
  //    resizedHeight = windowHeight;
  //    resizedWidth = resizedHeight * aspect;

  //    left = Math.round((windowWidth - resizedWidth) / 2);
  //    top = 0;

  //  } else {
  //    // screen width is smaller than height (mobile, etc) 
  //    resizedWidth = windowWidth;
  //    resizedHeight = resizedWidth / aspect;

  //    //top = Math.round((windowHeight - resizedHeight) / 2);
  //    top = 0;
  //    left = 0;
  //  }

  //  if (myWidth != resizedWidth) {

  //    myWidth = resizedWidth;

  //    $element.css({
  //      'width': resizedWidth,
  //      'height': resizedHeight,
  //      'top': top,
  //      'left': left,
  //    });

  //    $content = $element;

  //    resizeSvg();

  //    normalizeTexts();

  //    cet.content.UI.setHeight($element.outerHeight());
  //  }
  //}


  //TODO: DIMA - this will happen only once here 
  cet.content.UI.setHeight(screenHeightMatrix['pairs_' + maxNumberOfPairs][pairSize].appHeight);


  if ($element.height() != screenHeightMatrix['pairs_' + maxNumberOfPairs][pairSize].appHeight || $element.is(":hidden")) {

    $element.css({
      'width': '100%',
      'height': screenHeightMatrix['pairs_' + maxNumberOfPairs][pairSize].appHeight,
      'top': 0,
      'left': 0,
    });

    $('.text-box, .image-box, .sound-box').height(screenHeightMatrix['pairs_' + maxNumberOfPairs][pairSize].boxHeight + '%');


    //normalizeTexts();


    //TODO: DIMA - this is a hack for presentation purposses only :)
    //setTimeout(function () {
    //  $('.vertical-pos-child').css({
    //    'font-size': '19px'
    //  })
    //}, 150);

    $element.show();

  }

  resizeSvg();


}

function resizeSvg() {
  //set new size to raphael object
  r.setSize($content.width(), $content.height());

  // delete all path and circles from SVG
  $('#svg svg path').remove();
  $('#svg svg circle').remove();

  // check if all dots are loaded to calculate new svg size
  // this is nedded only on first init because all dots appear in animation that takes time
  var timeout;
  clearTimeout(timeout);
  timeout = setTimeout(function () {
    if ($('.dot').length == maxNumberOfPairs * 2) {
      clearTimeout(timeout);
      // redraw all lines according to latest State
      loadLinesFromLms();

      // resize text inside the text boxes
      //$('.text-box').textfill({
      //  maxFontPixels: 40,
      //  innerTag: '.vertical-pos-child',
      //  explicitWidth: $('.content-wrapper').width(),
      //  explicitHeight: $('.content-wrapper').height(),
      //});
    }
  }, 50);
}

function removeLinesByDotValues(dotValues, skipLastLine) {
  var loopStart = skipLastLine ? lines.length - 2 : lines.length - 1;

  for (var i = loopStart; i >= 0; i--) {
    if (dotValues.includes(lines[i].startDot) || dotValues.includes(lines[i].endDot)) {
      removeLine(i);
    }
  }
}
/*********************************************************************/
function setConnected() {
   var selected = $('[data-order][selected]');

   selected.sort(function(a, b) {
     return $(a).offset().left - $(b).offset().left;
   });

  var selectedDataName0 = parseInt(selected.eq(0).attr('data-order'), 10);
  var selectedDataName1 = parseInt(selected.eq(1).attr('data-order'), 10);


  removeLinesByDotValues([selectedDataName0, selectedDataName1]);

  if (selected.length == 2) {
    connectMembers(parseInt(selectedDataName0 / 2), parseInt(selectedDataName1 / 2));
    createStraightLine(selectedDataName0, selectedDataName1);
  }

  setTabIndexForDataOrder();  
}
function setTabIndex(element, tabindexValue = "0") {
  $(element).attr("tabindex", tabindexValue);
}

function setTabIndexForDataOrder() {
  $('[data-order]').each(function (index, element) {
    setTabIndex(element);
  });
}


/*********************************************************************/

self.registerEvents = function () {

  $(window).resize(function () {
    // wait 500 ms after the last window resize event
    if (this.resizeTO) clearTimeout(this.resizeTO);
    this.resizeTO = setTimeout(function () {
      $(this).trigger('resizeEnd');
    }, 500);
  });

  $(window).bind('resizeEnd', function () {
    //do something, window hasn't changed size in 500ms
    fit($('.template-wrapper'));
  });

  $('.final-feedback .close').on('click', function () {
    hideFinalFeedback();
  });
  $(".template-wrapper").on('keydown', '[data-order]', function (e) {
    if (e && (e.key !== 'Enter' && e.key !== ' ')) {
      return;
    }

    var current = $(this);
    var isSelected = current.is("[selected]");
    var selectedCount = $('[data-order][selected]').length;


    if (isSelected) {
      current.removeAttr("selected");
      setTabIndexForDataOrder();
    }
    else if (selectedCount === 0) {
      current.attr("selected", "selected");
      var currentDataOrder = parseInt(current.attr("data-order"), 10);
      var order = currentDataOrder % 2;
      $('[data-order]').each(function (index) {
        if (index != currentDataOrder && index % 2 == order) {
          setTabIndex($(this), -1);
        }
      })
    }
    else if (selectedCount == 1) {
      current.attr("selected", "selected");
      setConnected();
    }
    else {
      setTabIndexForDataOrder();
      $('[data-order][selected]').each(function (index) {
        $(this).removeAttr("selected");
      })
    }
  });

  $(".template-wrapper").on('click', '.speaker', function () {

    if (theSound)
      theSound.pause();

    //soundManager.stopAll();
    $(".speaker.curr").removeClass("curr");

    $this = $(this);
    $this.addClass("curr");
    $(".speaker:not(.curr)").removeClass("play").addClass("stop");

    var nBox = $this.parents(".sound").data("order");
    var nRow = Math.ceil((nBox + 1) / 2);
    var sSide = (nBox % 2 === 0) ? "left" : "right";

    if ($this.hasClass("stop")) {
      $this.removeClass("stop").addClass("play");

      theSound = new Audio(arSoundObjects[nRow][sSide]);
      theSound.addEventListener('ended', function () {
        $this.removeClass("play").addClass("stop");
      }, false);
      theSound.play();

      //arSoundObjects[nRow][sSide].play({
      //  onfinish: function () {
      //    $this.removeClass("play").addClass("stop");
      //  }
      //});
    }
    else
      $this.removeClass("play").addClass("stop");
  });

  }
  $(document).on('focusin.bubbleTrap', function (e) {
    const activeBubble = $('.final-feedback');
    const closeIcon = $('.close').attr('tabindex', '0').attr('role', 'button');
    if (activeBubble && !activeBubble[0].contains(e.target)) {
      e.stopPropagation();
      e.preventDefault();
      closeIcon[0].focus();
    }
  });
  $(document).on('keydown', '.close', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      $('.final-feedback-wrapper').hide();
    }
  });
}
