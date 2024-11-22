if($(window).width() < 992) {    
    $(".tab-left .tabScrollCenter").on("click", function () {
        var parId = $(this).parent().parent().attr('id');
        $( "#" + parId +" .tab-left .tabScrollCenter").removeClass("cmp-tabs__tab--active");
        $(this).addClass("cmp-tabs__tab--active");
        $("#" + parId + " .tab-left").scrollCenter(".cmp-tabs__tab--active", 300);
    });
}  