if (localStorage.getItem("faCount") == null) {
    localStorage.setItem("faCount", 1);
}

function wealth_moengage_modal() {
    if (jsHelper.isDef(window.Notification)) {

        if (Notification.permission !== "granted" && Notification.permission !== "denied") {

            if (parseInt(localStorage.getItem("faCount")) < 3) {

                var url = window.location.href;
                if ($('#moengage-modal').length > 0) {

                    $('body').append('<div class="modal-backdrop"></div>');
                    $('body').addClass('modal-open');
                    $('#moengage-modal').addClass('popover-show');
                    $('#moengage-modal').css("display", "block");
                }

                if (localStorage.getItem("faCount") !== null) {

                    var faCountIndex = parseInt(localStorage.getItem("faCount"));
                    faCountIndex++;
                    localStorage.setItem("faCount", faCountIndex);
                }

                $('.js-notificationclose').click(function (event) {

                    $('body').removeClass('modal-open');
                    $('body').find('#push-notification').removeClass('show');
                    $('.notification-backdrop').remove();
                });
                var Moengage = moe({
                    app_id: window.osgiConfigObj.wealthAppId,
                    debug_logs: parseInt(window.osgiConfigObj.debugLogMoengage),
                    swPath: "/service-worker.js",
                    cluster: "DC_3"
                });
                Moengage.call_web_push({
                    "soft_ask": true,
                    "main_class": "moe-main-class",
                    "allow_class": "moe-allow-class",
                    "block_class": "moe-block-class"
                });
                Notification.requestPermission().then(function () {

                    $('body').removeClass('modal-open');
                    $('body').find('#moengage-modal').removeClass('popover-show');
                    $('#moengage-modal').css("display", "none");
                    $('.modal-backdrop').remove();
                });

                if ($(window).width() > 768) {

                    $('.push-msg').removeClass('hidden');
                } else {

                    $('body').removeClass('modal-open');
                    $('body').find('.push-msg').removeClass('popover-show');
                    $('.modal-backdrop').remove();
                }
            }
        }
    }
}

