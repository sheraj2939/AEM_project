$(document).ready(function () {
  if ($(window).width() < 992) {
    $(".tab-left .tabScrollCenter").on("click", function () {
      var parId = $(this).parent().parent().attr("id");
      $("#" + parId + " .tab-left .tabScrollCenter").removeClass(
        "cmp-tabs__tab--active"
      );
      $(this).addClass("cmp-tabs__tab--active");
      $("#" + parId + " .tab-left").scrollCenter(".cmp-tabs__tab--active", 300);
    });
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

$(document).on("click", function (event) {
  var $trigger = $(".close-on-outside");
  if ($trigger !== event.target && !$trigger.has(event.target).length) {
    $(".share-bundle-menu").removeClass("active");
    if ($(window).width() < 992) {
      $(".jsMobOverviewsLink").removeClass("opened");
      $(".mob-overviews-accodian").slideUp();
    }
  }
});

var socialbtn = document.querySelectorAll('.social-btn');
socialbtn.forEach(function(item){
    item.addEventListener('click',function (e) {
            e.preventDefault();
            switch ($(this).attr('data-share')) {
                case 'whatsapp-icon':
                    var shareUrl=$(this).data('shareurl');
                    console.log('whatsapp');
                    window.open("https://api.whatsapp.com/send?text=" + shareUrl);
                    break;
                case 'facebook-icon':
                    var shareUrl=$(this).data('shareurl');
                    console.log('facebook');
 					window.open("https://facebook.com/sharer/sharer.php?u\x3d" + shareUrl, "width\x3d370,height\x3d300");
                    break;
                case 'twitter-share':
                    var shareUrl=$(this).data('shareurl');
                    console.log('twitter');
					var twittWindow = window.open('https://twitter.com/share?url=' + shareUrl, 'height=350,width=600');
                    break;

            }
        });

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
$(".jsCopyLink").click(function () {
  $(".jsCopyLink").removeClass("copied");
  $(this).addClass("copied");
  $(this).find(".text-copy").text("Copied");
  setTimeout(function () {
    $(".jsCopyLink").removeClass("copied");
    $(".jsCopyLink .text-copy").text("Copy");
  }, 2500);
});

var copyBtn = document.querySelectorAll('.jsCopyLink');
copyBtn.forEach(function (item) {
  item.addEventListener('click', function (e) {
    var shareUrl = $(this).data('shareurl');
    navigator.clipboard.writeText(shareUrl);
  })
});
if ($(window).width() < 992) {
  var showChar = 58;
}
if ($(window).width() < 374) {
  var showChar = 48;
}
else {
  var showChar = 48;
}

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

var simpleBarTimeout = setTimeout(simpleBar, 2000);
/*simple scroll bar*/
function simpleBar() {
  if ($(".simple-bar").length > 0) {
    $(".simple-bar").each(function (e) {
      new SimpleBar($(".simple-bar")[e]);
    });
  }
}


/*document required slider*/
if ($(window).width() > 991) {
  if ($(".jsDocumentRequiredSlider").hasClass("slick-initialized")) {
    $(".jsDocumentRequiredSlider").slick("unslick");
  }
} else {
  $(".jsDocumentRequiredSlider")
    .not(".slick-initialized")
    .slick({
      dots: true,
      infinite: false,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
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
          },
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
            centerMode: true,
            centerPadding: "30px",
            infinite: false,
            dots: true,
          },
        },
      ],
    });
}
/*document required slider*/

/*Convenience Slider*/
if ($(window).width() > 991) {
  if ($(".jsTieSlider").hasClass("slick-initialized")) {
    $(".jsTieSlider").slick("unslick");
  }
} else {
  $(".jsTieSlider")
    .not(".slick-initialized")
    .slick({
      dots: true,
      infinite: false,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
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
          },
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
            centerMode: true,
            centerPadding: "30px",
            infinite: false,
            dots: true,
          },
        },
      ],
    });
}


/*instant loan in your city start*/
$(window).resize(function () {
  $('.slick-slider').slick('refresh');
  header_fixed();
});

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

$('.js-personal-loan-slider').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
  if ($('.js-personal-loan-slider .item').length <= 4) {
    if ($(window).width() > 1199) {
      $('.js-personal-loan-slider').removeClass('slider-dots slick-dotted');
    }
  }
  else {
    $('.js-personal-loan-slider').addClass('slider-dots slick-dotted');
  }
});

const personalLoanSlider = {
  dots: true,  //feedback changes 22-12-2022 (revert 08-03-2023)
  infinite: false,
  speed: 300,
  slidesToShow: 4,
  slidesToScroll: 4,
  arrows: false,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      }
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      }
    },
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
      }
    },
    {
      breakpoint: 700,
      settings: {
        slidesToShow: 1,
        centerMode: true,
        centerPadding: "30px",
        infinite: false,
        dots: true,
      }
    }
  ]
};


sliderFunc($(".jsInstantSlider"), InstantSlider);
sliderFunc($('.js-personal-loan-slider'), personalLoanSlider);
/*instant loan in your city end*/