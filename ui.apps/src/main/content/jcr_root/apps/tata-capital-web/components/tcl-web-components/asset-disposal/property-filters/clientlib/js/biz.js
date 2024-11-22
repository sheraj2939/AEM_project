var propertyTypeArr = [];
var roomArr = ['1rk', '1bhk', '2bhk', '3bhk', '4bhk'];
var filterData = JSON.parse(sessionStorage.getItem('filterData'))


/*************** filtered data with budget,room and area main filter function **************** */
function tataCapitalHousingFilter(data,roomCheck) {
    if(sessionStorage.getItem('reset') == 'true'){
        roomArr = ['1rk', '1bhk', '2bhk', '3bhk', '4bhk'];
    }
    sessionStorage.removeItem('reset');
    var filterData = JSON.parse(sessionStorage.getItem('filterData'));
    var minBudget = filterData["inputbugetFrom"] + '00000';
    var maxBudget = filterData["inputbugetTo"] + '00000';
    var getSelectData = JSON.parse(sessionStorage.getItem('selectedStateCityProperty'))
    propertyTypeArr = getSelectData["property"];
    var propertyType = propertyTypeArr;
    var nonComercialPropertoiesArr = ["residential flat", "residential row house"];
    var nonComercialCount = 0;
    propertyTypeArr.forEach(function (type) {
        if (jsHelper.arrIncludes(nonComercialPropertoiesArr, type.toLowerCase())) {
            nonComercialCount++;
        }
    });
    if (nonComercialCount !== 0) {

        if (roomCheck && roomCheck !== true) {
            $('.rooms[type="checkbox"]').prop('checked', true)
        }

        roomsArr = filterData["rooms"];
        var rooms = roomArr;
    } else {
        var rooms = [];
        $('.rooms[type="checkbox"]').prop('checked', false);
    }
    var areaMin = filterData["minArea"];
    var areaMax = filterData["maxArea"];
    var dataMaster = data;

    var filterUniqueContracts = findUniqueContractsAndLogDuplicates(dataMaster);

    var filterNonUpcoming = filterNonUpcomingProperties(filterUniqueContracts);

    var bugetFiltered = budget(minBudget, maxBudget, filterNonUpcoming);

    var propertyFiltered = propertyTypeFilter(propertyType, bugetFiltered);

    var roomsFiltered = roomsFilter(rooms, propertyFiltered);

    var areaFiltered = areaFilter(areaMin, areaMax, roomsFiltered);

    return areaFiltered;
}
/*************** filtered data with budget,room and area main filter function **************** */

//TODO create filterNonUpcomingProperties function(array);
function filterNonUpcomingProperties(data) {
    const filteredData = $.grep(data, function (item) {
        return item['upcoming-properties'].toLowerCase() !== 'true';
    });
    return filteredData;
}
//TODO create uniqueContract function(array);
function findUniqueContractsAndLogDuplicates(data) {
    const contractId = new Set();
    const repeatedContrsctNo = [];
    return $.grep(data, function(e) {
      var contractNo = e["contract-no-"];
      if(contractId.has(contractNo)){
         repeatedContrsctNo.push(contractNo)
         //console.log(`this is repeated contract-no [${repeatedContrsctNo}]`)
      }
      return !contractId.has(contractNo) && contractId.add(contractNo);
    });
  }
  
//TODO create budget function(minRange, maxRange, array);
function budget(minBudget, maxBudget, data) {
    const filteredDataArray = data.filter((item) => {
        const reservePrice = Number(item["reserve-price"]);
        const nonSarfaesi = item["non-sarfaesi"].toLowerCase().trim() === "yes";
        return (reservePrice >= minBudget && reservePrice <= maxBudget) || nonSarfaesi;
      });
      return filteredDataArray
}

//TODO propertyType function(propertyType, budgetArrayReturned)

function propertyTypeFilter(propertyTypeArray, budgetFiteredData) {
    const filteredDataArray = budgetFiteredData.filter((item) => {
        const propertyType = item["property-type"].toLowerCase().trim();
        return convertStringsToLowerCase(propertyTypeArray).includes(propertyType);
      });
      return filteredDataArray
}

