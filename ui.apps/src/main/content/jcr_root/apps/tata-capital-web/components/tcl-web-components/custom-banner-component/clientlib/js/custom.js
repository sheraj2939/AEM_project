$('[data-target="#creditCards-modal-banner"]').click(function (e) {

    $('#creditCards-modal-banner #btnurl-modal-banner').attr("href", "https://www.tatacard.com/tata-eapply/campaign.page/apply?path=personal/credit-cards/classic-cards/tata-titanium-card.dcr&GEMID1=website_2023_March_Tata_eapply_acq&GEMID2=Tata_Website");

});

$(document).ready(function () {
    var currentUrl = window.location.href;
    if (currentUrl.includes('/education-loan.html')) {
        $('[data-cta="sub-navigation-component"], .cta-gap').on('click', function (event) {
            var queryString = window.location.search;
            if (queryString) {
                var originalHref = $(this).attr('href');
                if (originalHref) {
                    var originalUrl = new URL(originalHref, window.location.origin);
                    var currentParams = new URLSearchParams(queryString);
                    currentParams.forEach(function (value, key) {
                        if (!originalUrl.searchParams.has(key)) {
                            originalUrl.searchParams.append(key, value);
                        }
                    });

                    $(this).attr('href', originalUrl.href);
                }
            }
        });
    }
});
