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






    self.jqElement.find('.text').html(decodeURIComponent(optionData.text));

    self.baskets = optionData.baskets;

    self.jqElement.css({ position: 'absolute', top: '-50px', width: Proportions.getOptionWidth() + '%' });
    self.jqElement.addClass('option')
    self.originalColor = self.jqElement.find('.option-background').css('background-color');
    self.setInteractionVisualEffects();


    self.startTop = 30;
    self.droppingDuration = Content.getDroppingDuration();
    self.endTop = Baskets.getBasketTop();// - Proportions.getOptionHeight();
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

    this.jqElement.find('.option-background').css({ 'background-color': 'transparent', 'z-index': 20, 'background-image': 'none', '-webkit-box-shadow': 'none', 'box-shadow': 'none', 'height': '100%' });
    this.jqElement.find('.text').css({ 'color': '#313131', 'top': '0', 'height': '100%', 'padding-top': '0', 'z-index': 20, 'line-height': '23px', 'font-size': '18px' });
    this.jqElement.css({ 'z-index': 20, 'height': '25px', 'padding-top': '0' });

    this.setFeedbacksProportions();
  }
  option.prototype.showAsLeadingOption = function (basketId) {

    var self = this;
    //this.jqElement.find('.option-background').css({ 'background-color': '#6F6F6F' });
    //this.jqElement.find('.text').css({'color':'#6F6F6F','font-size':'17px !important'});
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
    self.endTop = Baskets.getBasketTop()
    self.jqElement.css({ "top": "90px", "left": Proportions.getOptionStartingLeft() + "%", 'width': '25%', 'height': '35px' });
    var background = self.jqElement.find('.option-background');
    background.css({ 'left': 'initial', 'position': 'relative', 'margin': 'auto', 'background-image': 'linear-gradient(#fff 0%, #9E9E9E 100%)' });

    var text = self.jqElement.find('.text');
    text.css({ 'margin-left': '-74px', 'left': '50%', 'top': '-3px', 'color': '#222222', 'padding-top': '4px', 'line-height': '30px', 'font-size': '20px' });
    self.jqElement.animate({ "top": self.endTop + 'px' }, {
      queue: false, duration: self.droppingDuration, easing: 'linear', complete: function () {

        Stage.trigger('dropCompleted', self);
      },
      step: function (currentTop) {
        self.currentTop = currentTop;
      }
    });


  }
  option.prototype.resumeDropping = function () {
    var self = this;
    cet.droppingOption = this;
    self.lastEndTop = self.endTop;
    self.endTop = Baskets.getBasketTop();
    self.jqElement.css({ "top": self.calcNewTop(self) + "px" });

    self.jqElement.animate({ "top": self.endTop + 'px' }, {
      queue: false, duration: self.calcResumeDuration(self), easing: 'linear', complete: function () {

        Stage.trigger('dropCompleted', self);
      },
      step: function (currentTop) {
        self.currentTop = currentTop;
      }
    });


  },
  option.prototype.calcNewTop = function (self) {
    var oldTop = parseInt(self.jqElement.css('top').replace('px', ''));
    return (oldTop / self.lastEndTop) * self.endTop;
  },
  option.prototype.calcResumeDuration = function (self) {
    var top = parseInt(self.jqElement.css('top').replace('px', ''));
    return self.droppingDuration * (1 - top / (self.endTop - self.startTop))
  },
  option.prototype.dropFaster = function () {

    var self = this;
    self.stopDropping();
    var distance = (self.endTop - self.currentTop);
    var time = distance / (self.velocity * 16);
    this.jqElement.animate({ "top": self.endTop + 'px' }, {
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
    this.jqElement.animate({ "top": self.endTop + 'px' }, {
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
  option.prototype.position = function (newPosition, fromResize) {
    if (newPosition) {
      if (fromResize) {
        this.jqElement.css({ 'left': newPosition.left, 'top': newPosition.top, 'display': 'block' }).css({ 'bottom': newPosition.bottom, 'top': 'initial' });
      }
      else {
        this.jqElement.animate({ 'left': newPosition.left, 'top': newPosition.top, 'display': 'block', 'bottom': newPosition.bottom }, {
          duration: 300
          , complete: function () {
            $(this).css({ 'bottom': newPosition.bottom, 'top': 'initial' });
          }
        });
      }

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

  option.prototype.resizeAdjustment = function (winSize) {
    self.endTop = Baskets.getBasketTop(winSize);
    self.velocity = (self.endTop - self.startTop) / self.droppingDuration;
  }
  cet.option = option;

})();