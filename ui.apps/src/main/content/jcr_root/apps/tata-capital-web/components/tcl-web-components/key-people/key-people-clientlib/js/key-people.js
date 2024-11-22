  //Tab dropdown js
  $('.jsTabDropdown .tab-drop-btn').click(function (){
    if ($(window).width() < 768) {
      $('.jsTabDropdown [data-tab]').removeClass('cmp-tabs__tab--active');
      $('.jsTabDropdown [data-tab]').removeClass('cmp-tabs__tab--active');
      $('.jsTabDropdown .jsDropdownBlock').removeClass('show');
    }
    var clickBtn =  $(this).attr('tab-menu');
    var text =  $(this).html();
    $('.jsTabDropdown .custom-tab-drop-btn').html(text);
    $('.jsTabDropdown [tab-content]').removeClass('cmp-tabs__tab--active')
    $('.jsTabDropdown [tab-content="' + clickBtn + '"]').addClass('cmp-tabs__tab--active');
  });


  $('[data-tab]').on('click', function () {
    var $id = $(this).attr('data-tab');
    if ($('#' + $id).css('display') == 'none') {
      $('.jsDropdownBlock').removeClass('show');
      $('[data-tab]').removeClass('cmp-tabs__tab--active')
      $(this).addClass('cmp-tabs__tab--active');
      $('#' + $id).addClass('show');
    }
    else {
      $('[data-tab]').removeClass('cmp-tabs__tab--active')
      $('#' + $id).removeClass('show');
    }
  })
  $(document).on("click", function (event) {
    var $trigger = $(".close-on-outside");
    if ($trigger !== event.target && !$trigger.has(event.target).length) {
      $('[data-tab]').removeClass('cmp-tabs__tab--active')
      $(".jsDropdownBlock").removeClass("show");
    }
  });
  //Tab dropdown js