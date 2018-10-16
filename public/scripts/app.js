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
    let $headerHandle = $("<h5>").addClass("handle").text(user.handle);
    $header.append($headerAvatar).append($headerUsername).append($headerHandle);

    //create body
    let $tweetBody = $("<p>").addClass("tweetBody").text(tweetData.content.text);

    //create footer
    let $footer = $("<footer>");

    let $footerIcons = $("<span>").attr("class", "footer-icons");
    $footerIcons.append("<i class='fa fa-heart-o'</i>");
    $footerIcons.append("<i class='fa fa-retweet'></i>");
    $footerIcons.append("<i class='fa fa-flag-o'></i>");
    $footer.append($footerIcons);

    let $footerDate = $("<p>").addClass("tweetDate").text(moment(tweetData.created_at).fromNow());
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

  //Binding to Submit Event
  $('form').on('submit', (event) => {
    event.preventDefault();

    //Get Tweet Data
    let input = event.target.children[0].value;
    let data = $(event.target).serialize();

    //Actions of New Tweets
    if (input.length >= 140) {
      $('.error-msg').slideDown().html('Error - Over Character Limit');
    } else if (input.length === 0) {
      $('.error-msg').slideDown().html('Error - No Input');
    } else {
    $('.error-msg').slideUp().html('Error - No Input');
    //Ajax Request
    $.ajax('/tweets', {
        method: 'POST',
        data: data,
        success: function(tweets) {
          loadTweets(tweets);
        }
     }).then(() => {
     $("textarea[name='text']").val("")
     $(".counter").text(140);
    })
  };
});

  //Toggle New Tweet Section when Compose Button Pressed
  $("button").on("click", function() {
    $(".new-tweet").slideToggle();
    $("textarea").focus();
  });
});
