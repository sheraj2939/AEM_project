$(document).ready(function () {
  /*get app js*/
  // $('.only-numeric-input').keyup(function (e) {
  //   $(this).val($(this).val().replace(/[^\d.-]/g, ''));
  // });

  // numeric input validation
  // $('.only-alpha-numeric').keyup(function (e) {
  //   $(this).val($(this).val().replace(/^[a-zA-Z0-9_.-]*$/));
  // });

  /*5-10-2023*/ 
  $(".numericOnlyInput").keypress(function (e) {    
    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {      
       return false;
   }
  });
  /*5-10-2023*/ 

  /*11-9-2023*/ 
  $('.jsGetValue .custom-checkbox-label').click(function(){
    var dropsValue = $(this).text();
    $(this).parents('.filter-drop-wrap').find('.jsShowDrop').text(dropsValue);
    $(this).parents('.jsGetValue').find('li').removeClass('actives');
    $(this).parents('li').addClass('actives');
    $(this).parents('.filter-drop-wrap').find('.jsShowDrop').removeClass('active');
    $(this).parents('.filter-drop-wrap').find('.jsDropdownBlock').removeClass('show');
  })  
  if ($('.jsNewsLetterList li').length < 6) {
    $('.jsNewsLetterList').parents('.general-info-bottom').siblings('.general-info-load').addClass('d-none');
  }
  $('.jsNewsLetterList li').slice(0, 5).show();
  $("#jsGeneralInfoLoadMore").on('click', function (e) {
    e.preventDefault();
    $(".jsNewsLetterList li:hidden").slice(0, 3).fadeIn();
    if ($(".jsNewsLetterList li:hidden").length == 0) {
      $("#jsGeneralInfoLoadLess").removeClass('d-none').fadeIn('slow');
      $("#jsGeneralInfoLoadMore").hide();
    }
  });
  $("#jsGeneralInfoLoadLess").on('click', function (e) {
    e.preventDefault();
    $('.jsNewsLetterList li:not(:lt(5))').fadeOut();
    $("#jsGeneralInfoLoadMore").fadeIn('slow');
    $("#jsGeneralInfoLoadLess").hide();
  });
  /*11-9-2023*/ 

  /*Header mneu on hover 2-6-2023 */
  $(".jsMenuLinks .tab-menu-item [tab-menu]").hover(function () {
    var tab_id = $(this).attr("tab-menu");
    console.log(tab_id);
    $(this)
      .parents(".jsMainMenu")
      .find(".jsMenuLinks .tab-menu-item [tab-menu]")
      .removeClass("active");
    $(this).addClass("active");
    $(this).parents(".jsMainMenu").find(".loan-info-box").addClass("d-none");
    $("#" + tab_id).removeClass("d-none");
  });
  /*Header mneu on hover 2-6-2023*/

  // aplhabet input validation
  $(".only-alpha-input").keypress(function (e) {
    if (String.fromCharCode(e.keyCode).match(/[^a-zA-Z ]/g)) {
      return false;
    }
  });
  $(".alpha-numeric-input").keyup(function (e) {
    $(this).val(
      $(this)
        .val()
        .match(/^[a-zA-Z0-9\s]+/g, "")
    );
  });

  /*single decmal 26-5-2023*/
  $(".single-dot").keypress(function (event) {
    if (event.which == 46 && $(this).val().indexOf(".") != -1) {
      event.preventDefault();
    } // prevent if already decimal point

    if (event.which != 46 && (event.which < 48 || event.which > 57)) {
      event.preventDefault();
    } // prevent if not number/dot
  });
  /*single decmal*/

  /*emoji disabled*/
  $(".disable-emoji").keyup(function () {
    var val = $(this).val();
    var emojiRegex =
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;
    val = val.replace(emojiRegex, "");
    $(this).val(val);
  });
  /*emoji disabled*/
  /*26-5-2023*/

  /*6-4-2023*/
  //replaces Emoji
  // $('.disable-emoji').keyup(function () {
  //   var val = $(this).val();
  //   var emojiRegex = /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;
  //   val = val.replace(emojiRegex, '')
  //   $(this).val(val);
  // })
  /*6-4-2023*/

  /*11-4-2023*/
  $(".disable-emoji").bind("input", function () {
    // console.log('df')
    var val = $(this).val();
    var emojiRegex =
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;
    val = val.replace(emojiRegex, "");
    $(this).val(val);
  });
  /*11-4-2023*/

  /*investment slider*/
  const InvestmentSlider = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          arrows: false,
          dots: true,
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          dots: true,
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          dots: true,
          slidesToShow: 1,
          arrows: false,
          centerMode: true,
          centerPadding: "30px",
        },
      },
      {
        breakpoint: 576,
        settings: {
          dots: true,
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "30px",
        },
      },
    ],
  };
  /*investement slider*/

  /*our logo slider*/
  const OurLogoSlider = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          arrows: false,
          dots: true,
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          arrows: false,
          dots: true,
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          dots: true,
          slidesToShow: 2,
          arrows: false,
          centerMode: true,
          centerPadding: "30px",
        },
      },
      {
        breakpoint: 576,
        settings: {
          dots: true,
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "30px",
        },
      },
    ],
  };
  /*our logo slider*/

  $(".input-filebox").on("change", function () {
    $(".custom-file-input .no-file-text").text(this.files.item(0).name);
  });

  $(".only-numeric-decimal-input").keyup(function (e) {
    $(this).val(
      $(this)
        .val()
        .replace(/[^\d,-]/g, "")
    );
  });

  // numeric input validation
  $(".only-numeric-input").keyup(function (e) {
    $(this).val(
      $(this)
        .val()
        .replace(/[^\d-]/g, "")
    );
  });

  // numeric input with decimal allowed validation
  $(".only-numeric-input-with-decimal").keyup(function (e) {
    $(this).val(
      $(this)
        .val()
        .replace(/[^\d.-]/g, "")
    );
  });

  $(".price-only-comma").keyup(function () {
    if ($(this).val() != "") {
      var rupeeValue = parseFloat($(this).val().replace(/,/g, ""));
      commaSeparatedValue = rupeeValue.toLocaleString("en-IN");
      $(this).val(commaSeparatedValue);
    }
  });

  input_animation();
  input_animation_new();

  /*Login profile js*/
  // $(document).mouseup(function (e) {
  //   var container = $('.custom-login-dropdown');
  //   if (!container.is(e.target) && container.has(e.target).length === 0) {
  //     $('.custom-login-container').addClass('d-none');
  //     // $('.jsLoginProfile').removeClass('active');
  //     // $('.custom-login-container').removeClass('opened-mob-login');

  //     // if ($(window).width() < 992) {
  //     //   $('body').removeClass('scroll-hide');
  //     // }

  //   }
  // });

  $(".jsCopyLink").click(function () {
    $(".jsCopyLink").removeClass("copied");
    $(this).addClass("copied");
    $(this).find(".text-copy").text("Copied");
    setTimeout(function () {
      $(".jsCopyLink").removeClass("copied");
      $(".jsCopyLink .text-copy").text("Copy");
    }, 2500);
  });

  $(document).on("click", function (event) {
    var $trigger = $(".close-on-outside");
    if ($trigger !== event.target && !$trigger.has(event.target).length) {
      $("[data-rel]").removeClass("active");
      $(".dropdown-block").removeClass("show");
      /*10-01-2023*/
      $(".jsDropdownBlock").removeClass("show");
      /*10-01-2023*/
    }
  });

  /*header Search dropdown js*/
  $.fn.hasAttr = function (dropdown) {
    return this.attr(dropdown) !== undefined;
  };

  $(".js-close-outside .share-bundle-menu").click(function (e) {
    e.stopPropagation();
  });

  $(".jsParaMore").click(function () {
    $(this)
      .parents(".jsParaOuter")
      .find(".para-remain-content")
      .toggleClass("d-none");
    if ($(this).hasClass("actives")) {
      $(this).removeClass("actives");
      $(this).text("View More");
    } else {
      $(this).addClass("actives");
      $(this).text("View Less");
    }
  });

  var src = $("#video-modal iframe").attr("src");
  /*27-10-2023*/ 
  var src1 = $("#videos-outer iframe").attr("src");
  /*27-10-2023*/ 

  /*modal js*/
  var modaltimer;
  $('[data-popovermodal="popover-modal"]').click(function () {
    var ele_target = $(this).attr("data-target");

    modaltimer = setTimeout(function () {
      $(ele_target).addClass("popover-show");
      /*5-1-2023*/
      $(".slick-slider").slick("refresh");
      /*5-1-2023*/
    }, 80);

    $("#video-modal iframe").attr("src", src);
    /*27-10-2023*/ 
    $("#videos-outer iframe").attr("src", src1);
    /*27-10-2023*/ 

    $(ele_target).css("display", "block");
    $("body").addClass("popover-modal-open");
    $("body").append('<div class="modal-backdrop"></div>');
    $(".js-sticky-actions").removeClass("active");
  });

  $('[data-dismiss="popover-modal"]').on("click", function () {
    clearTimeout(modaltimer);

    $(this).parents(".popover-modal").removeClass("popover-show");
    $(this).parents(".popover-modal").removeAttr("style");
    $(".height-scroll").removeAttr("style");
    $("body").removeClass("popover-modal-open");
    $(".modal-backdrop").remove();

    // var src = $('#video-modal iframe').attr('src');
    $("#video-modal iframe").attr("src", "");
    /*7-11-2023*/ 
    $("#videos-outer iframe").attr("src", "");
    /*7-11-2023*/ 

    /* 28-08-2023*/
    $(".jsGetOTPSent").addClass("d-none");
    clearOtpTimer();
    otpTimer();
    /* 28-08-2023*/
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

  /*4-5-2023 remove header over for back button*/
  $(".header .loan-card .loan-card-link").click(function () {
    $(".header-overlay").remove();
  });
  /*4-5-2023 remove header over for back button*/

  /* header top slider start */
  $(".js-headerTopSlider").slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  });
  /* header top slider end */

  /* menu tab start */
  $("[tab-menu]").click(function (e) {
    e.preventDefault();
    var tabMenu = $(this).attr("tab-menu");
    console.log(tabMenu);
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
  $(".jsAccordian2 [accod-head]").each(function (ele) {
    $(this).click(function () {
      $(this).parents(".subsub-head").toggleClass("active");
      $(this)
        .parents(".subsub-head")
        .siblings("[accod-body]")
        .slideToggle("100");
      $(this)
        .parents(".subsub-head")
        .parents("[accod-row]")
        .siblings("[accod-row]")
        .find(".subsub-head")
        .removeClass("active");
      $(this)
        .parents(".subsub-head")
        .parents("[accod-row]")
        .siblings("[accod-row]")
        .find("[accod-body]")
        .slideUp();
    });
  });
  /*12-6-2023*/

  /*new seconday nav accordian 10-2-2023*/
  $(".jsNavAccordian [accod-head]").each(function (ele) {
    $(this).click(function () {
      $(this).parents(".accord-heads").toggleClass("active");
      $(this)
        .parents(".accord-heads")
        .siblings("[accod-body]")
        .slideToggle("100");
      $(this)
        .parents("[accod-row]")
        .siblings("[accod-row]")
        .find(".accord-heads")
        .removeClass("active");
      $(this)
        .parents("[accod-row]")
        .siblings("[accod-row]")
        .find("[accod-body]")
        .slideUp();
    });
  });
  /*new seconday nav accordian 10-2-2023*/

  $(".jsFaqActive [accod-head]").each(function (ele) {
    $(this).click(function () {
      $(this).parents("[accod-row]").toggleClass("add-bg");
      $(this)
        .parents("[accod-row]")
        .siblings("[accod-row]")
        .removeClass("add-bg");
    });
  });

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
  $(".js-sub-accordian2 [subaccord-head]").each(function (ele) {
    $(this).click(function () {
      $(this).toggleClass("subs-opned2");
      $(this)
        .parents(".subaccord-head")
        .siblings("[subaccord-body]")
        .slideToggle();
      $(this)
        .parents("[subaccord-row]")
        .siblings("[subaccord-row]")
        .find("[subaccord-head]")
        .removeClass("subs-opned2");
      $(this)
        .parents("[subaccord-row]")
        .siblings("[subaccord-row]")
        .find("[subaccord-body]")
        .slideUp();
    });
  });
  /*12-6-2023 sub accordian*/

  /* Accordian Js */
  $('[data-accordian="tab"]').click(function (ele) {
    var ele_parents = $(ele.target).parents(".accrodian").attr("id");
    var ele_target = $(this).data("target");

    $(ele.target).parents(".navTab").find(".nav-tablist").removeClass("active");
    $(this).parent(".nav-tablist").addClass("active");

    $("#" + ele_parents)
      .find(".tab-panel")
      .hide()
      .addClass("collapse");
    $("#" + ele_parents)
      .find("#" + ele_target)
      .show()
      .removeClass("collapse");
  });

  $('[data-collapse="collapse"]')
    .off("click")
    .on("click", function (ele) {
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

  $(".js-mobsubmenu .js-accord-col-mob .submenu-head .submenu-head-arrow").each(
    function () {
      $(this).click(function () {
        $(this).parents(".submenu-head").toggleClass("main-opened");
        $(this).parents(".submenu-head").siblings(".accord-body").slideToggle();
        $(this)
          .parents(".js-accord-col-mob")
          .siblings(".js-accord-col-mob")
          .find(".submenu-head")
          .removeClass("main-opened");
        $(this)
          .parents(".js-accord-col-mob")
          .siblings(".js-accord-col-mob")
          .find(".accord-body")
          .slideUp();
      });
    }
  );
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
      /*10-01-2023*/
      $(".jsDropdownBlock").removeClass("show");
      /*10-01-2023*/
      $("[data-rel]").removeClass("active");
      /*3-1-2023*/
      $("body").removeClass("scroll-hide-xs");
      $(".header-inner").removeClass("backdrops-xs");
      /*3-1-2023*/
      $(this).addClass("active");
      $("#" + $id).addClass("show");
      /*3-1-2023*/
      if ($(window).width() < 768) {
        $(this).parents("body").addClass("scroll-hide-xs");
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
  $(".js-actions-toggle").click(function () {
    $(".js-sticky-actions").toggleClass("active");
    $(".sticky-quick-link").removeClass("active");
  });

  //left sticky
  $(".jsLeftSticky").on("click", function () {
    $(".sticky-quick-link").toggleClass("active");
    $(".js-sticky-actions").removeClass("active");
  });

  $(document).on("click", function (event) {
    var $trigger = $(".close-on-outside");
    if ($trigger !== event.target && !$trigger.has(event.target).length) {
      $(".sticky-quick-link").removeClass("active");
      $(".js-sticky-actions").removeClass("active");
    }
  });
  /*1-02-2023*/

  $(".js-btn-signin").on("click", function () {
    $(".js-signin").show();
    $(this).parents(".js-signin").hide();
  });

  $(".jsMobOverviewsLink").click(function () {
    $(".mob-overviews-accodian").slideToggle();
    $(this).toggleClass("opened");
    $(this).parents(".overviews-tab-box").toggleClass("with-opens");
    /*16-3-2023*/
    $(".sticky-quick-link").removeClass("active");
    $(".js-sticky-actions").removeClass("active");
    /*16-3-2023*/
  });

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


  /*27-5-2024*/ 
  /*Hear from Shubh Chintak*/
  $(".js-hear-slider").on(
    "init reInit afterChange",
    function (event, slick, currentSlide, nextSlide) {
      if ($(".js-hear-slider .financial-insights-slider").length <= 2) {
        if ($(window).width() > 767) {
          $(".js-hear-slider").removeClass("slider-dots slick-dotted");
        }
      } else {
        $(".js-hear-slider").addClass("slider-dots slick-dotted");
      }
    }
  );

  $(".js-hear-slider").slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 2,
    slidesToScroll: 2,
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
  /*27-5-2024*/ 
  /*end Hear from Shubh Chintak*/ 
  

  /*Financial insights start*/
  $(".jsEmiOptionSlider").on(
    "init reInit afterChange",
    function (event, slick, currentSlide, nextSlide) {
      if ($(".jsEmiOptionSlider .suitable-emi-options-row").length <= 3) {
        if ($(window).width() > 991) {
          $(".jsEmiOptionSlider").removeClass("slider-dots slick-dotted");
        }
      } else {
        $(".jsEmiOptionSlider").addClass("slider-dots slick-dotted");
      }
    }
  );

  $(".jsEmiOptionSlider").slick({
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
          centerPadding: "56px",
          infinite: false,
          arrows: false,
        },
      },
    ],
  });

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

  // $(document).on("click", function (event) {
  //   var $trigger = $(".js-close-outside2");
  //   if ($trigger !== event.target && !$trigger.has(event.target).length) {
  //     $(".jsMobOverviewsLink").removeClass('opened');
  //     $('.mob-overviews-accodian').slideUp();
  //   }
  // });

  /*Financial insights slider*/

  /*Financial insights share toggling*/
  $(".js-fi-share-btn").on("click", function (event) {
    event.preventDefault();
    if ($("." + this.id).hasClass("active")) {
      $("." + this.id).toggleClass("active");
    } else {
      $(".share-bundle-menu").removeClass("active");
      $("." + this.id).addClass("active");
    }
  });

  $(".share-bundle-menu").click(function (event) {
    event.preventDefault();
  });

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

  leftScrollMenu();
  /*way to service*/
  if ($(window).width() < 992) {
    $(".tab-left .jsTabSelect").on("click", function () {
      /*sonar*/
      var parId = $(this).parent().parent().attr("id");
      /*sonar*/
      $("#" + parId + " .tab-left .jsTabSelect").removeClass("active");
      $(this).addClass("active");
      $("#" + parId + " .tab-left").scrollCenter(".active", 300);
    });
  }
  /*way to service*/

  /* tab active auto center start */
  $(".js-tabClick").on("click", function () {
    /*sonar*/
    var parent = $(this).parents("[tabMenu-wrap]");
    parent.scrollCenter(".active", 300);
    /*sonar*/
  });
  /* tab active auto center end */

  /*Financial insights end*/

  /*Ways to service start*/
  // $('.jsTabSelect').on('click', function(){
  //     // console.log(this.id);
  //     $('.tab-content').removeClass('active');
  //     $('.tablinks').removeClass('active');
  //     $(this).addClass('active');
  //     $('.' + this.id).addClass('active');
  // });

  $(".jsTabSelect").on("click", function () {
    // console.log(this.id);
    /*sonar*/
    var parId = $(this).parent().parent().attr("id");
    /*sonar*/
    $("#" + parId + " .tab-content").removeClass("active");
    $("#" + parId + " .tablinks").removeClass("active");
    $(this).addClass("active");
    $("." + this.id).addClass("active");
  });
  /*Ways to service end*/

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
      /*3-1-2022*/
      $(".header-inner").removeClass("backdrops");
      /*3-1-2022*/
    });
  }

  /*Star selection 27-3-2023*/
  $("#stars li")
    .on("mouseover", function () {
      var onStar = parseInt($(this).data("value"), 10);
      $(this)
        .parent()
        .children("li.star")
        .each(function (e) {
          if (e < onStar) {
            $(this).addClass("hover");
          } else {
            $(this).removeClass("hover");
          }
        });
    })
    .on("mouseout", function () {
      $(this)
        .parent()
        .children("li.star")
        .each(function (e) {
          $(this).removeClass("hover");
        });
    });
  $("#stars li").on("click", function () {
    var onStar = parseInt($(this).data("value"), 10);
    var stars = $(this).parent().children("li.star");

    for (i = 0; i < stars.length; i++) {
      $(stars[i]).removeClass("selected");
    }

    for (i = 0; i < onStar; i++) {
      $(stars[i]).addClass("selected");
    }
  });
  /*Star selection 27-3-2023*/

  /*9-2-2023*/
  //Focus open select 2 dropdown
  $(document).on("focus", ".select2.select2-container", function (e) {
    if (
      e.originalEvent &&
      $(this).find(".select2-selection--single").length > 0
    ) {
      $(this).siblings("select").select2("open");
      // Focus on input field on open dropdown
      setTimeout(function () {
        const searchField = document.querySelector(".select2-search__field");
        if (searchField) {
          searchField.focus();
        }
      }, 10);
      // Focus on input field on open dropdown
    }
  });
  /*9-2-2023*/

  /*nps form 19-12-2022*/
  $("#nps-form [data-type]").keyup(function () {
    var element = $(this);
    var ele_value = element.val();
    var ele_required = "Field is required";

    $(this).next(".error-msgs").remove();
    $(this).after('<span class="error-msgs"></span>');
    $(this).parents(".feedback-reason").addClass("textboxerror");

    if ($(element).val() != "") {
      if ($(element).data("type") === "feedback1") {
        if (ele_value === "") {
          $(element).parents(".feedback-reason").addClass("textboxerror");
          $(element).next(".error-msgs").text(ele_required);
        } else {
          $(element).parents(".feedback-reason").removeClass("textboxerror");
          $(element).next().text("");
        }
      }
      if ($(element).data("type") === "feedback2") {
        if (ele_value === "") {
          $(element).parents(".feedback-reason").addClass("textboxerror");
          $(element).next(".error-msgs").text(ele_required);
        } else {
          $(element).parents(".feedback-reason").removeClass("textboxerror");
          $(element).next().text("");
        }
      }
    } else {
      $(element).next(".error-msgs").text(ele_required);
    }
  });

  /*20-1-2023*/
  $("#nps-form .js-select2").change(function () {
    $(this).parents(".form-textbox-new").removeClass("textboxerror");
    $(this).next(".error-msgs").remove();
  });
  /*20-1-2023*/

  $("#nps-form .JsNpsSubmit").click(function () {
    /*20-1-2023*/
    var ele_input = $("#nps-form .form-feedback-textarea[data-type]:visible");
    var selectElements = $(
      "#nps-form .select2-hidden-accessible[data-type]:visible"
    );
    /*20-1-2023*/
    var errors = [];
    allFilled = true;
    var ele_required = "Field is required";

    /*20-1-2023*/
    $(selectElements).each(function () {
      var select = $(this);
      $(select).parents(".form-textbox-new").find(".error-msgs").remove();

      if ($(select).val() == "") {
        allFilled = false;
        $(select).parents(".form-textbox-new").addClass("textboxerror");
        $(select).next(".error-msgs").remove();
        $(select).after(
          '<span class="error-msgs" style="top: 43px">' +
            ele_required +
            "</span>"
        );
        errors.push(ele_required);
      } else {
        $(select).parents(".form-textbox-new").removeClass("textboxerror");
        $(select).next(".error-msgs").remove();
      }
    });
    /*20-1-2023*/

    $(ele_input).each(function () {
      var element = $(this);
      var ele_value = element.val();

      $(element).next().remove();

      if (element.is(":visible")) {
        if (element.val() != "") {
          $(element).after('<span class="error-msgs"></span>');
          if ($(element).data("type") === "feedback1") {
            if (ele_value === "") {
              $(element).parents(".feedback-reason").addClass("textboxerror");
              $(element).next(".error-msgs").text(ele_name);
              errors.push(ele_name);
            } else {
              $(element)
                .parents(".feedback-reason")
                .removeClass("textboxerror");
              $(element).next().text("");
            }
          }
          if ($(element).data("type") === "feedback2") {
            if (ele_value === "") {
              $(element).parents(".feedback-reason").addClass("textboxerror");
              $(element).next(".error-msgs").text(ele_name);
              errors.push(ele_name);
            } else {
              $(element)
                .parents(".feedback-reason")
                .removeClass("textboxerror");
              $(element).next().text("");
            }
          }
        } else {
          $(element).parents(".feedback-reason").addClass("textboxerror");
          $(element).after(
            '<span class="error-msgs">' + ele_required + "</span>"
          );
          errors.push(ele_required);
        }
      }
    });
    if (errors.length == 0) {
      $(".modal-backdrop").remove();
      setTimeout(function () {
        $("#thankyou-modal").addClass("popover-show");
      }, 80);

      $("#thankyou-modal").css("display", "block");
      $("body").addClass("popover-modal-open");
      $("body").append('<div class="modal-backdrop"></div>');
    }
  });
  /*nps form 19-12-2022*/

  /*Subscribe newsletter*/
  $("#form-subscribe .js-subscribe-btn").click(function (e) {
    var ele_input = $("#form-subscribe .input-textbox");
    // $('.subscribe-success').addClass('d-none');
    var errors = [];
    allFilled = true;
    var ele_required = "Field is required";

    $(ele_input).each(function () {
      var element = $(this);
      var ele_value = element.val();
      var ele_email = "Please enter valid email ID";

      $(element).next().remove();

      if (element.is(":visible")) {
        if (element.val() != "") {
          $(element).after('<span class="error-msgs"></span>');
          if ($(element).data("type") === "email") {
            var regEmail =
              /^[a-zA-Z0-9_.]+[@][a-zA-Z0-9]+[\.][a-zA-z0-9]{2,4}$/gm;

            if (ele_value != "" && !ele_value.match(regEmail)) {
              $(element).parents(".form-textbox").addClass("textboxerror");
              $(element).next(".error-msgs").text(ele_email);
              errors.push(ele_email);
            } else {
              $(element).parents(".form-textbox").removeClass("textboxerror");
              $(element).next().text("");
            }
          }
        } else {
          $(element).parents(".form-textbox").addClass("textboxerror");
          $(element).after(
            '<span class="error-msgs">' + ele_required + "</span>"
          );
          errors.push(ele_required);
        }
      }
    });

    if (errors.length == 0) {
      // $('#form-subscribe .input-textbox').val('');
      // $('#form-subscribe .form-textbox').removeClass('textboxerror');
      // $('#form-subscribe .form-textbox').removeClass('active');
      // $('.subscribe-success').removeClass('d-none');
      // setTimeout(function () {
      //   $('.subscribe-success').addClass('d-none');
      // }, 3000);
      $(".modal-backdrop").remove();
      setTimeout(function () {
        $("#subscribe-modal").addClass("popover-show");
      }, 80);

      $("#subscribe-modal").css("display", "block");
      $("body").addClass("popover-modal-open");
      $("body").append('<div class="modal-backdrop"></div>');
    }
  });

  $(".jsSubscribeClose").click(function () {
    $("#form-subscribe .input-textbox").val("");
    $("#form-subscribe .form-textbox").removeClass("textboxerror");
    $("#form-subscribe .form-textbox").removeClass("active");
  });

  /*4-1-2023*/
  /*subscribe enter functionality*/
  $("#form-subscribe .input-textbox[data-type]").bind("keypress", function (e) {
    var code = e.keyCode || e.which;
    if (code == 13) {
      $(".js-subscribe-btn").trigger("click");
    }
  });
  /*4-1-2023*/

  /*chatbot 26-06-2023*/
  $(".chat-tia-btn .jsChatBtn").on("click", function () {
    $(this).removeClass("showing");
    $(this).addClass("hiding");
    $(".ask-tia-wrap").addClass("showing");
    $(".ask-tia-wrap").removeClass("hiding");
  });
  $(".ask-tia-wrap .cross-btn").on("click", function () {
    $(".chat-tia-btn .jsChatBtn").removeClass("hiding");
    $(".chat-tia-btn .jsChatBtn").addClass("showing");
    $(".ask-tia-wrap").addClass("hiding");
    $(".ask-tia-wrap").removeClass("showing");
  });

  /*chatbot 26-06-2023*/

  /*10-2-2023 looking offer animation*/
  $(".jsOpenAnimationModal").click(function () {
    $(".modal-backdrop").remove();
    setTimeout(function () {
      $("#offers-modal").addClass("popover-show");
    }, 80);

    $("#offers-modal").css("display", "block");
    $("body").addClass("popover-modal-open");
    $("body").append('<div class="modal-backdrop"></div>');

    setTimeout(function () {
      $(".modal-animation-wrap .popover-top-heads").removeClass(
        "translate-top"
      );
    }, 500);

    setTimeout(function () {
      $(".modal-animation-wrap .offer-icon").removeClass("translate-scale");
    }, 600);

    setTimeout(function () {
      $(
        ".modal-animation-wrap .lookings-offers .offer-user-details"
      ).removeClass("fade-in");
    }, 1000);

    setTimeout(function () {
      $(".modal-animation-wrap .lookings-offers .offers-loader").removeClass(
        "fade_in"
      );
    }, 1100);

    setTimeout(function () {
      $(".modal-animation-wrap .lookings-offers .offers-loader").addClass(
        "d-none"
      );
    }, 2500);
  });
  /*10-2-2023 looking offer animation*/

  $("#form-subscribe .input-textbox[data-type]").keyup(function () {
    var element = $(this);
    var ele_value = element.val();
    var ele_required = "Field is required";
    var ele_email = "Please enter valid email ID";

    $(this).next(".error-msgs").remove();
    $(this).after('<span class="error-msgs"></span>');
    $(this).parents(".form-group").addClass("error");

    $(".subscribe-success").addClass("d-none");

    if ($(element).val() != "") {
      if ($(element).data("type") === "email") {
        var regEmail = /^[a-zA-Z0-9_.]+[@][a-zA-Z0-9]+[\.][a-zA-z0-9]{2,4}$/gm;

        if (ele_value != "" && !ele_value.match(regEmail)) {
          $(element).parents(".form-textbox").addClass("textboxerror");
          $(element).next(".error-msgs").text(ele_email);
        } else {
          $(element).parents(".form-textbox").removeClass("textboxerror");
          $(element).next().text("");
        }
      }
    } else {
      $(element).next(".error-msgs").text(ele_required);
    }
  });

  // pre-approved loan
  $("#preApprovedLoanForm .input-textbox[data-type]").keyup(function () {
    var element = $(this);
    var ele_value = element.val();
    var ele_required = "Field is required";
    var ele_name = "Enter full name as PAN card";
    var ele_phoneNumber = "Please enter valid number";

    $(this).next(".error-msgs").remove();
    $(this).after('<span class="error-msgs"></span>');
    $(this).parents(".form-group").addClass("error");

    if ($(element).val() != "") {
      if ($(element).data("type") === "name") {
        var regName = /^[a-zA-Z]+ [a-zA-Z]+$/;

        if (ele_value != "" && !ele_value.match(regName)) {
          $(element).parents(".form-textbox").addClass("textboxerror");
          $(element).next(".error-msgs").text(ele_name);
        } else {
          $(element).parents(".form-textbox").removeClass("textboxerror");
          $(element).next().text("");
        }
      }
      if ($(element).data("type") === "mobile") {
        if (!validateMobile(element)) {
          $(element).parents(".form-textbox").addClass("textboxerror");
          $(element).next(".error-msgs").text(ele_phoneNumber);
        } else {
          $(element).parents(".form-textbox").removeClass("textboxerror");
          $(element).next().text("");
          $(this).next(".error-msgs").remove();
        }
      }
    } else {
      $(element).next(".error-msgs").text(ele_required);
    }
  });

  $("#preApprovedLoanForm .js-proceed-btn").click(function () {
    var ele_input = $("#preApprovedLoanForm .input-textbox");
    var errors = [];
    allFilled = true;
    var ele_required = "Field is required";

    $(ele_input).each(function () {
      var element = $(this);
      var ele_value = element.val();
      var ele_name = "Enter full name as PAN card";
      var ele_phoneNumber = "Please enter valid Phone Number";

      $(element).next().remove();

      if (element.is(":visible")) {
        if (element.val() != "") {
          $(element).after('<span class="error-msgs"></span>');
          if ($(element).data("type") === "name") {
            var regName = /^[a-zA-Z]+ [a-zA-Z]+$/;

            if (ele_value != "" && !ele_value.match(regName)) {
              $(element).parents(".form-textbox").addClass("textboxerror");
              $(element).next(".error-msgs").text(ele_name);
              errors.push(ele_name);
            } else {
              $(element).parents(".form-textbox").removeClass("textboxerror");
              $(element).next().text("");
            }
          }
          if ($(element).data("type") === "mobile") {
            if (!validateMobile(element)) {
              $(element).parents(".form-textbox").addClass("textboxerror");
              $(element).next(".error-msgs").text(ele_phoneNumber);
              errors.push(ele_phoneNumber);
            } else {
              $(element).parents(".form-textbox").removeClass("textboxerror");
              $(element).next().text("");
              $(this).next(".error-msgs").remove();
            }
          }
        } else {
          $(element).parents(".form-textbox").addClass("textboxerror");
          $(element).after(
            '<span class="error-msgs">' + ele_required + "</span>"
          );
          errors.push(ele_required);
        }
      }
    });
    if (errors.length == 0) {
      $(".pre-approved-otp").removeClass("d-none");
      $(".pre-approved-candidate").addClass("d-none");
      /*21-2-2023*/
      $("#preApprovedOtp")
        .find(".js-OtpBox .input-textbox:first-child")
        .focus();
      /*21-2-2023*/
    }
  });

  $("#preApprovedOtp .js-OtpBox .input-textbox").keyup(function () {
    $(this).parents(".form-textbox").removeClass("textboxerror");
    if (this.value.length == this.maxLength) {
      $(this).next(".input-textbox").focus();
      $(this).next(".input-textbox").removeClass("pointer-none");
    } else {
      $(this).prev(".input-textbox").focus();
      $(this).addClass("pointer-none");
      $("#preApprovedOtp .input-textbox:first").removeClass("pointer-none");
    }

    $(this).parents(".form-textbox").addClass("active");
    var ele_input = $(".js-OtpBox .input-textbox");

    $(ele_input).each(function () {
      if ($(this).val().length != 0) {
        $(this)
          .parents("#preApprovedOtp")
          .find(".jsPreApprovedSubmitOtp")
          .removeClass("btn-disabled");
        $(this).parents(".form-textbox").addClass("active");
      } else {
        $(this)
          .parents("#preApprovedOtp")
          .find(".jsPreApprovedSubmitOtp")
          .addClass("btn-disabled");
      }
    });
  });

  /*21-2-2023*/
  // $('.jsPreApprovedSubmitOtp').on('click', function () {
  //     $('#preApprovedOtp .input-textbox').val('')
  //     $('#preApprovedLoanForm').find('.form-textbox').removeClass('active');
  //     $('#preApprovedLoanForm').find('.input-textbox').val('');
  //     window.location = 'http://www.google.com/';
  // })

  $(".jsPreApprovedSubmitOtp").click(function () {
    var values = [];
    $("#preApprovedOtp .js-OtpBox .input-textbox").each(function (i, ele) {
      values.push(ele.value);
    });
    console.log(values.join(""));

    if (values.join("") == "9999") {
      $("#preApprovedOtp .input-textbox").val("");
      $("#preApprovedLoanForm").find(".form-textbox").removeClass("active");
      $("#preApprovedLoanForm").find(".input-textbox").val("");
      window.location = "http://www.google.com/";
    } else {
      $("#preApprovedOtp .input-textbox").val("");
      $("#preApprovedLoanForm").find(".form-textbox").removeClass("active");
      $("#preApprovedLoanForm").find(".input-textbox").val("");
      $(".pre-approved-otp").addClass("d-none");
      $(".pre-approved-otp-error").removeClass("d-none");
    }
  });

  $(".jsTryAgainPreApproved").click(function () {
    $(".pre-approved-otp-error").addClass("d-none");
    $(".pre-approved-otp").removeClass("d-none");
    $("#preApprovedOtp")
      .find(".js-OtpBox .input-textbox")
      .val("")
      .parents(".form-textbox")
      .removeClass("active");
    $("#preApprovedOtp").find(".js-OtpBox .input-textbox:first-child").focus();
    $("#preApprovedOtp").find("button").addClass("btn-disabled");
    $("#preApprovedOtp .input-error").addClass("d-none");
    $("#preApprovedOtp .label-name").removeClass("d-none");
  });

  $("#preApprovedOtp .js-resendOTP").click(function () {
    $(this)
      .parents("#preApprovedOtp")
      .find(".js-OtpBox .input-textbox")
      .val("")
      .parents(".form-textbox")
      .removeClass("active");
    $(this)
      .parents("#preApprovedOtp")
      .find(".js-OtpBox .input-textbox:first-child")
      .focus();
    $(this).parents("#preApprovedOtp").find("button").addClass("btn-disabled");
    $("#preApprovedOtp .input-error").addClass("d-none");
    $("#preApprovedOtp .label-name").removeClass("d-none");
  });

  /*21-2-2023*/

  $("[dropdown-item]")
    .click(function () {
      $(this)
        .parents(".custom-dropdown")
        .find("[dropdown-item]")
        .removeClass("active");
      $(this).addClass("active");
      var dropdownSelected = $(this).text();
      $(this)
        .parents(".custom-dropdown")
        .find(".dropdown-heading")
        .text(dropdownSelected);
    })
    .focus(function () {
      $(".error-msgs").remove();
      $(this).parents(".form-textbox").removeClass("textboxerror");
    })
    .blur(function () {
      if ($(this).val().length != 0) {
        $(this).parents(".form-textbox").addClass("active");
      } else if ($(this).val().length == 0) {
        $(this).parents(".form-textbox").removeClass("active");
      }
    });

  // whatsapp loan form
  var loanQueryCheckbox = false;

  $(".jsIAgreeTermsPolicy").on("change", function () {
    var errors = [];
    var ele_checkbox = "Please confirm checkbox";
    loanQueryCheckbox = event.target.checked;
    if (loanQueryCheckbox) {
      $("#js-whatsapp-loan .form-check .error-msgs").remove();
      $("#js-whatsapp-loan .form-check").removeClass("textboxerror");
    } else {
      if ($("#js-whatsapp-loan .form-check").find(".error-msgs").length > 0) {
        errors.push(ele_checkbox);
      }
      if ($("#js-whatsapp-loan .form-check").find(".error-msgs").length === 0) {
        $("#js-whatsapp-loan .form-check .form-check-label").after(
          '<span class="error-msgs"></span>'
        );
        $("#js-whatsapp-loan .form-check").addClass("textboxerror");
        $("#js-whatsapp-loan .form-check .error-msgs").html(ele_checkbox);
        errors.push(ele_checkbox);
      }
    }
  });

  $("#js-whatsapp-loan .js-proceed-btn").click(function () {
    var ele_input = $("#js-whatsapp-loan .input-textbox");
    var errors = [];
    allFilled = true;
    var ele_required = "Field is required";

    $(ele_input).each(function () {
      var element = $(this);
      /*sonar*/
      // var ele_value = element.val();
      /*sonar*/
      var ele_phoneNumber = "Please enter valid phone number";
      var ele_checkbox = "Please confirm checkbox";

      $(element).next().remove();

      if (element.is(":visible")) {
        if (element.val() != "") {
          $(element).after('<span class="error-msgs"></span>');
          if ($(element).data("type") === "mobile") {
            if (!validateMobile(element)) {
              $(element).parents(".form-textbox").addClass("textboxerror");
              $(element).next(".error-msgs").text(ele_phoneNumber);
              errors.push(ele_phoneNumber);
            } else {
              $(element).parents(".form-textbox").removeClass("textboxerror");
              $(element).next().text("");
              $(this).next(".error-msgs").remove();
            }
          }
        } else {
          $(element).parents(".form-textbox").addClass("textboxerror");
          $(element).after(
            '<span class="error-msgs">' + ele_required + "</span>"
          );
          errors.push(ele_required);
        }
      }
      if (!loanQueryCheckbox) {
        if ($("#js-whatsapp-loan .form-check").find(".error-msgs").length > 0) {
          errors.push(ele_checkbox);
        }
        if (
          $("#js-whatsapp-loan .form-check").find(".error-msgs").length === 0
        ) {
          $("#js-whatsapp-loan .form-check .form-check-label").after(
            '<span class="error-msgs"></span>'
          );
          $("#js-whatsapp-loan .form-check").addClass("textboxerror");
          $("#js-whatsapp-loan .form-check .error-msgs").html(ele_checkbox);
          errors.push(ele_checkbox);
        }
      } else {
        $("#js-whatsapp-loan .form-check .error-msgs").remove();
        $("#js-whatsapp-loan .form-check").removeClass("textboxerror");
      }
    });
    if (errors.length == 0) {
      var getWhatsappNub = $(".jsGetWhatsappNumber").val();
      $(".jsShowWhatsappNumber").text(getWhatsappNub);
      /*3-1-2023*/
      $("#js-whatsapp-loan").addClass("d-none");
      $(".whatsapp-otp-wrap").removeClass("d-none");
      $("#whatsapp-otp .js-otp-submit").addClass("btn-disabled");
      $("#whatsapp-otp .input-textbox:first").focus();
      /*3-1-2023*/
      ele_input.val("");
      loanQueryCheckbox = false;
      $("#js-whatsapp-loan .form-check .form-check-input").prop(
        "checked",
        false
      );
      $("#js-whatsapp-loan .form-textbox").removeClass("active");
    }
  });

  $("#js-whatsapp-loan .input-textbox").keyup(function () {
    var ele_input = $("#js-whatsapp-loan .input-textbox");
    var errors = [];
    allFilled = true;
    var ele_required = "Field is required";

    $(ele_input).each(function () {
      var element = $(this);
      /*sonar*/
      // var ele_value = element.val();
      /*sonar*/
      var ele_phoneNumber = "Please enter valid phone number";
      $(element).next().remove();

      if (element.is(":visible")) {
        if (element.val() != "") {
          $(element).after('<span class="error-msgs"></span>');
          if ($(element).data("type") === "mobile") {
            if (!validateMobile(element)) {
              $(element).parents(".form-textbox").addClass("textboxerror");
              $(element).next(".error-msgs").text(ele_phoneNumber);
              errors.push(ele_phoneNumber);
            } else {
              $(element).parents(".form-textbox").removeClass("textboxerror");
              $(element).next().text("");
              $(this).next(".error-msgs").remove();
            }
          }
        } else {
          $(element).parents(".form-textbox").addClass("textboxerror");
          $(element).after(
            '<span class="error-msgs">' + ele_required + "</span>"
          );
          errors.push(ele_required);
        }
      }
    });
  });

  $(".jsCloseWhatsappMgs").click(function () {
    $(".whatsapp-success-mgs").addClass("d-none");
    /*3-1-2023*/
    $(".initiate-loan-journey").removeClass("d-none");
    $("#js-whatsapp-loan").removeClass("d-none");
    $("#whatsapp-otp .input-textbox").val("");
  });

  /*whatsapp otp keyup*/
  $("#whatsapp-otp .js-OtpBox .input-textbox").keyup(function () {
    if (this.value.length == this.maxLength) {
      $(this).next(".input-textbox").focus();
      $(this).next(".input-textbox").removeClass("pointer-none");
    } else {
      $(this).prev(".input-textbox").focus();
      $(this).addClass("pointer-none");
      $("#whatsapp-otp .input-textbox:first").removeClass("pointer-none");
    }

    var ele_input = $(".js-OtpBox .input-textbox");
    $(ele_input).each(function () {
      if ($(this).val().length != 0) {
        $(this)
          .parents("#whatsapp-otp")
          .find(".js-otp-submit")
          .removeClass("btn-disabled");
      } else {
        $(this)
          .parents("#whatsapp-otp")
          .find(".js-otp-submit")
          .addClass("btn-disabled");
      }
    });
  });

  /*whatsapp otp resend*/
  $("#whatsapp-otp .js-resendOTP").click(function () {
    $(this).parents("#whatsapp-otp").find(".js-OtpBox .input-textbox").val("");
    $(this)
      .parents("#whatsapp-otp")
      .find(".js-OtpBox .input-textbox:first-child")
      .focus();
    $(this)
      .parents("#whatsapp-otp")
      .find(".js-otp-submit")
      .addClass("btn-disabled");
  });

  /*Credit score otp try again*/
  $(".jsOTPTryAgain").click(function () {
    $(".initiate-loan-journey").removeClass("d-none");
    $(".whatsapp-otp-wrap").removeClass("d-none");
    $(".jsWhatOTPUnSuccess").addClass("d-none");
    $("#whatsapp-otp .input-textbox").val("");
    $("#whatsapp-otp .input-textbox:first").focus();
    $("#whatsapp-otp .input-textbox").addClass("pointer-none");
    $("#whatsapp-otp .input-textbox:first").removeClass("pointer-none");
    $("#whatsapp-otp").find(".js-otp-submit").addClass("btn-disabled");
  });

  /*Credit otp submit*/
  $("#whatsapp-otp .js-otp-submit").click(function () {
    var values = [];
    $("#whatsapp-otp .js-OtpBox .input-textbox").each(function (i, ele) {
      values.push(ele.value);
    });
    console.log(values.join(""));
    if (values.join("") == "9999") {
      $(".initiate-loan-journey").addClass("d-none");
      $(".whatsapp-otp-wrap").addClass("d-none");
      $(".jsWhatOTPSuccess").removeClass("d-none");
    } else {
      $(".initiate-loan-journey").addClass("d-none");
      $(".whatsapp-otp-wrap").addClass("d-none");
      $(".jsWhatOTPUnSuccess").removeClass("d-none");
    }
    /*3-1-2023*/
  });

  /*getapp modal keypress js 6-1-2023*/
  $("#getInvestmentLink .input-textbox[data-type]").bind(
    "keypress",
    function (e) {
      var code = e.keyCode || e.which;
      if (code == 13) {
        $(".js-getInvestmentLink").trigger("click");
      }
    }
  );
  $("#getLoanLink .input-textbox[data-type]").bind("keypress", function (e) {
    var code = e.keyCode || e.which;
    if (code == 13) {
      $(".js-getLoanLink").trigger("click");
    }
  });
  /*getapp modal keypress js 6-1-2023*/

  $("#getInvestmentLink .js-getInvestmentLink").click(function () {
    var ele_input = $("#getInvestmentLink .input-textbox");
    var errors = [];
    allFilled = true;
    var ele_required = "Field is required";

    $(ele_input).each(function () {
      var element = $(this);
      var ele_phoneNumber = "Please enter valid Phone Number";

      $(element).next().remove();

      if (element.is(":visible")) {
        if (element.val() != "") {
          $(element).after('<span class="error-msgs"></span>');
          if ($(element).data("type") === "mobile") {
            if (!validateMobile(element)) {
              $(element).parents(".form-textbox").addClass("textboxerror");
              $(element).next(".error-msgs").text(ele_phoneNumber);
              errors.push(ele_phoneNumber);
            } else {
              $(element).parents(".form-textbox").removeClass("textboxerror");
              $(element).next().text("");
              $(this).next(".error-msgs").remove();
            }
          }
        } else {
          $(element).parents(".form-textbox").addClass("textboxerror");
          $(element).after(
            '<span class="error-msgs">' + ele_required + "</span>"
          );
          errors.push(ele_required);
        }
      }
    });
    if (errors.length == 0) {
      /*6-1-2023*/
      var jsGetLookNumber = $(
        ".looking-investment-step1 .jsGetLookNumber"
      ).val();
      var jsGetNumberLast = String(jsGetLookNumber).slice(-2);
      $(".jsShowLookNumber").text("XXXXXXXX" + jsGetNumberLast);
      $(".looking-investment-step1").addClass("d-none");
      $(".looking-investment-step1")
        .siblings(".white-dot-loader")
        .removeClass("d-none");
      setTimeout(function () {
        $(".looking-investment-step1")
          .siblings(".white-dot-loader")
          .addClass("d-none");
        $(".looking-investment-step1")
          .siblings("#moneyfy02")
          .removeClass("d-none");
      }, 2000);
      // $('.looking-investment-step1').siblings('#moneyfy02').removeClass('d-none');
      $("#getInvestmentLink .input-textbox").val("");
      /*6-1-2023*/
    }
  });
  $("#getInvestmentLink .input-textbox[data-type]").keyup(function () {
    var element = $(this);
    var ele_required = "Field is required";
    var ele_phoneNumber = "Please enter valid Phone Number";

    $(this).next(".error-msgs").remove();
    $(this).after('<span class="error-msgs"></span>');
    $(this).parents(".form-group").addClass("error");

    if ($(element).val() != "") {
      if ($(element).data("type") === "mobile") {
        if (!validateMobile(element)) {
          $(element).parents(".form-textbox").addClass("textboxerror");
          $(element).next(".error-msgs").text(ele_phoneNumber);
        } else {
          $(element).parents(".form-textbox").removeClass("textboxerror");
          $(element).next().text("");
          $(this).next(".error-msgs").remove();
        }
      }
    } else {
      $(element).next(".error-msgs").text(ele_required);
    }
  });
  $("#getLoanLink .js-getLoanLink").click(function () {
    var ele_input = $("#getLoanLink .input-textbox");
    var errors = [];
    allFilled = true;
    var ele_required = "Field is required";

    $(ele_input).each(function () {
      var element = $(this);
      var ele_phoneNumber = "Please enter valid Phone Number";

      $(element).next().remove();

      if (element.is(":visible")) {
        if (element.val() != "") {
          $(element).after('<span class="error-msgs"></span>');
          if ($(element).data("type") === "mobile") {
            if (!validateMobile(element)) {
              $(element).parents(".form-textbox").addClass("textboxerror");
              $(element).next(".error-msgs").text(ele_phoneNumber);
              errors.push(ele_phoneNumber);
            } else {
              $(element).parents(".form-textbox").removeClass("textboxerror");
              $(element).next().text("");
              $(this).next(".error-msgs").remove();
            }
          }
        } else {
          $(element).parents(".form-textbox").addClass("textboxerror");
          $(element).after(
            '<span class="error-msgs">' + ele_required + "</span>"
          );
          errors.push(ele_required);
        }
      }
    });
    if (errors.length == 0) {
      /*6-1-2023*/
      var jsShowGetLinkNumber = $(
        ".looking-loan-step1 .jsGetLookLoanNumber"
      ).val();
      var jsShowGetLinkNumberLast = String(jsShowGetLinkNumber).slice(-2);
      $(".jsShowGetLinkNumber").text("XXXXXXXX" + jsShowGetLinkNumberLast);
      $(".looking-loan-step1").addClass("d-none");
      $(".looking-loan-step1")
        .siblings(".white-dot-loader")
        .removeClass("d-none");
      setTimeout(function () {
        $(".looking-loan-step1")
          .siblings(".white-dot-loader")
          .addClass("d-none");
        $(".looking-loan-step1").siblings("#moneyfy02").removeClass("d-none");
      }, 2000);
      $("#getLoanLink .input-textbox").val("");
      /*6-1-2023*/
    }
  });
  $("#getLoanLink .input-textbox[data-type]").keyup(function () {
    var element = $(this);
    var ele_required = "Field is required";
    var ele_phoneNumber = "Please enter valid Phone Number";

    $(this).next(".error-msgs").remove();
    $(this).after('<span class="error-msgs"></span>');
    $(this).parents(".form-group").addClass("error");

    if ($(element).val() != "") {
      if ($(element).data("type") === "mobile") {
        if (!validateMobile(element)) {
          $(element).parents(".form-textbox").addClass("textboxerror");
          $(element).next(".error-msgs").text(ele_phoneNumber);
        } else {
          $(element).parents(".form-textbox").removeClass("textboxerror");
          $(element).next().text("");
          $(this).next(".error-msgs").remove();
        }
      }
    } else {
      $(element).next(".error-msgs").text(ele_required);
    }
  });

  $(".banner-slider").on(
    "init reInit afterChange",
    function (event, slick, currentSlide, nextSlide) {
      if ($(".banner-slider .banner-item").length <= 1) {
        $(".banner-slider").removeClass("slider-dots slick-dotted");
      } else {
        $(".banner-slider").addClass("slider-dots slick-dotted");
      }
    }
  );
  const bannerSlider = {
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: false,
    autoplay: false,
    autoplaySpeed: 2000,
  };

  function sliderFunc(sliderParent, sliderProp = sliderProperties) {
    if (sliderParent.length) {
      if (sliderParent.hasClass("slick-initialized")) {
        sliderParent.slick("unslick");
      } else {
        sliderParent.not(".slick-initialized").slick(sliderProp);
      }
    }
  }



  /*testimonial customer-say slider 19-6-2024*/
  $(".jsCustomerSaySlider1").on("init reInit afterChange", function (event, slick, currentSlide, nextSlide) {
      if ($(".jsCustomerSaySlider1 .customer-row").length <= 3) {
        if ($(window).width() > 991) {
          $(".jsCustomerSaySlider1").removeClass("slider-dots slick-dotted");
        }
      } else {
        $(".jsCustomerSaySlider1").addClass("slider-dots slick-dotted");
      }
    }
  );
  
  $(".jsCustomerSaySlider1").slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
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
  });
  /*testimonial customer-say slider 19-6-2024*/


  /*Segmentation slider 25-6-2024*/
  $(".jsSegmentationSlider").on("init reInit afterChange", function (event, slick, currentSlide, nextSlide) {
    if ($(".jsSegmentationSlider .segmentation-row").length <= 4) {
      if ($(window).width() > 1199) {
        $(".jsSegmentationSlider").removeClass("slider-dots slick-dotted");
      }
    } else {
      $(".jsSegmentationSlider").addClass("slider-dots slick-dotted");
    }
  }
);
$(".jsSegmentationSlider").slick({
  dots: true,
  infinite: false,
  speed: 300,
  slidesToShow: 4,
  slidesToScroll: 1,
  arrows: true,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
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
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
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
});
/*Segmentation slider 25-6-2024*/

