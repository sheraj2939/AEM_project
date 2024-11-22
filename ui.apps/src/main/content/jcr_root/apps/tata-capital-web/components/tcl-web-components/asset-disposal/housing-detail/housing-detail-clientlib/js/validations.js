$(document).ready(function () {

    // aplhabet input validation
    $('.only-alpha-input').keypress(function (e) {
      if (String.fromCharCode(e.keyCode).match(/[^a-zA-Z ]/g)) {
          return false;
      }
    });
  
    $('.alpha-numeric-input').keyup(function (e) {        
      $(this).val($(this).val().match(/^[a-zA-Z0-9\s]+/g, ''));        
    });
    
    //replaces Emoji
    $('.disable-emoji').keyup(function () {
      var val = $(this).val();
      var emojiRegex = /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;
      val = val.replace(emojiRegex, '')
      $(this).val(val);
    })  
  
    /*single decmal 26-5-2023*/ 
    $('.single-dot').keypress(function(event) {
      if(event.which == 46
        && $(this).val().indexOf('.') != -1) {
            event.preventDefault();
        } // prevent if already decimal point
        
        if(event.which != 46 && (event.which < 48 || event.which > 57)) {
            event.preventDefault();
        } // prevent if not number/dot
    });
    /*single decmal*/ 
  
    $('.input-filebox').on('change', function (){
      $('.custom-file-input .no-file-text').text(this.files.item(0).name)
    })
  
    $('.only-numeric-decimal-input').keyup(function (e) {
      $(this).val($(this).val().replace(/[^\d,-]/g, ''));
    });
  
    // numeric input validation
    $('.only-numeric-input').keyup(function (e) {
      $(this).val($(this).val().replace(/[^\d-]/g, ''));
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
  
    // $('.jsCopyLink').click(function(){    
    //   $('.jsCopyLink').removeClass('copied');
    //   $(this).addClass('copied');
    //   $(this).find('.text-copy').text('Copied');
    //   setTimeout(function(){
    //     $('.jsCopyLink').removeClass('copied');
    //     $('.jsCopyLink .text-copy').text('Copy');
    //   }, 2500)
    // })  
  
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
  
    // $('.js-close-outside .share-bundle-menu').click(function(e){
    //   e.stopPropagation();
    // })
  
    // $('.jsParaMore').click(function() {    
    //   $(this).parents('.jsParaOuter').find('.para-remain-content').toggleClass('d-none');    
    //   if($(this).hasClass('actives')){
    //     $(this).removeClass('actives');
    //     $(this).text('View More');
    //   }
    //   else {
    //       $(this).addClass('actives');
    //       $(this).text('View Less');
    //   }    
    // });
  
    
    var src = $('#video-modal iframe').attr('src');    
  
    /*modal js*/
/*     var modaltimer;
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
  
    }); */
    /*modal js*/
  
  
    // $('.js-showDetail').click(function () {
    //   $('body').addClass('scroll-hide');
    //   ele_showDetail = $(this).attr('data-value');
    //   $('.js-close-details').removeClass('active-sub');
    //   $('#' + ele_showDetail).addClass('active-sub');    
    //   $('.mob-inner-header').addClass('d-none');
    // })
  
    // $('.js-menu-back').click(function () {
    //   $('body').addClass('scroll-hide');
    //   $(this).parents('.js-close-details').removeClass('active-sub');
    //   $('.mob-inner-header').removeClass('d-none');
    // })
  
  
    /* header top slider start */
    // $('.js-headerTopSlider').slick({
    //   infinite: true,
    //   slidesToShow: 1,
    //   slidesToScroll: 1
    // });
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
    
    /*new seconday nav accordian 10-2-2023*/ 
    // $('.jsNavAccordian [accod-head]').each(function (ele) {
    //   $(this).click(function () {
    //     $(this).parents('.accord-heads').toggleClass('active');
    //     $(this).parents('.accord-heads').siblings('[accod-body]').slideToggle('100');
    //     $(this).parents('[accod-row]').siblings('[accod-row]').find('.accord-heads').removeClass('active');
    //     $(this).parents('[accod-row]').siblings('[accod-row]').find('[accod-body]').slideUp();      
    //   })
    // })
    /*new seconday nav accordian 10-2-2023*/ 
  
  
    // $('.jsFaqActive [accod-head]').each(function (ele) {
    //   $(this).click(function () {      
    //     $(this).parents('[accod-row]').toggleClass('add-bg');
    //     $(this).parents('[accod-row]').siblings('[accod-row]').removeClass('add-bg');      
    //   })
    // })
  
    /*sub accordian*/
    // $('.js-sub-accordian [subaccord-head]').each(function (ele) {
    //   $(this).click(function () {
    //     $(this).toggleClass('subs-opned');
    //     $(this).siblings('[subaccord-body]').slideToggle();
    //     $(this).parents('[subaccord-row]').siblings('[subaccord-row]').find('[subaccord-head]').removeClass('subs-opned');
    //     $(this).parents('[subaccord-row]').siblings('[subaccord-row]').find('[subaccord-body]').slideUp();
    //   })
    // })
    /*sub accordian*/
  
  
    /* Accordian Js */
    // $('[data-accordian="tab"]').click(function (ele) {
    //   var ele_parents = $(ele.target).parents('.accrodian').attr('id');
    //   var ele_target = $(this).data('target');
  
    //   $(ele.target).parents('.navTab').find('.nav-tablist').removeClass('active');
    //   $(this).parent('.nav-tablist').addClass('active');
  
    //   $('#' + ele_parents).find('.tab-panel').hide().addClass('collapse');
    //   $('#' + ele_parents).find('#' + ele_target).show().removeClass('collapse');
    // });
  
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
      if($(window).width() < 768) {
        $('body').removeClass('scroll-hide-xs');
        $('.header-inner').removeClass('backdrops-xs');
      }
    });
    /* hamburger menu end */
  
    $('.header-menu .menu-item').hover(function(){
      $('.dropdown-block').removeClass('show');
      $('[data-rel="login"]').removeClass('active');
    })
  
    
    if($(window).width() > 991) {
      $('.header-overlay').remove();
      $(".header-menu .menu-item .nav-link-dropdown").parents('.menu-item').hover(function () {
        var abc = $('.header-inner').outerHeight();      
        $('.main-content').append('<div class="header-overlay"></div>');
        $('.header-overlay').css('top', abc);    
      },function () {
        $('.header-overlay').remove();
      });
    }
     
  
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
  
  
    /*apply-mobile menu js*/
    $('.jsApplyAccordion .js-accord-col-mob .submenu-head').each(function () {
      $(this).click(function () {
        $(this).toggleClass('apply-opened');
        $(this).siblings('.accord-body').slideToggle();
        $(this).parents('.js-accord-col-mob').siblings('.js-accord-col-mob').find('.submenu-head').removeClass('apply-opened');
        $(this).parents('.js-accord-col-mob').siblings('.js-accord-col-mob').find('.accord-body').slideUp();
      })
    })
    /*apply-mobile menu js*/
  
  
    $('[dismiss-rel]').on('click', function () {
      var $id = $(this).attr('dismiss-rel');
      $('[data-rel]').removeClass('active')
      $('#' + $id).removeClass('show');      
      if ($(window).width() < 768) {  
        $('body').removeClass('scroll-hide-xs');            
        $('.header-inner').removeClass('backdrops-xs');
      }
    })
  
    $('[data-rel]').on('click', function () {
      var $id = $(this).attr('data-rel');
      if ($('#' + $id).css('display') == 'none') {
        $('.dropdown-block').removeClass('show');      
        $('.jsDropdownBlock').removeClass('show');      
        $('[data-rel]').removeClass('active')      
        $('body').removeClass('scroll-hide-xs');
        $('.header-inner').removeClass('backdrops-xs');      
        $(this).addClass('active');
        $('#' + $id).addClass('show');      
        if($id == "updatesList"){
          mogoSound();
        }
        if ($(window).width() < 768) {           
          $(this).parents('body').addClass('scroll-hide-xs');
          $(this).parents('.header-inner').addClass('backdrops-xs');
        }      
        $('.header-overlay.apply-overlay').remove();
      }
      else {
        $('[data-rel]').removeClass('active')
        $('#' + $id).removeClass('show');
        $('.header-overlay.apply-overlay').remove();      
        if ($(window).width() < 768) {           
          $('body').removeClass('scroll-hide-xs');
          $('.header-inner').removeClass('backdrops-xs');
        }
      }        
    })
  
    $('.js-actions-toggle').click(function () {
      $('.js-sticky-actions').toggleClass('active');
      $('.sticky-quick-link').removeClass('active')
    })
  
    //left sticky
    $('.jsLeftSticky').on('click', function (){
      $('.sticky-quick-link').toggleClass('active');
      $('.js-sticky-actions').removeClass('active');
    })
  
  
    $('.jsApplyOverlay').click(function(){
      $('.header-overlay.apply-overlay').remove();
      $('.header').append('<div class="header-overlay apply-overlay"></div>');
      if(!($(this).hasClass('active'))) {
          $('.header-overlay.apply-overlay').remove();
      }
    })
  
  
    $(document).on("click", function (event) {
      var $trigger = $(".close-on-outside");
      if ($trigger !== event.target && !$trigger.has(event.target).length) {
        $('.sticky-quick-link').removeClass('active');
        $(".js-sticky-actions").removeClass("active");
      }
    });
    
    $('.js-btn-signin').on('click', function () {
      $('.js-signin').show();
      $(this).parents('.js-signin').hide();
    })
  
    $('.jsMobOverviewsLink').click(function(){
      $('.mob-overviews-accodian').slideToggle();
      $(this).toggleClass('opened');
      $(this).parents('.overviews-tab-box').toggleClass('with-opens')
      
      $('.sticky-quick-link').removeClass('active');
      $('.js-sticky-actions').removeClass('active');
      
    })
    
  
    // Financial insights share outside clicking hide content
    $(document).on("click", function(event){
        var $trigger = $(".close-on-outside");
        if($trigger !== event.target && !$trigger.has(event.target).length){
            $('.share-bundle-menu').removeClass('active');          
  
            if($(window).width() < 992) {
              $(".jsMobOverviewsLink").removeClass('opened');
              $('.mob-overviews-accodian').slideUp();
            }          
            
            if ($(window).width() < 768) {           
              $('body').removeClass('scroll-hide-xs');
              $('.header-inner').removeClass('backdrops-xs');
            }         
            
            $('.header-overlay.apply-overlay').remove();
  
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
      // $('.js-fi-share-btn').on('click', function(event){
      //   event.preventDefault();
      //   if($('.' + this.id).hasClass('active')){
      //     $('.' + this.id).toggleClass('active')
      //   } else{
      //     $('.share-bundle-menu').removeClass('active');
      //     $('.' + this.id).addClass('active')
      //   }
      // });   
  
      // $('.share-bundle-menu').click(function(event){
      //   event.preventDefault();
      // })
      
  
      $(document).click(function (e) {
        var clicked = $(e.target);
        var opened = $(".js-close-outside").hasClass("show");
        if (opened === true && !clicked.hasClass('js-shares-btn')) {
          $(".js-close-outside").removeClass('show');
          $('.js-shares-btn').removeClass('active');
        }      
      });
  
     
  
      // $('.js-shares-btn').click(function(){
      //   if ($(this).hasClass('active')){
      //     $(".js-close-outside").removeClass('show');
      //     $('.js-shares-btn').removeClass('active');
      //   } else{
      //     $(".js-close-outside").removeClass('show');
      //     $('.js-shares-btn').removeClass('active');
      //     $(this).toggleClass('active');
      //     $(this).parents('.js-close-outside').toggleClass('show');
      //   }
      // });
  
      leftScrollMenu();
      /*way to service*/ 
      if($(window).width() < 992) {    
        $(".tab-left .jsTabSelect").on("click", function () {        
          var parId = $(this).parent().parent().attr('id');
          $( "#" + parId +" .tab-left .jsTabSelect").removeClass("active");
          $(this).addClass("active");
          $("#" + parId + " .tab-left").scrollCenter(".active", 300);
        });
      }  
      /*way to service*/ 
  
      /* tab active auto center start */
      $(".js-tabClick").on("click", function () {      
        var parent = $(this).parents('[tabMenu-wrap]');
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
  
      $('.jsTabSelect').on('click', function(){
          // console.log(this.id);        
          var parId = $(this).parent().parent().attr('id');
          
          $('#'+ parId +' .tab-content').removeClass('active');
          $('#'+ parId +' .tablinks').removeClass('active');
          $(this).addClass('active');
          $('.' + this.id).addClass('active');
      });
      /*Ways to service end*/
  
    // if($(window).width() < 992 ){
    //   $('.fi-share-btn').on('click', function () {
    //     $('.' + this.id).toggleClass('active');
    //   });
    // }
    /*Financial insights end*/
  
    if ($(window).width() < 992) {
      $('[data-rel]').click(function () {
        $('body').removeClass('scroll-hide');
        $('.mob-header').removeClass('opened');
        $('.hamburger-menu').removeClass('animate-hamburger');      
        $('.js-close-details').removeClass('active-sub');
        /*3-1-2022*/ 
        $('.header-inner').removeClass('backdrops');
        /*3-1-2022*/ 
      })
    }  
  
     /*Star selection 27-3-2023*/
    //  $('#stars li').on('mouseover', function(){
    //   var onStar = parseInt($(this).data('value'), 10);
    //   $(this).parent().children('li.star').each(function(e){
    //     if (e < onStar) {
    //       $(this).addClass('hover');
    //     }
    //     else {
    //       $(this).removeClass('hover');
    //     }
    //   });
      
    // }).on('mouseout', function(){
    //   $(this).parent().children('li.star').each(function(e){
    //     $(this).removeClass('hover');
    //   });
    // });
    // $('#stars li').on('click', function(){
    //   var onStar = parseInt($(this).data('value'), 10);
    //   var stars = $(this).parent().children('li.star');
      
    //   for (i = 0; i < stars.length; i++) {
    //     $(stars[i]).removeClass('selected');
    //   }
      
    //   for (i = 0; i < onStar; i++) {
    //     $(stars[i]).addClass('selected');
    //   }
    // }); 
    /*Star selection 27-3-2023*/
  
  
    
    //Focus open select 2 dropdown
    $(document).on('focus', '.select2.select2-container', function (e) {
      if (e.originalEvent && $(this).find(".select2-selection--single").length > 0) {
        $(this).siblings('select').select2('open');
        // Focus on input field on open dropdown
        setTimeout(function (){
          const searchField = document.querySelector('.select2-search__field');
          if(searchField){
            searchField.focus();
          }
        }, 10)
        // Focus on input field on open dropdown
      }
    });
    
  
  
   
  /*10-2-2023 looking offer animation*/
    // $('.jsOpenAnimationModal').click(function () {
    //   $('.modal-backdrop').remove();
    //   setTimeout(function () {
    //     $('#offers-modal').addClass('popover-show');
    //   }, 80);
  
    //   $('#offers-modal').css('display', 'block');
    //   $('body').addClass('popover-modal-open');
    //   $('body').append('<div class="modal-backdrop"></div>');
  
    //   setTimeout(function () {
    //     $('.modal-animation-wrap .popover-top-heads').removeClass('translate-top');
    //   }, 500);
  
    //   setTimeout(function () {
    //     $('.modal-animation-wrap .offer-icon').removeClass('translate-scale');
    //   }, 600);
  
    //   setTimeout(function () {
    //     $('.modal-animation-wrap .lookings-offers .offer-user-details').removeClass('fade-in');
    //   }, 1000);
  
    //   setTimeout(function () {
    //     $('.modal-animation-wrap .lookings-offers .offers-loader').removeClass('fade_in');
    //   }, 1100);
  
  
    //   setTimeout(function () {
    //     $('.modal-animation-wrap .lookings-offers .offers-loader').addClass('d-none');
    //   }, 2500);
  
    // })
    /*10-2-2023 looking offer animation*/
  
    
  
   
  
  
  
  
   
  
    // $('[dropdown-item]').click(function(){
    //   $(this).parents('.custom-dropdown').find('[dropdown-item]').removeClass('active');
    //   $(this).addClass('active');
    //   var dropdownSelected = $(this).text();
    //   $(this).parents('.custom-dropdown').find('.dropdown-heading').text(dropdownSelected);
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
  
    /*getapp modal keypress js*/
    $('#getInvestmentLink .input-textbox[data-type]').bind('keypress', function(e) {
      var code = e.keyCode || e.which;
      if(code == 13) {
        $('.js-getInvestmentLink').trigger('click');
      }
    });
    $('#getLoanLink .input-textbox[data-type]').bind('keypress', function(e) {
      var code = e.keyCode || e.which;
      if(code == 13) {
        $('.js-getLoanLink').trigger('click');
      }
    });  
    /*getapp modal keypress js*/
  
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
        /*6-1-2023*/ 
        var jsGetLookNumber = $('.looking-investment-step1 .jsGetLookNumber').val();
        var jsGetNumberLast = String(jsGetLookNumber).slice(-2);
        $('.jsShowLookNumber').text('XXXXXXXX' + jsGetNumberLast);
        $('.looking-investment-step1').addClass('d-none');
        $('.looking-investment-step1').siblings('.white-dot-loader').removeClass('d-none');
        setTimeout(function(){        
          $('.looking-investment-step1').siblings('.white-dot-loader').addClass('d-none');
          $('.looking-investment-step1').siblings('#moneyfy02').removeClass('d-none');  
        }, 2000);
        // $('.looking-investment-step1').siblings('#moneyfy02').removeClass('d-none');
        $('#getInvestmentLink .input-textbox').val('');
        /*6-1-2023*/ 
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
        setTimeout(function(){        
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
  
    $('.featured-tabs .js-tabClick').click(function(){
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
  
    $('#jsNewBannerSlider').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
      if ($('#jsNewBannerSlider .banner-item-new').length <= 1) {
        $('#jsNewBannerSlider').removeClass('slider-dots slick-dotted');
      } 
      else{
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
  
    
    $('.jsSliderBlueTab').slick({
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
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
          }
        }
      ]
    });
    $('.jsSliderBlueTab .tabs-row .tab-button').click(function(){
      $('.jsSliderBlueTab .tabs-row .tab-button').removeClass('active');
      $(this).addClass('active');
      var tb = $(this).attr('data-tb');
      $('.self-service-rows').addClass('d-none')
      $('#' + tb).removeClass('d-none');
    })
  
  
    $('.js-personal-loan-slider').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
      if ($('.js-personal-loan-slider .item').length <= 4) {
          if ($(window).width() > 1199) {
              $('.js-personal-loan-slider').removeClass('slider-dots slick-dotted');
          } 
      } 
      else{
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
  
    
    sliderFunc($('.jsCustomerSaySlider'), CustomerSaySlider);  
    sliderFunc($('.js-personal-loan-slider'), personalLoanSlider);
    sliderFunc($('.js-personal-loan-slider2'), personalLoanSlider2);
  
    $('#jsProductSlider').slick({
      infinite: false,
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
      dots: true,        
      focusOnSelect: true,
      responsive: [
          {
              breakpoint: 1200,
              settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3
              }
          },
          {
              breakpoint: 992,
              settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2
              }
          },
          {
              breakpoint: 768,
              settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  infinite: true,
                  dots: true,
                  arrows: false,
                  centerMode: true,
                  centerPadding: '30px'
              }
          }
      ]
  }); 
  
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
  
  
  $('.jsResultClose').click(function(){
    $('.results-box').fadeOut('fast');
  })
  
    
    /*select all filter js*/ 
    // $('#filterSelectall').click(function () {
    //   $('.filterSelectedId').prop('checked', this.checked);
    // });
  
    // $('.filterSelectedId').change(function () {
    //     var check = ($('.filterSelectedId').filter(":checked").length == $('.filterSelectedId').length);
    //     $('#filterSelectall').prop("checked", check);
    // });
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
  
    // $('.JsCreditCard').click(function(){
    //   $('.dropdown-content-wrap').css('transform', 'translateY(-100%)');
    // })
    $('.header-menu .menu-item .nav-link').focus(function(){
      $('.dropdown-content-wrap').removeAttr('style');
      $('.header-overlay.apply-overlay').remove();
      $('.jsApplyOverlay').removeClass('active');     
    })
    $('.header-menu .menu-item .nav-link').hover(function(){
      $('.dropdown-content-wrap').removeAttr('style');
      $('.header-overlay.apply-overlay').remove();
      $('.jsApplyOverlay').removeClass('active');
    })
  
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
  
    if($('.simple-bar').length > 0) {
      for (var i=0; i < $('.simple-bar').length; i++){
        new SimpleBar($('.simple-bar')[i]);
      }
    }
    /*simple scroll bar*/ 
  
  
    $('.jsGetValue .custom-checkbox-label').click(function(){
      var dropsValue = $(this).text();
      $(this).parents('.filter-drop-wrap').find('.jsShowDrop').text(dropsValue);
      $(this).parents('.jsGetValue').find('li').removeClass('actives');
      $(this).parents('li').addClass('actives');
      $(this).parents('.filter-drop-wrap').find('.jsShowDrop').removeClass('active');
      $(this).parents('.filter-drop-wrap').find('.jsDropdownBlock').removeClass('show');
    })
    
  
    
    /*6-12-2022*/ 
    // $('.jsRatingBtn .rating-label input').click(function(){    
    //   $(this).parents('.feedback-forms').find('.jsFeedBackTextbox').removeClass('d-none');    
    // });
  
    // $('.jsRatingBtn .rating-label input.very-good').each(function(){
    //   $(this).click(function(){
    //     $(this).parents('.feedback-forms').find('.jsFeedBackTextbox').addClass('d-none');
    //     $(this).parents('.feedback-forms').find('.form-feedback-textarea').val('');
    //     $(this).parents('.feedback-forms').find('.feedback-reason').removeClass('textboxerror');
    //     $(this).parents('.feedback-forms').find('.feedback-reason').find('.error-msgs').remove();
    //     $(this).parents('.feedback-forms').find('.feedback-outers .jscurrent').text("0");      
    //     $(this).parents('.feedback-forms').find('.js-select2').val(null).trigger('change');
    //   })    
    // });
  
    // NPS feedback toggle submit button
    // $('.jsRatingBtn .rating-label input').on('click', function () {
    //   var serviceVal = $('.jsRatingBtn .rating-label input[name=services]:checked').length;
    //   var likelyVal = $('.jsRatingBtn .rating-label input[name=likely]:checked').length;
    //   if (serviceVal > 0 && likelyVal > 0){
    //     $('.JsNpsSubmit').removeClass('btn-disabled');
    //   } else{
    //     $('.JsNpsSubmit').addClass('btn-disabled');
    //   }
    // });
  
    // NPS modal close
    $('.jsThanksModalClose').on('click', function () {
      $('.jsRatingBtn .rating-label input').prop('checked', false);
      $('.jsFeedBackTextbox').addClass('d-none');
      $('.JsNpsSubmit').addClass('btn-disabled');
      $('#nps-form .form-feedback-textarea').val('');
      $('#nps-form .feedback-reason').removeClass('textboxerror');
      $('#nps-form .feedback-reason').find('.error-msgs').remove();
      $('#nps-form .feedback-outers .jscurrent').text("0");
      $('#nps-form .js-select2').val(null).trigger('change');
    });
    
    // var npsHeaderHeight = $('.header.nps-header .header-inners').outerHeight();
    // console.log(npsHeaderHeight);
    // $('.header.nps-header').css('padding-top', npsHeaderHeight);
    /*6-12-2022*/ 
  
    /*19-12-2022*/ 
    // $('.text-limit-200').keyup(function() {    
    //   var characterCount = $(this).val().length;
    //   $(this).parents('.feedback-outers').find('.jscurrent').text(characterCount);
    // });
  
    /*19-12-2022*/ 
  
    /*tata card apply 4-1-2023*/ 
    // $('.jsApplyRadioBtn').click(function(){
    //   var getDataAttri = $(this).attr('data-href');
    //   console.log(getDataAttri);
    //   $('.jsBtnApplySubmit').attr('href', getDataAttri);
    //   $('.jsBtnApplySubmit').removeClass('btn-disabled');
    // })
    // $('.jsBtnApplySubmit').click(function(){
    //   $('.jsApplyRadioBtn .custom-white-radio input').prop('checked', false);
    //   $('.jsBtnApplySubmit').addClass('btn-disabled');        
    // })
    /*tata card apply 4-1-2023*/
    
    /*contact us page*/ 
    // $('.jsRadioBtnContact').click(function(){
    //   var getDataAttri = $(this).attr('data-href');
    //   console.log(getDataAttri);
    //   $('.jsProceedBtnContact').attr('href', getDataAttri);
    //   $('.jsProceedBtnContact').removeClass('btn-disabled');
    // })
    // $('.jsProceedBtnContact').click(function(){
    //   $('.jsRadioBtnContact .custom-white-radio input').prop('checked', false);
    //   $('.jsProceedBtnContact').addClass('btn-disabled');        
    // })
    /*contact us page*/ 
  
  
    /* charactor count blogs 9-1-2023*/
    // if($(window).width() < 992){
    //   var showChar = 58;
    // }  
    // if($(window).width() < 374){
    //   var showChar = 48;
    // }  
    // else {
    //   var showChar = 48;   
    // }  
    // $('.fi-overlay-card .fi-card-mid h6').each(function(){
    //     var content = $(this).html();
    //     if(content.length > showChar){
    //         var showLine = content.substr(0, showChar);
    //         var remainContent = content.substr(showChar, content.length - showChar);
    //         var allContent = showLine + '<span class="remaining-content d-none">' + remainContent + '</span> <span>...</span>';
    //         $(this).html(allContent);
    //     }
    // })
    /* charactor count blogs 9-1-2023*/
  
    // Select 2 js //
    // $('.js-select2').select2({
    //   placeholder: "Select",
    // });
    // $('.js-select2-search-hide').select2({
    //   minimumResultsForSearch: Infinity
    // });
  
   
  
    // $(".mCustomScrollBar").mCustomScrollbar({
    //   axis:"y" 
    // }); 
    
    //filter droddown body class disabled
    $('.filter-drop-wrap [data-rel]').click(function (){
      if ($(window).width() < 768) {
        $(this).parents('body').removeClass('scroll-hide-xs');
        $(this).parents('.header-inner').removeClass('backdrops-xs');
      }
    });
  
    //Tab dropdown js
    $('.jsTabDropdown .tab-drop-btn').click(function (){
      if ($(window).width() < 768) {
        $('.jsTabDropdown [data-tab]').removeClass('active');
        $('.jsTabDropdown [data-tab]').removeClass('active');
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
        $('[data-tab]').removeClass('active')
        $(".jsDropdownBlock").removeClass("show");      
      }
    });
    //Tab dropdown js
  
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
              ele_floating.addClass('affix').css({'top': headerHeight}).prev('.floating').css('height', ele_height);
          } else {
              ele_floating.removeClass('affix').css({ 'top': '0',}).prev('.floating').css('height', '0');
          }
      }    
  });
  
  
  /*header scroll fixed animation*/
  var NAVBAR_HEIGHT = $('.header-navbar').innerHeight();
  function header_fixed() {
    var windowScroll = $(window).scrollTop();
    var topbarHeight = $('.header-top').innerHeight();
    // console.log('windowScroll ', windowScroll);
    // console.log('topbarHeight ', topbarHeight);
    if (windowScroll >= topbarHeight) {
      $('.header-inner').addClass('affix');
      $('.header').css('padding-top', NAVBAR_HEIGHT + topbarHeight);
      if($(window).width() > 991) {
        $('.header-overlay').css('top', topbarHeight);
      }    
    } else {
      $('.header-inner').removeClass('affix');
      $('.header').css('padding-top', 0);
      $('.js-headerTopSlider').slick('refresh');
    }
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
  
  function leftScrollMenu(){
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
    $(".js-select2-search-hide").select2({
      minimumResultsForSearch: Infinity,
    });
  });