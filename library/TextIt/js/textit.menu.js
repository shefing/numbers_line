Textit.CircleMenu = function () {
  var _el;
  var _open = false;
  var _runningMenuAction = null;
  var _article;
  var _drawer;
  /**
   * @public
   * creates the dom of the menu
  */
  function create(article) {
    _article = article;
    _el = document.createElement('aside');
    _el.className = 'menu';
    _el.innerHTML =
          '<a href="#" class="menu-item" data-pos="selected" data-menu-action="close" title="עבודה"></a>' +
          (article.narrator != null ? '<a href="#" class="menu-item" data-pos="1" data-menu-action="narrator" title="הקראה"></a>' : '') +
          '<a href="#" class="menu-item" data-pos="2" data-menu-action="view" title="תצוגה"></a>' +
          '<a href="#" class="menu-item" data-pos="3" data-menu-action="origin" title="מקור"></a>' +
          '<a href="#" class="menu-item" data-pos="4" data-menu-action="help" title="עזרה"></a>' +
          '<a href="#" class="menu-item" data-pos="5" data-menu-action="drop" title="סימונים"></a>';
    init();
    return _el;
  }

  /**
   * @public
   * Sets the drawer
  */
  function setDrawer(drawer) {
    _drawer = drawer;
  }

  /**
   * @private
   * Inits the menu
   * should run when the dom is ready
   */
  function init() {
    //_el = document.querySelector('.menu');
    var menuItems = _el.querySelectorAll('a');
    for (var i = 0, len = menuItems.length; i < len; i++)
      if (Textit.strings)
        menuItems[i].setAttribute('title', Textit.strings[_article.lang].ui['menu_title_' + menuItems[i].dataset.menuAction])
    bind();
  }

  /**
  * @private
  * record analytics
  */
  function record(action) {
    _article.record('menu', { object: { 'type': 'menu' }, action: action })
  }

  /**
   * @private
   * Bind the mosue events for the menu
   */
  function bind() {
    _el.addEventListener('click', click);
    document.addEventListener('mouseup', function (e) {
      if (e.target == document.body)
        close();
    })
    _article.on('textmode-change', function () {
      if (_runningMenuAction == 'origin') {
        close();
      }
    })
  }

  /**
  * @private
  * Called when the mouse is clicked
  */
  function click(event) {
    var target = event.target;
    while (target != null && target.parentNode != _el) target = target.parentNode;
    if (event.preventDefault) event.preventDefault();
    if (event.stopPropagation) event.stopPropagation();
    if (target.dataset.pos == "selected") {
      if (!_runningMenuAction || _runningMenuAction == 'close' || _runningMenuAction == 'origin') {
        if (!_open)
          Textit.XAPI.sendEvent({ verb: 'pressed', object_id: 'textIt_toolbar_originalOn', object_name: 'originalOn' });
        else
          Textit.XAPI.sendEvent({ verb: 'pressed', object_id: 'textIt_toolbar_originalOff', object_name: 'originalOff' });
        setOpen(!_open); // toggle
      }
      else {
        close();
      }
    }
    else {
      setOpen(false);
      var curSelected = _el.querySelector("a[data-pos=\"selected\"]");
      if (curSelected != target) {
        setSelected(target.dataset.menuAction);
        applyAction(target.dataset.menuAction);
      }
    }
  }
  /**
  * @private
  * close
  */
  function close() {
    // make sure that when we close the menu, we reach the last closed mode (origin / work modes)
    applyAction(_article.isOrigin ? 'origin' : 'close');
    setSelected(_article.isOrigin ? 'origin' : 'close');
    setOpen(false);
  }
  /**
  * @private
  * stops a menu action
  */
  function stopAction(menuAction) {
    if (_runningMenuAction == 'narrator') {
      _article.setOrigin(false);
      _article.narrator.stopNarration();
    }
  }
  /**
  * @private
  * apply the action chosen from the menu, 
  * either preforms an action or opens a subment in the drawer, or both
  */
  function applyAction(menuAction) {
    stopAction(_runningMenuAction); // stop the last action
    if (menuAction == 'close') {
      switch (_runningMenuAction) {
        case 'view':
          Textit.XAPI.sendEvent({ verb: 'pressed', object_id: 'textIt_toolbar_displayOff', object_name: 'displayOff' });
          break;
        case 'narrator':
          Textit.XAPI.sendEvent({ verb: 'pressed', object_id: 'textIt_toolbar_readingOff', object_name: 'readingOff' });
          break;
      }
    }


    switch (menuAction) {
      case 'close':
        _article.setOrigin(false);
        _drawer.setOpen(false);
        break;
      case 'narrator':
        _drawer.setEffectOrigin(0, _el.offsetTop);
        _drawer.display('narration-options', function () {
          _article.narrator.startNarration();
        });
        Textit.XAPI.sendEvent({ verb: 'pressed', object_id: 'textIt_toolbar_readingOn', object_name: 'readingOn' });
        break;
      case 'view':
        _drawer.setEffectOrigin(0, _el.offsetTop);
        _drawer.display('view-options', function () {
        });
        Textit.XAPI.sendEvent({ verb: 'pressed', object_id: 'textIt_toolbar_displayOn', objectname: 'displayOn' });
        break;
      case 'drop':
        _drawer.setEffectOrigin(0, _el.offsetTop);
        _drawer.display('drop-areas', function () {

        });
        break;
      case 'origin':
        _drawer.setOpen(false);
        _article.setOrigin(true);
        break;
      case 'help':
        _drawer.setOpen(false);
        setTimeout(function () {
          _article.WalkMe(true);
        }, 600)
        setTimeout(function () {
          close();
        }, 500)

        /*document.querySelector('.help').style.display = 'block';
        document.querySelector('.help').addEventListener('click', function () {
          document.querySelector('.help').style.display = 'none';
          close();
        })*/
        break;
    }
    _runningMenuAction = menuAction;
  }

  /**
  * Set and get which menu button is open
  */
  function setSelected(menuName) {
    record({ 'interaction': 'click', menu: menuName });
    var curSelected = _el.querySelector("a[data-pos=\"selected\"]");
    var target = _el.querySelector("a[data-menu-action=\"" + menuName + "\"]");
    if (curSelected != target) {
      curSelected.dataset.pos = target.dataset.pos; // replace positions with the new seleceted
      target.dataset.pos = 'selected';
    }
  }
  function getSelected() {
    return _el.querySelector("a[data-pos=\"selected\"]").dataset.menuAction;
  }
  /**
  * Set whether the menu is open
  */
  function setOpen(isOpen) {
    if (_open != isOpen)
      record({ 'interaction': isOpen ? 'open' : 'close' });
    _open = isOpen;
    if (isOpen)
      Textit.util.addClass(_el, 'open');
    else
      Textit.util.removeClass(_el, 'open');
  }

  // bind dom ready to init
  // Textit.util.onDomReady(init);

  return {
    create: create,
    setOpen: setOpen,
    el: function () { return _el; },
    setSelected: setSelected,
    getSelected: getSelected,
    close: close,
    setDrawer: setDrawer,
    getDrawer: function () { return _drawer; }
  }
}

