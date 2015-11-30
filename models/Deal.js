var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Deal Schema
var dealSchema = new Schema({
	itemName: {
		type: String
	},
	Description: {
		type: String	
	},
	companyName: {
		type: String
	}
	
	}, { 
	collection: 'Deal'
	});
	
var Deal = module.exports = mongoose.model('Deal', dealSchema);

// Get all Deals
module.exports.getDeals = function(callback) {
	Deal.find({}, callback);
}