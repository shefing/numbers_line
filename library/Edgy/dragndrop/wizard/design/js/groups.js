
var Groups;
(function (Groups) {
  var groups = [];

  function getActiveGroup() {
    for (var i = 0; i < groups.length; i++) {
      if (groups[i].isActive())
        return groups[i];
    }
  }
  Groups.getActiveGroup = getActiveGroup;

  function deactivateAllGroupsExceptMe(me) {
    for (var i = 0; i < groups.length; i++) {
      if (groups[i].id == me.id)
        continue;
      groups[i].deactivate();
    }
  }
  Groups.deactivateAllGroupsExceptMe = deactivateAllGroupsExceptMe;

  function removeActiveGroup() {
    for (var i = 0; i < groups.length; i++) {
      if (groups[i].isActive()) {
        groups[i].delete();
        groups.splice(i, 1);
        return;
      }
    }
  }
  Groups.removeActiveGroup = removeActiveGroup;

  function createNewGroup(top, left, groupData) {
    /*
    
    var active = getActiveBasket();
    if (active) {
    LinkedBaskets.deactivateactiveLink();
    active.deactivate();
    
    Properties.removeActiveComponent();
    return;
    }
    var basketData = new basketdata(e.pageY - $stage.offset().top, e.pageX - $stage.offset().left);
    
    
    
    fixOverflowBaskets(basketData);
    basketData.color = Properties.color;
    createNewBasket(basketData);
    */
    if (typeof groupData === "undefined") { groupData = new groupdata(top, left); }
    //fixOverflowGroups(groupData);
    //groupData.color = groupProperties.color;
    Stage.fixComponentOverflow(groupData);
    var newGroup = new group(groupData);

    //newGroup.on('active', function (e, activatedGroup) {
    // Groups.deactivateAllGroupsExceptMe(activatedGroup);
    // Properties.setActiveComponent(activatedGroup);
    //});
    //if (groupData.realTimeCreation)
    // Properties.setActiveComponent(newGroup);
    newGroup.on('active', Stage.componentActivatedHandler);
    groups.push(newGroup);

    return newGroup;
  }
  Groups.createNewGroup = createNewGroup;

  function getGroups() {
    return groups;
  }
  Groups.getGroups = getGroups;

  function getGroupsByBasketIds(basketIds) {
    var result = [];

    for (var i = 0; i < basketIds.length; i++) {
      var group = getGroupByBasketId(basketIds[i]);
      var found = false;
      for (var j = 0; group && j < result.length; j++) {
        if (result[j].id == group.id)
          found = true;
      }
      if (!found && group)
        result.push(group);
    }
    return result;
  }
  Groups.getGroupsByBasketIds = getGroupsByBasketIds;

  function getGroupByBasketId(basketId) {
    for (var i = 0; i < groups.length; i++) {
      if (groups[i].containsBasket(basketId))
        return groups[i];
    }
  }
  Groups.getGroupByBasketId = getGroupByBasketId;

  function resolveBaskets() {
    for (var i = 0; i < groups.length; i++) {
      groups[i].resolveBaskets();
    }
  }
  Groups.resolveBaskets = resolveBaskets;

  function emptyGroupExists() {
    resolveBaskets();
    for (var i = 0; i < groups.length; i++) {
      
      if (!groups[0].hasBaskets())
        return true;
    }
    return false;

  }
  Groups.emptyGroupExists = emptyGroupExists;

  function groupWithHiddenBasketExists() {
    resolveBaskets();
    for (var i = 0; i < groups.length; i++) {

      if (groups[0].hasHiddenBasket())
        return true;
    }
    return false;

  }
  Groups.groupWithHiddenBasketExists = groupWithHiddenBasketExists;
  
})(Groups || (Groups = {}));
