input_animation();
$(".js-personal-loan-slider").on(
  "init reInit afterChange",
  function (event, slick, currentSlide, nextSlide) {
    if ($(".js-personal-loan-slider .item").length <= 4) {
      if ($(window).width() > 1199) {
        $(".js-personal-loan-slider").removeClass("slider-dots slick-dotted");
      }
    } else {
      $(".js-personal-loan-slider").addClass("slider-dots slick-dotted");
    }
  }
);
const personalLoanSlider = {
  dots: false,
  infinite: false,
  speed: 300,
  slidesToShow: 4,
  slidesToScroll: 4,
  arrows: false,
  responsive: [
    { breakpoint: 1200, settings: { slidesToShow: 3, slidesToScroll: 3 } },
    { breakpoint: 992, settings: { slidesToShow: 2, slidesToScroll: 2 } },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        centerMode: true,
        centerPadding: "40px",
        infinite: false,
      },
    },
    {
      breakpoint: 700,
      settings: {
        slidesToShow: 1,
        centerMode: true,
        centerPadding: "30px",
        infinite: false,
        dots: true,
      },
    },
  ],
};
sliderFunc($(".js-personal-loan-slider"), personalLoanSlider);

function sliderFunc(sliderParent, sliderProp = sliderProperties) {
  if (sliderParent.length) {
    if (sliderParent.hasClass("slick-initialized")) {
      sliderParent.slick("unslick");
    } else {
      sliderParent.not(".slick-initialized").slick(sliderProp);
    }
  }
}

/*simple scroll bar*/
var simpleBarTimeout = setTimeout(simpleBarInitializer, 1000);
/*simple scroll bar*/
function simpleBarInitializer() {
  if ($(".simple-bar").length > 0) {
    $(".simple-bar").each(function (e) {
      new SimpleBar($(".simple-bar")[e]);
    });
  }
}
/*simple scroll bar*/

/*find right loan scroll center*/
if (992 > $(window).width())
  $(".tab-left .tabScrollCenter").on("click", function () {
    var a = $(this).parent().parent().attr("id");
    $("#" + a + " .tab-left .tabScrollCenter").removeClass("cmp-tabs__tab--active");
    $(this).addClass("cmp-tabs__tab--active");
    $("#" + a + " .tab-left").scrollCenter(".cmp-tabs__tab--active", 300)
  })