

cet.DroppingOptions.init = function () {

  Content = cet.Content;
  Stage = cet.Stage;
  App = cet.App;
  Audio = cet.Audio;

  if (!Content.getShowFinalFeedback())
    return;
  jqElement = $('.final-feedback');
  jqElement.css('z-index', 1000);
  jqElement.hide();

  jqElementSuccess = jqElement.find('.final-feedback-success');
  symbolSuccess = Stage.getSymbol(jqElementSuccess);

  jqElementFailure = jqElement.find('.final-feedback-failure');
  symbolFailure = Stage.getSymbol(jqElementFailure);

  //verblearn
  jqElement.find('.button-feedback-close').on('click', function () {
    Feedback.hide();
    $('body').trigger('done_game');
  })
  //verblearn

  jqElement.find('.try-again').on('click', App.restart);

  Audio.load('FeedbackBad')
  Audio.load('FeedbackGood')
}
cet.App.restart = function () {
  //verblearn
  pause = false;
  //verblearn
  cet.DroppingOptions.pause();
  cet.Feedback.hide();
  cet.Baskets.unpopulate();
  cet.Lifes.restart();
  if (!cet.DroppingOptions.isEmpty()) {
    cet.Storage.addOptions(DroppingOptions.removeAll());
  }
  cet.Lms.isBrowseMode() ? cet.Storage.shuffleOptions() : cet.Storage.reloadOptionsContent();
  cet.DroppingOptions.startDropping();

}


cet.StartDialog.show = function () {
  jqElement.show();
};

cet.Baskets.sortBasketsByLeftPosition = function (a, b) {
  return a.leftAsNumber() > b.leftAsNumber();
}

cet.Baskets.getHorizontalShift = function () {

  horizontalShift = 11111111111111;
  for (var i = 1; i < basketsArray.length; i++) {
    var tmpShift = basketsArray[i].leftAsNumber() - basketsArray[0].leftAsNumber();
    if (tmpShift < horizontalShift)
      horizontalShift = tmpShift;
  }
  return horizontalShift;
}

cet.Baskets.overideInit = function (Baskets) {
  var baskets = Baskets.getBaskets();
  for (key in baskets) {
    baskets[key].jqElement.remove();
  }
  $('#baskets-background').remove();
}



cet.Preloader.show = function () {
  var preloader = $('#cet-preloader');
  if (!preloader.length) {
    $('body').append(html);
  }
}

cet.App.initMessaging = function() {
  cet.content.Messaging.subscribe('getreq', 'userDidSomeWork', function (app, msg) {
    var baskets = Baskets.getPopulation();
    for (var k in baskets) {
      if (baskets[k].length > 0) {
        return true;
      }
    }
    return false;
  })

  cet.content.Messaging.subscribe('set', 'new.content', function (content) {
    cet.Preloader.show();
    //App.restart();
    //Stage.trigger('change', this);
    //     pause = false;
    cet.DroppingOptions.pause();
    Feedback.hide();
    Baskets.unpopulate();
    Lifes.restart();
    //DroppingOptions.removeAll()
    if (!cet.DroppingOptions.isEmpty()) {
      Storage.addOptions(cet.DroppingOptions.removeAll());
    }

   

    cet.content.Settings.preset = content.value.preset;
    Content.init();

    var state = App.getState();

    App.restoreState(state);
    cet.Preloader.hide();

    StartDialog.show();

    //  Lms.isBrowseMode() ? Storage.shuffleOptions() : Storage.reloadOptionsContent();
    if (content.toRestart) {
      pause = false;

      DroppingOptions.startDropping();

    }
    else {
      StartDialog.show();
    }

  })
}

cet.App.inited = false;

//cet.App.init = function (compId) {
//  //#region meta declarations
//  Audio = cet.Audio;
//  option = cet.option;
//  Baskets = cet.Baskets;
//  Content = cet.Content;
//  Stage = cet.Stage;
//  Buttons = cet.Buttons;
//  Lms = cet.Lms;
//  Feedback = cet.Feedback;
//  Storage = cet.Storage;
//  Lifes = cet.Lifes;
//  Proportions = cet.Proportions;
//  StartDialog = cet.StartDialog;
//  Resources = cet.Resources;
//  DroppingOptions = cet.DroppingOptions;

