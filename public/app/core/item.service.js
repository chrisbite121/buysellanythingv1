(function() {
	'use strict';
	
	angular.module('app.core')
		.factory('itemService', itemService);
		
	itemService.$inject = ['$http']
	
	function itemService($http) {
		var service = {
			getItems: getItems,
			updateItem: updateItem,
			addItem: addItem,
			deleteItem: deleteItem
		}
		
		return service;
		
		function getItems(){
			return $http.get('/item/getItems')
				.then(success)
				.catch(fail);
				
			function success(response) {
				return response.data;
			}
			
			function fail(e) {
				return console.log('XHR Failed for getItems');
			}
		}
		
		function updateItem(data){
			return $http.put('/item/updateItem', data)
				.success(success)
				.catch(fail);
				
			function success(response) {
				return response;
			}
			
			function fail(e) {
				return console.log('XHR Failed for updateItem');
			}
		}
		
		function addItem(data){
			return $http.post('/item/createItem', data)
				.success(success)
				.catch(fail);
				
			function success(response) {
				return response;
			}
			
			function fail(e) {
				return console.log('XHR Failed for addItem');
			}
		}
		
		function deleteItem(data){
			return $http.delete('/item/deleteItem/' + data.id)
				.success(success)
				.catch(fail);
				
			function success(response){
				return response;
			}
			
			function fail(e){
				return console.log('XHR Failed for deleteItem');
			}
		}
		
	}
})();