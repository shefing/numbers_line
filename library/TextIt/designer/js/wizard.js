var Textit = Textit || {};

Textit.wizard = (function () { // for cet's studio
  var defaultMarkup = " == מעבדת הטקסט: מקריאה דיגיטלית ללמידה דיגיטלית ==\n\nמעבדת הטקסט היא תבנית קריאה חדשה, הרואה בטקסט הדיגיטלי הזדמנות להתייחס לחווית הקריאה על כל מרכיביה: הטקסט, הקורא, והמטלה. \n\n[? (סימון) סמנו בירוק את מרכיבי חווית הקריאה\nירוק - הטקסט\nירוק - הקורא\nירוק - והמטלה\n?]\n\nהאתגר שלקחנו על עצמנו בפיתוח מעבדת הטקסט, היה ליצור חוויה של [קריאה פעילה|קריאה המערבת את הקוראים], המציבה את הטקסט במרכז ו'משאירה' את התלמיד בתוכו. זאת בהשראתו של אלברט איינשטיין, שאמר: 'זה לא שאני כזה חכם, אני פשוט נשאר עם הבעיות זמן ממושך יותר'. \n\n[? (פתוחה) הסבירו את המשפט של אלברט איינשטיין במילים שלכם ?]\n\nאיך 'משאירים' את התלמידים בטקסט זמן ארוך יותר והופכים את חווית הקריאה למשמעותית? ראשית, בואו נגדיר מהי קריאה משמעותית ואיך ניתן להעריך אותה. \n";
  var _markup = '';
  var _xml = null;
  var _editwindow;
  var _markupInput = null;
  var _previewArea = null;
  var _previewer = new Textit.XML.XMLPreviewer();
  var _parser = new Textit.XML.XMLParser();
  var _coupledCheckbox;
  var _isCoupled = false;

  /**
   * @public
   * Initiator
   * should run when cet.content is ready
   */
  function init() {
    cet.content.DesignTime.onValidationRequested = function () { return null; }
    cet.content.DesignTime.onPresetRequested = buildPreset;
    loadPreset();
  }

  /**
   * @private
   * Load from previous session
   */
  function loadPreset() {
    var sPreset = cet.content.DesignTime.preset || 'null'; // string preset
    sPreset = decodeURIComponent(sPreset);
    var data = JSON.parse(sPreset);

    if (data != null) {
      update(data);
      if (_markupInput != null) {
        _markupInput.value = _markup;
      }
    } else { // put the default
      update({ markup: defaultMarkup });
      parse(defaultMarkup);
    }
  }

  /**
   * @private
   * Builds the preset string to save
   */
  function buildPreset() {
    var data = {
      markup: _markup,
      xml: _xml
    };

    if (_isCoupled)
      data['extended'] = { 'name': 'dora/coupled' };

    return encodeURIComponent(JSON.stringify(data));
  }

  /**
   * @private
   * sets the data
   */
  function update(data) {
    if (data.xml) _xml = data.xml;
    if (data.markup != null) _markup = data.markup;

    if (data.extended) _isCoupled = true;

    if (_markupInput != null) {
      _markupInput.value = _markup;
      if (_parser && _parser.attributes && _parser.attributes.direction)
        _markupInput.setAttribute("dir", _parser.attributes.direction || "rtl");
    }

    if (_previewArea != null) {
      _previewArea.innerHTML = _previewer.previewHtml(_xml);
      if (_parser && _parser.attributes && _parser.attributes.direction)
        _previewArea.setAttribute("dir", _parser.attributes.direction || "rtl");
    }

    if (_coupledCheckbox != null) {
      _coupledCheckbox.checked = _isCoupled;
    }
  }

  /**
   * @public
   * sets the preview area element
   */
  function setPreviewArea(el) {
    _previewArea = el;
    if (_xml)
      _previewArea.innerHTML = _previewer.previewHtml(_xml);
  }

  /**
   * @public
   * sets the preview area element
   */
  function setCoupledCheckbox(el) {
    _coupledCheckbox = el;
    _coupledCheckbox.checked = _isCoupled;
  }


  /**
   * @public
   * sets the preview area element
   */
  function setMarkupInput(el) {
    _markupInput = el;
    _markupInput.value = _markup;
    _markupInput.addEventListener('keyup', function () {
      cet.content.DesignTime.notifyChange();
      parse(this.value);
    })
  }

  /**
   * @private
   * parses markup to xml and updates the preview
   */
  function parse(markuptext) {
    update({ xml: _parser.parse(markuptext), markup: markuptext });
  }

  /**
   * @public
   * opens editing window
   */
  function openEditWindow() {
    if (_editwindow)
      _editwindow.close();
    _editwindow = window.open('wizard-window.html', '_blank', 'width=1100,height=600,scrollbars=yes,status=no,top=80,left=80')
    _editwindow.addEventListener('message', function (e) {
      if (e.data.type == 'changed')
        update(e.data);
    })
    _editwindow.addEventListener('load', function () {
      _editwindow.postMessage({ type: 'load', markup: _markup }, '*'); //insecure
    })
  }

  /**
   * @public
   * set coupled
   */
  function setCoupled(iscoupled) {
    _isCoupled = iscoupled;
  }


  return {
    init: init,
    setPreviewArea: setPreviewArea,
    openEditWindow: openEditWindow,
    setMarkupInput: setMarkupInput,
    getXML: function () { return _xml; },
    setCoupled: setCoupled,
    setCoupledCheckbox: setCoupledCheckbox
  };
})();