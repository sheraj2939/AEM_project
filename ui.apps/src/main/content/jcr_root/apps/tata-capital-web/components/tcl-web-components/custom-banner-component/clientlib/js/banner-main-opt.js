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

/* window.addEventListener("load", (event) => {
  var activeSlick = document.querySelectorAll('.banner-item-new');
  if (activeSlick[1].childNodes[1].getAttribute('class').split(' ')[3] == 'whiteDot' || activeSlick[1].childNodes[1].getAttribute('class').split(' ')[2] == 'whiteDot') {
    $('.banner-new-box').addClass('banner-white-dots');
  }else{
    $('.banner-new-box').removeClass('banner-white-dots');
  }
}); */

$('.banner-slider-new').on('afterChange', function () {
  if ($('.slick-active')[0].children[0].getAttribute('class').split(' ')[2] == 'whiteDot' || $('.slick-active')[0].children[0].getAttribute('class').split(' ')[3] == 'whiteDot') {
    $('.banner-new-box').addClass('banner-white-dots');
  }
});

$('.banner-slider-new').on('beforeChange', function () {
  $('.banner-new-box').removeClass('banner-white-dots');
});
/*if(screen.width>=768)
{
  $(document).mousemove( function(event){
    $('#jsNewBannerSlider').slick('slickPlay');
  });*/
/*14-3-2023*/

$slick = $('#jsNewBannerSlider');

var reinitSlickAutoPlayStop = function () {
  $slick.slick('slickSetOption', {
    'autoplay': false
  }, false);
}
var reinitSlickAutoPlay = function () {
  $slick.slick('slickSetOption', {
    'autoplay': true
  }, true);
}

var videoPlayButton = $('[data-videourl]');
$.each(videoPlayButton, function (indexInArray, valueOfElement) {
  $(valueOfElement).click(function () {
    var videoLink = $(this).data('videourl');
    $("#videos-outer iframe").attr("src", videoLink);
    reinitSlickAutoPlayStop()
  })
});

$('#player-modal .popover-modal-close').click(function (e) {
  $("#videos-outer iframe").attr("src", "");
  reinitSlickAutoPlay()
})