if ($(window).width() < 992) {
    $(".board-director-box .tabScrollCenter").on("click", function () {
        var parId = $(this).parent().parent().attr('id');
        $("#" + parId + " .tab-left .tabScrollCenter").removeClass("cmp-tabs__tab--active");
        $(this).addClass("cmp-tabs__tab--active");
        $("#" + parId + " .tab-left").scrollCenter(".cmp-tabs__tab--active", 300);
    });
    $(document).ready(function () {
        try {
            $(".tab-left").scrollCenter(".active", 300);
        } catch (error) {
            console.log(error);
        }
    });
}

try {
    $('.custom-board-of-directors .tabs-button').click(function (el) {
        widgetInteraction($(el.currentTarget).text(), 'Board Of Directors');
    })
} catch (err) {
    console.log(err);
}