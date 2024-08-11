
var draggable = (function () {
  function draggable(element, containment) {
    this._disabled = false;
    var self = this;
    self.$element = $(element);
    self.$containment = $(containment);
    self.$document = $(document);

    self.setScaledDimentions();

    function containmetMouseLeaveHandler() {
      if (!self.pDown)
        return;
      self.$element.trigger('mouseup');
    }

    function mouseUpHandler(event) {
      
      if (self.endDelayed)
        return;
      if (self._disabled)
        return;
      
      event.preventDefault();

      self.pDown = null;
      var pointer = self.getPointer(event);
      //support old binding
      if (self._end)
        self.end(pointer);

      if (self.moving) {
        self.moving = false;
        //new binding
        self.$element.trigger('dragend', pointer);
      }
      self.endDelayed = true;
      setTimeout(function () {
        self.startDelayed = false;
      }, 800);
    }

    function mouseMoveHandler(eMove) {
      if (self._disabled)
        return;
      //support old binding
      if (!self.pDown)
        return;
      
      
      if (self.beforeMove) {
        self.beforeMove = false;
        self.moving = true;
        //new binding
        self.$element.trigger('dragstart', pMove);
      }

      eMove.preventDefault();

      var pMove = self.getPointer(eMove);
      var delta = { top: pMove.pageY - self.pDown.pageY, left: pMove.pageX - self.pDown.pageX };

      delta.top = delta.top / self.scale();
      delta.left = delta.left / self.scale();

      var newPosition = { top: self.startPosition.top + delta.top, left: self.startPosition.left + delta.left };

      if (newPosition.top < self.containmentBoundries.top)
        newPosition.top = self.containmentBoundries.top;

      if (newPosition.left < self.containmentBoundries.left)
        newPosition.left = self.containmentBoundries.left;

      if (newPosition.left > self.containmentBoundries.right)
        newPosition.left = self.containmentBoundries.right;

      if (newPosition.top > self.containmentBoundries.bottom)
        newPosition.top = self.containmentBoundries.bottom;

      newPosition.top += 'px';
      newPosition.left += 'px';
      self.$element.css(newPosition);
      //support old binding
      if (self._move)
        self.move(pMove);
      //new binding
      self.$element.trigger('dragmove', pMove);
    }

    function mouseStartHandler(eDown) {
      

      if (self.startDelayed){
        return;
      }
      if (self._disabled){
        return;
      }
      if (self.pDown) {
        return;
        
      }

      eDown.preventDefault();

      self.startDelayed = true;
      self.endDelayed = false;
      self.beforeMove = true;

      var parentOffset = self.$element.parent().offset();
      var containmentOffset = self.$containment.offset();
      var elementBorderWidth = parseInt(self.$element.css('border-left-width').replace('px', ''));

      self.containmentBoundries = {
        top: containmentOffset.top - parentOffset.top,
        left: containmentOffset.left - parentOffset.left,
        bottom: containmentOffset.top + self.containmentHeight - parentOffset.top - self.elementHeight - 2 - elementBorderWidth,
        right: containmentOffset.left + self.containmentWidth - parentOffset.left - self.elementWidth - 2 - elementBorderWidth
      };

      self.containmentBoundries.top = self.containmentBoundries.top / self.scale();
      self.containmentBoundries.left = self.containmentBoundries.left / self.scale();
      self.containmentBoundries.bottom = self.containmentBoundries.bottom / self.scale();
      self.containmentBoundries.right = self.containmentBoundries.right / self.scale();

      self.pDown = self.getPointer(eDown);
      self.startPosition = self.$element.position();
      self.startPosition.top = self.startPosition.top / self.scale();
      self.startPosition.left = self.startPosition.left / self.scale();

      if (self._start)
        self.start(eDown);

    }

    self.$element.on('mousedown touchstart', mouseStartHandler);

    self.$document.on('mousemove touchmove', mouseMoveHandler);

    self.$element.on('mouseup touchend', mouseUpHandler);

    self.$containment.on('mouseleave', containmetMouseLeaveHandler);
  }
  draggable.prototype.setScaledDimentions = function () {
    var self = this;
    self.elementWidth = self.$element.width() * self.scale();
    self.elementHeight = self.$element.height() * self.scale();

    self.containmentWidth = self.$containment.width() * self.scale();
    self.containmentHeight = self.$containment.height() * self.scale();
  };
  draggable.prototype.disable = function () {
    this._disabled = true;
  };
  draggable.prototype.enable = function () {
    this._disabled = false;
  };

  draggable.prototype.getPointer = function (event) {
    var pointer;
    if (!event.originalEvent)
      return null;
    if (event.originalEvent.changedTouches && event.originalEvent.changedTouches.length)
      pointer = event.originalEvent.changedTouches[0];
    else if (event.originalEvent.touches && event.originalEvent.touches.length)
      pointer = event.originalEvent.touches[0];
    else
      pointer = event;

    return {
      pageX: pointer.pageX,
      pageY: pointer.pageY
    };
  };
  draggable.prototype.scale = function () {
    var scale = 1;

    if (cet.dragndrop.Stage) {
      if (cet.dragndrop.Stage.scale) {
        scale = cet.dragndrop.Stage.scale();
      }
    }
    return scale;
  };
  draggable.prototype.on = function (eventName, method) {
    var self = this;
    self.$element.on(eventName, method)
  }
  Object.defineProperty(draggable.prototype, "start", {
    get: function () {
      return this._start;
    },
    set: function (val) {
      this._start = val;
    },
    enumerable: true,
    configurable: true
  });

  Object.defineProperty(draggable.prototype, "end", {
    get: function () {
      return this._end;
    },
    set: function (val) {
      this._end = val;
    },
    enumerable: true,
    configurable: true
  });

  Object.defineProperty(draggable.prototype, "move", {
    get: function () {
      return this._move;
    },
    set: function (val) {
      this._move = val;
    },
    enumerable: true,
    configurable: true
  });
  return draggable;
})();
