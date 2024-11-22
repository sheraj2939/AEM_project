if($(window).width() < 992) {    
    $(".tab-left .tabScrollCenter").on("click", function () {
        var parId = $(this).parent().parent().attr('id');
        $( "#" + parId +" .tab-left .tabScrollCenter").removeClass("cmp-tabs__tab--active");
        $(this).addClass("cmp-tabs__tab--active");
        $("#" + parId + " .tab-left").scrollCenter(".cmp-tabs__tab--active", 300);
    });
}  
var urlData = {};
/*FOR PRODUCTS LEVEL QRC*/
if (location.search.split("?")[1]) {
    
    location.search.split("?")[1].split("&").forEach(function (el) {
        urlData[el.split("=")[0]] = el.split("=")[1];
    });
}
var activeTab = urlData.activeTab;
var tabs=$('[data-activeTab]');
$( document ).ready(function() {
Array.from(tabs).forEach(function(e){
    
    if(jsHelper.isDefined(activeTab)){
    if(activeTab == e.dataset.activetab){
        // $(e).trigger('click');
        var currentTab = $(e).attr('id');
        document.getElementById(currentTab).click();
    } 
}    
})
});

try {
    $('.insurance-plans .cmp-tabs__tab.tabs-button').click(function (el) {
        widgetInteraction($(el.currentTarget).text(), 'general insurance');
    })
} catch (err) {
    console.log(err);
}