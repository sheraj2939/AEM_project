$(document).ready(function () {
    /*Refresh Slider*/
    $('.jsRefreshGallerySlider').on('click', function () {
        $('.viewMoreSlider').slick('unslick');
        $('.viewMoreSlider').slick(viewMoreOptions);
    })

    var viewMoreOptions = {
        dots: true,
        infinite: false,
        autoplay: false,
        autoplaySpeed: 4000,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        centerMode: true,
        centerPadding: '350px',
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    centerPadding: '300px',
                }
            },
            {
                breakpoint: 1025,
                settings: {
                    centerPadding: '250px',
                }
            },
            {
                breakpoint: 992,
                settings: {
                    centerPadding: '150px',
                    arrows: false
                }
            },
            {
                breakpoint: 768,
                settings: {
                    centerPadding: '70px',
                    arrows: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    centerPadding: '25px',
                    arrows: false
                }
            }
        ]
    }
    $('.viewMoreSlider').slick(viewMoreOptions);
});