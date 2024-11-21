var Textit = {}
Textit.XML = {};

function extend(obj1, obj2) {
  for (var key in obj2) {
    obj1[key] = obj2[key];
  }
}

Textit.XML.XMLParser = (function () {
  function XmlParser() {
    this.attributes = {};
  }
  var regex_iscomp = /(^\<headling.*\<\/headline\>)/g;
  XmlParser.prototype.parse = function (text) {
    var paragraphs = text.split(/\n\n+/g), componentXmlBuilder;
    var articleProps = {embed:true};
    var trimStart = /^[\s\n]+/;
    var isLastParagraph = /\n\s*\n\s*$/;
    var components = [];
    var nextComponentProperties = {};
    // 1. divide code to components
    while (text.length > 0) {
      text = text.replace(trimStart, '');
      if (text == '' || /^\s+$/.test(text)) { // if the text has ended
        break;
      }

      var componentXmlBuilder = Textit.XML.Components.next(text);
      var compCode = text.match(componentXmlBuilder.regex)[0];
      text = text.substr(compCode.length);
      if (componentXmlBuilder.properties) {
        var properties = componentXmlBuilder.compile(compCode);
        if (properties.article)
          extend(articleProps, properties.article);
        else if (properties.nextComponent) {
          extend(nextComponentProperties, properties.nextComponent);
        }
      } else {
        if (components.length > 0 &&
          componentXmlBuilder == Textit.XML.Components.Paragraph &&
          components[components.length - 1].builder == Textit.XML.Components.Paragraph &&
          !isLastParagraph.test(components[components.length - 1].code)) {
          components[components.length - 1].code += compCode;
        } else
          components.push({ code: compCode, builder: componentXmlBuilder });

        components[components.length - 1].properties = nextComponentProperties;
        nextComponentProperties = {};
      }
    }
    var xml = [];
    // 2. build to xml 
    for (var i = 0; i < components.length; i++) {
      if (components[i].builder.hascontent != false) {
        for (var elname in Textit.XML.Elements) {
          if (Textit.XML.Elements[elname].toxml) {
            components[i].code = components[i].code.replace(Textit.XML.Elements[elname].regex, Textit.XML.Elements[elname].toxml);
          }
        }
      }
      xml.push(components[i].builder.toxml(components[i].code, components[i].properties))
    }
    /*for (var index = 0; index < paragraphs.length; index++) {
      componentXmlBuilder = Textit.XML.Components.find(paragraphs[index]);
      if (componentXmlBuilder.properties) {
        var properties = componentXmlBuilder.compile(paragraphs[index]);
        extend(articleProps, properties);
        paragraphs[index] = '';
      } else {
        if (componentXmlBuilder.hascontent != false) {
          for (var elname in Textit.XML.Elements) {
            if (Textit.XML.Elements[elname].toxml) {
              paragraphs[index] = paragraphs[index].replace(Textit.XML.Elements[elname].regex, Textit.XML.Elements[elname].toxml);
            }
          }
        }
        paragraphs[index] = componentXmlBuilder.toxml(paragraphs[index]);
      }
 
    }*/
    var props = [];
    this.attributes = articleProps;
    for (var key in articleProps) props.push(key + '="' + articleProps[key] + '"');
    return "<article " + props.join(' ') + ">" + xml.join('') + "</article>";
  }
  XmlParser.prototype.parseContent = function (text) {
    for (var elname in Textit.XML.Elements) {
      if (Textit.XML.Elements[elname].toxml) {
        text = text.replace(Textit.XML.Elements[elname].regex, Textit.XML.Elements[elname].toxml);
      }
    }
    return text;
  }
  return XmlParser;
})()

Textit.XML.XMLPreviewer = (function () {

  function XMLPreviewer() {
  }

  XMLPreviewer.prototype.previewHtml = function (xmlText) {
    var parser = new DOMParser();
    xmlDoc = parser.parseFromString(xmlText, "text/xml");
    var html = "";
    var componentsXML = xmlDoc.documentElement.childNodes;
    for (var i = 0; i < componentsXML.length; i++) {
      var compHTML = null;
      for (var compName in Textit.XML.Components) {
        if (Textit.XML.Components[compName].htmlpreivew && componentsXML[i].tagName == Textit.XML.Components[compName].xmlTag) {
          compHTML = Textit.XML.Components[compName].htmlpreivew(componentsXML[i]);
          break;
        }
      }
      compHTML = compHTML || componentsXML[i].outerHTML || new XMLSerializer().serializeToString(componentsXML[i]);
      html += compHTML;
    }

    return html;
  }
  return XMLPreviewer;
})();

