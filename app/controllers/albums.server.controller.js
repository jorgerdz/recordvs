'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Album = mongoose.model('Album'),
	_ = require('lodash');

/**
 * Create a album
 */
exports.create = function(req, res) {
	var album = new Album(req.body);
	album.user = req.user;

	album.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(album);
		}
	});
};

/**
 * Show the current album
 */
exports.read = function(req, res) {
	res.json(req.album);
};

/**
 * Update a album
 */
exports.update = function(req, res) {
	var album = req.album;

	album = _.extend(album, req.body);

	album.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(album);
		}
	});
};

/**
 * Delete an album
 */
exports.delete = function(req, res) {
	var album = req.album;

	album.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(album);
		}
	});
};

/**
 * List of Articles
 */
exports.list = function(req, res) {
	Article.find().sort('-created').populate('user', 'displayName').exec(function(err, albums) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(albums);
		}
	});
};

/**
 * Article middleware
 */
exports.albumsByID = function(req, res, next, id) {
	Article.findById(id).populate('user', 'displayName').exec(function(err, album) {
		if (err) return next(err);
		if (!album) return next(new Error('Failed to load album ' + id));
		req.album = album;
		next();
	});
};

/**
 * Article authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.album.user.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};

exports.getTwo = function(req, res){
	var rand1 = Math.floor(Math.random() * req.user.top500.length);
	var rand2 = Math.floor(Math.random() * req.user.top500.length);

	while (rand1 == rand2){
		rand2 = Math.floor(Math.random() * req.user.top500.length);
	}
	var albums = { album1 : req.user.top500[rand1],
					album2 : req.user.top500[rand2]};
	res.json(albums);
};

exports.vote = function(req, res){
	var body = req.body;
	if(body.vote == 1){
		if(body.album1.index <= body.album2.index){
			body.album1.index = body.album2.index+1;
		}
	}else{
		if(body.album2.index <= body.album1.index){
			body.album2.index = body.album1.index+1;
		}
	}
	req.user.top500.forEach(function(data){
		if(data._id == body.album1._id){
			data.index = body.album1.index;
		}
		if(data._id == body.album2._id){
			data.index = body.album2.index;
		}
	});
	req.user.top500.forEach(function(data){
		if(data._id == body.album1._id){
		}
		if(data._id == body.album2._id){
		}
	});
	req.user.votes = req.user.votes+1;
	req.user.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			// Remove sensitive data before login
			req.user.password = undefined;
			req.user.salt = undefined;

			req.login(req.user, function(err) {
				if (err) {
					res.status(400).send(err);
				} else {
					res.json(req.user);
				}
			});
		}
	});
};

