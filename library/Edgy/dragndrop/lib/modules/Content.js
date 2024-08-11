window.cet = window.cet || {};
(function () {

 var Content = (function () {

  var options = [];
  
  function allBasketsMatched() {
   return options.length > cet.Baskets.count();
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
     while (options.length < this.getContentJson().random.numberOfOptions) {
      var randomIndex = this.getRandomNumber(this.getContentJson().options.length)
      var candidate = tmpOptions[randomIndex];
       if(!candidate)
       continue;
     
      if (hasUnmatchedBasket(candidate, options) || allBasketsMatched()) {
       options.push(candidate);
       tmpOptions[randomIndex] = null;
      }
     }
    }
    else {
     options = this.getContentJson().options.slice(0);
    }
     

   },
   loadSpecificOptions: function (specificOptions) {
    options = [];
    var allOptions = this.getContentJson().options.slice(0);
    for (var specificOptionKey in specificOptions) {
      var specificOption = specificOptions[specificOptionKey];
      var specificOptionId = cet.Utils.supportOldIds(specificOption.option)
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
   getSolution: function () {
    var baskets = [];
    var basketFound = false;

    for (var i = 0; i < options.length; i++) {
     var option = options[i];
     basketFound = false;
     for (var j = 0; j < option.baskets.length && !basketFound; j++) {

      if (!isBasketTaken(baskets, option.baskets[j])) {

       baskets.push({ option: option.id, basket: option.baskets[j] });
       basketFound = true;
      }
     }
    }
    return baskets;
    function isBasketTaken(baskets, basket) {
     for (var i = 0; i < baskets.length; i++) {
      if (baskets[i].basket == basket)
       return true;
     }
     return false;
    }
   },
   getFadeOnDrag: function () {
     if( typeof this.getContentJson().fadeOnDrag === "boolean")
       return this.getContentJson().fadeOnDrag;
     return true;
   }
  };
 })();

 $.extend(cet.Content, Content);

})();
