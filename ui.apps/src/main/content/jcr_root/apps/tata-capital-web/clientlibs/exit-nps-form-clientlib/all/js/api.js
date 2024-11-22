// fun get query parameters
function get_query() {
    var url = document.location.href;
    var qs = url.substring(url.indexOf('?') + 1).split('&');
    for (var i = 0, result = {}; i < qs.length; i++) {
        qs[i] = qs[i].split('=');
        result[qs[i][0]] = decodeURIComponent(qs[i][1]);
    }
    return result;
}
var CustomerName = get_query()['Customer-name'];
var caseId = get_query()['case-id'];
var businessVertical = get_query()['business-vertical'];
var caseNumber = get_query()['case-number'];

  /* decode url */
  if(CustomerName && caseId && businessVertical && caseNumber){
  var custNameDecode = atob(CustomerName);
  var caseIdDecode = atob(caseId);
  var busVerDecode = atob(businessVertical)
  var caseNumDecode = atob(caseNumber);
  $('#cust-name').html(custNameDecode +',');
  $('#case-id').html(caseNumDecode);
  $('#busVer').html(busVerDecode);
  }

/*submit button click*/
/*$('[data-popovermodal="popover-modal"]').click(function () {
    formSubmit(this)
});*/


$('.jsRatingBtn .rating-label input').on('click', function () {
    var reqAmount = $('.jsRatingBtn .rating-label input[name=loan]:checked').val();
    var amount = $('#amount-loan');
    var amountResion = $('#loan-rrquired-resion')
    if (reqAmount && reqAmount !== 'Yes') {
        amount.val('');
        amountResion.val('')
    }
});

function formSubmit() {
    $('.page-loader').removeClass('hidden')
    var servicesvalue = $('[name="services"]:checked').next().text().trim();
    var servicesreason = $('#services-resion').find(":selected").val().trim();
    var associatesvalue = $('[name="likely"]:checked').next().text().trim();
    var associatesreason = $('#associates-resion').find(":selected").val().trim();
    var servicesElaborateResion = $('#servicesElaborateResion').val().trim();
    var associatesElaborateResion = $('#associatesElaborateResion').val().trim();
    var loanRequired =  $('[name="loan"]:checked').val();
    var reasonRequiredLoan = $('#loan-rrquired-resion').find(":selected").val().trim();
    var amountLoan = $('#amount-loan').val();

    /* mdm data send in this object formate start */
    var requestMdmJson = {};
    var requestSfdcJson = {};
    requestMdmJson.Master = [];
    var custObj = {};
    custObj['customer-name'] = custNameDecode;
    custObj['case-id'] = caseIdDecode;
    custObj['business-vertical'] = busVerDecode;
    custObj['services-scale-value'] = servicesvalue
    custObj['services-scale-reason'] = servicesreason;
    custObj['associates-scale-value'] = associatesvalue;
    custObj['associates-scale-reason'] = associatesreason;
    custObj['services-elaborate-reason'] = servicesElaborateResion;
    custObj['associates-elaborate-reason'] = associatesElaborateResion;
    custObj['loan-required'] = loanRequired;
    custObj['reason-for-required-loan'] = reasonRequiredLoan;
    custObj['amount-range-of-loan'] = amountLoan;    
    requestMdmJson.Master.push(custObj);
    /*console.log(requestJson);*/
    /* mdm data send in this object formate end */
    requestSfdcJson = {
        "header": {
            "authToken": "MTI4OjoxMDAwMDo6YmI0YWM0OTg5NGE5Yjc2NzYyZDdmMDFmNDAzMDU0Nzk6OjJlNjVhNGNkNWFkZTlhYWM1MDY2NGNmNTRiZWEwN2U1OjpkYnF6Q2R3ajJIUzBLQ1J5ZE52Nmo0ZmtwRmxmUzZFNlIwRWk3OWx6TzNvPQ=="
        },
        "body": {
            "allOrNone": false,
            "records": [
                {
                    "attributes": {
                        "type": "Case"
                    },
                    "Id": caseIdDecode,
                    "Services_Rating__c": servicesvalue,
                    "Services_Rating_Elaboration__c": servicesElaborateResion,
                    "Services_Rating_Reason__c": servicesreason,
                    "Recommendation_Rating__c": associatesvalue,
                    "Recommendation_Rating_Elaboration__c": associatesElaborateResion,
                    "Recommendation_Rating_Reason__c": associatesreason,
                    "New_Loan_Requirement__c": loanRequired,
                    "New_Loan_Requirement_Product__c": reasonRequiredLoan,
                    "New_Loan_Amount_Requirement__c": amountLoan.split(",").join("")
                }
            ]
        },
        "errorBody": {}
    }
    sfdcApiCall(requestMdmJson,requestSfdcJson);
    //mdmApiCall(requestJson)
}

