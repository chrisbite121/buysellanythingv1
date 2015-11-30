var express = require('express');
var router = express.Router();
var Deal = require('../models/Deal.js');

router.get('/', function(req, res, next) {
	res.status('200').send('Welcome to the API');
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