if ($(window).width() > 767) {
  if ($('#jsPlanForSlider').hasClass('slick-initialized')) {
    $('#jsPlanForSlider').slick('unslick');
  }
} else {
  $('#jsPlanForSlider').not('.slick-initialized').slick({
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "30px",
          infinite: false,
          dots: true,
          arrows: false
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "30px",
          infinite: false,
          dots: true,
          arrows: false
        }
      }
    ]
  });
}

/*knowledge-centre slider*/
if ($(window).width() > 767) {
  if ($('#jsKnowledgeSlider').hasClass('slick-initialized')) {
    $('#jsKnowledgeSlider').slick('unslick');
  }
} else {
  $('#jsKnowledgeSlider').not('.slick-initialized').slick({
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "30px",
          infinite: false,
          dots: true,
          arrows: false
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "30px",
          infinite: false,
          dots: true,
          arrows: false
        }
      }
    ]
  });
}
/*knowledge-centre slider*/

if ($(window).width() > 767) {
  if ($('#jsDigitalsSlider').hasClass('slick-initialized')) {
    $('#jsDigitalsSlider').slick('unslick');
  }
} else {
  $('#jsDigitalsSlider').not('.slick-initialized').slick({
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "30px",
          infinite: false,
          dots: true,
          arrows: false
        }
      },
      {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: true,
            centerPadding: "30px",
            infinite: false,
            dots: true,
            arrows: false
          }
        }
    ]
  });
}