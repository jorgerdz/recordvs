'use strict';

// Configuring the Articles module
angular.module('rating').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Albums', 'albums', 'dropdown', '/rate');
		Menus.addSubMenuItem('topbar', 'albums', 'Rate Records', 'rate');
		Menus.addSubMenuItem('topbar', 'albums', 'Your Charts', 'charts');
	}
]);