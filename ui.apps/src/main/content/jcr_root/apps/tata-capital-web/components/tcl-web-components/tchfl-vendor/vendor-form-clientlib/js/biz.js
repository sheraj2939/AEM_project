var encodedDoc;
var docType;
var uploadedDocument;
$(document).ready(function () {
    // Clear contact  us form
    $('.jsClearContactForm').click(function () {
        clearCompleteForm();
    })

    $(".js-select2").select2({
        placeholder: "Select",
    });
    $(".js-select2-search-hide").select2({
        minimumResultsForSearch: Infinity,
    });
    var feildsCount = $('#contact-us-no-form .jsValueOK').length;

    //contact  us form key up
    $('#contact-us-no-form .input-textbox[data-type]').keyup(function () {
        var element = $(this);
        var ele_value = element.val();
        var ele_required = 'Field is required';
        var ele_name = "Please enter full name";
        var ele_phoneNumber = "Please enter valid number";
        var ele_email = "Please enter valid email ID";
        var ele_pannumber = "Please enter valid PAN number";

        $(this).next('.error-msgs').remove();
        $(this).after('<span class="error-msgs" style="top: 43px"></span>');
        $(this).parents('.form-group').addClass('error');


        if ($(element).val() != '') {
            if ($(element).data('type') === 'name') {
                var regName = /[A-Za-z]+[ ][A-Za-z]+[ ]+[A-Za-z]$/;
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
                console.log("Tejas email");
                var regEmail = /^[a-zA-Z0-9_.]+[@][a-zA-Z0-9]+[\.][a-zA-z0-9]{2,4}$/gm;
                if ((ele_value != '') && !ele_value.match(regEmail)) {
                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                    $(element).next('.error-msgs').text(ele_email);
                    $(element).addClass('jsValueOK')
                } else {
                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                    $(element).next().text('');
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
                    $(element).removeClass('jsValueOK')
                }
            }
            if ($(element).data('type') === 'pan') {
                var regPan = /[A-Za-z]{5}\d{4}[A-Za-z]{1}/g;
                $(this).val($(this).val().toUpperCase());
                if (ele_value != '' && !ele_value.match(regPan)) {
                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                    $(element).next('.error-msgs').text(ele_pannumber);
                    $(element).addClass('jsValueOK');
                    $('[data-type="name"]').parents('.form-textbox-new').removeClass("active");
                    $('[data-type="email"]').parents('.form-textbox-new').removeClass("active");
                    $('[data-type="mobile"]').parents('.form-textbox-new').removeClass("active");
                    $('[data-type="mobile"]').attr('disabled', 'disabled');
                    $('[data-form="file"]').attr('disabled', 'disabled');
                    $('[data-type="name"]').addClass("jsValueOK");
                    $('[data-type="email"]').parents('.form-textbox-new').addClass("jsValueOK");
                    $('[data-type="email"]').addClass("jsValueOK");
                    $('[data-type="name"]').prop("value", "");
                    $('[data-type="email"]').prop("value", "");
                    $('[data-form="number"]').prop("value", "");
                } else {
                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                    $(element).next().text('');
                    $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                    $(element).removeClass('jsValueOK');
                    var queryParams = '?pan-details=' + ele_value.toUpperCase();
                    // $('[data-type]').parents('.form-textbox-new').addClass("active onchange");
                    var reqObj = {};
                    tchflVendorFilterObj.tchflVendorDataGet(reqObj, queryParams).then(function (responseText) {
                        if (responseText.status.toLowerCase() == "success") {
                            if (responseText.response) {
                                reponseStore = JSON.parse(responseText.response)
                                if (reponseStore.Master.length != 0) {

                                    $('[data-type="name"]').parents('.form-textbox-new').addClass("active");
                                    $('[data-type="email"]').parents('.form-textbox-new').addClass("active");
                                    $('[data-type="mobile"]').removeAttr('disabled');
                                    $('[data-form="file"]').removeAttr('disabled');
                                    $('[data-type="name"]').removeClass("jsValueOK");
                                    $('[data-type="email"]').parents('.form-textbox-new').removeClass("jsValueOK");
                                    $('[data-type="email"]').removeClass("jsValueOK");

                                    reponseStore.Master.forEach(function (el) {
                                        $('[data-type="name"]').val(el["name-of-vendor"]);
                                        $('[data-type="email"]').val(el["email-id"]);
                                    })
                                }
                                else {
                                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                                    $(element).next('.error-msgs').text("Pan Card Not Found");
                                    $(element).addClass('jsValueOK');
                                    $('[data-type="name"]').parents('.form-textbox-new').removeClass("active");
                                    $('[data-type="email"]').parents('.form-textbox-new').removeClass("active");
                                    $('[data-type="mobile"]').attr('disabled', 'disabled');
                                    $('[data-form="file"]').attr('disabled', 'disabled');
                                    $('[data-type="name"]').addClass("jsValueOK");
                                    $('[data-type="email"]').parents('.form-textbox-new').addClass("jsValueOK");
                                    $('[data-type="email"]').addClass("jsValueOK");
                                    $('[data-type="name"]').prop("value", "");
                                    $('[data-type="email"]').prop("value", "");
                                }
                            }
                        }
                    })
                }
            }
        } else {
            if ($(element).data('type') === 'message') {
                $(element).parents('.form-textbox-new').addClass('textboxerror');
                $(element).addClass('jsValueOK');
            }
            $(element).next('.error-msgs').text(ele_required);
        }
        feildsCount = $('#contact-us-no-form .jsValueOK').length;

        if (feildsCount == 0) {
            $('.jsApplyContactUsNo').removeClass('btn-disabled');
        } else {
            $('.jsApplyContactUsNo').addClass('btn-disabled');
        }
    });
    $('.input-filebox').on('change', function () {
        $('.custom-file-input .no-file-text').text(this.files.item(0).name);
        formFile.files[0].size;
        if (this.files.length != 0) {
            if (formFile.files[0].size < 5000000) {
                $("#formFile").removeClass("jsValueOK");
                console.log("file less than 5MB");
                $('.custome-error-msg').addClass('d-none');
            } else {
                $("#formFile").addClass("jsValueOK");
                console.log("File greater Than ");
                $('.custome-error-msg').removeClass('d-none');
            }
            // $("#formFile").removeClass("jsValueOK");
        } else {
            $("#formFile").addClass("jsValueOK");
            console.log("file not uploaded");
        }


        feildsCount = $('#contact-us-no-form .jsValueOK').length;
        if (feildsCount == 0) {
            $('.jsApplyContactUsNo').removeClass('btn-disabled');
        } else {
            $('.jsApplyContactUsNo').addClass('btn-disabled');
        }
    })
    //contact  us form submit
    $('#contact-us-no-form .jsVendorForm').click(function (e) {
        const toBase64 = file => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
        });
        const file = document.querySelector('#formFile').files[0];
        var obj = {};
        $('.loader').removeClass('hide-loader');
        $('body').addClass('bg-loader');
        $('.clear-btn').addClass('d-none');

        toBase64(file).then(function (params) {
            uploadedDocument = params.split('base64,')[1];
            docType = params.split('base64,')[0].split('/')[1].split(';')[0];
            obj.pan = $('[data-form="panNumber"]').val();
            obj.vendorName = $('[data-form="customerName"]').val();
            obj.docType = docType;
            obj.base64String = uploadedDocument;
            obj.email = $('[data-form="personalEmail"]').val();
            obj.docValue = $('.no-file-text').text()
            obj.docName = $('[data-form="docType"]').find(":selected").val();
            var reqObj = {
                "header": {
                    "authToken": "MTI4OjoxMDAwMDo6ZDBmN2I4MGNiODIyNWY2MWMyNzMzN2I3YmM0MmY0NmQ6OjZlZTdjYTcwNDkyMmZlOTE5MGVlMTFlZDNlYzQ2ZDVhOjpkdmJuR2t5QW5qUmV2OHV5UDdnVnEyQXdtL21HcUlCMUx2NVVYeG5lb2M0PQ==",
                    "identifier": "nli"
                },
                "body": {
                    "vendorName": obj.vendorName,
                    "pan": obj.pan,
                    "docType": obj.docType,
                    "docValue": obj.docValue,
                    "docName": obj.docName,
                    "base64String": obj.base64String
                }
            }
            tchflVendorFilterObj.tchflVendorDataPost(reqObj).then(function (response) {
                console.log(response.status.toLowerCase());
                if (response.status.toLowerCase() == "success") {
                    $('.loader').addClass('hide-loader');
                    $('body').removeClass('bg-loader');
                    $('.loan-against-form').addClass('d-none');
                    $('.jsSuccessFiserv').removeClass('d-none');
                } else {
                    if (response.response.responseJson.errorBody.statusCode == "403") {
                        var errorBody = JSON.parse(response.response.responseJson.errorBody.message);
                        if (errorBody.retStatus.toLowerCase() == "failure" && errorBody.sysErrorCode == "ERROTP201") {
                            $('.loader').addClass('hide-loader');
                            $('body').removeClass('bg-loader');
                            /*14-1-2023*/
                            $('#loan-against-otp').addClass('d-none');
                            /*14-1-2023*/
                            $('.jsFailOTPVarification').removeClass('d-none');
                            $('.lead-forms .main-title').addClass('d-none')
                        } else {
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
            clearCompleteForm();
            $('.form-bottom-right-img').addClass('d-none');
            $('.jsMsgContactSuccessful').removeClass('d-none');
            $('#contact-us-no-form').addClass('d-none');
            $('.jsContactUsNoClose').removeClass('d-none');
            $('.clear-btn').addClass('d-none');
        })


    })

    /*loan against otp msg close*/
    $('.jsContactUsMgs').click(function () {
        $('.jsMsgContactSuccessful').addClass('d-none');
        $('.form-bottom-right-img').removeClass('d-none');
        $('.jsContactUsNoClose').addClass('d-none');
        $('.clear-btn').removeClass('d-none');
        $('#contact-us-no-form').removeClass('d-none');
        $('.form-bottom-right-img').removeClass('d-none');
        clearCompleteForm();
    });

    //Select 2 on change remove error state
    $('.js-select2').change(function () {
        $(this).parents('.form-textbox-new').removeClass('textboxerror');
        $(this).next('.error-msgs').remove();
        $(this).removeClass('jsValueOK')
        if ($('#contact-us-no-form .jsValueOK').length == 0) {
            $('.jsApplyContactUsNo').removeClass('btn-disabled');
        } else {
            $('.jsApplyContactUsNo').addClass('btn-disabled');
        }
    })

    //Textarea blur function

    $('.form-textarea').on('blur', function () {
        $(this).closest('.form-textbox-new').addClass('active');
    })

    //Focus open select 2 dropdown
    $(document).on('focus', '.select2.select2-container', function (e) {
        if (e.originalEvent && $(this).find(".select2-selection--single").length > 0) {
            $(this).siblings('select').select2('open');
        }
    });

})

function clearCompleteForm() {
    $('.jsApplyContactUsNo').addClass('btn-disabled');
    $('#contact-us-no-form .input-textbox[data-type]').addClass('jsValueOK')
    $('#contact-us-no-form .input-textbox[data-type]').val('');
    $('#contact-us-no-form .form-textbox-new').removeClass('active onchange');

    $('.js-select2').each(function () {
        $('.js-select2').parents('.form-textbox-new').removeClass('textboxerror');
        $('.js-select2').parents('.form-textbox-new').addClass('active');
        $('.js-select2').next('.error-msgs').remove();
        $('.js-select2').val(null).trigger('change');
        $('.js-select2').addClass('jsValueOK');
    });

    $('#contact-us-no-form .input-textbox[data-type]').parents('.form-textbox-new').removeClass('textboxerror');
    $('#contact-us-no-form .input-textbox[data-type]').next().text('');
    $('.form-textarea').closest('.form-textbox-new').addClass('active');
    $('.input-filebox').closest('.form-textbox-new').addClass('active');
    $('.custom-file-input .no-file-text').text('No file chosen');
    $('.custom-file-input .input-filebox').each(function () {
        $('.custom-file-input .input-filebox[data-file="fileInput"]')[0].value = '';
    })
}