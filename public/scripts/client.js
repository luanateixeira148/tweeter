/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

  /* Hides error message by default */
  $('.error-message').hide();

  /* Makes get request to load old tweets */
  const loadTweets = function () {
    $.get('/tweets', function (tweet) {
      const $tweets = renderTweets(tweet);
      $('.display-tweets').append($tweets);
    });
  };
  loadTweets();

  /* Tweet Template */
  const createTweetElement = function (data) {

    const $tweetTemplate = `
    <article class="tweet">
      <header>
        <span class="left">
          <img src=${data.user.avatars} alt="user-avatar">
          <h6 class="name">${data.user.name}</h6>
        </span>
        <span>
          <h5 class="username">${data.user.handle}</h5>
        </span>
      </header>
      <div class="content">
        <p class="tweet">
        ${escape(data.content.text)}
        </p>
      </div>
      <footer>
        <span>
          <p class="date">${timeago.format(data.created_at)}</p> 
        </span>
        <span class="icons">
          <i class="fas fa-flag fa-xs"></i>
          <i class="fas fa-retweet fa-xs"></i>
          <i class="fas fa-heart fa-xs"></i>
        </span>
      </footer>
    </article>
    `;

    return $tweetTemplate;

  };

  /* Renders a new Tweet Element on the Page */
  const renderTweets = function (tweets) {

    $('#tweets-container').empty();
    for (const tweet of tweets) {
      const $newTweet = createTweetElement(tweet);
      $('#tweets-container').prepend($newTweet);
    }

  };

  /* Deals with new tweet form submission */
  const $form = $('.tweet-form');
  $form.on('submit', function (event) {

    const $tweetText = $('#tweet-text');
  
    // serializes the form data as a query string.
    const urlEncodedData = $(this).serialize();
    // stops HTML from submitting form
    event.preventDefault();
  
    // ensure user is within character limits 
    if ($tweetText.val().length > 140) {
  
      showError('Your tweet is too long.')
      return;
  
    } else if ($tweetText.val().length === 0) {
  
      showError('Your tweet is empty.')
      return;
  
    } else {
  
      
      $('.error-message').hide();
  
      $.post('/tweets', urlEncodedData, () => {
        loadTweets();

        /* resets form and counter */
        $('#tweet-text').val('');
        $('.counter').text('140');
      });

    }
  
  });

});



/* 
 * Helper Functions 
 */

/* Show error message */
const showError = function (text) {

  $('.error-message').empty().append(`
      <i class="fas fa-exclamation-circle"></i>
      <h5>${text}</h5>
    `).slideDown();

  setTimeout(() => {
    $('.error-message').empty().slideUp();
  }, 3000);

}

/* "Escapes" the potentially insecure text by re-encoding input text */
const escape = function (str) {

  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;

};