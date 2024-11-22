$(document).ready(function () {


    form_validation_onKeyup();
    formvalidation_onClick();
    selectToForms()


    $('.jsIndentityTab li .custom-radiobox-label').click(function () {
        var eleTab_id = $(this).attr('datas-tab');
        console.log(eleTab_id);
        // $(this).parents('.jsIndentityTab').find('li .custom-radiobox-label').removeClass('active');
        // $(this).addClass('active');
        $('.js-tab-row').addClass('d-none');
        $('#' + eleTab_id).removeClass('d-none');

        $('#mobileVerifyForm').find('.input-textbox').val('');
        $('#mobileVerifyForm').find('.form-textbox-new').removeClass('textboxerror');
        $('#mobileVerifyForm').find('.form-textbox-new').removeClass('active');
        $('#mobileVerifyForm .form-textbox-new').find('.error-msgs').text('');
    })

    // $('.jsClear').click(function(){
    //     $('#add-moreform .form-row:first-child .input-textbox').val('');
    //     $('#add-moreform .form-row:first-child .form-textbox-new').removeClass('textboxerror');
    //     $('#add-moreform .form-row:first-child .form-textbox-new').removeClass('active');
    //     $('#add-moreform .form-row:first-child').find('.error-msgs').text('');
    // })

    var itemsId = 1;
    $('.js-addmore-referral').click(function () {
        var htmlEle = `<div class="form-row" id="itemid-${itemsId}">
        <div class="new-referral-del">
            <p>New Referral</p><a href="javascript:void(0)" class="new-referral-close jsDelete"
                data-popovermodal="popover-modal" data-target="#del-modal"></a>
        </div>
        <div class="row-flex row-flex-30">
            <div class="row-col-33 col-sp30">
                <div class="row-flex name-with-title">
                    <div class="row-col-33 name-title-col">
                        <div class="form-textbox-new fixed-active">
                            <label class="label-name">Title</label>
                            <div class="textbox-inner">
                                <div class="custom-select2">
                                    <select class="js-select2">
                                        <option value=""></option>
                                        <option value="Mr">Mr</option>
                                        <option value="Miss">Miss</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row-col-66 name-title-col">
                        <div class="form-textbox-new">
                            <label class="label-name">First name</label>
                            <div class="textbox-inner">
                                <input type="text" class="input-textbox disable-emoji alfaOnlyInput only-alpha-input"
                                    placeholder="" data-type="firstname">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
            <div class="row-col-33 col-sp30">
                <div class="form-textbox-new">
                    <label class="label-name">Last name</label>
                    <div class="textbox-inner">
                        <input type="text" class="input-textbox disable-emoji alfaOnlyInput only-alpha-input" placeholder=""
                            data-type="lastname">
                    </div>
                </div>
            </div>
    
            <div class="row-col-33 col-sp30">
                <div class="form-textbox-new">
                    <label class="label-name">Email ID</label>
                    <div class="textbox-inner">
                        <input type="text" class="input-textbox disable-emoji" placeholder="" data-type="email">
                    </div>
                </div>
            </div>
    
            <div class="row-col-33 col-sp30">
                <div class="form-textbox-new">
                    <label class="label-name">Mobile no.</label>
                    <div class="textbox-inner">
                        <input type="text" class="input-textbox allow-numeric disable-emoji" placeholder=""
                            data-type="mobile" data-object="referrer" maxlength="10" pattern="[0-9]*" inputmode="numeric">
                    </div>
                </div>
            </div>
    
            <div class="row-col-33 col-sp30">
                <div class="form-textbox-new fixed-active">
                    <label class="label-name">Pincode</label>
                    <div class="textbox-inner">
    
                        <div class="custom-select2">
                            <select class="js-select2 firstFormPincode" data-type="pincode">
                                <option value=""></option>
                                <option value="721663">721663</option>
                                <option value="743411">743411</option>
                                <option value="741161">741161</option>
                                <option value="635130">635130</option>
                                <option value="401105">401105</option>
                                <option value="144501">144501</option>
                                <option value="142035">142035</option>
                                <option value="440019">440019</option>
                                <option value="678007">678007</option>
                                <option value="688014">688014</option>
                                <option value="581438">581438</option>
                                <option value="421501">421501</option>
                                <option value="570028">570028</option>
                                <option value="832111">832111</option>
                                <option value="362021">362021</option>
                                <option value="535220">535220</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
    
            <div class="row-col-33 col-sp30">
                <div class="form-textbox-new fixed-active">
                    <label class="label-name">City</label>
                    <div class="textbox-inner">
    
                        <div class="custom-select2">
                            <select class="js-select2 firstFormCity" data-type="city">
                                <option value=""></option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
    
            <div class="row-col-33 col-sp30">
                <div class="form-textbox-new fixed-active">
                    <label class="label-name">State</label>
                    <div class="textbox-inner">
    
                        <div class="custom-select2">
                            <select class="js-select2 firstFormState" data-type="state">
                                <option value=""></option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
    
            <div class="row-col-33 col-sp30">
                <div class="form-textbox-new fixed-active">
                    <label class="label-name">Select Product Category</label>
                    <div class="textbox-inner">
    
                        <div class="custom-select2">
                            <select class="js-select2 firstFormProduct" data-type="product">
                                <option value=""></option>
                                <option value="Mutual Funds">Mutual Funds</option>
                                <option value="Corporate Fixed Deposits">Corporate Fixed
                                    Deposits</option>
                                <option value="Portfolio Management Services">Portfolio
                                    Management Services</option>
                                <option value="NCD/Bonds">NCD/Bonds</option>
                                <option value="Alternate Investment Funds">Alternate Investment
                                    Funds</option>
                                <option value="Structured Products">Structured Products</option>
                                <option value="Global Investments">Global Investments
                                </option>
                                <option value="Life Insurance">Life Insurance</option>
                                <option value="General insurance">General insurance</option>
                                <option value="Real Estate">Real Estate</option>
                                <option value="Inheritance & Succession Planning">Inheritance &
                                    Succession Planning</option>
                                <option value="Unlisted Equity">Unlisted Equity</option>
                                <option value="Others (text field if chosen others)">Others
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
    
            <div class="row-col-33 col-sp30">
            <div class="form-textbox-new fixed-active">
                <label class="label-name">Date of meeting</label>
                    <div class="textbox-inner">
                        <input type="date" style="text-transform: uppercase; color: #9D9D9D;" class="input-textbox disable-emoji" placeholder="" data-type="date"
                            data-object="referrer" inputmode="">
                    </div>
                </div>
            </div>
    
            <div class="row-col-33 col-sp30">
                <div class="form-textbox-new">
                    <label class="label-name">Background on referral Profile</label>
                    <div class="textbox-inner">
                        <input type="text" class="input-textbox disable-emoji alfaOnlyInput only-alpha-input" placeholder=""
                            data-type="profile">
                    </div>
                </div>
            </div>
    
            <div class="row-col-33 col-sp30">
                <div class="form-textbox-new">
                    <label class="label-name">Weath Manager Employee Code</label>
                    <div class="textbox-inner">
                        <input type="text" class="input-textbox disable-emoji alfaOnlyInput only-alpha-input" placeholder=""
                            data-type="wm-rm-code">
                    </div>
                </div>
            </div>
    
            <div class="row-col-33 col-sp30">
                <div class="form-textbox-new">
                    <label class="label-name">Weath Manager Employee Name</label>
                    <div class="textbox-inner">
                        <input type="text" class="input-textbox disable-emoji alfaOnlyInput only-alpha-input" placeholder=""
                            data-type="wm-rm-name">
                    </div>
                </div>
            </div>
    
        </div>
    </div>`;
        var eleLength = $('#add-moreform').find('.form-row').length;
        if (eleLength < 10) {
            $('#add-moreform').append(htmlEle);
            addMoreCityAppend()
        }
        var eleLength = $('#add-moreform').find('.form-row').length;
        if (eleLength == 10) {
            $(this).addClass('disabled');
        }

        var targetId;
        $('.jsDelete').on('click', function () {
            // $(this).parents('.form-row').remove();
            targetId = $(this).parents('.form-row').attr("id");
            console.log(targetId);
            // var eleLength = $('#add-moreform').find('.form-row').length;
            // if(eleLength < 10){
            //     $('.js-addmore-referral').removeClass('disabled');
            // }
        })

        $('.jsDeleteRows').on('click', function () {
            $(`#${targetId}`).remove();
            var eleLength = $('#add-moreform').find('.form-row').length;
            if (eleLength < 10) {
                $('.js-addmore-referral').removeClass('disabled');
            }
        })

        $(".js-select2").select2({
            placeholder: "Select",
        });

        $('.js-select2').change(function () {
            $(this).parents('.form-textbox-new').removeClass('textboxerror');
            $(this).next('.error-msgs').remove();
        })

        $('[data-popovermodal="popover-modal"]').on("click", function () {
            var ele_target = $(this).attr('data-target');
            setTimeout(function () {
                $(ele_target).addClass('popover-show');
            }, 80);
            $(ele_target).css('display', 'block');
            $('body').addClass('popover-modal-open');
            $('body').append('<div class="modal-backdrop"></div>');
        });

        $('[data-dismiss="popover-modal"]').on('click', function () {
            $(this).parents('.popover-modal').removeClass('popover-show');
            $(this).parents('.popover-modal').removeAttr('style');
            $('body').removeClass('popover-modal-open');
            $('.modal-backdrop').remove();
        });
        employeeCodeEvent($('[data-type="wm-rm-code"]'));
        forminput_animation();
        form_validation();
        form_validation_onKeyup();
        selectToForms();
        itemsId = itemsId + 1;
    });

    // $('.js-closeModal').click(function(){
    //     $('body').removeClass('modal-open');
    //     $('.modal').removeAttr('style');
    //     $('.modal').removeClass('show');
    //     $('.modal-backdrop').remove();
    //     location.reload();

    //     $('#mobileVerifyForm .form-row .input-textbox').val('');
    //     $('#mobileVerifyForm .form-row .form-textbox-new').removeClass('textboxerror');
    //     $('#mobileVerifyForm .form-row .form-textbox-new').removeClass('active');
    //     $('#mobileVerifyForm .form-row').find('.error-msgs').text('');

    //     $('#add-moreform .form-row .input-textbox').val('');
    //     $('#add-moreform .form-row .form-textbox-new').removeClass('textboxerror');
    //     $('#add-moreform .form-row .form-textbox-new').removeClass('active');
    //     $('#add-moreform .form-row').find('.error-msgs').text('');

    //     $('.refer-left-form .checkBox').find('input').prop('checked', false);


    //     $('html, body').animate({
    //         scrollTop: $('header').offset().top
    //     }, 500);

    // });

    var android = "www.moneyfy.com/tdhfjam/";
    var iso = "www.moneyfy.com/tdhfjam/iso";

    $('input[data-check]').click(function () {
        if ($('input[data-check="android"]').is(":checked")) {
            $('#urlInput').val(android);
            $('.js-copy').text('COPY');
        } else {
            $('#urlInput').val(iso);
            $('.js-copy').text('COPY');
        }
    });

    $('.js-copy').click(function () {
        var eleVal = $('#urlInput').val();
        if ($(this).text() == 'COPY') {
            $(this).text('COPIED');
        } else {
            $(this).text('COPY');
        }
    });

    $("input[id='termcondition']").click(function () {
        if ($(this).is(':checked')) {
            $('.checkBox-error').find('.error-msgs').remove();
        }
    });


    $('.js-select2').change(function () {
        $(this).parents('.form-textbox-new').removeClass('textboxerror');
        $(this).next('.error-msgs').remove();
    })

})


