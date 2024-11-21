(function () {


  var Audio;
  var Baskets;
  var Stage;
  var App;
  var Content;
  var Proportions;

  var option = function (optionData) {

    Audio = cet.Audio;
    Baskets = cet.Baskets;
    Stage = cet.Stage;
    App = cet.App;
    Content = cet.Content;
    Buttons = cet.Buttons;
    Proportions = cet.Proportions;

    var self = this;
    self.symbol = Stage.createSymbol('option', 'Stage');
    self.id = optionData.id;

    self.jqElement = $(self.symbol.getSymbolElementNode());
    self.jqElement.addClass(optionData.id);


    self.feedbackError = self.jqElement.find('.feedback-error');
    self.feedbackCorrect = self.jqElement.find('.feedback-correct');

    self.feedbackConstX = (self.feedbackWidthAsNumber() * self.widthAsNumber()) / 100;
    self.feedbackConstY = (self.feedbackHeightAsNumber() * self.heightAsNumber()) / 100;




    if (optionData.text.substr(0, 1) === '%')
      try {
        self.jqElement.find('.text').html(decodeURIComponent(optionData.text));
      }
      catch (error) {
        console.error(error);
        self.jqElement.find('.text').html(optionData.text);
      }
    else
      self.jqElement.find('.text').html(optionData.text);

    self.baskets = optionData.baskets;

    self.jqElement.css({ position: 'absolute', top: '-15%', width: Proportions.getOptionWidth() + '%' });
    self.jqElement.addClass('option')
    self.originalColor = self.jqElement.find('.option-background').css('background-color');
    //self.setInteractionVisualEffects();


    self.startTop = 5.3;
    self.droppingDuration = Content.getDroppingDuration();
    self.endTop = parseFloat(Baskets.getBasketTop().replace('%', ''));// - Proportions.getOptionHeight();
    self.currentTop = self.startTop;

    self.velocity = (self.endTop - self.startTop) / self.droppingDuration;

  }

  option.prototype.setInteractionVisualEffects = function () {
    var self = this;
    self.jqElement.hover(function () {
      self.showLabel('hover');
    }, function () {
      var label = self.isInBasket() ? 'in_target' : 'normal';
      self.showLabel(label);
    })

    self.jqElement.on('mousedown', function () {
      self.showLabel('drag');
    });

    self.jqElement.on('mouseup', function () {
      self.showLabel('hover');
    });

  }
  option.prototype.showAsInBasket = function (basketId) {

    var self = this;

    this.jqElement.addClass('dropped');
    this.hostBasketId = basketId;

    this.jqElement.find('.option-background').css({ 'background-color': 'transparent', 'z-index': 20 });
    this.jqElement.css({ 'z-index': 20, 'height': Proportions.getOptionHeight() + '%' });
    this.jqElement.find('.text').css('z-index', 20);
    this.setFeedbacksProportions();

  }
  option.prototype.showAsLeadingOption = function (basketId) {

    var self = this;
    this.jqElement.find('.option-background').css({ 'background-color': '#f59756' });
    this.jqElement.find('.text').css('color', 'white');
  }
  option.prototype.setFeedbacksProportions = function () {
    var self = this;
    self.feedbackCorrect.css({ left: '', right: 0, width: (((self.feedbackConstX / self.widthAsNumber()) * 100) + '%'), height: (((self.feedbackConstY / self.heightAsNumber()) * 100) + '%') });
    self.feedbackError.css({ left: '', right: 0, width: (((self.feedbackConstX / self.widthAsNumber()) * 100) + '%'), height: (((self.feedbackConstY / self.heightAsNumber()) * 100) + '%') });


  }

  option.prototype.showAsInStorage = function (basketId) {

    this.jqElement.removeClass('dropped');
    this.hostBasketId = null;
    this.hideFeedback();
    this.jqElement.find('.option-background').css({ 'background-color': this.originalColor, 'z-index': 'auto' });
    this.jqElement.css({ 'z-index': 'auto', 'height': Proportions.getBasketTitleHeight() + '%', 'top': '-15%' });
    this.jqElement.find('.text').css('z-index', 'auto');

  }
  option.prototype.startDropping = function () {

    var self = this;
    cet.droppingOption = this;
    self.jqElement.css({ "top": "0%", "left": Proportions.getOptionStartingLeft() + "%" });

    self.jqElement.animate({ "top": self.endTop + '%' }, {
      queue: false, duration: self.droppingDuration, easing: 'linear', complete: function () {

        Stage.trigger('dropCompleted', self);
      },
      step: function (currentTop) {
        self.currentTop = currentTop;
      }
    });


  }
  option.prototype.dropFaster = function () {

    var self = this;
    self.stopDropping();
    var distance = (self.endTop - self.currentTop);
    var time = distance / (self.velocity * 16);
    this.jqElement.animate({ "top": self.endTop + '%' }, {
      queue: false, duration: time, easing: 'linear', complete: function () {
        Stage.trigger('dropCompleted', self);
      },
      step: function (currentTop) {
        self.currentTop = currentTop;
      }
    });

  }
  option.prototype.dropSlower = function () {

    var self = this;
    self.stopDropping();
    var distance = (self.endTop - self.currentTop);
    var time = distance / (self.velocity);
    this.jqElement.animate({ "top": self.endTop + '%' }, {
      queue: false, duration: time, easing: 'linear', complete: function () {

        Stage.trigger('dropCompleted', self);
      },
      step: function (currentTop) {
        self.currentTop = currentTop;
      }
    });

  }
  option.prototype.finishDropAnimation = function () {
    this.jqElement.stop(true, true);
  }
  option.prototype.showLabel = function (label) {

    this.symbol.stop(label);
  }
  option.prototype.isInBasket = function () {
    return this.jqElement.parents('.basket').length > 0;
  }
  option.prototype.notifyEverybodyWithTheChange = function () {

    setTimeout(function () { Stage.trigger('change', this); }, 500);
  }
  option.prototype.reloadData = function (optionData) {
    this.jqElement.removeClass(this.id);
    this.id = optionData.id;
    this.jqElement.addClass(optionData.id);
    this.baskets = optionData.baskets;
    this.jqElement.find('.text').html(decodeURIComponent(optionData.text));
    this.jqElement.find('.img').css('background-image', 'url(' + optionData.image + ')');
    this.baskets = optionData.baskets;
  }
  option.prototype.disable = function () {
    this.draggie.disable();
  }
  option.prototype.enable = function () {
    this.draggie.enable();
  }
  option.prototype.setPosition = function (position) {
    this.jqElement.css(position);
  }
  option.prototype.isDraggedToValidBasket = function (ui) {
    return this.jqElement.hasClass('dropped');

  }
  option.prototype.getId = function () {
    return this.id;
  }
  option.prototype.remove = function () {
    this.jqElement.remove();
    //this.symbol.deleteSymbol();
  }
  option.prototype.animate = function (pos, duration, completeMethod) {

    var self = this;
    var currentPos = self.getDistanceFromStage();
    Stage.jqElement.append(self.jqElement);
    self.setPosition(currentPos);

    self.disableHorizontalAnimationInStorage();


    self.jqElement.animate(pos, duration, null, completeMethod);
  }
  option.prototype.getCloneObj = function () {
    //if (this.cloneObj)
    //  return this.cloneObj;
    return Storage.getOptionBySymbolTypeName(this.getSymbolTypeName());
  }
  option.prototype.getDistanceFromStage = function () {
    var self = this;
    var pos = { top: 0, left: 0 };
    var elem = self.jqElement;
    while (elem.attr('id') != 'Stage') {
      pos.left += parseInt(elem.css('left').replace('px', ''));
      pos.top += parseInt(elem.css('top').replace('px', ''));
      elem = elem.parent();
    }
    return pos;
  }
  option.prototype.position = function (newPosition) {
    if (newPosition) {
      //this.jqElement.css({ 'left': newPosition.left, 'top': newPosition.top });
      this.jqElement.animate({ 'left': newPosition.left, 'top': newPosition.top }, 300);
    }
    return { top: this.top(), left: this.left() };
  }
  option.prototype.hide = function () {
    return this.jqElement.hide();
  }
  option.prototype.show = function () {
    return this.jqElement.show();
  }
  option.prototype.fadeTo = function (val) {
    this.jqElement.fadeTo(0, val);
  }
  option.prototype.shiftLeft = function () {
    var self = this;
    var newLeft = (this.leftAsNumber() - Baskets.getHorizontalShift()) + '%';
    self.moving = true;
    self.jqElement.animate({ "left": newLeft }, 50, "linear", function () {
      self.moving = false;
    });
  }
  option.prototype.shiftRight = function () {
    var self = this;
    var newLeft = (this.leftAsNumber() + Baskets.getHorizontalShift()) + '%';
    self.moving = true;
    this.jqElement.animate({ "left": newLeft }, 50, "linear", function () {
      self.moving = false;
    });
  }
  option.prototype.canMoveLeft = function () {
    return !this.moving && ((this.leftAsNumber() - Baskets.getHorizontalShift()) > 0);
  }
  option.prototype.canMoveRight = function () {
    return !this.moving && ((this.leftAsNumber() + Baskets.getHorizontalShift() + this.widthAsNumber()) < 100);
  }
  option.prototype.left = function () {
    return this.jqElement[0].style.left;
  }
  option.prototype.leftAsNumber = function () {
    return parseFloat(this.left().replace('%', ''));
  }
  option.prototype.top = function () {
    return this.jqElement[0].style.top;
  }
  option.prototype.topAsNumber = function () {
    return parseFloat(this.top().replace('%', ''));
  }
  option.prototype.bringToFront = function () {
    Baskets.setAllzIndexesToZero();
    Storage.setZindexes(0);
    Buttons.setZindexes(0);
    this.jqElement.parents().css('z-index', 100);
    this.setZindex(100);
    this.jqElement.fadeTo(0, 0.7);
  }
  option.prototype.removeFromFront = function () {
    Storage.bringToFront();
    this.setZindex(0);
    this.jqElement.fadeTo(0, 1);
  }
  option.prototype.setZindex = function (val) {
    this.jqElement.css('z-index', val);
  }
  option.prototype.text = function () {
    return this.jqElement.find('.text').text();
  }
  option.prototype.widthAsNumber = function () {
    return parseFloat(this.jqElement[0].style.width.replace('%', ''));
  }
  option.prototype.feedbackWidthAsNumber = function () {
    return parseFloat(this.feedbackCorrect[0].style.width.replace('%', ''));
  }
  option.prototype.heightAsNumber = function () {
    return parseFloat(this.jqElement[0].style.height.replace('%', ''));
  }
  option.prototype.feedbackHeightAsNumber = function () {
    return parseFloat(this.feedbackCorrect[0].style.height.replace('%', ''));
  }
  option.prototype.height = function () {
    return this.jqElement.height();
  }
  option.prototype.stopDropping = function () {
    return this.jqElement.stop(true, false);
  }
  option.prototype.isCorrectBasket = function (basket) {

    return this.baskets.indexOf(basket.getId()) != -1;
  }
  option.prototype.getBasketId = function () {

    return this.baskets[0];
  }
  option.prototype.showFeedback = function () {

    if (this.isValid()) {
      this.feedbackError.hide()
      this.feedbackCorrect.show();
    }
    else {
      this.feedbackError.show()
      this.feedbackCorrect.hide();
    }

  }
  option.prototype.hideFeedback = function () {

    this.feedbackError.hide()
    this.feedbackCorrect.hide();

  }
  option.prototype.isValid = function () {

    return this.baskets[0] == this.hostBasketId;
  }
  cet.option = option;

})();