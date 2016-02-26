var express = require('express');
var request = require('request');
// var BreweryDb = require("brewerydb-node");
var app = express();

var API_KEY = "836b4b48754b311175827bad9266f44c";
var url = "http://api.brewerydb.com/v2/locations?key=" + API_KEY + "&locality=san+diego";

app.get('/api', function(req, res){
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
      // res.send(nameArr);
      res.render("index", {nameArr:nameArr})
    }
  })
});


// // Get for brewery page, and lists all beers if avialable
// app.get("/brewery/:id", function(req, res){
//   var user = req.getUser();
//   var brewId = req.params.id;
//   request("http://api.brewerydb.com/v2/breweries?key=" + process.env.brew_db + "&ids=" + brewId, function(err, response, body){
//     var breweryIndiv = JSON.parse(body);
//     request("http://api.brewerydb.com/v2/brewery/" + brewId + "/beers?key=" + process.env.brew_db, function(err, response, body){
//       var beerList = JSON.parse(body);
//       res.render("brewery", {breweryIndiv:breweryIndiv, user:user, beerList:beerList});
//     });
//   });
// });



app.listen(3000);
console.log('Server running on port %d', 3000);



// // Inital request to get all the breweries from brewerydb and render them to the home page
// app.get("/", function(req, res){
//   request("http://api.brewerydb.com/v2/locations?key=" + API_KEY + "&locality=sandiego", function(err, response, body){
//     res.render("index", {mapData: body, user: user});
//   });
// });



// app.get('/api', function(req, res){
//   request('http://api.brewerydb.com/v2/locations?key=' + API_KEY + "&locality=san+diego", function (error, response, body) {
//     if (!error && response.statusCode === 200) {
//       res.send(response);
//     }
//    });
// });
