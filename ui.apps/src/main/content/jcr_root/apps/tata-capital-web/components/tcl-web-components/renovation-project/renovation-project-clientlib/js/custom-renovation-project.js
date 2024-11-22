  $('.accordion-heading').each(function (ele) {
    $(this).click(function () {
      $(this).toggleClass('active');
      console.log($(this).parents('.accordion-row').siblings('.accordion-row').find('.accordion-heading.active').removeClass('active'));

    })

 

  })