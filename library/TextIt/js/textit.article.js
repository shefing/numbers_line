var Textit = Textit || {};
Textit.XML = Textit.XML || {};

Textit.XML.Mappings = {
  'list': 'ul',
  'numberedlist': 'ol',
  'item': 'li',
  'strong': 'strong'
}
//-------------------------------------------------------
Textit.Article = function () {
  this.isOrigin = false;
  this.feedback = true;
  var self = this;
  self.title = null;
  self.words = [];
  self.events = Textit.util.EventEmitter();
  self.on = self.events.on;
  self.dom = document.createElement('article');

  self.cardsContainer = document.createElement('div');
  self.cardsContainer.className = 'cards-cotainer';
  self.dom.appendChild(self.cardsContainer);

  this.scores = [];
  self.components = [];
  self.elements = [];
  self.questions = [];
  self.notes = [];
  self.cards = {};
  self.marker = Textit.ArticleMarker(self);
  self.defaultMarkType = self.marker.createMarkType("defaultMarker", "rgba(255,255,0,0.4)", "orange");
  self.markType = self.defaultMarkType;
  self.styles = { text: null, questions: null };

  this.dragDropManager = new Textit.dragDropManager(this);

  this.bindEvents();

  this.markRanges = new TRanges();
  this.marker.on('change', function (e) {
    if (e.markType == self.defaultMarkType)
      self.onMarkChanged();
  });
  this.marker.on('like', function (e) {
    self.onLikeChanged({ action: 'add', range: e.range, text: self.getRangeText(e.range) });
    //self.record(self, { interaction: 'like', range: e.range, text: self.getRangeText(e.range) });
  });

  this.marker.on('unlike', function (e) {
    self.onLikeChanged({ action: 'remove', range: e.range, text: self.getRangeText(e.range) });
    //self.record(self, { interaction: 'unlike', range: e.range, text: self.getRangeText(e.range) });
  });

  window.addEventListener('load', function () {
    setTimeout(function () {
      self.setOrigin(false);
    }, 100);
  })
}
Textit.Article.prototype.getScrollParent = function () {
  if (!this.scrollParent) this.scrollParent = Textit.util.findScrollParent(this.dom);
  return this.scrollParent;
}
//-------------------------------------------------------
Textit.Article.prototype.setMarkType = function (markType, autoApply, cursor, interaction) {
  this.dom.removeAttribute('data-hand-mark');
  if (markType === null || markType === undefined) {
    //Textit.Draggables.DraggableMark.setWhiteList(null);
    this.dom.removeAttribute('data-interactable-marks');
    this.markType = this.defaultMarkType;
    this.setCursor('');
  } else {
    this.markType = markType;
    if (interaction === 'drag')
      this.dom.dataset.handMark = this.markType;
    if (interaction == 'none')
      this.dom.setAttribute('data-interactable-marks', 'none');
    this.setCursor(cursor);
  }
  if (autoApply != undefined)
    this.autoApplyMark = autoApply;
  else
    this.autoApplyMark = true;
}
//-------------------------------------------------------
Textit.Article.prototype.createDynmaicStylesheet = function () {

}
//-------------------------------------------------------
Textit.Article.prototype.serializeState = function () {
  var state = {};
  state['styleIndex'] = this.styleIndex;
  state['marker'] = this.marker.serializeMarks(this.defaultMarkType);
  state['likes'] = this.marker.serializeLikes();

  state.elements = [];
  for (var i = 0; i < this.elements.length; i++) {
    state.elements.push('serializeState' in this.elements[i] ? this.elements[i].serializeState() : {})
  }
  state.components = []
  for (var i = 0; i < this.components.length; i++) {
    state.components.push('serializeState' in this.components[i] ? this.components[i].serializeState() : {})
  }
  state.cards = {}
  for (var cardterm in this.cards) {
    if (this.cards[cardterm] && 'serializeState' in this.cards[cardterm])
      state.cards[cardterm] = this.cards[cardterm].serializeState();
  }

  state.notes = [];
  for (var i = 0; i < this.notes.length; i++) {
    state.notes.push(this.notes[i].serialize());
  }

  return state;
}
//-------------------------------------------------------
Textit.Article.prototype.deserializeState = function (state) {
  if (state == null) {
    return;
  }
  if (typeof state == 'string') {
    state = JSON.parse(state);
  }

  for (var i = 0; i < this.elements.length; i++) {
    if ('deserializeState' in this.elements[i]) {
      this.elements[i].deserializeState(state.elements[i]);
    }
  }
  if (state.components) {
    for (var i = 0; i < this.components.length; i++) {
      if ('deserializeState' in this.components[i]) {
        this.components[i].deserializeState(state.components[i]);
      }
    }
  }
  if (state.cards) {
    for (var cardterm in state.cards) {
      if (this.cards[cardterm] && 'deserializeState' in this.cards[cardterm])
        this.cards[cardterm].deserializeState(state.cards[cardterm]);
    }
  }

  if (state.notes && this.notesEnabled) {
    for (var i = 0; i < state.notes.length; i++) {
      var note;
      if (i >= this.notes.length) {
        note = new Textit.ArticleNote(this);
        this.notes.push(note);
      }
      else note = this.notes[i];
      note.deserialize(state.notes[i]);

    }
  }

  this.marker.setMarkRanges(new TRanges(state['marker']), this.defaultMarkType);
  this.markRanges = this.marker.getMarkRanges(this.defaultMarkType).clone();
  this.marker.deserializeLikes(state['likes']);
  this.styleIndex = state['styleIndex'];
  this.events.emit('load');

  var self = this;

  // update the score after deserializing the state

  self.forEachQuestion(function (i, question) {
    self.scores[i] = question.getScore();
  });
  self.events.emit('score', { overallScore: self.getOverallScore() });
}
//-------------------------------------------------------
Textit.Article.prototype.openCard = function (hotword) {
  var self = this;
  var card;
  if (hotword.text in this.cards) {
    card = this.cards[hotword.text];
    var lastWord, words = hotword.dom.querySelectorAll('.word');
    lastWord = this.getWordByDom(words[words.length - 1]);
    var placeholder = this.createPlaceholderAfterWord(lastWord);
    card.hotword = hotword;
    card.open(placeholder);
    hotword.card = card;
  }
}
//-------------------------------------------------------
Textit.Article.prototype.addComponent = function (comp) {
  if (comp == null)
    console.error('component not found');
  if (comp instanceof Textit.Components.Card) {
    this.cards[comp.term] = comp;
    this.cardsContainer.appendChild(comp.dom);
  } else {
    if (comp instanceof Textit.Components.Headline && this.components.length < 2 && comp.importance <= 2) {
      if (this.title == null)
        this.title = comp.dom.textContent;
      else
        this.title += ' ' + comp.dom.textContent.trim();
      this.dom.dataset.title = this.title;
    }
    if (comp instanceof Textit.Questions.Question) {
      this.questions.push(comp);
    }
    comp.componentIndex = this.components.length;
    this.components.push(comp);
    this.dom.appendChild(comp.dom);
  }
}
Textit.Article.prototype.forEachQuestion = function (callback) {
  for (var i = 0; i < this.questions.length; i++) {
    callback(i, this.questions[i]);
  }
}
//-------------------------------------------------------
Textit.Article.prototype.addElement = function (el) {
  this.elements.push(el);
  if (el instanceof Textit.Elements.HotWord) {
    var hotword = el, card;
    if (!(hotword.text in this.cards)) {
      card = new Textit.Components.Card(this, { json: { term: hotword.text, content: hotword.translation } });
      this.addComponent(card);
      //this.cards[hotword.text] = card;
      //self.cardsContainer.appendChild(card.dom);
    }
  }
}
//-------------------------------------------------------
Textit.Article.prototype.addWord = function (word) {
  var self = this;
  var index = this.words.length;
  self.words.push(word);
  word.index = index;
  word.dom.dataset.wordIndex = index;
  // update nextWord and prevWord
  if (this.words.length > 1) {
    this.words[index - 1].nextWord = self.words[index];
    this.words[index].prevWord = self.words[index - 1];
  }
}
/*Textit.Article.prototype.numberLines = function () {
  var lines = 0;
  for (var i = 0; i < this.words.length; i++) {
    var word = this.words[i];
    if (word.dom.parentNode.tagName != 'P') continue;
    if (!word.prevWord || word.prevWord.dom.getBoundingClientRect().top < word.dom.getBoundingClientRect().top) {
      lines++;
      if (lines % 5 == 0)
        word.dom.dataset.lineStart = lines;
    }
  }
}*/
//-------------------------------------------------------
Textit.Article.prototype.bindChildEvents = function () {
  var self = this;

  self.forEachQuestion(function (i, question) {
    question.on('answer', function () {
      self.scores[i] = question.getScore();
      self.events.emit('score', { overallScore: self.getOverallScore(), questionIndex: i, questionScore: self.scores[i] });
      self.triggerStateChanged();
    })
  });
}
Textit.Article.prototype.getOverallScore = function () {
  // count up the overall score, avoid open questions
  var sum = 0, len = 0;
  for (var i = 0; i < this.scores.length; i++) {
    if (this.feedback || this.questions[i].autocheck) {
      len++;
      sum += this.scores[i];
    }
  }
  return sum / len;
}
//-------------------------------------------------------
Textit.Article.prototype.bindEvents = function () {
  var self = this;
  var dragging = false;
  var mouseHandler = new Textit.MouseHandler(this);
  //-------------------------------------------------------
  mouseHandler.on('mousedragstart', function (event) {
    if (self.isOrigin || self.isReadOnly) return; // do nothing in origin mode
    /*if (event.origin.target.tagName == 'MARK') {
      var hoveredWord = self.getWordByPosition(event.origin.x, event.origin.y - Textit.util.scrollTop());
      if (hoveredWord.beforeHereAfter == 0 &&
        self.marker.adjustSelection(event.origin.target.dataset.markType, hoveredWord))
        return;
    }*/

    if (event.target.tagName == 'TEXTAREA') // let's let the textarea handle this. he knows what to do
      return;

    if (self.dragDropManager.startDragging(event.origin)) {
      return true;
    }

    var target = event.target;
    var isPlaying = self.narrator != null && self.narrator.isPlaying();
    while (target != self.dom && target != null && target.className != 'article__note')
      target = target.parentNode;
    if (target == self.dom && !isPlaying) {
      if (self.markType == Textit.Questions.DragQuestion.lassoSelector)
        self.marker.removeMarkRanges(Textit.Questions.DragQuestion.lassoSelector);
      self.marker.startSelection(self.getWordByPosition(event.x, event.y - Textit.util.scrollTop()), self.markType);
    }
    dragging = true;
  })
  //-------------------------------------------------------
  mouseHandler.on('mousedrag', function (event) {
    if (self.marker.selectionActive()) {
      var w = self.getWordByPosition(event.x, event.y - Textit.util.scrollTop());
      self.marker.continueSelection(w, self.markType);
    }
  })
  //-------------------------------------------------------
  mouseHandler.on('mousedragend', function (event) {
    if (self.marker.selectionActive()) {
      self.marker.endSelection(self.autoApplyMark == undefined ? true : self.autoApplyMark);
      setTimeout(function () {
        lastHoveredWordIndex = null;
        lastHoveredMark = null;
        activeDelButton = null;
      }, 10)
    }
    dragging = false;
  })
  var lastHoveredWordIndex = null;
  var lastHoveredMark = null;
  var activeDelButton = null;
  var removeDelButtonsTimers = {};
  //-------------------------------------------------------
  this.dom.addEventListener('mousemove', function (e) {
    if (dragging || self.isOrigin || !self.embed) return;
    var mark;
    if (e.target == activeDelButton) {
      lastHoveredWordIndex = self.getWordByDom(activeDelButton.parentNode).index;
      mark = self.marker.findMarkFor(lastHoveredWordIndex);
    }
    else {
      var b = self.getWordByPosition(event.pageX, event.pageY - Textit.util.scrollTop());
      var wordIndex = b.word.index + b.beforeHereAfter;
      if (wordIndex == lastHoveredWordIndex) return;
      lastHoveredWordIndex = wordIndex;
      mark = self.marker.findMarkFor(wordIndex);

    }
    if (mark && mark.markType == Textit.Questions.DragQuestion.lassoSelector) mark = null;
    if ((lastHoveredMark === null && mark !== null) ||
        (lastHoveredMark !== null && mark === null) ||
        (mark != null && lastHoveredMark != null && lastHoveredMark.range != mark.range)
      ) { // if hover on new mark

      if (activeDelButton) {
        (function (delBtn) { // remove
          var wordIndex = self.getWordByDom(activeDelButton.parentNode).index;
          clearTimeout(removeDelButtonsTimers[wordIndex])
          removeDelButtonsTimers[wordIndex] = null;
          removeDelButtonsTimers[wordIndex] = setTimeout(function () {
            if (/blurred/.test(delBtn.className)) {
              if (activeDelButton == delBtn)
                activeDelButton = null;
              delBtn.parentNode && delBtn.parentNode.removeChild(delBtn);
            }
          }, 1000)
          delBtn.className = 'del-btn blurred';
        })(activeDelButton);
      }

      if (mark) {
        var firstWord = self.getWordByIndex(mark.range.from).dom;
        var delBtn = firstWord.querySelector('.del-btn');
        if (delBtn) {
          delBtn.className = 'del-btn';
        } else {
          delBtn = document.createElement('span');
          delBtn.className = 'del-btn';
          firstWord.appendChild(delBtn);
          (function (mark) { // bind
            var rangeID = mark.index;
            var markType = mark.markType;
            delBtn.addEventListener('click', function (e) {
              e.preventDefault();
              e.stopPropagation();
              this.parentNode.removeChild(this);
              if (activeDelButton == this) activeDelButton = null;
              self.marker.unmarkMarkedText(rangeID, markType);
            })
          })(mark)

        }
        activeDelButton = delBtn;
      }
      lastHoveredMark = mark;
    }
  });
  //-------------------------------------------------------
  this.dom.addEventListener('click', function (event) {
    var mouseX = event.pageX;
    var mouseY = event.pageY - Textit.util.scrollTop();
    var word;
    if (self.narrator != null && self.narrator.isPlaying()) {
      word = self.getWordByPosition(mouseX, mouseY).word;
      if (word != null) {
        self.narrator.gotoWord(word);
        event.preventDefault();
      }
      return;
    } else {
      if (self.markType != 0) return;
      var targetElement = event.target;
      if (targetElement == self.noteContainer) {
        for (var i = self.components.length - 1; i >= 0 ; i--) {
          var offset = event.clientY - self.components[i].dom.getBoundingClientRect().top + 10;
          if (offset > 0) {
            var fontSize = parseFloat(window.getComputedStyle(self.dom).getPropertyValue('font-size')) * .8;
            self.addNoteAt(i, Math.floor(offset / fontSize) - 1 + 'em');
            break;
          }

        }
        return;
      }
      while (targetElement != self.dom && targetElement != null) {
        for (var elementIndex = 0; elementIndex < self.elements.length; elementIndex++)
          if (targetElement == self.elements[elementIndex].dom) {
            self.elements[elementIndex].click(); //activate click on element
            if (self.activeQuestion) self.activeQuestion.collapse(); // collapse the current active question
            return;
          }
        targetElement = targetElement.parentNode;
      }
    }
  });
  //-------------------------------------------------------
  document.addEventListener('mousedown', function (e) {
    if (!e.target.$isChildOf(self.dom)) { // if clicked outside
      if (self.isOrigin && e.target == document.body) {
        self.setOrigin(false);
        self.events.emit('textmode-change');
      }
      self.events.emit('blur');
    } else if (self.isOrigin) {
      var isNarrating = self.narrator != null && self.narrator.isActive();
      if (!isNarrating && self.isOrigin && e.target.$hasClass('word') && !e.target.parentNode.$hasClass('hotword')) {
        self.setOrigin(false);
        self.events.emit('textmode-change');
      }
    }
  })
  //-------------------------------------------------------
}
Textit.Article.prototype.onMarkChanged = function (event) {
  var markRanges = this.marker.getMarkRanges(this.defaultMarkType);
  var changes = this.markRanges.findChanges(markRanges);
  var action = {
    interaction: 'highlight'
  };
  for (var key in changes) {
    for (var i = 0; i < changes[key].length; i++) {
      changes[key][i].text = this.getRangeText(changes[key][i]);
    }
    if (changes[key].length > 0 && key != 'unchanged')
      action[key] = changes[key];
  }
  this.record(this, action);
  this.triggerStateChanged();
  if (changes.added.length > 0)
    Textit.XAPI.sendEvent({
      verb: 'added',
      interaction_type: 'mark',
      result_additional_information: changes.added[0],
      object_type: 'cmi.iteration',
      object_name: 'mark',
      object_id: 'mark'
    });
  else if (changes.removed && changes.removed.length > 0)
    Textit.XAPI.sendEvent({
      verb: 'removed',
      interaction_type: 'mark',
      result_additional_information: changes.removed[0],
      object_type: 'cmi.iteration',
      object_name: 'mark',
      object_id: 'mark'
    });

  this.markRanges = markRanges.clone();
}
Textit.Article.prototype.onLikeChanged = function (e) {
  if (e.action == 'add')
    this.record(self, { interaction: 'like', range: e.range, text: this.getRangeText(e.range) });
  else
    this.record(self, { interaction: 'unlike', range: e.range, text: this.getRangeText(e.range) });
  this.triggerStateChanged();
}
//-------------------------------------------------------
Textit.Article.prototype.triggerStateChanged = function (sender) {
  this.events.emit('change');
}
//-------------------------------------------------------
Textit.Article.prototype.addNoteAt = function (compIndex, offset) {
  var note = new Textit.ArticleNote(this);
  note.setLocation(compIndex, offset);
  note.focus();
  this.record(this, { 'interaction': 'add-note', 'component': compIndex, offset: offset })
  this.notes.push(note);
}
//-------------------------------------------------------
Textit.Article.prototype.removeNote = function (noteElement) {
  for (var i = 0; i < this.notes.length; i++) {
    if (this.notes[i].el == noteElement) {
      this.notes[i].remove();
      this.notes.splice(i, 1);
    }
  }
}
//-------------------------------------------------------
Textit.Article.prototype.wordClicked = function (word) {
  if (this.narrator != null && this.narrator.isPlaying()) {
    this.narrator.gotoWord(word); //word.index
  }
}
//-------------------------------------------------------
Textit.Article.prototype.forEachWord = function () {
  var callback, fromWord, toWord;
  if (arguments.length == 3) { // if there are 3 arugments = from, to, callback
    fromWord = arguments[0]; toWord = arguments[1], callback = arguments[2];
  }
  else if (arguments.length == 1) { // 1 argument = callback
    callback = arguments[0];
  }
  var startIndex = fromWord ? fromWord.index : 0;
  var endIndex = toWord ? toWord.index : this.words.length - 1;
  for (var i = startIndex; i <= endIndex; i++) {
    callback(this.words[i]);
  }
}
//-------------------------------------------------------
Textit.Article.prototype.words = function () {
  return this.words;
}
//-------------------------------------------------------
Textit.Article.prototype.getWordByDom = function (worddom) {
  return this.words[parseInt(worddom.dataset.wordIndex)];
}
//-------------------------------------------------------
Textit.Article.prototype.getWordByIndex = function (index) {
  return this.words[index];
}
//-------------------------------------------------------
Textit.Article.prototype.getWordByPosition = function (mouseX, mouseY) {
  var position = {
    word: null,
    beforeHereAfter: 0, // beforeOrAfter:  -1 before, 0 here, 1 after
  };
  var isMouseBeforeWord, isMouseAfterWord;
  switch (this.direction) {
    case 'rtl':
      isMouseAfterWord = function (mouseX, wordRect) { return mouseX < wordRect.left };
      isMouseBeforeWord = function (mouseX, wordRect) { return mouseX > wordRect.right };
      break;
    case 'ltr':
      isMouseBeforeWord = function (mouseX, wordRect) { return mouseX < wordRect.left };
      isMouseAfterWord = function (mouseX, wordRect) { return mouseX > wordRect.right };
      break;
  }
  for (var i = 0; i < this.words.length; i++) {
    var word = this.words[i];
    var wordRect = Textit.util.getBoundingRect(word.dom);
    var sameLine = (mouseY >= wordRect.top && mouseY <= wordRect.bottom);
    position.word = word;
    if (sameLine && wordRect.left <= mouseX && mouseX <= wordRect.right) {
      position.beforeHereAfter = 0;
      return position;
    }
    if (mouseY > wordRect.bottom || (sameLine && isMouseAfterWord(mouseX, wordRect))) {
      position.beforeHereAfter = 1;
    }
    else if (mouseY < wordRect.top || (sameLine && isMouseBeforeWord(mouseX, wordRect))) {
      position.beforeHereAfter = -1;
      return position;
    }
  };
  return position;
}
//-------------------------------------------------------
Textit.Article.prototype.getComponentByDom = function (compdom) {
  while (compdom != null && compdom.parentNode != this.dom) {
    compdom = compdom.parentNode;
  }
  if (compdom == null) return;
  for (var i = 0; i < this.components.length; i++) {
    if (this.components[i].dom == compdom)
      return this.components[i];
  }
  return null;
}
//-------------------------------------------------------
Textit.Article.prototype.getComponentByIndex = function (compIndex) {
  return this.components[compIndex];
}
//-------------------------------------------------------
Textit.Article.prototype.getRangeText = function (range) {
  var word = this.words[range.from];
  var lastWord = this.words[range.to];
  var words = [];
  while (word != lastWord) {
    words.push(word.text);
    word = word.nextWord;
  }
  words.push(word.text);
  return words.join(' ');
}
//-------------------------------------------------------
Textit.Article.prototype.setOrigin = function (isOrigin) {
  this.dom.dataset.origin = isOrigin;
  this.isOrigin = isOrigin;
  for (var i = 0; i < this.components.length; i++) {
    if (this.components[i].setActive)
      this.components[i].setActive(!isOrigin);
  }
}
//-------------------------------------------------------
Textit.Article.prototype.onNarratorActive = function (active) {
  this.dom.dataset.narration = active ? 'on' : 'off';
}
//-------------------------------------------------------
Textit.Article.prototype.loadFromXML = function (xml, force_embed) {
  if (typeof xml === 'string')
    xml = (new window.DOMParser()).parseFromString(xml, "text/xml").documentElement;
  if (force_embed)
    xml.setAttribute("embed", "true");
  // parse attributes
  this.lang = xml.getAttribute('language') || xml.getAttribute('lang') || 'he';

  this.notesEnabled = 'true' === (xml.getAttribute('notes') || 'true');
  if (this.notesEnabled) this.dom.$addClass('article--with-notes');
  this.embed = 'true' === (xml.getAttribute('embed') || 'false');
  if (this.embed) { this.dom.$addClass('embed'); }

  if (xml.getAttribute('dfus'))
    this.dom.setAttribute("data-dfus", xml.getAttribute('dfus') != 'false');
  
  this.fontFamily = xml.getAttribute('textfont') || null;
  if (xml.getAttribute('dfus'))
    this.dom.setAttribute("data-dfus", xml.getAttribute('dfus') != 'false');
    

  var audioUrl = xml.getAttribute('audio') || null;
  if (audioUrl != null)
    this.narrator = Textit.ArticleNarrator(this, audioUrl, audioUrl + "_timecodes.txt");

  var direction = xml.getAttribute('direction') || xml.getAttribute('dir') || 'rtl';
  this.direction = direction;
  this.dom.setAttribute("dir", direction);
  if (xml.getAttribute('walkme') === 'true')
    setTimeout(function () { self.WalkMe(); }, 1000);


  function parseStyle(style) {
    style = style || ' | ';
    var comps = style.split('|');
    var attrs = ['font', 'color', 'size'];
    var res = {};
    for (var i = 0; i < attrs.length; i++) {
      res[attrs[i]] = comps.length > i ? comps[i].trim() : '';
    }
    return res;
  }

  this.styles = {
    questions: parseStyle(xml.getAttribute('questionStyle')),
    text: parseStyle(xml.getAttribute('textStyle'))
  }

  this.dom.style.color = this.styles.text.color;
  /*setTimeout(function () {
    this.dom.style.fontSize = this.styles.text.size;
    this.dom.style.fontFamily = this.styles.text.font;
  }.bind(this), 1000);*/

  //this.feedback = 'true' === (xml.getAttribute('feedback') || 'true');

  // bind to narrator events
  if (this.narrator) {
    this.narrator.on('start', this.onNarratorActive.bind(this, true));
    this.narrator.on('stop', this.onNarratorActive.bind(this, false));
  }

  // parse child components
  var nodes = xml.childNodes;
  var node, attributes, content, component;
  for (var nodeIndex = 0, len = nodes.length; nodeIndex < len; nodeIndex++) {
    node = nodes[nodeIndex];
    component = Textit.Components.createFromXML(this, node);
    this.addComponent(component);
  }

  // add note container
  if (this.notesEnabled)
    this.noteContainer = Textit.util.createHtml({ html: '<div class="article__note-container"></div>', parent: this.dom })


  var self = this;
  // bind question events
  self.forEachQuestion(function (i, question) {
    question.on('collapse', function () {
      self.events.emit('question-collapse');
    })
    question.on('expand', function () {
      self.events.emit('question-expand');
    })
  });


  // initiate the drop manager
  this.dragDropManager.addDraggableController(Textit.Draggables.DragQuestionSnip);
  this.dragDropManager.addDraggableController(Textit.Draggables.DraggableClozeOption);
  this.dragDropManager.addDraggableController(Textit.Draggables.DraggableQuestion);
  this.dragDropManager.addDraggableController(Textit.Draggables.DraggableMark);
  if (!this.embed) {
    this.dragDropManager.addDraggableController(Textit.Draggables.DraggableAnswer);
  }

  // add origin ribbon
  Textit.util.createHtml({
    html: '<div class="article__origin-ribbon">' +
              '<span>' + Textit.strings[this.lang].ui.origin + '</span>' + this.title +
           '</div>', parent: this.dom
  });

  // zero scores
  for (var i = 0; i < this.questions.length; i++)
    this.scores[i] = 0;

  this.bindChildEvents();

  this.isReady = true;
  this.events.emit('ready');

}
//-------------------------------------------------------
Textit.Article.prototype.search = function (searchwords, paragraph, avoid_ranges) {
  searchwords = searchwords.split(' ');
  avoid_ranges = avoid_ranges || [];
  function compare(text1, text2) {
    if (text1 == null || text2 == null) return false;
    var words1 = Textit.Word.Tokenize(text1)
        , word2 = Textit.Word.Tokenize(text2);
    return Textit.util.compareArrays(words1, word2);
  }
  var words_matches = 0;
  var startIndex = null;
  var i = 0;
  var end = this.words.length;
  if (paragraph) {
    i = paragraph.firstWord.index;
    end = paragraph.lastWord.index;
  }
  for (; i <= end; i++) {
    var avoid = false;
    for (var j = 0; !avoid && j < avoid_ranges.length; j++) {
      if (avoid_ranges[j].from.index <= i && i <= avoid_ranges[j].to.index) {
        avoid = true;
      }
    }
    if (this.words[i] && !avoid && compare(searchwords[words_matches], this.words[i].text)) {
      words_matches++;
      if (startIndex == null) startIndex = i;
      if (words_matches == searchwords.length) {
        return { from: this.words[startIndex], to: this.words[i] };
      }
    } else {
      startIndex = null;
      words_matches = 0;
    }
  }
  return null;
}
//-------------------------------------------------------
Textit.Article.prototype.parseContent = function (node, aside) {
  var frag = document.createDocumentFragment();
  var childElement, childNode;
  for (var i = 0; i < node.childNodes.length; i++) {
    childNode = node.childNodes[i];
    if (childNode.nodeType == 3) {
      var words = childNode.textContent.split(' ');
      var text = childNode.textContent;
      var wordspan
      var word;
      var last = 0;
      var text_between; // mostly punctuation and spaces

      function handleTextBetween(text_between) {
        if (/\n/.test(text_between)) {
          text_between = text_between.split('\n');
          frag.appendChild(document.createTextNode(text_between[0]));
          frag.appendChild(document.createElement('br'));
          frag.appendChild(document.createTextNode(text_between[1]));
        } else
          frag.appendChild(document.createTextNode(text_between));

      }

      while (match = Textit.Word.Token.exec(text)) {
        if (last != match.index) {
          text_between = text.substring(last, match.index);
          handleTextBetween(text_between);
        }

        word = new Textit.Word(text.substring(match.index, match.index + match[0].length));
        frag.appendChild(word.dom);
        if (!aside)
          this.addWord(word)

        last = match.index + match[0].length;
      }

      if (last != text.length) {
        handleTextBetween(text.substring(last));
      }
    }
    else if (Textit.XML.Mappings[childNode.tagName]) { // render html tags
      childElement = document.createElement(Textit.XML.Mappings[childNode.tagName]);
      childElement.appendChild(this.parseContent(childNode, aside))
      frag.appendChild(childElement);
    }
    else {
      childElement = Textit.Elements.createFromXML(this, childNode);
      if (!aside)
        this.addElement(childElement);
      frag.appendChild(childElement.dom);
    }
  }
  return frag;
}
//-------------------------------------------------------
Textit.Article.prototype.createPlaceholderAfterWord = function (word) {
  var placeholder = document.createElement('div');
  placeholder.className = 'placeholder';
  placeholder.style.height = '0px';
  var wordRect = word.dom.getBoundingClientRect();
  var currTop = wordRect.top, wordHeight = wordRect.height;
  var paragraph = word.dom;
  while (paragraph.tagName != 'P') paragraph = paragraph.parentNode;
  var paragraphFirstWord = this.getWordByDom(paragraph.querySelector('.word'));
  var wordsInParagraph = paragraph.querySelectorAll('.word').length;
  var newlineWord = null;

  // TODO: should loop over text nodes, not words. the line could break in the middle of a text node (e.g: ". )" )
  for (var i = word.index; newlineWord == null && i < paragraphFirstWord.index + wordsInParagraph; i++) {
    if (this.words[i].dom.getBoundingClientRect().top > currTop)
      newlineWord = this.words[i];
  }

  if (newlineWord != null) {
    var before = newlineWord.dom;
    if (before.previousSibling && before.previousSibling.nodeValue && /\S/.test(before.previousSibling.nodeValue))
      before = before.previousSibling;
    if (before.parentNode.$hasClass('hotword') || before.parentNode.$hasClass('nowrap'))
      before = before.parentNode;
    before.parentNode.insertBefore(placeholder, before);
  }
  else {
    paragraph.appendChild(placeholder);
  }

  return placeholder;
}
//-------------------------------------------------------
Textit.Article.prototype.record = function (sender, record) {
  if (sender == this) {
    record = {
      object: { type: 'article' },
      action: record
    }
  }
}
//-------------------------------------------------------
Textit.Article.prototype.log = function (sender, action) {
}
//-------------------------------------------------------
Textit.Article.prototype.setFont = function (font, styleIndex) {
  this.dom.style.font = font;
  this.styleIndex = styleIndex;
  var comp = null;
  var offsetTop;
  for (var i = 0; !comp && i < this.components.length; i++) {
    offsetTop = this.components[i].dom.getBoundingClientRect().top;
    if (offsetTop > 0) {
      comp = this.components[i];
    }
  }
  this.events.emit('resize', { font: font });
  /*for (var i = 0; i < this.components.length; i++) { // trigger reflow of componenets
    if (this.components[i].reflow) this.components[i].reflow();
  }*/
}
//-------------------------------------------------------
Textit.Article.prototype.error = function (msg) {
  var error = document.createElement('div');
  error.className = 'error-message';
  error.textContent = msg;
  this.dom.insertBefore(error, this.dom.firstChild);
}
//-------------------------------------------------------
Textit.Article.prototype.offset = function (x, y) {
  this.offsetX = x;
  this.offsetY = y;
  this.dom.style.transform = (x == 0 && y == 0) ? '' : 'translate3d(' + x + 'px, ' + y + 'px, 0)';
}
//-------------------------------------------------------
Textit.Article.prototype.setCursor = function (cursor) {
  this.dom.dataset.cursor = cursor;
}
//-------------------------------------------------------
Textit.Article.prototype.SetReadOnly = function (readonly) {
  this.isReadOnly = readonly;
  if (readonly) {
    this.dom.$addClass('article--readonly');
    if (!this.embed) {
      var msg = Textit.util.createHtml({
        html: '<div class="article__messageBox"><h2>' + Textit.strings[this.lang].ui.review_mode_title + '</h2>' +
          '<p>' + Textit.strings[this.lang].ui.review_mode_insturction + '</p>' + '</div>',
      })
      this.dom.insertBefore(msg, this.dom.firstChild);
      if (window.parent === window.top) { // if not opened in iframe and can go back
        var backbutton = document.createElement('button');
        backbutton.textContent = Textit.strings[this.lang].ui.review_mode_back;
        backbutton.addEventListener('click', function () {
          window.history.back();
        })
        msg.appendChild(backbutton);
      }
    }

    if (document.querySelector('.menu')) {
      document.querySelector('.menu').style.opacity = '0';
      document.querySelector('.menu').style.pointerEvents = 'none';
    }
    if (document.querySelector('.drawer')) {
      document.querySelector('.drawer').style.pointerEvents = 'none';
      document.querySelector('.drawer').style.opacity = '0';
    }
    if (document.querySelector('.embedmenu')) {
      document.querySelector('.embedmenu').style.pointerEvents = 'none';
      document.querySelector('.embedmenu').style.opacity = '0';
    }
  }
}
// Walkme // TODO: should not be in article, should be an independant class
Textit.Article.prototype.WalkMe = function (restart) {
  var article = this;

  if (restart || !this.walks)
    this.walks = [
    { selector: 'aside.menu .menu-item', text: Textit.strings[article.lang].walkme.menu, direction: 'right', position: 'fixed' },
    { selector: 'article .article__note-container', text: Textit.strings[article.lang].walkme.notes, direction: 'right', offsetTop: 200 },
    { selector: 'article p', text: Textit.strings[article.lang].walkme.paragraph },
    { selector: 'article .hotword', text: Textit.strings[article.lang].walkme.hotword },
    { selector: 'article .question__stem', text: Textit.strings[article.lang].walkme.question },
    { selector: 'article .question--mark__tool', text: Textit.strings[article.lang].walkme.marktool }];


  for (var i = 0; i < this.walks.length; i++) {
    var target = this.dom.parentNode.querySelector(this.walks[i].selector);
    if (target != null) {
      if (this.walkmeBox) this.walkmeBox.destory();
      this.walkmeBox = createWalkMeBox(target, this.walks[i].text, this.walks[i]);
      this.walks.splice(i, 1);
      return;
    }
  }
  function createWalkMeBox(target, text, options) {
    var containerDom = article.dom.parentNode;
    var offsetTop = options.offsetTop || 0;
    var donext = function () { closeBox(function () { article.WalkMe(); }); }
    var className = 'walk-me ' + 'walk-me--' + options.direction;
    var box = document.createElement('div');
    box.className = className + ' walk-me--hidden';
    box.textContent = text;
    var articleRect = containerDom.getBoundingClientRect();
    var rect = target.getBoundingClientRect();


    if (options.position == 'fixed') {
      box.style.position = 'fixed';
      articleRect = { right: 0, left: 0, top: 0, bottom: 0 };
    }

    switch (options.direction) {
      case 'right':
        box.style.left = rect.left - articleRect.left + 'px';
        box.style.top = offsetTop + rect.top - articleRect.top + 'px';
        break;
      default:
        box.style.left = (rect.left + rect.width / 2) - articleRect.left + 'px';
        box.style.top = offsetTop + rect.top - articleRect.top + 'px';
    }

    function closeBox(cb) {
      box.classList.add('walk-me--hidden');
      target.removeEventListener('mousedown', listenToEnd)
      setTimeout(function () {
        if (box.parentNode)
          box.parentNode.removeChild(box);
        if (cb) setTimeout(cb, 500);
      }, 500)
    }

    // add buttons
    box.appendChild(document.createElement('br'));
    var btnNext = document.createElement('button');
    btnNext.className = 'walk-me__btn-next';
    btnNext.textContent = '' + Textit.strings[article.lang].walkme.button_next;
    btnNext.addEventListener('click', donext);
    box.appendChild(btnNext);
    // close button
    var btnClose = document.createElement('button');
    btnClose.className = 'walk-me__btn-close';
    btnClose.textContent = 'X';
    btnClose.addEventListener('click', function () { closeBox(function () { }); });
    box.appendChild(btnClose);
    // skip link
    var btnSkip = document.createElement('a');
    btnSkip.setAttribute('href', '#');
    btnSkip.className = 'walk-me__btn-skip';
    btnSkip.textContent = '' + Textit.strings[article.lang].walkme.button_skip;
    btnSkip.addEventListener('click', function (e) { e.preventDefault(); closeBox(); });
    box.appendChild(btnSkip);

    containerDom.appendChild(box);
    box.offsetHeight;
    box.classList.remove('walk-me--hidden');

    // bind end
    function listenToEnd() {
      function end() {
        donext();
        document.removeEventListener('mouseup', end)
        target.removeEventListener('mousedown', listenToEnd)
      }
      document.addEventListener('mouseup', end)
    }
    target.addEventListener('mousedown', listenToEnd)

    return {
      destory: closeBox
    }
  }
}

