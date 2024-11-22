$('.jsGetValue .custom-checkbox-label').click(function(){
    var dropsValue = $(this).text();
    $(this).parents('.filter-drop-wrap').find('.jsShowDrop').text(dropsValue);
    $(this).parents('.jsGetValue').find('li').removeClass('actives');
    $(this).parents('li').addClass('actives');
    $(this).parents('.filter-drop-wrap').find('.jsShowDrop').removeClass('active');
    $(this).parents('.filter-drop-wrap').find('.jsDropdownBlock').removeClass('show');
});

$('.stock-exchange-filter').click(function (e) {
    e.currentTarget.classList.toggle('active');
    e.currentTarget.nextElementSibling.classList.toggle('show');
});

$(document).on("click", function (event) {
    var $trigger = $(".close-on-outside");
    if ($trigger !== event.target && !$trigger.has(event.target).length) {
        $('[data-tab]').removeClass('active');
        $(".jsDropdownBlock").removeClass("show");
    }
});