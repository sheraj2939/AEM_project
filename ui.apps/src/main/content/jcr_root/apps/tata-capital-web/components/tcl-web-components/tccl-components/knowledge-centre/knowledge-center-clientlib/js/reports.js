$("#jsDownloadForm .input-textbox[data-type]").keyup(function () {
    var element = $(this);
    var ele_value = element.val();
    var ele_required = "Field is required";
    var ele_email = "Please enter valid email ID";
    var ele_firstname = "Please enter valid first name";
    var ele_lastname = "Please enter valid last name";

    $(this).next(".error-msgs").remove();
    $(this).after('<span class="error-msgs"></span>');
    $(this).parents(".form-group").addClass("error");

    $(".subscribe-success").addClass("d-none");

    if ($(element).val() != "") {
        if ($(element).data("type") === "email") {
            var regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gm

            if (ele_value != "" && !ele_value.match(regEmail)) {
                $(element).parents(".form-textbox-new").addClass("textboxerror");
                $(element).next(".error-msgs").text(ele_email);
            } else {
                $(element).parents(".form-textbox-new").removeClass("textboxerror");
                $(element).next().text("");
            }
        }
        if ($(element).data("type") === "firstname") {
            var regName = /^[a-zA-Z]+$/;
            if (ele_value != "" && !regName.test(ele_value)) {
                $(element).parents(".form-textbox-new").addClass("textboxerror");
                $(element).next(".error-msgs").text(ele_firstname);
                $(element).addClass("jsValueOK");
            } else {
                $(element).parents(".form-textbox-new").removeClass("textboxerror");
                $(element).next().text("");
            }
        }
        if ($(element).data("type") === "lastname") {
            var regName = /^[a-zA-Z]+( [a-zA-Z]+)?$/;
            if (ele_value != "" && !regName.test(ele_value)) {
                $(element).parents(".form-textbox-new").addClass("textboxerror");
                $(element).next(".error-msgs").text(ele_lastname);
                $(element).addClass("jsValueOK");
            } else {
                $(element).parents(".form-textbox-new").removeClass("textboxerror");
                $(element).next().text("");
            }
        }
    } else {
        $(element).next(".error-msgs").text(ele_required);
    }
});

$('[data-link]').on('click', function () {
    var pdfDownloadFormModal = $('#pdf-notify')
    setTimeout(function () {
        $(pdfDownloadFormModal).addClass('popover-show')
    }, 80);
    $(pdfDownloadFormModal).css('display', 'block');
    $('body').addClass('popover-modal-open');
    $('body').append('<div class="modal-backdrop"></div>');
    var ele_target = $(this).attr('data-popovermodal');
    var tccl_pdf_url = $(this).attr('pdf_url');
    sessionStorage.setItem('tccl_pdf_url', tccl_pdf_url);
    var tccl_pdf_title = $(this).parent().parent().find('.heading20').text().trim();
    sessionStorage.setItem('tccl_pdf_title', tccl_pdf_title)
    var popParent = $(this).parents('.loaded-itemBox').siblings('#pdf-notify');
    setTimeout(function () {
        popParent.addClass('popover-show')
    }, 80);
    $(this).parents('.loaded-itemBox').siblings('#pdf-notify').css('display', 'block');
    $('body').addClass('popover-modal-open');
});