// Form Input Animation //
function forminput_animation() {
    $('.form-textbox-new input').change(function () {
        if ($(this).val().length != 0) {
            $(this).parents('.form-textbox-new').addClass("active");
        } else if ($(this).val().length == 0) {
            $(this).parents('.form-textbox-new').removeClass("active");
        }
    }).focus(function () {
        $(this).parents('.form-textbox-new').addClass("active");
    }).blur(function () {
        if ($(this).val().length != 0) {
            $(this).parents('.form-textbox-new').addClass("active");
        } else if ($(this).val().length == 0) {
            $(this).parents('.form-textbox-new').removeClass("active");
        }
    });
}

// Form Validation on Focus or Blur //
function form_validation_onKeyup() {
    $('#mobileVerifyForm .input-textbox').keyup(function () {
        var element = $(this);
        var ele_value = element.val();
        var errors = [];
        var ele_required = "Field is required";
        var ele_phoneNumber = "Please enter valid number";
        var ele_pancard = "Please enter valid PAN number";

        $(element).next('.error-msgs').remove();

        if ($(element).val() != '') {
            $(element).after('<span class="error-msgs"></span>');
            $(element).parents('.form-textbox-new').removeClass('textboxerror');
            $(element).next('.error-msgs').text('');
        }
        else {
            $(element).parents('.form-textbox-new').addClass('textboxerror');
            $(element).after('<span class="error-msgs">' + ele_required + '</span>');
            errors.push(ele_required);
        }
    });

    // Add More Input //
    $('#add-moreform input[data-type]').keyup(function () {
        var element = $(this);
        var ele_value = element.val();
        var errors = [];
        var ele_required = "Field is required";
        var ele_name = "Please enter full name";
        var ele_phoneNumber = "Please enter valid number";
        var ele_email = "Please enter valid email";
        var ele_Fname = "Please enter first name";
        var ele_Lname = "Please enter last name";

        $(element).next('.error-msgs').remove();

        if ($(element).val() != '') {
            $(element).after('<span class="error-msgs"></span>');
            var regName = /^[a-zA-Z]+$/;
            if ($(element).data("type") === "firstname") {
                if (ele_value != "" && !regName.test(ele_value)) {
                    $(element).parents(".form-textbox-new").addClass("textboxerror");
                    $(element).next(".error-msgs").text(ele_Fname);
                } else {
                    $(element).parents(".form-textbox-new").removeClass("textboxerror");
                    $(element).next(".error-msgs").text("");
                }
            }
            if ($(element).data("type") === "lastname") {
                var regName = /^[a-zA-Z]+$/;
                if (ele_value != "" && !regName.test(ele_value)) {
                    $(element).parents(".form-textbox-new").addClass("textboxerror");
                    $(element).next(".error-msgs").text(ele_Lname);
                } else {
                    $(element).parents(".form-textbox-new").removeClass("textboxerror");
                    $(element).next(".error-msgs").text("");
                }
            }
            if ($(element).data("type") === "city") {
                if (ele_value != "") {
                    $(element).parents(".form-textbox-new").removeClass("textboxerror");
                    $(element).next(".error-msgs").text("");
                } else {
                    $(element).parents(".form-textbox-new").addClass("textboxerror");
                    $(element).next(".error-msgs").text(ele_required);
                }
            }
            if ($(element).data('type') === 'email') {
                var regEmail = /^[a-zA-Z0-9_.]+[@][a-zA-Z0-9]+[\.][a-zA-z0-9]{2,4}$/gm;
                if (ele_value != '' && !ele_value.match(regEmail)) {
                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                    $(element).next('.error-msgs').text(ele_email);
                    errors.push(ele_email);
                }
                else {
                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                    $(element).next().text('');
                }
            }

            if ($(element).data('type') === 'mobile') {
                if (!validateMobile(element)) {
                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                    $(element).next('.error-msgs').text(ele_phoneNumber);
                    errors.push(ele_phoneNumber);
                } else {
                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                    $(element).next('.error-msgs').text('');
                }
            }

        } else {
            $(element).parents('.form-textbox-new').addClass('textboxerror');
            $(element).after('<span class="error-msgs">' + ele_required + '</span>');
            errors.push(ele_required);
        }
        if ($(element).data('type') === 'wm-rm-code') {
            if (ele_value != "" || ele_value == "") {
                $(element).parents('.form-textbox-new').removeClass('textboxerror');
                $(element).next('.error-msgs').text('');
                errors.pop(ele_required);
            }
        }
        if ($(element).data('type') === 'wm-rm-name') {
            if (ele_value != "" || ele_value == "") {
                $(element).parents('.form-textbox-new').removeClass('textboxerror');
                $(element).next('.error-msgs').text('');
                errors.pop(ele_required);
            }
        }
    });
}

