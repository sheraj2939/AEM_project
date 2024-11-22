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

if ($(window).width() > 991) {
  $('.header-overlay').remove();
  $(".header-menu .menu-item .nav-link-dropdown").parents('.menu-item').hover(function () {
    var abc = $('.header-inner').outerHeight();
    /* $('.main-content').append('<div class="header-overlay"></div>'); */
    $('.header-backdrop').append('<div class="header-overlay"></div>');
    $('.header-overlay').css('top', abc);
  }, function () {
    $('.header-overlay').remove();
  });
};

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
      //left sticky
    
    
      $(document).on("click", function (event) {
        var $trigger = $(".close-on-outside");
        if ($trigger !== event.target && !$trigger.has(event.target).length) {
          $('.sticky-quick-link').removeClass('active');
          $(".js-sticky-actions").removeClass("active");
        }
      });
    
        /*  $('.js-actions-toggle').click(function () {
        $('.js-sticky-actions').toggleClass('active');
        $('.sticky-quick-link').removeClass('active')
      }) */
//Financial Insight (Blog) Share Button Open Close Event Start.
$(document).on("click", function (event) {
  var $trigger = $(".close-on-outside");
  if ($trigger !== event.target && !$trigger.has(event.target).length) {
    $('.share-bundle-menu').removeClass('active');

    if ($(window).width() < 992) {
      $(".jsMobOverviewsLink").removeClass('opened');
      $('.mob-overviews-accodian').slideUp();
    }
    /*3-1-2023*/
    if ($(window).width() < 768) {
      $('body').removeClass('scroll-hide-xs');
      $('.header-inner').removeClass('backdrops-xs');
    }
    /*3-1-2023*/
  }
});
$('.js-fi-share-btn').on('click', function(e){
  e.preventDefault();
  // e.stopImmediatePropagation();0
   if($(this).siblings('.share-bundle-menu').hasClass('active')){
    $(this).siblings('.share-bundle-menu').toggleClass('active');
    // $('.' + this.id).toggleClass('active')
  } else{
    $('.share-bundle-menu').removeClass('active');
    $(this).siblings('.share-bundle-menu').addClass('active')
  }   
  e.stopPropagation()
}); 
//Financial Insight (Blog) Share Button Open Close Event End.

//Related Share Button Open Close Event Start.
$(document).click(function (e) {
  var clicked = $(e.target);
  var opened = $(".js-close-outside").hasClass("show");
  if (opened === true && !clicked.hasClass("js-shares-btn")) {
    $(".js-close-outside").removeClass("show");
    $(".js-shares-btn").removeClass("active");
  }
});
$(".js-shares-btn").click(function () {
  if ($(this).hasClass("active")) {
    $(".js-close-outside").removeClass("show");
    $(".js-shares-btn").removeClass("active");
  } else {
    $(".js-close-outside").removeClass("show");
    $(".js-shares-btn").removeClass("active");
    $(this).toggleClass("active");
    $(this).parents(".js-close-outside").toggleClass("show");
  }
});
//Related Share Share Button Open Close Event End.

$('.jsInstantSlider').slick({
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
});
 
$('.js-fi-slider').slick({
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
});
 
$('[data-img-content-social]').click(function(e){
    var componentName = e.currentTarget.dataset.imgContentSocial.split("-")[0];
    if(e.currentTarget.dataset.imgContentSocial){
        ctaTitle = e.currentTarget.dataset.imgContentSocial.split("-")[1];
        iconName = e.currentTarget.dataset.imgContentSocial.split("-")[1];
    }
    socialmediaiconClick(componentName,ctaTitle,iconName)
}); 
$('.disable-emoji').bind('input', function() {
  // console.log('df')
  var val = $(this).val();
  var emojiRegex = /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;
  val = val.replace(emojiRegex, '')
  $(this).val(val);
});
  // numeric input validation
  $('.only-numeric-input').keyup(function (e) {
    $(this).val($(this).val().replace(/\D/g, ''));
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
  $('[data-collapse="collapse"]')
    .off("click")
    .on("click", function (ele) {
      /*Added by Nikita 20/01/2023 for analytics calling*/
      if (
        ele.currentTarget.dataset.footer.split("-")[0] == "footerAnalyticData"
      ) {
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
        var componentName = ele.currentTarget.dataset.footer.split("-")[0];
        var productCode = productCodeId;
        if (ele.currentTarget.dataset.footer.split("-")[1]) {
          var menuTitle = ele.currentTarget.dataset.footer.split("-")[1];
        } else {
          var menuTitle = "";
        }
        menuInteraction(menuLinkText, componentName, menuTitle, productCode);
      }
      /*Added by Nikita 20/01/2023 for analytics calling*/
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
          $(".main-content").append('<div class="header-overlay"></div>');
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
        /* after clicking on dropdown item
        $(this).parents("body").addClass("scroll-hide-xs"); */
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

  $(".jsMobOverviewsLink").click(function () {
    $(".mob-overviews-accodian").slideToggle();
    $(this).toggleClass("opened");
    $(this).parents(".overviews-tab-box").toggleClass("with-opens");
    /*16-3-2023*/ 
    $('.sticky-quick-link').removeClass('active');
    $('.js-sticky-actions').removeClass('active');
    /*16-3-2023*/
  });

  leftScrollMenu();

  if ($(window).width() < 992) {
    $("[data-rel]").click(function () {
      $("body").removeClass("scroll-hide");
      $(".mob-header").removeClass("opened");
      $(".hamburger-menu").removeClass("animate-hamburger");
      $(".js-close-details").removeClass("active-sub");
    });
  }

  $(".JsCreditCard").click(function () {
    $(".dropdown-content-wrap").css("transform", "translateY(-100%)");
  });
  $(".header-menu .menu-item .nav-link").focus(function () {
    $(".dropdown-content-wrap").removeAttr("style");
  });
  $(".header-menu .menu-item .nav-link").hover(function () {
    $(".dropdown-content-wrap").removeAttr("style");
  });

  /*lezy load*/
  const observer = lozad(); // lazy loads elements with default selector as '.lozad'
  observer.observe();
  /*lezy load*/
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
});

$(window).resize(function () {
  $(".slick-slider").slick("refresh");
  header_fixed();
});

$(window).on("load", function () {
  header_fixed();
});

$(window).on("scroll", function () {
  header_fixed();
});

/*floating section on scroll*/
$(".js-floating").before('<div class="floating"></div>');
$(window).scroll(function () {
  var headerHeight = $(".header-inner.affix .header-navbar").outerHeight();
  if ($(".js-floating").length > 0) {
    var ele_floating = $(".js-floating");
    var ele_height = $(ele_floating).outerHeight();
    var ele_position = $(".floating").position().top - headerHeight;
    var scrollTop = $(window).scrollTop();
    if (scrollTop >= ele_position) {
      ele_floating
        .addClass("affix")
        .css({ top: headerHeight })
        .prev(".floating")
        .css("height", ele_height);
    } else {
      ele_floating
        .removeClass("affix")
        .css({ top: "0" })
        .prev(".floating")
        .css("height", "0");
    }
  }
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

// validation mobile
function validateMobile(mobileField) {
  var re = /^[6-9][0-9]{9}$/;
  var check = re.test($(mobileField).val());
  if ($(mobileField).val().length != 10 || !check) {
    return false;
  } else {
    return true;
  }
}