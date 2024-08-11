"use strict";

//--------------------------------------------------
Node.prototype.$findParentWithClass = function (node, parentClass) {
  var n = node;
  while ((n = n.parentNode)) {
    if (n.$hasClass(parentClass))
      return n;
  }
  return null;
}
//--------------------------------------------------
Node.prototype.$contains = function (node, inclusive) {
  inclusive = (typeof inclusive == "undefined") ? true : inclusive;
  return (this.nodeType == Node.ELEMENT_NODE) && 
         (inclusive == true || node != this) && 
         this.contains(node);
}
//--------------------------------------------------
Node.prototype.$isMark = function (markType) {
  return (this.nodeType == Node.ELEMENT_NODE) &&
         (this.nodeName == "MARK") &&
         (this.dataset.markType == markType);
}
//--------------------------------------------------
Node.prototype.$removeAndLeaveChildren = function () {
  var parentNode = this.parentNode;
  while (this.firstChild != null) {
    parentNode.insertBefore(this.firstChild, this);
  }
  parentNode.removeChild(this);
}
//--------------------------------------------------
Node.prototype.$remove = function () {
  var parentNode = this.parentNode;
  if (parentNode != null) {
    parentNode.removeChild(this);
  }
}
//--------------------------------------------------
Node.prototype.$nextTreeNode = function () {
  var node = this;
  while (node.nextSibling == null) {
    node = node.parentNode;
  }
  return node.nextSibling;
}
//--------------------------------------------------
Node.prototype.$prevTreeNode = function () {
  var node = this;
  while (node.previousSibling == null) {
    node = node.parentNode;
  }
  return node.previousSibling;
}
//--------------------------------------------------
Node.prototype.$swallowParentNode = function () {
  var parent = this.parentNode;
  while (this.firstChild != null) {
    parent.insertBefore(this.firstChild, this);
  }
  parent.parentNode.insertBefore(this, parent);
  this.appendChild(parent);
}
//--------------------------------------------------
Node.prototype.$ofType = function (elementTypes) {
  if (this.nodeType != Node.ELEMENT_NODE) {
    return false;
  }
  return (elementTypes.indexOf(this.nodeName) != -1);
}
//--------------------------------------------------
  Node.prototype.$hasClass = function (classNameOrNames) {
  if (this.nodeType != Node.ELEMENT_NODE) {
    return false;
  }
  if (classNameOrNames instanceof Array) {
    for (var i = 0; i < classNameOrNames.length; i++) {
      if (this.classList.contains(classNameOrNames[i])) {
        return true;
      }
    }
    return false;
  }
  return this.classList.contains(classNameOrNames);
}
//--------------------------------------------------
// isMarkable - returns true if the given node can be a child of a MARK node of the given type
//
Node.prototype.$isMarkable = function (markType) {
  var nodeNames = ["B", "I", "U", "SPAN", "STRONG", "BR", "A", "IMG", "EM"];
  return (this.nodeType == Node.TEXT_NODE ||
           (this.nodeType == Node.ELEMENT_NODE &&
             (nodeNames.indexOf(this.nodeName) != -1 ||
               (this.nodeName == "MARK" &&
                 (markType === undefined || this.dataset.markType != markType)))));
}
//--------------------------------------------------
Node.prototype.$isMark = function (markType) {
  return (this.nodeType == Node.ELEMENT_NODE) &&
         (this.nodeName == "MARK") &&
         (this.dataset.markType == markType);
}
//--------------------------------------------------
Node.prototype.$isText = function () {
  return this.nodeType == Node.TEXT_NODE;
}
//--------------------------------------------------
Element.prototype.$addClass = function (className) {
   this.classList.add(className);
}
//--------------------------------------------------
Element.prototype.$removeClass = function (className) {
  this.classList.remove(className);
}
//--------------------------------------------------
Element.prototype.$isVisible = function () {
  var style = window.getComputedStyle(this);
  return style.getPropertyValue("opacity") != "0" &&
         style.getPropertyValue("opacity") != "none" &&
         style.getPropertyValue("visibility") != "hidden";
}
//--------------------------------------------------
Element.prototype.$isChildOf = function (parent) {
  var el = this;
  while (el != parent && el != null)
    el = el.parentNode;
  return el == parent;
}
//--------------------------------------------------
HTMLTextAreaElement.prototype.$autoexpand = function () {
  var el = this;
  setTimeout(function () {
    el.style.cssText = 'height:auto; padding:0';
    el.scrollTop = 22;
    // for box-sizing other than "content-box" use:
    // el.style.cssText = '-moz-box-sizing:content-box';
    el.style.cssText = 'height:' + el.scrollHeight + 'px';
  }, 0);
}
//--------------------------------------------------
