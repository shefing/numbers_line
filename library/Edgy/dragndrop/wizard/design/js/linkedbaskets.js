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
            activeBasket.on('change', basketChangedHandler);
            activeBasket.on('active', basketActivatedHandler);
        }

        activeLink.addBasket(newBasket);
        activeLink.activate();
        newBasket.on('change', basketChangedHandler);

        newBasket.on('active', basketActivatedHandler);
    }
    Links.addBasket = addBasket;

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

    //export function refresh() {
    // if (!activeLink) {
    //  return;
    // }
    // var found = false;
    // for (var i = 0; i < activeLink.length; i++) {
    //  if (activeLink[0].isActive())
    //   found = true;
    // }
    // if (!found) {
    //  deactivateactiveLink();
    // }
    //}
    function deactivatAll() {
        //if (!activeLink)
        //{
        // setTimeout(Links.deactivateactiveLink, 10);
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

    //export function deactiveAllLinks() {
    // for (var key in links) {
    //  deactivateLink(links[key]);
    // }
    //}
    //export function getBasketsByOptionId(optionId) {
    // return links[optionId];
    //}
    //function deactivateLink(link) {
    // if (!link)
    //  return;
    // for (var i = 0; i < link.length; i++) {
    //  link[i].hideLinkedIcon();
    // }
    //}
    //function activateLink(link) {
    // if (link.length < 2)
    //  return;
    // for (var i = 0; i < link.length; i++) {
    //  link[i].activate();
    // }
    //}
    function basketChangedHandler(e, changedBasket) {
        var active = getActiveLink();
        if (!active)
            return;
        active.syncBaskets(changedBasket);
    }

    function basketActivatedHandler(e, activatedBasket) {
        var activeLink = getActiveLink();
        if (activeLink) {
            if (activeLink.contains(activatedBasket))
                return;
            activeLink.deactivate();
        }

        activeLink = Links.getLinkByBasket(activatedBasket);
        if (activeLink)
            activeLink.activate();
    }
})(Links || (Links = {}));