/* customer data store in mdm api call start */
function sfdcApiCall(requestMdmJson, requestSfdcJson) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            url: window.osgiConfigObj.postApiDomain+"/api/shaft/nli-sfdc/push-nps-survey-form-data/partner",
            data: JSON.stringify(requestSfdcJson),
            async: true,
            contentType: "text/plain",
            success: function (res) {                
                if(res.header.status.toLowerCase()=="success" && res.body.success){
                    mdmApiCall(requestMdmJson)
                } else {

                    $('#feedback-form-main').removeClass('hidden');
                    $('#thankyou-modal').addClass('hidden')
                    $('.page-loader').addClass('hidden');
                    $('.modal-backdrop').remove();
                    setTimeout(function () {
                        $('#feedback-unsucces').addClass('popover-show');
                    }, 80);

                    $('#feedback-unsucces').css('display', 'block');
                    $('body').addClass('popover-modal-open');
                    $('body').append('<div class="modal-backdrop"></div>');

                    $('#feedback-unsucces').find('.heading20').text('Something went wrong')
                }
            },
            error: function (res) {
                $('#feedback-form-main').removeClass('hidden');
                $('.page-loader').addClass('hidden');
                $('.modal-backdrop').remove();
                setTimeout(function () {
                    $('#feedback-unsucces').addClass('popover-show');
                }, 80);

                $('#feedback-unsucces').css('display', 'block');
                $('body').addClass('popover-modal-open');
                $('body').append('<div class="modal-backdrop"></div>');

                $('#feedback-unsucces').find('.heading20').text('Something went wrong')
            }
        })
    })
}
function mdmApiCall(mdmObj) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            url: "/content/tata-capital/mdm.exit-nps.json",
            data: JSON.stringify(mdmObj),
            async: true,
            contentType: "application/json",
            dataType: 'json',
            success: function (res) {
                if(res.status == true && res.errorMessage == null){
                        $('#feedback-form-main').removeClass('hidden');
                        $('#feedback-mgs-main').addClass('hidden')
                        $('.page-loader').addClass('hidden');
                             $('.modal-backdrop').remove();
                                 setTimeout(function () {
                                 $('#thankyou-modal').addClass('popover-show');
                             }, 80);        

                        $('#thankyou-modal').css('display', 'block');
                        $('body').addClass('popover-modal-open');
                        $('body').append('<div class="modal-backdrop"></div>');

                        
                } else {

                    $('#feedback-form-main').removeClass('hidden');
                    $('#thankyou-modal').addClass('hidden')
                    $('.page-loader').addClass('hidden');
                    $('.modal-backdrop').remove();
                    setTimeout(function () {
                        $('#feedback-unsucces').addClass('popover-show');
                    }, 80);

                    $('#feedback-unsucces').css('display', 'block');
                    $('body').addClass('popover-modal-open');
                    $('body').append('<div class="modal-backdrop"></div>');

                    $('#feedback-unsucces').find('.heading20').text('Something went wrong')
                }
            },
            error: function (res) {
                $('#feedback-form-main').removeClass('hidden');
                $('.page-loader').addClass('hidden');
                $('.modal-backdrop').remove();
                setTimeout(function () {
                    $('#feedback-unsucces').addClass('popover-show');
                }, 80);

                $('#feedback-unsucces').css('display', 'block');
                $('body').addClass('popover-modal-open');
                $('body').append('<div class="modal-backdrop"></div>');

                $('#feedback-unsucces').find('.heading20').text('Something went wrong')
            }
        })
    })
}
/* customer data store in mdm api call end */