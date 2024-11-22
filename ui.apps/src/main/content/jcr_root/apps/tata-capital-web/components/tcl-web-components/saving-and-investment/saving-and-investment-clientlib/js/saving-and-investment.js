var saving = document.querySelectorAll('.saving-and-investment-items .bg-div');
var itemsDiv = document.querySelectorAll('.savings-investment-col');
var checkBoxes = document.querySelectorAll('.form-check-input');

var filterValue = {};
for (i = 0; i < checkBoxes.length; i++) {
    filterValue[checkBoxes[i].nextElementSibling.nextElementSibling.innerText] = false;
}

function showCardSaving() {
    $("#jsInvestmentSlider").slick('slickUnfilter');
    var isAllFilterValueFalse = true;
    for (j = 0; j < saving.length; j++) {
        var attributeName = saving[j].getAttribute("data-card-name");
        if (filterValue[attributeName] == true) {
            saving[j].parentNode.classList.remove("d-none");
            saving[j].parentNode.classList.add("sliderActive");
            isAllFilterValueFalse = false

        } else {
            saving[j].parentNode.classList.add("d-none");
            saving[j].parentNode.classList.remove("sliderActive");
        }
    }

    if (isAllFilterValueFalse) {
        for (j = 0; j < saving.length; j++) {
            saving[j].parentNode.classList.remove("d-none");
            saving[j].parentNode.classList.add("sliderActive");
        }
    }
    $("#jsInvestmentSlider").slick('slickFilter', '.sliderActive');
};

checkBoxes.forEach(function (checkBox) {
    checkBox.addEventListener('click', function (e) {
        var checkValue = e.target.nextElementSibling.nextElementSibling.innerText;
        if (e.target.checked) {
            filterValue[checkValue] = true;
        } else {
            filterValue[checkValue] = false;
        }
        showCardSaving();
    })
});
try {
    $('#jsInvestmentSlider .cmp-teaser__action-link').click(function (e) {
        var ctaTitle = $(e.currentTarget).parents('.savings-investment-col').find('.col-bottom-content h4').text().trim();
        var componentName = $('.saving-and-investment h2').text().trim();
        ctaInteraction($(e.currentTarget).text(), componentName, ctaTitle, productCodeId);
    });
} catch (err) {
    console.log(err);
}