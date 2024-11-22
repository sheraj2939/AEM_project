(function (_global) {
    var tsssLeadGenerateBizCallFn = (function (jsHelper) {
        var tsssLeadGenerateBizObj = {};
        $(document).ready(function () {
            var rdcityPopulateArr = [];
            var officecityPopulateArr = [];
            var obj;
            var pinCodeArray = [];
            var desigNotInList = "1";
            var sourceCode;
            var urlParams;
            var tsssObj;
            var template;
            var name;
            var cardType;
            var subject;
            var toEmails;

            if(location.href.split("?")[1] && !location.href.split("?")[1].includes("wcmmode=") && !location.href.split("?")[1].includes("subsource=")){
                var urlParamsPopulateDecode = location.href.split("?")[0]+"?"+atob(location.href.split("?")[1]);
            var urlParamsPopulate = getURLParams(urlParamsPopulateDecode);
            var urlParams = getURLParams(urlParamsPopulateDecode);
            if(urlParamsPopulate.firstname){
                $('[data-type="firstname"]').val(urlParamsPopulate.firstname);
                $('[data-type="firstname"]').parent().parent().addClass('active')
            }
            if(urlParamsPopulate.lastname){
                $('[data-type="lastname"]').val(urlParamsPopulate.lastname);
                $('[data-type="lastname"]').parent().parent().addClass('active');  
            }
            if(urlParamsPopulate.phonenumber){
                $('[data-type="pd-mobile"]').val(urlParamsPopulate.phonenumber);
                $('[data-type="pd-mobile"]').parent().parent().addClass('active')
            }
            if(urlParamsPopulate.email){
                $('[data-type="pd-email"]').val(urlParamsPopulate.email);
                $('[data-type="pd-email"]').parent().parent().addClass('active')  
            }
            }else{
                var urlParams = getURLParams(location.href);
            }
            $( '.only-alpha-input' ).on("keypress paste keyup", function( e ) {
                var regex = new RegExp( /[^a-zA-Z\b ]/g );
                if ( regex.test( String.fromCharCode( e.which ) ) ) {
                    return false;
                }
            } );
            $('.only-alpha-numeric-input').keyup(function(e) {
                var alphaNumericRegex="^[a-zA-Z0-9]*$";
                if (String.fromCharCode(e.keyCode).match(/[^a-zA-Z0-9 ]/g)) {
                    return false;
                }
            });

            $('.only-numeric-input').keyup(function (e) {
                $(this).val($(this).val().replace(/[^\d.-]/g, ''));
            });
            $('body').click(function(e){
                if(!(e.target.dataset.multiselect == 'multiselect-drop')){
                    $('#multiselect-drop').removeClass('show');
                }
                if(!(e.target.dataset.multiselect =='multiselect-drop1')){
                    $('#multiselect-drop1').removeClass('show');
                }
            })
            $('[data-multiselect="multiselect-drop"]').click(function(e){
                $('#multiselect-drop').addClass('show');
            })
            $('[data-multiselect="multiselect-drop1"]').click(function(e){
                $('#multiselect-drop1').addClass('show');
            })
            // Select 2 js //
            $(".js-select2").select2({
                placeholder: "Select",
            });
            $(".js-select2-search-hide").select2({
                minimumResultsForSearch: Infinity,
            });
            $('.companyLi').click(function(e){
                $('.companyLi').removeClass('active')
                e.target.classList.add('active')
                $('.dropdown-heading.toShow').html(e.target.text)
                $('.data-occupation-company[data-occupation="salaried"] .textbox-box').find('.error-msgs').remove();
                $('.company').val(e.target.dataset.company);
            })
            $('.designationLi').click(function(e){
                $('.designationLi').removeClass('active')
                e.target.classList.add('active')
                $('.dropdown-heading.toShowDesignation').html(e.target.text)
                $('data-occupation-designation[data-occupation="salaried"] .textbox-box').find('.error-msgs').remove();
                desigNotInList = "0";
                $('.designation').val(e.target.dataset.designation);
            })
            $('.companySalariedInput').keyup(function(e){
                $('.company').val(e.currentTarget.value)
            })
            $('.designationSalariedInput').keyup(function(e){
                $('.designation').val(e.currentTarget.value)
                desigNotInList = "1";
            });
            $('.designation').keyup(function(e){
                desigNotInList = "1";
            });
            if ($(".rdcity").length || $(".officecity").length) {
                var reqObj = {};
                $("body").addClass("bg-loader");
                $(".loader").removeClass("hide-loader");
                tsssLeadGenerateFilterObj.pinCodeMaster(reqObj).then(function (response) {
                    if (response.status == "SUCCESS") {
                        obj = JSON.parse(response.response)
                        $("body").removeClass("bg-loader");
                        $(".loader").addClass("hide-loader");
                        if ($(".rdcity").length) {
                            rdcityPopulateArr = [];
                            $(".rdcity").html();
                            $(".rdcity").append("<option value=''></option>");
                            for (var item in obj.Master) {
                                if (item < obj.Master.length) {
                                    if (rdcityPopulateArr.indexOf(obj.Master[item].city) <= -1) {
                                        rdcityPopulateArr.push(obj.Master[item].city);
                                    }
                                }
                            }
                            //console.log(rdcityPopulateArr);

                            rdcityPopulateArr.forEach(function (element) {
                                $(".rdcity").append('<option value=' + element + '>' + element + '</option>');
                            });
                        }
                        if ($(".officecity").length) {
                            officecityPopulateArr = [];
                            $(".officecity").html();
                            $(".officecity").append("<option value=''></option>");
                            for (var item in obj.Master) {
                                if (item < obj.Master.length) {
                                    if (officecityPopulateArr.indexOf(obj.Master[item].city) <= -1) {
                                        officecityPopulateArr.push(obj.Master[item].city);
                                    }
                                }
                            }
                            officecityPopulateArr.forEach(function (element) {
                                $(".officecity").append('<option value=' + element + '>' + element + '</option>');
                            });
                        }

                        var selectElements = $('.rdcity.select2-hidden-accessible');
                        $(selectElements).each(function () {
                            var select = $(this);
                            $(select).on('select2:select', function (e) {
                                var rdcityVal = $(".rdcity option:selected").text();
                                $(".pincode").empty();
                                $(".std").empty();
                                if (!rdcityVal == '') {

                                    var pincodePopulateArr = []
                                    $(".pincode").html();
                                    $(".pincode").append("<option value=''></option>");

                                    obj.Master.forEach(function (element, index) {
                                        if (obj.Master[index].city == rdcityVal) {
                                            $(".pincode").append('<option value=' + obj.Master[index].pincode + '-' + obj.Master[index].std + '>' + obj.Master[index].pincode + '</option>');
                                        }
                                    });
                                }
                            })
                        })

                        var selectElements = $('.officecity.select2-hidden-accessible');
                        $(selectElements).each(function () {
                            var select = $(this);
                            $(select).on('select2:select', function (e) {
                                var rdcityVal = $(".officecity option:selected").text();
                                $(".officePincode").empty();
                                $(".officeStd").empty();
                                if (!rdcityVal == '') {
                                    $(".officePincode").html();
                                    $(".officePincode").append("<option value=''></option>");

                                    obj.Master.forEach(function (element, index) {
                                        if (obj.Master[index].city == rdcityVal) {
                                            $(".officePincode").append('<option value=' + obj.Master[index].pincode + '-' + obj.Master[index].std + '-' + obj.Master[index].sourcecode + '>' + obj.Master[index].pincode + '</option>');
                                        }
                                    });
                                }
                            })
                        })

                        var selectElements = $('.pincode.select2-hidden-accessible');
                        $(selectElements).each(function () {
                            var select = $(this);
                            $(select).on('select2:select', function (e) {
                                $('.std').parents('.textbox-box').addClass('active')
                                $(".std").html("");
                                $(".std").append('<option value=' + e.target.value.split('-')[1] + '>' + e.target.value.split('-')[1] + '</option>');
                                $(".std").parents('.textbox-box').removeClass('textboxerror');
                                $(".std").next('.error-msgs').text('');
                            })
                        })

                        var selectElements = $('.officePincode.select2-hidden-accessible');
                        $(selectElements).each(function () {
                            var select = $(this);
                            $(select).on('select2:select', function (e) {
                                sourceCode = e.target.value.split('-')[2];
                                $('.officeStd').parents('.textbox-box').addClass('active')
                                $(".officeStd").html("");
                                $(".officeStd").append('<option value=' + e.target.value.split('-')[1] + '>' + e.target.value.split('-')[1] + '</option>');
                                $(".officeStd").parents('.textbox-box').removeClass('textboxerror');
                                $(".officeStd").next('.error-msgs').text('');
                            })
                        })
                    } else {

                    }
                }).catch(function (error) {
                    console.error(error);
                });
            }

            $('#searchCompany').keyup(function (e) {
                if (e.target.value.length > 2) {
                    $('.search-drop-list.companySearchList').html('<ul class="multiple-select-list jsGetValue jsSearchVali" id="searchCompanyList"><li class="select-item"><a href="javascript:void(0)" class="item-text">Please Wait !!!</a></li></ul>')
                    var reqObj = { "header": {}, "body": { "company": e.target.value }, "headerJson": {} }

                    tsssLeadGenerateFilterObj.tsssCompanyList(reqObj).then(function (response) {
                        if (response.status.toLowerCase() == "success") {
                            $('.search-drop-list.companySearchList').html('')
                            var htmlDivHtml = '<ul class="multiple-select-list jsGetValue jsSearchVali" id="searchCompanyList">';
                            companyArr = [];
                            companyArrAlias = [];
                            var obj = response.response.responseJson;
                            //console.log(xhr.responseText);
                            if (obj) {
                                obj.body.queryResponse.forEach(function (element, index) {
                                    companyArr.push(obj.body.queryResponse[index]['company-name']);
                                    companyArrAlias.push(obj.body.queryResponse[index]['alias-name']);
                                    htmlDivHtml += '<li class="select-item companyLi"><a href="javascript:void(0)" class="item-text" data-company="' + companyArrAlias[index] + '">' + companyArr[index] + '</a></li>';
                                });
                            }
                            htmlDivHtml += '</ul>';
                            $('.search-drop-list.companySearchList').html(htmlDivHtml);

                            $('[data-company]').click(function () {
                                getValues = $(this).text();
                                console.log(getValues);
                                $(this).parents('.jsGetValue').find('li').removeClass('active');
                                $(this).parents('li').addClass('active');
                                $(this).parents('.new-custom-drops').find('[data-multiselect]').text(getValues);
                                $(this).parents('.new-custom-drops').find('[data-multiselect]').removeClass('jsValueOK');
                                $(this).parents('.new-custom-drops').removeClass('show');
                                $(this).parents('.new-custom-drops').find('[data-multiselect]').removeClass('active');
                                $(this).parents('.new-custom-drops').find('.multiselect-dropdown-card').removeClass('show');
                                feildsCount = $('#loan-against-property .jsValueOK:visible').length;
                                console.log(feildsCount);
                                if (feildsCount === 0) {
                                    /* $('.jsApplyLoanAgainstProp').removeClass('btn-disabled');*/
                                } else {
                                    /* $('.jsApplyLoanAgainstProp').addClass('btn-disabled');*/
                                }
                            })
                            $('.jsSearchVali li').click(function () {
                                if ($(this).hasClass('active')) {
                                    $('[data-occupation="salaried"] .form-textbox-new').removeClass('textboxerror');
                                    $('[data-occupation="salaried"] .form-textbox-new').next('.error-msgs').remove();
                                }
                            })
                            $('.companyLi').click(function(e){
                                $('.companyLi').removeClass('active')
                                e.target.classList.add('active')
                                $('.dropdown-heading.toShow').html(e.target.text)
                                $('.data-occupation-company[data-occupation="salaried"] .textbox-box').find('.error-msgs').remove();
                                $('.company').val(e.target.dataset.company);
                            })
                            //console.log(companyArr);
                        }
                    })
                }
            })

            $('#searchdesiganation').keyup(function (e) {
                if (e.target.value.length > 2) {
                    $('.search-drop-list.designationSearchList').html('<ul class="multiple-select-list jsGetValue jsSearchVali2" id="searchDesiganationList"><li class="select-item"><a href="javascript:void(0)" class="item-text">Please Wait !!!</a></li></ul>')
                    var reqObj = { "header": {}, "body": { "designation": e.target.value }, "headerJson": {} }

                    tsssLeadGenerateFilterObj.tsssDesignationList(reqObj).then(function (response) {
                        if (response.status.toLowerCase() == "success") {
                            $('.search-drop-list.designationSearchList').html('')
                            var htmlDivHtml = '<ul class="multiple-select-list jsGetValue jsSearchVali2" id="searchDesiganationList">';
                            companyArr = [];
                            companyArrAlias = [];
                            var obj = response.response.responseJson;
                            //console.log(xhr.responseText);
                            if (obj) {
                                obj.body.queryResponse.forEach(function (element, index) {
                                    companyArr.push(obj.body.queryResponse[index]['designation']);
                                    companyArrAlias.push(obj.body.queryResponse[index]['alias']);
                                    htmlDivHtml += '<li class="select-item designationLi"><a href="javascript:void(0)" class="item-text" data-designation="' + companyArrAlias[index] + '">' + companyArr[index] + '</a></li>';
                                });
                            }
                            htmlDivHtml += '</ul>';
                            $('.search-drop-list.designationSearchList').html(htmlDivHtml);

                            $('[data-designation]').click(function () {
                                getValues = $(this).text();
                                console.log(getValues);
                                $(this).parents('.jsGetValue').find('li').removeClass('active');
                                $(this).parents('li').addClass('active');
                                $(this).parents('.new-custom-drops').find('[data-multiselect]').text(getValues);
                                $(this).parents('.new-custom-drops').find('[data-multiselect]').removeClass('jsValueOK');
                                $(this).parents('.new-custom-drops').removeClass('show');
                                $(this).parents('.new-custom-drops').find('[data-multiselect]').removeClass('active');
                                $(this).parents('.new-custom-drops').find('.multiselect-dropdown-card').removeClass('show');
                                feildsCount = $('#loan-against-property .jsValueOK:visible').length;
                                console.log(feildsCount);
                                if (feildsCount === 0) {
                                    /*$('.jsApplyLoanAgainstProp').removeClass('btn-disabled');*/
                                } else {
                                    /*$('.jsApplyLoanAgainstProp').addClass('btn-disabled');*/
                                }
                            })
                            $('.jsSearchVali2 li').click(function () {
                                if ($(this).hasClass('active')) {
                                    $('[data-occupation="salaried"] .form-textbox-new').removeClass('textboxerror');
                                    $('[data-occupation="salaried"] .form-textbox-new').next('.error-msgs').remove();
                                }
                            })
                            $('.designationLi').click(function(e){
                                $('.designationLi').removeClass('active')
                                e.target.classList.add('active')
                                $('.dropdown-heading.toShowDesignation').html(e.target.text)
                                $('data-occupation-designation[data-occupation="salaried"] .textbox-box').find('.error-msgs').remove();
                                desigNotInList = "0";
                                $('.designation').val(e.target.dataset.designation);
                            })
                            //console.log(companyArr);
                        }
                    })
                }
            })


            $(".allow-numeric").on("input", function (evt) {
                var self = $(this);
                self.val(self.val().replace(/\D/g, ""));
                if ((evt.which < 48 || evt.which > 57)) {
                    evt.preventDefault();
                }
            });

            $(".alfaOnlyInput").on("input", function () {
                var regexp = /[^a-zA-Z'. ,-]/g;
                if ($(this).val().match(regexp)) {
                    $(this).val($(this).val().replace(regexp, ''));
                }
            });

            $('[data-type="od-occucation-type"]').on("select2:select", function (e) {
                var select_val = $(e.currentTarget).val().toLowerCase();
                if (select_val === 'self employed') {
                    $('[data-occupation]').addClass('hidden');

                    $('[data-occupation="self-employed"]').removeClass('hidden');
                    $('[data-occupation="self-employed"]').find('.form-textbox-new').removeClass('textboxerror');
                    $('[data-occupation="self-employed"]').find('.form-textbox-new').removeClass('active');
                    $('[data-occupation="self-employed"]').find('.form-textbox-new .input-textbox').val('');
                    $('[data-occupation="self-employed"]').find('.form-textbox-new .error-msgs').remove();
                    $('[data-occupation="salaried"] #searchCompany').val('');
                    $('[data-occupation="salaried"] [data-multiselect]').addClass('jsValueOK');
                    $('[data-occupation="degsnation"] #searchDesiganationList').val('');
                    /*$('.jsApplyLoanAgainstProp').addClass('btn-disabled');*/
                }
                if (select_val === 'salaried') {
                    $('[data-occupation]').addClass('hidden');

                    $('[data-occupation="salaried"]').removeClass('hidden');
                    $('[data-occupation="degsnation"]').removeClass('hidden');

                    $('[data-occupation="salaried"] [data-multiselect]').text('Select');
                    $('[data-occupation="salaried"] .jsGetValue li').removeClass('active');
                    $('[data-occupation="salaried"] #searchCompany').val('');
                    $('#searchCompanyList li').removeAttr('style');
                    $('[data-occupation="salaried"] .form-textbox-new').removeClass('textboxerror');
                    $('[data-occupation="salaried"] .form-textbox-new').next('.error-msgs').remove();
                    $('[data-occupation="degsnation"] [data-multiselect]').addClass('jsValueOK');

                    $('[data-occupation="degsnation"] [data-multiselect]').text('Select');
                    $('[data-occupation="degsnation"] .jsGetValue li').removeClass('active');
                    $('#searchDesiganationList li').removeAttr('style');
                    $('[data-occupation="degsnation"] .form-textbox-new').removeClass('textboxerror');
                    $('[data-occupation="degsnation"] .form-textbox-new').next('.error-msgs').remove();
                    /*$('.jsApplyLoanAgainstProp').addClass('btn-disabled');*/

                }
            });


            $("#searchCompany ").on("keyup", function () {
                var value = $(this).val().toLowerCase();
                if (value) {
                    $("#searchCompanyList li").filter(function () {
                        $(this).toggle($(this).text().toLowerCase().includes(value))
                    });
                }
            });

            $("#searchdesiganation").on("keyup", function () {
                var value = $(this).val().toLowerCase();
                if (value) {
                    $("#searchDesiganationList li").filter(function () {
                        $(this).toggle($(this).text().toLowerCase().includes(value))
                    });
                }
            });


            $('.jsAddManually').click(function () {

                $('[data-occupation="salaried"]').addClass('hidden');
                $('[data-occupation="salaried-list"]').removeClass('hidden').addClass('jstext');
                $('[data-occupation="salaried-list"] input').val('');

                $('[data-occupation="salaried-list"]').find('.input-textbox').focus();
                $('[data-occupation="salaried"] #searchCompany').val('');

                $('.jsMultiDropdown').removeClass('show');
                $('.jsMultiDropdown [data-multiselect]').removeClass('active');

            })

            $('.jsAddManuallyDesigantion').click(function () {

                $('[data-occupation="degsnation"]').addClass('hidden');
                $('[data-occupation="degsnation-list"] input').val('');

                $('[data-occupation="degsnation-list"]').removeClass('hidden').addClass('jstext2');
                $('[data-occupation="degsnation-list"]').find('.input-textbox').focus();
                $('[data-occupation="degsnation"] #searchdesiganation').val('');

                $('.jsMultiDropdown').removeClass('show');
                $('.jsMultiDropdown [data-multiselect]').removeClass('active');

            })

            $('.jsSearchVali li').click(function () {
                if ($(this).hasClass('active')) {
                    $('[data-occupation="salaried"] .form-textbox-new').removeClass('textboxerror');
                    $('[data-occupation="salaried"] .form-textbox-new').next('.error-msgs').remove();
                }
            })

            $('.jsSearchVali2 li').click(function () {
                if ($(this).hasClass('active')) {
                    $('[data-occupation="degsnation"] .form-textbox-new').removeClass('textboxerror');
                    $('[data-occupation="degsnation"] .form-textbox-new').next('.error-msgs').remove();
                }
            })

            $('.jsGetValue li a').click(function () {
                getValues = $(this).text();
                console.log(getValues);
                $(this).parents('.jsGetValue').find('li').removeClass('active');
                $(this).parents('li').addClass('active');
                $(this).parents('.new-custom-drops').find('[data-multiselect]').text(getValues);
                $(this).parents('.new-custom-drops').find('[data-multiselect]').removeClass('jsValueOK');
                $(this).parents('.new-custom-drops').removeClass('show');
                $(this).parents('.new-custom-drops').find('[data-multiselect]').removeClass('active');
                $(this).parents('.new-custom-drops').find('.multiselect-dropdown-card').removeClass('show');
                feildsCount = $('#loan-against-property .jsValueOK:visible').length;
                console.log(feildsCount);
                if (feildsCount === 0) {
                    /*$('.jsApplyLoanAgainstProp').removeClass('btn-disabled');*/
                } else {
                    /* $('.jsApplyLoanAgainstProp').addClass('btn-disabled');*/
                }
            })

            // Clear Loan aganist form
            $('.jsClearLoanDeatils').click(function () {
                clearCompleteForm();
            })


            var feildsCount = $('#loan-against-property .jsValueOK:visible').length;
            console.log(feildsCount);

            var emailFlag = false;
            var validEmail = {};
            var emailArr;
            var dummyDomains = [];
            $('[data-type="email"]').focus(function () {
                if (!emailFlag && !sessionStorage.getItem("email")) {
                } else { }
            })
            //Loan aganist form key up
            $('#loan-against-property .input-textbox[data-type]').keyup(function () {
                if (sessionStorage.getItem("email")) {
                    dummyDomains = sessionStorage.getItem("email");
                    emailArr = sessionStorage.getItem("emailArr");
                    emailArr = JSON.parse(emailArr);
                }
                var element = $(this);
                var ele_value = element.val();
                var ele_required = 'Field is required';
                var ele_email = "Please enter valid email ID";
                var ele_Fname = "Please enter valid first name";
                var ele_Lname = "Please enter valid last name";
                var ele_phoneNumber = "Please enter valid number";
                var ele_Date = "Please enter valid Date";
                var ele_pannumber = "Please enter valid PAN number";
                var ele_company = "Please enter valid Company";
                var ele_designation = "Please enter valid Designation";
                var ele_address = "Please enter valid Address";

                $(this).next('.error-msgs').remove();
                $(this).after('<span class="error-msgs" style="top: 43px"></span>');
                $(this).parents('.form-group').addClass('error');


                if ($(element).val() != '') {
                    $(element).parents('.form-textbox-new').find('.text-infos').addClass('hide-input-note');
                    if ($(element).data('type') === 'firstname') {
                        // var regName = /[a-zA-Z]{2,}/;
                        var regName = /^[a-zA-Z]+$/;
                        if (ele_value != '' && !regName.test(ele_value)) {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_Fname);
                            $(element).addClass('jsValueOK')
                        } else {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');
                            $(element).removeClass('jsValueOK')
                        }
                    }
                    if ($(element).data('type') === 'lastname') {
                        // var regName = /[a-zA-Z]{2,}/;
                        var regName = /^[a-zA-Z]+$/;
                        if (ele_value != '' && !regName.test(ele_value)) {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_Lname);
                            $(element).addClass('jsValueOK')
                        } else {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');

                            $(element).removeClass('jsValueOK')
                        }
                    }
                    if ($(element).data('type') === 'pd-mothername') {
                        var regName = /[a-zA-Z]{1,}/;
                        if (ele_value != '' && !regName.test(ele_value)) {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_required);
                            $(element).addClass('jsValueOK')
                        } else {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');

                            $(element).removeClass('jsValueOK')
                        }
                    }
                    if ($(element).data('type') === 'pd-email') {
                        //var regEmail = /^[a-zA-Z0-9_.]+[@][a-zA-Z0-9]+[\.][a-zA-z0-9]{2,4}$/gm;
                        var regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gm
                        if (ele_value != '' && !ele_value.match(regEmail)) {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_email);
                            $(element).addClass('jsValueOK')
                        } else {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');
                            $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                            $(element).removeClass('jsValueOK');
                        }
                    }
                    if ($(element).data('type') === 'pd-mobile') {
                        if (!validateMobile(element)) {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_phoneNumber);
                            $(element).addClass('jsValueOK')
                        } else {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');
                            $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                            $(element).removeClass('jsValueOK')
                        }
                    }
                    if ($(element).data('type') === 'ra-mobile') {
                        if (!validateMobile(element)) {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_phoneNumber);
                            $(element).addClass('jsValueOK')
                        } else {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');
                            $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                            $(element).removeClass('jsValueOK')
                        }
                    }
                    if ($(element).data('type') === 'dob') {
                        if (!checkDate(ele_value)) {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_Date);
                            $(element).addClass('jsValueOK')
                        } else {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');
                            $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                            $(element).removeClass('jsValueOK')
                        }
                    }
                    if ($(element).data('type') === 'pan') {
                        var regPan = /[A-Za-z]{5}\d{4}[A-Za-z]{1}/g;
                        $(this).val($(this).val().toUpperCase());
                        if (ele_value != '' && !ele_value.match(regPan)) {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_pannumber);
                            $(element).addClass('jsValueOK')
                        } else {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');
                            $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                            $(element).removeClass('jsValueOK')
                        }
                    }
                    if ($(element).data('type') === 'ra-address1') {
                        var regAdd =  /^[A-Za-z0-9#'-.,()/ ]+$/;
                        $(this).val($(this).val());
                        if (ele_value != '' && !ele_value.match(regAdd)) {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_address);
                            $(element).addClass('jsValueOK')
                        } else {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');
                            $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                            $(element).removeClass('jsValueOK')
                        }
                    }
                    if ($(element).data('type') === 'ra-address2') {
                        var regAdd =  /^[A-Za-z0-9#'-.,()/ ]+$/;
                        $(this).val($(this).val());
                        if (ele_value != '' && !ele_value.match(regAdd)) {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_address);
                            $(element).addClass('jsValueOK')
                        } else {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');
                            $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                            $(element).removeClass('jsValueOK')
                        }
                    }
                    if ($(element).data('type') === 'ra-address3') {
                        var regAdd =  /^[A-Za-z0-9#'-.,()/ ]+$/;
                        $(this).val($(this).val());
                        if (ele_value != '' && !ele_value.match(regAdd)) {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_address);
                            $(element).addClass('jsValueOK')
                        } else {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');
                            $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                            $(element).removeClass('jsValueOK')
                        }
                    }
                    if ($(element).data('type') === 'od-companyname') {
                        var regComapany = /^[a-z\d\-.()':_\s]+$/i;
                        $(this).val($(this).val());
                        if (ele_value != '' && !ele_value.match(regComapany)) {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_company);
                            $(element).addClass('jsValueOK')
                        } else {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');
                            $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                            $(element).removeClass('jsValueOK')
                        }
                    }
                    if ($(element).data('type') === 'od-companynamesal') {
                        var regComapany = /^[a-z\d\-.()?,':_\s]+$/i;
                        $(this).val($(this).val());
                        if (ele_value != '' && !ele_value.match(regComapany)) {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_company);
                            $(element).addClass('jsValueOK')
                        } else {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');
                            $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                            $(element).removeClass('jsValueOK')
                        }
                    }
                    if ($(element).data('type') === 'od-degsnation') {
                        var regDesignation = /^[a-z\d\-.()/&,:_\s ]+$/i;
                        $(this).val($(this).val());
                        if (ele_value != '' && !ele_value.match(regDesignation)) {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_designation);
                            $(element).addClass('jsValueOK')
                        } else {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');
                            $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                            $(element).removeClass('jsValueOK')
                        }
                    }
                    if ($(element).data('type') === 'od-degsnationsal') {
                        var regDesignation = /^[a-z\d\-.()/&,:_\s ]+$/i;
                        $(this).val($(this).val());
                        if (ele_value != '' && !ele_value.match(regDesignation)) {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_designation);
                            $(element).addClass('jsValueOK')
                        } else {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');
                            $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                            $(element).removeClass('jsValueOK')
                        }
                    }
                    if ($(element).data('type') === 'od-email') {
                        //var regEmail = /^[a-zA-Z0-9_.]+[@][a-zA-Z0-9]+[\.][a-zA-z0-9]{2,4}$/gm;
                        var regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gm;
                        if (ele_value != '' && !ele_value.match(regEmail)) {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_email);
                            $(element).addClass('jsValueOK')
                        } else {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');
                            $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                            $(element).removeClass('jsValueOK')
                        }
                    }

                    if ($(element).data('type') === 'od-annual-income') {
                        $(element).parents('.textbox-inner').addClass('has-rupee-icon');
                        $(element).parents('.textbox-inner').find('.icon-rupee').removeClass('d-none');
                        $(element).addClass('jsValueOK')
                        var rupeeValue = parseFloat(ele_value.replace(/,/g, ''));
                        if (ele_value != '' && !(rupeeValue > 0)) {
                            // $(element).parents('.form-textbox-new').addClass('textboxerror');
                            // $(element).next('.error-msgs').text(ele_propValue);
                        } else {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');
                            $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                            $(element).removeClass('jsValueOK')
                        }
                    }


                } else {
                    $(element).parents('.form-textbox-new').find('.text-infos').addClass('hide-input-note');
                    $(element).parents('.textbox-inner').removeClass('has-rupee-icon');
                    $(element).parents('.textbox-inner').find('.icon-rupee').addClass('d-none');
                    $(element).next('.error-msgs').text(ele_required);
                    $(element).addClass('jsValueOK')
                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                }
                feildsCount = $('#loan-against-property .jsValueOK:visible').length
                console.log(feildsCount);
                if (feildsCount === 0) {
                    /*$('.jsApplyLoanAgainstProp').removeClass('btn-disabled');*/
                } else {
                    /*$('.jsApplyLoanAgainstProp').addClass('btn-disabled');*/
                }
            });

            //Loan aganist form submit
            var userPhoneNumber;
            $('#loan-against-property .jsApplyLoanAgainstProp').click(function () {
                /* $('.jsApplyLoanAgainstProp').addClass('btn-disabled');*/
                var ele_input = $('#loan-against-property').find('.form-textbox-new [data-type]:visible');
                var selectElements = $('#loan-against-property .select2-hidden-accessible[data-type]:visible');
                var errors = [];
                allFilled = true;
                var ele_required = "Field is required";

                $(ele_input).each(function () {
                    var element = $(this);
                    var ele_value = element.val();
                    var ele_email = "Please enter valid email ID";
                    var ele_firstname = "Please enter valid first name";
                    var ele_lastname = "Please enter valid last name";
                    var ele_phoneNumber = "Please enter valid number";
                    var ele_Date = "Please enter valid Date";
                    var ele_pannumber = "Please enter valid PAN number";
                    var ele_company = "Please enter valid Company";
                    var ele_designation = "Please enter valid Designation";
                    var ele_address = "Please enter valid Address";

                    $(element).parents('.form-textbox-new').find('.error-msgs').remove();
                    $(element).parents('.form-textbox-new').addClass('textboxerror');

                    if (element.is(":visible")) {
                        if (element.val() != '') {
                            $(element).parents('.form-textbox-new').find('.text-infos').addClass('hide-input-note');
                            $(element).after('<span class="error-msgs" style="top: 43px"></span>');

                            if ($(element).data('type') === 'firstname') {
                                var regName = /^[a-zA-Z]+$/;
                                if (ele_value != '' && !regName.test(ele_value)) {
                                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                                    $(element).next('.error-msgs').text(ele_firstname);
                                    errors.push(ele_required);
                                } else {
                                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                                    $(element).next().text('');
                                }
                            }
                            if ($(element).data('type') === 'lastname') {
                                var regName = /^[a-zA-Z]+$/;
                                if (ele_value != '' && !regName.test(ele_value)) {
                                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                                    $(element).next('.error-msgs').text(ele_lastname);
                                    errors.push(ele_required);
                                } else {
                                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                                    $(element).next().text('');
                                }
                            }
                            if ($(element).data('type') === 'pd-email') {
                               // var regEmail = /^[a-zA-Z0-9_.]+[@][a-zA-Z0-9]+[\.][a-zA-z0-9]{2,4}$/gm;
                               var regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gm;
                                if (ele_value != '' && !ele_value.match(regEmail)) {
                                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                                    $(element).next('.error-msgs').text(ele_email);
                                    errors.push(ele_email)
                                } else {
                                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                                    $(element).next().text('');
                                }
                            }
                            if ($(element).data('type') === 'pd-mobile') {
                                if (!validateMobile(element)) {
                                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                                    $(element).next('.error-msgs').text(ele_phoneNumber);
                                    errors.push(ele_phoneNumber)
                                } else {
                                    userPhoneNumber = $(element).val();
                                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                                    $(element).next().text('');
                                    $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                                }
                            }
                            if ($(element).data('type') === 'ra-mobile') {
                                if (!validateMobile(element)) {
                                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                                    $(element).next('.error-msgs').text(ele_phoneNumber);
                                    errors.push(ele_phoneNumber)
                                } else {
                                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                                    $(element).next().text('');
                                    $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                                }
                            }
                            if ($(element).data('type') === 'dob') {
                                if (!checkDate(ele_value)) {
                                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                                    $(element).next('.error-msgs').text(ele_Date);
                                    errors.push(ele_Date)
                                } else {
                                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                                    $(element).next().text('');
                                    $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                                }
                            }
                            if ($(element).data('type') === 'pan') {
                                var regPan = /[A-Za-z]{5}\d{4}[A-Za-z]{1}/g;
                                $(this).val($(this).val().toUpperCase());
                                if (ele_value != '' && !ele_value.match(regPan)) {
                                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                                    $(element).next('.error-msgs').text(ele_pannumber);
                                    errors.push(ele_pannumber)
                                } else {
                                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                                    $(element).next().text('');
                                }
                            }
                            if ($(element).data('type') === 'pd-mothername') {
                                var regName = /[a-zA-Z]{1,}/;
                                if (ele_value != '' && !regName.test(ele_value)) {
                                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                                    $(element).next('.error-msgs').text(ele_required);
                                    errors.push(ele_required);
                                } else {
                                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                                    $(element).next().text('');
                                }
                            }
                            if ($(element).data('type') === 'ra-address1') {
                                var regAdd = /^[a-z\d\-.()?,':_\s]+$/i;
                                $(this).val($(this).val());
                                if (ele_value != '' && !ele_value.match(regAdd)) {
                                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                                    $(element).next('.error-msgs').text(ele_address);
                                    errors.push(ele_address)
                                } else {
                                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                                    $(element).next().text('');
                                }
                            }
                            if ($(element).data('type') === 'ra-address2') {
                                var regAdd = /^[a-z\d\-.()?,':_\s]+$/i;
                                $(this).val($(this).val());
                                if (ele_value != '' && !ele_value.match(regAdd)) {
                                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                                    $(element).next('.error-msgs').text(ele_address);
                                    errors.push(ele_address)
                                } else {
                                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                                    $(element).next().text('');
                                }
                            }
                            if ($(element).data('type') === 'ra-address3') {
                                var regAdd = /^[a-z\d\-.()?,':_\s]+$/i;
                                $(this).val($(this).val());
                                if (ele_value != '' && !ele_value.match(regAdd)) {
                                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                                    $(element).next('.error-msgs').text(ele_address);
                                    errors.push(ele_address)
                                } else {
                                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                                    $(element).next().text('');
                                }
                            }
                            if ($(element).data('type') === 'od-companyname') {
                                var regComapany = /^[a-z\d\-.()':_\s]+$/i;
                                $(this).val($(this).val());
                                if (ele_value != '' && !ele_value.match(regComapany)) {
                                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                                    $(element).next('.error-msgs').text(ele_company);
                                    errors.push(ele_company)
                                } else {
                                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                                    $(element).next().text('');
                                }
                            }
                            if ($(element).data('type') === 'od-companynamesal') {
                                var regComapany = /^[a-z\d\-.()?,':_\s]+$/i;
                                $(this).val($(this).val());
                                if (ele_value != '' && !ele_value.match(regComapany)) {
                                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                                    $(element).next('.error-msgs').text(ele_company);
                                    errors.push(ele_company)
                                } else {
                                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                                    $(element).next().text('');
                                }
                            }
                            if ($(element).data('type') === 'od-email') {
                                //var regEmail = /^[a-zA-Z0-9_.]+[@][a-zA-Z0-9]+[\.][a-zA-z0-9]{2,4}$/gm;
                                var regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gm;
                                if (ele_value != '' && !ele_value.match(regEmail)) {
                                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                                    $(element).next('.error-msgs').text(ele_email);
                                    errors.push(ele_email)
                                } else {
                                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                                    $(element).next().text('');
                                }
                            }
                            if ($(element).data('type') === 'od-degsnation') {
                                var regDesignation = /^[a-z\d\-.()/&,:_\s ]+$/i;
                                $(this).val($(this).val());
                                if (ele_value != '' && !ele_value.match(regDesignation)) {
                                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                                    $(element).next('.error-msgs').text(ele_designation);
                                    errors.push(ele_designation)
                                } else {
                                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                                    $(element).next().text('');
                                }
                            }
                            if ($(element).data('type') === 'od-degsnationsal') {
                                var regDesignation = /^[a-z\d\-.()/&,:_\s ]+$/i;
                                $(this).val($(this).val());
                                if (ele_value != '' && !ele_value.match(regDesignation)) {
                                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                                    $(element).next('.error-msgs').text(ele_designation);
                                    errors.push(ele_designation)
                                } else {
                                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                                    $(element).next().text('');
                                }
                            }

                            if ($(element).data('type') === 'od-annual-income') {
                                if (ele_value == '') {
                                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                                    $(element).next('.error-msgs').text(ele_required);
                                    errors.push(ele_required);
                                } else {
                                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                                    $(element).next().text('');
                                }
                            }

                        } else {
                            $(element).after('<span class="error-msgs" style="top: 43px">' + ele_required + '</span>');
                            errors.push(ele_required);
                            $(element).parents('.form-textbox-new').find('.text-infos').addClass('hide-input-note');
                        }
                    }
                });

                $(selectElements).each(function () {
                    var select = $(this);
                    $(select).parents('.form-textbox-new').find('.error-msgs').remove();

                    if ($(select).val() == '') {
                        allFilled = false;
                        $(select).parents('.form-textbox-new').addClass('textboxerror');
                        $(select).parents('.form-textbox-new').find('.text-infos').addClass('hide-input-note');
                        $(select).next('.error-msgs').remove();
                        $(select).after('<span class="error-msgs" style="top: 43px">' + ele_required + '</span>');
                        errors.push(ele_required);
                    } else {
                        $(select).parents('.form-textbox-new').removeClass('textboxerror');
                        $(select).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                        $(select).next('.error-msgs').remove();
                    }
                });
                if ($('[data-occupation="salaried"]:visible [data-multiselect]').text() === "Select") {
                    $('[data-occupation="salaried"] .form-textbox-new').addClass('textboxerror');
                    $('[data-occupation="salaried"] .new-custom-drops').after('<span class="error-msgs">' + ele_required + '</span>');
                    errors.push(ele_required);
                } else {
                    $('[data-occupation="salaried"] .form-textbox-new').removeClass('textboxerror');
                    $('[data-occupation="salaried"] .form-textbox-new').next('.error-msgs').remove();
                }

                if ($('[data-occupation="degsnation"]:visible [data-multiselect]').text() === "Select") {
                    $('[data-occupation="degsnation"] .form-textbox-new').addClass('textboxerror');
                    $('[data-occupation="degsnation"] .new-custom-drops').after('<span class="error-msgs">' + ele_required + '</span>');
                    errors.push(ele_required);
                } else {
                    $('[data-occupation="degsnation"] .form-textbox-new').removeClass('textboxerror');
                    $('[data-occupation="degsnation"] .form-textbox-new').next('.error-msgs').remove();
                }
if($('#iAgreeTerms').hasClass("jsValueOK")){
    errors.push("unchecked");
}else{
    /*errors.pop("unchecked");*/
}
                console.log(errors);
                if (errors.length == 0) {
                    getWhatsappNub = $('[data-type="pd-mobile"]').val();
                    $('.loader').removeClass('hide-loader');
                    $('body').addClass('bg-loader');
                    mobilNumber = getWhatsappNub;
                    var reqObj = {
                        "header": {
                            "authToken": "MTI4OjoxMDAwMDo6ZDBmN2I4MGNiODIyNWY2MWMyNzMzN2I3YmM0MmY0NmQ6OjZlZTdjYTcwNDkyMmZlOTE5MGVlMTFlZDNlYzQ2ZDVhOjpkdmJuR2t5QW5qUmV2OHV5UDdnVnEyQXdtL21HcUlCMUx2NVVYeG5lb2M0PQ==",
                            "identifier": "nli"
                        },
                        "body": {
                            "mobileNumber": mobilNumber
                        }
                    }
                    tsssLeadGenerateFilterObj.generateOtp(reqObj).then(function (response) {
                        if (response.response.responseJson.header.status.toLowerCase() == "success" && response.response.responseJson.body.retStatus.toLowerCase() == "success") {
                            if (response.response.responseJson.body.otpRefNo) {
                                otpRefNo = response.response.responseJson.body.otpRefNo;
                                name = $('[data-type="firstname"]').val();
                                cardType = $('[data-type="credit-card-type"] :selected').text();
                                toEmails = $('[data-type="pd-email"] ').val();
                                tsssObj = {
                                    "header": {
                                        "authToken": "fdfg"
                                    },
                                    "body": {
                                        "subSource": urlParams.subsource ? urlParams.subsource : "",
                                        "channelCode": "",
                                        "promoCode": "",
                                        "cardType": $('[data-type="credit-card-type"] :selected').text(),
                                        "sourceCode": sourceCode ? sourceCode : "",
                                        "seCode": window.osgiConfigObj.seCodeTsssForm,
                                        "salutation": $('[data-type="pd-title"] :selected').text(),
                                        "firstName": $('[data-type="firstname"]').val(),
                                        "lastName": $('[data-type="lastname"]').val(),
                                        "gender": $('[data-type="pd-gender"] :selected').text(),
                                        "dateOfBirth": $('[data-type="dob"]').val(),
                                        "pan": $('[data-type="pan"]').val(),
                                        "mothersName": $('[data-type="pd-mothername"]').val(),
                                        "resiAddressHouseNo": $('[data-type="ra-address1"]').val(),
                                        "resiAddressLine2": $('[data-type="ra-address2"]').val(),
                                        "resiAddressLocality": $('[data-type="ra-address3"]').val(),
                                        "resiPinCode": $('[data-type="ra-pincode"] :selected').text(),
                                        "resiCity": $('[data-type="ra-city"] :selected').text(),
                                        "resiStdCode": $('[data-type="ra-stdcode"] :selected').text(),
                                        "resiPhone": $('[data-type="ra-mobile"]').val(),
                                        "mobileNumber": $('[data-type="pd-mobile"]').val(),
                                        "personalEmailId": $('[data-type="pd-email"] ').val(),
                                        "officialEmailId": $('[data-type="od-email"]').val(),
                                        "nationality": $('[data-type="nationality"]').val(),
                                        "occupationType": $('[data-type="od-occucation-type"] :selected').text(),
                                        "companyName": $('.company').val(),
                                        "designation": $('.designation').val(),
                                        "desigNotInList": desigNotInList ? desigNotInList : "",
                                        "offPinCode": $('[data-type="od-pincode"]').val().split('-')[0],
                                        "offCity": $('[data-type="od-city"] :selected').text(),
                                        "offStdCode": $('[data-type="od-stdcode"]').val(),
                                        "netIncome": $('[data-type="od-annual-income"]').val().split(',').join(''),
                                        "textField1": "",
                                        "textField2": "",
                                        "consent": "Yes",
                                        "userId": "",
                                        "geMid2": "",
                                        "promoGroup": ""
                                    }
                                }
                                clearCompleteForm();
                                $('.loader').addClass('hide-loader');
                                $('body').removeClass('bg-loader');
                                var enterotpText = 'Please enter the 4 digit OTP sent to your mobile number';
                                $('.jsOtpHeading').html(enterotpText);
                                $('.jsOTPInputBox').removeClass('d-none');
                                $('.jsLoanAgainstSendOTP').addClass('d-none');
                                $('.jsLoanAgainstSubmitOTP').removeClass('d-none');
                                $('.jsLoanAgainstResendOTP').removeClass('d-none');
                                $('#loan-against-otp').find('.js-OtpBox .input-textbox:first-child').focus();
                                $('.loan-against-form').addClass('d-none')
                                $('.loan-against-otp-wrap').removeClass('d-none')
                                $('.loan-againstclose-btn').removeClass('d-none')
                                $('.clear-btn').addClass('d-none')
                                $("#loan-against-otp .input-textbox[data-type=otp-send-number]").val(userPhoneNumber);
                                $("#loan-against-otp .form-textbox-new").addClass('active onchange');
                                //$('#loan-against-otp .jsLoanAgainstSendOTP').trigger('click');
                                /*otp timer*/
                                $(".jsGetOTPSent").addClass("d-none");
                                $('.jsOnGetCall').addClass('d-none');
                                $('.jsGetOTPSent').addClass('d-none');
                                resetTimer()
                                /*otp timer*/
                            } else {
                                $('.loader').addClass('hide-loader');
                                $('body').removeClass('bg-loader');
                                //failure Popup
                                setTimeout(function () {
                                    $("#resend-otp-error").addClass("popover-show");
                                }, 80);

                                $("#resend-otp-error").css("display", "block");
                                $("body").addClass("popover-modal-open");
                                $("body").append('<div class="modal-backdrop"></div>');
                            }
                        } else {
                            $('.loader').addClass('hide-loader');
                            $('body').removeClass('bg-loader');
                            //failure Popup
                            setTimeout(function () {
                                $("#resend-otp-error").addClass("popover-show");
                            }, 80);

                            $("#resend-otp-error").css("display", "block");
                            $("body").addClass("popover-modal-open");
                            $("body").append('<div class="modal-backdrop"></div>');
                        }
                    }).catch(function (error) {
                        console.error(error);
                        $('.loader').addClass('hide-loader');
                        $('body').removeClass('bg-loader');
                        //failure Popup
                        setTimeout(function () {
                            $("#resend-otp-error").addClass("popover-show");
                        }, 80);

                        $("#resend-otp-error").css("display", "block");
                        $("body").addClass("popover-modal-open");
                        $("body").append('<div class="modal-backdrop"></div>');
                    });
                }

            });


            //OTP Loan aganist form keyup

            $('#loan-against-otp .input-textbox[data-type]').keyup(function () {
                var element = $(this);
                var ele_value = element.val();
                var ele_required = 'Field is required';
                var ele_phoneNumber = "Please enter valid number";

                $(this).next('.error-msgs').remove();
                $(this).after('<span class="error-msgs"style="top: 100%"></span>');
                $(this).parents('.form-group').addClass('error');
                if ($(element).val() != '') {
                    if ($(element).data('type') === 'otp-send-number') {
                        if (!validateMobile(element)) {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_phoneNumber);
                            $('.jsOTPInputBox').addClass('d-none');
                            $('.jsLoanAgainstSubmitOTP').addClass('d-none');
                            $('.jsLoanAgainstResendOTP').addClass('d-none');
                            $('.jsLoanAgainstSendOTP').removeClass('d-none');
                        } else {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');
                        }
                    }
                } else {
                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                    $(element).next('.error-msgs').text(ele_required);
                    $('.jsOTPInputBox').addClass('d-none');
                    $('.jsLoanAgainstSubmitOTP').addClass('d-none');
                    $('.jsLoanAgainstResendOTP').addClass('d-none');
                    $('.jsLoanAgainstSendOTP').removeClass('d-none');
                }
            });


            /*OTP Loan aganist form send*/
            $('#loan-against-otp .jsLoanAgainstSendOTP').click(function () {
                if(remainingTime !== 0){
                pauseTimerAndModal()
                }
                $('#loan-against-otp').find('.js-OtpBox .input-textbox').val('');
                var ele_input = $('#loan-against-otp').find('.form-textbox-new [data-type]:visible');
                var errors = [];
                allFilled = true;
                var ele_required = "Field is required";

                $(ele_input).each(function () {
                    var element = $(this);
                    var ele_value = element.val();
                    var ele_phoneNumber = "Please enter valid number";

                    $(element).parents('.form-textbox-new').find('.error-msgs').remove();
                    $(element).parents('.form-textbox-new').addClass('textboxerror');

                    if (element.is(":visible")) {
                        if (element.val() != '') {
                            $(element).after('<span class="error-msgs"style="top: 100%"></span>');

                            if ($(element).data('type') === 'otp-send-number') {
                                // console.log(element)
                                if (!validateMobile(element)) {
                                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                                    $(element).next('.error-msgs').text(ele_phoneNumber);
                                    errors.push(ele_phoneNumber)
                                } else {
                                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                                    $(element).next().text('');
                                }
                            }
                        } else {
                            $(element).after('<span class="error-msgs"style="top: 100%">' + ele_required + '</span>');
                            errors.push(ele_required);
                        }
                    }
                });

                if (errors.length == 0) {
                    mobilNumber = $('[data-type="otp-send-number"]').val();
                    $('#loan-against-otp .js-OtpBox .input-textbox').val("");
                    $('.loader').removeClass('hide-loader');
                    $('body').addClass('bg-loader');
                    var reqObj = {
                        "header": {
                            "authToken": "MTI4OjoxMDAwMDo6ZDBmN2I4MGNiODIyNWY2MWMyNzMzN2I3YmM0MmY0NmQ6OjZlZTdjYTcwNDkyMmZlOTE5MGVlMTFlZDNlYzQ2ZDVhOjpkdmJuR2t5QW5qUmV2OHV5UDdnVnEyQXdtL21HcUlCMUx2NVVYeG5lb2M0PQ==",
                            "identifier": "nli"
                        },
                        "body": {
                            "mobileNumber": mobilNumber
                        }
                    }
                    tsssLeadGenerateFilterObj.generateOtp(reqObj).then(function (response) {
                        if (response.response.responseJson.header.status.toLowerCase() == "success" && response.response.responseJson.body.retStatus.toLowerCase() == "success") {
                            if (response.response.responseJson.body.otpRefNo) {
                                otpRefNo = response.response.responseJson.body.otpRefNo;
                                $('.loader').addClass('hide-loader');
                                $('body').removeClass('bg-loader');
                                var enterotpText = 'Please enter the 4 digit OTP sent to your mobile number';
                                $('.jsOtpHeading').html(enterotpText);
                                $('.jsOTPInputBox').removeClass('d-none');
                                $('.jsLoanAgainstSendOTP').addClass('d-none');
                                $('.jsLoanAgainstSubmitOTP').removeClass('d-none');
                                $('.jsLoanAgainstResendOTP').removeClass('d-none');
                                $('#loan-against-otp').find('.js-OtpBox .input-textbox:first-child').focus();
                                /*otp timer*/
                                $('.jsOnGetCall').addClass('d-none');
                                $('.jsGetOTPSent').addClass('d-none')
                                resetTimer();
                                /*otp timer*/
                            } else {
                                if(remainingTime !== 0){
                                resumeTimer()
                                }
                                $('.loader').addClass('hide-loader');
                                $('body').removeClass('bg-loader');
                                //failure Popup
                                setTimeout(function () {
                                    $("#resend-otp-error").addClass("popover-show");
                                }, 80);

                                $("#resend-otp-error").css("display", "block");
                                $("body").addClass("popover-modal-open");
                                $("body").append('<div class="modal-backdrop"></div>');
                            }
                        } else {
                            if(remainingTime !== 0){
                            resumeTimer()
                            }
                            $('.loader').addClass('hide-loader');
                            $('body').removeClass('bg-loader');
                            //failure Popup
                            setTimeout(function () {
                                $("#resend-otp-error").addClass("popover-show");
                            }, 80);

                            $("#resend-otp-error").css("display", "block");
                            $("body").addClass("popover-modal-open");
                            $("body").append('<div class="modal-backdrop"></div>');
                        }
                    }).catch(function (error) {
                        if(remainingTime !== 0){
                        resumeTimer()
                        }
                        console.error(error);
                        $('.loader').addClass('hide-loader');
                        $('body').removeClass('bg-loader');
                        //failure Popup
                        setTimeout(function () {
                            $("#resend-otp-error").addClass("popover-show");
                        }, 80);

                        $("#resend-otp-error").css("display", "block");
                        $("body").addClass("popover-modal-open");
                        $("body").append('<div class="modal-backdrop"></div>');
                    });
                }

            });

            /*Loan aganist form otp keyup*/
            $("#loan-against-otp .js-OtpBox .input-textbox").keyup(function () {
                if (this.value.length == this.maxLength) {
                    $(this).next('.input-textbox').focus();
                    $(this).next('.input-textbox').removeClass('pointer-none');
                } else {
                    $(this).prev('.input-textbox').focus();
                    $(this).addClass('pointer-none');
                    $('#whatsapp-otp .input-textbox:first').removeClass('pointer-none');
                }

                var ele_input = $('.js-OtpBox .input-textbox');
                $(ele_input).each(function () {
                    if ($(this).val().length != 0) {
                        /* $(this).parents('#loan-against-otp').find('.jsLoanAgainstSubmitOTP').removeClass('btn-disabled');*/
                    } else {
                        /*$(this).parents('#loan-against-otp').find('.jsLoanAgainstSubmitOTP').addClass('btn-disabled');*/
                    }
                });
                $('.js-OtpBox .input-textbox:first-child').removeClass('pointer-none');
            })

            /*loan against otp resend*/
            $('#loan-against-otp .jsLoanAgainstResendOTP').click(function () {
                /* otp timer */
                if(remainingTime !== 0){
                pauseTimerAndModal()
                }
                $(".jsLoanAgainstResendOTP").addClass("d-none");
                $(".jsLoadingBtn").removeClass("d-none");
                $(".jsGetOTPSent").addClass("d-none");
                /* otp timer */
                // resend otp analytics END
                mobilNumber = $('[data-type="otp-send-number"]').val();
                $('#loan-against-otp .js-OtpBox .input-textbox').val("");
                $('.loader').removeClass('hide-loader');
                $('body').addClass('bg-loader');
                var reqObj = {
                    "header": {
                        "authToken": "MTI4OjoxMDAwMDo6ZDBmN2I4MGNiODIyNWY2MWMyNzMzN2I3YmM0MmY0NmQ6OjZlZTdjYTcwNDkyMmZlOTE5MGVlMTFlZDNlYzQ2ZDVhOjpkdmJuR2t5QW5qUmV2OHV5UDdnVnEyQXdtL21HcUlCMUx2NVVYeG5lb2M0PQ==",
                        "identifier": "nli"
                    },
                    "body": {
                        "mobileNumber": mobilNumber
                    }
                }
                tsssLeadGenerateFilterObj.generateOtp(reqObj).then(function (response) {
                    if (response.response.responseJson.header.status.toLowerCase() == "success" && response.response.responseJson.body.retStatus.toLowerCase() == "success") {
                        if(response.response.responseJson.body.otpRefNo){
                            otpRefNo = response.response.responseJson.body.otpRefNo;
                        $('.loader').addClass('hide-loader');
                        $('body').removeClass('bg-loader');
                        $(this).parents('#loan-against-otp').find('.js-OtpBox .input-textbox').val('');
                        $(this).parents('#loan-against-otp').find('.js-OtpBox .input-textbox:first-child').focus();
                        $(this).parents('#loan-against-otp').find('.js-OtpBox .input-textbox').addClass('pointer-none');
                        $(this).parents('#loan-against-otp').find('.js-OtpBox .input-textbox:first-child').removeClass('pointer-none');
                        $(this).parents('#loan-against-otp').find('.jsLoanAgainstSubmitOTP').addClass('btn-disabled');
                            /*otp timer */
                            $(".jsLoanAgainstResendOTP").removeClass("d-none");
                            $(".jsLoadingBtn").addClass("d-none");
                            $(".jsOnGetCall").addClass("d-none");
                            $('.otp-expired').addClass("d-none");
                            $("#otp-sent-modal").addClass("popover-show");
                            $("#otp-sent-modal").css("display", "block");
                            $('.otp-send-success').removeClass('d-none');
                            $('.otp-expired').addClass('d-none')
                            $('#otp-sent-modal .popover-modal-close').addClass('jsThanksModalClose');
                            $("body").addClass("popover-modal-open");
                            $("body").append('<div class="modal-backdrop"></div>');
                            /*otp timer */
                        }else{
                            $('.loader').addClass('hide-loader');
                            $('body').removeClass('bg-loader');
                            //failure popup
                            setTimeout(function () {
                                $("#resend-otp-error").addClass("popover-show");
                              }, 80);
                    
                              $("#resend-otp-error").css("display", "block");
                              $("body").addClass("popover-modal-open");
                              $("body").append('<div class="modal-backdrop"></div>');
                            /*otp timer */
                            if(remainingTime !== 0){
                            resumeTimer()
                            }
                            $(".jsLoanAgainstResendOTP").removeClass("d-none");
                            $(".jsLoadingBtn").addClass("d-none");
                            /*otp timer */
                        }
                    }else{
                        $('.loader').addClass('hide-loader');
                        $('body').removeClass('bg-loader');
                        //failure popup
                        setTimeout(function () {
                            $("#resend-otp-error").addClass("popover-show");
                          }, 80);
                
                          $("#resend-otp-error").css("display", "block");
                          $("body").addClass("popover-modal-open");
                          $("body").append('<div class="modal-backdrop"></div>');
                        /*otp timer */
                        if(remainingTime !== 0){
                        resumeTimer()
                        }
                        $(".jsLoanAgainstResendOTP").removeClass("d-none");
                        $(".jsLoadingBtn").addClass("d-none");
                        /*otp timer */
                    }
                }).catch(function (error) {
                    console.error(error);
                    $('.loader').addClass('hide-loader');
                    $('body').removeClass('bg-loader');
                    //failure popup
                    setTimeout(function () {
                        $("#resend-otp-error").addClass("popover-show");
                      }, 80);
            
                      $("#resend-otp-error").css("display", "block");
                      $("body").addClass("popover-modal-open");
                      $("body").append('<div class="modal-backdrop"></div>');
                    /*otp timer */
                    if(remainingTime !== 0){
                    resumeTimer()
                    }
                    $(".jsLoanAgainstResendOTP").removeClass("d-none");
                    $(".jsLoadingBtn").addClass("d-none");
                    /*otp timer */
                });
            });

            /*loan against otp msg close*/
            $('.jsCloseLaonAgainstMgs').click(function () {
                $('.jsMsgLoanAgainst').addClass('d-none');
                // $("#loan-against-otp .input-textbox[data-type=otp-send-number]").val('');
                $('#loan-against-otp').find('.js-OtpBox .input-textbox').val('');
                $('.jsOTPInputBox').addClass('d-none');
                $('#loan-against-otp').find('.jsLoanAgainstSubmitOTP').addClass('d-none');
                $('#loan-against-otp').find('.jsLoanAgainstSendOTP').removeClass('d-none');
                $('#loan-against-otp').find('.jsLoanAgainstResendOTP').addClass('d-none');
                $('.loan-againstclose-btn').addClass('d-none');
                $('.clear-btn').removeClass('d-none');
                $('.loan-against-form').removeClass('d-none');
                $('.loan-against-otp-wrap').addClass('d-none');
                $('.form-bottom-right-img').removeClass('d-none');
                clearCompleteForm();
            });


            /*loan against otp msg try again*/
            $('.jsLoanAgainstTryAgain').click(function () {
                mobilNumber = $('[data-type="otp-send-number"]').val();
                $('#loan-against-otp .js-OtpBox .input-textbox').val("");
                $('.loader').removeClass('hide-loader');
                $('body').addClass('bg-loader');
                var reqObj = {
                    "header": {
                        "authToken": "MTI4OjoxMDAwMDo6ZDBmN2I4MGNiODIyNWY2MWMyNzMzN2I3YmM0MmY0NmQ6OjZlZTdjYTcwNDkyMmZlOTE5MGVlMTFlZDNlYzQ2ZDVhOjpkdmJuR2t5QW5qUmV2OHV5UDdnVnEyQXdtL21HcUlCMUx2NVVYeG5lb2M0PQ==",
                        "identifier":"nli"
                    },
                    "body": {
                        "mobileNumber": mobilNumber
                    }
                }
                tsssLeadGenerateFilterObj.generateOtp(reqObj).then(function (response) {
                    if (response.response.responseJson.header.status.toLowerCase() == "success" && response.response.responseJson.body.retStatus.toLowerCase() == "success") {
                        if(response.response.responseJson.body.otpRefNo){
                            otpRefNo = response.response.responseJson.body.otpRefNo;
                        $('.loader').addClass('hide-loader');
                        $('body').removeClass('bg-loader');
                            /*14-1-2023*/ 
                $('#loan-against-otp').removeClass('d-none');
                /*14-1-2023*/ 
                $('.jsMsgLoanAgainst').addClass('d-none');
                /*$(this).parents('#loan-against-otp').find('.jsLoanAgainstSubmitOTP').addClass('btn-disabled');*/
                $('#loan-against-otp').find('.js-OtpBox .input-textbox').val('');
                $('#loan-against-otp').find('.js-OtpBox .input-textbox:first-child').focus();
                /*$('#loan-against-otp').find('.jsLoanAgainstSubmitOTP').addClass('btn-disabled');*/
                resetTimer();
                $('.form-bottom-right-img').removeClass('d-none');
                        }else{
                            $('.loader').addClass('hide-loader');
                            $('body').removeClass('bg-loader');
                            //failure popup
                            setTimeout(function () {
                                $("#resend-otp-error").addClass("popover-show");
                              }, 80);
                    
                              $("#resend-otp-error").css("display", "block");
                              $("body").addClass("popover-modal-open");
                              $("body").append('<div class="modal-backdrop"></div>');
                        }
                    }else{
                        $('.loader').addClass('hide-loader');
                        $('body').removeClass('bg-loader');
                        //failure popup
                        setTimeout(function () {
                            $("#resend-otp-error").addClass("popover-show");
                          }, 80);
                
                          $("#resend-otp-error").css("display", "block");
                          $("body").addClass("popover-modal-open");
                          $("body").append('<div class="modal-backdrop"></div>');
                    }
                }).catch(function (error) {
                    console.error(error);
                    $('.loader').addClass('hide-loader');
                    $('body').removeClass('bg-loader');
                    //failure popup
                    setTimeout(function () {
                        $("#resend-otp-error").addClass("popover-show");
                      }, 80);
            
                      $("#resend-otp-error").css("display", "block");
                      $("body").addClass("popover-modal-open");
                      $("body").append('<div class="modal-backdrop"></div>');
                });
            });

            /*loan against otp submit*/
            $('#loan-against-otp .jsLoanAgainstSubmitOTP').click(function () {
                if(remainingTime !== 0){
                pauseTimerAndModal();
                }
                $('.form-bottom-right-img').addClass('d-none');
                var values = []
                $('#loan-against-otp .js-OtpBox .input-textbox').each(function (i, ele) {
                    values.push(ele.value)
                });
                $('body').addClass('bg-loader');
                $('.loader').removeClass('hide-loader');
                var reqObj = {
                    "header": {
                        "authToken": "MTI4OjoxMDAwMDo6ZDBmN2I4MGNiODIyNWY2MWMyNzMzN2I3YmM0MmY0NmQ6OjZlZTdjYTcwNDkyMmZlOTE5MGVlMTFlZDNlYzQ2ZDVhOjpkdmJuR2t5QW5qUmV2OHV5UDdnVnEyQXdtL21HcUlCMUx2NVVYeG5lb2M0PQ==",
                        "identifier": "nli"
                    },
                    "body": {
                        "otpRefNo": otpRefNo,
                        "otp": values.join("")
                    }
                }
                tsssLeadGenerateFilterObj.verifyOtp(reqObj).then(function (response) {
                    if (response.response.responseJson.header.status.toLowerCase() == 'success' && response.response.responseJson.body.retStatus.toLowerCase() == 'success') {
                        tsssObj.body.mobileNumber = mobilNumber
                        //var formdat = formdata(".loan-against-property");
                        tsssLeadGenerateFilterObj.tsssLeadGenerate(tsssObj).then(function (response) {
                            if (response.response.responseJson.header.status.toLowerCase() == "success") {
                                if (response.response.responseJson.body && response.response.responseJson.body.Status.toLowerCase() == 'success') {
                                    destroyOtpTimer();
                                    var sbiResponseLead = JSON.parse(response.response.responseJson.body.SBIResponse);
                                    $('#loan-against-otp').addClass('d-none');
                                    $('.jsSuccessOTPVarification').removeClass('d-none');
                                    mogoSound();
                                    if (sbiResponseLead.retStatus.toLowerCase()) {
                                        if ((sbiResponseLead.SubmitQDEResponse.qdeDetailResponse.statusCode == "FFMP" || sbiResponseLead.SubmitQDEResponse.qdeDetailResponse.statusCode == "QDCR") && sbiResponseLead.SubmitQDEResponse.qdeDetailResponse.leadRefNo) {
                                            emailApiCall("Tata Cards Eligible", name, cardType, "Hi! You Are Now One Step Closer to availing " + cardType, toEmails, response);
                                        } else if (sbiResponseLead.SubmitQDEResponse.qdeDetailResponse.duplicateUUID && ((sbiResponseLead.SubmitQDEResponse.qdeDetailResponse.duplicateUUID.statusCode == "QDCR" || sbiResponseLead.SubmitQDEResponse.qdeDetailResponse.duplicateUUID.statusCode == "FFMP") && sbiResponseLead.SubmitQDEResponse.qdeDetailResponse.duplicateUUID.leadRefNo)) {
                                            emailApiCall("Tata Cards Eligible", name, cardType, "Hi! You Are Now One Step Closer to availing " + cardType, toEmails, response);
                                        } else if (sbiResponseLead.SubmitQDEResponse.qdeDetailResponse.statusCode == "FD") {
                                            emailApiCall("Tata Cards Non Eligible", name, cardType, "THANK YOU FOR SHOWING INTEREST IN " + cardType, toEmails, response);
                                        } else if (sbiResponseLead.SubmitQDEResponse.qdeDetailResponse.duplicateUUID && (sbiResponseLead.SubmitQDEResponse.qdeDetailResponse.duplicateUUID.statusCode == "FD")) {
                                            emailApiCall("Tata Cards Non Eligible", name, cardType, "THANK YOU FOR SHOWING INTEREST IN " + cardType, toEmails, response);
                                        } else {
                                            $('.loader').addClass('hide-loader');
                                            $('body').removeClass('bg-loader');
                                            /*14-1-2023*/
                                            $('#loan-against-otp').addClass('d-none');
                                            $('.jsSuccessOTPVarification').addClass('d-none');
                                            $('.jsFailureLead').removeClass('d-none');
                                            /*14-1-2023*/
                                            $('#leadIdTextFail').html('Thank you for applying for Tata Cards.');
                                            $('.fail .text16i').html(' We are currently facing a technical issue and are working on the same. You may get in touch with your Relationship Manager to help completing your application or write to us at <a href="wealth@tatacapital.com" target="_blank">wealth@tatacapital.com</a>');
                                        }
                                    } else {
                                        $('.loader').addClass('hide-loader');
                                        $('body').removeClass('bg-loader');
                                        /*14-1-2023*/
                                        $('.jsSuccessOTPVarification').addClass('d-none');
                                        $('#loan-against-otp').addClass('d-none');
                                        $('.jsFailureLead').removeClass('d-none');
                                        /*14-1-2023*/
                                        $('#leadIdTextFail').html('Thank you for applying for Tata Cards.');
                                        $('.fail .text16i').html(' We are currently facing a technical issue and are working on the same. You may get in touch with your Relationship Manager to help completing your application or write to us at <a href="wealth@tatacapital.com" target="_blank">wealth@tatacapital.com</a>');
                                    }
                                } else {
                                    if(remainingTime !== 0){
                                    resumeTimer();
                                    }
                                    $('.loader').addClass('hide-loader');
                                    $('body').removeClass('bg-loader');
                                    //failure popup
                                    setTimeout(function () {
                                        $("#failure-modal").addClass("popover-show");
                                    }, 80);

                                    $("#failure-modal").css("display", "block");
                                    $("body").addClass("popover-modal-open");
                                    $("body").append('<div class="modal-backdrop"></div>');
                                }
                            } else {
                                if(remainingTime !== 0){
                                resumeTimer();
                                }
                                $('.loader').addClass('hide-loader');
                                $('body').removeClass('bg-loader');
                                //failure popup
                                setTimeout(function () {
                                    $("#failure-modal").addClass("popover-show");
                                }, 80);

                                $("#failure-modal").css("display", "block");
                                $("body").addClass("popover-modal-open");
                                $("body").append('<div class="modal-backdrop"></div>');
                            }
                        }).catch(function (error) {
                            if(remainingTime !== 0){
                            resumeTimer();
                            }
                            console.error(error);
                            $('.loader').addClass('hide-loader');
                            $('body').removeClass('bg-loader');
                            //failure popup
                            setTimeout(function () {
                                $("#failure-modal").addClass("popover-show");
                            }, 80);

                            $("#failure-modal").css("display", "block");
                            $("body").addClass("popover-modal-open");
                            $("body").append('<div class="modal-backdrop"></div>');
                        });


                    } else if (response.response.responseJson.header.status.toLowerCase() == 'failure' && response.response.responseJson.errorBody.errorMessage && response.response.responseJson.errorBody.errorMessage.toLowerCase() == 'otp has expired!') {
                        if(remainingTime !== 0){
                        resumeTimer();
                        }
                        $('.loader').addClass('hide-loader');
                        $('body').removeClass('bg-loader');
                        $("#not-receive-otp-modal").removeClass("popover-show");
                        $("#not-receive-otp-modal").css("display", "none");
                        $("#otp-sent-modal").addClass("popover-show");
                        $("#otp-sent-modal").css("display", "block");
                        $('.otp-send-success').addClass('d-none')
                        $('.otp-expired').removeClass('d-none')
                        $('#otp-sent-modal .popover-modal-close').removeClass('jsThanksModalClose');
                        $("body").addClass("popover-modal-open");
                        $("body").append('<div class="modal-backdrop"></div>');

                    } else {
                        if (response.response.responseJson.errorBody.statusCode == "403") {
                            var errorBody = JSON.parse(response.response.responseJson.errorBody.message);
                            if (errorBody.retStatus.toLowerCase() == "failure" && errorBody.sysErrorCode == "ERROTP201") {
                                destroyOtpTimer();
                                $('.loader').addClass('hide-loader');
                                $('body').removeClass('bg-loader');
                                /*14-1-2023*/
                                $('#loan-against-otp').addClass('d-none');
                                /*14-1-2023*/
                                $('.jsFailOTPVarification').removeClass('d-none');
                                $('.lead-forms .main-title').addClass('d-none')
                            } else {
                                if(remainingTime !== 0){
                                resumeTimer();
                                }
                                $('.loader').addClass('hide-loader');
                                $('body').removeClass('bg-loader');
                                //failure Popup
                                setTimeout(function () {
                                    $("#failure-modal").addClass("popover-show");
                                }, 80);

                                $("#failure-modal").css("display", "block");
                                $("body").addClass("popover-modal-open");
                                $("body").append('<div class="modal-backdrop"></div>');
                            }
                        } else {
                            if(remainingTime !== 0){
                            resumeTimer();
                            }
                            $('.loader').addClass('hide-loader');
                            $('body').removeClass('bg-loader');
                            //failure Popup
                            setTimeout(function () {
                                $("#failure-modal").addClass("popover-show");
                            }, 80);

                            $("#failure-modal").css("display", "block");
                            $("body").addClass("popover-modal-open");
                            $("body").append('<div class="modal-backdrop"></div>');
                        }
                    }
                }).catch(function (error) {
                    if(remainingTime !== 0){
                    resumeTimer();
                    }
                    $('.loader').addClass('hide-loader');
                    $('body').removeClass('bg-loader');
                    //failure Popup
                    setTimeout(function () {
                        $("#failure-modal").addClass("popover-show");
                    }, 80);

                    $("#failure-modal").css("display", "block");
                    $("body").addClass("popover-modal-open");
                    $("body").append('<div class="modal-backdrop"></div>');
                });
            })

            //Otp details close button
            $('.jsCloseOtpDetails').click(function () {
                $('.loan-against-form').removeClass('d-none');
                $('.loan-against-otp-wrap').addClass('d-none');
                $('.loan-againstclose-btn').addClass('d-none');
                $('.clear-btn').removeClass('d-none');
                clearCompleteForm()
            })

            $('#error-resend-otp').click(function(e){
                $('.loader').removeClass('hide-loader');
                                $('body').addClass('bg-loader');
                                //mobilNumber = getWhatsappNub;
                                var reqObj = {
                                    "header": {
                                        "authToken": "MTI4OjoxMDAwMDo6ZDBmN2I4MGNiODIyNWY2MWMyNzMzN2I3YmM0MmY0NmQ6OjZlZTdjYTcwNDkyMmZlOTE5MGVlMTFlZDNlYzQ2ZDVhOjpkdmJuR2t5QW5qUmV2OHV5UDdnVnEyQXdtL21HcUlCMUx2NVVYeG5lb2M0PQ==",
                                        "identifier": "nli"
                                    },
                                    "body": {
                                        "mobileNumber": mobilNumber
                                    }
                                }
                                tsssLeadGenerateFilterObj.generateOtp(reqObj).then(function (response) {
                                    if (response.response.responseJson.header.status.toLowerCase() == "success" && response.response.responseJson.body.retStatus.toLowerCase() == "success") {
                                        if(response.response.responseJson.body.otpRefNo){
            
                                            otpRefNo = response.response.responseJson.body.otpRefNo;                                
                                            $('.loader').addClass('hide-loader');
                                            $('body').removeClass('bg-loader');
                                            $("#resend-otp-error").removeClass("popover-show");
                                            $("#resend-otp-error").css("display", "none");
                                            $("body").removeClass("popover-modal-open");
                                            $("body").find(".modal-backdrop").removeClass('modal-backdrop')
                                            $('.loan-against-form').addClass('d-none')
                                            $('.loan-against-otp-wrap').removeClass('d-none')
                                            $('.loan-againstclose-btn').removeClass('d-none')
                                            $('.clear-btn').addClass('d-none')
                                            $("#loan-against-otp .input-textbox[data-type=otp-send-number]").val(userPhoneNumber);
                                            $("#loan-against-otp .form-textbox-new").addClass('active onchange');
                                            //$('#loan-against-otp .jsLoanAgainstSendOTP').trigger('click');
                                            $('.jsOTPInputBox').removeClass('d-none');
                                            $('.jsLoanAgainstSendOTP').addClass('d-none');
                                            $('.jsLoanAgainstSubmitOTP').removeClass('d-none');
                                            $('.jsLoanAgainstResendOTP').removeClass('d-none');
                                            $('#loan-against-otp').find('.js-OtpBox .input-textbox:first-child').focus();
                                            /*otp timer*/
                                            $(".jsGetOTPSent").addClass("d-none");
                                            resetTimer();
                                            $('.jsModalOnGetCall').removeClass("d-none")
                                            /*otp timer*/
                                        }else{
                                            $('.loader').addClass('hide-loader');
                                            $('body').removeClass('bg-loader');
                                            //failure Popup
                                            setTimeout(function () {
                                                $("#resend-otp-error").addClass("popover-show");
                                              }, 80);
                                    
                                              $("#resend-otp-error").css("display", "block");
                                              $("body").addClass("popover-modal-open");
                                              $("body").append('<div class="modal-backdrop"></div>');
                                        }
                                    }else{
                                        $('.loader').addClass('hide-loader');
                                        $('body').removeClass('bg-loader');
                                        //failure Popup
                                        setTimeout(function () {
                                            $("#resend-otp-error").addClass("popover-show");
                                          }, 80);
                                
                                          $("#resend-otp-error").css("display", "block");
                                          $("body").addClass("popover-modal-open");
                                          $("body").append('<div class="modal-backdrop"></div>');
                                    }
                                }).catch(function (error) {
                                    console.error(error);
                                    $('.loader').addClass('hide-loader');
                                    $('body').removeClass('bg-loader');
                                     //failure Popup
                                     setTimeout(function () {
                                        $("#resend-otp-error").addClass("popover-show");
                                      }, 80);
                            
                                      $("#resend-otp-error").css("display", "block");
                                      $("body").addClass("popover-modal-open");
                                      $("body").append('<div class="modal-backdrop"></div>');
                                });
            })

            //Date input format
            $(".date-input").keyup(function () {
                var enteredValue = this.value;
                enteredValue = enteredValue.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
                this.value = enteredValue;
                var matches = enteredValue.match(/\d{1,8}/g);
                var match = matches && matches[0] || ''
                var parts = [];
                var i = 0;
                while (i < match.length) {
                    if (i < 4) {
                        parts.push(match.substring(i, i + 2));
                        i += 2
                    } else {
                        parts.push(match.substring(i, i + 4));
                        i += 4
                    }
                }
                if (parts.length) {
                    this.value = parts.join('-')
                }
            });

            $('.price-with-comma').keyup(function () {
                if ($(this).val() != "") {
                    var rupeeValue = parseFloat($(this).val().replace(/,/g, ''));
                    commaSeparatedValue = rupeeValue.toLocaleString('en-IN');
                    $(this).val(commaSeparatedValue);
                }
            });

            /*Agree checkbox */

            $('#iAgreeTerms').on('change', function () {
                var checkRequired = 'Please confirm checkbox';
                $(this).parents().find('.custom-checkbox-label').next('.error-msgs').remove();
                $(this).parents().find('.custom-checkbox-label').after('<span class="error-msgs" style="top: calc(100% - 20px)"></span>');
                isCheckboxChecked = $(this).is(':checked');
                console.log(isCheckboxChecked)
                if (isCheckboxChecked === true) {
                    $(this).removeClass('jsValueOK');
                } else {
                    $(this).addClass('jsValueOK');
                    $(this).parents().find('.custom-checkbox-label').next('.error-msgs').text(checkRequired);
                }

                feildsCount = $('#loan-against-property .jsValueOK:visible').length
                console.log(feildsCount);
                if (feildsCount === 0) {
                    /* $('.jsApplyLoanAgainstProp').removeClass('btn-disabled');*/
                } else {
                    /*$('.jsApplyLoanAgainstProp').addClass('btn-disabled');*/
                }
            })


            //Select 2 on change remove error state
            $('.js-select2').change(function () {
                $(this).parents('.form-textbox-new').removeClass('textboxerror');
                $(this).next('.error-msgs').remove();
                $(this).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                $(this).removeClass('jsValueOK')
                var selectedval = $(this).val();

                feildsCount = $('#loan-against-property .jsValueOK:visible').length
                console.log(feildsCount);
                if (feildsCount === 0) {
                    /*$('.jsApplyLoanAgainstProp').removeClass('btn-disabled');*/
                } else {
                    /* $('.jsApplyLoanAgainstProp').addClass('btn-disabled');*/
                }
            })

            $(".js-select-nosearch").select2({
                minimumResultsForSearch: Infinity
            });

            //Focus open select 2 dropdown
            $(document).on('focus', '.select2.select2-container', function (e) {
                if (e.originalEvent && $(this).find(".select2-selection--single").length > 0) {
                    $(this).siblings('select').select2('open');
                }
            });
            /*focus on custom dropdown*/
            $(document).on('focus', '[data-multiselect]', function (e) {
                if (e.originalEvent && $(this).parents('.new-custom-drops').length > 0) {
                    $(this).addClass('active');
                    $(this).parents('.new-custom-drops').addClass('show');
                    $(this).parents('.new-custom-drops').find('.jsMultiDropdown').addClass('show');
                    $(this).parents('.new-custom-drops').find('.js-searchInput').focus();
                }
            });

            /*otp timer*/
            if ($('#tsssLeadForm').length > 0) {
                $(".jsOnGetCallButton").click(function () {
                    $('#not-receive-otp-modal').removeClass("popover-show");
                    $('#not-receive-otp-modal').css("display", "none");
                    $("body").removeClass("popover-modal-open");
                    $('.modal-backdrop').remove();
                    $(".jsGetCalling .semibold").html("+91 " + mobilNumber);
                    $(".jsGetCalling").removeClass("d-none");
                    $('.jsOnGetCall').addClass("d-none");
                    var reqObj = {
                        "header": {
                            "authToken": "MTI4OjoxMDAwMDo6ZDBmN2I4MGNiODIyNWY2MWMyNzMzN2I3YmM0MmY0NmQ6OjZlZTdjYTcwNDkyMmZlOTE5MGVlMTFlZDNlYzQ2ZDVhOjpkdmJuR2t5QW5qUmV2OHV5UDdnVnEyQXdtL21HcUlCMUx2NVVYeG5lb2M0PQ==",
                            "identifier": "nli"
                        },
                        "body": {
                            "mobileNumber": mobilNumber,
                            "otpRefNo": otpRefNo,
                        }
                    }
                    tsssLeadGenerateFilterObj.onCallOtp(reqObj).then(function (response) {
                        if (response.response.responseJson.header.status.toLowerCase() == 'success' && response.response.responseJson.body.status.toLowerCase() == 'success') {
                            $(".jsModalOnGetCall").parents(".popover-modal").removeClass("popover-show");
                            $(".jsModalOnGetCall").parents(".popover-modal").removeAttr("style");
                            $(".height-scroll").removeAttr("style");
                            $("body").removeClass("popover-modal-open");
                            $(".modal-backdrop").remove();
                            setTimeout(() => {
                                $(".jsGetCalling").addClass("d-none");
                                $(".jsGetOTPSent").removeClass("d-none");
                                $('.jsOnGetCallButton').addClass("d-none")
                            }, 4000);

                        } else if (response.response.responseJson.header.status.toLowerCase() == 'failure' && response.response.responseJson.errorBody.message.toLowerCase() == 'otp expired') {
                            $('.loader').addClass('hide-loader');
                            $('body').removeClass('bg-loader');
                            $("#not-receive-otp-modal").removeClass("popover-show");
                            $("#not-receive-otp-modal").css("display", "none");
                            $("#otp-sent-modal").addClass("popover-show");
                            $("#otp-sent-modal").css("display", "block");
                            $('.otp-send-success').addClass('d-none')
                            $('.otp-expired').removeClass('d-none')
                            $('#otp-sent-modal .popover-modal-close').removeClass('jsThanksModalClose');
                            $(".jsOnGetCall").removeClass("d-none");
                            $('.jsGetCalling').addClass('d-none');
                            $("body").addClass("popover-modal-open");
                            $("body").append('<div class="modal-backdrop"></div>');

                        } else {

                            $('.loader').addClass('hide-loader');
                            $('body').removeClass('bg-loader');
                            $(".jsModalOnGetCall").parents(".popover-modal").removeClass("popover-show");
                            $(".jsModalOnGetCall").parents(".popover-modal").removeAttr("style");
                            $(".height-scroll").removeAttr("style");
                            $("body").removeClass("popover-modal-open");
                            //failure Popup
                            setTimeout(function () {
                                $("#failure-modal").addClass("popover-show");
                            }, 80);

                            $("#failure-modal").css("display", "block");
                            $("body").addClass("popover-modal-open");
                            $("body").append('<div class="modal-backdrop"></div>');
                            $(".jsOnGetCall").removeClass("d-none");
                            $('.jsGetCalling').addClass('d-none');

                        }
                    }).catch(function (error) {
                        $('.loader').addClass('hide-loader');
                        $('body').removeClass('bg-loader');
                        $(".jsModalOnGetCall").parents(".popover-modal").removeClass("popover-show");
                        $(".jsModalOnGetCall").parents(".popover-modal").removeAttr("style");
                        $(".height-scroll").removeAttr("style");
                        $("body").removeClass("popover-modal-open");
                        //failure Popup
                        setTimeout(function () {
                            $("#failure-modal").addClass("popover-show");
                        }, 80);
                        $("#failure-modal").css("display", "block");
                        $("body").addClass("popover-modal-open");
                        $("body").append('<div class="modal-backdrop"></div>');
                        $(".jsOnGetCall").removeClass("d-none");
                        $('.jsGetCalling').addClass('d-none');
                    });
                });
            }
            /*otp timer*/

        })

        //Global
        var dateReg = /(((0[1-9]|[12][0-9]|3[01])([-./])(0[13578]|10|12)([-./])(\d{4}))|(([0][1-9]|[12][0-9]|30)([-./])(0[469]|11)([-./])(\d{4}))|((0[1-9]|1[0-9]|2[0-8])([-./])(02)([-./])(\d{4}))|((29)(\.|-|\/)(02)([-./])([02468][048]00))|((29)([-./])(02)([-./])([13579][26]00))|((29)([-./])(02)([-./])([0-9][0-9][0][48]))|((29)([-./])(02)([-./])([0-9][0-9][2468][048]))|((29)([-./])(02)([-./])([0-9][0-9][13579][26])))/;

        function dateWithoutTime(dateNoTime) {
            // body...
            var month = dateNoTime.getUTCMonth() + 1; //months from 1-12
            var day = dateNoTime.getUTCDate();
            var year = dateNoTime.getUTCFullYear();
            dateNoTime = month + "/" + day + "/" + year;

            return dateNoTime;
        }

        function checkDate(date) {
            if (date == "") {

                return false;
            } else if (!date.match(dateReg)) {

                return false;
            } else {
                var today = new Date();

                var overAge = parseInt(today.getFullYear() - 60);
                var underAge = parseInt(today.getFullYear() - 18);
                // console.log(underAge, overAge)
                today = dateWithoutTime(today);
                var todayDate = new Date(today);
                date = date.toString();
                var custDate = date.substring(0, 2);
                var custMonth = date.substring(3, 5);
                var custYear = date.substring(6, 11);

                var appdate = custMonth + "/" + custDate + "/" + custYear;

                var updateAppDate = new Date(appdate);

                custYear = parseInt(custYear);
                custMonth = parseInt(custMonth);
                custDate = parseInt(custDate);

                if (custYear <= underAge && custYear >= overAge) {
                    if (custYear == underAge || custYear == overAge) {
                        if (custMonth <= parseInt(todayDate.getMonth())) {
                            return true;
                        } else {
                            return false;
                        }
                        return true;
                    }
                    return true;
                } else {

                    return false;
                }

                if (todayDate <= updateAppDate) {

                    return false;
                } else {
                    return true;
                }
            }
        }

        function clearCompleteForm() {
            /*$('.jsApplyLoanAgainstProp').addClass('btn-disabled');*/
            $('#loan-against-property .input-textbox[data-type]').addClass('jsValueOK')
            $('#loan-against-property .input-textbox[data-type]').val('');
            $('#loan-against-property .form-textbox-new').removeClass('active onchange');
            $('#loan-against-property .form-textbox-new .textbox-inner').removeClass('has-rupee-icon');
            $('#loan-against-property .form-textbox-new .text-infos').removeClass('hide-input-note');
            $('#loan-against-property .form-textbox-new .icon-rupee').addClass('d-none');
            $('#loan-against-property .form-textbox-new.new-custom-drops').addClass('active');

            $('[data-occupation="salaried"] [data-multiselect]').text("Select");
            $('[data-occupation="degsnation"] [data-multiselect]').text("Select");
            $('[data-occupation]').addClass('hidden');
            $('[data-occupation="self-employed"]').removeClass('hidden');
            $('[data-occupation="degsnation-list"]').removeClass('hidden');

            $('.js-select2').each(function () {
                $('.js-select2').parents('.form-textbox-new').removeClass('textboxerror');
                $('.js-select2').parents('.form-textbox-new').addClass('active');
                $('.js-select2').next('.error-msgs').remove();
                $('.js-select2').val(null).trigger('change');
                $('.js-select2').addClass('jsValueOK')
            });

            $('#loan-against-property .input-textbox[data-type]').parents('.form-textbox-new').removeClass('textboxerror');
            $('#loan-against-property .input-textbox[data-type]').next().text('');

            $('#iAgreeTerms').prop('checked', true);
            $('#iAgreeTerms').parents('.la-agree-btn').next('.error-msgs').remove();

        }


        $(document).click(function (e) {
            if ($($('[data-occupation="salaried"] [data-multiselect]').text() === "Select")) {
                $('#searchCompanyList li').removeAttr('style');
                $('#searchCompany').val('');
            }
            $('#searchCompany').click(function (e) {
                e.stopPropagation();
            })
            $('.jstext input').blur(function () {
                if ($('.jstext input').val() == '') {
                    $('[data-occupation="salaried-list"]').addClass('hidden');
                    $('[data-occupation="salaried"]').removeClass('hidden');
                    $('#searchCompanyList li').removeAttr('style');
                }
            })


            if ($($('[data-occupation="degsnation"] [data-multiselect]').text() === "Select")) {
                $('#searchDesiganationList li').removeAttr('style');
                $('#searchdesiganation').val('');
            }
            $('#searchdesiganation').click(function (e) {
                e.stopPropagation();
            })
            $('.jstext2 input').blur(function () {
                if ($('.jstext2 input').val() == '') {
                    $('[data-occupation="degsnation-list"]').addClass('hidden');
                    $('[data-occupation="degsnation"]').removeClass('hidden');
                    $('#searchCompanyList li').removeAttr('style');
                }
            })
        });

        function emailApiCall(template, name, cardType, subject, toEmails, response) {
            var reqObj = {
                "header": {},
                "body": {
                    "toEmails": toEmails,
                    "templateName": template,
                    "subject": subject,
                    "templateDetails": {
                        "custName": name,
                        "cardType": cardType
                    }
                }
            }
            tsssLeadGenerateFilterObj.tsssEmail(reqObj).then(function (responseEmail) {
                if (response.response.responseJson.body.SBIResponse) {
                    $('.loader').addClass('hide-loader');
                    $('body').removeClass('bg-loader');
                    var sbiResponseLead = JSON.parse(response.response.responseJson.body.SBIResponse)
                    if (sbiResponseLead.SubmitQDEResponse.qdeDetailResponse.leadRefNo) {
                        if (sbiResponseLead.SubmitQDEResponse.qdeDetailResponse.statusCode == "QDCR") {
                            $('#leadIdText').html('Thank you for submitting your application for Tata Cards.');
                            $('#leadId').html('Your application reference number is <span id="idSpace">' + sbiResponseLead.SubmitQDEResponse.qdeDetailResponse.leadRefNo + '</span>');
                            $('.success-inner .text16i').html('You will receive a call in case your application is eligible for further processing.');
                        } else if (sbiResponseLead.SubmitQDEResponse.qdeDetailResponse.statusCode == "FFMP") {
                            $('#leadIdText').html('Thank you for submitting your application for Tata Cards via Tata Capital Wealth.');
                            $('#leadId').html('Your application reference number is <span id="idSpace">' + sbiResponseLead.SubmitQDEResponse.qdeDetailResponse.leadRefNo + '</span>');
                            $('.success-inner .text16i').html('You shall receive a call within 48 working hours for further processing.');
                        } else {
                            $('#leadIdText').html('Thank you for submitting your application for Tata Cards.');
                            $('#leadId').html('');
                            $('.success-inner .text16i').html(' It is under review. You will receive a call in case your application is eligible for further processing.');
                        }
                    } else if (sbiResponseLead.SubmitQDEResponse.qdeDetailResponse.duplicateUUID.leadRefNo) {
                        if (sbiResponseLead.SubmitQDEResponse.qdeDetailResponse.duplicateUUID.statusCode == "QDCR") {
                            $('#leadIdText').html('Thank you for submitting your application for Tata Cards.');
                            $('#leadId').html('Your application reference number is <span id="idSpace">' + sbiResponseLead.SubmitQDEResponse.qdeDetailResponse.leadRefNo + '</span>');
                            $('.success-inner .text16i').html('You will receive a call in case your application is eligible for further processing.');
                        } else if (sbiResponseLead.SubmitQDEResponse.qdeDetailResponse.duplicateUUID.statusCode == "FFMP") {
                            $('#leadIdText').html('Thank you for submitting your application for Tata Cards via Tata Capital Wealth.');
                            $('#leadId').html('Your application reference number is <span id="idSpace">' + sbiResponseLead.SubmitQDEResponse.qdeDetailResponse.duplicateUUID.leadRefNo + '</span>');
                            $('.success-inner .text16i').html('You shall receive a call within 48 working hours for further processing.');
                        } else {
                            $('#leadIdText').html('Thank you for submitting your application for Tata Cards.');
                            $('#leadId').html('');
                            $('.success-inner .text16i').html('It is under review. You will receive a call in case your application is eligible for further processing.');
                        }
                    }
                    else {
                        $('.popup-like').addClass('displayNonePopup');
                        $('#leadIdPara').html('Thank you for submitting your application for Tata Cards.');
                        $('#leadId').html('');
                        $('#leadIdQDCR').html('It is under review. You will receive a call in case your application is eligible for further processing.');
                    }
                } else {
                    $('#leadIdText').html('Thank you for submitting your application for Tata Cards.');
                    $('#leadId').html('');
                    $('.success-inner .text16i').html('It is under review. You will receive a call in case your application is eligible for further processing.');
                }

            })
        }

        function getURLParams(url) {
            var queryParams = {};
            try {
                url = url ? url : window.location.search;
                url.split("?")[1].split("&").forEach(function (pair) {
                    var key = pair.split("=")[0];
                    var val = pair.split("=")[1];
                    queryParams[key] = val;
                });
            }
            catch (err) { return "" }
            return queryParams;
        }

        return jsHelper.freezeObj(tsssLeadGenerateBizObj);
    })(jsHelper);

    _global.jsHelper.defineReadOnlyObjProp(_global, "tsssLeadGenerateBizObj", tsssLeadGenerateBizCallFn);
})(this || window || {});
function mogoSound(){
    var sound = new Audio('/content/dam/tata-capital-web/assets/audio/mogo-sound.mp3');
    sound.play();
  }