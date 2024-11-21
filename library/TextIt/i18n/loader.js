var Textit = Textit || {};

Textit.i18n = {
  load: function (lang) {
    //var sc = document.createElement('script');
    //sc.type = 'text/javascript';
    //sc.src = 'i18n/lang.' + lang + '.js';
    //(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(sc);
    document.write('<scr' + 'ipt type="text/javascript" src="i18n/lang.' + lang + '.js"></scr' + 'ipt>');
  },
  loadAsync: function (lang) {
    var sc = document.createElement('script');
    sc.type = 'text/javascript';
    sc.src = 'i18n/lang.' + lang + '.js';
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(sc);
  }
}