 /*document required slider*/
 if ($(window).width() > 991) {
  if ($(".jsDocumentRequiredSlider").hasClass("slick-initialized")) {
    $(".jsDocumentRequiredSlider").slick("unslick");
  }
} else {
  $(".jsDocumentRequiredSlider")
    .not(".slick-initialized")
    .slick({
      dots: true,
      infinite: false,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            arrows: false,
            dots: true,
            centerMode: true,
            centerPadding: "30px",
            infinite: false,
          },
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
            centerMode: true,
            centerPadding: "30px",
            infinite: false,
            dots: true,
          },
        },
      ],
    });
}
/*document required slider*/

var simpleBarTimeout = setTimeout(simpleBar, 2000);
/*simple scroll bar*/
function simpleBar(){
if ($(".simple-bar").length > 0) {
  $(".simple-bar").each(function (e) {
    new SimpleBar($(".simple-bar")[e]);
  });
}
}