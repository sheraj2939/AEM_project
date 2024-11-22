$('.jsConvenienceSlider').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
  if ($('.jsConvenienceSlider .instant-per-row').length <= 3) {
    if ($(window).width() > 991) {
      $('.jsConvenienceSlider').removeClass('slider-dots slick-dotted');
    }
  } else {
    $('.jsConvenienceSlider').addClass('slider-dots slick-dotted');
  }
});

if ($(window).width() > 991) {
  if ($('.jsConvenienceSlider').hasClass('slick-initialized')) {
    $('.jsConvenienceSlider').slick('unslick');
  }
} else {
  $('.jsConvenienceSlider').not('.slick-initialized').slick({
    dots: true,
    infinite: true,
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
          infinite: false
        }
      }
    ]
  });
}