$("#jsDownloadForm .jsDownloadBtn").click(function (e) {
    var ele_input = $("#jsDownloadForm .input-textbox[data-type]");
    var errors = [];
    allFilled = true;
    var ele_required = "Field is required";

    $(ele_input).each(function () {
        var element = $(this);
        var ele_value = element.val();
        var ele_email = "Please enter valid email ID";
        var ele_firstname = "Please enter valid first name";
        var ele_lastname = "Please enter valid last name";

        $(element).next().remove();

        if (element.is(":visible")) {
            if (element.val() != "") {
                $(element).after('<span class="error-msgs"></span>');
                if ($(element).data("type") === "email") {
                    var regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gm

                    if (ele_value != "" && !ele_value.match(regEmail)) {
                        $(element).parents(".form-textbox-new").addClass("textboxerror");
                        $(element).next(".error-msgs").text(ele_email);
                        errors.push(ele_email);
                    } else {
                        $(element).parents(".form-textbox-new").removeClass("textboxerror");
                        $(element).next().text("");
                    }
                }
                if ($(element).data("type") === "firstname") {
                    var regName = /^[a-zA-Z]+$/;
                    if (ele_value != "" && !regName.test(ele_value)) {
                        $(element).parents(".form-textbox-new").addClass("textboxerror");
                        $(element).next(".error-msgs").text(ele_firstname);
                        errors.push(ele_firstname);
                    } else {
                        $(element).parents(".form-textbox-new").removeClass("textboxerror");
                        $(element).next().text("");
                        $(element).parents(".form-textbox-new").find(".text-infos").removeClass("hide-input-note");
                    }
                }
                if ($(element).data("type") === "lastname") {
                    var regName = /^[a-zA-Z]+( [a-zA-Z]+)?$/;
                    if (ele_value != "" && !regName.test(ele_value)) {
                        $(element).parents(".form-textbox-new").addClass("textboxerror");
                        $(element).next(".error-msgs").text(ele_lastname);
                        errors.push(ele_lastname);
                    } else {
                        $(element).parents(".form-textbox-new").removeClass("textboxerror");
                        $(element).next().text("");
                        $(element).parents(".form-textbox-new").find(".text-infos").removeClass("hide-input-note");
                    }
                }
            } else {
                $(element).parents(".form-textbox-new").addClass("textboxerror");
                $(element).after(
                    '<span class="error-msgs">' + ele_required + "</span>"
                );
                errors.push(ele_required);
            }
        }
    });

    if (errors.length == 0) {
        $('.loader').removeClass('hide-loader');
        $('body').addClass('bg-loader');
        $('.clear-btn').addClass('d-none')

        var requestJosn = {};
        var tcclSubmitJson = {};
        requestJosn.Master = [];
        tcclSubmitJson.firstname = $('#pdf-notify [data-form="firstName"]').val();
        tcclSubmitJson.lastname = $('#pdf-notify [data-form="lastName"]').val();
        tcclSubmitJson.email = $('#pdf-notify [data-form="email"]').val();
        tcclSubmitJson.companyname = $('#pdf-notify [data-form="company"]').val();
        var pdf_title = jsHelper.toStr(sessionStorage.getItem("tccl_pdf_title"));
        tcclSubmitJson.pdftitle = pdf_title;

        requestJosn.Master.push(tcclSubmitJson);

        downloadReportFilterObj.downloadReport(requestJosn).then(function (response) {

            if (response.response.responseJson.response[0].status == "success" && response.status.toLowerCase() == 'success') {
                $("body").removeClass("bg-loader");
                $(".loader").addClass("hide-loader");

                var report_pdf = sessionStorage.getItem('tccl_pdf_url');
                var win = window.open(report_pdf, '_blank');
                sessionStorage.clear();
                var pdfDownloadForm = $('#pdf-notify');
                var pdfThankYoupop = $('#pdf-success-notify');
                $('#jsDownloadForm .input-textbox').val('');
                $('#jsDownloadForm .form-textbox-new').removeClass('textboxerror');
                $('#jsDownloadForm .form-textbox-new').removeClass('active');
                removeModel(pdfDownloadForm);
                showModelFn(pdfThankYoupop);


            } else {
                $("body").removeClass("bg-loader");
                $(".loader").addClass("hide-loader");
                $('.jsSMSSendSuccess').addClass('d-none');
                setTimeout(function () {
                    $("#failure-modal").addClass("popover-show");
                }, 80);

                $("#failure-modal").css("display", "block");
                $("body").addClass("popover-modal-open");
                $("body").append('<div class="modal-backdrop"></div>');
            }
        }).catch(function (error) {
            $('.jsSMSSendSuccess').addClass('d-none');
            $("body").removeClass("bg-loader");
            $(".loader").addClass("hide-loader");
            setTimeout(function () {
                $("#failure-modal").addClass("popover-show");
            }, 80);

            $("#failure-modal").css("display", "block");
            $("body").addClass("popover-modal-open");
            $("body").append('<div class="modal-backdrop"></div>');
        });

    }
});

function showModelFn(element) {
    setTimeout(function () {
        $(element).addClass('popover-show');
    }, 80);
    $(element).css('display', 'block');
    $('body').addClass('popover-modal-open');
    $('body').append('<div class="popover-backdrop"></div>');
}

function removeModel(element) {
    $(element).removeClass('popover-show');
    $(element).css('display', 'none');
    $('body').removeClass('popover-modal-open');
    $('.popover-backdrop').remove();
}

$("#pdf-notify .popover-modal-close").click(function () {
    $('#jsDownloadForm .input-textbox').val('');
    $('#jsDownloadForm .form-textbox-new').removeClass('textboxerror');
    $('#jsDownloadForm .form-textbox-new').removeClass('active');
})