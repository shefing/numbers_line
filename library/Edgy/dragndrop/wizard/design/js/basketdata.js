///<reference path='ui.ts'/>
///<reference path='../../../../lib/modules/draggable.ts'/>
///<reference path='../../../../lib/modules/units.ts'/>
///<reference path='../../../../lib/external/jquery.d.ts'/>
var basketdata = (function () {
  function basketdata(top, left, height, width, realTimeCreation, text, image, id, color, hiddenOnRuntime) {
        if (typeof height === "undefined") { height = 94; }
        if (typeof width === "undefined") { width = 118; }
        if (typeof realTimeCreation === "undefined") { realTimeCreation = true; }
        if (typeof text === "undefined") { text = ''; }
        if (typeof image === "undefined") { image = ''; }
        if (typeof id === "undefined") { id = null; }
        if (typeof color === "undefined") { color = null; }
        this.top = top;
        this.left = left;
        this.height = height;
        this.width = width;
        this.realTimeCreation = realTimeCreation;
        this.text = text;
        this.image = image;
        this.id = id;
        this.color = color;
        this.hiddenOnRuntime = hiddenOnRuntime
    }
    basketdata.prototype.toPixels = function () {
        this.height = cet.Units.Utils.percentageToPixel(this.height, Stage.height);
        this.width = cet.Units.Utils.percentageToPixel(this.width, Stage.width);

        this.top = cet.Units.Utils.percentageToPixel(this.top, Stage.height);
        this.left = cet.Units.Utils.percentageToPixel(this.left, Stage.width);
    };
    return basketdata;
})();
