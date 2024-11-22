document.addEventListener('DOMContentLoaded', function(e) {
        document.cookie.split("; ").forEach(function(cookie) {
            if (cookie.split("=")[0] == 'Linguify_Lang') {
                linguaCookie = cookie.split("=")[1];
                if (window.location.href.search("/hi/") !== -1) {
                   // digitalData.language = "HI";
                    $("#selectLocale").find("[value='hi_IN']").attr("selected", true);
                    lnfySetCookies("Linguify_Lang", "hi_IN");
                } else {
                    $("#selectLocale").find("[value='en-US']").attr("selected", true);
                    lnfySetCookies("Linguify_Lang", "en-US");
                }
            }
        });
    });
    function lnfyChangeLanguage(selectItem) {
        var selectedLanguage = selectItem[selectItem.selectedIndex].value;
        lnfySetCookies('Linguify_Lang', selectedLanguage);
        if (selectedLanguage == 'hi_IN') {
            var URLPath = window.location.pathname;
            var URLPathfullName;
            $("#selectLocale").find("[value='hi_IN']").attr("selected", true);
            if (URLPath.indexOf('/hi/') > -1) {
                URLPathfullName = URLPath;
            } else {
                URLPathfullName = "/hi" + URLPath;
            }
            window.location.href = "https://www.tatacapital.com" + URLPathfullName;
        } else {
            var URLPath = window.location.pathname;
            var URLPathfullName;
            $("#selectLocale").find("[value='en-US']").attr("selected", true);
            if (URLPath.indexOf('/hi/') > -1) {
                URLPathfullName = URLPath.slice(3, URLPath.lenght);
            } else {
                URLPathfullName = URLPath;
            }
            window.location.href = "https://www.tatacapital.com" + URLPathfullName;
        }
    }
    function lnfySetCookies(cname, cvalue) {
        document.cookie = cname + "=" + cvalue + "; " + "; " + "path=/;domain=.tatacapital.com";
    }
    /* 14/04/2021 Unusable script
    document.querySelector('[data-vechileradio="vechileradio"]').addEventListener('click', function() {
        document.querySelector('.wedding-tab-links input[name="vechile-radio"]').checked = true
    });
     14/04/2021 */
