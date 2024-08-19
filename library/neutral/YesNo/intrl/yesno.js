Array.prototype.move = function (from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
};
Array.prototype.insert_to = function (item, to) {
    this.splice(to, 0, item);
};
Array.prototype.remove_index = function (index) {
    this.splice(index, 1);
};
Array.prototype.remove_item = function (item) {
    var index = this.indexOf(item);
    if (index >= 0) {
        this.remove_index(index);
    }
};
String.prototype.convertToRGB = function(){

    var color = this.replace(/[^0-9a-z]/gi, '');

  if(color.length != 6){
        //color = oPreset.skin_data.leading_color    ;
        throw "Only six-digit hex colors are allowed.";
    }

    var aRgbHex = color.match(/.{1,2}/g);
    var aRgb = [
        parseInt(aRgbHex[0], 16),
        parseInt(aRgbHex[1], 16),
        parseInt(aRgbHex[2], 16)
    ];
    return aRgb;
};

window.requestAnimationFrame = window.requestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.msRequestAnimationFrame
    || function (f) { return setTimeout(f, 1000 / 60) };

window.cancelAnimationFrame = window.cancelAnimationFrame
    || window.mozCancelAnimationFrame
    || function (requestID) { clearTimeout(requestID) };

var oPreset;
var currentSkin;
var yesno = function (yesno_params) {
    var preset = yesno_params.preset,
        lang = yesno_params.lang,
        isEditMote = yesno_params.isEditMote,
        container = yesno_params.container,
        onFullScreen = yesno_params.onFullScreen ? yesno_params.onFullScreen : function(){},
        saveState = yesno_params.saveState ? yesno_params.saveState : function(state){},
        isReadOnly = yesno_params.isReadOnly ? yesno_params.isReadOnly : false,
        workMode = yesno_params.workMode;

    var self = this;
    oPreset = JSON.parse(JSON.stringify(preset));
    var dom;

    var isIE;
    function _isIE() {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            return true;
        }
        var trident = ua.indexOf('Trident/');
        if (trident > 0) { // IE11
            return true;
        }

        if (/Edge\/\d./i.test(ua)) {    //Edge
            return true;
        }

        if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) { // iOS
            return true;
        }

        return false;
    }
    isIE = _isIE();
    //isIE = true;

    var isMobile;
    function _isMobile() {
        var check = false;
        (function (a) {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
        })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    }
    isMobile = _isMobile();

    var newLineAttr = '\n';
    var langList = {
        he: {
            lang: 'he',
            tiny_lang: 'he_IL',
            dir: 'rtl',

            yesno_slides: 'שאלות',
            add_slide: '+ הוספת שאלה',
            remove_slide: 'מחיקה',
            clone_slide: 'שכפול',
            max_slide_number: 'עד 10 שאלות',

            edit_game_bg: 'עריכת הרקע',
            add_image_bg: 'העלאת תמונת רקע',
            update_image_bg: 'החלפת תמונת רקע',
            remove_bg_image: 'מחיקת תמונת רקע',
            recommended_size_image_bg: 'גודל מומלץ 914x480',
            image_error_type: 'סוג הקובץ לא נתמך',
            image_error_size: 'הקובץ גדול מדי (10MB)',
            sound_error_type: 'סוג הקובץ לא נתמך',
            sound_error_size: 'הקובץ גדול מדי (10MB)',
            full_width: 'רוחב מלא',
            full_height: 'גובה מלא',
            cover: 'מילוי מלא',
            game_bg_image_layout: 'פריסת התמונה',
            game_bg_color: 'צבע רקע',

            edit_timer_settings: 'הגדרות טיימר',
            edit_timer_settings_title: 'זמן לשאלה',
            edit_timer_settings_time_limit: 'הגבלת זמן',
            edit_timer_settings_without_time: 'ללא הגבלת זמן',
            edit_timer_settings_seconds: 'שניות',

            edit_bar_settings: 'תצוגת ההתקדמות',
            edit_bar_settings_progress: 'תצוגה',
            edit_bar_settings_background_color: 'צבע הרקע',
            edit_bar_settings_background_color_refresh: 'איפוס צבע הרקע',
            edit_bar_settings_shape1: 'איסוף נקודות',
            edit_bar_settings_shape2: 'בר מתמלא',
            edit_bar_settings_order_of_questions: 'סדר השאלות',
            edit_bar_settings_order_of_questions_in_the_order: 'קבוע',
            edit_bar_settings_order_of_questions_random: 'רנדומלי',

            placeholder: 'הטקסט שלי...',

            skins_title: 'ערכות עיצוב',
            skin_title_0: 'יסודי',
            skin_title_1: 'חטיבה',
            skin_title_2: 'תיכון',
            skin_title_3: 'אחר',
            refresh: 'איפוס',

            font: 'גופן',
            lang_data: 'שפת התוכן',
            he: 'עברית',
            ar: 'ערבית',
            en: 'אנגלית',

            start_title: 'הודעת פתיחת המשחק',
            start_text: 'בואו נתחיל',
            start_text_min_error: 'חסר טקסט פתיחה',
            end_title: 'משוב בסיום המשחק',
            end_text: 'כל הכבוד!',
            end_text_min_error: 'חסר טקסט סיום',
            time_over_title: 'משוב בסיום הזמן',
            time_over_text: 'אופס, נגמר הזמן...',
            time_over_min_error: 'חסר טקסט סיום הזמן',
            pause_title: 'טקסט הפסקת המשחק',
            pause_text: 'אפשר לחזור למשחק?',
            pause_min_error: 'חסר טקסט הפסקה',

            question_layout: 'פריסת שאלה',
            leading_color: 'צבע מוביל',

            question_image_set_title: 'תמונה',
            question_image_update_title: 'החלפת התמונה' + '<br>' + 'גודל מומלץ 525x246',
            question_image_delete_toltip: 'מחיקת התמונה',

            sound_edit_tooltip: 'עריכת קובץ השמע',
            sound_add: 'הוספת קובץ השמע',
            sound_update: 'החלפת קובץ השמע',
            sound_remove_tooltip: 'מחיקת קובץ השמע',
            sound_auto_play: 'הפעלה אוטומטית',

            answer_btn_font_edit: 'עריכה',
            answer_btn_bg_color: 'צבע הרקע',
            answer_btn_text_color: 'צבע הטקסט',
            answer_btn_font_size: 'גודל הטקסט',
            answer_btn_refresh: 'איפוס',
            answer_btn_placeholder: 'תשובה...',
            answer_btn_select_tooltip: 'לסמן כתשובה נכונה',

            final_score_correct_1: 'ענית נכון על',
            final_score_correct_2: 'שאלות מתוך',
            final_score_correct_3:'',
            final_text_popup: 'לצפיה בתשובות לחצו על החץ מטה',

            viewAns:'צפייה בתשובות',
            tryAgain:'משחק חדש',

            btn_next: 'הבא',
            btn_previous: 'קודם',
            btn_play_sound:'נגן קובץ שמע'


        },
        ar: {
            lang: 'ar',
            tiny_lang: 'ar',
            dir: 'rtl',

            yesno_slides: 'أسئلة',
            add_slide: 'إضافة سؤال + ',
            remove_slide: 'حذف',
            clone_slide: 'نسخ',
            max_slide_number: 'حتّى 10 أسئلة',
            edit_game_bg: 'تحرير الخلفيّة',
            add_image_bg: 'رفع صورة خلفيّة',
            update_image_bg: 'استبدال صورة  الخلفيّة',
            remove_bg_image: 'حذف صورة الخلفيّة',
            recommended_size_image_bg: 'الحجم الأمثل 858x511',
            image_error_type: 'نوع الملفّ غير مدعوم',
            image_error_size: 'الملفّ أكبر من المسموح به (10MB)',
            sound_error_type: 'نوع الملفّ غير مدعوم',
            sound_error_size: 'الملفّ أكبر من المسموح به (10MB)',
            full_width: 'عرض كامل',
            full_height: 'ارتفاع كامل',
            cover: 'تعبئة كاملة',
            game_bg_image_layout: 'توزيع الصورة',
            game_bg_color: 'لون الخلفيّة',

            edit_timer_settings: 'ضبط التوقيت',
            edit_timer_settings_title: 'المدّة للسؤال',
            edit_timer_settings_time_limit: 'تحديد الوقت',
            edit_timer_settings_without_time: 'من دون تحديد الةقت',
            edit_timer_settings_seconds: 'ثوانٍ',

            edit_bar_settings: 'عرض التقدّم',
            edit_bar_settings_progress: 'العرض',
            edit_bar_settings_background_color: 'لون الخلفيّة',
            edit_bar_settings_background_color_refresh: 'إعادة ضبط لون الخلفيّ',
            edit_bar_settings_shape1: 'جمع نقاط',
            edit_bar_settings_shape2: 'شريط ممتلئ',
            edit_bar_settings_order_of_questions: 'ترتيب الأسئلة',
            edit_bar_settings_order_of_questions_in_the_order: 'ثابت',
            edit_bar_settings_order_of_questions_random: 'عشوائيّ',

            placeholder: 'نصّي...',

            skins_title: 'رزمة تصميم',
            skin_title_0: 'ابتدائيّ',
            skin_title_1: 'إعداديّ',
            skin_title_2: 'ثانويّ',
            skin_title_3: 'آخر',
            refresh: 'إعادة الضبط',

            font: 'خطّ',
            lang_data: 'لغة المضمون',
            he: 'العبريّ’',
            ar: 'العربيّة',
            en: 'الإنجليزيّة',

            start_title: 'رسالة افتتاح اللعبة',
            start_text: 'هيّا نبدأ',
            start_text_min_error: 'חסר טקסט פתיחה',
            end_title: 'مردود في نهاية اللعبة',
            end_text: 'كلّ الاحترام!',
            end_text_min_error: 'חסר טקסט סיום',
            time_over_title: 'مردود في نهاية الوقت',
            time_over_text: 'عفوًا! انتهى الوقت',
            time_over_min_error: 'חסר טקסט סיום הזמן',
            pause_title: 'نصّ إيقاف اللعبة',
            pause_text: 'هل يمكن العودة إلى اللعبة؟',
            pause_min_error: 'חסר טקסט הפסקה',

            question_layout: 'توزيع السؤال',
            leading_color: 'اللون الأبرز',

            question_image_set_title: 'صورة',
            question_image_update_title: 'استبدال الصورة' + '<br>' + 'الحجم المفضّل 425x265',
            question_image_delete_toltip: 'حذف الصورة',

            sound_edit_tooltip: 'تحرير الملفّ الصوتيّ',
            sound_add: 'إضافة ملفّ صوتيّ',
            sound_update: 'استبدال ملفّ صوتيّ',
            sound_remove_tooltip: 'حذف ملفّ صوتيّ',
            sound_auto_play: 'تشغيل تلقائيّ',

            answer_btn_font_edit: 'تحرير',
            answer_btn_bg_color: 'لون الخلفيّة',
            answer_btn_text_color: 'لون النصّ',
            answer_btn_font_size: 'حجم النصّ',
            answer_btn_refresh: 'إعادة الضبط',
            answer_btn_placeholder: 'إجابة...',
            answer_btn_select_tooltip: 'التأشير كإجابة صحيحة',

            final_score_correct_1: 'أجب عن',
            final_score_correct_2: 'أسئلة من',
            final_score_correct_3:'',
            final_text_popup: 'لمشاهدة الإجابات انقروا على السهم إلى الأسفل',

            viewAns:'مشاهدة الإجابات',
            tryAgain:'لعبة جديدة',

            btn_next: 'التالي',
            btn_previous: 'السابق',
            btn_play_sound: 'تشغيل ملف صوتي'
        },
        en: {
            lang: 'en',
            tiny_lang: 'en',
            dir: 'ltr',

            yesno_slides: 'question',
            add_slide: 'add a question',
            remove_slide: 'delete',
            clone_slide: 'copy',
            max_slide_number: 'total: 10 questions',
            edit_game_bg: 'background',
            add_image_bg: 'upload background picture',
            update_image_bg: 'change background picture',
            remove_bg_image: 'delete background picture',
            recommended_size_image_bg: 'optimal size: 858x511',
            image_error_type: 'unsupported file type',
            image_error_size: 'oversized file (10MB)',
            sound_error_type: 'unsupported file type',
            sound_error_size: 'oversized file (10MB)',
            full_width: 'full width',
            full_height: 'full height',
            cover: 'filled',
            game_bg_image_layout: 'picture orientation',
            game_bg_color: 'background color',

            edit_timer_settings: 'timer settings',
            edit_timer_settings_title: 'time per question',
            edit_timer_settings_time_limit: 'time limit',
            edit_timer_settings_without_time: 'no time limit',
            edit_timer_settings_seconds: 'seconds',

            edit_bar_settings: 'progression bar',
            edit_bar_settings_progress: 'display',
            edit_bar_settings_background_color: 'background color',
            edit_bar_settings_background_color_refresh: 'reset background color',
            edit_bar_settings_shape1: 'points count',
            edit_bar_settings_shape2: 'progression bar',
            edit_bar_settings_order_of_questions: 'question order',
            edit_bar_settings_order_of_questions_in_the_order: 'fixed',
            edit_bar_settings_order_of_questions_random: 'random',

            placeholder: 'my text...',

            skins_title: 'design themes ',
            skin_title_0: 'elementary',
            skin_title_1: 'middle school',
            skin_title_2: 'high school',
            skin_title_3: 'other',
            refresh: 'reset',

            font: 'font',
            lang_data: 'content language',
            he: 'hebrew',
            ar: 'arabic',
            en: 'english',

            start_title: 'opening message',
            start_text: 'Let’s start!',
            start_text_min_error: 'Missing introductory text.',
            end_title: 'completion feedback',
            end_text: 'Way to go!',
            end_text_min_error: 'Missing statement of completion.',
            time_over_title: 'time out feedback',
            time_over_text: 'Oops! Time’s up!',
            time_over_min_error: 'Missing text for time up.',
            pause_title: 'pause notification',
            pause_text: 'Do you want to keep going?',
            pause_min_error: 'Missing text for a break.',

            question_layout: 'question layout',
            leading_color: 'leading color',

            question_image_set_title: 'picture orientation',
            question_image_update_title: 'change picture' + '<br>' + 'optimal size: 425x265',
            question_image_delete_toltip: 'delete picture',

            sound_edit_tooltip: 'edit sound file',
            sound_add: 'add a sound file',
            sound_update: 'change sound file',
            sound_remove_tooltip: 'delete sound file',
            sound_auto_play: 'play automatically',

            answer_btn_font_edit: 'edit',
            answer_btn_bg_color: 'background color',
            answer_btn_text_color: 'font color',
            answer_btn_font_size: 'font size',
            answer_btn_refresh: 'reset',
            answer_btn_placeholder: 'answer...',
            answer_btn_select_tooltip: 'mark as a correct repsonse',

            final_score_correct_1: 'You answered',
            final_score_correct_2: 'out of',
            final_score_correct_3:'questions correctly',
            final_text_popup: 'To view the answers, click the arrow below',

            viewAns:'Review the answers',
            tryAgain:'Replay',

            btn_next: 'Next',
            btn_previous: 'Previous',
            btn_play_sound: 'Play sound'

        }
    };
    var _L = (lang in langList) ? langList[lang] : langList.he;

    var fontList = [
        {title: "Arimo", font: "'Arimo',sans-serif"},
        {title: "Abraham", font: "'Abraham'"},
        {title: "Assistant", font: "'Assistant',sans-serif"},
        {title: "Alef", font: "'Alef',sans-serif"},
        {title: "Heebo", font: "'Heebo',sans-serif"},
        {title: "Noto Sans Hebrew", font: "'Noto Sans Hebrew'"},
        {title: "Open Sans Hebrew", font: "'Open Sans Hebrew'"},
        {title: "Lateef", font: "'Lateef',cursive"},
        {title: "Traditional Arabic", font: "'traditional arabic'"},
        {title: "Arial", font: "'Arial',sans-serif"},
        {title: "Courier New", font: "'Courier New',sans-serif"},
        {title: "Tahoma", font: "'Tahoma',sans-serif"},
        {title: "Times New Roman", font: "'Times New Roman',sans-serif"}
    ];

    var defaultSkinData = [
        {
            comon: {
                font: "'Arial',sans-serif",
                leading_color: 'ff0000',
                game_bg_image: false,
                game_bg_color: 'ff00ff',
                game_bg_image_layout: 'c',
                bar_shape: 3,
                bar_background_color: 'ffff00',
                answer_btn_bg_color: '0b94de',
                answer_btn_text_color: 'ffffff',
                answer_btn_font_size: '2.4',
                icon_sound: 'icon-sound',
            },
            he: {
                dir: 'rtl',
                text_align: 'right',
            },
            ar: {
                dir: 'rtl',
                text_align: 'right',
            },
            en: {
                dir: 'ltr',
                text_align: 'left',
            }
        },
        {
            comon: { //hatav
                font: "'Assistant',sans-serif",
                leading_color: '006AE7',
                game_bg_image: '../content/img/skins/hatav/bg.png',
                game_bg_color: 'ffffff',
                game_bg_image_layout: 'c',
                bar_shape: 4,
                bar_background_color: 'FEFEFE',
                answer_btn_bg_color: '006AE7',
                answer_btn_text_color: 'ffffff',
                answer_btn_font_size: '2.4',
                icon_sound: 'icon-sound',
            },
            he: {
                dir: 'rtl',
                text_align: 'right',
            },
            ar: {
                dir: 'rtl',
                text_align: 'right',
            },
            en: {
                dir: 'ltr',
                text_align: 'left',
            }
        },
        {
            comon: {
                font: "'Arimo',sans-serif",
                leading_color: '00ff00',
                game_bg_image: false,
                game_bg_color: 'ffffff',
                game_bg_image_layout: 'c',
                bar_shape: 5,
                bar_background_color: 'ffffff',
                answer_btn_bg_color: '0b94de',
                answer_btn_text_color: 'ffffff',
                answer_btn_font_size: '2.4',
                icon_sound: 'icon-sound',
            },
            he: {
                dir: 'rtl',
                text_align: 'right',
            },
            ar: {
                dir: 'rtl',
                text_align: 'right',
            },
            en: {
                dir: 'ltr',
                text_align: 'left',
            }
        },
        {
            comon: { //other
                font: "'Open Sans Hebrew',sans-serif",
                leading_color: '31BFE2',//'29abe2',
                game_bg_image: '../content/img/skins/other/bg.png',
                game_bg_color: 'ffffff',
                game_bg_image_layout: 'c',
                bar_shape: 1,
                bar_background_color: 'ffffff',
                answer_btn_bg_color: '0b94de',
                answer_btn_text_color: 'ffffff',
                answer_btn_font_size: '2.4',
                icon_sound: 'icon-question-sound',
            },
            he: {
                dir: 'rtl',
                text_align: 'right',
            },
            ar: {
                dir: 'rtl',
                text_align: 'right',
                font: "'Abraham'",
            },
            en: {
                dir: 'ltr',
                text_align: 'left',
            }
        }
    ];
    defaultSkinData.costume_skin = 1;//defaultSkinData.length - 1;
    defaultSkinData.isCostumeSkin = function (skin) {
        if(typeof(skin) == 'undefined') {
            skin = oPreset.skin;
        }

        if(skin == defaultSkinData.costume_skin) {
            return true;
        }
        return false;
    };
    defaultSkinData.getData = function () {
        var skin_data = defaultSkinData[oPreset.skin];
        var lang_skin_data = (oPreset.lang_data in skin_data) ? skin_data[oPreset.lang_data] : {};
        return {...(skin_data.comon), ...lang_skin_data};
    };
    defaultSkinData.getPresetVal = function (param, reset=false) {
        if(/*defaultSkinData.isCostumeSkin() &&*/ oPreset[param] && !reset) {
            return oPreset[param];
        }
        else {
            return oPreset.skin_data[param];
        }
    };

    var fontSelector = false,
        langSelsector = false,
        startTitleInput = false,
        entTitleInput = false,
        pauseTitleInput = false,
        timeOverTitlerInput = false,
        leadingColorPicker = false,
        layoutSelector = false,
        gameBgLayouySelector = false,
        gameBgColorPicker = false,
        timerHasLimitSelector = false,
        timerLimitInput = false,
        timer = false,
        barProgressSelector = false,
        barOrderQuestionsSelector = false,
        barBgColorPicker = false,
        answer_btn_panel = false,
        answerBtnBgColorPicker = false,
        answerBtnTextColorPicker = false,
        answerBtnFontSizeSelector = false;

    var slidesDom, shapesDom, questionsDom;
    var flag=true;
    $('body').on('dragstart drop', function (e) {
        e.preventDefault();
        return false;
    });

    var setDefaultPreset = function () {
        if (!('items' in oPreset)) {
            var item = newItemData();
            oPreset.items = [item];
        }

        if (!('lang_data' in oPreset)) {
            oPreset.lang_data = lang;
        }
        if (!('skin' in oPreset)) {
            oPreset.skin = defaultSkinData.costume_skin;
        }
        if (!('skin_data' in oPreset)) {
            oPreset.skin_data = defaultSkinData.getData();
        }
        if (!('font' in oPreset)) {
            oPreset.font = false;
        }
        if (!('leading_color' in oPreset)) {
            oPreset.leading_color = false;
        }
        if (!('game_bg_image' in oPreset)) {
            oPreset.game_bg_image = defaultSkinData.getPresetVal('game_bg_image',true);//false;
        }
        if (!('game_bg_color' in oPreset)) {
            oPreset.game_bg_color = false;
        }
        if (!('game_bg_image_layout' in oPreset)) {
            oPreset.game_bg_image_layout = false;
        }

        if (!('start_text' in oPreset)) {
            oPreset.start_text = langList[oPreset.lang_data].start_text;
        }
        if (!('end_text' in oPreset)) {
            oPreset.end_text = langList[oPreset.lang_data].end_text;
        }
        if (!('pause_text' in oPreset)) {
            oPreset.pause_text = langList[oPreset.lang_data].pause_text;
        }
        if (!('time_over_text' in oPreset)) {
            oPreset.time_over_text = langList[oPreset.lang_data].time_over_text;
        }

        if (!('timer_has_limit' in oPreset)) {
            oPreset.timer_has_limit = true;
        }
        if (!('timer_limit' in oPreset)) {
            oPreset.timer_limit = 30;
        }
        if (!('bar_shape' in oPreset)) {
            oPreset.bar_shape = false; //[1;5]
        }
        if (!('bar_background_color' in oPreset)) {
            oPreset.bar_background_color = false;
        }
        if (!('bar_order_of_questions' in oPreset)) {
            oPreset.bar_order_of_questions = 'o'; // 'o', 'r'
        }
        if (!('index' in oPreset)) {
            oPreset.index = 0;
        }
        if (!('answer_btn_bg_color' in oPreset)) {
            oPreset.answer_btn_bg_color = false;
        }
        if (!('answer_btn_text_color' in oPreset)) {
            oPreset.answer_btn_text_color = false;
        }
        if (!('answer_btn_font_size' in oPreset)) {
            oPreset.answer_btn_font_size = false;
        }

    };

    var newItemData = function () {
        return {
            layout: 'it',
            text: '',
            text_sound: {url: false, auto_play: true},
            image: false,
            sound: {url: false, auto_play: false},
            text_btn_1: '',
            text_btn_2: '',
            correct_answer: 2,
            answer: false, // -1 (time out), 0/false, 1, 2
        };
    }

    var getPreset = function () {
        oPreset.items = [];
        shapesDom.find('.yesno-status_bar-item').map(function(){
            var id = $(this).attr('data-item_id');
            oPreset.items.push(items[id].getData());
        });
        return oPreset;
    }

    var init = function () {
        var wm = "n";
        if(workMode == "Evaluation"){
            wm = "ev";
        }else if(workMode == "Results" || workMode == "Solution"){
            wm = "sol";
        }
        var icon_start = "icon-play";
        if(oPreset.skin == 1)
            icon_start = "icon-start";
        dom = '<div class="yesno" data-lang="' + _L.lang + '" data-content_lang="' + oPreset.lang_data + '" data-skin="' + oPreset.skin + '" data-dir="' + _L.dir + '" data-is_edit="' + (isEditMote ? '1' : '0') + '" mode="'+wm+'">\
                    <div data-edit_mode="1">\
                        <div class="yesno-editor_section" ><div class="yesno-editor_title">' + _L.skins_title + '</div><div class="yesno-editor_input yesno-skins"></div></div>\
                        <div class="yesno-editor_section"><div class="yesno-editor_title">' + _L.lang_data + '</div><div class="yesno-editor_input yesno-lang_data"></div></div>\
                        <div class="yesno-editor_section1">\
                            <div class="yesno-editor_title">' + _L.yesno_slides + '</div>\
                            <div class="yesno-slides">\
                                <div class="yesno-slide_item yesno-slide_item--add" data-tooltip="' + _L.max_slide_number + '" data-tooltip_layout_v="b" data-tooltip_layout_h="c"><div class="yesno-slide_item-text">' + _L.add_slide + '</div></div>\
                            </div>\
                        </div>\
                        <div class="yesno-contaner-tools">\
                            <div class="yesno-contaner-tools--right">\
                                <div class="yesno-contaner-tool" data-tool="title">' + _L.question_layout + '</div>\
                                <div class="yesno-contaner-tool" data-tool="layout"></div>\
                            </div>\
                            <div class="yesno-contaner-tools--left" data-on_costume_skin_show="1">\
                                <div class="yesno-contaner-tool" data-tool="title">' + _L.font + '</div>\
                                <div class="yesno-contaner-tool" data-tool="font"></div>\
                                <div class="yesno-contaner-tool" data-tool="title">' + _L.leading_color + '</div>\
                                <div class="yesno-contaner-tool" data-tool="color"></div>\
                            </div>\
                        </div>\
                    </div>\
                    <div class="yesno-contaner">\
                        <div class="yesno-play_panel" data-edit_mode="0">\
                            <div class="yesno-play_panel-contaner">\
                                <div class="yesno-play_panel-tetle yesno-text">\
                                    <span class="yesno-play_panel-tetle--start">' + oPreset.start_text + '</span>\
                                    <span class="yesno-play_panel-tetle--pause">' + oPreset.pause_text + '</span>\
                                    <span class="yesno-play_panel-tetle--time_over">' + oPreset.time_over_text + '</span>\
                                </div>\
                                <div tabindex="0" role="button" aria-label="' + oPreset.start_text + '"  class="yesno-play_panel-btn"><svg><use href="../content/img/icons.svg#'+ icon_start +'"></use></svg></div>\
                            </div>\
                        </div>\
                        <div class="yesno-status_bar">\
                            <div class="yesno-status_bar-items"></div>\
                             <div class="yesno-deactivating-The-Timer"><img class ="imageToStopTimerOrContinue" src="../content/img/btn_hover.png" alt=""></div>\
                            <div class="yesno-status_bar-timer-wraper">\
                                <div class="yesno-status_bar-timer"></div>\
                                <div class="yesno-tools_btn_wraper" data-edite="timer" data-layout="h" data-edit_mode="1">\
                                    <div class="yesno-edit_btn yesno-tools_btn" data-edite="timer" data-tooltip="' + _L.edit_timer_settings + '" data-tooltip_layout_v="b" data-tooltip_layout_h="r">\
                                        <svg><use href="../content/img/icons.svg#icon-edit"></use></svg>\
                                        <div class="yesno-edit_panel" data-layout="v" data-layout_v="b" data-layout_h="r">\
                                            <div class="yesno-edit_panel-mask">\
                                            </div>\
                                            <div class="yesno-edit_panel-wraper">\
                                                <div class="yesno-edit_panel-content">\
                                                    <div class="yesno-edit_panel-row">\
                                                        <div class="yesno-edit_panel-row-key">' + _L.edit_timer_settings_title + '</div>\
                                                        <div class="yesno-edit_panel-row-val" data-val="timer_has_limit"></div>\
                                                        <div class="yesno-edit_panel-row-val" data-val="timer_limit"></div>\
                                                    </div>\
                                                </div>\
                                            </div>\
                                        </div>\
                                    </div>\
                                </div>\
                            </div>\
                            <div class="yesno-status_bar-clear-wraper" tabindex="0" role="button"   aria-label="' + _L.tryAgain + '" data-edit_mode="0"><svg><use href="../content/img/icons.svg#icon-clear_game"></use></svg></div>\
                            <div class="yesno-tools_btn_wraper" data-edite="bar" data-layout="h" data-edit_mode="1">\
                                <div class="yesno-edit_btn yesno-tools_btn" data-edite="bar" data-tooltip="' + _L.edit_bar_settings + '" data-tooltip_layout_v="b" data-tooltip_layout_h="l">\
                                    <svg><use href="../content/img/icons.svg#icon-edit"></use></svg>\
                                    <div class="yesno-edit_panel" data-layout="v" data-layout_v="b" data-layout_h="l">\
                                        <div class="yesno-edit_panel-mask">\
                                        </div>\
                                        <div class="yesno-edit_panel-wraper">\
                                            <div class="yesno-edit_panel-content">\
                                                <div class="yesno-edit_panel-row" data-on_costume_skin_show="1" id="bar-settings">\
                                                    <div class="yesno-edit_panel-row-key">' + _L.edit_bar_settings_progress + '</div>\
                                                    <div class="yesno-edit_panel-row-val" data-val="bar_settings_progress"></div>\
                                                </div>\
                                                <div class="yesno-edit_panel-row">\
                                                    <div class="yesno-edit_panel-row-key">' + _L.edit_bar_settings_order_of_questions + '</div>\
                                                    <div class="yesno-edit_panel-row-val" data-val="bar_settings_order_of_questions"></div>\
                                                </div>\
                                                <div class="yesno-edit_panel-row" data-on_costume_skin_show="1">\
                                                    <div class="yesno-edit_panel-row-key">' + _L.edit_bar_settings_background_color + '</div>\
                                                    <div class="yesno-edit_panel-row-val" data-val="bar_settings_background_color"></div>\
                                                    <div class="yesno-edit_panel-row-val yesno-edit_panel-row-val--refresh"><div class="yesno-edit_panel-refresh_btn" data-tooltip="' + _L.edit_bar_settings_background_color_refresh + '" data-tooltip_layout_v="b" data-tooltip_layout_h="c"><svg><use xlink:href="../content/img/icons.svg#refresh"></use></svg></div></div>\
                                                </div>\
                                            </div>\
                                        </div>\
                                    </div>\
                                </div>\
                            </div>\
                        </div>\
                        <div class="yesno-fullscreen_btn"><svg><use xlink:href="../content/img/icons.svg#icon-fullscreen"></use></svg></div>\
                        <div class="yesno-questions">\
                          <div class="swiper-wrapper">\
                          </div>\
                          <div class="slider arrow a-right" aria-label="'+ (_L.lang == "en" ? _L.btn_previous : _L.btn_next) +'" ></div>\
                          <div class="slider arrow a-left" aria-label="'+ (_L.lang == "en" ? _L.btn_next : _L.btn_previous) +'" ></div>\
                          <div class="arrow a-right" aria-label="'+ (_L.lang == "en" ? _L.btn_previous : _L.btn_next) +'" ></div>\
                          <div class="arrow a-left" aria-label="'+ (_L.lang == "en" ? _L.btn_next : _L.btn_previous) +'" ></div>\
                        </div>\
                        <div class="yesno-tools_btn_wraper" data-edite="game_bg" data-layout="h" data-edit_mode="1" data-on_costume_skin_show="1">\
                            <div class="yesno-edit_btn yesno-tools_btn" data-edite="game_bg" data-tooltip="' + _L.edit_game_bg + '" data-tooltip_layout_v="b" data-tooltip_layout_h="l">\
                                <svg><use href="../content/img/icons.svg#icon-edit"></use></svg>\
                                <div class="yesno-edit_panel" data-layout="h" data-layout_v="b" data-layout_h="l">\
                                    <div class="yesno-edit_panel-mask">\
                                    </div>\
                                    <div class="yesno-edit_panel-wraper">\
                                        <div class="yesno-edit_panel-content">\
                                            <div class="yesno-edit_panel-row" style="position: relative;">\
                                                <div class="yesno-edit_panel-update_file" data-tooltip="' + _L.recommended_size_image_bg + '" data-tooltip_layout_v="b" data-tooltip_layout_h="c">\
                                                    <div class="yesno-edit_panel-update_file-icon"><svg><use href="../content/img/icons.svg#icon-image"></use></svg></div>\
                                                    <span data-togel="0">' + _L.add_image_bg + '</span>\
                                                    <span data-togel="1">' + _L.update_image_bg + '</span>\
                                                </div>\
                                                <div class="yesno-edit_panel-update_file-delete" data-tooltip="' + _L.remove_bg_image + '" data-tooltip_layout_v="b" data-tooltip_layout_h="c"><svg><use href="../content/img/icons.svg#icon-delete"></use></svg></div>\
                                            </div>\
                                            <div class="yesno-edit_panel-row">\
                                                <div class="yesno-edit_panel-row-key">' + _L.game_bg_image_layout + '</div>\
                                                <div class="yesno-edit_panel-row-val" data-val="game_bg_image_layout"></div>\
                                            </div>\
                                            <div class="yesno-edit_panel-row">\
                                                <div class="yesno-edit_panel-row-key">' + _L.game_bg_color + '</div>\
                                                <div class="yesno-edit_panel-row-val" data-val="game_bg_color"></div>\
                                                <div class="yesno-edit_panel-row-val yesno-edit_panel-row-val--refresh"><div class="yesno-edit_panel-refresh_btn" data-tooltip="' + _L.answer_btn_refresh + '" data-tooltip_layout_v="b" data-tooltip_layout_h="c"><svg><use xlink:href="../content/img/icons.svg#refresh"></use></svg></div></div>\
                                            </div>\
                                        </div>\
                                    </div>\
                                </div>\
                            </div>\
                        </div>\
                    </div>\
                    <div data-edit_mode="1" style="padding-top: 25px;">\
                        <div class="yesno-editor_section"><div class="yesno-editor_title">' + _L.start_title + '</div><div class="yesno-editor_input yesno-editor-start_title"></div></div>\
                        <div class="yesno-editor_section"><div class="yesno-editor_title">' + _L.end_title + '</div><div class="yesno-editor_input yesno-editor-ent_title"></div></div>\
                        <div class="yesno-editor_section"><div class="yesno-editor_title">' + _L.pause_title + '</div><div class="yesno-editor_input yesno-editor-pause_title"></div></div>\
                        <div class="yesno-editor_section"><div class="yesno-editor_title">' + _L.time_over_title + '</div><div class="yesno-editor_input yesno-edito-time_over_title"></div></div>\
                    </div>\
                    <style id="yesno-dynamic_bg_image_style"></style>\
                    <style id="yesno-dynamic_style"></style>\
                </div>';
        dom = $(dom);

        slidesDom = dom.find('.yesno-slides');
        shapesDom = dom.find('.yesno-status_bar-items');
        questionsDom = dom.find('.yesno-questions .swiper-wrapper');

        dom.on('click', '.yesno-edit_btn.yesno-tools_btn[data-edite="game_bg"] .yesno-edit_panel-refresh_btn', function() {
            oPreset.game_bg_image  = oPreset.skin_data['game_bg_image'];
            oPreset.game_bg_color = false;
            oPreset.game_bg_image_layout = false;
            updateDefaultSkinData();
        });
       
        dom.on('click', '.slider.arrow.a-left', function() {
            if(last_sound)
                last_sound.stop();
            var data_item_id = document.querySelector('.swiper-wrapper .swiper-slide[data-selected="1"]').getAttribute('data-item_id');
            if(data_item_id.split('_')[1] == 0){
                return;
            }
            document.querySelector('.yesno-status_bar-item[data-item_id='+ data_item_id +']').setAttribute('data-selected','0');

            data_item_id = "item_" + --data_item_id.split('_')[1];
            if(data_item_id.split('_')[1] == 0){
                $('.slider.arrow.a-left').addClass('swiper-button-disabled').removeAttr('role').removeAttr('tabindex');
            }
            if(data_item_id.split('_')[1] < oPreset.items.length-1){
                $('.slider.arrow.a-right').removeClass('swiper-button-disabled').attr('role', 'button').attr('tabindex', 3);
            }
            $('.yesno-status_bar-item').removeClass('currentSlide');
            $('.yesno-status_bar-item[data-item_id='+ data_item_id +']').addClass('currentSlide');
            document.querySelector('.yesno-status_bar-item[data-item_id='+ data_item_id +']').setAttribute('data-selected','1');

            document.querySelector('.swiper-wrapper .swiper-slide[data-selected="1"]').setAttribute('data-selected', '0');
            removeQuestionButtonKeyboardSelection();
            document.querySelector('.swiper-wrapper .swiper-slide[data-item_id=' + data_item_id + ']').setAttribute('data-selected', '1');
            setQuestionButtonKeyboardSelction();
            console.log(1);
        });

        dom.on('click', '.slider.arrow.a-right', function() {
            if(last_sound)
                last_sound.stop();
            var data_item_id = document.querySelector('.swiper-wrapper [data-selected="1"]').getAttribute('data-item_id');
            if(data_item_id.split('_')[1] == oPreset.items.length-1){
                return;
            }
            document.querySelector('.yesno-status_bar-item[data-item_id='+ data_item_id +']').setAttribute('data-selected','0');
            data_item_id = "item_" + ++data_item_id.split('_')[1];
            if(data_item_id.split('_')[1] == oPreset.items.length-1){
                $('.slider.arrow.a-right').addClass('swiper-button-disabled').removeAttr('role').removeAttr('tabindex');
            }
            if(data_item_id.split('_')[1] > 0){
                $('.slider.arrow.a-left').removeClass('swiper-button-disabled').attr('role', 'button').attr('tabindex', 4);
            }
            $('.yesno-status_bar-item').removeClass('currentSlide');
            $('.yesno-status_bar-item[data-item_id='+ data_item_id +']').addClass('currentSlide');
            document.querySelector('.yesno-status_bar-item[data-item_id='+ data_item_id +']').setAttribute('data-selected','1');

            document.querySelector('.swiper-wrapper [data-selected="1"]').setAttribute('data-selected', '0');
            removeQuestionButtonKeyboardSelection();
            document.querySelector('.swiper-wrapper .swiper-slide[data-item_id=' + data_item_id + ']').setAttribute('data-selected', '1');

            var next = selected_item.dom_item.next('.yesno-question[data-item_id]');
            items[next.attr('data-item_id')].select();
            if(selected_item) {
                selected_item.autoPlaySound();
            }
        });

        if (isMobile) {
            dom.attr('data-mobile', 1);
            $('html').addClass('yesno-mobile');
            var rotateMass = $('<div class="yesno-rotate_mass"></div>');
            rotateMass.on('click', function () {
                rotateMass.hide();
            });
            $('body').append(rotateMass);
        }

        if (onFullScreen) {
            var fullScreenBtn = $('<div class="yesno-fullscreen"></div>');
            fullScreenBtn.on('click', onFullScreen);
            dom.find('.yesno-container').append(fullScreenBtn);
        }
        if(flag==true){
        timer = create_timer({
            time: oPreset.timer_limit,
            stroke_width: 2,
            show_trigger: !isEditMote,
            onEnd: function() {
                if(selected_item) {
                    selected_item.setAnswer(-1);
                }
                set_game_state('time_over');
            },
            onPause: function() {
                set_game_state('pause');
            },
            onStop: function() {},
            onPlay: function() {}
        });
    }
        dom.find('.yesno-status_bar-timer').append(timer);
        dom.on('click keyup', '.yesno-deactivating-The-Timer', function(event) {
                if (event.type === 'click' || (event.type === 'keyup' && (event.key === 'Enter' ||  event.key === ' '))) {
                    var img = document.querySelector('.imageToStopTimerOrContinue');
                        if (img.getAttribute('src') === '../content/img/btn_hover.png') {
                            img.setAttribute('src', '../content/img/btn_clicked.png');
                            var timerContent = $('.timer-time span').text();
                            timer.cancel();
                            var timerSpan = document.querySelector('.timer-time span');
                            timerSpan.textContent = timerContent; 
                            flag = false;
                            return;
                        } else {
                            img.setAttribute('src', '../content/img/btn_hover.png');
                            var timerContent = $('.timer-time span').text();
                            timer.play();
                            var timerSpan = document.querySelector('.timer-time span');
                            timerSpan.textContent = timerContent; 
                            return;
                        }
                }
            });
        
        if (isEditMote) {
            dom.find('[data-edit_mode="0"]').remove();


            dom.find('.yesno-skins').append(create_skin_selector({ index: oPreset.skin, length: defaultSkinData.length }, function (val, refresh) {
                if(refresh) {
                    oPreset.font = false;
                    oPreset.leading_color = false;
                    oPreset.game_bg_image = defaultSkinData.getPresetVal('game_bg_image',true);//false;
                    oPreset.game_bg_color = false;
                    oPreset.game_bg_image_layout = false;
                    oPreset.bar_background_color = false;
                    oPreset.bar_shape = false;
                    oPreset.answer_btn_bg_color = false;
                    oPreset.answer_btn_text_color = false;
                    oPreset.answer_btn_font_size = false;
                }
                if (oPreset.skin != val || refresh) {
                    oPreset.skin = val;
                    updateDefaultSkinData();
                }
            }));

            langSelsector = createSelector(
                {
                    val: oPreset.lang_data,
                    items: ['he','ar', 'en'].map(function(lang){return {text: _L[lang], val: lang}})
                },
                function (data) {
                    var old_lang = oPreset.lang_data;
                    oPreset.lang_data = data.val;
                    dom.attr('data-content_lang', oPreset.lang_data);

                    updateDefaultSkinData();

                    if(langList[old_lang].start_text == oPreset.start_text) {
                        startTitleInput.set_val(langList[oPreset.lang_data].start_text);
                    }
                    if(langList[old_lang].end_text == oPreset.end_text) {
                        entTitleInput.set_val(langList[oPreset.lang_data].end_text);
                    }
                    if(langList[old_lang].pause_text == oPreset.pause_text) {
                        pauseTitleInput.set_val(langList[oPreset.lang_data].pause_text);
                    }
                    if(langList[old_lang].time_over_text == oPreset.time_over_text) {
                        timeOverTitlerInput.set_val(langList[oPreset.lang_data].time_over_text);
                    }
                }
            );
            dom.find('.yesno-lang_data').append(langSelsector);

            fontSelector = createSelector(
                {
                    val: defaultSkinData.getPresetVal('font'),
                    items: fontList.map(function(font){return {text: font.title, val: font.font}})
                },
                function (data) {
                    oPreset.font = data.val;
                    setDynamicStyle();
                }
            );
            dom.find('.yesno-contaner-tools .yesno-contaner-tool[data-tool="font"]').append(fontSelector);

            leadingColorPicker = createColorPicker(defaultSkinData.getPresetVal('leading_color'), function (_color, _dom) {
                _color = _color.replace(/[^0-9a-z]/gi, '');
                oPreset.leading_color =  _color;
                setDynamicStyle();
            });
            dom.find('.yesno-contaner-tools .yesno-contaner-tool[data-tool="color"]').append(leadingColorPicker);

            layoutSelector = create_layout_selector();
            dom.find('.yesno-contaner-tools .yesno-contaner-tool[data-tool="layout"]').append(layoutSelector);

            startTitleInput = create_text({
                val: oPreset.start_text,
                //max: 0,
                min: 0,
                errors: {
                    //max: '11111111111111111',
                    min: _L.start_text_min_error
                }
            }, function (val) {
                oPreset.start_text = val;
            });
            dom.find('.yesno-editor-start_title').append(startTitleInput);

            entTitleInput = create_text({
                val: oPreset.end_text,
                //max: 0,
                min: 0,
                errors: {
                    //max: '11111111111111111',
                    min: _L.end_text_min_error
                }
            }, function (val) {
                oPreset.end_text = val;
            });
            dom.find('.yesno-editor-ent_title').append(entTitleInput);

            pauseTitleInput = create_text({
                val: oPreset.pause_text,
                min: 0,
                errors: {
                    min: _L.pause_min_error
                }
            }, function (val) {
                oPreset.pause_text = val;
            });
            dom.find('.yesno-editor-pause_title').append(pauseTitleInput);

            timeOverTitlerInput = create_text({
                val: oPreset.time_over_text,
                min: 0,
                errors: {
                    min: _L.time_over_min_error
                }
            }, function (val) {
                oPreset.time_over_text = val;
            });
            dom.find('.yesno-edito-time_over_title').append(timeOverTitlerInput);

            gameBgLayouySelector = createSelector(
                {
                    val: defaultSkinData.getPresetVal('game_bg_image_layout'),
                    items: [
                        { text: _L.full_width, val: 'w', icon: 'icon-image_layout_w' },
                        { text: _L.full_height, val: 'h', icon: 'icon-image_layout_h' },
                        { text: _L.cover, val: 'c', icon: 'icon-image_layout_c' },
                    ]
                },
                function (data) {
                    oPreset.game_bg_image_layout = data.val;
                    setDynamicStyle();
                }
            );
            dom.find('.yesno-edit_btn[data-edite="game_bg"] .yesno-edit_panel-row-val[data-val="game_bg_image_layout"]').append(gameBgLayouySelector);

            gameBgColorPicker = createColorPicker(defaultSkinData.getPresetVal('game_bg_color'), function (_color, _dom) {
                oPreset.game_bg_color =  _color;
                setDynamicStyle();
            });
            dom.find('.yesno-edit_btn[data-edite="game_bg"] .yesno-edit_panel-row-val[data-val="game_bg_color"]').append(gameBgColorPicker);

            dom.on('click', '.yesno-edit_btn[data-edite="game_bg"] .yesno-edit_panel-update_file', function() {
                uplodeFile(
                    'image',
                    $(this),
                    function (url) {
                        oPreset.game_bg_image = url;
                        updateDefaultSkinData();
                    },
                    function(){
                    }
                );
            });
            dom.on('click', '.yesno-edit_btn[data-edite="game_bg"] .yesno-edit_panel-update_file-delete', function() {
                oPreset.game_bg_image = false;
                //updateDefaultSkinData();
                dom.find('#yesno-dynamic_bg_image_style').html('');
                dom.find('.yesno-edit_btn[data-edite="game_bg"] .yesno-edit_panel-update_file').attr('data-togel', '0');
            });

            timerHasLimitSelector = createSelector(
                {
                    val: oPreset.timer_has_limit ? '1' : '0',
                    items: [
                        { text: _L.edit_timer_settings_time_limit, val: '1' },
                        { text: _L.edit_timer_settings_without_time, val: '0' }
                    ]
                },
                function (data) {
                    oPreset.timer_has_limit = data.val == '1';
                    updateDefaultSkinData();
                }
            );
            dom.find('.yesno-edit_btn[data-edite="timer"] .yesno-edit_panel-row-val[data-val="timer_has_limit"]').append(timerHasLimitSelector);

            timerLimitInput = create_number({
                val: oPreset.timer_limit,
                min: 0,
                max: 60 * 5
            }, function (val) {
                if(!val) {
                    val = 0;
                }
                oPreset.timer_limit = val;
                timer.set_time(val);
            });
            dom.find('.yesno-edit_btn[data-edite="timer"] .yesno-edit_panel-row-val[data-val="timer_limit"]').append(timerLimitInput).append('<span>' + _L.edit_timer_settings_seconds + '</span>');

            barProgressSelector = createSelector(
                {
                    val: defaultSkinData.getPresetVal('bar_shape'),
                    items: [
                        { text: _L.edit_bar_settings_shape1, val: 1, icon: 'icon-bar_shape_selector_1' },
                        { text: _L.edit_bar_settings_shape2, val: 2, icon: 'icon-bar_shape_selector_2' }
                    ]
                },
                function (data) {
                    oPreset.bar_shape = data.val;
                    setDynamicStyle();
                }
            );
            dom.find('.yesno-edit_btn[data-edite="bar"] .yesno-edit_panel-row-val[data-val="bar_settings_progress"]').append(barProgressSelector);

            barOrderQuestionsSelector = createSelector(
                {
                    val: oPreset.bar_order_of_questions,
                    items: [
                        { text: _L.edit_bar_settings_order_of_questions_in_the_order, val: 'o'},
                        { text: _L.edit_bar_settings_order_of_questions_random, val: 'r'}
                    ]
                },
                function (data) {
                    oPreset.bar_order_of_questions = data.val;
                }
            );
            dom.find('.yesno-edit_btn[data-edite="bar"] .yesno-edit_panel-row-val[data-val="bar_settings_order_of_questions"]').append(barOrderQuestionsSelector);

            barBgColorPicker = createColorPicker(defaultSkinData.getPresetVal('bar_background_color'), function (_color, _dom) {
                oPreset.bar_background_color =  _color;
                setDynamicStyle();
            });
            dom.find('.yesno-edit_btn[data-edite="bar"] .yesno-edit_panel-row-val[data-val="bar_settings_background_color"]').append(barBgColorPicker);
            dom.on('click', '.yesno-edit_btn[data-edite="bar"] .yesno-edit_panel-refresh_btn', function() {
                oPreset.bar_background_color =  false;
                updateDefaultSkinData();
            });


            answer_btn_panel = '<div class="yesno-edit_panel-content">\
                                    <div class="yesno-edit_panel-row">\
                                        <div class="yesno-edit_panel-row-key">' + _L.answer_btn_bg_color + '</div>\
                                        <div class="yesno-edit_panel-row-val" data-val="answer_btn_bg_color"></div>\
                                    </div>\
                                    <div class="yesno-edit_panel-row">\
                                        <div class="yesno-edit_panel-row-key">' + _L.answer_btn_text_color + '</div>\
                                        <div class="yesno-edit_panel-row-val" data-val="answer_btn_text_color"></div>\
                                    </div>\
                                    <div class="yesno-edit_panel-row">\
                                        <div class="yesno-edit_panel-row-key">' + _L.answer_btn_font_size + '</div>\
                                        <div class="yesno-edit_panel-row-val" data-val="answer_btn_font_size"></div>\
                                        <div class="yesno-edit_panel-row-val yesno-edit_panel-row-val--refresh"><div class="yesno-edit_panel-refresh_btn" data-tooltip="' + _L.answer_btn_refresh + '" data-tooltip_layout_v="b" data-tooltip_layout_h="c"><svg><use xlink:href="../content/img/icons.svg#refresh"></use></svg></div></div>\
                                    </div>\
                                </div>';
            answer_btn_panel = $(answer_btn_panel);

            answerBtnBgColorPicker = createColorPicker(defaultSkinData.getPresetVal('answer_btn_bg_color'), function (_color, _dom) {
                oPreset.answer_btn_bg_color =  _color;
                setDynamicStyle();
            });
            answer_btn_panel.find('.yesno-edit_panel-row-val[data-val="answer_btn_bg_color"]').append(answerBtnBgColorPicker);

            answerBtnTextColorPicker = createColorPicker(defaultSkinData.getPresetVal('answer_btn_text_color'), function (_color, _dom) {
                oPreset.answer_btn_text_color =  _color;
                setDynamicStyle();
            });
            answer_btn_panel.find('.yesno-edit_panel-row-val[data-val="answer_btn_text_color"]').append(answerBtnTextColorPicker);

            answerBtnFontSizeSelector = createSelector(
                {
                    val: defaultSkinData.getPresetVal('answer_btn_font_size'),
                    items: [1,1.2,1.4,1.6,1.8,2,2.2,2.4,2.6,2.8,3,3.2,3.4,3.6].map(function(size){return {text: size, val: size}})
                },
                function (data) {
                    oPreset.answer_btn_font_size = data.val;
                    setDynamicStyle();
                }
            );
            answer_btn_panel.find('.yesno-edit_panel-row-val[data-val="answer_btn_font_size"]').append(answerBtnFontSizeSelector);

            answer_btn_panel.on('click', '.yesno-edit_panel-refresh_btn', function() {
                oPreset.answer_btn_bg_color =  false;
                oPreset.answer_btn_text_color =  false;
                oPreset.answer_btn_font_size =  false;
                updateDefaultSkinData();
            });



            dom.find(".yesno-slides").sortable({
                placeholder: "yesno-slide_item",
                items: ".yesno-slide_item:not(.yesno-slide_item--add)",
                cancel: ".yesno-slide_item-tool",
                scroll: false,
                tolerance: "pointer",
                start: function (event, ui) {
                },
                stop: function (event, ui) {
                    items[ui.item.attr('data-item_id')].setIndex(ui.item.index());
                },
            });
            dom.find(".yesno-slides").disableSelection();

            dom.find(".yesno-slide_item--add").on('click', function () {
                var shapes = shapesDom.find('.yesno-status_bar-item');
                var lastID= shapes.last().attr('data-item_id');
                var lastData = items[lastID].getData();
                var data = newItemData();
                data.layout = lastData.layout;
                data.sound.auto_play = lastData.sound.auto_play;
                data.text_sound.auto_play = lastData.text_sound.auto_play;

                var new_item = createItem(shapes.length, data);
                new_item.select();
            });

            dom.on('click', '.yesno-edit_panel', function (e) {
                e.preventDefault();
                e.stopPropagation();
            });
            dom.on('click', '.yesno-edit_btn', function () {
                var edit = $(this).attr('data-edite');
                if(edit == 'answer_btn_1' || edit == 'answer_btn_2') {
                    answer_btn_panel.detach();
                    $(this).find('.yesno-edit_panel-wraper').html(answer_btn_panel);
                }
                dom.attr('data-open_edite_panel', edit);
                $(this).find('.yesno-edit_panel').attr('data-open', 1);
            });
            dom.on('click', '.yesno-edit_panel-mask', function () {
                $(this).closest('.yesno-edit_panel').attr('data-open', 0);
                dom.attr('data-open_edite_panel', '');
            });

            updateDefaultSkinData();
            if(workMode == "Solution" || workMode == "Results"){
                set_game_state('end');
            }else{
                set_game_state('play');
            }
        }
        else {
            dom.find('[data-edit_mode="1"]').remove();

            if (cet && cet.content) {
                cet.content.xapiSupported = true;
            }

            dom.on('click', '.yesno-fullscreen_btn', onFullScreen);

            dom.on('click', '.yesno-contaner[data-game_state="start"] .yesno-play_panel .yesno-play_panel-btn', function (e) {
                set_game_state('play');
            });
            dom.on('click', '.yesno-contaner[data-game_state="pause"] .yesno-play_panel .yesno-play_panel-btn', function (e) {
                if(selected_item) {
                    var item_data = selected_item.getData();
                    if(item_data.answer) {
                        timer.stop();
                        next_question();
                        return;
                    }
                }
                set_game_state('play');
            });
            dom.on('click', '.yesno-contaner[data-game_state="time_over"] .yesno-play_panel .yesno-play_panel-btn', function (e) {
                if(selected_item) {
                    var item_data = selected_item.getData();
                    if(item_data.answer) {
                        timer.stop();
                        next_question();
                        return;
                    }
                }
                set_game_state('play');
            });
            dom.on('keyup', '.yesno-play_panel-btn, .yesno-question-answer_btn, .arrow,.btnEnd, .yesno-status_bar-clear-wraper, .yesno-sound_player-btn, .yesno-sound_player-btn', function (e) {
                if (e.key && (e.key !== 'Enter' && e.key !== ' ')) {
                    return;
                }
                $(e.target).click();
            });

            //dom.on('click', '.yesno-contaner[data-game_state="end"] .yesno-status_bar .yesno-status_bar-items .yesno-status_bar-item', function(){
            //    if(oPreset.game_state == 'end') {
            //        dom.find('.yesno-contaner').attr('data-game_view', '1');
            //        items[$(this).attr('data-item_id')].select();
            //    }
            //});

            if(isReadOnly) {
                dom.find('.yesno-status_bar-clear-wraper').remove();
            }
            else {
                dom.on('click', '.yesno-status_bar-clear-wraper', clear_game);
            }

            if(!oPreset.timer_has_limit || oPreset.timer_limit <= 0 || workMode == "Evaluation") {
                dom.find('.yesno-status_bar-timer-wraper').remove();
                timer = {
                    pause: function(){},
                    stop: function(){},
                    play: function(){},
                    refresh: function(){}
                };
            }

            setDynamicStyle();
            if(workMode == "Solution" || workMode == "Results"){
                set_game_state('end');
                // TODO: check if stars have correct color
            }
            else if(!oPreset.game_state) {
                set_game_state('start');
            }
            else if(oPreset.game_state == 'play' && oPreset.timer_has_limit && oPreset.timer_limit > 0 && workMode !=="Evaluation") {
                set_game_state('pause');
            }
            else if((oPreset.game_state == 'pause' && (!oPreset.timer_has_limit || oPreset.timer_limit <= 0))
                ||oPreset.game_state == 'pause' && workMode =="Evaluation") {
                set_game_state('play');
            }
            else {
                set_game_state(oPreset.game_state);
            }
        }
        var oldDoms = container.find(".yesno-contaner");
        if (oldDoms.length > 0) {
            oldDoms.remove()
        }
        container.prepend(dom);

    };

    var removeQuestionButtonKeyboardSelection = function () {
        $('.yesno-question-answer_btn[tabindex]').map((i, el) => { $(el).removeAttr('role').removeAttr('tabindex'); });
    }

    var setQuestionButtonKeyboardSelction = function () {
        $('.swiper-wrapper .swiper-slide[data-selected=1]').find('.yesno-question-answer_btn').map((i, el) => { $(el).attr('role', 'button').attr('tabindex', (i + 1)); });
    }

    var showEndScreen = function(){
        dom.find('.yesno-contaner').addClass('end');
        var correctAns = oPreset.items.filter(key => key.answer == key.correct_answer).length;
        var totalQuestions = oPreset.items.length;
        var final_txt = "";
        var lottie='<lottie-player src="" background="transparent"  speed="1"  style="width: 100%; height: 100%;" autoplay></lottie-player>';
        if((correctAns / totalQuestions * 100) >= 50 ){
            final_txt = oPreset.end_text;
            lottie='<lottie-player src="../content/img/skins/confetti.json" background="transparent"  speed="1"  style="width: 100%; height: 100%;" autoplay></lottie-player>';
        }
        var end_panel = '<div class="yesno-end_panel-contaner"><div class="end_panel">\
                          '+ lottie +'\
                                      <div class="yesno-end_panel-tetle yesno-text">\
                                        <span class="correct_ans_txt">'+ final_txt + '</span>\
                                      </div>\
                                      <div class="yesno-end_panel_inst">\
                                        <span class="final_txt"><span class="s_txt">'  + _L.final_score_correct_1 + ' </span></br><b>' + correctAns + '</b> ' + _L.final_score_correct_2+ ' <b>' + totalQuestions + '</b> ' + _L.final_score_correct_3 + '</span>\
                                      </div>\
                                  </div></div>\
                        <div class="btn_tryAgain btnEnd" tabindex="1" role="button" aria-label="' + _L.tryAgain + '">\
                          <span class="tryAgain_txt">' + _L.tryAgain + '</span>\
                        </div>\
                        <div class="btn_viewAns btnEnd" tabindex="0" role="button" aria-label="' + _L.viewAns + '">\
                          <span class="viewAns_txt">' + _L.viewAns + '</span>\
                        </div>';
        $('.yesno-contaner').prepend(end_panel);


        dom.on('click', '.btn_viewAns', function(){
            set_game_state('final');
            setSwiperSlide();
        });

        dom.on('click', '.btn_tryAgain', clear_game);

    }

    var setSwiperSlide = function () {

        dom.find('.yesno-contaner').removeClass('end');

        removeQuestionButtonKeyboardSelection();

        $('.yesno-question.swiper-slide').attr('data-selected',1);
        var slidePerView = 1.5;
        var spaceBetween = 50;
        if(oPreset.skin == 3){
            // slidePerView = 1;
            spaceBetween = 70;
        }
        if(isMobile){
            window.swiper1 = new Swiper(".yesno-questions", {
                grabCursor: true,
                observer: true,
                updateOnWindowResize: true,
                slideToClickedSlide: true,
                slidesPerView: 1,// 4.5,
                spaceBetween: 0,
                centeredSlides: true,
                //loopAdditionalSlides: 2,
                simulateTouch: false,
                noSwiping: true,
                direction: 'horizontal',
                loop: false,
                // Navigation arrows
                navigation: {
                    nextEl: '.a-right',
                    prevEl: '.a-left',
                },
                breakpoints: {
                    // when window width is <= 320px
                    699: {
                        simulateTouch: true,
                        slidesPerView: 1,
                    },
                },
                on: {
                    init: function () {
                        $('.yesno-status_bar-item').removeClass('currentSlide');
                        document.querySelector('.yesno-status_bar-items').children[0].classList.add('currentSlide');
                    },
                    slideChange:function(){
                        var data_item_id = document.querySelector('.swiper-wrapper').children[this.activeIndex].getAttribute('data-item_id');
                        $('.yesno-status_bar-item').removeClass('currentSlide');
                        $('.yesno-status_bar-item[data-item_id='+ data_item_id +']').addClass('currentSlide');
                    },
                    transitionEnd:function(){
                        if(isMobile){
                            var data_item_id = $('.swiper-slide-active')[0].getAttribute('data-item_id');
                            $('.yesno-status_bar-item').removeClass('currentSlide');
                            $('.yesno-status_bar-item[data-item_id='+ data_item_id +']').addClass('currentSlide');
                        }
                    },
                },
            });
        }else{
            window.swiper1 = new Swiper(".yesno-questions", {
                grabCursor: true,
                centeredSlides: true,
                observer: true,
                updateOnWindowResize: true,
                slideToClickedSlide: true,
                slidesPerView: 1.5,// 4.5,
                spaceBetween: 50,
                //loopAdditionalSlides: 2,
                simulateTouch: false,
                noSwiping: true,
                direction: 'horizontal',
                loop: false,
                // Navigation arrows
                navigation: {
                    nextEl: _L.lang == "en" ? '.a-left': '.a-right',
                    prevEl: _L.lang == "en" ? '.a-right' : '.a-left',
                },
                keyboard: true,
                breakpoints: {
                    // when window width is <= 320px
                    699: {
                        simulateTouch: true,
                        slidesPerView: 1,
                    },
                },
                on: {
                    init: function () {
                        $('.yesno-status_bar-item').removeClass('currentSlide');
                        document.querySelector('.yesno-status_bar-items').children[0].classList.add('currentSlide');
                    },
                    slideChange:function(){
                        var data_item_id = document.querySelector('.swiper-wrapper').children[this.activeIndex].getAttribute('data-item_id');
                        $('.yesno-status_bar-item').removeClass('currentSlide');
                        $('.yesno-status_bar-item[data-item_id='+ data_item_id +']').addClass('currentSlide');
                    },
                },
            });
        }


    }


    var events_types = {
        none: '',
        answer: 'answered',
        asked_check: 'asked_check',
        show_answer: 'asked_showAnswer',
        cleare: 'cleared',
        launche: 'launched',
        loaded: 'loaded',
        asked_generate: 'asked_generate'
    };
    var sendEvent = function (events_type) {
        //if (!isEditMote && events_type != events_types.none && cet && cet.content && cet.content.xapiSupported && cet.content.xapi && cet.content.xapi.send) {
        var score = 0;
        var fieldsResponse = {};
        var fieldsScore = {};
        for (var i = 0; i < oPreset.items.length; i++) {
            var id = 'q' + (i + 1);
            fieldsResponse[id] = '';
            fieldsScore[id] = 0;

            if (oPreset.items[i].answer == oPreset.items[i].correct_answer) {
                score++;
                fieldsScore[id] = 1;
            }

            if(oPreset.items[i].answer == 1) {
                fieldsResponse[id] = oPreset.items[i].text_btn_1;
            }
            if(oPreset.items[i].answer == 2) {
                fieldsResponse[id] = oPreset.items[i].text_btn_2;
            }
        }
        score = score / oPreset.items.length;

        if( workMode == "Evaluation" || workMode == 'Repair'){
            cet.content.lms.Activity.score(score*100);
        }


        var cetEvent = {};
        if(events_type == events_types.answer || events_type == events_types.asked_check) {
            cetEvent = {
                verb: events_type,//events_types.asked_check,//events_type,    
                fieldsScore: fieldsScore,
                fieldsResponse: fieldsResponse,
                interactionType: "YesNo",
            };
        }


        if(events_type == events_types.loaded || events_type == events_types.asked_generate) {
            cetEvent = {
                verb: events_type,
                fieldsScore: fieldsScore,
                fieldsResponse: fieldsResponse,
                interactionType: "YesNo",
                objectAdditionalInformation: {state: JSON.parse(JSON.stringify(oPreset))},
            };
        }

        try{
            if( cetEvent.verb ){
                cet.content.cetEvent.send(cetEvent);
            }
        }
        catch (e) {
        }

    };

    var updateSkinData = function (reset=false) {
        dom.find('[data-on_costume_skin_show="1"]').show();

        if(oPreset.timer_has_limit) {
            dom.find('.yesno-edit_btn[data-edite="timer"] .yesno-edit_panel-row-val[data-val="timer_limit"]').show();
            dom.find('.yesno-edit_btn[data-edite="timer"] .yesno-edit_panel-row').removeClass('has_timer');
        }
        else {
            dom.find('.yesno-edit_btn[data-edite="timer"] .yesno-edit_panel-row-val[data-val="timer_limit"]').hide();
            dom.find('.yesno-edit_btn[data-edite="timer"] .yesno-edit_panel-row').addClass('has_timer');
        }

        dom.find('.yesno-edit_btn[data-edite="game_bg"] .yesno-edit_panel-update_file').attr('data-togel', oPreset.skin_data['game_bg_image'] ? '1' : '0');

        var game_bg_img;
        var game_bg_layout;
        var game_bg_color;
        var answer_bg_color;
        var answer_font_size;
        var answer_text_color;
        (((oPreset.game_bg_image == defaultSkinData[currentSkin].comon.game_bg_image) || (!oPreset.game_bg_image)) ? game_bg_img = true : game_bg_img = false);
        (((oPreset.game_bg_image_layout == defaultSkinData[currentSkin].comon.game_bg_image_layout) || (!oPreset.game_bg_image_layout)) ? game_bg_layout = true : game_bg_layout = false);
        (((oPreset.game_bg_color == defaultSkinData[currentSkin].comon.game_bg_color) || (!oPreset.game_bg_color)) ? game_bg_color = true : game_bg_color = false);
        (((oPreset.answer_btn_bg_color == defaultSkinData[currentSkin].comon.answer_btn_bg_color) || (!oPreset.answer_btn_bg_color)) ? answer_bg_color = true : answer_bg_color = false);
        (((oPreset.answer_btn_font_size == defaultSkinData[currentSkin].comon.answer_btn_font_size) || (!oPreset.answer_btn_font_size)) ? answer_font_size = true : answer_font_size = false);
        (((oPreset.answer_btn_text_color == defaultSkinData[currentSkin].comon.answer_btn_text_color) || (!oPreset.answer_btn_text_color)) ? answer_text_color = true : answer_text_color = false);

        oPreset.skin_data = defaultSkinData.getData();
        fontSelector.set_val(defaultSkinData.getPresetVal('font',reset));
        leadingColorPicker.set_color(defaultSkinData.getPresetVal('leading_color',reset));
        barBgColorPicker.set_color(defaultSkinData.getPresetVal('bar_background_color',reset));
        barProgressSelector.set_val(defaultSkinData.getPresetVal('bar_shape',reset));
        gameBgLayouySelector.set_val(defaultSkinData.getPresetVal('game_bg_image_layout',reset));
        gameBgColorPicker.set_color(defaultSkinData.getPresetVal('game_bg_color',game_bg_color));
        answerBtnBgColorPicker.set_color(defaultSkinData.getPresetVal('answer_btn_bg_color',answer_bg_color));
        answerBtnTextColorPicker.set_color(defaultSkinData.getPresetVal('answer_btn_text_color',answer_text_color));
        answerBtnFontSizeSelector.set_val(defaultSkinData.getPresetVal('answer_btn_font_size',answer_font_size));

        /*dir*/
        var dir = defaultSkinData.getPresetVal('dir',reset);
        dom.find('.yesno-tools_btn_wraper[data-edite="timer"]').css({
            left: (dir == 'rtl' ? '-22px' : 'auto'),
            right: (dir == 'rtl' ? 'auto' : '-22px'),
        });
        dom.find('.yesno-tools_btn_wraper[data-edite="timer"] .yesno-edit_btn').attr('data-tooltip_layout_h', (dir == _L.dir ? 'r' : 'l'));
        dom.find('.yesno-tools_btn_wraper[data-edite="timer"] .yesno-edit_panel').attr('data-layout_h', (dir == _L.dir ? 'r' : 'l'));
        dom.find('.yesno-tools_btn_wraper[data-edite="bar"]').css({
            right: (dir == 'rtl' ? '-22px' : 'auto'),
            left: (dir == 'rtl' ? 'auto' : '-22px'),
        });
        dom.find('.yesno-tools_btn_wraper[data-edite="bar"] .yesno-edit_btn').attr('data-tooltip_layout_h', (dir == _L.dir ? 'l' : 'r'));
        dom.find('.yesno-tools_btn_wraper[data-edite="bar"] .yesno-edit_panel').attr('data-layout_h', (dir == _L.dir ? 'l' : 'r'));
        dom.find('.yesno-tools_btn_wraper[data-edite="sound_player-icon-question-text_sound"] .yesno-edit_panel').attr('data-layout_h', (dir == _L.dir ? 'l' : 'r'));
        dom.find('.yesno-tools_btn_wraper[data-edite="sound_player-icon-question-text_sound"] .yesno-edit_btn').attr('data-tooltip_layout_h', (dir == _L.dir ? 'l' : 'r'));
        dom.find('.yesno-tools_btn_wraper[data-edite="sound_player-icon-question-text_sound"]').css({
            right: (dir == 'rtl' ? '0' : 'auto'),
            left: (dir == 'rtl' ? 'auto' : '0'),
            transform: (dir == 'rtl' ? 'translate(50%, 50%)' : 'translate(-50%, 50%)'),
        });

        setDynamicStyle(reset,game_bg_img,game_bg_layout,game_bg_color,answer_bg_color,answer_text_color,answer_font_size);
    };

    var updateDefaultSkinData = function (reset=false) {
        dom.find('[data-on_costume_skin_show="1"]').show();
        //if(defaultSkinData.isCostumeSkin()) {
        //    dom.find('[data-on_costume_skin_show="1"]').show();
        //}
        //else {
        //    dom.find('[data-on_costume_skin_show="1"]').hide();
        //}

        if(oPreset.timer_has_limit) {
            dom.find('.yesno-edit_btn[data-edite="timer"] .yesno-edit_panel-row-val[data-val="timer_limit"]').show();
            dom.find('.yesno-edit_btn[data-edite="timer"] .yesno-edit_panel-row').removeClass('has_timer');
        }
        else {
            dom.find('.yesno-edit_btn[data-edite="timer"] .yesno-edit_panel-row-val[data-val="timer_limit"]').hide();
            dom.find('.yesno-edit_btn[data-edite="timer"] .yesno-edit_panel-row').addClass('has_timer');
        }
        dom.find('.yesno-edit_btn[data-edite="game_bg"] .yesno-edit_panel-update_file').attr('data-togel', oPreset.skin_data['game_bg_image'] ? '1' : '0');
        var oldOpresetSkinData = JSON.parse(JSON.stringify(oPreset.skin_data));
        oPreset.skin_data = defaultSkinData.getData();
        fontSelector.set_val(defaultSkinData.getPresetVal('font',reset));
        leadingColorPicker.set_color(defaultSkinData.getPresetVal('leading_color',reset));
        barBgColorPicker.set_color(defaultSkinData.getPresetVal('bar_background_color',reset));
        barProgressSelector.set_val(defaultSkinData.getPresetVal('bar_shape',reset));
        gameBgLayouySelector.set_val(defaultSkinData.getPresetVal('game_bg_image_layout',reset));
        gameBgColorPicker.set_color(defaultSkinData.getPresetVal('game_bg_color',reset));
        answerBtnBgColorPicker.set_color(defaultSkinData.getPresetVal('answer_btn_bg_color',reset));
        answerBtnTextColorPicker.set_color(defaultSkinData.getPresetVal('answer_btn_text_color',reset));
        answerBtnFontSizeSelector.set_val(defaultSkinData.getPresetVal('answer_btn_font_size',reset));

        /*dir*/
        var dir = defaultSkinData.getPresetVal('dir',reset);
        dom.find('.yesno-tools_btn_wraper[data-edite="timer"]').css({
            left: (dir == 'rtl' ? '-22px' : 'auto'),
            right: (dir == 'rtl' ? 'auto' : '-22px'),
        });
        dom.find('.yesno-tools_btn_wraper[data-edite="timer"] .yesno-edit_btn').attr('data-tooltip_layout_h', (dir == _L.dir ? 'r' : 'l'));
        dom.find('.yesno-tools_btn_wraper[data-edite="timer"] .yesno-edit_panel').attr('data-layout_h', (dir == _L.dir ? 'r' : 'l'));
        dom.find('.yesno-tools_btn_wraper[data-edite="bar"]').css({
            right: (dir == 'rtl' ? '-22px' : 'auto'),
            left: (dir == 'rtl' ? 'auto' : '-22px'),
        });
        dom.find('.yesno-tools_btn_wraper[data-edite="bar"] .yesno-edit_btn').attr('data-tooltip_layout_h', (dir == _L.dir ? 'l' : 'r'));
        dom.find('.yesno-tools_btn_wraper[data-edite="bar"] .yesno-edit_panel').attr('data-layout_h', (dir == _L.dir ? 'l' : 'r'));
        dom.find('.yesno-tools_btn_wraper[data-edite="sound_player-icon-question-text_sound"] .yesno-edit_panel').attr('data-layout_h', (dir == _L.dir ? 'l' : 'r'));
        dom.find('.yesno-tools_btn_wraper[data-edite="sound_player-icon-question-text_sound"] .yesno-edit_btn').attr('data-tooltip_layout_h', (dir == _L.dir ? 'l' : 'r'));
        dom.find('.yesno-tools_btn_wraper[data-edite="sound_player-icon-question-text_sound"]').css({
            right: (dir == 'rtl' ? '0' : 'auto'),
            left: (dir == 'rtl' ? 'auto' : '0'),
            transform: (dir == 'rtl' ? 'translate(50%, 50%)' : 'translate(-50%, 50%)'),
        });

        setDynamicStyle(reset);
    };

    var setDynamicStyle = function (reset=false,game_bg_img,game_bg_layout,game_bg_color,answer_bg_color,answer_text_color,answer_font_size) {

        if(game_bg_img == undefined) game_bg_img = reset;
        if(game_bg_layout == undefined) game_bg_layout = reset;
        if(game_bg_color == undefined) game_bg_color = reset;
        if(answer_bg_color == undefined) answer_bg_color = reset;
        if(answer_text_color == undefined) answer_text_color = reset;
        if(answer_font_size == undefined) answer_font_size = reset;

        var style = '';

        /*dir*/
        var dir = defaultSkinData.getPresetVal('dir',reset);
        var left = (dir == 'rtl' ? 'left' : 'right');
        var right = (dir == 'rtl' ? 'right' : 'left');
        style += '.yesno-contaner .yesno-status_bar .yesno-status_bar-timer-wraper {'+left+': 1.3em;} ';
        style += '.yesno-contaner .yesno-status_bar .yesno-status_bar-clear-wraper {'+left+': 1.3em;} ';
        style += '.yesno-fullscreen_btn {'+left+': 1.6em;} ';
        style += '.yesno-status_bar-items {direction: ' + dir + ';} ';
        style += '.yesno-contaner .yesno-questions .yesno-question[data-layout="ita"] .yesno-question-contaner .yesno-question-text {'+left+': 0; '+right+': 4.6em;}';
        style += '.yesno-contaner .yesno-questions .yesno-question[data-layout="ata"] .yesno-question-contaner .yesno-question-text {'+left+': 0; '+right+': 4.6em;}';
        //style += '.yesno-contaner .yesno-questions .yesno-question[data-layout="ta"] .yesno-question-contaner .yesno-question-text {'+left+': 9.5em; '+right+': 14em;}';
        style += '.yesno-contaner .yesno-questions .yesno-question[data-layout="ita"] .yesno-question-contaner .yesno-question-text_sound {'+left+': 38.2em;}';
        style += '.yesno-contaner .yesno-questions .yesno-question[data-layout="ata"] .yesno-question-contaner .yesno-question-text_sound {'+left+': 38.2em;}';
        //style += '.yesno[data-dir="ltr"] .yesno-contaner .yesno-questions .yesno-question[data-layout="ita"] .yesno-question-contaner .yesno-question-text_sound {'+left+': 0.2em;}';
        //style += '.yesno[data-dir="ltr"] .yesno-contaner .yesno-questions .yesno-question[data-layout="ata"] .yesno-question-contaner .yesno-question-text_sound {'+left+': 0.2em;}';
        style += '.yesno-contaner .yesno-questions .yesno-question[data-layout="ta"] .yesno-question-contaner .yesno-question-text_sound {'+right+': 0; transform: translate('+ (dir == 'rtl' ? '' : '-') +'100%, 0em);}';


        /*leading_color*/
        var leading_color = defaultSkinData.getPresetVal('leading_color',reset);
        leading_color = leading_color.replace(/[^0-9a-z]/gi, '');
        var leading_color_rgb = leading_color.convertToRGB();
        style += '.yesno-contaner:before {border-color: #' + leading_color + ';} ';
        style += '.yesno-contaner .yesno-status_bar {border-color: #' + leading_color + '; box-shadow: 0em 0em 2em 1em rgba('+leading_color_rgb[0]+','+leading_color_rgb[1]+','+leading_color_rgb[2]+',0.3);} ';
        style += '.yesno-status_bar-timer .timer {color: #' + leading_color + ';} ';
        style += '.yesno-status_bar-clear-wraper {color: #' + leading_color + ';} ';
        style += '.yesno-status_bar-items {color: #' + leading_color + ';} ';
        style += '.yesno-fullscreen_btn {color: #' + leading_color + ';} ';
        style += '.yesno-sound_player-btn {color: #' + leading_color + ';} ';

        /*bar_background_color*/
        var bar_background_color = defaultSkinData.getPresetVal('bar_background_color',reset);
        style += '.yesno-status_bar {background-color: #' + bar_background_color + ';} ';


        /*answer_btn_bg_color*/
        var answer_btn_bg_color = defaultSkinData.getPresetVal('answer_btn_bg_color',answer_bg_color);
        var answer_btn_bg_color_rgb = answer_btn_bg_color.convertToRGB();
        style += '.yesno-question-answer_btn {color: #' + answer_btn_bg_color + '; box-shadow: 0.5em 0.5em 0.5em 0em rgba(0, 0, 0, 0.2), 0 0 0 1em rgba('+answer_btn_bg_color_rgb[0]+','+answer_btn_bg_color_rgb[1]+','+answer_btn_bg_color_rgb[2]+',0.2), 0 0 0 2em rgba('+answer_btn_bg_color_rgb[0]+','+answer_btn_bg_color_rgb[1]+','+answer_btn_bg_color_rgb[2]+',0.2);} ';

        /*answer_btn_text_color*/
        var answer_btn_text_color = defaultSkinData.getPresetVal('answer_btn_text_color',answer_text_color);
        style += '.yesno-question-answer_btn .yesno-question-answer_btn-text, .yesno-question-answer_btn .yesno-question-answer_btn-text .yesno-question-answer_btn-text-content, .yesno-question-answer_btn .yesno-question-answer_btn-text .yesno-question-answer_btn-text-content[data-mce-placeholder]:not(.mce-visualblocks)::before {color: #' + answer_btn_text_color + ';} ';

        /*answer_btn_font_size*/
        var answer_btn_font_size = defaultSkinData.getPresetVal('answer_btn_font_size',answer_font_size);
        style += '.yesno-question-answer_btn .yesno-question-answer_btn-text * {font-size: ' + answer_btn_font_size + 'rem; line-height: ' + (oPreset.lang_data == 'ar' ? 1.5 : 1.1) + '} ';

        /*bar_shape*/
        var bar_shape = defaultSkinData.getPresetVal('bar_shape',reset);
        if(bar_shape !='2')
            bar_shape = defaultSkinData.getPresetVal('bar_shape',true);
        dom.find('.yesno-status_bar-items').attr('data-shape_id', bar_shape);
        dom.find('.yesno-status_bar-items svg use').attr('href', '../content/img/icons.svg#icon-bar_shape_' + bar_shape);


        /*game_bg_color*/
        style += '.yesno-contaner {background-color: #' + defaultSkinData.getPresetVal('game_bg_color',game_bg_color) + ';} ';

        /*game_bg_image*/
        var game_bg_image = false;
        if(game_bg_img)
            game_bg_image = defaultSkinData.getPresetVal('game_bg_image',game_bg_img);
        else
            game_bg_image =oPreset.game_bg_image;
        if(game_bg_image) {
            dom.find('#yesno-dynamic_bg_image_style').html('.yesno-contaner {background-image: url("' + game_bg_image + '");} ');
        }
        else {
            dom.find('#yesno-dynamic_bg_image_style').html('');
        }

        /*game_bg_image_layout*/
        var game_bg_image_layout = defaultSkinData.getPresetVal('game_bg_image_layout',game_bg_layout);
        if(game_bg_image_layout == 'w') {
            style += '.yesno-contaner {background-size: 100% auto;} ';
        }
        else if(game_bg_image_layout == 'h') {
            style += '.yesno-contaner {background-size: auto 100%;} ';
        }
        else {
            style += '.yesno-contaner {background-size: cover;} ';
        }

        /*font*/
        style += '.yesno-text, .yesno-text .yesno-question-answer_btn-text-content {font-family: ' + defaultSkinData.getPresetVal('font',reset) + ';} ';
        style += '.yesno-text, .yesno-text .yesno-question-answer_btn-text-content {direction: ' + defaultSkinData.getPresetVal('dir',reset) + '; text-align: ' + defaultSkinData.getPresetVal('text_align',reset) + ';} ';

        /*timer_has_limit*/
        if(!oPreset.timer_has_limit) {
            style += '.yesno-status_bar-timer {pointer-events: none; opacity: ' + (isEditMote ? 0.5 : 0) + ';} ';
        }

        dom.find('#yesno-dynamic_style').html(style);
    };

    var uplodeFile = function (type, triger, onsuccess, onerror) {
        var suportedTypes = [], maxSize = 0, accept = '*.*';
        if(type == 'image') {
            accept = ".jpeg, .jpg, .png, .gif, .svg";
            suportedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/svg", "image/svg+xml"];
            maxSize = 10 * 1024 * 1024; //10MB
        }
        else if(type == 'sound') {
            accept = ".mp3, .wav";
            suportedTypes = ["audio/mpeg", "audio/wav"];
            maxSize = 10 * 1024 * 1024; //10MB
        }

        var inputFile = document.createElement("input");
        inputFile.type = "file";
        inputFile.accept = accept;
        inputFile.onchange = function (e) {
            var file = e.target.files && e.target.files.length > 0 ? e.target.files[0] : false;
            var error = false;
            if (file) {
                e.target.value = "";
                var fileSize = file.size ? file.size : 0;
                var fileType = file.type ? file.type.toLowerCase() : "";

                if (suportedTypes.indexOf(fileType) < 0) {
                    error = _L[type + '_error_type'];
                } else if (fileSize > maxSize) {
                    error = _L[type + '_error_size'];
                } else {
                    var formData = new FormData();
                    formData.append('file', file);
                    formData.append('getJson', 'true');

                    $.ajax({
                        url: "https://api.assets.cet.ac.il/filesUpload.ashx",
                        data: formData,
                        type: "POST",
                        contentType: false,
                        processData: false,
                        cache: false,
                        dataType: "json",
                        error: function (err) {

                        },
                        success: function (_data) {
                            if (_data.files.length > 0 && _data.files[0].errorCode == null) {
                                if(onsuccess) {
                                    onsuccess(_data.files[0].url);
                                }
                            }
                            else {

                            }
                        },
                        complete: function () {

                        }
                    });
                }

                if (error) {
                    triger.attr('data-error_tooltip', error);
                    setTimeout(function () {
                        var tt = triger.attr('data-tooltip');
                        triger.removeAttr('data-tooltip').removeAttr('data-error_tooltip');
                        triger.attr('data-tooltip', tt);
                    }, 2000);
                    if(onerror) {
                        onerror(error);
                    }
                }
            }
        };
        inputFile.click();
    };

    var create_skin_selector = function (data, onChange) {
        dom.attr('data-skin', data.index);
        var skins_dom = '<div class="yesno-skins-wrapper"></div>';
        skins_dom = $(skins_dom);
        for (var i = 0; i < data.length; i++) {
            skins_dom.append('<div class="yesno-skin" data-skin="' + i + '">\
                                <div class="yesno-skin_title">' + _L['skin_title_' + i] + '</div>\
                                <svg class="select_icon"><use xlink:href="../content/img/icons.svg#choosen_v"></use></svg>\
                                <div class="refresh" data-tooltip="' + _L.refresh + '" data-tooltip_layout_v="b" data-tooltip_layout_h="r"><svg><use xlink:href="../content/img/icons.svg#refresh"></use></svg></div>\
                            </div>');
        }

        skins_dom.on('click', '.yesno-skin', function () {
            currentSkin = oPreset.skin;
            var val = Number($(this).attr('data-skin'));
            dom.attr('data-skin', val);
            onChange(val, false);

            var sound_icon='icon-question-sound';
            switch(oPreset.skin){
                case 1: {sound_icon ='icon-sound';oPreset.bar_shape=1;break;}
                default: {sound_icon = 'icon-question-sound';break;}
            }

            //document.querySelector(".yesno-question-text_sound .yesno-sound_player-btn svg[data-play='1'] use").setAttribute('href', "../content/img/icons.svg#icon-sound-play" );
            //document.querySelector(".yesno-question-text_sound .yesno-sound_player-btn svg[data-play='0'] use").setAttribute('href', "../content/img/icons.svg#icon-sound-stop" );
            var sound_btn_play = document.querySelectorAll(".yesno-question-sound .yesno-sound_player-btn svg[data-play='1'] use");
            sound_btn_play.forEach(function(item) {
                item.setAttribute('href', "../content/img/icons.svg#" + sound_icon + "-play" );
            });
            var sound_btn_stop = document.querySelectorAll(".yesno-question-sound .yesno-sound_player-btn svg[data-play='0'] use");
            sound_btn_stop.forEach(function(item) {
                item.setAttribute('href', "../content/img/icons.svg#" + sound_icon + "-stop" );
            });


            oPreset.bar_background_color =  false;

            var game_bg_img;
            var game_bg_layout;
            var game_bg_color;
            var answer_bg_color;
            var answer_font_size;
            var answer_text_color;
            (((oPreset.game_bg_image == defaultSkinData[currentSkin].comon.game_bg_image) || (!oPreset.game_bg_image)) ? game_bg_image = true : game_bg_image = false);
            (((oPreset.game_bg_image_layout == defaultSkinData[currentSkin].comon.game_bg_image_layout) || (!oPreset.game_bg_image_layout)) ? game_bg_layout = true : game_bg_layout = false);
            (((oPreset.game_bg_color == defaultSkinData[currentSkin].comon.game_bg_color) || (!oPreset.game_bg_color)) ? game_bg_color = true : game_bg_color = false);
            (((oPreset.answer_btn_bg_color == defaultSkinData[currentSkin].comon.answer_btn_bg_color) || (!oPreset.answer_btn_bg_color)) ? answer_bg_color = true : answer_bg_color = false);
            (((oPreset.answer_btn_font_size == defaultSkinData[currentSkin].comon.answer_btn_font_size) || (!oPreset.answer_btn_font_size)) ? answer_font_size = true : answer_font_size = false);
            (((oPreset.answer_btn_text_color == defaultSkinData[currentSkin].comon.answer_btn_text_color) || (!oPreset.answer_btn_text_color)) ? answer_text_color = true : answer_text_color = false);

            if(game_bg_image)
               oPreset.game_bg_image = defaultSkinData.getPresetVal('game_bg_image',true);//false;
            if(game_bg_layout)
               oPreset.game_bg_image_layout = false;
            if(answer_bg_color)
               oPreset.answer_btn_bg_color = false;
            if(answer_font_size)
               oPreset.answer_btn_font_size = false;
            if(answer_text_color)
                oPreset.answer_btn_text_color = false;

            oPreset.font = false;
            //updateDefaultSkinData(true);
            updateSkinData(true);
        });

        skins_dom.on('click', '.refresh', function () {
            var val = Number($(this).closest('.yesno-skin').attr('data-skin'));
            onChange(val, true);
        });

        return skins_dom;
    };

    var create_layout_selector = function () {
        var s_dom = '<div class="yesno-layout_selector">\
                        <div class="yesno-layout_selector-triger">\
                            <div class="yesno-layout_selector-btn"></div>\
                        </div>\
                        <div class="yesno-layout_selector-mask"></div>\
                        <div class="yesno-layout_selector-list"></div>\
                    </div>';
        s_dom = $(s_dom);

        var trigerDom = s_dom.find('.yesno-layout_selector-triger');
        var maskDom = s_dom.find('.yesno-layout_selector-mask');
        var listDom = s_dom.find('.yesno-layout_selector-list');
        var layoutList = ['ita', 'ata', 'it', 'at', 'ta', 't', 'i', 'a'];

        for(var i = 0; i < layoutList.length; i++) {
            listDom.append('<div class="yesno-layout_selector-btn" data-layout="' + layoutList[i] + '"><svg><use href="../content/img/icons.svg#icon-layout_' + layoutList[i] + '"></use></svg></div>')
        }

        var close = function() {
            s_dom.attr('data-open', 0);
        }
        var open = function() {
            s_dom.attr('data-open', 1);
        }
        var setLayout = function (layout) {
            s_dom.attr('data-layout', layout);
            trigerDom.html(listDom.find('.yesno-layout_selector-btn[data-layout="' + layout + '"]').clone());
        }

        trigerDom.on('click', open);
        maskDom.on('click', close);
        listDom.on('click', '.yesno-layout_selector-btn', function () {
            var layout = $(this).attr('data-layout');
            setLayout(layout);
            if(selected_item) {
                selected_item.setLayout(layout);
            }
            close();
        });

        s_dom.set_layout = setLayout;
        return s_dom;
    };

    var color_picker_counter = 0;
    var createColorPicker = function (_color, _onChange) {
        var dom = '<div class="yesno-color_picker">\
                        <div class="yesno-color_picker-color"></div>\
                        <div class="yesno-color_picker-input_block">\
                            <input class="yesno-color_picker-input" />\
                            <div class="yesno-color_picker-input_block_line"></div>\
                        </div>\
                    </div>';
        dom = $(dom);
        var picker = false;
        var color = dom.find('.yesno-color_picker-color');
        var input = dom.find('.yesno-color_picker-input');

        color_picker_counter++;
        dom.attr('id', 'yesno-color_picker--' + color_picker_counter);

        input.val(_color);
        color.attr('data-color', _color).css('color', '#' + _color);

        color.on('click', function () {
            if (picker) {
                picker.show();
            }
        });

        picker = new jscolor(input[0], {
            onFineChange: function () {
                color.attr('data-color', input.val()).css('color', '#' + input.val());
            }
        });

        input.change(function () {
            _onChange(input.val(), dom);
        });

        dom.set_color = function (_color) {
            picker.fromString(_color);
            picker.onFineChange();
        };

        return dom;
    }

    var createSelector = function (data, onChange) {
        var dom_selector = '<div class="yesno-selector-contaner">\
                      <div class="yesno-selector">\
                        <div class="yesno-selector-title"><div class="yesno-selector-title_content"></div></div>\
                        <div class="yesno-selector-mask"></div>\
                        <div class="yesno-selector-items"></div>\
                      </div>\
                  </div>';
        dom_selector = $(dom_selector);
        var selectedItem = false;

        var open = function () {
            dom_selector.attr('data-open', 1);
        };

        var close = function () {
            dom_selector.attr('data-open', 0);
        };

        var setSelectedItem = function (item) {
            if (selectedItem) {
                selectedItem.attr('data-selected', 0);
            }
            selectedItem = item;
            dom_selector.find('.yesno-selector-title_content').html(selectedItem.clone());
            //dom_selector.find('.yesno-selector-title_content').html('<div class="yesno-selector-item">' + selectedItem.html() + '</div>');
            selectedItem.attr('data-selected', 1);
        };

        var items = {};
        var createSelectorItem = function (_data) {
            var domItem = '<div class="yesno-selector-item"><div class="yesno-selector-text"></div></div>';
            domItem = $(domItem);
            domItem.find('.yesno-selector-text').html(_data.text);
            if (_data.icon) {
                domItem.prepend('<div class="yesno-selector-icon"><svg><use href="../content/img/icons.svg#' + _data.icon + '"></use></svg></div>');
            }

            domItem.on('click', function () {
                setSelectedItem(domItem);
                onChange(_data);
                close();
            });

            if (data.val == _data.val) {
                setSelectedItem(domItem);
            }

            items[_data.val] = domItem;

            dom_selector.find('.yesno-selector-items').append(domItem);
        }

        for (var i = 0; i < data.items.length; i++) {

            createSelectorItem(data.items[i]);
        }

        dom_selector.on('click', '.yesno-selector-title', function () {
            open();
        });

        dom_selector.on('click', '.yesno-selector-mask', function () {
            close();
        });

        dom_selector.set_val = function (val) {
            if (items[val]) {
                setSelectedItem(items[val]);
                //items[val].click();
            }
        };

        return dom_selector;
    };

    var create_text = function (data, onChange) {
        var dom = '<div class="wizard-text_input-wrapper" data-tooltip_layout_v="c" data-tooltip_layout_h="l"><input type="text" /><span class="wizard-text_input-border"></span></div>';
        var errorDom = false;
        var showError = true;
        dom = $(dom);
        if (data.errors) {
            errorDom = dom.eq(0);
        }
        var inputDom = dom.eq(0);
        inputDom.find('input[type="text"]').val(data.val);
        var lengthDom = false;
        if (data.max || data.min) {
            if (data.max) {
                inputDom.append('<span class="wizard-text_input-length"><span class="wizard-text_input-length--num"></span>/<span class="wizard-text_input-length--max">' + data.max + '</span></span>');
            }
            inputDom.attr('data-max', data.max ? data.max : 0);
            lengthDom = inputDom.find('.wizard-text_input-length .wizard-text_input-length--num');

            var l = data.val.replace(/[\u0591-\u05C7]/g, '').length
            lengthDom.text(l);

            var hasError = false;
            var errorMsg = false;

            if (data.max) {
                hasError = (l > data.max);
                inputDom.attr('data-max_error', (hasError ? '1' : '0'));
                errorMsg = hasError ? 'max' : false;
            }
            if (data.min && !hasError) {
                hasError = (l < data.min);
                inputDom.attr('data-max_error', (hasError ? '1' : '0'));
                errorMsg = hasError ? 'min' : false;
            }

            if (errorDom) {
                if (errorMsg) {
                    errorDom.attr('data-error_tooltip', data.errors[errorMsg]);
                    errorDom.attr('data-tooltip', '');
                }
                else {
                    errorDom.removeAttr('data-error_tooltip');
                    errorDom.removeAttr('data-tooltip');
                }
            }
        }

        var setShowError = function (show) {
            showError = show;
            chackData();
        };

        var chackData = function (val) {
            if (typeof (val) == 'undefined') {
                val = inputDom.find('input[type="text"]').val();
            }

            if (lengthDom) {
                var l = val.replace(/[\u0591-\u05C7]/g, '').length;
                lengthDom.text(l);
                var hasError = false;

                if (data.max) {
                    hasError = (l > data.max);
                    inputDom.attr('data-max_error', (hasError ? '1' : '0'));
                    errorMsg = hasError ? 'max' : false;
                }
                if (data.min && !hasError) {
                    hasError = (l < data.min);
                    inputDom.attr('data-max_error', (hasError ? '1' : '0'));
                    errorMsg = hasError ? 'min' : false;
                }
            }

            if (errorDom) {
                if (errorMsg && showError) {
                    errorDom.attr('data-error_tooltip', data.errors[errorMsg]);
                    errorDom.attr('data-tooltip', '');
                }
                else {
                    errorDom.removeAttr('data-error_tooltip');
                    errorDom.removeAttr('data-tooltip');
                }
            }
        };

        var _onChange = function (val) {
            var errorMsg = false;

            chackData(val);

            if (onChange) {
                onChange(val);
            }
        };

        inputDom.on('input', 'input[type="text"]', function () {
            var val = $(this).val();
            _onChange(val);
        });

        dom.set_val = function (val) {
            inputDom.find('input[type="text"]').val(val);
            _onChange(val);
        };
        dom.setShowError = setShowError;
        return dom;
    };

    var create_number = function (data, onChange) {
        var last = data.val;
        var dom = create_text({
            val: data.val,
            max: false,
            min: false
        }, function (val) {
            var isNum = !isNaN(val);
            var num;
            if (isNum && val !== "") {
                var num = Number(val);
                if ((data.min === 0 || data.min) && num < data.min) {
                    num = data.min;
                }
                if ((data.max === 0 || data.max) && num > data.max) {
                    num = data.max;
                }
                if ((num + '') != dom.find('input').val()) {
                    dom.find('input').val(num + '');
                }
            }
            else if (val === "") {
                num = null;
            }
            else {
                num = last;
                dom.find('input').val(last);
            }
            last = num;
            onChange(num);
        });
        dom.addClass('wizard-number_input-wrapper');
        return dom;
    };

    var create_timer = function (data) {
        var time = data.time || 0;
        var stroke_width = data.stroke_width || 1;
        var show_trigger = data.show_trigger;
        var onEnd = data.onEnd;
        var onPause = data.onPause;
        var onStop = data.onStop;
        var onPlay = data.onPlay;
        var is_playing = false;
        var is_end = false;
        var total_time = 0;
        var start_time = Date.now();
        var time_interval = false;
        var p = 0;

        var dom = '<div class="timer" data-playing="0">\
                        <div class="timer-time"><span></span></div>\
                        <div class="timer-time-arc">\
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 37 37" style="enable-background:new 0 0 37 37;" xml:space="preserve">\
                                <path class="svg-timer-arc" stroke-width="' + stroke_width + '"/>\
                            </svg>\
                        </div>\
                        </div>';
        dom = $(dom);

        if(!show_trigger) {
            dom.find('.timer-time-triger').remove();
        }
        else {
            dom.on('click', '.timer-time-triger', function() {
                if(is_playing) {
                    pause();
                }
                else {
                    play();
                }
            });
        }

        var timerArc = dom.find('.svg-timer-arc')[0];
        var timeStrDom = dom.find('.timer-time span');
        var angleInRadians = function (angleInDegrees) {
            return (angleInDegrees - 90) * (Math.PI / 180.0);
        };
        var polarToCartesian = function (centerX, centerY, radius, angleInDegrees) {
            var a = angleInRadians(angleInDegrees);
            return {
                x: centerX + (radius * Math.cos(a)),
                y: centerY + (radius * Math.sin(a)),
            };
        };
        var arc = function (x, y, radius, startAngle, endAngle) {
            if (startAngle == endAngle) {
                return '';
            }
            var fullCircle = endAngle - startAngle === 360;
            var start = polarToCartesian(x, y, radius, endAngle - 0.01);
            var end = polarToCartesian(x, y, radius, startAngle);
            var arcSweep = endAngle - startAngle <= 180 ? '0' : '1';

            var d = [
                'M', start.x, start.y,
                'A', radius, radius, 0, arcSweep, 0, end.x, end.y,
            ];

            if (fullCircle) {
                d.push('z');
            }

            d = d.join(' ');
            return d;
        };

        var timer_handler = function () {
            var fun = function () {
                drow();
                if(p == 100) {
                    time_interval = false;
                    is_playing = false;
                    total_time = time;
                    dom.attr('data-playing', '0');
                    if(onEnd) {
                        onEnd();
                    }
                }
                else if (is_playing && p < 100) {
                    time_interval = window.requestAnimationFrame(fun);
                }
            };

            if (is_playing) {
                time_interval = window.requestAnimationFrame(fun);
            }
        };

        var timer_handler_stop = function () {
            if (time_interval) {
                window.cancelAnimationFrame(time_interval);
                time_interval = false;
            }
        };

        var drow = function () {
            var now = Date.now();

            var runing_time = total_time + Math.floor((now - start_time) / 1000);
            p = runing_time * 100 / time;
            if(p < 0) {p = 0;}
            else if(p > 100) {p = 100;}
            var a = p * 360 / 100;
            if(a == 0) {
                timerArc.setAttribute("d", '');
            }
            else {
                timerArc.setAttribute("d", arc(18.5, 18.5, (35 - stroke_width)/2, 0, a));
            }
            dom.attr('data-end', p == 100 || is_end ? '1' : '0');

            var textSize = false;
            var timeStr = '';
            var timeToEnd = time - runing_time;
            if(timeToEnd < 0) timeToEnd = 0;
            if(timeToEnd >= 60*60) {
                var timeToEndModH = timeToEnd % (60*60);
                var timeToEndDivH = (timeToEnd - timeToEndModH) / (60*60);
                timeStr += timeToEndDivH + ':';
                timeToEnd = timeToEndModH;
                textSize = 0.8;
            }
            if(timeToEnd >= 60 || textSize != false) {
                var timeToEndModM = timeToEnd % (60);
                var timeToEndDivM = (timeToEnd - timeToEndModM) / (60);
                timeStr += (timeToEndDivM < 10 ? '0' : '') + timeToEndDivM + ':';
                timeToEnd = timeToEndModM;
                if(textSize == false) {
                    textSize = 1;
                }
            }
            if(textSize == false) {
                textSize = 1.5;
            }
            timeStr += (timeToEnd < 10 ? '0' : '') + timeToEnd;
            timeStrDom.html(timeStr);
            timeStrDom.css({
                'font-size': textSize + 'em'
            });

            return p;
        };
        var pause = function () {
            if(!is_playing) {
                return;
            }
            is_playing = false;
            is_end = false;
            total_time += Math.floor((Date.now() - start_time) / 1000);
            dom.attr('data-playing', '0');
            timer_handler_stop();
            drow();
            if(onPause){
                onPause();
            }};
        var cancel = function () {
            if (!is_playing) {
                return;
            }
            is_playing = false;
            is_end = false;
            total_time += Math.floor((Date.now() - start_time) / 1000);
            dom.attr('data-playing', '0');
            timer_handler_stop();
            drow();
        };
        var stop = function () {
            if(!is_playing) {
                return;
            }
            is_playing = false;
            is_end = true;
            total_time += Math.floor((Date.now() - start_time) / 1000);
            dom.attr('data-playing', '0');
            timer_handler_stop();
            drow();
            if(onStop){
                onStop();
            }};
        var play = function () {
            if(is_playing) {
                return;
            }
            is_playing = true;
            is_end = false;
            start_time = Date.now();
            dom.attr('data-playing', '1');
            timer_handler();
            if(flag==true){
            if(onPlay){
                onPlay();
            }
        }
        };
        var refresh = function () {
            is_end = false;
            start_time = Date.now();
            total_time = 0;
            drow();
        };
        var set_time = function (_time) {
            time = _time;
            refresh();
        };

        dom.drow = drow;
        dom.pause = pause;
        dom.stop = stop;
        dom.play = play;
        dom.refresh = refresh;
        dom.set_time = set_time;
        dom.cancel = cancel;

        drow();

        return dom;
    };

    var item_id = 0;
    var selected_item = false;
    var items = {};
    var last_sound = false;

    var updateItemsIndex = function() {
        var slides_items_count = shapesDom.find('.yesno-status_bar-item').length;
        if (slides_items_count > 10) {
            slides_items_count = 10;
        }
        slidesDom.attr('data-items_coun', slides_items_count);

        var itemsIds = Object.keys(items);
        for(var i = 0; i < itemsIds.length; i++) {
            items[itemsIds[i]].updateIndex();
        }
    };

    //var isPlaying = false;
    //var sound = false, text_sound = false;

    var createItem = function (_index, data) {
        var id = 'item_' + item_id;
        item_id++;
        var index;
        var textEditor = false;
        var btnEditor = [false, false, false];

        var dom_slide_item = '<div class="yesno-slide_item" data-item_id="' + id + '">\
                                <div class="yesno-slide_item-text"></div>\
                                <div class="yesno-slide_item-tools">\
                                    <div class="yesno-slide_item-tool" data-tool="remove" data-tooltip="' + _L.remove_slide + '" data-tooltip_layout_v="b" data-tooltip_layout_h="r"><svg><use href="../content/img/icons.svg#icon-delete"></use></svg></div>\
                                    <div class="yesno-slide_item-tool" data-tool="clone" data-tooltip="' + _L.clone_slide + '" data-tooltip_layout_v="b" data-tooltip_layout_h="r"><svg><use href="../content/img/icons.svg#icon-clone"></use></svg></div>\
                                </div>\
                            </div>';
        dom_slide_item = $(dom_slide_item);

        var dom_shape = '<div class="yesno-status_bar-item" data-item_id="' + id + '">\
                            <svg id="default_icon"><use href="../content/img/icons.svg#icon-bar_shape_' + defaultSkinData.getPresetVal('bar_shape',true) + '"></use></svg>\
                            <svg id="correct_icon"><use href="../content/img/icons.svg#icon-bar_shape_' + defaultSkinData.getPresetVal('bar_shape',true) + '_correct"></use></svg>\
                            <svg id="wrong_icon"><use href="../content/img/icons.svg#icon-bar_shape_' + defaultSkinData.getPresetVal('bar_shape',true) + '_wrong"></use></svg>\
                            <svg id="timeout_icon"><use href="../content/img/icons.svg#icon-bar_shape_' + defaultSkinData.getPresetVal('bar_shape',true) + '_timeout"></use></svg>\
                            <svg id="answer_icon"><use href="../content/img/icons.svg#icon-bar_shape_4_answer"></use></svg>\
                        </div>';
        dom_shape = $(dom_shape);
        // data-answer data-selected

        var dom_item = '<div class="yesno-question swiper-slide" data-item_id="' + id + '">\
                             <div class="yesno-question-contaner-wrapper"><div class="yesno-question-contaner">\
                                <div class="yesno-question-image yesno-question-element">\
                                    <div class="yesno-question-image_uploder" data-edit_mode="1" data-tooltip="" data-tooltip_layout_v="b" data-tooltip_layout_h="c">\
                                        <div class="yesno-question-image_uploder-set">\
                                            <div class="yesno-question-image_uploder-set-wraper">\
                                                <svg><use href="../content/img/icons.svg#icon-image"></use></svg>\
                                                <span>' + _L.question_image_set_title + '<span>525x246</span></span>\
                                            </div>\
                                        </div>\
                                        <div class="yesno-question-image_uploder-update"><span>' + _L.question_image_update_title + '</span></div>\
                                        <div class="yesno-question-image_uploder-delete" data-tooltip="' + _L.question_image_delete_toltip + '" data-tooltip_layout_v="b" data-tooltip_layout_h="r"><svg><use href="../content/img/icons.svg#icon-delete"></use></svg></div>\
                                    </div>\
                                </div>\
                                <div class="yesno-question-text-wraper">\
                                    <div class="yesno-question-text yesno-question-element">\
                                        <div class="yesno-question-text_editor_contaner">\
                                            <div class="yesno-question-text_editor yesno-text" data-item_text_editor_id="' + id + '" style="font-size: 2rem;"></div>\
                                        </div>\
                                        <div class="yesno-question-text_editor_bar" data-item_text_editor_id="' + id + '" data-edit_mode="1"></div>\
                                    </div>\
                                    <div class="yesno-question-text_sound yesno-question-element"></div>\
                                </div>\
                                <div class="yesno-question-sound yesno-question-element"></div>\
                                <div class="yesno-question-answer_btn yesno-question-element" data-answer="1">\
                                    <div class="yesno-question-answer_btn-text yesno-text">\
                                    </div>\
                                    <div class="yesno-question-answer_btn-selected-edit yesno-tools_btn_wraper" data-edit_mode="1" data-tooltip="' + _L.answer_btn_select_tooltip + '" data-tooltip_layout_v="t" data-tooltip_layout_h="' + (_L.dir == 'rtl' ? 'r' : 'l') + '"><svg><use xlink:href="../content/img/icons.svg#choosen_v"></use></svg></div>\
                                    <div class="yesno-tools_btn_wraper" data-edite="answer_btn_1" data-layout="h" data-edit_mode="1">\
                                        <div class="yesno-edit_btn yesno-tools_btn" data-edite="answer_btn_1" data-tooltip="' + _L.answer_btn_font_edit + '" data-tooltip_layout_v="t" data-tooltip_layout_h="' + (_L.dir == 'rtl' ? 'r' : 'l') + '">\
                                            <svg><use href="../content/img/icons.svg#icon-edit"></use></svg>\
                                            <div class="yesno-edit_panel" data-layout="v" data-layout_v="t" data-layout_h="' + (_L.dir == 'rtl' ? 'r' : 'l') + '">\
                                                <div class="yesno-edit_panel-mask"></div><div class="yesno-edit_panel-wraper"></div>\
                                            </div>\
                                        </div>\
                                    </div>\
                                </div>\
                                <div class="yesno-question-answer_btn yesno-question-element" data-answer="2">\
                                    <div class="yesno-question-answer_btn-text yesno-text">\
                                    </div>\
                                    <div class="yesno-question-answer_btn-selected-edit yesno-tools_btn_wraper" data-edit_mode="1" data-tooltip="' + _L.answer_btn_select_tooltip + '" data-tooltip_layout_v="t" data-tooltip_layout_h="' + (_L.dir == 'rtl' ? 'l' : 'r') + '"><svg><use xlink:href="../content/img/icons.svg#choosen_v"></use></svg></div>\
                                    <div class="yesno-tools_btn_wraper" data-edite="answer_btn_2" data-layout="h" data-edit_mode="1">\
                                        <div class="yesno-edit_btn yesno-tools_btn" data-edite="answer_btn_2" data-tooltip="' + _L.answer_btn_font_edit + '" data-tooltip_layout_v="t" data-tooltip_layout_h="' + (_L.dir == 'rtl' ? 'l' : 'r') + '">\
                                            <svg><use href="../content/img/icons.svg#icon-edit"></use></svg>\
                                            <div class="yesno-edit_panel" data-layout="v" data-layout_v="t" data-layout_h="' + (_L.dir == 'rtl' ? 'l' : 'r') + '">\
                                                <div class="yesno-edit_panel-mask"></div><div class="yesno-edit_panel-wraper"></div>\
                                            </div>\
                                        </div>\
                                    </div>\
                                </div>\
                            </div></div>\
                        </div>';
        dom_item = $(dom_item);

        if (isEditMote) {
            dom_item.on('click', '.yesno-question-image_uploder-set, .yesno-question-image_uploder-update', function() {
                uplodeFile('image', $(this).closest('.yesno-question-image_uploder'), function(url){
                    setImage(url);
                }, function() {});
            });
            dom_item.on('click', '.yesno-question-image_uploder-delete', function() {
                setImage(false);
            });

            dom_item.on('click', '.yesno-question-answer_btn[data-answer="1"] .yesno-question-answer_btn-selected-edit', function() {
                setCorrectAnswer(1);
            });
            dom_item.on('click', '.yesno-question-answer_btn[data-answer="2"] .yesno-question-answer_btn-selected-edit', function() {
                setCorrectAnswer(2);
            });
        }
        else {
            dom_slide_item.find('[data-edit_mode="1"]').remove();
            dom_item.find('[data-edit_mode="1"]').remove();

            if((workMode !== "Results" && workMode !== "Solution")){
                dom_item.on('click', '.yesno-question-answer_btn[data-answer="1"]', function() {
                    if(!data.answer || (data.answer && workMode=="Evaluation")) {
                        setAnswer(1);
                        saveState(oPreset);
                        timer.stop();
                        if(workMode !== "Evaluation")
                            setTimeout(next_question, 1500);
                        else
                            sendEvent(events_types.answer);
                    }
                });
                dom_item.on('click', '.yesno-question-answer_btn[data-answer="2"]', function() {
                    if(!data.answer|| (data.answer && workMode=="Evaluation")) {
                        setAnswer(2);
                        saveState(oPreset);
                        timer.stop();
                        if(workMode !== "Evaluation")
                            setTimeout(next_question, 1500);
                        else
                            sendEvent(events_types.answer);
                    }
                });
            }
        }

        var createSound = function(data, icon, dir, onplay, onpause) {
            //{url: false, auto_play: false}
            var dom_sound = '<div class="yesno-sound_player" data-play="0">\
                                <div class="yesno-sound_player-btn" role="button" tabindex="1" aria-label="'+ _L.btn_play_sound +'">\
                                    <svg data-play="1"><use xlink:href="../content/img/icons.svg#' + icon + '-play"></use></svg>\
                                    <svg data-play="0"><use xlink:href="../content/img/icons.svg#' + icon + '-stop"></use></svg>\
                                </div>\
                                <div class="yesno-tools_btn_wraper" data-edite="sound_player-' + icon + '" data-layout="h" data-edit_mode="1" style="' + (dir == 'rtl' ? 'right: 0; left: auto; transform: translate(50%, 50%);top: -20px;' : 'right: auto; left: 0; transform: translate(-50%, 50%); top: -20px;') + '">\
                                    <div class="yesno-edit_btn yesno-tools_btn" data-edite="sound_player-' + icon + '" data-tooltip="' + _L.sound_edit_tooltip + '" data-tooltip_layout_v="b" data-tooltip_layout_h="' + (dir == _L.dir ? 'l' : 'r') + '">\
                                        <svg><use href="../content/img/icons.svg#icon-edit"></use></svg>\
                                        <div class="yesno-edit_panel" data-layout="v" data-layout_v="b" data-layout_h="' + (dir == _L.dir ? 'l' : 'r') + '">\
                                            <div class="yesno-edit_panel-mask">\
                                            </div>\
                                            <div class="yesno-edit_panel-wraper">\
                                                <div class="yesno-edit_panel-content">\
                                                    <div class="yesno-edit_panel-row" style="position: relative;">\
                                                        <div class="yesno-edit_panel-update_file" data-tooltip="" data-tooltip_layout_v="b" data-tooltip_layout_h="c">\
                                                            <div class="yesno-edit_panel-update_file-icon"><svg><use href="../content/img/icons.svg#icon-sound"></use></svg></div>\
                                                            <span data-togel="0">' + _L.sound_add + '</span>\
                                                            <span data-togel="1">' + _L.sound_update + '</span>\
                                                        </div>\
                                                        <div class="yesno-edit_panel-update_file-delete" data-tooltip="' + _L.sound_remove_tooltip + '" data-tooltip_layout_v="b" data-tooltip_layout_h="c"><svg><use href="../content/img/icons.svg#icon-delete"></use></svg></div>\
                                                    </div>\
                                                    <div class="yesno-edit_panel-row" style="position: relative; margin-top: 10px;">\
                                                        <div class="yesno-edit_panel-auto_play">' + _L.sound_auto_play + '<span class="yesno-edit_panel-auto_play-cb"><svg><use xlink:href="../content/img/icons.svg#choosen_v"></use></svg></span></div>\
                                                    </div>\
                                                </div>\
                                            </div>\
                                        </div>\
                                    </div>\
                                </div>\
                            </div>';

            dom_sound = $(dom_sound);

            if(isEditMote) {
                dom_sound.on('click', '.yesno-tools_btn_wraper .yesno-edit_panel-update_file', function(){
                    uplodeFile('sound', $(this), function(url) {
                        stop();
                        satUrl(url);
                    }, function() {});
                });
                dom_sound.on('click', '.yesno-tools_btn_wraper .yesno-edit_panel-update_file-delete', function(){
                    stop();
                    satUrl(false);
                });
                dom_sound.on('click', '.yesno-tools_btn_wraper .yesno-edit_panel-auto_play', function(){
                    data.auto_play = !data.auto_play;
                    $(this).attr('data-selected', data.auto_play ? '1' : '0');
                });
                dom_sound.find('.yesno-tools_btn_wraper .yesno-edit_panel-auto_play').attr('data-selected', data.auto_play ? '1' : '0');
            }
            else {
                dom_sound.find('[data-edit_mode="1"]').remove();
            }

            dom_sound.on('click', '.yesno-sound_player-btn', function(){
                toggel();
            });

            var isPlaying = false;
            var player = document.createElement("audio");
            player.onplay = function () {
                if(last_sound && last_sound != dom_sound) {
                    try {
                        last_sound.stop();
                    }
                    catch(e){}
                }
                last_sound = dom_sound;
                dom_sound.attr('data-play', '1');
                isPlaying = true;
                if(onplay) {
                    onplay();
                }
            };
            player.onpause = function () {
                dom_sound.attr('data-play', '0');
                isPlaying = false;
                if(onpause) {
                    onpause();
                }
            };

            var play = function() {
                if(data.url) {
                    player.play();
                }
            };
            var stop = function() {
                if (isPlaying) {
                    try {
                        player.pause();
                        player.currentTime = 0;
                    }
                    catch (e) { }
                }
            };
            var toggel = function () {
                if(isPlaying) {
                    stop();
                }
                else {
                    play();
                }
            };
            var satUrl = function(url) {
                data.url = url;
                if(data.url) {
                    player.src = data.url;
                    dom_sound.attr('data-is_empty', '0');
                    dom_sound.find('.yesno-edit_panel-update_file').attr('data-togel', '1');
                }
                else {
                    player.src = '';
                    dom_sound.attr('data-is_empty', '1');
                    dom_sound.find('.yesno-edit_panel-update_file').attr('data-togel', '0');
                }
            };

            satUrl(data.url);

            dom_sound.play = play;
            dom_sound.stop = stop;
            dom_sound.toggel = toggel;
            dom_sound.satUrl = satUrl;

            return dom_sound;
        };

        var sound_auto_play = false;
        if(data.layout == "ata" || data.layout == "at" || data.layout == "a"){
            sound_auto_play = !isEditMote && data.sound.auto_play;
        }
        var text_sound_auto_play = false;
        if(data.layout == "ita" || data.layout == "ata" || data.layout == "ta"){
            text_sound_auto_play = !isEditMote && data.text_sound.url && data.text_sound.auto_play;
        }
        var sound = false, text_sound = false;
        var sound_icon='icon-question-sound';
        var text_sound_icon='icon-sound_1';
        switch(oPreset.skin){
            case 1: sound_icon ='icon-sound';text_sound_icon='icon-sound'; break;
            case 3: sound_icon = 'icon-question-sound';text_sound_icon='icon-sound_1';break;
            default: sound_icon = 'icon-question-sound';text_sound_icon='icon-sound_1';break;
        }
        sound = createSound(data.sound, sound_icon, _L.dir, function(){
            sound_auto_play = false;
        });
        text_sound = createSound(data.text_sound, text_sound_icon, defaultSkinData.getPresetVal('dir'), function(){
            text_sound_auto_play = false;
        }, function(){
            autoPlaySound();
        });
        dom_item.find('.yesno-question-sound').html(sound);
        dom_item.find('.yesno-question-text_sound').html(text_sound);

        var stopSound = function() {
            sound_auto_play = false;
            text_sound_auto_play = false;
            sound.stop();
            text_sound.stop();
        };
        var autoPlaySound = function() {
            if(oPreset.game_state == 'play') {
                if(text_sound_auto_play) {
                    text_sound.play();
                }
                else if (sound_auto_play) {
                    sound.play();
                }
            }
        };

        var initTiny = function () {
            var config = {
                //selector: '.yesno-slider-item-text_editor[data-item_text_editor_id="' + id + '"]',
                target: dom_item.find('.yesno-question-text .yesno-question-text_editor')[0],
                fixed_toolbar_container: '.yesno-question-text_editor_bar[data-item_text_editor_id="' + id + '"]',
                placeholder: _L.placeholder,
                menubar: false,
                inline: true,
                plugins: [
                    'paste directionality link'
                ],
                toolbar: 'bold | forecolor backcolor | alignleft aligncenter alignright | ltr rtl | fontselect fontsizeselect',/*styleselect detetetext  | link unlink*/
                //toolbar_mode: 'sliding',
                //toolbar_sticky: true,
                default_link_target: "_blank",
                contextmenu: false,
                target_list: false,
                paste_as_text: true,
                valid_elements: 'p[style],strong,span[style]',
                valid_styles: {
                    '*': 'font-size,font-family,color,background-color,text-decoration,text-align'
                },
                powerpaste_word_import: 'clean',
                powerpaste_html_import: 'clean',
                content_css: '//www.tiny.cloud/css/codepen.min.css',
                fontsize_formats: "1rem 1.2rem 1.4rem 1.6rem 1.8rem 2.0rem 2.2rem 2.4rem 2.6rem 2.8rem 3.0rem 3.2rem 3.4rem 3.6rem",
                font_formats: fontList.map(function(font){return font.title + "=" + font.font + ";"}).join(''),
                directionality: 'ltr',
                language: _L.tiny_lang,
                language_url: "../js/tinyEditor/langs/" + _L.tiny_lang + ".js",
                setup: function (editor) {
                    textEditor = editor;
                    editor.ui.registry.addIcon('detetetext-icon', '<svg width="14" height="14"><use href="../content/img/icons.svg#icon-delete"></use></svg>');
                    editor.ui.registry.addButton('detetetext', {
                        icon: 'detetetext-icon',
                        tooltip: _L.remove_text,
                        onAction: function (e) {
                            setTextEnable(false);
                        }
                    });
                }
            };

            tinymce.init(config);
        }

        var initBtnTiny = function (tId, edit) {
            var config = {
                target: edit[0],
                fixed_toolbar_container: '.yesno-question-answer_btn[data-answer="' + tId + '"] .yesno-question-answer_btn-text [data-item_text_btn_editor_id="' + tId + + '_' + id + '"]',
                placeholder: _L.answer_btn_placeholder,
                menubar: false,
                inline: true,
                plugins: [
                    'paste directionality link'
                ],
                toolbar: false,
                //toolbar_mode: 'sliding',
                //toolbar_sticky: true,
                default_link_target: "_blank",
                contextmenu: false,
                target_list: false,
                paste_as_text: true,
                valid_elements: 'p',
                valid_styles: {
                    '*': ''
                },
                powerpaste_word_import: 'clean',
                powerpaste_html_import: 'clean',
                content_css: '//www.tiny.cloud/css/codepen.min.css',
                setup: function (editor) {
                    btnEditor[tId] = editor;
                }
            };

            tinymce.init(config);
        }

        var setIndex = function(_index) {
            var shapesList = shapesDom.find('.yesno-status_bar-item').not('[data-item_id="' + id + '"]');
            if(shapesList.length == 0) {
                index = 0;
            }
            else if(shapesList.length - 1 < _index) {
                index = shapesList.length;
            }
            else {
                index = _index;
            }

            if(index == 0) {
                slidesDom.prepend(dom_slide_item);
                shapesDom.prepend(dom_shape);
                questionsDom.prepend(dom_item);
            }
            else {
                var afterItemId = shapesList.eq(index - 1).attr('data-item_id');
                var afterItem = items[afterItemId];
                afterItem.dom_slide_item.after(dom_slide_item);
                afterItem.dom_shape.after(dom_shape);
                afterItem.dom_item.after(dom_item);
            }

            updateItemsIndex();
        };

        var updateIndex = function() {
            var shapesList = shapesDom.find('.yesno-status_bar-item');
            index = shapesList.index(dom_shape);
            dom_slide_item.find('.yesno-slide_item-text').text(index + 1);
        };

        var select = function (slideTemp) {
            if (selected_item) {
                selected_item.unSelect();
            }
            removeQuestionButtonKeyboardSelection();
            selected_item = item;
            dom_slide_item.addClass('yesno-slide_item--selected');
            dom_shape.attr('data-selected', '1');
            dom_item.attr('data-selected', '1');
            setQuestionButtonKeyboardSelction();

            if(!isEditMote) {
                oPreset.index = index;
                var sound_auto_play = data.sound.auto_play;
                var text_sound_auto_play = data.text_sound.auto_play;
            }

            if(layoutSelector) {
                layoutSelector.set_layout(data.layout);
            }

            saveState(oPreset);
            autoPlaySound();
        };

        var unSelect = function () {
            if (selected_item == item) {
                selected_item = false;
            }
            dom_slide_item.removeClass('yesno-slide_item--selected');
            dom_shape.attr('data-selected', '0');
            dom_item.attr('data-selected', '0');

            stopSound();

            if (textEditor) {
                textEditor.bodyElement.blur();
            }
            if (btnEditor[1]) {
                btnEditor[1].bodyElement.blur();
            }
            if (btnEditor[2]) {
                btnEditor[2].bodyElement.blur();
            }
        };

        var setLayout = function (layout) {
            data.layout = layout;
            dom_item.attr('data-layout', layout);
        };

        var image_dom = dom_item.find('.yesno-question-image');
        var setImage = function (image) {
            data.image = image;
            if(image) {
                image_dom.css('background-image', 'url("' + image + '")');
                image_dom.attr('data-has_image', '1');
            }
            else {
                image_dom.css('background-image', 'none');
                image_dom.attr('data-has_image', '0');
            }
        };

        var setBtnText = function (tId, text) {
            var domT = '';
            domT = $('<div class="yesno-question-answer_btn-text-content"></div>');
            domT.html(text);
            dom_item.find('.yesno-question-answer_btn[data-answer="' + tId + '"] .yesno-question-answer_btn-text').html(domT);
            if(isEditMote) {
                domT.attr('data-item_text_btn_editor_id', tId + '_' + id);
                initBtnTiny(tId, domT);
            }
        }

        var setCorrectAnswer = function (correct_answer) {
            data.correct_answer = correct_answer;
            dom_item.find('.yesno-question-answer_btn[data-answer="1"] .yesno-question-answer_btn-selected-edit').attr('data-selected', correct_answer == 1 ? '1' : '0');
            dom_item.find('.yesno-question-answer_btn[data-answer="2"] .yesno-question-answer_btn-selected-edit').attr('data-selected', correct_answer == 2 ? '1' : '0');
        }

        var icon_preset='';
        if(oPreset.skin == 1){
            icon_preset = "_1";
        }
        var answerMarkerV = $('<div class="yesno-question-answer_marker" data-marck="v"><svg><use href="../content/img/icons.svg#icon-question_answer_marker_v'+icon_preset+'"></use></svg></div>');
        var answerMarkerX = $('<div class="yesno-question-answer_marker" data-marck="x"><svg><use href="../content/img/icons.svg#icon-question_answer_marker_x'+icon_preset+'"></use></svg></div>');
        var answerEmpty = $('<div class="yesno-question-no-answer" ></div>');
        var setAnswer = function (answer) {
            if(!isEditMote) {
                data.answer = answer; // -1 , (0 / false), 1, 2
                dom_item.find('.yesno-question-contaner').attr('data-answer', data.answer);
                answerMarkerV.remove();
                answerMarkerX.remove();
                if(workMode == "Evaluation"){
                    //answerEmpty.remove();
                    dom_item.find('.yesno-question-contaner').find('.yesno-question-no-answer').remove();
                    dom_item.find('.yesno-question-answer_btn').append(answerEmpty);
                    dom_item.find('.yesno-question-answer_btn[data-answer="' + data.answer + '"]').append(answerMarkerV);
                    dom_item.find('.yesno-question-answer_btn[data-answer="' + data.answer + '"]').find('.yesno-question-no-answer').remove();
                    var answer_btn_bg_color = defaultSkinData.getPresetVal('answer_btn_bg_color',false);
                    style = '.yesno-question-answer_marker[data-marck="v"] svg {stroke: #' + answer_btn_bg_color +' ;} ';
                    style += '.yesno-question-answer_marker{ background: #FFF!important;  border: .3em solid #' + answer_btn_bg_color +';}';
                    style += '.yesno-question[data-selected="1"] .yesno-question-contaner .yesno-question-answer_btn{ opacity: 1!important; }';
                    style += '.yesno-question-no-answer{ border-color: #' + answer_btn_bg_color +'; }';
                    dom.find('#yesno-dynamic_style').append(style);
                }else{
                    dom_item.find('.yesno-question-answer_btn[data-answer="' + data.answer + '"]').append(data.answer == data.correct_answer ? answerMarkerV : answerMarkerX);
                }
                //if(data.answer == -1){
                //  dom_item.find('.yesno-question-answer_btn[data-answer="' + data.correct_answer + '"]').append( answerMarkerV);
                //}

                if(data.answer) {
                    dom_shape.attr('data-answer', data.answer == data.correct_answer ? '1' : '0');
                }else {
                    dom_shape.removeAttr('data-answer');
                }
            }
        }

        var getData = function () {
            if (textEditor) {
                data.text = textEditor.getContent();
            }
            if (btnEditor[1]) {
                data.text_btn_1 = btnEditor[1].getContent();
            }
            if (btnEditor[2]) {
                data.text_btn_2 = btnEditor[2].getContent();
            }
            return data;
        };

        dom_slide_item.on('click', '.yesno-slide_item-text', function () {
            select();
        });
        dom_slide_item.on('click', '.yesno-slide_item-tool[data-tool="remove"]', function () {
            var sID = false;
            if (selected_item == item) {
                var next = dom_shape.next();
                if(next.length > 0) {
                    sID = next.attr('data-item_id');
                }
                else {
                    var prev = dom_shape.prev();
                    if(prev.length > 0) {
                        sID = prev.attr('data-item_id');
                    }
                }
            }
            answer_btn_panel.detach();
            dom_slide_item.remove();
            dom_shape.remove();
            dom_item.remove();
            delete items[id];

            if(sID) {
                items[sID].select();
            }

            updateItemsIndex();
        });
        dom_slide_item.on('click', '.yesno-slide_item-tool[data-tool="clone"]', function () {
            var _data = JSON.parse(JSON.stringify(getData(data)));
            var new_item = createItem(index + 1, _data);
            new_item.select();
        });

        var item = {
            id: id,
            getIndex: function () { return index; },
            getData: getData,
            dom_slide_item: dom_slide_item,
            dom_shape: dom_shape,
            dom_item: dom_item,
            setIndex: setIndex,
            updateIndex: updateIndex,
            setLayout: setLayout,
            select: select,
            unSelect: unSelect,
            stopSound: stopSound,
            autoPlaySound: autoPlaySound,
            setAnswer: setAnswer,
        };

        items[id] = item;
        dom_item.find('.yesno-question-text_editor').html(data.text);

        setLayout(data.layout);
        setImage(data.image);
        setBtnText(1, data.text_btn_1);
        setBtnText(2, data.text_btn_2);
        setCorrectAnswer(data.correct_answer);
        setAnswer(data.answer);

        setIndex(_index);
        if(isEditMote) {
            initTiny();
        }

        return item;
    };

    var randomInt = function (min, max) {
        return min + Math.floor(Math.random() * (max - min + 1));
    }

    var set_game_state = function (mode) {
        dom.find('.yesno-contaner').attr('data-game_state', mode);
        if(isEditMote) {
            oPreset.game_state = 'start';
        }
        //else if (isReadOnly) {
        //    oPreset.game_state = 'end';
        //}
        else {
            oPreset.game_state = mode;
        }

        switch (oPreset.game_state) {
            case 'start':
                timer.stop();
                timer.refresh();
                break;
            case 'pause':
                timer.pause();
                if(selected_item) {
                    selected_item.stopSound();
                }
                break;
            case 'time_over':
                timer.stop();
                timer.refresh();
                var myDiv = document.querySelector('.yesno[data-dir=rtl] .yesno-contaner .yesno-status_bar .yesno-deactivating-The-Timer');
                    myDiv.style.display = 'none';
                    myDiv.setAttribute('tabindex','-1');
                if(selected_item) {
                    selected_item.stopSound();
                }
                break;
            case 'play':
                if(flag==true){
                timer.play();}
                var myDiv = document.querySelector('.yesno[data-dir=rtl] .yesno-contaner .yesno-status_bar .yesno-deactivating-The-Timer');
                    myDiv.style.display = 'block';
                    myDiv.setAttribute('tabindex','0');
                if(selected_item) {
                    selected_item.autoPlaySound();
                }
                break;
            case 'end':
                timer.stop();
                timer.refresh();
                if(selected_item) {
                    selected_item.stopSound();
                }
                showEndScreen();
                var myDiv = document.querySelector('.yesno[data-dir=rtl] .yesno-contaner .yesno-status_bar .yesno-deactivating-The-Timer');
                    myDiv.style.display = 'none';
                    myDiv.setAttribute('tabindex','-1');
                //setSwiperSlide();
                break;
            case 'final':
                setSwiperSlide();
                break;
        }

        saveState(oPreset);
    };

    var start_game = function () {
        var sort_items = [];
        var index = 0;
        shapesDom.html('');
        questionsDom.html('');
        dom.find('.yesno-contaner').attr('data-game_view', '0');
        for (var i = 0; i < oPreset.items.length; i++) {
            sort_items.push(i);
        }
        if(!isEditMote) {
            index = oPreset.index;
            if(oPreset.sort_items) {
                sort_items = oPreset.sort_items;
            }
            else if(oPreset.bar_order_of_questions == 'r') {
                var sort_items_temp = [];
                while(sort_items.length > 0) {
                    var i = randomInt(0, sort_items.length - 1);
                    sort_items_temp.push(sort_items[i]);
                    sort_items.splice(i, 1);
                }
                sort_items = sort_items_temp;
            }
            oPreset.sort_items = sort_items;
        }
        for (var i = 0; i < sort_items.length; i++) {
            var item = createItem(i, oPreset.items[sort_items[i]]);
            if(index == i) {
                item.select();
            }
            else if(!isEditMote && selected_item) {
                var item_data = selected_item.getData();
                if(item_data.answer) {
                    item.select();
                }
            }
        }
        saveState(oPreset);
        sendEvent(events_types.loaded);
        if(oPreset.game_state=='end'){
            showEndScreen();
            //setSwiperSlide();
        }
        if(oPreset.game_state=='final'){
            setSwiperSlide();
        }
    };

    var next_question = function () {
        timer.refresh();

        if(selected_item) {
            selected_item.stopSound();
            var next = selected_item.dom_item.next('.yesno-question[data-item_id]');
            if(next.length == 0) {
                set_game_state('end');
            }
            else {
                items[next.attr('data-item_id')].select();
                if(flag==true){
                timer.play();
            }
                set_game_state('play');
            }
            sendEvent(events_types.answer);
        }
    }

    var clear_game = function () {
        flag=true;
        oPreset.sort_items = false;
        oPreset.index = 0;
        questionsDom.hide();
        setTimeout(function(){
            set_game_state('start');
            for(var i = 0; i < oPreset.items.length; i++) {
                oPreset.items[i].answer = false;
            }
            sendEvent(events_types.cleare);
            init();
            start_game();
            questionsDom.show();
        },10);
    };

    $('.yesno-contaner').removeClass('end');
    setDefaultPreset();
    init();
    start_game();

    var __item_id = document.querySelector('.swiper-wrapper .swiper-slide[data-selected="1"]').getAttribute('data-item_id');
    if(__item_id.split('_')[1] == 0){
        $('.slider.arrow.a-left').addClass('swiper-button-disabled').removeAttr('role').removeAttr('tabindex');
    }
    else {
        $('.slider.arrow.a-left').attr('role', 'button').attr('tabindex', 4);
    }
    if(__item_id.split('_')[1] == oPreset.items.length-1){
        $('.slider.arrow.a-right').addClass('swiper-button-disabled').removeAttr('role').removeAttr('tabindex');
    }
    else {
        $('.slider.arrow.a-right').attr('role', 'button').attr('tabindex', 3);
    }

    return {
        getPreset: getPreset
    };
};