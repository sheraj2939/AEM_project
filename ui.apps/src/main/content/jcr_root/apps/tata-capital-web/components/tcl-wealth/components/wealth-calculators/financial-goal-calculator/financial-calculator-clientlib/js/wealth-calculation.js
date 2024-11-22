parseIntString = function (param) {
    return (typeof (param) !== "number") ? Math.round(parseInt(param)) : Math.round(param)
}

function goalSip() {
    var context = $("#goal-sip");
    console.log("Context : ", context);
    var years = document.querySelector('input[data-type="years"]');
    var rateIntrestValue = document.querySelector('input[data-input="return"]').value.replace('%', '');
    var inflationIntrestValue = document.querySelector('input[data-input="inflation"]').value.replace('%', '');
    var totalAmountSavedValue = document.querySelector('input[data-id ="amountSavedValue"]').value.replace('₹', '');
    var totalAmountValue = document.querySelector('input[data-id ="amountValue"]').value.replace('₹', '');
    var golsipRequest = {};
    golsipRequest["goalYears"] = years.value;
    if ((golsipRequest["goalYears"] !== "0") && (golsipRequest["goalYears"] !== "00")) {
        golsipRequest["achieveAmount"] = totalAmountValue.replace(/,/g, '');
        golsipRequest["returnRate"] = rateIntrestValue;
        golsipRequest["inflation"] = inflationIntrestValue;
        golsipRequest["amountAlreadySaved"] = totalAmountSavedValue.replace(/,/g, '');
        console.log("golsipRequest : ", golsipRequest);
        if ($(context).find('#goal-current-year').siblings('.error-msg').css('display') !== "block" && $(context).find('#goal-year').siblings('.error-msg').css('display') !== "block") {
            if (golsipRequest.currentAge !== "" && golsipRequest.goalYear !== "") { goalSipReuestData(golsipRequest); }
        }
    }
};

function goalSipReuestData(golsipRequest) {
    if (golsipRequest.currentAge !== "" && golsipRequest.goalYear !== "") {
        var context = $("#goal-sip");
        $(context).find("#goalSip").html('<div class="customLoader"></div>');
        $(context).find("#goalValue").html('<div class="customLoader"></div>');
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var responseGoalSip = JSON.parse(this.responseText);
                console.log(responseGoalSip);
                $(context).find("#goalSip").text('₹ ' + responseGoalSip.goalSip.toLocaleString("en-IN") + "*/Month");
                $(context).find("#goalValue").text('₹ ' + responseGoalSip.goalValue.toLocaleString("en-IN") + "*");
            }
            else if (this.status === 500) {
                $(context).find("#goalSip").text(0 + "*");
                $(context).find("#goalValue").text(0 + "*");
            }
        };
        var formData = new FormData();
        golsipRequest = JSON.stringify(golsipRequest);
        formData.append("data", golsipRequest);
        xhttp.open("POST", "/content/tata-capital/calculators.goal-sip", true);
        xhttp.send(formData);
    }
}