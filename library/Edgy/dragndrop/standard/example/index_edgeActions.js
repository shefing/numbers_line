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
   (function(symbolName) {   
    cet = window.cet; cet = cet || {}; cet.content = cet.content || {}; cet.content.manualClientLoadedTrigger = true;
    yepnope(
   {
    load: [

     'lib/edgy.css',
     '//cdn.cet.ac.il/libs/cet.content/1/client.min.js',
     '//cdn.cet.ac.il/libs/cet.content.lms/1/client.min.js',
     'lib/edgy.dragndrop.js',

    ],
   });

   })("stage");
   //Edge symbol end:'stage'

})(window.jQuery || AdobeEdge.$, AdobeEdge, "EDGE-24236269");