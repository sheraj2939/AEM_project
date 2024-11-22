function getData() {
    var hlvJson = {};
    hlvJson["age"] = Number(document.querySelector('input[data-id="age"]').value);
    hlvJson["retirementAge"] = Number(document.querySelector('input[data-id="retirementAge"]').value);
    hlvJson["incomeIncrease"] = Number(document.querySelector('input[data-id="incomeIncrease"]').value.replace('%', '')) / 100;
    hlvJson["netIncome"] = Number(document.querySelector('input[data-id="netIncome"]').value.replace('₹', '').replace(/,/g, ''));
    hlvJson["avgReturn"] = Number(document.querySelector('input[data-id="avgReturn"]').value.replace('%', '')) / 100;
    // console.table(hlvJson);
    return hlvJson;
}

function calculateDiscountROI() {
    let avgReturn = Number(document.querySelector('input[data-id="avgReturn"]').value.replace('%', '')) / 100;
    let incomeIncrease = Number(document.querySelector('input[data-id="incomeIncrease"]').value.replace('%', '')) / 100;
    let discountROI = (1 + avgReturn) / (1 + incomeIncrease) - 1;
    return discountROI;
}

function calculateHLV() {
    let hlvJson = getData();
    let yearsLeft = hlvJson.retirementAge - hlvJson.age;
    let annualIncome = hlvJson.netIncome * 12;
    let discountROI = calculateDiscountROI();
    let HLV = Math.round((annualIncome / discountROI) * (1 - 1 / Math.pow(1 + discountROI, yearsLeft)) * (1 + discountROI));
    return HLV;
}

function calculateLifeCover() {
    let HLV = calculateHLV();
    let cover = Number(document.querySelector('input[data-id="cover"]').value.replace('₹', '').replace(/,/g, ''));
    let liabilities = Number(document.querySelector('input[data-id="liabilities"]').value.replace('₹', '').replace(/,/g, ''));
    let assetsValue = Number(document.querySelector('input[data-id="assets"]').value.replace('₹', '').replace(/,/g, ''));
    let lifeCover = HLV - cover + liabilities - assetsValue;
    return lifeCover;
};

$('[data-type="percentage"]').on('keyup', function () {
    let result = calculateDiscountROI() * 100
    $('[data-id="doi"]').html(result.toFixed(2) + '%');
});
$('[data-id="calculate"]').click(function () {
    console.log('₹' + calculateHLV().toLocaleString("en-US"));
    $('[data-id="hlv"]').html('₹' + calculateHLV().toLocaleString("en-US"));
});
$('[data-id="calcLifeCover"]').click(function () {
    $('[data-id="lifeCover"]').html('₹' + calculateLifeCover().toLocaleString("en-US"));
});

$('[data-change="number"]').click(function (ele) {
    let result = calculateDiscountROI() * 100;
    $('[data-id="doi"]').html(result.toFixed(2) + '%');
});