//TODO rooms function(rooms, propertyTypeReturnedArray)
function roomsFilter(roomsCountArr, propertyFilteredData) {
    const nonBhkpropertyTypes = ['commercial plot', 'commercial shop', 'residential plot','commercial showroom','commercial office','godown','residential bungalow','warehouse','residential builder floor','commercial industrial unit','commercial building'];
    const filteredDataArray = propertyFilteredData.filter((item) => {
        const bhk = item["bhk"].toLowerCase().trim().replace(' ','');
        const propertyType = item["property-type"].toLowerCase().trim();
        return roomsCountArr.includes(bhk) || nonBhkpropertyTypes.includes(propertyType) || ((bhk === 'na' || bhk === '') && propertyType === 'residential row house');
      });
      return filteredDataArray
}

//TODO Area function(minRange, maxRange, roomsReturned)
function areaFilter(areaMin, areaMax, roomsFilteredData) {
    return roomsFilteredData.filter((item) => {
        const area = Number(item["area-in-sq-ft"]);
        return area >= areaMin && area <= areaMax;
      });
}

//TODO array all string convert into lowercase
function convertStringsToLowerCase(input) {
    if (Array.isArray(input)) {
      return input.map(convertStringsToLowerCase);
    } else if (typeof input === 'string') {
      return input.toLowerCase().trim();
    } else {
      return input;
    }
  }

function budgetMinValue(event) {

    var currentValue = event.currentTarget;
    console.log(currentValue.value);
    var currentFilterData = filterData;
    currentFilterData["inputbugetFrom"] = Number(currentValue.value.replace(',', ''));
    sessionStorage.removeItem('filterData');
    sessionStorage.setItem('filterData', JSON.stringify(currentFilterData));
    var filteredData = JSON.parse(sessionStorage.getItem('disposalMisStateCityRes'));
    var filteredData = tataCapitalHousingFilter(filteredData);
    createDealCards(filteredData);
}

function budgetMaxValue(event) {


    var currentValue = event.currentTarget;
    console.log(currentValue.value);
    var currentFilterData = filterData;
    currentFilterData["inputbugetTo"] = Number(currentValue.value.replace(',', ''));
    sessionStorage.removeItem('filterData');
    sessionStorage.setItem('filterData', JSON.stringify(currentFilterData));
    var filteredData = JSON.parse(sessionStorage.getItem('disposalMisStateCityRes'));
    var filteredData = tataCapitalHousingFilter(filteredData);
    createDealCards(filteredData);
}

function areaMinValue(event) {

    var currentValue = event.currentTarget;
    console.log(currentValue.value);
    var currentFilterData = filterData;
    currentFilterData["minArea"] = Number(currentValue.value.replace(',', ''));
    sessionStorage.removeItem('filterData');
    sessionStorage.setItem('filterData', JSON.stringify(currentFilterData));
    var filteredData = JSON.parse(sessionStorage.getItem('disposalMisStateCityRes'));
    var filteredData = tataCapitalHousingFilter(filteredData);
    createDealCards(filteredData);
}

function areaMaxValue(event) {


    var currentValue = event.currentTarget;
    console.log(currentValue.value);
    var currentFilterData = filterData;
    currentFilterData["maxArea"] = Number(currentValue.value.replace(',', ''));
    sessionStorage.removeItem('filterData');
    sessionStorage.setItem('filterData', JSON.stringify(currentFilterData));
    var filteredData = JSON.parse(sessionStorage.getItem('disposalMisStateCityRes'));
    var filteredData = tataCapitalHousingFilter(filteredData);
    createDealCards(filteredData);
}

document.addEventListener('DOMContentLoaded', function () {
    /******* when budget area input button click  ********** */
    changeEventCall();
});

