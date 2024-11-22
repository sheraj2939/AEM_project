$(document).ready(function () {
  // aplhabet input validation
  $('.only-alpha-input').keypress(function (e) {
    if (String.fromCharCode(e.keyCode).match(/[^a-zA-Z ]/g)) {
      return false;
    }
  });

  //replaces Emoji
  $('.disable-emoji').keyup(function () {
    var val = $(this).val();
    var emojiRegex = /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;
    val = val.replace(emojiRegex, '')
    $(this).val(val);
  })

  /*single decmal 26-5-2023*/
  $('.single-dot').keypress(function (event) {
    if (event.which == 46
      && $(this).val().indexOf('.') != -1) {
      event.preventDefault();
    } // prevent if already decimal point

    if (event.which != 46 && (event.which < 48 || event.which > 57)) {
      event.preventDefault();
    } // prevent if not number/dot
  });
  /*single decmal*/

  $('.only-numeric-decimal-input').keyup(function (e) {
    $(this).val($(this).val().replace(/[^\d,-,NaN]/g, ''));
  });

  $('.price-with-comma-form').on('keyup',function () {
    if ($(this).val() != "") {
        var rupeeValue = parseFloat($(this).val().replace(/,/g, ''));
        commaSeparatedValue = rupeeValue.toLocaleString('en-IN');
        $(this).val(commaSeparatedValue);
    }
});

  input_animation();
  input_animation_new();


  /*header Search dropdown js*/
  $.fn.hasAttr = function (dropdown) {
    return this.attr(dropdown) !== undefined;
  };


  var src = $('#video-modal iframe').attr('src');

  /*modal js*/
  var modaltimer;
  $('[data-popovermodal="popover-modal"]').click(function () {
    var ele_target = $(this).attr('data-target');

    modaltimer = setTimeout(function () {
      $(ele_target).addClass('popover-show');
      $('.slick-slider').slick("refresh");
    }, 80);

    $('#video-modal iframe').attr('src', src);

    $(ele_target).css('display', 'block');
    $('body').addClass('popover-modal-open');
    $('body').append('<div class="modal-backdrop"></div>');
    $('.js-sticky-actions').removeClass('active')
  });

  $('[data-dismiss="popover-modal"]').on('click', function () {

    clearTimeout(modaltimer);

    $(this).parents('.popover-modal').removeClass('popover-show');
    $(this).parents('.popover-modal').removeAttr('style');
    $('.height-scroll').removeAttr('style');
    $('body').removeClass('popover-modal-open');
    $('.modal-backdrop').remove();

    $('#video-modal iframe').attr('src', '');

  });
  /*modal js*/

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

  $('[data-collapse="collapse"]').off('click').on('click', function (ele) {
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


  leftScrollMenu();

  /* tab active auto center start */
  $(".js-tabClick").on("click", function () {
    var parent = $(this).parents('[tabMenu-wrap]');
    parent.scrollCenter(".active", 300);
  });
  /* tab active auto center end */


  //Focus open select 2 dropdown
  $(document).on('focus', '.select2.select2-container', function (e) {
    if (e.originalEvent && $(this).find(".select2-selection--single").length > 0) {
      $(this).siblings('select').select2('open');
      // Focus on input field on open dropdown
      setTimeout(function () {
        const searchField = document.querySelector('.select2-search__field');
        if (searchField) {
          searchField.focus();
        }
      }, 10)
      // Focus on input field on open dropdown
    }
  });


  if ($(window).width() > 767) {
    if ($('#featured-loan-slider1, #featured-loan-slider2, #featured-loan-slider3').hasClass('slick-initialized')) {
      $('#featured-loan-slider1, #featured-loan-slider2, #featured-loan-slider3').slick('unslick');
    }
  } else {
    $('#featured-loan-slider1, #featured-loan-slider2, #featured-loan-slider3').not('.slick-initialized').slick({
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

  $('.featured-tabs .js-tabClick').click(function () {
    $('.slick-slider').slick('refresh');
  })


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

        /*similar properties 7-7-2023*/
      /*   if ($('.js-similar-properties-list').find('.js-similar-list').length < 7) {
          $('.js-similar-properties-list').siblings('.similar-properties-btn').addClass('d-none');
      }
  
      $('.js-similar-properties-list .js-similar-list').slice(0, 6).show();
      $("#jsLoadMoreProperties").on('click', function (e) {
          e.preventDefault();
          $(".js-similar-properties-list .js-similar-list:hidden").slice(0, 3).fadeIn();
          if ($(".js-similar-properties-list .js-similar-list:hidden").length == 0) {
              $("#jsLoadLessProperties").removeClass('d-none').fadeIn('slow');
              $("#jsLoadMoreProperties").hide();
          }
      });
      $("#jsLoadLessProperties").on('click', function (e) {
          e.preventDefault();
          $('.js-similar-properties-list .js-similar-list:not(:lt(6))').fadeOut();
          $("#jsLoadMoreProperties").fadeIn('slow');
          $("#jsLoadLessProperties").hide();
      }); */
    /*similar properties 7-7-2023*/

  $('#jsNewBannerSlider').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
    if ($('#jsNewBannerSlider .banner-item-new').length <= 1) {
      $('#jsNewBannerSlider').removeClass('slider-dots slick-dotted');
    }
    else {
      $('#jsNewBannerSlider').addClass('slider-dots slick-dotted');
    }
  });
  $('#jsNewBannerSlider').on('touchstart', e => {
    $('#jsNewBannerSlider').slick('slickPlay');
  });

  $('#jsNewBannerSlider').slick({
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
    draggable: true
  });


  sliderFunc($('.jsCustomerSaySlider'), CustomerSaySlider);



  $('#viewMoreSlider').slick({
    dots: true,
    infinite: false,
    autoplay: false,
    autoplaySpeed: 4000,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    centerMode: true,
    centerPadding: '350px',
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          centerPadding: '300px',
        }
      },
      {
        breakpoint: 1025,
        settings: {
          centerPadding: '250px',
        }
      },
      {
        breakpoint: 992,
        settings: {
          centerPadding: '150px',
          arrows: false
        }
      },
      {
        breakpoint: 768,
        settings: {
          centerPadding: '70px',
          arrows: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          centerPadding: '25px',
          arrows: false
        }
      }
    ]
  });



  /*lezy load*/
  const observer = lozad(); // lazy loads elements with default selector as '.lozad'
  observer.observe();
  /*lezy load*/


  /*simple scroll bar*/
  // if($('.simple-bar').length > 0) {
  //   new SimpleBar($('.simple-bar')[0]);
  // }

  if ($('.simple-bar').length > 0) {
    for (var i = 0; i < $('.simple-bar').length; i++) {
      new SimpleBar($('.simple-bar')[i]);
    }
  }
  /*simple scroll bar*/


  //Tab dropdown js
  $('.jsTabDropdown .tab-drop-btn').click(function () {
    if ($(window).width() < 768) {
      $('.jsTabDropdown [data-tab]').removeClass('active');
      $('.jsTabDropdown [data-tab]').removeClass('active');
      $('.jsTabDropdown .jsDropdownBlock').removeClass('show');
    }
    var clickBtn = $(this).attr('tab-menu');
    var text = $(this).html();
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
      $('[data-tab]').removeClass('active')
      $(".jsDropdownBlock").removeClass("show");
    }
  });
  //Tab dropdown js

})


$(window).resize(function () {
  $('.slick-slider').slick('refresh');
});


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

$(document).ready(function () {
  $(".js-select2").select2({
    placeholder: "Select",
  });
});

function capitalizeWordsLongerThanThree(key) {
  let words = key.split(/[_-]|\s+/);
  return words.map(function(word) {
      return word.length > 3 ? jsHelper.toSentence(word) : word;
  }).join(' ');
}