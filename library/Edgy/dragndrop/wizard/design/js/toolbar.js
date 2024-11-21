
var toolbar;
(function (toolbar) {

  var $btnBasket;
  var $btnMedia;
  var $btnGroup;


  function createNewComponent($btn, pointer) {

    //var top = pointer.pageY - Stage.offsetTop;
    //var left = pointer.pageX - Stage.offsetLeft;

    var top = $btn.offset().top - Stage.offsetTop;
    var left = $btn.offset().left - Stage.offsetLeft;

    if ($btn.hasClass('btn-basket'))
      return Baskets.createNewBasket(top, left);
    else if ($btn.hasClass('btn-group'))
      return Groups.createNewGroup(top, left);
    else
      return Medias.createNewMedia(top, left);

  }

  function droppedOnCanvas(pointer) {
    return pointer && Stage.containsPoint(pointer);
  }

  function setAsToolbarButton($element) {

    var basketDraggie = new draggable($element, 'body');

    basketDraggie.on('dragend', function (event, pointer) {
      if (!droppedOnCanvas(pointer)) {
        $element.remove();
        return;
      }

      Stage.removeTooltip();
      Stage.deactivateActiveComponent();
      var newComponent = createNewComponent($element, pointer);
      Properties.setActiveComponent(newComponent);
      newComponent.on('active', Stage.componentActivatedHandler);
      $element.remove();
      wizard.changesDone();
    })

    basketDraggie.on('dragstart', function (event, pointer) {

      var $clone = $element.clone();
      $element.addClass('dragged');
      //$clone.isClone = true;
      $element.parent().append($clone);
      setAsToolbarButton($clone);
    });

  }

  $(function () {

    $btnBasket = $('#btn-basket');
    $btnMedia = $('#btn-media');
    $btnGroup = $('#btn-group');

    setAsToolbarButton($btnBasket);
    setAsToolbarButton($btnMedia);
    setAsToolbarButton($btnGroup);

  });

})(toolbar || (toolbar = {}));
