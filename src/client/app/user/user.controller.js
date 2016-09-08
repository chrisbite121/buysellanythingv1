(function() {
	'use strict';
	
	angular.module('app.user')
		.controller('userCtrl', userCtrl);
		
	function userCtrl() {
		var vm = this;
		
		activate();
		
		vm.subMenu = {
			menuType: 'user'
		}
		
		function activate() {
			console.log('User Controller activated');
		}
	}
	
})();