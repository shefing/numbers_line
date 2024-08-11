"use strict";

var Textit = Textit || {};

Textit.graphicMarker = function (article) {
  var _svg = {
    element: null,
    defs: null,
    mask: null,
    backRect: null,
  };
  var _fillColor = "transparent";
  var _strokeColor; // = "rgba(100,100,0,0.3)";
  var _markSections = [];
  var _lineRects = [];
  var _cornerRadius = 10;
  var _shiftDown = 3;
  var _fromWord = -1;
  var _toWord = -1;

  var _sectionRootTypes = ["P", "ARTICLE", "LI"];
  var _wordSidePadding = 3;
  var _selectionIndex = 0;

  //-------------------------------------------------------
  function startNew(strokeColor) {
    _strokeColor = strokeColor;
    _svg.element = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    //_svg.element.setAttribute('width', window.innerWidth);
    _svg.element.setAttribute('width', '100%');
    _svg.element.setAttribute('height', article.dom.clientHeight);
    _svg.element.setAttribute('class', "graphicMarker");
    if (!Textit.util.isIE()) {
      _svg.defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
      _svg.element.appendChild(_svg.defs);
      _svg.mask = document.createElementNS("http://www.w3.org/2000/svg", "mask");
      _svg.mask.setAttribute("id", "mask" + (++_selectionIndex));
      _svg.defs.appendChild(_svg.mask);
      var maskRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      var r = article.dom.getClientRects()[0];
      maskRect.setAttribute("x", 0);
      maskRect.setAttribute("y", "0");
      maskRect.setAttribute("width", r.width);
      maskRect.setAttribute("height", "100%");
      maskRect.setAttribute("fill", "white");
      _svg.mask.appendChild(maskRect);
      _svg.backRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      _svg.backRect.setAttribute("x", "0");
      _svg.backRect.setAttribute("y", "0");
      _svg.backRect.setAttribute("width", "100%");
      _svg.backRect.setAttribute("height", "100%");
      _svg.backRect.setAttribute("fill", "white");
      _svg.backRect.setAttribute("mask", "url(#mask" + _selectionIndex + ")");
      _svg.backRect.setAttribute("opacity", "0");
      _svg.element.appendChild(_svg.backRect);
    }

    article.dom.appendChild(_svg.element);
    _fromWord = -1;
    _toWord = -1;

    setBackgroundOpacity(true);
  }
  //-------------------------------------------------------
  function hide(animate, callback) {
    var doHide = function() {
      if (_svg.element != null) {
        let svgElement = _svg.element;
        if (svgElement) {
          tween(1, 0, 0.5, function(opacity) { svgElement.style.opacity = opacity; }, function() { svgElement.$remove(); });
          _svg.element = null;
        }
        var sections = document.querySelectorAll('[data-mark-section]');
        for (var i = 0; i < sections.length; i++) {
          sections[i].removeAttribute("data-mark-section");
        }

        _markSections = [];
        setBackgroundOpacity(false);
      }
      if (callback)
        callback();
    };
    if (animate) {
      makeAllSelectionsSquare(doHide);
    } else {
      doHide();
    }
  }
  //-------------------------------------------------------
  // darken the background
  function setBackgroundOpacity(darken, callback) {
    if (Textit.util.isIE()) {
      if (callback != undefined)
        callback();
      return;
    }
    var backRect = _svg.backRect;
    var from = parseFloat(backRect.getAttribute("opacity"));
    var to = darken ? 0.7 : 0;
    if (to != from) {
      tween(from, to, 0.5, function(opacity) { backRect.setAttribute("opacity", opacity); }, callback)
    }
  }
  //-------------------------------------------------------
  function tween(fromValue, toValue, duration, onUpdate, onComplete) {
    var value = { num: fromValue };
    var tween = TweenLite.to(value, duration, {
      num: toValue,
      onUpdate: function() { onUpdate(value.num); },
      onComplete: function () { if (onComplete) onComplete(); }
    });
    return tween;
  }
  //-------------------------------------------------------
  function ptStr(point) {
    return point.X + " " + point.Y;
  }
  //-------------------------------------------------------
  function roundPt(pt) {
    pt.X = Math.round(pt.X);
    pt.Y = Math.round(pt.Y);
    return pt;
  }
  //-------------------------------------------------------
  function roundPolyPoints(poly) {
    for (var i = 0; i < poly.length; i++) {
      roundPt(poly[i]);
    }
  }
  //-------------------------------------------------------
  function getLineAndCornerCommand(p1, p2, p3, setFirstPoint, cornerRadius) {
    var cmd = "";
    var cornerEnd;
    var sweep = true;
    var radiusX = cornerRadius;
    var radiusY = cornerRadius;
    if (p1.X == p2.X) {
      radiusX = Math.min(radiusX, Math.abs(p3.X - p2.X) / 2);
      radiusY = Math.min(radiusY, Math.abs(p2.Y - p1.Y) / 2);
      if (setFirstPoint)
        if (p2.Y > p1.Y)
          cmd = "M " + p1.X + " " + (p1.Y + radiusY) + " ";
        else
          cmd = "M " + p1.X + " " + (p1.Y - radiusY) + " ";
      if (p2.Y > p1.Y) {
        cmd += "V " + (p2.Y - radiusY);
        sweep = (p3.X < p1.X);
      }
      else {
        cmd += "V " + (p2.Y + radiusY);
        sweep = (p3.X > p1.X);
      }
      if (p3.X > p1.X)
        cornerEnd = { X: p2.X + radiusX - 1, Y: p2.Y };
      else
        cornerEnd = { X: p2.X - radiusX + 1, Y: p2.Y };
    } else {
      radiusX = Math.min(radiusX, Math.abs(p2.X - p1.X) / 2);
      radiusY = Math.min(radiusY, Math.abs(p3.Y - p2.Y) / 2);
      if (setFirstPoint)
        if (p2.X > p1.X)
          cmd = "M " + (p1.X + radiusX) + " " + p1.Y + " ";
        else
          cmd = "M " + (p1.X - radiusX) + " " + p1.Y + " ";
      if (p2.X > p1.X) {
        cmd += "H " + (p2.X - radiusX);
        sweep = (p3.Y > p1.Y);
      }
      else {
        cmd += "H " + (p2.X + radiusX);
        sweep = (p3.Y < p1.Y);
      }
      if (p3.Y > p1.Y)
        cornerEnd = { X: p2.X, Y: p2.Y + radiusY - 1 };
      else
        cornerEnd = { X: p2.X, Y: p2.Y - radiusY + 1 };
    }
    cmd += " A " + radiusX + " " + radiusY + " 0 0 " + (sweep ? "1" : "0") + " " + cornerEnd.X + " " + cornerEnd.Y;

    return cmd;
  }
  //-------------------------------------------------------
  function ploygonsToSvgPath(polys, cornerRadius) {
    var svgPath = "";
    for (var p = 0; p < polys.length; p++) {
      var poly = polys[p];

      if (poly.length < 4) {
        continue;
      }
      roundPolyPoints(poly)

      for (var i = 0; i < poly.length; i++) {
        var p1 = poly[i];
        var p2 = poly[(i + 1) % poly.length];
        var p3 = poly[(i + 2) % poly.length];
        var setFirstPoint = (i == 0);
        svgPath += getLineAndCornerCommand(p1, p2, p3, setFirstPoint, cornerRadius) + " ";
      }
      svgPath += "Z "
    }
    return svgPath;
  }
  //-------------------------------------------------------
  function rectsToPaths(rects) {
    var paths = []
    for (var i = 0; i < rects.length; i++) {
      var r = rects[i];
      paths.push([
        { X: r.left, Y: r.top },
        { X: r.right, Y: r.top },
        { X: r.right, Y: r.bottom },
        { X: r.left, Y: r.bottom }
      ])
    }
    return paths;
  }
  //-------------------------------------------------------
  function rectsToUnionPolys(rects) {
    var clipper = new ClipperLib.Clipper();
    var paths = rectsToPaths(rects);
    clipper.AddPaths(paths, ClipperLib.PolyType.ptClip, true);
    var unionPolys = new ClipperLib.Paths();
    clipper.Execute(ClipperLib.ClipType.ctUnion, unionPolys, ClipperLib.PolyFillType.pftPositive, ClipperLib.PolyFillType.pftPositive);
    return unionPolys;
  }
  //-------------------------------------------------------
  function getBoundingRects(node) {
    var rects = [];
    var clientRects;

    if (!node.$isText()) {
      clientRects = node.getClientRects();
    } else {
      var range = document.createRange();
      range.setStart(node, 0);
      range.setEnd(node, node.textContent.length);
      clientRects = range.getClientRects();
    }
    var articleRect = article.dom.getBoundingClientRect();
    for (var i = 0; i < clientRects.length; i++) {
      var r = clientRects[i];
      if (r.width > 0 && r.height > 0) {
        rects.push({
          top: Math.round(r.top - articleRect.top),
          left: Math.round(r.left - articleRect.left) - _wordSidePadding,
          bottom: Math.round(r.bottom - articleRect.top),
          right: Math.round(r.right - articleRect.left) + _wordSidePadding,
          width: Math.round(r.width) + 2 * _wordSidePadding,
          height: Math.round(r.height)
        });
      }
    }

    return rects;
  }
  //-------------------------------------------------------
  function rectToStr(rect) {
    return rect.width + "," + rect.height + "," + rect.left + "," + rect.top;
  }
  //-------------------------------------------------------
  function updateSvgPath(section, polys, animate) {
    animate = animate && !Textit.util.isIE();
    var pathCmd = ploygonsToSvgPath(polys, _cornerRadius);
    if (section.tweenAnim) {
      section.tweenAnim.kill();
    }
    if (animate == false) {
      section.svgPath.setAttribute("d", pathCmd);
    }
    else
      section.tweenAnim = TweenLite.to(section.svgPath, 0.2, { morphSVG: { shape: pathCmd } });
  }
  //-------------------------------------------------------
  function makeAllSelectionsSquare(callback) {
    var promises = [];
    for (var secIndex = 0; secIndex < _markSections.length; secIndex++) {
      let section = _markSections[secIndex];
      if (!section || !section.svgPath) {
        continue;
      }
      let promise = new Promise(function(resolve){
        if (section.tweenAnim) {
          section.tweenAnim.kill();
        }
        section.tweenAnim = tween(_cornerRadius, 0, 0.2, function(radius){
          section.svgPath.setAttribute("d", ploygonsToSvgPath(section.polygons, radius));
        }, resolve);

      });
      promises.push(promise);
    }

    Promise.all(promises).then(callback);
  }
  //-------------------------------------------------------
  function updateSvgPathToEmpty(section, collapseRect, callback) {
    var pathCmd = "m " + collapseRect.right + " " + collapseRect.top + " h 0 v " + collapseRect.height + " h 0 Z";
    if (section.tweenAnim) {
      section.tweenAnim.kill();
    }
    section.tweenAnim = TweenLite.to(section.svgPath, 0.2, {
      morphSVG: { shape: pathCmd },
      onComplete: callback
    });
  }
  //-------------------------------------------------------
  function addRectsToSection(sectionRoot, rects) {
    var secIndex = sectionRoot.dataset.markSection;
    if (secIndex == undefined) {
      secIndex = _markSections.length;
      sectionRoot.dataset.markSection = secIndex;
      _markSections.push({
        index: secIndex,
        rectsLookup: {},
        rects: [],
        svgPath: null,
      })
    }
    var section = _markSections[secIndex];
    for (var i = 0; i < rects.length; i++) {
      section.rects.push(rects[i]);
      var rectStr = rectToStr(rects[i]);
      if (!section.rectsLookup.hasOwnProperty(rectStr)) {
        section.rectsLookup[rectStr] = "new";
      } else {
        section.rectsLookup[rectStr] = "matched";
      }
    }
  }
  //-------------------------------------------------------
  function mergeElementRectsIntoLines(rects) {
    var lineRects = [];
    var threshold = 5;
    for (var i = 0; i < rects.length; i++) {
      var l = (lineRects.length > 0) ? lineRects[lineRects.length - 1] : null;
      var r = rects[i];
      if (l != null && l.bottom >= r.top + threshold && l.top <= r.bottom - threshold) {
        l.top = Math.min(l.top, r.top);
        l.left = Math.min(l.left, r.left);
        l.bottom = Math.max(l.bottom, r.bottom);
        l.right = Math.max(l.right, r.right);
        l.width = l.right - l.left + 1;
        l.height = l.bottom - l.top + 1;
      } else {
        lineRects.push(r);
      }
    }
    return lineRects;
  }
  //-------------------------------------------------------
  function createSectionPathElement(section) {
    var rand = Math.random().toString();
    var pathName = "path" + section.index + "_" + rand.substring(rand.length - 4);
    section.svgPath = document.createElementNS("http://www.w3.org/2000/svg", 'path');
    var r = section.rects[0];
    section.svgPath.setAttribute("d", "m " + r.right + " " + r.top + " h 0 v " + r.height + " h 0 Z");
    section.svgPath.setAttribute("id", pathName);
    var pathElement = section.svgPath;
    if (!Textit.util.isIE()) {
      _svg.defs.appendChild(section.svgPath);
      var useHtml = '<use id="use_' + pathName + '" xlink:href="#' + pathName + '"></use>';
      _svg.element.insertAdjacentHTML('beforeend', useHtml)
      section.svgUse = _svg.element.querySelector("#use_" + pathName);
      pathElement = section.svgUse;
    } else {
      _svg.element.appendChild(section.svgPath);
    }
    pathElement.setAttribute("stroke", _strokeColor);
    pathElement.setAttribute("stroke-width", "2");
    pathElement.setAttribute("fill", _fillColor);
    pathElement.setAttribute("opacity", "1");
    pathElement.setAttribute("stroke-dasharray", "5, 5");
    if (!Textit.util.isIE()) {
      useHtml = '<use id="useMask_' + pathName + '" xlink:href="#' + pathName + '"></use>';
      _svg.mask.insertAdjacentHTML('beforeend', useHtml)
      section.svgUseMask = _svg.element.querySelector("#useMask_" + pathName);
      section.svgUseMask.setAttribute("fill", "black");
    }
    if (!Textit.util.isIE()) {
      // "endless" animation of the outline dashes
      tween(0, 20000, 1300, function (value) { pathElement.setAttribute("stroke-dashoffset", value); })
    }
  }
  //-------------------------------------------------------
  function updateMarkersOfSections(animate) {
    for (var secIndex = 0; secIndex < _markSections.length; secIndex++) {
      let section = _markSections[secIndex];
      var changed = false;
      for (var prop in section.rectsLookup) {
        changed = changed || (section.rectsLookup[prop] !== "matched");
        if (section.rectsLookup[prop] == "unmatched") {
          delete section.rectsLookup[prop];
        } else {
          section.rectsLookup[prop] = "unmatched";
        }
      }
      if (!changed) {
        section.rects = [];
        continue;
      }
      if (section.rects.length == 0) {
        let svgPath = section.svgPath;
        let svgUse = section.svgUse;
        let svgUseMark = section.svgUseMask;
        updateSvgPathToEmpty(section, section.startLine, function () {
          if (!Textit.util.isIE()) {
            svgUse.$remove();
            svgUseMark.$remove();
          }
          svgPath.$remove();
        });
        _markSections[secIndex] = {
          index: secIndex,
          rectsLookup: {},
          rects: [],
          svgPath: null,
        };
        continue;
      }
      if (section.svgPath == null) {
        createSectionPathElement(section);
      }

      var lineRects = mergeElementRectsIntoLines(section.rects);
      section.polygons = rectsToUnionPolys(lineRects);
      section.startLine = lineRects[0];
      updateSvgPath(section, section.polygons, animate);
      section.rects = [];
    }
  }
  //-------------------------------------------------------
  function getNodeSectionRoot(node) {
    while (!node.$ofType(_sectionRootTypes)) {
      node = node.parentNode;
    }
    return node;
  }
  //-------------------------------------------------------
  function updateWordRange(firstWordIndex, lastWordIndex, animate) {
    if (firstWordIndex === undefined || firstWordIndex == null || firstWordIndex == -1) {
      firstWordIndex = lastWordIndex = -1;
    }
    if (firstWordIndex == _fromWord && lastWordIndex == _toWord) {
      return;
    }

    _fromWord = firstWordIndex;
    _toWord = lastWordIndex;
    if (firstWordIndex == -1) {
      updateMarkersOfSections();
      return;
    }

    var avoidTypes = ["HR", "IMG", "ASIDE", "IFRAME", "FIGURE"];
    var avoidClasses = ["question", "placeholder", "hotword__translation", "article__note"];
    var firstNode = article.words[firstWordIndex].dom
    var lastNode = article.words[lastWordIndex].dom
    var sectionRoot = getNodeSectionRoot(firstNode);
    var treeWalker = document.createTreeWalker(article.dom, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, null, false);
    treeWalker.currentNode = firstNode;
    do {
      var node = treeWalker.currentNode;
      if (node.$ofType(_sectionRootTypes)) {
        sectionRoot = node;
      }
      if (node.$hasClass(avoidClasses) || node.$ofType(avoidTypes)) {
        if (!treeWalker.nextSibling()) {
          treeWalker.currentNode = treeWalker.currentNode.$nextTreeNode();
        }
        continue;
      }
      if (!node.$contains(lastNode, false) && node.$isMarkable()) {
        var rects = getBoundingRects(node);
        addRectsToSection(sectionRoot, rects);
        if (!treeWalker.nextSibling()) {
          treeWalker.nextNode();
        }
      } else {
        treeWalker.nextNode();
      }
    } while (node != lastNode)

    updateMarkersOfSections(animate);
  }
  //-------------------------------------------------------
  return {
    startNew: startNew,
    hide: hide,
    removeDarkBackground: function() { setBackgroundOpacity(false) },
    updateWordRange: updateWordRange,
    isActive: function () { return _svg.element != null; }
  }
}
