/// <reference path="http://cdn.cet.ac.il/libs/cet.content/1/client.js" />
/// <reference path="http://cdn.cet.ac.il/libs/cet.content.designtime/1/client.min.js" />
/// 

var Tetris = (function () {

  var _L;

  var basketTemplate;
  var optionTemplate;
  var $baskets;
  var bOldStyle = false;

  function isDeleteEvent(src) {

    if (!src.originalEvent)
      return false;

    if (src.originalEvent.target.className.indexOf('delete-icon') != -1)
      return true;

    if (src.originalEvent.target.className.indexOf('button-remove-basket') != -1)
      return true;

    return false;

  }
  function createOrUpdateAccordion() {

    try { $baskets.accordion('destroy') } catch (err) { }

    $baskets.accordion({
      header: ".basket-header",
      active: $baskets.children().length - 1,
      heightStyle: "content",
      collapsible: true,
      activate: function () {
        updateContainerHeight();
      },
      beforeActivate: function (event1, ui) {
        if (isDeleteEvent(event1))
          event1.preventDefault();
        updateContainerHeight();
        //ui.oldPanel.parent('.basket').find('.basket-title').html(ui.oldPanel.find('.basket-title-text').html());
      }
    })
    $baskets.sortable({
      axis: "y",
      handle: ".basket-header",
      stop: function (event, ui) {
        // IE doesn't register the blur when sorting
        // so trigger focusout handlers to remove .ui-state-focus
        ui.item.children("h3").triggerHandler("focusout");
      }
    });

    updateContainerHeight();

  }
  function stopPropagation(e) {
    if (!e)
      e = window.event;

    //IE9 & Other Browsers
    if (e.stopPropagation) {
      e.stopPropagation();
    }
      //IE8 and Lower
    else {
      e.cancelBubble = true;
    }

  }
  function updateContainerHeight() {
    cet.content.UI.setHeight($('body').height() + 50);
  }
  function setBasketTemplate() {
    var basket = $('#templates .basket').clone();
    basket.find('li').remove();
    var options = '';
    var optionsInBasket = parseInt($('#select-options-in-basket').val());
    for (var i = 0; i < optionsInBasket; i++) {
      options += optionTemplate;
    }
    basket.find('ul').append(options)
    basketTemplate = basket.clone().wrap('<div>').parent().html();
  }
  function setOptionTemplate() {
    optionTemplate = $('#templates .basket li').clone().wrap('<div>').parent().html();
  }

  function decode(str)
  {
    return (bOldStyle) ? decodeURIComponent(str) : str;
  }
  function getLangName() {
    return cet.content.RunTime.language;

    var lang = 'hebrew';

    switch (cet.content.RunTime.language) {
      case 'he':
        lang = 'hebrew';
        break;
      case 'ar':
        lang = 'arabic';
        break;
      case 'en':
        lang = 'english';
        break;
      case 'vi':
        lang = 'english';
        break;
    }

    return lang;
  }
  function changesDone() {
    cet.content.DesignTime.notifyChange();
  }
  $(function () {


    $('body').hide();
    window.addEventListener('localized', function () {
      $('body').show();

      setBasketTemplate();
    }, false);

    cet.content.on('clientready', function () {
      cet.content.DesignTime.onValidationRequested = Tetris.validate;
      cet.content.DesignTime.onPresetRequested = Tetris.serialize;
      Tetris.deserialize(cet.content.DesignTime.preset);



       var language = cet.content.DesignTime.language;
       document.webL10n = initWebL10n(window, document, undefined, language);
       document.webL10n.ready(function () {
         _L = document.webL10n.get;

         $('html').attr('lang', language);
         $('body').attr('data-dir', document.webL10n.getDirection());



       });

    });

    $baskets = $('#baskets');

    $baskets.on('click', '.button-add-option', function () {
      $(this).siblings('ul').append(optionTemplate);
      updateContainerHeight();
      changesDone();
    })

    $baskets.on('click', '.button-remove-option', function () {
      var removeMe = $(this).parent();
      removeMe.hide('fast', function () {
        removeMe.remove();
        updateContainerHeight();
      });
      changesDone();
    });

    $baskets.on('keyup', '.basket-title-input', function () {
      $(this).parents('.basket').find('.basket-title').html($(this).val())
      //      changesDone();
    });

    $("body").on("blur", ".option-text", function () {
      changesDone();
    });
    $("body").on("blur", ".basket-title-input", function () {
      changesDone();
    });

    $baskets.on('click', '.button-remove-basket', function (e, a) {
      var removeMe = $(this).parents('.basket');

      removeMe.fadeOut('slow', function () {
        removeMe.remove();
        $baskets.accordion("refresh");
        changesDone();
      });

    });

    $('#button-add-busket').on('click', function () {

      $baskets.append(basketTemplate);
      createOrUpdateAccordion();
      changesDone();
    })


    $('#select-lifes').on('change', function () {
      changesDone();
    });

    $('#select-options-in-basket').on('change', function () {
      setBasketTemplate();
      changesDone();
    });

    $('#select-multiple-dropping-options-number').on('change', function () {
      changesDone();
    });



    $("input:radio[name=font]").on('change', function () {
      changesDone();
    });

    setOptionTemplate();
    setBasketTemplate();
    createOrUpdateAccordion();
    updateContainerHeight();

  })


  return {


    validate: function () {
      var preset = Tetris.buildPreset(); //JSON.parse(Tetris.serialize());
      var errors = [];
      var baskets = {};
      if (preset.baskets.length < 2)
        errors.push(_L('inputTwoBasketsError'));
      if (preset.baskets.length > 6)
        errors.push(_L('upToSixBasketsError'));
      for (var i = 0; i < preset.baskets.length; i++) {
        if (!preset.baskets[i].name && errors.indexOf(_L('inputTitleError')) == -1)
          errors.push(_L('inputTitleError'));
        baskets[preset.baskets[i].id] = 0;
      }
      for (var i = 0; i < preset.options.length; i++) {
        if (preset.options[i].text)
          baskets[preset.options[i].baskets[0]]++;
      }

      for (var i = 0; i < preset.baskets.length; i++) {
        if (baskets[preset.baskets[i].id] < preset.random.optionsInBasket) {
          //var basketName = '\'' + decodeURIComponent(preset.baskets[i].name ? preset.baskets[i].name : 'חסר כותרת') + '\' ';
          //var basketName = '\'' + (preset.baskets[i].name ? preset.baskets[i].name : 'חסר כותרת') + '\' ';
          //AZ
          var basketName = '\'' + decode(preset.baskets[i].name ? preset.baskets[i].name : _L('missingTitleError')) + '\' ';
          errors.push(_L('basket') +' ' + basketName + ' ' + _L('notEnoughWordsError'))
        }
      }

      if (errors.length == 0)
        return true;
      return errors;

    },
    buildPreset: function () {
      var preset = {
        "lifes": $('#select-lifes').val() == 'eternal' ? 'eternal' : parseInt($('#select-lifes').val()),
        "welcomeSound": "",
        "droppingOptions": {
          "droppingDuration": 10000,
          "multipleDroppingOptions": parseInt($('#select-multiple-dropping-options-number').val()) > 1,
          "concurrentOptionsNumber": parseInt($('#select-multiple-dropping-options-number').val())
        },
        "random": {
          "options": true,
          "optionsInBasket": parseInt($('#select-options-in-basket').val()),
          "numberOfBaskets": $('#baskets .basket').length
        },

        "font": {
          "size": $("input:radio[name=font]:checked").val(),
          //"family": $("input:radio[name=language]:checked").val()
          "family": getLangName()

        },

        "feedback": {
          //"successText": _L('successText'),
          //"failureText": _L('failureText'),
          //"successText": Resources.current.feedback.successText,
          //"failureText": Resources.current.feedback.failureText,
          "showFinalFeedback": true,
          "errorsRemoval": "automaticaly"

        },
        "baskets": [],
        "options": []

      }

      var $baskets = $('#baskets .basket');
      for (var i = 0; i < $baskets.length; i++) {
        //preset.baskets.push({ "id": "basket" + i, "name": encodeURIComponent($($baskets[i]).find('.basket-title-input').val()) })
        preset.baskets.push({ "id": "basket" + i, "name": $($baskets[i]).find('.basket-title-input').val() });
        var $options = $($baskets[i]).find('.options .option-text');
        for (var j = 0; j < $options.length; j++) {
          //var text = encodeHtml($($options[j]).val());
          var text = $($options[j]).val();
          if (!text)
            continue;
          preset.options.push({
            "text": text,
            "id": "option" + i + j,
            "sound": "",
            "image": "",
            "baskets": ["basket" + i]
          });
        }
      }

      return preset;
    },

    serialize: function () {
      var preset = Tetris.buildPreset();
      var sPreset = JSON.stringify(preset);
      var sEncodedPreset = encodeURIComponent(sPreset);
      return sEncodedPreset;

    },
    deserialize: function (preset) {
      if (preset) {
        // AZ - bOldStyle means - preset isn't encoded but inner elements are and needed be decoded on loading
        bOldStyle = true;
        if (preset.substr(0, 3) == '%7B') {
          bOldStyle = false;
          preset = decodeURIComponent(preset);
        }
        preset = JSON.parse(preset);

        $('#select-lifes').val(preset.lifes);
        $('#select-options-in-basket').val(preset.random.optionsInBasket);
        setBasketTemplate();

        var fontId;
        switch (preset.font.size) { case 'small': fontId = 'fontSmall'; break; case 'medium': fontId = 'fontMedium'; break; case 'large': fontId = 'fontLarge'; }
        $('input:radio[id=' + fontId + ']').prop('checked', true);

        //var langId;
        //switch (preset.font.family) { case 'hebrew': langId = 'languageHebrew'; break; case 'arabic': langId = 'languageArabic'; break; }
        //$('input:radio[id=' + langId + ']').prop('checked', true);

        //Resources.reload();

        var multipleDroppingOptionsNumber = preset.droppingOptions.multipleDroppingOptions ? preset.droppingOptions.concurrentOptionsNumber : 1;
        $('#select-multiple-dropping-options-number').val(multipleDroppingOptionsNumber);

        for (var i = 0; i < preset.baskets.length; i++) {
          var $basket = $(basketTemplate);
          $basket.attr('id', preset.baskets[i].id);
          $basket.find('.basket-title-input').val(decode(preset.baskets[i].name));
          $basket.find('.basket-title').html(decode(preset.baskets[i].name));
          //$basket.find('.basket-title-input').val(preset.baskets[i].name);
          //$basket.find('.basket-title').html(preset.baskets[i].name);

          $baskets.append($basket)
        }

        for (var i = 0; i < preset.options.length; i++) {
          var $basket = $baskets.find('#' + preset.options[i].baskets[0]);
          var $option = null;
          var $options = $basket.find('li');
          for (var j = 0; j < $options.length; j++) {
            var $candidateOption = $($options[j]);
            if ($candidateOption.children('input').val() == '') {
              $option = $candidateOption;
              break;
            }
          }
          if (!$option) {
            $option = $(optionTemplate);
            $basket.find('ul').append($option)
          }
          $option.children('input').val(decode(preset.options[i].text));
          //$option.children('input').val(preset.options[i].text);
        }
      }

      if ($baskets.children().length == 0) {
        $baskets.append(basketTemplate);
      }

      createOrUpdateAccordion();

    }

  }


})();


//var Resources = (function () {
//  var resources = {
//    arabic: {
//      feedback: {
//        successText: _L('successText'),
//        failureText: _L('failureText')
//      }
//    },
//    hebrew: {
//      feedback: {
//        successText: _L('successText'),
//        failureText: _L('failureText')
//      }
//    },
//    english: {
//      feedback: {
//        successText: _L('successText'),
//        failureText: _L('failureText')
//      }
//    }

//  }
//  $(function () {
//    $("input:radio[name=language]").on('change', function () {
//      Resources.current = this.value == 'hebrew' ? resources.hebrew : resources.arabic;
//      cet.content.DesignTime.notifyChange();
//    })
//    Resources.current = resources.hebrew;
//  });
//  return {
//    current: {},
//    reload: function () {
//      Resources.current = $("input:radio[name=language]:checked").val() == 'hebrew' ? resources.hebrew : resources.arabic;
//    }
//  }
//})();

