try {
    $('.partners-policy-box li a').click((e) => {
        var componentName = location.href.split('.html')[0].split('/');
        ctaInteraction($(e.currentTarget).text().trim(), componentName[componentName.length - 1], '', productCodeId);
    });
} catch (e) {
    console.log(e);
}