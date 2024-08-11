///<reference path='stage.ts' />
var groupdata = (function () {
    function groupdata(top, left, height, width, realTimeCreation, text, image, id, baskets, color) {
        if (typeof height === "undefined") { height = 240; }
        if (typeof width === "undefined") { width = 290; }
        if (typeof realTimeCreation === "undefined") { realTimeCreation = true; }
        if (typeof text === "undefined") { text = ''; }
        if (typeof image === "undefined") { image = ''; }
        if (typeof id === "undefined") { id = null; }
        if (typeof baskets === "undefined") { baskets = null; }
        if (typeof color === "undefined") { color = null; }
        this.top = top;
        this.left = left;
        this.height = height;
        this.width = width;
        this.realTimeCreation = realTimeCreation;
        this.text = text;
        this.image = image;
        this.id = id;
        this.baskets = baskets;
        this.color = color;
    }
    groupdata.prototype.toPixels = function () {
        this.height = cet.Units.Utils.percentageToPixel(this.height, Stage.height);
        this.width = cet.Units.Utils.percentageToPixel(this.width, Stage.width);

        this.top = cet.Units.Utils.percentageToPixel(this.top, Stage.height);
        this.left = cet.Units.Utils.percentageToPixel(this.left, Stage.width);
    };
    return groupdata;
})();
