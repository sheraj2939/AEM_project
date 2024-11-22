// var empName;
// var plCompanies;
// function renderPlEligibilityCalcResult(calcName) {
//     // debugger;
//     var empData =setPlInput();
//     var eligibility = readInputValues(calcName);
//     eligibility["companyCat"] =empData[0]['final-category'].toLowerCase();
//     console.log(eligibility);
//     var eli = plEligibiltyCalculator.calculate(eligibility);
//     console.log(eli);
//     setEligibilityValues(eli, calcName);
    
// }
// function setEligibilityValues(eligibility, calcName) {
//     var eligibilityAmount = document.querySelector('.eligibility-amount-value');
//     if(eligibility.finalAmount>=0){
//         eligibilityAmount.innerText = '₹'+eligibility.finalAmount.toLocaleString("INR")+'*';
//         var congoSpan = $("<span></span>").text("Congratulations!");
//         $('.congratulations-block').empty().append(congoSpan);
//     }
//     else{
//         $('.congratulations-block').empty();
//         eligibilityAmount.innerText = '₹ 0'
//     }


// }
// $(document).ready(function () {
//     var plEligibilityFieldnames = document.querySelectorAll('[data-calc-name="calculator-personal-loan-eligibility-calculator"] [data-fieldname]');
//     plEligibilityFieldnames.forEach(function (fieldName) {
//         // debugger;
//         if (fieldName.dataset.fieldname == "monthly-income") {
//             fieldName.dataset.min = 0;
//             fieldName.dataset.max = 500000;
//             fieldName.dataset.from = 100000;
//             fieldName.dataset.name = "monthlyInc";
//             var spanMin = $("<span></span>").text('₹ 0');
//             var spanMax = $("<span></span>").text('₹ 5,00,000');
//             $(fieldName).closest('.custom-range-slider-wrap').find('.custom-range-label').empty().append(spanMin, spanMax);

//         }
//         if (fieldName.dataset.fieldname == "monthly-expenses") {
//             fieldName.dataset.min = 0;
//             fieldName.dataset.max = 500000;
//             fieldName.dataset.from = 50000;
//             fieldName.dataset.name = "monthlyExp";
//             var spanMin = $("<span></span>").text('₹ 0');
//             var spanMax = $("<span></span>").text('₹ 5,00,000');
//             $(fieldName).closest('.custom-range-slider-wrap').find('.custom-range-label').empty().append(spanMin, spanMax);

//         }
//         if (fieldName.dataset.fieldname == "tenure") {
//             var month7 = $(fieldName).parent().parent().parent().parent().find("[data-month-or-year='calculator-personal-loan-eligibility-calculatorMonth']")
//             month7.attr("data-min", 12);
//             month7.attr("data-max", 60);
//             month7.attr("data-from", 36);
//             month7.attr("data-name", "tenure");
//             var spanMin = $("<span></span>").text(12 + ' Months');
//             var spanMax = $("<span></span>").text(60 + ' Months');
//             $(month7).closest('.custom-range-slider-wrap').find('.custom-range-label').empty().append(spanMin, spanMax);

//             var year7 = $(fieldName).parent().parent().parent().parent().find("[data-month-or-year='calculator-personal-loan-eligibility-calculatorYear']")
//             var yearMin = 12 / 12;
//             var yearMax = 60 / 12;
//             var yearFrom = 36 / 12;
//             year7.attr("data-min", yearMin);
//             year7.attr("data-max", yearMax);
//             year7.attr("data-from", yearFrom);
//             year7.attr("data-name", "tenure");
//             var span1Min = $("<span></span>").text(yearMin.toFixed(2).replace(/[.,]00$/, "") + ' Years');
//             var span1Max = $("<span></span>").text(yearMax.toFixed(2).replace(/[.,]00$/, "") + ' Years');
//             $(year7).closest('.custom-range-slider-wrap').find('.custom-range-label').empty().append(span1Min, span1Max);
//         }
//     })
//     initialiseSliders("calculator-personal-loan-eligibility-calculator")

// })
// // $("[data-searchInput]").on('keyup', function(){
// //     var name = $(this).val().toLowerCase();
// //     // debugger;
// //     if(name.length>=3){
// //         getPlEliApi(name);
// //     } 
// //     else{
// //         $('.plEligibility-employee-name').empty().append('<a href="javascript:void(0)"><b>No Company Found</b></a> ');           

// //     }

// // });
// // function getPlEliApi(name) {
// //     var data=""
// //     var promise = new Promise(function (resolve) {
// //         var xhr = new XMLHttpRequest();
// //         xhr.withCredentials = true;

// //         xhr.addEventListener("readystatechange", function () {
// //             if (this.readyState === 4) {
// //                 data = this.response;
// //                 var myArray = JSON.parse(data);
// //                 resolve(myArray);
// //             }
// //         });

// //         xhr.open("POST", "https://www.tatacapital.com/content/tata-capital/retailapi.calculatorApi?source=company&company="+name);

// //         xhr.send(data);
// //     })
// //     promise.then(function (url) {
// //         // debugger;
// //         $('.plEligibility-employee-name').empty()
// //         plCompanies=url.body.queryResponse;
// //         url.body.queryResponse.forEach(function(element){
// //             $('.plEligibility-employee-name').append('<li> <a href="javascript:void(0)">' + element["company-name"] + '</a> </li>');           
// //         })
// //         $('.plEligibility-employee-name li a').click(function(){
// //             // debugger;
// //             console.log($(this))
// //             var $parent = $(this).parents('.js-searchDropdownWrap');
// //             $parent.find('.plEligibility-employee-name a').removeClass('active');
// //             $(this).addClass('active');
// //             var selectedVal = $(this).text();
// //             $parent.find('.dropdown-heading').text(selectedVal);
// //             $parent.find('.dropdown-heading').removeClass('active');
// //             $parent.find('.dropdownmenu').removeClass('show');
// //             $("[data-search]").val('');
// //             $(this).parents('[data-search]').find("li").show();
// //             if($(this).closest('.calculator-content-wrap').data('calcName')?.includes('calculator-personal-loan-eligibility-calculator')){        
// //                 empName = $(this).text();
// //                 renderPlEligibilityCalcResult($(this).parents(".calculator-content-wrap").data('calc-name'));
// //             }
// //         });
// //     }).catch(function (er) {
// //         console.log(er)
// //     }).finally(
// //         console.log('API-FINALLY BLOCK')
// //     )

// // }
// function setPlInput() {
//     var filterdCompany = plCompanies.filter(function (companies) {
//         return companies["company-name"]== empName;
//     });
//     return filterdCompany;
// }

