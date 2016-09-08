var express = require('express');
var passport =  require('passport');
var logger = require('morgan');
var favicon = require('serve-favicon');

var passportLocal = require('passport-local');
var path = require('path');
var bodyParser = require('body-parser');

var multer = require('multer');
var fs = require('fs');

var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/buysellanythingv1');
var db = mongoose.connection;

var app = express();

var port = process.env.PORT || 3000;
var environment = process.env.NODE_ENV || 'build';
console.log(process.env.NODE_ENV);

app.use(favicon(__dirname + '/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function(callback) {
	console.log('connected successfully to database');
});

console.log('About to crank up node');
console.log('PORT=' + port);
console.log('NODE_ENV=' + environment);

app.use(passport.initialize());
app.use(passport.session());

app.get('/ping', function(req, res, next) {
	console.log(req.body);
	res.send('pong');
});

var items = require('./routes/items.js');
var categories = require('./routes/categories.js');
var login = require('./routes/login.js');
var images = require('./routes/images.js');
var comments = require('./routes/comments.js');
var users = require('./routes/users.js');

app.use('/item', items);
app.use('/categories', categories);
app.use('/login', login);
app.use('/images', images);
app.use('/comment', comments);
app.use('/user', users);

switch (environment) {
	case 'build':
		console.log('** BUILD **');
		app.use(express.static('./build'));
		app.use('/*', express.static('./build/index.html'));
		break;
	default:
		// console.log('** DEV **');
		// // app.use(express.static(path.join(__dirname, '/src/client/')));
		// // app.use(express.static(path.join(__dirname, '/src/client/images')));
		app.use(express.static('./src/client/'));
		app.use(express.static('./'));
		app.use(express.static('./tmp'));
		break;
}

// Add in later
//Deep linking
app.all('/*', function(req, res, next) {
		res.sendFile('index.html',{root:  './src/client'});
	});

var server = app.listen(port, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Buy Sell Anything App listening on http://%s:%s', host, port);
});
