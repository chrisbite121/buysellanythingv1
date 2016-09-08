(function() {
	'use strict';
	
	angular
		.module('app.layout')
		.controller('shellController', shellcontroller);
		
	shellcontroller.$inject = ['$rootScope', 'config', 'breadCrumbService'];
	
	function shellcontroller($rootScope, config, breadCrumbService) {
		var vm = this;
		
		vm.navline = {
			title: config.appTitle,
			text: 'Create by Chris Ercilla',
			link: 'www.blahblahblah.com'
		};
		
        $rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams) {
            $rootScope.previousState = from.name;
            $rootScope.currentState = to.name;
		});
        
		activate();
		
		function activate() {
			console.log(config.appTitle + 'loaded');
            
		}
	}
	
})();