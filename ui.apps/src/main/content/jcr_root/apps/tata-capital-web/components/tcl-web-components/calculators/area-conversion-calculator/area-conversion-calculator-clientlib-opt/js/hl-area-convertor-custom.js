var selects = document.querySelectorAll('[data-select="select"]');
var html='';
var from ="";
var to ="";

var input = parseFloat($('[data-input]').val());
if (Number.isNaN(input)) {
    input = 0;
}
function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
  }
  
$(".inputArea").on("input", function () {
    // debugger;
    $this = $(this);
    var x = $this.val().replace( /[^a-zA-Z0-9\d.-]/gm, '');
    $this.val(x);
    if($this.length==1 && $this.val()=="."){
        $this.val("");
    }
})
$(".inputArea").on("paste", function () {
    $this = $(this);
    var x = $this.val().replace( /[^a-zA-Z0-9, ]/gm, '');
    $this.val(x.replace(/./g,''));
})
$('[data-input]').on('input', function(){
    // console.log($(this).val().replace(/,/g, ""))
    input = parseFloat($(this).val().replace(/,/g, ""));
    areaCalculate()
})
$('.only-numeric-decimal-input').keyup(function (e) {
    $(this).val($(this).val().replace(/[^\d,-]/g, ''));
  });

  // numeric input validation
  $('.only-numeric-input').keyup(function (e) {
    $(this).val($(this).val().replace(/[^\d-]/g, ''));
  });

  // numeric input with decimal allowed validation
  $('.only-numeric-input-with-decimal').keyup(function (e) {
    $(this).val($(this).val().replace(/[^\d.-]/g, ''));
  });
    

    $('.price-with-comma-js').on("change",function () {
        if ($(this).val() != "") {
            var rupeeValue = parseFloat($(this).val().replace(/,/g, ''));
            commaSeparatedValue = rupeeValue;
            $(this).val(commaSeparatedValue);
        }
        // console.log($(this))
    });
function areaCalculate(){
    if(from=="" || to ==""){
        // $(".inputArea ").prop('disabled', true);
        var units = homeLoanAreaCalculator.calculate({ from: "acres", to: "squareMeter", input: input });
        // console.log(from,to)
    }
    else{
        
        // $(".inputArea.inputAreaFrom").prop('disabled', false);
        var units = homeLoanAreaCalculator.calculate({ from: from, to: to, input: input });
    }   
    setAreaOutput(units)
    return units

}
function renderAreaCalculator(){
    var unitsArea = areaCalculate();
    // console.log(unitsArea)
    populateAreaUnits(unitsArea);
    $('[data-list] li a').click(function () {
        // debugger;
        // added  for area convertion calculator 
        try {
            $(this).parents('.js-searchDropdownWrap').find('.dropdown-heading').data('rel').includes("from") ? from = camelize($(this).text()) : $(this).parents('.js-searchDropdownWrap').find('.dropdown-heading').data('rel').includes("to") ? to = camelize($(this).text()) : "";
            // if($(this).closest('.area-conversion-wrap').data('calcName')?.includes('area-convertor-calculator')){
            areaCalculate()
            // }
            if (from == "" || to == "") {
                $(".inputArea ").attr('disabled', true);
            }
            else {
                $(".inputArea.inputAreaFrom").attr('disabled', false);
            }

        } catch(e) {console.log(e) }

        // console.log($(this))
        var $parent = $(this).parents('.js-searchDropdownWrap');
        $parent.find('[data-list] a').removeClass('active');
        $(this).addClass('active');
        var selectedVal = $(this).text();
        $parent.find('.dropdown-heading').text(selectedVal);
        $parent.find('.dropdown-heading').removeClass('active');
        $parent.find('.dropdownmenu').removeClass('show');
        $("[data-search]").val('');
        $(this).parents('[data-search]').find("li").show();
    });
}
function setAreaOutput(units){
    var output = $('[data-output]');
    // debugger;
    if( units.output==0 || units.output == "NaN" || from=="" || to==""){
        output.val(0);
    }
    else{
        output.val(((units.output)));
    }
}

function populateAreaUnits(units){
    var sortedUnits =[];
    for(areaUnit in units.areaConverterMappingSheet ){
        sortedUnits.push(areaUnit);
    }
    sortedUnits = sortedUnits.sort();
    for(areaUnit in sortedUnits ){
        // console.log(areaUnit)
        html +='<li> <a href="javascript:void(0)">'+sortedUnits[areaUnit].replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); })+'</a> </li>'
    }
    for(i = 0 ; i< selects.length;i++){
        selects[i].innerHTML = html;
    }
}
$(document).ready(function(){
try{
    // debugger;
    if(from=="" || to==""){
        $(".inputArea ").attr('disabled', true);
    }
    else{
        $(".inputArea.inputAreaFrom").attr('disabled', false);
    }

    renderAreaCalculator();
}
catch(e){console.log(e);}
});
