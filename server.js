var express = require('express');
var request = require('request');
// var BreweryDb = require("brewerydb-node");
var app = express();

var API_KEY = "836b4b48754b311175827bad9266f44c";
var url = "http://api.brewerydb.com/v2/locations?key=" + API_KEY + "&locality=san+diego";

app.set('views', __dirname + '/views'); // general config
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/', function(req, res){
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var brewRes = JSON.parse(body);
      var brewRes = brewRes.data;
      var dataArr = [];
      var nameArr = [];
      for (i in brewRes) {
        dataArr.push(brewRes[i]);
      }
      for (i in dataArr) {
        nameArr.push(dataArr[i].brewery.name);
      }
      res.render("index",
        {nameArr:nameArr});
    }
  })
});


app.listen(3000);
console.log('Server running on port %d', 3000);


