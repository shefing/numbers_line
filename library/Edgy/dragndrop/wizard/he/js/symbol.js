//leftour from edge... should be removed!!!

function symbol($element) {
  this.$element = $element;
  this.position = 0;
  this.labels = { normal: 0, hover: 1, in_target: 2, occupied: 3 }

  this.symbol = $element.attr('symbol');
  if(this.symbol)
    this.symbol = new window[this.symbol]($element);

}

symbol.prototype.play = function () {
  if (this.symbol)
    this.symbol.play();
}
symbol.prototype.stop = function (label) {
  this.$element.removeClass('normal hover in_target occupied')
  this.$element.addClass(label);
  this.position = this.labels[label];

}
symbol.prototype.getLabelPosition = function (label) {
  return this.labels[label];
}
symbol.prototype.getPosition = function () {
  return this.position;
}

