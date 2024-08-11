///<reference path='basket.ts'/>
var Links;
(function (Links) {
    var links = [];

    function addBasket(newBasket) {
        var self = this;
        var activeBasket = Baskets.getActiveBasket();
        var activeLink = Links.getLinkByBasket(activeBasket);
        if (!activeLink) {
            activeLink = new link(activeBasket);
            links.push(activeLink);
        }

        activeLink.addBasket(newBasket);
        activeLink.activate();
    }
    Links.addBasket = addBasket;

    function removeBasket(removeBasket) {
        var relatedLink = Links.getLinkByBasket(removeBasket);
        if (!relatedLink)
            return;
        relatedLink.removeBasket(removeBasket);
        if (!relatedLink.hasMultipleBaskets()) {
            links.splice(links.indexOf(relatedLink), 1);
            relatedLink.remove();
        }
    }
    Links.removeBasket = removeBasket;

    function generateNewLinkId() {
        return 'option-' + links.length;
    }

    function getLinkByBasket(basket) {
        for (var i = 0; i < links.length; i++) {
            if (links[i].contains(basket))
                return links[i];
        }
    }
    Links.getLinkByBasket = getLinkByBasket;

    function getActiveLink() {
        for (var i = 0; i < links.length; i++) {
            if (links[i].isActive())
                return links[i];
        }
        return null;
    }
    Links.getActiveLink = getActiveLink;

    function deactivatAll() {
        //if (!activeLink)
        //{
        // setTimeout(Link.deactivateactiveLink, 10);
        // return;
        //}
        var active = getActiveLink();
        if (active)
            active.deactivate();
    }
    Links.deactivatAll = deactivatAll;

    function getAll() {
        return links;
    }
    Links.getAll = getAll;

    function reload() {
        var activeBasket = Baskets.getActiveBasket();
        var activeBasketLink = Links.getLinkByBasket(activeBasket);
        if (!activeBasketLink) {
            Links.deactivatAll();
            return;
        }
        if (!activeBasketLink.isActive())
            activeBasketLink.activate();
    }
    Links.reload = reload;

    function toJson() {
        var result = [];
        for (var i = 0; i < links.length; i++) {
            result.push(links[i].toJson());
        }
        return result;
    }
    Links.toJson = toJson;

    function fromJson(json) {
        if (!json)
            return;
        for (var i = 0; i < json.length; i++) {
            var newLink = new link();
            newLink.fromJson(json[i].baskets);
            links.push(newLink);
        }
    }
    Links.fromJson = fromJson;

    function isEmpty() {
        return links.length == 0;
    }
    Links.isEmpty = isEmpty;

    function deactivatAllLinksExceptMe(me) {
        var active = getActiveLink();
        if (active && active != me)
            active.deactivate();
    }
    Links.deactivatAllLinksExceptMe = deactivatAllLinksExceptMe;
})(Links || (Links = {}));
