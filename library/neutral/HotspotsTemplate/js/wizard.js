/// <reference path="http://cdn.cet.ac.il/libs/cet.content/1/client.js" />
/// <reference path="http://cdn.cet.ac.il/libs/cet.content.designtime/1/client.min.js" />
///
var hotspotsWizard = function () {
  var self = this;

  var _L = document.webL10n.get;

  var sPreset;
  var nHotspotId = 0;

  var bValid = false;
  var bInsideValidation = false;

  var oPreset = {};
  var oHotspots = {};
  var oViewport = {};
  var $currentHotspot;
  var $currentHotspotId;
  var $lastHotspotId;

  var sDir;
  var sTextAlign;
  var sImage;
  var sValue;
  var nImageWidth;
  var nImageHeight;
  var myHeight;

  // magic numbers used to correct position of hotspot
  var X_OFFSET = 21;
  var Y_OFFSET = 54;

  var PIC_PERCENT = 10000;

  var alertRequest;
  var currentMode;
  var bIE = false;

  self.init = function () {
    cet.content.DesignTime.onValidationRequested = validateWizard;
    cet.content.DesignTime.onPresetRequested = buildPreset;

    bIE = detectIE();

    // prepare empty
    initDefaults();

    // load preset
    loadPreset();
  }

  function initDefaults() {
    myHeight = 100;
    cet.content.UI.setHeight(100);
    sDir = 'rtl';
    sValue = '0';

    $(".dragable").draggable();
    $('.picture-container').height(0);

    $('#mode-choice').hide();
    $("#modeHotspots").attr("checked", "checked");
    switchMode('hotspots');

    $('#hotspot-parameters').hide();
  }

  function loadPreset() {
    var sPreset = cet.content.DesignTime.preset;

    if (!sPreset || sPreset == "{}") {
      // no preset
      oPreset = {};
      oPreset.direction = 'rtl';
      oPreset.value = '0';
      oHotspots = new Object();
      $("#directionRTL").attr("checked", "checked");
      $("#choose-hotspot-type").val('0');
    }
    else {
      if (sPreset.substr(0, 8) == "%3CHotsp") {
        sPreset = decodeURIComponent(sPreset)
        sPreset = sPreset.substr(18);
      }
      oPreset = JSON && JSON.parse(sPreset) || $.parseJSON(sPreset);

      $('.picture-container').height(400);

      // direction
      sDir = oPreset.direction;
      sTextAlign = (sDir == "rtl") ? "right" : "left";
      if (sDir == "rtl")
        $("#directionRTL").attr("checked", "checked");
      else
        $("#directionLTR").attr("checked", "checked");

      // "caption" on hotspots
      sValue = oPreset.value;
      if (sValue == "" || sValue == undefined)
        sValue = '0';
      $("#choose-hotspot-type").val(sValue);

      // image
      sImage = oPreset.image;
      nImageWidth = oPreset.imagewidth;
      nImageHeight = oPreset.imageheight;
      if (sImage) {
        var imageDescription = document.getElementById('backgroundDescription');
        var img = "<img src='" + sImage + "' alt='" + imageDescription + "'  onmousedown='return false;' style='width: " + nImageWidth + "px;display: block;'/>";
        $(".picture-self").html(img);
        $(".draggables").width(nImageWidth);
        $(".viewports").width(nImageWidth);
        cet.content.UI.setHeight(700);
      }
      $('#hotspot-parameters').show();
      $('#mode-choice').show();

      // hotspots
      oHotspots = oPreset.hotspots;
      if (oHotspots) {
        for (var id in oHotspots) {
          // find max value of nHotspotId used in saved preset
          var nId = parseInt(id.substr(3));
          nHotspotId = Math.max(nHotspotId, nId);

          var type = "hw-" + oHotspots[id].type;
          var pos = {};
          worldToDisplay(oHotspots[id].position, pos);
          var div = "<div id='" + id + "'class='draggable " + type +
            "' style='position:absolute; top:" + pos.top + "px; left:" + pos.left + "px;'>";
          div += "<div class='sprite-Pin_blank ui-sprite'></div>";
          div += "<div class='sprite-Pin_link ui-sprite'></div>";
          div += "<div class='sprite-Pin_info ui-sprite'></div>";
          div += "<div class='sprite-Pin_correct ui-sprite'></div>";
          div += "<div class='sprite-Pin_false ui-sprite'></div>";
          div += "<div class='sprite-Pin_select ui-sprite'></div>";
          div += "</div>";
          $(".draggables").append(div);
        }
        defineDraggables();
      }

      nHotspotId++;

      // viewport
      oViewport = oPreset.viewport;
      if (oViewport && oViewport.left != undefined) {
        var container = $('.viewports');
        var coefX = nImageWidth / PIC_PERCENT;
        var coefY = nImageHeight / PIC_PERCENT;
        var x = oViewport.left * coefX;
        var y = oViewport.top * coefY;
        var w = oViewport.width * coefX;
        var h = oViewport.height * coefY;
        var div = "<div class='viewport' style='top:" + Math.round(y) + "px; left:" + Math.round(x) + "px; width:" + w + "px; height:" + h + "px; ' >";
        div += "</div>";
        $(".viewports").append(div);
        defineViewport();
        $('#viewport-parameters').toggleClass('vp-exist', true);
      }
      else
        $('#viewport-parameters').toggleClass('vp-exist', false);
    }

    for (var id in oPreset.hotspots) {
      if (oPreset.hotspots[id].type === 'link') {
        oPreset.hotspots[id].linkDescription = $('#linkDescription').val();
      }
    }

    var $wrapper = $(".wizard-wrapper");
    myHeight = $wrapper.outerHeight();
    cet.content.UI.setHeight(myHeight);

    setInterval(function () {
      var $wrapper = $(".wizard-wrapper");
      if (myHeight != $wrapper.outerHeight())
      //changesDone();
      {
        myHeight = $wrapper.outerHeight();
        cet.content.UI.setHeight(myHeight);
      }
    }, 100);
  }

  function validateWizard() {
    bInsideValidation = true;
    hideParameters();
    bInsideValidation = false;
    bValid = false;

    sImage = $('.picture-self img').attr('src');
    if (sImage !== undefined && sImage.indexOf(":") !== -1)
      sImage = sImage.split(":")[1];
    if (sImage == "") {
      return [_L('uploadImageError')];
    }
    var sImageDescription = $('#backgroundDescription').val();
    if (sImageDescription.trim() === "") {
      return [_L('imageDescriptionError')];
    }

    var keys = Object.keys(oHotspots);
    if (keys.length == 0) {
      return [_L('inputContentError')];
    }
    var bFalse = false;
    var bCorrect = false;

    for (var key in oHotspots) {
      if (oHotspots[key].type == 'info') {
        if (isEmpty(oHotspots[key].infoText))
          return [_L('inputInfoTextError')];
      }
      else if (oHotspots[key].type == 'link') {
        if (isEmpty(oHotspots[key].linkText))
          return [_L('inputLinkTextError')];
        if (isNaN(oHotspots[key].linkWidth))
          return [_L('inputLinkWidthError')];
        if (isNaN(oHotspots[key].linkHeight))
          return [_L('inputLinkHeightError')];
        var linkDesc = oHotspots[key].linkDescription;
        if (isEmpty(linkDesc)) {
          return [_L('inputLinkDescriptionError')];
        }
      }
      else {
        bCorrect = bCorrect || (oHotspots[key].type == "correct");
        bFalse = bFalse || (oHotspots[key].type == "false");
        if (oHotspots[key].feedbackChecked) {
          if ((oHotspots[key].type == "correct" && isEmpty(oHotspots[key].correctText)) ||
            (oHotspots[key].type == "false" && isEmpty(oHotspots[key].falseText)))
            oHotspots[key].feedbackChecked = false;
        }
      }
    }

    if (bFalse && !bCorrect)
      return [_L('inputCorrectAnswerError')];
    bValid = true;
    return null;
  }

  function isEmpty(el) {
    $('.ht-info-content').html(el);
    var res = ($.trim($('.ht-info-content').text()) === '' && $('.ht-info-content').html().indexOf("<img") == -1);
    $('.ht-info-content').html("");
    return res;
  }

  function buildPreset() {
    oPreset = {};

    validateWizard();
    if (bValid) {
      oPreset.image = sImage;
      oPreset.imagewidth = nImageWidth;
      oPreset.imageheight = nImageHeight;
      oPreset.direction = sDir;
      oPreset.value = sValue;

      oPreset.backgroundDescription = $('#backgroundDescription').val();

      renumberHotspots(sDir, sValue);

      oPreset.hotspots = oHotspots;

      if (oPreset.hotspots) {
        for (var id in oPreset.hotspots) {
          if (oPreset.hotspots.hasOwnProperty(id) && oPreset.hotspots[id].type === 'link') {
            oPreset.hotspots[id].linkDescription = oHotspots[id].linkDescription;
          }
        }
      } else {
        console.log("No hotspots found in oPreset");
      }

      oPreset.viewport = oViewport;
      var sOut = "<HotspotsTemplate>";
      sOut += JSON.stringify(oPreset, null, 2);
      sOut = encodeURIComponent(sOut);
      return sOut;
    }
    return JSON.stringify(oPreset, null, 2);
  }

  function changesDone() {
    cet.content.DesignTime.notifyChange();

    //var $wrapper = $(".wizard-wrapper");
    //myHeight = $wrapper.outerHeight();
    //cet.content.UI.setHeight(myHeight);
  }

  function addHotspot(e) {
    // e - mouseevent

    var id = "hs_" + nHotspotId;
    nHotspotId++;

    $(".draggable").removeClass("hw-selected");

    var $img = $(e.target);
    var offset = $img.offset();

    var w = $img.width()

    var x = e.clientX - offset.left;
    var y = e.clientY - offset.top;
    var r = w - x;

    y -= Y_OFFSET;
    x -= X_OFFSET;
    var div = "<div id='" + id + "'class='draggable hw-correct hw-selected' style='position:absolute; top:" + Math.round(y) + "px; left:" + Math.round(x) + "px;'>";
    div += "<div class='sprite-Pin_blank ui-sprite'></div>";
    div += "<div class='sprite-Pin_link ui-sprite'></div>";
    div += "<div class='sprite-Pin_info ui-sprite'></div>";
    div += "<div class='sprite-Pin_correct ui-sprite'></div>";
    div += "<div class='sprite-Pin_false ui-sprite'></div>";
    div += "<div class='sprite-Pin_select ui-sprite'></div>";
    div += "</div>";
    $(".draggables").append(div);

    // get just added hotspot and set its left property instead
    var $last = $(".draggable").eq($(".draggable").length - 1);
    var pos = $($last).position();

    $($last).css("left", Math.max(pos.left, 0));
    $($last).css("top", Math.max(pos.top, 0));
    $($last).css("right", "auto");
    $currentHotspot = $last;
    $currentHotspotId = id;
    // redefine draggables

    defineDraggables();

    var oHotspot = {};
    oHotspot.type = "correct";
    oHotspot.feedbackChecked = false;
    oHotspot.position = {};
    displayToWorld($($last).position(), oHotspot.position);
    oHotspot.id = id;
    oHotspots[id] = oHotspot;

    showParameters(id);
  }

  function addViewport(e) {
    if ($(".viewport").length > 0) {
      return;
    }

    var $img = $(e.target);
    var offset = $img.offset();

    var x = e.clientX - offset.left;
    var y = e.clientY - offset.top;
    var w = 100;
    var h = $('.viewports').height() * 100 / $('.viewports').width();

    // make sure vieport object is within container
    x = Math.min(x, $('.viewports').width() - w);

    var div = "<div class='viewport' style='top:" + Math.round(y) + "px; left:" +
      Math.round(x) + "px; width:" + w + "px; height:" + h + "px; ' >";
    div += "</div>";
    $(".viewports").append(div);

    var $viewport = $(".viewport");
    var pos = $($viewport).position();

    $($viewport).css("left", Math.max(pos.left, 0));
    $($viewport).css("top", Math.max(pos.top, 0));

    defineViewport();

    $('#viewport-parameters').toggleClass('vp-exist', true);
    oViewport = {};
    updateVieportData();
    changesDone();
  }

  function defineViewport() {
    var $viewport = $(".viewport");
    $viewport.draggable({
      stop: function (ev, ui) {
        updateVieportData();
      }
    },
      { containment: "parent" }
    ).resizable({
      stop: function (ev, ui) {
        updateVieportData();
      }
    },
      { containment: "parent" },
      { aspectRatio: true }
    );
  }

  function updateVieportData() {
    var vp = $('.viewport');
    var coefX = PIC_PERCENT / nImageWidth;
    var coefY = PIC_PERCENT / nImageHeight;
    oViewport.left = Math.round(vp.position().left) * coefX;
    oViewport.top = Math.round(vp.position().top) * coefY;
    oViewport.width = Math.round(vp.width()) * coefX;
    oViewport.height = Math.round(vp.height()) * coefY;
    oPreset.viewport = oViewport;
  }

  function relocateViewport() {
    oViewport = oPreset.viewport;
    if (oViewport.left != undefined) {
      var vp = $('.viewport');
      var container = $('.viewports');
      var coef = nImageWidth / PIC_PERCENT;
      var left = oViewport.left * coef;
      var top = oViewport.top * coef;
      var width = Math.min(oViewport.width * coef, container.width());
      //var height = Math.min(oViewport.height * coef, container.height());
      var height = nImageHeight * width / nImageWidth;
      vp.css('left', Math.min(left, container.width() - width));
      vp.css('top', Math.min(top, container.height() - height));
      vp.css('width', width);
      vp.css('height', height);
    }
  }

  function displayToWorld(dPosition, wPosition) {
    wPosition.left = (Math.round(dPosition.left) + X_OFFSET) * PIC_PERCENT / nImageWidth;
    wPosition.top = (Math.round(dPosition.top) + Y_OFFSET) * PIC_PERCENT / nImageHeight;
  }

  function worldToDisplay(wPosition, dPosition) {
    dPosition.left = Math.round((wPosition.left * nImageWidth / PIC_PERCENT) - X_OFFSET);
    dPosition.top = Math.round((wPosition.top * nImageHeight / PIC_PERCENT) - Y_OFFSET);
  }

  function defineDraggables() {
    $(".draggable").draggable(
      {
        start: function (ev, ui) {
          $('.draggable').removeClass("hw-selected");
          ui.helper.addClass("hw-selected");
          $currentHotspot = ui.helper;
          $currentHotspotId = $(ui.helper).attr('id');
        }
      },
      {
        stop: function (ev, ui) {
          displayToWorld(ui.position, oHotspots[$currentHotspotId].position);
          showParameters($currentHotspotId);
        }
      },
      { stack: ".draggable" },

      { containment: "parent" }
    );
  }

  function switchMode(mode) {
    hideParameters();
    currentMode = mode;
    if (currentMode == 'hotspots') {
      $('.draggables').css("z-index", 100);
      $('.viewports').css("z-index", 99);
      $('#hotspot-parameters').show();
      $('#viewport-parameters').hide();
    }
    else {
      $('.draggables').css("z-index", 99);
      $('.viewports').css("z-index", 100);
      $('#hotspot-parameters').hide();
      $('#viewport-parameters').show();
    }
  }

  function showParameters(id) {
    // do we need update previous state?
    if ($lastHotspotId) {
      if ($lastHotspotId != id) {
        if (oHotspots[$lastHotspotId].feedbackChecked) {
          if (oHotspots[$lastHotspotId].type == "correct")
            oHotspots[$lastHotspotId].correctText = $('.ht-feedback-content').html();
          else
            oHotspots[$lastHotspotId].falseText = $('.ht-feedback-content').html();
        }
        if (oHotspots[$lastHotspotId].type == "info")
          oHotspots[$lastHotspotId].infoText = $('.ht-info-content').html();
        if (oHotspots[$lastHotspotId].type == "link") {
          oHotspots[$lastHotspotId].linkText = $('.ht-link-content').html();
          oHotspots[$lastHotspotId].linkWidth = $('#linkW').val();
          oHotspots[$lastHotspotId].linkHeight = $('#linkH').val();
          oHotspots[$lastHotspotId].linkDescription = $('#linkDescription').val();
        }
      }
    }

    // set radios according to type
    if (oHotspots[id].type == "correct") {
      $('#ht1').prop("checked", true);
    }
    else if (oHotspots[id].type == "false") {
      $('#ht2').prop("checked", true);
    }
    else if (oHotspots[id].type == "info") {
      $('#ht3').prop("checked", true);
    }
    else {
      $('#ht4').prop("checked", true);
    }

    // info text if exists
    if (oHotspots[id].type == "info") {
      $('.ht-info-content').html(oHotspots[id].infoText);
      $('.ht-info-content').show();
    }
    else {
      $('.ht-info-content').hide();
      $('.ht-info-content').html("");
    }

    if (oHotspots[id].type == "link") {
      $('.ht-link-content').html(oHotspots[id].linkText);
      $('#linkW').val(oHotspots[id].linkWidth || 80);
      $('#linkH').val(oHotspots[id].linkHeight || 60);
      $('#linkDescription').val(oHotspots[id].linkDescription); // עדכון תיאור הקישור
      $('.link-wrapper').show();
    }
    else {
      $('.link-wrapper').hide();
      $('.ht-link-content').html("");
      $('#linkW').val('');
      $('#linkH').val('');
      $('#linkDescription').val(''); 
    }

    // feedback
    if (oHotspots[id].type == "info" || oHotspots[id].type == "link") {
      $('.ht-feedback-content').hide();
      $('.ht-feedback-content').html("");
      $('#htFeedback').prop("checked", false);
      $('#htFeedback').prop("disabled", true);
    }
    else {
      $('#htFeedback').prop('disabled', false);
      $('#htFeedback').prop("checked", oHotspots[id].feedbackChecked);

      if (oHotspots[id].feedbackChecked) {
        if (oHotspots[id].type == "correct")
          $('.ht-feedback-content').html(oHotspots[id].correctText);
        else
          $('.ht-feedback-content').html(oHotspots[id].falseText);
        $('.ht-feedback-content').show();
      }
      else {
        $('.ht-feedback-content').hide();
        $('.ht-feedback-content').html("");
      }
    }

    $('#hotspot-parameters').removeClass('ht-noparams');
    $lastHotspotId = id;
  }

  function hideParameters() {
    if ($lastHotspotId) {
      $(".draggable").removeClass("hw-selected");
      if (oHotspots[$lastHotspotId].feedbackChecked) {
        if (oHotspots[$lastHotspotId].type == "correct")
          oHotspots[$lastHotspotId].correctText = $('.ht-feedback-content').html();
        else
          oHotspots[$lastHotspotId].falseText = $('.ht-feedback-content').html();
      }
      if (oHotspots[$lastHotspotId].type == "info")
        oHotspots[$lastHotspotId].infoText = $('.ht-info-content').html();
      if (oHotspots[$lastHotspotId].type == "link") {
        oHotspots[$lastHotspotId].linkText = $('.ht-link-content').html();
        oHotspots[$lastHotspotId].linkWidth = $('#linkW').val();
        oHotspots[$lastHotspotId].linkHeight = $('#linkH').val();
        oHotspots[$lastHotspotId].linkDescription = $('#linkDescription').val(); // שמירת תיאור הקישור
      }
      if (!bInsideValidation)
        changesDone();
    }
    $lastHotspotId = undefined;

    $('#hotspot-parameters').addClass('ht-noparams');
  }

  function renumberHotspots(direction, value) {
    var arrHotspots = new Array();
    if (value != '0') {
      for (var id in oHotspots) {
        oHotspots[id].value = "&nbsp;";
      }
    }
    else {
      for (var id in oHotspots) {
        if (oHotspots[id].type != 'info' && oHotspots[id].type != 'link')
          arrHotspots.push(oHotspots[id]);
        else
          oHotspots[id].value = "&nbsp;";
      }

      if (direction == 'ltr') {
        arrHotspots.sort(function (a, b) {
          if (a.position.top < b.position.top || (a.position.top == b.position.top && a.position.left < b.position.left))
            return -1;
          if (a.position.top > b.position.top)
            return 1;
          return 0;
        });
      }
      else {
        arrHotspots.sort(function (a, b) {
          if (a.position.top < b.position.top || (a.position.top == b.position.top && a.position.left > b.position.left))
            return -1;
          if (a.position.top > b.position.top)
            return 1;
          return 0;
        });
      }

      for (var i = 0; i < arrHotspots.length; i++) {
        oHotspots[arrHotspots[i].id].value = i + 1;
      }
    }
  }

  function relocateHotspots() {
    var ratioWidth = nImageWidth / oPreset.imagewidth;
    var ratioHeight = nImageHeight / oPreset.imageheight;

    oPreset.imagewidth = nImageWidth;
    oPreset.imageheight = nImageHeight;

    for (var id in oPreset.hotspots) {
      var newPos = {};
      worldToDisplay(oPreset.hotspots[id].position, newPos);
      $('#' + id).css('left', newPos.left);
      $('#' + id).css('top', newPos.top);
    }
  }

  function showAlert(message, withCancelButton) {
    if (withCancelButton)
      $('.ht-cancel').show();
    else
      $('.ht-cancel').hide();

    $("#alert-dialog > .body").html(message);
    var height = $("#alert-dialog .body").height();
    height = 50;

    $.colorbox({
      inline: true,
      href: '#alert-dialog',
      transition: 'none',
      speed: 0,
      open: true,
      height: (110 + height) + 'px',
      width: '500px',
      title: _L('myStudio'),
      overlayClose: false,
      closeButton: true
    });
  }

  function alertClosed(e) {
    $.colorbox.close();
    $('.ht-cancel').hide();
    if (e == 'ok') {
      if (alertRequest == 'ht-delete-all')
        deleteAllHotspots();
    }
  }

  function deleteAllHotspots() {
    hideParameters();
    if (oHotspots) {
      for (var id in oHotspots) {
        delete oHotspots[id];
        $('#' + id).remove();
      }
    }
  }

  function deleteHotspot() {
    if ($lastHotspotId) {
      hideParameters();
      var id = $currentHotspot.attr('id');
      delete oHotspots[id];
      $($currentHotspot).remove();
      changesDone();
    }
  }

  function deleteViewport() {
    if ($(".viewport").length > 0) {
      $('.viewport').remove();
      $('#viewport-parameters').toggleClass('vp-exist', false);
      oViewport = {};
      oPreset.viewport = oViewport;
      changesDone();
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
  self.registerEvents = function () {
    $('input[type=file]').change(function () {
      $('.loading').css('visibility', 'visible');
      $('#fileUploadForm').submit();
    });

    window.addEventListener("message", function (e) {
      if (e.data.substring(0, 12) == "file-upload:") {
        var fileInfo = jQuery.parseJSON(e.data.substring(12));
        if (fileInfo.files[0] != undefined) {
          if (fileInfo.files[0].errorCode == 'file_too_big') {
            alertRequest = 'ht-load-image';
            showAlert(_L('imageSizeIsTooBig'), false);

            // solution to 80033 - if stupid user next time chooses same wrong file - give again alert
            var inputControl = $('input[type=file]');
            inputControl.val("");
          }
          else {
            sImage = fileInfo.files[0].url;

            var oImage = new Image();
            oImage.onload = function () {
              nImageWidth = Math.min(800, oImage.width);
              nImageHeight = Math.round(oImage.height * nImageWidth / oImage.width);
              var imageDescription = document.getElementById('backgroundDescription');
              var img = "<img src='" + oImage.src + "' alt='" + imageDescription + "' onmousedown='return false;' style='width: " + nImageWidth + "px;display: block;'/>";
              $(".picture-self").html(img);
              $(".draggables").width(nImageWidth);
              $(".viewports").width(nImageWidth);
              if (oPreset.imagewidth) {
                if (nImageWidth != oPreset.imagewidth || nImageHeight != oPreset.imageheight) {
                  relocateHotspots();
                  relocateViewport();
                }
              }
              else {
                oPreset.imagewidth = nImageWidth;
                oPreset.imageheight = nImageHeight;
                oPreset.hotspots = oHotspots;
                oPreset.viewport = oViewport;
              }
              $('.picture-container').height(400);
              cet.content.UI.setHeight(Math.max(myHeight, 700));
            }
            oImage.src = sImage;
            $('#hotspot-parameters').show();
            $('#mode-choice').show();
            changesDone();
          }
        }
        $('.loading').css('visibility', 'hidden');
      }
    });

    $(".draggables").click(function (e) {
      addHotspot(e);
      changesDone();
      return false;
    });

    $(".draggables").on("click", ".draggable", function (e) {
      if ($(this).hasClass("hw-selected")) {
        $(this).removeClass("hw-selected");
        hideParameters();
      }
      else {
        $(".draggable").removeClass("hw-selected");
        $(this).addClass("hw-selected");
        $currentHotspot = $(this);
        $previousHotspotId = $currentHotspotId;
        $currentHotspotId = $(this).attr('id')

        showParameters($currentHotspotId);
      }
      return false;
    });

    $(".viewports").click(function (e) {
      addViewport(e);
      return false;
    });

    $("input[name='radHotspotType']").change(function () {
      var type = this.value;
      //forget old type
      var oldType = oHotspots[$currentHotspotId].type;
      $($currentHotspot).removeClass("hw-" + oldType);
      $($currentHotspot).addClass("hw-" + type);
      oHotspots[$currentHotspotId].type = type;
      showParameters($currentHotspotId);
    });

    $("input[name='modeChoice']").change(function () {
      switchMode(this.value);
    });

    $("#htFeedback").change(function () {
      oHotspots[$currentHotspotId].feedbackChecked = $(this).is(":checked");
      showParameters($currentHotspotId);
    });

    $(document).on('click', '.ht-delete', function (e) {
      deleteHotspot();
    });

    $(document).on('click', '.vp-delete', function (e) {
      deleteViewport();
    });

    $(document).on('click', '.ht-ok', function (e) {
      alertClosed("ok");
    });

    $(document).on('click', '.ht-cancel', function (e) {
      alertClosed("cancel");
    });

    $('body').on('keydown', function (e) {
      if (e.which === 46) {
        if (currentMode == "viewport")
          deleteViewport();
        else
          deleteHotspot();
      }
    });

    $('.ht-info-content').on('keydown', function (e) {
      if (e.which === 46) {
        e.stopPropagation();
        if (bIE) {
          $('.ht-info-content').html('');
          return false;
        }
      }
    });

    $('.ht-link-content').on('keydown', function (e) {
      if (e.which === 46) {
        e.stopPropagation();
        if (bIE) {
          $('.ht-link-content').html('');
          return false;
        }
      }
    });

    $('.ht-feedback-content').on('keydown', function (e) {
      if (e.which === 46) {
        e.stopPropagation();
      }
    });

    $("input[name='radDirection']").change(function () {
      sDir = this.value;
      sTextAlign = (sDir == "rtl") ? "right" : "left";

      $('.ht-feedback-content').removeClass('hw-direction-ltr hw-direction-rtl');
      $('.ht-info-content').removeClass('hw-direction-ltr hw-direction-rtl');

      $('.ht-feedback-content').addClass('hw-direction-' + sDir);
      $('.ht-info-content').addClass('hw-direction-' + sDir);

      changesDone();
    });

    $('#choose-hotspot-type').on('change', function (e) {
      sValue = this.value;
      changesDone();
    });
  };
}