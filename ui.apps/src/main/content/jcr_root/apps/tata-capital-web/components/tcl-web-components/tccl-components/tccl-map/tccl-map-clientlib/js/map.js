$(document).ready(function () {
  // Select 2 js //
  $('.js-select2').select2({
    placeholder: "Select",
  });
  $('.js-select2-search-hide').select2({
    minimumResultsForSearch: Infinity
  });

  if ($('.simple-bar').length > 0) {
    new SimpleBar($('.simple-bar')[0]);
  }
  //************ Start Map Js  *************//
  // Hover State //
  if ($(window).width() > 1199) {
    $('.state-map').hover(function (e) {
      $(this).addClass('hover-path');
      $(this).parents('.mapbody').find('path').css('opacity', '0.6');
      $(this).find('path').css('display', 'none');
      $(this).find('g, g path').css({ 'display': 'block', 'opacity': '1' });

      $('.state-map.selected').find('path').css('display', 'none');
      $('.state-map.selected').find('g, g path').css({ 'display': 'block', 'opacity': '1' });

      var ele_title = $(this).attr('title');

      var id = (e.hasOwnProperty('currentTarget') && e.currentTarget.id) || $(e).attr('id');
      var idElem = document.getElementById(id);
      var clientReact = idElem.getBoundingClientRect();
      var description = document.querySelector('.state-tooltip');
      // var descPosition = description.getBoundingClientRect();

      var mapContainer = document.getElementsByClassName('mapbody')[0];
      var mapContainerRect = mapContainer.getBoundingClientRect();

      $(description).css({
        'left': clientReact.left - mapContainerRect.left + clientReact.width / 2,
        'top': clientReact.top - mapContainerRect.top,
        'display': 'inline-block'
      });

      if (id == "IN-JK" || id == "IN-UP" || id == "IN-RJ" || id == "IN-MP") {
        $(description).css({
          'left': clientReact.left - mapContainerRect.left + clientReact.width / 2,
          'top': clientReact.top - mapContainerRect.top + clientReact.height / 3,
          'display': 'inline-block'
        });
      }
      if (id == "IN-AP") {
        $(description).css({
          'left': clientReact.left - mapContainerRect.left + clientReact.width / 4,
          'top': clientReact.top - mapContainerRect.top + clientReact.height / 2,
          'display': 'inline-block'
        });
      }
      if (id == "IN-WB") {
        $(description).css({
          'left': clientReact.left - mapContainerRect.left + clientReact.width / 2 + 10,
          'top': clientReact.top - mapContainerRect.top,
          'display': 'inline-block'
        });
      }
      if (id == "IN-TR") {
        $(description).css({
          'left': clientReact.left - mapContainerRect.left + clientReact.width / 2,
          'top': clientReact.top - mapContainerRect.top - 30,
          'display': 'inline-block'
        });
      }
      if (id == "IN-NL" || id == "IN-MN") {
        $(description).css({
          'left': clientReact.left - mapContainerRect.left + clientReact.width / 2,
          'top': clientReact.top - mapContainerRect.top - 20,
          'display': 'inline-block'
        });
      }
      if (id == "IN-DL") {
        $(description).css({
          'left': clientReact.left - mapContainerRect.left + clientReact.width / 2,
          'top': clientReact.top - mapContainerRect.top - 40,
          'display': 'inline-block'
        });
      }

      $('.state-tooltip p').text(ele_title);

    }, function (e) {
      $('.mapbody').find('.state-map').removeClass('hover-path');
      $(this).parents('.mapbody').find('g, g path').css({ 'display': 'none', 'opacity': '0' });
      $(this).parents('.mapbody').find('path').css('display', 'block');
      $(this).parents('.mapbody').find('path').css('opacity', '1');
      $('.state-tooltip').removeAttr('style');

      if ($('.state-map').hasClass('selected')) {
        $('.state-map.selected').parents('.mapbody').find('path').css('opacity', '0.6');
        $('.state-map.selected').find('path').css('display', 'none');
        $('.state-map.selected').find('g, g path').css({ 'display': 'block', 'opacity': '1' });

        var ele_title = $('.state-map.selected').attr('title');
        // var ele_filter = $(this).attr('namefilter');


        var id = $('.state-map.selected').attr('id');
        var idElem = document.getElementById(id);
        var clientReact = idElem.getBoundingClientRect();
        var description = document.querySelector('.state-tooltip');
        // var descPosition = description.getBoundingClientRect();

        var mapContainer = document.getElementsByClassName('mapbody')[0];
        var mapContainerRect = mapContainer.getBoundingClientRect();

        $(description).css({
          'left': clientReact.left - mapContainerRect.left + clientReact.width / 2,
          'top': clientReact.top - mapContainerRect.top,
          'display': 'inline-block'
        });

        if (id == "IN-JK" || id == "IN-UP" || id == "IN-RJ" || id == "IN-MP") {
          $(description).css({
            'left': clientReact.left - mapContainerRect.left + clientReact.width / 2,
            'top': clientReact.top - mapContainerRect.top + clientReact.height / 3,
            'display': 'inline-block'
          });
        }
        if (id == "IN-AP") {
          $(description).css({
            'left': clientReact.left - mapContainerRect.left + clientReact.width / 4,
            'top': clientReact.top - mapContainerRect.top + clientReact.height / 2,
            'display': 'inline-block'
          });
        }
        if (id == "IN-WB") {
          $(description).css({
            'left': clientReact.left - mapContainerRect.left + clientReact.width / 2 + 10,
            'top': clientReact.top - mapContainerRect.top,
            'display': 'inline-block'
          });
        }
        if (id == "IN-TR") {
          $(description).css({
            'left': clientReact.left - mapContainerRect.left + clientReact.width / 2,
            'top': clientReact.top - mapContainerRect.top - 30,
            'display': 'inline-block'
          });
        }
        if (id == "IN-NL" || id == "IN-MN") {
          $(description).css({
            'left': clientReact.left - mapContainerRect.left + clientReact.width / 2,
            'top': clientReact.top - mapContainerRect.top - 20,
            'display': 'inline-block'
          });
        }
        if (id == "IN-DL") {
          $(description).css({
            'left': clientReact.left - mapContainerRect.left + clientReact.width / 2,
            'top': clientReact.top - mapContainerRect.top - 40,
            'display': 'inline-block'
          });
        }

        $('.state-tooltip p').text(ele_title);
      }
    });
  }

  if ($(window).width() > 767) {
    $('.state-map').click(function (e) {

      $('.mapbody').find('.state-map').removeClass('selected');
      $(this).parents('.mapbody').find('g, g path').css({ 'display': 'none', 'opacity': '0' });
      $(this).parents('.mapbody').find('path').css('display', 'block');

      $(this).addClass('selected');
      $(this).parents('.mapbody').find('path').css('opacity', '0.6');
      $(this).find('path').css('display', 'none');
      $(this).find('g, g path').css({ 'display': 'block', 'opacity': '1' });

      var ele_title = $(this).attr('title');
      // var ele_filter = $(this).attr('namefilter');


      var id = (e.hasOwnProperty('currentTarget') && e.currentTarget.id) || $(e).attr('id');
      var idElem = document.getElementById(id);
      var clientReact = idElem.getBoundingClientRect();
      var description = document.querySelector('.state-tooltip');
      // var descPosition = description.getBoundingClientRect();

      var mapContainer = document.getElementsByClassName('mapbody')[0];
      var mapContainerRect = mapContainer.getBoundingClientRect();

      $(description).css({
        'left': clientReact.left - mapContainerRect.left + clientReact.width / 2,
        'top': clientReact.top - mapContainerRect.top,
        'display': 'inline-block'
      });

      if (id == "IN-JK" || id == "IN-UP" || id == "IN-RJ" || id == "IN-MP") {
        $(description).css({
          'left': clientReact.left - mapContainerRect.left + clientReact.width / 2,
          'top': clientReact.top - mapContainerRect.top + clientReact.height / 3,
          'display': 'inline-block'
        });
      }
      if (id == "IN-AP") {
        $(description).css({
          'left': clientReact.left - mapContainerRect.left + clientReact.width / 4,
          'top': clientReact.top - mapContainerRect.top + clientReact.height / 2,
          'display': 'inline-block'
        });
      }
      if (id == "IN-WB") {
        $(description).css({
          'left': clientReact.left - mapContainerRect.left + clientReact.width / 2 + 10,
          'top': clientReact.top - mapContainerRect.top,
          'display': 'inline-block'
        });
      }
      if (id == "IN-TR") {
        $(description).css({
          'left': clientReact.left - mapContainerRect.left + clientReact.width / 2,
          'top': clientReact.top - mapContainerRect.top - 30,
          'display': 'inline-block'
        });
      }
      if (id == "IN-NL" || id == "IN-MN") {
        $(description).css({
          'left': clientReact.left - mapContainerRect.left + clientReact.width / 2,
          'top': clientReact.top - mapContainerRect.top - 20,
          'display': 'inline-block'
        });
      }
      if (id == "IN-DL") {
        $(description).css({
          'left': clientReact.left - mapContainerRect.left + clientReact.width / 2,
          'top': clientReact.top - mapContainerRect.top - 40,
          'display': 'inline-block'
        });
      }

      $('.state-tooltip p').text(ele_title);

    });
  }

  if ($(window).width() < 768) {
    $(".map-dropdown > .state-list > li").sort(function (a, b) {
      var aText = $(a).text(), bText = $(b).text();
      return aText < bText ? -1 : aText > bText ? 1 : 0;
    }).appendTo('.state-list');
    // $('.citylist').hide()

    $('.state-list li a').click(function () {
      $('.state-list li').removeClass('active');
      $(this).parents('li').addClass('active');

      var ele_text = $(this).text();
      $(this).parents('.dropdown-tab').find('.btn-dropdown').text(ele_text);

      var ele_state = $(this).data('state');
      $('.mapbody .state-map').removeClass('selected');
      $('.mapbody').find('path').css({ 'display': 'block', 'opacity': '1' });
      $('.mapbody').find('g, g path').css({ 'display': 'none', 'opacity': '1' });

      $('.mapbody').find('#' + ele_state).addClass('selected');
      $('.mapbody').find('path').css('opacity', '0.6');
      $('.mapbody .selected').find('path').css({ 'display': 'none', 'opacity': '1' });
      $('.mapbody .selected').find('g, g path').css({ 'display': 'block', 'opacity': '1' });

      var ele_title = $('.state-map.selected').attr('title');


      var id = $('.state-map.selected').attr('id');
      var idElem = document.getElementById(id);
      var clientReact = idElem.getBoundingClientRect();
      var description = document.querySelector('.state-tooltip');

      var mapContainer = document.getElementsByClassName('mapbody')[0];
      var mapContainerRect = mapContainer.getBoundingClientRect();

      $(description).css({
        'left': clientReact.left - mapContainerRect.left + clientReact.width / 2,
        'top': clientReact.top - mapContainerRect.top,
        'display': 'inline-block'
      });

      if (id == "IN-JK" || id == "IN-UP" || id == "IN-RJ" || id == "IN-MP") {
        $(description).css({
          'left': clientReact.left - mapContainerRect.left + clientReact.width / 2,
          'top': clientReact.top - mapContainerRect.top + clientReact.height / 3,
          'display': 'inline-block'
        });
      }
      if (id == "IN-AP") {
        $(description).css({
          'left': clientReact.left - mapContainerRect.left + clientReact.width / 4,
          'top': clientReact.top - mapContainerRect.top + clientReact.height / 2,
          'display': 'inline-block'
        });
      }
      if (id == "IN-WB") {
        $(description).css({
          'left': clientReact.left - mapContainerRect.left + clientReact.width / 2 + 10,
          'top': clientReact.top - mapContainerRect.top,
          'display': 'inline-block'
        });
      }
      if (id == "IN-TR") {
        $(description).css({
          'left': clientReact.left - mapContainerRect.left + clientReact.width / 2,
          'top': clientReact.top - mapContainerRect.top - 30,
          'display': 'inline-block'
        });
      }
      if (id == "IN-NL" || id == "IN-MN") {
        $(description).css({
          'left': clientReact.left - mapContainerRect.left + clientReact.width / 2,
          'top': clientReact.top - mapContainerRect.top - 20,
          'display': 'inline-block'
        });
      }
      if (id == "IN-DL") {
        $(description).css({
          'left': clientReact.left - mapContainerRect.left + clientReact.width / 2,
          'top': clientReact.top - mapContainerRect.top - 40,
          'display': 'inline-block'
        });
      }
      if (id == "IN-AR") {
        $(description).css({
          'left': clientReact.left - mapContainerRect.left + clientReact.width / 2 - 10,
          'top': clientReact.top - mapContainerRect.top - 15,
          'display': 'inline-block'
        });
      }

      if ($(window).width() < 576) {
        $(description).css({
          'left': clientReact.left - mapContainerRect.left + clientReact.width / 2,
          'top': clientReact.top - mapContainerRect.top - 15,
          'display': 'inline-block'
        });

        if (id == "IN-JK" || id == "IN-UP" || id == "IN-RJ" || id == "IN-MP") {
          $(description).css({
            'left': clientReact.left - mapContainerRect.left + clientReact.width / 2,
            'top': clientReact.top - mapContainerRect.top,
            'display': 'inline-block'
          });
        }
        if (id == "IN-AP") {
          $(description).css({
            'left': clientReact.left - mapContainerRect.left + clientReact.width / 4,
            'top': clientReact.top - mapContainerRect.top + 15,
            'display': 'inline-block'
          });
        }
        if (id == "IN-WB") {
          $(description).css({
            'left': clientReact.left - mapContainerRect.left + clientReact.width / 2,
            'top': clientReact.top - mapContainerRect.top,
            'display': 'inline-block'
          });
        }
        if (id == "IN-TR") {
          $(description).css({
            'left': clientReact.left - mapContainerRect.left + clientReact.width / 2 - 5,
            'top': clientReact.top - mapContainerRect.top - 30,
            'display': 'inline-block'
          });
        }
        if (id == "IN-NL" || id == "IN-MN") {
          $(description).css({
            'left': clientReact.left - mapContainerRect.left + clientReact.width / 2,
            'top': clientReact.top - mapContainerRect.top - 30,
            'display': 'inline-block'
          });
        }
        if (id == "IN-DL") {
          $(description).css({
            'left': clientReact.left - mapContainerRect.left + clientReact.width / 2 - 5,
            'top': clientReact.top - mapContainerRect.top - 45,
            'display': 'inline-block'
          });
        }
        if (id == "IN-AR") {
          $(description).css({
            'left': clientReact.left - mapContainerRect.left + clientReact.width / 2 - 10,
            'top': clientReact.top - mapContainerRect.top - 30,
            'display': 'inline-block'
          });
        }
      }

      if ($(window).width() < 479) {
        $(description).removeClass('arrow-right');
        $(description).css({
          'left': clientReact.left - mapContainerRect.left + clientReact.width / 2,
          'top': clientReact.top - mapContainerRect.top - 25,
          'display': 'inline-block'
        });

        if (id == "IN-JK") {
          $(description).css({
            'left': clientReact.left - mapContainerRect.left + clientReact.width / 2,
            'top': clientReact.top - mapContainerRect.top - 10,
            'display': 'inline-block'
          });
        }

        if (id == "IN-UP" || id == "IN-RJ" || id == "IN-MP") {
          $(description).css({
            'left': clientReact.left - mapContainerRect.left + clientReact.width / 2,
            'top': clientReact.top - mapContainerRect.top,
            'display': 'inline-block'
          });
        }
        if (id == "IN-AP") {
          $(description).css({
            'left': clientReact.left - mapContainerRect.left + clientReact.width / 4,
            'top': clientReact.top - mapContainerRect.top + 5,
            'display': 'inline-block'
          });
        }
        if (id == "IN-WB") {
          $(description).css({
            'left': clientReact.left - mapContainerRect.left + clientReact.width / 2,
            'top': clientReact.top - mapContainerRect.top,
            'display': 'inline-block'
          });
        }
        if (id == "IN-TR") {
          $(description).css({
            'left': clientReact.left - mapContainerRect.left + clientReact.width / 2 - 5,
            'top': clientReact.top - mapContainerRect.top - 35,
            'display': 'inline-block'
          });
        }
        if (id == "IN-NL" || id == "IN-MN") {
          $(description).css({
            'left': clientReact.left - mapContainerRect.left + clientReact.width / 2 - 5,
            'top': clientReact.top - mapContainerRect.top - 30,
            'display': 'inline-block'
          });
        }
        if (id == "IN-DL") {
          $(description).css({
            'left': clientReact.left - mapContainerRect.left + clientReact.width / 2 - 5,
            'top': clientReact.top - mapContainerRect.top - 45,
            'display': 'inline-block'
          });
        }
        if (id == "IN-AR") {
          $(description).addClass('arrow-right');
          $(description).css({
            'left': clientReact.left - mapContainerRect.left + clientReact.width / 2 - 50,
            'top': clientReact.top - mapContainerRect.top - 30,
            'display': 'inline-block'
          });
        }
      }

      if ($(window).width() < 359) {
        $(description).removeClass('arrow-right');
        $(description).css({
          'left': clientReact.left - mapContainerRect.left + clientReact.width / 2 - 5,
          'top': clientReact.top - mapContainerRect.top - 30,
          'display': 'inline-block'
        });
        if (id == "IN-JK") {
          $(description).css({
            'left': clientReact.left - mapContainerRect.left + clientReact.width / 2,
            'top': clientReact.top - mapContainerRect.top - 15,
            'display': 'inline-block'
          });
        }

        if (id == "IN-UP" || id == "IN-RJ" || id == "IN-MP") {
          $(description).css({
            'left': clientReact.left - mapContainerRect.left + clientReact.width / 2,
            'top': clientReact.top - mapContainerRect.top - 10,
            'display': 'inline-block'
          });
        }
        if (id == "IN-AP") {
          $(description).css({
            'left': clientReact.left - mapContainerRect.left + clientReact.width / 4 - 5,
            'top': clientReact.top - mapContainerRect.top - 5,
            'display': 'inline-block'
          });
        }
        if (id == "IN-DL") {
          $(description).css({
            'left': clientReact.left - mapContainerRect.left + clientReact.width / 2 - 5,
            'top': clientReact.top - mapContainerRect.top - 45,
            'display': 'inline-block'
          });
        }
        if (id == "IN-TR") {
          $(description).css({
            'left': clientReact.left - mapContainerRect.left + clientReact.width / 2 - 5,
            'top': clientReact.top - mapContainerRect.top - 35,
            'display': 'inline-block'
          });
        }
        if (id == "IN-NL" || id == "IN-MN") {
          $(description).css({
            'left': clientReact.left - mapContainerRect.left + clientReact.width / 2 - 5,
            'top': clientReact.top - mapContainerRect.top - 35,
            'display': 'inline-block'
          });
        }
        if (id == "IN-AR") {
          $(description).addClass('arrow-right');
          $(description).css({
            'left': clientReact.left - mapContainerRect.left + clientReact.width / 2 - 50,
            'top': clientReact.top - mapContainerRect.top - 40,
            'display': 'inline-block'
          });
        }
        if (id == "IN-WB") {
          $(description).css({
            'left': clientReact.left - mapContainerRect.left + clientReact.width / 2,
            'top': clientReact.top - mapContainerRect.top - 10,
            'display': 'inline-block'
          });
        }
      }

      $('.state-tooltip p').text(ele_title);

    });
  }

  //************ End Map Js  *************//
  /*2-9-2021*/
  /******** Dropdown **********/
  function dropdown() {
    $('[data-dropdown]').click(function (e) {
      console.log("select click");
      e.stopPropagation();
      e.preventDefault();
      var ele = $(this).parent('.dropdown, .search-dropdowns');
      if (!ele.hasClass('show')) {
        $(".dropdown").removeClass('show');
      }
      ele.toggleClass('show');

      $('.nav-overlay').removeClass('opened').removeAttr('style');
      $('.nav-overlay-search').removeClass('is-open').slideUp();
    });

    $('.dropdownmenu a').click(function (ele) {
      var getvalue = $(this).text();
      /*12-9-2022*/
      $(ele.target).parents('.dropdown, .search-dropdowns').find('li').removeClass('active');
      $(this).parents('li').addClass('active');
      $(this).parents('.dropdown, .search-dropdowns').find('[data-dropdown]').text(getvalue);
      $(this).parents('.dropdown, .search-dropdowns').removeClass('show');
      /*12-9-2022*/
      var ele_target = $(this).data('value');
      $(this).parents('.dropdown').next('.report-content').find('.text-content-box').addClass('hidden');
      $('.dropdown-content').find('.faq-list').addClass('hidden').removeClass('active');
      $('body').find('#' + ele_target).removeClass('hidden').addClass('active');
    });

    $.fn.hasAttr = function (dropdown) {
      return this.attr(dropdown) !== undefined;
    };

    $(document).click(function (e) {
      var clicked = $(e.target);
      var opened = $(".dropdown").hasClass("show");
      if (opened === true && !clicked.hasAttr('data-dropdown')) {
        $(".dropdown").removeClass('show');
      }
      if ($(window).width() < 768) {
        if (opened === true && !clicked.hasAttr('data-dropdown')) {
          $(".dropdown").removeClass('show');
          $('body').removeClass('modal-open');
        }
      }
    });
  }
  dropdown();
});