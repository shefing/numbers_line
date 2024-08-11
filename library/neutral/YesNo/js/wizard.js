var yesnoWizard = function () {
    var self = this;
    var _L = document.webL10n.get;

   // var oPreset;
    var bInit;
    var bValid = false;
    var valErrors;
    var myHeight = 0;

    self.init = function () {
        cet.content.DesignTime.onValidationRequested = validateWizard;
        cet.content.DesignTime.onPresetRequested = buildPreset;

        bInit = true;
        myHeight = 533;
        cet.content.UI.setHeight(myHeight);
        loadPreset();
        createWizard();
        bInit = false;
    }

    self.registerEvents = function () {
        initEvents();
    }

    function loadPreset() {
      if (!oPreset) {
        var sPreset = cet.content.DesignTime.preset;
        if (!sPreset) {
          oPreset = {};
        }
        else {
          sPreset = decodeURIComponent(sPreset);
          oPreset = JSON && JSON.parse(sPreset) || $.parseJSON(sPreset);
        }

        setInterval(function () {
          var $wrapper = $(".wizard-wrapper");
          if (myHeight != $wrapper.outerHeight() + 1) {
            changesDone();
          }
        }, 100);
      }
    }

    function validateWizard() {
        bValid = true;
        valErrors = new Array();

        validateWizardData();

        if (valErrors.length > 0) {
            bValid = false;
            return valErrors;
        }
        bValid = true;
        return null;
    }

    function buildPreset() {
        if (bValid) {
            var _oPreset = createPreset();

            //oPreset.extended = 'sandbox';
            //oPreset.evaluation = 'manual';
            //oPreset.gameMode = true;

            var sOut = JSON.stringify(_oPreset, null, 2);
            sOut = encodeURIComponent(sOut);
            return sOut;
        }
        return JSON.stringify({}, null, 2);
    }

    function changesDone() {
        if (!bInit) {
            cet.content.DesignTime.notifyChange();
        }
        var $wrapper = $(".wizard-wrapper");
        var newHeight = $wrapper.outerHeight() + 1;
        if (newHeight != myHeight) {
            myHeight = newHeight;
            cet.content.UI.setHeight(myHeight);
        }
    }

    var wizardDom;
    var yesno_editor = false;
    var validateWizardData = function () {
      if (oPreset.timer_has_limit && oPreset.timer_limit < 10) {
        valErrors.push(_L('error_timer_limit'));
        bValid = false;
      }
      if ((oPreset.answer_btn_bg_color && oPreset.answer_btn_bg_color.replace(/[^0-9a-z]/gi, '').length != 6) || (oPreset.game_bg_color && oPreset.game_bg_color.replace(/[^0-9a-z]/gi, '').length != 6) || (oPreset.leading_color && oPreset.leading_color.replace(/[^0-9a-z]/gi, '').length != 6)) {
        valErrors.push(_L('color_not_correct'));
        bValid = false;
      }
        //valErrors.push(_L('validate_error'));
    };

    var createPreset = function () {
        return yesno_editor ? yesno_editor.getPreset() : oPreset;
    };

    var createWizard = function () {
        wizardDom = '<div class="fields">\
                    </div>';
        wizardDom = $(wizardDom);
        $('.wizard-wrapper').html(wizardDom);

        var yesno_params = {
            preset: oPreset,
            lang: _L('lang'),
            isEditMote: true,
            container: wizardDom
        }
        yesno_editor = yesno(yesno_params);
        onResize();
    };

    var onResize = function () {
        var fs = (10 * ($(window).width() / 858));
        $('.wizard-wrapper, html, body').css('font-size', fs + 'px');
        changesDone();
    };

    var initEvents = function () {
        window.addEventListener('resize', onResize, true);
    };
};