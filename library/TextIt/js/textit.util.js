"use strict";
var Textit = Textit || {};

Textit.util = {
  //--------------------------------------------------
  createHtml: function (options) {
    var frag = document.createElement('div');
    frag.innerHTML = options.html;
    var el = frag.firstChild;
    if (options.parent)
      options.parent.appendChild(el);

    if (options.content)
      if (typeof options.content == 'string')
        el.innerHTML = options.content;
      else
        el.appendChild(options.content);
    else if (options.textContent)
      el.textContent = options.textContent;

    return el;
  },
  //--------------------------------------------------
  setStyleWithPrefix: function (el, attribute, value) {
    var vendors = ['', 'Webkit', 'Moz', 'ms'];
    for (var i = 0; i < vendors.length; i++) {
      if (typeof el.style[attribute + vendors[i]] != 'undefined') {
        el.style[attribute + vendors[i]] = value;
        return true;
      }
    }
    return false;
  },
  //--------------------------------------------------
  escape: function (text) {
    return text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  },
  //--------------------------------------------------
  EventEmitter: function () {
    var listeners = [];
    return {
      on: function (eventName, callback) {
        if (!listeners[eventName]) {
          listeners[eventName] = [];
        }
        listeners[eventName].push(callback);
      },
      emit: function (eventName, params) {
        if (typeof listeners[eventName] == 'undefined') {
          return;
        }
        for (var i = 0, len = listeners[eventName].length; i < len; i++) {
          listeners[eventName][i](params);
        }
      }
    }
  },
  //--------------------------------------------------
  bindEvent: function (elems, eventName, func) {
    if (typeof (elems.length) == "undefined") {
      elems.addEventListener(eventName, func);
    }
    else {
      for (var i = 0, len = elems.length; i < len; i++) {
        elems[i].addEventListener(eventName, func);
      }
    }
  },
  //--------------------------------------------------
  ajaxLoad: function (url, func, errorCallback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200)
          func(xmlhttp.responseText);
        else if (errorCallback) errorCallback();
      }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  },
  //--------------------------------------------------
  ajaxLoadBlob: function (url, contentType, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function () {
      var blob = new Blob([xmlhttp.response], { type: contentType });
      callback(blob);
    }
    xmlhttp.open('GET', url, true);
    xmlhttp.setRequestHeader('Content-Type', contentType);
    xmlhttp.responseType = 'blob';

    xmlhttp.send();
  },
  //--------------------------------------------------
  addClass: function (elem, className) {
    elem.classList.add(className);
  },
  //--------------------------------------------------
  removeClass: function (elem, className) {
    elem.classList.remove(className);
  },
  //--------------------------------------------------
  hasClass: function (elem, className) {
    return elem.classList.contains(className);
  },
  //--------------------------------------------------
  onClick: function (elems, func) {
    Textit.util.bindEvent(elems, "click", func);
  },
  //--------------------------------------------------
  get: function (selector) {
    return document.querySelector(selector);
  },
  //--------------------------------------------------
  getAll: function (selector) {
    return document.querySelectorAll(selector);
  },
  //--------------------------------------------------
  setElementRect: function (element, rect) {
    var style = element.style;
    style.top = rect.top + "px";
    style.left = rect.left + "px";
    style.width = rect.width + "px";
    style.height = rect.height + "px";
  },
  //--------------------------------------------------
  getBoundingRect: function (element) {
    var r = element.getBoundingClientRect();
    return { top: r.top, left: r.left, right: r.right, bottom: r.bottom, width: r.width, height: r.height };
  },
  //--------------------------------------------------
  duplicateRect: function (rect) {
    return { top: rect.top, left: rect.left, right: rect.right, bottom: rect.bottom, width: rect.width, height: rect.height };
  },
  //--------------------------------------------------
  strip: function (text) {
    var tempDiv = document.createElement('div');
    tempDiv.innerHTML = text;
    return tempDiv.textContent;
  },
  //--------------------------------------------------
  moveElementByDiff: function (element, diffX, diffY) {
    var style = element.style;
    style.left = (parseInt(style.left.replace("px", "")) + diffX) + "px";
    style.top = (parseInt(style.top.replace("px", "")) + diffY) + "px";
  },
  //--------------------------------------------------
  onDomReady: function (func) {
    document.addEventListener("DOMContentLoaded", func);
  },
  //--------------------------------------------------
  getRangeNonZeroClientRects: function (range) {
    var rects = [];
    var clientRects = range.getClientRects();
    for (var i = 0; i < clientRects.length; i++) {
      var r = clientRects[i];
      if (r.width > 0) {
        rects.push({
          left: r.left,
          top: r.top,
          width: r.width,
          height: r.height,
          bottom: r.bottom,
          right: r.right,
        })
      }
    }
    return rects;
  },
  //--------------------------------------------------
  fitsSelector: function (el, selectorString) {
    var className, tagName;
    var s = selectorString.split('.');
    tagName = s[0].toUpperCase();
    if (s.length > 1)
      className = s[1];

    return el.nodeType == Node.ELEMENT_NODE && (tagName == '' || el.tagName == tagName) &&
      (className == null || el.classList.contains(className));
  },
  //--------------------------------------------------
  getQuadraticBezierXYatPercent: function (startPt, controlPt, endPt, percent) {
    var x = Math.pow(1 - percent, 2) * startPt.x + 2 * (1 - percent) * percent * controlPt.x + Math.pow(percent, 2) * endPt.x;
    var y = Math.pow(1 - percent, 2) * startPt.y + 2 * (1 - percent) * percent * controlPt.y + Math.pow(percent, 2) * endPt.y;
    return ({ x: x, y: y });
  },
  //--------------------------------------------------
  /**
   * A linear interpolator for hexadecimal colors
   * @param {String} a
   * @param {String} b
   * @param {Number} amount
   * @example
   * // returns #7F7F7F
   * lerpColor('#000000', '#ffffff', 0.5)
   * @returns {String}
   */
  lerpColor: function (a, b, amount) {
    var ah = parseInt(a.replace(/#/g, ''), 16),
        ar = ah >> 16,
        ag = ah >> 8 & 0xff,
        ab = ah & 0xff,
        bh = parseInt(b.replace(/#/g, ''), 16),
        br = bh >> 16,
        bg = bh >> 8 & 0xff,
        bb = bh & 0xff,
        rr = ar + amount * (br - ar),
        rg = ag + amount * (bg - ag),
        rb = ab + amount * (bb - ab);

    return '#' + ((1 << 24) + (rr << 16) + (rg << 8) + rb | 0).toString(16).slice(1);
  },
  //--------------------------------------------------
  extend: function (objA, objB) {
    var extended = {};
    for (var key in objA)
      extended[key] = objA[key];

    for (var key in objB)
      extended[key] = objB[key];

    return extended;
  },
  //--------------------------------------------------
  getQueryParameter: function (name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  },
  compareArrays: function (array1, array2) {
    if (array1.length != array2.length) return false;
    for (var i = 0, len = array1.length; i < len; i++) {
      if (array1[i] !== array2[i])
        return false;
    }
    return true;
  },
  //--------------------------------------------------
  scrollTop: function () {
    return Textit.util.isIE() ? ((document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop) : window.scrollY;
  },
  //--------------------------------------------------
  isIE: function () {
    if (Textit.util.ie === undefined) {
      Textit.util.ie = /rv:/i.test(navigator.userAgent) || /msie/i.test(navigator.userAgent) || /edge/i.test(navigator.userAgent);
    }
    return Textit.util.ie;
  },
  findScrollParent: function (element) {
    while (element != document.body) {
      if (window.getComputedStyle(element, null).getPropertyValue('overflow-y') === 'scroll')
        break;
      element = element.parentNode;
    }
    if (element == document.body)
      return window;
    return element;
  },
  //--------------------------------------------------
  math: {
    intersectRect: function (r1, r2) {
      return !(r2.left > r1.right ||
               r2.right < r1.left ||
               r2.top > r1.bottom ||
               r2.bottom < r1.top);
    },
    average: function (array) {
      var sum = 0;
      for (var i = 0; i < array.length; i++) sum += array[i];
      return sum / array.length;
    },
    randominsert: function (array, item) {
      var index = Math.floor(array.length * Math.random());
      array.splice(index, 0, item);
    }
  },
  oop: {
    inherits: function (ctor, superCtor) {
      ctor.super = superCtor;
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        },

      });
      ctor.prototype._super = superCtor.prototype;
    },
    get: function (object, property, getfunc) {
      Object.defineProperty(object, property, { get: function () { return getfunc.call(object) } });
    },
    set: function (object, property, setfunc) {
      Object.defineProperty(object, property, { set: function () { return setfunc.call(object) } });
    }
  }
}
//--------------------------------------------------



/// polyfill
if (!Array.prototype.includes) {
  Array.prototype.includes = function (searchElement /*, fromIndex*/) {
    'use strict';
    if (this == null) {
      throw new TypeError('Array.prototype.includes called on null or undefined');
    }

    var O = Object(this);
    var len = parseInt(O.length, 10) || 0;
    if (len === 0) {
      return false;
    }
    var n = parseInt(arguments[1], 10) || 0;
    var k;
    if (n >= 0) {
      k = n;
    } else {
      k = len + n;
      if (k < 0) { k = 0; }
    }
    var currentElement;
    while (k < len) {
      currentElement = O[k];
      if (searchElement === currentElement ||
         (searchElement !== searchElement && currentElement !== currentElement)) { // NaN !== NaN
        return true;
      }
      k++;
    }
    return false;
  };
}