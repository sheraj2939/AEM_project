  /*8-8-2024*/ 
  $(".jsHomeLoanCitySlider").slick({
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    centerMode: false,
    centerPadding: "0",
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
          slidesToShow: 1,
          arrows: false,
          dots: true,
          centerMode: true,
          centerPadding: "30px",
          infinite: false,
        },
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
          // centerMode: true,
          centerPadding: "30px",
          infinite: false,
          dots: true,
        },
      },
    ],
  });
  /*8-8-2024*/ 