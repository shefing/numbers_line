var yesnoTemplate = function () {
    var lms;
    var lmsSupported;
    var lmsRead;
    var lmsSave;
    var lmsVisited;
    var lmsData;

    var lmsMode;
    var lmsAccess;
    var lmsStore;
    var lmsSaveStarted;
    var lmsCredit;
    var workMode;
    var prevMode;
    var lmsCredit;
    var bLearningReview = false;
    var bSilentSave = true;

    var State;

    var self = this;
    var lmsPreset;
    var dom;

    var isMobile;
    function _isMobile() {
        var check = false;
        (function (a) {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
        })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    }
    isMobile = _isMobile();

    self.init = function () {
        $('html').attr('lang', cet.localization.language);
        $('html').attr('data-dir', cet.localization.direction);

        lmsPreset = cet.content.Settings.preset;
        if (!lmsPreset) {
            lmsPreset = "";
        }
        else {
            try {
                lmsPreset = decodeURIComponent(lmsPreset);
            }
            catch (e) {
                lmsPreset = "";
            }
        }

        lms = cet.content.lms;
        lmsSupported = lms.Settings.supported;
        lmsSave = false;
        lmsRead = false;
        lmsVisited = false;
        workMode = "Training";
        if (lmsSupported && cet.content.lms.Activity.engagement.mode !== null) {
            if (lmsSupported) {
                workMode = "Learning";
                lmsMode = cet.content.lms.Activity.engagement.mode;
                lmsAccess = cet.content.lms.Activity.engagement.access;
                lmsStore = cet.content.lms.Activity.engagement.store;
                lmsCredit = cet.content.lms.Activity.engagement.credit;
                lmsRead = (lmsStore == "read" || lmsStore == "readwrite");
                lmsSave = (lmsStore == "readwrite");
                if (lmsMode == "review")
                    workMode = "Results";
            }

            if (lmsMode == "solved")
              workMode = "Solution";
            else if (lmsMode == "browse")
              workMode = "Learning";
            else if (lmsMode == "browse_review") {
              workMode = "Learning";
              bLearningReview = true;
            }
            else if (lmsMode == "normal")
              workMode = "Evaluation";
            else if (lmsMode == "review") {
              if (lmsAccess == "read")
                workMode = "Results";
              else
                workMode = "Repair";
            }

            if(workMode == "Training")
              lms.Activity.settings.evaluationMethod("manual");
        }
        lmsSaveStarted = (lmsSupported && cet.content.lms.Activity.engagement.store == 'readwrite');
      
        loadData();
    };

    function loadData() {
        if (lmsRead) {
            cet.content.State.load(function (lmsData) {
                if (!lmsData) {
                    initTemplate(lmsPreset, null);
                }
                else {
                    initTemplate(lmsPreset, lmsData);
                }
            })
        }
        else {
            initTemplate(lmsPreset, null);
        }
    }

    function initTemplate(sPreset, dataState) {
        try {
            if (dataState != null) {
                dataState = decodeURIComponent(dataState);
                State = JSON && JSON.parse(dataState) || $.parseJSON(dataState);
            }
            else if (lmsPreset == "") {
                State = {};
            }
            else {
                State = JSON && JSON.parse(sPreset) || $.parseJSON(sPreset);
            }
        }
        catch (e) {
            State = {};
        }

        initApplication();
    }

    function saveState(state) {
        if (lmsSaveStarted) {
            if (!lmsVisited) {
                lmsVisited = true;
                cet.content.lms.Activity.start();
            }
        }

        if (lmsSave) {
            var _state = JSON.stringify(state);
            cet.content.State.save(_state, bSilentSave);
            bSilentSave = false;

            try {
                var score = 0;
                for (var i = 0; i < state.items.length; i++) {
                    if (state.items[i].answer == state.items[i].correct_answer) {
                        score++;
                    }
                }
                score = score / state.items.length * 100;
                cet.content.lms.Activity.score(score);
                cet.content.lms.Activity.isAnswered(state.game_state != 'start');
            }
            catch (ex) {

            }
        }
    }

    function initApplication() {
        dom = '<div></div>';
        dom = $(dom);
        $('.yesno-asset-wraper').html(dom);

        var yesno_params = {
            preset: State,
            lang: cet.localization.language,
            isEditMote: false,
            isReadOnly: (workMode == "Results"),
            container: dom,
            onFullScreen: displayMode,
            saveState: saveState,
            workMode: workMode
        }
        var yesno_editor = yesno(yesno_params);

        onResize();
    }

    function isFullScreen() {
        if ('fullscreen' in document) {
            return document.fullscreen;
        }
        return $('html').hasClass('cet-fullscreen');
    }

    var isPortraitDetect = function () {
        var isPortrait = false;
        if (isMobile) {
            if ('screen' in window && 'orientation' in window.screen && 'angle' in window.screen.orientation && (window.screen.orientation.angle == 0 || window.screen.orientation.angle == 180 || window.screen.orientation.angle == -180)) {
                isPortrait = true;
            }
            else if ('orientation' in window && (window.orientation == 0 || window.orientation == 180 || window.orientation == -180)) {
                isPortrait = true;
            }
            else if ((!('orientation' in window)) && 'screen' in window && window.screen.width < window.screen.height) {
                isPortrait = true;
            }
        }
        return isPortrait;
    };
    if (isMobile) {
        setInterval(function () {
            $('html').attr('data-orientation', isPortraitDetect() ? 'p' : 'l');
        }, 2000);
    }

    function displayMode() {
        if (isFullScreen()) {
            cet.content.UI.displayMode(cet.content.DisplayModes.INLINE);
        } else {
            cet.content.UI.displayMode(cet.content.DisplayModes.FULLSCREEN);
        }
    }

    var onResize = function () {
        if (!dom) {
            return;
        }

        var sizing = {
            pc: { w: 858, h: 511 },
            mobile: { w: 360, h: 640 }
        }

        var winW = $(window).width();
        var winH = $(window).height();
        var lW, lH, constanta = 10;

        lW = sizing[isMobile ? 'mobile' : 'pc'].w;
        lH = sizing[isMobile ? 'mobile' : 'pc'].h;

        if (isFullScreen()) {
            var fs, mt = 0;

            if (winW / winH > lW / lH) {
                var fs = constanta * (winH / lH);
            }
            else {
                var fs = constanta * (winW / lW);
                mt = Math.ceil((winH - (lH * fs / constanta)) / 2);
            }

            dom.css({
                'font-size': fs + 'px',
                'margin-top': mt + 'px'
            });
            $('html, body').css('font-size', (fs * (isMobile ? 1 : 1)) + 'px');
        }
        else {
            var fs = constanta * (winW / lW);
            dom.css({
                'font-size': fs + 'px',
                'margin-top': '0px'
            });
            $('html, body').css('font-size', (fs * (isMobile ? 1 : 1)) + 'px');

            var h = Math.ceil(winW * lH / lW);
            if (h != winH) {
                cet.content.UI.setHeight(h);
            }
        }
    };

    self.registerEvents = function () {
      window.addEventListener('resize', onResize, true);

      window.addEventListener("orientationchange", function (event) {
        if (event.target.screen.orientation.angle == 90 || event.target.screen.orientation.angle == -90) {
          $('.yesno').attr('data-orientation', 'l');
        } else {
          $('.yesno').attr('data-orientation', 'p');
        }
      });
    };
};