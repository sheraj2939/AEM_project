$(".custom-js-tabClick").on("click", function () {
      let parent = $(this).parents('[tabMenu-wrap]');
      parent.scrollCenter($(this), 300);
    }); 
