var express = require('express'),
	router = express.Router(),
	fs = require('fs'),
	DataStorage = require('../dataStorage');

var bikesData = require('../bikes.json');
var dataStorage = new DataStorage(bikesData);

router.get('/', function (req, res, next) {
	var filter = {
		honda: false,
		yamaha: false,
		suzuki: false,
		kawasaki: false
	};
	if(req.query.filter) {
		var filterParam = req.query.filter.split(',');
		filterParam.forEach(function(manufacturer) {
			filter[manufacturer] = true;
		})
	}
	var data = dataStorage.getAll();
	res.render('bikes/all', {
		title: 'All bikes',
		bikes: data,
		filter: filter
	});
});

router.get('/:id', function (req, res, next) {
	var id = req.params.id;
	var bikeData = dataStorage.getOne(id);
	res.render('bikes/one', {
		title: bikeData.title,
		bike: bikeData
	});
});


module.exports = function (app) {
	app.use('/bikes', router);
};
