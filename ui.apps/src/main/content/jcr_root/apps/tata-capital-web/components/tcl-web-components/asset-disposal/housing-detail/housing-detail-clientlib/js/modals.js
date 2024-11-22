$(document).ready(function () {

    $(".allow-numeric").on("input", function(evt) {
        var self = $(this);
        self.val(self.val().replace(/\D/g, ""));
        if ((evt.which < 48 || evt.which > 57)) 
        {
        evt.preventDefault();
        }
    });

    $(".alfaOnlyInput").on("input", function () {
        var regexp = /[^a-zA-Z'. ,-]/g;
        if ($(this).val().match(regexp)) {
            $(this).val($(this).val().replace(regexp, ''));
        }
    });


    var feildsCount = $('#housingForm .jsValueOK:visible').length;
    // console.log(feildsCount);

    $('#housingForm .input-textbox[data-type]').keyup(function () {
        var element = $(this);
        var ele_value = element.val();
        var ele_required = 'Field is required';
        var ele_Fname = "Please enter first name";
        var ele_Lname = "Please enter last name";
        var ele_phoneNumber = "Please enter valid number";
        var ele_email = "Please enter valid email ID";        
        var ele_BuyerQuoteValue = "Please select an amount less than " + parseFloat(reservePrice).toLocaleString('en-IN');       
        $(this).next('.error-msgs').remove();
        $(this).after('<span class="error-msgs" style="top: 43px"></span>');
        $(this).parents('.form-group').addClass('error');
        
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
            if ($(element).data('type') === 'buyer-quote') {
                var rupeeValue = parseFloat(ele_value.replace(/,/g, ''));
                if (reservePrice !== '' && reservePrice !== '-' && !isNaN(reservePrice)) {
                    if (ele_value != '' && !(rupeeValue < reservePrice)) {
                        $(element).parents('.form-textbox-new').addClass('textboxerror');
                        $(element).next('.error-msgs').text(ele_BuyerQuoteValue);
                        $(element).addClass('jsValueOK')
                    } else {
                        $(element).parents('.form-textbox-new').removeClass('textboxerror');
                        $(element).next().text('');
                        $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                        $(element).removeClass('jsValueOK')
                    }
                }
            }            

        } else {
            if ($(element).data('type') === 'buyer-quote') {
                $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                $(element).next().text('');
                $(element).removeClass('jsValueOK')
                $(element).parents('.form-textbox-new').removeClass('textboxerror');
            }else{
                $(element).parents('.form-textbox-new').find('.text-infos').addClass('hide-input-note');
                $(element).next('.error-msgs').text(ele_required);
                $(element).addClass('jsValueOK')
                $(element).parents('.form-textbox-new').addClass('textboxerror');
            }
        }
        
        feildsCount = $('#housingForm .jsValueOK:visible').length
        // console.log(feildsCount);
        if(feildsCount === 0){
            $('#housingForm .jsHousingSubmit').removeClass('btn-disabled');
        } else {
            $('#housingForm .jsHousingSubmit').addClass('btn-disabled');
        }
    });



    
    $('.jsClosedModal').click(function () {
        clearCompleteForm();        
        $('#housingForm').removeClass('d-none');
        $('#houseLoanInterested .thankyou-modal-inner').addClass('d-none');        
    })
    
    function clearCompleteForm() {
        $('#housingForm .jsHousingSubmit').addClass('btn-disabled');
        $('#housingForm .input-textbox[data-type]').addClass('jsValueOK')
        $('[data-type="buyer-quote"]').removeClass("jsValueOK");
        $('#housingForm .input-textbox[data-type]').val('');
        $('#housingForm .form-textbox-new').removeClass('active onchange');
        // $('#housingForm .form-textbox-new .textbox-inner').removeClass('has-rupee-icon');
        // $('#housingForm .form-textbox-new .text-infos').removeClass('hide-input-note');
        $('#housingForm .form-textbox-new .icon-rupee').addClass('d-none');
            
        $('#housingForm .input-textbox[data-type]').parents('.form-textbox-new').removeClass('textboxerror');
        $('#housingForm .input-textbox[data-type]').next().text('');
    }
})

