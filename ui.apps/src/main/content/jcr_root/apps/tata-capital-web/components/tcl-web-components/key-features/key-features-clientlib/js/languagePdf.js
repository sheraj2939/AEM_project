var $keyPdfLanguageSelect = $("#keyPdfLanguageSelect");
var $keyPdfDownloadBtn = $("#keyPdfLanguageDownloadBtn");
var $keyPdfModal = $("#keyPdfLanguageModal");
var $footerInner = $('.footer-inner');
var languageOptionKeyPdf = $(".key-language-pdf-text");
var $keyModalMITC = $("[data-keyModalMITC]");
var $keyPrefrenceLanguageContent = $(".prefrence-language-content");

/*Event handler for opening the investor modal*/
$keyModalMITC.on("click", function (e) {
    e.preventDefault();
    var eleTarget = $(this).attr("data-keyModalMITC");
    setTimeout(function () {
        $(eleTarget).addClass("popover-show");
    }, 80);
    $footerInner.append('<div class="modal-backdrop"></div>');
    $(eleTarget).css({ "display": "block", "z-index": "6" });
    $("body").addClass("popover-modal-open");
});

/*Event handler for language selection change*/
$keyPdfLanguageSelect.on("change", function (e) {
    if ($keyPdfDownloadBtn.is('[style*="pointer-events"]')) {
        $keyPdfDownloadBtn.removeAttr("style");
    }
    var pdf = $keyPdfLanguageSelect.find("option:selected").attr("data-pdf");
    $keyPdfDownloadBtn.attr("href", pdf);
});

/*Event handler for language selection in Select2*/
$keyPdfLanguageSelect.on("select2:select", function (e) {
    $keyPdfDownloadBtn.removeClass("disabled");
});

/*Event handler for closing the language popover modal*/
$keyPrefrenceLanguageContent.find(".popover-modal-close").click(function (e) {
    $keyPdfDownloadBtn.addClass("disabled");
});

/*Event handler for clicking on investor language list*/
$(".keyLanguageButton").click(function (e) {
    var footerHead = $(e.currentTarget).parent().find('.heading20').text().trim();
    $('#keyPdfLanguageModal .popover-modal-body .heading20 span').text(footerHead)
    languageOptionKeyPdf.detach();
    $keyPdfLanguageSelect.html("<option value='none' data-parent='' data-pdf='' class='optInvisible' selected disabled>Select an Option</option>").trigger("change");
    var filteredOption = languageOptionKeyPdf.filter('[data-parent="' + footerHead + '"]' || '[data-parent=""]');
    $keyPdfLanguageSelect.append(filteredOption).select2().val("none").trigger("change.select2");
});