/******* when budget area input button click  ********** */
function changeEventCall() {
    var minValue = $('#example_2_input_from');
    $(minValue).on("change blur", budgetMinValue);
    var maxValue = $('#example_2_input_to');
    $(maxValue).on("change blur", budgetMaxValue);
    var minArea = $('#example_1_input_from');
    $(minArea).on("change blur", areaMinValue);
    var maxArea = $('#example_1_input_to');
    $(maxArea).on("change blur", areaMaxValue);

    var roomTypeCheckBox = document.querySelectorAll('.btn-with-checkbox-list li');
    roomTypeCheckBox.forEach(function (element) {

        element.addEventListener('click', function (event) {
            var currentValue = event.currentTarget.querySelector('[data-room]').dataset.room;
            if (event.currentTarget.querySelector('[data-room]').checked) {
                roomArr.push(currentValue.toLowerCase());
            } else {
                var mappedIndex = roomArr.map(function (element, index) { return element == currentValue.toLowerCase() ? index : '' });
                var currentIndex = mappedIndex.filter(function (element) { return element != '' })[0];
                roomArr.splice(currentIndex, 1);
            }
            var currentFilterData = filterData;
            currentFilterData["rooms"] = roomArr;
            sessionStorage.removeItem('filterData');
            sessionStorage.setItem('filterData', JSON.stringify(currentFilterData));
            var filteredData = JSON.parse(sessionStorage.getItem('disposalMisStateCityRes'));
            var filteredData = tataCapitalHousingFilter(filteredData,true);
            createDealCards(filteredData);
        });
    });
}
/******* when budget area input button click  ********** */

$('.jsFilterReset').click(function () {

    $(this).parents('.property-filters-box').find('.btn-with-checkbox-list li .btn-check').prop('checked', true);
    var data = JSON.parse(sessionStorage.getItem('disposalMisStateCityRes'));

    var propertyData = JSON.parse(sessionStorage.getItem('selectedStateCityProperty'));
    propertyTypeArray = propertyData.property;

    sessionStorage.setItem('reset', true)

    var rangeArea = $("#example_1").data("ionRangeSlider");
    var areaInputFrom = $('#example_1_input_from');
    var areaInputTo = $('#example_1_input_to')
    var rangeBudget = $("#example_2").data("ionRangeSlider");
    var budgetInputFrom =  $('#example_2_input_from');
    var budgetInputTo =  $('#example_2_input_to');
    
    rangeArea.update({
        min: 100,
        max: 50000,
        from: 100,
        to: 50000,
        onUpdate: updateArea,
    });

    rangeBudget.update({
        min: 1,
        max: 1000,
        from: 1,
        to: 1000,
        onUpdate: updateBudget,
    });

    var filteredData = tataCapitalHousingFilter(data);
    createDealCards(filteredData);

    function updateArea(data) {
        from1 = data.from;
        to1 = data.to;

        fromCommaSeparatedValue = from1.toLocaleString('en-IN');
        toCommaSeparatedValue = to1.toLocaleString('en-IN');
        
        areaInputFrom.prop("value", fromCommaSeparatedValue);
        areaInputTo.prop("value", toCommaSeparatedValue);

        var misFilteredData = JSON.parse(sessionStorage.getItem('disposalMisStateCityRes'));
        var currentFilterData = filterData;
        currentFilterData["minArea"] = from1;
        currentFilterData["maxArea"] = to1;
        sessionStorage.removeItem('filterData');
        sessionStorage.setItem('filterData', JSON.stringify(currentFilterData));
        var filteredData = tataCapitalHousingFilter(misFilteredData);
        createDealCards(filteredData);

    }

    function updateBudget(data) {
        from = data.from;
        to = data.to;

        fromCommaSeparatedValue = from.toLocaleString('en-IN');
        toCommaSeparatedValue = to.toLocaleString('en-IN');

        budgetInputFrom.prop("value", fromCommaSeparatedValue);
        budgetInputTo.prop("value", toCommaSeparatedValue);

        var misFilteredData = JSON.parse(sessionStorage.getItem('disposalMisStateCityRes'));
        var currentFilterData = filterData;
        currentFilterData["inputbugetFrom"] = from;
        currentFilterData["inputbugetTo"] = to;
        sessionStorage.removeItem('filterData');
        sessionStorage.setItem('filterData', JSON.stringify(currentFilterData));
        var filteredData = tataCapitalHousingFilter(misFilteredData);
        createDealCards(filteredData);
    }
})

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}
