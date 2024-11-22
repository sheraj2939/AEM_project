$('[data-banner="bannerAnalyticData"]').on('click',function(e){
    var bannerTitle = $(this).parents('.banner-text').find('h1').text()
    var bannerCTA = e.currentTarget.text.trim()
    var componentName = "Banner";
    var productCode = productCodeId;
    bannerInteraction(bannerTitle,componentName,bannerCTA,productCode)
});