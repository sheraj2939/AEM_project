(function () {
    let query = location.href.split("?")[1];

    if (query && !query.includes("wcmmode=")) {
        let urlParams = getURLParams(atob(query));
        let emailID = urlParams['emailid'];

        if (emailID && emailID != undefined) {
            $("#language-communication-form .jsLangCommunication").on('click', () => {
                makeLanguageApiCall(emailID);
            });
        }
    }

    function makeLanguageApiCall(emailID) {
        $("body").addClass("bg-loader");
        $(".loader").removeClass("hide-loader");

        let language = $('input[name="language communication"]:checked').data('language').trim();
        
        let reqObj = {
            header: { authToken: "fdf" },
            body: { emailId: emailID, language }
        };

        languageInfoFilterObj.languageInfo(reqObj).then(function (response) {
            let res = response.response.responseJson;
            $('.loader').addClass('hide-loader');
            $('body').removeClass('bg-loader');

            if (res.header.status.toLowerCase() === 'success' && res.body.status) {
                $('.loan-against-form').addClass('d-none');
                $('.jsMsgLanguageComm').removeClass('d-none');
                $('.clear-btn').addClass('d-none');
                $('.loan-againstclose-btn').removeClass('d-none');
            } else {
                showFailureModal();
            }
        }).catch(showFailureModal);
    }

    function showFailureModal() {
        $('.loader').addClass('hide-loader');
        $('body').removeClass('bg-loader');
        setTimeout(() => $("#failure-modal").addClass("popover-show"), 80);
        $("#failure-modal").css("display", "block");
        $("body").addClass("popover-modal-open").append('<div class="modal-backdrop"></div>');
    }

    function getURLParams(query) {
        return query.split("&").reduce((params, pair) => {
            const [key, val] = pair.split("=");
            params[key] = val;
            return params;
        }, {});
    }
})();
