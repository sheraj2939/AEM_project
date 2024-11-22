var excelValues = [];
var editedStockCount = 0;
var excelStockCount = 0;
var uploadedExcelData = [];
$(document).ready(function(){
// Input Browser filter //

$('[data-file="browse"]').change(function(e) {
    var fileName = e.target.files[0].name;           
    var files_ext = fileName.slice((fileName.lastIndexOf(".") - 1 >>> 0) + 2);
    $(this).siblings().text(fileName);
    var ele_target = $(this).data('modaltarget');

    if(files_ext === 'xlsx') {

        $('body').find(ele_target).css({'display': 'block', 'pointer-events': 'none'}).addClass('show-modal');
        $('body').append('<div class="modal-backdrop"></div>');
    } else {
        e.target.value = '';
        $('.form-drag').find('.drag-panel').addClass('hidden');
        $('.form-drag').find('#drag05').removeClass('hidden');
        $('.form-drag').find('#drag05 .file-name').text(fileName);
    } 
});

$('[data-upload="confirm"]').click(function(){
    $('.form-drag').find('.drag-panel').addClass('hidden');
    $('.form-drag').find('#drag02').removeClass('hidden');
    var formdata = new FormData();
    if($('[data-file="browse"]')[0].files.length>0)
    {
        formdata.append("userLasData",$('[data-file="browse"]')[0].files[0]); //bookmark
        $.ajax({
            type: "POST",
            data: formdata,
            url: "/content/tata-capital/userlasupload.getUserData.json",
            async: true,
            contentType: false,
            processData: false,
            success: function(responseText){
                var isExcelData = true;
            	var response;
				try{
                    response = typeof(responseText) == "object" ? responseText : JSON.parse(responseText);
                }catch(e){
                    response = "fail";
                }
                if(response !== "fail" && response.userDataArray.length > 0){
                excelStockCount += response.userDataArray.length;
                uploadedExcelData = response.userDataArray;
                uploadedExcelData.forEach(function(ele)
    			{
                    ele.quantity = ele.quantity < 0 ? 0 : ele.quantity;
       				populateExcelData(ele.companyName, null, ele, addstockrow, isExcelData, true);
       

    			});
				$('body').find('.form-drag #drag02').addClass('hidden'); 
				$('body').find('.form-drag #drag03 .file').text($('[data-file="browse"]')[0].files[0].name);
        		$('body').find('.form-drag #drag03').removeClass('hidden'); 
                }
                else{
					$('body').find('.form-drag #drag02').addClass('hidden');
                    $('body').find('.form-drag #drag04 .file').text($('[data-file="browse"]')[0].files[0].name);
        		$('body').find('.form-drag #drag04').removeClass('hidden'); 
                }
        	},
            error: function(){
				$('body').find('.form-drag #drag02').addClass('hidden'); 
                $('body').find('.form-drag #drag04 .file').text($('[data-file="browse"]')[0].files[0].name);
        		$('body').find('.form-drag #drag04').removeClass('hidden'); 
            }
    	});
    var ele_next = $(this).data('next');         
    
    $('body').find('.form-drag .drag-panel').addClass('hidden'); 
    $('body').find(ele_next).removeClass('hidden');


    $('.js-clear-all').removeClass('disabled');
    }
    else{
		$('body').find('.form-drag #drag02').addClass('hidden'); 
        $('body').find('.form-drag #drag04 .file').text($('[data-file="browse"]')[0].files[0].name);
        $('body').find('.form-drag #drag04').removeClass('hidden'); 
    }
});

    $('.restore-msg-inner .jsModalLink').click(function () {
    	$('#restoreConfimation .restore-table .tablebody').html('');         
		$('#restoreConfimation .restore-table .stocktext span').text(editedStockCount);
    	excelValues.forEach(function(e){
            if(e.newCompanyName !== null)
            {
        var tableRow = '<div class="tablerow">'
				+'<ul><li><p>'+e.oldCompanyName+'</p><span>Quantity: '+e.oldQuantity+'</span></li>'
				+'<li><p>'+e.newCompanyName+'</p><span>Quantity: '+e.newQuantity+'</span></li>'
				+'</ul></div>';
            }
            else{
                var tableRow = '<div class="tablerow">'
				+'<ul><li><p>'+e.oldCompanyName+'</p><span>Quantity: '+e.oldQuantity+'</span></li>'
				+'<li><span class="status deleted">Deleted</span></li>'
				+'</ul></div>';
            }
		$('#restoreConfimation .restore-table .tablebody').append(tableRow);
    	});
         var ele_target = $(this).data('modaltarget');
         $('body').find(ele_target).css('display', 'block').addClass('show-modal');
         $('body').addClass('modal-open');
         $('body').append('<div class="modal-backdrop"></div>');
     });


$('[data-restore="restore"]').click(function(){
    clearAll(true);
    excelStockCount = uploadedExcelData.length;
    uploadedExcelData.forEach(function(ele)
    {
    	populateExcelData(ele.companyName, null, ele, addstockrow, true, true);
    });
    $('.js-clear-all').removeClass('disabled');
    var ele_next = $(this).data('next');
    $('body').find('.form-drag .drag-panel').addClass('hidden'); 
    $('body').find('.form-drag #drag03').removeClass('hidden');
    excelValues = [];
});

$('[data-drag="close"]').click(function(){
    var ele_prev = $(this).data('prev');
    $(this).parents('.form-drag').find('.drag-panel').addClass('hidden'); 
    $(this).parents('.form-drag').find(ele_prev).removeClass('hidden');
    /*For removing existing excel file from input filelist*/
    	var dt = new DataTransfer()
    	dt.items.add(new File([], 'empty.xlsx'));
        $('[data-file="browse"]')[0].files = dt.files;
    $('#drag01').find('[data-file="browse"]').siblings().text('UPLOAD');
    if(editedStockCount > 0){
		$('.drag-inner #restore').removeClass('hidden');
    }
});

$('[data-dragmodalclose="close"]').click(function(){
/*For removing existing excel file from input filelist*/
	var dt = new DataTransfer()
	dt.items.add(new File([], 'empty.xlsx'));
    $('[data-file="browse"]')[0].files = dt.files;
    $('#drag01').find('[data-file="browse"]').siblings().text('UPLOAD');
});

// End Input Browser filter //
});


