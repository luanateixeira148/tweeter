/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

const createTweetElement = function(data) {
  const $tweet = `
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
      ${data.content.text}
      </p>
    </div>
    <footer>
      <span>
        <p class="date">${data.created_at}</p> 
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


// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

});