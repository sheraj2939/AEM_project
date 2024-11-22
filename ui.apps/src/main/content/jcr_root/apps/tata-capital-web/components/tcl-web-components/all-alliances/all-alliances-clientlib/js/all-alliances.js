try {
    $('.partner-details .cmp-teaser__action-link').click((e) => {
        var ctaTitle = $(e.currentTarget).parents('.right-col').find('.lender-name').text().trim();
        var componentName = location.href.split('.html')[0].split('/');
        ctaInteraction($(e.currentTarget).text(), componentName[componentName.length - 1], ctaTitle, productCodeId);
    });
} catch (e) {
    console.log(e);

}
try {
    $('.all-alliances-inner .link-with-arrow .cmp-teaser__action-link').click((e) => {
        var ctaTitle = $(e.currentTarget).parents('.right-col').find('.heading20').text().trim();
        var componentName = $('.all-alliances h2').text();
        ctaInteraction($(e.currentTarget).text(), componentName, ctaTitle, productCodeId);
    });
} catch {
    console.log(e);
}