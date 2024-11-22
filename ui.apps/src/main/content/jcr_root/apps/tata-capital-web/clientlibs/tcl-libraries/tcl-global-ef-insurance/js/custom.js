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
        .replace(/[^\d,-]/g, '')
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
    $(document).on("click", function (event) {
    var $trigger = $(".close-on-outside");
    if ($trigger !== event.target && !$trigger.has(event.target).length) {
      $('[data-tab]').removeClass('active');
      $(".jsDropdownBlock").removeClass("show");
    }
  });
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
  /*$(".js-btn-signin").on("click", function () {
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

  if ($(window).width() < 992) {
    $("[data-rel]").click(function () {
      $("body").removeClass("scroll-hide");
      $(".mob-header").removeClass("opened");
      $(".hamburger-menu").removeClass("animate-hamburger");
      $(".js-close-details").removeClass("active-sub");
    });
  }
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
  function sliderFunc(sliderParent, sliderProp = sliderProperties) {
    if (sliderParent.length) {
      if (sliderParent.hasClass("slick-initialized")) {
        sliderParent.slick("unslick");
      } else {
        sliderParent.not(".slick-initialized").slick(sliderProp);
      }
    }
  }
  
  /*document required slider*/
  if ($(window).width() > 767) {
    if ($('.jsDocumentRequiredTwoSlider').hasClass('slick-initialized')) {
      $('.jsDocumentRequiredTwoSlider').slick('unslick');
    }
  } else {
    $('.jsDocumentRequiredTwoSlider').not('.slick-initialized').slick({
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
  };
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
        }
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          dots: true,
          slidesToShow: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          dots: true,
          slidesToShow: 1,
          arrows: false,
          centerMode: true,
          centerPadding: "30px"
        }
      },
      {
        breakpoint: 576,
        settings: {
          dots: true,
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "30px"
        }
      }
    ]
  };
  sliderFunc($('#jsInvestmentSlider'), InvestmentSlider);
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