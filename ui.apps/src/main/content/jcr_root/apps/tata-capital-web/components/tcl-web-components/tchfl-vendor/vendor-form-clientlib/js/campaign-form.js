$(document).ready(function (e) {
    try {
        var backBtn = document.querySelector('.formBackBtn');
        backBtn.addEventListener('click', function (e) {
            window.history.back();
        });

    } catch (e) { console.log(e) }
});