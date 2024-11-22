$(document).ready(function () {

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

  /*get app js*/
  // $('.only-numeric-input').keyup(function (e) {
  //   $(this).val($(this).val().replace(/[^\d.-]/g, ''));
  // });   

    /*11-4-2023*/
    $('.disable-emoji').bind('input', function() {
      // console.log('df')
      var val = $(this).val();
      var emojiRegex = /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;
      val = val.replace(emojiRegex, '')
      $(this).val(val);
    });
    /*11-4-2023*/


  // numeric input validation
  $('.only-numeric-decimal-input').keyup(function (e) {
    $(this).val($(this).val().replace(/[^\d,-]/g, ''));
  });

  // numeric input validation
  $('.only-numeric-input').keyup(function (e) {
    $(this).val($(this).val().replace(/\D/g, ''));
  });

  input_animation();
  input_animation_new();

  $('.jsCopyLink').click(function () {
    $('.jsCopyLink').removeClass('copied');
    $(this).addClass('copied');
    $(this).find('.text-copy').text('Copied');
    setTimeout(function () {
      $('.jsCopyLink').removeClass('copied');
      $('.jsCopyLink .text-copy').text('Copy');
    }, 2500)
  })

  $(document).on("click", function (event) {
    var $trigger = $(".close-on-outside");
    if ($trigger !== event.target && !$trigger.has(event.target).length) {
      $('[data-rel]').removeClass('active')
      $(".dropdown-block").removeClass("show");
    }
  });

  /*header Search dropdown js*/
  $.fn.hasAttr = function (dropdown) {
    return this.attr(dropdown) !== undefined;
  };

  $('.js-close-outside .share-bundle-menu').click(function (e) {
    e.stopPropagation();
  })

  $('.jsParaMore').click(function () {
    $(this).parents('.jsParaOuter').find('.para-remain-content').toggleClass('d-none');
    if ($(this).hasClass('actives')) {
      $(this).removeClass('actives');
      $(this).text('View More');
    }
    else {
      $(this).addClass('actives');
      $(this).text('View Less');
    }
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


  $('.js-showDetail').click(function () {
    $('body').addClass('scroll-hide');
    ele_showDetail = $(this).attr('data-value');
    $('.js-close-details').removeClass('active-sub');
    $('#' + ele_showDetail).addClass('active-sub');
    $('.mob-inner-header').addClass('d-none');
  })

  $('.js-menu-back').click(function () {
    $('body').addClass('scroll-hide');
    $(this).parents('.js-close-details').removeClass('active-sub');
    $('.mob-inner-header').removeClass('d-none');
  })


  /* header top slider start */
  /* $('.js-headerTopSlider').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1
  });*/
  /* header top slider end */

  /* menu tab start */
  $('[tab-menu]').click(function (e) {
    e.preventDefault();
    var tabMenu = $(this).attr('tab-menu');
    $(this).parents('[tab-wrapper]').find('[tab-menu]').removeClass('active');
    $(this).addClass('active');
    $(this).parents('[tab-wrapper]').find('[tab-contnet]').addClass('d-none');
    $(this).parents('[tab-wrapper]').find('[tab-contnet="' + tabMenu + '"]').removeClass('d-none');
  });
  /* menu tab end */

  /* Footer JS */
  $('.footer-main-content .footer-row .footer-headings').each(function () {
    $(this).click(function () {
      $(this).toggleClass('active');
      $(this).siblings('.footer-body').slideToggle();
      $(this).parents('.footer-row').siblings('.footer-row').find('.footer-headings').removeClass('active');
      $(this).parents('.footer-row').siblings('.footer-row').find('.footer-body').slideUp();

      $(this).parents('.footer-main-content').siblings('.our-other-websites').find('.footer-headings').removeClass('active');
      $(this).parents('.footer-main-content').siblings('.our-other-websites').find('.our-websites-inner').slideUp();
    })
  })
  $('.jsAccordian [accod-head]').each(function (ele) {
    $(this).click(function () {
      $(this).toggleClass('active');
      $(this).siblings('[accod-body]').slideToggle('100');
      $(this).parents('[accod-row]').siblings('[accod-row]').find('[accod-head]').removeClass('active');
      $(this).parents('[accod-row]').siblings('[accod-row]').find('[accod-body]').slideUp();

      $(this).parents('.our-other-websites').siblings('.footer-main-content').find('.footer-col .footer-headings').removeClass('active').siblings('.footer-body').slideUp();
    })
  })

  $('.jsFaqActive [accod-head]').each(function (ele) {
    $(this).click(function () {
      $(this).parents('[accod-row]').toggleClass('add-bg');
      $(this).parents('[accod-row]').siblings('[accod-row]').removeClass('add-bg');
    })
  })

  /*sub accordian*/
  $('.js-sub-accordian [subaccord-head]').each(function (ele) {
    $(this).click(function () {
      $(this).toggleClass('subs-opned');
      $(this).siblings('[subaccord-body]').slideToggle();
      $(this).parents('[subaccord-row]').siblings('[subaccord-row]').find('[subaccord-head]').removeClass('subs-opned');
      $(this).parents('[subaccord-row]').siblings('[subaccord-row]').find('[subaccord-body]').slideUp();
    })
  })
  /*sub accordian*/
  
  /* Accordian Js */
  $('[data-accordian="tab"]').click(function (ele) {
    var ele_parents = $(ele.target).parents('.accrodian').attr('id');
    var ele_target = $(this).data('target');

    $(ele.target).parents('.navTab').find('.nav-tablist').removeClass('active');
    $(this).parent('.nav-tablist').addClass('active');

    $('#' + ele_parents).find('.tab-panel').hide().addClass('collapse');
    $('#' + ele_parents).find('#' + ele_target).show().removeClass('collapse');
  });

  $('[data-collapse="collapse"]').off('click').on('click', function (ele) {
    /*Added by Nikita 20/01/2023 for analytics calling*/
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
    /*Added by Nikita 20/01/2023 for analytics calling*/
    var ele_parents = $(ele.currentTarget).parents('.accrodian').attr('id');
    var ele_target = $(this).data('target');

    if ($(this).parent('.nav-tablist').hasClass('active')) {
      $(this).parent('.nav-tablist').removeClass('active');
    } else {
      $(ele.currentTarget).parents('.navTab').find('.nav-tablist').removeClass('active');
      $(this).parent('.nav-tablist').addClass('active');
    }

    if ($(this).parents('#' + ele_parents).find('#' + ele_target).css('display') == 'block') {
      $('#' + ele_parents).find('#' + ele_target).hide();
    } else {
      $('#' + ele_parents).find('.tab-panel').hide();
      $('#' + ele_parents).find('#' + ele_target).show();
    }

  });

  $('[data-toggle="collapse"]').off('click').on('click', function (ele) {
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
    var ele_parents = $(ele.target).parents('.accrodian').attr('id');

    $('#' + ele_parents).find('.collapse').slideUp();
    $('#' + ele_parents).find('[data-toggle="collapse"]').attr('aria-expanded', 'false');

    if ($(ele.target).parent().siblings().css('display') == "block") {
      $(ele.target).parent().siblings().slideUp();
      $(ele.target).attr('aria-expanded', 'false');

    } else {
      $(ele.target).parent().siblings().slideDown();
      $(ele.target).attr('aria-expanded', 'true');
    }
  });

  /* hamburger menu start */
  $(".hamburger-menu").click(function () {
    this.classList.toggle("animate-hamburger");
    $('.mob-inner-header').removeClass('d-none');
    $('body').toggleClass('scroll-hide');
    /*2-12-2022*/
    $('.header-inner').toggleClass('backdrops');
    /*2-12-2022*/
    $('.mob-header').toggleClass('opened');
    $('.js-close-details').removeClass('active-sub');
    /*3-1-2023*/
    if ($(window).width() < 768) {
      $('body').removeClass('scroll-hide-xs');
      $('.header-inner').removeClass('backdrops-xs');
    }
    /*3-1-2023*/
  });
  /* hamburger menu end */

  $('.header-menu .menu-item').hover(function () {
    $('.dropdown-block').removeClass('show');
    $('[data-rel="login"]').removeClass('active');
  })

  /*17-10-2022*/
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
  }
  /*17-10-2022*/


  /*main-mobile menu js*/
  $('.js-mobsubmenu .js-accord-col-mob .submenu-head').each(function () {
    $(this).click(function () {
      $(this).toggleClass('main-opened');
      $(this).siblings('.accord-body').slideToggle();
      $(this).parents('.js-accord-col-mob').siblings('.js-accord-col-mob').find('.submenu-head').removeClass('main-opened');
      $(this).parents('.js-accord-col-mob').siblings('.js-accord-col-mob').find('.accord-body').slideUp();
    })
  })
  /*main-mobile menu js*/


  $('[dismiss-rel]').on('click', function () {
    var $id = $(this).attr('dismiss-rel');
    $('[data-rel]').removeClass('active')
    $('#' + $id).removeClass('show');
    /*3-1-2023*/
    if ($(window).width() < 768) {
      $('body').removeClass('scroll-hide-xs');
      $('.header-inner').removeClass('backdrops-xs');
    }
    /*3-1-2023*/
  })

  $('[data-rel]').on('click', function () {
    var $id = $(this).attr('data-rel');
    if ($('#' + $id).css('display') == 'none') {
      $('.dropdown-block').removeClass('show');
      $('[data-rel]').removeClass('active')
      /*3-1-2023*/
      $('body').removeClass('scroll-hide-xs');
      $('.header-inner').removeClass('backdrops-xs');
      /*3-1-2023*/
      $(this).addClass('active');
      $('#' + $id).addClass('show');
      if($id == "updatesList"){
        mogoSound();
      }
      /*3-1-2023*/
      if ($(window).width() < 768) {
        /* after clicking on dropdown item
        $(this).parents('body').addClass('scroll-hide-xs');*/
        $(this).parents('.header-inner').addClass('backdrops-xs');
      }
      /*3-1-2023*/
    }
    else {
      $('[data-rel]').removeClass('active')
      $('#' + $id).removeClass('show');
      /*3-1-2023*/
      if ($(window).width() < 768) {
        $('body').removeClass('scroll-hide-xs');
        $('.header-inner').removeClass('backdrops-xs');
      }
    }
  })

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

  $('.jsMobOverviewsLink').click(function () {
    $('.mob-overviews-accodian').slideToggle();
    $(this).toggleClass('opened');
    $(this).parents('.overviews-tab-box').toggleClass('with-opens');
    /*16-3-2023*/ 
    $('.sticky-quick-link').removeClass('active');
    $('.js-sticky-actions').removeClass('active');
    /*16-3-2023*/
  });

  /*Financial insights start*/
  $('.js-fi-slider').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
    if ($('.js-fi-slider .financial-insights-slider').length <= 3) {
      if ($(window).width() > 991) {
        $('.js-fi-slider').removeClass('slider-dots slick-dotted');
      }
    }
    else {
      $('.js-fi-slider').addClass('slider-dots slick-dotted');
    }
  });

  $('.js-fi-slider').slick({
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
        }
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
        }
      }
    ]
  });

   /*MultiPurposeSlider slider*/    
   $('.jsMultiPurposeSlider').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
    if ($('.jsMultiPurposeSlider .instant-per-row').length <= 4) {
        if ($(window).width() > 1199) {
            $('.jsMultiPurposeSlider').removeClass('slider-dots slick-dotted');
        } 
    } 
    else{
        $('.jsMultiPurposeSlider').addClass('slider-dots slick-dotted');
    }
});
const MultiPurposeSlider = {
  dots: true,
  infinite: true,
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
		arrows: false,
        centerMode: true,
        centerPadding: "40px",
        infinite: false,
        dots: true,
      }
    }
  ]
};
/*MultiPurposeSlider slider*

  /*Financial insights start*/
  $('.jsEmiOptionSlider').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
    if ($('.jsEmiOptionSlider .suitable-emi-options-row').length <= 3) {
      if ($(window).width() > 991) {
        $('.jsEmiOptionSlider').removeClass('slider-dots slick-dotted');
      }
    }
    else {
      $('.jsEmiOptionSlider').addClass('slider-dots slick-dotted');
    }
  });

  $('.jsEmiOptionSlider').slick({
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
        }
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
        }
      }
    ]
  });

  // Financial insights share outside clicking hide content
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

  leftScrollMenu();
  /*way to service*/
  if ($(window).width() < 992) {
    $(".tab-left .jsTabSelect").on("click", function () {
      var parId = $(this).parent().parent().attr('id');
      $("#" + parId + " .tab-left .jsTabSelect").removeClass("active");
      $(this).addClass("active");
      $("#" + parId + " .tab-left").scrollCenter(".active", 300);
    });
  }
  /*way to service*/

  /* tab active auto center start */
  $(".js-tabClick").on("click", function () {
    let parent = $(this).parents('[tabMenu-wrap]');
    parent.scrollCenter(".active", 300);
  });
  /* tab active auto center end */


  /*Financial insights end*/

  $('.jsTabSelect').on('click', function () {
    // console.log(this.id);
    var parId = $(this).parent().parent().attr('id');
    $('#' + parId + ' .tab-content').removeClass('active');
    $('#' + parId + ' .tablinks').removeClass('active');
    $(this).addClass('active');
    $('.' + this.id).addClass('active');
  });
  /*Ways to service end*/

  if ($(window).width() < 992) {
    $('.fi-share-btn').on('click', function () {
      $('.' + this.id).toggleClass('active');
    });
  }
  /*Financial insights end*/

  if ($(window).width() < 992) {
    $('[data-rel]').click(function () {
      $('body').removeClass('scroll-hide');
      $('.mob-header').removeClass('opened');
      $('.hamburger-menu').removeClass('animate-hamburger');
      $('.js-close-details').removeClass('active-sub');
    })
  }
  /* Commented By Nikita on 28/12/2022 Validation Code added in Biz.js */

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
  $('.jsExploreSliderDesk').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
    if ($('.jsExploreSliderDesk .explore-row').length <= 3) {
      if ($(window).width() > 1199) {
        $('.jsExploreSliderDesk').removeClass('slider-dots slick-dotted');
      }
    }
    else {
      $('.jsExploreSliderDesk').addClass('slider-dots slick-dotted');
    }
  });

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
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: true,
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
        }
      }
    ]
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
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
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
        }
      }
    ]
  };
  /*explore mobile*/

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


  if ($(window).width() > 991) {
    if ($('.jsConvenienceSlider').hasClass('slick-initialized')) {
      $('.jsConvenienceSlider').slick('unslick');
    }
  } else {
    $('.jsConvenienceSlider').not('.slick-initialized').slick({
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
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: true,
            centerPadding: "30px",
            infinite: false
          }
        }
      ]
    });
  }

  /*Convenience Slider*/


  if ($(window).width() > 991) {
    if ($('.jsTieSlider').hasClass('slick-initialized')) {
      $('.jsTieSlider').slick('unslick');
    }
  } else {
    $('.jsTieSlider').not('.slick-initialized').slick({
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
            centerPadding: "40px",
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


  if ($(window).width() > 991) {
    if ($('.jsConvenienceSteps').hasClass('slick-initialized')) {
      $('.jsConvenienceSteps').slick('unslick');
    }
  } else {
    $('.jsConvenienceSteps').not('.slick-initialized').slick({
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
            centerPadding: "40px",
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


  /*InstantPerSlider*/
  if ($(window).width() > 991) {
    if ($('.jsInstantPerSlider').hasClass('slick-initialized')) {
      $('.jsInstantPerSlider').slick('unslick');
    }
  } else {
    $('.jsInstantPerSlider').not('.slick-initialized').slick({
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
            centerPadding: "40px",
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
  /*InstantPerSlider*/

  // Instant Personal loan in 5 minutes

  if ($(window).width() > 991) {
    if ($('.jsInstantPLPointsSlider').hasClass('slick-initialized')) {
      $('.jsInstantPLPointsSlider').slick('unslick');
    }
  } else {
    $('.jsInstantPLPointsSlider').not('.slick-initialized').slick({
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
            centerPadding: "40px",
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

  // Instant Personal loan in 5 minutes


  /*document required slider*/
  if ($(window).width() > 991) {
    if ($('.jsDocumentRequiredSlider').hasClass('slick-initialized')) {
      $('.jsDocumentRequiredSlider').slick('unslick');
    }
  } else {
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
  /*document required slider*/

  /*document required tow slider*/
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
  }
  /*document required slider*/

  /*jsTakePerSlider*/
  if ($(window).width() > 991) {
    if ($('.jsTakePerSlider').hasClass('slick-initialized')) {
      $('.jsTakePerSlider').slick('unslick');
    }
  } else {
    $('.jsTakePerSlider').not('.slick-initialized').slick({
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
            centerPadding: "40px",
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
  /*jsTakePerSlider*/

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
    arrows: true,
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
          arrows: false,
          centerPadding: "30px",
          infinite: false,
          dots: true,
        }
      }
    ]
  };

  $('.js-personal-loan-slider2').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
    if ($('.js-personal-loan-slider .item').length <= 4) {
        if ($(window).width() > 1199) {
            $('.js-personal-loan-slider2').removeClass('slider-dots slick-dotted');
        } 
    } 
    else{
        $('.js-personal-loan-slider2').addClass('slider-dots slick-dotted');
    }
  });
  const personalLoanSlider2 = {
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: true,
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
        }
      },
      {
        breakpoint: 360,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "20px",
        }
      }
    ]
  };

  sliderFunc($('.jsCustomerSaySlider'), CustomerSaySlider);
  sliderFunc($('.jsExploreSliderDesk'), ExploreSliderDesk);
  sliderFunc($('.jsExploreSliderMob'), ExploreSliderMob);
  sliderFunc($('.js-personal-loan-slider'), personalLoanSlider);
  sliderFunc($('.js-personal-loan-slider2'), personalLoanSlider2);
  sliderFunc($('.js-related-video-box-slider'), relatedVideo);
  sliderFunc($('.jsCanTakeSlider'), CanTakeSlider);
  sliderFunc($('.jsMultiPurposeSlider'), MultiPurposeSlider);
  sliderFunc($('#jsInvestmentSlider'), InvestmentSlider);

  $('.jsResultClose').click(function () {
    $('.results-box').fadeOut('fast');
  })

  $('.JsCreditCard').click(function () {
    $('.dropdown-content-wrap').css('transform', 'translateY(-100%)');
  })
  $('.header-menu .menu-item .nav-link').focus(function () {
    $('.dropdown-content-wrap').removeAttr('style');
  })
  $('.header-menu .menu-item .nav-link').hover(function () {
    $('.dropdown-content-wrap').removeAttr('style');
  })


  /*lezy load*/
  const observer = lozad(); // lazy loads elements with default selector as '.lozad'
  observer.observe();
  /*lezy load*/

  /*6-12-2022*/
  $('.jsRatingBtn .rating-label input').click(function () {
    $(this).parents('.feedback-forms').find('.jsFeedBackTextbox').removeClass('d-none');
  });

  $('.jsRatingBtn .rating-label input.very-good').each(function () {
    $(this).click(function () {
      $(this).parents('.feedback-forms').find('.jsFeedBackTextbox').addClass('d-none');
    })
  });

  // NPS feedback toggle submit button
  $('.jsRatingBtn .rating-label input').on('click', function () {
    var serviceVal = $('.jsRatingBtn .rating-label input[name=services]:checked').length;
    var likelyVal = $('.jsRatingBtn .rating-label input[name=likely]:checked').length;
    if (serviceVal > 0 && likelyVal > 0) {
      $('.JsNpsSubmit').removeClass('btn-disabled');
    } else {
      $('.JsNpsSubmit').addClass('btn-disabled');
    }
  });

  // NPS modal close
  $('.jsThanksModalClose').on('click', function () {
    $('.jsRatingBtn .rating-label input').prop('checked', false);
    $('.jsFeedBackTextbox').addClass('d-none');
    $('.JsNpsSubmit').addClass('btn-disabled');
    $('.jsFeedBackTextbox .form-feedback-textarea').val('');
  });

  // Select 2 js //
  $('.js-select2').select2({
    placeholder: "Select",
  });
  $('.js-select2-search-hide').select2({
    minimumResultsForSearch: Infinity
  });

})


$(window).resize(function () {
  $('.slick-slider').slick('refresh');
  header_fixed();
});


$(window).on('load', function () {
  header_fixed();
})


$(window).on('scroll', function () {
  header_fixed();
});

/*floating section on scroll*/
$('.js-floating').before('<div class="floating"></div>');
$(window).scroll(function () {
  var headerHeight = $('.header-inner.affix .header-navbar').outerHeight();
  if ($('.js-floating').length > 0) {
    var ele_floating = $('.js-floating');
    var ele_height = $(ele_floating).outerHeight();
    var ele_position = $('.floating').position().top - headerHeight;
    var scrollTop = $(window).scrollTop();
    if (scrollTop >= ele_position) {
      ele_floating.addClass('affix').css({ 'top': headerHeight }).prev('.floating').css('height', ele_height);
    } else {
      ele_floating.removeClass('affix').css({ 'top': '0', }).prev('.floating').css('height', '0');
    }
  }
});




/*header scroll fixed animation*/

var NAVBAR_HEIGHT = $('.header-navbar').innerHeight();
function header_fixed() {
  var windowScroll = $(window).scrollTop();
  var topbarHeight = $('.header-top').innerHeight();

  if (windowScroll >= topbarHeight) {
    $('.header-inner').addClass('affix');
    $('.header').css('padding-top', NAVBAR_HEIGHT + topbarHeight);
    if ($(window).width() > 991) {
      $('.header-overlay').css('top', topbarHeight);
    }
  } else {
    $('.header-inner').removeClass('affix');
    $('.header').css('padding-top', 0);
    /*$('.js-headerTopSlider').slick('refresh');*/
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
  $('.form-textbox .input-textbox').change(function () {
    if ($(this).val().length != 0) {
      $(this).parents('.form-textbox').addClass("active");
    } else if ($(this).val().length == 0) {
      $(this).parents('.form-textbox').removeClass("active");
    }
  }).focus(function () {
    $(this).parents('.form-textbox').addClass("active");
  }).blur(function () {
    if ($(this).val().length != 0) {
      $(this).parents('.form-textbox').addClass("active");
    } else if ($(this).val().length == 0) {
      $(this).parents('.form-textbox').removeClass("active");
    }
  });
}

function input_animation_new() {
  $('.form-textbox-new .input-textbox').change(function () {
    if ($(this).val().length != 0) {
      $(this).parents('.form-textbox-new').addClass("active");
    } else if ($(this).val().length == 0) {
      $(this).parents('.form-textbox-new').removeClass("active");
    }
  }).focus(function () {
    $(this).parents('.form-textbox-new').addClass("active onchange");
  }).blur(function () {
    if ($(this).val().length != 0) {
      $(this).parents('.form-textbox-new').addClass("active");
      $(this).parents('.form-textbox-new').removeClass("onchange");
    } else if ($(this).val().length == 0) {
      $(this).parents('.form-textbox-new').removeClass("active");
      $(this).parents('.form-textbox-new').removeClass("onchange");
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

    jQuery(this).animate({
      scrollLeft: pos
    }, speed == undefined ? 1000 : speed);
    return this;
  };

  $.fn.scrollCenterORI = function (elem, speed) {
    jQuery(this).animate({
      scrollLeft: jQuery(this).scrollLeft() - jQuery(this).offset().left + jQuery(elem).offset().left
    }, speed == undefined ? 1000 : speed);
    return this;
  };
}

  //Tab dropdown js
  $('.jsTabDropdown .tab-drop-btn').click(function (){
    if ($(window).width() < 768) {
      $('.jsTabDropdown [data-tab]').removeClass('active');
      // $('.jsTabDropdown [data-tab]').removeClass('active');
      $('.jsTabDropdown .jsDropdownBlock').removeClass('show');
    }
    var clickBtn =  $(this).attr('tab-menu');
    var text =  $(this).html();
    $('.jsTabDropdown .custom-tab-drop-btn').html(text);
    $('.jsTabDropdown [tab-content]').removeClass('active')
    $('.jsTabDropdown [tab-content="' + clickBtn + '"]').addClass('active');
  });


  $('[data-tab]').on('click', function () {
    var $id = $(this).attr('data-tab');
    if ($('#' + $id).css('display') == 'none') {
      $('.jsDropdownBlock').removeClass('show');
      $('[data-tab]').removeClass('active')
      $(this).addClass('active');
      $('#' + $id).addClass('show');
    }
    else {
      $('[data-tab]').removeClass('active')
      $('#' + $id).removeClass('show');
    }
  })
  $(document).on("click", function (event) {
    var $trigger = $(".close-on-outside");
    if ($trigger !== event.target && !$trigger.has(event.target).length) {
      $('[data-tab]').removeClass('active');
      $(".jsDropdownBlock").removeClass("show");
    }
  });
  //Tab dropdown js

$('.js-fi-share-btn').on('click', function(e){
  e.preventDefault();
  // e.stopImmediatePropagation();
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

$('.jsOpenAnimationModal').click(function () {
  $('.modal-backdrop').remove();
  setTimeout(function () {
    $('#offers-modal').addClass('popover-show');
  }, 80);

  $('#offers-modal').css('display', 'block');
  $('body').addClass('popover-modal-open');
  $('body').append('<div class="modal-backdrop"></div>');

  setTimeout(function () {
    $('.modal-animation-wrap .popover-top-heads').removeClass('translate-top');
  }, 500);

  setTimeout(function () {
    $('.modal-animation-wrap .offer-icon').removeClass('translate-scale');
  }, 600);

  setTimeout(function () {
    $('.modal-animation-wrap .lookings-offers .offer-user-details').removeClass('fade-in');
  }, 1000);

  setTimeout(function () {
    $('.modal-animation-wrap .lookings-offers .offers-loader').removeClass('fade_in');
  }, 1100);


  setTimeout(function () {
    $('.modal-animation-wrap .lookings-offers .offers-loader').addClass('d-none');
  }, 2500);

});

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