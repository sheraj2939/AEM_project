$('.report-list').ready(function () {
    var reportListElements = $(".report-list");
    reportListElements.each(function () {
        var getDate = $(this).find('.text12').text();
        var resultDate = parseDate(getDate);
        var month = resultDate.month
        var year = resultDate.year
        $(this).attr('data-month', jsHelper.toSentence(month));
        $(this).attr('data-year', year);
    });

    reportUpdateDropdowns()

});

function reportUpdateMonth(selectedYear) {
    var monthSelector = $("#fy-4 ul.jsGetValue");
    var selectedMonth = $('[data-rel="fy-4"]').text()
    monthSelector.empty();
   /* monthSelector.append(`<li class="list" data-month="all"><label class="custom-checkbox-label">All Months</label></li>`);

    if (selectedYear == 'all') {
        var uniqueMonths = [...new Set($(".report-list").map(function () { return $(this).data("month"); }).get())];
        var monthSelector = $("#fy-4 ul.jsGetValue");
        // Get the current date
        var currentDate = new Date();
        // Sort uniqueMonths based on proximity to the current date
        uniqueMonths.sort(function (a, b) {
            var dateA = new Date('1970 ' + a + ' 01');
            var dateB = new Date('1970 ' + b + ' 01');
            return Math.abs(dateB - currentDate) - Math.abs(dateA - currentDate);
        });
        monthSelector.empty();
        monthSelector.append(`<li class="list" data-month="all"><label class="custom-checkbox-label">All Months</label></li>`);
        uniqueMonths.forEach(function (month) {
            monthSelector.append(`<li class="list" data-month="${month}"><label class="custom-checkbox-label">${month}</label></li>`);
        });

    }*/
        var uniqueMonths = {};
        $(".report-list[data-year='" + selectedYear + "']").each(function () {
            var month = $(this).data("month");
            if (!uniqueMonths[month]) {
                uniqueMonths[month] = true;
            }
        });
        var monthOrder = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        /* Sort uniqueMonths based on proximity to the current date */
        var sortedUniqueMonths = Object.keys(uniqueMonths).sort(function (a, b) {
            var aIndex = monthOrder.indexOf(a);
            var bIndex = monthOrder.indexOf(b);
            /* Calculate the difference in months from the current date */
            var aDifference = (aIndex - monthOrder.indexOf(selectedMonth) + 12) % 12;
            var bDifference = (bIndex - monthOrder.indexOf(selectedMonth) + 12) % 12;
            return aDifference - bDifference;
        });
        /* Append sorted <li> elements to monthSelector */
        sortedUniqueMonths.forEach(function (month,index) {
            //var active = selectedMonth == month;
            monthSelector.append(`<li class="list ${index === 0 ? 'actives' : ''}" data-month="${month}"><label class="custom-checkbox-label">${jsHelper.toSentence(month)}</label></li>`);
        });

        var firstActiveMonths = monthSelector.find('.list.actives').attr('data-month');

        $('[data-rel="fy-4"]').attr('data-defaultmonth', firstActiveMonths);
        $('[data-rel="fy-4"]').text(jsHelper.toSentence(firstActiveMonths));

        /* simple bar */
        if($('[id="fy-4"]').find('.simple-bar').length > 0) {
            for (var i=0; i < $('[id="fy-4"]').find('.simple-bar').length; i++){
              new SimpleBar($('[id="fy-4"]').find('.simple-bar')[i]);
            }
          }


    $('#fy-4 .jsGetValue .custom-checkbox-label').click(function () {
        var dropsValue = $(this).text();
        $(this).parents('.filter-drop-wrap').find('.jsShowDrop').text(dropsValue);
        $(this).parents('.filter-drop-wrap').find('.jsShowDrop').attr('data-defaultmonth',dropsValue);
        $(this).parents('.jsGetValue').find('li').removeClass('actives');
        $(this).parents('li').addClass('actives');
        $(this).parents('.filter-drop-wrap').find('.jsShowDrop').removeClass('active');
        $(this).parents('.filter-drop-wrap').find('.jsDropdownBlock').removeClass('show');
        var selectedMonth = $(this).parent().data('month');
        /* reportUpdateYear(selectedMonth); */
        reportFilterCards();
    });
}

