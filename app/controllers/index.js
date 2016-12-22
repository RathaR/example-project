var express = require('express'),
	router = express.Router();


router.get('/', function (req, res, next) {
	res.render('index/index', {
		title: 'Motocycles'
	});
});

module.exports = function (app) {
	app.use('/', router);
};
