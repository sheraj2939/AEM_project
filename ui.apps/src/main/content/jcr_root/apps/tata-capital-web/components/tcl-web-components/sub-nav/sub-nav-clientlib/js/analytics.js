$(document).ready(function () {
    $('[data-cta = "sub-navigation-component"]').click(function(e){
        if(e.currentTarget.text.split(' ')[0]+" "+e.currentTarget.text.split(' ')[e.currentTarget.text.split(' ').length-1]){
            var ctaText = e.currentTarget.text.split(' ')[0]+" "+e.currentTarget.text.split(' ')[e.currentTarget.text.split(' ').length-1];
        }
        var ctaTitle = document.querySelector('.page-title h1') ? 
        document.querySelector('.page-title h1').innerText.trim() : window.location.href.split('/').pop().split('.').shift();
        if(e.currentTarget.dataset.cta){
        var componentName = e.currentTarget.dataset.cta;
        }
        ctaInteraction(ctaText,componentName,ctaTitle,productCodeId)
    })
    try{
        var subNavInnerLinks = document.querySelectorAll('.overviews-link .overview-sub-menu li a');
        subNavInnerLinks.forEach(function (subLink) {
            subLink.addEventListener('click', function (e) {
                if(getParentElement(e.currentTarget, 3).classList[0] ==='overview-sub-menu'){
                    var menuLinkText = e.currentTarget.innerText.trim();
                    var menuTitle = getParentElement(e.currentTarget, 4).querySelector('[data-subnav-click="sub-navigation-component"]').innerText.trim();
                    var componentName = 'sub navigation inner';
                    submenuClick(menuLinkText, componentName, menuTitle, productCodeId);
                }
            });
        });
        var subNavLinks = document.querySelectorAll('.overviews-link li a');
        subNavLinks.forEach(function(subNavLink){
          subNavLink.addEventListener('click', function(e){
            if(getParentElement(e.currentTarget, 3).classList[0] !=='overview-sub-menu'){
            var menuLinkText = e.currentTarget.innerText.trim();
            var menuTitle = 'sub navigation';
            var componentName = document.querySelector('.page-title h1') ?
            document.querySelector('.page-title h1').innerText.trim() : window.location.href.split('/').pop().split('.').shift();
            submenuClick(menuLinkText, componentName, menuTitle, productCodeId);
            }
          })
        });
    } catch (error) {
        console.log('element not found', error);
    }
    try{
        var backToLinks = document.querySelector('.sub-nav .backtolinks');
        backToLinks.addEventListener('click', function(e){
            var ctaText = e.currentTarget.innerText.trim();
            var ctaTitle = window.location.href.split('/').pop().split('.').shift();
            var componentName = 'sub navigation component';
            ctaInteraction(ctaText,componentName,ctaTitle,productCodeId);
        });
    } catch(error) {
        console.log('element not found', error);
    }
});