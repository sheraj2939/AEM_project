function inflactionImpact() {
    var presentCost = Number(document.querySelector('input[data-id="presentCost"]').value.replace(/,/g, ""));
    var inflactionImpactPeriod = Number(document.querySelector('input[data-id="infalctionPeriod"]').value / 100);
    var years = Number(document.querySelector('input[data-id="yearsValue"]').value);
    var finalValue = Math.round(presentCost * Math.pow(1 + inflactionImpactPeriod, years));
    var finalValueRender =  finalValue.toLocaleString('en-IN');
    $('#finaValue').html("₹" + " " + finalValueRender);
};