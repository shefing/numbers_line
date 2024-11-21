var Textit = Textit || {};

Textit.DROP_ZONE_EVENT = {
  dragStart: "start",
  dragEnd: "end",
  dragContinue: "continue",
  dragDropTest: "test",
}

Textit.dragDropManager = function (article) {
  var _activeDrag = false;
  var _currentDropType = "";

  var _draggableObject = null;
  var _dropHandlers = {};

  var listeners = {};

  var _draggingObj = null;
  var _draggingObjType; // TODO : use
  var _dropHandlers = [];

  var _draggableControlers = [];

  function startDragging(mouseevent) {
    //_draggingObj = Textit.Draggables.createDraggableBySource(mouseevent.target);
    _draggingObj = createDraggable(mouseevent.target);
    if (_draggingObj != null) {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
      _currentDropType = _draggingObj.type;
      _draggingObj.startDrag(mouseevent.x, mouseevent.y);
      _activeDrag = true;
      triggger('drag', _currentDropType, { dragState: Textit.DROP_ZONE_EVENT.dragStart, x: mouseevent.x, y: mouseevent.y, draggable: _draggingObj, dragType: _currentDropType });
      if (!Textit.util.isIE()) document.body.$addClass('grabbing');
    }
    return _activeDrag;
  }
  //-------------------------------------------------------
  function createDraggable(sourceEl) {
    var draggableClass = null;
    while (sourceEl != null && draggableClass == null) {
      for (var i in _draggableControlers) {  // for each draggable object
        if (_draggableControlers[i].elementSelector != null) {
          if (Textit.util.fitsSelector(sourceEl, _draggableControlers[i].elementSelector) &&
            (_draggableControlers[i].canDrag == undefined || _draggableControlers[i].canDrag(sourceEl, article)))
            draggableClass = _draggableControlers[i];
        }
      }
      if (draggableClass == null)
        sourceEl = sourceEl.parentNode;
    }
    if (draggableClass != null) {
      return new draggableClass(sourceEl, article);
    } else {
      return null;
    }
  }
  //-------------------------------------------------------
  function onMouseMove(event) {
    event.preventDefault();
    var mouseX = event.pageX;
    var mouseY = event.pageY;

    triggger('drag', _currentDropType, { dragState: Textit.DROP_ZONE_EVENT.dragContinue, x: mouseX, y: mouseY, draggable: _draggingObj, dragType: _currentDropType });
    _draggingObj.continueDrag(mouseX, mouseY);
  }
  //-------------------------------------------------------
  function onMouseUp(event) {
    if (!Textit.util.isIE()) document.body.$removeClass('grabbing');
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    var mouseX = event.pageX;
    var mouseY = event.pageY;

    triggger('drag', _currentDropType, { dragState: Textit.DROP_ZONE_EVENT.dragEnd, x: mouseX, y: mouseY, draggable: _draggingObj, dragType: _currentDropType });

    _draggingObj.endDrag(mouseX, mouseY);
    var target = event.target;
    dropZoneFound = false;
    for (var i = 0, len = _dropHandlers.length; i < len && !dropZoneFound; i++) {
      var _dropHandler = _dropHandlers[i];
      if (_dropHandler.dragType == 'all' || _dropHandler.dragType == _currentDropType || (_dropHandler.dragType instanceof Array && _dropHandler.dragType.includes(_currentDropType)))
        dropZoneFound = dropZoneFound || _dropHandler.callback({ x: mouseX, y: mouseY, draggable: _draggingObj, target: target });
    }

    _draggingObj.drop(dropZoneFound);

    _activeDrag = false;

  }

  //-------------------------------------------------------
  function isActive() {
    return _activeDrag;
  }
  //-------------------------------------------------------
  function addListener(eventName, dragType, callback) {
    if (arguments.length == 2) {
      callback = dragType;
      dragType = 'all';
    }
    if (!(eventName in listeners)) listeners[eventName] = [];
    listeners[eventName].push({ callback: callback, dragType: dragType })
  }
  //-------------------------------------------------------
  function triggger(eventName, dragType, params) {
    if (typeof listeners[eventName] == 'undefined') return;
    for (var i = 0, len = listeners[eventName].length; i < len; i++) {
      var listener = listeners[eventName][i];
      if (listener.dragType == 'all' || listener.dragType == dragType || (listener.dragType instanceof Array && listener.dragType.includes(dragType)))
        listener.callback(params);
    }
  }
  //-------------------------------------------------------
  function createDropHandler(dragType, callback) {
    _dropHandlers.push({ dragType: dragType, callback: callback });
  }
  //-------------------------------------------------------
  return {
    createDropHandler: createDropHandler,
    isActive: isActive,
    on: addListener,
    startDragging: startDragging,
    addDraggableController: function (handler) {
      _draggableControlers.push(handler);
    }
  }
};
