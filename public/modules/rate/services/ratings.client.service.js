'use strict';

angular.module('rating').factory('Albums', function ($http) {

	var findTwo = $http.get("/albums/getTwo");

	return {
		findTwo : findTwo
	};
});