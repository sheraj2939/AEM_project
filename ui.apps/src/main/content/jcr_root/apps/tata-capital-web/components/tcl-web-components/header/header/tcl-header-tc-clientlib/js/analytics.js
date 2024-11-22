$('[data-header]').click(function(e){
    var menuLinkText =  e.currentTarget.text;
    if(menuLinkText){
        menuLinkText = menuLinkText.trim();
    }
    if(!menuLinkText || menuLinkText === ""){
        var menuLinkText = e.currentTarget.dataset.imgContent;
        if(menuLinkText){
            menuLinkText = menuLinkText.trim();
        }
    }
    var componentName =  e.currentTarget.dataset.header.split('-')[0];
    if(productCodeId){
        var productCode = productCodeId;
    }else{
        var productCode = "";
    }
    if(e.currentTarget.dataset.header.split('-')[1]){
        var menuTitle = e.currentTarget.dataset.header.split('-')[1];
    }else{
        var menuTitle = "";
    }
    menuInteraction(menuLinkText,componentName,menuTitle,productCode);
});

// this function will call when user click on any cta on the aware popup START
try{
    var fraudsBtn = document.querySelectorAll('#beware-modal .frauds-inner a');
    fraudsBtn.forEach( function(elemet){
        elemet.addEventListener('click',function(e){
       var componentName = 'aware popup';
       var ctaText = e.currentTarget.innerText.trim();
       var ctaTitle = getParentElement(e.currentTarget,4).querySelector('.aware-aa-title').innerText.trim()
       awarepopupctaInteraction(ctaText, ctaTitle, componentName, productCodeId)
        })
    });
} catch(error){
    console.log('cannot find the element', error);
}
// this function will call when user click on any cta on the aware popup END

// aware popup closed analytics call START
try {
    var fraudsClosedBtn = document.querySelector('#beware-modal [data-dismiss="popover-modal"]');
    fraudsClosedBtn.addEventListener('click', function (e) {
        var componentName = 'aware popup';
        var ctaText = 'closed icon';
        var ctaTitle = getParentElement(e.currentTarget, 1).querySelector('.aware-aa-title').innerText.trim()
        awarepopupctaInteraction(ctaText, ctaTitle, componentName, productCodeId)
    })
} catch (error) {
    console.log('cannot find the element', error);
}
// aware popup closed analytics call END