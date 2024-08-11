var Textit;
if (typeof Textit == 'undefined') Textit = {};
if (typeof Textit.Components == 'undefined') Textit.Components = {};



// Textit.Components.Paragraph.js
Textit.Components.Paragraph = function (article, loadOptions) {
  this.article = article;
  if (loadOptions && loadOptions.xml)
    this.createFromXml(loadOptions.xml);
}

Textit.Components.Paragraph.xmlTags = ['p', 'paragraph'];

Textit.Components.Paragraph.prototype.createFromXml = function (xmlNode) {
  this.dom = Textit.util.createHtml({
    html: '<p></p>',
    content: this.article.parseContent(xmlNode)
  });
  var words = this.dom.querySelectorAll('.word');
  if (words.length > 0) {
    this.firstWord = this.article.getWordByDom(words[0]);
    this.lastWord = this.article.getWordByDom(words[words.length - 1]);
  }
}

// Textit.Components.Reference.js
Textit.Components.Reference = function (article, loadOptions) {
  this.article = article;
  if (loadOptions && loadOptions.xml)
    this.createFromXml(loadOptions.xml);
}

Textit.Components.Reference.xmlTags = ['reference'];

Textit.Components.Reference.prototype.createFromXml = function (xmlNode) {
  this.dom = Textit.util.createHtml({
    html: '<p class="reference"></p>',
    content: this.article.parseContent(xmlNode)
  });
  var words = this.dom.querySelectorAll('.word');
  if (words.length > 0) {
    this.firstWord = this.article.getWordByDom(words[0]);
    this.lastWord = this.article.getWordByDom(words[words.length - 1]);
  }
}

// Textit.Components.Headline.js
Textit.Components.Headline = function (article, loadOptions) {
  this.article = article;
  if (loadOptions && loadOptions.xml)
    this.createFromXml(loadOptions.xml);
}

Textit.Components.Headline.xmlTag = 'headline';

Textit.Components.Headline.prototype.createFromXml = function (xmlNode) {
  this.importance = parseInt(xmlNode.getAttribute('importance'));
  var tag = 'h' + xmlNode.getAttribute('importance');

  this.dom = Textit.util.createHtml({
    html: '<' + tag + '></' + tag + '>',
    content: this.article.parseContent(xmlNode)
  });
}

// Textit.Components.PageBreak.js
Textit.Components.PageBreak = function (article, loadOptions) {
  this.article = article;
  if (loadOptions && loadOptions.xml)
    this.createFromXml(loadOptions.xml);
}
Textit.Components.PageBreak.xmlTags = ['pagebreak'];

Textit.Components.PageBreak.prototype.createFromXml = function (xmlNode) {
  this.dom = document.createElement('hr');
}

// Textit.Component.Card
Textit.Components.Card = function (article, loadOptions) {
  this.article = article;
  this.events = Textit.util.EventEmitter();
  this.on = this.events.on;
  this._isopen = false;
  if (loadOptions && loadOptions.xml)
    this.createFromXml(loadOptions.xml);
  if (loadOptions && loadOptions.json)
    this.createFromJson(loadOptions.json)
}
Textit.Components.Card.xmlTags = ['card'];

Textit.Components.Card.prototype.createFromJson = function (json) {
  this.term = json.term;
  var inner = json.content;
  for (var xmlNodeName in Textit.XML.Mappings) {
    inner = inner.replace(new RegExp('<(\/*)' + xmlNodeName + '>', 'gi'), function (a, b) {
      return '<' + b + Textit.XML.Mappings[xmlNodeName] + '>';
    });
  }
  inner = inner.replace(/\n/g, '<br/>');
  var commnetsHTML = '<div class="word-card__notes">' + 
                          '<h2>' + Textit.strings[this.article.lang].ui.card_comments_title + '</h2>' +
                          //'<div class="note" contenteditable="true"></div>' + 
                          '<textarea class="note"></textarea>' + 
                     '</div>'

  this.dom = Textit.util.createHtml({
    html: '<div class="word-card"></div>',
    content: '<div class="word-card__inner">'
      + '<h1>' + Textit.util.escape(this.term) + '</h1>' + inner + '</div>'
      + commnetsHTML,
  });
  this.commentsEl = this.dom.querySelector('.note');
}

