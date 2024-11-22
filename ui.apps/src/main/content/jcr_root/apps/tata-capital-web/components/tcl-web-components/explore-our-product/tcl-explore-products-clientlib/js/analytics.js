document.addEventListener('DOMContentLoaded', function() {
    $('[data-cta = "Explore Our Products"]').click(function(e){
    if(getParentElement(document.querySelector('[data-cta = "Explore Our Products"]'), 18).classList[0] == 'explore-our-product-structure'){
        if(e.currentTarget.text){
            var ctaText = e.currentTarget.text.trim();
        }
        var componentName = e.currentTarget.dataset.cta;
        if(e.currentTarget.parentElement.parentElement.parentElement.childNodes[1].textContent){
            var ctaTitle = e.currentTarget.parentElement.parentElement.parentElement.childNodes[1].textContent.trim();
        }
        var productCode = productCodeId;
        ctaInteraction(ctaText,componentName,ctaTitle,productCode)
        }
    });
});