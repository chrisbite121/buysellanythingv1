(function(){
	'use strict';
	
	angular.module('app.manageItems')
		.controller('adminEditItemCtrl', adminEditItemCtrl);
		
	adminEditItemCtrl.$inject = 
    ['$scope' ,'$rootScope','$state','$stateParams', 'categoryService', 
    'geoService', 'itemService', 'messageService','imageService'];
	
	function adminEditItemCtrl($scope, $rootScope, $state, $stateParams, 
        categoryService, geoService, itemService, messageService, imageService){
            
        var vm = this;
        var itemData;
        vm.showImages = false;
        vm.imageArray = [];
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
		}
		
		activate();
		
		function activate(){
            //add check here or against route - if not item selected return to previous state;
            if(Object.keys($stateParams.item).length === 0) {
                  messageService.createMessage(4000, "no item selected", "danger", vm)
            }

            geoService.getProvinces()
			.then(function(response){
                 vm.locations = response; 
            })
            .then(categoryService.getCategories)
            .then(function(response){
                    vm.categories = response;
                    vm.item = $stateParams.item;
                    vm.imageArray = imageService.processImageData(vm.item)
                    if(vm.imageArray.length > 0) {
                        vm.showImages = true;
                    }
            });
         }
        }
})();