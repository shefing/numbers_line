
(function (cet) {
  (function (Groups) {
    var groups;

    function init() {
        groups = {};
        var $groups = $('.group');

        $.each($groups, function (index, elem) {
            var newGroupData = cet.dragndrop.Content.getGroupByIndex(index);
            var newGroup = new cet.dragndrop.group(elem, newGroupData);
            groups[newGroup.id()] = newGroup;
        });
    }
    Groups.init = init;

    function updateAndGetHoveredGroup(pointer) {
        var hovered = [];
        for (var key in groups) {
            var group = groups[key];
            if (group.isPointContained(pointer)) {
                hovered.push(group);
            }
            group.hideHover();
        }

        var winner = null;

        for (var i = 0; i < hovered.length; i++) {
            if (winner == null) {
                winner = hovered[i];
                continue;
            }

            if (hovered[i].getContainmentSize(pointer) >= winner.getContainmentSize(pointer))
                winner.hideHover();
            winner = hovered[i];
        }
        if (winner)
            winner.showHover();

        return winner;
    }
    Groups.updateAndGetHoveredGroup = updateAndGetHoveredGroup;

    function all() {
      return groups;
    }
    Groups.all = all;

    function getGroups() {
        return groups;
    }
    Groups.getGroups = getGroups;

    function getGroupBaskets(groupId) {
        return groups[groupId].getBaskets();
    }
    Groups.getGroupBaskets = getGroupBaskets;

    function validateBaskets() {
        var optionsUsage = {};
        var usedBaskets = cet.dragndrop.Baskets.getPopulation();
        for (var usedBasketId in usedBaskets) {
            if (!optionsUsage[usedBaskets[usedBasketId]])
                optionsUsage[usedBaskets[usedBasketId]] = [];
            optionsUsage[usedBaskets[usedBasketId]].push(usedBasketId);
        }

        for (var optionId in optionsUsage) {
            var numberOfInvalidBaskets = optionsUsage[optionId].length - Links.getNumberOfLinksByOptionId(optionId);
            for (var j = 1; j < numberOfInvalidBaskets; j++) {
                cet.dragndrop.Baskets.getBasketById(optionsUsage[optionId][j]).showError();
            }
        }
    }
    Groups.validateBaskets = validateBaskets;

    function updateDropBoxes() {
        for (var key in groups) {
            groups[key].updateDropBox();
        }
    }
    Groups.updateDropBoxes = updateDropBoxes;

    function rearrangeBaskets() {
        for (var groupId in groups) {
            groups[groupId].rearrangeBaskets();
        }
    }
    Groups.rearrangeBaskets = rearrangeBaskets;

    function showFeedback() {
        for (var key in groups) {
            groups[key].showFeedback();
        }
    }
    Groups.showFeedback = showFeedback;

    function removeFeedback() {
      for (var key in groups) {
        groups[key].removeFeedback();
      }
    }
    Groups.removeFeedback = removeFeedback;

    function removeAllErrors() {
      setTimeout(function () {
        for (var key in groups) {
          if (groups[key].feedbackExists() && !groups[key].isValid())
          groups[key].removeFeedback();
        }
      }, 1000);
    }
    Groups.removeAllErrors = removeAllErrors;

    function getGroupByBasket(basket) {
        for (var key in groups) {
            if (groups[key].containsBasket(basket))
                return groups[key];
        }
        return null;
    }
    Groups.getGroupByBasket = getGroupByBasket;

    function getGroupById(id) {
      return groups[id];
    }
    Groups.getGroupById = getGroupById;

  })(cet.dragndrop.Groups || (cet.dragndrop.Groups = {}));
  var Groups = cet.dragndrop.Groups;
})(cet || (cet = {}));
