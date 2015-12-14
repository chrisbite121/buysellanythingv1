var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Item Schema
var itemSchema = new Schema({
	title: {
		type: String
	},
	description: {
		type: String	
	},
	category: {
		type: String
	},
	price: {
		type: Number
	},
	geolocation: {
		type: String
	}
	}, { 
	collection: 'Item'
	});
	
var Item = module.exports = mongoose.model('Item', itemSchema);

// Get all Items
module.exports.getItems = function(callback) {
	Item.find({}, callback);
}

// Get Item by ID
module.exports.getItemById = function(id, callback) {
	Item.findById(id, callback);
}

// create Item
module.exports.createItem = function(newItem, callback) {
	console.log(newItem);
	newItem.save(callback);
}

//Update Item
module.exports.updateItem = function(data, callback) {
	var title = data.title;
	var description = data.description;
	var category = data.category;
	var price = data.price;
	var geolocation = data.geolocation;
	
	console.log(data);
	console.log(data._id);
	
	var query = {_id:data._id};
	
	Item.findById(data._id, function(err, item){
		if(!item) {
			return next(newError('Could not load Item'));
		} else {
			//Update
			item.title = title;
			item.description = description;
			item.category = category;
			item.price = price;
			item.geolocation = geolocation;
			
			item.save(callback);
		}
	});
}

//Delete Item
module.exports.removeItem = function(id, callback) {
	Item.find({_id:id}).remove(callback);
}