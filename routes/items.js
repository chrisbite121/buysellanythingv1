var express = require('express');
var router = express.Router();
var Item = require('../models/Item.js');

router.get('/', function(req, res, next) {
	res.status('200').send('Welcome to the API');
});

router.get('/getItems', function(req, res, next) {
	getItems(req, res, next);
});

router.post('/createItem', function(req, res, next) {
	// Get Form Values
	var title = req.body.title;
	var category = req.body.category;
	var description = req.body.description;
	var price = req.body.price;
	var geolocation = req.body.geolocation;
	
	// Item Object
	var newItem = new Item({
		title: title,
		category: category,
		description: description,
		price: price,
		geolocation: geolocation
	});
	// Create Item
	Item.createItem(newItem, function(err, item){
		if(err){
			console.log(err);
		} else {
			getItems(req, res, next);
		}
	})
	
});

router.delete('/deleteItem/:id', function(req, res, next){
	var id = req.params.id;
	Item.removeItem(id, function(err, response){
		if(err){
			console.log(err);
		} else {
			getItems(req, res, next);
		}
	});
});

router.put('/updateItem', function(req,res, next){
	var data = req.body;
	Item.updateItem(data, function(err, category){
		if(err){
			console.log(err);
		} else {
			getItems(req, res, next);
		}
	})
});

function getItems(req, res, next){
	Item.getItems(function(err, items) {
		if(err){
			console.log(err);
			res.send(err);
		} else {
			res.json(items);
		}
	});
}


module.exports = router;