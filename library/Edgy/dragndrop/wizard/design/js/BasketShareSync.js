///<reference path='basket.ts'/>
var BasketShareSync;
(function (BasketShareSync) {
    var shareGroups = {};
    var activeGroup;
    function basketInGroup(group, basket) {
        for (var i = 0; i < group.length; i++) {
            if (group[i].id == basket.id)
                return true;
        }
        return false;
    }
    function addBasket(newBasket) {
        var self = this;
        if (!activeGroup) {
            activeGroup = shareGroups[newBasket.data.options[0]];
            if (!activeGroup) {
                activeGroup = [];
                shareGroups[newBasket.data.options[0]] = activeGroup;
            }
        }
        if (basketInGroup(activeGroup, newBasket)) {
            return;
        }
        activeGroup.push(newBasket);
        newBasket.onChanged = function (changedBasket) {
            if (!activeGroup)
                return;
            if (!basketInGroup(activeGroup, changedBasket))
                return;
            for (var i = 0; i < activeGroup.length; i++) {
                if (activeGroup[i].id == changedBasket.id)
                    continue;
                if (activeGroup[i].image != changedBasket.image)
                    activeGroup[i].image = changedBasket.image;
                if (activeGroup[i].text != changedBasket.text)
                    activeGroup[i].text = changedBasket.text;
                if (activeGroup[i].color != changedBasket.color)
                    activeGroup[i].color = changedBasket.color;
            }
        };

        newBasket.onActivate = function (activatedBasket) {
            if (!activatedBasket.isActive())
                return;
            if (activeGroup != shareGroups[activatedBasket.data.options[0]]) {
                deactivateGroup(activeGroup);
                activeGroup = shareGroups[activatedBasket.data.options[0]];
            }

            activateGroup(activeGroup);
        };
    }
    BasketShareSync.addBasket = addBasket;
    function refresh() {
        if (!activeGroup)
            return;
        var found = false;
        for (var i = 0; i < activeGroup.length; i++) {
            if (activeGroup[0].isActive())
                found = true;
        }
        if (!found) {
            deactivateActiveGroup();
        }
    }
    BasketShareSync.refresh = refresh;
    function deactivateActiveGroup() {
        //if (!activeGroup)
        //{
        // setTimeout(BasketShareSync.deactivateActiveGroup, 10);
        // return;
        //}
        deactivateGroup(activeGroup);
        activeGroup = null;
    }
    BasketShareSync.deactivateActiveGroup = deactivateActiveGroup;

    function getShareGroups() {
        return shareGroups;
    }
    BasketShareSync.getShareGroups = getShareGroups;

    function getActiveGroup() {
        return activeGroup;
    }
    BasketShareSync.getActiveGroup = getActiveGroup;

    function deactivateGroup(group) {
        if (!group)
            return;
        for (var i = 0; i < group.length; i++) {
            group[i].hideShareIcon();
        }
    }

    function activateGroup(group) {
        for (var i = 0; i < group.length; i++) {
            group[i].showShareIcon();
        }
    }
})(BasketShareSync || (BasketShareSync = {}));
