'use strict';

// Setting up route
angular.module('rating').config(['$stateProvider',
	function($stateProvider) {
		// Articles state routing
		$stateProvider.
		state('rateAlbums', {
			url: '/rate',
			templateUrl: 'modules/rate/views/rate.client.view.html'
		}).
		state('charts', {
			url: '/charts',
			templateUrl: 'modules/rate/views/charts.client.view.html'
		});
	}
]);