/*function reportUpdateYear(selectedMonth) {
    var yearSelector = $("#fy-3 ul.jsGetValue");
    var selectedYear = $('[data-rel="fy-3"]').text()
    yearSelector.empty();
    yearSelector.append(`<li class="list" data-year="all"><label class="custom-checkbox-label">All Years</label></li>`);

    if (selectedMonth == 'all') {
        var uniqueYears = [...new Set($(".report-list").map(function () { return $(this).data("year"); }).get())];

        var yearSelector = $("#fy-3 ul.jsGetValue");

        // Sort uniqueYears based on proximity to the current date
        uniqueYears.sort(function (a, b) {
            return b - a; // Sort in descending order (latest year first)
        });

        yearSelector.empty();
        yearSelector.append(`<li class="list" data-year="all"><label class="custom-checkbox-label">All Years</label></li>`);
        uniqueYears.forEach(function (year) {
            yearSelector.append(`<li class="list" data-year="${year}"><label class="custom-checkbox-label">${year}</label></li>`);
        });

    } else {
        var uniqueYears = {};
        $(".report-list[data-month='" + selectedMonth + "']").each(function () {
            var year = $(this).data("year");
            if (!uniqueYears[year]) {
                uniqueYears[year] = true;
            }
        });
        var sortedUniqueYears = Object.keys(uniqueYears).sort(function (a, b) {
            var aDifference = Math.abs(selectedYear - a);
            var bDifference = Math.abs(selectedYear - b);
            return aDifference - bDifference;
        });
        sortedUniqueYears.forEach(function (year) {
            var active = selectedYear == year;
            yearSelector.append(`<li class="list ${active ? 'actives' : ''}" data-year="${year}"><label class="custom-checkbox-label">${year}</label></li>`);
        });
    }

    $('#fy-3 .jsGetValue .custom-checkbox-label').click(function () {
        var dropsValue = $(this).text();
        $(this).parents('.filter-drop-wrap').find('.jsShowDrop').text(dropsValue);
        $(this).parents('.jsGetValue').find('li').removeClass('actives');
        $(this).parents('li').addClass('actives');
        $(this).parents('.filter-drop-wrap').find('.jsShowDrop').removeClass('active');
        $(this).parents('.filter-drop-wrap').find('.jsDropdownBlock').removeClass('show');
        var selectedYear = $(this).parent().data('year');
        reportUpdateMonth(selectedYear);
        reportFilterCards();
    })
}*/


function reportFilterCards() {
    var selectedYear = $('[data-rel="fy-3"]').attr('data-defaultyear');
    var selectedMonth = $('[data-rel="fy-4"]').attr('data-defaultmonth');
    $(".report-list").hide();
    $("#noContentFound").hide();

    if (selectedYear == "All Years" && (selectedMonth == 'Months' || selectedMonth == 'All Months')) {
        $(".report-list[data-year]").show();
    } else if (selectedMonth == "All Months" && (selectedYear == 'Years' || selectedYear == 'All Years')) {
        $(".report-list[data-month]").show();
    } else if (selectedYear == "Years" && selectedMonth == 'Months') {
        $(".report-list").show();
    }
    else if (selectedYear !== "" && (selectedMonth == 'Months' || selectedMonth == 'All Months')) {
        $(".report-list[data-year='" + selectedYear + "']").show();
    } else if (selectedMonth !== "" && (selectedYear == 'Years' || selectedYear == 'All Years')) {
        $(".report-list[data-month='" + selectedMonth + "']").show();
    }
    else if (selectedYear !== "" && selectedMonth !== "" && selectedYear !== "All Years" && selectedMonth !== 'All Months') {
        var matchingCards = $(".report-list[data-year='" + selectedYear + "'][data-month='" + selectedMonth + "']");
        matchingCards.show();
    } else {
        $(".report-list").show();
    }

    // Select all list items
    var $listItems = $('.general-info-box .general-infolist-wrap li');

    // Filter only those list items without the display property in their style attribute
    var $filteredItems = $listItems.filter(function (index, listItem) {
        var styleAttribute = $(listItem).attr('style');
        return !styleAttribute || !styleAttribute.includes('display');
    });

    // Check the number of filtered items
    if ($filteredItems.length === 1) {
        // If only one filtered item, apply styling directly to it
        $filteredItems.css({
            'border-bottom': 'none',
            'padding-bottom': '0',
            'padding-top': '0'
        });
    } else if ($filteredItems.length > 1) {
        // If multiple filtered items, apply styling to the last one
        var $lastFilteredItem = $filteredItems.last();
        var $firstFilteredItem = $filteredItems.first();
        $firstFilteredItem.css({'padding-top': '0'})
        $lastFilteredItem.css({
            'border-bottom': 'none',
            'padding-bottom': '0'
        });
    }
}

