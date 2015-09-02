'use strict';

/**
 * Module dependencies.
 */
var request = require('request'),
querystring = require('querystring'),
mongoose = require('mongoose'),
User = mongoose.model('User');

exports.index = function(req, res) {
	res.render('index', {
		user: req.user || null,
		request: req
	});
};

exports.imgProxy = function(req, res) {
    request.get(req.query.url).pipe(res);
};

exports.getTopUsers = function(req, res) {
	User.find({}, function (err, users) {
      if (err) { 
      	res.status(400).send({
			message: 'Error'
		});
      }
      if (!users) {
        res.status(400).send({
			message: 'No user found'
		});
      }else{
      	sort(users);
      	var trimmedUsers = [];
      	for(var i=0; i<users.length; i++){
      		if(users[i])
      			trimmedUsers.push({
      				username : users[i].username,
      				votes : users[i].votes
      			});
      	}
      	res.json(trimmedUsers);
  	  }
    });
};

function compare(a,b) {
  if (a.votes < b.votes)
     return 1;
  if (a.votes > b.votes)
    return -1;
  return 0;
};

function sort(array) {
    return array.sort(compare);
};