Textit.Drawer = function () {
  var self;
  var TRNASITION_THRESHOLD = 30, TRANSITION_DURATION = 500 /* ms */;
  var _el;
  var _elWidth;
  var _closeBtn;
  var _bgEl;
  var _elPosOffset = 0;
  var _open = false;
  var _animating = false;
  var _openSection;
  var _openSectionName;
  var _sections;
  var _zindex = 1;
  var _dir = 'rtl';
  var _menu;
  var _article;
  var _drawer_submenus;
  /**
  *   @public
  *   Create
  */
  function create(article) {
    _article = article;
    _el = document.createElement('aside');
    _el.className = 'drawer';
    _el.innerHTML =
    '<div class="drawer__bg"></div>' +
    '<button class="drawer__btn-close">&#x2715;</button>' +
    '<section class="drawer__drops-areas" data-menu-name="drop-areas">' +
      '<ul class="drawer__actions">' +
        '<li class="drawer__action" data-action="like"></li>' +
        '<li class="drawer__action" data-action="trash"></li>' +
      '</ul>' +
    '</section>' +
    '<section class="drawer__view-options" data-menu-name="view-options">' +
      '<ul>' +
        '<li data-view-style="0"></li>' +
        '<li data-view-style="1"></li>' +
        '<li data-view-style="2"></li>' +
        '<li data-view-style="3"></li>' +
        '<li data-view-style="4"></li>' +
      '</ul>' +
    '</section>' +
    '<section class="drawer__narration-options" data-menu-name="narration-options">' +
      '<ul>' +
        '<li>' +
          '<div class="dial" data-interactive="false" data-dial-action="time"><span class="dial__content"><button class="icon icon--pause"></button><span class="dial__time"></span></span></div>' +
          '<div class="dial" data-interactive="true" data-dial-action="volume"><span class="dial__content"><i class="icon icon--volume"></i></span></div>' +
          '<div class="dial" data-interactive="true" data-dial-action="speed"><span class="dial__content"><i class="icon icon--rabbit"></i></span></div>' +
        '</li>' +
      '</ul>' +
    '</section>';

    _drawer_submenus = new Textit.drawer_submenus(_article, _menu, self);
    init();
    return _el;
  }

  /**
  * @public
  * Sets the menu
  */
  function setMenu(menu) {
    _menu = menu;
  }
  /**
   * @private
   * Inits the drawer
   * should run when the dom is ready
   */
  function init() {
    //_el = document.querySelector('.drawer');
    setDirection(_dir);
    _elWidth = _el.offsetWidth;
    _bgEl = _el.querySelector('.drawer__bg');
    // map sections by section name
    _sections = {};
    var sectionsElements = _el.getElementsByTagName('section');
    for (var i = 0, len = sectionsElements.length; i < len; i++) {
      var sectionName = sectionsElements[i].dataset.menuName;
      _sections[sectionName] = sectionsElements[i];
    }
    _openSection = sectionsElements[0];
    _closeBtn = _el.querySelector('.drawer__btn-close');
    window.addEventListener('scroll', updateCloseButtonLocation);
    _closeBtn.addEventListener('click', function () {
      _menu.close();
    })
    updateCloseButtonLocation();

    _drawer_submenus.init();
  }
  /**
   * @private make sure the close button stays in its location
   */
  function updateCloseButtonLocation(e) {
    if (Textit.util.scrollTop() < 30)
      _closeBtn.style.top = (30 - Textit.util.scrollTop()) + 'px';
    else
      _closeBtn.style.top = 0;
  }

  /**
   * @private helper function to set transform to translate
   */
  function translate(x, y) {
    return 'translate3d(' + x + 'px, ' + y + 'px, 0)';
  }

  /**
  * @private
  * sets the drawer position
  */
  function setDrawerPosition(pos) {
    _menu.el().style.transform = translate(-pos / 2, 0);
    _article.offset(-pos / 2, 0);
    _el.style.transform = translate(pos / 2, 0);
    if (pos > 50)
      Textit.util.addClass(_el, 'open')
    else
      Textit.util.removeClass(_el, 'open')
    _elPosOffset = pos;

    _open = pos > 50; // indicate that the drawer is open (or not)
  }
  /**
  * Set whether the drawer is open or how open it is (pixels)
  */
  function setOpen(arg, callback) {
    var pos = arg;
    if (typeof arg == 'boolean')
      pos = arg ? _elWidth : 0;

    var transition = true || Math.abs(pos - _elPosOffset) > TRNASITION_THRESHOLD;
    if (transition) {
      _animating = true;
      var tween = new TWEEN.Tween({ pos: _elPosOffset })
        .easing(TWEEN.Easing.Cubic.InOut)
        .to({ pos: pos }, TRANSITION_DURATION)
        .onUpdate(function () {
          setDrawerPosition(this.pos);
        })
        .start().onComplete(function () {
          _animating = false;
          if (callback) setTimeout(callback, 10); // to avoid maximum call stack where a tween calls the start of another tween
        })
    } else {
      setDrawerPosition(pos);
      if (callback) callback();
    }

  }

  /**
  * Sets the effect section
  */
  function setEffectOrigin(x, y) {
    _bgEl.style.top = (y / window.innerHeight) * 100 + '%';
  }

  /**
  * Shows a specific section
  */
  function display(sectionName, callback) {
    setOpenSection(sectionName);
    setOpen(true, callback);
  }
  /**
  * sets a specific section to be visible
  */
  function setOpenSection(sectionName) {
    if (_openSectionName === sectionName) return;
    //if (_openSectionName != sectionName) {
    var section = _sections[sectionName];
    _elWidth = section.offsetWidth;
    Textit.util.removeClass(_openSection, 'open');
    _openSection = section;
    Textit.util.addClass(_openSection, 'open')
    _openSectionName = sectionName;
    //}
  }

  function setDirection(dir) {
    if (_el)
      _el.setAttribute('dir', dir);
    _dir = dir;
  }

  // bind dom ready to init
  //Textit.util.onDomReady(init);
  self = {
    setOpen: setOpen,
    display: display,
    setEffectOrigin: setEffectOrigin,
    setDrawerPosition: setDrawerPosition,
    el: function () { return _el; },
    isOpen: function () { return _open; },
    isAnimating: function () { return _animating; },
    getOpenSection: function () { return _openSectionName; },
    setDirection: setDirection,
    setOpenSection: setOpenSection,
    create: create,
    setMenu: setMenu
  }
  return self;
}

