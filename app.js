var express = require('express');
var passport =  require('passport');

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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function(callback) {
	console.log('connected successfully to database');
});

app.use(passport.initialize());
app.use(passport.session());

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

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/public/images')));
app.use(express.static(path.join(__dirname, './')));

// Add in later
//Deep linking
app.all('/*', function(req, res, next) {
	res.sendFile('index.html',{root: __dirname + '/public'});
 });

var server = app.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;
	
	console.log('Buy Sell Anything App listening on http://%s:$s', host, port);
});
