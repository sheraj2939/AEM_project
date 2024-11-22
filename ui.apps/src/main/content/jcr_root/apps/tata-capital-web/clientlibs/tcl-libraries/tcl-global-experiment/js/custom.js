$(document).ready(function () {

  /*Header mneu on hover 2-6-2023 */ 
  $('.jsMenuLinks .tab-menu-item [tab-menu]').hover(function(){
		var tab_id = $(this).attr('tab-menu');
    var tabMenu = $(this).attr("tab-menu");
    console.log(tab_id);
		$(this).parents('.jsMainMenu').find('.jsMenuLinks .tab-menu-item [tab-menu]').removeClass('active');
		$(this).addClass('active');
    $(this).parents('.jsMainMenu').find('.loan-info-box').addClass('d-none');		
		$("#"+tab_id).removeClass('d-none');
    $(this).parents("[tab-wrapper]").find('[tab-contnet="' + tabMenu + '"]').removeClass("d-none");
	})
  /*Header mneu on hover 2-6-2023*/ 

  $('[data-footer]').click(function(e){
    var menuLinkText =  e.currentTarget.textContent;
    if(menuLinkText){
        menuLinkText = menuLinkText.trim();
    }
    if(menuLinkText === ""){
        var menuLinkText = e.currentTarget.dataset.imgContent;
        if(menuLinkText){
            menuLinkText = menuLinkText.trim();
        }
    }
    var componentName =  e.currentTarget.dataset.footer.split('-')[0];
    var productCode = productCodeId;
    if(e.currentTarget.dataset.footer.split('-')[1]){
        var menuTitle = e.currentTarget.dataset.footer.split('-')[1];
    }else{
        var menuTitle = "";
    }
    menuInteraction(menuLinkText,componentName,menuTitle,productCode);
});

$('[data-img-content-social]').click(function(e){
    var componentName = e.currentTarget.dataset.imgContentSocial.split("-")[0];
    if(e.currentTarget.dataset.imgContentSocial){
        ctaTitle = e.currentTarget.dataset.imgContentSocial.split("-")[1];
        iconName = e.currentTarget.dataset.imgContentSocial.split("-")[1];
    }
    socialmediaiconClick(componentName,ctaTitle,iconName)
}); 

  // numeric input validation
  $(".only-numeric-input").keyup(function (e) {
    $(this).val($(this).val().replace(/\D/g, ""));
  });

  input_animation();
  input_animation_new();

  $(".jsCopyLink").click(function () {
    $(".jsCopyLink").removeClass("copied");
    $(this).addClass("copied");
    $(this).find(".text-copy").text("Copied");
    setTimeout(function () {
      $(".jsCopyLink").removeClass("copied");
      $(".jsCopyLink .text-copy").text("Copy");
    }, 2500);
  });
  $('.disable-emoji').bind('input', function() {
    // console.log('df')
    var val = $(this).val();
    var emojiRegex = /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;
    val = val.replace(emojiRegex, '')
    $(this).val(val);
  });
  $(document).on("click", function (event) {
    var $trigger = $(".close-on-outside");
    if ($trigger !== event.target && !$trigger.has(event.target).length) {
      $("[data-rel]").removeClass("active");
      $(".dropdown-block").removeClass("show");
    }
  });

  /*header Search dropdown js*/
  $.fn.hasAttr = function (dropdown) {
    return this.attr(dropdown) !== undefined;
  };

  /*modal js*/
  $('[data-popovermodal="popover-modal"]').click(function () {
    var ele_target = $(this).attr("data-target");
    setTimeout(function () {
      $(ele_target).addClass("popover-show");
      $(".slick-slider").slick("refresh");
    }, 80);
    $(ele_target).css("display", "block");
    $("body").addClass("popover-modal-open");
    $("body").append('<div class="modal-backdrop"></div>');
    $(".js-sticky-actions").removeClass("active");
  });

  $('[data-dismiss="popover-modal"]').on("click", function () {
    $(this).parents(".popover-modal").removeClass("popover-show");
    $(this).parents(".popover-modal").removeAttr("style");
    $(".height-scroll").removeAttr("style");
    $("body").removeClass("popover-modal-open");
    $(".modal-backdrop").remove();
    var src = $("#video-modal iframe").attr("src");
    $("#video-modal iframe").attr("src", "");
    $("#video-modal iframe").attr("src", src);
  });
  /*modal js*/

  $(".js-showDetail").click(function () {
    $("body").addClass("scroll-hide");
    ele_showDetail = $(this).attr("data-value");
    $(".js-close-details").removeClass("active-sub");
    $("#" + ele_showDetail).addClass("active-sub");
    $(".mob-inner-header").addClass("d-none");
  });

  $(".js-menu-back").click(function () {
    $("body").addClass("scroll-hide");
    $(this).parents(".js-close-details").removeClass("active-sub");
    $(".mob-inner-header").removeClass("d-none");
  });

  /* menu tab start */
  $("[tab-menu]").click(function (e) {
    /*e.preventDefault();*/
    var tabMenu = $(this).attr("tab-menu");
    $(this).parents("[tab-wrapper]").find("[tab-menu]").removeClass("active");
    $(this).addClass("active");
    $(this).parents("[tab-wrapper]").find("[tab-contnet]").addClass("d-none");
    $(this)
      .parents("[tab-wrapper]")
      .find('[tab-contnet="' + tabMenu + '"]')
      .removeClass("d-none");
  });
  /* menu tab end */

  /* Footer JS */
  $(".footer-main-content .footer-row .footer-headings").each(function () {
    $(this).click(function () {
      $(this).toggleClass("active");
      $(this).siblings(".footer-body").slideToggle();
      $(this)
        .parents(".footer-row")
        .siblings(".footer-row")
        .find(".footer-headings")
        .removeClass("active");
      $(this)
        .parents(".footer-row")
        .siblings(".footer-row")
        .find(".footer-body")
        .slideUp();
      $(this)
        .parents(".footer-main-content")
        .siblings(".our-other-websites")
        .find(".footer-headings")
        .removeClass("active");
      $(this)
        .parents(".footer-main-content")
        .siblings(".our-other-websites")
        .find(".our-websites-inner")
        .slideUp();
    });
  });
  $(".jsAccordian [accod-head]").each(function (ele) {
    $(this).click(function () {
      $(this).toggleClass("active");
      $(this).siblings("[accod-body]").slideToggle("100");
      $(this)
        .parents("[accod-row]")
        .siblings("[accod-row]")
        .find("[accod-head]")
        .removeClass("active");
      $(this)
        .parents("[accod-row]")
        .siblings("[accod-row]")
        .find("[accod-body]")
        .slideUp();
      $(this)
        .parents(".our-other-websites")
        .siblings(".footer-main-content")
        .find(".footer-col .footer-headings")
        .removeClass("active")
        .siblings(".footer-body")
        .slideUp();
    });
  });
  /*12-6-2023*/ 
  $('.jsAccordian2 [accod-head]').each(function (ele) {
    $(this).click(function () {      
      $(this).parents('.subsub-head').toggleClass('active');
      $(this).parents('.subsub-head').siblings('[accod-body]').slideToggle('100');
      $(this).parents('.subsub-head').parents('[accod-row]').siblings('[accod-row]').find('.subsub-head').removeClass('active');
      $(this).parents('.subsub-head').parents('[accod-row]').siblings('[accod-row]').find('[accod-body]').slideUp();      
    })
  })
  /*12-6-2023*/ 

  /*sub accordian*/
  $(".js-sub-accordian [subaccord-head]").each(function (ele) {
    $(this).click(function () {
      $(this).toggleClass("subs-opned");
      $(this).siblings("[subaccord-body]").slideToggle();
      $(this)
        .parents("[subaccord-row]")
        .siblings("[subaccord-row]")
        .find("[subaccord-head]")
        .removeClass("subs-opned");
      $(this)
        .parents("[subaccord-row]")
        .siblings("[subaccord-row]")
        .find("[subaccord-body]")
        .slideUp();
    });
  });
  /*sub accordian*/
/*12-6-2023 sub accordian*/
$('.js-sub-accordian2 [subaccord-head]').each(function (ele) {
  $(this).click(function () {
    $(this).toggleClass('subs-opned2');
    $(this).parents('.subaccord-head').siblings('[subaccord-body]').slideToggle();
    $(this).parents('[subaccord-row]').siblings('[subaccord-row]').find('[subaccord-head]').removeClass('subs-opned2');
    $(this).parents('[subaccord-row]').siblings('[subaccord-row]').find('[subaccord-body]').slideUp();
  })
})
/*12-6-2023 sub accordian*/


  /* Accordian Js */
  $('[data-collapse="collapse"]')
    .off("click")
    .on("click", function (ele) {
      if (ele.currentTarget.dataset.footer.split('-')[0] == "footerAnalyticData") {
        var menuLinkText = ele.currentTarget.text;
        if (menuLinkText) {
          menuLinkText = menuLinkText.trim();
        }
        if (menuLinkText === "") {
          var menuLinkText = ele.currentTarget.dataset.imgContent;
          if (menuLinkText) {
            menuLinkText = menuLinkText.trim();
          }
        }
        if(ele.currentTarget.dataset.footer){
          var componentName = ele.currentTarget.dataset.footer.split('-')[0];
        }
        var productCode = productCodeId;
        if (ele.currentTarget.dataset.footer) {
          var menuTitle = ele.currentTarget.dataset.footer.split('-')[1];
        } else {
          var menuTitle = "";
        }
        menuInteraction(menuLinkText, componentName, menuTitle, productCode);
      }
      var ele_parents = $(ele.currentTarget).parents(".accrodian").attr("id");
      var ele_target = $(this).data("target");
      if ($(this).parent(".nav-tablist").hasClass("active")) {
        $(this).parent(".nav-tablist").removeClass("active");
      } else {
        $(ele.currentTarget)
          .parents(".navTab")
          .find(".nav-tablist")
          .removeClass("active");
        $(this).parent(".nav-tablist").addClass("active");
      }
      if (
        $(this)
          .parents("#" + ele_parents)
          .find("#" + ele_target)
          .css("display") == "block"
      ) {
        $("#" + ele_parents)
          .find("#" + ele_target)
          .hide();
      } else {
        $("#" + ele_parents)
          .find(".tab-panel")
          .hide();
        $("#" + ele_parents)
          .find("#" + ele_target)
          .show();
      }
    });

  $('[data-toggle="collapse"]')
    .off("click")
    .on("click", function (ele) {
      var menuLinkText = ele.currentTarget.textContent;
    if (menuLinkText) {
      menuLinkText = menuLinkText.trim();
    }
    if (menuLinkText === "") {
      var menuLinkText = ele.currentTarget.dataset.imgContent;
      if (menuLinkText) {
        menuLinkText = menuLinkText.trim();
      }
    }
    if(ele.currentTarget.dataset.footer){
      var componentName = ele.currentTarget.dataset.footer.split('-')[0];
    }
    var productCode = productCodeId;
    if (ele.currentTarget.dataset.footer) {
      var menuTitle = ele.currentTarget.dataset.footer.split('-')[1];
    } else {
      var menuTitle = "";
    }
    menuInteraction(menuLinkText, componentName, menuTitle, productCode);
      var ele_parents = $(ele.target).parents(".accrodian").attr("id");

      $("#" + ele_parents)
        .find(".collapse")
        .slideUp();
      $("#" + ele_parents)
        .find('[data-toggle="collapse"]')
        .attr("aria-expanded", "false");
      if ($(ele.target).parent().siblings().css("display") == "block") {
        $(ele.target).parent().siblings().slideUp();
        $(ele.target).attr("aria-expanded", "false");
      } else {
        $(ele.target).parent().siblings().slideDown();
        $(ele.target).attr("aria-expanded", "true");
      }
    });

  /* hamburger menu start */
  $(".hamburger-menu").click(function () {
    this.classList.toggle("animate-hamburger");
    $(".mob-inner-header").removeClass("d-none");
    $("body").toggleClass("scroll-hide");
    /*2-12-2022*/
    $(".header-inner").toggleClass("backdrops");
    /*2-12-2022*/
    $(".mob-header").toggleClass("opened");
    $(".js-close-details").removeClass("active-sub");
    /*3-1-2023*/
    if ($(window).width() < 768) {
      $("body").removeClass("scroll-hide-xs");
      $(".header-inner").removeClass("backdrops-xs");
    }
    /*3-1-2023*/
  });
  /* hamburger menu end */

  $(".header-menu .menu-item").hover(function () {
    $(".dropdown-block").removeClass("show");
    $('[data-rel="login"]').removeClass("active");
  });

  /*17-10-2022*/
  if ($(window).width() > 991) {
    $(".header-overlay").remove();
    $(".header-menu .menu-item .nav-link-dropdown")
      .parents(".menu-item")
      .hover(
        function () {
          var abc = $(".header-inner").outerHeight();
          $(".header-backdrop").append('<div class="header-overlay"></div>');
          $(".header-overlay").css("top", abc);
        },
        function () {
          $(".header-overlay").remove();
        }
      );
  }
  /*17-10-2022*/

 /* 2-6-2023*/ 
  /*main-mobile menu js 26-5-2023*/
  // $('.js-mobsubmenu .js-accord-col-mob .submenu-head').each(function () {
  //   $(this).click(function () {
  //     $(this).toggleClass('main-opened');
  //     $(this).siblings('.accord-body').slideToggle();
  //     $(this).parents('.js-accord-col-mob').siblings('.js-accord-col-mob').find('.submenu-head').removeClass('main-opened');
  //     $(this).parents('.js-accord-col-mob').siblings('.js-accord-col-mob').find('.accord-body').slideUp();
  //   })
  // })

  $('.js-mobsubmenu .js-accord-col-mob .submenu-head .submenu-head-arrow').each(function () {
    $(this).click(function () {      
      $(this).parents('.submenu-head').toggleClass('main-opened');
      $(this).parents('.submenu-head').siblings('.accord-body').slideToggle();
      $(this).parents('.js-accord-col-mob').siblings('.js-accord-col-mob').find('.submenu-head').removeClass('main-opened');
      $(this).parents('.js-accord-col-mob').siblings('.js-accord-col-mob').find('.accord-body').slideUp();
    })
  })
  /*main-mobile menu js 26-5-2023*/
  /* 2-6-2023*/ 

  $("[dismiss-rel]").on("click", function () {
    var $id = $(this).attr("dismiss-rel");
    $("[data-rel]").removeClass("active");
    $("#" + $id).removeClass("show");
    /*3-1-2023*/
    if ($(window).width() < 768) {
      $("body").removeClass("scroll-hide-xs");
      $(".header-inner").removeClass("backdrops-xs");
    }
    /*3-1-2023*/
  });

  $("[data-rel]").on("click", function () {
    var $id = $(this).attr("data-rel");
    if ($("#" + $id).css("display") == "none") {
      $(".dropdown-block").removeClass("show");
      $("[data-rel]").removeClass("active");
      /*3-1-2023*/
      $("body").removeClass("scroll-hide-xs");
      $(".header-inner").removeClass("backdrops-xs");
      /*3-1-2023*/
      $(this).addClass("active");
      $("#" + $id).addClass("show");
      if($id == "updatesList"){
        mogoSound();
      }
      /*3-1-2023*/
      if ($(window).width() < 768) {
        /*after clicking on dropdown item
        $(this).parents("body").addClass("scroll-hide-xs");*/
        $(this).parents(".header-inner").addClass("backdrops-xs");
      }
      /*3-1-2023*/
    } else {
      $("[data-rel]").removeClass("active");
      $("#" + $id).removeClass("show");
      /*3-1-2023*/
      if ($(window).width() < 768) {
        $("body").removeClass("scroll-hide-xs");
        $(".header-inner").removeClass("backdrops-xs");
      }
    }
  });

     /*1-02-2023*/
     $('.js-actions-toggle').click(function () {
      $('.js-sticky-actions').toggleClass('active');
      $('.sticky-quick-link').removeClass('active')
    })
  
    //left sticky
    $('.jsLeftSticky').on('click', function (){
      $('.sticky-quick-link').toggleClass('active');
      $('.js-sticky-actions').removeClass('active');
    })
  
  
    $(document).on("click", function (event) {
      var $trigger = $(".close-on-outside");
      if ($trigger !== event.target && !$trigger.has(event.target).length) {
        $('.sticky-quick-link').removeClass('active');
        $(".js-sticky-actions").removeClass("active");
      }
    });
    /*1-02-2023*/
  /*$(".js-actions-toggle").click(function () {
    $(".js-sticky-actions").toggleClass("active");
  });*/

  // Financial insights share outside clicking hide content
  $(document).on("click", function (event) {
    var $trigger = $(".close-on-outside");
    if ($trigger !== event.target && !$trigger.has(event.target).length) {
      $(".share-bundle-menu").removeClass("active");

      if ($(window).width() < 992) {
        $(".jsMobOverviewsLink").removeClass("opened");
        $(".mob-overviews-accodian").slideUp();
      }
      /*3-1-2023*/
      if ($(window).width() < 768) {
        $("body").removeClass("scroll-hide-xs");
        $(".header-inner").removeClass("backdrops-xs");
      }
      /*3-1-2023*/
    }
  });

  leftScrollMenu();
  /*way to service*/
  if ($(window).width() < 992) {
    $(".tab-left .jsTabSelect").on("click", function () {
      var parId = $(this).parent().parent().attr("id");
      $("#" + parId + " .tab-left .jsTabSelect").removeClass("active");
      $(this).addClass("active");
      $("#" + parId + " .tab-left").scrollCenter(".active", 300);
    });
  }
  /*way to service*/

  /*Financial insights end*/

  if ($(window).width() < 992) {
    $(".fi-share-btn").on("click", function () {
      $("." + this.id).toggleClass("active");
    });
  }
  /*Financial insights end*/

  if ($(window).width() < 992) {
    $("[data-rel]").click(function () {
      $("body").removeClass("scroll-hide");
      $(".mob-header").removeClass("opened");
      $(".hamburger-menu").removeClass("animate-hamburger");
      $(".js-close-details").removeClass("active-sub");
    });
  }

  function sliderFunc(sliderParent, sliderProp = sliderProperties) {
    if (sliderParent.length) {
      if (sliderParent.hasClass("slick-initialized")) {
        sliderParent.slick("unslick");
      } else {
        sliderParent.not(".slick-initialized").slick(sliderProp);
      }
    }
  }

  /*ExploreSlider Desktop slider*/
  $(".jsExploreSliderDesk").on(
    "init reInit afterChange",
    function (event, slick, currentSlide, nextSlide) {
      if ($(".jsExploreSliderDesk .explore-row").length <= 3) {
        if ($(window).width() > 1199) {
          $(".jsExploreSliderDesk").removeClass("slider-dots slick-dotted");
        }
      } else {
        $(".jsExploreSliderDesk").addClass("slider-dots slick-dotted");
      }
    }
  );

  const ExploreSliderDesk = {
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          arrows: false,
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
        },
      },
    ],
  };
  /*ExploreSlider Desktop slider*/

  // sliderFunc($(".banner-slider"), bannerSlider);
  sliderFunc($(".jsExploreSliderDesk"), ExploreSliderDesk);

  $(".jsResultClose").click(function () {
    $(".results-box").fadeOut("fast");
  });

  $(".JsCreditCard").click(function () {
    $(".dropdown-content-wrap").css("transform", "translateY(-100%)");
  });
  $(".header-menu .menu-item .nav-link").focus(function () {
    $(".dropdown-content-wrap").removeAttr("style");
  });
  $(".header-menu .menu-item .nav-link").hover(function () {
    $(".dropdown-content-wrap").removeAttr("style");
  });

  /*lazy load*/
  const observer = lozad();
  observer.observe();
  /*lazy load*/

  /*chatbot 26-06-2023*/
  $('.chat-tia-btn .jsChatBtn').on('click', function () {
    $(this).removeClass('showing')
    $(this).addClass('hiding')
    $('.ask-tia-wrap').addClass('showing');
    $('.ask-tia-wrap').removeClass('hiding');
  })
  $('.ask-tia-wrap .cross-btn').on('click', function () {
    $('.chat-tia-btn .jsChatBtn').removeClass('hiding')
    $('.chat-tia-btn .jsChatBtn').addClass('showing')
    $('.ask-tia-wrap').addClass('hiding');
    $('.ask-tia-wrap').removeClass('showing');
  })

  /*chatbot 26-06-2023*/
});