// ************************ Drag and drop ***************** //

var dropArea = document.getElementById("dragdrop-area");

// Prevent default drag behaviors

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false)
    document.body.addEventListener(eventName, preventDefaults, false)
});

// Highlight drop area when item is dragged over it
['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false)
});

['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false)
});

// Handle dropped files
dropArea.addEventListener('drop', handleDrop, false)

function preventDefaults(e) {
    e.preventDefault()
    e.stopPropagation()
}

function highlight(e) {
    dropArea.classList.add('hightlight-drag')
}

function unhighlight(e) {
    dropArea.classList.remove('hightlight-drag')
}

function handleDrop(e) {
    var dt = e.dataTransfer;
    var files = dt.files[0].name;
	$('[data-file="browse"]')[0].files = dt.files;
    handleFiles(files);
}

function handleFiles(files) {
    var files_name = files;
    var files_ext = files.slice((files.lastIndexOf(".") - 1 >>> 0) + 2);
    
    if(files_ext === 'xlsx') {
        $('body').find('#uploadConfimation').css({'display': 'block', 'pointer-events': 'none'}).addClass('show-modal');
        $('body').append('<div class="modal-backdrop"></div>');
    } else {
        $('.form-drag').find('.drag-panel').addClass('hidden');
        $('.form-drag').find('#drag05').removeClass('hidden');
        $('.form-drag').find('#drag05 .file-name').text(files_name);
    }
    // files = [...files]         
    // initializeProgress(files.length)
    // files.forEach(uploadFile)
    //files.forEach(previewFile)
}

function editedStocks()
{
    editedStockCount = excelValues.length;
    if(editedStockCount > 0)
    {
	$('.restore-msg .restore-msg-inner p span').text(editedStockCount +' out of '+ excelStockCount + ' stocks Uploaded from your file have been edited ');
    $('#restore').removeClass('hidden');
    }
}