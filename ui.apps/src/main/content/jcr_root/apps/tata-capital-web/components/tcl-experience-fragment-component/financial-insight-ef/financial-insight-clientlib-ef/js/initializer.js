/*lazy load*/
const observer = lozad(); // lazy loads elements with default selector as '.lozad'
observer.observe();
/*lazy load*/

/*Financial insights start*/
$(".js-fi-slider").on(
    "init reInit afterChange",
    function (event, slick, currentSlide, nextSlide) {
      if ($(".js-fi-slider .financial-insights-slider").length <= 3) {
        if ($(window).width() > 991) {
          $(".js-fi-slider").removeClass("slider-dots slick-dotted");
        }
      } else {
        $(".js-fi-slider").addClass("slider-dots slick-dotted");
      }
    }
  );

  $(".js-fi-slider").slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "30px",
          infinite: false,
          arrows: false,
        },
      },
    ],
  });

  /*Financial insights start*/

  $('.jsCopyLink').click(function () {
    $('.jsCopyLink').removeClass('copied');
    $(this).addClass('copied');
    $(this).find('.text-copy').text('Copied');
    setTimeout(function () {
      $('.jsCopyLink').removeClass('copied');
      $('.jsCopyLink .text-copy').text('Copy');
    }, 2500)
  })