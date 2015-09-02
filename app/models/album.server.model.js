'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Album Schema
 */
var AlbumSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	title: {
		type: String,
		default: '',
		trim: true,
		required: 'Title cannot be blank'
	},
	artist: {
		type: String,
		default: '',
		trim: true,
		required: 'Artist cannot be blank'
	},
	mainImage: {
		type: String,
		default: '',
		trim: true,
		required: 'Image cannot be blank'
	},
	genre: {
		type: String,
		default: '',
		trim: true,
		required: 'Genre cannot be blank'
	},
	year: {
		type: Number,
		default: '',
		trim: true
	},
	tags : [
		{
			type: String,
			default: '',
			trim: true
		}
	]
});

mongoose.model('Album', AlbumSchema);