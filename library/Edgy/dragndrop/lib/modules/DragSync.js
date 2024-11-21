(function () {

  var DragSync = (function () {
    var Storage;
    var Baskets;

    var isDragging = false;
    var isEndStarted = false;

    var option = null;
    return {
      init: function () {
        Storage = cet.Storage;
        Baskets = cet.Baskets;
      },
      isDragging: function (val) {
        if (typeof val == "boolean")
          isDragging = val;
        return isDragging;
      },
      option: function (val) {
        if (val)
          option = val;
        return option;
      },
      isEndStarted: function (val) {
        if (typeof val == "boolean")
          isEndStarted = val;
        return isEndStarted;
      },
      isMyDragEnded: function (dragOption) {
        
        if (!isDragging)
          return false;
        if (option != dragOption) {
          return false;
        }
        if (isEndStarted) {
          return false;
        }
        return true;

      },
      end: function () {
        
        if (!isDragging)
          return;
        
        isEndStarted = false;
        option = null;
        isDragging = false;
        Storage.enableAllOptions();
        Storage.enableNavigationArrows();
        Baskets.enableAllOptions();
      },
      start: function (dragOption) {
        
        isDragging = true;
        option = dragOption;
        isEndStarted = false;
        Storage.disableAllOptionsExceptMe(option);
        Storage.disableNavigationArrows();
        Baskets.disableAllOptionsExceptMe(option);
      }



    }
  })();

  cet.DragSync = DragSync;

})();
