var cet;
(function (cet) {
    (function (Units) {
        var percentage = (function () {
            function percentage($element) {
                this;
                this._$element = $element;
            }
            Object.defineProperty(percentage.prototype, "width", {
                get: function () {
                    var sWidth = this._$element[0].style.width;
                    if (sWidth.indexOf('%') != -1)
                        return parseFloat(sWidth.replace('%', ''));
                    var nPixelWidth = parseFloat(sWidth.replace('px', ''));
                    var nParentPixelWidth = this._$element.parent().width();

                    return (nPixelWidth / nParentPixelWidth) * 100;
                },
                set: function (val) {
                    this._$element.css('width', val + '%');
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(percentage.prototype, "height", {
                get: function () {
                    var sHeight = this._$element[0].style.height;
                    if (sHeight.indexOf('%') != -1)
                        return parseFloat(sHeight.replace('%', ''));
                    var nPixelHeight = parseFloat(sHeight.replace('px', ''));
                    var nParentPixelHeight = this._$element.parent().height();

                    return (nPixelHeight / nParentPixelHeight) * 100;
                },
                set: function (val) {
                    this._$element.css('height', val + '%');
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(percentage.prototype, "left", {
                get: function () {
                    var sLeft = this._$element[0].style.left;
                    if (sLeft.indexOf('%') != -1)
                        return parseFloat(sLeft.replace('%', ''));
                    var nPixelLeft = parseFloat(sLeft.replace('px', ''));
                    var nParentPixelWidth = this._$element.parent().width();

                    return (nPixelLeft / nParentPixelWidth) * 100;
                },
                set: function (val) {
                    this._$element.css('left', val + '%');
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(percentage.prototype, "top", {
                get: function () {
                    var sTop = this._$element[0].style.top;
                    if (sTop.indexOf('%') != -1)
                        return parseFloat(sTop.replace('%', ''));
                    var nPixelTop = parseFloat(sTop.replace('px', ''));
                    var nParentPixelHeight = this._$element.parent().height();

                    return (nPixelTop / nParentPixelHeight) * 100;
                },
                set: function (val) {
                    this._$element.css('top', val + '%');
                },
                enumerable: true,
                configurable: true
            });
            return percentage;
        })();
        Units.percentage = percentage;

        var pixel = (function () {
            function pixel($element) {
                this._$element = $element;
            }
            Object.defineProperty(pixel.prototype, "width", {
                get: function () {
                    return this._$element.width();
                },
                set: function (val) {
                    this._$element.width(val);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(pixel.prototype, "height", {
                get: function () {
                    return this._$element.height();
                },
                set: function (val) {
                    this._$element.height(val);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(pixel.prototype, "top", {
                get: function () {
                    return parseInt(this._$element.css('top'));
                },
                set: function (val) {
                    this._$element.css('top', val);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(pixel.prototype, "left", {
                get: function () {
                    return parseInt(this._$element.css('left'));
                },
                set: function (val) {
                    this._$element.css('left', val);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(pixel.prototype, "right", {
                get: function () {
                    return parseInt(this.left + this.width);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(pixel.prototype, "bottom", {
                get: function () {
                    return parseInt(this.top + this.height);
                },
                enumerable: true,
                configurable: true
            });
            return pixel;
        })();
        Units.pixel = pixel;

        var units = (function () {
            function units($element) {
                this._percentage = new Units.percentage($element);
                this._pixel = new Units.pixel($element);
                this._$element = $element;
            }
            units.prototype.switchToPercentage = function () {
                var size = {
                    width: this._percentage.width + '%',
                    height: this._percentage.height + '%'
                };
                this._$element.css(size);
            };
            Object.defineProperty(units.prototype, "percentage", {
                get: function () {
                    return this._percentage;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(units.prototype, "pixel", {
                get: function () {
                    return this._pixel;
                },
                enumerable: true,
                configurable: true
            });
            return units;
        })();
        Units.units = units;

        (function (Utils) {
            function percentageToPixel(percentage, entirePixels) {
                percentage = typeof percentage == 'string' ? parseFloat(percentage.replace('%', '')) : percentage;
                entirePixels = typeof entirePixels == 'string' ? parseFloat(entirePixels.replace('px', '')) : entirePixels;

                return (percentage / 100) * entirePixels;
            }
            Utils.percentageToPixel = percentageToPixel;

            function percentageToPixel(percentage, entirePixels) {
                percentage = typeof percentage == 'string' ? parseFloat(percentage.replace('%', '')) : percentage;
                entirePixels = typeof entirePixels == 'string' ? parseFloat(entirePixels.replace('px', '')) : entirePixels;

                return (percentage / 100) * entirePixels;
            }
            Utils.percentageToPixel = percentageToPixel;
        })(Units.Utils || (Units.Utils = {}));
        var Utils = Units.Utils;
    })(cet.dragndrop.Units || (cet.dragndrop.Units = {}));
    var Units = cet.dragndrop.Units;
})(cet || (cet = {}));
