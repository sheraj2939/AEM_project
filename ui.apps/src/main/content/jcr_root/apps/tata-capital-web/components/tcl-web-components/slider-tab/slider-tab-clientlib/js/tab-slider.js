  /*3-3-2023*/ 
  $('.jsSliderBlueTab').slick({
    dots: false,
    infinite: false,
    speed: 300,
    autoplay: false,
    slidesToShow: 7,
    slidesToScroll: 1,
    arrows: true,
    variableWidth: true,  
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        }
      }
    ]
  });
  // $('.jsSliderBlueTab .tabs-row .tab-button').click(function(){
  //   $('.jsSliderBlueTab .tabs-row .tab-button').removeClass('active');
  //   $(this).addClass('active');
  //   var tb = $(this).attr('data-tb');
  //   $('.self-service-rows').addClass('d-none')
  //   $('#' + tb).removeClass('d-none');
  // });
  /*3-3-2023*/

$(document).ready(function (e) {
    var getId = document.querySelectorAll('.faq-body-inner .cmp-container');
    var urlHash = location.hash.split('#')[1];
    getId.forEach(function (elId) {
      var atrId = elId.getAttribute('id');
      if (urlHash == atrId) {
        var parentClass = document.getElementById(atrId).parentElement.parentElement.parentElement;
        parentClass.classList.add('cmp-accordion__panel--expanded');
        parentClass.classList.remove('cmp-accordion__panel--hidden');
        console.log($('#' + atrId).addClass('scrollMargin'));
        var replaceId = parentClass.closest('.cmp-tabs__tabpanel').getAttribute('id').replace('tabpanel', 'tab');
        document.getElementById(replaceId).click();
      };
      // $('html').scrollTop($('#' + urlHash).position().top - 200);
      // $('html').scrollTop($('#' + urlHashTwo).positi on().top - 200);
    })
});