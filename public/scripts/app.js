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
    $('#tweets-container').empty();
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

  $('textarea[name=text]').val();
    //Get Tweet Data
    let data = $(event.target).serialize();

    if (data.length >= 145) {
      alert("Error: Over Character Limit");
    }
    else if (data.length === 5) {
      alert("Error: No Input")
    } else {
      //Ajax Request
      $.ajax('/tweets', {
        method: 'POST',
        data: data,
        success: loadTweets()
        });        // THPOILERTH !!!!
        console.log("ajax POST went through!");
    }
  });
});
