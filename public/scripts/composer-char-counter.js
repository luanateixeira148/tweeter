$(document).ready(function() {

  /* Count characters for new tweets */
  $("#tweet-text").on("input", function(){
    const $length = $(this).val().length;
    const maxLength = 140;
    let remaining = maxLength - $length;
  
    $('.counter').text(remaining);

    /* Warn user is the character count is over the limit */
    if (remaining < 0) {
      $('.counter').css("color", "#FB1401");
    } else if (remaining >= 0) {
      $('.counter').css("color", "#55514A");
    }

  });
});

