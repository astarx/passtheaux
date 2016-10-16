var express = require('express');
var app = express();
var bodyParser = require('body-parser');
//var itunesApiSearch = require('itunes-api-search');
var Client = require('node-rest-client').Client;
//var cors = require('cors');

var port = process.env.PORT || 8080;

app.use(bodyParser.json());
//app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', req.get('Origin') || '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.send(200);
    } else {
        return next();
    }
});

var client = new Client();

client.get("https://itunes.apple.com/search?term=jack+johnson&media=music&limit=5", function(data, response) {
    // parsed response body as js object 
    //console.log(data);
    // raw response 
    var obj = JSON.parse(data);

    var song = {
        id: obj.results[0].artistId
    }


    console.log('data: ' + obj.results[0].artistId);
});

app.get('/song/:name', function(req, res) {
    client.get("https://itunes.apple.com/search?term=" + req.params.name + "&media=music&limit=5", function(data, response) {
        // parsed response body as js object 
        //console.log(data);
        // raw response 

        var obj = JSON.parse(data);
        var songArray = new Array()
        for (var i = 0; i < obj.results.length; i++) {
            var song = {
                artistName: obj.results[i].artistName,
                trackName: obj.results[i].trackName,
                trackId: obj.results[i].trackId,
                voteStatus: 0,
                artWorkURL: obj.results[i].artworkUrl60,
                //id: obj.results[0].artistId: obj.results[i].artistName
            }
            songArray.push(song);
        }
        console.log(songArray);

        console.log('data: ' + obj.results[0]);
        res.setHeader('Content-Type', 'application/json');
        res.json(obj);
    });
});



// itunesApiSearch.search(term, options, callback) 

// itunesApiSearch.search('rock', {
//     entity: 'music',
//     limit: 100, // max 200 
//     country: 'US'
// }, function(err, res) {
//     if (err) {
//         console.log("error" + JSON.stringify(err));
//         return;
//     } else
//         console.log("response" + res);
// });

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);


// shoutout to the user                     
console.log('shit is happening on port ' + port);

// expose app           
exports = module.exports = app;