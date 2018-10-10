// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": {
//         "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//         "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//         "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//       },
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": {
//         "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
//         "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
//         "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
//       },
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   },
//   {
//     "user": {
//       "name": "Johann von Goethe",
//       "avatars": {
//         "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
//         "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
//         "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
//       },
//       "handle": "@johann49"
//     },
//     "content": {
//       "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
//     },
//     "created_at": 1461113796368
//   }
// ];

$(function() {

  //==Creating New Tweets
  function createTweetElement(tweetData) {
    const user = tweetData.user;

    //create new tweet article
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

  //==Loops through database to create tweets
  function renderTweets(tweets) {
    for (let i = 0; i < tweets.length; i++) {
      let $newTweet = createTweetElement(tweets[i]);
      $('#tweets-container').append($newTweet);
    }
  }

  function loadTweets() {
    $.ajax('/tweets', {
      method: 'GET',
      success: function(tweets) {
        renderTweets(tweets.reverse());
      }
    });
  }
  loadTweets();

//Binding to Submit
  $('form').on('submit', (event) => {
    event.preventDefault();

    //Get Tweet Data
    let data = $(event.target).serialize()
    // console.log(data);
    // console.log(data.length);
    // console.log(data.value)
    if (data.length >= 140) {
      alert("Error: Over Character Limit");
    }
    else if (data.length === 5) {
      alert("Error: No Input")
    } else {
      //Ajax Request
      $.ajax('/tweets', {method: 'POST', data: data}).then(() => {
        loadTweets();        // THPOILERTH !!!!
        console.log("ajax POST went through!");
    });
}

  });
});

