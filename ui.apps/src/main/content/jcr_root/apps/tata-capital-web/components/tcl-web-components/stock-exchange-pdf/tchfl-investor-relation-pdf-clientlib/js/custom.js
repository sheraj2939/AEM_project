try {
    if ($(".disclaimer-scoll.simple-bar").length > 0) {
      for (i = 0; i < $(".simple-bar").length; i++) {
        new SimpleBar($(".disclaimer-scoll.simple-bar")[i]);
      }
    }
} catch(e) {console.log(e);}

$('.jsGetValue .custom-checkbox-label').click(function(){
    var filter=this.dataset.filteritem;
    var filterValue = $(this).parent().closest('.general-info-top').next().find(".general-info-list").children('li').addClass('d-none');
    var hideTitle=$('.hideTitle').addClass('pd-t15');
    for (let val = 0; val < filterValue.length; val++) {
        const element = filterValue[val];
        element.classList.remove('d-none','customborder','pd-t0i');
        if(element.childNodes[1].dataset.pdffilterdata!=filter){
                element.classList.add('d-none');
        }
    }
    hideTitle.next().each(function(i,e){
        // var pdfCounter=0;
        e.previousElementSibling.classList.remove('d-none');

        var elements=$(e).children('li').filter(function(inx,ele){
            return !ele.classList.contains('d-none');
        });
        if(elements.length==0){
            e.previousElementSibling.classList.add('d-none');
        }
        elements.last().addClass('customborder');
        elements.first().addClass('pd-t0i');
    });
    $('.general-info-bottom').each(function () {
        try{this.querySelectorAll('.hideTitle:not(.d-none)')[0].classList.remove('pd-t15');}catch(e){console.log();}
    })
}); 
$('.custom-dropdown-list.jsGetValue').children(':first-child').children().click();
$('.tchfl-investor-relation-pdf .general-info-box').last().addClass('space-b80','space-tb40');
// $('.tchfl-investor-relation-pdf .general-info-box').last().removeClass('investor-info-pd-b0');
$('.tchfl-investor-relation-pdf .general-info-box').first().addClass('pd-t50');

$('.openDisclaimer').click(function(e){
    $(e.target).parent().next().addClass('popover-show').css({"display": "block"});
    $(e.target).parent().next().removeClass('d-none');
    $('body').append('<div class="modal-backdrop"></div>');
    $('body').addClass('popover-modal-open');
});
$('.jsDiskPop').on('click', function () {
    $(this).parents('.popover-modal').removeClass('popover-show');
    $(this).parents('.popover-modal').removeAttr('style');
    $('.height-scroll').removeAttr('style');
    $('body').removeClass('popover-modal-open');
    $('.modal-backdrop').remove();

    var src = $('#video-modal iframe').attr('src');
    $('#video-modal iframe').attr('src', '');
});