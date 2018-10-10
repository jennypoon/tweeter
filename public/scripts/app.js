/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": {
      "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
      "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
      "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
    },
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}


function createTweetElement(tweetData) {
  const user = tweetData.user;

//create new tweet
  let $tweet = $('<article>').addClass('tweet');

//create header
  let $header = $("<header>");
  let $headerAvatar = $(`<img src="${user.avatars.small}">`).addClass("avatar");
  let $headerUsername = $("<h2>").addClass("username").append(user.name);
  let $headerSpan = $("<h5>").addClass("handle").append(user.handle);
  $header.append($headerAvatar).append($headerUsername).append($headerSpan);

//create body
  let $tweetBody = $("<p>").addClass("tweetBody").append(tweetData.content.text);

//create footer
  let $footer = $("<footer>")
  let $footerDate = $("<p>").addClass("tweetDate").append(tweetData.created_at);
  $footer.append($footerDate);
//append pieces

return $tweet.append($header).append($tweetBody).append($footer);

};


var $tweet = createTweetElement(tweetData);


$('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
