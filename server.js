// set up ======================================
var express		= require('express');
var app			= express();			// create app
var mongoose	= require('mongoose'); // mongoose ORM
var morgan		= require('morgan'); // log requests to console(express 4)
var bodyParser	= require('body-parser'); // pull info from http-post (express 4)
var methodOverride = require('method-override'); // simulate Delete and Put (express 4)

// configuration ================================
var database = require('./config/database');
mongoose.connect(database.url); // connect to a DB

app.use(express.static(__dirname + '/public')); // set the static files location  /public/img will be /img for users
app.use(morgan('dev'));		// log every request to the console
app.use(bodyParser.urlencoded({'extended' : 'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type : 'application.vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride());

// load routes ========================================
require('./app/routes')(app);

// listen ========================================
app.listen(8080);
console.log('whispers like a snake on 8080');