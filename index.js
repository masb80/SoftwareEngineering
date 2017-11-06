var express = require('express');
var router = express.Router();

// Get Homepage method
router.get('/', ensureAuthenticated, function(req, res){
	res.render('index');
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		
		res.redirect('/users/login'); // logout message
	}
}

module.exports = router;
