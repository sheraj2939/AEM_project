$(document).ready(function(){
  
    $('#viewMoreSlider').slick({
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
    });   



    $('#viewSameSlider').slick({
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
        asNavFor: '#jsChannelPartnerSlider',
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
    }); 

    $('#jsChannelPartnerSlider').slick({
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 3,
        arrows: true,
        dots: true,
        asNavFor: '#viewSameSlider',
        focusOnSelect: true,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
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
                    centerPadding: '40px'
                }
            }
        ]
    });
});

