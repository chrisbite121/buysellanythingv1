(function (){
	'use strict';
	
	var core = angular.module('app.core');
	
	var config = {
		appTitle: 'HotThaiDeals',
		menuType: {
			admin: 'admin',
			user: 'user',
			main: 'main'
		}
	}
	
	core.value('config', config);
	

	
})();