window.cet = window.cet || {};

(function () {

  var App = (function () {

    //#region meta declarations

    var Audio;
    var option;
    var Baskets;
    var Content;
    var Stage;
    var Storage;
    var Buttons;
    var Lms;
    var Feedback;
    var DragSync;
    var HtmlBuilder;
    var Groups;
    var GroupsLinks;
    var Localization;

    //#endregion

    var restored = false;

    //some tablets have less height then app requires in config file (plugins xml).
    //so we decrease app height in order to show app without the need to scroll.
    //var hostClientHeight;

    setTimeout(function () { App.init(); }, 1);
    var animationStopped = false;

    var originalFontSize;
    var originalWidth;
    function adjustSize(sizing) {

      if (!sizing)
        sizing = cet.content.UI.getSizingSettings();

      var optimalWidth = 860, optimalHeight = 631;
      var ratio = optimalHeight / optimalWidth; // content height/width

      var width = sizing.width || sizing.maxWidth;
      var height = sizing.height || sizing.maxHeight;

      if (height > ratio * width) {
        height = ratio * width;
      }
      else {
        width = height / ratio;
      }


      if (!originalFontSize)
        originalFontSize = parseFloat(Stage.fontSize().replace('px'));
      if (!originalWidth)
        originalWidth = Stage.width();

      var newFontSize = originalFontSize * width / originalWidth;

      Stage.css({
        'width': width,
        'height': height,
        'font-size': newFontSize
      });

      var newsize = { width: width, height: height };

      if (sizing.height == undefined || sizing.width == undefined) { // otherwize calling resize does not take effect
        cet.content.UI.resizeTo(newsize);
      }

      cet.Baskets.updateDropBoxes();
      cet.Groups.updateDropBoxes();
      cet.Storage.adjustOptionsSize();
    }

    function setLocalizedResources() {
      $('.final-feedback-success .feedback-text').text(Content.getFinalFeedbackSuccessText())
      $('.final-feedback-failure .feedback-text').text(Content.getFinalFeedbackFailureText())
    }

    function fixIPadOverflowIssue() {
      //for an IPAD issue 67299
      setTimeout(function () {
        var opts = $('.options');
        opts.hide();
        $('.storage').css('overflow', 'visible');
        opts.show();
      }, 1200);
    }

    function restoreFreeGroupsState(state) {
      if (!cet.Content.isFreeGroupMode())
        return;
      if (!state.groups)
        return;

      var groups = state.groups;
      for (var i = 0; i < groups.length; i++) {
        var group = cet.Groups.getGroupById(groups[i].id);
        if (groups[i].feedbackExists)
          group.showFeedback();
        for (var j = 0; j < groups[i].baskets.length; j++) {
          var basket = cet.Baskets.getBasketById(groups[i].baskets[j].id);
          if (!basket) {
            basket = cet.Baskets.createBasket({ id: groups[i].baskets[j].id, isExtra: true });
            group.addBasket(basket);
          }
          basket.position(groups[i].baskets[j].position);
        }
      }
    }

    function restoreOptionsState(state) {
      var options = state.options ? state.options : state;
      for (var i = 0; i < options.length; i++) {

        var restoreMe = options[i];

        if (!restoreMe.basket)
          continue;
        var basket = Baskets.getBasketById(restoreMe.basket);
        basket.unpopulate(false)
        var option = Storage.getOptionById(restoreMe.option);

        if (cet.Content.isNonePerishableStorage()) {
          option = option.clone();
        }
        else {
          Storage.removeOption(option);
        }

        basket.addOption(option);
        if (restoreMe.feedbackExists)
          basket.showFeedback();

      }
    }

    function getOptionsState() {
      var options = [];
      var storageOptions = Storage.getOptions();
      for (var key in storageOptions) {
        options.push({ option: storageOptions[key].getId() });
      }
      var basketsPopulation = Baskets.getPopulation();
      for (var key in basketsPopulation) {
        options.push({
          option: basketsPopulation[key],
          basket: key,
          feedbackExists: Baskets.getBasketById(key).feedbackExists()
        });
      }
      return options;
    }

    function getGroupsState() {
      var groups = Groups.all();
      var groupsData = [];
      for (var key in groups) {
        var group = groups[key];
        var groupData = {
          id: key,
          feedbackExists: group.feedbackExists(),
          baskets: []
        };

        for (var key in group.baskets) {
          groupData.baskets.push({
            id: group.baskets[key].getId(),
            position: group.baskets[key].position()
          });
        }
        groupsData.push(groupData);
      }
      return groupsData;
    }

    function nonePerishableStorageWEIRDConditionIsTrue(options) {
      return !cet.Content.isNonePerishableStorage() && options.length != Content.getOptions().length;
    }

    return {
      init: function () {
        //#region meta declarations
        Audio = cet.Audio;
        option = cet.option;
        Baskets = cet.Baskets;
        Content = cet.Content;
        Stage = cet.Stage;
        Storage = cet.Storage;
        Buttons = cet.Buttons;
        Lms = cet.Lms;
        Feedback = cet.Feedback;
        DragSync = cet.DragSync;
        HtmlBuilder = cet.HtmlBuilder;
        Groups = cet.Groups;
        GroupsLinks = cet.GroupsLinks;
        Localization = cet.Localization;
        //#endregion

        var self = this;

        cet.App.addNoScaleMetaTag();
        Stage.init();
        Stage.eliminateIPadBounceEffect();

        Stage.bind('contentReady', function () {

          Localization.init();
          HtmlBuilder.build();
          DragSync.init();
          Storage.init();
          Baskets.init();
          Groups.init();
          GroupsLinks.init();
          Buttons.init();
          Lms.init();
          Feedback.init();
          cet.content.onresize(adjustSize);
          cet.Preloader.waitOneSecAndHide();
          setLocalizedResources();
          fixIPadOverflowIssue();//this call is important, for an IPAD issue 67299
        });
        
        Content.init();

      },
      restoreState: function (state) {
        if (!state)
          return;
        if (restored)
          return;
        restored = true;
        //next line remark: free group was having problems here, while switching the options from % to px.
        //Storage.hideContainer();

        restoreFreeGroupsState(state);

        restoreOptionsState(state);

        Storage.eliminateSpaces();
        setTimeout(Storage.eliminateSpaces, 400);
        //next line remark: free group was having problems here, while switching the options from % to px.
        //setTimeout(Storage.showContainer, 220);
        if (state.finalFeedback)
          setTimeout(Feedback.showSuccess, 240);
      },
      getState: function () {

        var options = getOptionsState();
        if (nonePerishableStorageWEIRDConditionIsTrue(options))
          return null;
        var groups = getGroupsState();

        var result = {
          options: options,
          groups: groups,
          finalFeedback: Feedback.isVisible()
        }
        return result;
      },
      setAsReadOnly: function () {
        //delayed in order to enable restored options to be set in basket.
        setTimeout(function () {
          Storage.disableAll();
          Baskets.disableAllOptions();
          Buttons.disableAll();
        }, 300);
      },
      unsetAsReadOnly: function () {
        //delayed in order to enable restored options to be set in basket.
        setTimeout(function () {
          Storage.enableAll();
          Baskets.enableAllOptions();
          Buttons.enableAll();
        }, 300);
      },
      restart: function () {
        Audio.stopAll();
        Storage.show();
        Feedback.hide();
        Baskets.unpopulate();
        Groups.removeFeedback();
        App.unsetAsReadOnly();
        restored = false;
      },
      showSolution: function () {

        Baskets.unpopulate();
        setTimeout(function () {

          App.restoreState(Content.getSolution());
          App.setAsReadOnly();
        }, 200);

      },
      animationStopped: function (val) {
        if (typeof val != 'undefined') {
          animationStopped = val;
        }
        return animationStopped;
      },
      showFeedback: function () {
        cet.Groups.rearrangeBaskets();
        cet.GroupsLinks.validate();
        cet.Baskets.showFeedback();
        cet.Groups.showFeedback();
      },
      isPercentageHtml: function () {
        return true;
      }

    }
  })();


  $.extend(cet.App, App);

})();

