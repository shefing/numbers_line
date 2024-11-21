(function () {

  function resolveDurationBetweenOptions() {
    switch (cet.Content.getConcurrentOptionsNumber()) {
      case 2:
        return cet.Content.getDroppingDuration() / 1.5;
      case 3:
        return cet.Content.getDroppingDuration() / 2.2;
      default:
        return cet.Content.getDroppingDuration() / 2.2;

    }

  }
  var DroppingOptions = (function () {

    var options = [];
    function startMultipleDropping() {
      if (!cet.Content.isMultipleDroppingOptions())
        return;
      var durationBetweenOptions = resolveDurationBetweenOptions();
      DroppingOptions.multipleDroppingOptionsInterval = setInterval(function () {
        if (!cet.Storage.hasMoreOptions()) {
          clearInterval(DroppingOptions.multipleDroppingOptionsInterval);
          DroppingOptions.multipleDroppingOptionsInterval = null;
        }
        else
          DroppingOptions.add(Storage.dropOption());
      }, durationBetweenOptions);
    }

    function stopAutomaticDropping() {
      if (!cet.Content.isMultipleDroppingOptions())
        return;
      clearInterval(DroppingOptions.multipleDroppingOptionsInterval);

    }
    return {

      add: function (option) {
        if (options.length == 0)
          option.showAsLeadingOption();
        options.push(option);

      },
      getLeadingOption: function () {
        return options.length == 0 ? null : options[0];
      },
      removeLeadingOption: function () {
        for (var i = 0; i < options.length - 1; i++) {
          options[i] = options[i + 1];
        }

        options.pop();

        if (options.length > 0)
          options[0].showAsLeadingOption();


      },
      isEmpty: function () {

        return options.length == 0;
      },
      getState: function () {
        var result = []
        for (var i = 0; i < options.length; i++) {
          result.push({ option: options[i].getId() });
        }
      },
      getAll: function () {
        return options;
      },
      removeAll: function () {
        var tmp = options;
        options = [];
        return tmp;
      },
      pause: function () {
        stopAutomaticDropping();
        for (var i = 0; i < options.length; i++) {
          options[i].stopDropping();
        }
      },
      resume: function () {
        for (var i = 0; i < options.length; i++) {
          options[i].resumeDropping();
        }
        startMultipleDropping();

      },
      startDropping: function () {

        if (!cet.Storage.hasMoreOptions())
          return;

        stopAutomaticDropping();
        var leadingOpt = Storage.dropOption();
        leadingOpt.showAsLeadingOption();
        DroppingOptions.add(leadingOpt);
        startMultipleDropping();

        //for (var i = 0; i < options.length - 1; i++) {
        // options[i].startDropping();
        //}
      },
      resizeAdjustment: function (winSize) {
        var options = this.getAll();
        for (var i = 0; i < options.length; i++) {
          options[i].resizeAdjustment(winSize);
          this.pause();
          this.resume();
        }
      }



    };
  })();

  cet.DroppingOptions = DroppingOptions;

})();
