
$(function () {
  $('nav a').on('click', function () {
    setAsActive($(this));
  })


  var dictionaryTop = parseInt( $('#dictionary').offset().top) - 150;
  var embedTop = parseInt( $('#embed').offset().top) - 150;
  var contentTop = parseInt( $('#content').offset().top) - 150;
  var downloadTop = parseInt($('#download').offset().top) - 150;
  var faqTop = parseInt($('#faq').offset().top) - 150;

  var active = null;

  $(document).scroll(function () {
    var scrollTop = $(this).scrollTop();
    if (active != 'dictionary' && scrollTop > dictionaryTop && scrollTop < embedTop) {
      setAsActive($('#nav-dictionary'))
      active = 'dictionary';
    }
    if (active != 'embed' && scrollTop > embedTop && scrollTop < contentTop) {
      setAsActive($('#nav-embed'));
      active = 'embed';
    }
    if (active != 'content' && scrollTop > contentTop && scrollTop < faqTop) {
      setAsActive($('#nav-content'));
      active = 'content';
    }

    if (active != 'faq' && scrollTop > faqTop && contentTop < downloadTop) {
     setAsActive($('#nav-faq'))
     active = 'faq';
    }

    if (active != 'download' && scrollTop > downloadTop) {
     setAsActive($('#nav-download'))
     active = 'download';
    }
  });

  function setAsActive(jqAnchor) {
    
    jqAnchor.closest('ul').find('.active').removeClass('active');
    jqAnchor.addClass('active');
    

  }


})