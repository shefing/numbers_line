"use strict";

var Textit = Textit || {};

Textit.ArticleMarker = function (article) {
  var isMarkDraggable = false;
  var graphicMarker = new Textit.graphicMarker(article);
  var _selectionState = {
    active: false,
    anchor: { word: null, beforeHereAfter: 0 }, // beforeHereAfter:  -1 before, 0 here, 1 after
    selectedRange: null,
    markType: undefined,
    lowerLimit: -1,
    upperLimit: -1,
  }
  var _events = Textit.util.EventEmitter();
  var _likeRanges = [];
  var _markRanges = [
    // 0 - TRanges object - type 0 ranges 
    // 1 - TRanges object - type 1 ranges
    // 2 - TRanges object - type 2 ranges
    // ...
  ];
  var _markTypeGroups = [];
  var _markTypeColors = [];
  //-------------------------------------------------------
  function createMarkType(groupName, markColor, outlineColor ) {
    var newMarkType = _markRanges.length;
    _markRanges[newMarkType] = new TRanges();
    _markTypeColors[newMarkType] = { markColor: markColor, outlineColor: outlineColor } ;
    if (_markTypeGroups[groupName] === undefined) {
      _markTypeGroups[groupName] = [];
    }
    _markTypeGroups[groupName].push(newMarkType);
    return newMarkType;
  }
  //-------------------------------------------------------
  function getMarkTypeColor(markType) {
    return _markTypeColors[markType];
  }
  //-------------------------------------------------------
  function getMarkTypeGroupFriends(markType) {
    for (var markGroup in _markTypeGroups) {
      var group = _markTypeGroups[markGroup];
      for (var j = 0; j < group.length; j++) {
        if (group[j] == markType) {
          var friends = [];
          for (var k = 0; k < group.length; k++) {
            if (group[k] != markType) {
              friends.push(group[k]);
            }
          }
          return friends;
        }
      }
    }
  }
  //-------------------------------------------------------
  function adjustSelection(markType, cursorPos) {
    var wordIndex = cursorPos.word.index;
    var sel = _markRanges[markType].findRange(wordIndex);
    var anchor = {};
    if (cursorPos.beforeHereAfter == -1) {
      anchor = {
        word: article.words[sel.range.to],
        beforeHereAfter: 1
      }
    } else {
      anchor = {
        word: article.words[sel.range.from],
        beforeHereAfter: -1,
      }
    }
    unmarkMarkedText(sel.index, markType);
    _selectionState.active = true;
    _selectionState.anchor = anchor;
    _selectionState.markType = markType;
    graphicMarker.startNew(getMarkTypeColor(markType).outlineColor);
    cursorPos.beforeHereAfter = 0;
    continueSelection(cursorPos);
  }
  //-------------------------------------------------------
  function startSelection(anchor, markType) {
    markType = parseInt(markType);
    _selectionState.active = true;
    _selectionState.anchor = anchor;
    _selectionState.markType = markType;
    if (_markRanges[_selectionState.markType] == undefined) {
      _markRanges[_selectionState.markType] = new TRanges();
    }
    if (graphicMarker.isActive()) graphicMarker.hide();
    graphicMarker.startNew(getMarkTypeColor(markType).outlineColor);
    continueSelection(anchor);
  }
  //-------------------------------------------------------
  function continueSelection(cursorPos) {
    var range = selection_cursorPosToWordRange(cursorPos);
    _selectionState.selectedRange = range;
    if (range != null) {
      graphicMarker.updateWordRange(range.from, range.to);
    } else {
      graphicMarker.updateWordRange(null);
    }
  }
  //-------------------------------------------------------
  function selection_cursorPosToWordRange(cursorPos) {
    var fromPos = _selectionState.anchor;
    var toPos = cursorPos;
    if (fromPos.word.index == toPos.word.index &&
        fromPos.beforeHereAfter != 0 &&
        fromPos.beforeHereAfter == toPos.beforeHereAfter) {
      return null;
    }
    if (fromPos.word.index > toPos.word.index ||
        ((fromPos.word.index == toPos.word.index) && (toPos.beforeHereAfter == -1))) {
      var temp = toPos;
      toPos = fromPos;
      fromPos = temp;
    }
    var fromIndex = fromPos.word.index;
    var toIndex = (toPos.beforeHereAfter == -1) ? toPos.word.prevWord.index : toPos.word.index;
    return new TRange(fromIndex, toIndex);
  }
  //-------------------------------------------------------
  function applyMarkChanges(markType, rangesAfter) {
    var origRanges = _markRanges[markType];
    var newRanges = rangesAfter.clone();
    var changes = origRanges.findDifferences(newRanges);
    for (var i = 0; i < changes.add.length; i++) {
      var add = changes.add[i];
      var fromNode = article.words[add.from.value].dom;
      var toNode = article.words[add.to.value].dom;
      markNodeRange(fromNode, (add.from.beforeHereAfter < 1),
                    toNode, (add.to.beforeHereAfter > -1), markType)
    }
    for (var i = 0; i < changes.remove.length; i++) {
      var remove = changes.remove[i];
      var fromNode = article.words[remove.from.value].dom;
      var toNode = article.words[remove.to.value].dom;
      unmarkNodeRange(fromNode, (remove.from.beforeHereAfter < 1),
                      toNode, (remove.to.beforeHereAfter > -1), markType)
    }
    _markRanges[markType] = newRanges;

    if (changes.add.length > 0 || changes.remove.length > 0)
      _events.emit('change', { markType: markType })
  }
  //-------------------------------------------------------
  function markSelectedRange() {
    if (_selectionState.selectedRange == null) {
      return;
    }
    var origRanges = _markRanges[_selectionState.markType];
    var newRanges = origRanges.clone();
    newRanges.addRange(_selectionState.selectedRange);
    applyMarkChanges(_selectionState.markType, newRanges)
  }
  //-------------------------------------------------------
  function deleteOverriddenMarksFromSameGroup() {
    if (_selectionState.selectedRange == null) {
      return;
    }
    var friendsMarkTypes = getMarkTypeGroupFriends(_selectionState.markType);
    
    for (var i = 0; i < friendsMarkTypes.length; i++) {
      var markType = friendsMarkTypes[i];
      var origRanges = _markRanges[markType];
      if (origRanges) {
        var newRanges = origRanges.clone();
        newRanges.removeRange(_selectionState.selectedRange);
        applyMarkChanges(markType, newRanges)
      }
    }
  }
  //-------------------------------------------------------
  function endSelection(hide) {
    if (_selectionState.active) {
      _selectionState.active = false;
      if (hide) {

        graphicMarker.hide(true, function(){
          markSelectedRange();
          deleteOverriddenMarksFromSameGroup();
        });
      } else {
        markSelectedRange();
        deleteOverriddenMarksFromSameGroup();
      }
    }
  }
  //--------------------------------------------------
  function markNodeRange(firstNode, includeFirst, lastNode, includeLast, markType) {
    var avoidTypes = ["ASIDE", "IMG", "FIGURE"];
    var avoidClasses = ["question", "placeholder"];
    var activeMark = null;
    var createdMarks = [];
    var nextNode = includeFirst ? firstNode : firstNode.$nextTreeNode();
    while (true) {
      if (nextNode.$hasClass(avoidClasses) || nextNode.$ofType(avoidTypes)) {
        nextNode = nextNode.$nextTreeNode();
        continue;
      }
      if (nextNode.$isMarkable(markType)) {
        if (nextNode == lastNode && !includeLast) {
          break;
        }
        if (!nextNode.$contains(lastNode) || (nextNode == lastNode)) {
          if (activeMark == null) {
            activeMark = newMarkElement(nextNode.parentNode, nextNode, markType);
            createdMarks.push(activeMark);
          }
          activeMark.appendChild(nextNode);
          if (nextNode == lastNode) {
            break;
          }
          nextNode = activeMark.$nextTreeNode();
          if (nextNode.previousSibling != activeMark) {
            activeMark = null;
          }
        } else { // nextNode contains lastNode
          nextNode = nextNode.firstChild;
          activeMark = null;
        }
      } else { // !nextNode.$isMarkable(markType)
        activeMark = null;
        if (nextNode.firstChild != null) {
          nextNode = nextNode.firstChild;
        } else {
          nextNode = nextNode.$nextTreeNode();
        }
      }
    }

    optimizeMarks(createdMarks);
  }
  //--------------------------------------------------
  function splitMarkOnNode(node, splitBefore, markType) {
    var mark = getNodeParentMark(node, markType);
    if (mark == null) {
      return null;
    }
    var markChains = {
      beforeChain: markStartSectionOfExistingMark(mark, node, !splitBefore),
      afterChain: markEndSectionOfExistingMark(mark, node, splitBefore)
    };

    mark.$removeAndLeaveChildren();
    return markChains;
  }
  //--------------------------------------------------
  function markStartSectionOfExistingMark(mark, lastNode, includingLastNode) {
    var markType = parseInt(mark.dataset.markType);
    var parent = mark;
    var createdMarks = [];
    while (true) {
      while (parent.firstChild.$contains(lastNode, false)) {
        parent = parent.firstChild;
      }
      if (!includingLastNode && parent.firstChild == lastNode) {
        return createdMarks;
      }
      var newMark = newMarkElement(parent, parent.firstChild, markType);
      createdMarks.push(newMark);
      var node = newMark.nextSibling;
      while (!node.$contains(lastNode) || (includingLastNode && node == lastNode)) {
        newMark.appendChild(node);
        if (node == lastNode) {
          return createdMarks;
        }
        node = newMark.nextSibling;
      }
      if (node == lastNode) {
        return createdMarks;
      }
      parent = node;
    }
  }
  //--------------------------------------------------
  function markEndSectionOfExistingMark(mark, firstNode, includingFirstNode) {
    var markType = parseInt(mark.dataset.markType);
    var parent = mark;
    var createdMarks = [];
    while (true) {
      while (parent.lastChild.$contains(firstNode, false)) {
        parent = parent.lastChild;
      }
      if (!includingFirstNode && parent.lastChild == firstNode) {
        return createdMarks;
      }
      var newMark = newMarkElement(parent, null, markType);
      createdMarks.push(newMark);
      var node = newMark.previousSibling;
      while (!node.$contains(firstNode) || (includingFirstNode && node == firstNode)) {
        newMark.insertBefore(node, newMark.firstChild);
        if (node == firstNode) {
          return createdMarks;
        }
        node = newMark.previousSibling;
      }
      if (node == firstNode) {
        return createdMarks;
      }
      parent = node;
    }
  }
  //--------------------------------------------------
  function unmarkNodeRange(firstNode, includeFirst, lastNode, includeLast, markType) {
    var newMarks1 = splitMarkOnNode(firstNode, includeFirst, markType);
    var newMarks2 = splitMarkOnNode(lastNode, !includeLast, markType);
    var marksToOptimized = newMarks1.beforeChain.concat(newMarks2.afterChain);

    var firstMark = getNodeParentMark(firstNode, markType);
    var lastMark = getNodeParentMark(lastNode, markType);
    var nextNode = firstMark;
    if (!includeFirst) {
      nextNode = firstNode;
    }
    var isLast = false;
    while (!isLast) {
      isLast = (nextNode == lastMark);
      if (nextNode.$isMark(markType) && (includeLast || !isLast)) {
        var mark = nextNode;
        nextNode = nextNode.lastChild;
        mark.$removeAndLeaveChildren();
      }
      else if (nextNode.firstChild != null) {
        nextNode = nextNode.firstChild;
      }
      else {
        nextNode = nextNode.$nextTreeNode();
      }
    }
    optimizeMarks(marksToOptimized);
  }
  //--------------------------------------------------
  function markWordRange(fromWord, toWord, markType) {
    if (_markRanges[markType] == undefined) {
      _markRanges[markType] = new TRanges();
    }
    _markRanges[markType].addRange(new TRange(fromWord.index, toWord.index));
    markNodeRange(fromWord.dom, true, toWord.dom, true, markType);
  }
  //--------------------------------------------------
  function setMarkRanges(ranges, markType) {
    if (_markRanges[markType] !== undefined && _markRanges[markType].array.length > 0) {
      //throw "marker.setMarkRanges - you cannot overwrite existing ranges";
      // Can't you? why not? ;)
      removeMarkRanges(markType);
    }  
    _markRanges[markType] = ranges.clone();
    applyMarkRangesOnText(markType);
  }
  //--------------------------------------------------
  function removeMarkRanges(markType) {
    if (_markRanges[markType] === undefined) {
      return;
    }
    removeMarkRangesFromText(markType);
    _markRanges[markType] = new TRanges();
  }
  //--------------------------------------------------
  function unmarkMarkedText(rangeID, markType) {
    var range = _markRanges[markType].array[rangeID];
    var fromNode = article.words[range.from].dom;
    var toNode = article.words[range.to].dom;
    _markRanges[markType].array.splice(rangeID, 1);
    unmarkNodeRange(fromNode, true, toNode, true, markType);
    
    _events.emit('change', { markType: markType })
  }
  //--------------------------------------------------
  function lerpColor(fromColor, toColor, precnts, wordIndex, numOfWords) {
    var start = wordIndex / numOfWords;
    var end = (wordIndex + 1) / numOfWords;
    if (precnts < start) {
      precnts = 0;
    }
    else if (precnts > end) {
      precnts = 1;
    }
    else
      precnts = (precnts - start) / (end - start);

    var color = {
      r: Math.round(fromColor.r + (toColor.r - fromColor.r) * precnts),
      g: Math.round(fromColor.g + (toColor.g - fromColor.g) * precnts),
      b: Math.round(fromColor.b + (toColor.b - fromColor.b) * precnts),
    };
    var css = "rgb(" + color.r + "," + color.g + "," + color.b + ")";
    return css;
  }
  //--------------------------------------------------
  function animateLike(likeIcon, callback) {
    var rect = Textit.util.getBoundingRect(likeIcon);
    var startX = rect.left;
    var startY = rect.top;
    var endX = 0;
    var endY = startY;
    likeIcon.style.position = "fixed";
    likeIcon.style.left = startX + "px";
    likeIcon.style.top = startY + "px";
    document.body.appendChild(likeIcon);

    var startPt = { x: startX, y: startY };
    var endPt = { x: endX, y: endY };
    var topPt = { x: (startPt.x + endPt.x) / 2, y: 10 };
    var tween = new TWEEN.Tween({ value: 0 });
    tween.to({ value: 1 }, 500).onUpdate(function () {
      var p = Textit.util.getQuadraticBezierXYatPercent(startPt, topPt, endPt, this.value);
      likeIcon.style.left = p.x + "px";
      likeIcon.style.top = p.y + "px";
    }).onComplete(function () {
      likeIcon.parentElement.removeChild(likeIcon);
      //callback();
    });

    tween.start();
  }
  //--------------------------------------------------
  function unlikeWordRange(likeIcon, wordIndex, animate, callback) {
    var rangeID = getLikeRangeIDbyWordIndex(wordIndex);
    if (rangeID == -1) {
      return;
    }
    var fromWord = article.words[_likeRanges[rangeID][0]];
    var toWord = article.words[_likeRanges[rangeID][1]];
    _events.emit('unlike', { range: { from: fromWord.index, to: toWord.index } });
    _likeRanges.splice(rangeID, 1);

    if (animate) {
      var numOfWords = toWord.index - fromWord.index + 1;
      var fromColor = {
        r: 0xED, g: 0x7D, b: 0x31
      };
      var toColor = {
        r: 0x0, g: 0x0, b: 0x0
      };
      var tween = new TWEEN.Tween({ value: 0 });
      tween.to({ value: 1 }, 200).onUpdate(function () {
        var value = this.value;
        article.forEachWord(fromWord, toWord, function (word) {
          word.dom.style.color = lerpColor(fromColor, toColor, value, word.index - fromWord.index, numOfWords);
        });

      }).onComplete(function () {
        article.forEachWord(fromWord, toWord, function (word) {
          word.dom.$removeClass("liked");
          word.dom.style.color = "";
        });
        likeIcon.parentElement.$removeAndLeaveChildren();
        animateLike(likeIcon);
        if (typeof callback != "undefined") {
          callback();
        }
      });

      tween.start();
    }
  }
  //--------------------------------------------------
  function getLikeRangeIDbyWordIndex(fromIndex, toIndex) {
    toIndex = (toIndex === undefined) ? fromIndex : toIndex;
    for (var i = 0; i < _likeRanges.length; i++) {
      if (_likeRanges[i][0] <= toIndex && _likeRanges[i][1] >= fromIndex) {
        return i;
      }
    }
    return -1;
  }
  //--------------------------------------------------
  function likeWordRange(fromWord, toWord, animate, callback) {
    if (getLikeRangeIDbyWordIndex(fromWord.index, toWord.index) != -1) {
      return;
    }

    var like = document.createElement("SPAN");
    like.className = "likeIconInText";
    like.style.marginLeft = "-1em";
    var nowrap = document.createElement("SPAN");
    nowrap.className = "nowrap";
    var first = fromWord.dom;
    first.parentElement.insertBefore(nowrap, first);
    nowrap.appendChild(like);
    nowrap.appendChild(first);
    like.offsetHeight;
    like.style.marginLeft = '';
    _likeRanges.push([fromWord.index, toWord.index]);
    like.addEventListener("click", function () {
      unlikeWordRange(this, fromWord.index, true);
    });

    if (animate) {
      var numOfWords = toWord.index - fromWord.index + 1;
      var fromColor = {
        r: 0xd2, g: 0xd2, b: 0xd2
      };
      var toColor = {
        r: 0xED, g: 0x7D, b: 0x31
      };
      var tween = new TWEEN.Tween({ value: 0 });
      tween.to({ value: 1 }, 200).onUpdate(function () {
        var value = this.value;
        article.forEachWord(fromWord, toWord, function (word) {
          word.dom.style.color = lerpColor(fromColor, toColor, value, word.index - fromWord.index, numOfWords);
        });

      }).onComplete(function () {
        article.forEachWord(fromWord, toWord, function (word) {
          word.dom.$addClass("liked");
          word.dom.style.color = "";
        });
        if (typeof callback != "undefined") {
          callback();
        }
      });

      tween.start();
    }
  }
  //--------------------------------------------------
  function likeMarkedText(rangeID, markType, animate, callback) {
    var range = _markRanges[markType].array[rangeID];
    unmarkMarkedText(rangeID, markType);
    var fromWord = article.words[range.from];
    var toWord = article.words[range.to];
    likeWordRange(fromWord, toWord, animate, callback);
    _events.emit('like', { range: { from: fromWord.index, to: toWord.index } });
  }
  //--------------------------------------------------
  function optimizeMarks(marks) {
    if (marks == null) {
      return;
    }
    if (marks instanceof Array) {
      for (var i = 0; i < marks.length; i++) {
        optimizeMarks(marks[i]);
      }
      return;
    }
    var mark = marks;
    if (mark.parentNode == null) {
      return;
    }
    var markType = parseInt(mark.dataset.markType);
    while (true) {
      if (mark.childNodes.length == 0) {
        mark.parentNode.removeChild(mark);
      }
      else if (mark.parentNode.childNodes.length == 1 && mark.parentNode.$isMarkable(markType)) {
        mark.$swallowParentNode();
      }
      else if (mark.previousSibling && mark.previousSibling.$isMark(markType)) {
        var prevMark = mark.previousSibling;
        mark.insertBefore(prevMark, mark.firstChild);
        prevMark.$removeAndLeaveChildren();
      }
      else if (mark.nextSibling && mark.nextSibling.$isMark(markType)) {
        var nextMark = mark.nextSibling;
        mark.appendChild(nextMark);
        nextMark.$removeAndLeaveChildren();
      }
      else
        return;
    }
  }
  //--------------------------------------------------
  function isWordInMark(word, markType) {
    return (word != null) && (getWordParentMark(word, markType) != null);
  }
  //--------------------------------------------------
  function getNodeParentMark(node, markType) {
    while (!node.$isMark(markType) && node.$isMarkable(markType)) {
      node = node.parentNode;
    }
    if (!node.$isMark(markType)) {
      return null;
    }
    return node;
  }
  //--------------------------------------------------
  function getWordParentMark(word, markType) {
    return getNodeParentMark(word.element, markType);
  }
  //--------------------------------------------------
  function newMarkElement(parentNode, insertBeforeNode, markType) {
    var mark = document.createElement("MARK");
    mark.dataset.markType = markType;
    mark.style.backgroundColor = getMarkTypeColor(markType).markColor;
    parentNode.insertBefore(mark, insertBeforeNode);

    // make that mark draggable by browser
    if (isMarkDraggable) {
      mark.setAttribute('draggable', 'true');
      mark.ondragstart = function (ev) {
        ev.dataTransfer.setData("text", getMarkText(this));
      }
    }

    return mark;
  }
  //--------------------------------------------------
  function makeMarkDraggable(isDraggable) {
    isMarkDraggable = isDraggable;
  }
  //--------------------------------------------------
  function getMarkText(mark) {
    var nodes = document.createTreeWalker(mark, NodeFilter.SHOW_TEXT, null, null);
    var node;
    var markText = '';
    while (node = nodes.nextNode()) {
      if(node.parentNode.className != 'hotword__translation')
        markText += node.nodeValue;
    }
    return markText;
  }
  //--------------------------------------------------
  function getRangeIdByMark(mark) {
    var markType = parseInt(mark.dataset.markType);
    var treeWalker = document.createTreeWalker(mark, NodeFilter.SHOW_ELEMENT, null, false);
    var wordIndex;
    while (treeWalker.nextNode()) {
      var node = treeWalker.currentNode;
      if (node.nodeName == "SPAN" && node.classList.contains("word")) {
        wordIndex = parseInt(node.dataset.wordIndex);
        break;
      }
    }
    var range = _markRanges[markType].findRange(wordIndex);
    return range.index;
  }
  //--------------------------------------------------
  function getMarksChain(mark) {
    var markType = parseInt(mark.dataset.markType);
    var rangeID = getRangeIdByMark(mark);
    var range = _markRanges[markType].array[rangeID];
    var firstMark = getWordParentMark(article.words[range.from], markType);
    var lastMark = getWordParentMark(article.words[range.to], markType);
    var treeWalker = document.createTreeWalker(article.dom, NodeFilter.SHOW_ELEMENT, null, false);
    var chain = [];
    treeWalker.currentNode = firstMark;
    do  {
      var node = treeWalker.currentNode;
      if (node.$isMark(markType)) {
        chain.push(node);
      }
    } while (treeWalker.currentNode != lastMark && treeWalker.nextNode())
    return chain;
  }
  //--------------------------------------------------
  function selectionActive() {
    return _selectionState.active;
  }
  //--------------------------------------------------
  function serializeMarks(markType) {
    if (_markRanges[markType] === undefined || _markRanges[markType] == null) {
      return []
    }
    return _markRanges[markType].serialize();
  }
  //--------------------------------------------------
  function serializeLikes() {
    var likes = [];
    for (var i = 0; i < _likeRanges.length; i++) {
      likes.push([_likeRanges[i][0], _likeRanges[i][1]]);
    }

    return likes;
  }
  //--------------------------------------------------
  function applyMarkRangesOnText(markType) {
    for (var j = 0; j < _markRanges[markType].array.length; j++) {
      var fromNode = article.words[_markRanges[markType].array[j].from].dom;
      var toNode = article.words[_markRanges[markType].array[j].to].dom;
      markNodeRange(fromNode, true, toNode, true, markType);
    }
  }
  //--------------------------------------------------
  function removeMarkRangesFromText(markType) {
    for (var j = 0; j < _markRanges[markType].array.length; j++) {
      var fromNode = article.words[_markRanges[markType].array[j].from].dom;
      var toNode = article.words[_markRanges[markType].array[j].to].dom;
      unmarkNodeRange(fromNode, true, toNode, true, markType);
    }
  }
  //--------------------------------------------------
  function deserializeMarks(marks, markType) {
    _markRanges[markType] = new TRanges(marks);
    applyMarkRangesOnText(markType);
  }
  //--------------------------------------------------
  function deserializeLikes(likes) {
    for (var i = 0; i < likes.length; i++) {
      var wordsRange = likes[i];
      var firstWord = article.words[wordsRange[0]];
      var lastWord = article.words[wordsRange[1]];
      likeWordRange(firstWord, lastWord, true);
    }
  }
  //--------------------------------------------------
  function getMarkRanges(markType) {
    return _markRanges[markType];
  }

  function adjustSelection(markType, cursorPos) {
    var wordIndex = cursorPos.word.index;
    var sel = _markRanges[markType].findRange(wordIndex);
    var anchor = {};
    if (sel.range.from == wordIndex) {
      anchor = {
        word: article.words[sel.range.to],
        beforeHereAfter: 1
      }
    } else if (sel.range.to == wordIndex) {
      anchor = {
        word: article.words[sel.range.from],
        beforeHereAfter: -1,
      }
    }
    else
      return false;
    unmarkMarkedText(sel.index, markType);
    _selectionState.active = true;
    _selectionState.anchor = anchor;
    _selectionState.markType = markType;
    if (!graphicMarker.isActive()) {
      graphicMarker.startNew(getMarkTypeColor(markType).outlineColor);
      graphicMarker.updateWordRange(sel.range.from, sel.range.to, false);
    }
    cursorPos.beforeHereAfter = 0;
    continueSelection(cursorPos);
    return true;
  }
  //--------------------------------------------------
  function findMarkFor(word) {
    var wordIndex = word.index || word;
    var bestMark = null, bestMarkLen = 0; // the best match is the shortest, earliest mark (in the case of overlapping marks)
    var mark, markLen;
    for (var markType = 0; markType < _markRanges.length; markType++) {
      mark = _markRanges[markType].findRange(wordIndex);
      if (mark) {
        markLen = mark.range.to - mark.range.from;
        mark.markType = markType;
        if (bestMarkLen == 0 || markLen < bestMarkLen || (markLen == bestMarkLen && mark.from > bestMark.from))
          bestMark = mark;
      }
    }
    return bestMark;
  }
  //--------------------------------------------------
  return {
    createMarkType : createMarkType,
    selectionActive: selectionActive,
    startSelection: startSelection,
    continueSelection: continueSelection,
    adjustSelection: adjustSelection,
    endSelection: endSelection,
    serializeMarks: serializeMarks,
    deserializeMarks: deserializeMarks,
    serializeLikes: serializeLikes,
    deserializeLikes: deserializeLikes,
    likeMarkedText: likeMarkedText,
    likeWordRange: likeWordRange,
    markWordRange: markWordRange,
    unmarkMarkedText: unmarkMarkedText,
    getMarksChain: getMarksChain,
    getRangeIdByMark: getRangeIdByMark,
    setMarkRanges: setMarkRanges,
    removeMarkRanges: removeMarkRanges,
    getMarkRanges: getMarkRanges,
    markSelectedRange: markSelectedRange,
    findMarkFor: findMarkFor,
    on: _events.on,

    isActive: graphicMarker.isActive,
    graphicMarker: graphicMarker,
    hide: graphicMarker.hide,

    makeMarkDraggable: makeMarkDraggable
  }
}
