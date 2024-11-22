$('[data-header]').click(function(e){
    var menuLinkText =  e.currentTarget.text;
    if(menuLinkText){
        menuLinkText = menuLinkText.trim();
    }
    if(menuLinkText === ""){
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