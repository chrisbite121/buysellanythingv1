var express = require('express');
var router = express.Router();

router.get('/loginPage.html', function(req, res){
	res.sender('index', {
		isAuthenticated: false,
		user: req.user
	});
});

router.get('/', function(req, res){
	res.send('login.html');
});

router.post('/', function(req, res){
	
});

module.exports = router;