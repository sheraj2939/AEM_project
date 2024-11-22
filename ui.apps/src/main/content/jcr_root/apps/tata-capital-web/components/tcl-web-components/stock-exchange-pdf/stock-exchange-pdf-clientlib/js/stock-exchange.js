$('.jsGetValue .custom-checkbox-label').click(function(){
    var dropsValue = $(this).text();
    $(this).parents('.filter-drop-wrap').find('.jsShowDrop').text(dropsValue);
    $(this).parents('.jsGetValue').find('li').removeClass('actives');
    $(this).parents('li').addClass('actives');
    $(this).parents('.filter-drop-wrap').find('.jsShowDrop').removeClass('active');
    $(this).parents('.filter-drop-wrap').find('.jsDropdownBlock').removeClass('show');
});