window.cet = window.cet || {};

(function () {

  var option;
  var Baskets;
  var Content;
  var Stage;
  var Utils;

  var basket = function (elem) {
    option = cet.option;
    Baskets = cet.Baskets;
    Content = cet.Content;
    Stage = cet.Stage;
    Utils = cet.Utils;

    this.$element = $(elem);
    this.jqElement = this.$element;
    this.symbol = Stage.getSymbol(this.$element);
    this.dropBox = this.getDropBox();
    this.normalLabelPosition = this.symbol.getLabelPosition('normal')
    this.hoverLabelPosition = this.symbol.getLabelPosition('hover')
    this._isValid = null;
    this.isVisible = !this.$element.hasClass('hidden');
  }

  basket.prototype.updateDropBox = function () {
    this.dropBox = this.getDropBox();
  }
  basket.prototype.initDropPositions = function () {
    var self = this;
    self.dropPositions = {};
    var dropPositions = self.$element.find('.drop-position');
    $.each(dropPositions, function (index, value) {
      var symbol = Stage.getSymbol('#' + value.attributes['id'].value);
      self.dropPositions[symbol.getSymbolTypeName()] = new dropPosition(symbol);
    });
  }
  basket.prototype.getNextDropPosition = function () {
    var self = this;
    //var idTemplate = this.$element.attr('id');
    for (var i = 1; i < 6; i++) {
      var dropPosition = self.dropPositions['drop-position_' + i];
      if (!dropPosition)
        return null;
      if (!dropPosition.isPopulated())
        return dropPosition;
    }
  }
  basket.prototype.eliminateSpaces = function () {
    var self = this;
    //var idTemplate = this.$element.attr('id');
    for (var i = 1; i < 5; i++) {
      var strongDropPosition = self.dropPositions['drop-position_' + i];
      var weakDropPosition = self.dropPositions['drop-position_' + (i + 1)];
      if (!strongDropPosition || !weakDropPosition)
        return;
      if (!strongDropPosition.isPopulated() && weakDropPosition.isPopulated()) {
        strongDropPosition.populate(weakDropPosition.getOption());
        if (weakDropPosition.feedbackExists())
          strongDropPosition.showFeedback();
        else
          strongDropPosition.removeFeedback();
        weakDropPosition.unpopulate();
      }
    }
  }
  basket.prototype.getOption = function () {
    return this.option;
  }
  basket.prototype.unpopulate = function (completeMethod) {

    this._isValid = null;

    if (!this.isPopulated()) {
      if (completeMethod)
        completeMethod();
      return;
    }

    this.option.animateBackToStorage(completeMethod);
    this.removeOption();

  }
  basket.prototype.isPopulated = function () {
    //return this.$element.find('.option1, .option2, .option3, .option4, .option5, .option6, .option7, .option8').length > 0;
    return this.option != null;
  }
  basket.prototype.addOptionWithoutAnimation = function (option) {
    this.addOption(option, false)
  }
  basket.prototype.addOption = function (option, softAnimation) {

    var self = this;
    option.disable();
    option.fadeTo(1);
    self.option = option;
    self.removeFeedback();



    var targetPos = Utils.getDistanceFromStage(self.$element);

    var posInBasket = {
      left: self.width() / 2 - option.pixelWidth() / 2,
      top: self.height() / 2 - option.pixelHeight() / 2
    }
    targetPos.top += posInBasket.top;
    targetPos.left += posInBasket.left;

    var animationCompleteMethod = function () {
      self.$element.append(option.$element);
      option.$element.css({ top: 0, left: 0 });
      option.$element.css(posInBasket);

      var targetCss = {top: 0, left: 0}
      var animateDuration = 0;
      if (!cet.Content.isFreeGroupMode() || !self.isGroupMember()) {
        targetCss.width = '100%';
        targetCss.height = '100%';
        animateDuration = 400;
      }
      option.animate(targetCss, animateDuration);
      option.enable();
      option.showAsInTarget();
      self.showOccupied();


    }
    if (typeof softAnimation != 'undefined' && !softAnimation) {
      animationCompleteMethod();
      return;
    }

    option.animatePosition(targetPos, self.animateOptionToBasketDuration(), animationCompleteMethod);
  }
  basket.prototype.animateOptionToBasketDuration = function () {
    if (cet.Content.isFreeGroupMode())
      return 0;
    return 150;
  }

  basket.prototype.showOccupied = function () {

    var self = this;
    if (!isNaN(self.symbol.getLabelPosition('occupied')))
      self.symbol.stop('occupied');
  }
  basket.prototype.removeOption = function (option) {
    this._isValid = null;
    this.removeFeedback();
    this.option = null;
    this.symbol.stop('normal');
    var grp = cet.Groups.getGroupByBasket(this);
    if (grp)
      grp.removeFeedback();


  }
  basket.prototype.setZindex = function (val) {
    this.$element.css('z-index', val);
  }
  basket.prototype.getSymbolTypeName = function () {
    return this.symbol.getSymbolTypeName();
  }
  basket.prototype.getId = function () {
    //var val = this.$element.attr('class').split(' ')[2];
    //if (!val)
    //  val = this.$element.attr('class').split(' ')[1];
    //return val;

    var classes = this.$element.attr('class').split(' ')
    for (var i = 0; i < classes.length; i++) {
      if (classes[i].indexOf('basket-') != -1)
        return classes[i];
      if (classes[i].indexOf('basket') == 0 && classes[i].length > 'basket'.length)
        return classes[i];
    }
  }
  basket.prototype.isValid = function (val) {

    var self = this;

    if (typeof val != 'undefined')
      self._isValid = val;

    if (self._isValid != null)
      return self._isValid;

    if (!self.isVisible)
      return true;

    if (!self.isPopulated())
      return false;

  

    var option = self.getOption();
    var basketId = self.getId();
    for (var i = 0; i < option.baskets.length; i++) {
      if (option.baskets[i] == basketId)
        return true;
    }
    return false;

  }
  basket.prototype.showFeedback = function () {

    var self = this;
    self.$element.find('.feedback-correct, .feedback-error').hide();
    self.$element.addClass('feedback-visible');

    var feedbackIconSelector = '.feedback-';
    feedbackIconSelector += self.isValid() ? 'correct' : 'error';

    self.$element.find(feedbackIconSelector).css({ 'z-index': 1000, display: 'block' }).show();

  }
  basket.prototype.removeFeedback = function () {
    this.$element.removeClass('feedback-visible');
    this.$element.find('.feedback-correct, .feedback-error').hide();
  }
  basket.prototype.feedbackExists = function () {
    return this.$element.find('.feedback-correct, .feedback-error').is(':visible');
  }
  basket.prototype.getDropBox = function () {
    var self = this;
    var offset = self.$element.offset();
    var factor = 8;
    //self.$element.text(
    //  'top: '+ (offset.top - factor ) +
    //  ', left: ' + (offset.left - factor)
    //  )
    //self.$element.css('font-size', '14px')
    var box = {
      top: offset.top - factor,
      left: offset.left - factor,
      right: offset.left + (self.width() * cet.Stage.scale()) + factor,
      bottom: offset.top + (self.height() * cet.Stage.scale()) + factor
    }

    //box.top = box.top * cet.Stage.scale();
    //box.left = box.left * cet.Stage.scale();
    //box.right = box.right * cet.Stage.scale();
    //box.bottom = box.bottom * cet.Stage.scale();

    return box;
  }
  basket.prototype.width = function () {
    return this.$element.width();
  }
  basket.prototype.height = function () {
    return this.$element.height();
  }
  basket.prototype.isBoxOverlaping = function (box) {
    var self = this;
    if (box.right < self.dropBox.left) {
      return false;
    }

    if (box.left > self.dropBox.right) {
      return false;
    }
    if (box.top > self.dropBox.bottom) {
      return false;
    }
    if (box.bottom < self.dropBox.top) {
      return false;
    }
    return true;

  }
  basket.prototype.getOverlappingSize = function (box) {
    var self = this;
    var x = 0;
    if (self.dropBox.left <= box.right && box.right <= self.dropBox.right)
      x = box.right - self.dropBox.left;
    else
      x = self.dropBox.right - box.left;

    var y = 0;
    if (self.dropBox.bottom >= box.top && box.top >= self.dropBox.top)
      y = self.dropBox.bottom - box.top;
    else
      y = box.bottom - self.dropBox.top;


    return x + y;

  }
  basket.prototype.isPointContained = function (pointer) {
    var self = this;
    if (!self.isVisible)
      return false;
    if (!pointer)
      return false;
    if (pointer.pageX < self.dropBox.left || pointer.pageX > self.dropBox.right || pointer.pageY > self.dropBox.bottom || pointer.pageY < self.dropBox.top) {

      return false;
    }
    return true;

  }
  basket.prototype.getContainmentSize = function (pointer) {
    var self = this;
    var x = 0;
    var boxMiddleX = self.dropBox.left + ((self.dropBox.right - self.dropBox.left) / 2)

    if (pointer.pageX >= boxMiddleX)
      x = self.dropBox.right - pointer.pageX;
    else
      x = pointer.pageX - self.dropBox.left;


    var boxMiddleY = self.dropBox.top + ((self.dropBox.bottom - self.dropBox.top) / 2)
    if (pointer.pageY >= boxMiddleY)
      y = self.dropBox.bottom - pointer.pageY;
    else
      y = pointer.pageY - self.dropBox.top;

    return x + y;

  }
  basket.prototype.showHover = function () {

    if (this.isPopulated())
      return;
    if (this.symbol.getPosition() == this.hoverLabelPosition)
      return;
    this.symbol.stop('hover');
  }
  basket.prototype.hideHover = function () {

    if (this.isPopulated()) {
      return;
    }
    if (this.symbol.getPosition() == this.normalLabelPosition)
      return;
    this.symbol.stop('normal');
  }
  basket.prototype.contains = function () {
    return (this.option && this.option.getId() == option.getId());
  }
  basket.prototype.resizeHandler = function () {
    this.updateDropBox();;;;
    if (this.isPopulated())
      this.getOption().resizeHandler();
  }
  basket.prototype.position = function (newPosition) {
    if(newPosition)
      this.$element.css(newPosition);
    return this.$element.position();
  }
  basket.prototype.remove = function () {
    this.$element.remove();
  }
  basket.prototype.isExtra = function () {
   return this.$element.hasClass('extra');
  }
  basket.prototype.addClass = function (className) {
    this.$element.addClass(className);
  }
  basket.prototype.isGroupMember = function () {
    return this.$element.hasClass('group-member');
  }
  cet.basket = basket;

})();