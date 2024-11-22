
//Multiple dropdwon focus
/*
$(document).on('focus', '.js-filterBtn a', function (e) {
    $('.jsMultiDropdown [data-multiselect]').click();
});
*/

$(document).ready(function (){

    /*Multiselect dropdwon*/


    $('.jsMultiDropdown [data-multiselect]').on('click', function () {
        var $id = $(this).attr('data-multiselect');
        if ($('#' + $id).css('display') == 'none') {
            $('.jsMultiDropdown').addClass('show');
            $(this).addClass('active');
        }
        else {
            $('.jsMultiDropdown').removeClass('show');
            $(this).removeClass('active');
        }
    })

    $(document).on("click", function (event) {
        var $trigger = $(".close-on-outside");
        if ($trigger !== event.target && !$trigger.has(event.target).length) {
            $('[data-multiselect]').removeClass('active')
            $(".jsMultiDropdown").removeClass("show");
        }
    });

    /*$('.mulitple-mCustomScrollbar').mCustomScrollbar({
        axis: "y",
        mouseWheel: {
            enable: true,
        },
        documentTouchScroll: false,
        scrollButtons: {
            enable: true,
            scrollAmount: 320,
            scrollType: "stepped",
        },
    });*/

    // var selectArr = [];
    // var joinedVal;
    // $('.js-filterCheck').change(function(){
    //     var newSelectedArr = $(this).attr('data-event');
    //     var selectedActualText = $('[data-item="'+ newSelectedArr +'"] .checkboxtext').text();
    //     // console.log(selectedActualText);
    //     var found = jQuery.inArray(selectedActualText, selectArr);
    //     if (found >= 0){
    //         selectArr.splice(found, 1);
    //         $('.jsMultiSelectList .select-item[data-item="'+ newSelectedArr + '"]').removeClass('active');
    //     } else {
    //         selectArr.push(selectedActualText);
    //         $('.jsMultiSelectList .select-item[data-item="'+ newSelectedArr + '"]').addClass('active');
    //     }
    //     joinedVal = selectArr.join(', ');
    //     console.log(selectArr,joinedVal);
    //     if (joinedVal === ''){
    //         $('.js-filterBtn a').text('Select');
    //         $('.js-filterBtn a').css('color', '#828282');
    //         $('.jsMulitSelectValue').val('Select')
    //     } else{
    //         $('.js-filterBtn a').text(joinedVal);
    //         $('.js-filterBtn a').css('color', '#333333');
    //         $('.jsMulitSelectValue').val(joinedVal);
    //     }
    // });
})