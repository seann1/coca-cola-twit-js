const Express = require("express");
const Twit = require("twit");
const Dotenv = require("dotenv");
const emojis = require("emojis");
Dotenv.config();
const app = Express();
const port = 3000;

const apikey = process.env.CONSUMER_KEY;
const apiSecretKey = process.env.CONSUMER_SECRET;
const accessToken = process.env.ACCESS_TOKEN;
const accessTokenSecret = process.env.ACCESS_SECRET;

let T = new Twit({
  consumer_key: apikey,
  consumer_secret: apiSecretKey,
  access_token: accessToken,
  access_token_secret: accessTokenSecret,
});

app.use(Express.static("public"));

app.get("/tweets", (req, res) => {
  T.get(
    "search/tweets",
    {
      q: "#cocacola",
      language: "en-AU, en-GB, en-IE, en-US, en-ZA",
      exclude: "retweets",
      count: 40,
    },
    function (err, data, response) {
      //console.log(data);
      data.statuses.map((tweet) => {
        tweet.text = emojis.html(tweet.text);
      });
      res.json(data);
    }
  );
  //res.sendFile("index.html");
  //   res.json(Products);
});

app.listen(port, () => console.log("listening on port " + port));
