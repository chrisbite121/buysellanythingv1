var express = require('express');
var router = express.Router();
var Deal = require('../models/Deal.js');
var Item = require('../models/Item.js');

router.get('/', function(req, res, next) {
	res.status('200').send('Welcome to the API');
});

router.get('/getItems', function(req, res, next) {
	Item.find(function(err, items) {
		if(err){
			console.log(err);
			res.send(err);
		} else {
			res.json(items);
		}
	});
});

router.post('/addItem', function(req, res, next) {
	// Get Form Values
	var title = req.body.title;
	var category = req.body.category;
	var description = req.body.description;
	
	// Item Object
	var newItem = new Item({
		title: title,
		category: category,
		description: description
	});
	
	// Create Item
	Item.createItem(newItem, function(err, item){
		if(err){
			console.log(err);
		} else {
			res.status('200');
		}
	})
	
});

router.get('/deals', function(req, res, next) {
	Deal.find({}, function(err, deals) {
		if(err){
			console.log(err);
			res.send(err);
		} else {
			res.json(deals);
		}
	});
});


module.exports = router;