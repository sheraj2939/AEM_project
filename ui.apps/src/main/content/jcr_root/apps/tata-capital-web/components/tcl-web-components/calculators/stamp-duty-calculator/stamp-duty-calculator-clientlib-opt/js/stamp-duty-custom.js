var stateValueunique;
var selectedState="";
var selectedGender="";
var responseData;

function setStampDutyValues(stampDuties, calcName) {
    var percent = document.querySelector('[data-calc-name=' + calcName + '] .perc-val');
    percent.innerText = '₹' + stampDuties.applicable + '%';

    var finalStampDuty = document.querySelector('[data-calc-name=' + calcName + '] .final-stamp-duty');
    finalStampDuty.innerText = '₹' + stampDuties.finalStampDuty.toLocaleString('EN-IN') + '%';

}
// var stampDutyUrl = window.osgiConfigObj.calcApiDomain+"/content/tata-capital/mdm.stamp-duty-master.json";
var stampDutyUrl = window.osgiConfigObj.calcApiDomain+"/web/api/mdm/export/stampdutymaster.json";
function stampDutyApiCall(url) {
    var promise = new Promise(function(resolve)  {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.status === 200 && this.readyState === 4) {
                data = this.response;
                var myArray = JSON.parse(data);
                resolve(myArray);
            }
        }

        xhr.open("GET", url, true);
        xhr.send();
    })
    return promise
};

$(document).ready(function () {
    var states = [];
    var genders=[];
    var inputArray = stampDutyApiCall(stampDutyUrl).then(function (res) {
        responseData = res;
        res.Master.forEach(function (value, index) {
            var stateValue = value.state;
            var genderValue = value.gender;
            states.push(stateValue);
            genders.push(genderValue);
        })
        return {
            'states':states,
            'genders':genders
        }
    })
    populateStampDuty(inputArray);
    // debugger;
    var plEligibilityFieldnames = document.querySelectorAll('[data-calc-name="calculator-stamp-duty"] [data-fieldname]');
    plEligibilityFieldnames.forEach(function (fieldName) {
        var value = 100000
        if (fieldName.dataset.fieldname == "property-value") {
            fieldName.value= value.toLocaleString("en-IN");
            fieldName.dataset.name = "loanAmount";
        }
    })
    initialiseSliders("calculator-stamp-duty")
});
function populateStampDuty(inputArray) {
    inputArray.then(function (input) {
        stateValueunique = input.states.filter(
            function (a) { if (!this[a]) { this[a] = 1; return a; } }, {}
        );
        for (var i = 0; i < stateValueunique.length; i++) {
            $('.state').append('<li> <a href="javascript:void(0)">' + stateValueunique[i] + '</a> </li>');
        }
        genderValueunique = input.genders.filter(
            function (a) { if (!this[a]) { this[a] = 1; return a; } }, {}
        );
        for (var i = 0; i < genderValueunique.length; i++) {
            $('.gender').append('<li> <a href="javascript:void(0)">' + genderValueunique[i] + '</a> </li>');
        }
        $('[data-list] li a').click(function(){
            // debugger;
            var $parent = $(this).parents('.js-searchDropdownWrap');
            $parent.find('[data-list] a').removeClass('active');
            $(this).addClass('active');
            var selectedVal = $(this).text();
            $parent.find('.dropdown-heading').text(selectedVal);
            $parent.find('.dropdown-heading').removeClass('active');
            $parent.find('.dropdownmenu').removeClass('show');
            $("[data-search]").val('');
            $(this).parents('[data-search]').find("li").show();
            stateValueunique.map(function(state){
                if(selectedVal.toLowerCase()==state.toLowerCase()){
                    selectedState = selectedVal;
                }
            })
            genderValueunique.map(function(state){
                if(selectedVal.toLowerCase()==state.toLowerCase()){
                    selectedGender = selectedVal;
                }
            })
            renderStampDutyCalcResult();
            
        });
    })
}
function renderStampDutyCalcResult() {
    if(selectedGender!="" && selectedState !=""){
    var amount = Number($('[data-calculator="stamp-duty"] .js-showCalulatorRangeValue').val().replace(/,/g, ""));
    var dataobj = responseData.Master.filter(function(ele, index) {
        return ele.state == selectedState && ele.gender == selectedGender;

    })
    // console.log(dataobj)
    var percentageValue = dataobj[0].finalpercent.slice(0,dataobj[0].finalpercent.length-1)
    // console.log(percentageValue)
    var stampDuty = stampDutyCalculator.calculate({areavalue:amount,percentage:percentageValue });
        setStampDutyValues(stampDuty)
    }
}
function setStampDutyValues(stampDuty){
    var percentage = document.querySelector('[data-calculator="stamp-duty"] .perc-val');
    percentage.innerText = stampDuty.applicable+'%';
    
    var finalStampDuty = document.querySelector('[data-calculator="stamp-duty"] .final-stamp-duty');
    var fs = stampDuty.finalStampDuty.toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })
    finalStampDuty.innerText='₹'+fs+'*';

}