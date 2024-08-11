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
      
      			'lib/edgy.css',
      	'http://cdn.' + cetEnv + '/libs/cet.content/1/client.min.js',
      	'http://cdn.' + cetEnv + '/libs/cet.content.lms/1/client.min.js',
      	'lib/edgy.trivia.js'
      
      
      
      
      	],
      	//complete: init
      });
      
      
      

   })("stage");
   //Edge symbol end:'stage'

   //=========================================================
   
   //Edge symbol: 'BG'
   (function(symbolName) {   
   
   })("BG");
   //Edge symbol end:'BG'

   //=========================================================
   
   //Edge symbol: 'question'
   (function(symbolName) {   
   
   })("question");
   //Edge symbol end:'question'

   //=========================================================
   
   //Edge symbol: 'score'
   (function(symbolName) {   
   
   })("score");
   //Edge symbol end:'score'

   //=========================================================
   
   //Edge symbol: 'progressCurrent'
   (function(symbolName) {   
   
   })("progressCurrent");
   //Edge symbol end:'progressCurrent'

   //=========================================================
   
   //Edge symbol: 'error'
   (function(symbolName) {   
   
   })("error");
   //Edge symbol end:'error'

   //=========================================================
   
   //Edge symbol: 'right'
   (function(symbolName) {   
   
   })("right");
   //Edge symbol end:'right'

   //=========================================================
   
   //Edge symbol: 'timerArrow'
   (function(symbolName) {   
   
   })("timerArrow");
   //Edge symbol end:'timerArrow'

   //=========================================================
   
   //Edge symbol: 'hint50'
   (function(symbolName) {   
   
   })("hint50");
   //Edge symbol end:'hint50'

   //=========================================================
   
   //Edge symbol: 'hint50_1'
   (function(symbolName) {   
   
   })("hintReplace");
   //Edge symbol end:'hintReplace'

   //=========================================================
   
   //Edge symbol: 'hintReplace_1'
   (function(symbolName) {   
   
   })("hintTime");
   //Edge symbol end:'hintTime'

   //=========================================================
   
   //Edge symbol: 'btnBgPlaceholder'
   (function(symbolName) {   
   
   })("btnBgPlaceholder");
   //Edge symbol end:'btnBgPlaceholder'

   //=========================================================
   
   //Edge symbol: 'hintTime_1'
   (function(symbolName) {   
   
   })("btnRestart");
   //Edge symbol end:'btnRestart'

   //=========================================================
   
   //Edge symbol: 'btnRestart_1'
   (function(symbolName) {   
   
   })("btnMuteOn");
   //Edge symbol end:'btnMuteOn'

   //=========================================================
   
   //Edge symbol: 'btnMuteOn_1'
   (function(symbolName) {   
   
   })("btnMuteOff");
   //Edge symbol end:'btnMuteOff'

   //=========================================================
   
   //Edge symbol: 'mute'
   (function(symbolName) {   
   
   })("mute");
   //Edge symbol end:'mute'

   //=========================================================
   
   //Edge symbol: 'optionBtn'
   (function(symbolName) {   
   
   })("optionBtn");
   //Edge symbol end:'optionBtn'

   //=========================================================
   
   //Edge symbol: 'options'
   (function(symbolName) {   
   
   })("option");
   //Edge symbol end:'option'

   //=========================================================
   
   //Edge symbol: 'optionBtn_1'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 0, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 3000, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

   })("optionError");
   //Edge symbol end:'optionError'

   //=========================================================
   
   //Edge symbol: 'optionError_1'
   (function(symbolName) {   
   
   })("optionRight");
   //Edge symbol end:'optionRight'

   //=========================================================
   
   //Edge symbol: 'opening'
   (function(symbolName) {   
   
   })("opening");
   //Edge symbol end:'opening'

   //=========================================================
   
   //Edge symbol: 'hintReplace_1'
   (function(symbolName) {   
   
      })("btnStart");
   //Edge symbol end:'btnStart'

   //=========================================================
   
   //Edge symbol: 'feedback'
   (function(symbolName) {   
   
   })("feedback");
   //Edge symbol end:'feedback'

   //=========================================================
   
   //Edge symbol: 'feedback_elements'
   (function(symbolName) {   
   
   })("feedback_elements");
   //Edge symbol end:'feedback_elements'

   //=========================================================
   
   //Edge symbol: 'bgOpening'
   (function(symbolName) {   
   
   })("bgOpening");
   //Edge symbol end:'bgOpening'

   //=========================================================
   
   //Edge symbol: 'timerAnimRight'
   (function(symbolName) {   
   
   })("timerColorRight");
   //Edge symbol end:'timerColorRight'

   //=========================================================
   
   //Edge symbol: 'timerAnimRight'
   (function(symbolName) {   
   
   })("timerAnimRight");
   //Edge symbol end:'timerAnimRight'

   //=========================================================
   
   //Edge symbol: 'timerColorRight2'
   (function(symbolName) {   
   
   })("timerColorRight2");
   //Edge symbol end:'timerColorRight2'

   //=========================================================
   
   //Edge symbol: 'timerAnimRight_1'
   (function(symbolName) {   
   
   })("timerAnimLeft");
   //Edge symbol end:'timerAnimLeft'

   //=========================================================
   
   //Edge symbol: 'timerColorRight2_1'
   (function(symbolName) {   
   
   })("timerColorLeft2");
   //Edge symbol end:'timerColorLeft2'

   //=========================================================
   
   //Edge symbol: 'timerColorRight_1'
   (function(symbolName) {   
   
   })("timerColorLeft");
   //Edge symbol end:'timerColorLeft'

   //=========================================================
   
   //Edge symbol: 'round_left_sivuv'
   (function(symbolName) {   
   
   })("round_left_sivuv");
   //Edge symbol end:'round_left_sivuv'

   //=========================================================
   
   //Edge symbol: 'round_left'
   (function(symbolName) {   
   
   })("round_left");
   //Edge symbol end:'round_left'

   //=========================================================
   
   //Edge symbol: 'timer'
   (function(symbolName) {   
   
   })("timer");
   //Edge symbol end:'timer'

   //=========================================================
   
   //Edge symbol: 'half_round_left'
   (function(symbolName) {   
   
   })("half_round_left");
   //Edge symbol end:'half_round_left'

   //=========================================================
   
   //Edge symbol: 'round'
   (function(symbolName) {   
   
   })("round");
   //Edge symbol end:'round'

   //=========================================================
   
   //Edge symbol: 'half_round_right'
   (function(symbolName) {   
   
   })("half_round_right");
   //Edge symbol end:'half_round_right'

   //=========================================================
   
   //Edge symbol: 'half_round'
   (function(symbolName) {   
   
   })("half_round");
   //Edge symbol end:'half_round'

   //=========================================================
   
   //Edge symbol: 'progressBg'
   (function(symbolName) {   
   
   })("progressBg");
   //Edge symbol end:'progressBg'

   //=========================================================
   
   //Edge symbol: 'restartIconAnim'
   (function(symbolName) {   
   
   })("restartIconAnim");
   //Edge symbol end:'restartIconAnim'

   //=========================================================
   
   //Edge symbol: 'replaceAnim'
   (function(symbolName) {   
   
   })("replaceAnim");
   //Edge symbol end:'replaceAnim'

   //=========================================================
   
   //Edge symbol: 'progresNumbers'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 750, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1750, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 2750, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 3750, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 4750, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 5750, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 6750, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 7750, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 8750, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 9750, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

   })("progresNumbers");
   //Edge symbol end:'progresNumbers'

   //=========================================================
   
   //Edge symbol: 'icon50Anim'
   (function(symbolName) {   
   
   })("icon50Anim");
   //Edge symbol end:'icon50Anim'

   //=========================================================
   
   //Edge symbol: 'timeIconAnim'
   (function(symbolName) {   
   
   })("timeIconAnim");
   //Edge symbol end:'timeIconAnim'

   //=========================================================
   
   //Edge symbol: 'muteIconOnAnim'
   (function(symbolName) {   
   
   })("muteIconOnAnim");
   //Edge symbol end:'muteIconOnAnim'

   //=========================================================
   
   //Edge symbol: 'muteIconOnAnim_1'
   (function(symbolName) {   
   
   })("muteIconOffAnim");
   //Edge symbol end:'muteIconOffAnim'

   //=========================================================
   
   //Edge symbol: 'startIconAnim'
   (function(symbolName) {   
   
   })("startIconAnim");
   //Edge symbol end:'startIconAnim'

   //=========================================================
   
   //Edge symbol: 'timerPimp'
   (function(symbolName) {   
   
   })("timerPimp");
   //Edge symbol end:'timerPimp'

   //=========================================================
   
   //Edge symbol: 'opening_1'
   (function(symbolName) {   
   
      })("opening_teacher");
   //Edge symbol end:'opening_teacher'

   //=========================================================
   
   //Edge symbol: 'feedback_1'
   (function(symbolName) {   
   
      })("feedback_AR");
   //Edge symbol end:'feedback_AR'

   //=========================================================
   
   //Edge symbol: 'opening_teacher_1'
   (function(symbolName) {   
   
         })("opening_teacher_AR");
   //Edge symbol end:'opening_teacher_AR'

   //=========================================================
   
   //Edge symbol: 'progressAnim'
   (function(symbolName) {   
   
   })("progressAnim");
   //Edge symbol end:'progressAnim'

   //=========================================================
   
   //Edge symbol: 'progres'
   (function(symbolName) {   
   
   })("progres");
   //Edge symbol end:'progres'

   //=========================================================
   
   //Edge symbol: 'pastQ'
   (function(symbolName) {   
   
   })("pastQ");
   //Edge symbol end:'pastQ'

})(window.jQuery || AdobeEdge.$, AdobeEdge, "EDGE-27141647");