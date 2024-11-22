function retirement() {
    var currentYear = document.querySelector('input[data-type="currentAge"]');
    var lastYear = document.querySelector('input[data-id ="lastYear"]');
    var inflationIntrestValue = document.querySelector('input[data-id ="inflationRate"]').value.replace('%', '');
    var retirementAge = document.querySelector('input[data-id ="retirementAge"]');
    var preRetirementRate = document.querySelector('input[data-id ="preRetirementRate"]').value.replace('%', '');
    var postRetirementRate = document.querySelector('input[data-id ="postRetirementRate"]').value.replace('%', '');
    var loanAmount = document.querySelector('input[data-id ="loanAmout"]').value.replace('₹', '');
    var savedAmout = document.querySelector('input[data-id ="savedAmout"]').value.replace('₹', '');
    var retirementJson = {};
    retirementJson["currentAge"] = currentYear.value;
    retirementJson["planRetireAge"] = lastYear.value;
    retirementJson["retirementAge"] = retirementAge.value;
    retirementJson["lifestyleAmount"] = loanAmount.replace(/,/g, '');
    retirementJson["preRetirementRate"] = preRetirementRate;
    retirementJson["postRetirementRate"] = postRetirementRate;
    retirementJson["amountAlreadySaved"] = savedAmout.replace(/,/g, '');
    retirementJson["inflation"] = inflationIntrestValue;
    console.log("retirement jsonRequestData" + retirementJson)
    retirementRequestData(retirementJson);
};

function retirementRequestData(retirementJson) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var resposeRetirement = JSON.parse(this.responseText)
            console.log(resposeRetirement);
            if (resposeRetirement.sipGoal > 0) {
                document.querySelector('span[data-id="monthlyValue"]').innerHTML = ('₹ '+resposeRetirement.monthlyExpenditure.toLocaleString("en-IN")+'*');
                document.querySelector('span[data-id="retirementKitty"]').innerHTML =('₹ '+parseInt(resposeRetirement.retirementKitty).toLocaleString("en-IN")+'*');
                document.querySelector('span[data-id="sipAmout"]').innerHTML = ('₹ '+resposeRetirement.sipGoal.toLocaleString("en-IN")+'*/Month');
            }
            else {
                $('.investment-forms#step-three').addClass('hidden');
                $('.investment-forms#step-four').removeClass('hidden');
            }
        }
    }
    var formData = new FormData();
    var retirementJson = JSON.stringify(retirementJson);
    formData.append("data", retirementJson);
    xhttp.open("POST", "/content/tata-capital/calculators.retirement-sip", true);
    xhttp.send(formData);
}