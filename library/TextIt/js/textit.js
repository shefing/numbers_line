// promise polyfill
(function (t) { function z() { for (var a = 0; a < g.length; a++) g[a][0](g[a][1]); g = []; m = !1 } function n(a, b) { g.push([a, b]); m || (m = !0, A(z, 0)) } function B(a, b) { function c(a) { p(b, a) } function h(a) { k(b, a) } try { a(c, h) } catch (d) { h(d) } } function u(a) { var b = a.owner, c = b.state_, b = b.data_, h = a[c]; a = a.then; if ("function" === typeof h) { c = l; try { b = h(b) } catch (d) { k(a, d) } } v(a, b) || (c === l && p(a, b), c === q && k(a, b)) } function v(a, b) { var c; try { if (a === b) throw new TypeError("A promises callback cannot return that same promise."); if (b && ("function" === typeof b || "object" === typeof b)) { var h = b.then; if ("function" === typeof h) return h.call(b, function (d) { c || (c = !0, b !== d ? p(a, d) : w(a, d)) }, function (b) { c || (c = !0, k(a, b)) }), !0 } } catch (d) { return c || k(a, d), !0 } return !1 } function p(a, b) { a !== b && v(a, b) || w(a, b) } function w(a, b) { a.state_ === r && (a.state_ = x, a.data_ = b, n(C, a)) } function k(a, b) { a.state_ === r && (a.state_ = x, a.data_ = b, n(D, a)) } function y(a) { var b = a.then_; a.then_ = void 0; for (a = 0; a < b.length; a++) u(b[a]) } function C(a) { a.state_ = l; y(a) } function D(a) { a.state_ = q; y(a) } function e(a) { if ("function" !== typeof a) throw new TypeError("Promise constructor takes a function argument"); if (!1 === this instanceof e) throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function."); this.then_ = []; B(a, this) } var f = t.Promise, s = f && "resolve" in f && "reject" in f && "all" in f && "race" in f && function () { var a; new f(function (b) { a = b }); return "function" === typeof a }(); "undefined" !== typeof exports && exports ? (exports.Promise = s ? f : e, exports.Polyfill = e) : "function" == typeof define && define.amd ? define(function () { return s ? f : e }) : s || (t.Promise = e); var r = "pending", x = "sealed", l = "fulfilled", q = "rejected", E = function () { }, A = "undefined" !== typeof setImmediate ? setImmediate : setTimeout, g = [], m; e.prototype = { constructor: e, state_: r, then_: null, data_: void 0, then: function (a, b) { var c = { owner: this, then: new this.constructor(E), fulfilled: a, rejected: b }; this.state_ === l || this.state_ === q ? n(u, c) : this.then_.push(c); return c.then }, "catch": function (a) { return this.then(null, a) } }; e.all = function (a) { if ("[object Array]" !== Object.prototype.toString.call(a)) throw new TypeError("You must pass an array to Promise.all()."); return new this(function (b, c) { function h(a) { e++; return function (c) { d[a] = c; --e || b(d) } } for (var d = [], e = 0, f = 0, g; f < a.length; f++) (g = a[f]) && "function" === typeof g.then ? g.then(h(f), c) : d[f] = g; e || b(d) }) }; e.race = function (a) { if ("[object Array]" !== Object.prototype.toString.call(a)) throw new TypeError("You must pass an array to Promise.race()."); return new this(function (b, c) { for (var e = 0, d; e < a.length; e++) (d = a[e]) && "function" === typeof d.then ? d.then(b, c) : b(d) }) }; e.resolve = function (a) { return a && "object" === typeof a && a.constructor === this ? a : new this(function (b) { b(a) }) }; e.reject = function (a) { return new this(function (b, c) { c(a) }) } })("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this);

// require code
(function require() {
  window.Textit = window.Textit || {};
  window.textit_path = window.textit_path || '.';
  var base_libraries = [
    'dist/textit.util.js'
  ]
  var libraries = [
    'dist/promise.js',
    'dist/clipper/clipper.js',
    'dist/Tween.js',
    'dist/MorphSVG/MorphSVGPlugin.min.js',
    'dist/TweenMax/TweenLite.min.js',
    'dist/domExtensions.js',
    'dist/TRanges.js',
    'dist/matter/matter.min.js',
    'dist/ToolChain.js',
    'dist/textit.mouse.js',
    'dist/textit.menu.js',
    'dist/textit.draggedMarkedText.js',
    'dist/textit.draggables.js',
    'dist/textit.dragDropManager.js',
    'dist/textit.graphicMarker.js',
    'dist/textit.articleMarker.js',
    'dist/textit.narrator.js',
    'dist/textit.article.js',
    'dist/textit.questions.js',
    'dist/textit.components.js',
    'dist/textit.elements.js',

    'i18n/lang.en.js',
    'i18n/lang.he.js',
    'i18n/lang.ar.js',

    'dist/textit.external.js',
    'dist/textit.xapi.js'
  ]

  Textit.path = function (relative) {
    return window.textit_path + '/' + relative;
  }
  var script;
  var promises = [];
  for (var i = 0; i < base_libraries.length; i++) {
    promises.push(importScript(base_libraries[i]));
  }
  Promise.all(promises).then(function () {
    promises = [];
    for (var i = 0; i < libraries.length; i++) promises.push(importScript(libraries[i]));
    return Promise.all(promises)
  }).then(function () {
    window.Textit.ScriptLoaded = true;
    if (window.Textit.onScriptLoad) window.Textit.onScriptLoad();
  })
  function importScript(src) {
    script = document.createElement('script');
    script.src = Textit.path(src);
    document.head.appendChild(script);
    return new Promise(function(resolve){
      script.onload = function () { resolve() }
    })
  }
  

  // animation loop for tween js...
  function animationUpdateLoop() {
    requestAnimationFrame(animationUpdateLoop);
    TWEEN.update();
  }
  window.addEventListener('load', function () {
    setTimeout(animationUpdateLoop, 1000);
  });

  window.createTextit = function (options) {
    var container = options.container;
    if (!container) {
      container = document.createElement('div');
    }
    Textit.util.addClass(container, 'textit-container');

    var article = new Textit.Article();
    article.loadFromXML(options.xml, options.embed);

    if (article.embed) {
      var embedmenu = new Textit.EmbedMenu();
      container.appendChild(embedmenu.create(article));
    } else {
      document.body.className = 'textit--book-skin';
      var menu = new Textit.CircleMenu()
      , drawer = new Textit.Drawer();
      menu.setDrawer(drawer);
      drawer.setMenu(menu);
      container.appendChild(menu.create(article));
      container.appendChild(drawer.create(article));
    }

    container.appendChild(article.dom);
    setTimeout(function () {
      article.setOrigin(false);
    }, 100);
    return { container: container, article: article };
  }
})()