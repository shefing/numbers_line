Textit.Draggables = Textit.Draggables || {};

Textit.Draggables.DraggableBase = (function () {
  function DraggableBase(source) {
    this.source = source;
  }

  DraggableBase.prototype.startDrag = function (x, y) {
    if (!this.draggingEl) return console.error("No draggingEl initiated. make sure a fixed position draggable element is assigned to 'this.draggingEl'"), false;
    this.mouseStartPos = { x: x, y: y };
    this.scrollStart = Textit.util.scrollTop();
    this.draggableStartPos = { x: this.draggingEl.offsetLeft, y: this.draggingEl.offsetTop };
  }

  DraggableBase.prototype.continueDrag = function (x, y) {
    if (!this.draggingEl) return console.error("No draggingEl initiated. make sure a fixed position draggable element is assigned to 'this.draggingEl'"), false;
    var movementX = x - this.mouseStartPos.x
        , movementY = y - this.mouseStartPos.y - (Textit.util.scrollTop() - this.scrollStart);

    this.draggingEl.style.left = this.draggableStartPos.x + movementX + 'px';
    this.draggingEl.style.top = this.draggableStartPos.y + movementY + 'px';
  }

  DraggableBase.prototype.getText = function () {
    return this.draggingEl.textContent;
  }

  DraggableBase.prototype.endDrag = function () {

  }

  DraggableBase.prototype.drop = function (dropZoneFound) {

  }

  return DraggableBase;
})();

Textit.Draggables.DraggableQuestion = (function () {
  function DraggableQuestion(source, article) {
    this.source = source;
    this.question = article.getComponentByDom(this.source);  
    this.startY = this.source.offsetTop;
    this.startX = 0;
    if (!this.question.isFloating) {
      this.placeholder = document.createElement('div');
      this.placeholder.className = 'question-placeholder';
      this.placeholder.innerHTML = Textit.strings[article.lang].ui.question_return;
      this.placeholder.style.height = source.offsetHeight + 'px';
      this.placeholder.style.boxSizing = 'border-box';
      article.dom.replaceChild(this.placeholder, this.source)
      this.source.style.position = 'absolute';
      this.source.style.left = this.startX + 'px';
      this.source.style.top = this.startY + 'px';
      article.dom.appendChild(this.source);
      this.source.$addClass('dragging');
    } else {
      this.placeholder = this.question.floating_placeholder;
    }
  }
  DraggableQuestion.prototype.startDrag = function (x, y) {
    this.mouseStartPos = { x: x, y: y };
    this.hoversPlaceholder = Textit.util.math.intersectRect(this.placeholder.getBoundingClientRect(), this.source.getBoundingClientRect())
    this.source.style.opacity = '';
    this.placeholder.style.backgroundColor = '';
    this.placeholder.style.border = '2px dotted #f2f2f2';
    this.question.setDragging(true);
  }

  DraggableQuestion.prototype.continueDrag = function (x, y) {
    //var movementX = x - this.mouseStartPos.x
    var movementY = y - this.mouseStartPos.y;

    //this.source.style.left = this.startX + movementX + 'px';
    this.top = this.startY + movementY;
    this.source.style.top = this.top + 'px';
    if (Textit.util.math.intersectRect(this.placeholder.getBoundingClientRect(),
      this.source.getBoundingClientRect())) {
      if (!this.hoversPlaceholder) {
        this.source.style.opacity = '0.5';
        this.placeholder.classList.add('hovered');
        this.hoversPlaceholder = true;
      }
    } else {
      this.source.style.opacity = '';
      this.placeholder.classList.remove('hovered');
      this.hoversPlaceholder = false;
    }
  }
  DraggableQuestion.prototype.endDrag = function () {
    
    if (this.hoversPlaceholder ) {
      this.question.setFloating(false, this.placeholder);
    } else
      this.question.setFloating(true, this.placeholder);
    this.source.style.opacity = '';
    this.placeholder.style.backgroundColor = '';
    this.placeholder.style.border = '';
    var question = this.question;
    setTimeout(function () {
      question.setDragging(false);
    })
    
  }
  DraggableQuestion.prototype.drop = function () { }

  DraggableQuestion.elementSelector = '.question';
  DraggableQuestion.prototype.type = 'question';
  return DraggableQuestion;
})()
// DraggableAnswer to delete Drag question
Textit.Draggables.DraggableAnswer = (function () {
  function DraggableAnswer(source, article) {
    this.source = source;
    this.article = article;
    this.sourceQuestion = this.article.getComponentByDom(source.parentNode);

    var sourceRect = this.source.getBoundingClientRect();
    this.draggingEl = document.createElement('div');
    var rect, tempRect;
    var el = this.source;
    if (el instanceof Array) {
      rect = el[0].getBoundingClientRect();
      rect = { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom }
      for (var i = 0; i < el.length; i++) {
        this.draggingEl.appendChild(el[i].cloneNode(true));
        tempRect = el[i].getBoundingClientRect();
        rect.left = Math.min(rect.left, tempRect.left);
        rect.right = Math.max(rect.right, tempRect.right);
        rect.top = Math.min(rect.top, tempRect.top);
        rect.bottom = Math.max(rect.bottom, tempRect.bottom);
      }
    }
    else {
      this.draggingEl.appendChild(el.cloneNode(true));
      this.draggingEl.firstChild.style.marginLeft = '0px';
      rect = el.getBoundingClientRect();
    }
    this.draggingEl.style.zIndex = 100;
    this.draggingEl.style.position = 'fixed';
    this.draggingEl.style.font = window.getComputedStyle(this.source).getPropertyValue('font');
    this.draggingEl.style.lineHeight = '2.1em';
    this.draggingEl.style.left = rect.left + 'px';
    this.draggingEl.style.width = (rect.right - rect.left + 10) + 'px';
    this.draggingEl.style.top = rect.top - 5 + 'px';


    document.body.appendChild(this.draggingEl);
    this.source.style.opacity = 0;
  }
  Textit.util.oop.inherits(DraggableAnswer, Textit.Draggables.DraggableBase);
  DraggableAnswer.prototype.drop = function (dropZoneFound) {
    var draggingEl = this.draggingEl, source = this.source;
    if (!dropZoneFound) {
      var rect = this.source.getBoundingClientRect();
      draggingEl.style.transition = 'top .5s, left .5s, opacity .5s';
      draggingEl.style.top = rect.top - 5 + 'px';
      draggingEl.style.left = rect.left - (this.article.offsetX || 0) + 'px';

    }
    setTimeout(function () {
      if (source) source.style.opacity = 1;
      document.body.removeChild(draggingEl);
    }, 500)
  }
  DraggableAnswer.prototype.applyDropAction = function (action) {
    if (action == 'trash') {
      this.draggingEl.style.opacity = '0';
      this.sourceQuestion.removeAnswer(this.source);
    }
  }
  DraggableAnswer.elementSelector = '.dropped-answer';
  DraggableAnswer.prototype.type = 'answer';
  DraggableAnswer.prototype.getBoundingClientRect = function () {
    return this.draggingEl.getBoundingClientRect();
  }
  return DraggableAnswer;
})();

