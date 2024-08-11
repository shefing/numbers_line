///<reference path='../../../../lib/modules/units.ts' />
///<reference path='groupdata.ts' />
var group = (function () {
    function group(data) {
        var self = this;

        self.$group = $('<div class="group" ><div class="test"></div><div class="linked-icon"></div><div class="n-handle"></div><div class="e-handle"></div><div class="s-handle"></div><div class="w-handle"></div><div class="se-handle"></div></div>');
        self.InitId(data);
        self.baskets = data.baskets;
        
        self.$group.append('<div class="background"></div>');

        if (data.realTimeCreation)
            this.$group.addClass('active');

        self.$group.css({
            top: data.top,
            left: data.left,
            height: data.height + 'px',
            width: data.width + 'px',
            'border-color': wizard.groupBorderColor,
            'opacity': wizard.groupOpacity
        });

        self.$group.appendTo($('.stage'));
        self.$backColor = self.$group.find('.background');
        self.$backColor.css('background-color', wizard.groupBackgroundColor);
        self.image = data.image;

        self.draggie = new draggable(self.$group, '.stage');
        UI.setAsResizable(self.$group, '.stage', false);
        self.$group.on('resizeend', function () {
          self.draggie.setScaledDimentions();
        })
        self.$group.on('mousedown', function (e) {
            if (!$(this).hasClass('active')) {
                $(this).addClass('active');
                $.proxy(self.activate, self)();
            }
            e.stopPropagation();
            return false;
        });
        self.$group.on('mouseup', wizard.changesDone);
        
        self._units = new cet.Units.units(self.$group);
    }
    Object.defineProperty(group.prototype, "id", {
        get: function () {
            return this.$group.attr('id');
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(group.prototype, "units", {
        get: function () {
            return this._units;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(group.prototype, "image", {
        get: function () {
            return this.$backColor.css('background-image').replace(/url\(/g, '').replace(')', '').replace(/\"/g, '');
        },
        set: function (val) {
            if (val && val.indexOf('none') == -1)
                this.$backColor.css('background-image', 'url(' + val + ')');
            else
                this.$backColor.css('background-image', 'none');

            this.change();
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(group.prototype, "opacity", {
        get: function () {
            return this.$group.css('opacity');
        },
        set: function (val) {
            this.$group.css('opacity', val);
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(group.prototype, "backgroundColor", {
        set: function (val) {
            this.$backColor.css('background-color', val);
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(group.prototype, "borderColor", {
        set: function (val) {
            this.$group.css('border-color', val);
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(group.prototype, "data", {
        get: function () {
            //constructor(top: number, left: number, height: number = 94, width: number = 118, realTimeCreation: boolean = true, text: string = '', image: string = '', id: string = null, options: string[]= null, color: string = null) {
            return new groupdata(this._units.pixel.top, this._units.pixel.left, this._units.pixel.height, this._units.pixel.width, true, this.text, this.image, this.id, this.options, this.color);
        },
        enumerable: true,
        configurable: true
    });

    group.prototype.InitId = function (data) {
        var id = data.id;
        if (!id) {
            var index = $('.group').length;
            while (!id) {
                if ($('#group-' + index).length == 0)
                    id = 'group-' + index;
                index = index + 1;
            }
        }
        this.$group.attr('id', id);
    };

    group.prototype.initChangesListener = function () {
        if (typeof MutationObserver == 'undefined')
            return;

        var self = this;

        var observer, callback;
        callback = function (recordqueue) {
            //setTimeout(function () { if (self._onChanged) self._onChanged(self); }, 1);
            setTimeout(function () {
                self.$group.trigger('change', self);
            }, 1);
        };
        observer = new MutationObserver(callback);

        var options = {
            'childList': true,
            'attributes': true
        };

        observer.observe(this.$group[0], options);
    };

    group.prototype.change = function () {
        this.$group.trigger('change', this);
    };

    group.prototype.activate = function () {
        if (!this.$group.hasClass('active'))
            this.$group.addClass('active');
        this.$group.trigger('active', this);
    };

    group.prototype.resolveBaskets = function () {
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

    group.prototype.deactivate = function () {
        this.$group.removeClass('active');
    };

    group.prototype.isActive = function () {
        return this.$group.hasClass('active');
    };

    group.prototype.delete = function () {
        this.$group.remove();
    };

    group.prototype.clone = function () {
        var data = this.data;
        data.top = data.top + 5;
        data.left = data.left + 5;
        data.id = null;
        var newGroup = Groups.createNewGroup(null, null, data);
        Groups.deactivateAllGroupsExceptMe(newGroup);
        newGroup.activate();
        Properties.setActiveComponent(newGroup);
        return newGroup;
    };

    group.prototype.on = function (event, callback) {
        this.$group.on(event, callback);
    };

    group.prototype.off = function (event, callback) {
        this.$group.off(event, callback);
    };

    group.prototype.containsBasket = function (basketId) {
        if (!this.baskets)
            return;

        for (var i = 0; i < this.baskets.length; i++) {
            if (this.baskets[i] == basketId)
                return true;
        }
        return false;
    };

    group.prototype.toJson = function () {
        return {
            id: this.id,
            width: Math.round(this.units.percentage.width),
            height: Math.round(this.units.percentage.height),
            top: Math.round(this.units.percentage.top),
            left: Math.round(this.units.percentage.left),
            backgroundColor: wizard.groupBackgroundColor,
            borderColor: wizard.groupBorderColor,
            opacity: wizard.groupOpacity,
            baskets: this.resolveBaskets()
        };
    };

    group.prototype.hasBaskets = function () {
     
      return this.baskets && this.baskets.length > 0;
    };

    group.prototype.hasHiddenBasket = function () {

      if (!this.baskets || this.baskets.length == 0)
        return false;
      for (var i = 0; i < this.baskets.length; i++) {
        var basket = Baskets.getBasketById(this.baskets[i]);
        if (basket.hiddenOnRuntime)
          return true;
      }
      return false;
    };

    return group;
})();
