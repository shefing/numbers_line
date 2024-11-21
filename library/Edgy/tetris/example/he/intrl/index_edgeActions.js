/***********************
* Adobe Edge Animate Composition Actions
*
* Edit this file with caution, being careful to preserve 
* function signatures and comments starting with 'Edge' to maintain the 
* ability to interact with these actions from within Adobe Edge Animate
*
***********************/
(function($, Edge, compId){
var Composition = Edge.Composition, Symbol = Edge.Symbol; // aliases for commonly used Edge classes

   //Edge symbol: 'stage'
  (function (symbolName) {

     var cetEnv = "cet.ac.il";
     if (/dev\.cet\.ac\.il/.test(window.location.hostname)) cetEnv = 'dev.' + cetEnv;
     if (/testing\.cet\.ac\.il/.test(window.location.hostname)) cetEnv = 'testing.' + cetEnv;

      cet = window.cet; cet = cet || {}; cet.content = cet.content || {}; cet.content.manualClientLoadedTrigger = true;
      yepnope(
      {
      load: [
       'lib/edgy.css?sdsd11111111111111',
       '//cdn.' + cetEnv + '/libs/cet.content/1/client.min.js',
       '//cdn.' + cetEnv + '/libs/cet.content.lms/1/client.min.js',
       '../../dist/he/edgy.tetris.js?cacheElliminator'
      ],
      });
      

   })("stage");
   //Edge symbol end:'stage'

   //=========================================================
   
   //Edge symbol: 'BG'
   (function(symbolName) {   
   
   })("BG");
   //Edge symbol end:'BG'

   //=========================================================
   
   //Edge symbol: 'mute'
   (function(symbolName) {   
   
   })("mute");
   //Edge symbol end:'mute'

   //=========================================================
   
   //Edge symbol: 'muteIconOffAnim'
   (function(symbolName) {   
   
   })("muteIconOffAnim");
   //Edge symbol end:'muteIconOffAnim'

   //=========================================================
   
   //Edge symbol: 'btnMuteOn'
   (function(symbolName) {   
   
   })("btnMuteOn");
   //Edge symbol end:'btnMuteOn'

   //=========================================================
   
   //Edge symbol: 'btnMuteOff'
   (function(symbolName) {   
   
   })("btnMuteOff");
   //Edge symbol end:'btnMuteOff'

   //=========================================================
   
   //Edge symbol: 'muteIconOnAnim'
   (function(symbolName) {   
   
   })("muteIconOnAnim");
   //Edge symbol end:'muteIconOnAnim'

   //=========================================================
   
   //Edge symbol: 'restartIconAnim'
   (function(symbolName) {   
   
   })("restartIconAnim");
   //Edge symbol end:'restartIconAnim'

   //=========================================================
   
   //Edge symbol: 'btnRestart'
   (function(symbolName) {   
   
   })("btnRestart");
   //Edge symbol end:'btnRestart'

   //=========================================================
   
   //Edge symbol: 'btnRestart_1'
   (function(symbolName) {   
   
      })("btnLeft");
   //Edge symbol end:'btnLeft'

   //=========================================================
   
   //Edge symbol: 'btnLeft_1'
   (function(symbolName) {   
   
      })("btnDown");
   //Edge symbol end:'btnDown'

   //=========================================================
   
   //Edge symbol: 'btnDown_1'
   (function(symbolName) {   
   
      })("btnRight");
   //Edge symbol end:'btnRight'

   //=========================================================
   
   //Edge symbol: 'life'
   (function(symbolName) {   
   
   })("life");
   //Edge symbol end:'life'

   //=========================================================
   
   //Edge symbol: 'lifeDead'
   (function(symbolName) {   
   
   })("lifeDead");
   //Edge symbol end:'lifeDead'

   //=========================================================
   
   //Edge symbol: 'lifeAlive'
   (function(symbolName) {   
   
   })("lifeAlive");
   //Edge symbol end:'lifeAlive'

   //=========================================================
   
   //Edge symbol: 'lifeContainer'
   (function(symbolName) {   
   
   })("lifeContainer");
   //Edge symbol end:'lifeContainer'

   //=========================================================
   
   //Edge symbol: 'opening'
   (function(symbolName) {   
   
   })("opening");
   //Edge symbol end:'opening'

   //=========================================================
   
   //Edge symbol: 'btnStart'
   (function(symbolName) {   
   
   })("btnStart");
   //Edge symbol end:'btnStart'

   //=========================================================
   
   //Edge symbol: 'startIconAnim'
   (function(symbolName) {   
   
   })("startIconAnim");
   //Edge symbol end:'startIconAnim'

   //=========================================================
   
   //Edge symbol: 'close'
   (function(symbolName) {   
   
   })("close");
   //Edge symbol end:'close'

   //=========================================================
   
   //Edge symbol: 'feedbackWrong_1'
   (function(symbolName) {   
   
   })("feedbackGood");
   //Edge symbol end:'feedbackGood'

   //=========================================================
   
   //Edge symbol: 'basket'
   (function(symbolName) {   
   
   })("basket");
   //Edge symbol end:'basket'

   //=========================================================
   
   //Edge symbol: 'option'
   (function(symbolName) {   
   
   })("option");
   //Edge symbol end:'option'

   //=========================================================
   
   //Edge symbol: 'final-feedback'
   (function(symbolName) {   
   
   })("final-feedback");
   //Edge symbol end:'final-feedback'

   //=========================================================
   
   //Edge symbol: 'popup_feedback'
   (function(symbolName) {   
   
   })("popup_feedback");
   //Edge symbol end:'popup_feedback'

   //=========================================================
   
   //Edge symbol: 'feedbackGood_1'
   (function(symbolName) {   
   
      Symbol.bindElementAction(compId, symbolName, "${_btnFeedbackRestart}", "click", function(sym, e) {
         

      });
      //Edge binding end

      })("feedbackWrong");
   //Edge symbol end:'feedbackWrong'

   //=========================================================
   
   //Edge symbol: 'btnStart_1'
   (function(symbolName) {   
   
      })("btnFeedbackRestart");
   //Edge symbol end:'btnFeedbackRestart'

   //=========================================================
   
   //Edge symbol: 'arrowLeftAnim'
   (function(symbolName) {   
   
   })("arrowLeftAnim");
   //Edge symbol end:'arrowLeftAnim'

   //=========================================================
   
   //Edge symbol: 'arrowRightAnim'
   (function(symbolName) {   
   
   })("arrowRightAnim");
   //Edge symbol end:'arrowRightAnim'

   //=========================================================
   
   //Edge symbol: 'arrowDownAnim'
   (function(symbolName) {   
   
   })("arrowDownAnim");
   //Edge symbol end:'arrowDownAnim'

})(jQuery, AdobeEdge, "EDGE-5434671");