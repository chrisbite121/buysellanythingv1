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
			
			$stateProvider
                //Admin Routes
				.state('admin',  {
					url:'/admin',
					abstract: true,
					templateUrl:'app/admin/admin.html',
					data: {
						menuType: 'abstract'
					},
					controller: 'adminCtrl'
				})
				.state('admin.home', {
					url:'/home',
					templateUrl:'app/admin/admin_home.html',
					data:{ 
						menuType: ['main','admin'],
						menuName: 'Admin'
					}
				})
				.state('admin.managecategory', {
					url:'/managecategory',
					templateUrl: 'app/admin/category/manage_category.html',
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
					url:'/adminadditem',
					templateUrl: "app/admin/item/add_item.html",
					data: {
						menuType: 'admin',
						menuName: 'Add Item'
					}	
				})
				.state('admin.ViewItem', {
					url:'/adminviewitem',
					templateUrl: "app/admin/item/view_item.html",
                    params: {
                        item: {}
                    },
					data: {
						menuType: 'admin',
						menuName: 'View Item'
					}	
				})
				.state('admin.EditItem', {
					url:'/adminedititem',
					templateUrl:'app/admin/item/edit_item.html',
					params: {
						item: {}
					},
					data: {
						menuType: 'admin',
						menuName: 'Edit Item'
					}	
				})
                .state('admin.ManageUser', {
                    url: '/manageuser',
                    templateUrl: 'app/admin/user/manage_user.html',
                    data: {
                        menuType: 'admin',
                        menuName: 'Manage Users'
                    }
                })
                .state('admin.UserDetail', {
                    url: '/userdetail/:userId',
                    templateUrl: 'app/admin/user/user_detail.html',
                    data: {
                        menuType: 'admin',
                        menuName: 'User Detail'
                    }
                })
                .state('admin.ManageComment', {
                    url: '/managecomment',
                    templateUrl: 'app/admin/comment/comment_detail.html',
                    data: {
                        menuType: 'admin',
                        menuName: 'Manage Comment'
                    }
                })
                .state('admin.CommentDetail', {
                    url: '/commentdetail/:commentId',
                    templateUrl: 'app/admin/comment/manage_comment.html',
                    data: {
                        menuType: 'admin',
                        menuName: 'Comment Detail'
                    }
                });
                

		}
		
})();