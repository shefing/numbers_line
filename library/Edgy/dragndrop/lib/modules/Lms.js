(function () {

 //#region meta declarations
 var Stage;
 var Buttons;
 var App;
 var Baskets;
 //#endregion

 var Lms = (function () {

  return {
   getScore: function () {
    
    var errors = 0;
    var total = 0;

    for (basketKey in cet.Baskets.baskets) {
     var basket = cet.Baskets.baskets[basketKey];
     total++;

     if (!basket.isPopulated()) {
      errors++;
     }
     else if (!basket.isValid()) {
      errors++;
     }
    }

    var corrects = total - errors;
    return parseInt(100 * (corrects / total));
   },
   setExternalButtonsVisibility: function () {
     cet.content.lms.Activity.settings.supportsCheck(true);
     cet.content.lms.Activity.settings.supportsRegenerate(false);
     cet.content.lms.Activity.settings.supportsReset(true);
     cet.content.lms.Activity.settings.supportsShowSolution(true);
     cet.content.lms.Activity.settings.supportsHostFullscreen(true);
   }

  };
 })();

 $.extend(cet.Lms, Lms);

})();