$(window).resize(function () {
  // $(".slick-slider").slick("refresh");
  header_fixed();
});

$(window).on("load", function () {
  header_fixed();
});

$(window).on("scroll", function () {
  header_fixed();
});

/*header scroll fixed animation*/

var NAVBAR_HEIGHT = $(".header-navbar").innerHeight();
function header_fixed() {
  var windowScroll = $(window).scrollTop();
  var topbarHeight = $(".header-top").innerHeight();
  /*17-10-2022*/
  if (windowScroll >= topbarHeight) {
    $(".header-inner").addClass("affix");
    $(".header").css("padding-top", NAVBAR_HEIGHT + topbarHeight);
    if ($(window).width() > 991) {
      $(".header-overlay").css("top", topbarHeight);
    }
  } else {
    $(".header-inner").removeClass("affix");
    $(".header").css("padding-top", 0);
    $(".js-headerTopSlider").slick("refresh");
  }
  /*17-10-2022*/
}

// validation mobile
function validateMobile(mobileField) {
  var mobRagex = /^[6-9][0-9]{9}$/;
      var check = mobRagex.test($(mobileField).val());
      if ($(mobileField).val().length != 10 || !check) {
        return false;
      } else {
        return true;
      }
}

function input_animation() {
  $(".form-textbox .input-textbox")
    .change(function () {
      if ($(this).val().length != 0) {
        $(this).parents(".form-textbox").addClass("active");
      } else if ($(this).val().length == 0) {
        $(this).parents(".form-textbox").removeClass("active");
      }
    })
    .focus(function () {
      $(this).parents(".form-textbox").addClass("active");
    })
    .blur(function () {
      if ($(this).val().length != 0) {
        $(this).parents(".form-textbox").addClass("active");
      } else if ($(this).val().length == 0) {
        $(this).parents(".form-textbox").removeClass("active");
      }
    });
}

