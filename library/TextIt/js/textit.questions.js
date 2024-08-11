var Textit;
if (typeof Textit == 'undefined') Textit = {};

Textit.Questions = (function () {

  //---------------------------------------------------------------------------------------
  /** 
   * @classdesc Abstract class representing question.
   * @class
   * @param {Object} article - the article the question belongs to
   * @param {Object} loadOptions - {json: json} or {xml: xml}
   */
  function QuestionBase(article, loadOptions) {
    this.events = new Textit.util.EventEmitter();
    this.on = this.events.on;
    this.article = article;
    this.score = 0;
    this.questionIndex = loadOptions.questionIndex;
    if (loadOptions && loadOptions.xml)
      this.createFromXML(loadOptions.xml);
    if (loadOptions && loadOptions.json)
      this.createFromJson(loadOptions.json);

    article.on('blur', this.collapse.bind(this));
  }

  /**
  * relay function all questions must call when answered
  * @emits QuestionBase#answer
  */
  QuestionBase.prototype.onAnswer = function () {
    this.events.emit('answer');
  }

  QuestionBase.prototype.getScore = function () {
    return this.score || 0;
  }

  /**
  * creates the question from json
  * @param data - the json data {stem:stem, clue:clue}
  */
  QuestionBase.prototype.createFromJson = function (data, className) {
    //assign all properties
    this.stem = data.stem;
    this.clue = data.clue;
    this.isclueopen = false;
    this.completion = 0;
    this.open = false;
    this.expanded = false;

    this.dom = Textit.util.createHtml({
      html: '<div class="question" data-open="false">' +
                  '<button class="question__pin"></button>' +
                  ((data.clue && data.clue.length > 0 && data.clue != 'null') ?
                      '<div class="question__clue"><span class="qusestion__clue__opener">' + Textit.strings[this.article.lang].ui.question_clue + '</span><div class="question__clue__content">' + data.clue + '</div></div>' : '') +
                  '<span class="question__feedback question__feedback--empty">' +
                      '<span class="question__feedback__fill"><span class="question__feedback__fill__dividers"></span></span>' +
                      '<span class="question__btn-done">' + Textit.strings[this.article.lang].ui.question_done + '</span>' +
                  '</span>' +
                  '<span class="question__stem">' + data.stem + '</span>' +
                  (!!data.translation ? '<span class="question__translation">' + data.translation + '</span>' : '') +
                  '<div class="question__content"></div>' +
               '</div>'
    });
    if (className) this.dom.$addClass(className);
    this._stemElement = this.dom.querySelector('.question__stem');
    this._contentElement = this.dom.querySelector('.question__content');
    this._feedbackElement = this.dom.querySelector('.question__feedback');
    this._feedbackFillElement = this.dom.querySelector('.question__feedback__fill');
    this._feedbackDividersElement = this.dom.querySelector('.question__feedback__fill__dividers');
    this._clueElement = this.dom.querySelector('.question__clue');
    this._pinButtonElement = this.dom.querySelector('.question__pin');
    if (this.article.styles.questions.font)
      this._stemElement.style.fontFamily = this.article.styles.questions.font;
    if (this.article.styles.questions.color)
      this._stemElement.style.color = this.article.styles.questions.color;
    if (this.article.styles.questions.size)
      this._stemElement.style.fontSize = this.article.styles.questions.size + 'px';
    this.bindEvents();
  }
  /**
  * create the question content from html
  * @param html - the template-rendered html code
  */
  QuestionBase.prototype.setContentHtml = function (html) {
    Textit.util.createHtml({
      html: html,
      parent: this._contentElement
    });
  }

  /**
  * @param xml
  */
  QuestionBase.prototype.loadXML = function (xmlNode) {
    window.node = xmlNode.querySelector('stem');
    return { clue: getValue('clue'), stem: getValue('stem'), translation: getValue('translation') }

    function getValue(tag) {
      var el = xmlNode.querySelector(tag);
      if (el) return el.innerHTML || el.textContent || '';
      else return '';
    }
  }

  /**
  * binds dom events
  * @private
  */
  QuestionBase.prototype.bindEvents = function () {
    this._stemElement.addEventListener('click', this.toggleExpand.bind(this));
    this._feedbackElement.addEventListener('click', this.toggleExpand.bind(this));
    this._pinButtonElement.addEventListener('click', this.toggleFloat.bind(this));

    if (this._clueElement) {
      this._clueElement.addEventListener('click', this.setClueOpen.bind(this, true, null));
      this.dom.addEventListener('click', this.setClueOpen.bind(this, false, null));
    }

    setTimeout(this.collapse.bind(this), 10);
  }
  /**
  * toggles whether the question is expanded or collapsed
  */
  QuestionBase.prototype.toggleExpand = function () {
    if (this.isDragging) return;
    if (this.expanded) this.collapse();
    else this.expand();
  }

  /**
  * Expands the question to reveal the content
  * @public
  */
  QuestionBase.prototype.expand = function (height) {
    // 0. log that the event occured
    if (!this.expanded) this.log({ 'verb': 'expand' });
    this.events.emit('expand');

    // 1. set this.expanded
    this.expanded = this.dom.dataset.open = true;

    // 2. collapse the currently active question,
    //    only one question can be open at any time
    if (this.article.activeQuestion != this && this.article.activeQuestion != null)
      this.article.activeQuestion.collapse();
    this.article.activeQuestion = this;

    // 3. calculate the questions full height by font size to support font size change
    var fontSize = parseFloat(window.getComputedStyle(this.dom).getPropertyValue('font-size'));
    var self = this;
    function _expand() { self._contentElement.style.height = (height || self._contentElement.scrollHeight) / fontSize + 'em'; }
    _expand();
    // 4. run expand again to catch flowing text from hiding
    setTimeout(_expand, 400);
  }

  /**
  * Collapses the question to reveal the content
  * @public
  */
  QuestionBase.prototype.collapse = function () {
    // 0. log that the event occured
    if (!this.expanded) this.log({ 'verb': 'collapse' });
    this.events.emit('collapse');

    // 1. set this.expanded
    this.expanded = this.dom.dataset.open = false;

    // 2. resets the active question if it was this one
    if (this.article.activeQuestion === this) this.article.activeQuestion = null;

    // 3. define collapse - resets height
    var self = this;
    function collapse() {
      self._contentElement.style.height = '';
    };
    // 4. if clue is open, first close the clue and only then collapse, else - just collapse
    if (this.isclueopen) this.setClueOpen(false, collapse);
    else collapse();
  }

  /**
  * Sets whether the question is being dragged
  * @public
  */
  QuestionBase.prototype.setDragging = function (isDragging) {
    this.isDragging = isDragging;
  }

  /**
  * Sets whether the question is floating - starts or ends floating
  * @public
  */
  QuestionBase.prototype.toggleFloat = function () {
    this.setFloating(!this.isFloating);
  }
  /**
  * Sets whether the question is floating - starts or ends floating
  * @public
  */
  QuestionBase.prototype.setFloating = function (isFloating, placeholder) {
    this.isFloating = isFloating;
    if (placeholder)
      this.floating_placeholder = placeholder;
    if (isFloating) {
      this.floating_placeholder.addEventListener('click', this.toggleFloat.bind(this));
      var self = this;
      this.updateFloatBind = this.updateFloatBind || this.updateFloat.bind(this);
      this.article.getScrollParent().addEventListener('scroll', this.updateFloatBind);
      this.dock = null;
      this.updateFloat();
      this.collapse();
    } else {
      this.article.dom.replaceChild(this.dom, this.floating_placeholder);
      this.dom.$removeClass('dragging');
      this.dom.style.cssText = '';
      this.article.getScrollParent().removeEventListener('scroll', this.updateFloatBind);
      this.collapse();
    }
  }
  /**
  * Updates the floating position - doesn't allow floating question to go off screen
  * @private
  */

  QuestionBase.prototype.updateFloat = function () {
    var rect = this.dom.getBoundingClientRect();
    var articleRect = this.article.dom.getBoundingClientRect();
    var minY = Math.max(articleRect.top, 0);
    var maxY = Math.min(window.innerHeight - rect.height, articleRect.bottom - rect.height);
    if (minY > maxY) return;
    if (rect.top < minY || (this.dock === 'top' && rect.top > minY)) {
      this.dock = 'top';
      this.dom.style.top = parseFloat(this.dom.style.top) - (rect.top - minY) + 'px';
      if (this.chain)
        this.chain.setAnchor(this.chain.anchor.x, this.chain.anchor.y - (rect.top - minY));
      //  this.chain.svg.style.top = parseFloat(this.chain.svg.style.top) - (rect.top - minY) + 'px';
    }
    else if (rect.top > maxY || (this.dock === 'bottom' && rect.top < maxY)) {
      this.dock = 'bottom';
      this.dom.style.top = parseFloat(this.dom.style.top) + (maxY - rect.top) + 'px';
      //if (this.chain)
      //  this.chain.svg.style.top = parseFloat(this.chain.svg.style.top) + (maxY - rect.top) + 'px';
    }
  }

  /**
  * Sets whether the clue is visible
  * @public
  */
  QuestionBase.prototype.setClueOpen = function (open, callback) {
    var self = this;
    var transitionDuration = 400;
    var fontSize = parseFloat(window.getComputedStyle(this.dom).getPropertyValue('font-size'));
    if (open != this.isclueopen) {
      if (open) {
        var offset = this.dom.querySelector('.question__clue__content').offsetWidth;
        this.dom.style.right = offset + 'px';
        this.dom.querySelector('.qusestion__clue__opener').style.right = -offset + 'px';
        this.dom.$addClass('question--show-clue');
        var clueHeight = this.dom.querySelector('.question__clue__content').offsetHeight;
        if (this._contentElement.offsetHeight < clueHeight) {
          this.contentHeight = this._contentElement.style.height;
          this._contentElement.style.height = clueHeight / fontSize + 'em';
        }
      }
      else {
        this.dom.style.right = '';
        this.dom.querySelector('.qusestion__clue__opener').style.right = '';
        this.dom.$removeClass('question--show-clue');
        this._contentElement.style.height = this.contentHeight;
      }


      setTimeout(function () {
        self.isclueopen = open;
        if (callback) callback();
      }, transitionDuration)
      this.log({ 'verb': 'clue', 'open': open });
    }
  }

  /**
  * Resize to fit, without animation
  * @public
  */
  QuestionBase.prototype.reflow = function () {
    var self = this;
    // 1. prevent transition
    this.dom.style.transition = 'none';
    // 2. if is expanded, set to the required height, else reset height jic
    self._contentElement.style.height = this.expanded ? self._contentElement.scrollHeight : '';

    // 3. return transition
    setTimeout(function () {
      self.dom.style.transition = '';
    }, 10);
  }

  QuestionBase.prototype.setScore = function (score) {
    this.score = score;
  }

  QuestionBase.prototype.setCompletion = function (completion) {
    var self = this;
    if (!this.article.feedback) {
      completion = 1;
      this.setCompletionSteps(1);
    }

    var direction = this.article.direction == 'rtl' ? 'bottom' : 'top';
    var tween = new TWEEN.Tween({ completion: this.completion })
        .easing(TWEEN.Easing.Sinusoidal.Out)
        .to({ completion: completion }, 500)
        .onUpdate(function () {
          self._feedbackFillElement.style.background = 'linear-gradient(to ' + direction + ', #FBE5D6 ' + (100 - this.completion * 100) + '%, #ED7D32 ' + (100 - this.completion * 100) + '%)';
          if (this.completion == 1)
            self._feedbackElement.className = 'question__feedback' + (self.article.feedback ? ' question__feedback--done' : '');
            /*else if (this.completion == 0)
              self._feedbackElement.className = 'question__feedback question__feedback--empty';*/
          else
            self._feedbackElement.className = 'question__feedback';
        })
        .start()

    this.completion = completion;
  }
  QuestionBase.prototype.setCompletionSteps = function (steps) {
    if (!this.article.feedback)
      steps = 1;
    var step = Math.floor(100 / steps);
    var gradient = [];
    for (var i = step; i <= 100 - step; i += step) {
      var from = i - 2 + '%', to = i + '%';
      gradient.push('transparent ' + from, '#fff ' + from, '#fff ' + to, 'transparent ' + to);
    }
    if (gradient.length == 0) {
      this._feedbackDividersElement.style.background = 'transparent';
    } else {
      this._feedbackDividersElement.style.background = 'linear-gradient(to bottom, ' + gradient.join(',') + ')';
    }

  }

  //-------------------------
  QuestionBase.prototype.record = function (action) {
    var record = {
      object: { type: 'question', number: this.questionIndex, questionType: this.questionType },
      action: action
    }

    this.article.record(this, record);
  }
  //-------------------------
  QuestionBase.prototype.log = function (action) {
    this.article.log(this, action);
  }

  //---------------------------------------------------------------------------------------
  /** 
   * @classdesc A multiple choice question component.
   * @class
   * @augments QuestionBase
   * @inheritdoc
   */
  function MultipleChoiceQuestion(article, loadOptions) {
    QuestionBase.call(this, article, loadOptions);
    this.autocheck = true;
  }
  Textit.util.oop.inherits(MultipleChoiceQuestion, QuestionBase); // inherit from Question Base
  MultipleChoiceQuestion.prototype.questionType = 'multiplechoice';
  MultipleChoiceQuestion.prototype.createFromJson = function (data) {
    QuestionBase.prototype.createFromJson.call(this, data);
    var self = this;
    this.dom.className += ' question--multiple-choice';
    var html = '<ul>';
    var compId = this.article.components.length;
    this.answers = [];
    this.options = data.options;
    for (var i = 0; i < data.options.length; i++) {
      if (data.options[i].correct) {
        this.answers.push(i);
      }
      html += '<li class="question--multiple-choice__option" data-choice-index="' + i + '"><label><input type="radio" name="mcquestion' + compId + '" value="' + i + '">' +
          '<span>' + data.options[i].text + '</span>' +
          '</label></li>';
    }
    html += '</ul>';

    this.setContentHtml(html);
    this._ulElement = this.dom.querySelector('ul');
    this.chosen = [];

    this.setCompletionSteps(this.answers.length);

    this.bindExtraEvents();
  }

  MultipleChoiceQuestion.prototype.solve = function () {
    for (var i = 0; i < this.answers.length; i++) {
      this.checkChoice(this.answers[i]);
    }
  }

  MultipleChoiceQuestion.prototype.bindExtraEvents = function () {
    var self = this;
    this._ulElement.addEventListener('click', function (event) {
      if (event.target.value) {
        choiceIndex = parseInt(event.target.value);
        self.checkChoice(choiceIndex);
      }
    });
  }

  MultipleChoiceQuestion.prototype.createFromXML = function (xmlNode) {
    var stemdata = this._super.loadXML.call(this, xmlNode);
    var optionNodes = xmlNode.querySelectorAll('option');
    var options = [];
    for (var i = 0; i < optionNodes.length; i++) {
      options.push({ text: optionNodes[i].textContent, correct: optionNodes[i].getAttribute('correct').toLowerCase() == 'true' });
    }
    this.createFromJson(Textit.util.extend({
      options: options
    }, stemdata));
  }

  MultipleChoiceQuestion.prototype.getUserResponse = function () {
    var response = []
    if (this.chosen) {
      for (var i = 0; i < this.chosen.length; i++) {
        response.push('option' + this.chosen[i] + ': ' + this.options[this.chosen[i]].text);
      }
      //return 'option' + this.response.index + ': ' + this.response.text;
    }
    return response.length > 0 ? response.join('; ') : null;
  }

  MultipleChoiceQuestion.prototype.serializeState = function () {
    return { chosen: this.chosen };
  }

  MultipleChoiceQuestion.prototype.updateCompletion = function () {
    var completion = 0;
    for (var i = 0; i < this.chosen.length; i++) {
      if (this.answers.includes(this.chosen[i])) completion++;
    }
    completion /= this.answers.length;
    this.setCompletion(completion);
    this.setScore(completion);
  }
  MultipleChoiceQuestion.prototype.checkChoice = function (choiceIndex, select) {
    this.optionsElements = this.optionsElements || this.dom.querySelectorAll('.question--multiple-choice__option');
    for (var i = 0; i < this.chosen.length; i++)
      if (this.chosen[i] == choiceIndex) {
        this.chosen.splice(i, 1);
        break;
      }
    this.chosen.push(choiceIndex);
    var correct = this.answers.includes(choiceIndex);
    this.response = { index: choiceIndex, text: this.options[choiceIndex].text, correct: this.options[choiceIndex].correct };
    if (this.article.feedback)
      this.optionsElements[choiceIndex].$addClass(correct ? 'correct' : 'incorrect');
    this.optionsElements[choiceIndex].querySelector('input').setAttribute('checked', 'true');
    this.updateCompletion();
    this.log({
      verb: 'answered',
      answer: this.optionsElements[choiceIndex].textContent,
      correct: correct
    })
    this.onAnswer();
  }
  MultipleChoiceQuestion.prototype.deserializeState = function (state) {
    if (state && state.chosen) {
      this.optionsElements = this.optionsElements || this.dom.querySelectorAll('.question--multiple-choice__option');
      this.chosen = state.chosen;
      var correct = false, choiceIndex;
      // restore
      for (var i = 0; i < this.chosen.length; i++) {
        choiceIndex = this.chosen[i];
        correct = this.answers.includes(choiceIndex);
        if (this.article.feedback)
          this.optionsElements[choiceIndex].$addClass(correct ? 'correct' : 'incorrect');
        if (i == this.chosen.length - 1) { //if last
          this.updateCompletion();
          this.response = { index: choiceIndex, text: this.options[choiceIndex].text, correct: this.options[choiceIndex].correct };
        }
      }
    }
  }

  //---------------------------------------------------------------------------------------
  /** 
   * @classdesc An open-ended question component.
   * @class
   * @augments QuestionBase
   * @inheritdoc
   */
  function OpenQuestion(article, loadOptions) { // constructor
    QuestionBase.call(this, article, loadOptions);
  }
  Textit.util.oop.inherits(OpenQuestion, QuestionBase); // inherit from Question Base
  OpenQuestion.prototype.questionType = 'open';
  OpenQuestion.prototype.createFromJson = function (data) {
    QuestionBase.prototype.createFromJson.call(this, data, 'question--open-ended');
    this.setContentHtml('<textarea rows="1"></textarea>');
    this.textarea = this.dom.querySelector('textarea');
    var self = this;
    this.clueOpened = false;
    this.textarea.addEventListener('input', function () {
      self._contentElement.style.height = 'auto';
      self.ontype(this.value);
      this.$autoexpand();
    })
    this.textarea.addEventListener('blur', function () {
      self._contentElement.style.height = self._contentElement.offsetHeight + 'px';
    })
    if (data.open)
      setTimeout(function () {
        self.expand()
      }, 10);

    window.addEventListener('load', function () { self.textarea.$autoexpand() });

    this.events.on('expand', function () {
      self.textarea.focus();
    })
  }

  OpenQuestion.prototype.solve = function () {
    this.textarea.value = ' ';
    this.ontype(this.textarea.value);
  }

  OpenQuestion.prototype.ontype = function (value) {
    if (value.length > 0) {
      if (this.completion != 1) {
        this.setCompletion(1);
        this.setScore(1);
      }
    } else {
      this.setCompletion(0);
      this.setScore(0);
    }

    this.record({
      interaction: 'type',
      answer: value,
    })
    this.onAnswer();
  }

  OpenQuestion.prototype.getUserResponse = function () {
    return this.textarea.value;
  }

  OpenQuestion.prototype.serializeState = function () {
    return { text: this.textarea.value };
  }

  OpenQuestion.prototype.createFromXML = function (xmlNode) {
    var stemdata = this._super.loadXML.call(this, xmlNode);
    this.createFromJson(stemdata);
  }

  OpenQuestion.prototype.deserializeState = function (state) {
    if (state && state.text) {
      this.textarea.value = state.text;
      this.textarea.$autoexpand();
      this.setCompletion(1);
      this.setScore(1);
    }
  }

  //---------------------------------------------------------------------------------------
  /** 
   * @classdesc A drag question component.
   * @class
   * @augments QuestionBase
   * @inheritdoc
   */
  function DragQuestion(article, loadOptions) { // constructor
    QuestionBase.call(this, article, loadOptions);
    this.autocheck = true;
  }
  Textit.util.oop.inherits(DragQuestion, QuestionBase); // inherit from Question Base
  DragQuestion.prototype.questionType = 'drag';
  DragQuestion.lassoSelector = null;
  DragQuestion.prototype.createFromJson = function (data) {
    // 0. call super and initilize attrubites
    QuestionBase.prototype.createFromJson.call(this, data, 'question--drag');
    this.answers = data.answers;
    this.answersElements = new Array(data.answers.length);
    this.droppedAnswers = [];
    this.correctAnswerGiven = 0;
    this.responses = [];
    this.setCompletionSteps(this.answers.length);
    // 1. set the component html
    this.setContentHtml('<div class="question--drag__dropzone"></div>')
    // 2. get the dropzone
    this.dropzone = this.dom.querySelector('.question--drag__dropzone');
    // 3. add the "lasso" tool - the selection tool
    this.btnLasso = Textit.util.createHtml({
      html: '<button class="question--lasso__tool"></button>',
      parent: this._stemElement
    });

    var self = this;

    for (var i = 0; i < this.answers.length; i++)
      this.responses[i] = null;

    this.article.dragDropManager.on('drag', 'marked_text', function (event) {
      self.handleDrag(event);
    })

    this.article.dragDropManager.createDropHandler('marked_text', function (dropParams) {
      return self.tryDrop(dropParams);
    })

    this.inuse = false;
    this.btnLasso.addEventListener('click', function (e) {
      e.stopPropagation();
      e.preventDefault();
      if (!self.inuse)
        self.useLasso();
      else
        self.stopLasso();
    })
  }

  DragQuestion.prototype.solve = function () {
    for (var i = 0; i < this.answers.length; i++) {
      this.addAnswer(this.answers[i][0]);
    }
  }

  DragQuestion.prototype.getUserResponse = function () {
    var responses = {};
    var otherResponsesIndex = 0;
    for (var i = 0; i < this.responses.length; i++)
      if (i < this.answers.length)
        responses['ti_' + i] = this.responses[i];
      else
        responses['other_' + (otherResponsesIndex++)] = this.responses[i];
    return responses;
  }

  DragQuestion.prototype.useLasso = function () {
    var self = this;
    this.inuse = true;
    this.btnLasso.$addClass('active')
    DragQuestion.lassoSelector = DragQuestion.lassoSelector || this.article.marker.createMarkType("lasso", 'rgba(0,0,0,0)', 'rgb(0,0,0)');


    // connect tool chain
    if (!Textit.util.isIE()) {
      this.article.setMarkType(DragQuestion.lassoSelector, false, 'none', 'drag');
      var rect = this.btnLasso.getBoundingClientRect();
      var scrollParent = this.article.getScrollParent(),
        scrollTop = scrollParent === window ? function () { return scrollParent.scrollY; } : function () { return scrollParent.scrollTop }
      var chain = this.chain = new ToolChain(rect.right - 5, scrollTop() + rect.top + 7, scrollParent);
      chain.setCursor(Textit.path("cursors/cursor-lasso.png"), 32, 32, 1, 27, 25, -20);
      this.markerMover = function (event) { chain.updateMousePos(event.clientX, scrollTop() + event.clientY); };
      this.escListener = function (event) { if (event.keyCode == 27) { self.stopLasso(); } };
      document.addEventListener('mousemove', this.markerMover);
      document.addEventListener('keydown', this.escListener);
    } else
      this.article.setMarkType(DragQuestion.lassoSelector, false, 'lasso');

    var mousedownhandler = function (e) { self.mousedown(e); }
    var mouseuphandler = function (e) { self.mouseup(e); }
    this.mousedownhandler = mousedownhandler;
    this.mouseuphandler = mouseuphandler;
    document.addEventListener('mousedown', mousedownhandler)
    document.addEventListener('mouseup', mouseuphandler)

  }

  DragQuestion.prototype.stopLasso = function () {
    this.inuse = false;
    if (this.chain) {
      this.chain.end();
    }
    this.btnLasso.$removeClass('active');
    this.article.setMarkType(null);
    this.article.marker.hide();
    this.article.marker.removeMarkRanges(DragQuestion.lassoSelector);
    document.removeEventListener('mouseup', this.mouseuphandler)
    document.removeEventListener('mousedown', this.mousedownhandler)
    document.removeEventListener('mousemove', this.markerMover);
    document.removeEventListener('keydown', this.escListener);
  }

  DragQuestion.prototype.mousedown = function (e) {
    if (DragQuestion.lassoSelector != null) {
      if (this.article.marker.isActive() && e.target.tagName != 'MARK')
        this.article.marker.hide();
    }
  }
  DragQuestion.prototype.mouseup = function (e) {
    var self = this;
    if (this.article.marker.isActive())
      this.chain.setCursor(Textit.path("cursors/cursor-grab.png"), 32, 32, 16, 16, 16, 0);
    else
      this.chain.setCursor(Textit.path("cursors/cursor-lasso.png"), 32, 32, 1, 27, 25, -20);
    if (!this.article.marker.isActive() && DragQuestion.lassoSelector != null) {
      setTimeout(function () {
        self.article.marker.removeMarkRanges(DragQuestion.lassoSelector);
      }, 700)
    }
    if (this.article.marker.isActive() && this.article.marker.getMarkRanges(DragQuestion.lassoSelector).array.length == 0)
      this.article.marker.hide();
  }

  DragQuestion.prototype.collapse = function () {
    this._super.collapse.call(this);
    // stop the lasso when collapsing
    if (this.inuse) this.stopLasso();
  }

  DragQuestion.prototype.createFromXML = function (xmlNode) {
    var stemdata = this._super.loadXML.call(this, xmlNode);
    var answersNodes = xmlNode.querySelectorAll('answer');
    var answers = [];
    for (var i = 0; i < answersNodes.length; i++) {
      var values = [], valueNodes = answersNodes[i].childNodes;
      for (var j = 0; j < valueNodes.length; j++) {
        values.push(valueNodes[j].textContent);
      }
      answers.push(values);
    }
    this.createFromJson(Textit.util.extend({
      answers: answers
    }, stemdata));
  }

  DragQuestion.prototype.serializeState = function () {
    return { droppedAnswers: this.droppedAnswers || [] };
  }

  DragQuestion.prototype.clear = function () {
    this.answersElements = new Array(this.answers.length);
    this.responses = new Array(this.answers.length);
    this.droppedAnswers = [];
    this.correctAnswerGiven = 0;
    this.setCompletion(0);
    this.droppedAnswers = [];
    this.dropzone.innerHTML = '';
  }

  DragQuestion.prototype.deserializeState = function (state) {
    if (state && state.droppedAnswers) {
      this.clear();
      for (var i = 0; i < state.droppedAnswers.length; i++)
        this.addAnswer(state.droppedAnswers[i]);
    }
  }

  DragQuestion.prototype.handleDrag = function (event) {
    if (event.draggable.getMarkType() != DragQuestion.lassoSelector && event.draggable.getMarkType() != this.article.defaultMarkType) return;
    if (this.article.marker.isActive()) this.article.marker.hide();
    var dist = 0;
    var y2 = event.y, x2 = event.x;
    var draggableRect = event.draggable.getBoundingClientRect();
    if (event.dragState == Textit.DROP_ZONE_EVENT.dragStart) {
      this.dom.style.transition = 'none';
      this.beforeDropState = {
        open: this.open
      }
      this.rect = Textit.util.getBoundingRect(this.dom);
      this.rect.dropStartHeight = this._contentElement.offsetHeight;
      this.rect.fullHeight = this._contentElement.scrollHeight;
    }

    if (draggableRect.top < this.rect.top)
      dist = this.rect.top - draggableRect.top;
    if (draggableRect.top > this.rect.top + this.rect.fullHeight)
      dist = draggableRect.top - (this.rect.top + this.rect.fullHeight);

    if (draggableRect.left - this.rect.left < 10 || this.rect.right - draggableRect.right < 10) {
      dist = 150;
    } else
      dist = 0;

    this.dom.setAttribute('data-drag-target', true)
    this._contentElement.style.height = Math.max(this.rect.fullHeight - dist * 3, this.rect.dropStartHeight) + 'px';

    if (event.dragState == Textit.DROP_ZONE_EVENT.dragEnd) {
      this.dom.removeAttribute('data-drag-target');
      this.dom.style.transition = '';
    }
  }

  DragQuestion.prototype.tryDrop = function (dropParams) {
    if (dropParams.draggable.getMarkType() != DragQuestion.lassoSelector && dropParams.draggable.getMarkType() != this.article.defaultMarkType) return;
    var y2 = dropParams.y, x2 = dropParams.x, dist = 0;
    var draggableRect = dropParams.draggable.getBoundingClientRect();

    if (draggableRect.top < this.rect.top)
      dist = this.rect.top - draggableRect.top;
    if (draggableRect.top > this.rect.top + this.rect.fullHeight)
      dist = draggableRect.top - (this.rect.top + this.rect.fullHeight);

    if (draggableRect.left - this.rect.left < 10 || this.rect.right - draggableRect.right < 10) {
      dist = 150;
    }

    if (dist < 50) {
      this.drop(dropParams.draggable);
      return true;
    }
    return false;
  }

  DragQuestion.prototype.lookupAnswer = function (answerText) {
    for (var i = 0; i < this.answers.length; i++) {
      for (var v = 0; v < this.answers[i].length; v++) {
        if (compareAnswers(this.answers[i][v], answerText))
          return i;
      }
    }
    return null;
  }

  DragQuestion.prototype.addAnswer = function (answerText) {
    var self = this;
    var answerel;
    answerel = document.createElement('div');

    answerel.className = 'dropped-answer';
    answerel.innerHTML = '<span class="answer-text">' + answerText + '</span>';

    if (this.article.embed) {
      var delBtn = document.createElement('span');
      delBtn.innerHTML = '&nbsp;';
      delBtn.className = 'del-btn';
      delBtn.addEventListener('click', function (e) {
        e.preventDefault(); e.stopPropagation();
        self.removeAnswer(answerel);
      })
      answerel.appendChild(delBtn)
    }

    var answerIndex = this.lookupAnswer(answerText);
    if (answerIndex != null) {
      this.answersElements[answerIndex] = answerel;
      this.correctAnswerGiven++;
      this.responses[answerIndex] = answerText;
      if (this.article.feedback)
        answerel.className += ' correct';
    } else {
      this.responses.push(answerText);
      if (this.article.feedback)
        answerel.className += ' incorrect';
    }
    this.setCompletion(this.correctAnswerGiven / this.answers.length);
    this.setScore(this.correctAnswerGiven / this.answers.length);
    this.dropzone.appendChild(answerel);
    this.droppedAnswers.push(answerText);

    return answerel;
  }

  DragQuestion.prototype.removeAnswer = function (answerel) {

    var correct = answerel.classList.contains('correct');
    var text = answerel.textContent;
    for (var i = 0; i < this.droppedAnswers.length; i++) {
      if (compareAnswers(text, this.droppedAnswers[i])) {
        this.droppedAnswers.splice(i, 1);
        break;
      }
    }

    for (var responseIndex = 0; responseIndex < this.responses.length; responseIndex++) {
      if (compareAnswers(text, this.responses[responseIndex])) {
        if (responseIndex < this.answers.length)
          this.responses[responseIndex] = null;
        else
          this.responses.splice(responseIndex, 1);
        break;
      }
    }

    for (var i = 0; i < this.answersElements.length; i++) {
      if (this.answersElements[i] == answerel)
        this.answersElements[i] = null;
    }
    if (correct) {
      this.correctAnswerGiven--;
      this.setCompletion(this.correctAnswerGiven / this.answers.length)
      this.setScore(this.correctAnswerGiven / this.answers.length)
    }
    answerel.parentNode.removeChild(answerel);
    //this.reflow();
    this.expand(this.dropzone.offsetHeight);

    this.record({ interaction: 'remove', answer: text, wascorrect: correct }, true)
    this.onAnswer();
  }

  DragQuestion.prototype.drop = function (draggable) {
    var textframe = document.querySelector('.draggedTextFrame');
    textframe.parentNode.removeChild(textframe);
    draggable.removeMark();
    var draggabletext = draggable.getText();
    var answerIndex = this.lookupAnswer(draggabletext);
    var answerel;
    var draggableLineElements = draggable.getLineElements();

    if (answerIndex != null && this.answersElements[answerIndex]) { //if answer already exists
      answerel = this.answersElements[answerIndex]
      Textit.util.addClass(answerel, 'blink');
      for (var i = 0; i < draggableLineElements.length; i++) {
        draggableLineElements[i].style.transition = 'opacity .5s, top .5s, left .5s';
        draggableLineElements[i].style.opacity = 0;
        draggableLineElements[i].style.top = this.answersElements[answerIndex].getBoundingClientRect().top + 'px';
        draggableLineElements[i].style.left = this.answersElements[answerIndex].getBoundingClientRect().left + 'px';
      }

      this.record({
        interaction: 'drop',
        answer: draggabletext,
        completion: this.completion,
        success: false,
        correct: true
      })

      setTimeout(function () {
        Textit.util.removeClass(answerel, 'blink');
      }, 1000);
    } else { // option doesn't exist
      answerel = this.addAnswer(draggabletext);

      this.record({
        interaction: 'drop',
        answer: draggabletext,
        completion: this.completion,
        correct: answerIndex != null
      })

      var answerLine, answerLines = [];
      answerel.removeChild(answerel.querySelector('.answer-text'));
      answerel.className += ' animating';
      for (var i = 0; i < draggableLineElements.length; i++) {
        answerLine = draggableLineElements[i].cloneNode(true);
        answerLine.style.cssText = 'position:relative; opacity:0; background-color:transparent;';
        answerel.appendChild(answerLine);
        answerLines.push(answerLine);
        answerLine.appendChild(document.createTextNode(' '));
      }
      this.dropzone.appendChild(answerel);

      this.dropzone.offsetHeight; // force reflow

      // animate
      for (var i = 0; i < draggableLineElements.length; i++) {
        var draggedNodes = draggableLineElements[i].childNodes,
          placeholderNodes = answerLines[i].childNodes;
        var draggedLineTop = draggableLineElements[i].offsetTop,
          draggedLineLeft = draggableLineElements[i].offsetLeft;
        draggableLineElements[i].style.backgroundColor = 'transparent';
        draggableLineElements[i].style.boxShadow = 'none';
        for (var j = 0, len = draggedNodes.length; j < len; j++) {
          var startRect = draggedNodes[j].getBoundingClientRect()
            , endRect = placeholderNodes[j].getBoundingClientRect();

          draggedNodes[j].style.transition = 'top .5s, left .5s';
          draggedNodes[j].style.top = endRect.top - draggedLineTop + 'px';
          draggedNodes[j].style.left = endRect.left - draggedLineLeft + 'px';
        }
      }

      this.onAnswer();
      setTimeout(this.reflow.bind(this), 1000);
    }

    setTimeout(function () {
      for (var i = 0; i < draggableLineElements.length; i++) {
        draggableLineElements[i].parentNode.removeChild(draggableLineElements[i]);
        if (answerLines)
          answerLines[i].style.cssText = 'position:relative;';
      }
      Textit.util.removeClass(answerel, 'animating');
    }, 500);

    this.expand();
  }

  //---------------------------------------------------------------------------------------
  /** 
   * @classdesc A mark question component.
   * @class
   * @augments QuestionBase
   * @inheritdoc
   */
  function MarkQuestion(article, loadOptions) { // constructor
    QuestionBase.call(this, article, loadOptions);
    MarkQuestion.numCreated += 1;
    this.autocheck = true;
  }
  Textit.util.oop.inherits(MarkQuestion, QuestionBase); // inherit from Question Base
  MarkQuestion.prototype.questionType = 'mark';
  MarkQuestion.numCreated = 0; // how many mark questions were create
  MarkQuestion.colors = {
    'green': { marker: 'rgba(0,255,0,0.4)', outline: 'rgb(0,128,0)' },
    'red': { marker: 'rgba(255,0,0,0.4)', outline: 'rgb(128,0,0)' },
    'purple': { marker: '#ff9df5', outline: 'rgb(161, 86, 149)' },
    'blue': { marker: '#9dfffe', outline: 'rgb(79, 77, 159)' },
  }
  MarkQuestion.prototype.createFromJson = function (data) {
    var createdMarkTools = [];
    data.stem = data.stem.replace(/(\s+)\[(\w)\](\s+)/g, function (all, spaceBefore, colorLetter, spaceAfter) {
      colorLetter = colorLetter.toUpperCase();

      for (var color in MarkQuestion.colors) {
        if (color[0].toUpperCase() === colorLetter) {
          createdMarkTools.push(color);
          return spaceBefore + '<button class="question--mark__tool" data-color="' + color + '"></button>' + spaceAfter;
        }
      }
      return all;
    });
    QuestionBase.prototype.createFromJson.call(this, data, 'question--mark');
    this.colors = [];
    this.marks = {};
    this.markHandlers = {};
    this.answers = {};
    this.responses = {};
    for (var i = 0; i < data.answers.length; i++) {
      var color = data.answers[i].color;
      if (!this.colors.includes(data.answers[i].color)) {
        this.colors.push(color);
        this.answers[color] = [];
        this.responses[color] = [];
      }
      // push to answers
      this.answers[color].push(data.answers[i]);
      this.responses[color].push(null);
    }

    var extraButtons = [];
    for (var i = 0; i < this.colors.length; i++) {
      var color = this.colors[i];
      this.marks[color] = [];
      this.markHandlers[color] = this.article.marker.createMarkType("markQuestion" + MarkQuestion.numCreated, MarkQuestion.colors[color].marker, MarkQuestion.colors[color].outline);
      if (!createdMarkTools.includes(color))
        extraButtons.push('<button class="question--mark__tool" data-color="' + color + '"></button>');
    }
    if (extraButtons != [])
      this._stemElement.innerHTML += ' ' + extraButtons.join(' ');

    this.bind();
    this.setCompletionSteps(data.answers.length);
  }

  MarkQuestion.prototype.solve = function () {
    for (var color in this.answers) {
      for (var i = 0; i < this.answers[color].length; i++) {
        var text = this.answers[color][i].values[0];
        var range = this.article.search(text);
        this.article.marker.markWordRange(range.from, range.to, this.markHandlers[color]);
      }
      this.onMarkChanged(color);
    }
  }

  MarkQuestion.prototype.bind = function () {
    var markToolIcons = this.dom.querySelectorAll('.question--mark__tool')
    var color;
    var self = this;
    this._markToolElements = {};
    for (var i = 0, len = markToolIcons.length; i < len; i++) {
      color = markToolIcons[i].dataset.color;
      this._markToolElements[color] = markToolIcons[i];
      markToolIcons[i].addEventListener('click', (function (colorIndex) {
        return function (e) { e.stopPropagation(); e.preventDefault(); self.mousePos = { x: e.clientX, y: e.clientY }; self.usemark(colorIndex); }
      })(color));
    }

    this.article.marker.on('change', function (e) {
      for (var color in self.marks)
        if (self.markHandlers[color] == e.markType) {
          self.onMarkChanged(color);
          break;
        }
    })
  }

  MarkQuestion.prototype.findMark = function (color, range) {
    var rangesArray = color instanceof Array ? color : this.marks[color];
    for (var markIndex = 0; markIndex < rangesArray.length; markIndex++) {
      if (rangesArray[markIndex].from == range.from && rangesArray[markIndex].to == range.to) {
        return rangesArray[markIndex];
      }
    }
    return null;
    /*
    this.marks[color] = [{from: 5,  to: 10, correct: false, feedback:}]
    */
  }

  MarkQuestion.prototype.onMarkChanged = function (color) {
    var changes = this.checkMark(color, this.article.marker.getMarkRanges(this.markHandlers[color]));

    var action = {
      interaction: 'mark',
      color: color,
    };
    if (changes.added.length > 0)
      action.added = changes.added;
    if (changes.removed.length > 0)
      action.removed = changes.removed;
    if (changes.added.length == 1 && changes.removed.length == 0) // simple add;
      action.correct = changes.added[0].correct;
    action.responses = this.getUserResponse(color);
    this.record(action, true);
    this.onAnswer();
  }
  // --------------------------------------------
  MarkQuestion.prototype.checkMark = function (color, ranges) {
    var feedback, mark;
    var addedMarks = [];
    var removedMarks = [];
    var unchangedMarks = [];
    for (var i = 0; i < ranges.array.length; i++) { // for each mark to check
      mark = this.findMark(color, ranges.array[i]);
      if (mark == null) { // new mark
        mark = { from: ranges.array[i].from, to: ranges.array[i].to, correct: false, text: this.article.getRangeText(ranges.array[i]) }
        mark.correct = this.addResponse(color, mark.text, ranges.array[i].from);
        addedMarks.push(mark);
      } else
        unchangedMarks.push(mark);
    }
    // remove deleted marks
    for (var i = 0; i < this.marks[color].length; i++) {
      mark = this.marks[color][i];
      if (!this.findMark(unchangedMarks, mark) && // if mark isn't in unchanged marks
        !this.findMark(addedMarks, mark)) { // or in added marks, it was removed
        removedMarks.push(mark);
        this.article.getWordByIndex(mark.from).element.$removeClass(mark.correct ? 'mark-correct' : 'mark-incorrect');
        this.marks[color].splice(i, 1);
        this.removeResponse(color, mark.text);
        i--;
      }
    }

    // add the new marks to stage
    Array.prototype.push.apply(this.marks[color], addedMarks);
    var self = this;
    if (this.article.feedback)
      setTimeout(function () {
        for (var i = 0; i < addedMarks.length; i++)
          self.article.getWordByIndex(addedMarks[i].from).element.$addClass(addedMarks[i].correct ? 'mark-correct' : 'mark-incorrect');
      }, 10)

    this.updateCompletion();

    return { added: addedMarks, unchanged: unchangedMarks, removed: removedMarks };
  }

  /**
  * @returns whether correct
  */
  MarkQuestion.prototype.addResponse = function (color, response, location) {
    var _answer, _value;
    // try to add as correct answer
    for (var answerIndex = 0; answerIndex < this.answers[color].length; answerIndex++) {
      _answer = this.answers[color][answerIndex];
      for (var valueIndex = 0; valueIndex < _answer.values.length; valueIndex++) {
        if (compareAnswers(_answer.values[valueIndex], response)) {
          this.responses[color][answerIndex] = { text: response, location: location };
          return true;
        }
      }
    }
    // add as incorrect response, to the end of the responses (but ordered!)
    for (var i = this.answers[color].length; i <= this.responses[color].length; i++) {
      if (i == this.responses[color].length || location < this.responses[color][i].location) {
        this.responses[color].splice(i, 0, { text: response, location: location });
        break;
      }
    }
    return false;
  }

  MarkQuestion.prototype.removeResponse = function (color, response) {
    for (var responseIndex = 0; responseIndex < this.responses[color].length; responseIndex++) {
      if (this.responses[color][responseIndex] != null && compareAnswers(this.responses[color][responseIndex].text, response)) {
        if (responseIndex < this.answers[color].length) {
          this.responses[color][responseIndex] = null;
        } else {
          this.responses[color].splice(responseIndex, 1);
          responseIndex--;
        }
        return true;
      }
    }
    return false;
  }

  MarkQuestion.prototype.updateCompletion = function () {
    var sumAnswers = 0;
    var sumCorrectResponses = 0;
    for (var color in this.answers) {
      for (var i = 0; i < this.answers[color].length; i++)
        if (this.responses[color][i])
          sumCorrectResponses++;
      sumAnswers += this.answers[color].length;
    }
    this.setCompletion(sumCorrectResponses / sumAnswers);
    this.setScore(sumCorrectResponses / sumAnswers);
  }
  MarkQuestion.prototype.usemark = function (color) {
    if (this.activeMark == color) {
      this.endMark(color);
      this.record({
        interaction: 'drop-tool',
        color: color
      })
    }
    else {
      this.record({
        interaction: 'grab-tool',
        color: color
      })
      this.activeMark != null && this.endMark(this.activeMark);
      this.startMark(color);
    }
  }
  MarkQuestion.prototype.startMark = function (color) {
    this.activeMark = color;
    if (!this.expanded) return this.expand(), setTimeout(this.startMark.bind(this, color), 350), false;
    var self = this;
    Textit.util.addClass(this._markToolElements[color], 'selected');
    if (Textit.util.isIE()) {
      this.article.setMarkType(this.markHandlers[color], true, 'mark-' + color);
    } else {
      this.article.setMarkType(this.markHandlers[color], true, 'none');
      var rect = this._markToolElements[color].getBoundingClientRect();
      var scrollParent = this.article.getScrollParent(),
        scrollTop = scrollParent === window ? function () { return scrollParent.scrollY; } : function () { return scrollParent.scrollTop }
      var chain = this.chain = new ToolChain(rect.right - 5, scrollTop() + rect.top + 7, scrollParent);
      chain.setCursor(Textit.path("cursors/mark-" + color + ".png"), 32, 32, 1, 27, 25, -20);
      this.markerMover = function (event) {  chain.updateMousePos(event.clientX, scrollTop() + event.clientY); };
      this.escListener = function (event) { if (event.keyCode == 27) { self.endMark(self.activeMark); } };
      document.addEventListener('mousemove', this.markerMover);
      document.addEventListener('keydown', this.escListener);
      if (self.mousePos)
        chain.updateMousePos(self.mousePos.x, scrollTop() + self.mousePos.y);
    }
  }

  MarkQuestion.prototype.getUserResponse = function (color) {
    if (color != null)
      return this.responses[color];
    var res = {};
    var otherResponsesIndex = 0;
    for (var color in this.responses) {
      res[color] = {};
      for (var index in this.responses[color]) {
        if (index < this.answers[color].length)
          res[color]['ti_' + index] = this.responses[color][index] == null ? null : this.responses[color][index].text;
        else
          res[color]['other_' + (otherResponsesIndex++)] = this.responses[color][index].text;
      }
    }
    return res;
  }


  MarkQuestion.prototype.endMark = function (color) {
    if (this.chain) {
      this.chain.end();
      document.removeEventListener("mousemove", this.markerMover);
      document.removeEventListener("keydown", this.escListener);
      this.chain = null;
    }
    Textit.util.removeClass(this._markToolElements[color], 'selected');
    if (this.activeMark == color) {
      this.article.setMarkType(null);
      this.activeMark = null;
    }
  }

  MarkQuestion.prototype.collapse = function () {
    this._super.collapse.call(this);
    if (this.activeMark != null) {
      this.usemark(this.activeMark);
    }
  }

  MarkQuestion.prototype.expand = function () {
    if (this.activeMark == null) {
      setTimeout(this.usemark.bind(this, this.colors[0]), 350);
    } else
      this._super.expand.call(this);
  }

  MarkQuestion.prototype.createFromXML = function (xmlNode) {
    var stemdata = this._super.loadXML.call(this, xmlNode);
    var answersNodes = xmlNode.querySelectorAll('answer');
    var answers = [];
    for (var i = 0; i < answersNodes.length; i++) {
      var values = [], valueNodes = answersNodes[i].childNodes;
      for (var j = 0; j < valueNodes.length; j++) {
        values.push(valueNodes[j].textContent);
      }
      answers.push({ color: answersNodes[i].getAttribute('color'), values: values });
    }
    this.createFromJson(Textit.util.extend({
      answers: answers
    }, stemdata));
  }

  MarkQuestion.prototype.serializeState = function () {
    var state = { marks: {} };
    for (var color in this.marks) {
      state.marks[color] = [];
      for (var i = 0; i < this.marks[color].length; i++) {
        state.marks[color].push([this.marks[color][i].from, this.marks[color][i].to])
      }
    }
    return state;
  }

  MarkQuestion.prototype.deserializeState = function (state) {
    if (state && state.marks) {
      for (var color in state.marks) {
        this.article.marker.setMarkRanges(new TRanges(state.marks[color]), this.markHandlers[color]);
        this.checkMark(color, this.article.marker.getMarkRanges(this.markHandlers[color]), { silent: true });
      }
    }
  }

  //---------------------------------------------------------------------------------------
  /** 
   * @classdesc A cloze question component.
   * @class
   * @augments QuestionBase
   * @inheritdoc
   */
  function ClozeQuestion(article, loadOptions) { // constructor
    QuestionBase.call(this, article, loadOptions);
    this.autocheck = true;
  }
  Textit.util.oop.inherits(ClozeQuestion, QuestionBase); // inherit from Question Base
  ClozeQuestion.prototype.questionType = 'cloze';
  ClozeQuestion.prototype.createFromJson = function (data) {
    QuestionBase.prototype.createFromJson.call(this, data, 'question--cloze');
    var html;

    this.blanks = [];
    var compId = this.article.components.length;
    var draggableOptions = [];

    for (var i = 0; i < data.clozes.length; i++)
      Textit.util.math.randominsert(draggableOptions,
        '<span class="draggable-cloze-option">' + data.clozes[i].answer + '</span>');

    var initblanks = this.initblanks.bind(this, data.clozes);
    // init blanks
    if (this.article.isReady) initblanks()
    else this.article.on('ready', initblanks);


    // 5. set content html
    this.setContentHtml('<div class="question--cloze__bank">' +
                            '<span class="question--cloze__bank__title">' + Textit.strings[this.article.lang].ui.question_cloze_bank + '</span>' +
                             draggableOptions.join('') + '</div>')

    this.optionsContainer = this.dom.querySelector('.question--cloze__bank');
    this.optionsElements = this.optionsContainer.querySelectorAll('.draggable-cloze-option');
    var self = this;

    this.article.dragDropManager.on('drag', 'cloze', function (event) {
      self.handleDrag(event);
    })

    this.article.dragDropManager.createDropHandler('cloze', function (dropParams) {
      return self.handleDrop(dropParams);
    })

    this.setCompletionSteps(data.clozes.length);
  }

  ClozeQuestion.prototype.initblanks = function (blanks, paragraph) {
    // 1. find the paragraph relevant to the cloze
    if (paragraph == undefined) {
      paragraph = this.article.components[this.componentIndex + 1];
      if (!(paragraph instanceof Textit.Components.Paragraph))
        paragraph = null;
    }

    // 2. go through all of the blanks...
    var ranges = [];
    for (var i = 0; i < blanks.length; i++) {
      var range = this.article.search(blanks[i].source, paragraph, ranges);
      if (range == null) {
        this.article.error('Cloze Question (compid:' + this.componentIndex + ') could not create blanks on term "' + blanks[i].source + '" because it was not found in the source')
        continue;
      }
      var word = range.from;
      var blank = Textit.util.createHtml({
        html: '<span class="blank" data-question="' + this.componentIndex + '" style="display:none;"></span>'
      });
      this.blanks.push({ range: range, el: blank, element: blank, correctAnswer: blanks[i].answer });
      var before = range.from.element;
      if (before.parentNode.className == 'hotword') before = before.parentNode;
      before.parentNode.insertBefore(blank, before);
      ranges.push(range);
      blank.addEventListener('click', this.blankClicked.bind(this));
    }

    // 3. sort blanks by the sequence they appear in the text
    this.blanks.sort(function (a, b) {
      return a.range.from.index - b.range.from.index;
    })
  }

  ClozeQuestion.prototype.blankClicked = function () {
    this.expand();
  }

  ClozeQuestion.prototype.solve = function () {
    for (var i = 0; i < this.blanks.length; i++) {
      this.fillBlank(i, this.blanks[i].correctAnswer);
    }
  }

  ClozeQuestion.prototype.getUserResponse = function () {
    var response = {};
    for (var i = 0; i < this.blanks.length; i++) {
      response['ti_' + i] = this.blanks[i].text || null;
    }
    return response;
  }
  ClozeQuestion.prototype.setActive = function (isactive) {
    for (var i = 0; i < this.blanks.length; i++) {
      var word = this.blanks[i].range.from;
      word.element.style.display = isactive ? 'none' : '';
      word.blank = isactive ? this.blanks[i].el : null;
      if (word.element.previousElementSibling && word.element.previousElementSibling.$hasClass('hotword__translation')) {
        word.element.previousElementSibling.style.display = isactive ? 'none' : '';
      }
      while (word != this.blanks[i].range.to) {
        word = word.nextWord;
        word.blank = isactive ? this.blanks[i].el : null;
        word.element.style.display = isactive ? 'none' : '';
        if (word.element.previousElementSibling && word.element.previousElementSibling.$hasClass('hotword__translation')) {
          word.element.previousElementSibling.style.display = isactive ? 'none' : '';
        }
      }
      this.blanks[i].el.style.display = isactive ? '' : 'none';
    }
  }

  ClozeQuestion.prototype.handleDrag = function (event) {
    if (event.draggable.sourceQuestion != this) // dragged from a different cloze?
      return;
    var draggableRect = event.draggable.getBoundingRect(), clozeElement;
    var found = event.dragState == 'end';
    for (var i = 0; i < this.blanks.length; i++) {
      clozeElement = this.blanks[i].element;
      if (!found && Textit.util.math.intersectRect(clozeElement.getBoundingClientRect(), draggableRect)) {
        Textit.util.addClass(clozeElement, 'blank--target')
        found = true;
      } else
        Textit.util.removeClass(clozeElement, 'blank--target')
    }
    if (Textit.util.math.intersectRect(this.dom.getBoundingClientRect(), draggableRect)) {

    }
  }

  ClozeQuestion.prototype.handleDrop = function (event) {
    if (event.draggable.sourceQuestion != this) // dragged from a different cloze?
      return;
    var draggableRect = event.draggable.getBoundingRect(), clozeElement;
    for (var i = 0; i < this.blanks.length; i++) {
      clozeElement = this.blanks[i].element;
      if (Textit.util.math.intersectRect(clozeElement.getBoundingClientRect(), draggableRect)) {
        var correct = this.fillBlank(i, event.draggable.getText());
        if (event.draggable.fromBlank)
          this.clearBlank(event.draggable.source.parentNode, { silent: true });

        this.record({
          interaction: 'drop', text: event.draggable.getText(), correct: correct, blank: {
            from: this.blanks[i].range.from.index,
            to: this.blanks[i].range.to.index,
            id: i
          }
        })
        this.onAnswer();
        return true;
      }
    }
    //if (Textit.util.math.intersectRect(this.dom.getBoundingClientRect(), draggableRect)) {
    if (event.draggable.source.parentNode != this.optionsContainer) {
      //this.addOption(event.draggable.getText());
      this.expand();
      var newOption = this.addOption(event.draggable.getText());
      var draggable = new Textit.Draggables.DraggableClozeOption(newOption, this.article);
      var blankRect = event.draggable.getBoundingClientRect();
      draggable.draggingEl.style.top = blankRect.top + 'px';
      draggable.draggingEl.style.left = blankRect.left + 'px';
      draggable.drop(false);
      if (event.draggable.fromBlank)
        this.clearBlank(event.draggable.source.parentNode);
      return true;
    }
    //}
    return false;
  }
  ClozeQuestion.prototype.createFromXML = function (xmlNode) {
    var stemdata = this._super.loadXML.call(this, xmlNode);
    var clozesNodes = xmlNode.querySelectorAll('cloze');
    var clozes = [];
    for (var i = 0; i < clozesNodes.length; i++) {
      clozes.push({ source: clozesNodes[i].getAttribute('source'), answer: clozesNodes[i].textContent });
    }
    this.createFromJson(Textit.util.extend({
      clozes: clozes
    }, stemdata));
  }

  ClozeQuestion.prototype.removeOption = function (option) {
    this.optionsElements = this.optionsContainer.querySelectorAll('.draggable-cloze-option');
    if (typeof option == 'string') {
      for (var i = 0, len = this.optionsElements.length; i < len; i++) {
        if (compareAnswers(this.optionsElements[i].textContent, option)) {
          option = this.optionsElements[i]; break;
        }
      }
    }
    if (option && option.nodeType)
      option.parentNode.removeChild(option);
  }
  ClozeQuestion.prototype.addOption = function (option) {
    return Textit.util.createHtml({
      html: '<span class="draggable-cloze-option">' + option + '</span>',
      parent: this.optionsContainer
    });

  }

  ClozeQuestion.prototype.reflowBlank = function (blankIndex) {
    var blank = this.blanks[blankIndex];
    var blankEl = blank.element;
    var attempts = 0;
    function reflow() {
      if (!blank.text || blank.text == '') { // reflow ot empty...
        blankEl.style.width = '';
        return;
      }
      var w = blankEl.firstChild.offsetWidth;
      if (w != 0) {
        blankEl.style.width = blankEl.firstChild.offsetWidth + 'px';
        setTimeout(function () {
          blankEl.style.width = 'auto';
        }, 1000);
      } else {
        attempts++;
        if (attempts < 20)
          setTimeout(reflow, 50);
      }
    }
    setTimeout(reflow, 50);
  }

  ClozeQuestion.prototype.fillBlank = function (blankIndex, answer) {
    this.removeOption(answer);
    if (this.blanks[blankIndex].text != null && this.blanks[blankIndex].text != answer) {
      var newOption = this.addOption(this.blanks[blankIndex].text);
      var draggable = new Textit.Draggables.DraggableClozeOption(newOption, this.article);
      var blankRect = this.blanks[blankIndex].element.getBoundingClientRect();
      draggable.draggingEl.style.top = blankRect.top + 'px';
      draggable.draggingEl.style.left = blankRect.left + 'px';
      draggable.drop(false);
    }
    var blankEl = this.blanks[blankIndex].element;
    blankEl.innerHTML = '<span class="draggable-cloze-option">' + answer + '</span>';
    this.reflowBlank(blankIndex);
    this.blanks[blankIndex].text = answer;

    var correct = compareAnswers(answer, this.blanks[blankIndex].correctAnswer);
    if (this.article.feedback)
      this.blanks[blankIndex].element.className = correct ? 'blank correct' : 'blank incorrect';
    this.blanks[blankIndex].correct = correct;
    this.updateCompletion();
    return correct;
  }
  ClozeQuestion.prototype.clearBlank = function (blankEl, options) {
    for (var blankIndex = 0; blankIndex < this.blanks.length; blankIndex++) {
      if (this.blanks[blankIndex].element == blankEl) {
        var action = {
          interaction: 'cloze-remove', text: this.blanks[blankIndex].text, wascorrect: this.blanks[blankIndex].correct, blank: {
            from: this.blanks[blankIndex].range.from.index,
            to: this.blanks[blankIndex].range.to.index,
            id: blankIndex
          }
        };
        this.blanks[blankIndex].text = null;
        this.blanks[blankIndex].correct = false;
        this.blanks[blankIndex].element.innerHTML = '';
        this.blanks[blankIndex].element.className = 'blank';
        this.blanks[blankIndex].element.style.width = '';
        this.updateCompletion();
        if (!(options && options.silent)) {
          this.record(action, true);
          this.onAnswer();
        }
        break;
      }
    }
  }
  ClozeQuestion.prototype.updateCompletion = function () {
    var corrects = 0;
    for (var blankIndex = 0; blankIndex < this.blanks.length; blankIndex++) {
      if (this.blanks[blankIndex].correct) corrects++;
    }
    this.setCompletion(corrects / this.blanks.length);
    this.setScore(corrects / this.blanks.length);
  }
  ClozeQuestion.prototype.serializeState = function () {
    var data = { blanks: [] };
    for (var i = 0; i < this.blanks.length; i++) {
      data.blanks[i] = { text: this.blanks[i].text };
    }
    return data;
  }


  ClozeQuestion.prototype.deserializeState = function (state) {
    if (state && state.blanks) {
      for (var i = 0; i < state.blanks.length; i++) {
        if (this.blanks[i].text != null && state.blanks[i].text == null) {
          this.addOption(this.blanks[i].text);
        }
        this.clearBlank(this.blanks[i].element, { silent: true });
        if (state.blanks[i].text != null && state.blanks[i].text != this.blanks[i].text) {
          var blankIndex = i, answer = state.blanks[i].text;
          this.removeOption(state.blanks[i].text);
          var blankEl = this.blanks[blankIndex].element;
          blankEl.innerHTML = '<span class="draggable-cloze-option">' + answer + '</span>';
          this.reflowBlank(blankIndex);
          this.blanks[blankIndex].text = answer;

          var correct = compareAnswers(answer, this.blanks[blankIndex].correctAnswer);
          if (this.article.feedback)
            this.blanks[blankIndex].element.className = correct ? 'blank correct' : 'blank incorrect';
          this.blanks[blankIndex].correct = correct;
        }
      }
      this.updateCompletion();
    }
  }

  /**
  * Factory for questions
  * @func
  */
  var questionIndex = 0;
  function CreateQuestionOfType(type, article, options) {
    var question_component;
    options.questionIndex = questionIndex++;
    switch (type) {
      case 'multiplechoice':
        question_component = new MultipleChoiceQuestion(article, options);
        break;
      case 'open':
        question_component = new OpenQuestion(article, options);
        break;
      case 'drag':
        question_component = new DragQuestion(article, options);
        break;
      case 'mark':
        question_component = new MarkQuestion(article, options);
        break;
      case 'cloze':
        question_component = new ClozeQuestion(article, options);
        break;
    }
    return question_component;
  }

  function compareAnswers(text1, text2) {
    if (text1 == null || text2 == null) return false;
    var words1 = Textit.Word.Tokenize(text1)
        , word2 = Textit.Word.Tokenize(text2);
    return Textit.util.compareArrays(words1, word2);
  }

  return {
    MultipleChoiceQuestion: MultipleChoiceQuestion,
    OpenQuestion: OpenQuestion,
    DragQuestion: DragQuestion,
    MarkQuestion: MarkQuestion,
    Question: QuestionBase,
    CreateQuestionOfType: CreateQuestionOfType
  }

})();