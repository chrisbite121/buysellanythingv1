(function(){
	angular
		.module('app.manageItems')
		.controller('adminAddItemCtrl', adminAddItemCtrl);
		
	adminAddItemCtrl.$inject = ['$timeout', 'itemService', 'categoryService', 'geoService', 'messageService'];
	
	function adminAddItemCtrl($timeout, itemService, categoryService, geoService, messageService) {
			var vm = this;
			vm.message = {};
			
			vm.addItem = function(){
				console.log(vm.item);
				var data = vm.item;
				var promise = itemService.addItem(data);
				promise.then(function(response){
					messageService.createMessage(4000, "item created", "success", vm);
					vm.item = '';
				});
			}
			
			activate();
			
			function activate(){
				console.log('additem controller activated');
				var promise = categoryService.getCategories();
				promise.then(function(response){
					vm.categories = response;
				});
			
				vm.locations = geoService.getProvinces();
			}
			
		}	
	
})();