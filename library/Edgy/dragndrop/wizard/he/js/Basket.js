window.cet = window.cet || {}; window.cet.dragndrop = window.cet.dragndrop || {};

(function () {

  var option;
  var Baskets;
  var Content;
  var Stage;
  var Utils;

  var basket = function (elem) {
    option = cet.dragndrop.option;
    Baskets = cet.dragndrop.Baskets;
    Content = cet.dragndrop.Content;
    Stage = cet.dragndrop.Stage;
    Utils = cet.dragndrop.Utils;

    this.$element = $(elem);
    this.jqElement = this.$element;
    this.symbol = Stage.getSymbol(this.$element);
    this.dropBox = this.getDropBox();
    this.normalLabelPosition = this.symbol.getLabelPosition('normal')
    this.hoverLabelPosition = this.symbol.getLabelPosition('hover')
    this._isValid = null;
    this.isVisible = !this.$element.hasClass('hidden');
  }

  basket.prototype.updateDropBox = function () {
    this.dropBox = this.getDropBox();
  }
  basket.prototype.initDropPositions = function () {
    var self = this;
    self.dropPositions = {};
    var dropPositions = self.$element.find('.drop-position');
    $.each(dropPositions, function (index, value) {
      var symbol = Stage.getSymbol('#' + value.attributes['id'].value);
      self.dropPositions[symbol.getSymbolTypeName()] = new dropPosition(symbol);
    });
  }
  basket.prototype.getNextDropPosition = function () {
    var self = this;
    //var idTemplate = this.$element.attr('id');
    for (var i = 1; i < 6; i++) {
      var dropPosition = self.dropPositions['drop-position_' + i];
      if (!dropPosition)
        return null;
      if (!dropPosition.isPopulated())
        return dropPosition;
    }
  }
  basket.prototype.eliminateSpaces = function () {
    var self = this;
    //var idTemplate = this.$element.attr('id');
    for (var i = 1; i < 5; i++) {
      var strongDropPosition = self.dropPositions['drop-position_' + i];
      var weakDropPosition = self.dropPositions['drop-position_' + (i + 1)];
      if (!strongDropPosition || !weakDropPosition)
        return;
      if (!strongDropPosition.isPopulated() && weakDropPosition.isPopulated()) {
        strongDropPosition.populate(weakDropPosition.getOption());
        if (weakDropPosition.feedbackExists())
          strongDropPosition.showFeedback();
        else
          strongDropPosition.removeFeedback();
        weakDropPosition.unpopulate();
      }
    }
  }
  basket.prototype.getOption = function () {
    return this.option;
  }
  basket.prototype.unpopulate = function (completeMethod) {

    this._isValid = null;

    if (!this.isPopulated()) {
      if (completeMethod)
        completeMethod();
      return;
    }

    this.option.animateBackToStorage(completeMethod);
    this.removeOption();

  }
  basket.prototype.isPopulated = function () {
    //return this.$element.find('.option1, .option2, .option3, .option4, .option5, .option6, .option7, .option8').length > 0;
    return this.option != null;
  }
  basket.prototype.addOptionWithoutAnimation = function (option) {
    this.addOption(option, false)
  }
  basket.prototype.addOption = function (option, softAnimation) {

    var self = this;
    option.disable();
    option.fadeTo(1);
    self.option = option;
    self.removeFeedback();



    var targetPos = Utils.getDistanceFromStage(self.$element);

    var posInBasket = {
      left: self.width() / 2 - option.pixelWidth() / 2,
      top: self.height() / 2 - option.pixelHeight() / 2
    }
    targetPos.top += posInBasket.top;
    targetPos.left += posInBasket.left;

    var animationCompleteMethod = function () {
      self.$element.append(option.$element);
      option.$element.css({ top: 0, left: 0 });
      option.$element.css(posInBasket);

      var targetCss = {top: 0, left: 0}
      var animateDuration = 0;
      if (!cet.dragndrop.Content.isFreeGroupMode() || !self.isGroupMember()) {
        targetCss.width = '100%';
        targetCss.height = '100%';
        animateDuration = 400;
      }
      option.animate(targetCss, animateDuration);
      option.enable();
      option.showAsInTarget();
      self.showOccupied();

      if (cet.dragndrop.Content.isFreeGroupMode()) {
        self.setResponsive(option);
      }

    }
    if (typeof softAnimation != 'undefined' && !softAnimation) {
      animationCompleteMethod();
      return;
    }

    option.animatePosition(targetPos, self.animateOptionToBasketDuration(), animationCompleteMethod);
  }
  basket.prototype.animateOptionToBasketDuration = function () {
    if (cet.dragndrop.Content.isFreeGroupMode())
      return 0;
    return 150;
  }

  basket.prototype.showOccupied = function () {

    var self = this;
    if (!isNaN(self.symbol.getLabelPosition('occupied')))
      self.symbol.stop('occupied');
  }
  basket.prototype.removeOption = function (option) {
    this._isValid = null;
    this.removeFeedback();
    this.option = null;
    this.symbol.stop('normal');
    var grp = cet.dragndrop.Groups.getGroupByBasket(this);
    if (grp)
      grp.removeFeedback();


  }
  basket.prototype.setZindex = function (val) {
    this.$element.css('z-index', val);
  }
  basket.prototype.getSymbolTypeName = function () {
    return this.symbol.getSymbolTypeName();
  }
  basket.prototype.getId = function () {
    //var val = this.$element.attr('class').split(' ')[2];
    //if (!val)
    //  val = this.$element.attr('class').split(' ')[1];
    //return val;

    var classes = this.$element.attr('class').split(' ')
    for (var i = 0; i < classes.length; i++) {
      if (classes[i].indexOf('basket-') != -1)
        return classes[i];
      if (classes[i].indexOf('basket') == 0 && classes[i].length > 'basket'.length)
        return classes[i];
    }
  }
  basket.prototype.isValid = function (val) {

    var self = this;

    if (typeof val != 'undefined')
      self._isValid = val;

    if (self._isValid != null)
      return self._isValid;

    if (!self.isVisible)
      return true;

    if (!self.isPopulated())
      return false;

  

    var option = self.getOption();
    var basketId = self.getId();
    for (var i = 0; i < option.baskets.length; i++) {
      if (option.baskets[i] == basketId)
        return true;
    }
    return false;

  }
  basket.prototype.showFeedback = function () {

    var self = this;
    self.$element.find('.feedback-correct, .feedback-error').hide();
    self.$element.addClass('feedback-visible');

    var feedbackIconSelector = '.feedback-';
    feedbackIconSelector += self.isValid() ? 'correct' : 'error';

    self.$element.find(feedbackIconSelector).css({ 'z-index': 1000, display: 'block' }).show();

  }
  basket.prototype.removeFeedback = function () {
    this.$element.removeClass('feedback-visible');
    this.$element.find('.feedback-correct, .feedback-error').hide();
  }
  basket.prototype.feedbackExists = function () {
    return this.$element.find('.feedback-correct, .feedback-error').is(':visible');
  }
  basket.prototype.getDropBox = function () {
    var self = this;
    var offset = self.$element.offset();
    var factor = 8;
    //self.$element.text(
    //  'top: '+ (offset.top - factor ) +
    //  ', left: ' + (offset.left - factor)
    //  )
    //self.$element.css('font-size', '14px')
    var box = {
      top: offset.top - factor,
      left: offset.left - factor,
      right: offset.left + (self.width() * cet.dragndrop.Stage.scale()) + factor,
      bottom: offset.top + (self.height() * cet.dragndrop.Stage.scale()) + factor
    }

    //box.top = box.top * cet.dragndrop.Stage.scale();
    //box.left = box.left * cet.dragndrop.Stage.scale();
    //box.right = box.right * cet.dragndrop.Stage.scale();
    //box.bottom = box.bottom * cet.dragndrop.Stage.scale();

    return box;
  }
  basket.prototype.width = function () {
    return this.$element.width();
  }
  basket.prototype.height = function () {
    return this.$element.height();
  }
  basket.prototype.isBoxOverlaping = function (box) {
    var self = this;
    if (box.right < self.dropBox.left) {
      return false;
    }

    if (box.left > self.dropBox.right) {
      return false;
    }
    if (box.top > self.dropBox.bottom) {
      return false;
    }
    if (box.bottom < self.dropBox.top) {
      return false;
    }
    return true;

  }
  basket.prototype.getOverlappingSize = function (box) {
    var self = this;
    var x = 0;
    if (self.dropBox.left <= box.right && box.right <= self.dropBox.right)
      x = box.right - self.dropBox.left;
    else
      x = self.dropBox.right - box.left;

    var y = 0;
    if (self.dropBox.bottom >= box.top && box.top >= self.dropBox.top)
      y = self.dropBox.bottom - box.top;
    else
      y = box.bottom - self.dropBox.top;


    return x + y;

  }
  basket.prototype.isPointContained = function (pointer) {
    var self = this;
    if (!self.isVisible)
      return false;
    if (!pointer)
      return false;
    if (pointer.pageX < self.dropBox.left || pointer.pageX > self.dropBox.right || pointer.pageY > self.dropBox.bottom || pointer.pageY < self.dropBox.top) {

      return false;
    }
    return true;

  }
  basket.prototype.getContainmentSize = function (pointer) {
    var self = this;
    var x = 0;
    var boxMiddleX = self.dropBox.left + ((self.dropBox.right - self.dropBox.left) / 2)

    if (pointer.pageX >= boxMiddleX)
      x = self.dropBox.right - pointer.pageX;
    else
      x = pointer.pageX - self.dropBox.left;


    var boxMiddleY = self.dropBox.top + ((self.dropBox.bottom - self.dropBox.top) / 2)
    if (pointer.pageY >= boxMiddleY)
      y = self.dropBox.bottom - pointer.pageY;
    else
      y = pointer.pageY - self.dropBox.top;

    return x + y;

  }
  basket.prototype.showHover = function () {

    if (this.isPopulated())
      return;
    if (this.symbol.getPosition() == this.hoverLabelPosition)
      return;
    this.symbol.stop('hover');
  }
  basket.prototype.hideHover = function () {

    if (this.isPopulated()) {
      return;
    }
    if (this.symbol.getPosition() == this.normalLabelPosition)
      return;
    this.symbol.stop('normal');
  }
  basket.prototype.contains = function () {
    return (this.option && this.option.getId() == option.getId());
  }
  basket.prototype.resizeHandler = function () {
    this.updateDropBox();;;;
    if (this.isPopulated())
      this.getOption().resizeHandler();
  }
  basket.prototype.position = function (newPosition) {
    if(newPosition)
      this.$element.css(newPosition);
    return this.$element.position();
  }
  basket.prototype.remove = function () {
    this.$element.remove();
  }
  basket.prototype.isExtra = function () {
   return this.$element.hasClass('extra');
  }
  basket.prototype.addClass = function (className) {
    this.$element.addClass(className);
  }
  basket.prototype.isGroupMember = function () {
    return this.$element.hasClass('group-member');
  }
  basket.prototype.setResponsive = function (option) {

    var $option = option.$element;
    var $optionBasket = $option.parent('.basket');
    var $optionBasketWidth = ($optionBasket.width() != 0) ? $optionBasket.width() : $option.width();
    var $optionBasketHeight = ($optionBasket.height() != 0) ? $optionBasket.height() : $option.height();

    var basketPercentTop = $optionBasket.position().top / $optionBasket.parent().height() * 100;
    var basketPercentLeft = $optionBasket.position().left / $optionBasket.parent().width() * 100;
    var basketPercentHeight = $optionBasketHeight / $optionBasket.parent().height() * 100;
    var basketPercentWidth = $optionBasketWidth / $optionBasket.parent().width() * 100;

    $optionBasket.css({ 'top': basketPercentTop + '%' });
    $optionBasket.css({ 'left': basketPercentLeft + '%' });
    $optionBasket.css({ 'height': basketPercentHeight + '%' });
    $optionBasket.css({ 'width': basketPercentWidth + '%' });

    var optionPercentTop = $option.position().top / $option.parent().height() * 100;
    var optionPercentLeft = $option.position().left / $option.parent().width() * 100;
    var optionPercentHeight = $option.height() / $option.parent().height() * 100;
    var optionPercentWidth = $option.width() / $option.parent().width() * 100;

    $option.css({ 'top': optionPercentTop + '%' });
    $option.css({ 'left': optionPercentLeft + '%' });
    $option.css({ 'height': optionPercentHeight + '%' });
    $option.css({ 'width': optionPercentWidth + '%' });
  }
  cet.dragndrop.basket = basket;

})();
