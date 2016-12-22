var path = require('path'),

	rootPath = path.normalize(__dirname + '/..'),
	env = process.env.NODE_ENV || 'development';

// this object store application configuration properties for different environment
var config = {
	development: {
		// store path to the application root in config object
		root: rootPath,
		app: {
			name: 'example-project'
		},
		port: process.env.PORT || 3000
	},
	production: {
		root: rootPath,
		app: {
			name: 'example-project'
		},
		port: process.env.PORT || 3000
	}
};

module.exports = config[env];
