$('.our-presence-tab-list li [data-toggle="tab"]').click(function (event) {
  event.preventDefault();
  var id = $(this).attr('href');
  var getVal = $(this).text();
  $('.tab-pane').removeClass('in active');
  $(id).addClass('in active');
  $('.tab-drodown-button').text(getVal)
  $(this).parents('ul').css({
    display: 'none'
  })
});

$('.tab-drodown-button').click(function () {
  $(this).toggleClass('open').next('ul').slideToggle();
});