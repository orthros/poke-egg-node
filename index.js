var express = require('express');
var app = express();

app.get('/', function(req, res){
    res.send('Hello World!');
});

var listeningPort = 3000;
var baseURL = '/solve/distance/:distanceID/eggs/';

var urlsToPush = [];

for(var i = 1; i < 10; i++)
{
    var stringsToUse = [];

    for(var j = 0; j < i; j++)
    {
        stringsToUse.push(j);
    }

    var eggPortion = stringsToUse.map(function(val) {
                                        return ":egg" + val + "ID";
                                    })
                                 .join("-");

    //console.log(baseURL + urlStuff);

    urlsToPush.push(baseURL + eggPortion);
}

urlsToPush.reverse()
          .forEach(function(url) {
              app.get(url, function(req, res){
                  res.send(req.params);
              });
          });

app.listen(listeningPort, function() {
    console.log('Example App listening on port ' + listeningPort + "!");
});
