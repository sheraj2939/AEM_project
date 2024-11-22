var monthObj = {};
$('.general-infolist-wrap').each(function () {
    if ($(this).find('.custom-pdf').length === 1) {
        $(this).find('.custom-pdf').css({
            'border-bottom': 'none',
            'padding': '0'
        });
    }
});

$('.jsGetValue .custom-checkbox-label').click(function () {
    var yearNum = $(this).parents().attr('data-year');
    var monthArrForYear = [];
    var monthLabel = $(this).parents().attr('data-month');

    $(this).parent().closest('.generals-rows-top').next().find('[data-pdfYear]').addClass('d-none').removeClass('custom-pdf');
    $(this).parent().closest('.generals-rows-top').find('[data-defaultyear]').text(yearNum);
    if (yearNum == $('[data-pdfYear="' + yearNum + '"]').attr('data-pdfYear') && $('[data-pdfYear="' + yearNum + '"]').hasClass('d-none')) {
        var pdfYearElements = $(this).parent().closest('.generals-rows-top').next().find('[data-pdfYear="' + yearNum + '"]');
        // pdfYearElements.removeClass('d-none').addClass('custom-pdf');
        pdfYearElements.each(function (index, element) {
            monthArrForYear.push($(element).data('pdfmonth').trim());
        });

        monthArrForYear = removeDuplicates(monthArrForYear);
        monthObj[yearNum] = monthArrForYear;

        var listElements = $(this);
        listElements.parent().closest('.custom-dropdown-wrap').next().find('ul .simplebar-content').empty();

        monthArrForYear.forEach(function (e) {
            listElements.parent().closest('.custom-dropdown-wrap').next().find('ul .simplebar-content').append(`
                <li class="list" data-month="${e}">
                    <label class="custom-checkbox-label custom-month-click">
                        ${e}
                    </label>
                </li>
            `);
        });
        $(this).parent().closest('.generals-rows-top').find('[data-defaultmonth]').text(monthArrForYear[0]);
        $(this).parent().closest('.generals-rows-top').find('[data-defaultmonth]').attr('data-defaultmonth', monthArrForYear[0]);
        $(this).parent().closest('.generals-rows-top').next().find(".general-infolist-wrap [data-pdfyear='" + yearNum + "'][data-pdfmonth='" + monthArrForYear[0] + "']").removeClass('d-none').addClass('custom-pdf');

        clickMonth(yearNum);
        $(this).parent().closest('.generals-rows-top').next().find('.custom-pdf').removeAttr('style');;
        $(this).parent().closest('.generals-rows-top').next().find('.custom-pdf:first').css({
            'padding-top': '0'
        })
        $(this).parent().closest('.generals-rows-top').next().find('.custom-pdf:last').css({
            'border-bottom': 'none',
            'padding-bottom': '0'
        })
    } else if (monthLabel == $('[data-pdfmonth="' + monthLabel + '"]').attr('data-pdfmonth') && $('[data-pdfmonth="' + monthLabel + '"]').hasClass('d-none')) {
        console.log('condition true');
        var pdfMonthElements = $(this).parent().closest('.generals-rows-top').next().find('[data-pdfmonth="' + monthLabel + '"]');
        pdfMonthElements.removeClass('d-none').addClass('custom-pdf');
        $(this).parent().closest('.generals-rows-top').next().find('.custom-pdf:first').css({
            'padding-top': '0'
        })
        $(this).parent().closest('.generals-rows-top').next().find('.custom-pdf:last').css({
            'border-bottom': 'none',
            'padding-bottom': '0'
        })
    } else {
        console.log("condition false");
        $(this).parent().closest('.generals-rows-top').next().find('[data-pdfYear="' + yearNum + '"]').addClass('d-none');
    }
});

function clickMonth(selectedYear) {
    $('.jsGetValue .custom-month-click').on("click", function () {
        var year = selectedYear
        var monthNum = $(this).parents().attr('data-month');
        var pdfMonthElements = $(this).parent().closest('.generals-rows-top').next().find('[data-pdfmonth="' + monthNum + '"]');
        $(this).parent().closest('.generals-rows-top').next().find('[data-pdfmonth]').addClass('d-none').removeClass('custom-pdf');
        $(this).parent().closest('.generals-rows-top').find('[data-defaultmonth]').text(monthNum);
        $(this).parent().closest('.generals-rows-top').find('[data-defaultmonth]').attr('data-defaultmonth', monthNum);
        if (monthNum == pdfMonthElements.attr('data-pdfmonth') && pdfMonthElements.hasClass('d-none')) {
            // pdfMonthElements.removeClass('d-none').addClass('custom-pdf');
            $(this).parent().closest('.generals-rows-top').next().find(".general-infolist-wrap [data-pdfyear='" + year + "'][data-pdfmonth='" + monthNum + "']").removeClass('d-none').addClass('custom-pdf');
            console.log(year);
            $(this).parent().closest('.generals-rows-top').next().find('.custom-pdf').removeAttr('style');;
            $(this).parent().closest('.generals-rows-top').next().find('.custom-pdf:first').css({
                'padding-top': '0'
            })
            $(this).parent().closest('.generals-rows-top').next().find('.custom-pdf:last').css({
                'border-bottom': 'none',
                'padding-bottom': '0'
            })
        } else {
            pdfMonthElements.addClass('d-none');
        }
    });
}

function removeDuplicates(arr) {
    var uniqueArr = [];
    arr.forEach(function (item) {
        if (uniqueArr.indexOf(item) === -1) {
            uniqueArr.push(item);
        }
    });
    return uniqueArr;
}
