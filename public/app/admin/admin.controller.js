(function(){
	'use strict';
	angular.module('app.admin')
		.controller('adminCtrl', adminCtrl);
		
	adminCtrl.$inject = ['$rootScope', 'breadCrumbService'];
		
	function adminCtrl($rootScope, breadCrumbService){
		var vm = this;
        vm.breadCrumbArray = [];

		$rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams) {
             $rootScope.previousState = from.name;
             $rootScope.currentState = to.name;
             vm.breadCrumbArray = breadCrumbService.getBreadCrumbs(); 
		 });
		
		
		activate();
		
		vm.subMenuType = {
			menuType: 'admin'
		}
		
		function activate(){
			console.log('admin controller activated');
            vm.breadCrumbArray = breadCrumbService.getBreadCrumbs();
            console.log(vm.breadCrumbArray);
		}
	}
})(); 