function nodeContent(node) {
  return node.innerHTML || node.textContent;
}

function StringXmlNode(tagName, attributes, content) {
  content = content || '';
  /*var el = document.createElement(tagName);
  if (attributes) {
    for (var attr in attributes) {
      el.setAttribute(attr, attributes[attr]);
    }
  }
  if (content) {
    el.innerHTML = content;
  }
  var xml = el.outerHTML;*/
  var attrs = '';
  for (var attr in attributes) {
    attrs += ' ' + attr + '="' + ("" + attributes[attr]).replace(/\"/g, "&quot;") + '"';
  }
  var xml = '<' + tagName + attrs + '>'
    + content +
  '</' + tagName + '>';
  return xml;
}

Textit.XML.Elements = {
  Subheader: {
    regex: /\-([\w\s]+)\-/g
  },
  CallToThought: {
    regex: /\{([^\}\{]+)\|(\d+)\}/g,
    toxml: function (all, text, id) {
      return StringXmlNode('call', { 'data-card': id }, text);
    }
  },
  Hotword: {
    regex: /\[(?!\?)([^\|\n]+)\s*\|\|?\s*([^\]\n]*)\]/g,
    toxml: function (all, a, b) {
      var urlregex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/g;
      var translation = b.trim();
      if (urlregex.test(translation)) { // if is a link
        return StringXmlNode('lnk', { url: translation }, a.trim());
      } else {
        var direction = /[a-zA-Z]/.test(translation) ? 'ltr' : 'rtl';
        return StringXmlNode('hotword', { translation: translation, direction: direction, card: !/\|\|/.test(all) }, a.trim());
      }
    }
  },
  Embed: {
    regex: /\~[ ]*(https?:\/\/[^\|\~]+)[ ]*\~/g,
    toxml: function (all, src, end) {
      return StringXmlNode('tembed', { src: src }, 'null');
    }
  },
  Strong: {
    regex: /\*([^\*\n]+)\*/g,
    toxml: function (all, a) {
      return StringXmlNode('strong', null, a);
    }
  },
  List: {
    regex: /((?:^|\n)(\-|#).+)+/g,
    toxml: function (all, lastline, seperator) {
      var items = all.split(/\s*\-|#\s*/g)
      items.splice(0, 1);
      var content = '';
      for (var i = 0; i < items.length; i++)
        content += StringXmlNode('item', null, items[i]);
      var xmlTag = seperator == '-' ? 'list' : 'numberedlist';
      return StringXmlNode(xmlTag, null, content).trim();
    }
  },
  Blank: {
    regex: /__\((\d+)\)(.+)__/g,
    toxml: function (all, questionNumber, text) {
      return StringXmlNode('blank', null, text);
    }
  }
}

Textit.XML.Components = {
  Headline: {
    regex: /^[ ]*([\=]+)([^\=]+)([\=]+)[ ]*/,
    xmlTag: 'headline',
    toxml: function (content) {
      var res = content.match(this.regex);
      var headlineType = res[1], content = res[2];
      return StringXmlNode(this.xmlTag, { importance: headlineType.length }, content);
    }
  },
  Properties: {
    regex: /^[ ]*{{(.*)}}[ ]*/,
    properties: true, // is not a standalone component, but rather only property definitions
    compile: function (content) {
      var propertiesRegex = /(\w+) *\=([^\n }]+) */g;
      var props = {};
      var res = propertiesRegex.exec(content);
      if (res == null) {
        return { nextComponent: { 'meta-target': this.regex.exec(content)[1].trim() } }
      }
      while (res != null) {
        props[res[1]] = res[2];
        res = propertiesRegex.exec(content);
      }
      return { article: props };
    }
  },

  Card: {
    regex: /^\s*\[\[(.+)([^\]]+)\]\]\s*/,
    xmlTag: 'card',
    toxml: function (content) {
      var res = content.match(this.regex);
      //res[1] res[2]
      var term = res[1].trim();
      var defintion = res[2].trim();
      return StringXmlNode(this.xmlTag, { term: term }, defintion);
    },
    htmlpreivew: function (node) {
      return '<div class="card"><h1>' + node.getAttribute('term') + '</h1><p>' + nodeContent(node) + '</p></div>';
    }
  },

  Image: {
    regex: /^[ ]*\~(.+)\|(.*)\~[ ]*/,
    xmlTag: 'image',
    toxml: function (content) {
      var res = content.match(this.regex);
      var desc = res[2].trim();
      if (desc.length > 0)
        return StringXmlNode(this.xmlTag, { src: res[1].trim(), description: desc }, 'null');
      else
        return StringXmlNode(this.xmlTag, { src: res[1].trim() }, 'null');
    },
    htmlpreivew: function (imagenode) {
      var src = imagenode.getAttribute('src');
      var isprlx = /(\.prlx)|(\.txt)\s*/;
      if (isprlx.test(src))
        src = src.replace(isprlx, '1.png');
      return '<figure>' +
                  '<img src="' + src + '" alt="' + imagenode.getAttribute('description') + '" />' +
                  (imagenode.getAttribute('description') ? '<figcaption>' + imagenode.getAttribute('description') + '</figcaption>' : '') +
             '</figure>';
    }
  },

  PageBreak: {
    hascontent: false,
    regex: /^\s*\-[\-]+\s*/,
    xmlTag: 'pagebreak',
    toxml: function (content) {
      return StringXmlNode(this.xmlTag, {}, 'null');
    },
    htmlpreivew: function (imagenode) {
      return '<hr />';
    }
  },

  Question: {
    regex: /^\s*\[\?(\^?)\s*(\d+)?\s*(?:(\([^\)]+?\))?)\s*([\s\S]+?)\?\]\s*/,
    //regex: /^\[\?([\s\S]+?)\?\]/,
    xmlTag: 'question',
    questionTypes: {
      '(גרירה)': 'drag', '(גררה)': 'drag', '(הוספה)': 'insertion',
      '(רב ברירה)': 'multiplechoice', '(רב-ברירה)': 'multiplechoice',
      '(פתוחה)': 'open', '(מרקור)': 'mark', '(מרקר)': 'mark', '(סימון)': 'mark',
      '(השלמה)': 'cloze', '(קלוז)': 'cloze',

      '(drag)': 'drag',
      '(multiplechoice)': 'multiplechoice',
      '(open)': 'open', '(mark)': 'mark', '(highlight)': 'mark',
      '(cloze)': 'cloze'
    },
    compile: function (text) {
      var lines, regexmatch;
      var questionType = null, questionIndex, questionOpen;
      regexmatch = text.match(this.regex);
      questionOpen = regexmatch[1] == '^';
      questionIndex = regexmatch[2];
      questionType = regexmatch[3];
      text = regexmatch[4];
      questionType = questionType in this.questionTypes ? this.questionTypes[questionType] : 'open';
      return { type: questionType, index: questionIndex, inner: text, open: questionOpen }
    },
    toxml: function (text, meta) {
      var question = this.compile(text);
      var questionInnerXML = Textit.XML.Questions[question.type].toxml(question.inner);
      var attributes = { index: question.index, type: question.type, open: question.open };
      extend(attributes, meta)
      return StringXmlNode(this.xmlTag, attributes, questionInnerXML);
    },
    htmlpreivew: function (node) {
      return '<div class="question" data-index="' + node.getAttribute('index') + '">' +
                  '<span class="question__type" data-type="' + node.getAttribute('type') + '">' + node.getAttribute('type') + '</span>' +
                  '<span class="question__stem">' + node.querySelector('stem').textContent + '</span>' +
             '</div>';
    }
  },
  Reference: {
    hascontent: true,
    regex: /^\s*>>>\s*(.+)[\s\n]*/,
    xmlTag: 'reference',
    toxml: function (text, meta) {
      return StringXmlNode(this.xmlTag, meta, text.match(this.regex)[1]);
    },
    htmlpreivew: function (node) {
      return '<reference>' + node.textContent + '</reference>';
    }
  },
  Paragraph: {
    regex: /.+[\s\n]*/,
    toxml: function (text, meta) {
      return StringXmlNode('p', meta, text);
    },
  },
  next: function (content) {
    for (var compName in this) {
      if (this[compName] == this.Paragraph) continue; //skip paragraph - should only be last resort...
      if (this[compName].regex && this[compName].regex.test(content)) {
        return this[compName];
      }
    }
    return this.Paragraph; // paragraph
  },
  find: function (content) {
    for (var compName in this) {
      if (this[compName] == this.Paragraph) continue; //skip paragraph - should only be last resort...
      if (this[compName].regex && this[compName].regex.test(content)) {
        return this[compName];
      }
    }
    return this.Paragraph; // paragraph is default
  }
}