function reportUpdateDropdowns() {
    var uniqueYears = [...new Set($(".report-list").map(function () { return $(this).data("year"); }).get())];

    // Sort uniqueYears based on proximity to the current date
    uniqueYears.sort(function (a, b) {
        return b - a; // Sort in descending order (latest year first)
    });

    var yearSelector = $("#fy-3 ul.jsGetValue");
    yearSelector.empty();
   // yearSelector.append(`<li class="list" data-year="all"><label class="custom-checkbox-label">All Years</label></li>`);
    uniqueYears.forEach(function (year,index) {
        yearSelector.append(`<li class="list ${ index === 0 ? 'actives' : ''}" data-year="${year}"><label class="custom-checkbox-label">${year}</label></li>`);
    });

    var firstYearActive = $('[id="fy-3"]').find('.list.actives').attr('data-year');

    $('[data-rel="fy-3"]').attr('data-defaultyear',firstYearActive);
    $('[data-rel="fy-3"]').text(jsHelper.toSentence(firstYearActive));


    
    var uniqueMonths = [...new Set($(".report-list[data-year='" + firstYearActive + "']").map(function () { return $(this).data("month"); }).get())];

    // Get the current date
    var currentDate = new Date();

    // Sort uniqueMonths based on proximity to the current date
    uniqueMonths.sort(function (a, b) {
        var dateA = new Date('1970 ' + a + ' 01');
        var dateB = new Date('1970 ' + b + ' 01');
        return Math.abs(dateB - currentDate) - Math.abs(dateA - currentDate);
    });

    var monthSelector = $("#fy-4 ul.jsGetValue");
    monthSelector.empty();
   // monthSelector.append(`<li class="list" data-month="all"><label class="custom-checkbox-label">All Months</label></li>`);
    uniqueMonths.forEach(function (month,index) {
        monthSelector.append(`<li class="list ${ index === 0 ? 'actives' : ''}" data-month="${month}"><label class="custom-checkbox-label">${jsHelper.toSentence(month)}</label></li>`);
    });

    var firstMonthActive = $('[id="fy-4"]').find('.list.actives').attr('data-month');

    $('[data-rel="fy-4"]').attr('data-defaultmonth',firstMonthActive);
    $('[data-rel="fy-4"]').text(firstMonthActive);

    /* simple bar */
    if ($('.report-filter').find('.simple-bar').length > 0) {
        for (var i = 0; i < $('.report-filter').find('.simple-bar').length; i++) {
            new SimpleBar($('.report-filter').find('.simple-bar')[i]);
        }
    }

    reportFilterCards();

    $('#fy-3 .jsGetValue .custom-checkbox-label').click(function () {
        var selectedYear = $(this).parent().data('year');
        var dropsValue = $(this).text();
        $(this).parents('.filter-drop-wrap').find('.jsShowDrop').text(dropsValue);
        $(this).parents('.filter-drop-wrap').find('.jsShowDrop').attr('data-defaultyear',dropsValue);
        $(this).parents('.jsGetValue').find('li').removeClass('actives');
        $(this).parents('li').addClass('actives');
        $(this).parents('.filter-drop-wrap').find('.jsShowDrop').removeClass('active');
        $(this).parents('.filter-drop-wrap').find('.jsDropdownBlock').removeClass('show');
        reportUpdateMonth(selectedYear);
        reportFilterCards();
    })

    $('#fy-4 .jsGetValue .custom-checkbox-label').click(function () {
        var dropsValue = $(this).text();
        $(this).parents('.filter-drop-wrap').find('.jsShowDrop').text(dropsValue);
        $(this).parents('.filter-drop-wrap').find('.jsShowDrop').attr('data-defaultmonth',dropsValue);
        $(this).parents('.jsGetValue').find('li').removeClass('actives');
        $(this).parents('li').addClass('actives');
        $(this).parents('.filter-drop-wrap').find('.jsShowDrop').removeClass('active');
        $(this).parents('.filter-drop-wrap').find('.jsDropdownBlock').removeClass('show');
        var selectedMonth = $(this).parent().data('month');
        /*reportUpdateYear(selectedMonth);*/
        reportFilterCards();
    });
}

function parseDate(inputDate) {
    const dateRegex = /(?:\b(\d{1,2})(?:th|st|nd|rd)?(?:\s*,?\s*(\w+)(?:\s*,?\s*(\d{4}))?)?)|(?:\b(\w+)(?:\s*,?\s*(\d{4})))?/i;
    const match = inputDate.match(dateRegex);

    if (!match) {
        console.error("Invalid input format");
        return null;
    }

    var month = match[2] || match[4];
    var year = match[3] || match[5];

    if (typeof month === 'string') {
        month = month.toLowerCase();
    }

    var dateObject = new Date(`${month} 1, ${year}`);

    if (isNaN(dateObject.getTime())) {
        console.error("Invalid date");
        return null;
    }
    
    return { month, year: dateObject.getFullYear() };
}