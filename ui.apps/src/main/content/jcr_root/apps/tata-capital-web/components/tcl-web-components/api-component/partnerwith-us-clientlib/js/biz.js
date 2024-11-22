(function (_global) {
    var partnerWithUsBizCallFn = (function (jsHelper) {
        var partnerWithUsBizObj = {};
        $(document).ready(function () {


            $(".js-select2").select2({
                placeholder: "Select",
            });
            $(".js-select2-search-hide").select2({
                minimumResultsForSearch: Infinity,
            });
            $('.only-numeric-input').keyup(function (e) {
                $(this).val($(this).val().replace(/[^\d.-]/g, ''));
            });
            $(".alfaOnlyInput").on("input", function () {
                var regexp = /[^a-zA-Z'. ,-]/g;
                if ($(this).val().match(regexp)) {
                    $(this).val($(this).val().replace(regexp, ''));
                }
            });
            $('.only-alpha-input').on("keypress paste", function (e) {
                var regex = new RegExp(/[^a-zA-Z\b ]/g);
                if (regex.test(String.fromCharCode(e.which))) {
                    return false;
                }
            });
            function cityArraySort(arr) {
                var uniqueArr = [];
                for (var i = 0; i < arr.length; i++) {
                    if (uniqueArr.indexOf(arr[i]) === -1) {
                        uniqueArr.push(arr[i]);
                    }
                }
                return uniqueArr;
            }
            if ($("[data-type='city']").length > 0) {
                var reqObj = {};
                $("body").addClass("bg-loader");
                $(".loader").removeClass("hide-loader");
                patrnerWithUsObj.cityProductMasterCampaign(reqObj).then(function (response) {
                    if (response.status == "SUCCESS") {
                        $("body").removeClass("bg-loader");
                        $(".loader").addClass("hide-loader");
                        var cityArray = [];
                        var responseArray = JSON.parse(response.response).Master;
                        responseArray.forEach(function (ele) {
                            cityArray.push(ele.city);
                        })
                        cityArray = cityArray.sort();
                        $("[data-type='city']").html();
                        $("[data-type='city']").append("<option value=''></option>");
                        cityArray = cityArraySort(cityArray);
                        cityArray.forEach(function (element) {
                            $("[data-type='city']").append('<option value=' + element + '>' + element + '</option>');
                        });
                    }
                    else {
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
                }).catch(function (error) {
                    console.error(error);
                });
            }
            // Clear Loan aganist form
            $('.jsClearLoanDeatils').click(function () {
                clearCompleteForm();
            })

            var feildsCount = $('#partner-with-us .jsValueOK').length;
            // console.log(feildsCount);

            var emailFlag = false;
            var validEmail = {};
            var emailArr;
            var dummyDomains = [];
            $('[data-type="email"]').focus(function () {
                if (!emailFlag && !sessionStorage.getItem("email")) {
                } else { }
            })
            //Loan aganist form key up
            $('#partner-with-us .input-textbox[data-type]').keyup(function () {
                if (sessionStorage.getItem("email")) {
                    dummyDomains = sessionStorage.getItem("email");
                    emailArr = sessionStorage.getItem("emailArr");
                    emailArr = JSON.parse(emailArr);
                }
                var element = $(this);
                var ele_value = element.val();
                var ele_required = 'Field is required';
                var ele_email = "Please enter valid email ID";
                var ele_name = "Please enter full name";
                var ele_phoneNumber = "Please enter valid number";

                $(this).next('.error-msgs').remove();
                $(this).after('<span class="error-msgs" style="top: 43px"></span>');
                $(this).parents('.form-group').addClass('error');

                if ($(element).val() != '') {
                    $(element).parents('.form-textbox-new').find('.text-infos').addClass('hide-input-note');
                    if ($(element).data('type') === 'name') {
                        var regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
                        if (ele_value != '' && !regName.test(ele_value)) {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_name);
                            $(element).addClass('jsValueOK')
                        } else {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');
                            $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                            $(element).removeClass('jsValueOK')
                        }
                    }

                    if ($(element).data('type') === 'companyname') {
                        if (ele_value != '') {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');
                            $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                            $(element).removeClass('jsValueOK')
                        } else {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_required);
                            $(element).addClass('jsValueOK');
                        }
                    }

                    if ($(element).data('type') === 'email') {
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
                    if ($(element).data('type') === 'mobile') {
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

                    if ($(element).data('type') === 'companyname') {
                        if (ele_value != '') {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');
                            $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                            $(element).removeClass('jsValueOK')
                        } else {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_required);
                            $(element).addClass('jsValueOK');
                        }
                    }

                } else {
                    if ($(element).data('type') === 'companyname') {
                        $(element).parents('.form-textbox-new').addClass('textboxerror');
                        $(element).addClass('jsValueOK');
                    }
                    if ($(element).data('type') === 'name') {
                        $(element).parents('.form-textbox-new').addClass('textboxerror');
                        $(element).addClass('jsValueOK');
                    }
                    if ($(element).data('type') === 'email') {
                        $(element).parents('.form-textbox-new').addClass('textboxerror');
                        $(element).addClass('jsValueOK');
                    }
                    if ($(element).data('type') === 'mobile'){
                        $(element).parents('.form-textbox-new').addClass('textboxerror');
                        $(element).addClass('jsValueOK');
                    }
                    $(element).parents('.form-textbox-new').find('.text-infos').addClass('hide-input-note');
                    $(element).parents('.textbox-inner').removeClass('has-rupee-icon');
                    $(element).parents('.textbox-inner').find('.icon-rupee').addClass('d-none');
                    $(element).next('.error-msgs').text(ele_required);
                }
                feildsCount = $('#partner-with-us .jsValueOK').length
                // console.log(feildsCount);
                if ($('#partner-with-us .jsValueOK').length == 0) {
                    $('.jsApplyLoanAgainstProp').removeClass('btn-disabled');
                } else {
                    $('.jsApplyLoanAgainstProp').addClass('btn-disabled');
                }
            });

            //Loan aganist form submit
            var userPhoneNumber;
            $('#partner-with-us .jsApplyLoanAgainstProp').click(function () {
                $('.loader').removeClass('hide-loader');
                $('body').addClass('bg-loader');
                $('.clear-btn').addClass('d-none');

                var reqObj = {
                    "Master": [{
                        "fullname": $('#partner-with-us [data-type="name"]').val(),
                        "companyname": $('#partner-with-us [data-type="companyname"]').val(),
                        "email": $('#partner-with-us [data-type="email"]').val(),
                        "mobile": $('#partner-with-us [data-type="mobile"]').val(),
                        "city": $('#partner-with-us [data-type="city"]').val(),
                        "productcategory": $('#partner-with-us [data-type="product-category"]').val(),
                        "role-type": $('#partner-with-us [data-type="role-type"]').val(),
                    }]
                }
                patrnerWithUsObj.partnerWithUs(reqObj).then(function (response) {
                    if (response.status.toLowerCase() == "success") {
                        $('.loader').addClass('hide-loader');
                        $('body').removeClass('bg-loader');
                        $('.loan-against-form').addClass('d-none');
                        $('.jsSuccessSugam').removeClass('d-none');
                        $('.jsSuccessOTPVarification').removeClass('d-none');
                    } else {
                        $('.loader').addClass('hide-loader');
                        $('body').removeClass('bg-loader');
                        $('.jsFailLeaApi').removeClass('d-none');

                    }
                })
                $('.jsApplyLoanAgainstProp').addClass('btn-disabled');
                var ele_input = $('#partner-with-us').find('.form-textbox-new [data-type]:visible');
                var selectElements = $('#partner-with-us .select2-hidden-accessible[data-type]:visible');
                var errors = [];
                allFilled = true;
                var ele_required = "Field is required";

                $(ele_input).each(function () {
                    var element = $(this);
                    var ele_value = element.val();
                    var ele_email = "Please enter valid email ID";
                    var ele_name = "Please enter full name";
                    var ele_phoneNumber = "Please enter valid number";

                    $(element).parents('.form-textbox-new').find('.error-msgs').remove();
                    $(element).parents('.form-textbox-new').addClass('textboxerror');

                    if (element.is(":visible")) {
                        if (element.val() != '') {
                            $(element).parents('.form-textbox-new').find('.text-infos').addClass('hide-input-note');
                            $(element).after('<span class="error-msgs" style="top: 43px"></span>');

                            if ($(element).data('type') === 'name') {
                                var regName = /[A-Za-z]+[ ][A-Za-z]+$/;
                                if (ele_value != '' && !regName.test(ele_value)) {
                                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                                    $(element).next('.error-msgs').text(ele_name);
                                    errors.push(ele_name);
                                } else {
                                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                                    $(element).next().text('');
                                    $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                                }
                            }

                            if ($(element).data('type') === 'email') {
                                var regEmail = /^[a-zA-Z0-9_.]+[@][a-zA-Z0-9]+[\.][a-zA-z0-9]{2,4}$/gm;

                                if (ele_value != '' && !ele_value.match(regEmail)) {
                                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                                    $(element).next('.error-msgs').text(ele_email);
                                    errors.push(ele_email)
                                } else {
                                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                                    $(element).next().text('');
                                }
                            }
                            if ($(element).data('type') === 'mobile') {
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

                            if ($(element).data('type') === 'companyname') {
                                if (ele_value != '') {
                                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                                    $(element).next().text('');
                                    $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                                    $(element).removeClass('jsValueOK')
                                } else {
                                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                                    $(element).next('.error-msgs').text(ele_required);
                                    errors.push(ele_Date)
                                    $(element).addClass('jsValueOK');
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

                if (errors.length == 0) {

                    clearCompleteForm();
                    $('.loan-against-form').addClass('d-none')
                   
                    $('.loan-against-oreqObjtp-wrap').removeClass('d-none')
                    $('.loan-againstclose-btn').removeClass('d-none')
                    $('.clear-btn').addClass('d-none')
                    $("#loan-against-otp .input-textbox[data-type=otp-send-number]").val(userPhoneNumber);
                    $("#loan-against-otp .form-textbox-new").addClass('active onchange');
                    $('#loan-against-otp .jsLoanAgainstSendOTP').trigger('click');
                }

            });


            /*loan against otp msg close*/
            $('.jsCloseLaonAgainstMgs').click(function () {
                $('.jsMsgLoanAgainst').addClass('d-none');
                $('.loan-againstclose-btn').addClass('d-none');
                $('.clear-btn').removeClass('d-none');
                $('.loan-against-form').removeClass('d-none');
                clearCompleteForm();
            });

            //Select 2 on change remove error state
            $('.js-select2').change(function () {
                $(this).parents('.form-textbox-new').removeClass('textboxerror');
                $(this).next('.error-msgs').remove();
                $(this).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                $(this).removeClass('jsValueOK')

                if ($('#partner-with-us .jsValueOK').length == 0) {
                    $('.jsApplyLoanAgainstProp').removeClass('btn-disabled');
                } else {
                    $('.jsApplyLoanAgainstProp').addClass('btn-disabled');
                }
            })

            //Focus open select 2 dropdown
            $(document).on('focus', '.select2.select2-container', function (e) {
                if (e.originalEvent && $(this).find(".select2-selection--single").length > 0) {
                    $(this).siblings('select').select2('open');
                }
            });

        })

        //Global

        function clearCompleteForm() {
            $('.jsApplyLoanAgainstProp').addClass('btn-disabled');
            $('#partner-with-us .input-textbox[data-type]').addClass('jsValueOK')
            $('#partner-with-us .input-textbox[data-type]').val('');
            $('#partner-with-us .form-textbox-new').removeClass('active onchange');
            $('#partner-with-us .form-textbox-new .textbox-inner').removeClass('has-rupee-icon');
            $('#partner-with-us .form-textbox-new .text-infos').removeClass('hide-input-note');
            $('#partner-with-us .form-textbox-new .icon-rupee').addClass('d-none');
            // $('.js-select2').val('');
            $('.js-select2').each(function () {
                $('.js-select2').parents('.form-textbox-new').removeClass('textboxerror');
                $('.js-select2').parents('.form-textbox-new').addClass('active');
                $('.js-select2').next('.error-msgs').remove();
                $('.js-select2').val(null).trigger('change');
                $('.js-select2').addClass('jsValueOK')
            });

            $('#partner-with-us .input-textbox[data-type]').parents('.form-textbox-new').removeClass('textboxerror');
            $('#partner-with-us .input-textbox[data-type]').next().text('');
        }


        return jsHelper.freezeObj(partnerWithUsBizObj);
    })(jsHelper);

    _global.jsHelper.defineReadOnlyObjProp(_global, "partnerWithUsBizObj", partnerWithUsBizCallFn);
})(this || window || {});