/********* Drawer Sumbenus **************/
Textit.drawer_submenus = function (article, menu, drawer) {
  var _article = article,
    _menu = menu,
    _drawer = drawer;
  var viewOptions = (function () {
    var _el;
    var startFontSize = parseInt(article.styles.text.size) || 20;
    var styles = [{ fontStyle: 'normal', fontSize: startFontSize - 4 + 'px', lineHeight: '200%', fontFamily: article.styles.text.font || 'Segoe UI' },
                  { fontStyle: 'normal', fontSize: startFontSize - 2 + 'px', lineHeight: '200%', fontFamily: article.styles.text.font || 'Segoe UI' },
                  { fontStyle: 'normal', fontSize: startFontSize + 'px', lineHeight: '200%', fontFamily: article.styles.text.font || 'Segoe UI', 'default': true },
                  { fontStyle: 'normal', fontSize: startFontSize + 2 + 'px', lineHeight: '200%', fontFamily: article.styles.text.font || 'Segoe UI' },
                  { fontStyle: 'normal', fontSize: startFontSize + 4 + 'px', lineHeight: '200%', fontFamily: article.styles.text.font || 'Segoe UI' }];
    var _sampleText = 'sample';
    var _itemElements;
    var _radios = [];
    var _selectedStyleIndex = null;
    var _hoverStyleIndex = null;

    /**
    * @private
    * record analytics
    */
    function record(action) {
      _article.record(_drawer, { object: { 'type': 'view-options' }, action: action })
    }

    /**
    * @private
    * Inits the view options sub menu
    */
    function init() {
      _sampleText = Textit.strings[_article.lang].ui.view_options_example_text;
      _el = _drawer.el().querySelector('.drawer__view-options');
      _el.addEventListener('click', click);
      _el.addEventListener('mousemove', hover);
      _el.addEventListener('mouseleave', hover);
      _itemElements = _el.querySelectorAll('li');
      for (var i = 0; i < styles.length; i++) {
        var name = Textit.strings[_article.lang].ui.view_options_font_names[i];
        var fsize = parseInt(styles[i].fontSize);
        var lheight = parseInt(styles[i].lineHeight)
        if (/^\d+%$/.test(styles[i].lineHeight)) lheight = fsize * (lheight / 100);

        var description = Textit.strings[_article.lang].ui.view_options_font_size + ' ' + fsize;
        if (_article.lang != 'ar')
          description = description + ', ' + Textit.strings[_article.lang].ui.view_options_font_spacing + ' ' + fsize * 2;

        _itemElements[i].style.font = compileFont(styles[i]);
        _itemElements[i].innerHTML = '<input type="radio" name="font-styles" id="radio_viewstyle' + i + '" />' + '<label for="radio_viewstyle' + i + '">' +
                                          '<strong>' + name + '</strong>&nbsp;' +
                                          '<em>' + description + '</em>' +
                                          '<p aria-hidden="true">' + _sampleText + '</p>' +
                                     '</label>'
        var radioinput = _itemElements[i].querySelector('input');
        if (styles[i].default)
          radioinput.setAttribute('checked', 'checked');

        _radios.push(radioinput);
      }
      setTimeout(reflow, 1000);
      window.addEventListener('resize', reflow);
      _selectedStyleIndex = getSelectedStyleIndex();
      _article.setFont(compileFont(styles[_selectedStyleIndex]), _selectedStyleIndex);
    }
    /**
    * @private
    * generate text
    */
    function generateText(numWords) {
      var sampleWords = _sampleText.split(' ');
      var textWords = [];
      for (var i = 0; i < numWords; i++) {
        textWords.push(sampleWords[i % (sampleWords.length - 1)]);
      }
      return textWords.join(' ');
    }
    /**
    * @private
    * resize rows
    */
    function reflow() {
      if (window.innerWidth < 500 || window.innerHeight < 500) return;
      for (var i = 0; i < styles.length; i++) {
        var li = _itemElements[i], liHeight = li.offsetHeight - 40;
        var p = li.querySelector('p');
        var numWords = p.textContent.split(' ').length + 1;
        while (p.offsetHeight < liHeight) {
          numWords++;
          p.textContent = generateText(numWords);
        }
        while (p.offsetHeight > liHeight) {
          numWords--;
          p.textContent = generateText(numWords);
        }
      }
    }
    /**
    * @private
    * compile font from style
    */
    function compileFont(style) {
      return style.fontStyle + ' ' + style.fontSize + '/' + style.lineHeight + ' ' + style.fontFamily;
    }
    /**
    * @private
    * click
    */
    function getSelectedStyleIndex() {
      for (var i = 0; i < _radios.length; i++) {
        if (_radios[i].checked)
          return i;
      }
      return null;
    }
    /**
    * @private
    * click
    */
    function click() {
      var styleIndex = getSelectedStyleIndex();
      if (_selectedStyleIndex != styleIndex) {
        _selectedStyleIndex = styleIndex;
        _article.setFont(compileFont(styles[styleIndex]), styleIndex);
        record({ 'interaction': 'choose-font', 'font': styleIndex })
        _menu.close();
      }
    }
    /**
    * @private
    * hover
    */
    function hover(event) {
      if (!_drawer.isOpen() || _drawer.isAnimating()) return;
      var target = event.target;
      while (target != null && target.tagName != 'LI') target = target.parentNode;
      if (target != null) {
        var styleIndex = parseInt(target.getAttribute('data-view-style'));
        if (_hoverStyleIndex != styleIndex) {
          _hoverStyleIndex = styleIndex;
          _article.setFont(compileFont(styles[styleIndex]), _selectedStyleIndex);
          record({ 'interaction': 'hover', 'font': _hoverStyleIndex })
        }
      } else if (_selectedStyleIndex != null) {
        _hoverStyleIndex = _selectedStyleIndex;
        _article.setFont(compileFont(styles[_selectedStyleIndex]), _selectedStyleIndex);
      }
    }

    // bind dom ready to init
    //Textit.util.onDomReady(init);

    return {
      init: init
    }

  })()

  var narrationOptions = (function () {
    var _el;
    /**
    * @private
    * Inits the narration options sub menu
    */
    function init() {
      _el = _menu.getDrawer().el().querySelector('.drawer__narration-options');
      if (_article.isReady) bindDialsToArticle();
      else _article.on('ready', bindDialsToArticle);
    }
    /**
    * @private
    * Bind dials to article
    */
    function bindDialsToArticle() {
      var dialElements = _el.querySelectorAll('.dial'), dial;
      for (var i = 0; i < dialElements.length; i++) {
        dial = new Dial(dialElements[i]);
        handleDial(dial, dialElements[i].dataset.dialAction)
      }
    }
    /**
    * @private
    * record analytics
    */
    function record(action) {
      _article.record(_drawer, { object: { 'type': 'narration-options' }, action: action })
    }
    /**
    * @private
    * Calls the approporiate narrator actions when the dial changes
    */
    function handleDial(dial, dialAction) {
      switch (dialAction) {
        case 'time': // the time dial
          dial.set(0);
          var playpauseIcon = dial._el.querySelector('.icon');
          _article.narrator.on('progress', function (e) {
            dial.set(e.progress, false);
            var minutes = Math.floor(e.currentTime / 60), seconds = Math.floor(e.currentTime % 60);
            seconds = (seconds < 10 ? ('0' + seconds) : seconds)
            dial.setTime(minutes + ':' + seconds);
          })
          _article.narrator.on('start', function () {
            playpauseIcon.className = 'icon icon--pause';
          })
          _article.narrator.on('stop', function () {
            playpauseIcon.className = 'icon icon--resume';
          })
          dial.on('start-drag', function (e) {
            if (_article.narrator.isPlaying) _article.narrator.pauseNarration();
          });
          dial.on('change', function (e) {
            if (dial.value <= 0.001) return;
            record({ 'time': dial.value });
            _article.narrator.moveCursor(dial.value);
            moveCursorTimer = null;
          })
          dial.on('end-drag', function (e) {
            _article.narrator.seek(dial.value);
            _article.narrator.resumeNarration();
          })
          playpauseIcon.addEventListener('click', function () {
            if (Textit.util.hasClass(this, 'icon--pause')) {
              record({ 'interaction': 'pause' });
              _article.narrator.pauseNarration();
              Textit.XAPI.sendEvent({ verb: 'pressed', object_id: 'textIt_toolbar_experiancedPause', object_name: 'experiancedPause' });
            } else {
              record({ 'interaction': 'resume' });
              _article.narrator.resumeNarration();
              Textit.XAPI.sendEvent({ verb: 'pressed', object_id: 'textIt_toolbar_experiancedPlay', object_name: 'experiancedPlay' });
            }
          })
          break;
        case 'speed': // the speed dial
          dial.set(0.5);
          _article.narrator.setSpeed(dial.value);
          dial.on('change', function (e) {
            record({ 'speed': dial.value });
            _article.narrator.setSpeed(dial.value);
          })
          break;
        case 'volume': // the volume dial
          dial.set(0.5);
          _article.narrator.setVolume(dial.value);
          dial.on('change', function (e) {
            record({ 'volume': dial.value });
            _article.narrator.setVolume(dial.value);
          })
          break;
      }

    }
    /**
    * @private
    * helper function - fire function every frame the mouse is held on a button
    */
    function onhold(el, callback) {
      var mousedown = false;
      var delay;
      function fireCalback() {
        if (mousedown) {
          callback();
          setTimeout(fireCalback, delay);
        }
        delay = 25;
      }
      el.addEventListener('mousedown', function () {
        mousedown = true;
        delay = 250;
        fireCalback();
      });
      document.addEventListener('mouseup', function () {
        mousedown = false;
      });
    }
    /**
    * @constructor
    * creates a dial component
    */
    function Dial(el) {
      this._el = el;
      this._outlineLength = 314; // PI * 10
      this.value = 0.5; // 0 to 1 
      this.events = Textit.util.EventEmitter();
      this.on = this.events.on;
      this._interactive = el.dataset.interactive != 'false';
      var html = '<svg viewBox="0 0 110 110" class="dial__fill" version="1.1" xmlns="http://www.w3.org/2000/svg"><circle cx="50%" cy="50%" r="50"></circle></svg>';
      if (this._interactive) {
        html += '<button class="dial__button--increase"></button>' +
                '<button class="dial__button--decrease"></button>'
      }
      el.innerHTML = html + el.innerHTML;
      this._textEl = el.querySelector('.dial__content');
      this._timeEl = el.querySelector('.dial__time');
      this._svg = this._el.querySelector('svg');
      var self = this;
      if (this._interactive) {
        onhold(el.querySelector('.dial__button--decrease'), this.decrease.bind(this));
        onhold(el.querySelector('.dial__button--increase'), this.increase.bind(this));
      }
      this.update();
      //drag
      this._svg.addEventListener('mousedown', this.startDrag.bind(this));
    }
    Dial.prototype.startDrag = function (e) {
      var rect = this._el.getBoundingClientRect();
      var middleX = rect.left + rect.width / 2;
      var middleY = rect.top + rect.height / 2;
      var self = this;
      self.events.emit('start-drag');

      function mousemove(e) {

        var angle = Math.atan2(e.clientY - middleY, e.clientX - middleX);

        angle = angle * 180 / Math.PI + 90;
        if (angle < 0)
          angle += 360;
        self.set(angle / 360);
      }
      function end(e) {
        document.removeEventListener('mousemove', mousemove);
        document.removeEventListener('mouseup', end);
        self.events.emit('end-drag');
      }
      document.addEventListener('mousemove', mousemove);
      document.addEventListener('mouseup', end);
    }

    Dial.prototype.decrease = function () {
      if (this._el.dataset.dialAction=='volume')
        Textit.XAPI.sendEvent({ verb: 'pressed', object_id: 'textIt_toolbar_volumeDown', objectName: 'volumeDown' });
      else
        Textit.XAPI.sendEvent({ verb: 'pressed', object_id: 'textIt_toolbar_speedDown', objectName: 'speedDown' });
      this.set(this.value - 0.01);
    }
    Dial.prototype.increase = function () {
      if (this._el.dataset.dialAction == 'volume')
        Textit.XAPI.sendEvent({ verb: 'pressed', object_id: 'textIt_toolbar_volumeUp', object_name: 'volumeUp' });
      else
        Textit.XAPI.sendEvent({ verb: 'pressed', object_id: 'textIt_toolbar_speedUp', object_name: 'speedUp' });
      this.set(this.value + 0.01);
    }
    Dial.prototype.text = function (text) {
      if (this._textEl) this._textEl.textContent = text;
    }
    Dial.prototype.setTime = function (text) {
      if (this._timeEl) this._timeEl.textContent = text;
    }
    Dial.prototype.set = function (value, notify) {
      value = Math.max(Math.min(value, 1), 0);
      if (value != this.value) {
        this.value = value;
        this.update();
        if (notify !== false)
          this.events.emit('change');
      }
    }
    Dial.prototype.transition = function (speed) {
      this._svg.style.transition = 'stroke-dash-array ' + (speed / 1000) + 's';
    }
    Dial.prototype.update = function () {
      var outlineFillAmount = Math.round(this._outlineLength * this.value);
      var dashArray = [outlineFillAmount, this._outlineLength - outlineFillAmount];
      this._svg.style.strokeDasharray = dashArray.join(' ');
    }
    // bind dom ready to init
    //Textit.util.onDomReady(init);
    return {
      init: init
    }
  })()

  var dragOptions = (function () {
    var _el;
    var _articleEl;
    var _actionAreas;
    var _padding = 50;
    var _width;
    var _stateBeforeDrag;
    var _dropmap = { 'trash': ['answer', 'marked_text', 'cloze'], 'like': ['marked_text'] }
    var _hoveredActionArea;
    var _hoverMarkerEl;
    /**
    * @private
    * Inits the narration options sub menu
    */
    function init() {
      _el = _menu.getDrawer().el().querySelector('.drawer__drops-areas');
      setTimeout(function () {
        _width = _el.offsetWidth;
      }, 1000)
      _actionAreas = _el.querySelectorAll('.drawer__action');

      _article.dragDropManager.on('drag', ['cloze', 'marked_text', 'answer'], handleDrag);
      _article.dragDropManager.createDropHandler(['marked_text', 'answer'], handleDrop);

    }
    /**
    * @private helper function to set transform to translate
    */
    function translate(x, y) {
      return 'translate3d(' + x + 'px, ' + y + 'px, 0)';
    }
    /**
    * @private
    * handles drag
    */
    function handleDrag(event) {
      if (event.dragState == 'start') {
        _stateBeforeDrag = { open: _drawer.isOpen(), section: _drawer.getOpenSection(), menuState: _menu.getSelected() };
        _menu.setSelected('drop');
        _drawer.setOpenSection('drop-areas');
      } else if (event.dragState == 'end') {
        _menu.setSelected(_stateBeforeDrag.menuState)
        if (_stateBeforeDrag.open) _drawer.display(_stateBeforeDrag.section);
        else _drawer.setOpen(false);
        setHovered(null);
      } else {
        _articleEl = _article.dom;
        var draggableRect = event.draggable.getBoundingClientRect();
        if (!_stateBeforeDrag.open) { // if isn't open, move the drawer according to the mouse
          var articleRect = _articleEl.getBoundingClientRect();
          var pos = Math.min(_width, Math.max(0, draggableRect.right - articleRect.right + _padding)), actionArea;
          _drawer.setDrawerPosition(pos);
          _drawer.setEffectOrigin(0, draggableRect.top + draggableRect.height / 2)
        }
        if (_drawer.isOpen()) {
          actionArea = findHoveredActionArea(event.dragType, draggableRect, { x: event.x, y: event.y });
          setHovered(actionArea);
          if (actionArea && event.draggable.setActionPreview) event.draggable.setActionPreview(actionArea.getAttribute('data-action'));
        } else
          setHovered(null);
      }
    }
    /**
    * @private
    * handles drop
    */
    function handleDrop(dropParams) {
      if (_drawer.isOpen()) {
        var actionArea = findHoveredActionArea(dropParams.draggable.type, dropParams.draggable.getBoundingClientRect(), { x: dropParams.x, y: dropParams.y });
        var action = actionArea != null ? actionArea.getAttribute('data-action') : null;
        if (action != null) {
          var rect = Textit.util.getBoundingRect(actionArea);
          dropParams.draggable.applyDropAction(action, rect.left + rect.width / 2, rect.top + rect.height / 2, function () {

          });
          return true;
        }
      }

      return false;
    }
    /**
    * @private
    * set the hovered action area
    */
    function setHovered(actionArea) {
      if (_hoveredActionArea != actionArea) {
        if (_hoveredActionArea != null) {
          Textit.util.removeClass(_hoveredActionArea, 'hover');
        }
        if (actionArea != null) {
          Textit.util.addClass(actionArea, 'hover');
        }
        _hoveredActionArea = actionArea;
      }
    }
    /**
    * @private
    * check whether the action can be applied to the draggable by its dragtype
    */
    function checkDragTypeMatch(dragType, action) {
      return _dropmap[action].includes(dragType);
    }
    /**
    * @private
    * helper function, finds whether rects intersect 
    */
    function intersectRect(r1, r2) {
      return !(r2.left > r1.right ||
               r2.right < r1.left ||
               r2.top > r1.bottom ||
               r2.bottom < r1.top);
    }
    function inRect(rect, point) {
      return rect.left < point.x && point.x < rect.right &&
        rect.top < point.y && point.y < rect.bottom
    }
    /**
    * @private
    * finds the drop zone 
    */
    function findHoveredActionArea(dragType, draggableRect, cursorPoint) {
      cursorPoint.y -= Textit.util.scrollTop();
      var found = false;
      var i = 0, action = null;
      for (var i = 0, len = _actionAreas.length; i < len; i++) {
        action = _actionAreas[i].getAttribute('data-action');
        if (!checkDragTypeMatch(dragType, action)) continue; // avoid incompatible drop zones
        if (inRect(_actionAreas[i].getBoundingClientRect(), cursorPoint)) {
          //if (intersectRect(_actionAreas[i].getBoundingClientRect(), draggableRect)) {
          return _actionAreas[i];
        }
      }
      return null;
    }
    // bind dom ready to init
    //Textit.util.onDomReady(init);

    return {
      init: init
    }
  })()

  function init() {
    viewOptions.init();
    dragOptions.init();
    if (_article.narrator)
      narrationOptions.init();
  }

  return {
    viewOptions: viewOptions,
    init: init
  }
};

