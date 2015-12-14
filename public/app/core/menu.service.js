(function() {
	'use strict';
	
	angular.module('app.core')
		.factory('menuService', menuService);
		
	menuService.$inject = ['$state'];
	
	function menuService($state) {
		var service = {
			getMenuItems: getMenuItems
		}
		
		return service;
		
		function getMenuItems(userType){
			var states =  $state.get();
			
			var filteredStates = states.filter(filtereByUserType);
			
			function filtereByUserType(obj) {
				if ('data' in obj && obj.data.menuType && obj.data.menuType==userType) {
					return true;
				}	else {
					return false;
				}
			};
			return filteredStates;		
		}
	}
})();