/*Textit.Draggables.DraggableCard = (function () {
  function DraggableCard(source) {
    this.source = source;
    var sourceRect = this.source.getBoundingClientRect();
    this.draggingEl = source.cloneNode(true);
    this.draggingEl.style.position = 'fixed'
    this.draggingEl.style.top = sourceRect.top + 'px';
    this.draggingEl.style.left = sourceRect.left + 'px';
    this.draggingEl.style.zIndex = 10;
    document.body.appendChild(this.draggingEl);
    this.source.style.opacity = 0;
  }
  Textit.util.oop.inherits(DraggableCard, Textit.Draggables.DraggableBase);
  DraggableCard.prototype.drop = function (dropZoneFound) {
    
  }

  DraggableCard.elementSelector = '.word-card';
  DraggableCard.prototype.type = 'card';
  DraggableCard.prototype.getBoundingClientRect = function () {
    return this.draggingEl.getBoundingClientRect();
  }
  return DraggableCard;
})();*/

Textit.Draggables.DraggableClozeOption = (function () {
  function DraggableClozeOption(source, article) {
    this.source = source;
    this.article = article;
    this.fromBlank = false;
    if (this.source.parentNode.dataset.question) {
      this.sourceQuestion = this.article.getComponentByIndex(this.source.parentNode.dataset.question);
      this.fromBlank = true;
    }
    else
      this.sourceQuestion = this.article.getComponentByDom(source.parentNode);

    this.draggingEl = document.createElement('div');
    this.draggingEl.className = 'dragged-cloze-option grabbing';
    var rect = source.getBoundingClientRect();

    this.draggingEl.textContent = this.source.textContent;
    this.draggingEl.style.zIndex = 100;
    this.draggingEl.style.position = 'fixed';
    this.draggingEl.style.font = window.getComputedStyle(this.source).getPropertyValue('font');
    this.draggingEl.style.lineHeight = '2.1em';
    this.draggingEl.style.left = rect.left + 'px';
    this.draggingEl.style.top = rect.top + 'px';

    document.body.appendChild(this.draggingEl);
    this.source.style.opacity = 0;
  }
  Textit.util.oop.inherits(DraggableClozeOption, Textit.Draggables.DraggableBase);
  DraggableClozeOption.prototype.drop = function (dropZoneFound) {
    var draggingEl = this.draggingEl, source = this.source;
    if (!dropZoneFound) {
      var rect = source.getBoundingClientRect();
      draggingEl.style.transition = 'top .5s, left .5s, opacity .5s';
      draggingEl.style.top = rect.top + 'px';
      draggingEl.style.left = rect.left - (this.article.offsetX || 0) + 'px';
      setTimeout(function () {
        if (source) source.style.opacity = 1;
        document.body.removeChild(draggingEl);
      }, 500)
    } else {
      document.body.removeChild(draggingEl);
    }
  }
  DraggableClozeOption.prototype.applyDropAction = function (action) {
    if (action == 'trash') {
    }
  }
  DraggableClozeOption.prototype.getBoundingRect = function () {
    return this.draggingEl.getBoundingClientRect();
  }

  DraggableClozeOption.elementSelector = '.draggable-cloze-option';
  DraggableClozeOption.prototype.type = 'cloze';
  DraggableClozeOption.prototype.getBoundingClientRect = function () {
    return this.draggingEl.getBoundingClientRect();
  }
  return DraggableClozeOption;
})();