function input_animation_new() {
  $(".form-textbox-new .input-textbox")
    .change(function () {
      if ($(this).val().length != 0) {
        $(this).parents(".form-textbox-new").addClass("active");
      } else if ($(this).val().length == 0) {
        $(this).parents(".form-textbox-new").removeClass("active");
      }
    })
    .focus(function () {
      $(this).parents(".form-textbox-new").addClass("active onchange");
    })
    .blur(function () {
      if ($(this).val().length != 0) {
        $(this).parents(".form-textbox-new").addClass("active");
        $(this).parents(".form-textbox-new").removeClass("onchange");
      } else if ($(this).val().length == 0) {
        $(this).parents(".form-textbox-new").removeClass("active");
        $(this).parents(".form-textbox-new").removeClass("onchange");
      }
    });
}

function leftScrollMenu() {
  $.fn.scrollCenter = function (elem, speed) {
    var active = jQuery(this).find(elem);
    var activeWidth = active.width() / 2;
    var pos = active.position().left + activeWidth;
    var currentscroll = jQuery(this).scrollLeft();
    var divwidth = jQuery(this).width();
    pos = pos + currentscroll - divwidth / 2;
    jQuery(this).animate(
      {
        scrollLeft: pos,
      },
      speed == undefined ? 1000 : speed
    );
    return this;
  };

  $.fn.scrollCenterORI = function (elem, speed) {
    jQuery(this).animate(
      {
        scrollLeft:
          jQuery(this).scrollLeft() -
          jQuery(this).offset().left +
          jQuery(elem).offset().left,
      },
      speed == undefined ? 1000 : speed
    );
    return this;
  };
}

