(function (){
	angular
		.module('app.layout')
		.directive('submenuNav', submenuNav);
		
		submenuNav.$inject =['menuService'];
		
		function submenuNav(menuService) {
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
			
			function SubmenuNavController() {
				var vm = this;
				vm.menuItems = menuService.getMenuItems(vm.subMenu.menuType);
			}
			
			return directive;
		}
})();