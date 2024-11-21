///<reference path='basket.ts'/>
var link = (function () {
    function link(basket) {
        if (typeof basket === "undefined") { basket = null; }
        this._self = this;

        this._baskets = [];
        if (basket)
            this.addBasket(basket);
        this._isActive = false;
    }
    Object.defineProperty(link.prototype, "baskets", {
        get: function () {
            return this._baskets;
        },
        enumerable: true,
        configurable: true
    });

    link.prototype.addBasket = function (basket) {
        var self = this;
        basket.on('change', $.proxy(self.basketChangedHandler, self));
        basket.on('active', $.proxy(self.basketActivatedHandler, self));
        this._baskets.push(basket);
    };

    link.prototype.removeBasket = function (basket) {
        var self = this;
        basket.off('change');
        basket.off('active');
        for (var i = 0; i < self._baskets.length; i++) {
            if (self._baskets[i].id == basket.id) {
                self._baskets.splice(i, 1);
                break;
            }
        }
    };

    link.prototype.contains = function (basket) {
        for (var i = 0; i < this._baskets.length; i++) {
            if (basket.id == this._baskets[i].id)
                return true;
        }
        return false;
    };

    link.prototype.generateOptionId = function () {
        var result = '';
        for (var i = 0; i < this._baskets.length; i++) {
            result += '|' + this._baskets[i].generateOptionId();
        }
        return result;
    };

    link.prototype.isActive = function () {
        return this._isActive;
    };

    link.prototype.deactivate = function () {
        this._isActive = false;
        for (var i = 0; i < this._baskets.length; i++) {
            this._baskets[i].hideLinkedIcon();
        }
    };

    link.prototype.remove = function () {
        this._isActive = false;
        for (var i = 0; i < this._baskets.length; i++) {
            this._baskets[i].off('change', $.proxy(this.basketChangedHandler, this));
            this._baskets[i].off('active', $.proxy(this.basketActivatedHandler, this));
            this._baskets[i].hideLinkedIcon();
        }
    };

    link.prototype.activate = function () {
        this._isActive = true;
        for (var i = 0; i < this._baskets.length; i++) {
            this._baskets[i].showLinkedIcon();
        }
    };

    link.prototype.syncBaskets = function (dominator) {
        for (var i = 0; i < this._baskets.length; i++) {
            if (this._baskets[i].id == dominator.id)
                continue;
            if (this._baskets[i].image != dominator.image)
                this._baskets[i].image = dominator.image;
            if (this._baskets[i].text != dominator.text)
                this._baskets[i].text = dominator.text;
            if (this._baskets[i].color != dominator.color)
                this._baskets[i].color = dominator.color;
        }
    };

    link.prototype.toJson = function () {
        var result = {
            optionId: this.generateOptionId(),
            baskets: []
        };
        for (var i = 0; i < this._baskets.length; i++) {
            result.baskets.push(this._baskets[i].id);
        }
        return result;
    };

    link.prototype.fromJson = function (json) {
        if (!json)
            return;
        for (var i = 0; i < json.length; i++) {
            var newBasket = Baskets.getBasketById(json[i]);
            if (!newBasket)
                continue;
            this.addBasket(newBasket);
        }
    };

    link.prototype.hasMultipleBaskets = function () {
        return this._baskets.length > 1;
    };

    link.prototype.basketChangedHandler = function (e, changedBasket) {
        this._self.syncBaskets(changedBasket);
    };

    link.prototype.basketActivatedHandler = function (e, activatedBasket) {
        var activeLink = Links.getActiveLink();
        if (activeLink && activeLink == this._self)
            return;

        if (activeLink)
            activeLink.deactivate();

        this._self.activate();
    };
    return link;
})();
