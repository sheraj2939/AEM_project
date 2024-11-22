function sliderFunc(sliderParent, sliderProp = sliderProperties) {
  if (sliderParent.length) {
    if (sliderParent.hasClass("slick-initialized")) {
      sliderParent.slick("unslick");
    } else {
      sliderParent.not(".slick-initialized").slick(sliderProp);
    }
  }
}

/*customer-say slider*/
const CustomerSaySlider = {
  dots:  $('.customer-row').length > 3,
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
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        arrows: false,
        centerMode: true,
        centerPadding: "30px",
        infinite: true,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
        centerMode: true,
        centerPadding: "30px",
        infinite: true,
      },
    },
  ],
};
/*customer-say slider*/

sliderFunc($(".jsCustomerSaySlider"), CustomerSaySlider);

// const myTimeout = setTimeout(simpleBar, 2000);
/*simple scroll bar*/
/*function simpleBar(){
if ($(".simple-bar").length > 0) {
  $(".simple-bar").each(function (e) {
    new SimpleBar($(".simple-bar")[e]);
  });
}
}*/
/*simple scroll bar*/