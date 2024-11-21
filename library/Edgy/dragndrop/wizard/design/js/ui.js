///<reference path='../../../../lib/external/jquery.d.ts'/>
var UI;
(function (UI) {
    var resizeType = {
        south: 1,
        east: 2,
        southeast: 3,
        north: 4,
        west: 5
    };

    function activateResize($element, type, eDown, containment) {
        var self = this;
        var startSize = {
            width: $element.width(),
            height: $element.height(),
            left: parseFloat($element.css('left').replace('px', '')),
            top: parseFloat($element.css('top').replace('px', ''))
        };

        var $containment = $(containment);
        var containmentBoundries = {
            top: 0,
            left: 0,
            bottom: $containment.height() - 6,
            right: $containment.width() - 6
        };

        if (UI.isIE()) {
            containmentBoundries.top += 6;
            containmentBoundries.left += 6;
        }

        $(document).on('mousemove', resizeMousemoveHandler);

        $(document).on('mouseup', resizeMouseupHandler);

        function resizeMousemoveHandler(eMove) {
            var delta = { width: eMove.pageX - eDown.pageX, height: eMove.pageY - eDown.pageY };

            if (type == resizeType.west)
                delta.width = -delta.width;
            if (type == resizeType.north)
                delta.height = -delta.height;

            var position = $element.position();

            var newMeasures = {
                width: startSize.width + delta.width,
                height: startSize.height + delta.height,
                top: null,
                left: null
            };

            //north/west change top/left accordingly
            if (type == resizeType.west)
                newMeasures.left = startSize.left - delta.width;
            if (type == resizeType.north)
                newMeasures.top = startSize.top - delta.height;

            var right = newMeasures.left ? newMeasures.left + newMeasures.width : position.left + newMeasures.width;
            var bottom = newMeasures.top ? newMeasures.top + newMeasures.height : position.top + newMeasures.height;

            //check if within containment
            if (type == resizeType.east) {
                newMeasures.height = null;
                if (right > containmentBoundries.right)
                    newMeasures.width = null;
            }
            if (type == resizeType.south) {
                newMeasures.width = null;
                if (bottom > containmentBoundries.bottom)
                    newMeasures.height = null;
            }

            if (type == resizeType.southeast) {
                if (bottom > containmentBoundries.bottom)
                    newMeasures.height = null;
                if (right > containmentBoundries.right)
                    newMeasures.width = null;
            }

            if (type == resizeType.north) {
                newMeasures.left = null;
                newMeasures.width = null;
                if (newMeasures.top < 0) {
                    newMeasures.height = null;
                    newMeasures.top = null;
                }
            }
            if (type == resizeType.west) {
                newMeasures.height = null;
                newMeasures.top = null;
                if (newMeasures.left < 0) {
                    newMeasures.width = null;
                    newMeasures.left = null;
                }
            }

            $element.css(newMeasures);
        }

        function resizeMouseupHandler(e) {
            $(document).off('mousemove', resizeMousemoveHandler);
            $(document).off('mouseup', resizeMouseupHandler);
            $element.trigger('resizeend')
            wizard.changesDone();
            
        }
    }

    function setAsResizable(element, containment, resizeOnCreattion) {
        var $element = $(element);
        $element.find('.e-handle').on('mousedown', function (e) {
            activateResize($element, resizeType.east, e, containment);
            e.stopPropagation();
        });
        $element.find('.s-handle').on('mousedown', function (e) {
            activateResize($element, resizeType.south, e, containment);
            e.stopPropagation();
        });
        $element.find('.n-handle').on('mousedown', function (e) {
            activateResize($element, resizeType.north, e, containment);
            e.stopPropagation();
        });
        $element.find('.w-handle').on('mousedown', function (e) {
            activateResize($element, resizeType.west, e, containment);
            e.stopPropagation();
        });
        $element.find('.se-handle').on('mousedown', function (e) {
            activateResize($element, resizeType.southeast, e, containment);
            e.stopPropagation();
        });

        if (resizeOnCreattion) {
            var fakeEvent = { pageX: $element.position().left + $('.stage').offset().left, pageY: $element.position().top + $('.stage').offset().top };
            activateResize($element, resizeType.southeast, fakeEvent, containment);
        }
    }
    UI.setAsResizable = setAsResizable;

    function isIE() {
        var myNav = navigator.userAgent.toLowerCase();
        return myNav.indexOf('msie') != -1 || myNav.indexOf('trident') != -1;
    }
    UI.isIE = isIE;
})(UI || (UI = {}));
