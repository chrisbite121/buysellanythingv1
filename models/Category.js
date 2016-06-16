var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Category Schema
var categorySchema = new Schema({
	title: {
		type: String
	}
}, {
	collection: 'Categories'
});

var Category = module.exports = mongoose.model('Category', categorySchema);

// Get all Categories
module.exports.getCategories = function(callback) {
	Category.find({}, callback);
}

//Create Category
module.exports.createCategory = function(newCategory, callback) {
	newCategory.save(callback);
}

//Delete Category
module.exports.removeCategory = function(id, callback) {
	Category.find({_id:id}).remove(callback);
}

//Update Category
module.exports.updateCategory = function(id, updatedTitle, callback) {
	var query = {_id:id};
	var update = {title: updatedTitle};
	var options = {}
	
	Category.findOneAndUpdate(query, update, options, callback);
}

//Get Category
module.exports.getCategoryById = function(id, callback){
    Category.find({_id: id}).exec(callback);
}