///<reference path='../../../../lib/external/jquery.d.ts'/>
///<reference path='group.ts'/>
(function () {

  var Links = (function () {
    return {
      getLinkedBasketsByOptionId: function (optionId) {
        var links = cet.dragndrop.Content.getLinks();
        if (!links || links.length == 0)
          return null;
        for (var i = 0; i < links.length; i++) {
          if (links[i].optionId == optionId)
            return links[i].baskets;
        }
      }
    }
  })();

  cet.dragndrop.Links = Links;

})();
