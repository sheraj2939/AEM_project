$('#filterSelectall').click(function () {
    $('.filterSelectedId').prop('checked', this.checked);
  });

  $('.filterSelectedId').change(function () {
      var check = ($('.filterSelectedId').filter(":checked").length == $('.filterSelectedId').length);
      $('#filterSelectall').prop("checked", check);
  });