/* OTP Timer */
var interval; /* Interval variable to manage timer */
var remainingTime = 180; /* Initial countdown time in seconds (3 minutes) */
var modalShown = false; /* Flag to track if the modal has been shown */

/* Function to update the timer display */
function updateTimerDisplay() {
  var minutes = Math.floor(remainingTime / 60);
  var seconds = remainingTime % 60;
  var formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  $("#timer").html(formattedTime);

  /* Check if it's time to show the "Not Receive OTP" modal and no other modal is open */
  if (seconds == 30 && minutes == 2 && !checkIfAnyModalIsOpen()) {
     /* Check if .loan-otp-timers is visible */
     if ($('.loan-otp-timers').is(':visible')) {
      showNotReceiveOTPModal();
    }
  }

  /* If the timer has reached zero, hide OTP elements */
  if (seconds <= 0 && minutes <= 0) {
    hideOTPElements();
  }
}

/* Function to check if any modal is open */
function checkIfAnyModalIsOpen() {
  var isOpen = $('.popover-modal:visible, .target-modal:visible').length > 0;
  modalShown = isOpen; /* Set modalShown to true if any modal is open */
  return isOpen;
}

/* Function to start the OTP timer */
function otpTimer() {
  updateTimerDisplay(); /* Initial display */
  interval = setInterval(function () {
    remainingTime -= 1;
    updateTimerDisplay();
    if (remainingTime <= 0) {
      clearInterval(interval);
      hideOTPElements();
    }
  }, 1000);
}

