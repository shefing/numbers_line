/// <reference path="http://cdn.cet.ac.il/libs/cet.content/1/client.js" />
/// <reference path="http://cdn.cet.ac.il/libs/cet.content.designtime/1/client.min.js" />
/// 
var unseenWizard = function () {
  var self = this;

  var _L = document.webL10n.get;

  var sPreset;
  var bValid = false;

  var myHeight;

  var sDir;

  var startDummy = '{{';
  var endDummy = '}}';
  var startMark = '<span class="marker">';
  var startUnmark = '<span class="unmarker">'
  var endMark = '</span>';
  var fontFamily = '0';
  var fontSize = '0';

  var arFontFamily = ['Arial', 'Arial', 'Comic Sans MS', 'Courier New', 'Helvetica', 'Tahoma', 'Times New Roman', 'Traditional Arabic', 'Lateef', 'David', 'Alef'];


  self.init = function () {

    cet.content.DesignTime.onValidationRequested = validateWizard;
    cet.content.DesignTime.onPresetRequested = buildPreset;

    // prepare empty
    initDefaults();

    // load preset
    loadPreset();
  }

  function initDefaults() {

    myHeight = 126;
    cet.content.UI.setHeight(myHeight);
  }

  function loadPreset() {
    var sPreset = cet.content.DesignTime.preset;

    if (!sPreset) {
      // no preset 
      $('.editor').html("<br>");
      sDir = $('body').attr('data-dir'); // "rtl";
      fontFamily = '0';
      fontSize = '0';
    }
    else {
      if (sPreset.substr(0, 8) == "%3CUnsee") {
        sPreset = decodeURIComponent(sPreset)
      }
      $('.editor').html($(sPreset).html());
      sDir = $(sPreset).attr('direction');
      fontFamily = $(sPreset).attr('font');
      fontSize = $(sPreset).attr('size');

    }

    $("#choosefontfamily").val(fontFamily);
    $("#choosefontsize").val(fontSize);

    if (sDir == "rtl")
      $("#directionRTL").attr("checked", "checked");
    else
      $("#directionLTR").attr("checked", "checked");



    $('.editor').removeClass('rtl ltr').addClass(sDir);
    $('.editor').css({ 'font-family': arFontFamily[fontFamily] });
    $('.editor').css({ 'font-size': ((fontSize == '0') ? '18px' : fontSize + 'px') });


    var $wrapper = $(".wizard-wrapper");
    myHeight = $wrapper.outerHeight();

    changesDone();

    setInterval(function () {
      // 
      var $wrapper = $(".wizard-wrapper");
      if (myHeight != $wrapper.outerHeight())
        changesDone();
    }, 100);
  }

  function validateWizard() {

    bValid = false;

    if (isEmpty($('.editor').html()))
      return [_L('inputContentError')];

    if ($('.marker').length < 2)
      return [_L('selectTwoItemsError')];

    bValid = true;
    return null;
  }

  function isEmpty(el) {
    var dummy = $("<div />");
    dummy.html(el);
    var res = ($.trim(dummy.text()) === '' && dummy.html().indexOf("<img") == -1);
    return res;
  }

  function buildPreset() {
    if (bValid) {
      //simplifyMarkers();
      //changesDone();
      var sOut = '<UnseenTemplate direction="' + sDir + '" font="' + fontFamily + '" size="' + fontSize + '">' + $('.editor').html() + '</UnseenTemplate>';
      sOut = encodeURIComponent(sOut);
      return sOut;
    }
  }

  function changesDone() {
    cet.content.DesignTime.notifyChange();
    var $wrapper = $(".wizard-wrapper");
    myHeight = $wrapper.outerHeight();
    cet.content.UI.setHeight(myHeight);
  }


  // marks selection by surrounding it with span class='marker'
  function markSelection(marker) {

    var selection = getSelection();

    if (selection.isCollapsed)
      return false;

    var range = selection.getRangeAt(0);
    var endNode = range.endContainer;
    var endOffset = range.endOffset;
    var startNode = range.startContainer;
    var startOffset = range.startOffset;
    var value = endNode.nodeValue;
    if (value) {
      value = value.substr(0, endOffset) + endDummy + value.substr(endOffset, value.length - endOffset);
      endNode.nodeValue = value;
    }
    value = startNode.nodeValue;
    if (value) {
      value = value.substr(0, startOffset) + startDummy + value.substr(startOffset, value.length - startOffset);
      startNode.nodeValue = value;
    }
    var html = $(".editor").html();
    html = html.replaceAll(startDummy, marker).replace(endDummy, endMark)
    $(".editor").html(html);
    simplifyMarkers();
    selection.collapse($(".editor").get(0), 0);
    return true;
  }

  // combine overlaped or sibling marks
  function simplifyMarkers() {

    var contentBefore = $(".editor").html();

    var childNodes = $(".editor")[0].childNodes;

    // 1st run - remove any inner mark
    for (var i = 0; i < childNodes.length; i++) {
      var curNode = childNodes[i];
      if (curNode.nodeName == "SPAN" && curNode.className == 'marker') {

        if (curNode.childNodes.length > 1) {
          for (var j = 0; j < curNode.childNodes.length; j++) {
            if (curNode.childNodes[j].nodeName == "SPAN" && curNode.childNodes[j].className == 'marker') {
              curNode.childNodes[j].innerHTML = startDummy + curNode.childNodes[j].innerHTML + endDummy;
            }
          }
        }
      }
      else if (curNode.nodeName == "DIV") {
        if (curNode.childNodes.length > 1) {
          for (var j = 0; j < curNode.childNodes.length; j++) {
            if (curNode.childNodes[j].nodeName == "SPAN" && curNode.childNodes[j].className == 'marker') {
              for (var k = 0; k < curNode.childNodes[j].childNodes.length; k++) {
                if (curNode.childNodes[j].childNodes[k].nodeName == "SPAN" && curNode.childNodes[j].childNodes[k].className == 'marker') {
                  curNode.childNodes[j].childNodes[k].innerHTML = startDummy + curNode.childNodes[j].childNodes[k].innerHTML + endDummy;
                }
              }
            }
          }
        }
      }
    }

    var html = $(".editor").html();
    html = html.replaceAll(startMark + startDummy, "").replaceAll(endDummy + endMark, "");
    $(".editor").html(html);

    // 2nd

    for (var i = 0; i < childNodes.length; i++) {
      var curNode = childNodes[i];
      if (curNode.nodeName == "SPAN" && curNode.className == 'marker') {
        curNode.innerHTML = startDummy + curNode.innerHTML + endDummy;
      }
    }

    html = $(".editor").html();
    html = html.replaceAll(startMark + startDummy, startDummy).replaceAll(endDummy + endMark, endDummy);
    html = html.replaceAll(endDummy + startDummy, "");
    html = html.replaceAll(startDummy, startMark).replaceAll(endDummy, endMark);
    html = html.replaceAll('<span class="marker"></span>', "");
    html = html.replaceAll('<span class="marker"><br></span>', "");

    $(".editor").html(html);

    if (contentBefore != html)
      changesDone();
  }

  function removeSelectedMarks() {
    var selection = getSelection()
    if (selection.isCollapsed)
      return false;

    var range = selection.getRangeAt(0);
    var endNode = range.endContainer;
    var endOffset = range.endOffset;
    var startNode = range.startContainer;
    var startOffset = range.startOffset;

    var sParentNode = startNode.parentNode;
    var eParentNode = endNode.parentNode;
    var value;

    if (sParentNode == eParentNode && sParentNode.nodeName == "SPAN" && sParentNode.className == 'marker') {
      // unmark is inside single mark 
      value = endNode.nodeValue;
      if (value) {
        value = value.substr(0, endOffset) + "]]{{" + value.substr(endOffset, value.length - endOffset);
        endNode.nodeValue = value;
      }
      value = startNode.nodeValue;
      if (value) {
        value = value.substr(0, startOffset) + "}}[[" + value.substr(startOffset, value.length - startOffset);
        startNode.nodeValue = value;
      }
    }
    else {
      // unmarks is over couple of marks
      value = endNode.nodeValue;
      if (value) {
        if (eParentNode.nodeName == "SPAN" && eParentNode.className == 'marker')
          value = "!@#" + value.substr(0, endOffset) + "]]{{" + value.substr(endOffset, value.length - endOffset);
        else
          value = value.substr(0, endOffset) + "]]" + value.substr(endOffset, value.length - endOffset);
        endNode.nodeValue = value;
      }

      value = startNode.nodeValue;
      if (value) {
        if (sParentNode.nodeName == "SPAN" && sParentNode.className == 'marker')
          value = value.substr(0, startOffset) + "}}[[" + value.substr(startOffset, value.length - startOffset) + "!@#";
        else
          value = value.substr(0, startOffset) + "[[" + value.substr(startOffset, value.length - startOffset);
        startNode.nodeValue = value;
      }
    }

    var html = $(".editor").html();
    html = html.replaceAll('[[', '<span class="unmarker">');
    html = html.replaceAll(']]', '</span>');

    html = html.replaceAll('{{', '<span class="marker">');
    html = html.replaceAll('}}', '</span>');

    html = html.replaceAll('!@#</span>', '');
    html = html.replaceAll('<span class="marker">!@#', '');

    $(".editor").html(html);
    selection.collapse($(".editor").get(0), 0);

    var childNodes = $(".editor")[0].childNodes;

    for (var i = 0; i < childNodes.length; i++) {
      var curNode = childNodes[i];
      if (curNode.nodeName == "SPAN" && curNode.className == 'unmarker') {
        if (curNode.childNodes.length > 1) {
          for (var j = 0; j < curNode.childNodes.length; j++) {
            if (curNode.childNodes[j].nodeName == "SPAN" && curNode.childNodes[j].className == 'marker') {
              curNode.childNodes[j].innerHTML = "{{" + curNode.childNodes[j].innerHTML + "}}";

            }
          }
        }
        curNode.innerHTML = "[[" + curNode.innerHTML + "]]";
      }
      else if (curNode.nodeName == "DIV") {
        if (curNode.childNodes.length > 1) {
          for (var j = 0; j < curNode.childNodes.length; j++) {
            if (curNode.childNodes[j].nodeName == "SPAN" && curNode.childNodes[j].className == 'unmarker') {
              if (curNode.childNodes[j].childNodes.length > 1) {
                for (var k = 0; k < curNode.childNodes[j].childNodes.length; k++) {
                  if (curNode.childNodes[j].childNodes[k].nodeName == "SPAN" && curNode.childNodes[j].childNodes[k].className == 'marker') {
                    curNode.childNodes[j].childNodes[k].innerHTML = "{{" + curNode.childNodes[j].childNodes[k].innerHTML + "}}";
                  }
                }
                
              }
              curNode.childNodes[j].innerHTML = "[[" + curNode.childNodes[j].innerHTML + "]]";
            }
          }
        }
      }

    }
    html = $(".editor").html();
    html = html.replaceAll('<span class="marker">{{', "").replaceAll('}}</span>', "");
    html = html.replaceAll('<span class="unmarker">[[', "").replaceAll(']]</span>', "");
    html = html.replaceAll('<span class="marker"></span>', "");
    html = html.replaceAll('<span class="marker"><br></span>', "");
    html = html.replaceAll('!@#', "").replaceAll('!@#', "");
    $(".editor").html(html);
    simplifyMarkers();
    selection.collapse($(".editor").get(0), 0);
  }

  function unFocus()
  {
    
    $('<div contenteditable="true"></div>').appendTo('body').focus().remove();
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

    // direction radios
    $("input[name='radDirection']").change(function () {
      sDir = this.value;
      $('.editor').removeClass('rtl ltr').addClass(sDir);
      changesDone();
    });


    $(".editor").on("paste", function (e) {
      e.preventDefault();

      var text;
      var clp = (e.originalEvent || e).clipboardData;
      if (clp === undefined || clp === null) {

        text = window.clipboardData.getData("text") || "";
        if (text !== "") {
          if (window.getSelection) {
            var selection = getSelection();
            var range = selection.getRangeAt(0);
            var newNode = document.createElement("span");
            newNode.innerHTML = text;
            range.deleteContents();
            range.insertNode(newNode);
          } else {
            document.selection.createRange().pasteHTML(text);
          }
        }
      } else {
        text = clp.getData('text/plain') || "";
        if (text !== "") {
          document.execCommand('insertText', false, text);
        }
      }
    });

    $(".mark").on('click', function (e) {

      markSelection(startMark);
      simplifyMarkers();
      changesDone();
      unFocus();
      return false;
    });

    $(".unmark").on('click', function (e) {
      removeSelectedMarks();
      changesDone();
      unFocus();
      return false;
    });

    $(".editor").on("keypress", function (e) {

      var br, range, selection, textNode;
      if (e.keyCode === 13) {
        e.preventDefault();
        if (window.getSelection) {
          selection = window.getSelection();
          range = selection.getRangeAt(0);
          br = document.createElement("br");
          textNode = document.createTextNode("\u00a0");
          range.deleteContents();
          range.insertNode(br);
          range.collapse(false);
          range.insertNode(textNode);
          range.selectNodeContents(textNode);
          selection.removeAllRanges();
          selection.addRange(range);
          return false;
        }
      }
    });

    $('#choosefontfamily').on('change', function (e) {
      fontFamily = this.value;
      $('.editor').css({ 'font-family': arFontFamily[fontFamily] });

    });

    $('#choosefontsize').on('change', function (e) {
      fontSize = this.value;
      $('.editor').css({ 'font-size': ((fontSize == '0') ? '18px' : fontSize + 'px') });

    });

  };
}
