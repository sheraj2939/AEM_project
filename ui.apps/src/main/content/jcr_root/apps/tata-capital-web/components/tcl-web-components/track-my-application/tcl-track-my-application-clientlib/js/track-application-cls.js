try{var crossBtn = document.querySelector('.results-box .close-dismiss');
crossBtn.addEventListener('click', function () {
    $('.results-box .close-dismiss').closest('.track-my-application-cls').addClass('d-none');
});}catch(e){console.log("element not found",e);}