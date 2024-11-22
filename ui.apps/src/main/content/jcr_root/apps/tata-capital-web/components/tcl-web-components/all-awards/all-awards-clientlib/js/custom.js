var filterData = document.querySelectorAll("li[data-filterallawards]");
var cardData = document.querySelectorAll(".all-awards-inner .all-awards-card");

 filterData.forEach(function (list) {
    list.addEventListener('click', function (e) {
        var dataText = e.currentTarget.getAttribute('data-filterAllAwards');
        cardData.forEach(function(ele){
            ele.classList.remove("d-none");
            if(ele.childNodes[0].getAttribute("data-filterdata")!=dataText)
            {
                if(dataText=='all'){
                    ele.classList.remove("d-none");
                }
                else
                {
                    ele.classList.add("d-none");
                }
            }
        })
    })
}) 

