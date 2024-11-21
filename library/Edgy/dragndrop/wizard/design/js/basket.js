///<reference path='ui.ts'/>
///<reference path='../../../../lib/modules/draggable.ts'/>
///<reference path='../../../../lib/modules/units.ts'/>
///<reference path='basketdata.ts'/>
///<reference path='../../../../lib/external/jquery.d.ts'/>
var basket = (function () {
  function basket(data) {
    var self = this;

    self.$basket = $(
      '<div class="basket" >' +
        '<div class="test" ></div>' +
        '<div class="linked-icon" ></div >' +
        '<div class="hidden-on-runtime-icon" ></div >' +
        '<div class="text-parent" ><span class="text" ></span></div>' +
        '<div class="n-handle" ></div ><div class="e-handle" ></div><div class="s-handle" ></div><div class="w-handle" ></div><div class="se-handle" ></div>' +
      '</div>');
    self.InitId(data);
    self.$linkedIcon = self.$basket.find('.linked-icon');
    self.$basket.append('<div class="background"></div>');

    if (data.realTimeCreation)
      self.$basket.addClass('active');

    self.$basket.css({
      top: data.top,
      left: data.left,
      height: data.height + 'px',
      width: data.width + 'px',
      'border-color': wizard.basketBorderColor,
      'opacity': wizard.basketOpacity,
    });
    self.$basket.appendTo($('.stage'));

    self.$backColor = self.$basket.find('.background');
    self.$backColor.css('background-color', wizard.basketBackgroundColor);

    self.$text = self.$basket.find('.text');
    self.image = data.image;
    self.text = data.text;
    self.color = data.color;

    self.draggie = new draggable(self.$basket, '.stage');
    UI.setAsResizable(self.$basket, '.stage', false);
    self.$basket.on('resizeend', function () {
      self.draggie.setScaledDimentions();
    })
    self.$basket.on('mousedown', function (e) {
      e.stopPropagation();
      $.proxy(self.activate, self)();
      //return false;
    });

    self.$basket.on('mouseup', $.proxy(self.bubbleMouseUpToUnderlyingElement, self));
    self._units = new cet.Units.units(self.$basket);


    self.hiddenOnRuntime = data.hiddenOnRuntime;
  }

  Object.defineProperty(basket.prototype, "hiddenOnRuntime", {
    get: function () {
      return this.$basket.hasClass('hidden-on-runtime');
    },
    set: function (val) {
      if (val) {
        this.$basket.addClass('hidden-on-runtime');
      }
      else {
        this.$basket.removeClass('hidden-on-runtime');
      }

      this.change();
    },
    enumerable: true,
    configurable: true
  });


  Object.defineProperty(basket.prototype, "id", {
    get: function () {
      return this.$basket.attr('id');
    },
    enumerable: true,
    configurable: true
  });

  Object.defineProperty(basket.prototype, "units", {
    get: function () {
      return this._units;
    },
    enumerable: true,
    configurable: true
  });

  Object.defineProperty(basket.prototype, "image", {
    get: function () {
      //return this.$backColor.css('background-image'); //.replace(/url\(/g, '').replace(')', '').replace(/\"/g, '');
      return this.$backColor.css('background-image').replace(/url\(/g, '').slice(0, -1);
    },
    set: function (val) {
      if (val && val.indexOf('none') == -1)
        this.$backColor.css('background-image', 'url(' + '"' + val.replace(/\"/g, '') + '"' + ')');
      else
        this.$backColor.css('background-image', 'none');

      this.change();
    },
    enumerable: true,
    configurable: true
  });

  Object.defineProperty(basket.prototype, "text", {
    get: function () {
      return this.$text.text();
    },
    set: function (val) {
      this.$text.text(val);
      this.change();
    },
    enumerable: true,
    configurable: true
  });

  Object.defineProperty(basket.prototype, "color", {
    get: function () {
      return this.$text.css('color');
    },
    set: function (val) {
      this.$text.css('color', val);
      this.change();
    },
    enumerable: true,
    configurable: true
  });

  Object.defineProperty(basket.prototype, "opacity", {
    get: function () {
      return this.$basket.css('opacity');
    },
    set: function (val) {
      this.$basket.css('opacity', val);
    },
    enumerable: true,
    configurable: true
  });

  Object.defineProperty(basket.prototype, "backgroundColor", {
    set: function (val) {
      this.$backColor.css('background-color', val);
    },
    enumerable: true,
    configurable: true
  });

  Object.defineProperty(basket.prototype, "borderColor", {
    set: function (val) {
      this.$basket.css('border-color', val);
    },
    enumerable: true,
    configurable: true
  });

  Object.defineProperty(basket.prototype, "data", {
    get: function () {
      return new basketdata(this._units.pixel.top, this._units.pixel.left, this._units.pixel.height, this._units.pixel.width, true, this.text, this.image, this.id, this.color);
    },
    enumerable: true,
    configurable: true
  });

  basket.prototype.bubbleMouseUpToUnderlyingElement = function (e) {
    if (e.clientX != undefined && e.clientY != undefined) {
      this.$basket.hide();
      $(document.elementFromPoint(e.clientX, e.clientY)).trigger("mouseup");
      this.$basket.show();
    }
    wizard.changesDone();
  };
  basket.prototype.InitId = function (data) {
    var id = data.id;
    if (!id) {
      var index = $('.basket').length;
      while (!id) {
        if ($('#basket-' + index).length == 0)
          id = 'basket-' + index;
        index = index + 1;
      }
    }
    this.$basket.attr('id', id);
  };

  basket.prototype.initChangesListener = function () {
    if (typeof MutationObserver == 'undefined')
      return;

    var self = this;

    var observer, callback;
    callback = function (recordqueue) {
      //setTimeout(function () { if (self._onChanged) self._onChanged(self); }, 1);
      setTimeout(function () {
        self.$basket.trigger('change', self);
      }, 1);
    };
    observer = new MutationObserver(callback);

    var options = {
      'childList': true,
      'attributes': true
    };

    observer.observe(this.$basket[0], options);
  };

  basket.prototype.change = function () {
    this.$basket.trigger('change', this);
  };

  basket.prototype.getOptionBasketsIds = function (link) {
    var ids = [];

    for (var i = 0; link && i < link.baskets.length; i++) {
      ids.push(link.baskets[i].id);
    }
    if (ids.length == 0)
      ids.push(this.id);

    //var group = Groups.getGroupByBasketId(this.id);
    var groups = Groups.getGroupsByBasketIds(ids);

    for (var j = 0; groups && j < groups.length; j++) {
      var group = groups[j];
      for (var i = 0; i < group.baskets.length; i++) {
        var candidateBasketId = group.baskets[i];
        if (ids.indexOf(candidateBasketId) == -1)
          ids.push(candidateBasketId);
      }
    }

    return ids;
  };

  basket.prototype.activate = function () {
    if (this.$basket.hasClass('active'))
      return;

    this.$basket.addClass('active');
    this.$basket.trigger('active', this);
  };

  basket.prototype.toJson = function () {
    return {
      id: this.id,
      width: this.units.percentage.width,
      height: this.units.percentage.height,
      top: this.units.percentage.top,
      left: this.units.percentage.left,
      backgroundColor: wizard.basketBackgroundColor,
      borderColor: wizard.basketBorderColor,
      color: this.color,
      opacity: wizard.basketOpacity,//(wizard.basketOpacity == 0.1) ? 0 : wizard.basketOpacity,//
      text: this.text,
      image: this.image,
      hiddenOnRuntime: this.hiddenOnRuntime
    };
  };

  basket.prototype.toOptionJson = function () {
    var link = Links.getLinkByBasket(this);
    var basketIds = this.getOptionBasketsIds(link);
    var optionId = link ? link.generateOptionId() : this.generateOptionId();

    return {
      text: this.text,
      color: this.color,
      id: optionId,
      sound: "",
      image: this.image,
      baskets: basketIds,
      isLinked: link ? true : false
    };
  };

  basket.prototype.generateOptionId = function () {
    return this.id.replace('basket', 'option');
  };

  basket.prototype.deactivate = function () {
    this.$basket.removeClass('active');
  };

  basket.prototype.isActive = function () {
    return this.$basket.hasClass('active');
  };

  basket.prototype.delete = function () {
    this.$basket.remove();
  };

  basket.prototype.clone = function () {
    var data = this.data;
    data.top = data.top + 5;
    data.left = data.left + 5;
    data.id = null;
    var newBasket = Baskets.createNewBasket(null, null, data);
    Baskets.deactivateAllBasketsExceptMe(newBasket);
    newBasket.activate();
    Properties.setActiveComponent(newBasket);
    return newBasket;
  };

  basket.prototype.cloneAsLinked = function () {
    var data = this.data;
    data.top = data.top + 5;
    data.left = data.left + 5;
    data.id = null;
    var newBasket = Baskets.createNewBasket(null, null, data);
    Links.addBasket(newBasket);

    Baskets.deactivateAllBasketsExceptMe(newBasket);

    newBasket.activate();
    Properties.setActiveComponent(newBasket);
    return newBasket;
  };

  basket.prototype.on = function (event, callback) {
    this.$basket.on(event, callback);
  };

  basket.prototype.off = function (event, callback) {
    if (typeof event === "undefined") { event = null; }
    if (typeof callback === "undefined") { callback = null; }
    this.$basket.off(event, callback);
  };

  basket.prototype.hideLinkedIcon = function () {
    this.$linkedIcon.hide();
  };

  basket.prototype.showLinkedIcon = function () {
    this.$linkedIcon.show();
  };

  basket.prototype.isLinked = function () {
    return Links.getLinkByBasket(this) != null;

  };

  return basket;
})();
