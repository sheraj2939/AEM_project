/* menu tab start */
$('[tab-menu]').click(function (e) {
  e.preventDefault();
  var tabMenu = $(this).attr('tab-menu');
  console.log(tabMenu);
  $(this).parents('[tab-wrapper]').find('[tab-menu]').removeClass('active');
  $(this).addClass('active');
  $(this).parents('[tab-wrapper]').find('[tab-contnet]').addClass('d-none');
  $(this).parents('[tab-wrapper]').find('[tab-contnet="' + tabMenu + '"]').removeClass('d-none');
  $(".slick-slider").slick("refresh");
});
/* menu tab end */

/*IndividualsSlider slider*/
if ($(window).width() > 767) {
  if ($('#jsIndividualsSlider').hasClass('slick-initialized')) {
    $('#jsIndividualsSlider').slick('unslick');
  }
} else {
  $('#jsIndividualsSlider').not('.slick-initialized').slick({
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "30px",
          infinite: false,
          dots: true,
          arrows: false
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "30px",
          infinite: false,
          dots: true,
          arrows: false
        }
      }
    ]
  });
}
/*IndividualsSlider slider*/

if ($(window).width() > 767) {
  if ($('#jsNRISlider').hasClass('slick-initialized')) {
    $('#jsNRISlider').slick('unslick');
  }
} else {
  $('#jsNRISlider').not('.slick-initialized').slick({
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "30px",
          infinite: false,
          dots: true,
          arrows: false
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "30px",
          infinite: false,
          dots: true,
          arrows: false
        }
      }
    ]
  });
}
/*jsNRISlider slider*/

/*jsBusinessSlider slider*/
if ($(window).width() > 767) {
  if ($('#jsBusinessSlider').hasClass('slick-initialized')) {
    $('#jsBusinessSlider').slick('unslick');
  }
} else {
  $('#jsBusinessSlider').not('.slick-initialized').slick({
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "30px",
          infinite: false,
          dots: true,
          arrows: false
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "30px",
          infinite: false,
          dots: true,
          arrows: false
        }
      }
    ]
  });
}
/*jsBusinessSlider slider*/ 