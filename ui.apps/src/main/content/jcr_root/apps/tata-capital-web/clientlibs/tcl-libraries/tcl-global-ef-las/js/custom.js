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
  /*get app js*/
  // $('.only-numeric-input').keyup(function (e) {
  //   $(this).val($(this).val().replace(/[^\d.-]/g, ''));
  // });
  // numeric input validation
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

  $(".only-numeric-decimal-input").keyup(function (e) {
    $(this).val(
      $(this)
        .val()
        .replace(/[^\d.]/g, "")
    );
  });
  $('.disable-emoji').bind('input', function() {
    // console.log('df')
    var val = $(this).val();
    var emojiRegex = /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;
    val = val.replace(emojiRegex, '')
    $(this).val(val);
  });
  // numeric input validation
  $(".only-numeric-input").keyup(function (e) {
    $(this).val($(this).val().replace(/\D/g, ""));
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
  /*modal js*/
  $('[data-popovermodal="popover-modal"]').click(function () {
    var ele_target = $(this).attr("data-target");
    setTimeout(function () {
      $(ele_target).addClass("popover-show");
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
  /* header top slider start */
  $(".js-headerTopSlider").slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  });
  /* header top slider end */
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
  });
  /* hamburger menu end */
  $(".header-menu .menu-item").hover(function () {
    $(".dropdown-block").removeClass("show");
    $('[data-rel="login"]').removeClass("active");
  });
  /*17-10-2022*/
  if ($(window).width() > 991) {
    $('.header-overlay').remove();
    $(".header-menu .menu-item .nav-link-dropdown").parents('.menu-item').hover(function () {
      var abc = $('.header-inner').outerHeight();
      $('.header-backdrop').append('<div class="header-overlay"></div>');
      $('.header-overlay').css('top', abc);
    }, function () {
      $('.header-overlay').remove();
    });
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
  });
  $("[data-rel]").on("click", function () {
    var $id = $(this).attr("data-rel");
    if ($("#" + $id).css("display") == "none") {
      $(".dropdown-block").removeClass("show");
      $("[data-rel]").removeClass("active");
      $(this).addClass("active");
      $("#" + $id).addClass("show");
      if($id == "updatesList"){
        mogoSound();
      }
    } else {
      $("[data-rel]").removeClass("active");
      $("#" + $id).removeClass("show");
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
  //left sticky
  /*$(".jsLeftSticky").on("click", function () {
    $(".sticky-quick-link").toggleClass("active");
  });*/
 /* $(".js-btn-signin").on("click", function () {
    $(".js-signin").show();
    $(this).parents(".js-signin").hide();
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
      var parId = $(this).parent().parent().attr("id");
      $("#" + parId + " .tab-left .jsTabSelect").removeClass("active");
      $(this).addClass("active");
      $("#" + parId + " .tab-left").scrollCenter(".active", 300);
    });
  }
  /*way to service*/
  /* tab active auto center start */
  $(".js-tabClick").on("click", function () {
    let parent = $(this).parents("[tabMenu-wrap]");
    parent.scrollCenter(".active", 300);
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
    var parId = $(this).parent().parent().attr("id");
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
    });
  }
  /* Commented By Nikita on 28/12/2022 Validation Code added in Biz.js */
  /*Subscribe newsletter
    $('#form-subscribe .js-subscribe-btn').click(function (e) {
      var ele_input = $('#form-subscribe .input-textbox');
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
          if (element.val() != '') {
            $(element).after('<span class="error-msgs"></span>');
            if ($(element).data('type') === 'email') {
              var regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gm;
              if (ele_value != '' && !ele_value.match(regEmail)) {
                $(element).parents('.form-textbox').addClass('textboxerror');
                $(element).next('.error-msgs').text(ele_email);
                errors.push(ele_email);
              }
              else {
                $(element).parents('.form-textbox').removeClass('textboxerror');
                $(element).next().text('');
              }
            }
          } else {
            $(element).parents('.form-textbox').addClass('textboxerror');
            $(element).after('<span class="error-msgs">' + ele_required + '</span>');
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
        $('.modal-backdrop').remove();
        setTimeout(function () {
            $('#subscribe-modal').addClass('popover-show');
        }, 80);        
        $('#subscribe-modal').css('display', 'block');
        $('body').addClass('popover-modal-open');
        $('body').append('<div class="modal-backdrop"></div>');
      }
    });
    $('.jsSubscribeClose').click(function(){
      $('#form-subscribe .input-textbox').val('');
      $('#form-subscribe .form-textbox').removeClass('textboxerror');
      $('#form-subscribe .form-textbox').removeClass('active');
    })
    $('#form-subscribe .input-textbox[data-type]').keyup(function () {
      var element = $(this);
      var ele_value = element.val();
      var ele_required = 'Field is required';
      var ele_email = "Please enter valid email ID";
      $(this).next('.error-msgs').remove();
      $(this).after('<span class="error-msgs"></span>');
      $(this).parents('.form-group').addClass('error');
      $('.subscribe-success').addClass('d-none');
      if ($(element).val() != '') {
        if ($(element).data('type') === 'email') {
          var regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gm;
          if (ele_value != '' && !ele_value.match(regEmail)) {
            $(element).parents('.form-textbox').addClass('textboxerror');
            $(element).next('.error-msgs').text(ele_email);
          }
          else {
            $(element).parents('.form-textbox').removeClass('textboxerror');
            $(element).next().text('');
          }
        }
      } else {
        $(element).next('.error-msgs').text(ele_required);
      }
    });
    Subscribe newsletter*/
  /* Commented By Nikita on 28/12/2022 Validation Code added in Biz.js */
  // pre-approved loan
  // $('#preApprovedLoanForm .input-textbox[data-type]').keyup(function () {
  //   var element = $(this);
  //   var ele_value = element.val();
  //   var ele_required = 'Field is required';
  //   var ele_name = "Enter full name as PAN card";
  //   var ele_phoneNumber = "Please enter valid number";
  //   $(this).next('.error-msgs').remove();
  //   $(this).after('<span class="error-msgs"></span>');
  //   $(this).parents('.form-group').addClass('error');
  //   if ($(element).val() != '') {
  //     if ($(element).data('type') === 'name') {
  //       var regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
  //       if (ele_value != '' && !ele_value.match(regName)) {
  //         $(element).parents('.form-textbox').addClass('textboxerror');
  //         $(element).next('.error-msgs').text(ele_name);
  //       }
  //       else {
  //         $(element).parents('.form-textbox').removeClass('textboxerror');
  //         $(element).next().text('');
  //       }
  //     }
  //     if ($(element).data('type') === 'mobile') {
  //       if (!validateMobile(element)) {
  //         $(element).parents('.form-textbox').addClass('textboxerror');
  //         $(element).next('.error-msgs').text(ele_phoneNumber);
  //       } else {
  //         $(element).parents('.form-textbox').removeClass('textboxerror');
  //         $(element).next().text('');
  //         $(this).next('.error-msgs').remove();
  //       }
  //     }
  //   } else {
  //     $(element).next('.error-msgs').text(ele_required);
  //   }
  // });
  // $('#preApprovedLoanForm .js-proceed-btn').click(function () {
  //   var ele_input = $('#preApprovedLoanForm .input-textbox');
  //   var errors = [];
  //   allFilled = true;
  //   var ele_required = "Field is required";
  //   $(ele_input).each(function () {
  //     var element = $(this);
  //     var ele_value = element.val();
  //     var ele_name = "Enter full name as PAN card";
  //     var ele_phoneNumber = "Please enter valid Phone Number";
  //     $(element).next().remove();
  //     if (element.is(":visible")) {
  //       if (element.val() != '') {
  //         $(element).after('<span class="error-msgs"></span>');
  //         if ($(element).data('type') === 'name') {
  //           var regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
  //           if (ele_value != '' && !ele_value.match(regName)) {
  //             $(element).parents('.form-textbox').addClass('textboxerror');
  //             $(element).next('.error-msgs').text(ele_name);
  //             errors.push(ele_name);
  //           }
  //           else {
  //             $(element).parents('.form-textbox').removeClass('textboxerror');
  //             $(element).next().text('');
  //           }
  //         }
  //         if ($(element).data('type') === 'mobile') {
  //           if (!validateMobile(element)) {
  //             $(element).parents('.form-textbox').addClass('textboxerror');
  //             $(element).next('.error-msgs').text(ele_phoneNumber);
  //             errors.push(ele_phoneNumber);
  //           } else {
  //             $(element).parents('.form-textbox').removeClass('textboxerror');
  //             $(element).next().text('');
  //             $(this).next('.error-msgs').remove();
  //           }
  //         }
  //       } else {
  //         $(element).parents('.form-textbox').addClass('textboxerror');
  //         $(element).after('<span class="error-msgs">' + ele_required + '</span>');
  //         errors.push(ele_required);
  //       }
  //     }
  //   });
  //   if (errors.length == 0) {
  //     $('.pre-approved-otp').removeClass('d-none');
  //     $('.pre-approved-candidate').addClass('d-none');
  //   }
  // });
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
      var ele_value = element.val();
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
      $(".whatsapp-success-mgs").removeClass("d-none");
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
      var ele_value = element.val();
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
  });
  /* Commented By Nikita on 29/12/2022 Validation Code added in Biz.js */
  /* $('#getInvestmentLink .js-getInvestmentLink').click(function () {
      var ele_input = $('#getInvestmentLink .input-textbox');
      var errors = [];
      allFilled = true;
      var ele_required = "Field is required";
      $(ele_input).each(function () {
        var element = $(this);
        var ele_phoneNumber = "Please enter valid Phone Number";
        $(element).next().remove();
        if (element.is(":visible")) {
          if (element.val() != '') {
            $(element).after('<span class="error-msgs"></span>');          
            if ($(element).data('type') === 'mobile') {
              if (!validateMobile(element)) {
                $(element).parents('.form-textbox').addClass('textboxerror');
                $(element).next('.error-msgs').text(ele_phoneNumber);
                errors.push(ele_phoneNumber);
              } else {
                $(element).parents('.form-textbox').removeClass('textboxerror');
                $(element).next().text('');
                $(this).next('.error-msgs').remove();
              }
            }          
          } else {
            $(element).parents('.form-textbox').addClass('textboxerror');
            $(element).after('<span class="error-msgs">' + ele_required + '</span>');
            errors.push(ele_required);
          }
        }      
      });
      if (errors.length == 0) {
        $('#getInvestmentLink .input-textbox').val('');
        console.log('Successful!')
      }    
    });
    $('#getInvestmentLink .input-textbox[data-type]').keyup(function () {
      var element = $(this);
      var ele_required = 'Field is required';
      var ele_phoneNumber = "Please enter valid Phone Number";
      $(this).next('.error-msgs').remove();
      $(this).after('<span class="error-msgs"></span>');
      $(this).parents('.form-group').addClass('error');
      if ($(element).val() != '') {
        if ($(element).data('type') === 'mobile') {
          if (!validateMobile(element)) {
            $(element).parents('.form-textbox').addClass('textboxerror');
            $(element).next('.error-msgs').text(ele_phoneNumber);
          } else {
            $(element).parents('.form-textbox').removeClass('textboxerror');
            $(element).next().text('');
            $(this).next('.error-msgs').remove();
          }
        }
      } else {
        $(element).next('.error-msgs').text(ele_required);
      }
    });
    $('#getLoanLink .js-getLoanLink').click(function () {
      var ele_input = $('#getLoanLink .input-textbox');
      var errors = [];
      allFilled = true;
      var ele_required = "Field is required";
      $(ele_input).each(function () {
        var element = $(this);
        var ele_phoneNumber = "Please enter valid Phone Number";
        $(element).next().remove();
        if (element.is(":visible")) {
          if (element.val() != '') {
            $(element).after('<span class="error-msgs"></span>');          
            if ($(element).data('type') === 'mobile') {
              if (!validateMobile(element)) {
                $(element).parents('.form-textbox').addClass('textboxerror');
                $(element).next('.error-msgs').text(ele_phoneNumber);
                errors.push(ele_phoneNumber);
              } else {
                $(element).parents('.form-textbox').removeClass('textboxerror');
                $(element).next().text('');
                $(this).next('.error-msgs').remove();
              }
            }          
          } else {
            $(element).parents('.form-textbox').addClass('textboxerror');
            $(element).after('<span class="error-msgs">' + ele_required + '</span>');
            errors.push(ele_required);
          }
        }      
      });
      if (errors.length == 0) {
        $('#getLoanLink .input-textbox').val('');
        console.log('Successful!')
      }    
    });
    $('#getLoanLink .input-textbox[data-type]').keyup(function () {
      var element = $(this);
      var ele_required = 'Field is required';
      var ele_phoneNumber = "Please enter valid Phone Number";
      $(this).next('.error-msgs').remove();
      $(this).after('<span class="error-msgs"></span>');
      $(this).parents('.form-group').addClass('error');
      if ($(element).val() != '') {
        if ($(element).data('type') === 'mobile') {
          if (!validateMobile(element)) {
            $(element).parents('.form-textbox').addClass('textboxerror');
            $(element).next('.error-msgs').text(ele_phoneNumber);
          } else {
            $(element).parents('.form-textbox').removeClass('textboxerror');
            $(element).next().text('');
            $(this).next('.error-msgs').remove();
          }
        }
      } else {
        $(element).next('.error-msgs').text(ele_required);
      }
    });*/
  /* Commented By Nikita on 29/12/2022 Validation Code added in Biz.js */
  // $('#preApprovedOtp .js-resendOTP').click(function () {
  //   $(this).parents('#preApprovedOtp').find('.js-OtpBox .input-textbox').val('').parents('.form-textbox').removeClass('active');
  //   $(this).parents('#preApprovedOtp').find('.js-OtpBox .input-textbox:first-child').focus();
  //   $(this).parents('#preApprovedOtp').find('button').addClass('btn-disabled');
  //   $('#preApprovedOtp .input-error').addClass('d-none');
  //   $('#preApprovedOtp .label-name').removeClass('d-none');
  // });
  // $("#preApprovedOtp .js-OtpBox .input-textbox").keyup(function () {
  //   $(this).parents('.form-textbox').removeClass('textboxerror');
  //   if (this.value.length == this.maxLength) {
  //     $(this).next('.input-textbox').focus();
  //     $(this).next('.input-textbox').removeClass('pointer-none');
  //   } else {
  //     $(this).prev('.input-textbox').focus();
  //     $(this).addClass('pointer-none');
  //     $('#preApprovedOtp .input-textbox:first').removeClass('pointer-none');
  //   }
  //   $(this).parents('.form-textbox').addClass('active');
  //   var ele_input = $('.js-OtpBox .input-textbox');
  //   $(ele_input).each(function () {
  //     if ($(this).val().length != 0) {
  //       $(this).parents('#preApprovedOtp').find('.jsPreApprovedSubmitOtp').removeClass('btn-disabled');
  //       $(this).parents('.form-textbox').addClass('active');
  //     }
  //     else {
  //       $(this).parents('#preApprovedOtp').find('.jsPreApprovedSubmitOtp').addClass('btn-disabled');
  //     }
  // });
  // $('[dropdown-item]').click(function(){
  //   $(this).parents('.custom-dropdown').find('[dropdown-item]').removeClass('active');
  //   $(this).addClass('active');
  //   var dropdownSelected = $(this).text();
  //   $(this).parents('.custom-dropdown').find('.dropdown-heading').text(dropdownSelected);
  // })
  // }).focus(function () {
  //   $('.error-msgs').remove();
  //   $(this).parents('.form-textbox').removeClass('textboxerror');
  // }).blur(function () {
  //   if ($(this).val().length != 0) {
  //     $(this).parents('.form-textbox').addClass("active");
  //   } else if ($(this).val().length == 0) {
  //     $(this).parents('.form-textbox').removeClass("active");
  //   }
  // });
  // $('.jsPreApprovedSubmitOtp').on('click',function(){
  //   $('#preApprovedOtp .input-textbox').val('')
  //   $('#preApprovedLoanForm').find('.form-textbox').removeClass('active');
  //   $('#preApprovedLoanForm').find('.input-textbox').val('');
  //   window.location='http://www.google.com/';
  // })
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
    autoplay: true,
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
  /* Slide Show changed from 1 to 3 by Nikita on 28/12/2022*/
  /*customer-say slider*/
  const CustomerSaySlider = {
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
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          arrows: false,
          centerMode: true,
          centerPadding: "30px",
          infinite: true,
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "30px",
          infinite: true,
        }
      }
    ]
  };
  /*customer-say slider*/
  /* Slide Show changed from 1 to 3 by Nikita on 28/12/2022*/
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
  // $('.jsConvenienceSlider').slick({
  //   dots: true,
  //   infinite: true,
  //   speed: 300,
  //   slidesToShow: 3,
  //   slidesToScroll: 3,
  //   arrows: false,
  //   responsive: [
  //     {
  //       breakpoint: 992,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 2,
  //         infinite: true,
  //       }
  //     },
  //     {
  //       breakpoint: 768,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         centerMode: true,
  //         centerPadding: "30px",
  //         infinite: false
  //       }
  //     }
  //   ]
  // });
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
    dots: false, //feedback changes 22-12-2022
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
  sliderFunc($(".banner-slider"), bannerSlider);
  sliderFunc($('.jsCustomerSaySlider'), CustomerSaySlider);
  sliderFunc($(".jsExploreSliderDesk"), ExploreSliderDesk);
  sliderFunc($(".jsExploreSliderMob"), ExploreSliderMob);
  sliderFunc($(".jsInstantSlider"), InstantSlider);
  sliderFunc($(".js-personal-loan-slider"), personalLoanSlider);
  sliderFunc($(".js-related-video-box-slider"), relatedVideo);
  sliderFunc($(".jsMultiPurposeSlider"), MultiPurposeSlider);
  sliderFunc($(".jsCanTakeSlider"), CanTakeSlider);
  $(".jsResultClose").click(function () {
    $(".results-box").fadeOut("fast");
  });
  // leftScrollMenu();
  // /*way to service*/
  // if($(window).width() < 992) {
  //   $(".tab-left .jsTabSelect").on("click", function () {
  //     var parId = $(this).parent().parent().attr('id');
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
    });
    /* var npsHeaderHeight = $('.header.nps-header').outerHeight();
    console.log(npsHeaderHeight);
    $('body').css('padding-top', npsHeaderHeight); */
    /*6-12-2022*/
    // Select 2 js //
    // $('.js-select2').select2({
    //   placeholder: "Select",
    // });
    // $('.js-select2-search-hide').select2({
    //   minimumResultsForSearch: Infinity
    // });
    /*$(".mCustomScrollBar").mCustomScrollbar({
      axis:"y" // horizontal scrollbar
    }); */
  })
  $(window).resize(function () {
    $('.slick-slider').slick('refresh');  
    header_fixed();
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
    $(".jsFeedBackTextbox .form-feedback-textarea").val("");
  });
  /* var npsHeaderHeight = $(".header.nps-header").outerHeight();
  console.log(npsHeaderHeight);
  $("body").css("padding-top", npsHeaderHeight); */
  /*6-12-2022*/
  // Select 2 js //
  // $('.js-select2').select2({
  //   placeholder: "Select",
  // });
  // $('.js-select2-search-hide').select2({
  //   minimumResultsForSearch: Infinity
  // });
  /*$(".mCustomScrollBar").mCustomScrollbar({
    axis: "y", // horizontal scrollbar
  });*/

  /*chatbot 26-06-2023*/
  $('.chat-tia-btn .jsChatBtn').on('click', function () {
    $(this).removeClass('showing')
    $(this).addClass('hiding')
    $('.ask-tia-wrap').addClass('showing');
    $('.ask-tia-wrap').removeClass('hiding');
  });
  $('.ask-tia-wrap .cross-btn').on('click', function () {
    $('.chat-tia-btn .jsChatBtn').removeClass('hiding')
    $('.chat-tia-btn .jsChatBtn').addClass('showing')
    $('.ask-tia-wrap').addClass('hiding');
    $('.ask-tia-wrap').removeClass('showing');
  });

  /*chatbot 26-06-2023*/
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
  var re = /^[6-9][0-9]{9}$/;
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
