///<reference path='basketdata.ts'/>
///<reference path='basket.ts'/>
///<reference path='Links.ts'/>
///<reference path='baskets.ts'/>
///<reference path='group.ts'/>
///<reference path='groups.ts'/>
///<reference path='media.ts'/>
///<reference path='medias.ts'/>
///<reference path='properties.ts'/>
///<reference path='../../../../lib/modules/units.ts'/>
var Stage;
(function (Stage) {
  //var startPosition;
  var $stage;
  //var position;
  var offset;
  var self;



  function rgb2hex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
      return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
  }

  function fixComponentOverflow(componentData) {
    var overFlowX = componentData.left + componentData.width - $stage.width();
    if (!UI.isIE())
      overFlowX += 6;
    if (overFlowX > 0)
      componentData.left -= overFlowX;
    if (!UI.isIE())
      overFlowY += 6;
    var overFlowY = componentData.top + componentData.height - $stage.height();

    if (overFlowY > 0)
      componentData.top -= overFlowY;
  }
  Stage.fixComponentOverflow = fixComponentOverflow;

  function deactivateActiveComponent() {
    var active = Stage.getActiveComponent();
    if (active) {
      Links.deactivatAll();
      active.deactivate();
      Properties.removeActiveComponent();

    }
  }
  Stage.deactivateActiveComponent = deactivateActiveComponent;


  function getActiveComponent() {
    var comp = Baskets.getActiveBasket();
    if (!comp)
      comp = Groups.getActiveGroup();
    if (!comp)
      comp = Medias.getActiveMedia();
    return comp;
  }
  Stage.getActiveComponent = getActiveComponent;

  function removeActiveComponent() {
    Baskets.removeActiveBasket();
    Groups.removeActiveGroup();
    Medias.removeActiveMedia();
    wizard.changesDone();
  }
  Stage.removeActiveComponent = removeActiveComponent;

  function cloneActiveComponent() {
    var activeComponent = Baskets.getActiveBasket();
    if (!activeComponent)
      activeComponent = Groups.getActiveGroup();
    if (!activeComponent)
      activeComponent = Medias.getActiveMedia();
    var newComponent = activeComponent.clone();
    newComponent.on('active', componentActivatedHandler);
    wizard.changesDone();
  }
  Stage.cloneActiveComponent = cloneActiveComponent;

  function cloneActiveBasketAsLinked() {
    var activeBasket = Baskets.getActiveBasket();
    var newBasket = activeBasket.cloneAsLinked();
    newBasket.on('active', componentActivatedHandler);
    wizard.changesDone();
  }
  Stage.cloneActiveBasketAsLinked = cloneActiveBasketAsLinked;

  function getHtml() {
    return $stage.html();
  }
  Stage.getHtml = getHtml;

  function addClass(name) {
    $stage.addClass(name);
  }
  Stage.addClass = addClass;

  function removeClass(name) {
    $stage.removeClass(name);
  }
  Stage.removeClass = removeClass;

  function componentActivatedHandler(e, activatedComponent) {
    Links.deactivatAllLinksExceptMe(Links.getLinkByBasket(activatedComponent));
    Baskets.deactivateAllBasketsExceptMe(activatedComponent);
    Groups.deactivateAllGroupsExceptMe(activatedComponent);
    Medias.deactivateAllMediasExceptMe(activatedComponent);

    Properties.setActiveComponent(activatedComponent);
    $stage.focus();
  }
  Stage.componentActivatedHandler = componentActivatedHandler;

  function containsPoint(pointer) {
    if (!offset)
      offset = $stage.offset();

    if (pointer.pageX < offset.left)
      return false;

    if (pointer.pageX > (offset.left + $stage.width()))
      return false;

    if (pointer.pageY < offset.top)
      return false;

    if (pointer.pageY > (offset.top + $stage.height()))
      return false;

    return true;
  }
  Stage.containsPoint = containsPoint;

  function removeTooltip() {
    $('.stage-tooltip').remove();
  }
  Stage.removeTooltip = removeTooltip;
  Object.defineProperty(Stage, 'backgroundImage', {
    get: function () {
      //return $stage.css('background-image'); //.replace(/url\(/g, '').replace(')', '').replace(/\"/g, '');
      return $stage.css('background-image').replace(/url\(/g, '').slice(0, -1);
    },
    set: function (val) {
      if (val && val != 'none')
        $stage.css('background-image', 'url(' + '"' + val.replace(/\"/g, '') + '"' + ')');
      else
        $stage.css('background-image', 'none');
    }
  });

  Object.defineProperty(Stage, 'height', {
    get: function () {
      return $stage.height();
    }
  });

  Object.defineProperty(Stage, 'width', {
    get: function () {
      return $stage.width();
    }
  });

  Object.defineProperty(Stage, 'backgroundColor', {
    set: function (val) {
      $stage.css('backgroundColor', val);
    },
    get: function () {
      return rgb2hex($stage.css('backgroundColor'));
    }
  });

  Object.defineProperty(Stage, 'borderColor', {
    set: function (val) {
      $stage.css('border-color', val);
    },
    get: function () {
      return rgb2hex($stage.css('borderColor'));
    }
  });

  Object.defineProperty(Stage, 'offsetTop', {
    get: function () {
      return $stage.offset().top;
    }
  });

  Object.defineProperty(Stage, 'offsetLeft', {
    get: function () {
      return $stage.offset().left;
    }
  });

  $(function () {
    self = this;
    $stage = $('.stage');
    //position = { top: $stage.offset().top, left: $stage.offset().left };

    $stage.on('mousedown', function (e) {
      Stage.deactivateActiveComponent();
      return;
      var active = Stage.getActiveComponent();
      if (active) {
        Links.deactivatAll();
        active.deactivate();
        Properties.removeActiveComponent();
        return;
      }
      return;
      Stage.removeTooltip();
      var top = e.pageY - Stage.offsetTop;
      var left = e.pageX - Stage.offsetLeft;
      var newComponent;
      switch (getCreationMode()) {
        case ComponentType.basket:
          newComponent = Baskets.createNewBasket(top, left);
          break;
        case ComponentType.group:
          newComponent = Groups.createNewGroup(top, left);
          break;
        case ComponentType.media:
          newComponent = Medias.createNewMedia(top, left);
          break;
      }
      Properties.setActiveComponent(newComponent);
      newComponent.on('active', componentActivatedHandler);
      wizard.changesDone();
    });

    //$stage.focus();

    var $file = $('.background-image-input  input[type=file]');
    var $submit = $('.background-image-input  input[type=submit]');
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

          //$stage.css('background-image', 'url(' + imgUrl + ')');
          Stage.backgroundImage = imgUrl;
        }
        $body.css("cursor", "default");
      }
      myUpload = false;
    });

    $('.background-image-input .delete-icon').on('click', function (e) {
      Stage.backgroundImage = null;
      $file.replaceWith($file.val('').clone(true));
      e.preventDefault();
    });




  });
})(Stage || (Stage = {}));
