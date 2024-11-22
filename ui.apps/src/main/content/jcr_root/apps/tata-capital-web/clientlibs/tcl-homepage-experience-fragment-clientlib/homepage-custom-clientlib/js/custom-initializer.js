$("[data-rel-home-calc]").on("click", function () {
  var $id = $(this).attr("data-rel");
  if ($("#" + $id).css("display") == "none") {
    $(".dropdown-block").removeClass("show");
    $("[data-rel-home-calc]").removeClass("active");
    /*3-1-2023*/
    $("body").removeClass("scroll-hide-xs");
    $(".header-inner").removeClass("backdrops-xs");
    /*3-1-2023*/
    $(this).addClass("active");
    $("#" + $id).addClass("show");
    /*3-1-2023*/
    if ($(window).width() < 768) {
      /* after clicking on dropdown item
      $(this).parents("body").addClass("scroll-hide-xs");*/
      $(this).parents(".header-inner").addClass("backdrops-xs");
    }
    /*3-1-2023*/
  } else {
    $("[data-rel-home-calc]").removeClass("active");
    $("#" + $id).removeClass("show");
    /*3-1-2023*/
    if ($(window).width() < 768) {
      $("body").removeClass("scroll-hide-xs");
      $(".header-inner").removeClass("backdrops-xs");
    }
  }
});

var simpleBarTimeout = setTimeout(simpleBar, 2000);
/*simple scroll bar*/
function simpleBar(){
if ($(".simple-bar").length > 0) {
  $(".simple-bar").each(function (e) {
    new SimpleBar($(".simple-bar")[e]);
  });
}
}
/*simple scroll bar*/