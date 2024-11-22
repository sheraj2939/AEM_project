try {
    if ($(".disclaimer-scoll.simple-bar").length > 0) {
        for (i = 0; i < $(".simple-bar").length; i++) {
            new SimpleBar($(".disclaimer-scoll.simple-bar")[i]);
        }
    }
} catch (e) { console.log(e); }

$('.jsGetValue .custom-checkbox-label').click(function () {
    var filter = this.dataset.filteritem;
    var filterValue = $(this).parent().closest('.general-info-top').next().find(".general-info-list").children();
    var hideTitle = $('.hideTitle');
    for (let val = 0; val < filterValue.length; val++) {
        const element = filterValue[val];
        hideTitle.each(function (inx, ele) {
            if (!ele.parentElement.classList.contains('pd-t15')) {
                ele.parentElement.classList.add('pd-t15');
            }
        });
        element.classList.remove('d-none', 'customborder', 'pd-t0i');
        if (element.childNodes[1].dataset.pdffilterdata != filter) {
            element.classList.add('d-none');
        }
    }
    hideTitle.next().each(function (i, e) {
        // var pdfCounter=0;
        e.previousElementSibling.classList.remove('d-none');

        var elements = $(e).children().filter(function (inx, ele) {
            return !ele.classList.contains('d-none');
        });
        if (elements.length == 0) {
            e.previousElementSibling.classList.add('d-none');
            if (!e.previousElementSibling.parentElement.classList.contains('general-info-content')) {
                e.previousElementSibling.parentElement.classList.remove('pd-t15');
            }
        }
        elements.last().addClass('customborder');
        elements.first().addClass('pd-t0i');
    });
});
$('.custom-dropdown-list.jsGetValue').children(':first-child').children().click();

$('.openDisclaimer').click(function (e) {
    $(e.target).parent().next().addClass('popover-show').css({ "display": "block" });
    $(e.target).parent().next().removeClass('d-none');
    $('body').append('<div class="modal-backdrop"></div>');
    $('body').addClass('popover-modal-open');
});
$('.jsDiskPop').on('click', function () {
    $(this).parents('.popover-modal').removeClass('popover-show');
    $(this).parents('.popover-modal').removeAttr('style');
    $('.height-scroll').removeAttr('style');
    $('body').removeClass('popover-modal-open');
    $('.modal-backdrop').remove();

    var src = $('#video-modal iframe').attr('src');
    $('#video-modal iframe').attr('src', '');
});

/* investor mitc laguange popover modal logic */

/*Cache frequently used elements*/
var $investorMitcLanguageSelect = $("#investorMitcLanguageSelect");
var $investorLanguageDownloadBtn = $("#investorLanguageDownloadBtn");
var $investorLanguageModal = $("#investorLanguageModal");
var $footerInner = $('.footer-inner');

/*Cache language options for optimization*/
var languageOptionInvestor = $(".investor-language-pdf-text");
var $investorModalMITC = $("[data-investorModalMITC]");
var $invPrefrenceLanguageContent = $(".prefrence-language-content");

/*Event handler for opening the investor modal*/
$investorModalMITC.on("click", function (e) {
    e.preventDefault();
    var eleTarget = $(this).attr("data-investorModalMITC");
    /*Add popover-show class after a delay*/
    setTimeout(function () {
        $(eleTarget).addClass("popover-show");
    }, 80);
    /*Append modal backdrop to footer*/
    $footerInner.append('<div class="modal-backdrop"></div>');
    // Display the modal and adjust z-index
    $(eleTarget).css({ "display": "block", "z-index": "6" });
    /*Add class to body for styling adjustments*/
    $("body").addClass("popover-modal-open");
});

/*Event handler for clicking on investor modal*/
$investorModalMITC.click(function (e) {
    e.preventDefault();
    var textEle = $(this).text();
    /*Update modal header text*/
    $investorLanguageModal.find("h3 span").text(textEle);
    /*Reset language selector and disable download button*/
    $('[data-investor="language"]').select2().val("").trigger("change");
    $investorLanguageDownloadBtn.addClass("disabled");
});

/*Event handler for language selection change*/
$investorMitcLanguageSelect.on("change", function (e) {
    /*Enable download button if it was previously disabled*/
    if ($investorLanguageDownloadBtn.is('[style*="pointer-events"]')) {
        $investorLanguageDownloadBtn.removeAttr("style");
    }
    /*Get selected language PDF and update download button href*/
    var pdf = $investorMitcLanguageSelect.find("option:selected").attr("data-pdf");
    $investorLanguageDownloadBtn.attr("href", pdf);
});

/*Event handler for language selection in Select2*/
$investorMitcLanguageSelect.on("select2:select", function (e) {
    /*Enable download button on language selection*/
    $investorLanguageDownloadBtn.removeClass("disabled");
});

/*Event handler for closing the language popover modal*/
$invPrefrenceLanguageContent.find(".popover-modal-close").click(function (e) {
    /*Disable download button on modal close*/
    $investorLanguageDownloadBtn.addClass("disabled");
});

/*Event handler for clicking on investor language list*/
$(".investorLanguageList").click(function (e) {
    /*Get the selected footer head text*/
    var footerHead = e.target.text;
    /*Remove existing language options*/
    languageOptionInvestor.detach();
    /*Reset language selector and add default option*/
    $investorMitcLanguageSelect.html("<option value='none' data-parent='' data-pdf='' class='optInvisible' selected disabled>Select an Option</option>").trigger("change");
    /*Filter and append language options based on footer head*/
    var filteredOption = languageOptionInvestor.filter('[data-parent="' + footerHead + '"]' || '[data-parent=""]');
    $investorMitcLanguageSelect.append(filteredOption).select2().val("none").trigger("change.select2");
});

/* investor mitc laguange popover modal logic */

/* try {
    $('.general-info-list li').click(function (el) {
        documentDownload($(el.currentTarget).text().trim(), $(el.currentTarget).parent().prev('h3').text(), $(el.currentTarget).parents('.general-info-inner').find('.jsShowDrop').text().trim(), 'stock exchange', productCodeId)
    });
} catch (err) {
    console.log(err);
} */
