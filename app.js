var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
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

var items = require('./routes/items.js');
var categories = require('./routes/categories.js')

app.use('/item', items);
app.use('/categories', categories);

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, './')));



//Deep linking
app.all('/*', function(req, res, next) {
	res.sendFile('index.html',{root: __dirname + '/public'});
});

var server = app.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;
	
	console.log('Buy Sell Anything App listening on http://%s:$s', host, port);
});
