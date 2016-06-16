(function (){
	angular
		.module('app.layout')
		.directive('submenuNav', submenuNav);
		
		submenuNav.$inject =[];
		
		function submenuNav() {
			var directive = {
				bindToController: true,
				controller: SubmenuNavController,
				controllerAs: 'vm',
				restrict: 'EA',
				scope: {
					'subMenu': '=subMenu'
				},
				templateUrl: 'app/layout/submenu.html'
			};
			
			function SubmenuNavController($rootScope, $scope, $state, menuService, modelService) {
				var vm = this;
                vm.isActive = undefined;
                vm.menuItems = [];
                
                activate();
                function activate(){
                    vm.menuItems = menuService.getMenuItems(vm.subMenu.menuType);
                }
                
			}
			
			return directive;
		}
})();