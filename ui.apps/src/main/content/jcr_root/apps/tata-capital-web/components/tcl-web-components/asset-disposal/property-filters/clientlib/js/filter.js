// filter data [default area and ]
var filterData = JSON.parse(sessionStorage.getItem('filterData'));

$(document).ready(function () {
    // Calulator Input change start
    $(".js-showCalulatorRangeValue").keyup(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            $(this).trigger('change');
        }
    });

    /*Budget*/
    var $range = $("#example_2"),
        $inputFrom = $("#example_2_input_from"),
        $inputTo = $("#example_2_input_to"),
        instance,
        min = 1,
        max = 1000,
        from = 0,
        to = 0;

    $range.ionRangeSlider({
        skin: "round",
        type: "double",
        hide_from_to: true,
        min: min,
        max: max,
        from: 1,
        to: 1000,
        prettify_enabled: true,
        prettify_separator: ",",
        onStart: updateInputs,
        onChange: updateInputs,
    });
    instance = $range.data("ionRangeSlider");

    function updateInputs(data) {


        from = data.from;
        to = data.to;

        fromCommaSeparatedValue = from.toLocaleString('en-IN');
        toCommaSeparatedValue = to.toLocaleString('en-IN');
        $inputFrom.prop("value", fromCommaSeparatedValue);
        $inputTo.prop("value", toCommaSeparatedValue);

        /******************* disposal mis [filtered state , city and Property type] data on listing page load *****************/
        var misFilteredData = JSON.parse(sessionStorage.getItem('disposalMisStateCityRes'));
        var currentFilterData = filterData;
        currentFilterData["inputbugetFrom"] = from;
        currentFilterData["inputbugetTo"] = to;
        sessionStorage.removeItem('filterData');
        sessionStorage.setItem('filterData', JSON.stringify(currentFilterData));
        var filteredData = tataCapitalHousingFilter(misFilteredData);
        createDealCards(filteredData);
        /******************* disposal mis [filtered state , city and Property type] data on listing page load *****************/
    }

    $inputFrom.on("change blur", function () {
        var val = $(this).prop("value");
        val = val.replace(/,/g, "");
        to = JSON.parse(sessionStorage.getItem('filterData'))['inputbugetTo']
        if (parseInt(val) < parseInt(min)) {
            val = min;
        }else if (val == ''){
            val = to
        }
         else if (parseInt(val) > parseInt(to)) {
            val = to;
        }
        instance.update({
            from: val,
            onUpdate : changeBudgetInputFrom
        });
        from = val;
        console.log(from, to)
        var intVal = parseInt(val)
        val = intVal.toLocaleString('en-IN');
        $(this).prop("value", val);

        function changeBudgetInputFrom(data) {
            from = data.from;
            fromCommaSeparatedValue = from.toLocaleString('en-IN');
            $inputFrom.prop("value", fromCommaSeparatedValue);
            var currentFilterData = filterData;
            currentFilterData["inputbugetFrom"] = from;
            sessionStorage.setItem('filterData', JSON.stringify(currentFilterData));
        }

    });

    $inputTo.on("change blur", function () {
        var val = $(this).prop("value");
        val = val.replace(/,/g, "");
        from = JSON.parse(sessionStorage.getItem('filterData'))['inputbugetFrom']

        // validate
        if (parseInt(val) < parseInt(from)) {
            val = from;
        } else if (val == ''){
           val = from
        } else if (parseInt(val) > parseInt(max)) {
            val = max;
        }

        instance.update({
            to: val,
            onUpdate : changeBudgetInputTo
        });
        to = val;
        console.log(from, to)
        var intVal = parseInt(val)
        val = intVal.toLocaleString('en-IN');
        $(this).prop("value", val);

        function changeBudgetInputTo(data) {
            to = data.to;
            toCommaSeparatedValue = to.toLocaleString('en-IN');
            $inputTo.prop("value", toCommaSeparatedValue);
            var currentFilterData = filterData;
            currentFilterData["inputbugetTo"] = to;
            sessionStorage.setItem('filterData', JSON.stringify(currentFilterData));
        }
    });
    /*Budget 2*/


    /*area*/
    var $rangeArea = $("#example_1"),
        $inputFromArea = $("#example_1_input_from"),
        $inputToArea = $("#example_1_input_to"),
        instanceArea,
        min1 = 100,
        max1 = 50000,
        from1 = 0,
        to1 = 0;

    $rangeArea.ionRangeSlider({
        skin: "round",
        type: "double",
        min: min1,
        max: max1,
        from: 100,
        to: 50000,
        prettify_enabled: true,
        prettify_separator: ",",
        onStart: updateInputsArea,
        onChange: updateInputsArea,
    });
    instanceArea = $rangeArea.data("ionRangeSlider");

    function updateInputsArea(data) {

        from1 = data.from;
        to1 = data.to;
        console.log(from1, to1, min1, max1)

        fromCommaSeparatedValue = from1.toLocaleString('en-IN');
        toCommaSeparatedValue = to1.toLocaleString('en-IN');
        $inputFromArea.prop("value", fromCommaSeparatedValue);
        $inputToArea.prop("value", toCommaSeparatedValue);

        /******************* disposal mis [filtered state , city and Property type] data on listing page load *****************/
        var misFilteredData = JSON.parse(sessionStorage.getItem('disposalMisStateCityRes'));
        var currentFilterData = filterData;
        currentFilterData["minArea"] = from1;
        currentFilterData["maxArea"] = to1;
        sessionStorage.removeItem('filterData');
        sessionStorage.setItem('filterData', JSON.stringify(currentFilterData));
        var filteredData = tataCapitalHousingFilter(misFilteredData);
        createDealCards(filteredData);
        /******************* disposal mis [filtered state , city and Property type] data on listing page load *****************/

    }

    $inputFromArea.on("change blur", function () {
        var val = $(this).prop("value");
        val = val.replace(/,/g, "");

        to1 = JSON.parse(sessionStorage.getItem('filterData'))['maxArea']

        // validate
        if (parseInt(val) < parseInt(min1)) {
            val = min1;
        } else if(val == ''){
            val = to1
        } else if (parseInt(val) > parseInt(to1)) {
            val = to1;
        }

        instanceArea.update({
            from: val,
            onUpdate : changeAreaInputFrom
        });
        from1 = val;
        console.log(from1, to1)
        var intVal = parseInt(val)
        val = intVal.toLocaleString('en-IN');
        $(this).prop("value", val);

        function changeAreaInputFrom(data) {
            from1 = data.from;
            fromCommaSeparatedValue = from.toLocaleString('en-IN');
            $inputFromArea.prop("value", fromCommaSeparatedValue);
            var currentFilterData = filterData;
            currentFilterData["minArea"] = from1;
            sessionStorage.setItem('filterData', JSON.stringify(currentFilterData));
        }
    });

    $inputToArea.on("change blur", function () {
        var val = $(this).prop("value");
        val = val.replace(/,/g, "");
        // validate
        from1 = JSON.parse(sessionStorage.getItem('filterData'))['minArea']
        if (parseInt(val) < parseInt(from1)) {
            val = from1;
        } else if (val == '') {
            val = from1
        } else if (parseInt(val) > parseInt(max1)) {
            val = max1;
        }

        instanceArea.update({
            to: val,
            onUpdate : changeAreaInputTo
        });
        to1 = val;
        console.log(from1, to1)

        var intVal = parseInt(val)
        val = intVal.toLocaleString('en-IN');
        $(this).prop("value", val);

        function changeAreaInputTo(data) {
            to1 = data.to;

            fromCommaSeparatedValue = from.toLocaleString('en-IN');
            toCommaSeparatedValue = to.toLocaleString('en-IN');
            $inputToArea.prop("value", toCommaSeparatedValue);
            var currentFilterData = filterData;
            currentFilterData["maxArea"] = to1;
            sessionStorage.setItem('filterData', JSON.stringify(currentFilterData));
        }
    });

    $('.price-with-comma').keyup(function () {
        if ($(this).val() != "") {
            var rupeeValue = parseFloat($(this).val().replace(/,/g, ''));
            commaSeparatedValue = rupeeValue.toLocaleString('en-IN');
            $(this).val(commaSeparatedValue);
        }
    });
    /*area*/

});