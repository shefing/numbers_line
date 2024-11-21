///<reference path='basket.ts'/>
var basketsLink = (function () {
    function basketsLink(basket) {
        this._baskets = [basket];
        this._isActive = false;
    }
    Object.defineProperty(basketsLink.prototype, "baskets", {
        get: function () {
            return this._baskets;
        },
        enumerable: true,
        configurable: true
    });

    basketsLink.prototype.addBasket = function (basket) {
        this._baskets.push(basket);
    };

    basketsLink.prototype.contains = function (basket) {
        for (var i = 0; i < this._baskets.length; i++) {
            if (basket.id == this._baskets[i].id)
                return true;
        }
        return false;
    };

    basketsLink.prototype.generateOptionId = function () {
        var result = '';
        for (var i = 0; i < this._baskets.length; i++) {
            result += '|' + this._baskets[i].generateOptionId();
        }
        return result;
    };
    basketsLink.prototype.isActive = function () {
        return this._isActive;
    };

    basketsLink.prototype.deactivate = function () {
        this._isActive = false;
        for (var i = 0; i < this._baskets.length; i++) {
            this._baskets[i].hideLinkedIcon();
        }
    };

    basketsLink.prototype.activate = function () {
        this._isActive = true;
        for (var i = 0; i < this._baskets.length; i++) {
            this._baskets[i].showLinkedIcon();
        }
    };

    basketsLink.prototype.syncBaskets = function (dominator) {
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
    return basketsLink;
})();
