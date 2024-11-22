$(document).ready(function () {

  // Clear Loan aganist form
  $(".jsClearLangComm").click(function () {
    $('#language-communication-form .lang-comm-list .langs-radio').prop("checked", false);
    $('#language-communication-form .lang-comm-cols:first-child .lang-comm-list .langs-radio').prop("checked", true);
  });

  /*$("#language-communication-form .jsLangCommunication").click(function () {
    $('.loan-against-form').addClass('d-none');
    $('.jsMsgLanguageComm').removeClass('d-none');
    $('.clear-btn').addClass('d-none');
    $('.loan-againstclose-btn').removeClass('d-none');
  })*/

  $(".jsEditSelections, .jsCloseLangCommMgs").click(function () {
    $('.loan-against-form').removeClass('d-none');
    $('.jsMsgLanguageComm').addClass('d-none');
    $('.clear-btn').removeClass('d-none');
    $('.loan-againstclose-btn').addClass('d-none');
  })

  $(".jsCloseLangCommMgs").click(function () {
    $('#language-communication-form .lang-comm-list .langs-radio').prop("checked", false);
    $('#language-communication-form .lang-comm-cols:first-child .lang-comm-list .langs-radio').prop("checked", true);
  })


});
