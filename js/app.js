let current_number = 0;
function bubbles() {
  for (i = 0; i < 30; i++) {
    var randomDelay = Math.floor(Math.random() * (6000 - 500 + 1) + 500);
    var randomFadein = Math.floor(Math.random() * (3000 - 500 + 1) + 500);
    var randomRight = Math.floor(Math.random() * (1000 - 0 + 1) + 0);
    var randomSize = Math.floor(Math.random() * (15 - 1 + 1) + 1);
    var randomBlur = Math.floor(Math.random() * (3 - 0 + 1) + 0) + "px";
    var randomBottom = Math.floor(Math.random() * (1000 - 0 + 1) + 0);
    var randomOpacity = Math.floor(Math.random() * (100 - 1 + 1) + 1);
    var randomTime = Math.floor(Math.random() * (5000 - 3500 + 1) + 3500);

    var bubble = document.createElement("div");
    bubble.className = "bubble bubble" + i;
    $(bubble).css("right", randomRight);
    $(bubble).css("width", randomSize);
    $(bubble).css("height", randomSize);
    $(bubble).css("filter", "blur(" + randomBlur + ")");
    $(bubble).css("bottom", randomBottom);
    $(bubble).css("opacity", randomOpacity);

    $(bubble).hide();
    $(".tweet_text_outer").append(bubble);

    $(bubble).delay(randomDelay).fadeIn(randomFadein).animate(
      {
        bottom: "+=670px",
      },
      randomTime,
      "easeInQuint"
    );
  }
}

