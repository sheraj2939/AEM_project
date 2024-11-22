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

document.querySelectorAll(".social-btn").forEach(function(c) {
  c.addEventListener("click", function(a) {
      a.preventDefault();
      switch ($(this).attr("data-share")) {
      case "whatsapp-icon":
          a = $(this).data("shareurl");
          console.log("whatsapp");
          window.open("https://api.whatsapp.com/send?text\x3d" + a);
          break;
      case "facebook-icon":
          a = $(this).data("shareurl");
          console.log("facebook");
          window.open("https://facebook.com/sharer/sharer.php?u\x3d" + a, "width\x3d370,height\x3d300");
          break;
      case "twitter-share":
          a = $(this).data("shareurl"),
          console.log("twitter"),
          window.open("https://twitter.com/share?url\x3d" + a, "height\x3d350,width\x3d600")
      }
  })
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
  
//more business for for you start
$(".js-personal-loan-slider").slick({
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
})
//more business for for you end
$(window).resize(function () {
    $('.slick-slider').slick('refresh');
    header_fixed();
});

//instant loan in your city start
function sliderFunc(sliderParent, sliderProp = sliderProperties) {
    if (sliderParent.length) {
        if (sliderParent.hasClass("slick-initialized")) {
            sliderParent.slick("unslick");
        } else {
            sliderParent.not(".slick-initialized").slick(sliderProp);
        }
    }
}

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

sliderFunc($(".jsInstantSlider"), InstantSlider)
//instant loan in your city end

/*document required slider*/
if ($(window).width() > 991) {
    if ($('.jsDocumentRequiredSlider').hasClass('slick-initialized')) {
      $('.jsDocumentRequiredSlider').slick('unslick');
    }
  } else {
    if($('.jsDocumentRequiredSlider').length > 0){
      $('.jsDocumentRequiredSlider').not('.slick-initialized').slick({
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
              centerPadding: "30px",
              infinite: false,
            }
          },
          {
            breakpoint: 576,
            settings: {
              slidesToShow: 1,
              centerMode: true,
              centerPadding: "30px",
              infinite: false,  
              dots: true,
            }
          }
        ]
      });
    }
  }
  /*document required slider*/

var simpleBarTimeout = setTimeout(simpleBar, 2000);
/*simple scroll bar*/
function simpleBar() {
    if ($(".simple-bar").length > 0) {
        $(".simple-bar").each(function (e) {
            new SimpleBar($(".simple-bar")[e]);
        });
    }
}