var Textit = Textit || {};

Textit.externalQuestions = {
  data: [],
  languages: ['he', 'ar', 'en', 'cn', 'vt'],
  load: function (lodocument) {
    var data = [null];
    this.lodocument = lodocument;
    if (lodocument.documentModel.e_questionnaire.e_page.length < 2) return; // if there is not page 2, foggetaboutit
    var questionsData = lodocument.documentModel.e_questionnaire.e_page[1].e_question;
    var weights = [];
    for (var i = 0; i < questionsData.length; i++) {
      var q = questionsData[i];
      weights.push(1);
      if (q.e_singleChoice) {
        var options = [];
        for (var optionIndex = 0; optionIndex < q.e_singleChoice.e_option.length; optionIndex++)
          options.push(Textit.util.strip(q.e_singleChoice.e_option[optionIndex].labelHtml));

        data.push({
          type: 'multiplechoice',
          stem: Textit.util.strip(q.instructions),
          options: options
        })
      } // end multiple choice
    }
    this.weights = this.normalizeWeights(weights, 100);
    this.questions = questionsData;
    this.data = data;
    this.scores = {};
  },
  score: function (questionIndex, score) {
    if (!this.questions) return; // if there is not page 2, foggetaboutit
    score = score * this.weights[questionIndex];
    var questionId = this.getQuestionGUID(questionIndex);
    if (!questionId) return;
    var set = {};
    set[questionId] = { manualScore: score, externalChange: true };
    cet.content.lms.Activity.setStateData(set);
  },
  get: function (qIndex) {
    return this.data[qIndex];
  },
  getQuestionGUID: function (questionIndex) {
    return (this.questions && this.questions[questionIndex]) ? this.questions[questionIndex].elementId : undefined;
  },
  getDocumentGUID: function () {
    return this.lodocument.documentId;
  },
  getDocumentLanguage: function () {
    return this.languages[this.lodocument.language];
  },
  normalizeWeights: function (weights, sum) {
    var rawWeights = [];
    var totalRawWeight = 0;

    var weight;
    var sumWeights = 0;
    for (var i = 0; i < weights.length; i++)
      sumWeights += weights[i];

    for (var i = 0; i < weights.length; i++) {
      weight = weights[i];
      rawWeights[i] = weight * sum / sumWeights;
      totalRawWeight += rawWeights[i];
    }

    var exactWeights = [];
    if (totalRawWeight > 0) {
      for (var i = 0; i < rawWeights.length; i++) {
        exactWeights[i] = (sum * rawWeights[i]) / totalRawWeight;
      }
    } else {
      for (var i = 0; i < weights.length; i++) {
        exactWeights[i] = sum / weights.length;
      }
    }

    // Step 3: Compute elements floor weight and remainders.
    // Floor weight is the max element weight that can be divided by weight precission.
    // e.g. element exact weight = 8.983
    //      weight precission = 0.25
    //      => element floor weight = 8.75
    //      => Remainder = 8.983 - 8.75 = 0.233
    var fWeightPrecision = .5;
    var floorWeights = [];
    var remainders = [];
    var weightPrecision = fWeightPrecision;
    var totalFloorWeight = 0;
    for (var i = 0; i < exactWeights.length; i++) {
      floorWeights[i] = Math.floor(exactWeights[i] / weightPrecision) * weightPrecision;
      remainders[i] = exactWeights[i] - floorWeights[i];
      totalFloorWeight += floorWeights[i];
    }

    // Step 4: Compute elements normalized weights.
    // At this point totalFloorWeight <= sum.
    // Therefore it is possible that we have some more score point portions sized as weight precision to distribute.
    // we will distribute this portions to elements with max remainders.
    var scorePortionsToDistribute = (sum - totalFloorWeight) / weightPrecision;

    var elementsData = [];
    for (var i = 0; i < weights.length; i++) {
      elementsData[i] = {
        index: i,
        floorWeight: floorWeights[i],
        remainder: remainders[i]
      };
    }

    var orderedElementsData = elementsData.sort(function (elementData) { return elementData.remainder; }).reverse();
    //_.sortBy(elementsData, function (elementData) { return elementData.remainder; }).reverse();
    for (var i = 0; i < orderedElementsData.length; i++) {
      if (i < scorePortionsToDistribute) {
        orderedElementsData[i].normalizedWeight = orderedElementsData[i].floorWeight + weightPrecision;
      } else {
        orderedElementsData[i].normalizedWeight = orderedElementsData[i].floorWeight;
      }
    }
    orderedElementsData = elementsData.sort(function (a, b) { return a.remainder - b.remainder; }).reverse();
    //_.sortBy(elementsData, function (elementData) { return elementData.remainder; })

    // sort the data back according the given questions order and return only the normalized weights
    return orderedElementsData.map(function (el) { return el.normalizedWeight; });
  }


}