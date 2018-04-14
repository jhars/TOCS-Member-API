// App
const express = require('express'),
      app = express(),
      port = process.env.PORT || 3000,
      mongoose = require('mongoose');

// Data Models
const memberModel = require('./api/models/memberModel'), //created model loading here
      wifiModel = require('./api/models/wifiModel'); //created model loading here

//Helper Libraries
const bodyParser = require('body-parser'),
      cheerio = require('cheerio'),
      http = require('http');   // is this used anywhere?)
    
var _ = require('underscore'); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
    
mongoose.Promise = global.Promise; // mongoose instance connection url connection

// var uristring = process.env.MONGODB_URI || process.env.MONGOLAB_AQUA_URI || 'mongodb://localhost/tocs-member-database';
var uristring = process.env.MONGOLAB_AQUA_URI || 'mongodb://localhost/tocs-member-database';

mongoose.connect(uristring, function (err, client) {
	if (err) {
    console.log(err);
    process.exit(1);
	}
});

app.use(express.static('/'));

// JH - How do I import routes from multiple file? Do I want to? Prbly easier to manage  ONE (1) Routes file
// const memberRoutes = require('./api/routes/memberRoutes');
// const wifiRoutes = require('./api/routes/wifiRoutes');

const routes = require('./api/routes/memberRoutes'); //importing route
routes(app); //register the route

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

console.log('TOCS Member RESTful API server started on: ' + port);
