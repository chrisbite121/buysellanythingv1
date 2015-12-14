(function(){
	'use strict';
	angular.module('app.additem')
		.controller('addItemCtrl', addItemCtrl)
		
	addItemCtrl.$inject = ['$q', '$state', 'itemService', 'categoryService', 'geoService'];
		
	function addItemCtrl($q, $state, itemService, categoryService, geoService){
		var vm = this;


		vm.addItem = function() {
			console.log('addItem function called from controller');
			var data = vm.item;
			console.log(data);
			var promise = itemService.addItem(data);
			promise.then(function(response){
				console.log('item added');
			    $state.go('user');
			});
		}
	
		activate();
		
		function activate(){
			console.log('add item controller activated 555');
			var promise = categoryService.getCategories();
			promise.then(function(response){
				vm.categories = response;
			});
			
			vm.locations = geoService.getProvinces();
		}
	}
})();