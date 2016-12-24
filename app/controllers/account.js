var express = require('express'),
	router = express.Router(),
	fs = require('fs'),
	LocalStrategy = require('passport-local').Strategy,
	passport = require('passport'),
	DataStorage = require('../dataStorage');

//var bikesData = require('../bikes.json');
//var dataStorage = new DataStorage(bikesData);

router.post('/login', passport.authenticate('local', { successRedirect: '/bikes/all',
	failureRedirect: '/login' }));

router.get('/:id', function (req, res, next) {
	var id = req.params.id;
	var bikeData = dataStorage.getOne(id);
	res.render('bikes/one', {
		title: bikeData.title,
		bike: bikeData
	});
});


module.exports = function (app) {
	app.use('/account', router);
};
