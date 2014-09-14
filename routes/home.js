var mongoose = require('mongoose');
var List = require('../model/list');
var Gift = require('../model/gift');

var async = require('async');

module.exports = function (app) {

	app.get('/home', function (req, res) {
		var model = {};
		async.parallel(
			[

			function (callback) {
					List.find({
						owner: req.user._id
					}, function (err, list) {
						model.myLists = list;
						callback();
					});
			},
			function (callback) {
					List.find({
						members: req.user._id
					}, function (err, list) {
						model.inLists = list;
						callback();
					});
			}
			],
			function (err) {
				if (err) return next(err);
				res.render('home', model);
			});
	});

}
