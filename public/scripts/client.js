/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const loadTweets = function () {

    $.get( '/tweets', function(tweet) {
      const $tweets = renderTweets(tweet);
      $('.display-tweets').append($tweets);
    });
  };

  loadTweets();

  const renderTweets = function(tweets) {
    // empties the page before rendering all the tweets from the database (so we don't see any duplicate tweets)
    $('#tweets-container').empty();
    // loops through tweets
    for (const tweet of tweets) {
      // calls createTweetElement for each tweet
      const $newTweet = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $('#tweets-container').append($newTweet);
    }
  };

  // "escapes" the potentially insecure text by re-encoding text.
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function(tweet) {
    const $tweet = `
    <article class="tweet">
      <header>
        <span class="left">
          <img src=${tweet.user.avatars} alt="user-avatar">
          <h6 class="name">${tweet.user.name}</h6>
        </span>
        <span>
          <h5 class="username">${tweet.user.handle}</h5>
        </span>
      </header>
      <div class="content">
        <p class="tweet">
        ${escape(tweet.content.text)}
        </p>
      </div>
      <footer>
        <span>
          <p class="date">${timeago.format(tweet.created_at)}</p> 
        </span>
        <span class="icons">
          <i class="fas fa-flag fa-xs"></i>
          <i class="fas fa-retweet fa-xs"></i>
          <i class="fas fa-heart fa-xs"></i>
        </span>
      </footer>
    </article>
    `;

    return $tweet;
    
  };


  // deals with new tweet form submission
  const $form = $('.tweet-form');
  $form.on('submit', function( event ) {
    const $tweetText = $('#tweet-text');
    // console.log($tweetText.val().length)

    // serializes the form data as a query string.
    const urlEncodedData = $(this).serialize();
    // stops HTML from submitting form
    event.preventDefault();

    if ($tweetText.val().length > 140) {
      alert('tweet is too long');
    } else {
      $.post('/tweets', urlEncodedData, () => {
        loadTweets();
      });
    }

  });

});