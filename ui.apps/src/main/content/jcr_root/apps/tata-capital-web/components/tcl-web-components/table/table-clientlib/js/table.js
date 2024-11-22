var sarfaesiTable = $('.jsTableApi');
if (sarfaesiTable.length > 0) {
    var excludedKeys = ["index", "createdOn", "createdBy", "modifiedOn", "modifiedBy","pdf-link"];
    handleApiCall();
    tableHeaderClone()
}

function handleApiCall() {
    toggleLoader(true);

    var reqObj = {};
    if ($('.tcl-sarfaesi').length > 0) {
        sarfaesiPropertiesFilterObj.sarfaesiPropertiesTcl(reqObj)
        .then(handleSuccess)
        .catch(handleError)
        .finally(function () {
            toggleLoader(false);
        });
    } else {
        sarfaesiPropertiesFilterObj.sarfaesiProperties(reqObj)
        .then(handleSuccess)
        .catch(handleError)
        .finally(function () {
            toggleLoader(false);
        });
    }
   
}

function toggleLoader(showLoader) {
    $('body').toggleClass('bg-loader', showLoader);
    $('.loader').toggleClass('hide-loader', !showLoader);
}

function handleSuccess(response) {
    if (response.status.toLowerCase() === 'success') {
        var tableData = (typeof response.response === 'object') ? response.response : JSON.parse(response.response);
        populateTable(tableData);
    } else {
        handleFailure();
    }
}

function handleError(error) {
    handleFailure();
}

function handleFailure() {
    $("body").removeClass("popover-modal-open");
    // failure Popup
    setTimeout(function () {
        $("#failure-modal").addClass("popover-show").css("display", "block");
        $("body").addClass("popover-modal-open").append('<div class="modal-backdrop"></div>');
        $(".jsOnGetCall").removeClass("d-none");
        $('.jsGetCalling').addClass('d-none');
    }, 80);
}

// Function to replace multiple patterns in a string
function replacePatterns(input) {
    // Replace "Wherever Applicable" with the words "(Wherever Applicable)"
    return input
        //.replace(/Wherever Applicable/g, '(Wherever Applicable)')
        .replace(/Outstanding Amount In/g, 'Outstanding amount (in ₹)');
}


function populateTable(masterData) {
    var table = $('.table-main');
    var tableHead = table.find('thead');
    var tableBody = table.find('tbody');

    tableHead.empty();
    tableBody.empty();

    var headerRow = '<tr class="sticky-header">';
    Object.keys(masterData.Master[0]).forEach(function (key) {
        if (!excludedKeys.includes(key) && !key.includes("index")) {
            var formattedKey = key.replace(/[_-]/g, ' ').replace(/\b\w/g, match => match.toUpperCase());
            formattedKey = replacePatterns(formattedKey)
            headerRow += '<th>' + formattedKey + '</th>';
        }
    });
    headerRow += '</tr>';
    tableHead.append(headerRow);

    masterData.Master.forEach(function (entry) {
        var row = '<tr>';
        Object.keys(entry).forEach(function (key) {
            if (!excludedKeys.includes(key) && !key.includes("index")) {
                row += '<td>' + entry[key].replace(/\s+/g, ' ').trim() + '</td>';
            }
        });
        row += '</tr>';
        tableBody.append(row);
    });
}

function tableHeaderClone() {
    var table = document.getElementById('tablefixed-top-left2');
    if (table) {
        setTimeout(() => {
            var theadCloneDiv = table.querySelector('.clone-head-table-wrap');
            if (theadCloneDiv && theadCloneDiv.parentElement) {
                theadCloneDiv.style.position = 'absolute';
                theadCloneDiv.style.top = '0';
                theadCloneDiv.style.height = '78px';
            }
        }, 200);    
    } else {
        console.error("Table with id 'tablefixed-top-left2' not found.");
    }
}