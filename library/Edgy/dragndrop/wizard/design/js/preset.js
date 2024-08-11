var preset;
(function (preset) {
    var backgroundImage;
    var backgroundColor;
    var MdistractorBackgroundColor;
    var MdistractorArrowColor;
    var fontSize;
    var fontSizePx;
    var fontName;
    var fontFamily;

    var feedbackSuccessText;
    var feedbackFailureText;

    var model = {
        font: {
          size: '',
          sizePx: '',
          name: '',
          family: ''
        },
        feedback: {
            showFinalFeedback: true,
            errorsRemoval: "automaticaly",
            successText: "כל הכבוד",
            failureText: "נסו שוב"
        },
        welcomeSound: "",
        backgroundImage: "",
        backgroundColor: "",
        borderColor: "",
        MdistractorBackgroundColor: "",
        MdistractorArrowColor:"",
        basketBackgroundColor: "",
        basketBorderColor: "",
        basketOpacity: "",
        groupBackgroundColor: "",
        groupBorderColor: "",
        groupOpacity: "",
        mediaBackgroundColor: "",
        mediaBorderColor: "",
        mediaOpacity: "",
        perishableStorage: false,
        freeGroupMode: false,
        options: [],
        baskets: [],
        groups: [],
        links: [],
        ddd: '',
        medias: []
    };

    function getOption(id) {
        for (var i = 0; i < model.options.length; i++) {
            if (model.options[i].id == id)
                return model.options[i];
        }
        return null;
    }

    function clearBasketsAndOptions() {
        model.baskets = [];
        model.options = [];
        model.groups = [];
        model.links = [];
        model.medias = [];
    }
    preset.clearBasketsAndOptions = clearBasketsAndOptions;

    function getBasketOption(basket) {
        for (var i = 0; i < model.options.length; i++) {
             {
                for (var j = 0; j < model.options[i].baskets.length; j++) {
                    if (basket.id == model.options[i].baskets[j]) {
                        return model.options[i];
                    }
                }
            }
        }

        return null;
    }
    preset.getBasketOption = getBasketOption;

    function addMedia(media) {
        model.medias.push(media.toJson());
    }
    preset.addMedia = addMedia;

    function addGroup(group) {
        model.groups.push(group.toJson());
    }
    preset.addGroup = addGroup;

    function addBasket(basket) {
        model.baskets.push(basket);
    }
    preset.addBasket = addBasket;

    function addOption(option) {
        if (getOption(option.id)) {
            return;
        }
        model.options.push(option);
    }
    preset.addOption = addOption;

    function stringify() {
        return encodeURIComponent( JSON.stringify(model));
    }
    preset.stringify = stringify;

    function decodeURLRecursively(str) {

      // decode only valid str
      var pattern = "\\%[0-9a-f]{2}";
      var re = new RegExp(pattern);
      var result = re.exec(str);

      if (result) {
        try {
          return decodeURLRecursively(decodeURIComponent(str));
        }
        catch (err) {
          throw err.message + '  - Invalid Basket name with %[0-9a-f]{2} charachters - Remove %[0-9a-f]{2} from Basket name';
        }
      } else {
        return str;
      }
    }
    function parse(str) {
      model = JSON.parse(decodeURLRecursively(str));
    }
    preset.parse = parse;

    function setBasketsAndOptions(baskets) {
        preset.clearBasketsAndOptions();

        for (var i = 0; i < baskets.length; i++) {
          preset.addBasket(baskets[i].toJson());
          preset.addOption(baskets[i].toOptionJson());
        }
    }
    preset.setBasketsAndOptions = setBasketsAndOptions;

    function setMedias(medias) {
        for (var i = 0; i < medias.length; i++) {
            preset.addMedia(medias[i]);
        }
    }
    preset.setMedias = setMedias;

    function setGroups(groups) {
        for (var i = 0; i < groups.length; i++) {
            preset.addGroup(groups[i]);
        }
    }
    preset.setGroups = setGroups;

    function getModel() {
        return model;
    }
    preset.getModel = getModel;

    function getBasketOptionById(basketId) {
        for (var i = 0; i < model.options.length; i++) {
            for (var j = 0; j < model.options[i].baskets.length; j++) {
                if (basketId == model.options[i].baskets[j]) {
                    return model.options[i];
                }
            }
        }

        return null;
    }
    preset.getBasketOptionById = getBasketOptionById;

    Object.defineProperty(preset, 'basketShowBorder', {
        get: function () {
            return model.basketBorderColor;
        }
    });

    Object.defineProperty(preset, 'basketBackgroundColor', {
        get: function () {
            return model.basketBackgroundColor;
        },
        set: function (val) {
            model.basketBackgroundColor = val;
        }
    });
    Object.defineProperty(preset, 'basketBorderColor', {
        get: function () {
            return model.basketBorderColor;
        },
        set: function (val) {
            model.basketBorderColor = val;
        }
    });
    Object.defineProperty(preset, 'basketOpacity', {
      get: function () {
            return model.basketOpacity;
        },
        set: function (val) {
            model.basketOpacity = val;
        }
    });

    Object.defineProperty(preset, 'groupBackgroundColor', {
        get: function () {
            return model.groupBackgroundColor;
        },
        set: function (val) {
            model.groupBackgroundColor = val;
        }
    });
    Object.defineProperty(preset, 'groupBorderColor', {
        get: function () {
            return model.groupBorderColor;
        },
        set: function (val) {
            model.groupBorderColor = val;
        }
    });
    Object.defineProperty(preset, 'groupOpacity', {
        get: function () {
            return model.groupOpacity;
        },
        set: function (val) {
            model.groupOpacity = val;
        }
    });

    Object.defineProperty(preset, 'mediaBackgroundColor', {
        get: function () {
            return model.mediaBackgroundColor;
        },
        set: function (val) {
            model.mediaBackgroundColor = val;
        }
    });
    Object.defineProperty(preset, 'mediaBorderColor', {
        get: function () {
            return model.mediaBorderColor;
        },
        set: function (val) {
            model.mediaBorderColor = val;
        }
    });
    Object.defineProperty(preset, 'mediaOpacity', {
        get: function () {
            return model.mediaOpacity;
        },
        set: function (val) {
            model.mediaOpacity = val;
        }
    });

    Object.defineProperty(preset, 'numberOfOptions', {
        get: function () {
            return model.options.length;
        }
    });
    Object.defineProperty(preset, 'backgroundImage', {
        get: function () {
            return model.backgroundImage;
        },
        set: function (val) {
            model.backgroundImage = val;
        }
    });
    Object.defineProperty(preset, 'backgroundColor', {
        get: function () {
            return model.backgroundColor;
        },
        set: function (val) {
            model.backgroundColor = val;
        }
    });
    Object.defineProperty(preset, 'borderColor', {
        get: function () {
          return model.borderColor;
        },
        set: function (val) {
          model.borderColor = val;
        }
    });
    Object.defineProperty(preset, 'MdistractorBackgroundColor', {
        get: function () {
          return model.MdistractorBackgroundColor;
        },
        set: function (val) {
          model.MdistractorBackgroundColor = val;
        }
    });
    Object.defineProperty(preset, 'MdistractorArrowColor', {
        get: function () {
          return model.MdistractorArrowColor;
        },
        set: function (val) {
          model.MdistractorArrowColor = val;
        }
    });
    Object.defineProperty(preset, 'perishableStorage', {
        get: function () {
            return model.perishableStorage == undefined ? true : model.perishableStorage;
        },
        set: function (val) {
            model.perishableStorage = val;
        }
    });

    Object.defineProperty(preset, 'freeGroupMode', {
        get: function () {
            return model.freeGroupMode == undefined ? true : model.freeGroupMode;
        },
        set: function (val) {
            model.freeGroupMode = val;
        }
    });

    Object.defineProperty(preset, 'fontSize', {
        get: function () {
            return model.font.size;
        },
        set: function (val) {
            model.font.size = val;
        }
    });
    Object.defineProperty(preset, 'fontSizePx', {
        get: function () {
            return model.font.sizePx;
        },
        set: function (val) {
            model.font.sizePx = val;
        }
    });
    Object.defineProperty(preset, 'fontName', {
        get: function () {
            return model.font.name;
        },
        set: function (val) {
            model.font.name = val;
        }
    });
    Object.defineProperty(preset, 'fontFamily', {
        get: function () {
            return model.font.family;
        },
        set: function (val) {
            model.font.family = val;
        }
    });
    Object.defineProperty(preset, 'feedbackErrorsRemoval', {
        get: function () {
            return model.feedback.errorsRemoval;
        },
        set: function (val) {
            model.feedback.errorsRemoval = val;
        }
    });
    Object.defineProperty(preset, 'feedbackSuccessText', {
        get: function () {
            return model.feedback.successText;
        },
        set: function (val) {
            model.feedback.successText = val;
        }
    });
    Object.defineProperty(preset, 'feedbackFailureText', {
        get: function () {
            return model.feedback.failureText;
        },
        set: function (val) {
            model.feedback.failureText = val;
        }
    });

    Object.defineProperty(preset, 'baskets', {
        get: function () {
            return model.baskets;
        }
    });

    Object.defineProperty(preset, 'groups', {
        get: function () {
            return model.groups;
        }
    });

    Object.defineProperty(preset, 'medias', {
        get: function () {
            return model.medias;
        }
    });

    Object.defineProperty(preset, 'links', {
        get: function () {
            return model.links;
        },
        set: function (val) {
            model.links = val;
        }
    });
})(preset || (preset = {}));
