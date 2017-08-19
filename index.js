var express = require('express');
var Twitter = require('twitter');
var models = require('./models');

var app = express();
var client = new Twitter({
  consumer_key: 'Qml8euMh6wNf68yM6tzY4l6qq',
  consumer_secret: 'AMIRz4GOMK7eLr3EgT7Omxf0Xbkole0iGHozgLctQ3c8ReNPVb',
  access_token_key: '15033587-3Ou2caFP37cswKiMeUuO1HultxcsmaT2ZYMwKBKeQ',
  access_token_secret: 'FVcXZD1tabksftgYxLnSzy60pbBkvuAjYw7clbxFVEcKt'
});
let myTweets = []
app.get('/', function(req, res, next) {
  client.get('search/tweets', {q: 'bolivia'}, function(error, tweets, response) {
    for(let element of tweets.statuses){
        let myTweet = {}
        myTweet.tweet_text = element.text
        myTweet.created = element.created_at
        myTweet.tweet_code = element.id
        myTweet.name = element.user.name
        myTweet.username = element.user.screen_name
        myTweet.location = element.user.location
        myTweets.push(myTweet)
    }
    //save data
    models.tweet.bulkCreate(myTweets)
    .then(result => {
        console.log('tweets saved!')
    })
    .catch(error => {
        console.log('error XXXXXXXXXXXXXXXXXXXXXX', error)
    })

    res.send(myTweets)
  });
});

app.listen(3006);
