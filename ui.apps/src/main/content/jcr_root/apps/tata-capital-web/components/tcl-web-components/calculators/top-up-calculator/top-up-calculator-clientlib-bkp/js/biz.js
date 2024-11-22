var result;
var count =0;
function getTopUpApi(inputObj,calcName) {
	count++;
    var objLen = Object.keys(inputObj).length;
    try{  
    if (count>=objLen) {
    var reqObj = { "header": 
    {"authToken": "MTI4OjoxMDAwMDo6ZDBmN2I4MGNiODIyNWY2MWMyNzMzN2I3YmM0MmY0NmQ6OjZlZTdjYTcwNDkyMmZlOTE5MGVlMTFlZDNlYzQ2ZDVhOjpkdmJuR2t5QW5qUmV2OHV5UDdnVnEyQXdtL21HcUlCMUx2NVVYeG5lb2M0PQ=="},
     "body": {  
                "requestedLoanAmt":inputObj.requestedLoanAmt,
                "requestedTenor":inputObj.requestedTenor,
                "netMonthlySalary":inputObj.netMonthlySalary,
                "costOfProperty":inputObj.costOfProperty,
                "currentMonthlyObligations":inputObj.currentMonthlyObligations,
                "principalOutstanding":inputObj.principalOutstanding,
                "externalBtEmi":inputObj.externalBtEmi,
                "hiddenTCHFLRateofInterest":9.25
            } 
                 };
    // debugger
    topUpFilterObj.topUp(reqObj).then(
        function (response) {
            if (response.status.toLowerCase() == "success") {
                console.log("SUCCESS=",response.response.responseJson)
                setbalanceTopupCalculatorValues(response.response.responseJson,calcName)
            }
        }).catch(function (error) { alert(error)}); 
    }
}catch(e){console.log(e)}   
}
// $(document).ready(function () {
// getTopUpApi()             
// })