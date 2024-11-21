/// <reference path="http://cdn.cet.ac.il/libs/cet.content/1/client.js" />
/// <reference path="http://cdn.cet.ac.il/libs/cet.content.designtime/1/client.min.js" />
/// 
var orderingWizard = function () {
  var self = this;

  var _L = document.webL10n.get;

  var sPreset;
  var sLayout;
  var sDir;
  var sWidth;
  var bFeedback;
  var bShuffle;
  var bTransparency;
  var bShowSolution;
  var sTextAlign;
  var sFontFamily;
  //var sFontSize;

  var bValid = false;
  var myHeight;

  self.init = function () {

    cet.content.DesignTime.onValidationRequested = validateWizard;
    cet.content.DesignTime.onPresetRequested = buildPreset;

    // prepare empty
    initDefaults();

    // define sortables
    $("#sortable").sortable({ handle: '.ow-handle' });
    $("#sortable").sortable("option", "axis", "y");
    $("#sortable").sortable({ cursor: "-webkit-grabbing" });
    $("#sortable").sortable({ containment: "#sortable-container" });

    // load preset
    loadPreset();

    createFonts();
    //createSizes();
  }

  //var createSizes = function () {
  //  var $dom = $('.field-value[data-preset="fontSize"]');
  //  var part = __components_createSelector({
  //    val: (sFontSize) ? sFontSize : '20px',
  //    items: [
  //      {text: '12px', val: '12px' },
  //      { text: '14px', val: '14px' },
  //      { text: '16px', val: '16px' },
  //      { text: '18px', val: '18px' },
  //      { text: '20px', val: '20px' },
  //      { text: '22px', val: '22px' },
  //      { text: '24px', val: '24px' },
  //      { text: '26px', val: '26px' },
  //      { text: '28px', val: '28px' },
  //    ]
  //  }, function (_data) {
  //    sFontSize = _data.val;
  //    changesDone();
  //    $(":root")[0].style.setProperty("--font-size", sFontSize);
  //  });
  //  $dom.append(part);
  //}

  var createFonts = function () {
    var $dom = $('.field-value[data-preset="fontFamily"]');
    var part = __components_createSelector({
      val: (sFontFamily) ? sFontFamily : ((cet.content.DesignTime.language == "ar") ? 'Abraham' : 'Alef'),
      items: [
        {
          text: 'Abraham', val: 'Abraham'
        },
        {
          text: 'Alef', val: 'Alef'
        },
        {
          text: 'Arial', val: 'Arial'
        },
        {
          text: 'Arimo', val: 'Arimo'
        },
        {
          text: 'Assistant', val: 'Assistant'
        },
        {
          text: 'Courier New', val: 'Courier New'
        },
        {
          text: 'Heebo', val: 'Heebo'
        },
        {
          text: 'Lateef', val: 'Lateef'
        },
        {
          text: 'Noto Sans Hebrew', val: 'Noto Sans Hebrew'
        },
        {
          text: 'Open Sans Hebrew', val: 'Open Sans Hebrew'
        },
        {
          text: 'Tahoma', val: 'Tahoma'
        },
        {
          text: 'Times New Roman', val: 'Times New Roman'
        },
        { text: 'Traditional Arabic', val: 'Traditional Arabic' }
      ]
    }, function (_data) {
      sFontFamily = _data.val;
      changesDone();

      $(":root")[0].style.setProperty("--font-family", sFontFamily);
    });
    $dom.append(part);
  }

  function initDefaults() {
    bShuffle = true;
    sLayout = "Vertical";
    sDir = $('body').attr('data-dir'); // "rtl";
    sWidth = "variable";
    bFeedback = true;
    sTextAlign = "right";
    bTransparency = true;
    bShowSolution = true;
    sFontFamily = (cet.content.DesignTime.language == "ar") ? 'Abraham' : 'Alef';
    //sFontSize = "20px";
    $('#li-direction').hide();
  }

  function loadPreset() {
    sPreset = cet.content.DesignTime.preset;

    if (!sPreset) {
      // no preset - add one empty element
      addElement();

    }
    else {
      if (sPreset.substr(0, 8) == "%3COrder")
        sPreset = decodeURIComponent(sPreset)

      var $XML = $(sPreset);
      var $Common = $XML.find("Common");

      bShuffle = ($Common.attr("shuffle") == "true");
      sLayout = $Common.attr("layout");
      if (sLayout == "Vertical") {
        $("#layoutVertical").attr("checked", "checked");
        $('#li-direction').hide();
      }
      else {
        $("#layoutHorizontal").attr("checked", "checked");
        $('#li-direction').show();
      }

      sDir = $Common.attr("direction");
      //if (sDir == undefined)
      //  sDir = "rtl";
      //sTextAlign = (sDir == "rtl") ? "right" : "left";

      //if (sDir == "rtl")
      //  $("#directionRTL").attr("checked", "checked");
      //else
      //  $("#directionLTR").attr("checked", "checked");

      sFontFamily = $Common.attr("fontFamily");
      //sFontSize = $Common.attr("fontSize");

      bTransparency = ($Common.attr("transparency") == "true");
      bShowSolution = ($Common.attr("showSolution") == "true");

      sWidth = $Common.attr("width");
      if (sWidth == "variable")
        $("#widthVariable").attr("checked", "checked");
      else
        $("#widthConstant").attr("checked", "checked");

      bFeedback = ($Common.attr("feedback") == "true");
      if (bFeedback)
        $("#feedbackYes").attr("checked", "checked");
      else
        $("#feedbackNo").attr("checked", "checked");

      var $Elements = $XML.find("element");

      var arrElements = new Array($Elements.length);
      for (var i = 0; i < $Elements.length; i++) {
        var $element = $Elements.eq(i);
        var dataOrder = parseInt($element.attr("order"));
        var content = $element.html();

        arrElements[dataOrder] = content;
      }

      for (var i = 0; i < arrElements.length; i++) {
        addElement(arrElements[i]);
      }
    }

    if (sDir == undefined)
      sDir = "rtl";
    sTextAlign = (sDir == "rtl") ? "right" : "left";

    if (sDir == "rtl")
      $("#directionRTL").attr("checked", "checked");
    else
      $("#directionLTR").attr("checked", "checked");

    // listener for contenteditable size changes
    // myHeight already set by addElement -> changesDone

    if (sFontFamily == undefined) {
      (cet.content.DesignTime.language == "ar") ? sFontFamily = 'Abraham' : sFontFamily = 'Alef'
    }
    $(":root")[0].style.setProperty("--font-family", sFontFamily);
    //if (sFontSize == undefined)
    //  sFontSize = "20px";
    //$(":root")[0].style.setProperty("--font-size", sFontSize);

    setInterval(function () {
      // 
      var $wrapper = $(".wizard-wrapper");
      if (myHeight != $wrapper.outerHeight())
        changesDone();
    }, 100);

  }

  function validateWizard() {
    bValid = true;

    var $sortables = $(".ow-default");
    if ($sortables.length == 0) {
      bValid = false;
      return [_L('inputItemContent')];
    }

    for (var i = 0; i < $sortables.length; i++) {
      var $content = $sortables.eq(i).find('.ow-content');
      if (isEmpty($content))
        return [_L('inputItemContent')];
    }

    if ($sortables.length < 2) {
      return [_L('inputTwoItems')];
    }

    return null;
  }

  function isEmpty(el) {
    return (el.html().indexOf("<img") == -1 && $.trim(el.text()) === '');
  }

  function buildPreset() {
    var sPresetOut = "";

    if (bValid) {
      var sOut = "";
      sOut += "<OrderingTemplate>";

      sOut += "<Common";
      sOut += " shuffle='" + bShuffle.toString() + "'";
      sOut += " layout='" + sLayout + "'";
      sOut += " transparency='" + bTransparency.toString() + "'";
      sOut += " direction='" + sDir + "'";
      sOut += " showSolution='" + bShowSolution.toString() + "'";
      sOut += " width='" + sWidth + "'";
      sOut += " feedback='" + bFeedback.toString() + "'";
      sOut += " fontFamily='" + sFontFamily + "'";
      //sOut += " fontSize='" + sFontSize + "'";
      sOut += " />";

      sOut += "<Elements>";

      var $sortables = $(".ow-default");
      for (var i = 0; i < $sortables.length; i++) {
        sOut += "<Element order='" + i.toString() + "'>";

        var $content = $sortables.eq(i).find('.ow-content');

        sOut += $content.html();
        sOut += "</div>";
        sOut += "</Element>";
      }

      sOut += "</Elements>";

      sOut += "</OrderingTemplate>";

      sPresetOut = encodeURIComponent(sOut);
    }
    return sPresetOut;
  }

  function changesDone() {
    cet.content.DesignTime.notifyChange();

    var $wrapper = $(".wizard-wrapper");
    myHeight = $wrapper.outerHeight()
    cet.content.UI.setHeight(myHeight);
  }

  function addElement(content) {
    var html = "<li class='ow-default' tabindex='0' role='button'>"
    //html += "<div class='ow-delete'><div class='sprite-ow-trash ui-sprite'></div></div>";
    html += "<div class='ow-delete'><a href='#' class='delete' title='" + _L('deleteItem') + "'>x</a></div></div>";
    if (sDir == "rtl")
      html += "<div class='ow-content ow-direction-rtl' contenteditable='true'>";
    else
      html += "<div class='ow-content ow-direction-ltr' contenteditable='true'>";
    if (content)
      html += content;
    html += "</div>";
    //html += "<div class='ow-handle'><div class='sprite-ow-dots ui-sprite'></div></div>";
    html += "<div class='ow-handle'><div class='sprite-ow-bullet_arrow_down_up-cet ui-sprite'></div></div>";

    html += "</li>";
    $("#sortable").append(html);
    changesDone();
  }

  function removeElement(el) {
    $(el).remove();
    changesDone();
  }

  self.registerEvents = function () {

    // layout radios
    $("input[name='radLayout']").change(function () {
      sLayout = this.value;
      if (sLayout == "Vertical") {
        $('#li-direction').hide();
      }
      else {
        $('#li-direction').show();
      }
      changesDone();
    });

    // direction radios
    $("input[name='radDirection']").change(function () {
      sDir = this.value;
      sTextAlign = (sDir == "rtl") ? "right" : "left";

      var $sortables = $(".ow-default .ow-content");
      $sortables.removeClass("ow-direction-rtl");
      $sortables.removeClass("ow-direction-ltr");
      if (sDir == "rtl")
        $sortables.addClass("ow-direction-rtl");
      else
        $sortables.addClass("ow-direction-ltr");
      changesDone();
    });

    // width radios (relevant only for horizontal layout)
    $("input[name='radWidth']").change(function () {
      sWidth = this.value;
      changesDone();
    });

    // feedback radios
    $("input[name='radFeedback']").change(function () {
      bFeedback = (this.value == 'yes');
      changesDone();
    });

    // add element]
    $("#add-element").click(function () {
      addElement();
    });

    // delete element
    $("#sortable").on("click", ".ow-delete", function () {
      removeElement(this.parentElement);
    });

    $("body").on("blur", ".ow-content", function () {
      changesDone();
    });
  }
}
