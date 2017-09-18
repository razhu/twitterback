var express = require('express');
var Twitter = require('twitter');
var models = require('./models');
var bodyParser = require('body-parser');
var cors = require('cors')
var moment = require('moment')
var xl = require('excel4node');
var fs = require('fs')
var params = require('./config/params');

var app = express();

app.use(bodyParser.json({ limit: '10mb' }));
app.use(cors())
// app.use(json2xls.middleware);

var client = new Twitter({
    consumer_key: 'Qml8euMh6wNf68yM6tzY4l6qq',
    consumer_secret: 'AMIRz4GOMK7eLr3EgT7Omxf0Xbkole0iGHozgLctQ3c8ReNPVb',
    access_token_key: '15033587-3Ou2caFP37cswKiMeUuO1HultxcsmaT2ZYMwKBKeQ',
    access_token_secret: 'FVcXZD1tabksftgYxLnSzy60pbBkvuAjYw7clbxFVEcKt'
});
// get tweets from twitter
app.get('/', function (req, res, next) {
    client.get('search/tweets', { q: req.query.q }, function (error, tweets, response) {
        let myTweets = []
        for (let element of tweets.statuses) {
            let myTweet = {}
            myTweet.code = element.id_str
            myTweet.text = element.text
            myTweet.username = element.user.screen_name
            myTweet.name = element.user.name
            myTweet.date = moment(element.created_at).format('YYYYMMDD')
            myTweet.hour = moment(element.created_at).format('hh:mm:ss')
            myTweet.likes = 0 // find out how to obtain
            myTweet.rts = 0 // find out how to obtain
            myTweet.hashtags = element.entities.hashtags.map(x => x.text)
            myTweet.geotags = element.geo

            myTweets.push(myTweet)
        }
        res.send(myTweets)
    });
});
// save tweets
app.post('/save', function (req, res, next) {
    models.tweet.bulkCreate(req.body)
        .then(result => {
            console.log('tweets saved!')
            res.send({
                finalizado: true,
                message: 'todo ok'
            })
        })
        .catch(error => {
            res.send({
                finalizado: false,
                message: error
            })
        })
});
// get tweets from db
app.get('/list', function (req, res, next) {
    models.tweet.findAll()
        .then(result => {
            res.send(result)
        })
        .catch(error => {
            res.send(error)
        })
});

// search tweets on db
app.get('/search', function (req, res, next) {
    models.tweet.findAll({
        where: {
            text: {
                $ilike: `%${req.query.q}%`
            }
        }
    })
        .then(result => {
            res.send(result)
        })
        .catch(error => {
            res.send(error)
        })
});

// export tweets to xls
app.get('/export', function (req, res) {
    var wb = new xl.Workbook();// Create a new instance of a Workbook class 
    var ws = wb.addWorksheet('Report');// Add Worksheets to the workbook 
    var style = wb.createStyle({// Create a reusable style 
        font: {
            color: '#FF0800',
            size: 12
        }
    });
    //titles
    var titles = params.tweetTitles
    for (var i in titles) {
        ws.cell(1, parseInt(i) + 1).string(titles[i]).style(style)
        ws.row(1).setHeight(25);
    }
    var fileName = 'report.xlsx'
    var rutaDocumento = params.documents + fileName;
    console.log(rutaDocumento)
    wb.write(rutaDocumento, function (err, stats) {
        if (err) {
            res.status(401).json({
                finalizado: false,
                mensaje: "Couldnt create report",
                datos: err
            })
        } else {
            res.setHeader('Content-Type', 'application/vnd.openxmlformats');
            res.setHeader("Content-Disposition", "attachment; filename=" + fileName);
            res.sendFile(rutaDocumento)
        }
    });
});

app.listen(3006);
