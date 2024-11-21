
var cet;
(function (cet) {
  var option = (function () {
    function option(elem, optionData) {
      this.creationTime = new Date().getTime();
      var self = this;

      self.id = optionData.id;
      self.$element = $(elem);
      self.jqElement = self.$element;
      self.$parent = self.$element.parent();
      self.$element.addClass(optionData.id);
      self.enableHorizontalAnimationInStorage();
      self.units = new cet.dragndrop.Units.units(self.$element);

      self.setAsDraggable();
      self.$element.find('.text').html(optionData.text);

      //self.$element.find('.img').css('background-image', 'url(' + optionData.image + ')');
      if (optionData.image && optionData.image.indexOf('none') == -1)
        self.$element.css('background-image', 'url(' + optionData.image + ')');

      self.baskets = optionData.baskets;
      self.animateBackToStorageDuration = 400;

      self.symbol = new symbol(self.$element);


      self.setInteractionVisualEffects();
    }
    option.prototype.resizeHandler = function () {
      this.reloadDraggable();
    };
    option.prototype.reloadDraggable = function () {
      this.draggie.setScaledDimentions();
    };
    option.prototype.setAsDraggable = function () {
      var self = this;

      self.draggie = new draggable(self.$element, '#stage');

      self.draggie.end = function (pointer) {
        self.showLabel('normal');
        if (!cet.dragndrop.DragSync.isMyDragEnded(self))
          return;

        cet.dragndrop.DragSync.isEndStarted(true);
        self.notifyEverybodyDragEnded();

        self.disableHorizontalAnimationInStorage();

        var group = cet.dragndrop.Groups.updateAndGetHoveredGroup(pointer);
        if (group) {
          var basket = group.getAvailableBasket(pointer);

          if (basket && cet.dragndrop.Content.isFreeGroupMode())
            basket.position(self.getDistanceFromCanvas());
          group.hideHover();
        }
        if (!basket) {
          var basket = cet.dragndrop.Baskets.getHoveredBasket(pointer, true);
          if (!basket) {
            self.animateBackToStorage(cet.dragndrop.DragSync.end);
            return;
          }
        }

        if (self.isSrcBasket(basket)) {
          basket.addOptionWithoutAnimation(self);
          cet.dragndrop.DragSync.end();
          return;
        }
        if (basket.isPopulated()) {
          self.disable();
          basket.unpopulate(cet.dragndrop.DragSync.end);
          cet.dragndrop.Storage.removeOption(self);
          basket.addOption(self);
          return;
        }

        cet.dragndrop.Storage.removeOptionAndEliminateSpaces(self);

        cet.dragndrop.Storage.bringToFront();

        self.appendToStage();

        basket.addOption(self);

        if (cet.dragndrop.Content.isFreeGroupMode()) {
          cet.dragndrop.Groups.rearrangeBaskets();
        }

        //delay cet.dragndrop.DragSync.end till option is added to basket.
        setTimeout(function () {
          self.showAsInTarget();
          cet.dragndrop.DragSync.end();
        }, 150);
      };

      self.draggie.start = function (pointer) {
        if (cet.dragndrop.DragSync.isDragging())
          return;

        cet.dragndrop.DragSync.start(self);

        if (cet.dragndrop.Content.getFeedbackErrorRemoval() == 'onUserInteraction')
          cet.dragndrop.Baskets.removeAllErrorFeedbacks();

        self.srcBasket = cet.dragndrop.Baskets.getBasketByOption(self);

        if (self.srcBasket) {
          self.srcBasket.removeOption();
        } else if (cet.dragndrop.Content.isNonePerishableStorage()) {
          var newOption = self.clone();
          newOption.disable();
          cet.dragndrop.Storage.overrideOption(newOption);
        }
        cet.dragndrop.Storage.setElementAsHanging(self);

        self.showLabel('hover');
        self.disableHorizontalAnimationInStorage();
        self.bringToFront();
      };

      self.draggie.move = function (pointer) {
        var group = cet.dragndrop.Groups.updateAndGetHoveredGroup(pointer);
        if (!group)
          cet.dragndrop.Baskets.updateAndGetHoveredBasket(pointer);
      };
    };
    option.prototype.convertPercentageToPixels = function () {
      //important when size is given with precentage, so when an option is attached somewhere else in the DOM, it preservs its correct size;
      var self = this;
      self.width(self.pixelWidth());
      self.height(self.pixelHeight());
      //self.$element.css('left', self.$element.css('left'))
      //self.$element.css('top', self.$element.css('top'));
    };
    option.prototype.convertPixelsToPercentage = function () {

      var self = this;
      self.width(self.units.percentage.width + '%');
      self.height(self.units.percentage.height + '%');

    };
    option.prototype.setInteractionVisualEffects = function () {
      var self = this;
      self.$element.hover(function () {
        self.showLabel('hover');
      }, function () {
        var label = self.isInBasket() ? 'in_target' : 'normal';

        self.showLabel(label);
      });

      self.$element.on('mousedown', function () {
        self.showLabel('drag');
      });

      self.$element.on('mouseup', function () {
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
      return this.$element.parents('.basket').length > 0;
    };
    option.prototype.notifyEverybodyDragEnded = function () {
      requestAnimationFrame(function () {
        cet.dragndrop.Stage.trigger('dragended', this);
      });
    };
    option.prototype.isSrcBasket = function (basket) {
      if (basket.isPopulated())
        return false;
      return (this.srcBasket && this.srcBasket.getId() == basket.getId()) || basket.isPopulated() && basket.getOption().getId() == this.getId();
    };
    option.prototype.getDragMargins = function (pointer) {
      var self = this;

      var distanceFromBody = self.$element.offset();

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
      this.$element.removeClass(this.id);
      this.id = optionData.id;
      this.$element.addClass(optionData.id);
      this.baskets = optionData.baskets;
      this.$element.find('.text').text(optionData.text);
      this.$element.find('.img').css('background-image', 'url(' + optionData.image + ')');
      this.baskets = optionData.baskets;
    };
    option.prototype.enableHorizontalAnimationInStorage = function () {
      if (this.$element.hasClass('animate-transition'))
        return;
      this.$element.addClass('animate-transition');
    };
    option.prototype.disableHorizontalAnimationInStorage = function () {
      this.$element.removeClass('animate-transition');
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
      this.$element.css(position);
    };
    option.prototype.isDraggedToValidBasket = function (ui) {
      return this.$element.data('dropped');
    };
    option.prototype.getId = function () {
      return this.id;
    };
    option.prototype.isDraggedFromStorage = function () {
      return this.$element.parents('.storage').length;
    };
    option.prototype.remove = function () {
      this.$element.remove();
      //this.symbol.deleteSymbol();
    };
    option.prototype.animateBackToStorage = function (completeMethod) {
      var self = this;
      self.disable();
      self.appendToStage();

      var positionInStorage = cet.dragndrop.Storage.makeRoom(self);
      var storagePosition = cet.dragndrop.Storage.getDistanceFromStage();

      var targetPos = {
        left: storagePosition.left + positionInStorage.left,
        top: storagePosition.top + positionInStorage.top
      };

      self.disableHorizontalAnimationInStorage();

      var methodAfterAnimate = function () {
        self.addMyselfToStorage(positionInStorage);
        self.enableHorizontalAnimationInStorage();
        self.enable();
        if (completeMethod)
          completeMethod();
        self.showLabel('normal');
        self.$element.fadeTo(0, 1);
        cet.dragndrop.DragSync.end();
      };

      if (cet.dragndrop.App.animationStopped() || cet.dragndrop.Storage.isOptionInValidStoragePosition(self)) {
        methodAfterAnimate();
        return;
      }

      self.animate(targetPos, self.animateBackToStorageDuration, null, methodAfterAnimate);
    };
    option.prototype.animatePosition = function (pos, duration, completeMethod) {
      var self = this;

      self.width(self.pixelWidth());
      self.height(self.pixelHeight());

      var currentPos = self.getDistanceFromStage();
      cet.dragndrop.Stage.$element.append(self.$element);
      self.setPosition(currentPos);

      self.disableHorizontalAnimationInStorage();

      self.$element.animate(pos, duration, null, completeMethod);
    };
    option.prototype.addMyselfToStorage = function (storagePos) {
      var self = this;
      var storagePosByPercentage = cet.dragndrop.Storage.getPositionByPercentage(storagePos);
      self.setPosition(storagePosByPercentage);

      cet.dragndrop.Storage.addOption(self);

      self.units.switchToPercentage();
    };

    option.prototype.getDistanceFromCanvas = function () {
      var canvasTop = parseFloat($('.canvas').css('top').replace('px', ''));
      var canvasLeft = parseFloat($('.canvas').css('left').replace('px', ''));

      var distanceFromStage = this.getDistanceFromStage();
      distanceFromStage.top -= canvasTop;
      distanceFromStage.left -= canvasLeft;

      return distanceFromStage;
    };
    option.prototype.getDistanceFromStage = function () {
      var self = this;
      var pos = {
        top: 0, left: 0
      };
      var elem = self.$element;

      while (elem.attr('id') != 'stage') {
        var left = elem[0].style.left ? elem[0].style.left : elem.css('left');
        var top = elem[0].style.top ? elem[0].style.top : elem.css('top');

        if (left.indexOf('px') != -1) {
          pos.left += parseFloat(left.replace('px', ''));
        } else {
          pos.left += (parseFloat(left.replace('%', '')) / 100) * elem.parent().width();
        }
        if (top.indexOf('px') != -1) {
          pos.top += parseFloat(top.replace('px', ''));
        } else {
          pos.top += (parseFloat(top.replace('%', '')) / 100) * elem.parent().height();
        }

        elem = elem.parent();
      }

      return pos;
    };
    option.prototype.position = function (position) {
      if (position)
        this.$element.css(position);

      return {
        top: this.top(), left: this.left()
      };
    };
    option.prototype.hide = function () {
      return this.$element.hide();
    };
    option.prototype.show = function () {
      return this.$element.css('display', 'table');
      //return this.$element.css('display', 'block');
    };
    option.prototype.fadeTo = function (val) {
      this.$element.fadeTo(0, val);
    };

    option.prototype.shift = function (x) {
      var self = this;
      self.$element.css({
        left: x + '%'
      });
      return;

      //I DONT KNOW IT IS NECESSARY BUT IT WORKS!!!
      var duration = cet.dragndrop.App.animationStopped() ? 0 : 10;
      setTimeout(function () {
        self.$element.css({ left: x });
      }, duration);
    };
    option.prototype.left = function () {
      //return parseInt(this.$element.css('left').replace('px', ''));
      return parseFloat(this.$element[0].style.left.replace('%', ''));
    };
    option.prototype.pixelLeft = function () {
      var val = this.$element[0].style.left;
      if (!val)
        val = this.$element.css('left');

      if (val.indexOf('%') != -1)
        return parseFloat(val.replace('%', '')) * this.$parent.width() / 100;
      return parseFloat(val.replace('px', ''));
    };
    option.prototype.top = function () {
      return parseFloat(this.$element[0].style.top.replace('%', ''));
    };

    option.prototype.bringToFront = function () {
      cet.dragndrop.Baskets.setZindexes(1);
      cet.dragndrop.Storage.setZindexes(0);
      cet.dragndrop.Buttons.setZindexes(0);
      this.$element.parents().css('z-index', 100);
      this.setZindex(100);
      this.$element.fadeTo(0, 0.7);
    };
    option.prototype.removeFromFront = function () {
      cet.dragndrop.Storage.bringToFront();
      this.$element.parents().css('z-index', 0);
      this.setZindex(0);
      this.$element.fadeTo(0, 1);
    };
    option.prototype.setZindex = function (val) {
      this.$element.css('z-index', val);
    };
    option.prototype.text = function () {
      return this.$element.find('.text').text();
    };
    option.prototype.width = function (newWidth) {
      if (newWidth)
        this.$element.css('width', newWidth);
      return this.$element[0].style.width;
    };
    option.prototype.pixelWidth = function () {
      return this.$element.width();
    };
    option.prototype.height = function (newHeight) {
      if (newHeight)
        this.$element.css('height', newHeight);
      return this.$element[0].style.height;
    };
    option.prototype.pixelHeight = function () {
      return this.$element.height();
    };
    option.prototype.appendToStage = function () {
      var self = this;
      self.convertPercentageToPixels();
      var targetPos = cet.dragndrop.Utils.getDistanceFromStage(self.$element);
      self.$element.css(targetPos);
      cet.dragndrop.Stage.append(self.$element);
    };

    option.prototype.clone = function () {
      var self = this;

      var optionData = {
        id: self.id,
        text: self.$element.find('.text').html(),
        image: self.$element.css('background-image').replace('url(', '').replace(')', ''),
        baskets: self.baskets
      };

      var clone$element = this.$element.clone();
      this.$element.parent().append(clone$element);
      return new option(clone$element, optionData);
    };
    option.prototype.adjustOptionSize = function () {
      this.draggie.setScaledDimentions();
    };
    option.prototype.animate = function (targetCss, animateDuration, easing, complete) {
      var self = this;
      var completeAdjustment = function () {
        if(complete)
          complete();
        setTimeout(function () {
          self.adjustOptionSize();
        }, animateDuration + 20);
        
      }
      self.$element.animate(targetCss, animateDuration, completeAdjustment);

    };
    return option;
  })();
  cet.dragndrop.option = option;
})(cet || (cet = {}));
