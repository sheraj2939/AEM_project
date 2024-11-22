$(".faq-heading").each(function (ele) {
  $(this).click(function () {
    $(this).toggleClass("active");
    $(this).parents(".faq-row").siblings(".faq-row").find(".faq-heading.active").removeClass("active");
  });
});

  /*27-8-2024*/
  $('.jsFaqLoadmoreList .faq-row').hide();
  if ($('.jsFaqLoadmoreList .faq-row').length < 7) {
    $('.jsFaqLoadmoreList').siblings('.faq-list-load').find('.faq-list-load').addClass('d-none');
  }
  $('.jsFaqLoadmoreList .faq-row').slice(0, 6).show();
  $("#jsFaqLoadMore").on('click', function (e) {
    e.preventDefault();
    $(".jsFaqLoadmoreList .faq-row:hidden").slice(0, 3).fadeIn();
    if ($(".jsFaqLoadmoreList .faq-row:hidden").length == 0) {
      $("#jsFaqLoadLess").removeClass('d-none').fadeIn('slow');
      $("#jsFaqLoadMore").hide();
    }
  });
  $("#jsFaqLoadLess").on('click', function (e) {
    e.preventDefault();
    $('.jsFaqLoadmoreList .faq-row:not(:lt(6))').fadeOut();
    $("#jsFaqLoadMore").fadeIn('slow');
    $("#jsFaqLoadLess").hide();
  });
  /*27-8-2024*/