/* Event listener to detect when a modal is closed */
$('[data-dismiss="popover-modal"], #modal-close').on("click", function () {
  if (remainingTime <= 150 && modalShown) {
    showNotReceiveOTPModal();
    modalShown = false;
  }
});

/* Function to show the "Not Receive OTP" modal */
function showNotReceiveOTPModal() {
  setTimeout(function () {
    $("#not-receive-otp-modal")
      .addClass("popover-show")
      .css("display", "block");
    $(".jsModalOnGetCall").removeClass('d-none');
    $("body").addClass("popover-modal-open").append('<div class="modal-backdrop"></div>');
  }, 200);
}

/* Function to hide OTP elements */
function hideOTPElements() {
  $(".jsOnGetCall, .jsGetOTPSent").addClass("d-none");
}

/* Function to reset the timer to its original state (3 minutes) */
function resetTimer() {
  clearInterval(interval);
  remainingTime = 180;
  updateTimerDisplay();
  interval = null;
  otpTimer();
}

/* Function to pause the timer and modal when a modal is opened */
function pauseTimerAndModal() {
  clearInterval(interval); // Pause the timer
}

/* Function to resume the timer */
function resumeTimer() {
  if (interval === null) {
    otpTimer(); /* Restart the timer if it's not already running */
  }
  if (interval) {
    otpTimer(); /* Start the timer only if it's already running */
  }
}

/* Function to destroy the otpTimer */
function destroyOtpTimer() {
  clearInterval(interval);
  interval = null;
  remainingTime = 0; /* Reset the remaining time to zero */
  updateTimerDisplay(); /* Update the timer display to show 00:00 */
}

$(".jsNotReceiveOtpClose").click(function () {
  $(".jsNotReceiveOtpClose")
    .parents(".popover-modal")
    .removeClass("popover-show");
  $(".jsNotReceiveOtpClose").parents(".popover-modal").removeAttr("style");
  $(".height-scroll").removeAttr("style");
  $("body").removeClass("popover-modal-open");
  $(".modal-backdrop").remove();
  $(".jsOnGetCall").removeClass("d-none");
});

$('#otp-sent-modal .jsThanksModalClose').click(function () {
  $(".jsGetOTPSent").addClass("d-none");
  if ($('#otp-sent-modal .popover-modal-close').hasClass('jsThanksModalClose')) {
    $('.jsOnGetCall').addClass('d-none');
    $('.jsGetOTPSent').addClass('d-none')
   resetTimer();
  }
});
/* otp timer*/