Textit.XML.Questions = {
  SPLITTERS: {
    ALT: /\s*\|\s*/ /* Alternative value for the same answer */
  },
  MODIFIERS: {
    CLUE: /^\s*(?:רמז|clue|رمز):\s*(.+)$/,
    TRANSLATION: /^\s*(?:תרגום|translation|ترجمة):\s*(.+)$/
  },
  compileLines: function (text, stem, clue, translation) {
    var bodyLines = [];
    if (text) {
      var lines = text.split(/\n/g);
      for (var i = 0; i < lines.length; i++) {
        if (!/^\s*$/.test(lines[i])) {
          if (stem == null) // first look for the stem
            stem = lines[i]
          else if (Textit.XML.Questions.MODIFIERS.CLUE.test(lines[i]))
            clue = lines[i].match(Textit.XML.Questions.MODIFIERS.CLUE)[1].trim();
          else if (Textit.XML.Questions.MODIFIERS.TRANSLATION.test(lines[i]))
            translation = lines[i].match(Textit.XML.Questions.MODIFIERS.TRANSLATION)[1].trim();
          else
            bodyLines.push(lines[i].trim());
        }
      }
    }
    var xml = '<stem>' + stem + '</stem>'
    if (clue)
      xml += '<clue>' + clue + '</clue>';
    if (translation)
      xml += '<translation>' + translation + '</translation>';
    return { lines: bodyLines, stem: stem, xml: xml, clue: clue, translation: translation };
  },
  'drag': {
    toxml: function (text) {
      var base = Textit.XML.Questions.compileLines(text);
      var xml = base.xml, values;
      for (var i = 0; i < base.lines.length; i++) {
        xml += '<answer>';
        values = base.lines[i].split(/\s*\|\s*/);
        for (var j = 0; j < values.length; j++)
          xml += StringXmlNode('value', {}, values[j].trim())

        xml += '</answer>';
      }
      return xml;
    }
  },
  'insertion': {
    toxml: function (text) {
      var base = Textit.XML.Questions.compileLines(text);
      var snippets = base.lines, stem = base.stem;
      var xml = base.xml;
      for (var i = 0; i < snippets.length; i++) {
        xml += StringXmlNode('snippet', {}, snippets[i])
      }
      return xml;
    }
  },
  'mark': {
    friendlyColorNames: {
      'ירוק': 'green', 'אדום': 'red', 'סגול': 'purple', 'כחול': 'blue',
      'green': 'green', 'red': 'red', 'purple': 'purple', 'blue': 'blue'
    },
    toxml: function (text) {
      var base = Textit.XML.Questions.compileLines(text);
      var stem = base.stem;
      var friendlyColorNames = this.friendlyColorNames;
      for (var colorName in friendlyColorNames) {
        stem = stem.replace(new RegExp('[^\]' + colorName), function (all) {
          return all + ' [' + friendlyColorNames[colorName][0].toUpperCase() + '] ';
        });
      }
      var xml = Textit.XML.Questions.compileLines(null, stem, base.clue, base.translation).xml;

      for (var i = 0; i < base.lines.length; i++) {
        var dash = base.lines[i].indexOf('-');
        if (dash != -1) { // is it is an approporiated syn atxed answer
          var color = base.lines[i].substr(0, dash).trim();
          if (color) color = this.friendlyColorNames[color];
          xml += '<answer color="' + color + '">';
          var values = base.lines[i].substr(dash + 1).trim().split(Textit.XML.Questions.SPLITTERS.ALT);
          for (var v = 0; v < values.length; v++) {
            xml += StringXmlNode('value', {}, values[v].trim())
          }
          xml += '</answer>';
        }
      }
      return xml;
    }
  },
  'cloze': {
    toxml: function (text) {
      var base = Textit.XML.Questions.compileLines(text);
      var xml = base.xml;
      var clozeRegex = /^(.+)\s*\=\s*(.+)\s*$/;
      for (var i = 0; i < base.lines.length; i++) {
        if (clozeRegex.test(base.lines[i])) { // is it is an approporiated synatxed answer
          var matches = base.lines[i].match(clozeRegex);
          xml += StringXmlNode('cloze', { source: matches[1].trim() }, matches[2].trim());
        } else
          xml += StringXmlNode('cloze', { source: base.lines[i].trim() }, base.lines[i].trim());
      }
      return xml;
    }
  },
  'multiplechoice': {
    toxml: function (text) {
      var base = Textit.XML.Questions.compileLines(text);
      var xml = base.xml;
      var correct = false;
      for (var i = 0; i < base.lines.length; i++) {
        correct = (base.lines[i][0] == '*');
        if (correct)
          base.lines[i] = base.lines[i].substr(1).trim();
        xml += StringXmlNode('option', { correct: correct }, base.lines[i])
      }
      return xml;
    }
  },
  'open': {
    toxml: function (text) {
      var base = Textit.XML.Questions.compileLines(text);
      var xml = base.xml;
      return xml;
    }
  }
}