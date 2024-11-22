$(document).ready(function () {

  /*Global js*/

  /*aplhabet input*/
  $('.only-alpha-input').keypress(function (e) {
    if (String.fromCharCode(e.keyCode).match(/[^a-zA-Z ]/g)) {
      return false;
    }
  });
  /*aplhabet input*/

  $(".alfaOnlyInput").on("input", function () {
    var regexp = /[^a-zA-Z'. ,-]/g;
    if ($(this).val().match(regexp)) {
      $(this).val($(this).val().replace(regexp, ""));
    }
  });

  $('.alpha-numeric-input').keyup(function (e) {
    $(this).val($(this).val().match(/^[a-zA-Z0-9\s]+/g, ''));
  });

  $('.only-numeric-decimal-input').keyup(function (e) {
    $(this).val($(this).val().replace(/[^\d,-]/g, ''));
  });

  // numeric input validation
  $('.only-numeric-input').keyup(function (e) {
    $(this).val($(this).val().replace(/\D/g, ''));
  });

  // numeric input with decimal allowed validation
  $('.only-numeric-input-with-decimal').keyup(function (e) {
    $(this).val($(this).val().replace(/[^\d.-]/g, ''));
  });

  $('.price-only-comma').keyup(function () {
    if ($(this).val() != "") {
      var rupeeValue = parseFloat($(this).val().replace(/,/g, ''));
      commaSeparatedValue = rupeeValue.toLocaleString('en-IN');
      $(this).val(commaSeparatedValue);
    }
  });

  /*single decmal*/
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

  $(".allow-numeric").on("input", function (evt) {
    var self = $(this);
    self.val(self.val().replace(/\D/g, ""));
    if ((evt.which < 48 || evt.which > 57)) {
      evt.preventDefault();
    }
  });

  /*disable-emoji*/
  $('.disable-emoji').bind('input', function () {
    // console.log('df')
    var val = $(this).val();
    var emojiRegex = /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;
    val = val.replace(emojiRegex, '')
    $(this).val(val);
  });
  /*disable-emoji*/

  $(".alfaOnlyInput").on("input", function () {
    var regexp = /[^a-zA-Z'. ,-]/g;
    if ($(this).val().match(regexp)) {
      $(this).val($(this).val().replace(regexp, ''));
    }
  });

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


  /*modal js*/
  // var srcVideo = $('#video-modal iframe').attr('src');
  var modaltimer;
  $('[data-popovermodal="popover-modal"]').click(function () {
    var ele_target = $(this).attr('data-target');

    modaltimer = setTimeout(function () {
      $(ele_target).addClass('popover-show');
      $('.slick-slider').slick("refresh");
    }, 80);

    // $('#video-modal iframe').attr('src', srcVideo);

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

  input_animation();
  input_animation_new();

  /*Global js*/


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
      $(".jsDropdownBlock").removeClass("show");
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



  $('.js-showDetail').click(function () {
    $('body').addClass('scroll-hide');
    ele_showDetail = $(this).attr('data-value');
    $('.js-close-details').removeClass('active-sub');
    $('#' + ele_showDetail).addClass('active-sub');
    $('.mob-inner-header').addClass('d-none');
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

  /* hamburger menu start */
  $(".hamburger-menu").click(function () {
    this.classList.toggle("animate-hamburger");
    $('.mob-inner-header').removeClass('d-none');
    $('body').toggleClass('scroll-hide');
    $('.header-inner').toggleClass('backdrops');
    $('.mob-header').toggleClass('opened');
    $('.js-close-details').removeClass('active-sub');
    if ($(window).width() < 768) {
      $('body').removeClass('scroll-hide-xs');
      $('.header-inner').removeClass('backdrops-xs');
    }
  });
  /* hamburger menu end */

  $('.header-menu .menu-item').hover(function () {
    $('.dropdown-block').removeClass('show');
    $('[data-rel="login"]').removeClass('active');
  })


  if ($(window).width() > 991) {
    $('.header-overlay').remove();
    $(".header-menu .menu-item .nav-link-dropdown").parents('.menu-item').hover(function () {
      var abc = $('.header-inner').outerHeight();
      $('body').append('<div class="header-overlay"></div>');
      $('.header-overlay').css('top', abc);
    }, function () {
      $('.header-overlay').remove();
    });
  }

  $('.js-mobsubmenu .js-accord-col-mob .submenu-head .submenu-head-arrow').each(function () {
    $(this).click(function () {
      $(this).parents('.submenu-head').toggleClass('main-opened');
      $(this).parents('.submenu-head').siblings('.accord-body').slideToggle();
      $(this).parents('.js-accord-col-mob').siblings('.js-accord-col-mob').find('.submenu-head').removeClass('main-opened');
      $(this).parents('.js-accord-col-mob').siblings('.js-accord-col-mob').find('.accord-body').slideUp();
    })
  })
  /*main-mobile menu js 26-5-2023*/



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
      /*10-01-2023*/
      $('.jsDropdownBlock').removeClass('show');
      /*10-01-2023*/
      $('[data-rel]').removeClass('active')
      /*3-1-2023*/
      $('body').removeClass('scroll-hide-xs');
      $('.header-inner').removeClass('backdrops-xs');
      /*3-1-2023*/
      $(this).addClass('active');
      $('#' + $id).addClass('show');
      /*3-1-2023*/
      if ($(window).width() < 768) {
        $(this).parents('body').addClass('scroll-hide-xs');
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
  $('.jsLeftSticky').on('click', function () {
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

  $('.js-btn-signin').on('click', function () {
    $('.js-signin').show();
    $(this).parents('.js-signin').hide();
  })

  $('.jsMobOverviewsLink').click(function () {
    $('.mob-overviews-accodian').slideToggle();
    $(this).toggleClass('opened');
    $(this).parents('.overviews-tab-box').toggleClass('with-opens')
    /*16-3-2023*/
    $('.sticky-quick-link').removeClass('active');
    $('.js-sticky-actions').removeClass('active');
    /*16-3-2023*/
  })

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


  /*Financial insights slider*/

  /*Financial insights share toggling*/
  $('.js-fi-share-btn').on('click', function (e) {
    e.preventDefault();
    // e.stopImmediatePropagation();
    if ($(this).siblings('.share-bundle-menu').hasClass('active')) {
      $(this).siblings('.share-bundle-menu').toggleClass('active');
      // $('.' + this.id).toggleClass('active')
    } else {
      $('.share-bundle-menu').removeClass('active');
      $(this).siblings('.share-bundle-menu').addClass('active')
    }
   // e.stopPropagation()
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
      /*sonar*/
      var parId = $(this).parent().parent().attr('id');
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
    var parent = $(this).parents('[tabMenu-wrap]');
    parent.scrollCenter(".active", 300);
    /*sonar*/
  });
  /* tab active auto center end */


  /*Financial insights end*/

  $('.jsTabSelect').on('click', function () {
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
      $('.header-inner').removeClass('backdrops');
    })
  }


  /*21-2-2023*/


  $('[dropdown-item]').click(function () {
    $(this).parents('.custom-dropdown').find('[dropdown-item]').removeClass('active');
    $(this).addClass('active');
    var dropdownSelected = $(this).text();
    $(this).parents('.custom-dropdown').find('.dropdown-heading').text(dropdownSelected);
  }).focus(function () {
    $('.error-msgs').remove();
    $(this).parents('.form-textbox').removeClass('textboxerror');
  }).blur(function () {
    if ($(this).val().length != 0) {
      $(this).parents('.form-textbox').addClass("active");
    } else if ($(this).val().length == 0) {
      $(this).parents('.form-textbox').removeClass("active");
    }
  });



  // whatsapp loan form
  var loanQueryCheckbox = false;

  $('.jsIAgreeTermsPolicy').on('change', function () {
    var errors = [];
    var ele_checkbox = 'Please confirm checkbox';
    loanQueryCheckbox = event.target.checked;
    if (loanQueryCheckbox) {
      $('#js-whatsapp-loan .form-check .error-msgs').remove();
      $('#js-whatsapp-loan .form-check').removeClass('textboxerror');
    } else {
      if ($('#js-whatsapp-loan .form-check').find('.error-msgs').length > 0) {
        errors.push(ele_checkbox);
      }
      if ($('#js-whatsapp-loan .form-check').find('.error-msgs').length === 0) {
        $('#js-whatsapp-loan .form-check .form-check-label').after('<span class="error-msgs"></span>');
        $('#js-whatsapp-loan .form-check').addClass('textboxerror');
        $('#js-whatsapp-loan .form-check .error-msgs').html(ele_checkbox);
        errors.push(ele_checkbox);
      }
    }
  })

  $('#js-whatsapp-loan .js-proceed-btn').click(function () {
    var ele_input = $('#js-whatsapp-loan .input-textbox');
    var errors = [];
    allFilled = true;
    var ele_required = "Field is required";

    $(ele_input).each(function () {
      var element = $(this);
      var ele_phoneNumber = "Please enter valid phone number";
      var ele_checkbox = 'Please confirm checkbox';

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
      if (!loanQueryCheckbox) {
        if ($('#js-whatsapp-loan .form-check').find('.error-msgs').length > 0) {
          errors.push(ele_checkbox);
        }
        if ($('#js-whatsapp-loan .form-check').find('.error-msgs').length === 0) {
          $('#js-whatsapp-loan .form-check .form-check-label').after('<span class="error-msgs"></span>');
          $('#js-whatsapp-loan .form-check').addClass('textboxerror');
          $('#js-whatsapp-loan .form-check .error-msgs').html(ele_checkbox);
          errors.push(ele_checkbox);
        }
      } else {
        $('#js-whatsapp-loan .form-check .error-msgs').remove();
        $('#js-whatsapp-loan .form-check').removeClass('textboxerror');
      }
    });
    if (errors.length == 0) {
      var getWhatsappNub = $('.jsGetWhatsappNumber').val();
      $('.jsShowWhatsappNumber').text(getWhatsappNub);
      $('#js-whatsapp-loan').addClass('d-none');
      $('.whatsapp-otp-wrap').removeClass('d-none');
      $('#whatsapp-otp .js-otp-submit').addClass('btn-disabled');
      $('#whatsapp-otp .input-textbox:first').focus();
      ele_input.val('');
      loanQueryCheckbox = false
      $('#js-whatsapp-loan .form-check .form-check-input').prop('checked', false)
      $('#js-whatsapp-loan .form-textbox').removeClass('active');
    }
  });

  $('#js-whatsapp-loan .input-textbox').keyup(function () {
    var ele_input = $('#js-whatsapp-loan .input-textbox');
    var errors = [];
    allFilled = true;
    var ele_required = "Field is required";

    $(ele_input).each(function () {
      var element = $(this);
      var ele_phoneNumber = "Please enter valid phone number";
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
  });

  $('.jsCloseWhatsappMgs').click(function () {
    $('.whatsapp-success-mgs').addClass('d-none');
    /*3-1-2023*/
    $('.initiate-loan-journey').removeClass('d-none');
    $('#js-whatsapp-loan').removeClass('d-none');
    $('#whatsapp-otp .input-textbox').val('');
  })


  /*whatsapp otp keyup*/
  $("#whatsapp-otp .js-OtpBox .input-textbox").keyup(function () {
    if (this.value.length == this.maxLength) {
      $(this).next('.input-textbox').focus();
      $(this).next('.input-textbox').removeClass('pointer-none');
    } else {
      $(this).prev('.input-textbox').focus();
      $(this).addClass('pointer-none');
      $('#whatsapp-otp .input-textbox:first').removeClass('pointer-none');
    }

    var ele_input = $('.js-OtpBox .input-textbox');
    $(ele_input).each(function () {
      if ($(this).val().length != 0) {
        $(this).parents('#whatsapp-otp').find('.js-otp-submit').removeClass('btn-disabled');
      }
      else {
        $(this).parents('#whatsapp-otp').find('.js-otp-submit').addClass('btn-disabled');
      }
    });
  })

  /*whatsapp otp resend*/
  $('#whatsapp-otp .js-resendOTP').click(function () {
    $(this).parents('#whatsapp-otp').find('.js-OtpBox .input-textbox').val('');
    $(this).parents('#whatsapp-otp').find('.js-OtpBox .input-textbox:first-child').focus();
    $(this).parents('#whatsapp-otp').find('.js-otp-submit').addClass('btn-disabled');
  });

  /*Credit score otp try again*/
  $('.jsOTPTryAgain').click(function () {
    $('.initiate-loan-journey').removeClass('d-none');
    $('.whatsapp-otp-wrap').removeClass('d-none');
    $('.jsWhatOTPUnSuccess').addClass('d-none');
    $('#whatsapp-otp .input-textbox').val('');
    $('#whatsapp-otp .input-textbox:first').focus();
    $('#whatsapp-otp .input-textbox').addClass('pointer-none');
    $('#whatsapp-otp .input-textbox:first').removeClass('pointer-none');
    $('#whatsapp-otp').find('.js-otp-submit').addClass('btn-disabled');
  })

  /*Credit otp submit*/
  $('#whatsapp-otp .js-otp-submit').click(function () {
    var values = []
    $('#whatsapp-otp .js-OtpBox .input-textbox').each(function (i, ele) { values.push(ele.value) });
    console.log(values.join(""))
    if (values.join("") == "9999") {
      $('.initiate-loan-journey').addClass('d-none');
      $('.whatsapp-otp-wrap').addClass('d-none');
      $('.jsWhatOTPSuccess').removeClass('d-none');
    }
    else {
      $('.initiate-loan-journey').addClass('d-none');
      $('.whatsapp-otp-wrap').addClass('d-none');
      $('.jsWhatOTPUnSuccess').removeClass('d-none');
    }
    /*3-1-2023*/
  })


  /*getapp modal keypress js 6-1-2023*/
  $('#getInvestmentLink .input-textbox[data-type]').bind('keypress', function (e) {
    var code = e.keyCode || e.which;
    if (code == 13) {
      $('.js-getInvestmentLink').trigger('click');
    }
  });
  $('#getLoanLink .input-textbox[data-type]').bind('keypress', function (e) {
    var code = e.keyCode || e.which;
    if (code == 13) {
      $('.js-getLoanLink').trigger('click');
    }
  });
  /*getapp modal keypress js 6-1-2023*/

  $('#getInvestmentLink .js-getInvestmentLink').click(function () {
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
      var jsGetLookNumber = $('.looking-investment-step1 .jsGetLookNumber').val();
      var jsGetNumberLast = String(jsGetLookNumber).slice(-2);
      $('.jsShowLookNumber').text('XXXXXXXX' + jsGetNumberLast);
      $('.looking-investment-step1').addClass('d-none');
      $('.looking-investment-step1').siblings('.white-dot-loader').removeClass('d-none');
      setTimeout(function () {
        $('.looking-investment-step1').siblings('.white-dot-loader').addClass('d-none');
        $('.looking-investment-step1').siblings('#moneyfy02').removeClass('d-none');
      }, 2000);
      $('#getInvestmentLink .input-textbox').val('');
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
      /*6-1-2023*/
      var jsShowGetLinkNumber = $('.looking-loan-step1 .jsGetLookLoanNumber').val();
      var jsShowGetLinkNumberLast = String(jsShowGetLinkNumber).slice(-2);
      $('.jsShowGetLinkNumber').text('XXXXXXXX' + jsShowGetLinkNumberLast);
      $('.looking-loan-step1').addClass('d-none');
      $('.looking-loan-step1').siblings('.white-dot-loader').removeClass('d-none');
      setTimeout(function () {
        $('.looking-loan-step1').siblings('.white-dot-loader').addClass('d-none');
        $('.looking-loan-step1').siblings('#moneyfy02').removeClass('d-none');
      }, 2000)
      $('#getLoanLink .input-textbox').val('');
      /*6-1-2023*/
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
  });


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
          arrows: false,
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
          arrows: false
        }
      }
    ]
  };
  /*customer-say slider*/

  /*6-1-2023*/


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


  // sliderFunc($('.banner-slider'), bannerSlider);
  sliderFunc($('.jsCustomerSaySlider'), CustomerSaySlider);
  sliderFunc($('.js-personal-loan-slider'), personalLoanSlider);


  $('.jsResultClose').click(function () {
    $('.results-box').fadeOut('fast');
  })


  /*select all filter js*/
  $('#filterSelectall').click(function () {
    $('.filterSelectedId').prop('checked', this.checked);
  });

  $('.filterSelectedId').change(function () {
    var check = ($('.filterSelectedId').filter(":checked").length == $('.filterSelectedId').length);
    $('#filterSelectall').prop("checked", check);
  });
  /*select all filter js*/

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

  // if ($('.simple-bar').length > 0) {
  //   for (var i = 0; i < $('.simple-bar').length; i++) {
  //     new SimpleBar($('.simple-bar')[i]);
  //   }
  // }
  /*simple scroll bar*/
  // s('padding-top', npsHeaderHeight);
  /*2-5-2023*/


  /*19-12-2022*/
  $('.text-limit-200').keyup(function () {
    var characterCount = $(this).val().length;
    $(this).parents('.feedback-outers').find('.jscurrent').text(characterCount);
  });
  /*19-12-2022*/


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
      $('.js-headerTopSlider').slick('refresh');
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
    // Select 2 js //
    $(".js-select2").select2({
      placeholder: "Select",
    });
    $(".js-select4").select2({
      placeholder: "Select",
    });
    $(".js-select2-search-hide").select2({
      minimumResultsForSearch: Infinity,
    });
  });
})

// validation mobile
function validateMobile(mobileField) {
  if (location.hostname != '172.27.16.22' && location.hostname != '172.27.16.20' && location.hostname != 'tclu.tatacapital.com' && location.hostname != '172.27.16.55') {
    var mobRagex = /^[6-9][0-9]{9}$/;
    var mobileValue = $(mobileField).val();

    if (mobileValue.length !== 10 || !mobRagex.test(mobileValue)) {
      return false;
    } else {
      for (var validNum = 0; validNum < 10; validNum++) {
        var digit = validNum.toString();
        var regex = new RegExp(digit + "{9,}");
        if (regex.test(mobileValue)) {
          return false;
        }
      }
      return true;
    }
  } else {
    var mobRagex = /^[6-9][0-9]{9}$/;
    var check = mobRagex.test($(mobileField).val());
    if ($(mobileField).val().length != 10 || !check) {
      return false;
    } else {
      return true;
    }
  }
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

function showLoader() {
  $("#loaderWealth").css("display", "block");
  $('body').addClass('bg-loader');
}

function hideLoader() {
  $("#loaderWealth").css("display", "none");
  $('body').removeClass('bg-loader');
}

function showFailureModal() {
  hideLoader()
  $(".jsModalOnGetCall").parents(".popover-modal").removeClass("popover-show");
  $(".jsModalOnGetCall").parents(".popover-modal").removeAttr("style");
  $(".height-scroll").removeAttr("style");
  $("body").removeClass("popover-modal-open");
  //failure Popup
  setTimeout(function () {
    $("#error-modal").addClass("popover-show");
  }, 80);
  $("#error-modal").css("display", "block");
  $("body").addClass("popover-modal-open");
  $("body").append('<div class="modal-backdrop"></div>');
  $(".jsOnGetCall").removeClass("d-none");
  $('.jsGetCalling').addClass('d-none');
}