var Textit = Textit || {};

Textit.trashAndLike = Textit.trashAndLike || (function () {
  var trashIcon;
  var likeIcon;
  var _holdDisapearingOnEnd;

  //Textit.dragDropManager.addDropZoneListener("marked_text", onDragEvent);
  Textit.dragDropManager.on('drag', 'marked_text', onDragEvent)

  Textit.dragDropManager.createDropHandler('marked_text', function (dropParams) {
    var nearTrash = operateIcon(trashIcon, Textit.DROP_ZONE_EVENT.dragDropTest, event.x, event.y)
    var nearLike = operateIcon(likeIcon, Textit.DROP_ZONE_EVENT.dragDropTest, event.x, event.y)
    var dropableAction = "";
    var icon;
    if (nearTrash) {
      dropableAction = "trash";
      icon = trashIcon;
    }
    if (nearLike) {
      dropableAction = "like";
      icon = likeIcon;
    }
    if (nearTrash || nearLike) {
      Textit.util.addClass(icon, "big");
      _holdDisapearingOnEnd = icon;
      var rect = icon.getBoundingClientRect();
      dropParams.draggable.applyDropAction(dropableAction, rect.left + rect.width / 2, rect.top + rect.height / 2, function () {
        Textit.util.removeClass(icon, "big");
        Textit.util.removeClass(icon, "open");
        Textit.util.removeClass(icon, "show");
      });
      return true;
    }
    return false;
  })

  initIcons();

  //-------------------------------------------------------
  function initIcons() {
    trashIcon = document.createElement("DIV");
    likeIcon = document.createElement("DIV");
    trashIcon.className = "trash";
    likeIcon.className = "like";
    Textit.util.onDomReady(function () {
      document.body.appendChild(trashIcon);
      document.body.appendChild(likeIcon);
    });
  }
  //-------------------------------------------------------
  function operateIcon(icon, eventType, mouseX, mouseY) {
    if (eventType == Textit.DROP_ZONE_EVENT.dragEnd) {
      if (_holdDisapearingOnEnd != icon) {
        Textit.util.removeClass(icon, "open");
        Textit.util.removeClass(icon, "show");
      }
      return;
    }
    if (eventType == Textit.DROP_ZONE_EVENT.dragStart) {
      _holdDisapearingOnEnd = null;
      var top = window.innerHeight / 3 - Textit.util.getBoundingRect(icon).height / 2;
      icon.style.top = top + "px";
      Textit.util.addClass(icon, "show");
    }

    var isNear = isNearIcon(icon, mouseX, mouseY);
    if (isNear) {
      Textit.util.addClass(icon, "open");
    } else {
      Textit.util.removeClass(icon, "open");
    }

    return isNear;
  }
  //-------------------------------------------------------
  function onDragEvent(event) {
    var mouseX = event.x,
        mouseY = event.y,
        eventType = event.dragState,
        draggable = event.draggable;

    var nearTrash = operateIcon(trashIcon,eventType, mouseX, mouseY)
    var nearLike = operateIcon(likeIcon, eventType, mouseX, mouseY)
  }
  //-------------------------------------------------------
  function isNearIcon(icon, mouseX, mouseY) {
    var threshold = 80;
    var rect = Textit.util.getBoundingRect(icon);
    var centerX = rect.left + rect.width / 2;
    var centerY = rect.top + rect.height / 2;
    var diffX = mouseX - centerX;
    var diffY = mouseY - centerY;
    return (diffX * diffX + diffY * diffY < threshold * threshold);
  }
  //-------------------------------------------------------
})();

