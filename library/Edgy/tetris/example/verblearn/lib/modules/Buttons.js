window.cet = window.cet || {};

(function () {

  var Buttons = (function () {
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
    var App;
    var Lifes;

    //#endregion



    var btnRestart;
    var jqElementMuteOnBtn;
    var jqElementMuteOffBtn;
    var btnLeft;
    var btnRight;
    var btnDown;

    var mute = false;


    function btnRestartClickHandler() {

      App.restart();
      Stage.trigger('change', self);


    }

    function initNavigationButtons() {
      btnLeft = $('.button-left');
      btnRight = $('.button-right');
      btnDown = $('.button-down');

      btnLeft.on('mousedown touchstart', function () { Stage.trigger('leftArrowDown') });
      btnRight.on('mousedown touchstart', function () { Stage.trigger('rightArrowDown') });
      btnDown.on('mousedown touchstart', function () { Stage.trigger('downArrowKeyDown') });
      btnDown.on('mouseup touchend', function () { Stage.trigger('downArrowKeyUp') });
    }

    function initNavigationTouchEvents() {
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

    function initMuteButton() {

      jqElementMuteOnBtn = $('.mute-on');
      jqElementMuteOffBtn = $('.mute-off');

      jqElementMuteOffBtn.hide();

      jqElementMuteOnBtn.on('click', buttonMuteOnClickHandler);

      jqElementMuteOffBtn.on('click', buttonMuteOffClickHandler);
    }
    function buttonMuteOffClickHandler() {


      jqElementMuteOffBtn.hide();
      jqElementMuteOnBtn.show();

      mute = false;
      Audio.unmute();


    }
    function buttonMuteOnClickHandler() {

      jqElementMuteOffBtn.show();
      jqElementMuteOnBtn.hide();

      mute = true;
      Audio.mute();



    }

    function initRestartButton() {
      btnRestart = $('.button-restart');
      btnRestart.css('z-index', 1000);
      btnRestart.on('click', btnRestartClickHandler);
    }

    return {
      init: function () {
        //#region meta declarations
        App = cet.App;
        Audio = cet.Audio;
        option = cet.option;
        Baskets = cet.Baskets;
        Content = cet.Content;
        Stage = cet.Stage;
        Buttons = cet.Buttons;
        Lms = cet.Lms;
        Feedback = cet.Feedback;
        Lifes = cet.Lifes;

        //#endregion


        initRestartButton();

        initMuteButton()

        initNavigationButtons();

        //initNavigationTouchEvents();



        var keyCodes = { left: 37, up: 38, right: 39, down: 40, i: 73, enter: 13, b: 66, c: 67 };

        var keyUpOccurred = true;


        $(document).on("keydown", function (e) {

          var stopPropagation = false;

          if (e.ctrlKey && e.keyCode == keyCodes.i) { Stage.trigger('pauseResume') };
          if (e.ctrlKey && e.keyCode == keyCodes.b) {

            Lms.isBrowseMode(!Lms.isBrowseMode()) ? Lifes.show() : Lifes.hide();
            App.restart();
          };


          if (e.ctrlKey && e.keyCode == keyCodes.c) { App.check(); };
          if (e.keyCode == keyCodes.enter) { Stage.trigger('enterPress') };

          if (!keyUpOccurred)
            return false;
          keyUpOccurred = false;
          if (e.keyCode == keyCodes.left) { Stage.trigger('leftArrowDown'); stopPropagation = true };
          if (e.keyCode == keyCodes.right) { Stage.trigger('rightArrowDown'); stopPropagation = true };
          if (e.keyCode == keyCodes.down) { Stage.trigger('downArrowKeyDown'); stopPropagation = true };

          if (stopPropagation) {
            Buttons.stopPropagation();
            return false;
          }

        });
        $(document).on("keyup", function (e) {
          keyUpOccurred = true;
          if (e.keyCode == keyCodes.down) { Stage.trigger('downArrowKeyUp') };
        });

      },
      stopPropagation: function () {

        //IE9 & Other Browsers
        if (window.event.stopPropagation) {
          window.event.stopPropagation();
        }
          //IE8 and Lower
        else {
          window.event.cancelBubble = true;
        }
      },
      disableAll: function () {

        btnRestart.addClass('disabled');
        jqElementMuteOnBtn.addClass('disabled');
        jqElementMuteOffBtn.addClass('disabled');
        btnLeft.addClass('disabled');
        btnRight.addClass('disabled');
        btnDown.addClass('disabled');

        btnRestart.off('click');
        jqElementMuteOnBtn.off('click');
        jqElementMuteOffBtn.off('click');
      },
      enableAll: function () {
        Buttons.disableAll();

        btnRestart.removeClass('disabled');
        jqElementMuteOnBtn.removeClass('disabled');
        jqElementMuteOffBtn.removeClass('disabled');
        btnLeft.removeClass('disabled');
        btnRight.removeClass('disabled');
        btnDown.removeClass('disabled');

        btnRestart.bind('click', btnRestartClickHandler);

        jqElementMuteOnBtn.on('click', buttonMuteOnClickHandler);
        jqElementMuteOffBtn.on('click', buttonMuteOffClickHandler);

      },
      mute: function (cond) {
        if (cond) {
          buttonMuteOnClickHandler();
        }
        else {
          buttonMuteOffClickHandler();
        }
      },

      setZindexes: function (val) {

        btnRestart.css('z-index', val);
      },
      hideCheckButton: function () { }

    }
  })();
  cet.Buttons = Buttons;

})();