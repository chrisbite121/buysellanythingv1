(function(){
	'use strict';
	angular.module('app.admin')
		.controller('adminCtrl', adminCtrl);
		
	adminCtrl.$inject = ['$rootScope'];
		
	function adminCtrl($rootScope){
		var vm = this;
		$rootScope.previousState;
		$rootScope.currentState;
		$rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams) {
    	$rootScope.previousState = from.name;
    	$rootScope.currentState = to.name;
		});
		
		
		activate();
		
		vm.subMenu = {
			menuType: 'admin'
		}
		
		function activate(){
			console.log('admin controller activated');
		}
	}
})();