Textit.EmbedMenu = function () {
  var _el;
  var _menuEl;
  var _submenus = {};
  var _active = null;
  var fontStyles;
  var _article;
  function create(article) {
    var startFontSize = parseInt(article.styles.text.size) || 20;
    fontStyles = [{ fontStyle: 'normal', fontSize: startFontSize - 4 + 'px', lineHeight: '200%', fontFamily: article.styles.text.font || 'Segoe UI' },
                  { fontStyle: 'normal', fontSize: startFontSize - 2 + 'px', lineHeight: '200%', fontFamily: article.styles.text.font || 'Segoe UI' },
                  { fontStyle: 'normal', fontSize: startFontSize + 'px', lineHeight: '200%', fontFamily: article.styles.text.font || 'Segoe UI', 'default': true },
                  { fontStyle: 'normal', fontSize: startFontSize + 2 + 'px', lineHeight: '200%', fontFamily: article.styles.text.font || 'Segoe UI' },
                  { fontStyle: 'normal', fontSize: startFontSize + 4 + 'px', lineHeight: '200%', fontFamily: article.styles.text.font || 'Segoe UI' }];

    _article = article;
    _el = document.createElement('aside');
    _el.className = 'embedmenu';
    _el.innerHTML =
    '<ul class="topmenu" data-menu-selected="null">' +

      '<li data-menu-index="1"><button class="topmenu-button topmenu-button--origin" data-selected="false"><i class="icon icon--work"></i>' + Textit.strings[_article.lang].ui['menu_title_origin'] + '</button>' + '</li>' +
      '<li data-menu-index="2"><button class="topmenu-button topmenu-button--view"><i class="icon icon--view"></i>' + Textit.strings[_article.lang].ui['menu_title_view'] + '</button></li>' +
      (_article.narrator != null ? '' +
      '<li data-menu-index="3"><button class="topmenu-button topmenu-button--narrator"><i class="icon icon--narrator"></i>' + Textit.strings[_article.lang].ui['menu_title_narrator'] + '</button>' + '</li>' +
      '' : '') +
    '</ul>' +
    '<button class="topmenu-button--help">?</button>' +
    '<div class="submenus">' +
        '<ul class="narrator-options" style="display:none;">' +
               '<li>' +
                '<span class="time">0:00</span>' +
                '<button class="playback-btn icon icon--resume"></button>' +
              '</li>' +
              '<li class="speed-range">' +
                '<span><i class="icon icon--rabbit"></i><button class="range__btn--decrease"></button><button class="range__btn--increase"></button></span>' +
              '</li>' +
              '<li class="volume-range">' +
                '<span><i class="icon icon--volume"></i><button class="range__btn--decrease"></button><button class="range__btn--increase"></button></span>' +
              '</li>' +
          '</ul>' +
          '<ul class="view-options" style="display:none;">' +
              '<li class="size-range">' +
                '<span><i class="icon icon--font--' + _article.lang + '"></i><button class="range__btn--decrease"></button><button class="range__btn--increase"></button></span>' +
              '</li>' +
         '</ul>' +
    '</div>';
    document.body.insertBefore(_el, document.body.firstChild);
    init();
    return _el;
  }


  /**
    * @private
    * compile font from style
    */
  function compileFont(style) {
    return style.fontStyle + ' ' + style.fontSize + '/' + style.lineHeight + ' ' + style.fontFamily;
  }

  function init() {
    _menuEl = _el.firstChild;

    // help
    var h = _el.querySelector('.topmenu-button--help');
    h.addEventListener('click', function () {
      _article.WalkMe(true);
    })
    // origin
    var o = _el.querySelector('.topmenu-button--origin');
    o.addEventListener('click', click.bind(this, 'origin', o.parentNode.dataset.menuIndex))
    _article.on('textmode-change', function () {
      if (_active == 'origin')
        click('origin')
    })
    // view
    var v = _el.querySelector('.topmenu-button--view');
    v.addEventListener('click', click.bind(this, 'view', v.parentNode.dataset.menuIndex))
    _submenus['view'] = _el.querySelector('.view-options');
    var sizeRange = new RangeInput(_el.querySelector('.size-range'), 0, fontStyles.length - 1, 1);
    sizeRange.value = 2;
    sizeRange.on('change', function () {
      _article.setFont(compileFont(fontStyles[sizeRange.value]), sizeRange.value);
    })
    _article.setFont(compileFont(fontStyles[sizeRange.value]), sizeRange.value);
    // narrator
    var n = _el.querySelector('.topmenu-button--narrator');
    if (!n) return;
    n.addEventListener('click', click.bind(this, 'narrator', n.parentNode.dataset.menuIndex))
    _submenus['narrator'] = _el.querySelector('.narrator-options');

    var playpauseIcon = _submenus['narrator'].querySelector('.playback-btn');
    var time = _submenus['narrator'].querySelector('.time');
    _article.narrator.on('progress', function (e) {
      var minutes = Math.floor(e.currentTime / 60), seconds = Math.floor(e.currentTime % 60);
      seconds = (seconds < 10 ? ('0' + seconds) : seconds)
      time.textContent = minutes + ':' + seconds;
    })
    _article.narrator.on('start', function () {
      playpauseIcon.className = 'icon icon--pause';
    })
    _article.narrator.on('stop', function () {
      playpauseIcon.className = 'icon icon--resume';
    })
    playpauseIcon.addEventListener('click', function () {
      if (Textit.util.hasClass(this, 'icon--pause')) {
        _article.narrator.pauseNarration();
      } else {
        _article.narrator.resumeNarration();
      }
    })

    var speedRange = new RangeInput(_el.querySelector('.speed-range'), 0, 1, 0.03);
    speedRange.value = 0.5;
    speedRange.on('change', function () {
      _article.narrator.setSpeed(speedRange.value);
    })
    _article.narrator.setSpeed(speedRange.value);

    var volumeRange = new RangeInput(_el.querySelector('.volume-range'), 0, 1, 0.03);
    volumeRange.value = 0.5;
    volumeRange.on('change', function () {
      _article.narrator.setVolume(volumeRange.value);
    })
    _article.narrator.setVolume(volumeRange.value);

  }

  function RangeInput(el, min, max, step) {
    this.value = 0;
    this.events = Textit.util.EventEmitter();
    this.on = this.events.on;
    var self = this;

    function change(delta) {
      self.value += delta;
      if (self.value < min) self.value = min;
      if (self.value > max) self.value = max;
      self.events.emit('change')
    }

    el.querySelector('.range__btn--decrease').addEventListener('click', function () {
      Textit.XAPI.sendEvent({ verb: 'pressed', object_id: 'textIt_toolbar_displaySmaller', object_name: 'displaySmaller' });
      change(-step);
    })
    el.querySelector('.range__btn--increase').addEventListener('click', function () {
      Textit.XAPI.sendEvent({ verb: 'pressed', object_id: 'textIt_toolbar_displayLarger', object_name: 'displayLarger' });
      change(+step);
    })

  }

  function stop(action) {
    var selected = _menuEl.querySelector('li.selected');
    if (selected) Textit.util.removeClass(_menuEl.querySelector('li.selected'), 'selected');
    if (_submenus[action]) _submenus[action].style.display = 'none';
    switch (action) {
      case 'narrator':
        _article.narrator.stopNarration();
        break;
      case 'origin':
        _article.setOrigin(false);
        break;
    }
  }

  var z = 1;
  function click(action, index) {
    stop(_active);
    if (action == _active)
      return _active = null, _menuEl.dataset.menuSelected = 'null', false;
    if (_submenus[action]) _submenus[action].style.display = '';
    _menuEl.dataset.menuSelected = index;
    Textit.util.addClass(_menuEl.querySelector('li[data-menu-index="' + index + '"]'), 'selected');
    _menuEl.querySelector('li[data-menu-index="' + index + '"]').style.zIndex = z++;
    _active = action;
    switch (action) {
      case 'narrator':
        _submenus['narrator'].style.display = '';
        _article.narrator.startNarration();
        break;
      case 'origin':
        _article.setOrigin(true);
        break;
    }
  }

  return {
    create: create
  }
}