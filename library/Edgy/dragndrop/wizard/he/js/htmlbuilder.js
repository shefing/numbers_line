
var cet;
(function (cet) {
  (function (HtmlBuilder) {
    ///some of the css properties are here following 2 reasons
    ///1. number of options is changing from one content to another, and percentage implementation requires some calculations
    ///2. d&d requires some sizes to be on the element 'style' property.
    var nOptionPixelWidth = 119;
    var nOptionPixelMargin = 8;
    var nOptionPercentageWidth;
    var nOptionPercentageMargin;
    var nOptionPercentageHeight = 70;
    var nOptionPercentageTop = 14;
    var nOptionsPercentageTop = 0;

    var nStagePixelWidth = 860;
    var nStagePixelHeight = 557;
    

    var nStoragePercentageWidth = 88.4;
    var nStoragePercentageLeft = 5.8;
    var nStoragePixelWidth = ( nStoragePercentageWidth/100 ) * nStagePixelWidth;


    function build() {
      var stageInnerHtml = '<div class="canvas" ></div >' + '<div class="storage" >' + ' <div class="options" ></div >' + '</div >' + '<div class="button-navigation-left" ><svg ><use href="images/icons.svg#arrowLeft"></use></svg></div >' + '<div class="button-navigation-right" ><svg ><use href="images/icons.svg#arrowRight"></use></svg></div >' + '<div class="button-check" ></div >' + '<div class="button-restart" ></div >' + '<div class="storage-background-right" ></div >' + '<div class="storage-background-left" ></div >' + '<div class="buttons-background" ></div >' + '<div class="stage-border" ></div >' + '<div class="final-feedback" ></div>';

      var $stage = $('#stage');
      $stage.empty();
      $stage.append(stageInnerHtml);

      $stage.css('width', nStagePixelWidth + 'px');
      $stage.css('height', nStagePixelHeight + 'px');

      var $options = $stage.find('.options');

      var baskets = cet.dragndrop.Content.getBaskets();
      var options = cet.dragndrop.Content.getOptions();
      var groups = cet.dragndrop.Content.getGroups();
      var medias = cet.dragndrop.Content.getMedias();

      var $storage = $stage.find('.storage');
      var $storageR = $stage.find('.storage-background-right');
      var $storageL = $stage.find('.storage-background-left');
      var $stageBorder = $stage.find('.stage-border');
      $storage.css({
        width: nStoragePercentageWidth + '%',
        left: nStoragePercentageLeft + '%'
      });
      if (cet.dragndrop.Content.getStorageBackgroundColor() && (cet.dragndrop.Content.getStorageBackgroundColor()).toUpperCase() != "#4A4D52") {
        $storage.css('background-color', cet.dragndrop.Content.getStorageBackgroundColor());
        $storageR.css('background-color', cet.dragndrop.Content.getStorageBackgroundColor());
        $storageL.css('background-color', cet.dragndrop.Content.getStorageBackgroundColor());
      }

      if (cet.dragndrop.Content.getBorderColor())
        $stageBorder.css('background-color', cet.dragndrop.Content.getBorderColor());



      var $arrowL = $stage.find('.button-navigation-left svg');
      var $arrowR = $stage.find('.button-navigation-right svg');
      if (cet.dragndrop.Content.getStorageStorageArrowColor() && (cet.dragndrop.Content.getStorageBackgroundColor()).toUpperCase() != "#4A4D52") {        
        $arrowL.css({ stroke: cet.dragndrop.Content.getStorageStorageArrowColor() });
        $arrowR.css({ stroke: cet.dragndrop.Content.getStorageStorageArrowColor() });
      } else {
        $arrowL.css({ stroke: '#FFFFFF' });
        $arrowR.css({ stroke: '#FFFFFF' });
      }

      var nOptionsPixelWidth = ((nOptionPixelWidth + nOptionPixelMargin) * options.length) + nOptionPixelMargin;
      var nOptionsPercentageWidth = (nOptionsPixelWidth / nStoragePixelWidth) * 100;

      nOptionPercentageWidth = (nOptionPixelWidth / nOptionsPixelWidth) * 100;
      nOptionPercentageMargin = (nOptionPixelMargin / nOptionsPixelWidth) * 100;

      $options.css({
        width: nOptionsPercentageWidth + '%',
        top: nOptionsPercentageTop + '%'
      });

      var optionsLeft = (100 - nOptionsPercentageWidth) / 2;

      if (options.length > 6 && options.length % 2 != 0)
        optionsLeft = optionsLeft + 8.5;

      $options.css('left', optionsLeft + '%');

      $options.empty();
      var $canvas = $stage.find('.canvas');

      for (var i = 0; i < baskets.length; i++) {
        $canvas.append(buildBasketHtml(baskets[i]));
      }
      for (var i = 0; i < options.length; i++) {
        $options.append(buildOptionHtml(options[i], i));
      }

      for (var i = 0; i < groups.length; i++) {
        $canvas.append(buildGroupHtml(groups[i]));
      }

      for (var i = 0; i < medias.length; i++) {
        $canvas.append(buildMediaHtml(medias[i]));
      }

      fixTextVerticalAlignment();
      fixFinalFeedbackAnimationFlash();

      if (cet.dragndrop.Content.getBackgroundImage())
        $canvas.css('background-image', 'url(' + cet.dragndrop.Content.getBackgroundImage() + ')');

      if (cet.dragndrop.Content.getBackgroundColor())
        $canvas.css('background-color', cet.dragndrop.Content.getBackgroundColor());

      $stage.addClass(getFontSizeClassName());
      if (getFontSizeClassName() == "font-other") {
        var fontSizePx = cet.dragndrop.Content.getFontSizePx();
        var classSizeName = "size-" + fontSizePx;
        $stage.addClass(classSizeName);
      }
      if (cet.dragndrop.Content.getFontName()) {
        $stage.css('font-family', cet.dragndrop.Content.getFontName());
      }
      if ((cet.dragndrop.Localization.language == "ar" && cet.dragndrop.Content.getFontName() && cet.dragndrop.Content.getFontName() == "Alef") 
          || (cet.dragndrop.Localization.language == "ar" && !cet.dragndrop.Content.getFontName())) {
        $stage.css('font-family', 'Amiri-Bold');
      }
      $stage.addClass(cet.dragndrop.Localization.language);

      if (cet.dragndrop.Content.isFreeGroupMode())
        $stage.addClass('free-group');

      $stage.find('.final-feedback').append(getFinalFeedbackHtml());

      if (baskets.length < 7)
        $stage.find('.button-navigation-left, .button-navigation-right').hide();

      if (cet.dragndrop.Content.isNonePerishableStorage())
        $.extend(cet.dragndrop.Storage, cet.dragndrop.NonPerishableStorage);

      return $stage;
    }
    HtmlBuilder.build = build;

    function fixFinalFeedbackAnimationFlash() {
      //seems like causing performance issues in tablets, and not necessary
      if (!(Modernizr.touch))
        $('#stage').css('-webkit-backface-visibility', 'hidden');
    }

    function fixTextVerticalAlignment() {
      setTimeout(function () {
        var options = $('.option .text');
        for (var i = 0; i < options.length; i++) {
          var opt = options[i];
          if ((opt.clientHeight / opt.scrollHeight) < 0.8)
            $(opt).css('height', '100%');
        }
      }, 500);
    }

    function getFontSizeClassName() {
      switch (cet.dragndrop.Content.getFontSize()) {
        case 'small':
          return 'font-small';
        case 'medium':
          return 'font-medium';
        case 'large':
          return 'font-large';
        case 'other':
          return 'font-other';
        default:
          return 'font-medium';
      }
    }

    function getFinalFeedbackHtml() {
      return '' + ' <div class="final-feedback-failure" >' + '  <div class="final-feedback-fade" ></div>' + '  <div class="final-feedback-popup" >' + '   <div class="final-feedback-popup-rectangle" ></div>' + '    <img class="final-feedback-popup-opening" src="images/UI/tetris_opening.svg" >' + '  </div>      ' + '  <div class="edge-btn try-again" >' + '   <div class="try-again-ellipse" ></div>' + '   <div class="try-again-restart-icon-anim" >' + '     <img class="try-again-restart-icon-anim-img" src="images/UI/tetris_restartIcon.svg" >' + '   </div>    ' + '  </div>      ' + '  <div class="feedback-text" ></div>' + '  <div class="button-feedback-close edgy-button" >' + '     <div class="button-feedback-close-background" ></div>' + '     <div class="button-feedback-close-x eg-svg-image" ></div>' + '  </div>    ' + ' </div>      ' + ' <div class="final-feedback-success" symbol="finalFeedbackSuccess" >' + '  <div class="final-feedback-fade" ></div>' + '  <div class="final-feedback-popup" >' + '   <div class="final-feedback-popup-rectangle" ></div>' + '   <img class="final-feedback-popup-opening" src="images/UI/tetris_opening.svg" >' + '  </div>    ' + '  <img class="final-feedback-stars" src="images/UI/tetris_stars.svg" >' + '  <img class="final-feedback-ribbon" src="images/UI/tetris_feedbackRibbon.svg" >' + '  <div class="feedback-text" ></div > ' + '  <div class="button-feedback-close edgy-button" >' + '    <div class="button-feedback-close-background" ></div>' + '    <div class="button-feedback-close-x eg-svg-image" ></div>' + '  </div>' + ' </div>';
    }

    function buildBasketHtml(basket) {
      var op = "";
      if (basket.opacity == 0.1) {
        basket.opacity = 0;
        op = "opacity:0;";
      }
      var template = Handlebars.compile(
        '<div class="basket {{id}} {{hidden}}" style="{{styleProperty \'width\' width \'%\'}}; {{styleProperty \'height\' height \'%\'}} {{styleProperty \'top\' top \'%\'}} {{styleProperty \'left\' left \'%\'}} border-color:{{borderColor}}; {{styleProperty \'opacity\' opacity}} '+op+'" >' +
          '<div class="feedback-error" ></div> ' +
          '<div class="feedback-correct" ></div > ' +
          '<div class="background-color" style="background-color:{{backgroundColor}}" ></div > ' +
        '</div> ');
      basket.hidden = basket.hiddenOnRuntime ? 'hidden' : '';
      return template(basket);
    }
    HtmlBuilder.buildBasketHtml = buildBasketHtml;

    function buildGroupHtml(group) {
      var template = Handlebars.compile(
        '<div class="group {{id}}" style="width:{{width}}%; height:{{height}}%; top: {{top}}%; left :{{left}}%; border-color:{{borderColor}};  " >' +
          '<div class="feedback-error" ></div> ' +
          '<div class="feedback-correct" ></div> ' +
          '<div class="background-color" style="background-color:{{backgroundColor}}; opacity: {{opacity}};" ></div > ' +
        '</div> ');
      return template(group);
    }

    function buildMediaHtml(media) {
      var template = Handlebars.compile('<div class="media {{id}}" style="width:{{width}}%; height:{{height}}%; top: {{top}}%; left :{{left}}%; color:{{color}}; border-color:{{borderColor}}; opacity: {{opacity}}; background-color:{{backgroundColor}}; background-image:url({{image}})" ><div class="text-parent"><span class="text">{{text}}</span></div></div> ');
      return template(media);
    }

    function buildOptionHtml(option, i) {
      var left = i * (nOptionPercentageWidth + nOptionPercentageMargin) + nOptionPercentageMargin;
      var template = Handlebars.compile('<div class="option {{id}}" style="position:absolute; width:{{width}}%; height:{{height}}%; left:{{left}}%; top: {{top}}%; color: {{color}}" ><div class="text-parent" ><div class="text"></div></div></div>');
      return template({ id: option.id, left: left, width: nOptionPercentageWidth, height: nOptionPercentageHeight, top: nOptionPercentageTop, color: option.color });
    }

    //#region public properties
    Object.defineProperty(cet.dragndrop.HtmlBuilder, 'OptionPercentageWidth', {
      get: function () {
        return nOptionPercentageWidth;
      }
    });

    Object.defineProperty(cet.dragndrop.HtmlBuilder, 'OptionPercentageHeight', {
      get: function () {
        return nOptionPercentageHeight;
      }
    });

    Object.defineProperty(cet.dragndrop.HtmlBuilder, 'OptionPercentageTop', {
      get: function () {
        return nOptionPercentageTop;
      }
    });

    Object.defineProperty(cet.dragndrop.HtmlBuilder, 'OptionPercentageMargin', {
      get: function () {
        return nOptionPercentageMargin;
      }
    });

    //#endregion
    Handlebars.registerHelper('styleProperty', function (name, value, value2) {
      
      if (!value)
        return '';
      if (typeof value2 == "string")
        value = value + value2;
      return name + ': ' + value + ';';
    });
  })(cet.dragndrop.HtmlBuilder || (cet.dragndrop.HtmlBuilder = {}));
  var HtmlBuilder = cet.dragndrop.HtmlBuilder;
})(cet || (cet = {}));
