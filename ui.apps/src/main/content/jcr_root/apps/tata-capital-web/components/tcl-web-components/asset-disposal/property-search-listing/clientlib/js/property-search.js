
if ($('#propertySearchListing').length > 0) {
    $(document).ready(function () {

        if ($(window).width() < 992) {

            $('[data-filter]').click(function () {
                $('.jsShowMobStart').removeClass('d-block');
                $('.mob-filter-value').removeClass('d-none');
                var ele_target = $(this).attr('data-filter');
                $('body').addClass('scroll-hide');
                $('body').find('#' + ele_target).addClass('opened');
                $('body').append('<div class="tab-backdrop"></div>');
            });

            $('[data-filterclose]').click(function () {
                var ele_target = $(this).attr('data-filterclose');
                $('body').removeClass('scroll-hide');
                $('body').find('#' + ele_target).removeClass('opened');
                $('body').find('.tab-backdrop').remove();
            });

            $('.jsMobEditCity').click(function () {
                $(this).parents('.mob-filter-value').addClass('d-none');
                $('.jsShowMobStart').addClass('d-block');
                $('body').addClass('scroll-hide');
            })
            $('.jsStateBtn').click(function () {
                $('.jsShowMobStart').removeClass('d-block');
                $('.mob-filter-value').removeClass('d-none');
                $('body').removeClass('scroll-hide');
            })
        }

        if ($(window).scrollTop() > 85) {
            $('.search-property .approved-projects-box').addClass('fixed-search');
        }

        if ($(window).scrollTop() > 140) {
            try {
                $('.property-filters-box').addClass('sticky-form');
            } catch (error) {
                console.log(error)
            }
        }

    })
    var elementPosition = $('.search-property .approved-projects-box').offset()
    var elementHeaderHeight = $('.nps-header').outerHeight();
    $(window).scroll(function () {
        if ($(window).scrollTop() > elementPosition.top - elementHeaderHeight) {
            $('.search-property .approved-projects-box').addClass('fixed-search');
            if ($(window).width() > 991) {
                $('.search-property').css('padding-top', '141px');
            }
            else {
                $('.search-property').css('padding-top', '60px');
            }
        } else {
            $('.search-property .approved-projects-box').removeClass('fixed-search');
            $('.search-property').css('padding-top', '0px');
        }

        if ($(window).width() > 991) {
            sticky_relocate();
        }
    });

    var div_top = $('.property-filters-box').offset().top;
    function sticky_relocate() {
        var window_top = $(window).scrollTop();
        var footer_top = $(".footer").offset().top;
        var div_height = $(".property-filters-box").outerHeight();
        var footer_height = $('.footer').outerHeight() - 100;
        var elementHeaderHeight = $('.nps-header').outerHeight();
        var searchHeight = $('.approved-projects-box.fixed-search').outerHeight();
        totalHeight = elementHeaderHeight + searchHeight;

        if ((window_top + 200 + div_height) > footer_top) {
            $('.property-filters-box').removeClass('sticky-form');
            $('.property-filters-box').addClass('remove-sticky').css('bottom', footer_height);
        } else if (window_top + 153 > div_top) {
            $('.property-filters-box').addClass('sticky-form');
            $('.property-filters-box').removeClass('remove-sticky').removeAttr('style');
        } else {
            $('.property-filters-box').removeClass('sticky-form');
        }
    }
}