//  //#endregion

//  $body = $('body');
//  $window = $(window);

//  var self = this;
//  self.addNoScaleMetaTag();
//  self.composition(AdobeEdge.getComposition(compId));
//  Stage.init();
//  //Stage.eliminateIPadBounceEffect();


//  Stage.bind('contentReady', function () {

//    Audio.init();
//    Proportions.init();
//    Baskets.init();
//    Storage.init();
//    Buttons.init();
//    Lms.init();
//    Feedback.init();
//    Lifes.init();

//    initLmsBrowseMode();
//    setLocalizedResources();
//    adjustSize();


//    cet.Button.init();
//    if (this.inited) {
//      return;
//    }
//    StartDialog.init();
//    this.initMessaging();
//    $('#Stage_start-dialog_disableBG').css('height', '62px');

//    Stage.on('leftArrowDown', function () {
//      if (!DroppingOptions.getLeadingOption() || !DroppingOptions.getLeadingOption().canMoveLeft())
//        return;
//      DroppingOptions.getLeadingOption().shiftLeft();
//    })
//    Stage.on('rightArrowDown', function () {
//      if (!DroppingOptions.getLeadingOption() || !DroppingOptions.getLeadingOption().canMoveRight())
//        return;
//      DroppingOptions.getLeadingOption().shiftRight();
//    })

//    Stage.on('downArrowKeyDown', function () {
//      if (DroppingOptions.getLeadingOption())
//        DroppingOptions.getLeadingOption().dropFaster();
//    })
//    Stage.on('downArrowKeyUp', function () {

//      if (DroppingOptions.getLeadingOption())
//        DroppingOptions.getLeadingOption().dropSlower();
//    })
//    Stage.on('dropCompleted', function (droppedOption) {
//      if (Lms.isBrowseMode()) {
//        dropCompletedBrowseModeHandler(droppedOption);
//      }
//      else {
//        dropCompletedHandler(droppedOption);
//      }

//    })

//    Stage.on('pauseResume', function () {
//      App.isPaused() ? App.resume() : App.pause();
//    })
//    Stage.on('startClick', function () {
//      applyTabletsSoundsHack();
//      applyAndroidRendringFix()
//      DroppingOptions.startDropping();
//    })
//    this.inited = true;
//  });
//  Content.init();
//  $(window).resize(function () { adjustSize(); });


//}

cet.Storage.overideInit= function (options) {
  for (var key in options) {
    options[key].jqElement.remove();

  }
}



cet.option.prototype.position = function (newPosition, fromResize) {
  if (newPosition) {
    if (fromResize) {
      this.jqElement.css({ 'left': newPosition.left, 'top': newPosition.top, 'display': 'block' }).css({ 'bottom': newPosition.bottom, 'top': 'initial' });
    }
    else {
      this.jqElement.animate({ 'left': newPosition.left, 'top': newPosition.top, 'display': 'block', 'bottom': newPosition.bottom }, {
        duration: 300
        , complete: function () {
          $(this).css({ 'bottom': newPosition.bottom, 'top': 'initial' });
        }
      });
    }

  }
  return { top: this.top(), left: this.left() };
}
cet.option.prototype.showAsInBasket = function (basketId) {
  var self = this;

  this.jqElement.addClass('dropped');
  this.hostBasketId = basketId;

  this.jqElement.find('.option-background').css({ 'background-color': 'transparent', 'z-index': 20, 'background-image': 'none', '-webkit-box-shadow': 'none', 'box-shadow': 'none', 'height': '100%' });
  //start from verblearn
  this.jqElement.find('.text').css({ 'color': '#313131', 'top': '0', 'height': '100%', 'padding-top': '0', 'z-index': 20, 'line-height': '23px', 'font-size': '18px' });
  //end from verblearn

  this.jqElement.css({ 'z-index': 20, 'height': '25px', 'padding-top': '0' });

  this.setFeedbacksProportions();
}
cet.option.prototype.startDropping = function () {
  var self = this;
  cet.droppingOption = this;
  self.endTop = cet.Baskets.getBasketTop()
  self.jqElement.css({ "top": "90px", "left": cet.Proportions.getOptionStartingLeft() + "%", 'width': '25%', 'height': '35px' });
  var background = self.jqElement.find('.option-background');

  //start verblearn
  background.css({ 'left': 'initial', 'position': 'relative', 'margin': 'auto', 'background-image': 'linear-gradient(#fff 0%, #9E9E9E 100%)' });
  //end verblearn
  var text = self.jqElement.find('.text');
  text.css({ 'margin-left': '-74px', 'left': '50%', 'top': '-3px', 'color': '#222222', 'padding-top': '4px', 'line-height': '30px', 'font-size': '20px' });
  self.jqElement.animate({ "top": self.endTop + 'px' }, {
    queue: false, duration: self.droppingDuration, easing: 'linear', complete: function () {

      cet.Stage.trigger('dropCompleted', self);
    },
    step: function (currentTop) {
      self.currentTop = currentTop;
    }
  });


}
cet.Buttons.initNavigationTouchEvents = function() {
  if (!Modernizr.touch)
    return;

  var swiped = false;
  $("body").swipe({
    swipeStatus: function (event, phase, direction, distance, duration, fingers) {
      if (distance < 10)
        swiped = false;
      if (!swiped && distance >= 10) {
        swiped = true;
        if (direction == 'right')
          cet.Stage.trigger('rightArrowDown');
        else if (direction == 'left')
          cet.Stage.trigger('leftArrowDown')
        else if (direction == 'down') {
          cet.Stage.trigger('downArrowKeyDown');
        }
      }

    },
    swipe: function (event, direction, distance, duration, fingerCount) {

      if (direction == 'down') {
        cet.Stage.trigger('downArrowKeyUp');
      }
    }
  });


}


