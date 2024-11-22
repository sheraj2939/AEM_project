input_animation();
input_animation_new();

$('.only-numeric-input').keyup(function (e) {
    $(this).val($(this).val().replace(/\D/g, ''));
  });