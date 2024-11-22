$(document).ready(function (e) {
    /* try {
        var backBtn = document.querySelector('.formBackBtn');
        backBtn.addEventListener('click', function (e) {
            window.history.back();
        });

    } catch (e) { console.log(e) } */

    if (get_query().product == "UCL") {
        $('[data-type="productType"]').val('Used car Loan');
        $('[data-type="productType"]').trigger('change');
    }
    if (get_query().product == "LOC") {
        $('[data-type="productType"]').val('Loan on Car');
        $('[data-type="productType"]').trigger('change');
    }
    /* LAS subsource logic change START */
    var getUrlQueryObj = get_query();
    if (jsHelper.isDefined(getUrlQueryObj.subsource)) {
        var getBtnLinkList = $('.modal-yellow-blue .apply-thanks-popup .apply-btns a');
        $(getBtnLinkList).each(function (ind, ele) {
           var getLink = $(this).attr('href');
           if(getLink.includes('#!')){
            var linkReplace = getLink.replace('#!','');
            var finalUrl = linkReplace+'?sourceName='+getUrlQueryObj.subsource+'#!'
            $(this).attr('href',finalUrl)
           }else{
            var finalUrl = getLink+'?sourceName='+getUrlQueryObj.subsource+'#!'
            $(this).attr('href',finalUrl)
           }
        })
    }
    /* LAS subsource logic change END */

    var currentUrl = window.location.href;
    if (currentUrl.indexOf("education-loan") !== -1) {
        $('.textbox-inner input[data-type]').each(function () {
            var label = $(this).closest('.form-textbox-new').find('.label-name');
            label.append(' <span class="text-red bold">*</span>')
        });

        $('.custom-select2 select[data-type]').each(function () {
            var label = $(this).closest('.form-textbox-new').find('.label-name');
            label.append(' <span class="text-red bold">*</span>')
        });
        var ele_required = "Field is required";
        
        $('#loan-against-property .select2-hidden-accessible[data-type]').on('select2:close', function (e) {
            var select = $(this);
            $(select).parents('.form-textbox-new').find('.error-msgs').remove();

            if ($(select).val() == '' || $(select).val() == null) {
                allFilled = false;
                $(select).parents('.form-textbox-new').addClass('textboxerror');
                $(select).parents('.form-textbox-new').find('.text-infos').addClass('hide-input-note');
                $(select).next('.error-msgs').remove();
                $(select).after('<span class="error-msgs" style="top: 43px">' + ele_required + '</span>');
            } else {
                $(select).parents('.form-textbox-new').removeClass('textboxerror');
                $(select).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                $(select).next('.error-msgs').remove();
            }
        });
    }
    
});
function get_query() {
    var url = document.location.href;
    var qs = url.substring(url.indexOf('?') + 1).split('&');
    for (var i = 0, result = {}; i < qs.length; i++) {
        qs[i] = qs[i].split('=');
        result[qs[i][0]] = decodeURIComponent(qs[i][1]);
    }
    return result;
}