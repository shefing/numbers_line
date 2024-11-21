
(function (cet) {
  (function (GroupsLinks) {
    var groupsLinks = [];
    function init() {
        var groups = cet.dragndrop.Content.getGroups();
        for (var i = 0; i < groups.length; i++) {
            groupsLinks.push(new groupLinks(groups[i]));
        }
    }
    GroupsLinks.init = init;

    function validate() {
        var isValid = true;
        for (var i = 0; i < groupsLinks.length; i++) {
            if (!groupsLinks[i].validate())
                isValid = false;
        }
        return isValid;
    }
    GroupsLinks.validate = validate;

  })(cet.dragndrop.GroupsLinks || (cet.dragndrop.GroupsLinks = {}));
  var GroupsLinks = cet.dragndrop.GroupsLinks;
})(cet || (cet = {}));




var groupLinks = (function () {
    function groupLinks(newgroup) {
        this.links = [];
        this.groupBaskets = [];
        this.optionLinkedBaskets = {};
        var self = this;
        self.groupBaskets = cet.dragndrop.Groups.getGroupBaskets(newgroup.id);
        self.groupOptions = self.getGroupOptions();
        self.optionLinkedBaskets = self.getOptionsLinkedBaskets();
    }
    groupLinks.prototype.basketIsLinkedToOption = function (option, basketId) {
        var self = this;
        var allLinks = cet.dragndrop.Content.getLinks();
        for (var i = 0; i < allLinks.length; i++) {
            if (allLinks[i].optionId == option.id) {
                for (var j = 0; j < allLinks[i].baskets.length; j++) {
                    if (allLinks[i].baskets[j] == basketId)
                        return true;
                }
            }
        }
        return false;
    };
    groupLinks.prototype.basketBelongToGroup = function (basketId) {
        var self = this;
        for (var i = 0; i < self.groupBaskets.length; i++) {
            if (self.groupBaskets[i].getId() == basketId)
                return true;
        }
        return false;
    };

    groupLinks.prototype.getOptionNumberOfBaskets = function (option) {
        var self = this;
        var count = 0;
        for (var i = 0; i < option.baskets.length; i++) {
            if (self.basketIsLinkedToOption(option, option.baskets[i]) && self.basketBelongToGroup(option.baskets[i]))
                count++;
        }
        return count;
    };

    groupLinks.prototype.getGroupOptions = function () {
        var self = this;
        var allOptions = cet.dragndrop.Content.getOptions();
        var groupOptions = [];

        for (var i = 0; i < allOptions.length; i++) {
            for (var j = 0; j < allOptions[i].baskets.length; j++) {
                if (self.basketBelongToGroup(allOptions[i].baskets[j])) {
                    groupOptions.push(allOptions[i]);
                    j = allOptions[i].baskets.length;
                }
            }
        }

        return groupOptions;
    };

    groupLinks.prototype.getOptionsLinkedBaskets = function () {
        var self = this;
        var optionLinkedBaskets = {};
        for (var i = 0; i < self.groupOptions.length; i++) {
            var option = self.groupOptions[i];
            optionLinkedBaskets[option.id] = option.isLinked ? self.getOptionNumberOfBaskets(option) : 1;
        }

        return optionLinkedBaskets;
    };

    groupLinks.prototype.getOptionsDistribution = function () {
        var self = this;
        var optionsDistribution = {};
        for (var i = 0; i < self.groupBaskets.length; i++) {
            var currBasket = self.groupBaskets[i];
            if (!currBasket.isPopulated())
                continue;
            var optionId = currBasket.getOption().getId();
            if (!optionsDistribution[optionId])
                optionsDistribution[optionId] = [];
            optionsDistribution[optionId].push(currBasket.getId());
        }

        return optionsDistribution;
    };

    groupLinks.prototype.validate = function () {
        var self = this;
        var isValid = true;
        var optionsDistribution = self.getOptionsDistribution();

        for (var optionId in optionsDistribution) {
            var optionPopulatedBaskets = optionsDistribution[optionId];
            var numberOfInvalidBaskets = optionPopulatedBaskets.length - self.optionLinkedBaskets[optionId];

            for (var j = optionPopulatedBaskets.length - numberOfInvalidBaskets; j < optionPopulatedBaskets.length; j++) {
                cet.dragndrop.Baskets.getBasketById(optionPopulatedBaskets[j]).isValid(false);
                isValid = false;
            }
        }

        return isValid;
    };
    return groupLinks;
})();
