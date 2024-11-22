
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
    var selectArr = [];
    var joinedVal;
    $('.js-filterCheck').change(function () {
        var newSelectedArr = $(this).attr('data-event');
        var selectedActualText = $('[data-item="' + newSelectedArr + '"] .checkboxtext').text();
        var found = jQuery.inArray(selectedActualText, selectArr);
        if (found >= 0) {
            selectArr.splice(found, 1);
            $('.jsMultiSelectList .select-item[data-item="' + newSelectedArr + '"]').removeClass('active');
        } else {
            selectArr.push(selectedActualText);
            $('.jsMultiSelectList .select-item[data-item="' + newSelectedArr + '"]').addClass('active');
        }
        joinedVal = selectArr.join(', ');
        console.log(selectArr, joinedVal);
        if (joinedVal === '') {
            $('.js-filterBtn a').text('Select');
            $('.js-filterBtn a').css('color', '#828282');
            $('.jsMulitSelectValue').val('Select')
        } else {
            $('.js-filterBtn a').text(joinedVal);
            $('.js-filterBtn a').css('color', '#333333');
            $('.jsMulitSelectValue').val(joinedVal);
        }
    });
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
})