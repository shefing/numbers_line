var Textit;
if (typeof Textit == 'undefined') Textit = {};
if (typeof Textit.Elements == 'undefined') Textit.Elements = {};


// Textit.Elements.CallToTought.js
Textit.Elements.CallToTought = function (article, loadOptions) {
  this.article = article;
  if (loadOptions && loadOptions.xml)
    this.loadFromXml(loadOptions.xml);
}
Textit.Elements.CallToTought.xmlTag = 'call';

Textit.Elements.CallToTought.prototype.loadFromXml = function (xmlNode) {
  this.dom = Textit.util.createHtml({
    html: '<a class="call-to-thought" href="javascript:;"></a>',
    content: this.article.parseContent(xmlNode)
  });
}

// Textit.Elements.Blank.js
Textit.Elements.Blank = function (article, loadOptions) {
  this.article = article;
  if (loadOptions && loadOptions.xml)
    this.loadFromXml(loadOptions.xml);
}
Textit.Elements.Blank.xmlTag = 'blank';

Textit.Elements.Blank.prototype.loadFromXml = function (xmlNode) {
  this.dom = Textit.util.createHtml({
    html: '<span class="blank" href="javascript:;"></span>',
    content: this.article.parseContent(xmlNode)
  });
}


// Textit.Elements.Embed.js
Textit.Elements.Embed = function (article, loadOptions) {
  this.article = article;
  if (loadOptions && loadOptions.xml)
    this.createFromXML(loadOptions.xml);
}
Textit.Elements.Embed.xmlTag = 'tembed';

Textit.Elements.Embed.prototype.createFromXML = function (xmlNode) {
  var src = xmlNode.getAttribute('src') || '';
  if (/^https?\:\/\/.*youtube/gi.test(src)) { //is youtube link
    var match = src.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/);
    this.dom = document.createElement('iframe');
    this.dom.height = 342;
    this.dom.width = '100%';
    var dom = this.dom;
    setTimeout(function () {
      dom.height = dom.offsetWidth / (16 / 9);
    }, 100)
    this.dom.src = 'https://www.youtube.com/embed/' + match[2] + '?rel=0&showinfo=0';
    return;
  }
  var fileType = src.substr(src.lastIndexOf('.')).replace(/\s/, '');
  var dom;
  switch (fileType) {
    case '.mp3': case '.wav': case '.ogg': case '.oga':
      dom = document.createElement('audio');
      dom.setAttribute('src', src);
      dom.setAttribute('controls', 1);
      break;
    case '.jpg': case '.jpeg': case '.png': case '.bmp': case '.gif':
      dom = document.createElement('img');
      dom.setAttribute('src', src);
      break;
    default:
      dom = document.createElement('span');
      dom.textContent = 'Format ' + fileType + ' not supported';
      break;
  }
  this.dom = dom;
}

// Textit.Elements.Link.js
Textit.Elements.Link = function (article, loadOptions) {
  this.article = article;
  if (loadOptions && loadOptions.xml)
    this.createFromXML(loadOptions.xml);
}
Textit.Elements.Link.xmlTag = 'lnk';

Textit.Elements.Link.prototype.createFromXML = function (xmlNode) {
  var url = xmlNode.getAttribute('url') || '';
  this.dom = Textit.util.createHtml({
    html: '<a class="link" href="' + url + '" target="_blank">' + '</a>',
    content: this.article.parseContent(xmlNode)
  });
}

// Textit.Elements.HotWord.js
Textit.Elements.HotWord = function (article, loadOptions) {
  this.article = article;
  if (loadOptions && loadOptions.xml)
    this.createFromXML(loadOptions.xml);

  this.translated = false;
}
Textit.Elements.HotWord.xmlTag = 'hotword';

