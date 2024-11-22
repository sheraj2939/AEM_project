(function (_global) {
  var newsLetterBizCallFn = (function (jsHelper) {
    var newsLetterBizObj = {}

    /*4/1/2023*/
    var emailFlag= false;
    var validEmail = {};
    var emailArr;
    var dummyDomains = [];
    $('[data-type="email"]').focus(function(){

    })
  /*subscribe enter functionality*/
  $('#form-subscribe .input-textbox[data-type]').bind('keypress', function(e) {
    var code = e.keyCode || e.which;
    if(code == 13) {
      $('.js-subscribe-btn').trigger('click');
    }
  });
  /*4/1/2023*/

    $("#form-subscribe .js-subscribe-btn").click(function (e) {
      if(sessionStorage.getItem("email") ){
        dummyDomains = sessionStorage.getItem("email");
        emailArr = sessionStorage.getItem("emailArr");
        emailArr = JSON.parse(emailArr);
      }
      var ele_input = $("#form-subscribe .input-textbox");
      // $('.subscribe-success').addClass('d-none');
      var errors = [];
      allFilled = true;
      var ele_required = "Field is required";

      $(ele_input).each(function () {
        var element = $(this);
        var ele_value = element.val();
        var ele_email = "Please enter valid email ID";

        $(element).next().remove();

        if (element.is(":visible")) {
          if (element.val() != "") {
            $(element).after('<span class="error-msgs"></span>');
            if ($(element).data("type") === "email") {
              //var regEmail =/^[a-zA-Z0-9_.]+[@][a-zA-Z0-9]+[\.][a-zA-z0-9]{2,4}$/gm;
              var regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gm;

              if (ele_value != "" && !ele_value.match(regEmail)) {
                $(element).parents(".form-textbox").addClass("textboxerror");
                $(element).next(".error-msgs").text(ele_email);
                errors.push(ele_email);
              } else {
                $(element).parents(".form-textbox").removeClass("textboxerror");
                $(element).next().text("");
              }
            }
          } else {
            $(element).parents(".form-textbox").addClass("textboxerror");
            $(element).after(
              '<span class="error-msgs">' + ele_required + "</span>"
            );
            errors.push(ele_required);
          }
        }
      });
      if (errors.length == 0) {
        var email = $('[data-type="email"]').val();
        var reqObj = { Master: [{ email: email }] };
        newsLetterApiCall(reqObj);
        // $('#form-subscribe .input-textbox').val('');
        // $('#form-subscribe .form-textbox').removeClass('textboxerror');
        // $('#form-subscribe .form-textbox').removeClass('active');
        // $('.subscribe-success').removeClass('d-none');
        // setTimeout(function () {
        //   $('.subscribe-success').addClass('d-none');
        // }, 3000);
      }
    });

    $(".jsSubscribeClose").click(function () {
      $("#form-subscribe .input-textbox").val("");
      $("#form-subscribe .form-textbox").removeClass("textboxerror");
      $("#form-subscribe .form-textbox").removeClass("active");
    });

    $("#form-subscribe .input-textbox[data-type]").keyup(function () {
      if(sessionStorage.getItem("email") ){
        dummyDomains = sessionStorage.getItem("email");
        emailArr = sessionStorage.getItem("emailArr");
        emailArr = JSON.parse(emailArr);
      }
      var element = $(this);
      var ele_value = element.val();
      var ele_required = "Field is required";
      var ele_email = "Please enter valid email ID";

      $(this).next(".error-msgs").remove();
      $(this).after('<span class="error-msgs"></span>');
      $(this).parents(".form-group").addClass("error");

      $(".subscribe-success").addClass("d-none");

      if ($(element).val() != "") {
        if ($(element).data("type") === "email") {
          //var regEmail =/^[a-zA-Z0-9_.]+[@][a-zA-Z0-9]+[\.][a-zA-z0-9]{2,4}$/gm;
          var regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gm;


          if (ele_value != "" && !ele_value.match(regEmail)) {
            $(element).parents(".form-textbox").addClass("textboxerror");
            $(element).next(".error-msgs").text(ele_email);
          } else {
            $(element).parents(".form-textbox").removeClass("textboxerror");
            $(element).next().text("");
          }
        }
      } else {
        $(element).next(".error-msgs").text(ele_required);
      }
    });
    function newsLetterApiCall(reqObj) {
      newsLetterFilterObj
        .newsLetter(reqObj)
        .then(function (response) {
          console.log(response);
          if(response.status == "SUCCESS"){
            $("#form-subscribe .input-textbox").val("");
          $("#form-subscribe .form-textbox").removeClass("textboxerror");
          $("#form-subscribe .form-textbox").removeClass("active");
          $(".subscribe-success").removeClass("d-none");
          setTimeout(function () {
            $(".subscribe-success").addClass("d-none");
          }, 3000);
          $(".modal-backdrop").remove();
          setTimeout(function () {
            $("#subscribe-modal").addClass("popover-show");
          }, 80);

          $("#subscribe-modal").css("display", "block");
          $("body").addClass("popover-modal-open");
          $("body").append('<div class="modal-backdrop"></div>');
          }
        })
        .catch(function (error) {
          console.error(error);
          $("#form-subscribe .input-textbox").val("");
          $("#form-subscribe .form-textbox").removeClass("textboxerror");
          $("#form-subscribe .form-textbox").removeClass("active");
          $('.subscribe-success').html('<p>Something Went Wrong</p>')
          $(".subscribe-success").removeClass("d-none");
          setTimeout(function () {
            $(".subscribe-success").addClass("d-none");
          }, 3000);
        });
    }

    return jsHelper.freezeObj(newsLetterBizObj);
  })(jsHelper);

  _global.jsHelper.defineReadOnlyObjProp(
    _global,
    "newsLetterBizObj",
    newsLetterBizCallFn
  );
})(this || window || {});