function tweetDisplay(array) {
  if (current_number >= array.length) {
    current_number = 0;
  } else {
    current_number += 1;
  }

  //this function shuffles an array, I use it to shuffle indexes to make words of the tweet float up in random sequence
  function shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  // var current_tweet = array[Math.floor(Math.random()*array.length)];
  var current_tweet = array[current_number];
  var tweet_user = current_tweet.user;
  var user_image = tweet_user.profile_image_url.replace("_normal", "_bigger");
  current_tweet = current_tweet.text.split(" ");
  var tweet_as_string = current_tweet.join(" ");
  var hashtags = [];
  var no_link_array = [];
  var link_array = [];

  //append username to user-info div
  $(".user-photo").append(
    "<a href='https://twitter.com/search?q=%40" +
      tweet_user.screen_name +
      "' target='_blank'><img class='user-image' src='" +
      user_image +
      "'></img></a>"
  );
  $(".user-info").append(
    "<a href='https://twitter.com/search?q=%40" +
      tweet_user.screen_name +
      "' target='_blank' class='nostyle'><p class='username'>" +
      "@" +
      tweet_user.screen_name +
      "</p></a>"
  );

  $(".user-photo, .user-info").hide();
  $(".user-container").css("bottom", "-200px");

  $(".user-container").show().animate(
    {
      bottom: "+=200px",
    },
    500,
    "easeOutQuint"
  );
  $(".user-photo, .user-info").fadeIn(2000);

  //looping through each word of current tweet
  for (i = 0; i < current_tweet.length; i++) {
    if (current_tweet[i] === "...:" || current_tweet[i] === "&amp;") {
      // current_tweet[i] = "";
    } else if (current_tweet[i].indexOf("http") !== -1) {
      no_link_array.push(
        "<a href='" +
          current_tweet[i] +
          "' class='nostyle smalltext' target='_blank'>" +
          current_tweet[i] +
          "</a>"
      );
    } else if (current_tweet[i] === "#") {
      no_link_array.push("<span class='no-font'>#</span>");
    } else if (
      current_tweet[i].substring(1).toLowerCase() === "cocacola" ||
      current_tweet[i].toLowerCase() === "cocacola" ||
      current_tweet[i].toLowerCase() === "coca-cola" ||
      current_tweet[i].toLowerCase() === "coca cola"
    ) {
      //put the word coca cola in coca cola font
      current_tweet[i] =
        "<a href='https://twitter.com/search?q=%23cocacola' target='_blank' class='nostyle'>" +
        "<span class='no-font-cocacola'>#</span><span class='coca-cola-logo'>CocaCola</span></a>";
      no_link_array.push(current_tweet[i]);
      hashtags.push("CocaCola");
    } else if (current_tweet[i].substring(0, 1) === "#") {
      //create span with different font in css so hashtags appear as hashtags
      current_tweet_no_hash =
        "<a href=https://twitter.com/search?q=%23" +
        current_tweet[i].substring(1, current_tweet[i].length) +
        " " +
        "target='_blank'" +
        " class=" +
        "'hashtag hashtag" +
        i +
        "'>" +
        "<span class='no-font-hash'>#</span>" +
        current_tweet[i].substring(1, current_tweet.length) +
        " " +
        "</a>";
      no_link_array.push(current_tweet_no_hash);
    } else if (current_tweet[i].substring(0, 1) === "@") {
      no_link_array.push(
        "<a href='https://twitter.com/search?q=%40" +
          current_tweet[i].substring(1) +
          "' class='nostyle' target='_blank'>" +
          current_tweet[i] +
          "</a>"
      );
    } else {
      no_link_array.push(current_tweet[i]);
    }
  }

  //rotate container div for tweet
  $(".tweet_text")
    .animate(
      {
        perspective: "700px",
        rotateY: "5deg",
        rotateX: "10deg",
        rotateZ: "30deg",
      },
      6000,
      "easeOutQuart"
    )
    .animate(
      {
        perspective: "700px",
        rotateY: "-10deg",
        rotateX: "-10deg",
        rotateZ: "-20deg",
      },
      3000,
      "easeInQuart"
    );

  //looping through the array of words in tweet and appending divs containing each word to index page
  //it looks at the tweet as a string and changes the font size of the tweet based on the length of the tweet
  for (i = 0; i < no_link_array.length; i++) {
    if (tweet_as_string.length > 100) {
      $(".tweet_text").addClass("small_tweet_text").removeClass("tweet_text");
      $(".small_tweet_text").append(
        "<div class=" + "text" + i + ">" + no_link_array[i] + " " + "</div>"
      );
      var targeted_div = ".text" + i;
      $(targeted_div).addClass("text");
    } else if (tweet_as_string.length > 15) {
      $(".tweet_text").append(
        "<div class=" + "text" + i + ">" + no_link_array[i] + " " + "</div>"
      );
      var targeted_div = ".text" + i;
      $(targeted_div).addClass("text");
    } else {
      //if the tweet is longer than 12 words remove tweet_text class and add small_tweet_text class
      $(".tweet_text").addClass("large_tweet_text").removeClass("tweet_text");
      $(".large_tweet_text").append(
        "<div class=" + "text" + i + ">" + no_link_array[i] + " " + "</div>"
      );
      var targeted_div = ".text" + i;
      $(targeted_div).addClass("text");
    }
  }

  var delay_number = 1000;

  var indexes_array = [];

  //loop through each word
  for (i = 0; i < no_link_array.length; i++) {
    //fade words in sequence
    var targeted_span = ".text" + i;
    $(targeted_span).hide();
    $(targeted_span).fadeIn(delay_number);
    delay_number += 300;
    indexes_array.push(i);
  }

  var shuffled_array = shuffle(indexes_array);

  //this function generates a random number between two numbers

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  for (i = 0; i < no_link_array.length; i++) {
    var targeted_delay_span = ".text" + shuffled_array[i];
    //animate rising and fading out at random delays
    $(targeted_delay_span).delay(randomInt(3000, 4000)).animate(
      {
        bottom: "+=300px",
        opacity: 0,
      },
      1000,
      "easeInQuint"
    );
  }

  var hashtag_delay_number = 500;

  $(".user-container")
    .delay(9000)
    .animate(
      {
        bottom: "+=10px;",
      },
      200,
      "easeOutQuint"
    )
    .animate(
      {
        bottom: "-=200px",
      },
      500
    );

  setTimeout(function () {
    $(".bubble").fadeOut(1000);
  }, 9000);

  setTimeout(function () {
    //transition to make info-container div slide down off screen
    $(".text").fadeOut(1000, function () {
      $(this).delay(13000).remove();
      $(".bubble").remove();
      $(".username").remove();
      $(".user-image").remove();
      $(".user-container").hide();
    });
  }, 11 * 1000);
}

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

$(document).ready(function () {
  bubbles();
  let tweetArray;
  const getTweets = async () => {
    const response = await fetch("/tweets");
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    const data = await response.json();

    await console.log(data.statuses);
    let tweetArray = data.statuses;
    console.log(tweetArray);
    let shuffled_tweets = shuffle(tweetArray);
    tweetDisplay(shuffled_tweets);
    setInterval(function () {
      $(".small_tweet_text")
        .addClass("tweet_text")
        .removeClass("small_tweet_text");
      $(".large_tweet_text")
        .addClass("tweet_text")
        .removeClass("large_tweet_text");

      tweetDisplay(shuffled_tweets);
      bubbles();
    }, 14 * 1000);
  };
  getTweets();
});