//-------------------------------------------------------
Textit.ArticleNote = function (article) {
  this.article = article;
  this.el = Textit.util.createHtml({ html: '<aside class="article__note">&zwj;</aside>' })
  this.bindEvents();
}
//-------------------------------------------------------
Textit.ArticleNote.prototype.bindEvents = function () {
  var noteEl = this.el;
  var self = this;
  noteEl.addEventListener('blur', function () {
    if (!/[^\s\\u200B]/.test(noteEl.textContent)) this.article.removeNote(noteEl);
    noteEl.removeAttribute('contenteditable');
  })
  noteEl.addEventListener('mousedown', function () {
    if (!noteEl.getAttribute('contenteditable')) {
      noteEl.setAttribute('contenteditable', 'true');
    }
  })
  noteEl.addEventListener('keyup', function () {
    self.onChanged();
  })
}
//-------------------------------------------------------
Textit.ArticleNote.prototype.focus = function () {
  this.el.setAttribute('contenteditable', 'true');
  var s = window.getSelection(), r = document.createRange();
  r.setStart(this.el, 0); r.setEnd(this.el, 0);
  s.removeAllRanges(); s.addRange(r);
}
//-------------------------------------------------------
Textit.ArticleNote.prototype.setLocation = function (componentIndex, offset) {
  this.parentComponent = this.article.components[componentIndex];
  this.offset = offset;
  this.parentComponent.dom.appendChild(this.el);
  this.el.style.top = offset;
}
//-------------------------------------------------------
Textit.ArticleNote.prototype.setText = function (text) {
  this.el.textContent = text;
}
//-------------------------------------------------------
Textit.ArticleNote.prototype.getText = function (text) {
  return this.el.textContent;
}
//-------------------------------------------------------
Textit.ArticleNote.prototype.onChanged = function () {
  var r = this.el.textContent.replace(/\u200B/, '');
  if (!(r === this.el.textContent))
    this.el.textContent = r;
  this.article.triggerStateChanged(this); // tell the article our state was changed
  this.record({ interaction: 'type', text: this.getText() });
  var event = {
    object_type: 'note',
    object_name: this.getText(),
    verb: 'updated'
  };

  Textit.XAPI.sendEvent(event);
}
//-------------------------------------------------------
Textit.ArticleNote.prototype.record = function (action) {
  var record = {
    object: { 'type': 'note', comp: this.parentComponent.componentIndex, offset: this.offset },
    action: action
  }
  this.article.record(this, record);
}
//-------------------------------------------------------
Textit.ArticleNote.prototype.deserialize = function (serialized) {
  this.setLocation(serialized.comp, serialized.offset);
  this.setText(serialized.text);
}
//-------------------------------------------------------
Textit.ArticleNote.prototype.serialize = function (serialized) {
  return { comp: this.parentComponent.componentIndex, text: this.getText(), offset: this.offset }
}
//-------------------------------------------------------
Textit.ArticleNote.prototype.remove = function () {
  this.parentComponent.dom.removeChild(this.el);
}
//-------------------------------------------------------
Textit.Word = function (wordstring) {
  this.dom = document.createElement('span');
  this.dom.className = 'word';
  this.dom.appendChild(document.createTextNode(wordstring));
  this.text = wordstring;
  this.element = this.dom;
  this.events = new Textit.util.EventEmitter();
  this.on = this.events.on;
  this.bindEvents();
}
//-------------------------------------------------------
Textit.Word.prototype.bindEvents = function () {
  var self = this;
  this.dom.addEventListener('mouseenter', function () {
    self.events.emit('mouseenter', self);
  })
}
//-------------------------------------------------------
// Regex to break up text into words, ignoring spaces, quotations, punctuations etc.
//                    a word, which could include quotations like <didn't>.      | a number like 1992 or 1,992.23 
//                                                                                  |(\d+(?:[\,\.]+\d+)*)/g
// U+0600..U+06FF
// \u0600-\u06ff
// En, He, Arabic : \u0590-\u05FF\u0600-\u06ffa-zA-Z\d
Textit.Word.Token = /([\u0590-\u05FF\u0600-\u06ffa-zA-Z\d]+(?:[\"\'\’\,\.\u200f]+[\u0590-\u05FF\u0600-\u06ffa-zA-Z\d]+)?)/g;
//-------------------------------------------------------
Textit.Word.Tokenize = function (text) {
  var match;
  var words = [];
  while (match = Textit.Word.Token.exec(text)) {
    words.push(match[0])
  }
  return words;
}
