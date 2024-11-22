$(document).ready(function () {
    $('.jsApiTabOuter [data-apitab]').click(function () {
        $(this).parents('.jsApiTabOuter').find('[data-apitab]').removeClass('active');
        $(this).addClass('active');
        var apitab_ele = $(this).attr('data-apitab');
        console.log(apitab_ele);
        $('.jsApiContentOuter').addClass('d-none');
        $('#' + apitab_ele).removeClass('d-none');
    })

    if ($(window).width() < 992) {
        $('.jsApiDropMob').click(function () {
            $(this).parents('.tab-header').toggleClass('mob-opened');
            $('.api-catalogue-content').slideToggle('2000');
        })

        $('.jsApiTabOuter [data-apitab]').click(function () {
            $('.tab-header').removeClass('mob-opened');
            $('.api-catalogue-content').slideUp('fast');
            var getValues = $(this).text();
            $('.jsApiDropMob span').text(getValues);
        })
    }
    /*8-8-2023*/
    $('.jsCatelogueAccordion .catelogue-sub-accord-head .accord-links').each(function () {
        $(this).click(function () {
            $(this).toggleClass('sub-actives');
            $(this).parents('.catelogue-sub-accord-head').siblings('.catelogue-sub-accord-body').slideToggle('fast');
            $(this).parents('li').siblings('li').find('.catelogue-sub-accord-head .accord-links').removeClass('sub-actives');
            $(this).parents('li').siblings('li').find('.catelogue-sub-accord-body').slideUp('fast');
        })
    })
    /*8-8-2023*/
   
    /*8-9-2023*/ 
    $(".jsAccordian3 [accod-head]").each(function (ele) {
        $(this).click(function () {
            $(this).toggleClass("active");
            $(this).siblings("[accod-body]").slideToggle("100");
            $(this).parents("[accod-row]").siblings("[accod-row]").find("[accod-head]").removeClass("active");
            $(this).parents(".jsAccordian3").find(".noactivelink").removeClass("active");
            $(this).parents("[accod-row]").siblings("[accod-row]").find("[accod-body]").slideUp();
            $(this).parents(".our-other-websites").siblings(".footer-main-content").find(".footer-col .footer-headings").removeClass("active").siblings(".footer-body").slideUp();
        });
    });

    $('.noactivelink').each(function(){
        $(this).click(function(){
            $(this).parents('[accod-row-link]').siblings('[accod-row]').find('[accod-head]').removeClass('active');
            $(this).parents("[accod-row-link]").siblings("[accod-row]").find("[accod-body]").slideUp();
        })
    })
    /*8-9-2023*/ 

})