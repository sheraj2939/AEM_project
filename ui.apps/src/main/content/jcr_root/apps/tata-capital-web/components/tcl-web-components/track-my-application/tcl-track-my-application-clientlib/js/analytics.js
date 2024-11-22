document.addEventListener('DOMContentLoaded', function() {
    $('.track-my-application .updated-link').click(function(e){
        var ctaText = e.currentTarget.text;
        var componentName = e.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement.dataset.cta;
        var ctaTitle = e.currentTarget.parentElement.textContent;
        var productCode = productCodeId;
        ctaInteraction(ctaText,componentName,ctaTitle,productCode)
    })
});