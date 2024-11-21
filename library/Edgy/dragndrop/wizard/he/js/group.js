window.cet = window.cet || {}; window.cet.dragndrop = window.cet.dragndrop || {};
(function () {


  function group(element, data) {
    this.$element = $(element);
    this.dropBox = this.getDropBox();
    this.data = data;
    this.baskets = [];
    for (var i = 0; i < this.data.baskets.length; i++) {
      var basketId = this.data.baskets[i];
      var basket = cet.dragndrop.Baskets.getBasketById(basketId);
      basket.addClass('group-member');

      this.baskets.push(basket);
    }
  }
  group.prototype.getDropBox = function () {
    var self = this;
    var offset = self.$element.offset();
    var factor = 8;

    return {
      'top': offset.top - factor,
      'left': offset.left - factor,
      'right': offset.left + self.$element.width() + factor,
      'bottom': offset.top + self.$element.height() + factor
    };
  };

  group.prototype.getUnpopulatedBasket = function () {
    for (var i = 0; i < this.baskets.length; i++) {
      var candidateBasket = this.baskets[i];
      if (!candidateBasket.isPopulated()) {
        return candidateBasket;
      }
    }
    return null;
  };

  group.prototype.getInvalidBasket = function () {
    for (var i = 0; i < this.baskets.length; i++) {
      var candidateBasket = this.baskets[i];
      if (!candidateBasket.isExtra() && !candidateBasket.isValid()) {
        return candidateBasket;
      }
    }
    return null;
  };

  group.prototype.isValidOption = function (option) {
    for (var i = 0; i < this.baskets.length; i++) {
      var candidateBasket = this.baskets[i];
      var basketId = candidateBasket.getId();
      for (var j = 0; j < option.baskets.length; j++) {
        if (option.baskets[j] == basketId)
          return true;
      }
    }
    return false;
  };

  group.prototype.isPointContained = function (pointer) {
    var self = this;
    if (!pointer)
      return false;
    if (pointer.pageX < self.dropBox.left || pointer.pageX > self.dropBox.right || pointer.pageY > self.dropBox.bottom || pointer.pageY < self.dropBox.top) {
      return false;
    }

    //$('.console').text(self.getId() +  ' hoverred ' + $('.console').text());
    return true;
  };

  group.prototype.getContainmentSize = function (pointer) {
    var self = this;
    var x = 0;
    var y = 0;

    var boxMiddleX = self.dropBox.left + ((self.dropBox.right - self.dropBox.left) / 2);

    if (pointer.pageX >= boxMiddleX)
      x = self.dropBox.right - pointer.pageX;
    else
      x = pointer.pageX - self.dropBox.left;

    var boxMiddleY = self.dropBox.top + ((self.dropBox.bottom - self.dropBox.top) / 2);
    if (pointer.pageY >= boxMiddleY)
      y = self.dropBox.bottom - pointer.pageY;
    else
      y = pointer.pageY - self.dropBox.top;

    return x + y;
  };

  group.prototype.updateDropBox = function () {
    this.dropBox = this.getDropBox();
  };

  group.prototype.id = function () {
    //var val = this.jqElement.attr('class').split(' ')[2];
    //if (!val)
    //  val = this.jqElement.attr('class').split(' ')[1];
    //return val;
    var classes = this.$element.attr('class').split(' ');
    for (var i = 0; i < classes.length; i++) {
      if (classes[i].indexOf('group-') != -1)
        return classes[i];
      if (classes[i].indexOf('group') == 0 && classes[i].length > 'group'.length)
        return classes[i];
    }
  };

  group.prototype.hideHover = function () {
    this.$element.removeClass('hover');
  };

  group.prototype.showHover = function () {
    this.$element.addClass('hover');
    this.removeFeedback();
  };

  group.prototype.getAvailableBasket = function (pointer) {
    //return hovered basket if available
    var hoveredBasket = cet.dragndrop.Baskets.getHoveredBasket(pointer, false);
    if (hoveredBasket && !hoveredBasket.isPopulated())
      return hoveredBasket;

    //return first available basket
    var candidateBasket = this.getUnpopulatedBasket();
    if (candidateBasket)
      return candidateBasket;

    if (cet.dragndrop.Content.isFreeGroupMode()) {
      return this.createBasket();
    }

    if (hoveredBasket)
      return hoveredBasket;

    if (!this.data.baskets || this.data.baskets.length == 0)
      return null;

    var lastBasketId = this.data.baskets[this.data.baskets.length - 1];
    var selectedBasket = cet.dragndrop.Baskets.getBasketById(lastBasketId);
    return selectedBasket;
  };

  group.prototype.getBaskets = function () {
    return this.baskets;
  };

  group.prototype.getBasketsIds = function () {
    var ids = []
    for (var key in this.baskets) {
      ids.push(this.baskets[key].getId());
    }
    return ids;
  };

  group.prototype.createBasket = function (id) {
    //id is received only when restoring already created basket
    if (!id)
      id = 'basket-' + Math.random().toString().replace('.', '');
    var newBasket = cet.dragndrop.Baskets.createBasket({ id: id, isExtra: true });
    newBasket.addClass('group-member');
    this.baskets.push(newBasket);
    return newBasket;

  };

  group.prototype.addBasket = function (bskt) {
    this.baskets.push(bskt);
  };

  group.prototype.rearrangeBaskets = function () {
    var self = this;
    //since we splice and change array during loop we start from the last element
    for (var i = this.baskets.length - 1; i > 0 ; i--) {
      var basket = this.baskets[i];

      if (basket.isExtra()) {
        //not popultaed extra basket has no meaning
        if (!basket.isPopulated()) {
          cet.dragndrop.Baskets.remove(basket);
          this.baskets.splice(i, 1);
          continue;
        }

        //move option into an unpopulted 'none extra' basket
        var unpopulatedBasket = this.getUnpopulatedBasket();
        if (unpopulatedBasket) {
          unpopulatedBasket.position(basket.position());
          unpopulatedBasket.addOption(basket.getOption());
          cet.dragndrop.Baskets.remove(basket);
          this.baskets.splice(i, 1);
          basket.remove();
          continue;
        }

        //switch options with 'errored' baskets
        var invalidBasket = self.getInvalidBasket();
        if (self.isValidOption(basket.getOption()) && invalidBasket) {
          var invalidBasketPosition = invalidBasket.position();
          invalidBasket.position(basket.position());
          basket.position(invalidBasketPosition);

          var invalidOption = invalidBasket.getOption();
          invalidBasket.addOption(basket.getOption());
          basket.addOption(invalidOption);
        }
      }
    }
  };

  group.prototype.isValid = function () {
    var self = this;
    for (var key in self.baskets) {
      if (!self.baskets[key].isValid()) {
        return false;
      }
    }
    return true;
  }

  group.prototype.showFeedback = function () {
    var self = this;
    

    self.$element.find('.feedback-correct, .feedback-error').hide();
    self.$element.addClass('feedback-visible');

    var feedbackIconSelector = '.feedback-';
    feedbackIconSelector += self.isValid() ? 'correct' : 'error';

    self.$element.find(feedbackIconSelector).css({ 'z-index': 1000, display: 'block' }).show();
  };

  group.prototype.hideFeedback = function () {
    this.removeFeedback();
  };

  group.prototype.removeFeedback = function () {
    this.$element.removeClass('feedback-visible');
    this.$element.find('.feedback-correct, .feedback-error').hide();
  };

  group.prototype.feedbackExists = function () {
    return this.$element.find('.feedback-correct, .feedback-error').is(':visible');
  }

  group.prototype.containsBasket = function (basket) {
    for (var key in this.baskets) {
      if (this.baskets[key].getId() == basket.getId()) {
        return true;
      }
    }
    return false;
  };

  cet.dragndrop.group = group;

})();
