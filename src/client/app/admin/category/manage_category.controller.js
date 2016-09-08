(function(){
	'use strict';
	
	angular.module('app.category')
		.controller('manageCategoryCtrl', manageCategoryCtrl)
		
	manageCategoryCtrl.$inject = ['$state','$stateParams', 'categoryService', 'messageService'];
	
	function manageCategoryCtrl($state, $stateParams, categoryService, messageService) {
		var vm = this;
		vm.categories = [];
		vm.showUpdateField = false;
		vm.reverse = false;
		
		
		vm.createCategory = function(categoryName) {
			createCategory(categoryName);
		} 
		
		vm.editCategory = function(category) {
			vm.showUpdateField = true;
			vm.updatedCategoryName = category.title;
			vm.updatedCategoryId = category._id;
		}
		
		vm.updateCategory = function(id, newCategoryName) {
			updateCategory(id, newCategoryName);
		}
		
		vm.removeCategory = function(id) {
			deleteCategory(id);
		}
		
		vm.doSort = function() {
			vm.reverse = !vm.reverse;
		}
		
		
		function deleteCategory(id) {
			var data = {
				id: id
			}
			var promise = categoryService.deleteCategory(data);
			promise.then(function(results) {
				messageService.createMessage(4000, "category deleted", "success", vm);
				vm.categories = results.data;
			});
		}
		
		function updateCategory(id, categoryName){
			var data = {
				id: id,
				title: categoryName
			}
			var promise = categoryService.updateCategory(data);
			promise.then(function(results) {
					messageService.createMessage(4000, "category updated", "success", vm);
					vm.categories = results.data;
					vm.updatedCategoryName = '';
					vm.showUpdateField = false;
			});
		}
		
		function createCategory(categoryName) {
			var data = {
				title: categoryName
			}
			var promise = categoryService.createCategory(data);
			promise.then(function(results) {
				messageService.createMessage(4000, "category created", "success", vm);
				vm.categories = results.data;
				vm.newCategoryName = '';
			});
		}
		
		function getCategories(){
			var promise = categoryService.getCategories();
			promise.then(function(results) {
			vm.categories = results;
			});
		}
		
		activate();
		
		function activate(){
			getCategories();
							
			}
			
		}
	
})();