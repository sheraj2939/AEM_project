/*$('[data-footer]').click(function(e){
    var menuLinkText =  e.currentTarget.textContent;
    if(menuLinkText){
        menuLinkText = menuLinkText.trim();
    }
    if(menuLinkText === ""){
        var menuLinkText = e.currentTarget.dataset.imgContent;
        if(menuLinkText){
            menuLinkText = menuLinkText.trim();
        }
    }
    var componentName =  e.currentTarget.dataset.footer.split('-')[0];
    var productCode = productCodeId;
    if(e.currentTarget.dataset.footer.split('-')[1]){
        var menuTitle = e.currentTarget.dataset.footer.split('-')[1];
    }else{
        var menuTitle = "";
    }
    menuInteraction(menuLinkText,componentName,menuTitle,productCode);
});

$('[data-img-content-social]').click(function(e){
    var componentName = e.currentTarget.dataset.imgContentSocial.split("-")[0];
    if(e.currentTarget.dataset.imgContentSocial){
        ctaTitle = e.currentTarget.dataset.imgContentSocial.split("-")[1];
        iconName = e.currentTarget.dataset.imgContentSocial.split("-")[1];
    }
    socialmediaiconClick(componentName,ctaTitle,iconName)
}); */   