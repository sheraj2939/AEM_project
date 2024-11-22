try {
    $('.investor-relationbox .link-with-arrow').click(function (e) {
        if (location.href.indexOf('tcfsl') !== -1) {
            ctaInteraction(e.currentTarget.innerText, getParentElement(e.currentTarget, 7).querySelector('.component-title').innerText.trim(), $(e.target.parentNode.parentNode).find('.semibold').text(), productCodeId);
        } else {
            ctaInteraction(e.currentTarget.innerText, 'investor relation', $(e.target.parentNode.parentNode).find('.semibold').text(), '');
        }
    });
} catch (e) {
    console.log(e);
}