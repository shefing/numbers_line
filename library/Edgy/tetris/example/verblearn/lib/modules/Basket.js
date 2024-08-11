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



    $.extend(pos, { position: 'absolute', width: Proportions.getBasketWidth() + 'px', height: Proportions.getBasketHeight() + 'px', bottom: '74px' })
    self.jqElement.css(pos);
    self.initDropPositions();
    //self.jqElement.find('.basket-title-background').css('height', Proportions.getBasketTitleHeight() + '%')
    self.titleBackground.css('z-index', 10);

    var titleHeight = ((30 * 21 / self.heightAsNumber())) + '%';
    self.titleBackground.css('height', titleHeight);

    //var titleTextTop = (((0.0605 * 0.21) / self.heightAsNumber()) * 100) + '%';
    var titleTextTop = '7px';

    self.titleText.css('top', titleTextTop);
    self.titleText.css('z-index', 10);
    self.jqElement.css('z-index', 10);
    self.background.css('z-index', 0);

    self.backgroundColor = self.jqElement.find('div:first-child').css('background-color');
    self.titleBackgroundColor = self.titleBackground.css('background-color')

    self.jqElement.find('.text').html(decodeURIComponent(Content.getBasketName(id)));

  }

  basket.prototype.initDropPositions = function () {
    var self = this;
    self.dropPositions = [];
    var numberOfDropPositions = Content.getNumberOfOptionsInBasket();
    //var marginTop = Proportions.getOptionMarginTop();
    var marginTop = 0;

    var marginLeft = ((Proportions.getBasketWidth() - Proportions.getOptionWidth()) / 2);//3.99;
    //   var dropPositionHeight = Proportions.getOptionHeight();
    var basketTitleHeight = 37;
    var dropPositionHeight = 26;

    var dropPositionLeft = self.leftAsNumber() + marginLeft;
    for (var i = 0; i < numberOfDropPositions; i++) {
      var newTop = self.top() +
basketTitleHeight +
//cellHeightPrecents
+(marginTop + dropPositionHeight) * i;
      var newBottom = parseInt(self.jqElement.css('bottom').replace('px', '')) + 4 + (dropPositionHeight) * (numberOfDropPositions - 1 - i);
      var newPosition = { left: dropPositionLeft + '%', top: newTop + 'px', bottom: newBottom + 'px' };
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

  },
  basket.prototype.getOptionsObjects = function () {
    var self = this;
    var options = [];
    for (var i = 0; i < self.dropPositions.length; i++) {
      if (self.dropPositions[i].isPopulated())
        options[i] = self.dropPositions[i].getOption();
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
  basket.prototype.addOption = function (option, fromResize) {
    var self = this;
    if (!fromResize) {
      fromResize = false;
    }
    self.getNextDropPosition().addOption(option, fromResize);
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
      if (self.dropPositions[i].isPopulated()) {
        self.dropPositions[i].getOption().showFeedback();

      }
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
    var stageHeight = parseInt($('#Stage').css('height').replace('px', ''), 10);

    return stageHeight - 218;


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
    var backgroundColor1 = '#ffb2b2';
    self.jqElement.find('div:first-child').animate({ backgroundColor: backgroundColor1 }, 300);
    self.titleBackground.animate({ backgroundColor: titleColor }, 300);
  }
  basket.prototype.showCorrectFeedback = function () {
    var self = this;
    var titleColor = '#98ae28'
    var backgroundColor1 = '#c4ffb2';

    self.jqElement.find('div:first-child').animate({ backgroundColor: backgroundColor1 }, 300);
    self.titleBackground.animate({ backgroundColor: titleColor }, 300);
  }
  basket.prototype.hideFeedback = function () {
    var self = this;
    self.jqElement.find('div:first-child').animate({ backgroundColor: self.backgroundColor }, 300);
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
  },
  basket.prototype.resizeAdjustmens = function (winSize) {
    var options = this.getOptionsObjects();
    this.initDropPositions();
    for (var i = 0; i < options.length; i++) {
      this.addOption(options[i], true);
    }
  }




  cet.basket = basket;

})();
