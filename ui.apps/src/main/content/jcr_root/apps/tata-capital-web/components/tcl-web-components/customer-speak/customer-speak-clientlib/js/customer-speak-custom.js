$(document).on("click", function (event) {
    var $trigger = $(".close-on-outside");
    if ($trigger !== event.target && !$trigger.has(event.target).length) {
      $('[data-rel]').removeClass('active')
      $(".dropdown-block").removeClass("show");
      /*10-01-2023*/
      $(".jsDropdownBlock").removeClass("show");
      /*10-01-2023*/
    }
  });

  /*simple scroll bar*/
try{
  if ($('.cutomer-speak-box .simple-bar').length > 0) {
    for (i = 0; i < $('.simple-bar').length; i++) {
      new SimpleBar($('.cutomer-speak-box .simple-bar')[i]);
    }
  }
}catch{}