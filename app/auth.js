var configAuth = require('../config/auth');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = function (passport) {

	passport.serializeUser(function (user, done) {
		done(null, user);
	});

	passport.deserializeUser(function (obj, done) {
		done(null, obj);
	});

	passport.use(new GoogleStrategy({
			clientID: configAuth.googleAuth.clientID,
			clientSecret: configAuth.googleAuth.clientSecret,
			callbackURL: "http://localhost:3000/auth/google/callback"
		},
		function (req, token, tokenSecret, profile, done) {
			process.nextTick(function () {
				User.findOne({
					'gid': profile.id
				}, function (err, user) {
					if (err) {
						return done(err);
					}
					if (!user) {
						var newUser = new User({
							gid: profile.id,
							email: profile.emails,
							name: profile.name
						});
						user.save(function (err) {
							if (err) console.log(err);
							return done(err, user);
						});
					} else {
						user.lastLoggedIn = Date.now();
						user.email = profile.emails[0].value;
						user.name = profile.displayName;
						user.save(function (err) {
							if (err) console.log(err);
							return done(err, user);
						});
					}
				});
			});
		}
	));
}
