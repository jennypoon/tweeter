
$(function() {

  //==Creating New Tweets
  function createTweetElement(tweetData) {
    const user = tweetData.user;

    //create new tweet article
    let $tweet = $('<article>').addClass('tweet');

    //create header
    let $header = $("<header>");
    let $headerAvatar = $(`<img src="${user.avatars.small}">`).addClass("avatar");
    let $headerUsername = $("<h2>").addClass("username").text(user.name);
    let $headerSpan = $("<h5>").addClass("handle").text(user.handle);
    $header.append($headerAvatar).append($headerUsername).append($headerSpan);

    //create body
    let $tweetBody = $("<p>").addClass("tweetBody").text(tweetData.content.text);

    //create footer
    let $footer = $("<footer>")
    let $footerDate = $("<p>").addClass("tweetDate").text("Posted " + postAge(tweetData.created_at) + " days ago");
    $footer.append($footerDate);

    //append pieces
    return $tweet.append($header).append($tweetBody).append($footer);

  };
  //==Convert Date to reflect age of post
  function postAge(date) {
    let todayDate = new Date();
    let postDate = new Date(date);
    var timeInMiliSec = postDate.getTime() - todayDate.getTime()
    let postedAge = Math.abs(Math.ceil(timeInMiliSec / (1000 * 60 * 60 * 24)))
    return postedAge;
  }


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

    //Get Tweet Data
    let input = event.target.children[0].value;
    let data = $(event.target).serialize();

    if (input.length >= 140) {
      $('.error-msg').slideDown().html('Error - Over Character Limit');
    } else if (input.length === 0) {
      $('.error-msg').slideDown().html('Error - No Input');
    } else {
    $('.error-msg').slideUp().html('Error - No Input')
      //Ajax Request
      $.ajax('/tweets', {
        method: 'POST',
        data: data,
        success: function(tweets) {
          loadTweets(tweets)
        }
        });
      $("textarea[name='text']").val("");
      // $(".counter").text(140);
        console.log("ajax POST went through!");
    }
  });
});
//Toggle New Tweet Section when Compose Button Pressed
$("button").on("click", function() {
  $(".new-tweet").slideToggle();
  $("textarea").focus();
});

