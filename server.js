const express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Task = require('./api/models/memberModel'), //created model loading here
  bodyParser = require('body-parser'),
  cheerio = require('cheerio'),
  http = require('http'); // is this used anywhere?

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
    
// mongoose instance connection url connection
mongoose.Promise = global.Promise;

var uristring = process.env.MONGODB_URI || process.env.MONGOLAB_AQUA_URI || 'mongodb://localhost/tocs-member-database';
// var uristring = 'mongodb://localhost/tocs-member-database';

mongoose.connect(uristring, function (err, client) {
	if (err) {
    console.log(err);
    process.exit(1);
	}
});

// (process.env.MONGODB_URI || "mongodb://localhost:27017/test", function (err, client) {
//   if (err) {
//     console.log(err);
//     process.exit(1);
//   }



const routes = require('./api/routes/memberRoutes'); //importing route
routes(app); //register the route

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

console.log('TOCS Member RESTful API server started on: ' + port);