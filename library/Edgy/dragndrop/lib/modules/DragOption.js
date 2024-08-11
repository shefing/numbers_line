(function () {

  var DragSync;
  var Audio;
  var Baskets;
  var Stage;
  var Storage;
  var App;
  var Content;

  var option = function (elem, optionData) {
    DragSync = cet.DragSync;
    Audio = cet.Audio;
    Baskets = cet.Baskets;
    Stage = cet.Stage;
    Storage = cet.Storage;
    App = cet.App;
    Content = cet.Content;
    Buttons = cet.Buttons;


    var self = this;

    self.id = optionData.id;
    self.jqElement = $(elem);

    self.jqElement.addClass(optionData.id);
    self.enableHorizontalAnimationInStorage();

    self.setAsDraggable();
    self.jqElement.find('.text').text(optionData.text);
    self.jqElement.find('.img').css('background-image', 'url(' + optionData.image + ')');

    self.baskets = optionData.baskets;
    self.animateBackToStorageDuration = 400;

    self.symbol = Stage.getSymbol(self.jqElement);

    self.setInteractionVisualEffects();
    self.sound = optionData.sound;
    //self.setSoundSupport(optionData);


  };

  option.prototype.playSound = function () {
    var self = this;
    if (self.sound) {
      Audio.play(self.sound);
    }
  };
  option.prototype.resizeHandler = function () {
    this.reloadDraggable();
  };
  option.prototype.reloadDraggable = function () {
    this.draggie.setScaledDimentions();
  };
  option.prototype.setAsDraggable = function () {
    var self = this;

    self.draggie = new draggable(self.jqElement, '#Stage');

    self.draggie.end = function (pointer) {

      self.showLabel('normal');

      if (!DragSync.isMyDragEnded(self))
        return;

      DragSync.isEndStarted(true);


      self.notifyEverybodyWithTheChange();

      self.disableHorizontalAnimationInStorage();

      var basket = Baskets.updateAndGetHoveredBasket(pointer);

      if (!basket) {
        self.animateBackToStorage(DragSync.end);
        return;
      }

      if (self.isSrcBasket(basket)) {
        self.removeFromFront();
        basket.addOptionWithoutAnimation(self);
        DragSync.end();
        return;
      }

      if (basket.isPopulated()) {
        self.disable();
        basket.unpopulate(DragSync.end);
        Storage.removeOption(self);
        basket.addOption(self);
        //DragSync.end();
        return;
      }

      Storage.removeOptionAndEliminateSpaces(self);

      //Storage.bringToFront();
      self.removeFromFront();

      //dimas self.appendToStage();

      basket.addOption(self);


      //delay DragSync.end till option is added to basket.
      setTimeout(function () {
        self.showAsInTarget();
        DragSync.end();
      }, 150);

    };

    self.draggie.start = function (pointer) {

      if (DragSync.isDragging())
        return;

      DragSync.start(self);

      self.playSound();

      if (Content.getFeedbackErrorRemoval() == 'onUserInteraction')
        Baskets.removeAllErrorFeedbacks();

      self.srcBasket = Baskets.getBasketByOption(self);

      if (self.srcBasket) {
        self.srcBasket.removeOption();
      }
      Storage.setElementAsHanging(self);

      self.showLabel('hover');
      self.disableHorizontalAnimationInStorage();
      self.bringToFront();
    };

    self.draggie.move = function (pointer) {
      Baskets.updateAndGetHoveredBasket(pointer);

    };


  };
  option.prototype.setInteractionVisualEffects = function () {
    var self = this;
    self.jqElement.hover(function () {
      self.showLabel('hover');
    }, function () {
      var label = self.isInBasket() ? 'in_target' : 'normal';
      self.showLabel(label);
    });

    self.jqElement.on('mousedown', function () {
      self.showLabel('drag');
    });

    self.jqElement.on('mouseup', function () {
      self.showLabel('hover');
    });

  };
  option.prototype.showAsInTarget = function () {
    this.symbol.stop('in_target');
  };
  option.prototype.showLabel = function (label) {

    this.symbol.stop(label);
  };
  option.prototype.isInBasket = function () {
    return this.jqElement.parents('.basket').length > 0;
  };
  option.prototype.notifyEverybodyWithTheChange = function () {

    setTimeout(function () { Stage.trigger('change', this); }, 500);
  };
  option.prototype.isSrcBasket = function (basket) {
    return (this.srcBasket && this.srcBasket.getId() == basket.getId()) ||
     basket.isPopulated() && basket.getOption().getId() == this.getId();
  };
  option.prototype.getDragMargins = function (pointer) {
    var self = this;

    var distanceFromBody = self.jqElement.offset();

    var topMargin = pointer.pageY - distanceFromBody.top;
    var leftMargin = pointer.pageX - distanceFromBody.left;

    var rightMargin = self.width() - leftMargin;
    var bottomMargin = self.height() - topMargin;

    return {
      'top': topMargin,
      'left': leftMargin,

      'right': rightMargin,
      'bottom': bottomMargin
    };
  };
  option.prototype.getDragBox = function (pointer) {
    var self = this;

    var top = pointer.pageY - self.dragMargins.top;
    var left = pointer.pageX - self.dragMargins.left;

    var right = pointer.pageX + self.dragMargins.right;
    var bottom = pointer.pageY + self.dragMargins.bottom;

    return {
      'top': top,
      'left': left,

      'right': right,
      'bottom': bottom
    };
  };
  option.prototype.reloadData = function (optionData) {
    this.jqElement.removeClass(this.id);
    this.id = optionData.id;
    this.jqElement.addClass(optionData.id);
    this.baskets = optionData.baskets;
    this.jqElement.find('.text').text(optionData.text);
    this.jqElement.find('.img').css('background-image', 'url(' + optionData.image + ')');
    this.baskets = optionData.baskets;
  };
  option.prototype.enableHorizontalAnimationInStorage = function () {
    if (this.jqElement.hasClass('animate-transition'))
      return;
    this.jqElement.addClass('animate-transition');
  };
  option.prototype.disableHorizontalAnimationInStorage = function () {
    this.jqElement.removeClass('animate-transition');
  };
  option.prototype.getLandingElement = function (pointer) {
    var self = this;
    self.hide();
    var obj = $(document.elementFromPoint(pointer.clientX, pointer.clientY));
    self.show();
    return obj;
  };
  option.prototype.disable = function () {
    this.draggie.disable();
  };
  option.prototype.enable = function () {
    this.draggie.enable();
  };
  option.prototype.setPosition = function (position) {
    this.jqElement.css(position);
  };
  option.prototype.isDraggedToValidBasket = function (ui) {
    return this.jqElement.data('dropped');

  };
  option.prototype.getId = function () {
    return this.id;
  };
  option.prototype.isDraggedFromStorage = function () {
    return this.jqElement.parents('.storage').length;
  };
  option.prototype.remove = function () {
    this.jqElement.remove();
    //this.symbol.deleteSymbol();
  };
  option.prototype.animateBackToStorage = function (completeMethod) {


    var self = this;
    self.disable();
    var currentPos = self.getDistanceFromStage();
    Stage.jqElement.append(self.jqElement);
    self.setPosition(currentPos);

    var storagePos = Storage.makeRoom(self);
    var basketPos = Storage.getDistanceFromStage();
    basketPos.left += storagePos.left;
    basketPos.top += storagePos.top;

    self.disableHorizontalAnimationInStorage();

    var methodAfterAnimate = function () {
      self.removeFromFront();
      self.addMyselfToStorage(storagePos);
      self.enableHorizontalAnimationInStorage();
      self.enable();
      if (completeMethod)
        completeMethod();
      self.showLabel('normal')
      self.jqElement.fadeTo(0, 1);
      DragSync.end();
    }

    if (App.animationStopped() || Storage.isOptionInValidStoragePosition(self)) {
      methodAfterAnimate()
      return;
    }

    self.jqElement.animate(basketPos, self.animateBackToStorageDuration, null, methodAfterAnimate);

  };
  option.prototype.animate = function (pos, duration, completeMethod) {

    var self = this;
    var currentPos = self.getDistanceFromStage();
    Stage.jqElement.append(self.jqElement);
    self.setPosition(currentPos);

    self.disableHorizontalAnimationInStorage();


    self.jqElement.animate(pos, duration, null, completeMethod);
  };
  option.prototype.addMyselfToStorage = function (storagePos) {
    var self = this;
    self.setPosition(storagePos);
    Storage.addOption(self);
  };
  option.prototype.getCloneObj = function () {
    //if (this.cloneObj)
    //  return this.cloneObj;
    return Storage.getOptionBySymbolTypeName(this.getSymbolTypeName());
  };
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
  };
  option.prototype.position = function () {
    return { top: this.top(), left: this.left() };
  };
  option.prototype.hide = function () {
    return this.jqElement.hide();
  };
  option.prototype.show = function () {
    return this.jqElement.show();
  };
  option.prototype.fadeTo = function (val) {
    this.jqElement.fadeTo(0, val);
  };
  option.prototype.shift = function (x) {
    var self = this;
    self.jqElement.css({ left: x })
    return;

  };
  option.prototype.left = function () {
    return parseInt(this.jqElement.css('left').replace('px', ''));
  };
  option.prototype.top = function () {
    return parseInt(this.jqElement.css('top').replace('px', ''));
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
  };
  option.prototype.bringToFront = function () {
    Baskets.removeFromFront();
    Storage.removeFromFront();
    Buttons.removeFromFront();
    this.jqElement.parents('.basket').css('z-index', 100);
    this.setZindex(100);
    if (Content.getFadeOnDrag())
      this.jqElement.fadeTo(0, 0.7);
  };
  option.prototype.removeFromFront = function () {
    Storage.bringToFront();
    Buttons.bringToFront();
    this.jqElement.parents('.basket').css('z-index', 0);
    this.setZindex(0);
    if (Content.getFadeOnDrag())
      this.jqElement.fadeTo(0, 1);
  };
  option.prototype.setZindex = function (val) {
    this.jqElement.css('z-index', val);
  };
  option.prototype.text = function () {
    return this.jqElement.find('.text').text();
  };
  option.prototype.width = function () {
    return this.jqElement.width();
  }
  option.prototype.height = function () {
    return this.jqElement.height();
  }
  option.prototype.pixelWidth = function () {
    return this.width();
  }
  option.prototype.pixelHeight = function () {
    return this.height();
  }

  cet.option = option;

})();