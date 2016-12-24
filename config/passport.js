var passport = require('passport')
	, LocalStrategy = require('passport-local').Strategy
	,DataStorage = require('./../app/dataStorage')
	,usersData = require('./../app/users')
	,usersDataStorage = new DataStorage(usersData);

module.exports = function(app, config) {
	passport.use(new LocalStrategy(
		function(username, password, done) {
			var users = usersDataStorage.getAll();
			User.findOne({ username: username }, function (err, user) {
				if (err) { return done(err); }
				if (!user) {
					return done(null, false, { message: 'Incorrect username.' });
				}
				if (!user.validPassword(password)) {
					return done(null, false, { message: 'Incorrect password.' });
				}
				return done(null, user);
			});
		}
	));
};
