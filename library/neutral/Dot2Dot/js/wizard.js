/// <reference path="http://cdn.cet.ac.il/libs/cet.content/1/client.js" />
/// <reference path="http://cdn.cet.ac.il/libs/cet.content.designtime/1/client.min.js" />
/// <reference path="../../../lib/js/external/jquery/2.0.3/jquery-2.0.3.js" />
/// 


/*jshint multistr: true */

var dotToDot = function () {
  var self = this;

  var _L = document.webL10n.get;

  var sPreset;
  var nHotspotId = 0;

  var bValid = false;

  var oPreset = {};
  var oHotspots = {};
  var $currentHotspot;
  var $currentHotspotId;
  var $lastHotspotId;
  var arSoundObjects = [];

  var sDir;
  var sTextAlign;
  var fontFamily;
  var fontSize;
  var sFontWeight;
  var defaultFontSize = 18;
  var sImage;
  var nImageWidth;
  var nImageHeight;
  var myHeight;

  var arFontFamily = ['Arial', 'Arial', 'Comic Sans MS', 'Courier New', 'Helvetica', 'Tahoma', 'Times New Roman', 'Traditional Arabic', 'Lateef', 'David', 'Alef', 'Arimo', 'Abraham'];

  var alertRequest;

  var backgroundObj = {};
  var myPicker;

  var $uploadedImageContainer;
  var $uploadedSoundContainer;
  var maxCharNumberInTextField = 140;
  var totalNumberOfPairs;


  self.init = function () {

    cet.content.DesignTime.onValidationRequested = validateWizard;
    cet.content.DesignTime.onPresetRequested = buildPreset;

    // prepare empty
    initDefaults();

    // load preset
    loadPreset();



  };


  function getFontSize() {
    return fontSize + 'px';
  }


  function getFontFamily() {
    return arFontFamily[fontFamily];
  }

  function createRadioButtons(memberSide, pairNumber, type) {

    var textChecked = '';
    var imageChecked = '';
    var soundChecked = '';

    switch (type) {
      case 'text':
        textChecked = 'checked="checked"';
        break;
      case 'image':
        imageChecked = 'checked="checked"';
        break;
      case 'sound':
        soundChecked = 'checked="checked"';
        break;
    }


    var radio = '<div class="radio-member-type">\n\
<input type="radio" id="pair-' + pairNumber + '-' + memberSide + '-member-text" name="pair-' + pairNumber + '-' + memberSide + '-member-type" value="text" ' + textChecked + '><label for="pair-' + pairNumber + '-' + memberSide + '-member-text">' + _L('text') + '</label><br>\n\
<input type="radio" id="pair-' + pairNumber + '-' + memberSide + '-member-image" name="pair-' + pairNumber + '-' + memberSide + '-member-type" value="image" ' + imageChecked + '><label for="pair-' + pairNumber + '-' + memberSide + '-member-image">' + _L('image') + '</label><br>\n\
<input type="radio" id="pair-' + pairNumber + '-' + memberSide + '-member-sound" name="pair-' + pairNumber + '-' + memberSide + '-member-type" value="sound" ' + soundChecked + '><label for="pair-' + pairNumber + '-' + memberSide + '-member-sound">' + _L('soundFile') + '</label>\n\
</div>';
    return radio;
  }

  function createMember(memberSide, pairNumber, type, emptyMember) {

    var text = '';
    var image = '';
    var sound = '';

    if (emptyMember != 'true') {
      if (oPreset.pairs[pairNumber - 1]) {
        switch (type) {
          case 'text':
            if (memberSide == 'left') {
              text = oPreset.pairs[pairNumber - 1].leftMember.data;
            }
            else {
              // memberSide == 'right'
              text = oPreset.pairs[pairNumber - 1].rightMember.data;
            }

            text = text.replaceAll('"', "''");
            break;
          case 'image':
            if (memberSide == 'left') {
              image = oPreset.pairs[pairNumber - 1].leftMember.data;
            }
            else {
              // memberSide == 'right'
              image = oPreset.pairs[pairNumber - 1].rightMember.data;
            }
            break;
          case 'sound':
            if (memberSide == 'left') {
              sound = oPreset.pairs[pairNumber - 1].leftMember.data;
            }
            else {
              // memberSide == 'right'
              sound = oPreset.pairs[pairNumber - 1].rightMember.data;
            }
            break;
        }
      }
    }

    var textField = '<input type="text" class="text-field" value="' + text +
      '" name="pair-' + pairNumber + '-' + memberSide + '-member-text" maxlength="' + maxCharNumberInTextField +
      '" style="font-family: ' + getFontFamily() + '; font-size: ' + getFontSize() + '; font-weight: ' + sFontWeight + ';">';


    var imageField = '<table class="image-field-table">\n\
<tr>\n\
<td>\n\
<div class="add-picture">\n\
<form id="" class="file-upload-form" enctype="multipart/form-data" method="post" action="//api.assets.cet.ac.il/filesUpload.ashx?maxfilesize=524326&callbackid=image" target="iFrame_fileUpload">\n\
					<div class="hw-add-picture">\n\
						<input name="file" type="file" accept="image/*" data-side="' + memberSide + '" />\n\
						' + _L('uploadImage') + '\n\
					</div>\n\
          <div class="description-label">\n\
            <label>' + _L('imageDescription') + '</label>\n\
            <input name="imageDescription" type="text" id="imageDescription2" class="description-input" required />\n\
          </div>\n\
					<div class="loading" style="visibility: hidden;">\n\
						<img src="../content/img/loading.gif" />\n\
					</div>\n\
				</form>\n\
			</div>\n\
</td>\n\
				<td>\n\
				<div class="picture-self">'+ image + '</div>\n\
</td>\n\
</tr>\n\
</table>';

    var soundField = '<table class="sound-field-table">\n\
<tr>\n\
<td>\n\
<div class="add-sound">\n\
<form id="" class="file-upload-form" enctype="multipart/form-data" method="post" action="//api.assets.cet.ac.il/filesUpload.ashx?maxfilesize=2097304&callbackid=audio" target="iFrame_fileUpload">\n\
					<div class="hw-add-sound">\n\
						<input name="file" type="file" accept=".mp3" data-side="' + memberSide + '" />\n\
						'+ _L('uploadSoundFile') + '\n\
					</div>\n\
					<div class="loading" style="visibility: hidden;">\n\
						<img src="../content/img/loading.gif" />\n\
					</div>\n\
				</form>\n\
			</div>\n\
</td>\n\
				<td>\n\
				<div data-row="' + pairNumber + '" data-col="' + memberSide + '" class="sound-self">' + sound + '</div>\n\
</td>\n\
</tr>\n\
</table>';

    var str = (sound.substring(0, sound.length - 8)).split('data-file="');
    var sSound = str[1];

    if (type == "sound")
      createSound(pairNumber, memberSide, sSound);

    var member = '<div class="member ' + memberSide + '-member ' + type + '-member">\n\
			<table class="member-table">\n\
			<tr>\n\
        <td class="member-type-cell">' + createRadioButtons(memberSide, pairNumber, type) + '</td>\n\
			<td class="member-data-cell">\n\
<div class="text-field-wrapper">\n\
' + textField + '\n\
			</div>\n\
			<div class="image-field-wrapper">\n\
			' + imageField + '</div>\n\
	<div class="sound-field-wrapper">\n\
			' + soundField + '</div>\n\</td>\n\
</tr>\n\
</table>';

    return member;
  }

  function createPair(pairNumber, emptyPair) {

    var leftPairType = 'text';
    var rightPairType = 'text';

    if (emptyPair != 'true') {
      if (oPreset.pairs[pairNumber - 1]) {
        leftPairType = oPreset.pairs[pairNumber - 1].leftMember.type;
        rightPairType = oPreset.pairs[pairNumber - 1].rightMember.type;
      }
    }

    var pair = '\n\
			<fieldset class="pair pair-'+ pairNumber + '">\n\
<div class="pair-delete"></div>\n\
				<legend>'+ _L('pair') + ' ' + pairNumber + '</legend>\n\
<table class="pair-table">\n\
<tr>\n\
<td class="member-cell">' + createMember('left', pairNumber, leftPairType, emptyPair) + '</td>\n\
<td class="member-cell">' + createMember('right', pairNumber, rightPairType, emptyPair) + '</td>\n\
</tr>\n\
</table>\n\
			</fieldset>';

    return pair;
  }

  // DIMA
  function createPairs(numberOfPairs, emptyPairs) {

    


    var html = '';

    for (var i = 0; i < numberOfPairs; i++) {
      html += createPair(i + 1, emptyPairs);
    }

    $('.pairs').html(html);
    changesDone();

  }

  function initDefaults() {
    myHeight = 100;
    cet.content.UI.setHeight(100);
    sDir = 'rtl';
    sTextAlign = 'center';
    fontFamily = 1;
    fontSize = 18;
    sFontWeight = 'normal';

    backgroundObj = {
      image: '',
      color: 'dde3e3',
      opacity: '100'
    };


    // init color picker - jscolor
    myPicker = new jscolor.color(document.getElementById('myColorPicker'), {})
    myPicker.fromString(backgroundObj.color)  // now you can access API via 'myPicker' variable
  }

  function loadPreset() {
    var sPreset = cet.content.DesignTime.preset;

    if (!sPreset) {
      // no preset 
      oPreset = {};
      oPreset.direction = sDir;
      oPreset.alignment = sTextAlign;
      oPreset.fontFamily = fontFamily;
      oPreset.fontSize = fontSize;
      oPreset.fontWeight = sFontWeight;
      oPreset.background = backgroundObj;
      oPreset.backgroundDescription = $('#backgroundDescription').val();


      $("#directionRTL").attr("checked", "checked");
      $('.wizard-wrapper').removeClass('direction-rtl direction-ltr').addClass('direction-' + sDir);

      $("#alignCenter").attr("checked", "checked");
      $('.wizard-wrapper').removeClass('alignment-right alignment-center alignment-left').addClass('alignment-' + sTextAlign);

      $("#choosefontfamily").val(fontFamily);
      $("#choosefontsize").val(fontSize);

      createPairs(1, 'true');

      $('.text-field').css({ 'font-family': getFontFamily() });
      $('.text-field').css({ 'font-size': getFontSize() });

      updateBackgroudDemoBox();

    }
    else {
      if (sPreset.substr(0, 3) == '%7B') {
        sPreset = decodeURIComponent(sPreset);
      }

      // convert Json string to real object
      oPreset = JSON.parse(sPreset);

      totalNumberOfPairs = oPreset.pairs ? oPreset.pairs.length : 0;

      //oPreset = JSON && JSON.parse(sPreset) || $.parseJSON(sPreset);

      // direction
      sDir = oPreset.direction;

      if (oPreset.alignment) {
        sTextAlign = oPreset.alignment;
      }

      if (oPreset.fontFamily) {
        fontFamily = oPreset.fontFamily;
      }

      if (oPreset.fontSize) {
        fontSize = oPreset.fontSize;
      }

      if (oPreset.fontWeight) {
        sFontWeight = oPreset.fontWeight;
      }

      if (oPreset.background) {
        backgroundObj = oPreset.background;
      }

      if (oPreset.showNumberOfPairs > 5) {
        for (var i = 6; i <= oPreset.showNumberOfPairs; i++) {
          $("#selectPairsNum").append(new Option(i, i));
        }
      }


      // set background data
      myPicker.fromString(backgroundObj.color);
              
        if (backgroundObj.image != '') {
          var imageDescription = oPreset.backgroundDescription;
            $('#bgImageFieldWrapper .picture-self').html('<img src="' + backgroundObj.image + '" alt="' + imageDescription + '">');
        }

      $('#transparencyBg').val(backgroundObj.opacity);

      updateBackgroudDemoBox();


      // set direction radio button
      if (sDir == "rtl") {
        $("#directionRTL").attr("checked", "checked");
      }
      else {
        $("#directionLTR").attr("checked", "checked");
      }

      // set text align radio button
      switch (sTextAlign) {
        case 'right':
          $("#alignRight").attr("checked", "checked");
          break;
        case 'center':
          $("#alignCenter").attr("checked", "checked");
          break;
        case 'left':
          $("#alignLeft").attr("checked", "checked");
          break;
      }

      // set bold checkbox
      if (sFontWeight == "bold") {
        $("#checkboxBold").attr("checked", "checked");
      }

      // set font family select field value
      $("#choosefontfamily").val(fontFamily);

      // set font size select field value
      $("#choosefontsize").val(fontSize);

      var showNumberOfPairs = (oPreset.showNumberOfPairs) ? oPreset.showNumberOfPairs : 5;
      
      // set number of pairs select field value
      $("#selectPairsNum").val(showNumberOfPairs);

      var pairSize = (oPreset.pairSize) ? oPreset.pairSize : 'large';

      // set pair size select field value
      $("#selectPairSize").val(pairSize);

      $('.wizard-wrapper').removeClass('direction-rtl direction-ltr').addClass('direction-' + sDir);
      $('.wizard-wrapper').removeClass('alignment-right alignment-center alignment-left').addClass('alignment-' + sTextAlign);

      createPairs(totalNumberOfPairs, 'false');

      $('.text-field').css({ 'font-family': getFontFamily() });
      $('.text-field').css({ 'font-size': getFontSize() });
      $('.text-field').css({ 'font-weight': sFontWeight });

    }

    var $wrapper = $(".wizard-wrapper");
    myHeight = $wrapper.outerHeight();

    setInterval(function () {
      // 
      var $wrapper = $(".wizard-wrapper");
      if (myHeight != $wrapper.outerHeight())
        changesDone();
    }, 100);
  }

  function validateWizard() {

    bValid = false;

    var $pairs = $('.pairs');

    var minNumberOfPairs = 2;

    var showNumberOfPairs = $('#selectPairsNum').val();
  

    var isImageUploaded = $('#bgImageFieldWrapper .picture-self img').length > 0;
    var sImageDescription = $('#backgroundDescription').val().trim();
    if (isImageUploaded && sImageDescription === "") {
      return [_L('imageDescriptionError')];
    }
  

    if ($('.pair').length < minNumberOfPairs) {
      return [_L('minNumberOfPairs', { minNumber: minNumberOfPairs })];
    }

    if ($('.pair').length < showNumberOfPairs) {
      return [_L('pairsNumberToShowIsTooBig')];
    }

    for (var i = 1; i <= $('.pair').length; i++) {
      var $currentPair = $pairs.find('.pair-' + i);

      var $leftMember = $currentPair.find('.left-member');
      var $rightMember = $currentPair.find('.right-member');

      var leftMemberType = $('input:radio[name=pair-' + i + '-left-member-type]:checked').val();
      var rightMemberType = $('input:radio[name=pair-' + i + '-right-member-type]:checked').val();


      if (!checkMemberData(leftMemberType, $leftMember)) {
        switch (leftMemberType) {
          case 'text':
            return [_L('addTextInLeftFieldOfPair', { pairNumber: i })];
            break;
          case 'image':
            var imageDescription = $($leftMember.find('input[name="imageDescription"]')).val().trim();
            if ($($leftMember.find('.picture-self')).html() == '') {
              return [_L('addImageFileInLeftFieldOfPair', { pairNumber: i })];
            }
            else if (imageDescription === '') {
              return [_L('imageDescriptionError')];
            }
            break;
          case 'sound':
            return [_L('addSoundFileInLeftFieldOfPair', { pairNumber: i })];
            break;
        }
      }

      if (!checkMemberData(rightMemberType, $rightMember)) {
        switch (rightMemberType) {
          case 'text':
            return [_L('addTextInRightFieldOfPair', { pairNumber: i })];
            break;
          case 'image':
            var imageDescription = $($rightMember.find('input[name="imageDescription"]')).val().trim();
            if ($($rightMember.find('.picture-self')).html() == '') {
              return [_L('addImageFileInRightFieldOfPair', { pairNumber: i })];
             }
             else if (imageDescription === '') {
               return [_L('imageDescriptionError')];
             }
            break;
          case 'sound':
            return [_L('addSoundFileInRightFieldOfPair', { pairNumber: i })];

            break;
        }
      }

    }


    // this might not be the right place to put this implementation
    // here we are updating the backgroundObj.image value
    if ($('#bgImageFieldWrapper .picture-self img').attr('src')) {
      backgroundObj.image = $('#bgImageFieldWrapper .picture-self img').attr('src');
    }
    else {
      backgroundObj.image = '';
    }



    function checkMemberData(type, $member) {
  
      switch (type) {
        case 'text':
          if ($($member.find('.text-field')).val() == '') {
            return false;
          }
          else {
            return true
          }
          break;
        case 'image':
          var imageDescription = $($member.find('input[name="imageDescription"]')).val().trim();
          if ($($member.find('.picture-self')).html() == '') {
            return false
          }
          else if (imageDescription === '') {
            return false
          }
          else{
            return true;
          }
          break;
        case 'sound':
          if ($($member.find('.sound-self')).html() == '') {
            return false
          }
          else {
            return true;
          }
          break;
      }
    }

    bValid = true;
    return null;
  }

  function buildPreset() {
    oPreset = {};
    

    oPreset.backgroundDescription = $('#backgroundDescription').val();

    oPreset.direction = sDir;

    oPreset.alignment = sTextAlign;

    oPreset.fontFamily = fontFamily;

    oPreset.fontWeight = sFontWeight;

    oPreset.fontSize = fontSize;

    oPreset.showNumberOfPairs = $('#selectPairsNum').val();

    oPreset.pairSize = $('#selectPairSize').val();

    if (bValid) {

      // create background object to save in the preset
      oPreset.background = backgroundObj;

      stopSounds();

      var pairs = new Array();

      for (var i = 0; i < $('.pair').length; i++) {

        var members = new Object();

        var leftMember = new Object();
        var rightMember = new Object();



        leftMember.type = $('input:radio[name=pair-' + (i + 1) + '-left-member-type]:checked').val();
        var $leftMember = $('.pairs').find('.pair-' + (i + 1)).find('.left-member');

        switch (leftMember.type) {
          case 'text':
            leftMember.data = $($leftMember.find('.text-field')).val();
            break;
          case 'image':
            leftMember.data = $($leftMember.find('.picture-self')).html();
            var leftImageDescription = $($leftMember.find('input[name="imageDescription"]')).val();
            var $leftImage = $($leftMember.find('.picture-self img'));
            $leftImage.attr('aria-label', leftImageDescription);
            leftMember.description = leftImageDescription;
            var $leftBox = $($leftMember.find('.box.left-box'));
            $leftBox.attr('aria-label', leftImageDescription);
            break;
          case 'sound':
            leftMember.data = $($leftMember.find('.sound-self')).html();
            break;
        }

        rightMember.type = $('input:radio[name=pair-' + (i + 1) + '-right-member-type]:checked').val();
        var $rightMember = $('.pairs').find('.pair-' + (i + 1)).find('.right-member');


        switch (rightMember.type) {
          case 'text':
            rightMember.data = $($rightMember.find('.text-field')).val();
            break;
          case 'image':
            rightMember.data = $($rightMember.find('.picture-self')).html();
            var rightImageDescription = $($rightMember.find('input[name="imageDescription"]')).val();
            var $rightImage = $($rightMember.find('.picture-self img'));
            $rightImage.attr('aria-label', rightImageDescription);
            rightMember.description = rightImageDescription;
            var $rightBox = $($rightMember.find('.box.right-box'));
            $rightBox.attr('aria-label', rightImageDescription);
            break;
          case 'sound':
            rightMember.data = $($rightMember.find('.sound-self')).html();
            break;
        }

        members.leftMember = leftMember;
        members.rightMember = rightMember;

        pairs.push(members);
      }

      oPreset.pairs = pairs;


    }
    var myJsonText = encodeURIComponent(JSON.stringify(oPreset));
    return myJsonText;
  }

  function changesDone() {
    cet.content.DesignTime.notifyChange();

    var $wrapper = $(".wizard-wrapper");
    myHeight = $wrapper.outerHeight();
    cet.content.UI.setHeight(myHeight);
  }

  function showAlert(message, withCancelButton) {

    if (withCancelButton)
      $('.ht-cancel').show();
    else
      $('.ht-cancel').hide();

    $("#alert-dialog > .body").html(message);
    var height = $("#alert-dialog .body").height();


    height = 50;

    $.colorbox({
      inline: true,
      href: '#alert-dialog',
      transition: 'none',
      speed: 0,
      open: true,
      height: (110 + height) + 'px',
      width: '500px',
      title: _L('myStudio'),
      overlayClose: false,
      closeButton: true
    });


  }

  function alertClosed(e) {

    $.colorbox.close();
    $('.ht-cancel').hide();
    if (e == 'ok') {

    }
  }

  function removeElement(el) {
    $(el).remove();
    changePairsNumberByAscendingOrder();
    changesDone();
  }

  function changePairsNumberByAscendingOrder() {
    var length = $('.pair').length;

    // remove "pair-x" count classes
    for (var i = 0; i < length; i++) {
      $($('.pair')[i]).attr('class', 'pair');
    }

    for (var i = 0; i < length; i++) {
      $($('legend')[i]).text(_L('pair') + ' ' + (i + 1));
      $($('.pair')[i]).addClass('pair-' + (i + 1));

      //find all inputs in a pair
      var inputs = $($('.pair')[i]).find('input');

      //do for each input
      for (var j = 0; j < inputs.length; j++) {
        //check if current input has a name
        if ($(inputs[j]).attr('name')) {
          //get the old name
          var oldName = $(inputs[j]).attr('name');
          //check if the old name starts with a string "pair"
          if (oldName.slice(0, 4) == 'pair') {
            //create a new name
            var newName = '';
            //check if pair number is higher than 9
            if (oldName.substring(5, 7) > 9) {
              newName = oldName.substring(0, 5) + (i + 1) + oldName.substring(7);
            }
            else {
              newName = oldName.substring(0, 5) + (i + 1) + oldName.substring(6);
            }
            //set the new name
            $(inputs[j]).attr('name', newName);
          }
        }

        //check if current input has an id
        if ($(inputs[j]).attr('id')) {
          //get the old id
          var oldId = $(inputs[j]).attr('id');
          //check if the old id starts with a string "pair"
          if (oldId.slice(0, 4) == 'pair') {
            //create a new id
            var newId = '';
            //check if pair number is higher than 9
            if (oldId.substring(5, 7) > 9) {
              newId = oldId.substring(0, 5) + (i + 1) + oldId.substring(7);
            }
            else {
              newId = oldId.substring(0, 5) + (i + 1) + oldId.substring(6);
            }
            //set the new id
            $(inputs[j]).attr('id', newId);
          }
        }

      }



      //find all labels in a pair
      var labels = $($('.pair')[i]).find('label');
      //do for each label
      for (var j = 0; j < labels.length; j++) {
        //check if current label has a "for" attribute
        if ($(labels[j]).attr('for')) {
          //get the old for attribute
          var oldFor = $(labels[j]).attr('for');
          //check if the old for attribute starts with a string "pair"
          if (oldFor.slice(0, 4) == 'pair') {
            //create a new id
            var newFor = '';
            //check if pair number is higher than 9
            if (oldFor.substring(5, 7) > 9) {
              newFor = oldFor.substring(0, 5) + (i + 1) + oldFor.substring(7);
            }
            else {
              newFor = oldFor.substring(0, 5) + (i + 1) + oldFor.substring(6);
            }
            //set the new id
            $(labels[j]).attr('for', newFor);
          }
        }

      }



    }
  }

  function stopSounds() {
    $(".speaker").removeClass("play").addClass("stop");
    soundManager.stopAll();
  }

  function createSound(pairNumber, memberSide, sSound) {
    if (arSoundObjects[pairNumber] == undefined) arSoundObjects[pairNumber] = {};
    arSoundObjects[pairNumber][memberSide] = soundManager.createSound({
      url: sSound
    });
  }

  /**
  * ReplaceAll by Fagner Brack (MIT Licensed)
  * Replaces all occurrences of a substring in a string
  */
  String.prototype.replaceAll = function (token, newToken, ignoreCase) {
    var _token;
    var str = this + "";
    var i = -1;

    if (typeof token === "string") {

      if (ignoreCase) {

        _token = token.toLowerCase();

        while ((
            i = str.toLowerCase().indexOf(
                token, i >= 0 ? i + newToken.length : 0
            )) !== -1
        ) {
          str = str.substring(0, i) +
              newToken +
              str.substring(i + token.length);
        }

      } else {
        return this.split(token).join(newToken);
      }

    }
    return str;
  };


  function updateBackgroudDemoBox() {

    $('#bgImageFieldWrapper .picture-self').css({
      'background-color': '#' + backgroundObj.color,
      'opacity': backgroundObj.opacity / 100,
    });
  };





  self.registerEvents = function () {

    $("#selectPairsNum").on("change", function () {
      changesDone();
    })

    $("#selectPairSize").on("change", function () {
      changesDone();
    })

    $(document).on('blur', '.text-field', function () {
      changesDone();
    })

    $(document).on('change', '.radio-member-type input[type=radio]', function () {
      var $member = $($(this).parents('.member'));

      var newMemberType = $(this).val();

      $member
				.removeClass('text-member')
				.removeClass('image-member')
        .removeClass('sound-member')
				.addClass(newMemberType + '-member');

      changesDone();
    })

    $("input[name='radDirection']").change(function () {
      sDir = this.value;
      $('.wizard-wrapper').removeClass('direction-rtl direction-ltr').addClass('direction-' + sDir);
      changesDone();
    });

    $("input[name='radAlign']").change(function () {
      sTextAlign = this.value;
      $('.wizard-wrapper').removeClass('alignment-right alignment-center alignment-left').addClass('alignment-' + sTextAlign);
      changesDone();
    });

    $("#transparencyBg").on("change", function () {
      backgroundObj.opacity = $(this).val();

      updateBackgroudDemoBox();

      changesDone();
    });

    $("#myColorPicker").on("change", function () {
      backgroundObj.color = $(this).val();

      updateBackgroudDemoBox();

      changesDone();
    });

    $("input[name='checkBold']").change(function () {
      if ($(this).is(":checked")) {
        sFontWeight = 'bold';
      }
      else {
        sFontWeight = 'normal';
      }

      $('.text-field').css({ 'font-weight': sFontWeight });

      changesDone();
    });

    $('#choosefontfamily').on('change', function (e) {
      fontFamily = this.value;
      $('.text-field').css({ 'font-family': getFontFamily() });
      changesDone();
    });

    $('#choosefontsize').on('change', function (e) {
      fontSize = this.value;
      $('.text-field').css({ 'font-size': getFontSize() });
      changesDone();
    });


    $(document).on('click', 'input[type=file]', function () {
      if ($(this).parent().hasClass("hw-add-sound"))
        stopSounds();
    }).on('change', 'input[type=file]', function () {

      var $form = $($(this).parents('.file-upload-form'));

      if ($(this).parent().hasClass("hw-add-picture"))
        $uploadedImageContainer = $($($form.parents('.image-field-table')).find('.picture-self'));
      else // hw-add-sound
        $uploadedSoundContainer = $($($form.parents('.sound-field-table')).find('.sound-self'));

      var $loading = $($form.find('.loading'));

      $loading.css('visibility', 'visible');
      $form.submit();

    });


    window.addEventListener("message", function (e) {
      if (e.data.substring(0, 11) == "file-upload") {

        var json = e.data.substring(e.data.indexOf(":") + 1);
        var fileInfo = jQuery.parseJSON(json);

        if (fileInfo.files[0] != undefined) {
          if (fileInfo.files[0].errorCode == 'file_too_big') {
            alertRequest = 'ht-load-file';
            showAlert(_L('incorrectFileSize'), false);
          }
          else {
            var callBackID = e.data.substring(12, 17);
            var fileType = fileInfo.files[0].type.substring(0, 5);
            var mimeType = fileInfo.files[0].type.substring(6);

            if (callBackID != fileType) {
              alertRequest = 'ht-load-file';
              showAlert(_L('incorrectFileType'), false);
            }
            else {
              switch (fileType) {
                case "image":
                  sImage = fileInfo.files[0].url;
                  var oImage = new Image();

                  oImage.onload = function () {

                    var img = "<img src='" + sImage + "' />";

                    $uploadedImageContainer.html(img);

                    changesDone();
                  }

                  oImage.src = sImage;
                  break;
                case "audio":
                  if ((mimeType != "mpeg") && (mimeType != "mp3")) {
                    alertRequest = 'ht-load-file';
                    showAlert(_L('uploadOnlyMp3'), false);
                  }
                  else {
                    sSound = fileInfo.files[0].url;

                    var sound = "<div class='speaker stop' data-file='" + sSound + "'></div>";

                    var nRow = $uploadedSoundContainer.data("row");
                    var sSide = $uploadedSoundContainer.data("col");

                    createSound(nRow, sSide, sSound)

                    $uploadedSoundContainer.html(sound);

                    changesDone();
                  }
                  break;
              }
            }
          }
        }
        $('.loading').css('visibility', 'hidden');
      }
    });

    $(document).on('click', '.speaker', function () {

      soundManager.stopAll();
      $(".speaker.curr").removeClass("curr");

      $this = $(this);
      $this.addClass("curr");
      $(".speaker:not(.curr)").removeClass("play").addClass("stop");

      var nRow = $this.parent(".sound-self").data("row");
      var sSide = $this.parent(".sound-self").data("col");

      if ($this.hasClass("stop")) {
        $this.removeClass("stop").addClass("play");

        arSoundObjects[nRow][sSide].play({
          onfinish: function () {
            $this.removeClass("play").addClass("stop");
          }
        });
      }
      else
        $this.removeClass("play").addClass("stop");
    });

    $(document).on('click', '.ht-ok', function (e) {
      alertClosed("ok");
    });

    $(document).on('click', '.ht-cancel', function (e) {
      alertClosed("cancel");
    });


    $("#add-element").click(function () {
      $('.pairs').append(createPair($('.pair').length + 1, 'true'));
      changesDone();
    });

    $(document).on('click', '.pair-delete', function () {
      removeElement(this.parentElement);
    })

    $(document).on('click', '.bg-image-delete', function () {

      $('#bgImageFieldWrapper .picture-self').html('');
      backgroundObj.image = '';
      changesDone();
    });

  };
}
