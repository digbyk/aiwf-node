var mongoose = require('mongoose');
var List = require('../model/list');
var Gift = require('../model/gift');

var async = require('async');

module.exports = function (app) {

	app.get('/api/lists', isLoggedIn, function (req, res) {
		var model = {
			user: req.user
		};
		List.find({
			owner: req.user._id
		}, function (err, list) {
			if (err) return next(err);
			res.send(list);
		});

	});

	function isLoggedIn(req, res, next) {
		if (req.user) {
			next();
		} else {
			res.send({});
		}
	}

}
