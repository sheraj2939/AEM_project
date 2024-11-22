$('#jsNewBannerSlider').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
  if ($('#jsNewBannerSlider .banner-item-new').length <= 1) {
    $('#jsNewBannerSlider').removeClass('slider-dots slick-dotted');
  }
  else {
    $('#jsNewBannerSlider').addClass('slider-dots slick-dotted');
  }
});
$('#jsNewBannerSlider').on('touchstart', e => {
  $('#jsNewBannerSlider').slick('slickPlay');
});

$('#jsNewBannerSlider').slick({
  infinite: true,
  speed: 300,
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: true,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 6000,
  touchMove: true,
  focusOnSelect: true,
  pauseOnHover: false,
  pauseOnFocus: false,
  pauseOnDotsHover: false,
  draggable: true,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        infinite: true,
        autoplay: true,
        slidesToShow: 1,
      }
    }
  ]
});

$('.banner-slider-new').on('afterChange', function () {
  if ($('.slick-active')[0].children[0].getAttribute('class').split(' ')[2] == 'whiteDot' || $('.slick-active')[0].children[0].getAttribute('class').split(' ')[3] == 'whiteDot') {
    $('.banner-new-box').addClass('banner-white-dots');
  }
});

$('.banner-slider-new').on('beforeChange', function () {
  $('.banner-new-box').removeClass('banner-white-dots');
}); 