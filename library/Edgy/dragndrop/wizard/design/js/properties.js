///<reference path='../../../../lib/external/jquery.d.ts'/>
var Properties;
(function (Properties) {
  var $text;
  var $innerText;
  var $textDisableMask;
  var $width;
  var $height;
  var $top;
  var $left;
  var $image;
  var $color;
  var $element;
  var $disableMask;
  var $file;
  var stageDimentions;
  var $btnDuplicateLinked;
  var $cbIsDistractingOption;

  var basketStoragePreview;
  var activeComponent;

  var keyCodes = { del: 46, left: 37, up: 38, right: 39, down: 40, i: 73, enter: 13, b: 66, c: 67 };

  $(function () {
    $element = $('.properties');
    $disableMask = $('.properties-disable-mask');

    $text = $('.properties .text-input .input');
    $textDisableMask = $('.properties .text-disable-mask');
    $color = $('.properties .text-input .color');
    $width = $('.properties .width-input  input');
    $height = $('.properties .height-input  input');
    $top = $('.properties .top-input  input');
    $left = $('.properties .left-input  input');
    $btnDuplicateLinked = $('#component-duplicate-linked');

    $isDistractingOptionContainer = $('.properties .is-distracting-option');
    $cbIsDistractingOption = $isDistractingOptionContainer.find('input');

    var $stage = $('.stage');
    stageDimentions = { width: $stage.width(), height: $stage.height() };


    basketStoragePreview = (function () {
      var $_element = $element.find('.basket-storage-preview');
      var $_background = $_element.find('.background');
      var $_text = $_element.find('.text');
      return {


        text: function (val) {
          $_text.text(val);
        },
        image: function (val) {
          if (val && val.indexOf('none') == -1)
            $_background.css('background-image', 'url(' + '"' + val + '"' + ')');
          else
            $_background.css('background-image', 'none');
        },
        show: function () {
          $_element.show();
        },
        hide: function () {
          $_element.hide();
        }
      }

    })();



    $text.on('keyup', function (e) {
      if (activeComponent) {
        activeComponent.text = Properties.text;
        basketStoragePreview.text(Properties.text);
        wizard.changesDone();
      }
    });

    $text.on("paste", function (e) {
      e.preventDefault();

      var text;
      var clp = (e.originalEvent || e).clipboardData;
      if (clp === undefined || clp === null) {

        text = window.clipboardData.getData("text") || "";
        if (text !== "") {
          if (window.getSelection) {
            var selection = getSelection();
            var range = selection.getRangeAt(0);
            var newNode = document.createElement("span");
            newNode.innerHTML = text;
            range.deleteContents();
            range.insertNode(newNode);
          } else {
            document.selection.createRange().pasteHTML(text);
          }
        }
      } else {
        text = clp.getData('text/plain') || "";
        if (text !== "") {
          document.execCommand('insertText', false, text);
        }
      }
    });

    $width.on('change', function () {
      if (activeComponent) {
        var newWidth = parseInt($width.val());
        if (withinStageDimentions(null, null, newWidth, null))
          activeComponent.units.pixel.width = newWidth;
        else
          $width.val(activeComponent.units.pixel.width);
        wizard.changesDone();
      }
    });
    $height.on('change', function () {
      if (activeComponent) {
        var newHeight = parseInt($height.val());
        if (withinStageDimentions(null, null, null, newHeight))
          activeComponent.units.pixel.height = newHeight;
        else
          $height.val(activeComponent.units.pixel.height);
        wizard.changesDone();
      }
    });
    $top.on('change', function () {
      if (activeComponent) {
        var newTop = parseInt($top.val());
        if (withinStageDimentions(null, newTop, null, null))
          activeComponent.units.pixel.top = newTop;
        else
          $top.val(activeComponent.units.pixel.top);
        wizard.changesDone();
      }
    });
    $left.on('change', function () {
      if (activeComponent) {
        var newLeft = parseInt($left.val());
        if (withinStageDimentions(newLeft, null, null, null))
          activeComponent.units.pixel.left = newLeft;
        else
          $left.val(activeComponent.units.pixel.left);
        wizard.changesDone();
      }
    });
    $color.on('change', function (color) {
      var sColor = '#' + $color[0].color.toString();
      color = sColor;
      if (activeComponent) {
        activeComponent.color = sColor;
      }
      wizard.changesDone();
    });
    $text.on('keydown', function (e) {
      e.stopPropagation();
    });
    $width.on('keydown', function (e) {
      if (e.keyCode == keyCodes.enter) {

        $width.trigger('change');
        return;
      }
      e.stopPropagation();
    });
    $height.on('keydown', function (e) {
      if (e.keyCode == keyCodes.enter) {
        $height.trigger('change');
        return;
      }
      e.stopPropagation();
    });
    $top.on('keydown', function (e) {
      if (e.keyCode == keyCodes.enter) {
        $top.trigger('change');
        return;
      }
      e.stopPropagation();
    });
    $left.on('keydown', function (e) {
      if (e.keyCode == keyCodes.enter) {
        $left.trigger('change');
        return;
      }
      e.stopPropagation();
    });
    $color.on('keydown', function (e) {
      e.stopPropagation();
    });

    imageUploadHandler();

    $(document).on('keydown', function (e) {
      if (!activeComponent)
        return;

      if (e.keyCode == keyCodes.del) {
        Stage.removeActiveComponent();
      }
      if (e.keyCode == keyCodes.right) {
        activeComponent.units.pixel.left = activeComponent.units.pixel.left + 1;
        e.preventDefault();
        wizard.changesDone();
      }
      if (e.keyCode == keyCodes.left) {
        activeComponent.units.pixel.left = activeComponent.units.pixel.left - 1;
        e.preventDefault();
        wizard.changesDone();
      }
      if (e.keyCode == keyCodes.up) {
        activeComponent.units.pixel.top = activeComponent.units.pixel.top - 1;
        e.preventDefault();
        wizard.changesDone();
      }
      if (e.keyCode == keyCodes.down) {
        activeComponent.units.pixel.top = activeComponent.units.pixel.top + 1;
        e.preventDefault();
        wizard.changesDone();
      }
    });

    $('#component-delete').on('mouseup touchend', function () {
      Stage.removeActiveComponent();
      wizard.changesDone();
    });
    $('#component-duplicate').on('click', function () {
      Stage.cloneActiveComponent();
      wizard.changesDone();
    });
    $btnDuplicateLinked.on('click', function () {
      Stage.cloneActiveBasketAsLinked();
      wizard.changesDone();
    });
    $cbIsDistractingOption.on('change', function () {
      if (activeComponent) {
        activeComponent.hiddenOnRuntime = $cbIsDistractingOption.is(':checked');
        setDuplicateLinkedButtonVisibility();
        wizard.changesDone();
      }
    });
  });

  function withinStageDimentions(newLeft, newTop, newWidth, newHeight) {
    if (newLeft) {
      if ((newLeft + activeComponent.units.pixel.width) > stageDimentions.width)
        return false;
    }
    if (newTop) {
      if ((newTop + activeComponent.units.pixel.height) > stageDimentions.height)
        return false;
    }
    if (newWidth) {
      if ((newWidth + activeComponent.units.pixel.left) > stageDimentions.width)
        return false;
    }
    if (newHeight) {
      if ((newHeight + activeComponent.units.pixel.top) > stageDimentions.height)
        return false;
    }
    return true;
  }

  function imageUploadHandler() {
    var self = this;
    $file = $('.properties .image-input  input[type=file]');
    var $submit = $('.properties .image-input  input[type=submit]');
    var $body = $("body");
    var myUpload = false;
    $file.on('change', function () {
      myUpload = true;
      $body.css("cursor", "progress");
      $submit.click();
    });

    window.addEventListener("message", function (e) {
      if (e.data.substring(0, 12) == "file-upload:" && myUpload) {
        var fileInfo = jQuery.parseJSON(e.data.substring(12));
        if (fileInfo.files[0].errorCode == 'file_too_big') {
          alert("לא ניתן להעלות תמונות גדולות מKB-500 ");
          var inputControl = $('input[type=file]');
          inputControl.val("");
        } else {
          var imgUrl = fileInfo.files[0].url;
          activeComponent.image = imgUrl;
          basketStoragePreview.image(imgUrl);
          wizard.changesDone();
        }
        myUpload = false;
        $body.css("cursor", "default");
      }
    });

    $('.image-input .delete-icon').on('click', function (e) {
      activeComponent.image = null;
      basketStoragePreview.image(null);
      var clonedFile = $file.val('').clone(true);
      $file.replaceWith(clonedFile);
      $file = clonedFile;

      e.preventDefault();
      wizard.changesDone();
    });
  }

  function activeComponentChangesHandler() {
    var self = this;
    if (!activeComponent)
      return;

    $width.val(parseInt(activeComponent.units.pixel.width));
    $height.val(parseInt(activeComponent.units.pixel.height));
    $top.val(parseInt(activeComponent.units.pixel.top));
    $left.val(parseInt(activeComponent.units.pixel.left));
  }

  function disableText() {
    $textDisableMask.show();
    $text.blur();
  }

  function enableText() {
    $textDisableMask.hide();
  }

  function setDuplicateLinkedButtonVisibility() {
    if (!wizard.perishableStorage && activeComponent.constructor == basket && !activeComponent.hiddenOnRuntime) {
      showDuplicateLinkedButton();
    } else {
      hideDuplicateLinkedButton();
    }

  }
  function setActiveComponent(newActiveComponent) {
    var self = this;

    $disableMask.hide();


    activeComponent = newActiveComponent;
    activeComponent.on('change', activeComponentChangesHandler);
    if (activeComponent.text) {
      Properties.text = activeComponent.text;

      Properties.color = activeComponent.color;
      $color[0].color.fromString(cet.Utils.rgb2hex(activeComponent.color));
    } else {
      Properties.text = '';

      activeComponent.color = Properties.color;
    }


    setDuplicateLinkedButtonVisibility(activeComponent);
    

    if (activeComponent.constructor == group) {
      disableText();
    } else {
      enableText();
    }

    if (activeComponent.constructor == basket) {
      basketStoragePreview.text(activeComponent.text);
      basketStoragePreview.image(activeComponent.image);
      basketStoragePreview.show();
      activeComponent.isLinked() ? $isDistractingOptionContainer.hide() : $isDistractingOptionContainer.show();

    }
    else {
      basketStoragePreview.hide();
      $isDistractingOptionContainer.hide();
    }


    $width.val(parseInt(activeComponent.units.pixel.width));
    $height.val(parseInt(activeComponent.units.pixel.height));
    $top.val(parseInt(activeComponent.units.pixel.top));
    $left.val(parseInt(activeComponent.units.pixel.left));

    $cbIsDistractingOption.prop('checked', activeComponent.hiddenOnRuntime);
    var clonedFile = $file.val('').clone(true);
    $file.replaceWith(clonedFile);
    $file = clonedFile;
  }
  Properties.setActiveComponent = setActiveComponent;

  function removeActiveComponent() {
    //timeout is here for a very specific scenario, 
    //1. one of ther components properties was changed
    //2. user clicked on stage, and component lost activation
    //3. 'change' event of the property arrives after the component losses activation and we lose the chane
    //4. therefore we delay the 'removal' of the activation with 'setTimeout'.
    //setTimeout(function () {
    if (!activeComponent)
      return;
    $width.val('');
    $height.val('');
    $top.val('');
    $left.val('');

    activeComponent.off('changed', activeComponentChangesHandler);
    activeComponent = null;

    Properties.text = null;
    Properties.color = null;
    $disableMask.show();
    basketStoragePreview.hide();
    //}, 10);
  }
  Properties.removeActiveComponent = removeActiveComponent;

  function enable() {
  }
  Properties.enable = enable;

  function disable() {
  }
  Properties.disable = disable;

  function showDuplicateLinkedButton() {
    $btnDuplicateLinked.show();
  }
  Properties.showDuplicateLinkedButton = showDuplicateLinkedButton;
  function hideDuplicateLinkedButton() {
    $btnDuplicateLinked.hide();
  }
  Properties.hideDuplicateLinkedButton = hideDuplicateLinkedButton;

  Object.defineProperty(Properties, 'color', {
    get: function () {
      return $text.css('color');
    },
    set: function (val) {
      $text.css('color', val);
    }
  });

  Object.defineProperty(Properties, 'text', {
    get: function () {
      return $text.val();
    },
    set: function (val) {
      $text.val(val);
    }
  });
})(Properties || (Properties = {}));