Textit.Components.Card.prototype.createFromXml = function (xmlNode) {
  var term = xmlNode.getAttribute('term');
  //var inner = xmlNode.innerHTML || xmlNode.textContent;
  this.createFromJson({ term: term, content: '' });
  this.dom.querySelector('.word-card__inner').appendChild(this.article.parseContent(xmlNode, true));
}

Textit.Components.Card.prototype.bind = function () {
  var self = this;
  function blurhandler(event) {
    var target = event.target;
    while (target != null && target != self.dom && (!self.hotword || target != self.hotword.dom))
      target = target.parentNode;
    if (target == null) {
      self.events.emit('blur');
      self.close();
    }
  }
  this.blurhandler = blurhandler;
  document.addEventListener('mouseup', this.blurhandler);
  var self = this;
  this.commentchangedhandler = function () { self.onCommentChanged(); }
  this.commentsEl.addEventListener('input', this.commentchangedhandler)
}

Textit.Components.Card.prototype.unbind = function () {
  document.removeEventListener('mouseup', this.blurhandler);
  this.commentsEl.removeEventListener('input', this.commentchangedhandler)
}

Textit.Components.Card.prototype.onCommentChanged = function () {
  this.record({ interaction: 'type', text: this.commentsEl.value });
  this.article.triggerStateChanged(this); // tell the article our state was changed
  var event = {
    object_type: 'note',
    object_name: this.commentsEl.value,
    verb: 'commented',
    object_id: this.commentsEl.value,
    object_link: this.commentsEl.value,
  };

  Textit.XAPI.sendEvent(event);
}

Textit.Components.Card.prototype.record = function (action) {
  var record = {
    object: { 'type': 'card', term: this.term },
    action: action
  }
  this.article.record(this, record);
}

Textit.Components.Card.prototype.open = function (placeholder, options) {
  this.placeholder = placeholder;
  this.placeholder.appendChild(this.dom);
  if (this.cardHeight == null) {
    this.cardHeight = this.dom.offsetHeight + 40;
    this.dom.style.height = '0';
  }
  if (options && options.immediate) this.dom.style.transition = this.placeholder.style.transition = 'none';
  else this.dom.offsetHeight;
  this.placeholder.style.height = this.cardHeight + 'px';
  this.dom.style.height = this.cardHeight + 'px';
  this.placeholder.style.marginBottom = '1em';
  this.dom.className = 'word-card word-card--open';
  this.dom.offsetHeight;
  if (options && options.immediate) this.dom.style.transition = this.placeholder.style.transition = '';
  this._isopen = true;
  this.bind();
}

Textit.Components.Card.prototype.close = function () {
  this.unbind();
  var placeholder = this.placeholder;
  this.placeholder.style.height = '0px';
  this.placeholder.style.marginBottom = '0';
  this.dom.style.height = '0';
  this.dom.className = 'word-card';
  setTimeout(function () {
    var parent = placeholder.parentNode;
    parent.removeChild(placeholder);
    parent.normalize();
  }, 600)
  this._isopen = false;
}

Textit.Components.Card.prototype.deserializeState = function (state) {
  if (state && state.comments != null) {
    this.commentsEl.value = state.comments;
  }
}
Textit.Components.Card.prototype.serializeState = function (state) {
  return { comments: this.commentsEl.value };
}

// Textit.Components.Image
Textit.Components.Image = function (article, loadOptions) {
  this.article = article;
  if (loadOptions && loadOptions.xml)
    this.createFromXml(loadOptions.xml);
}
Textit.Components.Image.xmlTags = ['image'];