Textit.Elements.HotWord.prototype.createFromXML = function (xmlNode) {
  this.translation = xmlNode.getAttribute('translation') || '';
  this.dir = xmlNode.getAttribute('direction') || 'ltr';
  this.hasCard = xmlNode.getAttribute('card') != 'false';
  this.text = xmlNode.textContent;
  this.dom = Textit.util.createHtml({
    html: '<a class="hotword" href="javascript:;">' +
        '<span dir="' + this.dir + '" class="hotword__translation" data-translation="' + Textit.util.escape(this.translation).replace(/"/g, '&quot;') + '">' + Textit.util.escape(this.translation) + '</span>' +
        '</a>',
    content: this.article.parseContent(xmlNode)
  });
  this.translationEl = this.dom.querySelector('.hotword__translation');
  var self = this;
  this.dom.addEventListener('mouseenter', function () { self.hover() });
  this.dom.addEventListener('mouseleave', function () { self.unhover() });
  //this.dom.addEventListener('mousemove', function (e) { self.positionTranslationToMouse(e.clientY); })
  this.hoverTimer = null;
}

Textit.Elements.HotWord.prototype.record = function (action) {
  record = {
    object: { type: 'hotword', word: this.text, translation: this.translation, translated: this.translated },
    action: action
  };
  this.article.record(this, record);
}



Textit.Elements.HotWord.prototype.hover = function (e) {
  var self = this;
  var fontSize = parseFloat(window.getComputedStyle(this.translationEl, null).getPropertyValue('font-size'));
  var locationLeft = this.dom.getBoundingClientRect().left + this.dom.getBoundingClientRect().width / 2;
  var padding = 40;
  var deltaRight = window.innerWidth - padding - (locationLeft + this.translationEl.getBoundingClientRect().width / 2);
  var deltaLeft = padding - (locationLeft - this.translationEl.getBoundingClientRect().width / 2);
  //if (deltaRight < -padding) {
  this.translationEl.style.marginLeft = (Math.min(deltaRight, 0) || Math.max(0, deltaLeft)) + 'px';
  //}

  this.hoverTimer = setTimeout(function () {
    self.record({ interaction: 'hover' })
    self.hoverTimer = true;
  }, 250)
}

Textit.Elements.HotWord.prototype.unhover = function () {
  if (this.hoverTimer == true) {
    this.record({ interaction: 'unhover' })
  } else
    clearTimeout(this.hoverTimer);
}

Textit.Elements.HotWord.prototype.deserializeState = function (state) {
  if (!state) return;
  if (state.translated) {
    this.dom.className = 'hotword hotword--open';
    this.translated = true;
  }
  /*if (state.open) {
    this.open({ immediate: true });
  }*/
}
Textit.Elements.HotWord.prototype.serializeState = function () {
  return { translated: this.translated, open: this.card != null && this.card._isopen }
}

Textit.Elements.HotWord.prototype.click = function () {
  if (!this.hasCard) return;
  var event = {
    object_type: 'link',
    object_name: this.text,
    object_id: this.text,
    object_link: this.text,
  };
  if (this.card && this.card._isopen) {
    event.verb = 'exited';
    this.close();
  }
  else {
    event.verb = 'launched';
    this.open();
  }
  Textit.XAPI.sendEvent(event);
}

Textit.Elements.HotWord.prototype.open = function (options) {
  this.dom.className = 'hotword hotword--open';
  var cardHasEvent = !!this.card;
  var self = this;
  this.article.openCard(this);
  if (!cardHasEvent)
    this.card.on('blur', function () {
      self.dom.className = 'hotword';
      self.record({ interaction: 'close-card-blur' });
    })
  if (!options || !options.immediate)
    this.record({ interaction: 'open-card' });
}

Textit.Elements.HotWord.prototype.close = function () {
  this.dom.className = 'hotword';
  if (this.card) {
    this.record({ interaction: 'close-card' });
    this.card.close();
  }
}

// Factory for all elements

Textit.Elements.createFromXML = (function () {
  var mappings = {};
  for (var elName in Textit.Elements) {
    if (typeof Textit.Elements[elName].xmlTag != 'undefined')
      mappings[Textit.Elements[elName].xmlTag] = Textit.Elements[elName];
    if (typeof Textit.Elements[elName].xmlTags != 'undefined')
      for (var tagIndex in Textit.Elements[elName].xmlTags)
        mappings[Textit.Elements[elName].xmlTags[tagIndex]] = Textit.Elements[elName];
  }
  return function (article, xmlNode) {
    var elClass = mappings[xmlNode.tagName]
    if (elClass != null)
      return new elClass(article, { xml: xmlNode })
    else
      return false;
  }
})();