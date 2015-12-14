(function(){
	'use strict';
	
	angular.module('app.manageItems')
		.controller('adminEditItemCtrl', adminEditItemCtrl);
		
	adminEditItemCtrl.$inject = ['$rootScope','$state','$stateParams', 'categoryService', 'geoService', 'itemService', 'messageService'];
	
	function adminEditItemCtrl($rootScope, $state, $stateParams, categoryService, geoService, itemService, messageService){
		var vm = this;
		
		vm.updateItem = function(){
			updateItem();
		}
		
		vm.cancelEdit = function(){
			cancelEdit();
		}
		
		function updateItem() {
			var data = vm.item;
			console.log(data);
			var promise = itemService.updateItem(data);
			promise.then(function(results){
				var messageData = {
						duration: 4000, 
						content: "item updated", 
						type: "success", 
				}
				$state.go('admin.manageItem', {messageData: messageData});
			});
		}
		
		function cancelEdit(){
			$state.go($rootScope.previousState);
			console.log('cancel called');
		}
		
		activate();
		
		function activate(){
			
			vm.locations = geoService.getProvinces();
			var promise = categoryService.getCategories();
			promise.then(function(response){
				vm.categories = response;
				vm.item = $stateParams.item;
			});			
		}
	}	
})();