Textit.Components.Image.prototype.createFromXml = function (xmlNode) {
  var self = this;
  var src = xmlNode.getAttribute('src');
  var isurl = /^\w+\:\/\/.+/;
  var isprlx = /(\.prlx)|(\.txt)\s*$/;
  this.dom = Textit.util.createHtml({
    html: '<figure><div class="image--paralax"></div></figure>'
  })
  var imgContainer = this.dom.querySelector('.image--paralax');
  this.imgContainer = imgContainer;
  if (isprlx.test(src)) {
    Textit.util.ajaxLoad(src, function (text) {
      var path = src.substring(0, src.lastIndexOf('/') + 1);
      var paralaxImages = JSON.parse(text);
      var html = '';
      for (var i = 0; i < paralaxImages.length; i++) {
        paralaxImages[i] = isurl.test(paralaxImages[i]) ? paralaxImages[i] : path + paralaxImages[i];
        html += '<img src="' + paralaxImages[i] + '" style="transition-duration: ' + ((paralaxImages.length - i) / 1.5) + 's; "/>';
      }
      this.numImages = paralaxImages.length;
      window.addEventListener('scroll', function () {
        self.paralax();
      })
      imgContainer.innerHTML = html;
      setTimeout(function () { self.paralax(); }, 100);

    })
  }
  else {
    imgContainer.innerHTML = '<img src="' + xmlNode.getAttribute('src') + '"></img></div>';
  }

  if (xmlNode.getAttribute('description')) {
    var description = document.createElement('figcaption');
    description.textContent = xmlNode.getAttribute('description');
    this.dom.appendChild(description);
    this.description = description;
  }
}

Textit.Components.Image.prototype.paralax = function () {
  var rect = this.imgContainer.getBoundingClientRect();
  var top = rect.top, effectOffset;
  var x = '0';
  for (var i = 0, len = this.imgContainer.children.length; i < len; i++) {
    if (this.imgContainer.children[i].tagName != 'IMG') continue;
    effectOffset = (top / window.innerHeight) * 25 * (i / 2 + 1);
    //this.dom.children[i].dataset.paralaxTarget = effectOffset;
    this.imgContainer.children[i].style.transform = 'translate(' + x + ', ' + effectOffset + 'px)';
    x = '-50%';
  }
}
/*Textit.Components.Image.prototype.doParalax = function () {
  var top = this.dom.getBoundingClientRect().top, effectOffset;
  for (var i = 1, len = this.dom.children.length; i < len; i++) {
    effectOffset = top / 20 * i / 2;
    this.dom.children[i].dataset.paralaxTarget = effectOffset;
    this.dom.children[i].style.transformY
  }
  var self = this;
  requestAnimationFrame(function () { self.doParalax(); });
}*/

Textit.Components.Question = function (article, loadOptions) {
  var demoquestion = { type: 'multiplechoice', stem: 'מהי התשובה לשאלה הזאת?', options: ['זאת התשובה הזו', 'זאת התשובה שאחריי', 'זאת התשובה הראשונה', 'זאת התשובה שלפני התשובה שלפני זאת'] };
  function loadQuestionContent(qIndex) { //Load from external question imported questions
    if (Textit.externalQuestions && Textit.externalQuestions.get(qIndex) != null)
      return Textit.externalQuestions.get(qIndex);
    return demoquestion;
  }
  var qIndex = parseInt(loadOptions.xml.getAttribute('index'));
  var type = loadOptions.xml.getAttribute('type');
  var question_component;
  if (type == 'import') { // change load options to load from imported json instead of xml
    loadOptions = { json: loadQuestionContent(qIndex) };
    type = loadOptions.json.type;
  }

  var question_component = Textit.Questions.CreateQuestionOfType(type, article, loadOptions);

  return question_component;
}
Textit.Components.Question.xmlTags = ['question'];

// Factory for all components
Textit.Components.createFromXML = (function () {
  var mappings = {};
  for (var compName in Textit.Components) {
    if (typeof Textit.Components[compName].xmlTag != 'undefined')
      mappings[Textit.Components[compName].xmlTag] = Textit.Components[compName];
    if (typeof Textit.Components[compName].xmlTags != 'undefined')
      for (var tagIndex in Textit.Components[compName].xmlTags)
        mappings[Textit.Components[compName].xmlTags[tagIndex]] = Textit.Components[compName];
  }
  return function (article, xmlNode) {
    var componentClass = mappings[xmlNode.tagName]
    if (componentClass != null && 'fabricate' in componentClass) // if is component factory
      return componentClass.fabricate({ xml: xmlNode });
    else if (componentClass != null)
      return new componentClass(article, { xml: xmlNode })
    else
      return false;
  }
})();