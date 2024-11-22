$(document).ready(function () {
    $('.jsMultiDropdown [data-multiselect]').on('click', function () {
        var $id = $(this).attr('data-multiselect');
        if ($('#' + $id).css('display') == 'none') {
            $('.jsMultiDropdown').addClass('show');
            $(this).addClass('active');
        }
        else {
            $('.jsMultiDropdown').removeClass('show');
            $(this).removeClass('active');
        }
    })
    $(document).on("click", function (event) {
        var $trigger = $(".close-on-outside");
        if ($trigger !== event.target && !$trigger.has(event.target).length) {
            $('[data-multiselect]').removeClass('active')
            $(".jsMultiDropdown").removeClass("show");
        }
    });
    /* filter search js */
    $(".jsSearchInput").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $(".jsMultiSelectList li").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
        if ($(".jsMultiSelectList li").is(':visible')) {
            $('.jsNoSearchResult').addClass('d-none');
        } else {
            $('.jsNoSearchResult').removeClass('d-none');
        }
    });
});