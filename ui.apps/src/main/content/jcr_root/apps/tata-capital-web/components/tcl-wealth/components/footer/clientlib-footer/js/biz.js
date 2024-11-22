$(document).ready(function () {
  $('.footer-main-content .footer-row .footer-headings').each(function () {
    $(this).click(function () {
      $(this).toggleClass('active');
      $(this).siblings('.footer-body').slideToggle();
      $(this).parents('.footer-row').siblings('.footer-row').find('.footer-headings').removeClass('active');
      $(this).parents('.footer-row').siblings('.footer-row').find('.footer-body').slideUp();

      $(this).parents('.footer-main-content').siblings('.our-other-websites').find('.footer-headings').removeClass('active');
      $(this).parents('.footer-main-content').siblings('.our-other-websites').find('.our-websites-inner').slideUp();
    })
  })
  $('.jsAccordian [accod-head]').each(function (ele) {
    $(this).click(function () {
      $(this).toggleClass('active');
      $(this).siblings('[accod-body]').slideToggle('100');
      $(this).parents('[accod-row]').siblings('[accod-row]').find('[accod-head]').removeClass('active');
      $(this).parents('[accod-row]').siblings('[accod-row]').find('[accod-body]').slideUp();
      $(this).parents('.our-other-websites').siblings('.footer-main-content').find('.footer-col .footer-headings').removeClass('active').siblings('.footer-body').slideUp();
    })
  })
});

var languageOption = $("#mitc-language-dropdown option");
$(".tab-panel ul li").click(function (e) {
  var footerHead = e.target.text;
  $("#mitc-language-dropdown option").remove();
  $("#mitc-language-dropdown")
    .html(
      "<option value='none' data-parent=' ' data-pdf='' class='optInvisible' selected disabled>Select an Option</option>"
    )
    .trigger("change");
  var filteredOption = languageOption.filter(
    '[data-parent ="' + footerHead + '"]' || '[data-parent =" "]'
  );
  $("#mitc-language-dropdown").append(filteredOption);
  $("#mitc-language-dropdown").select2().val("none").trigger("change.select2");
});

$("#mitc-language-dropdown").on("change", function (e) {
  if ($('#mitc-language-download-btn[style*="pointer-events"]')) {
    $("#mitc-language-download-btn").removeAttr("style");
  }
  var pdf = $("#mitc-language-dropdown option:selected").attr("data-pdf");
  $("#mitc-language-download-btn").attr("href", pdf);
});

$("[data-popovermodalMITC]").on("click", function (e) {
  e.preventDefault();
  var ele_target = $(this).attr("data-popovermodalMITC");
  setTimeout(function () {
    $(ele_target).addClass("popover-show");
  }, 80);
  $('.footer-inner').append('<div class="modal-backdrop"></div>');
  $(ele_target).css("display", "block");
  $("body").addClass("popover-modal-open");
});

$("[data-popovermodalMITC]").click(function (e) {
  e.preventDefault();
  var text_ele = $(this).text();
  $("#prefrencelang-modal").find("h3 span").text(text_ele);
  $('[data-type="language"]').select2().val("").trigger("change");
  $("#download").addClass("disabled");
});

$("#mitc-language-dropdown").on("select2:select", function (e) {
  // Do something
  $("#mitc-language-download-btn").removeClass("disabled");
});

$(".prefrence-language-content .popover-modal-close").click(function (e) {
  $("#mitc-language-download-btn").addClass("disabled");
});

$("[data-popovermodalMITC2]").on("click", function (e) {
  e.preventDefault();
  var ele_target = $(this).attr("data-popovermodalMITC2");
  setTimeout(function () {
    $(ele_target).addClass("popover-show");
  }, 80);
  $('.footer-inner').append('<div class="modal-backdrop"></div>');
  $(ele_target).css("display", "block");
  $("body").addClass("popover-modal-open");
});

$("[data-popovermodalMITC2]").click(function (e) {
  e.preventDefault();
  var text_ele = $(this).text();
  $("#language-notification2").find("h3 span").text(text_ele);
  $('[data-type2="language"]').select2().val("").trigger("change");
  $("#download").addClass("disabled");
});

$("#mitc-language-dropdown-investor").on("select2:select", function (e) {
  // Do something
  $("#mitc-language-download-btn-investor").removeClass("disabled");
});

$("#mitc-language-dropdown-investor").on("change", function (e) {
  if ($('#mitc-language-download-btn-investor[style*="pointer-events"]')) {
    $("#mitc-language-download-btn-investor").removeAttr("style");
  }
  var pdf = $("#mitc-language-dropdown-investor option:selected").attr("data-pdf");
  $("#mitc-language-download-btn-investor").attr("href", pdf);
});

$(".prefrence-language-content2 .popover-modal-close").click(function (e) {
  $("#mitc-language-download-btn-investor").addClass("disabled");
});