// Draggable Mark for marks
Textit.Draggables.DraggableMark = (function () {

  function DraggableMark(source, article) {
    this.draggedMarkedText = new Textit.draggedMarkedText(article);
    this.draggedMarkedText.initiateDrag(source, event.pageX, event.pageY);
    for (var funcName in this.draggedMarkedText) {
      this[funcName] = this.draggedMarkedText[funcName];
    }
  }
  DraggableMark.prototype.startDrag = function (x, y) {
    this.draggedMarkedText.draggable_onDragStart(x, y);
  }
  DraggableMark.prototype.continueDrag = function (x, y) {
    this.draggedMarkedText.draggable_onDragContinue(x, y);
  }

  DraggableMark.prototype.endDrag = function () {

  }

  DraggableMark.prototype.drop = function (dropZoneFound) {
    this.draggedMarkedText.draggable_onDragDrop(dropZoneFound);
  }


  DraggableMark.elementSelector = 'mark';
  var _whitelist = null;
  DraggableMark.canDrag = function (sourceEl, article) {
    var markType = parseInt(sourceEl.dataset.markType);
    if (_whitelist != [] && _whitelist != null) {
      return _whitelist.includes();
    }
    if (article.markType != 0 && markType != article.markType)
      return false;
    return true;
  }
  DraggableMark.setWhiteList = function (whitelist) {
    _whitelist = whitelist;
  }
  DraggableMark.prototype.type = 'marked_text';
  return DraggableMark;
})()

// Draggable Mark for marks
Textit.Draggables.DragQuestionSnip = (function () {
  function DragQuestionSnip(source, article) {
    this.draggedMarkedText = new Textit.draggedMarkedText(article);
    this.draggedMarkedText.initiateDrag(source, event.pageX, event.pageY);
    for (var funcName in this.draggedMarkedText) {
      this[funcName] = this.draggedMarkedText[funcName];
    }
  }
  DragQuestionSnip.prototype.startDrag = function (x, y) {
    this.draggedMarkedText.draggable_onDragStart(x, y);
  }
  DragQuestionSnip.prototype.continueDrag = function (x, y) {
    this.draggedMarkedText.draggable_onDragContinue(x, y);
  }

  DragQuestionSnip.prototype.endDrag = function () { }

  DragQuestionSnip.prototype.drop = function (dropZoneFound) {
    this.draggedMarkedText.draggable_onDragDrop(dropZoneFound);
  }

  DragQuestionSnip.elementSelector = 'mark';
  var _whitelist = null;
  DragQuestionSnip.canDrag = function (sourceEl) {
    var markType = parseInt(sourceEl.dataset.markType);
    return markType == Textit.Questions.DragQuestion.lassoSelector;
  }
  DragQuestionSnip.prototype.type = 'marked_text';
  return DragQuestionSnip;
})()