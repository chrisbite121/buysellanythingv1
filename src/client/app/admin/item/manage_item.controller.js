(function(){
	'use strict';
	
	angular.module('app.manageItems')
		.controller('adminManageItemCtrl', adminManageItemCtrl);
		
	adminManageItemCtrl.$inject = ['$state', '$stateParams', 
      'itemService','messageService'];
	
	function adminManageItemCtrl($state, $stateParams, 
      itemService, messageService){
		var vm = this;
		vm.items = [];
		vm.showUpdatedItem = false;
		vm.reverse = false;
		vm.showAdddItem = false;
		
		vm.showAddItemForm = function(){
			vm.showAddItem = !vm.showAddItem;
		}
		
		vm.doSort = function(propName) {
			vm.sortBy = propName;
			vm.reverse = !vm.reverse;
		}
		
		vm.createItem = function() {
			createItem();
		}
		
		vm.removeItem = function(id, title) {
            var confirmation = confirm('Are you sure you want to delete ' + title + ' with ID: ' + id + '?');
            if (confirmation) {
			     deleteItem(id);
            }
		}
		
		vm.editItem = function(item) {
			editItem(item);
		}
        
        vm.viewItem = function(item) {
            viewItem(item);
        }
		
		function createItem() {
			$state.go('adminCreateItem');
		}
		
		function getAllItems(){
			var promise = itemService.getAllItems();
			promise.then(function(results){
				vm.items = results;
			});
		}
		
		function deleteItem(id) {
			var data = {
				id: id
			}
			var promise = itemService.deleteItem(data);
			promise.then(function(results) {
				vm.items = results.data;
				messageService.createMessage(4000, "item deleted", "success", vm);
			});
		}
		
		function editItem(item){
			$state.go('admin.EditItem', {item: item});
		}
        
        function viewItem(item){
            $state.go('admin.ViewItem', {item: item});
        }
		
		activate();
		
		function activate(){
			if($stateParams.messageData) {
				var messageData = $stateParams.messageData;
				messageService.createMessage(messageData.duration, messageData.content, messageData.type, vm);
			}
			getAllItems();
		}
	}
	
})();