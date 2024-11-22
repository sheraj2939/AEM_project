function sliderFunc(sliderParent, sliderProp = sliderProperties) {
    if (sliderParent.length) {
      if (sliderParent.hasClass('slick-initialized')) {
        sliderParent.slick('unslick');
      }
      else {
        sliderParent.not('.slick-initialized').slick(sliderProp);
      }
    }
  }
  
  $(document).click(function (e) {
    var clicked = $(e.target);
    var opened = $(".js-close-outside").hasClass("show");
    if (opened === true && !clicked.hasClass('js-shares-btn')) {
      $(".js-close-outside").removeClass('show');
      $('.js-shares-btn').removeClass('active');
    }
  });
  
  $('.js-shares-btn').click(function () {
    if ($(this).hasClass('active')) {
      $(".js-close-outside").removeClass('show');
      $('.js-shares-btn').removeClass('active');
    } else {
      $(".js-close-outside").removeClass('show');
      $('.js-shares-btn').removeClass('active');
      $(this).toggleClass('active');
      $(this).parents('.js-close-outside').toggleClass('show');
    }
  });
  
  $('.js-close-outside .share-bundle-menu').click(function (e) {
    e.stopPropagation();
  });
  
    /*modal js*/
    $('[data-popovermodal="popover-modal"]').click(function () {
      var ele_target = $(this).attr('data-target');
      setTimeout(function () {
        $(ele_target).addClass('popover-show');
        $('.slick-slider').slick("refresh");
      }, 80);
      $(ele_target).css('display', 'block');
      $('body').addClass('popover-modal-open');
      $('body').append('<div class="modal-backdrop"></div>');
      $('.js-sticky-actions').removeClass('active')
    });
  
    $('[data-dismiss="popover-modal"]').on('click', function () {
      $(this).parents('.popover-modal').removeClass('popover-show');
      $(this).parents('.popover-modal').removeAttr('style');
      $('.height-scroll').removeAttr('style');
      $('body').removeClass('popover-modal-open');
      $('.modal-backdrop').remove();
  
  
      var src = $('#video-modal iframe').attr('src');
      $('#video-modal iframe').attr('src', '');
  
    });
  
    /*modal js*/
  
  /*MultiPurposeSlider slider*/
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
  /*MultiPurposeSlider slider*/
  
  sliderFunc($('.jsMultiPurposeSlider'), MultiPurposeSlider);
  
  /*jsCanTakeSlider slider*/
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
    dots: false,
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
  /*jsCanTakeSlider slider*/
  
  sliderFunc($('.jsCanTakeSlider'), CanTakeSlider);
  
  /*instant slider*/
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
  /*instant slider*/
  
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
  
  input_animation();
  
  /*simple scroll bar*/
  // if ($(".simple-bar").length > 0) {
  //   for (i = 0; i < $(".simple-bar").length; i++) {
  //     new SimpleBar($(".simple-bar")[i]);
  //   }
  // }
try{
var simpleBarTimeout = setTimeout(simpleBar, 2000);
/*simple scroll bar*/
function simpleBar() {
  if ($(".simple-bar").length > 0) {
    $(".simple-bar").each(function (e) {
      new SimpleBar($(".simple-bar")[e]);
    });
  }
}
}catch{
  console.log(e);

}
  /*simple scroll bar*/
  