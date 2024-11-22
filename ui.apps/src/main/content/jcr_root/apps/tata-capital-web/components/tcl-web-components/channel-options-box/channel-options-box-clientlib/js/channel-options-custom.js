var corporates = ["Working Capital","Term Loans","Asset Finance","Structured Finance","Leasing"];
var sme = ["Manufacturer","Distributor","Vendor","Service Provider","Retailer"];
var innerTargetVal;
$('#corporate').select2(
    {data:corporates,placeholder: "Select"}
)
$('#sme').select2(
    { data:sme,
      placeholder: "Select"
    }
)
function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
  }
$('#sme').on("change",function () {
    if($(this).val() !== ''){
        innerTargetVal = camelize($(this).val());
        $('.custom-card-div').addClass('d-none');
        $('[data-innerResult="' + innerTargetVal + '"]').removeClass('d-none');
    }
})
$('#corporate').on("change",function () {
    if($(this).val() !== ''){
        innerTargetVal = camelize($(this).val());
        $('.custom-card-div').addClass('d-none');
        $('[data-innerResult="' + innerTargetVal + '"]').removeClass('d-none');
    }
})
