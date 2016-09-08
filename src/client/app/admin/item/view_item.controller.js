(function(){
	'use strict'
	
	angular.module('app.manageItems')
		.controller('adminViewItemCtrl', adminViewItemCtrl);
	
	adminViewItemCtrl.$inject = ['$state', '$rootScope','$stateParams',
     'messageService', 'itemService', 'imageService'];
	
	function adminViewItemCtrl($state, $rootScope, $stateParams, 
      messageService, itemService, imageService) {
		var vm = this;
		vm.message = '';
        vm.item = '';
        vm.showImages = [];
        
		vm.editItem = function(item){
            editItem(item);
        }
        
        vm.cancelView = function(){
            console.log('cancel view called');
            cancelView();
        }
        
        
        

        
        activate();
		
		function activate() {
			console.log('view item controller activated');
            if(Object.keys($stateParams.item).length === 0) {
                messageService.createMessage(4000, "no item selected", "danger", vm)
            } else {
                vm.item = $stateParams.item;
                vm.imageArray = imageService.processImageData(vm.item)
                if (vm.imageArray.length > 0){
                    vm.showImages = true;
                }
            }
		}
        
        function editItem(item){
			$state.go('admin.EditItem', {item: item});
		}
        
        function cancelView(){
			$state.go($rootScope.previousState);
		}
		
	}
	
	
})();