'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	albums = require('../../app/controllers/albums.server.controller');

module.exports = function(app) {
	// Article Routes
	app.route('/albums/getTwo')
		.get(albums.getTwo);
	app.route('/albums/vote')
		.post(albums.vote);

	app.route('/albums/:albumId')
		.get(albums.read)
		.put(users.requiresLogin, albums.hasAuthorization, albums.update)
		.delete(users.requiresLogin, albums.hasAuthorization, albums.delete);

	// Finish by binding the article middleware
	app.param('albumId', albums.albumsByID);
};