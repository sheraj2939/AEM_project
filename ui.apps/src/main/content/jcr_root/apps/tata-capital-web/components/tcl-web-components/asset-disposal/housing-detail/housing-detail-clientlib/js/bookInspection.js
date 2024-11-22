$(document).ready(function () {
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

    var feildsCount = $('#bookInspectionForm .jsValueOK:visible').length;
    // console.log(feildsCount);

    $('.js-select3').select2({
        dropdownParent: $('.full-select2')
    });

    $('#bookInspectionForm .input-textbox[data-type]').keyup(function () {
        var element = $(this);
        var ele_value = element.val();
        var ele_required = 'Field is required';
        var ele_Fname = "Please enter first name";
        var ele_Lname = "Please enter last name";
        var ele_Date = "Please enter valid Date";
        var ele_phoneNumber = "Please enter valid number";
        var ele_email = "Please enter valid email ID";

        $(this).next('.error-msgs').remove();
        $(this).after('<span class="error-msgs" style="top: 43px"></span>');
        $(this).parents('.form-group').addClass('error');

        // $('.subscribe-success').addClass('d-none');

        if ($(element).val() != '') {
            $(element).parents('.form-textbox-new').find('.text-infos').addClass('hide-input-note');
            if ($(element).data('type') === 'fName') {
                var regName = /^[a-zA-Z]+$/;
                if (ele_value != '' && !regName.test(ele_value)) {
                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                    $(element).next('.error-msgs').text(ele_Fname);
                    $(element).addClass('jsValueOK')
                } else {
                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                    $(element).next().text('');
                    $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                    $(element).removeClass('jsValueOK')
                }
            }
            if ($(element).data('type') === 'lName') {
                var regName = /^[a-zA-Z]+$/;
                if (ele_value != '' && !regName.test(ele_value)) {
                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                    $(element).next('.error-msgs').text(ele_Lname);
                    $(element).addClass('jsValueOK')
                } else {
                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                    $(element).next().text('');
                    $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                    $(element).removeClass('jsValueOK')
                }
            }
            if ($(element).data('type') === 'email') {
                var regEmail = /^[a-zA-Z0-9_.]+[@][a-zA-Z0-9]+[\.][a-zA-z0-9]{2,4}$/gm;
                if (ele_value != '' && !ele_value.match(regEmail)) {
                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                    $(element).next('.error-msgs').text(ele_email);
                    $(element).addClass('jsValueOK');
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

        } else {
            $(element).parents('.form-textbox-new').find('.text-infos').addClass('hide-input-note');
            $(element).next('.error-msgs').text(ele_required);
            $(element).addClass('jsValueOK')
            $(element).parents('.form-textbox-new').addClass('textboxerror');
        }

        feildsCount = $('#bookInspectionForm .jsValueOK:visible').length
        console.log(feildsCount);
        if (feildsCount === 0) {
            $('#bookInspectionForm .jsHousingSubmit').removeClass('btn-disabled');
        } else {
            $('#bookInspectionForm .jsHousingSubmit').addClass('btn-disabled');
        }


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
                this.value = parts.join('/')
            }
        });
    });



    $('.jsClosedModal').click(function () {
        clearCompleteForm();
        $('#bookInspectionForm').removeClass('d-none');
        $('#bookInspection .thankyou-modal-inner').addClass('d-none');
        try {
            var checkbox = document.querySelector("[data-target='#bookInspection']");
            if (checkbox.checked) {
                checkbox.checked = false;
            }
        }
        catch (e) {
            console.log(e)
        }
    })


    //Select 2 on change remove error state
    $('.js-select3').change(function () {
        $(this).parents('.form-textbox-new').removeClass('textboxerror');
        $(this).next('.error-msgs').remove();
        $(this).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
        $(this).removeClass('jsValueOK')
        if ($('#bookInspectionForm .jsValueOK').length == 0) {
            $('#bookInspectionForm .jsHousingSubmit').removeClass('btn-disabled');
        } else {
            $('#bookInspectionForm .jsHousingSubmit').addClass('btn-disabled');
        }
    })

    function clearCompleteForm() {
        $('#bookInspectionForm .jsHousingSubmit').addClass('btn-disabled');
        $('#bookInspectionForm .input-textbox[data-type]').addClass('jsValueOK')
        $('#bookInspectionForm .input-textbox[data-type]').val('');
        $('#bookInspectionForm .form-textbox-new').removeClass('active onchange');
        // $('#bookInspectionForm .form-textbox-new .textbox-inner').removeClass('has-rupee-icon');
        // $('#bookInspectionForm .form-textbox-new .text-infos').removeClass('hide-input-note');
        // $('#bookInspectionForm .form-textbox-new .icon-rupee').addClass('d-none');
        // $('.js-select3').val('');
        $('.js-select3').each(function () {
            $('.js-select3').parents('.form-textbox-new').removeClass('textboxerror');
            $('.js-select3').parents('.form-textbox-new').addClass('active');
            $('.js-select3').next('.error-msgs').remove();
            $('.js-select3').val(null).trigger('change');
            $('.js-select3').addClass('jsValueOK')
        });

        $('#bookInspectionForm .input-textbox[data-type]').parents('.form-textbox-new').removeClass('textboxerror');
        $('#bookInspectionForm .input-textbox[data-type]').next().text('');
    }
})


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

        var overAge = parseInt(today.getFullYear() - 90);
        var underAge = parseInt(today.getFullYear() - 18);
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
