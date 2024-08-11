"use strict";

var Textit = Textit || {};

Textit.draggedMarkedText = function (article) {
  var _lineElements = [];
  var _frameElement;
  var _firstWord = null;
  var _lastWord = null;
  var _markType = 0;
  var _rangeID = -1;
  var _startMouseX = 0;
  var _startMouseY = 0;
  var _startScrollY = 0;
  var _lastMouseX = 0;
  var _lastMouseY = 0;
  var _distance = 0;
  var _frameStartPosition = null;
  var _lineStartPositions = [];
  var _draggedMarks = null;
  //-------------------------------------------------------
  function draggable_getDragDropType() {
    return "marked_text";
  }
  //-------------------------------------------------------
  function draggable_onDragStart(mouseX, mouseY) {
    _distance = 0;
  }
  //-------------------------------------------------------
  function draggable_onDragContinue(mouseX, mouseY) {
    mouseY -= Textit.util.scrollTop() - _startScrollY;
    var diffX = mouseX - _lastMouseX;
    var diffY = mouseY - _lastMouseY;
    for (var i = 0; i < _lineElements.length; i++) {
      Textit.util.moveElementByDiff(_lineElements[i], diffX, diffY);
    }
    Textit.util.moveElementByDiff(_frameElement, diffX, diffY);

    _distance += Math.sqrt(diffX * diffX + diffY * diffY);

    _lastMouseX = mouseX;
    _lastMouseY = mouseY;
  }
  //-------------------------------------------------------
  function draggable_onDragDrop(dropZoneFound) {
    if (!dropZoneFound) {
      animateToOrigin(function () {
        for (var i = 0; i < _draggedMarks.length; i++) {
          _draggedMarks[i].$removeClass("hold");
        }
      });
    } else {
      //article.marker.unmarkMarkedText(_rangeID, _markType);
    }
  }
  //-------------------------------------------------------
  function removeDraggedDom() {
    for (var i = 0; i < _lineElements.length; i++) {
      document.body.removeChild(_lineElements[i]);
    }
    document.body.removeChild(_frameElement);
  }
  //-------------------------------------------------------
  function organizeTextNodesIntoLines (textNodes) {
    _lineElements = [];
    var lines = [];
    for (var i = 0; i < textNodes.length; i++) {
      var rect = textNodes[i].rect;
      for (var j = 0; j < lines.length; j++) {
        var lineRect = lines[j].rect;
        if (rect.top <= lineRect.bottom && rect.bottom >= lineRect.top) {
          lineRect.top = Math.min(rect.top, lineRect.top);
          lineRect.left = Math.min(rect.left, lineRect.left);
          lineRect.right = Math.max(rect.right, lineRect.right);
          lineRect.bottom = Math.max(rect.bottom, lineRect.bottom);
          lines[j].nodes.push(i);
          break;
        }
      }
      if (j == lines.length) {
        lines.push({ rect: Textit.util.duplicateRect(rect), nodes: [i] });
      }
    }
    var frameRect = null;
    for (var i = 0; i < lines.length; i++) {
      var lineRect = lines[i].rect;
      var nodes = lines[i].nodes;
      lineRect.width = lineRect.right - lineRect.left + 1;
      lineRect.height = lineRect.bottom - lineRect.top + 1;
      var lineNode = document.createElement("DIV");
      lineNode.className = "draggedTextLine";
      Textit.util.setElementRect(lineNode, lineRect);
      _lineStartPositions[i] = Textit.util.duplicateRect(lineRect);

      if (frameRect == null) {
        frameRect = Textit.util.duplicateRect(lineRect);
      } else {
        frameRect.top = Math.min(lineRect.top, frameRect.top);
        frameRect.left = Math.min(lineRect.left, frameRect.left);
        frameRect.right = Math.max(lineRect.right, frameRect.right);
        frameRect.bottom = Math.max(lineRect.bottom, frameRect.bottom);
      }

      for (var j = 0; j < nodes.length; j++) {
        var textNode = textNodes[nodes[j]];
        var nodeRect = textNode.rect;
        nodeRect.top -= lineRect.top;
        nodeRect.left -= lineRect.left;
        lineNode.appendChild(textNode.node);
        Textit.util.setElementRect(textNode.node, nodeRect);
      }
      document.body.appendChild(lineNode);
      _lineElements.push(lineNode);
    }

    frameRect.top -= 10;
    frameRect.left -= 10;
    frameRect.right += 10;
    frameRect.bottom += 10;
    frameRect.width = frameRect.right - frameRect.left + 1;
    frameRect.height = frameRect.bottom - frameRect.top + 1;
    var frame = document.createElement("DIV");
    frame.className = "draggedTextFrame";
    document.body.appendChild(frame);
    Textit.util.setElementRect(frame, frameRect);
    _frameElement = frame;
    _frameStartPosition = frameRect;
  }
  //--------------------------------------------------
  function cloneMarkTextNodes(mark) {
    function addTextClone(range, text) {
      var parentElement = range.startContainer.parentNode;
      var rect = Textit.util.getRangeNonZeroClientRects(range)[0];
      var clone = document.createElement("SPAN");
      clone.innerText = text;
      clone.className = "draggedTextNode";
      clone.style.font = window.getComputedStyle(parentElement).getPropertyValue("font");
      clone.style.lineHeight = rect.height + "px";
      document.body.appendChild(clone);
      textNodes.push({ node: clone, rect: rect });
    }
    var avoidClasses = ["placeholder", "hotword__translation"];
    var textNodes = [];
    var walker = document.createTreeWalker(mark, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, null, false);
    var range = document.createRange();
    var node;
    while (node = walker.nextNode()) {
      if (node.$hasClass(avoidClasses)) {
        if (!walker.nextSibling()) {
          walker.currentNode = walker.currentNode.$nextTreeNode();
        }
        continue;
      }
      var text = node.textContent;
      if (node.$isText() &&  text != '' && node.parentNode.$isVisible()) {
        range.setStart(node, 0);
        range.setEnd(node, text.length);
        var rects = Textit.util.getRangeNonZeroClientRects(range);
        var numRects = rects.length;
        var startOffset = 0;
        var endOffset;
        for (var i = 1; i <= numRects; i++) {
          range.setStart(node, startOffset);
          if (i < numRects) {
            for (var offset = startOffset + 2; ; offset++) {
              range.setEnd(node, offset);
              rects = Textit.util.getRangeNonZeroClientRects(range);
              if (rects.length == 2) {
                endOffset = offset - 1;
                break;
              }
            }
          } else {
            endOffset = text.length;
          }
          range.setEnd(node, endOffset);
          addTextClone(range, text.substring(startOffset, endOffset));
          startOffset = endOffset;
        }
      }
    }
    return textNodes;
  }
  //--------------------------------------------------
  function initiateDrag(mark, mouseX, mouseY) {
    _markType = parseInt(mark.dataset.markType);
    _rangeID = article.marker.getRangeIdByMark(mark);
    _draggedMarks = article.marker.getMarksChain(mark);
    var textNodes = [];
    var firstWordElm = null;
    var lastWordElm = null;
    for (var i = 0; i < _draggedMarks.length; i++) {
      textNodes = textNodes.concat(cloneMarkTextNodes(_draggedMarks[i]));
      var wordElms = _draggedMarks[i].querySelectorAll(".word");
      if (wordElms.length > 0) {
        firstWordElm = (firstWordElm == null) ? wordElms[0] : firstWordElm;
        lastWordElm = wordElms[wordElms.length - 1];
      }
      _draggedMarks[i].$addClass("hold");
    }
    organizeTextNodesIntoLines(textNodes);
    _firstWord = article.getWordByDom(firstWordElm);
    _lastWord = article.getWordByDom(lastWordElm);
    _startMouseX = _lastMouseX = mouseX;
    _startMouseY = _lastMouseY = mouseY;
    _startScrollY = Textit.util.scrollTop();
  }
  //--------------------------------------------------
  function getLineTextNodes(lineElement) {
    return lineElement.childNodes;
  }
  //-------------------------------------------------------
  function getText() {
    var word = _firstWord;
    var words = [];
    while (word != _lastWord) {
      words.push(word.text);
      word = word.nextWord;
    }
    words.push(word.text);
    return words.join(' ');
  }
  //-------------------------------------------------------
  function animateLike(startX, startY, callback) {
    var rect = Textit.util.getBoundingRect(_firstWord.dom);
    var startPt = { x: startX, y: startY };
    var endPt = { x: rect.right, y: rect.top };
    var topPt = { x: (startPt.x + endPt.x) / 2, y: 10 };
    var candy = document.createElement("DIV");
    candy.className = "likeIconInText";
    candy.style.position = "fixed";
    candy.style.left = startX + "px";
    candy.style.top = startY + "px";
    document.body.appendChild(candy);
    var tween = new TWEEN.Tween({ value: 0 });
    tween.to({ value: 1 }, 500).onUpdate(function () {
      rect = Textit.util.getBoundingRect(_firstWord.dom);
      endPt = { x: rect.right - candy.offsetWidth, y: rect.top };
      var p = Textit.util.getQuadraticBezierXYatPercent(startPt, topPt, endPt, this.value);
      candy.style.left = p.x + "px";
      candy.style.top = p.y + "px";
    }).onComplete(function () {
      candy.parentNode.removeChild(candy);
      setTimeout(callback, 10)
    });

    tween.start();
  }
  //--------------------------------------------------
  function animateToOrigin(callback) {
    var animElems = [];
    for (var i = 0; i < _lineElements.length; i++) {
      animElems.push({
        elem: _lineElements[i],
        startRect: Textit.util.getBoundingRect(_lineElements[i]),
        endRect: _lineStartPositions[i]
      });
    }
    animElems.push({
      elem: _frameElement,
      endRect: _frameStartPosition,
      startRect: Textit.util.getBoundingRect(_frameElement),
    });

    var tween = new TWEEN.Tween({ value: 0 });
    tween.to({ value: 1 }, 300).onUpdate(function () {
      for (var i = 0; i < animElems.length; i++) {
        var start = animElems[i].startRect;
        var end = animElems[i].endRect;
        animElems[i].elem.style.left = (start.left + this.value * (end.left - start.left)) + "px";
        animElems[i].elem.style.top = (start.top + this.value * (end.top - start.top)) + "px";
      }
    }).onComplete(function () {
      removeDraggedDom();
      callback();
    });

    tween.start();
  }
  //-------------------------------------------------------
  function applyDropAction(actionType, x, y, callback) {
    collapseAnimation(function () {
      if (actionType == "like") {
        animateLike(x, y, function () {
          article.marker.likeMarkedText(_rangeID, _markType, true)
        });
      } else {
        article.marker.unmarkMarkedText(_rangeID, _markType);
      }
      callback();
    });
  }
  //-------------------------------------------------------
  function collapseAnimation(callback) {
    for (var i = 0; i < _lineElements.length; i++) {
      _lineElements[i].$addClass("collapse");
    }
    _frameElement.$addClass("collapse");

    _frameElement.addEventListener("transitionend", function (event) {
      callback();
      for (var i = 0; i < _lineElements.length; i++) {
        _lineElements[i].parentNode.removeChild(_lineElements[i]);
      }
      _frameElement.parentNode.removeChild(_frameElement);
    });
  }
  //-------------------------------------------------------
  function removeMark() {
    article.marker.unmarkMarkedText(_rangeID, _markType);
  }
  //-------------------------------------------------------
  function getBoundingClientRect() {
    return _frameElement.getBoundingClientRect();
  }
  //-------------------------------------------------------
  function setActionPreview(action) {
    _frameElement.setAttribute('data-action', action);
  }
  //-------------------------------------------------------
  return {
    initiateDrag: initiateDrag,
    draggable_getDragDropType: draggable_getDragDropType,
    draggable_onDragStart: draggable_onDragStart,
    draggable_onDragContinue: draggable_onDragContinue,
    draggable_onDragDrop: draggable_onDragDrop,
    getText: getText,
    applyDropAction: applyDropAction,
    setActionPreview: setActionPreview,
    getBoundingClientRect: getBoundingClientRect,
    removeMark : removeMark,
    getLineElements: function () { return _lineElements; },
    getFrameRect: function () { return _frameElement; },
    getMarkType: function () { return _markType; },
  }
}