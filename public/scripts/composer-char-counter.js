$(document).ready(function() {
  console.log('The DOM is ready.');

  // Tweet count-down
  $( "#tweet-text" ).on("input", function() {
    const $length = $(this).val().length;
    const maxLength = 140;
    let charactersLeft = maxLength - $length;
    const $output = $('.counter')
  
    $output.text(charactersLeft);

    //sets color to red if count is negative
    if (charactersLeft < 0) {
      $output.css("color", "#FB1401");
    } else if (charactersLeft >= 0) {
      $output.css("color", "#55514A");
    }
  });
});

