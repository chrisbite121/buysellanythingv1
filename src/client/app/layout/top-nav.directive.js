(function () {
	angular
		.module('app.layout')
		.directive('topNav', topNav);
		
		topNav.$inject = ['$rootScope', 'menuService'];
		
		function topNav($rootScope, menuService) {
			var directive = {
				bindToController: true,
				controller: TopNavController,
				controllerAs: 'vm',
				restrict: 'EA',
				scope: {
					'navline': '='
				},
				templateUrl: 'app/layout/top-nav.html'
			};
			
			function TopNavController() {
				var vm = this;
                var menuType = 'main';
				vm.menuTiems = [];
                vm.isActive = undefined;
                
                activate();
                
                function activate(){
                    vm.menuItems = menuService.getMenuItems(menuType);
                }
                
			}
			
			return directive;
		}
		
	
})();
