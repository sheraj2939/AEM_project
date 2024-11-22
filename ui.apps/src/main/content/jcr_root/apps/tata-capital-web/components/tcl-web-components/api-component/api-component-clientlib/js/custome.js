try {
    $('.active-accord').each(function (i, e) {
        if ($(e).hasClass('active')) {
            $(e).siblings('[accod-body]').css('display', 'block')
        }
    })
    $('.sub-accordion-act').each(function (i, e) {
        if ($(e).hasClass('sub-actives')) {
            $(e).parents('.catelogue-sub-accord-head').siblings('[sub-acco]').css('display', 'block');
        } else {
            $(e).parents('.catelogue-sub-accord-head').siblings('[sub-acco]').css('display', 'none');
        }
    })

    $(".custom-accord").each(function (ele) {
        $(this).click(function () {
            var targetElements = $(this).siblings("[accod-body]").find('.catalogue-accord-wrap').children('li')[0];
            var $targetElements = $(targetElements);
            var listElements = $(this).siblings("[accod-body]").find('.catalogue-accord-wrap').children('li');
            listElements.each(function (index, element) {
                if (index != 0) {
                    if ($(element).children().hasClass('custom-sub-accord')) {
                        if ($(element).children().find('.sub-accordion-act').hasClass('sub-actives')) {
                            $(element).children().find('.sub-accordion-act').removeClass('sub-actives');
                            $(element).children().find('.sub-accordion-act').parents('.catelogue-sub-accord-head').siblings('[sub-acco]').css('display', 'none');
                        };
                    } else {
                        if ($(element).children().hasClass('active')) {
                            $(element).children().removeClass('active');
                        };
                    }
                }
            });
            if ($targetElements.children().hasClass('custom-sub-accord')) {

                var dataApitabElements = $targetElements.children('.custom-sub-accord');
                dataApitabElements.find('.sub-accordion-act').addClass('sub-actives');
                dataApitabElements.children().children('[sub-acco]').css('display', 'block');

                var subAccordActive = dataApitabElements.children().children('[sub-acco]').children().children()[0];
                var $subAccordActive = $(subAccordActive);
                $subAccordActive.children().addClass('active');
                if ($(window).width() < 992) {
                    var dropText = $subAccordActive.children().text();
                    $('.jsApiDropMob span').text(dropText);
                }

                var apitab_ele = $subAccordActive.children().attr('data-apitab');
                $('.jsApiContentOuter').addClass('d-none');
                $('#' + apitab_ele).removeClass('d-none');
            } else {
                var dataApitabElements = $targetElements.children('[data-apitab]');
                dataApitabElements.addClass('active');
                if ($(window).width() < 992) {
                    var dropText = dataApitabElements.text();
                    $('.jsApiDropMob span').text(dropText);
                }

                var apitab_ele = dataApitabElements.attr('data-apitab');
                $('.jsApiContentOuter').addClass('d-none');
                $('#' + apitab_ele).removeClass('d-none');
            }
        });
    });
} catch (err) {
    console.log(err);
}
