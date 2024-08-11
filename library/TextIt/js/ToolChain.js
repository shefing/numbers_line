"use strict";

var ToolChain = function (anchorX, anchorY, container) {
  this.options = {
    radius: 2.5,
    gravity: 1,
  };
  this.container = container || document.body;
  if (this.container == window) this.container = document.body;
  this.ended = false;
  this.distance = 0;
  this.anchor = { x: anchorX , y: anchorY  };
  this.particles = [];
  this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  this.svg.setAttribute('width', '100%');
  this.svg.setAttribute('height', this.container.scrollHeight);
  this.svg.setAttribute('class', "ToolChainCanvas");
  this.svg.style.top = '0';
  this.container.appendChild(this.svg);

  if (!Textit.util.isIE()) {
    this.engine = Matter.Engine.create();
    this.world = this.engine.world;
    this.engine.world.gravity.y = this.options.gravity;
    var particle = new ToolChainParticle(this, this.anchor.x, this.anchor.y, true);
    this.particles.push(particle);
    this.continuesUpdate();
  }
}
//-------------------------------------------------------
ToolChain.prototype.end = function () {
  if (!Textit.util.isIE()) {
    this.ended = true;
    for (var i = 0; i < this.particles.length; i++) {
      var particle = this.particles[i];
      if (particle.constraint) {
        Matter.World.remove(this.world, particle.constraint);
      }
      Matter.World.remove(this.world, particle.body);
    }
    this.particles = [];
  }
  this.container.removeChild(this.svg);
}
//-------------------------------------------------------
ToolChain.prototype.setCursor = function (imgUrl, width, height, hotspotX, hotspotY, chainOffsetX, chainOffsetY) {
  var cursorExists = !!this.cursor;
  this.cursor = this.cursor || document.createElementNS("http://www.w3.org/2000/svg", "image");
  this.cursor.setAttributeNS("http://www.w3.org/1999/xlink", "href", imgUrl);
  this.cursor.setAttribute("width", width + "px");
  this.cursor.setAttribute("height", height + "px");
  this.cursor.setAttribute("x", this.anchor.x - hotspotX);
  this.cursor.setAttribute("y", this.anchor.y - hotspotY);
  if (!cursorExists) this.svg.appendChild(this.cursor);
  this.cursorPlacement = { hotspotX: hotspotX, hotspotY: hotspotY, chainX: chainOffsetX, chainY: chainOffsetY };
}
//-------------------------------------------------------
ToolChain.prototype.updateMousePos = function (mouseX, mouseY) {
  if (!Textit.util.isIE()) {
    var chainEndX = mouseX + this.cursorPlacement.chainX;
    var chainEndY = mouseY + this.cursorPlacement.chainY;
    var diffX = chainEndX - this.anchor.x;
    var diffY = chainEndY - this.anchor.y;
    var distance = Math.sqrt(diffX * diffX + diffY * diffY);
    this.distance = distance;
    var steps = Math.min(30, Math.floor(distance / (2 * this.options.radius)));
    if (this.particles.length < steps) {
      if (this.particles.length > 1) {
        this.particles[this.particles.length - 1].setNotFixed();
      }
      for (var i = this.particles.length; i < steps; i++) {
        var prev = this.particles[i - 1];
        var fixed = (i == steps - 1);
        var particle = new ToolChainParticle(this, chainEndX, chainEndY, fixed, prev, (i == 1));
        this.particles.push(particle);
      }
    }
    if (this.particles.length > 1) {
      this.particles[this.particles.length - 1].setBodyPos(chainEndX, chainEndY);
    }
    this.updateParticlePositions();

    this.cursor.setAttribute("x", mouseX - this.cursorPlacement.hotspotX);
    this.cursor.setAttribute("y", mouseY - this.cursorPlacement.hotspotY);
    return;
  }
}
//-------------------------------------------------------
ToolChain.prototype.setAnchor = function (x, y) {
  this.anchor.x = x;
  this.anchor.y = y;
  if (this.particles.length > 1) {
    this.particles[0].setBodyPos(x, y);
  }
}
//-------------------------------------------------------
ToolChain.prototype.updateParticlePositions = function () {
  Matter.Engine.update(this.engine);
  var strokeColor = 'black';
  var fillColor = 'white';
  if (this.distance > 400) {
    if (this.distance > 600)
      strokeColor = fillColor = 'red';
    else {
      strokeColor = Textit.util.lerpColor('000000', 'FF0000', (this.distance - 400) / 200)
      fillColor = Textit.util.lerpColor('FFFFFF', 'FF0000', (this.distance - 400) / 200)
    }
  }
  for (var i = 0; i < this.particles.length; i++) {
    this.particles[i].updatePos(strokeColor, fillColor);
  }
}
//----------------------------------------------
ToolChain.prototype.continuesUpdate = function () {
  this.updateParticlePositions();
  var self = this;
  requestAnimationFrame(function () { self.continuesUpdate(); });
}
//----------------------------------------------
var ToolChainParticle = function (chain, x, y, fixed, linkedParticle, strongerConstraint) {
  this.chain = chain;
  this.body = this.createBody(x, y, fixed);
  if (linkedParticle) {
    this.linkedParticle = linkedParticle;
    this.constraint = this.createConstraint(this.body, linkedParticle.body, strongerConstraint);
    this.strongerConstraint = strongerConstraint;
  }

  var svgCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  svgCircle.setAttribute("cx", x);
  svgCircle.setAttribute("cy", y);
  svgCircle.setAttribute("r", this.chain.options.radius);
  svgCircle.setAttribute("stroke", "black");
  svgCircle.setAttribute("stroke-width", 1);
  svgCircle.setAttribute("fill", "white");
  this.chain.svg.appendChild(svgCircle);
  this.svgCircle = svgCircle;
}
//----------------------------------------------
ToolChainParticle.prototype.setNotFixed = function () {
  //Matter.Body.setStatic(this.body, false);  --> not working!
  var pos = this.body.position;
  Matter.World.remove(this.chain.world, this.constraint);
  Matter.World.remove(this.chain.world, this.body);
  this.body = this.createBody(pos.x, pos.y, false);
  this.constraint = this.createConstraint(this.body, this.linkedParticle.body, this.strongerConstraint);
}
//----------------------------------------------
ToolChainParticle.prototype.setBodyPos = function (x, y) {
  this.body.position.x = x;
  this.body.position.y = y;
}
//----------------------------------------------
ToolChainParticle.prototype.updatePos = function (strokeColor, fillColor) {
  var pos = this.body.position;
  this.svgCircle.setAttribute("cx", pos.x);
  this.svgCircle.setAttribute("cy", pos.y);
  this.svgCircle.setAttribute("stroke", strokeColor);
  this.svgCircle.setAttribute("fill", fillColor);
}
//-------------------------------------------------------
ToolChainParticle.prototype.createConstraint = function (body, linkedBody, strongerConstraint) {
  var options = {
    bodyA: body,
    bodyB: linkedBody,
    length: strongerConstraint ? this.chain.options.radius : 2 * this.chain.options.radius - 1,
    stiffness: 1
  }
  var constraint = Matter.Constraint.create(options);
  Matter.World.add(this.chain.world, constraint);
  return constraint;
}
//----------------------------------------------
ToolChainParticle.prototype.createBody = function (x, y, fixed) {
  var options = {
    friction: 0,
    restitution: 0.95,
    isStatic: fixed
  }
  var body = Matter.Bodies.circle(x, y, this.chain.options.radius / 2, options);
  Matter.World.add(this.chain.world, body);
  return body;
}
//----------------------------------------------
