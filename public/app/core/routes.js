(function(){
	'use strict';
	angular.module('app.core')
		.config([
			'$stateProvider',
			"$urlRouterProvider",
			"$locationProvider",
			routesConfig
			
		]);
		
		function routesConfig(
			$stateProvider, $urlRouterProvider, $locationProvider) {
			$urlRouterProvider.otherwise('/');
			
			$stateProvider
				.state('home', {
					url:'/home',
					templateUrl: 'app/home/home.html',
					data: {
						menuType: 'main',
						menuName: 'Home'
					}
				})
				.state('signup', {
					url: '/signup',
					templateUrl:'app/signup/signup.html',
					data: {
						menuType: 'main',
						menuName: 'Signup'
					}					
				})
				.state('viewitem', {
					url: '/viewitem',
					templateUrl:'app/item/viewitem.html',
					data: {
						menuType: 'main',
						menuName: 'View Item'
					}
				})
				.state('user', {
					url:'/user',
					templateUrl: 'app/user/user.html',
					data: {
						menuType: 'main',
						menuName: 'User'
					}
				})
				.state('admin',  {
					url:'/admin',
					abstract: true,
					templateUrl:'app/admin/admin.html',
					data: {
						menuType: 'abstract'
					},
					controller: 'adminCtrl'
				})
				.state('admin.Home', {
					url:'adminHome',
					templateUrl:'app/admin/admin_home.html',
					data:{ 
						menuType: 'main',
						menuName: 'Admin'
					}
				})
				.state('admin.managecategory', {
					url:'/managecategory',
					templateUrl: 'app/category/manage_category.html',
					data: {
						menuType: 'admin',
						menuName: 'Manage Categories'
					}					
				})
				.state('admin.manageItem', {
					url:'/manageItem',
					templateUrl: 'app/admin/item/manage_item.html',
					params: {
						messageData: null
					},
					data: {
						menuType: 'admin',
						menuName: 'Manage Items'
					}
				})
				.state('admin.AddItem', {
					url:'/aadditem',
					templateUrl: "app/admin/item/add_item.html",
					data: {
						menuType: 'admin',
						menuName: 'Add Item'
					}	
				})
				.state('admin.ViewItem', {
					url:'/aviewitem',
					templateUrl: "app/admin/item/view_item.html",
					data: {
						menuType: 'admin',
						menuName: 'View Item'
					}	
				})
				.state('admin.EditItem', {
					url:'/aedititem',
					templateUrl:'app/admin/item/edit_item.html',
					params: {
						item: {}
					},
					data: {
						menuType: 'admin',
						menuName: 'Edit Item'
					}	
				});
			
			$locationProvider.html5Mode(true);
		}
		
})();