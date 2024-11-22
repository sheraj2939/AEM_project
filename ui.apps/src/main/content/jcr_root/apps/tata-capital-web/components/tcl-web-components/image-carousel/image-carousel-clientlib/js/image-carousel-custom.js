try {
  $('#jsProductSlider').slick({
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          arrows: false,
          centerMode: true,
          centerPadding: '30px',
        },
      },
    ],
  });
} catch (err) {
  console.log(err);
}

// image carousel analytics START
function targetImagesLoad(){
  var imageCarouselElement = document.querySelectorAll('.image-carousel #jsProductSlider a.cmp-image__link');
  if (imageCarouselElement && imageCarouselElement.length > 0) {
      imageCarouselElement && imageCarouselElement.forEach(function (element) {
          element.addEventListener('click', function (e) {
              try {
                  var ctaText = e.currentTarget.childNodes[1].getAttribute('alt').trim();
                  var componentName = getParentElement(e.currentTarget, 5).classList[0].replaceAll('-', ' ') + ' Box';
                  var ctaTitle = '';
                  ctaInteraction(ctaText, componentName, ctaTitle, productCodeId)
              } catch (error) {
                  console.log("image carousel analytics click event", error);
              }
              
          })
      })
  }
}
try {
targetImagesLoad()
}catch (err) {
  console.log(err);
}

// image carousel analytics END