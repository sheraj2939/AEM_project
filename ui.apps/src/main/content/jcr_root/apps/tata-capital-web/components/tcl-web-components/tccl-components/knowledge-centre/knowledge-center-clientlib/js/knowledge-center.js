function updateMonthOptions(selectedYear, $selectedTab) {
    var monthSelector = $("#fy-2 ul.jsGetValue");
    var selectedMonth = $('[data-rel="fy-2"]').text()
    monthSelector.empty();

    /*monthSelector.append(`<li class="list" data-month="all"><label class="custom-checkbox-label">All Months</label></li>`);
    if (selectedYear == 'all') {
        var uniqueMonths = [...new Set($selectedTab.find(".knowledge-cards").map(function () { return $(this).data("month"); }).get())];
        var monthSelector = $("#fy-2 ul.jsGetValue");
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

    } */
    var uniqueMonths = {};
    $selectedTab.find(".knowledge-cards[data-year='" + selectedYear + "']").each(function () {
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
    sortedUniqueMonths.forEach(function (month, index) {
        // var active = selectedMonth == month;
        monthSelector.append(`<li class="list ${index === 0 ? 'actives' : ''}" data-month="${month}"><label class="custom-checkbox-label">${month}</label></li>`);
    });

    var selectedMonths = monthSelector.find('.list.actives').attr('data-month');

    $('[data-rel="fy-2"]').attr('data-defaultmonth', selectedMonths);
    $('[data-rel="fy-2"]').text(selectedMonths);

    /* simple bar */
    if ($('[id="fy-2"]').find('.simple-bar').length > 0) {
        for (var i = 0; i < $('[id="fy-2"]').find('.simple-bar').length; i++) {
            new SimpleBar($('[id="fy-2"]').find('.simple-bar')[i]);
        }
    }

    $('#fy-2 .jsGetValue .custom-checkbox-label').click(function () {
        var dropsValue = $(this).text();
        $(this).parents('.filter-drop-wrap').find('.jsShowDrop').text(dropsValue);
        $(this).parents('.jsGetValue').find('li').removeClass('actives');
        $(this).parents('li').addClass('actives');
        $(this).parents('.filter-drop-wrap').find('.jsShowDrop').removeClass('active');
        $(this).parents('.filter-drop-wrap').find('.jsDropdownBlock').removeClass('show');
       /*var selectedMonth = $(this).parent().data('month');
        updateYearOptions(selectedMonth, $selectedTab); */
        filterCards($selectedTab);
    });
}

/* function updateYearOptions(selectedMonth, $selectedTab) {
    var yearSelector = $("#fy-1 ul.jsGetValue");
    var selectedYear = $('[data-rel="fy-1"]').text()
    yearSelector.empty();
   // yearSelector.append(`<li class="list" data-year="all"><label class="custom-checkbox-label">All Years</label></li>`);

    if (selectedMonth == 'all') {
        var uniqueYears = [...new Set($selectedTab.find(".knowledge-cards").map(function () { return $(this).data("year"); }).get())];

        var yearSelector = $("#fy-1 ul.jsGetValue");

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
        $selectedTab.find(".knowledge-cards[data-month='" + selectedMonth + "']").each(function () {
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



    $('#fy-1 .jsGetValue .custom-checkbox-label').click(function () {
        var dropsValue = $(this).text();
        $(this).parents('.filter-drop-wrap').find('.jsShowDrop').text(dropsValue);
        $(this).parents('.jsGetValue').find('li').removeClass('actives');
        $(this).parents('li').addClass('actives');
        $(this).parents('.filter-drop-wrap').find('.jsShowDrop').removeClass('active');
        $(this).parents('.filter-drop-wrap').find('.jsDropdownBlock').removeClass('show');
        var selectedYear = $(this).parent().data('year');
        updateMonthOptions(selectedYear, $selectedTab);
        filterCards($selectedTab);
    })
} */


function filterCards($selectedTab) {
    var selectedYear = $('[data-rel="fy-1"]').text()
    var selectedMonth = $('[data-rel="fy-2"]').text()
    $selectedTab.find(".knowledge-cards").hide();

    if (selectedYear == "All Years" && (selectedMonth == 'Months' || selectedMonth == 'All Months')) {
        $selectedTab.find(".knowledge-cards[data-year]").show();
    } else if (selectedMonth == "All Months" && (selectedYear == 'Years' || selectedYear == 'All Years')) {
        $selectedTab.find(".knowledge-cards[data-month]").show();
    } else if (selectedYear == "Years" && selectedMonth == 'Months') {
        $selectedTab.find(".knowledge-cards").show();
    }
    else if (selectedYear !== "" && (selectedMonth == 'Months' || selectedMonth == 'All Months')) {
        $selectedTab.find(".knowledge-cards[data-year='" + selectedYear + "']").show();
    } else if (selectedMonth !== "" && (selectedYear == 'Years' || selectedYear == 'All Years')) {
        $selectedTab.find(".knowledge-cards[data-month='" + selectedMonth + "']").show();
    }
    else if (selectedYear !== "" && selectedMonth !== "" && selectedYear !== "All Years" && selectedMonth !== 'All Months') {
        var matchingCards = $selectedTab.find(".knowledge-cards[data-year='" + selectedYear + "'][data-month='" + selectedMonth + "']");
        matchingCards.show();
    } else {
        $selectedTab.find(".knowledge-cards").show();
    }
}


$(document).ready(function () {
    var tabSelected = $('.js-tabClick.active').attr('tab-menu');
    updateDropdowns(tabSelected)
});

$('.js-tabClick').click(function (e) {
    var tabName = $(this).attr('tab-menu');
    updateDropdowns(tabName)
});

function updateDropdowns(tabName) {
    var $selectedTab = $('[tab-contnet="' + tabName + '"]');
    var uniqueYears = [...new Set($selectedTab.find(".knowledge-cards").map(function () { return $(this).data("year"); }).get())];

     // Sort uniqueYears based on proximity to the current date
     uniqueYears.sort(function (a, b) {
        return b - a; // Sort in descending order (latest year first)
    });

    var yearSelector = $("#fy-1 ul.jsGetValue");
    yearSelector.empty();
   // yearSelector.append(`<li class="list" data-year="all"><label class="custom-checkbox-label">All Years</label></li>`);
    uniqueYears.forEach(function (year,index) {
        yearSelector.append(`<li class="list ${ index === 0 ? 'actives' : ''}" data-year="${year}"><label class="custom-checkbox-label">${year}</label></li>`);
    });

    var firstYearActive = $('[id="fy-1"]').find('.list.actives').attr('data-year');

    $('[data-rel="fy-1"]').attr('data-defaultyear',firstYearActive);
    $('[data-rel="fy-1"]').text(firstYearActive);


    var uniqueMonths = [...new Set($selectedTab.find(".knowledge-cards[data-year='" + firstYearActive + "']").map(function () { return $(this).data("month"); }).get())];

    // Get the current date
    var currentDate = new Date();

    // Sort uniqueMonths based on proximity to the current date
    uniqueMonths.sort(function (a, b) {
        var dateA = new Date('1970 ' + a + ' 01');
        var dateB = new Date('1970 ' + b + ' 01');
        return Math.abs(dateB - currentDate) - Math.abs(dateA - currentDate);
    });

    var monthSelector = $("#fy-2 ul.jsGetValue");
    monthSelector.empty();
   // monthSelector.append(`<li class="list" data-month="all"><label class="custom-checkbox-label">All Months</label></li>`);
    uniqueMonths.forEach(function (month,index) {
        monthSelector.append(`<li class="list ${ index === 0 ? 'actives' : ''}" data-month="${month}"><label class="custom-checkbox-label">${month}</label></li>`);
    });

    var firstMonthActive = $('[id="fy-2"]').find('.list.actives').attr('data-month');

    $('[data-rel="fy-2"]').attr('data-defaultmonth',firstMonthActive);
    $('[data-rel="fy-2"]').text(firstMonthActive);

    /* simple bar */
    if ($('.Knowledge-centre').find('.simple-bar').length > 0) {
        for (var i = 0; i < $('.Knowledge-centre').find('.simple-bar').length; i++) {
            new SimpleBar($('.Knowledge-centre').find('.simple-bar')[i]);
        }
    }

    filterCards($selectedTab);
    $('#fy-1 .jsGetValue .custom-checkbox-label').click(function () {
        var selectedYear = $(this).parent().data('year');
        var dropsValue = $(this).text();
        $(this).parents('.filter-drop-wrap').find('.jsShowDrop').text(dropsValue);
        $(this).parents('.jsGetValue').find('li').removeClass('actives');
        $(this).parents('li').addClass('actives');
        $(this).parents('.filter-drop-wrap').find('.jsShowDrop').removeClass('active');
        $(this).parents('.filter-drop-wrap').find('.jsDropdownBlock').removeClass('show');
        updateMonthOptions(selectedYear, $selectedTab);
        filterCards($selectedTab);
    })

    $('#fy-2 .jsGetValue .custom-checkbox-label').click(function () {
        var dropsValue = $(this).text();
        $(this).parents('.filter-drop-wrap').find('.jsShowDrop').text(dropsValue);
        $(this).parents('.jsGetValue').find('li').removeClass('actives');
        $(this).parents('li').addClass('actives');
        $(this).parents('.filter-drop-wrap').find('.jsShowDrop').removeClass('active');
        $(this).parents('.filter-drop-wrap').find('.jsDropdownBlock').removeClass('show');
        var selectedMonth = $(this).parent().data('month');
       // updateYearOptions(selectedMonth, $selectedTab);
        filterCards($selectedTab);
    });
}

$('[data-rel]').on('click', function () {
    var $id = $(this).attr('data-rel');
    if ($('#' + $id).css('display') == 'none') {
      $('.dropdown-block').removeClass('show');      
      $('.jsDropdownBlock').removeClass('show');      
      $('[data-rel]').removeClass('active')
    }
    else {
      $('[data-rel]').removeClass('active')
      $('#' + $id).removeClass('show');
    }        
  })