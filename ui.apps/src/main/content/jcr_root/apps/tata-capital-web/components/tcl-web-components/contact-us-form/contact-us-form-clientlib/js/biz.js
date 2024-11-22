(function (_global) {
    var contactUsFormBizCallFn = (function (jsHelper) {
        var contactUsFormBizObj = {};
        $(document).ready(function () {
            var otpRefNo;
        var queryText;
        var e;
        var message;
        var emailIdContact;
        var sendOtpButtonClick = false; /* otp timer */
        var lanNum;
        var contactCat;
        var contactNam;
        var contactUsMob = location.href.split('?')[1];
        if (contactUsMob && contactUsMob.toLowerCase() === "mobileapp=true") {
            $('.formBackBtn').parents('.comp-back-to').addClass('d-none');
            $('.formBackBtn').parents('.tops-heads').removeClass('has-only-back-btn');
            $('[data-type="query"]').parents('.col-sp30').remove();
        } else {
            $('[data-form="contactus"]').remove();
            $('.formBackBtn').parents('.comp-back-to').removeClass('d-none');
            $('.formBackBtn').parents('.tops-heads').addClass('has-only-back-btn');
        }        
        function getParentElement(element, level = 1) {
            while (level-- > 0) {
            element = element.parentElement;
            if (!element) return null;
            }
            return element;
        }
            $('.lead-forms .main-title').removeClass('d-none');
            // Select 2 js //
            $(".js-select2").select2({
                placeholder: "Select",
            });
            $(".js-select2-search-hide").select2({
                minimumResultsForSearch: Infinity,
            });

            /*$('.only-alpha-input').keypress(function(e) {
                if (String.fromCharCode(e.keyCode).match(/[^a-zA-Z ]/g)) {
                    return false;
                }
            });*/
            $( '.only-alpha-input' ).on("keypress paste", function( e ) {
                var regex = new RegExp( /[^a-zA-Z\b ]/g );
                if ( regex.test( String.fromCharCode( e.which ) ) ) {
                    return false;
                }
            } );
            $('.only-alpha-numeric-input').keypress(function(e) {
                var alphaNumericRegex="^[a-zA-Z0-9]*$";
                if (String.fromCharCode(e.keyCode).match(/[^a-zA-Z0-9 ]/g)) {
                    return false;
                }
            });
            $('#thankyou-modal-mutualFunds [data-dismiss="popover-modal"]').on('click', function () {
                try{
                $('[data-type="security-type"]').val(null).trigger('change');
                }
                catch(e){console.log(e)}
            })
            $('#thankyou-modal-shares [data-dismiss="popover-modal"]').on('click', function () {
                try{
                $('[data-type="security-type"]').val(null).trigger('change');
                }
                catch(e){console.log(e)}
            })
            $('[data-form="tripEndDate"]').on('change',function () {
                var endDate = $('[data-form="tripEndDate"]').val();
                var startDate = $('[data-form="tripStartDate"]').val();
            
                if ((Date.parse(endDate) <= Date.parse(startDate))) {
                    $(this).parents('.form-textbox-new').find('.text-infos').addClass('hide-input-note');

                    $(this).next('.error-msgs').remove();
                    $(this).after('<span class="error-msgs" style="top: 43px"></span>');
                    $(this).parents('.form-group').addClass('error');
                    $(this).parents('.form-textbox-new').addClass('textboxerror');
                    $(this).next('.error-msgs').text("End date should be greater than Start date");
                    $(this).addClass('jsValueOK')
                    // $('[data-form="tripEndDate"]').val(null)
                }
            });
            $('.las-investment').click(function(e){
                $('[data-type="security-type"]').val(null).trigger('change');
                $('#thankyou-modal-shares').removeClass('popover-show');
                $('#thankyou-modal-shares').css({display:'none'});
                $('#thankyou-modal-mutualFunds').removeClass('popover-show');
                $('#thankyou-modal-mutualFunds').css({display:'none'});
                $('.modal-backdrop').remove();
            });
            /*$(".input-textbox").on("input", function () {
                $this = $(this);
                var x = $this.val().replace( /[^a-zA-Z0-9\d.-]/gm, '');        
                $this.val(x);        
                if($this.length==1 && $this.val()=="."){ 
                   $this.val("");    
                }   
            })
            $(".input-textbox").on("paste", function () {    
                       $this = $(this);     
                       var x = $this.val().replace( /[^a-zA-Z0-9, ]/gm, '');   
                       $this.val(x.replace(/./g,''));  
            })*/

            $("[data-type='security-type']").on('select2:select', function (e){
                if($(this).val().toLowerCase() == "shares"){
                   $('#thankyou-modal-shares').addClass('popover-show');
                   $('#thankyou-modal-shares').css({display:'block'});
                   $('body').append('<div class="modal-backdrop"></div>');
                }
                if($(this).val().toLowerCase() == "mutualfunds"){
                    $('#thankyou-modal-mutualFunds').addClass('popover-show');
                    $('#thankyou-modal-mutualFunds').css({display:'block'});
                    $('body').append('<div class="modal-backdrop"></div>');
                 }
           
            })

            $('[data-multiselect="multiselect-drop"]').click(function(e){
                if(document.querySelector('.jsMultiDropdown') && !document.querySelector('.jsMultiDropdown').classList.contains('show')){
                    $('.jsMultiDropdown').addClass('show')
                    $(this).addClass('active')
                }else{
                    $('.jsMultiDropdown').removeClass('show')
                    $(this).removeClass('active')
                }
                e.stopPropagation();
            })

            $('.jsMultiSelectList').click(function(e){
                e.stopPropagation();
            })
            
           $('body').click(function(e){
                if(document.querySelector('.jsMultiDropdown') && document.querySelector('.jsMultiDropdown').classList.contains('show')){
                    $('.jsMultiDropdown').removeClass('show')
                    $(this).removeClass('active')
                } 
            })

            ///Multiple select dropdown whole logic
    var selectArr = [];
    var joinedVal;
    $('.js-filterCheck').change(function () {
        var newSelectedArr = $(this).attr('data-event');
        var selectedActualText = $('[data-item="' + newSelectedArr + '"] .checkboxtext').text();
        // console.log(selectedActualText);
        var found = jQuery.inArray(selectedActualText, selectArr);
        if (found >= 0) {
            selectArr.splice(found, 1);
            $('.jsMultiSelectList .select-item[data-item="' + newSelectedArr + '"]').removeClass('active');
        } else {
            selectArr.push(selectedActualText);
            $('.jsMultiSelectList .select-item[data-item="' + newSelectedArr + '"]').addClass('active');
        }
        joinedVal = selectArr.join(', ');
        if (joinedVal === '') {
            $('.js-filterBtn a').text('Select');
            $('.js-filterBtn a').css('color', '#828282');
            $('.jsMulitSelectValue').val('Select')
        } else {
            $('.js-filterBtn a').text(joinedVal);
            $('.js-filterBtn a').css('color', '#333333');
            $('.jsMulitSelectValue').val(joinedVal);
        }
    });

    $('.js-filterCheck').change(function () {
        $('.js-filterBtn').next('.error-msgs').remove();
        $('.js-filterBtn').after('<span class="error-msgs"></span>');
        $(this).parents('.form-textbox-new').removeClass('textboxerror');
        $('.jsMulitSelectValue').removeClass('jsValueOK');
        MulitSelectVal = $('.jsMulitSelectValue').val();
        if (MulitSelectVal === 'Select') {
            $(this).parents('.form-textbox-new').addClass('textboxerror');
            $('.jsMulitSelectValue').addClass('jsValueOK');
            $('.js-filterBtn').next('.error-msgs').text('Field is required');
        }
        $('#lead-cancer-capture-insurance .jsMultiDropdown [data-type="multiple-dropVal"]').keyup();
    })

    /*9-2-2023*/
  //Focus open select 2 dropdown
  $(document).on('focus', '.select2.select2-container', function (e) {
    if (e.originalEvent && $(this).find(".select2-selection--single").length > 0) {
      $(this).siblings('select').select2('open');
      // Focus on input field on open dropdown
      setTimeout(function (){
        const searchField = document.querySelector('.select2-search__field');
        if(searchField){
          searchField.focus();
        }
      }, 10)
      // Focus on input field on open dropdown
    }
  });
  /*9-2-2023*/
    function clearMultiSelect() {
        $('.js-filterBtn').next('.error-msgs').remove();
        $('.js-filterBtn').parents('.form-textbox-new').removeClass('textboxerror');
        $('.jsMulitSelectValue').addClass('jsValueOK');
        $('.js-filterBtn a').text('Select');
        $('.js-filterBtn a').css('color', '#828282');
        $('.jsMulitSelectValue').val('Select');
        $('.jsMultiDropdown').addClass('active');
        $('.jsMultiSelectList .select-item').removeClass('active');
        $('.jsMultiSelectList .select-item .js-filterCheck').prop('checked', false);
        selectArr = [];
        joinedVal = '';
    }

    function clearRadioInput() {
        $('.jsRadio').closest('.form-textbox-new').addClass('active');
        $('.jsRadio input[value="no"]').each(function () {
            $('.jsRadio input[value="no"]').prop('checked', true);
        })
    }

            ///Multiple select dropdown whole logic    
           if(productCodeId == 'TR102'){
                var reqObj = {}
                contactUsFormFilterObj.countryMaster(reqObj).then(function (response) {
                    if(response.status == "SUCCESS"){
                        JSON.parse(response.response).Master.forEach(function(value) {
                            $('[data-type="travel"]').append('<option value="'+value["country-name"]+'">'+value["country-name"]+'</option>');
                            })
                    }
                })
            }

            // Clear Loan aganist form
            $('.jsClearLoanDeatils').click(function () {
                clearCompleteForm();
                clearMultiSelect();
                clearRadioInput();
            })
            var mobilNumber;
            
            var getWhatsappNub;
            var feildsCount = $('#loan-against-property .jsValueOK').length;
            // console.log(feildsCount);
            var currentYear = new Date().getFullYear();
            var urlData = {};
            var obj = {};
            /*FOR PRODUCTS LEVEL QRC*/
            if (location.search.split("?")[1]) {
                location.search.split("?")[1].split("&").forEach(function (el) {
                    urlData[el.split("=")[0]] = el.split("=")[1];
                });
            }
            var subsource = urlData.subsource;
            var reqObj = {};
            if ($(".productInsurer").length) {
                var productInsurer = {
                    "MO101": ["Tata AIG"],
                    /*"TR102": ["Tata AIG", "Bajaj Allianz"],*/
                    "TR102": ["Tata AIG"],
                    "HE103": ["Tata AIG", "Star Health"],
                    /*"HO104": ["Bajaj Allianz", "Tata AIG"],*/
                    /*"PR105": ["Tata AIA","HDFC Life","Bajaj Allianz","Tata AIG"],*/
                    /*"HO104": ["Bajaj Allianz"],*/
                    "HO104": ["Tata AIG"],
                    "PR105": ["Tata AIA"],
                    /*"SIUL106": ["Tata AIA","HDFC Life"],*/
                    "SIUL106": ["HDFC Life"],
                    /*"SITR107": ["Tata AIA","HDFC Life"],*/
                    "SITR107": ["Tata AIA", "HDFC Life"],
                    "HELI108": ["Tata AIA"],
                    /*"WS101": ["Vhealth", "Bajaj Allianz", "Tata AIG"],*/
                    "WS101": ["Vhealth", "Tata AIG"],
                    "HA101": ["GadgetServ"],
                    /*"HC101": ["Bajaj Allianz", "Tata AIG"],*/
                    "HC101": ["Tata AIG"],
                    "WP101": ["Wallet Assist"],
                    /*"AA101": ["Bajaj Allianz", "Tata AIG"],*/
                    "AA101": ["Tata AIG"],
                    "CS101": ["CPP Group India"],
                    "PE101": ["Bajaj Allianz"],
                    "RS101": ["Tata AIA", "HDFC Life","Star Health"],
                    "HE104": ["HDFC Life"],
                    "HE105": ["HDFC Life","Star Health"],
                    /*"CP101": ["HDFC Life","Tata AIA"],*/
                    "CP101": ["HDFC Life"],
                    "CIS101": ["Bajaj Allianz"],
                    "TW101": ["Tata AIG"]
                }

                var productCode = productCodeId;
                for (var index = 0; index < productInsurer[productCode].length; index++) {
                    $(".productInsurer").append("<option value=\"" + productInsurer[productCode][index] + "\">" + productInsurer[productCode][index] + "</option>")
                }
            }

            //Loan aganist form key up
            $('#loan-against-property .input-textbox[data-type]').on('keyup',function () {
                var element = $(this);
                var ele_value = element.val();
                var ele_required = 'Field is required';
                var ele_email = "Please enter valid email";
                var ele_name = "Please enter full name";
                var ele_phoneNumber = "Please enter valid number";
                var ele_pannumber = "Please enter valid PAN number";
                var ele_pannumber = "Please enter valid PAN number";

                $(this).next('.error-msgs').remove();
                $(this).after('<span class="error-msgs" style="top: 43px"></span>');
                $(this).parents('.form-group').addClass('error');

                // $('.subscribe-success').addClass('d-none');

                if ($(element).val() != '') {
                    $(element).parents('.form-textbox-new').find('.text-infos').addClass('hide-input-note');
                    if ($(element).data('type') === 'name') {
                        var regName = /[A-Za-z]+[ ][A-Za-z]+$/;
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
                    if ($(element).data('type') === 'email') {
                        
                        var regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gm

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
                    if ($(element).data('type') === 'concern') {
                        if (ele_value != '') {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');
                            $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                            $(element).removeClass('jsValueOK')
                        } else {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_name);
                            $(element).addClass('jsValueOK');
                        }
                    }
                    if ($(element).data('type') === 'message') {
                        if (ele_value == '') {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_name);
                            $('.error-msgs').css("top","90px");
                            $(element).addClass('jsValueOK');
                        } else {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');
                            $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                            $(element).removeClass('jsValueOK')
                        }
                    }
                } else {
                    if ($(element).data('type') === 'message') {
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
                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                    $(element).parents('.form-textbox-new').find('.text-infos').addClass('hide-input-note');
                    $(element).parents('.textbox-inner').removeClass('has-rupee-icon');
                    $(element).parents('.textbox-inner').find('.icon-rupee').addClass('d-none');
                    $(element).next('.error-msgs').text(ele_required);
                }
                if ($(element).data('type') === 'lanNum') {
                    if (ele_value != '') {
                        $('[data-popup]').attr("data-popup", "no");
                        $(element).parents('.form-textbox-new').removeClass('textboxerror');
                        $(element).next().text('');
                        $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                        $(element).removeClass('jsValueOK')
                    } else {
                        $('[data-popup]').attr("data-popup", "yes");
                        $(element).parents('.form-textbox-new').removeClass('textboxerror');
                        $(element).next().text('');
                        $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                        $(element).removeClass('jsValueOK')
                    }
                }
                feildsCount = $('#loan-against-property .jsValueOK').length
                if ($('#loan-against-property .jsValueOK').length == 0) {
                    if(($('[data-popup]').attr('data-popup') == 'yes') && (contactUsMob && contactUsMob.toLowerCase() === "mobileapp=true")){
                        $('.jsApplyLoanAgainstProp').off('click');
                        $('.jsApplyLoanAgainstProp').on('click',showOptionPopup);
                    }else{
                        $('#loan-against-property .jsApplyLoanAgainstProp').on('click',applyNowClick);
                    }
                    $('.jsApplyLoanAgainstProp').removeClass('btn-disabled');
                } else {
                    $('.jsApplyLoanAgainstProp').addClass('btn-disabled');
                }
            });

            //Loan aganist form submit
            var userPhoneNumber;
            function applyNowClick(e){
                    $('.jsApplyLoanAgainstProp').addClass('btn-disabled');
                    var ele_input = $('#loan-against-property').find('.form-textbox-new [data-type]:visible');
                    var selectElements = $('#loan-against-property .select2-hidden-accessible[data-type]:visible');
                    var errors = [];
                    allFilled = true;
                    var ele_required = "Field is required";
    
                    //Select 2 validation
                    // $(selectElements).each(function () {
                    //     var select = $(this);
                    //     $(select).parents('.form-textbox-new').find('.error-msgs').remove();
                    //     if ($(select).val() == '') {
                    //         allFilled = false;
                    //         $(select).parents('.form-textbox-new').find('.text-infos').addClass('hide-input-note');
                    //         $(select).parents('.form-textbox-new').addClass('textboxerror');
                    //         $(select).after('<span class="error-msgs">' + ele_required + '</span>');
                    //         errors.push(ele_required);
                    //     } else {
                    //         $(select).parents('.form-textbox-new').removeClass('textboxerror');
                    //         $(select).next('.error-msgs').remove();
                    //         $(select).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                    //     }
                    // });
    
                    $(ele_input).each(function () {
                        var element = $(this);
                        var ele_value = element.val();
                        var ele_email = "Please enter valid email";
                        var ele_name = "Please enter full name";
                        var ele_phoneNumber = "Please enter valid number";
                        var ele_Date = "Invalid Date";
                        var ele_pannumber = "Please enter valid PAN number";
    
                        $(element).parents('.form-textbox-new').find('.error-msgs').remove();
                        $(element).parents('.form-textbox-new').addClass('textboxerror');
    
                        if (element.is(":visible")) {
                            if (element.val() != '') {
                                $(element).parents('.form-textbox-new').find('.text-infos').addClass('hide-input-note');
                                $(element).after('<span class="error-msgs" style="top: 43px"></span>');
    
                                if ($(element).data('type') === 'name') {
                                    var regName = /[A-Za-z]+[ ][A-Za-z]+$/;
                                    // console.log(regName.test(ele_value))
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
                                        var status = panCardValidation(ele_value);
                                        if (status == false) {
                                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                                            $(element).next('.error-msgs').text(ele_pannumber);
                                             errors.push(ele_pannumber)
                                        }else{
                                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                                            $(element).next().text('');
                                        }
                                    }
                                }
                                if ($(element).data('type') === 'concern') {
                                    if (ele_value != '') {
                                        $(element).parents('.form-textbox-new').removeClass('textboxerror');
                                        $(element).next().text('');
                                        $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                                        $(element).removeClass('jsValueOK')
                                    } else {
                                        $(element).parents('.form-textbox-new').addClass('textboxerror');
                                        $(element).next('.error-msgs').text(ele_name);
                                        $(element).addClass('jsValueOK');
                                    }
                                }
                                if ($(element).data('type') === 'message') {
                                    if (ele_value == '') {
                                        $(element).parents('.form-textbox-new').addClass('textboxerror');
                                        $(element).next('.error-msgs').text(ele_name);
                                        $('.error-msgs').css("top","90px");
                                        $(element).addClass('jsValueOK');
                                    } else {
                                        $(element).parents('.form-textbox-new').removeClass('textboxerror');
                                        $(element).next().text('');
                                        $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                                        $(element).removeClass('jsValueOK')
                                    }
                                }
                            } else {
                                $(element).after('<span class="error-msgs" style="top: 43px">' + ele_required + '</span>');
                                errors.push(ele_required);
                                $(element).parents('.form-textbox-new').find('.text-infos').addClass('hide-input-note');
                                if ($(element).data('type') === 'message'){
                                    if (ele_value == '') {
                                        $('.error-msgs').css("top","90px");
                                    }
                                }
                            }
                            if ($(element).data('type') === 'lanNum') {
                                if (ele_value != '' || ele_value == '') {
                                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                                    $(element).next().text('');
                                    $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                                    $(element).removeClass('jsValueOK');
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
    
                    if ($('.jsMulitSelectValue').val() === '') {
                        $('.js-filterBtn').next('.error-msgs').remove();
                    $('.js-filterBtn').after('<span class="error-msgs"></span>');
                    $(this).parents('.form-textbox-new').removeClass('textboxerror');
                    $('.jsMulitSelectValue').removeClass('jsValueOK');
                    $('.js-filterCheck').parents('.form-textbox-new').addClass('textboxerror');
                    $('.jsMulitSelectValue').addClass('jsValueOK');
                    $('.js-filterBtn').next('.error-msgs').text('Field is required');
                    errors.push(ele_required);
                    }
    
                    if (errors.length == 0) {
                        try{
                            // contact us apply form analytics START 
                            var ctaTitle = 'query form apply';   
                            var mobileNo = getParentElement(e.currentTarget, 7).querySelector('[data-form="mobile"]').value;
                            var email = getParentElement(e.currentTarget, 7).querySelector('[data-form="personalEmail"]').value;
                            var componentName = window.location.href.split('/').pop().split('.').shift();
                        } catch(error){
                            console.log('selector not loaded', error);
                        }
                        // contact us apply form analytics END
                        $('#loan-against-property [data-type]').each(function (e, i) {
                            $('[data-form=' + i.dataset.form + ']').val()
                            console.log($('[data-form=' + i.dataset.form + ']').val())
                            if(!$('[data-form=' + i.dataset.form + ']').val() == ""){
                                obj[i.dataset.form] = $('[data-form=' + i.dataset.form + ']').val();
                            }else{
                                obj[i.dataset.form] = $('[data-form=' + i.dataset.form + ']').html();
                            }
                            console.log(obj)
                        })
                        getWhatsappNub = $('[data-type="mobile"]').val();
                        emailIdContact = $('[data-form="personalEmail"]').val();
                    message = $('[data-type="message"]').val();
                    queryText = $('[data-type="concern"]').val();
                    lanNum = $('[data-type="lanNum"]').val();
                        try {
                            optionsVal = document.querySelector('[jsname="js-Category"]');
                            contactCat = optionsVal.options[optionsVal.selectedIndex].text;
                        } catch {
                            console.log("Element not found");
                        }
                        contactNam = $('[data-type="name"]').val();
                        try {
                            e = document.querySelector('[jsname="contact-us-form"]')
                            queryText = e.options[e.selectedIndex].text;
                        } catch {
                            console.log("Element not found");
                        }
                    mobilNumber = $('[data-type="otp-send-number"]').val();
                        clearCompleteForm();
                        clearRadioInput();
                        clearMultiSelect();
                        $('.loader').removeClass('hide-loader');
                        $('body').addClass('bg-loader');
                        mobilNumber = getWhatsappNub;
                        var reqObj = {
                            "header": {
                                "authToken": "MTI4OjoxMDAwMDo6ZDBmN2I4MGNiODIyNWY2MWMyNzMzN2I3YmM0MmY0NmQ6OjZlZTdjYTcwNDkyMmZlOTE5MGVlMTFlZDNlYzQ2ZDVhOjpkdmJuR2t5QW5qUmV2OHV5UDdnVnEyQXdtL21HcUlCMUx2NVVYeG5lb2M0PQ==",
                                "identifier":"nli"
                            },
                            "body": {
                                "mobileNumber": mobilNumber
                            }
                        }
                        contactUsFormFilterObj.generateOtp(reqObj).then(function (response) {
                            if (response.response.responseJson.header.status.toLowerCase() == "success" && response.response.responseJson.body.retStatus.toLowerCase() == "success") {
                                if(response.response.responseJson.body.otpRefNo){
                                    /*otp timer*/
                                    $(".jsGetOTPSent").addClass("d-none");
                                    $('.jsOnGetCall').addClass('d-none');
                                    $('.jsGetOTPSent').addClass('d-none');
                                    resetTimer()
                                    /*otp timer*/
                                    
                                var leadID = response.response.responseJson.body.LeadId ? response.response.responseJson.body.LeadId : '';
                                try{
                                    queryformSubmit(ctaTitle,mobileNo,email,componentName,leadID);
                                } catch(error){
                                    console.log('selector not loaded', error);
                                }
                                otpRefNo = response.response.responseJson.body.otpRefNo;    
                                $('.loader').addClass('hide-loader');
                                $('body').removeClass('bg-loader');
                                $('.loan-against-form').addClass('d-none')
                                $('.loan-against-otp-wrap').removeClass('d-none')
                                $('.loan-againstclose-btn').removeClass('d-none')
                                $('.clear-btn').addClass('d-none')
                                $("#loan-against-otp .input-textbox[data-type=otp-send-number]").val(userPhoneNumber);
                                $("#loan-against-otp .form-textbox-new").addClass('active onchange');
                                // $('#loan-against-otp .jsLoanAgainstSendOTP').trigger('click');
                                $('.jsOTPInputBox').removeClass('d-none');
                                $('.jsLoanAgainstSendOTP').addClass('d-none');
                                $('.jsLoanAgainstSubmitOTP').removeClass('d-none');
                                $('.jsLoanAgainstResendOTP').removeClass('d-none');
                                $('#loan-against-otp').find('.js-OtpBox .input-textbox:first-child').focus();
                                }else{
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
                            }else{
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
                    }
    
                
            }
            function showOptionPopup() {
                if ($('[data-popup]').attr('data-popup') == 'yes') {
                    $('#reach-out-modal').addClass('popover-show');
                    $('#reach-out-modal').css("display", "block");
                    $('body').addClass('popover-modal-open');
                    $('body').append('<div class="modal-backdrop"></div>');
                } else {
                    $('#reach-out-modal').removeClass('popover-show');
                    $('#reach-out-modal').css("display", "none");
                    $('body').removeClass('popover-modal-open');
                    $('.modal-backdrop').remove();
                }
            };
            $('.jsRadioBtnContact').click(function () {
                var getName = $(this).attr('data-name');
                console.log(getName);
                if (getName == "yes") {
                    $('.jsProceedBtnContact').attr('proceed', "yes");
                } else{
                    $('.jsProceedBtnContact').attr('proceed', "no");
                }
                $('.jsProceedBtnContact').removeClass('btn-disabled');
            })
            $('.jsProceedBtnContact').click(function () {
                if($(this).attr('proceed') === "yes"){
                     applyNowClick();
                     $('#reach-out-modal').removeClass('popover-show');
                     $('#reach-out-modal').css("display", "none");
                     $('body').removeClass('popover-modal-open');
                     $('.modal-backdrop').remove();
                }else{
                    $('#reach-out-modal').removeClass('popover-show');
                    $('#reach-out-modal').css("display", "none");
                    $('body').removeClass('popover-modal-open');
                    $('.modal-backdrop').remove();
                }
            })
            //OTP Loan aganist form keyup
                 /*17-2-2023*/
    $('#loan-against-otp .input-textbox[data-type]').keyup(function () {
        var element = $(this);
        var ele_value = element.val();
        var ele_required = 'Field is required';
        var ele_phoneNumber = "Please enter valid number";

        $(this).next('.error-msgs').remove();
        $(this).after('<span class="error-msgs"style="top: 100%"></span>');
        $(this).parents('.form-group').addClass('error');
        if ($(element).val() != '') {
            $('jsLoanAgainstResendOTP').addClass('btn-disabled');
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
            $('jsLoanAgainstResendOTP').addClass('btn-disabled');
            $(element).parents('.form-textbox-new').addClass('textboxerror');
            $(element).next('.error-msgs').text(ele_required);
            $('.jsOTPInputBox').addClass('d-none');
            $('.jsLoanAgainstSubmitOTP').addClass('d-none');
            $('.jsLoanAgainstResendOTP').addClass('d-none');
            $('.jsLoanAgainstSendOTP').removeClass('d-none');
        }
    });
/*17-2-2023*/

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
                mobilNumber = $('[data-type="otp-send-number"]').val();
                /* otp timer */
                sendOtpButtonClick = true;
                $(".jsGetOTPSent").addClass("d-none");
                /* otp timer */
                $('#loan-against-otp .jsLoanAgainstResendOTP').trigger('click');


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
                /*14-1-2023*/ 
                $('.js-OtpBox .input-textbox:first-child').removeClass('pointer-none');
                /*14-1-2023*/
            })

            /*loan against otp resend*/
            $('#loan-against-otp .jsLoanAgainstResendOTP').click(function (e) {
                // contact us form resend otp analytics START
                if(remainingTime !== 0){
                pauseTimerAndModal()
                }
                /* otp timer */
                if (sendOtpButtonClick !== true) {
                    $(".jsLoanAgainstResendOTP").addClass("d-none");
                    $(".jsLoadingBtn").removeClass("d-none");
                    $(".jsGetOTPSent").addClass("d-none");
                }
                /* otp timer */

                try{
                    var ctaText = e.currentTarget.innerText.trim();
                    var ctaTitle = getParentElement(e.currentTarget, 6).querySelector('.loan-against-header').innerText.trim();
                    var componentName = window.location.href.split('/').pop().split('.').shift().split('-').join(' ');
                    ctaInteraction(ctaText,componentName,ctaTitle,'');
                }catch(error){
                    console.log('element not found', error);
                }
                // contact us form resend otp analytics END 
                $('#loan-against-otp .js-OtpBox .input-textbox').val("");
                $('.loader').removeClass('hide-loader');
                $('body').addClass('bg-loader');
                mobilNumber = $('[data-type="otp-send-number"]').val();
                var reqObj = {
                    "header": {
                        "authToken": "MTI4OjoxMDAwMDo6ZDBmN2I4MGNiODIyNWY2MWMyNzMzN2I3YmM0MmY0NmQ6OjZlZTdjYTcwNDkyMmZlOTE5MGVlMTFlZDNlYzQ2ZDVhOjpkdmJuR2t5QW5qUmV2OHV5UDdnVnEyQXdtL21HcUlCMUx2NVVYeG5lb2M0PQ==",
                        "identifier":"nli"
                    },
                    "body": {
                        "mobileNumber": mobilNumber
                    }
                }
                contactUsFormFilterObj.generateOtp(reqObj).then(function (response) {
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
                            if (sendOtpButtonClick == true) {
                               $('.jsOnGetCall').addClass('d-none');
                               $('.jsGetOTPSent').addClass('d-none')
                               resetTimer();
                                $('.loan-otp-timers').removeClass("d-none")
                                sendOtpButtonClick = false;
                            } else {
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
                            }
                            /*otp timer */

                        }else{
                            $('.loader').addClass('hide-loader');
                        $('body').removeClass('bg-loader');
                            /*otp timer */
                            if(remainingTime !== 0){
                            resumeTimer()
                            }
                            $(".jsLoanAgainstResendOTP").removeClass("d-none");
                            $(".jsLoadingBtn").addClass("d-none");
                            if (sendOtpButtonClick == true) {
                                $('.loan-otp-timers').addClass("d-none")
                            }
                            /*otp timer */
                        //failure popup
                        setTimeout(function () {
                            $("#failure-modal").addClass("popover-show");
                          }, 80);
                
                          $("#failure-modal").css("display", "block");
                          $("body").addClass("popover-modal-open");
                          $("body").append('<div class="modal-backdrop"></div>');
                        }
                    }else{
                        $('.loader').addClass('hide-loader');
                        $('body').removeClass('bg-loader');
                        /*otp timer */
                        if(remainingTime !== 0){
                        resumeTimer()
                        }
                        $(".jsLoanAgainstResendOTP").removeClass("d-none");
                        $(".jsLoadingBtn").addClass("d-none");
                        if (sendOtpButtonClick == true) {
                            $('.loan-otp-timers').addClass("d-none")
                        }
                        /*otp timer */
                        //failure popup
                        setTimeout(function () {
                            $("#failure-modal").addClass("popover-show");
                          }, 80);
                
                          $("#failure-modal").css("display", "block");
                          $("body").addClass("popover-modal-open");
                          $("body").append('<div class="modal-backdrop"></div>');
                    }
                }).catch(function (error) {
                    console.error(error);
                    $('.loader').addClass('hide-loader');
                    $('body').removeClass('bg-loader');
                    /*otp timer */
                    if(remainingTime !== 0){
                    resumeTimer()
                    }
                    $(".jsLoanAgainstResendOTP").removeClass("d-none");
                    $(".jsLoadingBtn").addClass("d-none");
                    if (sendOtpButtonClick == true) {
                        $('.loan-otp-timers').addClass("d-none")
                    }
                    /*otp timer */
                    //failure popup
                    setTimeout(function () {
                        $("#failure-modal").addClass("popover-show");
                      }, 80);
            
                      $("#failure-modal").css("display", "block");
                      $("body").addClass("popover-modal-open");
                      $("body").append('<div class="modal-backdrop"></div>');
                });
            });

            /*loan against otp msg close*/
            $('.jsCloseLaonAgainstMgs').click(function () {
                $('.lead-forms .main-title').removeClass('d-none');
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
                clearRadioInput();
                clearMultiSelect();
            });

            /*loan against otp msg success close*/
            /*$('.jsSuccessOTPVarification .jsCloseLaonAgainstMgs').click(function () {
                $('.loan-againstclose-btn').addClass('d-none');
                $('.clear-btn').removeClass('d-none');
                $('.loan-against-form').removeClass('d-none');
                $('.loan-against-otp-wrap').addClass('d-none');
            });*/
            

            /*loan against otp msg try again*/
            $('.jsLoanAgainstTryAgain').click(function () {
                /*14-1-2023*/ 
                $('#loan-against-otp').removeClass('d-none');
                /*14-1-2023*/ 
                $('.jsMsgLoanAgainst').addClass('d-none');
                $(this).parents('#loan-against-otp').find('.jsLoanAgainstSubmitOTP').addClass('btn-disabled');
                $('#loan-against-otp').find('.js-OtpBox .input-textbox').val('');
                $('#loan-against-otp').find('.js-OtpBox .input-textbox:first-child').focus();
                $('#loan-against-otp').find('.jsLoanAgainstSubmitOTP').addClass('btn-disabled');
                $('.form-bottom-right-img').removeClass('d-none');
            });
            $('.jsLoanAgainstTryAgain').click(function () {
                mobilNumber = $('[data-type="otp-send-number"]').val();
                var reqObj = {
                    "header": {
                        "authToken": "MTI4OjoxMDAwMDo6ZDBmN2I4MGNiODIyNWY2MWMyNzMzN2I3YmM0MmY0NmQ6OjZlZTdjYTcwNDkyMmZlOTE5MGVlMTFlZDNlYzQ2ZDVhOjpkdmJuR2t5QW5qUmV2OHV5UDdnVnEyQXdtL21HcUlCMUx2NVVYeG5lb2M0PQ==",
                        "identifier":"nli"
                    },
                    "body": {
                        "mobileNumber": mobilNumber
                    }
                }
                contactUsFormFilterObj.generateOtp(reqObj).then(function (response) {
                    if (response.response.responseJson.header.status == "SUCCESS") {
                        otpRefNo = response.response.responseJson.body.otpRefNo;
                        
                        $('.loader').addClass('hide-loader');
                        $('body').removeClass('bg-loader');
                        $('.loan-against-form').addClass('d-none')
                        $('.loan-against-otp-wrap').removeClass('d-none')
                        $('.loan-againstclose-btn').removeClass('d-none')
                        $('.clear-btn').addClass('d-none')
                        $("#loan-against-otp .input-textbox[data-type=otp-send-number]").val(mobilNumber);
                        $("#loan-against-otp .form-textbox-new").addClass('active onchange');
                        // $('#loan-against-otp .jsLoanAgainstSendOTP').trigger('click');
                        resetTimer();
                    }
                }).catch(function (error) {
                    console.error(error);
                });
            });

            /*loan against otp submit*/
            $('#loan-against-otp .jsLoanAgainstSubmitOTP').click(function (e) {
                var webMob = ''
                if(contactUsMob && contactUsMob.toLowerCase() === "mobileapp=true"){
                    webMob = 'mobile'
                }else{
                    webMob = 'website'
                }
                if(remainingTime !== 0){
                pauseTimerAndModal();
                }
                mobilNumber = $('[data-type="otp-send-number"]').val();

                $('.form-bottom-right-img').addClass('d-none');
                var values = []
                $('#loan-against-otp .js-OtpBox .input-textbox').each(function (i, ele) {
                    values.push(ele.value)
                });
                $('body').removeClass('bg-loader');
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
                contactUsFormFilterObj.verifyOtp(reqObj).then(function (response) {
                    $('body').removeClass('bg-loader');
                    // $('.loader').addClass('hide-loader');
                    if (response.response.responseJson.header.status.toLowerCase() == 'success' && response.response.responseJson.body.retStatus.toLowerCase() == 'success') {
                        var reqObj = {
                            "header": {
                                "authToken": "MTI4OjoxMDAwMDo6YmQ2YzJmMmViNDA5NmY4YzQ5NWU3OWU0ZDEwYmEwY2Q6OjU5YWU4OGIzM2YwZDM4MTZhODkzMDc4MzljM2FlMTMwOjpXV3lyRWd4MUQ3bjFNa1Fzb3I5RDVUZ2UvSkFJZnlid2poNmpmdlduWnBNPQ==",
                                "source": webMob
                            },
                            "body": {
                                "mobileNumber": mobilNumber,
                                "emailId": emailIdContact,
                                "name": contactNam,
                                "lanNumber":lanNum,
                                "category": contactCat,
                                "query": queryText,
                                "message": message,
                                "isOtpVerified": "Y"
                            }
                        }
                        contactUsFormFilterObj.contactUs(reqObj).then(function (response) {
                            if (response.response.responseJson.header.status == 'SUCCESS') {
                                destroyOtpTimer();
                                $('.loader').addClass('hide-loader');
                                $('body').removeClass('bg-loader');
                                $('.jsSuccessOTPVarification').removeClass('d-none');
                                $('#leadId').html(response.response.responseJson.body.contactUsId);
                                $('.loan-against-otp-wrap').addClass('d-none');

                            } 
                            else{
                                destroyOtpTimer();
                                $('.loader').addClass('hide-loader');
                                $('body').removeClass('bg-loader');
                                $('.jsFailLeaApi').removeClass('d-none');
                                $('.loan-against-otp-wrap').addClass('d-none');
                            } 
                        // contact us form lead creation analytics START
                        try{
                            var ctaText = e.currentTarget.innerText.trim();
                            var componentName = window.location.href.split('/').pop().split('.').shift();
                            var mobileNo = getParentElement(e.currentTarget, 6).querySelector('[data-type="otp-send-number"]').value;
                            var contactUsId = response.response.responseJson.body.contactUsId ? response.response.responseJson.body.contactUsId : '';
                            var status = response.response.responseJson.header.status ? response.response.responseJson.header.status : '';
                            leadCreation(ctaText,componentName,mobileNo,'',contactUsId,status);
                        } catch(error){
                            console.log('selector not found', error);
                        }
                        // contact us form lead creation analytics END
                        }).catch(function (error) {
                            destroyOtpTimer();
                            $('.loader').addClass('hide-loader');
                            $('body').removeClass('bg-loader');
                            $('.jsFailLeaApi').removeClass('d-none');
                            $('.loan-against-otp-wrap').addClass('d-none');
                            console.error(error);
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
                        if(response.response.responseJson.errorBody.statusCode == "403") {
                            var errorBody = JSON.parse(response.response.responseJson.errorBody.message);
                            if(errorBody.retStatus.toLowerCase() == "failure" && errorBody.sysErrorCode =="ERROTP201") {
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
                                
                                getOnCallPopup = true /* otp timer */
                                //failure Popup
                                setTimeout(function () {
                                    $("#failure-modal").addClass("popover-show");
                                  }, 80);
                        
                                  $("#failure-modal").css("display", "block");
                                  $("body").addClass("popover-modal-open");
                                  $("body").append('<div class="modal-backdrop"></div>');
                            }
                        }else {
                            if(remainingTime !== 0){
                            resumeTimer()
                            }
                            $('.loader').addClass('hide-loader');
                            $('body').removeClass('bg-loader');

                            getOnCallPopup = true /* otp timer */
                            //failure Popup
                            setTimeout(function () {
                                $("#failure-modal").addClass("popover-show");
                                callPopup = true;
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
                    $("#not-receive-otp-modal .jsModalOnGetCall").addClass('d-none');
                    $("#not-receive-otp-modal").css("display", "none");
                    getOnCallPopup = true /* otp timer */
                    //failure Popup
                    setTimeout(function () {
                        $("#failure-modal").addClass("popover-show");
                      }, 80);
            
                      $("#failure-modal").css("display", "block");
                      $("body").addClass("popover-modal-open");
                      $("body").append('<div class="modal-backdrop"></div>');
                });
                // console.log(values.join(""))
            })

            //Otp details close button
            $('.jsCloseOtpDetails').click(function () {
                $('.loan-against-form').removeClass('d-none');
                $('.loan-against-otp-wrap').addClass('d-none');
                $('.loan-againstclose-btn').addClass('d-none');
                $('.clear-btn').removeClass('d-none');
                clearCompleteForm();
                clearRadioInput();
                clearMultiSelect();
            });
            //Date input format
            $(".date-input").on('input',function () {
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
            $('.price-with-comma-form').on('keyup',function () {
                if ($(this).val() != "") {
                    var rupeeValue = parseFloat($(this).val().replace(/,/g, ''));
                    commaSeparatedValue = rupeeValue.toLocaleString('en-IN');
                    $(this).val(commaSeparatedValue);
                }
            });

            //Select 2 on change remove error state
            $('.js-select2').change(function () {
                $(this).parents('.form-textbox-new').removeClass('textboxerror');
                // $(this).find('.text-infos').removeClass('d-none');
                $(this).next('.error-msgs').remove();
                $(this).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                $(this).removeClass('jsValueOK')
                if ($('#loan-against-property .jsValueOK').length == 0) {
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

            /*otp timer*/
            if ($('#contactusForm').length > 0) {
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
                    contactUsFormFilterObj.onCallOtp(reqObj).then(function (response) {
                        if (response.response.responseJson.header.status.toLowerCase() == 'success' && response.response.responseJson.body.status.toLowerCase() == 'success') {
                            //resumeTimer();
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
            /*otp timer*/
        }
        function formatOption(option) {
            if (!option.id) {
                return option.text;
            }
            var $option = $('<span>' + option.text + '</span>');
            if (option.text.includes('(query about a loan product)')) {
                var newText = option.text.replace('(query about a loan product)', '<em>(query about a loan product)</em>');
                $option.html(newText);
            }
            return $option;
        }

        setTimeout(() => {
            $('.js-select2').select2({
                placeholder: "Select",
                templateResult: formatOption,
                templateSelection: formatOption,
                escapeMarkup: function(markup) {
                    return markup;
                }
            });
        }, 80);

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

        function panCardValidation(ele_value) {
            var productCode = productCodeId
            var status = true;
            var letter = ele_value[3]
        
            if (productCode == 'TWL' || productCode == 'UCL') {
                if (letter != 'P' && letter != 'H') {
                    status = false;
                }
            } else if (productCode == 'HL') {
                if (letter != 'P' && letter != 'H' && letter != 'F' && letter != 'A' && letter != 'T' && letter != 'B') {
                    status = false;
                }
            } else if (productCode == 'PL') {
                if (letter != 'P') {
                    status = false;
                }
            } else if (productCode == 'BL' || productCode == 'LAP') {
                if (letter != 'C' && letter != 'P' && letter != 'H' && letter != 'F' && letter != 'A' && letter != 'T' && letter != 'B' && letter != 'L') {
                    status = false;
                }
            }
        
            return status;
        
        }

        function clearCompleteForm() {
            $('.jsApplyLoanAgainstProp').addClass('btn-disabled');
            $('#loan-against-property .input-textbox[data-type]').addClass('jsValueOK')
            $('#loan-against-property .input-textbox[data-type]').val('');
            $('#loan-against-property .form-textbox-new').removeClass('active onchange');
            $('[data-type="message"]').parents('.form-textbox-new').addClass('active');
            $('#loan-against-property .form-textbox-new .textbox-inner').removeClass('has-rupee-icon');
            $('#loan-against-property .form-textbox-new .text-infos').removeClass('hide-input-note');
            $('#loan-against-property .form-textbox-new .icon-rupee').addClass('d-none');
            // $('.js-select2').val('');
            $('.js-select2').each(function () {
                $('.js-select2').parents('.form-textbox-new').removeClass('textboxerror');
                $('.js-select2').parents('.form-textbox-new').addClass('active');
                $('.js-select2').next('.error-msgs').remove();
                $('.js-select2').val(null).trigger('change');
                $('.js-select2').addClass('jsValueOK');
            });
            $('[data-type="lanNum"]').removeClass('jsValueOK');
            $('#loan-against-property .input-textbox[data-type]').parents('.form-textbox-new').removeClass('textboxerror');
            $('#loan-against-property .input-textbox[data-type]').next().text('');
        }

        return jsHelper.freezeObj(contactUsFormBizObj);
    })(jsHelper);

    _global.jsHelper.defineReadOnlyObjProp(_global, "contactUsFormBizObj", contactUsFormBizCallFn);
})(this || window || {});
