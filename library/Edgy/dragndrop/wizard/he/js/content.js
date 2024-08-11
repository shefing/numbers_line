window.cet = window.cet || {}; window.cet.dragndrop = window.cet.dragndrop || {};
(function () {

  var Content = (function () {

    var contentJson = null;
    var basePath = '';
    var options = [];
    var baskets = [];




    function load(data) {

      if (typeof data == 'object') {
        loadFromObject(data);
        return;
      }


      // check if data is a json string
      if (data.charAt(0) == '{') {
        loadFromPreset(data);
        return;
      }


      //check if data is URI encoded string
      if (data.substr(0, 3) == '%7B') {
        data = decodeURIComponent(data);
        loadFromPreset(data);
      }
      else {
        loadFromUrl(data);
      }

    };
    function loadFromUrl(url) {
      $.getJSON(url, function (data) {
        contentJson = data;
        Content.shuffle();
        Stage.trigger('contentReady');
      }).fail(function () { alert('error');  });
    };
    function fixContentApiErrors(string) {
      return string.replace(/&quot;/g, '"').replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/\r?\n|\r/g, '').replace(/&nbsp;/g, ' ');
    }
    function loadFromPreset(string) {

      //string = fixContentApiErrors(string)

      // convert Json string to real object
      contentJson = JSON.parse(string);
      Content.shuffle();
      Stage.trigger('contentReady');
    };
    function loadFromObject(obj) {
      contentJson = obj;
      Content.shuffle();
      Stage.trigger('contentReady');
    };
    function allBasketsMatched() {
      return options.length > cet.dragndrop.Baskets.count();
    }
    function hasUnmatchedBasket(option) {
      var usedBaskets = {};

      for (var usedOptionKey in options) {
        var usedOption = options[usedOptionKey];
        var basketFound = false;
        for (var i = 0; i < usedOption.baskets.length && !basketFound; i++) {
          var usedBasket = usedOption.baskets[i];
          if (!usedBaskets[usedBasket]) {
            usedBaskets[usedBasket] = true;
            basketFound = true;
          }
        }
      }

      for (var optionalBasketKey in option.baskets) {
        var optionalBasket = option.baskets[optionalBasketKey];
        if (!usedBaskets[optionalBasket])
          return true;
      }
      return false;


    }
    return {

      load: function (data) {
        load(data);
      },
      init: function () {
        //#region meta declarations
        Audio = cet.dragndrop.Audio;
        option = cet.dragndrop.option;
        Baskets = cet.dragndrop.Baskets;

        Stage = cet.dragndrop.Stage;
        Storage = cet.dragndrop.Storage;
        Buttons = cet.dragndrop.Buttons;
        Feedback = cet.dragndrop.Feedback;
        DragSync = cet.dragndrop.DragSync;
        //#endregion
        if (self == top) {
          var contentFromUrl = Content.getContentFromUrl();
          if (!contentFromUrl) {
            contentFromUrl = 'content1.js';
          }
          Content.load(contentFromUrl);
          return;
        }
        cet.content.on('clientready', function () {
          var file = cet.content.Settings.preset || 'content1.js'
          Content.load(file);
        });
      },
      isReady: function () {
        return contentJson != null;
      },
      getContentFromUrl: function () {
        var params = document.location.search.replace('?', '').split('&');
        for (var i in params) {
          if (params[i].toLowerCase().indexOf('content') != -1)
            return params[i].split('=')[1];
        }
        return null;
      },
      getContentJson: function () {
        return contentJson;
      },
      getRandomNumber: function (upperBound) {
        return Math.floor((Math.random() * upperBound));
      },
      getShowFinalFeedback: function () {
        if (!contentJson.feedback)
          return true;
        return contentJson.feedback.showFinalFeedback;
      },
      getFeedbackErrorRemoval: function () {
        return contentJson.feedback && contentJson.feedback.errorsRemoval;

      },
      getLifes: function () {
        return contentJson.lifes ? contentJson.lifes : 5;
      },
      getWelcomeSound: function () {
        return this.getContentJson().welcomeSound;
      },
      getInstructionsSound: function () {
        return this.getContentJson().instructionsSound;
      },
      getFontSize: function () {
        if (this.getContentJson().font)
          return this.getContentJson().font.size;
        return null;
      },
      getFontFamily: function () {
        var fontFamily = null;
        if (this.getContentJson().font)
          fontFamily = this.getContentJson().font.family;
        if (fontFamily && fontFamily.length > 2)
          fontFamily = fontFamily.substr(0, 2);
        return fontFamily;
      },
      getBorderColor: function () {
        if (this.getContentJson().borderColor)
          return this.getContentJson().borderColor;
        return null;
      },
      getBackgroundColor: function () {
        if (this.getContentJson().backgroundColor)
          return this.getContentJson().backgroundColor;
        return null;
      },
      getStorageBackgroundColor: function () {
        if (this.getContentJson().MdistractorBackgroundColor)
          return this.getContentJson().MdistractorBackgroundColor;
        return null;
      },
      getStorageStorageArrowColor: function () {
        if (this.getContentJson().MdistractorArrowColor)
          return this.getContentJson().MdistractorArrowColor;
        return null;
      },
      getOptionByIndex: function (optionIndex) {
        return options[optionIndex];
      },
      getQuestionTitle: function (optionIndex) {
        return options[optionIndex].title;
      },
      getNumberOfOptions: function () {
        return options.length;
      },
      loadSpecificOptions: function (specificOptions) {
        options = [];
        var allOptions = this.getContentJson().options.slice(0);
        for (var specificOptionKey in specificOptions) {
          var specificOption = specificOptions[specificOptionKey];
          var specificOptionId = cet.dragndrop.Utils.supportOldIds(specificOption.option)
          for (var j = 0; j < allOptions.length; j++) {
            var generalOption = allOptions[j]
            if (specificOptionId == generalOption.id)
              options.push(generalOption);
          }
        }
      },
      getOptions: function () {
        return options;
      },
      setOptions: function (val) {
        options = val;
      },
      getFadeOnDrag: function () {
        if (typeof this.getContentJson().fadeOnDrag === "boolean")
          return this.getContentJson().fadeOnDrag;
        return true;
      },

      shuffle: function () {
        var self = this;
        var options = self.getContentJson().options.slice(0);
        for (var j, x, i = options.length; i; j = Math.floor(Math.random() * i), x = options[--i], options[i] = options[j], options[j] = x);
        self.setOptions(options);
        baskets = self.getContentJson().baskets.slice(0);
      },
      getBaskets: function () {
        return baskets;
      },
      getGroups: function () {
        return this.getContentJson().groups || [];
      },
      getMedias: function () {
        return this.getContentJson().medias || [];
      },
      getBackgroundImage: function () {
        if (this.getContentJson().backgroundImage == 'none')
          return null;
        return this.getContentJson().backgroundImage;
      },
      getFontSize: function () {
        if (this.getContentJson().font)
          return this.getContentJson().font.size;
        return null;
      },
      getFontSizePx: function () {
        if (this.getContentJson().font && this.getContentJson().font.sizePx)
          return this.getContentJson().font.sizePx;
        return null;
      },
      getFontName: function () {
        if (this.getContentJson().font && this.getContentJson().font.name)
          return this.getContentJson().font.name;
        return "Alef";
      },
      getFinalFeedbackSuccessText: function () {
        return cet.dragndrop.Localization.data.successText;
      },
      getFinalFeedbackFailureText: function () {
        return cet.dragndrop.Localization.data.failureText;
      },
      isNonePerishableStorage: function () {
        return this.getContentJson().perishableStorage == undefined ? false : !this.getContentJson().perishableStorage;
      },
      isFreeGroupMode: function () {
        return this.getContentJson().freeGroupMode == undefined ? false : this.getContentJson().freeGroupMode;
      },
      getGroupByIndex: function (index) {
        return this.getContentJson().groups[index];
      },
      getLinks: function () {
        return this.getContentJson().links;
      },
      getSolution: function () {
        var baskets = [];
        var basketFound = false;
        var options = this.getOptions();

        for (var i = 0; i < options.length; i++) {
          var option = options[i];

          var optionLinkedBaskets = cet.dragndrop.Links.getLinkedBasketsByOptionId(option.id)
          if (!optionLinkedBaskets) {
            baskets.push({ option: option.id, basket: option.baskets[0] });
            continue;
          }
          for (var j = 0; j < optionLinkedBaskets.length; j++) {
            baskets.push({ option: option.id, basket: optionLinkedBaskets[j] });
          }
        }
        return {
          options: baskets
        };

      }

    };
  })();


  cet.dragndrop.Content = Content;

})();
