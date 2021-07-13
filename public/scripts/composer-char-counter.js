$(document).ready(function() {
  console.log('The DOM is ready.');


  // Tweet count-down
  $( "#tweet-text" ).on("input", function() {
    const length = $(this).val().length;
    console.log('length:',length);
    const maxLength = 140;
    let charactersLeft = maxLength - length;
  
    console.log(charactersLeft);
  
    const $output = $('.counter').text(charactersLeft);
  });
});