/*premiers slider 25-6-2024*/
$(".jsPremiersSlider").on("init reInit afterChange", function (event, slick, currentSlide, nextSlide) {
  if ($(".jsPremiersSlider .segmentation-row").length <= 4) {
    if ($(window).width() > 991) {
      $(".jsPremiersSlider").removeClass("slider-dots slick-dotted");
    }
  } else {
    $(".jsPremiersSlider").addClass("slider-dots slick-dotted");
  }
}
);
$(".jsPremiersSlider").slick({
dots: true,
infinite: false,
speed: 300,
slidesToShow: 4,
slidesToScroll: 1,
arrows: true,
responsive: [
  {
    breakpoint: 1200,
    settings: {
      slidesToShow: 3,
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
      slidesToShow: 2,
    },
  },
  {
    breakpoint: 768,
    settings: {
      slidesToShow: 2,
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
});
/*premiers slider 25-6-2024*/


  /*customer-say slider*/
  const CustomerSaySlider = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
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
  /*customer-say slider*/

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

  /*explore mobile */

  const ExploreSliderMob = {
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
          arrows: false,
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
  /*explore mobile*/

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
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
          // centerMode: true,
          centerPadding: "30px",
          infinite: false,
          dots: true,
        },
      },
    ],
  };

  const InstantSliderWithDot = {
    dots: true,
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
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
          // centerMode: true,
          centerPadding: "30px",
          infinite: false,
          dots: true,
        },
      },
    ],
  };
  /*customer-say slider*/

  /*MultiPurposeSlider slider*/
  $(".jsMultiPurposeSlider").on(
    "init reInit afterChange",
    function (event, slick, currentSlide, nextSlide) {
      if ($(".jsMultiPurposeSlider .instant-per-row").length <= 4) {
        if ($(window).width() > 1199) {
          $(".jsMultiPurposeSlider").removeClass("slider-dots slick-dotted");
        }
      } else {
        $(".jsMultiPurposeSlider").addClass("slider-dots slick-dotted");
      }
    }
  );
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
          centerPadding: "40px",
          infinite: false,
          dots: true,
        },
      },
    ],
  };
  /*MultiPurposeSlider slider*/

  /*jsCanTakeSlider slider*/
  $(".jsCanTakeSlider").on(
    "init reInit afterChange",
    function (event, slick, currentSlide, nextSlide) {
      if ($(".jsCanTakeSlider .instant-per-row").length <= 3) {
        if ($(window).width() > 991) {
          $(".jsCanTakeSlider").removeClass("slider-dots slick-dotted");
        }
      } else {
        $(".jsCanTakeSlider").addClass("slider-dots slick-dotted");
      }
    }
  );
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
          slidesToScroll: 1,
          arrows: false,
          dots: true,
          centerMode: true,
          centerPadding: "30px",
        },
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
          // centerMode: true,
          centerPadding: "30px",
          infinite: false,
          dots: true,
        },
      },
    ],
  };
  /*jsCanTakeSlider slider*/

  /*Convenience Slider*/

  // $('.jsConvenienceSlider').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
  //   if ($('.jsConvenienceSlider .instant-per-row').length <= 3) {
  //     if ($(window).width() > 991) {
  //       $('.jsConvenienceSlider').removeClass('slider-dots slick-dotted');
  //     }
  //   } else{
  //     $('.jsConvenienceSlider').addClass('slider-dots slick-dotted');
  //   }
  // });

  /*6-1-2023*/
  $("#jsSliderOverviewTab").slick({
    dots: false,
    infinite: false,
    speed: 300,
    autoplay: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    variableWidth: true,
  });

  /*6-1-2023*/

  /*14-3-2023*/
  $("#jsNewBannerSlider").on(
    "init reInit afterChange",
    function (event, slick, currentSlide, nextSlide) {
      if ($("#jsNewBannerSlider .banner-item-new").length <= 1) {
        $("#jsNewBannerSlider").removeClass("slider-dots slick-dotted");
      } else {
        $("#jsNewBannerSlider").addClass("slider-dots slick-dotted");
      }
    }
  );
  $("#jsNewBannerSlider").on("touchstart", (e) => {
    $("#jsNewBannerSlider").slick("slickPlay");
  });

  $("#jsNewBannerSlider").slick({
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: false,
    autoplay: false,
    autoplaySpeed: 2000,
    touchMove: true,
    focusOnSelect: true,
    pauseOnHover: false,
    pauseOnFocus: false,
    pauseOnDotsHover: false,
    draggable: true,
  });
  /*14-3-2023*/

  /*3-3-2023*/
  $(".jsSliderBlueTab").slick({
    dots: false,
    infinite: false,
    speed: 300,
    autoplay: false,
    slidesToShow: 7,
    slidesToScroll: 1,
    arrows: true,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  });
  $(".jsSliderBlueTab .tabs-row .tab-button").click(function () {
    $(".jsSliderBlueTab .tabs-row .tab-button").removeClass("active");
    $(this).addClass("active");
    var tb = $(this).attr("data-tb");
    $(".self-service-rows").addClass("d-none");
    $("#" + tb).removeClass("d-none");
  });
  /*3-3-2023*/

  if ($(window).width() > 991) {
    if ($(".jsConvenienceSlider").hasClass("slick-initialized")) {
      $(".jsConvenienceSlider").slick("unslick");
    }
  } else {
    $(".jsConvenienceSlider")
      .not(".slick-initialized")
      .slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 3,
        arrows: false,
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
            },
          },
        ],
      });
  }

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

  if ($(window).width() > 767) {
    if ($(".jsTieTwoSlider").hasClass("slick-initialized")) {
      $(".jsTieTwoSlider").slick("unslick");
    }
  } else {
    $(".jsTieTwoSlider")
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

  if ($(window).width() > 991) {
    if ($(".jsConvenienceSteps").hasClass("slick-initialized")) {
      $(".jsConvenienceSteps").slick("unslick");
    }
  } else {
    $(".jsConvenienceSteps")
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

  /*InstantPerSlider*/
  if ($(window).width() > 991) {
    if ($(".jsInstantPerSlider").hasClass("slick-initialized")) {
      $(".jsInstantPerSlider").slick("unslick");
    }
  } else {
    $(".jsInstantPerSlider")
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
  /*InstantPerSlider*/

  // Instant Personal loan in 5 minutes

  if ($(window).width() > 991) {
    if ($(".jsInstantPLPointsSlider").hasClass("slick-initialized")) {
      $(".jsInstantPLPointsSlider").slick("unslick");
    }
  } else {
    $(".jsInstantPLPointsSlider")
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

  // Instant Personal loan in 5 minutes

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

  /*document required tow slider*/
  if ($(window).width() > 767) {
    if ($(".jsDocumentRequiredTwoSlider").hasClass("slick-initialized")) {
      $(".jsDocumentRequiredTwoSlider").slick("unslick");
    }
  } else {
    $(".jsDocumentRequiredTwoSlider")
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

  /*jsTakePerSlider*/
  if ($(window).width() > 991) {
    if ($(".jsTakePerSlider").hasClass("slick-initialized")) {
      $(".jsTakePerSlider").slick("unslick");
    }
  } else {
    $(".jsTakePerSlider")
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
  /*jsTakePerSlider*/

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
    dots: true,
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
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
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
  const relatedVideo = {
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 2,
    slidesToScroll: 2,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          arrows: false,
          centerPadding: "30px",
        },
      },
      {
        breakpoint: 360,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "20px",
        },
      },
    ],
  };

  /*purpose piller slider*/
  if ($(window).width() > 767) {
    if ($("#jsPurposePillerSlider").hasClass("slick-initialized")) {
      $("#jsPurposePillerSlider").slick("unslick");
    }
  } else {
    $("#jsPurposePillerSlider")
      .not(".slick-initialized")
      .slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 3,
        arrows: false,
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
            },
          },
        ],
      });
  }
  /*purpose piller slider*/

  sliderFunc($(".banner-slider"), bannerSlider);
  sliderFunc($(".jsCustomerSaySlider"), CustomerSaySlider);
  sliderFunc($(".jsExploreSliderDesk"), ExploreSliderDesk);
  sliderFunc($(".jsExploreSliderMob"), ExploreSliderMob);
  sliderFunc($(".jsInstantSlider"), InstantSlider);
  sliderFunc($(".jsInstantSliderWithDots"), InstantSliderWithDot);
  sliderFunc($(".js-personal-loan-slider"), personalLoanSlider);
  sliderFunc($(".js-related-video-box-slider"), relatedVideo);

  sliderFunc($(".jsMultiPurposeSlider"), MultiPurposeSlider);
  sliderFunc($(".jsCanTakeSlider"), CanTakeSlider);
  sliderFunc($("#jsInvestmentSlider"), InvestmentSlider);
  sliderFunc($(".jsOurLogoSlider"), OurLogoSlider);

  $(".jsResultClose").click(function () {
    $(".results-box").fadeOut("fast");
  });

  /*select all filter js*/
  $("#filterSelectall").click(function () {
    $(".filterSelectedId").prop("checked", this.checked);
  });
  $(".filterSelectedId").change(function () {
    var check = $(".filterSelectedId").filter(":checked").length == $(".filterSelectedId").length;
    $("#filterSelectall").prop("checked", check);
  });
  /*select all filter js*/

  // leftScrollMenu();
  // /*way to service*/
  // if($(window).width() < 992) {
  //   $(".tab-left .jsTabSelect").on("click", function () {
  //     let parId = $(this).parent().parent().attr('id');
  //     $( "#" + parId +" .tab-left .jsTabSelect").removeClass("active");
  //     $(this).addClass("active");
  //     $("#" + parId + " .tab-left").scrollCenter(".active", 300);
  //   });
  // }
  // /*way to service*/

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

  // if($('body').hasClass('popover-modal-open')){
  //   $('.select2-container--default .select2-dropdown').css('z-index', '1051');
  // }

  // $(".js-select2, .js-select2-search-hide").on("click", function () {
  //   if($('body').hasClass('popover-modal-open')){
  //     $('.select2-container--default .select2-dropdown').css('z-index', '1051');
  //   }
  // });

  /*simple scroll bar*/
  // if($('.simple-bar').length > 0) {
  //   new SimpleBar($('.simple-bar')[0]);
  // }

  if ($(".simple-bar").length > 0) {
    for (var i = 0; i < $(".simple-bar").length; i++) {
      new SimpleBar($(".simple-bar")[i]);
    }
  }
  /*simple scroll bar*/

  /*6-12-2022*/
  $(".jsRatingBtn .rating-label input").click(function () {
    $(this)
      .parents(".feedback-forms")
      .find(".jsFeedBackTextbox")
      .removeClass("d-none");
  });

  $(".jsRatingBtn .rating-label input.very-good").each(function () {
    $(this).click(function () {
      $(this)
        .parents(".feedback-forms")
        .find(".jsFeedBackTextbox")
        .addClass("d-none");
      /*19-12-2022*/
      $(this)
        .parents(".feedback-forms")
        .find(".form-feedback-textarea")
        .val("");
      $(this)
        .parents(".feedback-forms")
        .find(".feedback-reason")
        .removeClass("textboxerror");
      $(this)
        .parents(".feedback-forms")
        .find(".feedback-reason")
        .find(".error-msgs")
        .remove();
      $(this)
        .parents(".feedback-forms")
        .find(".feedback-outers .jscurrent")
        .text("0");
      /*19-12-2022*/
      /*20-1-2023*/
      $(this)
        .parents(".feedback-forms")
        .find(".js-select2")
        .val(null)
        .trigger("change");
      /*20-1-2023*/
    });
  });

  // NPS feedback toggle submit button
  $(".jsRatingBtn .rating-label input").on("click", function () {
    var serviceVal = $(
      ".jsRatingBtn .rating-label input[name=services]:checked"
    ).length;
    var likelyVal = $(
      ".jsRatingBtn .rating-label input[name=likely]:checked"
    ).length;
    if (serviceVal > 0 && likelyVal > 0) {
      $(".JsNpsSubmit").removeClass("btn-disabled");
    } else {
      $(".JsNpsSubmit").addClass("btn-disabled");
    }
  });

  // NPS modal close
  $(".jsThanksModalClose").on("click", function () {
    $(".jsRatingBtn .rating-label input").prop("checked", false);
    $(".jsFeedBackTextbox").addClass("d-none");
    $(".JsNpsSubmit").addClass("btn-disabled");
    $("#nps-form .form-feedback-textarea").val("");
    $("#nps-form .feedback-reason").removeClass("textboxerror");
    $("#nps-form .feedback-reason").find(".error-msgs").remove();
    $("#nps-form .feedback-outers .jscurrent").text("0");
    $("#nps-form .js-select2").val(null).trigger("change");
  });

  /*2-5-2023*/
  // var npsHeaderHeight = $('.header.nps-header').outerHeight();
  // console.log(npsHeaderHeight);
  // $('body').css('padding-top', npsHeaderHeight);
  /*2-5-2023*/

  /*19-12-2022*/
  $(".text-limit-200").keyup(function () {
    var characterCount = $(this).val().length;
    $(this).parents(".feedback-outers").find(".jscurrent").text(characterCount);
  });

  /*19-12-2022*/

  /*tata card apply 4-1-2023*/
  $(".jsApplyRadioBtn").click(function () {
    var getDataAttri = $(this).attr("data-href");
    console.log(getDataAttri);
    $(".jsBtnApplySubmit").attr("href", getDataAttri);
    $(".jsBtnApplySubmit").removeClass("btn-disabled");
  });
  $(".jsBtnApplySubmit").click(function () {
    $(".jsApplyRadioBtn .custom-white-radio input").prop("checked", false);
    $(".jsBtnApplySubmit").addClass("btn-disabled");
  });
  /*tata card apply 4-1-2023*/

  /*contact us page*/
  $(".jsRadioBtnContact").click(function () {
    var getDataAttri = $(this).attr("data-href");
    console.log(getDataAttri);
    $(".jsProceedBtnContact").attr("href", getDataAttri);
    $(".jsProceedBtnContact").removeClass("btn-disabled");
  });
  $(".jsProceedBtnContact").click(function () {
    $(".jsRadioBtnContact .custom-white-radio input").prop("checked", false);
    $(".jsProceedBtnContact").addClass("btn-disabled");
  });
  /*contact us page*/

  /* charactor count blogs 9-1-2023*/
  if ($(window).width() < 992) {
    var showChar = 58;
  }
  if ($(window).width() < 374) {
    var showChar = 48;
  } else {
    var showChar = 48;
  }
  $(".fi-overlay-card .fi-card-mid h6").each(function () {
    var content = $(this).html();
    if (content.length > showChar) {
      var showLine = content.substr(0, showChar);
      var remainContent = content.substr(showChar, content.length - showChar);
      var allContent =
        showLine +
        '<span class="remaining-content d-none">' +
        remainContent +
        "</span> <span>...</span>";
      $(this).html(allContent);
    }
  });
  /* charactor count blogs 9-1-2023*/

  // Select 2 js //
  // $('.js-select2').select2({
  //   placeholder: "Select",
  // });
  // $('.js-select2-search-hide').select2({
  //   minimumResultsForSearch: Infinity
  // });

  $(".mCustomScrollBar").mCustomScrollbar({
    axis: "y", // horizontal scrollbar
  });

  //filter droddown body class disabled
  $(".filter-drop-wrap [data-rel]").click(function () {
    if ($(window).width() < 768) {
      $(this).parents("body").removeClass("scroll-hide-xs");
      $(this).parents(".header-inner").removeClass("backdrops-xs");
    }
  });

  /*audio player js*/
  if ($(window).width() > 1024) {
    $(".green-audio-player .volume").hover(
      function () {
        $(this).find(".volume__button").addClass("open");
        $(this).find(".volume__controls").removeClass("hidden");
      },
      function () {
        $(this).find(".volume__button").removeClass("open");
        $(this).find(".volume__controls").addClass("hidden");
      }
    );
  }
  /*audio player js*/

  //Tab dropdown js
  $(".jsTabDropdown .tab-drop-btn").click(function () {
    if ($(window).width() < 768) {
      $(".jsTabDropdown [data-tab]").removeClass("active");
      $(".jsTabDropdown [data-tab]").removeClass("active");
      $(".jsTabDropdown .jsDropdownBlock").removeClass("show");
    }
    var clickBtn = $(this).attr("tab-menu");
    var text = $(this).html();
    $(".jsTabDropdown .custom-tab-drop-btn").html(text);
    $(".jsTabDropdown [tab-content]").removeClass("active");
    $('.jsTabDropdown [tab-content="' + clickBtn + '"]').addClass("active");
  });

  $("[data-tab]").on("click", function () {
    var $id = $(this).attr("data-tab");
    if ($("#" + $id).css("display") == "none") {
      $(".jsDropdownBlock").removeClass("show");
      $("[data-tab]").removeClass("active");
      $(this).addClass("active");
      $("#" + $id).addClass("show");
    } else {
      $("[data-tab]").removeClass("active");
      $("#" + $id).removeClass("show");
    }
  });
  $(document).on("click", function (event) {
    var $trigger = $(".close-on-outside");
    if ($trigger !== event.target && !$trigger.has(event.target).length) {
      $("[data-tab]").removeClass("active");
      $(".jsDropdownBlock").removeClass("show");
    }
  });
  //Tab dropdown js

  /*20-2-2023*/
  if (".mCustomScrollbarSlide".length > 0) {
    $(".mCustomScrollbarSlide").mCustomScrollbar({
      axis: "x",
      scrollButtons: {
        enable: true,
        scrollSpeed: 50,
        scrollAmount: 50,
      },
      scrollbarPosition: "outside",
    });
  }
  /*20-2-2023*/  

});

/*audio player js*/
document.addEventListener("DOMContentLoaded", function () {
  GreenAudioPlayer.init({
    selector: ".autdio-player",
    stopOthersOnPlay: true,
  });
});
/*audio player js*/

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
  // console.log('windowScroll ', windowScroll);
  // console.log('topbarHeight ', topbarHeight);
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
  var re = /^[4-9][0-9]{9}$/;
  var check = re.test($(mobileField).val());
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

$(document).ready(function () {
  // Select 2 js //
  $(".js-select2").select2({
    placeholder: "Select",
  });
  $(".js-select2-search-hide").select2({
    minimumResultsForSearch: Infinity,
  });
});