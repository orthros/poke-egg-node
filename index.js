var express = require('express');
var app = express();

var solver = require('./solver').Solver;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res){
    res.send('Hello World!');
});

//Setup some basic stuff
var listeningPort = 3000;
var baseURL = '/solve/distance/:distanceID/eggs/';
var nEggs = 9;

var urlsToPush = [];

for(var i = 0; i < nEggs; i++)
{
    var stringsToUse = [];

    for(var j = 0; j <= i; j++)
    {
        stringsToUse.push(j);
    }

    var eggPortion = stringsToUse.map(function(val) {
                                        return ":egg" + val + "ID";
                                    })
                                 .join("-");

    urlsToPush.push(baseURL + eggPortion);
}

urlsToPush.reverse()
          .forEach(function(url) {
              app.get(url, function(req, res){
                  //guarenteed to have the distance parameter
                  var distance = parseInt(req.params.distanceID, 10);
                  var eggs = [];
                  for(var i = 0; i < nEggs; i++) {
                      var eggVal = req.params["egg" + i + "ID"];
                      if(eggVal != undefined){
                          eggs.push(parseInt(eggVal, 10));
                      }
                  }                  
                  var result = solver.solve(distance, eggs);
                  res.send(result);
              });
          });

app.listen(listeningPort, function() {
    console.log('Example App listening on port ' + listeningPort + "!");
});
