var Textit = Textit || {};

Textit.MouseHandler = function (article) {
  var listeners = {};
  var dragThreshold = 3;
  //-------------------------------------------------------
  function subscribe(eventName, callback) {
    if (!listeners[eventName]) listeners[eventName] = [];
    listeners[eventName].push(callback);
  }
  //-------------------------------------------------------
  function trigger(eventName, params) {
    if (typeof listeners[eventName] == 'undefined') return;
    var event = {};
    for (var i = 0, len = listeners[eventName].length; i < len; i++) {
      var event = { stopPropagation: function () { this.cancelBubble = true; }, cancelBubble: false }
      for (var key in params)
        event[key] = params[key];

      listeners[eventName][i](event);
      if (event.cancelBubble)
        break;
    }
  }
  //-------------------------------------------------------
  var mousedown = false, dragTriggered = false;
  var startMouseX, startMouseY;
  var origin;
  article.dom.addEventListener('mousedown', function (event) {
    mousedown = true;
    dragTriggered = false;
    startMouseX = event.pageX;
    startMouseY = event.pageY;
    origin = {
      target: event.target, x: event.pageX, y: event.pageY
    }
  })
  //-------------------------------------------------------
  document.addEventListener('mousemove', function (event) {
    if (mousedown && !dragTriggered) {
      var deltaX = startMouseX - event.pageX;
      var deltaY = startMouseY - event.pageY;
      if (deltaX * deltaX + deltaY * deltaY > dragThreshold * dragThreshold) {
        dragTriggered = true;
        trigger('mousedragstart', { x: event.pageX, y: event.pageY, target: event.target, origin: origin });
      }
    }
    if (mousedown && dragTriggered) {
      trigger('mousedrag', { x: event.pageX, y: event.pageY, target: event.target, origin: origin });
    }
  })
  //-------------------------------------------------------
  document.addEventListener('mouseup', function (event) {
    if (mousedown) {
      mousedown = false;
      if (dragTriggered)
        trigger('mousedragend', { x: event.pageX, y: event.pageY, origin: origin });
    }
  })
  //-------------------------------------------------------
  return {
    on: subscribe,
    ismousedown: function () { return mousedown; }
  }
};