window.cet = window.cet || {};

(function () {

  var Proportions = (function () {

    //#region meta declarations

    var Audio;
    var option;
    var Baskets;
    var Content;
    var Stage;
    var Buttons;
    var Lms;
    var Feedback;
    var Lifes

    //#endregion

    var optionHeight;
    var optionMarginTop;
    var optionWidth;

    var basketWidth;
    var basketHeight;
    var basketsLeft;
    var basketMarginLeft;
    var basketsTop;
    var optionMarginLeft;
    var footerHeight;

    function calculateBasketWidth() {
      switch (Content.getNumberOfBaskets()) {
        case 2: return 29.6;
        case 3: return 22.6;
        case 4: return 22.7;
        case 5: return 18;
        case 6: return 15.1;
        default: return 33;
      };
    }

    function calculateBasketMarginLeft() {
      switch (Content.getNumberOfBaskets()) {
        case 2: return 4;
        case 3: return 7;
        case 4: return 2;
        case 5: return 1.5;
        case 6: return 1;
        default: return 33;
      };
    }

    function getFontClassName() {
      return 'font-small';
      switch (Content.getFontSize()) {
        case 'small':
          return 'font-small';
        case 'medium':
          return 'font-medium';

        case 'large':
          return 'font-large';

        default:
          return 'font-small';

      }

    }
    function calculateBasketsLeft() {
      var basketsWidth = Content.getNumberOfBaskets() * basketWidth;
      var marginsWidth = (Content.getNumberOfBaskets() - 1) * basketMarginLeft;
      switch (Content.getNumberOfBaskets()) {
        case 2: return 20.26;
        case 3: return 7.69;
      }
      return (7.69)
    }

    function calculateOptionHeight() {
      switch (Content.getNumberOfOptionsInBasket()) {
        case 2: return 23;
        case 3: return 23;
        case 4: return 23;
        case 5: return 23;
        case 6: return 23;
        default: return 23;
      };
    }
    return {
      init: function (compId) {
        //#region meta declarations
        Audio = cet.Audio;
        option = cet.option;
        Baskets = cet.Baskets;
        Content = cet.Content;
        Stage = cet.Stage;
        Buttons = cet.Buttons;
        Lms = cet.Lms;
        Feedback = cet.Feedback;
        Storage = cet.Storage;
        Lifes = cet.Lifes;

        //#endregion

        var self = this;

        Stage.addClass(getFontClassName());
        Stage.addClass(Content.getFontFamily());

        optionHeight = 35;
        optionMarginTop = 10;

        basketMarginLeft = calculateBasketMarginLeft();
        basketWidth = calculateBasketWidth();
        basketsLeft = calculateBasketsLeft();
        basketTitleHeight = 6.2;
        basketHeight = 144;

        footerHeight = 12.7;

        basketsTop = 100 - basketHeight - footerHeight;
        optionWidth = basketWidth;// * 0.85;
        optionMarginLeft = (basketWidth - optionWidth) / 2;

      },
      getOptionMarginTop: function () {
        return optionMarginTop;
      },
      getOptionHeight: function () {
        return optionHeight;
      }, 
      getBasketWidth: function () { return basketWidth; },
      getBasketHeight: function () { return basketHeight; },
      getBasketTitleHeight: function () { return basketTitleHeight; },
      getOptionWidth: function () {
        return basketWidth;
      },
      getBasketsLeft: function () { return basketsLeft; },
      getBasketMarginLeft: function () { return basketMarginLeft; },
      getBasketsTop: function () { return basketsTop; },
      getOptionStartingLeft: function () {
        var numberOfBaskets = Content.getNumberOfBaskets();
        var index = Math.floor((Math.random() * numberOfBaskets));
        return calculateBasketsLeft() + (index * (basketWidth + basketMarginLeft)) + optionMarginLeft;
      }



    }
  })();


  cet.Proportions = Proportions;

})();