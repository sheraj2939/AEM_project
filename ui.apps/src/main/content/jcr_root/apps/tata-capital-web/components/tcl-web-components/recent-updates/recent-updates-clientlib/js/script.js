try {
    if ($(".recent-updates .simple-bar").length > 0) {
      for (i = 0; i < $(".simple-bar").length; i++) {
        new SimpleBar($(".recent-updates .simple-bar")[i]);
      }
    }
  } catch(e) {console.log(e);}