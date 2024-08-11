
(function () {

  var option;
  var Baskets;
  var Content;
  var Stage;
  var Utils;
  var Proportions;

  var dropPosition = function (position) {
    option = cet.option;
    Baskets = cet.Baskets;
    Content = cet.Content;
    Stage = cet.Stage;
    Utils = cet.Utils;
    Proportions = cet.Proportions;

    this.position = position;

    //var jqElement = $('<div style="position:absolute;"></div>')
    //jqElement.css({ width: Proportions.getBasketWidth() + '%', height: '0.2%', top: position.top, left: position.left, 'background-color': '#606569', 'z-index': 30 })
    //$('#Stage').append(jqElement)
    //this.jqElement = $(elem);
    //this.symbol = Stage.getSymbol(this.jqElement);


  }


  dropPosition.prototype.getOption = function () {
    return this.option;
    //var self = this;
    //var dropPositionId = optionJqElement.parents('.drop-position').attr('id');
    //var symbolTypeName = Stage.getSymbol('#' + dropPositionId).getSymbolTypeName();
    //return self.dropPositions[symbolTypeName].option;
  }
  dropPosition.prototype.unpopulate = function (completeMethod) {
    var self = this;
    if (self.isPopulated()) {
      Storage.addOption(self.option);
      self.removeOption();
    }

    if (completeMethod)
      completeMethod();
  }
  dropPosition.prototype.isPopulated = function () {
    //return this.jqElement.find('.option1, .option2, .option3, .option4, .option5, .option6, .option7, .option8').length > 0;
    return this.option != null;
  }
  dropPosition.prototype.addOption = function (option, fromResize) {
    var self = this;
    self.option = option;
    //self.removeFeedback();

    option.position(this.position, fromResize)

  }
  dropPosition.prototype.removeOption = function (option) {

    this.option = null;

  }
  dropPosition.prototype.setZindex = function (val) {
    this.jqElement.css('z-index', val);
  }
  dropPosition.prototype.getId = function () {
    return this.jqElement.attr('class').split(' ')[2];
  }
  dropPosition.prototype.width = function () {
    return this.jqElement.width();
  }
  dropPosition.prototype.height = function () {
    return this.jqElement.height();
  }
  dropPosition.prototype.top = function () {
    return this.jqElement[0].style.top;

  }
  dropPosition.prototype.left = function () {
    return this.jqElement[0].style.left;
  }
  dropPosition.prototype.leftAsNumber = function () {
    return parseFloat(this.left().replace('%', ''));
  }
  dropPosition.prototype.contains = function (option) {
    return (this.option && this.option.getId() == option.getId());
  }
  dropPosition.prototype.containsValidOption = function () {
    return (this.option && this.option.isValid());
  }




  cet.dropPosition = dropPosition;

})();