(function () {

 //#region meta declarations
 var Stage;
 var Buttons;
 var App;
 var Baskets;
 var Lifes;
 //#endregion

 var Lms = (function () {

  var isBrowseMode;
  return {
   
   getScore: function () {

    var total = cet.Content.getNumberOfOptions();
    var corrects = cet.Baskets.getNumberOfCorrectOptions();
    return parseInt(100 * (corrects / total));

   },
   isBrowseMode: function (val) {
    if (typeof val != 'undefined')
     isBrowseMode = val;
    if (typeof isBrowseMode != 'undefined')
      return isBrowseMode;

    // AZ - 26/11/18 if mode=null - also isBrowseMode (aka Training)
    return !cet.content.lms.Settings.supported || (cet.content.lms.Activity.engagement.mode == 'browse') || (cet.content.lms.Activity.engagement.mode == null);
   },
   setExternalButtonsVisibility: function () {
    cet.content.lms.Activity.settings.supportsCheck(false);
    cet.content.lms.Activity.settings.supportsRegenerate(false);
    cet.content.lms.Activity.settings.supportsReset(false);
    cet.content.lms.Activity.settings.supportsShowSolution(false);
    cet.content.lms.Activity.settings.supportsHostFullscreen(true);
   }

  };
 })();

 $.extend(cet.Lms, Lms);

})();
