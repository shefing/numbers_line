window.cet = window.cet || {};
(function () {

  var Content = (function () {

    var options = [];
    var basketIds;

    function allBasketsMatched() {
      var numberOfOptions = cet.Content.getContentJson().random.optionsInBasket * cet.Content.getContentJson().random.numberOfBaskets
      return options.length > numberOfOptions;
    }
    function hasUnmatchedBasket(option) {
      var usedBaskets = {}
      var usedBasketsCount = 0;
      for (var usedOptionKey in options) {
        var usedOption = options[usedOptionKey];
        if (!usedBaskets[usedOption.baskets[0]]) {

          usedBaskets[usedOption.baskets[0]] = 0;
          usedBasketsCount++;
        }
        usedBaskets[usedOption.baskets[0]]++;
      }
      if (usedBasketsCount == cet.Content.getContentJson().random.numberOfBaskets && !usedBaskets[option.baskets[0]])
        return false;

      if (!usedBaskets[option.baskets[0]] || (usedBaskets[option.baskets[0]] < cet.Content.getContentJson().random.optionsInBasket))
        return true;
      return false;

    }
    return {

      getOptionByIndex: function (optionIndex) {
        return options[optionIndex];
      },
      getQuestionTitle: function (optionIndex) {
        return options[optionIndex].title;
      },
      getNumberOfOptions: function () {
        return options.length;
      },

      shuffle: function () {

        if (this.getContentJson().random.options) {
          options = [];
          var tmpOptions = this.getContentJson().options.slice(0);
          var numberOfOptions = this.getContentJson().random.optionsInBasket * this.getContentJson().random.numberOfBaskets
          while (options.length < numberOfOptions) {
            var randomIndex = this.getRandomNumber(this.getContentJson().options.length)
            var candidate = tmpOptions[randomIndex];
            if (!candidate)
              continue;
            if (hasUnmatchedBasket(candidate, options)) {
              options.push(candidate);
              tmpOptions[randomIndex] = null;
            }
          }
        }
        else {
          options = this.getContentJson().options.slice(0);
        }

      },
      shuffleWithoutReload: function () {
        var numberOfOptions = options.length
        var tmpOptions = options;
        options = [];
        while (options.length < numberOfOptions) {
          var randomIndex = this.getRandomNumber(numberOfOptions)
          var candidate = tmpOptions[randomIndex];
          if (!candidate)
            continue;
          options.push(candidate);
          tmpOptions[randomIndex] = null;

        }



      },
      loadSpecificOptions: function (specificOptions) {
        options = [];
        var allOptions = this.getContentJson().options.slice(0);
        if (this.getNumberOfOptions() != specificOptions.length)
          throw 'Content trying to load illegal number of options';
        for (var specificOptionKey in specificOptions) {
          var specificOption = specificOptions[specificOptionKey];
          for (var j = 0; j < allOptions.length; j++) {
            var generalOption = allOptions[j]
            if (specificOption.option == generalOption.id)
              options.push(generalOption);
          }
        }
        basketIds = null;
      },


      getOptions: function () {
        return options;
      },
      getSolution: function () {
        var solution = [];
        var basketFound = false;

        for (var i = 0; i < options.length; i++) {
          var option = options[i];
          solution.push({
            "option": option.id,
            "basket": option.baskets[0]
          })
        }
        return solution;
      },
      getNumberOfOptionsInBasket: function () { return this.getContentJson().random.optionsInBasket; },
      getNumberOfBaskets: function () { return this.getContentJson().random.numberOfBaskets; },
      getBasketIds: function () {
        if (!basketIds) {
          basketIds = [];
          for (var i = 0; i < options.length; i++) {
            if (basketIds.indexOf(options[i].baskets[0]) == -1)
              basketIds.push(options[i].baskets[0])
          }
          basketIds.sort();
        }
        return basketIds;
      },
      getBasketName: function (id) {
        for (var i = 0; i < this.getContentJson().baskets.length; i++) {
          var basket = this.getContentJson().baskets[i];
          if (basket.id == id)
            return basket.name;
        }
      },
      getNumberOfOptions: function () {
        return this.getNumberOfOptionsInBasket() * this.getNumberOfBaskets();
      },
      getFontSize: function () {
        if (this.getContentJson().font)
          return this.getContentJson().font.size;
        return null;
      },
      getFinalFeedbackSuccessText: function () {
        return cet.Localization.data.successText;
      },
      getFinalFeedbackFailureText: function () {
        return cet.Localization.data.failureText;
      },
      getDroppingDuration: function () {
        return this.getContentJson().droppingOptions && this.getContentJson().droppingOptions.droppingDuration ? this.getContentJson().droppingOptions.droppingDuration : 10000;
      },
      isMultipleDroppingOptions: function () {
        return this.getContentJson().droppingOptions && this.getContentJson().droppingOptions.multipleDroppingOptions;
      },
      getConcurrentOptionsNumber: function () {
        return this.getContentJson().droppingOptions && this.getContentJson().droppingOptions.concurrentOptionsNumber ? this.getContentJson().droppingOptions.concurrentOptionsNumber : 3;
      },

    };
  })();

  $.extend(cet.Content, Content);

})();
