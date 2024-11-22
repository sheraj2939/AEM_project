$(document).ready(function () {

     // Select 2 js //
     $(".js-select2").select2({
        placeholder: "Select",
    });
    $(".js-select2-search-hide").select2({
        minimumResultsForSearch: Infinity,
    });

    
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

    $('[data-type="od-occucation-type"]').on("select2:select", function (e) { 
        var select_val = $(e.currentTarget).val().toLowerCase();    
        if(select_val === 'self employed'){
            $('[data-occupation]').addClass('hidden');
    
            $('[data-occupation="self-employed"]').removeClass('hidden');
            $('[data-occupation="self-employed"]').find('.form-textbox-new').removeClass('textboxerror');
            $('[data-occupation="self-employed"]').find('.form-textbox-new').removeClass('active');
            $('[data-occupation="self-employed"]').find('.form-textbox-new .input-textbox').val('');
            $('[data-occupation="self-employed"]').find('.form-textbox-new .error-msgs').remove();
            $('[data-occupation="salaried"] #searchCompany').val('');
            $('[data-occupation="salaried"] [data-multiselect]').addClass('jsValueOK');
            $('[data-occupation="degsnation"] #searchDesiganationList').val('');
            $('.jsApplyLoanAgainstProp').addClass('btn-disabled');
        }    
        if(select_val === 'salaried'){      
            $('[data-occupation]').addClass('hidden');    

            $('[data-occupation="salaried"]').removeClass('hidden');
            $('[data-occupation="degsnation"]').removeClass('hidden');            

            $('[data-occupation="salaried"] [data-multiselect]').text('Select');
            $('[data-occupation="salaried"] .jsGetValue li').removeClass('active');            
            $('[data-occupation="salaried"] #searchCompany').val('');
            $('#searchCompanyList li').removeAttr('style');    
            $('[data-occupation="salaried"] .form-textbox-new' ).removeClass('textboxerror');
            $('[data-occupation="salaried"] .form-textbox-new').next('.error-msgs').remove();            
            $('[data-occupation="degsnation"] [data-multiselect]').addClass('jsValueOK');

            $('[data-occupation="degsnation"] [data-multiselect]').text('Select');
            $('[data-occupation="degsnation"] .jsGetValue li').removeClass('active');            
            $('#searchDesiganationList li').removeAttr('style');    
            $('[data-occupation="degsnation"] .form-textbox-new' ).removeClass('textboxerror');
            $('[data-occupation="degsnation"] .form-textbox-new').next('.error-msgs').remove();   
            $('.jsApplyLoanAgainstProp').addClass('btn-disabled');           
                 
        }
    }); 
    
    
    $("#searchCompany ").on("keyup", function() {
        var value = $(this).val().toLowerCase();    
        if(value){
            $("#searchCompanyList li").filter(function() {
                $(this).toggle($(this).text().toLowerCase().includes(value))            
            });
        }
    });

    $("#searchdesiganation").on("keyup", function() {
        var value = $(this).val().toLowerCase();    
        if(value){
            $("#searchDesiganationList li").filter(function() {
                $(this).toggle($(this).text().toLowerCase().includes(value))            
            });
        }
    });    
    
    
    $('.jsAddManually').click(function(){            

        $('[data-occupation="salaried"]').addClass('hidden');
        $('[data-occupation="salaried-list"]').removeClass('hidden').addClass('jstext');
        $('[data-occupation="salaried-list"] input').val('');

        $('[data-occupation="salaried-list"]').find('.input-textbox').focus();
        $('[data-occupation="salaried"] #searchCompany').val('');   

        $('.jsMultiDropdown').removeClass('show');
        $('.jsMultiDropdown [data-multiselect]').removeClass('active');
    
    })

    $('.jsAddManuallyDesigantion').click(function(){            

        $('[data-occupation="degsnation"]').addClass('hidden');
        $('[data-occupation="degsnation-list"] input').val('');

        $('[data-occupation="degsnation-list"]').removeClass('hidden').addClass('jstext2');
        $('[data-occupation="degsnation-list"]').find('.input-textbox').focus();
        $('[data-occupation="degsnation"] #searchdesiganation').val('');   

        $('.jsMultiDropdown').removeClass('show');
        $('.jsMultiDropdown [data-multiselect]').removeClass('active');
    
    })

    $('.jsSearchVali li').click(function(){
        if($(this).hasClass('active')){
            $('[data-occupation="salaried"] .form-textbox-new').removeClass('textboxerror');
            $('[data-occupation="salaried"] .form-textbox-new').next('.error-msgs').remove();
        }
    })    

    $('.jsSearchVali2 li').click(function(){
        if($(this).hasClass('active')){
            $('[data-occupation="degsnation"] .form-textbox-new').removeClass('textboxerror');
            $('[data-occupation="degsnation"] .form-textbox-new').next('.error-msgs').remove();
        }
    })

    $('.jsGetValue li a').click(function(){
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
        if(feildsCount === 0){
            $('.jsApplyLoanAgainstProp').removeClass('btn-disabled');
        } else {
            $('.jsApplyLoanAgainstProp').addClass('btn-disabled');
        } 
    })

    // Clear Loan aganist form
    $('.jsClearLoanDeatils').click(function () {
        clearCompleteForm();
    })

    
    var feildsCount = $('#loan-against-property .jsValueOK:visible').length;
    console.log(feildsCount);
    

    //Loan aganist form key up
    $('#loan-against-property .input-textbox[data-type]').keyup(function () {
        var element = $(this);
        var ele_value = element.val();
        var ele_required = 'Field is required';
        var ele_email = "Please enter valid email ID";        
        var ele_Fname = "Please enter first name";
        var ele_Lname = "Please enter last name";
        var ele_phoneNumber = "Please enter valid number";
        var ele_Date = "Please enter valid Date";
        var ele_pannumber = "Please enter valid PAN number";

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
                var regEmail = /^[a-zA-Z0-9_.]+[@][a-zA-Z0-9]+[\.][a-zA-z0-9]{2,4}$/gm;

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
                if (ele_value == '') {
                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                    $(element).next('.error-msgs').text(ele_required);
                    $(element).addClass('jsValueOK')
                } else {
                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                    $(element).next().text('');
                    $(element).removeClass('jsValueOK')
                }
            }
            if ($(element).data('type') === 'ra-address2') {                
                if (ele_value == '') {
                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                    $(element).next('.error-msgs').text(ele_required);
                    $(element).addClass('jsValueOK')
                } else {
                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                    $(element).next().text('');
                    $(element).removeClass('jsValueOK')
                }
            }
            if ($(element).data('type') === 'ra-address3') {                
                if (ele_value == '') {
                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                    $(element).next('.error-msgs').text(ele_required);
                    $(element).addClass('jsValueOK')
                } else {
                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                    $(element).next().text('');
                    $(element).removeClass('jsValueOK')
                }
            }
            if ($(element).data('type') === 'od-companyname') {                
                if (ele_value == '') {
                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                    $(element).next('.error-msgs').text(ele_required);
                    $(element).addClass('jsValueOK')
                } else {
                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                    $(element).next().text('');
                    $(element).removeClass('jsValueOK')
                }
            }
            if ($(element).data('type') === 'od-companynamesal') {                
                if (ele_value == '') {
                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                    $(element).next('.error-msgs').text(ele_required);
                    $(element).addClass('jsValueOK')
                } else {
                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                    $(element).next().text('');
                    $(element).removeClass('jsValueOK')
                }
            }
            if ($(element).data('type') === 'od-degsnation') {                
                if (ele_value == '') {
                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                    $(element).next('.error-msgs').text(ele_required);
                    $(element).addClass('jsValueOK')
                } else {
                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                    $(element).next().text('');
                    $(element).removeClass('jsValueOK')
                }
            }
            if ($(element).data('type') === 'od-degsnationsal') {                
                if (ele_value == '') {
                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                    $(element).next('.error-msgs').text(ele_required);
                    $(element).addClass('jsValueOK')
                } else {
                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                    $(element).next().text('');
                    $(element).removeClass('jsValueOK')
                }
            }
            if ($(element).data('type') === 'od-email') {
                var regEmail = /^[a-zA-Z0-9_.]+[@][a-zA-Z0-9]+[\.][a-zA-z0-9]{2,4}$/gm;

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
        if(feildsCount === 0){
            $('.jsApplyLoanAgainstProp').removeClass('btn-disabled');
        } else {
            $('.jsApplyLoanAgainstProp').addClass('btn-disabled');
        }        
    });

    //Loan aganist form submit
    var userPhoneNumber;
    $('#loan-against-property .jsApplyLoanAgainstProp').click(function () {
        $('.jsApplyLoanAgainstProp').addClass('btn-disabled');
        var ele_input = $('#loan-against-property').find('.form-textbox-new [data-type]:visible');
        var selectElements = $('#loan-against-property .select2-hidden-accessible[data-type]:visible');
        var errors = [];
        allFilled = true;
        var ele_required = "Field is required";        

        $(ele_input).each(function () {
            var element = $(this);
            var ele_value = element.val();
            var ele_email = "Please enter valid email ID";
            var ele_firstname = "Please enter first name";
            var ele_lastname = "Please enter last name";
            var ele_phoneNumber = "Please enter valid number";
            var ele_Date = "Please enter valid Date";
            var ele_pannumber = "Please enter valid PAN number";            

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
                        if (ele_value == '') {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_required);
                            errors.push(ele_required);
                        } else {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');                            
                        }
                    }
                    if ($(element).data('type') === 'ra-address2') {                        
                        if (ele_value == '') {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_required);
                            errors.push(ele_required);
                        } else {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');                            
                        }
                    }
                    if ($(element).data('type') === 'ra-address3') {                        
                        if (ele_value == '') {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_required);
                            errors.push(ele_required);
                        } else {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');                            
                        }
                    }
                    if ($(element).data('type') === 'od-companyname') {                        
                        if (ele_value == '') {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_required);
                            errors.push(ele_required);
                        } else {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');                            
                        }
                    }
                    if ($(element).data('type') === 'od-companynamesal') {                        
                        if (ele_value == '') {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_required);
                            errors.push(ele_required);
                        } else {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');                            
                        }
                    }
                    if ($(element).data('type') === 'od-email') {
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
                    if ($(element).data('type') === 'od-degsnation') {                        
                        if (ele_value == '') {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_required);
                            errors.push(ele_required);
                        } else {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');                            
                        }
                    }
                    if ($(element).data('type') === 'od-degsnationsal') {                        
                        if (ele_value == '') {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_required);
                            errors.push(ele_required);
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

        if($('[data-occupation="salaried"]:visible [data-multiselect]').text()==="Select"){
            $('[data-occupation="salaried"] .form-textbox-new').addClass('textboxerror');
            $('[data-occupation="salaried"] .new-custom-drops').after('<span class="error-msgs">' + ele_required + '</span>');
            errors.push(ele_required);
        }else {
            $('[data-occupation="salaried"] .form-textbox-new').removeClass('textboxerror');
            $('[data-occupation="salaried"] .form-textbox-new').next('.error-msgs').remove();
        }

        if($('[data-occupation="degsnation"]:visible [data-multiselect]').text()==="Select"){
            $('[data-occupation="degsnation"] .form-textbox-new').addClass('textboxerror');
            $('[data-occupation="degsnation"] .new-custom-drops').after('<span class="error-msgs">' + ele_required + '</span>');
            errors.push(ele_required);
        }else {
            $('[data-occupation="degsnation"] .form-textbox-new').removeClass('textboxerror');
            $('[data-occupation="degsnation"] .form-textbox-new').next('.error-msgs').remove();
        }

        console.log(errors);
        if (errors.length == 0) {
            clearCompleteForm();
            $('.loan-against-form').addClass('d-none')
            $('.loan-against-otp-wrap').removeClass('d-none')
            $('.loan-againstclose-btn').removeClass('d-none')
            $('.clear-btn').addClass('d-none')
            $("#loan-against-otp .input-textbox[data-type=otp-send-number]").val(userPhoneNumber);
            $("#loan-against-otp .form-textbox-new").addClass('active onchange');
            $('#loan-against-otp .jsLoanAgainstSendOTP').trigger('click');
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
            var enterotpText = 'Please enter the 4 digit OTP sent to your mobile number';
            $('.jsOtpHeading').html(enterotpText);
            $('.jsOTPInputBox').removeClass('d-none');
            $('.jsLoanAgainstSendOTP').addClass('d-none');
            $('.jsLoanAgainstSubmitOTP').removeClass('d-none');
            $('.jsLoanAgainstResendOTP').removeClass('d-none');
            $('#loan-against-otp').find('.js-OtpBox .input-textbox:first-child').focus();
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
                $(this).parents('#loan-against-otp').find('.jsLoanAgainstSubmitOTP').removeClass('btn-disabled');
            } else {
                $(this).parents('#loan-against-otp').find('.jsLoanAgainstSubmitOTP').addClass('btn-disabled');
            }
        });        
        $('.js-OtpBox .input-textbox:first-child').removeClass('pointer-none');        
    })

    /*loan against otp resend*/
    $('#loan-against-otp .jsLoanAgainstResendOTP').click(function () {
        $(this).parents('#loan-against-otp').find('.js-OtpBox .input-textbox').val('');
        $(this).parents('#loan-against-otp').find('.js-OtpBox .input-textbox:first-child').focus();
        $(this).parents('#loan-against-otp').find('.js-OtpBox .input-textbox').addClass('pointer-none');
        $(this).parents('#loan-against-otp').find('.js-OtpBox .input-textbox:first-child').removeClass('pointer-none');
        $(this).parents('#loan-against-otp').find('.jsLoanAgainstSubmitOTP').addClass('btn-disabled');
    });

    /*loan against otp msg close*/
    $('.jsCloseLaonAgainstMgs').click(function () {
        $('.jsMsgLoanAgainst').addClass('d-none');
        // $("#loan-against-otp .input-textbox[data-type=otp-send-number]").val('');
        $('#loan-against-otp').find('.js-OtpBox .input-textbox').val('');
        $('.jsOTPInputBox').addClass('d-none');
        $('#loan-against-otp').find('.jsLoanAgainstSubmitOTP').addClass('btn-disabled d-none');
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
        
        $('#loan-against-otp').removeClass('d-none');        
        $('.jsMsgLoanAgainst').addClass('d-none');
        $(this).parents('#loan-against-otp').find('.jsLoanAgainstSubmitOTP').addClass('btn-disabled');
        $('#loan-against-otp').find('.js-OtpBox .input-textbox').val('');
        $('#loan-against-otp').find('.js-OtpBox .input-textbox:first-child').focus();
        $('#loan-against-otp').find('.jsLoanAgainstSubmitOTP').addClass('btn-disabled');
        $('.form-bottom-right-img').removeClass('d-none');
    });

    /*loan against otp submit*/
    $('#loan-against-otp .jsLoanAgainstSubmitOTP').click(function () {
        $('.form-bottom-right-img').addClass('d-none');
        var values = []
        $('#loan-against-otp .js-OtpBox .input-textbox').each(function (i, ele) {
            values.push(ele.value)
        });        
        if (values.join("") == "9999") {           
            $('#loan-against-otp').addClass('d-none');            
            $('.jsSuccessOTPVarification').removeClass('d-none');
        } else {            
            $('#loan-against-otp').addClass('d-none');            
            $('.jsFailOTPVarification').removeClass('d-none');
        }
    })

    //Otp details close button
    $('.jsCloseOtpDetails').click(function () {
        $('.loan-against-form').removeClass('d-none');
        $('.loan-against-otp-wrap').addClass('d-none');
        $('.loan-againstclose-btn').addClass('d-none');
        $('.clear-btn').removeClass('d-none');
        clearCompleteForm()
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
            this.value = parts.join('/')
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
    
    $('#iAgreeTerms').on('change', function (){
        var checkRequired = 'Please confirm checkbox';
        $(this).parents().find('.custom-checkbox-label').next('.error-msgs').remove();
        $(this).parents().find('.custom-checkbox-label').after('<span class="error-msgs" style="top: calc(100% - 20px)"></span>');
        isCheckboxChecked = $(this).is(':checked');
        console.log(isCheckboxChecked)
        if (isCheckboxChecked === true){
            $(this).removeClass('jsValueOK');
        } else {
            $(this).addClass('jsValueOK');
            $(this).parents().find('.custom-checkbox-label').next('.error-msgs').text(checkRequired);
        }

        feildsCount = $('#loan-against-property .jsValueOK:visible').length
        console.log(feildsCount);
        if(feildsCount === 0){
            $('.jsApplyLoanAgainstProp').removeClass('btn-disabled');
        } else {
            $('.jsApplyLoanAgainstProp').addClass('btn-disabled');
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
        if(feildsCount === 0){
            $('.jsApplyLoanAgainstProp').removeClass('btn-disabled');
        } else {
            $('.jsApplyLoanAgainstProp').addClass('btn-disabled');
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
    $('.jsApplyLoanAgainstProp').addClass('btn-disabled');
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
    if($($('[data-occupation="salaried"] [data-multiselect]').text() === "Select")){   
        $('#searchCompanyList li').removeAttr('style'); 
        $('#searchCompany').val('');
    }
    $('#searchCompany').click(function(e){
        e.stopPropagation();
    })    
    $('.jstext input').blur(function(){        
        if($('.jstext input').val() == ''){
            $('[data-occupation="salaried-list"]').addClass('hidden');
            $('[data-occupation="salaried"]').removeClass('hidden');
            $('#searchCompanyList li').removeAttr('style');            
        }
    })


    if($($('[data-occupation="degsnation"] [data-multiselect]').text() === "Select")){   
        $('#searchDesiganationList li').removeAttr('style'); 
        $('#searchdesiganation').val('');
    }
    $('#searchdesiganation').click(function(e){
        e.stopPropagation();
    })
    $('.jstext2 input').blur(function(){        
        if($('.jstext2 input').val() == ''){
            $('[data-occupation="degsnation-list"]').addClass('hidden');
            $('[data-occupation="degsnation"]').removeClass('hidden');
            $('#searchCompanyList li').removeAttr('style');            
        }
    })  
});