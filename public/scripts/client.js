/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  const renderTweets = function(tweets) {
    // loops through tweets
    for (const tweet of tweets) {
      // calls createTweetElement for each tweet
      const $newTweet = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $('#tweets-container').append($newTweet);
    }
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
        ${tweet.content.text}
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

  renderTweets(data);



  $( '.tweet-form' ).submit(function( event ) {
    event.preventDefault();
  }); 

  

});