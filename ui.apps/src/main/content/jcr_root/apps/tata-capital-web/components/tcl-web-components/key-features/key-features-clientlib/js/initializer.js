
window.addEventListener('DOMContentLoaded',function() {
  $('.jsMultiPurposeSlider').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
    if ($('.jsMultiPurposeSlider .instant-per-row').length <= 4) {
      if ($(window).width() > 1199) {
        $('.jsMultiPurposeSlider').removeClass('slider-dots slick-dotted');
      }
    }
    else {
      $('.jsMultiPurposeSlider').addClass('slider-dots slick-dotted');
    }
  });
  const MultiPurposeSlider = {
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    centerMode: false,
    centerPadding: "0",
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          arrows: false,
          dots: true,
          centerMode: true,
          centerPadding: "40px",
          infinite: false,
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "40px",
          infinite: false,
          dots: true,
        }
      }
    ]
  };
  function sliderFunc(sliderParent, sliderProp = sliderProperties) {
    if (sliderParent.length) {
      if (sliderParent.hasClass('slick-initialized')) {
        sliderParent.slick('unslick');
      }
      else {
        sliderParent.not('.slick-initialized').slick(
          sliderProp
        );
      }
    }
  };
  sliderFunc($('.jsMultiPurposeSlider'), MultiPurposeSlider);

  $('.jsCanTakeSlider').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
    if ($('.jsCanTakeSlider .instant-per-row').length <= 3) {
      if ($(window).width() > 991) {
        $('.jsCanTakeSlider').removeClass('slider-dots slick-dotted');
      }
    }
    else {
      $('.jsCanTakeSlider').addClass('slider-dots slick-dotted');
    }
  });
  const CanTakeSlider = {
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    centerMode: false,
    centerPadding: "0",
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true,
          centerMode: true,
          centerPadding: "30px",
        }
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
          // centerMode: true,
          centerPadding: "30px",
          infinite: false,
          dots: true,
        }
      }
    ]
  };

sliderFunc($('.jsCanTakeSlider'), CanTakeSlider);
const InstantSlider = {
  dots: false,
  infinite: true,
  autoplay: true,
  speed: 300,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: true,
  centerMode: false,
  centerPadding: "0",
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        arrows: false,
        dots: true,
        centerMode: true,
        centerPadding: "30px",
        infinite: false,
      }
    },
    {
      breakpoint: 320,
      settings: {
        slidesToShow: 1,
        // centerMode: true,
        centerPadding: "30px",
        infinite: false,
        dots: true,
      }
    }
  ]
};
sliderFunc($('.jsInstantSlider'), InstantSlider);
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
const CustomerSaySlider = {
  dots: true,
  infinite: true,
  speed: 300,
  slidesToShow: 3,
  slidesToScroll: 3,
  arrows: true,
  responsive: [
    { breakpoint: 992, settings: { slidesToShow: 2, slidesToScroll: 1 } },
    { breakpoint: 768, settings: { slidesToShow: 2 } },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        arrows: false,
        centerMode: true,
        centerPadding: "30px",
        infinite: true,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
        centerMode: true,
        centerPadding: "30px",
        infinite: true,
      },
    },
  ],
};
sliderFunc($(".jsCustomerSaySlider"), CustomerSaySlider);
});
