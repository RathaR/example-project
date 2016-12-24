var express = require('express');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

module.exports = function(app, config) {
	var env = process.env.NODE_ENV || 'development';

	app.locals.ENV = env;
	app.locals.ENV_DEVELOPMENT = env == 'development';

	app.set('views', config.root + '/app/views');
	app.set('view engine', 'jade');

	app.use(favicon(config.root + '/public/favicon.ico'));
	app.use(logger('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(cookieParser());
	app.use(express.static(config.root + '/public'));
	app.use('/bower_components',  express.static(config.root + '/bower_components'));

	var indexController = require('./../app/controllers/index');
	var bikesController = require('./../app/controllers/bike');
	var accountController = require('./../app/controllers/account');

	indexController(app);
	bikesController(app);
	accountController(app);

	app.use(function (req, res, next) {
		var err = new Error('Not Found');
		err.status = 404;
		next(err);
	});

	app.use(function (err, req, res, next) {
		res.status(err.status || 500);
		res.render('common/error', {
			message: err.message,
			error: err,
			title: 'error'
		});
	});

	return app;
};
