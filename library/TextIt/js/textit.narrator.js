var Textit = (typeof Textit == 'undefined') ? {} : Textit;

Textit.ArticleNarrator = function (article, audioUrl, timeCodesUrl) {
   
    audioUrl += Textit.util.isIE() || (audioUrl.length>3 && audioUrl.substring(audioUrl.length-3,audioUrl.length)==='mp3') ? ".mp3" : ".oga";

  
  var _isReady = false;
  var _isPlaying = false;
  var _isActive = false;
  var _audioElement = false;
  var _currentWord = null;
  var _timeCodes = null;
  var _progressTimeoutHandle = null;
  var _onAudioEndReachedListeners = [];
  var _onReadyListeners = [];
  var _events = new Textit.util.EventEmitter();
  var _volume;
  var _volumeAnim;
  var _autoscroll = true;
  var _autoscrollTimeout = 2500;
  var _autoscrollTimer;
  var _cursor = {
    visible: false,
    horzPadding: 5,
    vertPadding: 2,
    slideTime: 150, // milliseconds
    element: null,
    currentRect: null,
    animationTween: null,
    scrollAnimation: null
  }
  var narration_scroll = false;

  //-------------------------------------------------------
  function startNarration(fromWord) {
    fromWord = fromWord || null;
    _events.emit('start');
    _isActive = true;
    //onReady(function () {
    _currentWord = null;
    _isPlaying = true;
    if (_isReady) {
      _audioElement.play();
      narrationProgress();
    }
    //});
  }
  //-------------------------------------------------------
  function gotoWord(word) {
    if (!_timeCodes) return;
    if (word.index < _timeCodes.length) {
      pauseNarration(true);
      moveCursorToWord(word, function () {
        _currentWord = word.prevWord;
        _audioElement.currentTime = _timeCodes[word.index][0];
        resumeNarration(true);
        calcBlank(_currentWord);
      });
    }
  }
  //-------------------------------------------------------
  function isPlaying() {
    return _isPlaying;
  }
  //-------------------------------------------------------
  function stopNarration() {
    _events.emit('stop');
    _isPlaying = false;
    _isActive = false;
    _audioElement.pause();
    //_audioElement.currentTime = 0;
    hideCursor();
    if (_progressTimeoutHandle != null) {
      clearTimeout(_progressTimeoutHandle);
    }
    _currentWord = null;
  }
  //-------------------------------------------------------
  function triggerAudioEndReached() {
    pauseNarration();
    for (var i = 0; i < _onAudioEndReachedListeners.length; i++) {
      _onAudioEndReachedListeners[i]();
    }
  }
  //-------------------------------------------------------
  function onAudioEndReached(callback) {
    _onAudioEndReachedListeners.push(callback);
  }

  //-------------------------------------------------------
  function updateCursorByTime(time) {
    if (!_timeCodes) return;
    var curTime = time || _audioElement.currentTime;
    var numWords = article.words.length;
    var numWordsTimeCodes = _timeCodes.length;
    var currentWordIndex = (_currentWord == null) ? -1 : _currentWord.index;
    var nextWordIndex = currentWordIndex;

    if (currentWordIndex > numWordsTimeCodes.length - 1 || curTime > _timeCodes[numWordsTimeCodes - 1][1]) {
      hideCursor();
      return;
    }
    if (currentWordIndex < 0 || _timeCodes[currentWordIndex][0] > curTime) {
      nextWordIndex = 0;
    }
    while (nextWordIndex < numWordsTimeCodes - 1 &&
           (_timeCodes[nextWordIndex + 1][0] - (_cursor.slideTime / 1000)) < curTime) {
      nextWordIndex++;
    }
    if (nextWordIndex != currentWordIndex) {
      _currentWord = article.words[nextWordIndex];
      moveCursorToWord(_currentWord);
      if (!_isBlank)
        calcBlank(_currentWord);
    }
    hideBlanks();
  }
  //-------------------------------------------------------
  function isBlank(word) {
    return word.dom.style.display == 'none';
  }
  //-------------------------------------------------------
  function calcBlank(word) {
    var firstBlankWord = null, lastBlankWord = null;
    if (word.nextWord != null && isBlank(word.nextWord)) {
      firstBlankWord = lastBlankWord = word.nextWord;
      while (lastBlankWord.nextWord && isBlank(lastBlankWord.nextWord)) {
        lastBlankWord = lastBlankWord.nextWord;
      }
      var offset = 100 / 1000;
      _blankRange = { from: parseFloat(_timeCodes[firstBlankWord.index][0]) - offset, to: parseFloat(_timeCodes[lastBlankWord.index][1]) + offset };
    }

  }
  var _blankRange = null;
  var _isBlank = false;
  var skipAudio = new Audio('audio/bell.wav');
  skipAudio.volume = 0.5;

  //-------------------------------------------------------
  function hideBlanks() {
    if (_blankRange == null)
      return;

    var curTime = _audioElement.currentTime;
    if (_blankRange.from < curTime && curTime < _blankRange.to) {
      if (!_isBlank) {
        skipAudio.volume = _volume;
        skipAudio.play();
        _audioElement.volume = 0;
        _isBlank = true;
      }
    }
    else if (_isBlank) {
      _isBlank = false;
      _audioElement.volume = _volume;
      _blankRange = null;
    }
  }
  //-------------------------------------------------------
  function fadeVolumeTo(volume) {
    if (_volumeAnim != null)
      _volumeAnim.stop();

    _volumeAnim = new TWEEN.Tween({ volume: _audioElement.volume });
    _volumeAnim.to({ volume: volume }, 100).onUpdate(function () {
      _audioElement.volume = this.volume;
    }).onComplete(function () {
      _volumeAnim = null;
    });

    _volumeAnim.start();
  }
  //-------------------------------------------------------
  function narrationProgress() {
    if (!_isPlaying) {
      _progressTimeoutHandle = null;
      return;
    }
    _events.emit('progress', { progress: _audioElement.currentTime / _audioElement.duration, currentTime: _audioElement.currentTime });

    if (_timeCodes && _timeCodes.length > 0)
      updateCursorByTime();
    _progressTimeoutHandle = setTimeout(narrationProgress, 5);
  }
  //-------------------------------------------------------
  function initCursor() {
    _cursor.element = document.createElement("DIV");
    _cursor.element.className = "narrationCrs";
    //document.body.appendChild(_cursor.element);
    article.dom.appendChild(_cursor.element);
    _cursor.visible = false;
  }
  //-------------------------------------------------------
  function hideCursor() {
    if (_cursor.animationTween != null) {
      _cursor.animationTween.stop();
      _cursor.animationTween = null;
    }
    _cursor.element.style.display = "none";
    _cursor.visible = false;
  }
  //-------------------------------------------------------
  function setCursorRect(pos) {
    var rect = { left: pos.left, top: pos.top, width: pos.width, height: pos.height };
    _cursor.element.style.top = rect.top - _cursor.vertPadding + "px";
    _cursor.element.style.left = rect.left - _cursor.horzPadding + "px";
    _cursor.element.style.width = rect.width + 2 * _cursor.horzPadding + "px";
    _cursor.element.style.height = rect.height + 2 * _cursor.vertPadding + "px";
    _cursor.currentRect = rect;
    if (!_cursor.visible) {
      _cursor.visible = true;
      _cursor.element.style.display = "block";
    }
  }
  //-------------------------------------------------------
  function moveCursorToWord(word, callback) {
    if (word == null)
      return;
    var elem = word.dom;
    if (word.blank != null) // word turns to blank
      elem = word.blank;

    var rect = elem.getBoundingClientRect();
    var arRect = article.dom.getBoundingClientRect();
    var targetRect = {
      left: rect.left - arRect.left - 2,
      top: rect.top /*+ window.scrollY*/ - arRect.top + 4,
      width: rect.width + 4,
      height: rect.height - 8,
    };
    if (!_cursor.visible) {
      setCursorRect(targetRect);
      if (callback) {
        callback();
      }
    } else {
      _cursor.animationTween = new TWEEN.Tween(_cursor.currentRect);
      _cursor.animationTween.to(targetRect, _cursor.slideTime).onUpdate(function () {
        setCursorRect(this)
      }).onComplete(function () {
        _cursor.animationTween = null;
        if (callback) {
          callback();
        }
      });

      _cursor.animationTween.start();
    }

    // do some scrolling 
    if (_autoscroll) {
      targetRect.bottom = window.innerHeight - (targetRect.top - Textit.util.scrollTop() + targetRect.height);
      if (_cursor.scrollAnimation == null && (targetRect.bottom < 300 || targetRect.top - Textit.util.scrollTop() < 300)) {
        var offset = 0;
        if (targetRect.bottom < 300)
          offset = -targetRect.bottom + window.innerHeight / 2;
        else
          offset = +(targetRect.top - Textit.util.scrollTop()) - window.innerHeight / 2;
        _cursor.scrollAnimation = new TWEEN.Tween({ scrollY: Textit.util.scrollTop() })
          .easing(TWEEN.Easing.Cubic.InOut)
          .to({ scrollY: Textit.util.scrollTop() + offset }, 1000)
          .onUpdate(function () {
            window.scrollTo(0, this.scrollY);
            narration_scroll = true;
          }).onComplete(function () {
            _cursor.scrollAnimation = null;
          })
        _cursor.scrollAnimation.start();
      }
    }
  }
  //-------------------------------------------------------
  function triggerNarratorReady() {
    _isReady = true;
    for (var i = 0; i < _onReadyListeners.length; i++) {
      _onReadyListeners[i]();
    }
    if (_isPlaying == true) {
      _audioElement.play();
      narrationProgress();
    }
  }
  //-------------------------------------------------------
  function onReady(callback) {
    if (_isReady) {
      callback();
    }
    else {
      _onReadyListeners.push(callback);
    }
  }
  //-------------------------------------------------------
  function setPlaybackSpeed(speed) {
    _audioElement.playbackRate = speed;
  }
  //-------------------------------------------------------
  function setSpeed(speed) {
    speed = 0.5 + Math.max(0, speed * 2 - .5);
    setPlaybackSpeed(speed);
  }
  //-------------------------------------------------------
  function setVolume(volume) {
    _volume = volume;
    _audioElement.volume = volume;
  }
  //-------------------------------------------------------
  function init() {
    initCursor();
    _audioElement = document.createElement("AUDIO");
    article.dom.appendChild(_audioElement);
    _audioElement.src = audioUrl; //audioBlobUrl;
    _audioElement.preload = "auto";
    Textit.util.ajaxLoad(timeCodesUrl, function (text) {
      _timeCodes = parseTimeCodes(text);
      triggerNarratorReady();
      Textit.util.bindEvent(_audioElement, "ended", triggerAudioEndReached);
      /*_audioElement.addEventListener("canplay", function () {
        triggerNarratorReady();
      });*/
    }, function () { triggerNarratorReady(); });

    window.addEventListener('scroll', function (e) {
      if (narration_scroll) return narration_scroll = false, false;
      clearTimeout(_autoscrollTimer);
      _autoscroll = false;
      _autoscrollTimer = setTimeout(function () {
        _autoscroll = true;
      }, _autoscrollTimeout)
    })
  }
  //-------------------------------------------------------
  function parseTimeCodes(raw) {
    // parse time codes supports json, or fall backs to tab delimited lines
    var res = [];
    if (/\[[\s\S]*\]/.test(raw)) { // if can be a json array (soft test, doesn't check validation)
      res = JSON.parse(raw); // assumes valid, could throw an error if invalid json
    } else {
      res = [];
      var lines = raw.split('\n');
      for (var i = 0; i < lines.length; i++) {
        var comps = lines[i].split('\t');
        if (comps.length > 1)
          res.push([parseFloat(comps[0].trim()), parseFloat(comps[1].trim())]);
      }
    }
    return res;
  }
  //-------------------------------------------------------
  function pauseNarration(noUI) {
    if (noUI !== true) {
      _events.emit('stop');
      _isPlaying = false;
    }
    _audioElement.pause();
    /*if (_progressTimeoutHandle != null) {
      clearTimeout(_progressTimeoutHandle);
    }*/
  }
  //-------------------------------------------------------
  function resumeNarration(noUI) {
    if (noUI !== true) {
      _events.emit('start');
      _isPlaying = true;
    }
    _audioElement.play();
    narrationProgress();
  }
  //-------------------------------------------------------
  function isActive() {
    return _isActive;
  }
  //-------------------------------------------------------
  function seek(time) {
    _audioElement.currentTime = time * _audioElement.duration;
  }
  function moveCursor(time) {
    updateCursorByTime(time * _audioElement.duration);
  }
  //-------------------------------------------------------
  init();
  return {
    startNarration: startNarration,
    gotoWord: gotoWord,
    isPlaying: isPlaying,
    isActive: isActive,
    stopNarration: stopNarration,
    onReady: onReady,
    onAudioEndReached: onAudioEndReached,
    on: _events.on,
    setSpeed: setSpeed,
    setVolume: setVolume,
    pauseNarration: pauseNarration,
    resumeNarration: resumeNarration,
    seek: seek,
    moveCursor: moveCursor
  }
}

