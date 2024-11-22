    $(document).ready(function () {
        try{
        $('.about-more-products [data-cta = "about-cibil-score"]').click(function(e){
            // about more products analytics START
            var aboutMoreProducts = getParentElement(e.currentTarget, 14);
            if(aboutMoreProducts.classList[0] === 'about-more-products' || aboutMoreProducts.classList[0] === 'personal-loan-cntr'){
                var ctaText = e.currentTarget.innerText;
                var componentName = getParentElement(e.currentTarget, 14);
                componentName = componentName.querySelector('.tops-heads .text-center').innerText.trim();
                var ctaTitle = getParentElement(e.currentTarget, 4);
                ctaTitle = ctaTitle.querySelector('.text .heading_aa').innerText.trim()
                ctaInteraction(ctaText,componentName,ctaTitle,productCodeId)
            }
            // about more products analytics END
        })
        } catch(error){
            console.log('element not found', error);
        }

        // check cibil score analytics START
        try{
        var checkCibilScoreBtns = document.querySelectorAll('.pre-approved-box [data-cta="about-cibil-score"]');
        checkCibilScoreBtns.forEach(function(cibilScoreBtn){
            cibilScoreBtn.addEventListener('click', function(e){
                if(getParentElement(cibilScoreBtn, 7).classList.contains('personal-loan-box')){
                    var ctaText = e.currentTarget.innerText.trim();
                    var ctaTitle = getParentElement(e.currentTarget, 7).querySelector('.component-title h2').innerText.trim()
                    var componentName = window.location.href.includes('personal-loan') ? 'Personal Loan' : ''
                    ctaInteraction(ctaText,componentName,ctaTitle,productCodeId)
                }
            })
        })
        } catch(error){
            console.log('element not found', error);
        }
        // check cibil scrore analytics END
        
        // renovation project accordian FAQ click analytics START
        try{
        document.querySelectorAll('.renovation-project-accordion .cmp-accordion__header a').forEach(function(accord){
            accord.addEventListener('click', function(e){
            var renovationProjectAccordian = getParentElement(e.currentTarget, 4)
            if(renovationProjectAccordian.classList[0] === 'renovation-project-accordion'){
                var componentName =  getParentElement(e.currentTarget, 10).querySelector('.component-title h2') 
                ? getParentElement(e.currentTarget, 10).querySelector('.component-title h2').innerText.trim()
                : getParentElement(e.currentTarget, 13).querySelector('.component-title h2').innerText.trim();
                var faqTitle = e.currentTarget.innerText.trim();
                faqClick(componentName,faqTitle,productCodeId)
            }
            })
        })
        } catch(error){
            console.log('element not found', error);
        }
        // renovation project accordian FAQ click analytics END
    })