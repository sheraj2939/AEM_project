/*Form subscribe*/
$('#form-subscribe .js-subscribe-btn').click(function (e) {
    var ele_input = $('#form-subscribe .input-textbox');
    var errors = [];
    allFilled = true;
    var ele_required = "Field is required";

    $(ele_input).each(function () {
        var element = $(this);
        var ele_value = element.val();
        var ele_name = "Enter full name as PAN card";
        var ele_email = "Please enter valid email ID";

        $(element).next().remove();

        if (element.is(":visible")) {
            if (element.val() != '') {
                $(element).after('<span class="error-msgs"></span>');

                if ($(element).data('type') === 'name') {
                    var regName = /^[a-zA-Z]+ [a-zA-Z]+$/;

                    if (ele_value != '' && !ele_value.match(regName)) {
                        $(element).parents('.form-textbox').addClass('textboxerror');
                        $(element).next('.error-msgs').text(ele_name);
                        errors.push(ele_name);
                    }
                    else {
                        $(element).parents('.form-textbox').removeClass('textboxerror');
                        $(element).next().text('');
                    }
                }
                if ($(element).data('type') === 'email') {
                    var regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gm;

                    if (ele_value != '' && !ele_value.match(regEmail)) {
                        $(element).parents('.form-textbox').addClass('textboxerror');
                        $(element).next('.error-msgs').text(ele_email);
                        errors.push(ele_email);
                    }
                    else {
                        $(element).parents('.form-textbox').removeClass('textboxerror');
                        $(element).next().text('');
                    }
                }
            } else {
                $(element).parents('.form-textbox').addClass('textboxerror');
                $(element).after('<span class="error-msgs">' + ele_required + '</span>');
                errors.push(ele_required);
            }
        }
    });

    if (errors.length == 0) {
        $("#loaderCalc").removeClass("hidden");
        var newsLatterReqObj = { Master: [{ name: $('[data-type="fullname"]').val(), "email-address": $('[data-type="email"]').val() }] };
        wealthNewsLetterFilterObj
            .wealthNewsLatter(newsLatterReqObj)
            .then(function (response) {
                console.log(response);
                if (response.status.toLowerCase() == "success" &&
                    response.response.responseJson.response[0].status.toLowerCase() == "success") {
                        $("#loaderCalc").addClass("hidden");
                    $('.modal-backdrop').remove();
                    setTimeout(function () {
                        $('#subscribe-modal').addClass('popover-show');
                    }, 80);

                    $('#subscribe-modal').css('display', 'block');
                    $('body').addClass('popover-modal-open');
                    $('body').append('<div class="modal-backdrop"></div>');
                }
                else {
                    $("#loaderCalc").addClass("hidden");
                    console.log("API Failure");
                }
            })
        // newsLetter analytics START
        function newsLetter_analytics(){
            try{
                var emailId = getParentElement(e.currentTarget, 1).querySelector('[data-type=email]').value;
                var componentName = getParentElement(e.currentTarget, 9).querySelector('.subscribe-left h2') 
                    ? getParentElement(e.currentTarget, 9).querySelector('.subscribe-left h2').innerText.trim() : '';
                newsletterSubscription(emailId,componentName,getProductCode())
            } catch (err) {console.log(err);}
        }
        newsLetter_analytics();
        // newsLetter analytics END
    }
});

// newsLetter inputfield analytics START
newsletterInp = document.querySelectorAll('#form-subscribe .textbox-inner input');
newsletterInp && newsletterInp.forEach(inp => {
    inp.addEventListener('change', function(e){
        try{
            var fieldName = getParentElement(e.currentTarget, 2).querySelector('.label-name') 
                ? getParentElement(e.currentTarget, 2).querySelector('.label-name').innerText.trim() : '';
            fieldName = fieldName.includes('*') ? fieldName.slice(-1) : fieldName;
            var componentName = getParentElement(e.currentTarget, 9).querySelector('.subscribe-left h2') 
                ? getParentElement(e.currentTarget, 9).querySelector('.subscribe-left h2').innerText.trim() : '';
            inputfieldInteraction(fieldName, componentName, getProductCode());
        } catch (err) { console.log(err); }
    });
});
// newsLetter inputfield analytics END

$('#form-subscribe .input-textbox[data-type]').keyup(function () {
    var element = $(this);
    var ele_value = element.val();
    var ele_required = 'Field is required';
    var ele_name = "Enter full name as PAN card";
    var ele_email = "Please enter valid email ID";

    $(this).next('.error-msgs').remove();
    $(this).after('<span class="error-msgs"></span>');
    $(this).parents('.form-group').addClass('error');

    $('.subscribe-success').addClass('d-none');

    if ($(element).val() != '') {
        if ($(element).data('type') === 'fullname') {
            var regName = /^[a-zA-Z]+ [a-zA-Z]+$/;

            if (ele_value != '' && !ele_value.match(regName)) {
                $(element).parents('.form-textbox').addClass('textboxerror');
                $(element).next('.error-msgs').text(ele_name);
            }
            else {
                $(element).parents('.form-textbox').removeClass('textboxerror');
                $(element).next().text('');
            }
        }

        if ($(element).data('type') === 'email') {
            var regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gm;;

            if (ele_value != '' && !ele_value.match(regEmail)) {
                $(element).parents('.form-textbox').addClass('textboxerror');
                $(element).next('.error-msgs').text(ele_email);
            }
            else {
                $(element).parents('.form-textbox').removeClass('textboxerror');
                $(element).next().text('');
            }
        }

    } else {
        $(element).next('.error-msgs').text(ele_required);
    }
});

$('.jsSubscribeClose').click(function () {
    $('#form-subscribe .input-textbox').val('');
    $('#form-subscribe .form-textbox').removeClass('textboxerror');
    $('#form-subscribe .form-textbox').removeClass('active');
})

/*subscribe enter functionality*/
$('#form-subscribe .input-textbox[data-type]').bind('keypress', function (e) {
    var code = e.keyCode || e.which;
    if (code == 13) {
        $('.js-subscribe-btn').trigger('click');
    }
});
/*Form subscribe*/