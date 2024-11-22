$(document).ready(function () {
    // Faqs click analytics START
    try {
        document.querySelectorAll('[data-faq = "popular-faq"] .faq-heading').forEach(function(faq){
            faq.addEventListener('click', function(e){
                var faqTitle = e.currentTarget.innerText.trim();
                var componentName = getParentElement(e.currentTarget, 8).querySelector('.component-title h2').innerText.trim();
                 if($(e.currentTarget).hasClass('active')){
                    faqClick(componentName, faqTitle, productCodeId) ;
                 } 
            });
        });
    } catch (error) {
        console.log('element not found', error);
    }
    // Faqs click analytics END

    // app process faq inner ctas analytics START 
    try{
        var faqAccordBtns = document.querySelectorAll('.popular-faq-box .faq-accordion-button a');
        faqAccordBtns.forEach(function(faqAccordBtn){
            faqAccordBtn.addEventListener('click', function(e){
                if(getParentElement(e.currentTarget, 17).classList[0] == 'popular-faq-box'){
                    var ctaText = e.currentTarget.innerText.trim();
                    var ctaTitle = getParentElement(e.currentTarget, 9).querySelector('.cmp-accordion__header a').innerText.trim();;
                    var componentName = getParentElement(e.currentTarget, 17).querySelector('.component-title h2').innerText.trim();
                    ctaInteraction(ctaText,componentName,ctaTitle,productCodeId);
                }
            })
        })
    }catch(error){
        console.log('element not found', error);
    }
    // pp process faq inner ctas analytics END
});