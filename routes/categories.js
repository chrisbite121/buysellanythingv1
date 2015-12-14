var express = require('express');
var router = express.Router();
var Category = require('../models/Category.js');

router.get('/', function(req, res, next) {
	res.status('200').send('Welcome to the Category API');
});

//Get Categories
router.get('/getCategories', function(req, res, next) {
	getCategories(req, res, next);
});

//Create Caegory
router.post('/createCategory', function(req, res, next) {
	var title = req.body.title;
	
	// Category Object
	var newCategory = new Category({
		title: title
	});
	
	//Create Category
	Category.createCategory(newCategory, function(err, response){
		if(err){
			res.send('500').send(err);
		} else {
			getCategories(req, res, next);
		}
	});
});


//Delete Category
router.delete('/deleteCategory/:id', function(req, res, next){
	var id = req.params.id;
	Category.removeCategory(id, function(err, category){
		if(err) {
			console.log(err);
		} else {
			getCategories(req, res, next);
		}
	});
});

//Update Category
router.put('/updateCategory', function(req, res, next) {
	var id = req.body.id;
	var title = req.body.title;
	Category.updateCategory(id, title, function(err, category){
		if(err) {
			console.log(err);
		} else {
			getCategories(req, res, next);
		}
	});
});

function getCategories(req, res, next) {
		Category.getCategories(function(err, categories) {
			if(err){
				console.log(err);
				res.send(err);
			} else {
				res.json(categories);
			}
		});
}


module.exports = router;
