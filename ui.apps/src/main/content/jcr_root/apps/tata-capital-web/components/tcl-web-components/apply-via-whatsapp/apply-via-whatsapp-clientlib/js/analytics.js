document.addEventListener('DOMContentLoaded', function(){
// Apply for Loans on WhatsApp START
try{
    var loansWhatsappApplyBtn = document.querySelector('.loan-whatsapp-box .apply-now-btn'); 
    loansWhatsappApplyBtn.addEventListener('click', function(e){
        var loansWhatsappBox = getParentElement(e.currentTarget, 7)
        if(loansWhatsappBox.classList[0] === 'loan-whatsapp-box' && document.querySelectorAll('.error-msgs').length == 0){
            var ctaText = e.currentTarget.innerText.trim();
            var componentName = loansWhatsappBox.querySelector('.main-title h1').innerText.trim();
            var ctaTitle = getParentElement(e.currentTarget, 3).querySelector('.initiate-loan-journey h2').innerText.trim();
            var mobileNo = document.querySelector('#js-whatsapp-loan [data-type="mobile"]').value.trim();
            whatsappapplyNow(ctaText, componentName, ctaTitle, productCodeId, mobileNo)
        }
    })
} catch(error){
    console.log('element not found', error);
}
// Apply for Loans on WhatsApp END

// Tata capital whatsapp Number analytics START
try {
    var tcWhatsappNum = document.querySelector('.loan-whatsapp-box .loan-whatsapp-item-top a');
    tcWhatsappNum.addEventListener('click', function (e) {
        var ctaText = e.currentTarget.innerText.trim();
        var ctaTitle = getParentElement(tcWhatsappNum, 7).querySelector('.initiate-loan-journey h2').innerText.trim();
        var componentName = getParentElement(tcWhatsappNum, 7).querySelector('h1').innerText.trim()
        ctaInteraction(ctaText, componentName, ctaTitle, productCodeId)
    });
} catch (error) {
    console.log('element not found', error);
}
// Tata capital whatsapp Number analytics END
})