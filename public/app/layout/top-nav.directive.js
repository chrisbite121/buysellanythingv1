(function () {
	angular
		.module('app.layout')
		.directive('topNav', topNav);
		
		topNav.$inject = ['menuService'];
		
		function topNav(menuService) {
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
				vm.menuItems = menuService.getMenuItems(menuType);
			}
			
			return directive;
		}
		
	
})();
