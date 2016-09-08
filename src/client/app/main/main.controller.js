(function(){
	'use strict';
	
	angular.module('app.main')
		.controller('mainCtrl', mainCtrl);
	
    mainCtrl.$inject = ['$rootScope','breadCrumbService'];	
		
	function mainCtrl($rootScope, breadCrumbService){
		var vm = this;
		vm.subMenuType = {
           menuType: 'mainSub'
        }
              
        $rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams) {
             vm.breadCrumbArray = breadCrumbService.getBreadCrumbs();
        });
        
		activate();
		
		function activate(){
            vm.breadCrumbArray = breadCrumbService.getBreadCrumbs();
            }
	}
	
})();