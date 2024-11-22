$(document).ready(function () {
    $('[data-cta="Customer Testimonial"]').click(function(e){
        if(e.currentTarget.text){
            var ctaText = e.currentTarget.text.trim();
        }
        var componentName = e.currentTarget.dataset.cta;
        if(e.currentTarget.parentElement.textContent){
        var ctaTitle = "Customer Speak Read All";
        }
        var productCode = productCodeId;
        ctaInteraction(ctaText,componentName,ctaTitle,productCode)
    })
});