// on button click validation //
function formvalidation_onClick() {
    $('#mobileVerifyForm .js-verifyMobile').click(function (e) {
        var ele_input = $(this).parents('#mobileVerifyForm').find('.input-textbox:visible');
        var errors = [];
        var ele_required = "Field is required";
        var ele_phoneVerify = "Please use a valid Employee Id";

        $(ele_input).each(function () {
            var element = $(this);
            var ele_phoneNumber = "Please enter valid number";

            $(element).next('.error-msgs').remove();

            if (element.is(":visible")) {
                if (element.val() != '') {
                    $(element).after('<span class="error-msgs"></span>');
                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                    $(element).next('.error-msgs').text('');
                } else {
                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                    $(element).after('<span class="error-msgs">' + ele_required + '</span>');
                    errors.push(ele_required);
                }
            }
        });

        if (errors.length == 0) {
            $('.jsMobileShow').removeClass('hidden');
            $('.jsPanShow').addClass('hidden');
            var mobile_value = $(this).parents('#mobileVerifyForm').find('[data-type="empmobile"]').val();
            getCustomerDataApiCallverifyMobile(mobile_value, ele_phoneVerify, $(this))
            // if(mobile_value == "7021447081"){
            //     var next_fs = $(this).data('next');
            //     $(this).parents('.form-wizard').find('.form-step').addClass('hidden');
            //     $(this).parents('#mobileVerifyForm').find('#' + next_fs).removeClass('hidden');
            //     var number_Seperator = mobile_value.toString().replace(/\B(?=(\d{5})+(?!\d))/g, " ");
            //     $('#mobileVerifyForm').find('.mobileSuccessForm .getNumber').text(number_Seperator);
            //     // $('.moneyfy-referral-form').find('.disabled-block').removeClass('disabled-block');
            //     $('.page-disabled').addClass('hidden');
            //     $('.checkBox-error').find('.pointer-none').removeClass('pointer-none');
            //     setTimeout(function(){
            //         $('html, body').animate({
            //             scrollTop: $("#ScrollElement").offset().top - 65
            //         }, 500);
            //     }, 100)
            //     $('#add-moreform').find('.input-textbox').val('');
            //     $('#add-moreform').find('.form-textbox-new').removeClass('textboxerror');
            //     $('#add-moreform').find('.form-textbox-new').removeClass('active');
            //     $('#add-moreform .form-textbox-new').find('.error-msgs').text('');


            // } else {
            //     $(this).parents('#mobileVerifyForm').find('[data-type="mobile"]').next('.error-msgs').remove();
            //     $(this).parents('#mobileVerifyForm').find('[data-type="mobile"]').parents('.form-textbox-new').addClass('textboxerror');
            //     $(this).parents('#mobileVerifyForm').find('[data-type="mobile"]').after('<span class="error-msgs">' + ele_phoneVerify + '</span>');
            // }
        }

    });

    $('#mobileVerifyForm .js-verifyPan').click(function (e) {
        var ele_input = $(this).parents('#mobileVerifyForm').find('.input-textbox:visible');
        var errors = [];
        var ele_required = "Field is required";
        var ele_panVerify = "The Pan number entered doesn’t match our records. Please try again.";

        $(ele_input).each(function () {
            var element = $(this);
            var ele_value = $(this).val();
            var ele_pancard = "Please enter valid PAN number";
            $(element).next('.error-msgs').remove();
            if (element.is(":visible")) {
                if (element.val() != '') {
                    $(element).after('<span class="error-msgs"></span>');

                    if ($(element).data('type') === 'pan-number') {
                        var regPanCard = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
                        $(this).val($(this).val().toUpperCase());
                        if (ele_value != '' && !regPanCard.test(ele_value)) {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_pancard);
                            errors.push(ele_pancard);
                        }
                        else {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).parents('.form-textbox-new').find('.error-msgs').remove();
                        }
                    }

                } else {
                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                    $(element).after('<span class="error-msgs">' + ele_required + '</span>');
                    errors.push(ele_required);
                }
            }
        })

        if (errors.length == 0) {
            $('.jsMobileShow').addClass('hidden');
            $('.jsPanShow').removeClass('hidden');
            var pan_value = $(this).parents('#mobileVerifyForm').find('[data-type="pan-number"]').val();
            getCustomerDataApiCallverifyPan(pan_value, ele_panVerify, $(this))

        }
    });



    // Invite and Earn //
    $('.js-invite-earn').click(function (e) {
        var ele_input = $('#add-moreform').find('.input-textbox[data-type]:visible');
        var selectElements = $('#add-moreform').find('.select2-hidden-accessible[data-type]:visible');
        var errors = [];
        var ele_required = "Field is required";

        $(ele_input).each(function () {
            var element = $(this);
            var ele_value = element.val();
            var ele_name = "Please enter full name";
            var ele_phoneNumber = "Please enter valid number";
            var ele_email = "Please enter valid email";
            var ele_Fname = "Please enter first name";
            var ele_Lname = "Please enter last name";

            $(element).next('.error-msgs').remove();

            if (element.is(":visible")) {

                if (element.val() != '') {
                    $(element).after('<span class="error-msgs"></span>');
                    var regName = /^[a-zA-Z]+$/;
                    if ($(element).data("type") === "firstname") {
                        if (ele_value != "" && !regName.test(ele_value)) {
                            $(element).parents(".form-textbox-new").addClass("textboxerror");
                            $(element).next(".error-msgs").text(ele_Fname);
                            errors.push(ele_required);
                        } else {
                            $(element).parents(".form-textbox-new").removeClass("textboxerror");
                            $(element).next(".error-msgs").text("");
                        }
                    }
                    if ($(element).data("type") === "lastname") {
                        var regName = /^[a-zA-Z]+$/;
                        if (ele_value != "" && !regName.test(ele_value)) {
                            $(element).parents(".form-textbox-new").addClass("textboxerror");
                            $(element).next(".error-msgs").text(ele_Lname);
                            errors.push(ele_required);
                        } else {
                            $(element).parents(".form-textbox-new").removeClass("textboxerror");
                            $(element).next(".error-msgs").text("");
                        }
                    }
                    if ($(element).data("type") === "date") {
                        if (ele_value != "") {
                            $(element).parents(".form-textbox-new").addClass("textboxerror");
                            $(element).next(".error-msgs").text(ele_Lname);
                            errors.push(ele_required);
                        } else {
                            $(element).parents(".form-textbox-new").removeClass("textboxerror");
                            $(element).next(".error-msgs").text("");
                        }
                    }
                    if ($(element).data("type") === "city") {
                        if (ele_value != "") {
                            $(element).parents(".form-textbox-new").removeClass("textboxerror");
                            $(element).next(".error-msgs").text("");
                        } else {
                            $(element).parents(".form-textbox-new").addClass("textboxerror");
                            $(element).next(".error-msgs").text(ele_required);
                            errors.push(ele_required);
                        }
                    }

                    if ($(element).data('type') === 'mobile') {
                        if (!validateMobile(element)) {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_phoneNumber);
                            errors.push(ele_phoneNumber);
                        } else {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next('.error-msgs').text('');
                        }
                    }

                    if ($(element).data('type') === 'email') {
                        var regEmail = /^[a-zA-Z0-9_.]+[@][a-zA-Z0-9]+[\.][a-zA-z0-9]{2,4}$/gm;
                        if (ele_value != '' && !ele_value.match(regEmail)) {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_email);
                            errors.push(ele_email);
                        }
                        else {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');
                        }
                    }
                }
                else {
                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                    $(element).after('<span class="error-msgs">' + ele_required + '</span>');
                    errors.push(ele_required);
                }
                if ($(element).data('type') === 'wm-rm-code') {
                    if (ele_value != "" || ele_value == "") {
                        $(element).parents('.form-textbox-new').removeClass('textboxerror');
                        $(element).next('.error-msgs').text('');
                        errors.pop(ele_required);
                    }
                }
                if ($(element).data('type') === 'wm-rm-name') {
                    if (ele_value != "" || ele_value == "") {
                        $(element).parents('.form-textbox-new').removeClass('textboxerror');
                        $(element).next('.error-msgs').text('');
                        errors.pop(ele_required);
                    }
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

        if ($("input[id='termcondition']").is(':not(:checked)')) {
            $('.checkBox-error').find('.error-msgs').remove();
            var ele_check_error = "Please agree to the T&C to proceed";
            $('.checkBox-error').append('<span class="error-msgs">' + ele_check_error + '</span>');
            errors.push(ele_check_error);
        } else {
            $('.checkBox-error').find('.error-msgs').remove();
        }

        if (errors.length == 0) {
            ReferringReferredRmApiCall()
            // $('#add-moreform .form-textbox-new').removeClass('active');
            // $('#add-moreform .form-textbox-new .input-textbox').val('');
            // $('#add-moreform .js-select2').parents('.form-textbox-new').removeClass('textboxerror');            
            // $('#add-moreform .js-select2').next('.error-msgs').remove();
            // $('#add-moreform .js-select2').val(null).trigger('change');     

            // $('.jsReferTopMatch').addClass('hidden');
            // $('.jsReferFornss').addClass('hidden');
            // $('.jsReferThankyou').removeClass('hidden');
            // setTimeout(function(){
            //     $('html, body').animate({
            //         scrollTop: $("#ScrollElement").offset().top - 65
            //     }, 500);
            // }, 100)

        }

    });

}

// form Validation //
function form_validation() {

    // numeric input validation
    $('.only-numeric-input').keyup(function (e) {
        $(this).val($(this).val().replace(/[^\d.-]/g, ''));
    });

    // aplhabet input validation
    $('.only-alpha-input').keypress(function (e) {
        if (String.fromCharCode(e.keyCode).match(/[^a-zA-Z ]/g)) {
            return false;
        }
    });
}