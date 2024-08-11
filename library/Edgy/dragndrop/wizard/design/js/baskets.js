
var Baskets;
(function (Baskets) {
    var baskets = [];

    function deactivateAllBasketsExceptMe(me) {
        for (var i = 0; i < baskets.length; i++) {
            if (baskets[i].id == me.id)
                continue;
            baskets[i].deactivate();
        }
    }
    Baskets.deactivateAllBasketsExceptMe = deactivateAllBasketsExceptMe;

    function getActiveBasket() {
        for (var i = 0; i < baskets.length; i++) {
            if (baskets[i].isActive())
                return baskets[i];
        }
    }
    Baskets.getActiveBasket = getActiveBasket;

    function removeActiveBasket() {
        for (var i = 0; i < baskets.length; i++) {
            if (baskets[i].isActive()) {
                Links.removeBasket(baskets[i]);
                baskets[i].delete();
                baskets.splice(i, 1);
                return;
            }
        }
    }
    Baskets.removeActiveBasket = removeActiveBasket;

    function getBasketById(id) {
        for (var i = 0; i < baskets.length; i++) {
            if (baskets[i].id == id)
                return baskets[i];
        }
    }
    Baskets.getBasketById = getBasketById;

    function cloneActiveBasket() {
        var activeBasket = Baskets.getActiveBasket();
        if (!activeBasket)
            return;
        var data = activeBasket.data;
        data.top = data.top + 5;
        data.left = data.left + 5;
        var newBasket = Baskets.createNewBasket(null, null, data);
        deactivateAllBasketsExceptMe(newBasket);
    }
    Baskets.cloneActiveBasket = cloneActiveBasket;

    function createNewBasketFromJson(basketJson) {
      var data = new basketdata(basketJson.top, basketJson.left, basketJson.height, basketJson.width, false, basketJson.text, basketJson.image, basketJson.id, basketJson.color, basketJson.hiddenOnRuntime);
        data.toPixels();

        supprtOldJsonSchema(data, basketJson);

        return createNewBasket(undefined, undefined, data);
    }
    Baskets.createNewBasketFromJson = createNewBasketFromJson;

    function supprtOldJsonSchema(data, basketJson) {
        if (!data.text && !data.image) {
            var option = preset.getBasketOptionById(basketJson.id);
            data.text = option.text;
            data.image = option.image;
        }
    }

    function createNewBasket(top, left, basketData) {
        if (typeof basketData === "undefined") { basketData = new basketdata(top, left); }
        Stage.fixComponentOverflow(basketData);
        basketData.color = Properties.color;

        var newBasket = new basket(basketData);

        baskets.push(newBasket);

        return newBasket;
    }
    Baskets.createNewBasket = createNewBasket;

    function getBaskets() {
        return baskets;
    }
    Baskets.getBaskets = getBaskets;
})(Baskets || (Baskets = {}));
