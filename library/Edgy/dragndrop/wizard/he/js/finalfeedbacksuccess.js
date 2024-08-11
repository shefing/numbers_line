var finalFeedbackSuccess = (function () {
    function finalFeedbackSuccess($element) {
        var self = this;
        this.$element = $element;
        $('.button-feedback-close').on('click', function () {
            self.$element.removeClass('show');
        });
    }
    finalFeedbackSuccess.prototype.play = function () {
        var self = this;

        //delayed till parent element will be displayed, IE issue...
        setTimeout(function () {
            self.$element.addClass('show');
        }, 50);
    };
    return finalFeedbackSuccess;
})();
