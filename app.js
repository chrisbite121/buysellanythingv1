var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/buysellanythingv1');
var db = mongoose.connection;

var app = express();

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function(callback) {
	console.log('connected successfully to database');
});

var api = require('./routes/api.js');

app.use('/api', api);

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, './')));

var server = app.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;
	
	console.log('Buy Sell Anything App listening on http://%s:$s', host, port);
});
