$('[data-btnURL]').click(function(e){
    $('#thirdParty-modal #thirdPartyPopUpURL').attr("href",this.dataset.btnurl);
});