
var wizard;
(function (wizard) {
  var _L;

  var nOptionPixelWidth = 100;
  var nOptionPixelMargin = 10;
  var nOptionPercentageWidth;
  var nOptionPercentageMargin;
  var nOptionPercentageHeight = 90;
  var nOptionPercentageTop = 5;

  var nStagePixelWidth = 800;
  var nStagePixelHeight = 600;

  var nStoragePercentageWidth = 83;
  var nStoragePercentageLeft = 9;
  var nStoragePixelWidth = (nStoragePercentageWidth * nStagePixelWidth) / 100;

  var $backgroundColor;
  var $borderColor;

  var $MdistractorBackgroundColor;
  var $MdistractorArrowColor;

  var $basketBackgroundColor;
  var $basketBorderColor;
  var $basketShowBorderOn;
  var $basketShowBorderOff;
  var $basketTransparency;

  var $groupBackgroundColor;
  var $groupBorderColor;
  var $groupShowBorderOn;
  var $groupShowBorderOff;
  var $groupTransparency;

  var $mediaBackgroundColor;
  var $mediaBorderColor;
  var $mediaShowBorderOn;
  var $mediaShowBorderOff;
  var $mediaTransparency;

  var $fontSizeSmall;
  var $fontSizeMedium;
  var $fontSizeLarge;

  var $languageHebrew;
  var $languageArabic;

  var $perishableStorageTrue;
  var $perishableStorageFalse;

  var $freeGroupModeTrue;
  var $freeGroupModeFalse;
  var $body;

  var basketOpacityType = { on: 0.7, off: 1 };
  var alertRequest;

  function initTabs() {
    var $tabTitles = $('.tab-title');
    var $tabContents = $('.tab-content');

    $tabTitles.on('click', function (title) {
      $tabTitles.removeClass('selected');
      $tabContents.hide();

      var selectedTab = $(this);
      selectedTab.addClass('selected');
      $('.tab-content[data-tab=' + selectedTab.attr('data-tab') + ']').show();
    });

    $tabTitles.first().trigger('click');
  }

  function initBasketsCommonFields() {
    $basketBackgroundColor = $('#basket-background-color');
    $basketBackgroundColor.on('change', function (color) {
      var newColor = '#' + $basketBackgroundColor[0].color.toString();
      var baskets = Baskets.getBaskets();
      for (var i = 0; i < baskets.length; i++) {
        baskets[i].backgroundColor = newColor;
      }
      wizard.changesDone();
    });

    $basketBorderColor = $('#basket-border-color');
    $basketBorderColor.on('change', function (color) {
      var newColor = '#' + $basketBorderColor[0].color.toString();
      var baskets = Baskets.getBaskets();
      for (var i = 0; i < baskets.length; i++) {
        baskets[i].borderColor = newColor;
      }
      wizard.changesDone();
    });

    $perishableStorageTrue = $('#perishable-storage-true');
    $perishableStorageFalse = $('#perishable-storage-false');

    $freeGroupModeTrue = $('#free-group-mode-true');
    $freeGroupModeFalse = $('#free-group-mode-false');
    $('#free-group-mode-true, #free-group-mode-false').on('change', function () {
      wizard.changesDone();
    });


    $basketTransparency = $('#basket-transparency');
    $basketTransparency.on('input change', function (color) {
      var opacity = $basketTransparency.val() / 10;
      var baskets = Baskets.getBaskets();
      for (var i = 0; i < baskets.length; i++) {
        baskets[i].opacity = opacity;
      }
      wizard.changesDone();
    });

    $basketShowBorderOn = $('#basket-show-border-on');
    $basketShowBorderOff = $('#basket-show-border-off');

    $('#basket-show-border-off, #basket-show-border-on').on('change', function () {
      if ($basketShowBorderOff.is(':checked')) {
        $basketBorderColor.css({
          'background-color': 'rgb(235, 235, 228)',
          'color': 'rgb(84, 84, 84)'
        });
        $basketBorderColor.attr('disabled', true);
      } else {
        wizard.basketBorderColor = wizard.basketBorderColor;
        $basketBorderColor.attr('disabled', false);
      }

      var baskets = Baskets.getBaskets();
      var color = wizard.basketBorderColor;
      for (var i = 0; i < baskets.length; i++) {
        baskets[i].borderColor = color;
      }
      wizard.changesDone();
    });
  }

  function initGroupsCommonFields() {
    $groupBackgroundColor = $('#group-background-color');
    $groupBackgroundColor.on('change', function (color) {
      var newColor = '#' + $groupBackgroundColor[0].color.toString();
      var groups = Groups.getGroups();
      for (var i = 0; i < groups.length; i++) {
        groups[i].backgroundColor = newColor;
      }
      wizard.changesDone();
    });

    $groupBorderColor = $('#group-border-color');
    $groupBorderColor.on('change', function (color) {
      var newColor = '#' + $groupBorderColor[0].color.toString();
      var groups = Groups.getGroups();
      for (var i = 0; i < groups.length; i++) {
        groups[i].borderColor = newColor;
      }
      wizard.changesDone();
    });

    $groupTransparency = $('#group-transparency');
    $groupTransparency.on('input change', function (color) {
      var opacity = $groupTransparency.val() / 10;
      var groups = Groups.getGroups();
      for (var i = 0; i < groups.length; i++) {
        groups[i].opacity = opacity;
      }
      wizard.changesDone();
    });

    $groupShowBorderOn = $('#group-show-border-on');
    $groupShowBorderOff = $('#group-show-border-off');

    $('#group-show-border-off, #group-show-border-on').on('change', function () {
      if ($groupShowBorderOff.is(':checked')) {
        $groupBorderColor.css({
          'background-color': 'rgb(235, 235, 228)',
          'color': 'rgb(84, 84, 84)'
        });
        $groupBorderColor.attr('disabled', true);
      } else {
        wizard.groupBorderColor = wizard.groupBorderColor;
        $groupBorderColor.attr('disabled', false);
      }

      var groups = Groups.getGroups();
      var color = wizard.groupBorderColor;
      for (var i = 0; i < groups.length; i++) {
        groups[i].borderColor = color;
      }
      wizard.changesDone();
    });
  }

  function initMediasCommonFields() {
    $mediaBackgroundColor = $('#media-background-color');
    $mediaBackgroundColor.on('change', function (color) {
      var newColor = '#' + $mediaBackgroundColor[0].color.toString();
      var medias = Medias.getMedias();
      for (var i = 0; i < medias.length; i++) {
        medias[i].backgroundColor = newColor;
      }
      wizard.changesDone();
    });

    $mediaBorderColor = $('#media-border-color');
    $mediaBorderColor.on('change', function (color) {
      var newColor = '#' + $mediaBorderColor[0].color.toString();
      var medias = Medias.getMedias();
      for (var i = 0; i < medias.length; i++) {
        medias[i].borderColor = newColor;
      }
      wizard.changesDone();
    });

    $mediaTransparency = $('#media-transparency');
    $mediaTransparency.on('input change', function (color) {
      var opacity = $mediaTransparency.val() / 10;
      var medias = Medias.getMedias();
      for (var i = 0; i < medias.length; i++) {
        medias[i].opacity = opacity;
      }
      wizard.changesDone();
    });

    $mediaShowBorderOn = $('#media-show-border-on');
    $mediaShowBorderOff = $('#media-show-border-off');

    $('#media-show-border-off, #media-show-border-on').on('change', function () {
      if ($mediaShowBorderOff.is(':checked')) {
        $mediaBorderColor.css({
          'background-color': 'rgb(235, 235, 228)',
          'color': 'rgb(84, 84, 84)'
        });
        $mediaBorderColor.attr('disabled', true);
      } else {
        wizard.mediaBorderColor = wizard.mediaBorderColor;
        $mediaBorderColor.attr('disabled', false);
      }

      var medias = Medias.getMedias();
      var color = wizard.mediaBorderColor;
      for (var i = 0; i < medias.length; i++) {
        medias[i].borderColor = color;
      }
      wizard.changesDone();
    });
  }

  function getLanguage() {
    return cet.content.RunTime.language;
  }

  function initGroupsButtonsVisibility() {
    if (document.location.search.indexOf('groups=no') != -1)
      $body.addClass('no-groups-template');
  }

  function showAlert(message, withCancelButton) {
    //if (withCancelButton)
    //  $('.ht-cancel').show();
    //else
    //  $('.ht-cancel').hide();
    $("#alert-dialog > .body").html(message);
    var height = $("#alert-dialog .body").height();

    height = 50;

    $.colorbox({
      inline: true,
      href: '#alert-dialog',
      transition: 'none',
      speed: 0,
      open: true,
      height: (80 + height) + 'px',
      width: '500px',
      title: _L('myStudio'),
      overlayClose: false,
      closeButton: true
    });
  }
  wizard.showAlert = showAlert;

  function init() {
    
    $backgroundColor = $('#background-color');
    $backgroundColor.on('change', function (color) {
      var newColor = '#' + $backgroundColor[0].color.toString();
      Stage.backgroundColor = newColor;
      wizard.changesDone();
    });

    $borderColor = $('#template-border-color');
    $borderColor.on('change', function (color) {
      var newColor = '#' + $borderColor[0].color.toString();
      Stage.borderColor = newColor;
      wizard.changesDone();
    });

    $MdistractorBackgroundColor = $('#Mdistractor-background-color');
    $MdistractorBackgroundColor.on('change', function (color) {
      var newColor = '#' + $MdistractorBackgroundColor[0].color.toString();
      Stage.$MdistractorBackgroundColor = newColor;
      wizard.changesDone();
    });

    $MdistractorArrowColor = $('#arrows-color');
    $MdistractorArrowColor.on('change', function (color) {
      var newColor = '#' + $MdistractorArrowColor[0].color.toString();
      Stage.$MdistractorArrowColor = newColor;
      wizard.changesDone();
    });

    $perishableStorageTrue = $('#perishable-storage-true');
    $perishableStorageFalse = $('#perishable-storage-false');

    initBasketsCommonFields();

    initGroupsCommonFields();

    initMediasCommonFields();

    $('#perishable-storage-true, #perishable-storage-false').on('change', function () {
      if ($perishableStorageTrue.is(':checked')) {
        if (!Links.isEmpty()) {
          $perishableStorageFalse.prop('checked', true);
          wizard.showAlert(_L('removeDestructorsError'), true);
          return;
        }

        Properties.hideDuplicateLinkedButton();
      } else
        Properties.showDuplicateLinkedButton();
      wizard.changesDone();
    });

    $languageArabic = $("#languageArabic");
    $languageHebrew = $("#languageHebrew");

    $("#languageArabic, #languageHebrew").on('change', function () {
      Stage.removeClass($languageArabic.val() + ' ' + $languageHebrew.val());
      Stage.addClass($("input:radio[name=language]:checked").val());

      wizard.changesDone();
    });
    $languageHebrew.trigger('change');
    $languageHebrew.focus();

    $fontSizeSmall = $("#fontSmall");
    $fontSizeMedium = $("#fontMedium");
    $fontSizeLarge = $("#fontLarge");
    $fontSizeOther = $("#fontOther");
    $("#fontSmall, #fontMedium, #fontLarge, #fontOther").on('change', function () {

      var allSizeClasses =
        getFontSizeClassName($fontSizeSmall.val()) + ' ' +
        getFontSizeClassName($fontSizeMedium.val()) + ' ' +
        getFontSizeClassName($fontSizeLarge.val()) + ' ' +
        getFontSizeClassName($fontSizeOther.val());
      Stage.removeClass(allSizeClasses);
      $body.removeClass(allSizeClasses);

      Stage.removeClass(function (index, css) {
        return (css.match (/\bsize-\S+/g) || []).join(' '); // removes anything that starts with "size-"
      });
      $body.removeClass(function (index, css) {
        return (css.match(/\bsize-\S+/g) || []).join(' '); // removes anything that starts with "size-"
      });

      var selectedSize = getFontSizeClassName($("input:radio[name=font]:checked").val());     
      if (selectedSize == "font-other") {
        var fontSize = $("select[name='fontOther'] option:selected").val();//$(this).children("option:selected").val();
        Stage.addClass("size-" + fontSize);
        $body.addClass("size-" + fontSize);
      }

      Stage.addClass(selectedSize);
      $body.addClass(selectedSize);
    
      wizard.changesDone();
    });
    $fontSizeMedium.trigger('change');

    $("select[name='fontName']").on('change', function () {
      Stage.removeClass(function (index, css) {
        return (css.match(/\bfontName-\S+/g) || []).join(' '); // removes anything that starts with "size-"
      });
      $body.removeClass(function (index, css) {
        return (css.match(/\bfontName-\S+/g) || []).join(' '); // removes anything that starts with "size-"
      });
      var fontName = $("select[name='fontName'] option:selected").val();
      Stage.addClass("fontName-" + fontName);
      $body.addClass("fontName-" + fontName);
      wizard.changesDone();
    });
    
    
    $("#errorRemovalTrue, #errorRemovalFalse").on('change', function () {
      wizard.changesDone();
    });

    initTabs();
    initGroupsButtonsVisibility();
    //var $btnBasket = $('#btn-basket');
    //setAsToolbarButton($btnBasket);


    //function setAsToolbarButton($element) {
    //  var basketDraggie = new draggable($element, 'body');
    //  basketDraggie.on('dragend', function (sheker, pointer) {
    //    Stage.removeTooltip();
    //    var top = pointer.pageY - Stage.offsetTop;
    //    var left = pointer.pageX - Stage.offsetLeft;
    //    var newComponent = Baskets.createNewBasket(top, left);

    //    Properties.setActiveComponent(newComponent);
    //    newComponent.on('active', Stage.componentActivatedHandler);
    //    $element.remove();
    //    wizard.changesDone();
    //  })

    //  basketDraggie.on('dragstart', function (sheker, pointer) {
    //    var $clone = $element.clone();
    //    $element.parent().append($clone);
    //    setAsToolbarButton($clone)
    //  });
    //}

  }
  wizard.init = init;

  function serialize() {
    Groups.resolveBaskets();

    var baskets = Baskets.getBaskets();
    preset.setBasketsAndOptions(baskets);

    var groups = Groups.getGroups();
    preset.setGroups(groups);

    var medias = Medias.getMedias();
    preset.setMedias(medias);

    var links = Links.toJson();

    preset.links = links;

    preset.backgroundImage = Stage.backgroundImage;
    preset.backgroundColor = Stage.backgroundColor;
    preset.borderColor = Stage.borderColor;

    preset.MdistractorBackgroundColor = wizard.MdistractorBackgroundColor;
    preset.MdistractorArrowColor = wizard.MdistractorArrowColor;

    preset.basketBackgroundColor = wizard.basketBackgroundColor;
    preset.basketBorderColor = wizard.basketBorderColor;
    preset.basketOpacity = wizard.basketOpacity;

    preset.groupBackgroundColor = wizard.groupBackgroundColor;
    preset.groupBorderColor = wizard.groupBorderColor;
    preset.groupOpacity = wizard.groupOpacity;

    preset.mediaBackgroundColor = wizard.mediaBackgroundColor;
    preset.mediaBorderColor = wizard.mediaBorderColor;
    preset.mediaOpacity = wizard.mediaOpacity;

    preset.perishableStorage = wizard.perishableStorage;
    preset.freeGroupMode = wizard.freeGroupMode;

    preset.fontSize = $("input:radio[name=font]:checked").val();
    preset.fontSizePx = $("select[name='fontOther'] option:selected").val();
    preset.fontName = $("select[name='fontName'] option:selected").val();

    preset.fontFamily = getLanguage();

    preset.feedbackErrorsRemoval = $("#errorRemovalTrue").is(':checked') ? 'automaticaly' : null;


    return preset.stringify();
  }
  wizard.serialize = serialize;

  function deserialize(presetStr) {
    if (!presetStr)
      return;
    if (presetStr.substr(0, 3) == '%7B')
      presetStr = decodeURIComponent(presetStr);
    preset.parse(presetStr);

    wizard.basketBackgroundColor = preset.basketBackgroundColor;
    wizard.basketBorderColor = preset.basketBorderColor;
    wizard.basketOpacity = preset.basketOpacity;

    wizard.groupBackgroundColor = preset.groupBackgroundColor;
    wizard.groupBorderColor = preset.groupBorderColor;
    wizard.groupOpacity = preset.groupOpacity;

    wizard.mediaBackgroundColor = preset.mediaBackgroundColor;
    wizard.mediaBorderColor = preset.mediaBorderColor;
    wizard.mediaOpacity = preset.mediaOpacity;

    if (preset.baskets.length > 0 || preset.groups.length > 0 || preset.medias.length > 0)
      Stage.removeTooltip();

    for (var i = 0; i < preset.baskets.length; i++) {
      var newBasket = Baskets.createNewBasketFromJson(preset.baskets[i]);
      newBasket.on('active', Stage.componentActivatedHandler);
    }

    Links.fromJson(preset.links);

    for (var i = 0; preset.groups && i < preset.groups.length; i++) {
      var gData = new groupdata(preset.groups[i].top, preset.groups[i].left, preset.groups[i].height, preset.groups[i].width, false);
      gData.toPixels();
      Groups.createNewGroup(null, null, gData);
    }

    for (var i = 0; preset.medias && i < preset.medias.length; i++) {
      var mData = new mediadata(preset.medias[i].top, preset.medias[i].left, preset.medias[i].height, preset.medias[i].width, false, preset.medias[i].text, preset.medias[i].image, preset.medias[i].id, preset.medias[i].color);
      mData.toPixels();
      Medias.createNewMedia(null, null, mData);
    }

    Stage.backgroundImage = preset.backgroundImage;
    Stage.backgroundColor = preset.backgroundColor;
    wizard.backgroundColor = preset.backgroundColor;

    Stage.borderColor = preset.borderColor;
    wizard.borderColor = preset.borderColor;

    //Stage.MdistractorBackgroundColor = preset.MdistractorBackgroundColor;
    wizard.MdistractorBackgroundColor = preset.MdistractorBackgroundColor;
    wizard.MdistractorArrowColor = preset.MdistractorArrowColor;

    wizard.perishableStorage = preset.perishableStorage;
    wizard.freeGroupMode = preset.freeGroupMode;

    if (wizard.perishableStorage)
      Properties.hideDuplicateLinkedButton();
    else
      Properties.showDuplicateLinkedButton();

    var fontId;
    switch (preset.fontSize) {
      case 'small':
        fontId = 'fontSmall';
        break;
      case 'medium':
        fontId = 'fontMedium';
        break;
      case 'large':
        fontId = 'fontLarge';
      case 'other':
        fontId = 'fontOther';
    }
    $('input:radio[id=' + fontId + ']').prop('checked', true).change();
   
    $("select[name='fontOther'] option[value=" + preset.fontSizePx + "]").prop('selected', true);
    $("select[name='fontName'] option[value=" + preset.fontName + "]").prop('selected', true);
    Stage.removeClass(function (index, css) {
      return (css.match(/\bsize-\S+/g) || []).join(' '); });
    $body.removeClass(function (index, css) {
      return (css.match(/\bsize-\S+/g) || []).join(' '); });
    Stage.addClass("size-" + preset.fontSizePx);
    $body.addClass("size-" + preset.fontSizePx);
    Stage.addClass("fontName-" + preset.fontName);
    $body.addClass("fontName-" + preset.fontName);

    var langId;
    switch (preset.fontFamily) {
      case 'hebrew':
        langId = 'languageHebrew';
        break;
      case 'arabic':
        langId = 'languageArabic';
        break;
    }
    $('input:radio[id=' + langId + ']').prop('checked', true).change();

    if (preset.feedbackErrorsRemoval == 'automaticaly')
      $("#errorRemovalTrue").prop('checked', true);
    else
      $("#errorRemovalFalse").prop('checked', true);
  }
  wizard.deserialize = deserialize;

  function isInvalidBasketName(baskets) {
    var isInvalid = false;
    for (var i=0; i < baskets.length; i++) {
      // validate str 
      var pattern = "\\%[0-9a-f]{2}";
      var re = new RegExp(pattern);
      var result = re.exec(baskets[i].text);
      isInvalid = (result) ? true : false;
    }
    return isInvalid;
  }
  wizard.isInvalidBasketName = isInvalidBasketName;

  function validate() {
    
    var baskets = Baskets.getBaskets();
    var errors = [];

    if (isInvalidBasketName(baskets)) {
      errors.push(_L('inputInvalidBasketName'));
    }
    if (baskets.length < 2) {
      errors.push(_L('inputTwoDestructorsError'));
    }
    if (Groups.emptyGroupExists()) {
      errors.push(_L('emptyGroupError'));
    }

    if (Groups.groupWithHiddenBasketExists()) {
      errors.push(_L('hiddenBasketInGroupError'));
    }

    if (errors.length == 0)
      return true;
    return errors;
  }
  wizard.validate = validate;

  function changesDone() {
    cet.content.DesignTime.notifyChange();
  }
  wizard.changesDone = changesDone;

  function updateContainerHeight() {
    var bodyHeight = $body.height();
    if (bodyHeight) {
      cet.content.UI.setHeight(bodyHeight + 20);
    }
  }
  wizard.updateContainerHeight = updateContainerHeight;

  function setJsColorToDomElement(elem, val) {
    if (elem.color) {
      elem.color.fromString(val);
    } else if (jscolor) {
      jscolor.init();
      setTimeout(function () {
        elem.color.fromString(val);
      }, 500);
    }
  }
  ;

  Object.defineProperty(wizard, 'backgroundColor', {
    get: function () {
      return '#' + $backgroundColor[0].color.toString();
    },
    set: function (val) {
      if (val && val != 'none') {
        setJsColorToDomElement($backgroundColor[0], val);
      }
    }
  });

  Object.defineProperty(wizard, 'borderColor', {
    get: function () {
      return '#' + $borderColor[0].color.toString();
    },
    set: function (val) {
      if (val && val != 'none') {
        setJsColorToDomElement($borderColor[0], val);
      }
    }
  });

  Object.defineProperty(wizard, 'MdistractorBackgroundColor', {
    get: function () {
      return '#' + $MdistractorBackgroundColor[0].color.toString();
    },
    set: function (val) {
      if (val && val != 'none') {
        setJsColorToDomElement($MdistractorBackgroundColor[0], val);
      }
    }
  });

  Object.defineProperty(wizard, 'MdistractorArrowColor', {
    get: function () {
      return '#' + $MdistractorArrowColor[0].color.toString();
    },
    set: function (val) {
      if (val && val != 'none') {
        setJsColorToDomElement($MdistractorArrowColor[0], val);
      }
    }
  });
  Object.defineProperty(wizard, 'basketBackgroundColor', {
    get: function () {
      return '#' + $basketBackgroundColor[0].color.toString();
    },
    set: function (val) {
      if (val && val != 'none') {
        setJsColorToDomElement($basketBackgroundColor[0], val);
      }
    }
  });

  Object.defineProperty(wizard, 'basketBorderColor', {
    get: function () {
      if (!$basketShowBorderOn.is(':checked'))
        return 'transparent';
      return '#' + $basketBorderColor[0].color.toString();
    },
    set: function (val) {
      if (val && val != 'none') {
        setJsColorToDomElement($basketBorderColor[0], val);
      }

      var showBorder = val != 'transparent';
      $basketShowBorderOff.prop("checked", !showBorder);
      $basketShowBorderOn.prop("checked", showBorder);
    }
  });

  Object.defineProperty(wizard, 'basketOpacity', {
    get: function () {      
      return $basketTransparency.val() / 10;
      //$basketTransparencyOn.is(':checked') ? basketOpacityType.on : basketOpacityType.off;
    },
    set: function (val) {
      $basketTransparency.val(val * 10);
      //var isOn = val == basketOpacityType.on;
      //$basketTransparencyOn.prop('checked', isOn);
      //$basketTransparencyOff.prop('checked', !isOn);
    }
  });

  Object.defineProperty(wizard, 'groupBackgroundColor', {
    get: function () {
      return '#' + $groupBackgroundColor[0].color.toString();
    },
    set: function (val) {
      if (val && val != 'none') {
        setJsColorToDomElement($groupBackgroundColor[0], val);
      }
    }
  });

  Object.defineProperty(wizard, 'groupBorderColor', {
    get: function () {
      if (!$groupShowBorderOn.is(':checked'))
        return 'transparent';
      return '#' + $groupBorderColor[0].color.toString();
    },
    set: function (val) {
      if (val && val != 'none') {
        setJsColorToDomElement($groupBorderColor[0], val);
      }

      var showBorder = val != 'transparent';
      $groupShowBorderOff.prop("checked", !showBorder);
      $groupShowBorderOn.prop("checked", showBorder);
    }
  });

  Object.defineProperty(wizard, 'groupOpacity', {
    get: function () {
      return $groupTransparency.val() / 10;
      //$groupTransparencyOn.is(':checked') ? groupOpacityType.on : groupOpacityType.off;
    },
    set: function (val) {
      $groupTransparency.val(val * 10);
      //var isOn = val == groupOpacityType.on;
      //$groupTransparencyOn.prop('checked', isOn);
      //$groupTransparencyOff.prop('checked', !isOn);
    }
  });

  Object.defineProperty(wizard, 'mediaBackgroundColor', {
    get: function () {
      return '#' + $mediaBackgroundColor[0].color.toString();
    },
    set: function (val) {
      if (val && val != 'none') {
        setJsColorToDomElement($mediaBackgroundColor[0], val);
      }
    }
  });

  Object.defineProperty(wizard, 'mediaBorderColor', {
    get: function () {
      if (!$mediaShowBorderOn.is(':checked'))
        return 'transparent';
      return '#' + $mediaBorderColor[0].color.toString();
    },
    set: function (val) {
      if (val && val != 'none') {
        setJsColorToDomElement($mediaBorderColor[0], val);
      }

      var showBorder = val != 'transparent';
      $mediaShowBorderOff.prop("checked", !showBorder);
      $mediaShowBorderOn.prop("checked", showBorder);
    }
  });

  Object.defineProperty(wizard, 'mediaOpacity', {
    get: function () {
      return $mediaTransparency.val() / 10;
      //$mediaTransparencyOn.is(':checked') ? mediaOpacityType.on : mediaOpacityType.off;
    },
    set: function (val) {
      $mediaTransparency.val(val * 10);
      //var isOn = val == mediaOpacityType.on;
      //$mediaTransparencyOn.prop('checked', isOn);
      //$mediaTransparencyOff.prop('checked', !isOn);
    }
  });

  Object.defineProperty(wizard, 'perishableStorage', {
    get: function () {
      return $perishableStorageTrue.is(':checked');
    },
    set: function (val) {
      $perishableStorageTrue.prop('checked', val);
      $perishableStorageFalse.prop('checked', !val);
    }
  });

  Object.defineProperty(wizard, 'freeGroupMode', {
    get: function () {
      return $freeGroupModeTrue.is(':checked');
    },
    set: function (val) {
      $freeGroupModeTrue.prop('checked', val);
      $freeGroupModeFalse.prop('checked', !val);
    }
  });

  function getFontSizeClassName(name) {
    switch (name) {
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

  $(function () {
    /* Add listener to localized event to show the wizard only after it was localized */
    $body = $('body');

    $body.hide();
    window.addEventListener('localized', function () {
      $body.show();
    }, false);

    cet.content.on('clientready', function () {
      var language = cet.content.DesignTime.language;
      document.webL10n = initWebL10n(window, document, undefined, language);
      document.webL10n.ready(function () {
        // define helper function
        _L = document.webL10n.get;

        $('html').attr('lang', language);
        $body.attr('data-dir', document.webL10n.getDirection());

        cet.content.DesignTime.onValidationRequested = wizard.validate;
        cet.content.DesignTime.onPresetRequested = wizard.serialize;
        wizard.init();
        wizard.deserialize(cet.content.DesignTime.preset);
      });
    });
    wizard.updateContainerHeight();
  });
})(wizard || (wizard = {}));