cet.basket.prototype.initDropPositions = function () {
  var self = this;
  var Proportions = cet.Proportions;
    self.dropPositions = [];
    var numberOfDropPositions = cet.Content.getNumberOfOptionsInBasket();
    //var marginTop = Proportions.getOptionMarginTop();
    var marginTop = 0;

    var marginLeft = ((Proportions.getBasketWidth() - Proportions.getOptionWidth()) / 2);//3.99;
    //   var dropPositionHeight = Proportions.getOptionHeight();
    var basketTitleHeight = 50;
    var dropPositionHeight = 25;

    var dropPositionLeft = self.leftAsNumber() + marginLeft;
    for (var i = 0; i < numberOfDropPositions; i++) {
      var newTop = self.top() +
basketTitleHeight +
//cellHeightPrecents
+(marginTop + dropPositionHeight) * i;
      var newPosition = { left: dropPositionLeft + '%', top: newTop + 'px' };
      self.dropPositions.push(new cet.dropPosition(newPosition));
    }

  }


  cet.option.prototype.showAsInBasket = function (basketId) {
    var self = this;

    this.jqElement.addClass('dropped');
    this.hostBasketId = basketId;

    this.jqElement.find('.option-background').css({ 'background-color': 'transparent', 'z-index': 20, 'background-image': 'none', '-webkit-box-shadow': 'none', 'box-shadow': 'none', 'height': '100%' });
    this.jqElement.find('.text').css({ 'color': '#6F6F6F', 'top': '0', 'height': '100%', 'padding-top': '0', 'z-index': 20, 'line-height': '23px', 'font-size': '18px' });
    this.jqElement.css({ 'z-index': 20, 'height': '25px', 'padding-top': '0' });

    this.setFeedbacksProportions();
  }



  cet.Buttons.initNavigationTouchEvents= function () {
        return;

        if (!Modernizr.touch)
          return;

        var swiped = false;
        $("body").swipe({
          swipeStatus: function (event, phase, direction, distance, duration, fingers) {
            if (distance < 10)
              swiped = false;
            if (!swiped && distance >= 10) {
              swiped = true;
              if (direction == 'right')
                Stage.trigger('rightArrowDown');
              else if (direction == 'left')
                Stage.trigger('leftArrowDown')
              else if (direction == 'down') {
                Stage.trigger('downArrowKeyDown');
              }
            }

          },
          swipe: function (event, direction, distance, duration, fingerCount) {

            if (direction == 'down') {
              Stage.trigger('downArrowKeyUp');
            }
          }
        });


      }

    


cet.dropPosition.prototype.addOption = function (option, fromResize) {
  var self = this;
  self.option = option;
  //self.removeFeedback();

  option.position(this.position, fromResize)

}



