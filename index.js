var express = require('express');
var Twitter = require('twitter');
var models = require('./models');
var bodyParser = require('body-parser');
var cors = require('cors')

var app = express();

app.use(bodyParser.json({ limit: '10mb' }));
app.use(cors())
var client = new Twitter({
  consumer_key: 'Qml8euMh6wNf68yM6tzY4l6qq',
  consumer_secret: 'AMIRz4GOMK7eLr3EgT7Omxf0Xbkole0iGHozgLctQ3c8ReNPVb',
  access_token_key: '15033587-3Ou2caFP37cswKiMeUuO1HultxcsmaT2ZYMwKBKeQ',
  access_token_secret: 'FVcXZD1tabksftgYxLnSzy60pbBkvuAjYw7clbxFVEcKt'
});
// get tweets from twitter
app.get('/', function(req, res, next) {
  client.get('search/tweets', {q: req.query.q}, function(error, tweets, response) {
   let myTweets = [] 
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
    res.send(tweets)
  });
});
// save tweets
app.post('/save', function(req, res, next) {
    models.tweet.bulkCreate(req.body)
    .then(result => {
        console.log('tweets saved!')
        res.send({
        finalizado: true,
        message: 'todo ok'
    })
    })
    .catch(error => {
        console.log('error XXXXXXXXXXXXXXXXXXXXXX', error)
        res.send({
            finalizado: false,
            message: error
        })
    })
});
// get tweets from db
app.get('/list', function(req, res, next) {
    models.tweet.findAll()
    .then(result => {
        res.send(result)
    })
    .catch(error => {
        res.send(error)
    })
});


app.listen(3006);
