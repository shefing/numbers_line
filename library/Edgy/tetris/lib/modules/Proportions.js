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
        case 3: return 29.6;
        case 4: return 22.7;
        case 5: return 18;
        case 6: return 15.1;
        default: return 33;
      };
    }

    function calculateBasketMarginLeft() {
      switch (Content.getNumberOfBaskets()) {
        case 2: return 6;
        case 3: return 3;
        case 4: return 2;
        case 5: return 1.5;
        case 6: return 1;
        default: return 33;
      };
    }

    function getFontClassName() {
      switch (Content.getFontSize()) {
        case 'small':
          return 'font-small';
        case 'medium':
          return 'font-medium';

        case 'large':
          return 'font-large';

        default:
          return 'font-medium';

      }

    }
    function calculateBasketsLeft() {
      var basketsWidth = Content.getNumberOfBaskets() * basketWidth;
      var marginsWidth = (Content.getNumberOfBaskets() - 1) * basketMarginLeft;
      return (100 - basketsWidth - marginsWidth) / 2
    }

    function calculateOptionHeight() {
      switch (Content.getNumberOfOptionsInBasket()) {
        case 2: return 29.6;
        case 3: return 4.8;
        case 4: return 22.7;
        case 5: return 18;
        case 6: return 15.1;
        default: return 33;
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

        optionHeight = 4.8
        optionMarginTop = 0.2;

        basketMarginLeft = calculateBasketMarginLeft();
        basketWidth = calculateBasketWidth();
        basketsLeft = calculateBasketsLeft();
        basketTitleHeight = 6.2;
        basketHeight = basketTitleHeight + Content.getNumberOfOptionsInBasket() * (optionHeight + optionMarginTop);

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
      getOptionWidth: function () { return optionWidth; },
      getBasketsLeft: function () { return basketsLeft; },
      getBasketMarginLeft: function () { return basketMarginLeft; },
      getBasketsTop: function () { return basketsTop; },
      getOptionStartingLeft: function () {
        var numberOfBaskets = Content.getNumberOfBaskets();
        var index = Math.floor((Math.random() * numberOfBaskets));
        return basketsLeft + (index * (basketWidth + basketMarginLeft)) + optionMarginLeft;

      }



    }
  })();


  cet.Proportions = Proportions;

})();