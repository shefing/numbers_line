///<reference path='../../../../lib/modules/units.ts' />
///<reference path='mediadata.ts' />
var media = (function () {
  function media(data) {
    var self = this;

    self.$media = $('<div class="media" ><div class="test"></div><div class="linked-icon"></div><div class="n-handle"></div><div class="e-handle"></div><div class="s-handle"></div><div class="w-handle"></div><div class="se-handle"></div></div>');
    self.InitId(data);
    self.baskets = data.baskets;

    self.$media.append('<div class="background"></div>');

    if (data.realTimeCreation)
      self.$media.addClass('active');

    self.$media.append('<div class="text-parent" ><span class="text" ></span></div>');
    self.$text = self.$media.find('.text');
    self.text = data.text;
    self.$media.css({
      top: data.top,
      left: data.left,
      height: data.height + 'px',
      width: data.width + 'px',
      'border-color': wizard.mediaBorderColor,
      'opacity': wizard.mediaOpacity
    });

    self.$media.appendTo($('.stage'));
    self.$backColor = self.$media.find('.background');
    self.$backColor.css('background-color', wizard.mediaBackgroundColor);
    self.image = data.image;
    self.color = data.color;

    self.draggie = new draggable(self.$media, '.stage');
    UI.setAsResizable(self.$media, '.stage', false);
    self.$media.on('resizeend', function () {
      self.draggie.setScaledDimentions();
    })

    self.$media.on('mousedown', function (e) {
      if (!$(this).hasClass('active')) {
        $(this).addClass('active');
        $.proxy(self.activate, self)();
      }
      e.stopPropagation();
      return false;
    });
    self.$media.on('mouseup', wizard.changesDone);
    self._units = new cet.Units.units(self.$media);
  }
  Object.defineProperty(media.prototype, "id", {
    get: function () {
      return this.$media.attr('id');
    },
    enumerable: true,
    configurable: true
  });

  Object.defineProperty(media.prototype, "units", {
    get: function () {
      return this._units;
    },
    enumerable: true,
    configurable: true
  });

  Object.defineProperty(media.prototype, "image", {
    get: function () {
      //var url = this.$backColor.css('background-image'); //.replace(/url\(/g, '').replace(')', '').replace(/\"/g, '');
      var url = this.$backColor.css('background-image').replace(/url\(/g, '').slice(0, -1);
      return url == 'none' ? null : url;
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

  Object.defineProperty(media.prototype, "opacity", {
    get: function () {
      return this.$media.css('opacity');
    },
    set: function (val) {
      this.$media.css('opacity', val);
    },
    enumerable: true,
    configurable: true
  });

  Object.defineProperty(media.prototype, "backgroundColor", {
    set: function (val) {
      this.$backColor.css('background-color', val);
    },
    enumerable: true,
    configurable: true
  });

  Object.defineProperty(media.prototype, "borderColor", {
    set: function (val) {
      this.$media.css('border-color', val);
    },
    enumerable: true,
    configurable: true
  });

  Object.defineProperty(media.prototype, "data", {
    get: function () {
      //constructor(top: number, left: number, height: number = 94, width: number = 118, realTimeCreation: boolean = true, text: string = '', image: string = '', id: string = null, options: string[]= null, color: string = null) {
      return new mediadata(this._units.pixel.top, this._units.pixel.left, this._units.pixel.height, this._units.pixel.width, true, this.text, this.image, this.id, this.color);
    },
    enumerable: true,
    configurable: true
  });

  Object.defineProperty(media.prototype, "text", {
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

  Object.defineProperty(media.prototype, "color", {
    get: function () {
      return cet.Utils.rgb2hex(this.$text.css('color'));
    },
    set: function (val) {
      this.$text.css('color', val);
      this.change();
    },
    enumerable: true,
    configurable: true
  });

  media.prototype.InitId = function (data) {
    var id = data.id;
    if (!id) {
      var index = $('.media').length;
      while (!id) {
        if ($('#media-' + index).length == 0)
          id = 'media-' + index;
        index = index + 1;
      }
    }
    this.$media.attr('id', id);
  };

  media.prototype.initChangesListener = function () {
    if (typeof MutationObserver == 'undefined')
      return;

    var self = this;

    var observer, callback;
    callback = function (recordqueue) {
      //setTimeout(function () { if (self._onChanged) self._onChanged(self); }, 1);
      setTimeout(function () {
        self.$media.trigger('change', self);
      }, 1);
    };
    observer = new MutationObserver(callback);

    var options = {
      'childList': true,
      'attributes': true
    };

    observer.observe(this.$media[0], options);
  };

  media.prototype.change = function () {
    this.$media.trigger('change', this);
  };

  media.prototype.activate = function () {
    if (!this.$media.hasClass('active'))
      this.$media.addClass('active');
    this.$media.trigger('active', this);
  };

  media.prototype.resolveBaskets = function () {
    var self = this;

    self.baskets = [];
    var allBaskets = Baskets.getBaskets();

    for (var i = 0; i < allBaskets.length; i++) {
      var basket = allBaskets[i];
      if (basket.units.pixel.left < self.units.pixel.left)
        continue;
      if (basket.units.pixel.left > self.units.pixel.right)
        continue;
      if (basket.units.pixel.top < self.units.pixel.top)
        continue;
      if (basket.units.pixel.top > self.units.pixel.bottom)
        continue;

      self.baskets.push(basket.id);
    }
    return self.baskets;
  };

  media.prototype.deactivate = function () {
    this.$media.removeClass('active');
  };

  media.prototype.isActive = function () {
    return this.$media.hasClass('active');
  };

  media.prototype.delete = function () {
    this.$media.remove();
  };

  media.prototype.clone = function () {
    var data = this.data;
    data.top = data.top + 5;
    data.left = data.left + 5;
    data.id = null;
    var newMedia = Medias.createNewMedia(null, null, data);
    Medias.deactivateAllMediasExceptMe(newMedia);
    newMedia.activate();
    Properties.setActiveComponent(newMedia);
    return newMedia;
  };

  media.prototype.on = function (event, callback) {
    this.$media.on(event, callback);
  };

  media.prototype.off = function (event, callback) {
    this.$media.off(event, callback);
  };

  media.prototype.containsBasket = function (basketId) {
    if (!this.baskets)
      return;

    for (var i = 0; i < this.baskets.length; i++) {
      if (this.baskets[i] == basketId)
        return true;
    }
    return false;
  };

  media.prototype.toJson = function () {
    return {
      id: this.id,
      width: Math.round(this.units.percentage.width),
      height: Math.round(this.units.percentage.height),
      top: Math.round(this.units.percentage.top),
      left: Math.round(this.units.percentage.left),
      backgroundColor: wizard.mediaBackgroundColor,
      borderColor: wizard.mediaBorderColor,
      opacity: wizard.mediaOpacity,
      text: this.text,
      image: this.image,
      color: this.color
    };
  };
  return media;
})();
