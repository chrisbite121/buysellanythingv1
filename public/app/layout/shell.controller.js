(function() {
	'use strict';
	
	angular
		.module('app.layout')
		.controller('shellController', shellcontroller);
		
	shellcontroller.$inject = ['$rootScope', 'config'];
	
	function shellcontroller($rootScope, config) {
		var vm = this;
		
		vm.navline = {
			title: config.appTitle,
			text: 'Create by Chris Ercilla',
			link: 'www.blahblahblah.com'
		};
		
		activate();
		
		function activate() {
			console.log(config.appTitle + 'loaded');
		}
	}
	
})();