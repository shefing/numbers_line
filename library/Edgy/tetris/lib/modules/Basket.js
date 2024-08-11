window.cet = window.cet || {};

(function () {

  var option;
  var Baskets;
  var Content;
  var Stage;
  var Utils;
  var dropPosition;
  var Proportions;

  var basket = function (id, pos) {

    //#region meta declarations

    option = cet.option;
    Baskets = cet.Baskets;
    Content = cet.Content;
    Stage = cet.Stage;
    Utils = cet.Utils;
    dropPosition = cet.dropPosition;
    Proportions = cet.Proportions;

    //#endregion

    var self = this;
    self.symbol = Stage.createSymbol('basket', 'Stage');
    self.id = id;

    self.jqElement = $(self.symbol.getSymbolElementNode());
    self.background = self.jqElement.find('.basket-background');
    self.titleBackground = self.jqElement.find('.basket-title-background');
    self.titleText = self.jqElement.find('.text');



    $.extend(pos, { position: 'absolute', width: Proportions.getBasketWidth() + '%', height: Proportions.getBasketHeight() + '%' })
    self.jqElement.css(pos);
    self.initDropPositions();
    //self.jqElement.find('.basket-title-background').css('height', Proportions.getBasketTitleHeight() + '%')
    self.titleBackground.css('z-index', 10);

    var titleHeight = ((30 * 21 / self.heightAsNumber())) + '%';
    self.titleBackground.css('height', titleHeight);

    //var titleTextTop = (((0.0605 * 0.21) / self.heightAsNumber()) * 100) + '%';
    var titleTextTop = (((6.05 * 21) / self.heightAsNumber())) + '%';

    self.titleText.css('top', titleTextTop);
    self.titleText.css('z-index', 10);

    self.jqElement.css('z-index', 10);
    self.background.css('z-index', 0);

    self.backgroundColor = self.background.css('background-color')
    self.titleBackgroundColor = self.titleBackground.css('background-color')

    if (Content.getBasketName(id).substr(0, 1) === '%')
      try {
        self.jqElement.find('.text').html(decodeURIComponent(Content.getBasketName(id)));
      }
      catch (error) {
        console.error(error);
        self.jqElement.find('.text').html(Content.getBasketName(id));
      }
    else
      self.jqElement.find('.text').html(Content.getBasketName(id));

  }

  basket.prototype.initDropPositions = function () {
    var self = this;
    self.dropPositions = [];
    var numberOfDropPositions = Content.getNumberOfOptionsInBasket();
    var marginTop = Proportions.getOptionMarginTop();

    var marginLeft = ((Proportions.getBasketWidth() - Proportions.getOptionWidth()) / 2);//3.99;
    var dropPositionHeight = Proportions.getOptionHeight();
    var basketTitleHeight = Proportions.getBasketTitleHeight();
    var dropPositionLeft = self.leftAsNumber() + marginLeft;

    for (var i = 0; i < numberOfDropPositions; i++) {
      var newTop = self.topAsNumber() + basketTitleHeight + (marginTop + dropPositionHeight) * i;
      var newPosition = { left: dropPositionLeft + '%', top: newTop + '%' };
      self.dropPositions.push(new dropPosition(newPosition));
    }

  }
  basket.prototype.getNextDropPosition = function () {
    var self = this;
    //var idTemplate = this.jqElement.attr('id');
    for (var i = 0; i < self.dropPositions.length; i++) {
      var dropPosition = self.dropPositions[i];
      if (!dropPosition)
        return null;
      if (!dropPosition.isPopulated())
        return dropPosition;
    }
  }
  //basket.prototype.getOption = function (optionJqElement) {
  // return this.option;
  // //var self = this;
  // //var dropPositionId = optionJqElement.parents('.drop-position').attr('id');
  // //var symbolTypeName = Stage.getSymbol('#' + dropPositionId).getSymbolTypeName();
  // //return self.dropPositions[symbolTypeName].option;
  //}
  basket.prototype.getOptions = function () {
    var self = this;
    var options = [];
    for (var i = 0; i < self.dropPositions.length; i++) {
      if (self.dropPositions[i].isPopulated())
        options[i] = self.dropPositions[i].getOption().getId();
    }
    return options;

  }
  basket.prototype.unpopulate = function (completeMethod) {

    if (this.isPopulated()) {
      this.removeFeedback();
      for (var i = this.dropPositions.length - 1; i >= 0 ; i--) {
        this.dropPositions[i].unpopulate()
      }
    }

    if (completeMethod)
      completeMethod();
  }
  basket.prototype.isPopulated = function () {
    //return this.jqElement.find('.option1, .option2, .option3, .option4, .option5, .option6, .option7, .option8').length > 0;
    return this.dropPositions != null && this.dropPositions.length > 0;
  }
  basket.prototype.addOption = function (option) {
    var self = this;

    self.getNextDropPosition().addOption(option);
    option.showAsInBasket(self.getId());

  }
  basket.prototype.setZindex = function (val) {
    this.jqElement.css('z-index', val);
  }
  basket.prototype.getId = function () {
    return this.id;
  }
  basket.prototype.showFeedback = function () {

    var self = this;
    for (var i = 0; i < self.dropPositions.length; i++) {
      if (self.dropPositions[i].isPopulated())
        self.dropPositions[i].getOption().showFeedback();
    }

  }
  basket.prototype.removeFeedback = function () {
    this.jqElement.find('.feedback-correct, .feedback-error').hide();
  }
  basket.prototype.feedbackExists = function () {
    return this.jqElement.find('.feedback-correct, .feedback-error').is(':visible');
  }
  basket.prototype.width = function () {
    return this.jqElement.width();
  }
  basket.prototype.height = function () {
    return this.jqElement[0].style.height;
  }
  basket.prototype.heightAsNumber = function () {
    return parseFloat(this.height().replace('%', ''));
  }
  basket.prototype.top = function () {
    return this.jqElement[0].style.top;

  }
  basket.prototype.topAsNumber = function () {
    return parseFloat(this.top().replace('%', ''));
  }
  basket.prototype.left = function () {
    return this.jqElement[0].style.left;
  }
  basket.prototype.leftAsNumber = function () {
    return parseFloat(this.left().replace('%', ''));
  }

  basket.prototype.showHover = function () {
    if (this.isPopulated())
      return;
    if (this.symbol.getPosition() == this.hoverLabelPosition)
      return;
    this.symbol.stop('hover');
  }
  basket.prototype.hideHover = function () {
    if (this.isPopulated())
      return;
    if (this.symbol.getPosition() == this.normalLabelPosition)
      return;
    this.symbol.stop('normal');
  }
  basket.prototype.contains = function (option) {
    return (this.option && this.option.getId() == option.getId());
  }
  basket.prototype.isFull = function () {
    return this.getNextDropPosition() == null;
  }
  basket.prototype.showFullFeedback = function () {
    var self = this;
    var titleColor = '#ad2c31'
    var backgroundColor = '#6f1d21';

    self.background.css('background-color', backgroundColor);
    self.titleBackground.css('background-color', titleColor);

    //this.symbol.stop('error')
    //this.
  }
  basket.prototype.showErrorFeedback = function () {
    var self = this;
    var titleColor = '#ad2c31'
    var backgroundColor1 = '#6f1d21';

    self.background.animate({ backgroundColor: backgroundColor1 }, 300);
    self.titleBackground.animate({ backgroundColor: titleColor }, 300);
  }
  basket.prototype.showCorrectFeedback = function () {
    var self = this;
    var titleColor = '#98ae28'
    var backgroundColor1 = '#72821f';

    self.background.animate({ backgroundColor: backgroundColor1 }, 300);
    self.titleBackground.animate({ backgroundColor: titleColor }, 300);
  }
  basket.prototype.hideFeedback = function () {
    var self = this;

    self.background.animate({ backgroundColor: self.backgroundColor }, 300);
    self.titleBackground.animate({ backgroundColor: self.titleBackgroundColor }, 300);
  }
  basket.prototype.isValid = function () {
    return false;
  }
  basket.prototype.getNumberOfCorrectOptions = function () {

    var self = this;
    var count = 0;
    for (var i = 0; i < self.dropPositions.length; i++) {
      if (self.dropPositions[i].containsValidOption())
        count++;
    }
    return count;
  }




  cet.basket = basket;

})();
