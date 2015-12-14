(function(){
	'use strict';
	
	angular.module('app.core')
		.factory('categoryService', categoryService);
		
	categoryService.$inject = ['$http', 'messageService']
		
	function categoryService($http, messageService){
		var service = {
			getCategories: getCategories,
			createCategory: createCategory,
			deleteCategory: deleteCategory,
			updateCategory: updateCategory	
		}
		
		return service;

		function getCategories() {
			return $http.get('/categories/getCategories')
				.then(success)
				.catch(fail);
				
			function success(response){
				return response.data;
			}
			
			function fail(e){
				console.log('XHR Failed for getCategoreis');
				return;
			}
		}
		
		function createCategory(data){
			return $http.post('/categories/createCategory', data)
				.success(success)
				.catch(fail);
				
				function success(response){
					return response;
				}
				
				function fail(e){
					console.log('XHR Failed for createCategory');
				}
		}
		
		function deleteCategory(data){
			return $http.delete('/categories/deleteCategory/' + data.id)
				.success(success)
				.catch(fail);
				
				function success(response) {
					return response;
				}	
				function fail(e){
					console.log('XHR Failed for deleteCategory');
				}
		}
		
		function updateCategory(data){
			return $http.put('/categories/updateCategory', data)
				.success(success)
				.catch(fail);
				
				function success(response) {
					return response;
				}
				
				function fail(e){
					console.log('XHR Failed for updateCategory');
				}
		}
	}
	
})();