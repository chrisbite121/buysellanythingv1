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
			$urlRouterProvider.otherwise('/main/');
			
			$stateProvider
                //HomePage
				.state('main', {
					url:'/main',
                    abstract: true,
					templateUrl: 'app/main/main.html',
					data: {
						menuType: 'abstract'
					}
				})
                .state('main.home',{
                    url:'/',
                    abstract: false,
                    templateUrl: 'app/main/home/home.html',
                    data: {
                        menuType: ['main', 'mainSub'],
                        menuName: 'Home'
                    },
                    params: {
                        page: 1,
                        category: 'all'
                    }
                })
                .state('main.query',{
                    url:'/:category/:page',
                    abstract: false,
                    templateUrl: 'app/main/home/home.html',
                    data: {
                        menuType: 'hidden',
                    }
                })                
                .state('main.additem', {
                    url: '/item',
                    templateUrl: 'app/item/additem/additem.html',
                    data: {
                        menuType: 'mainSub',
                        menuName: 'Add Item'
                    }
                })
				.state('viewitem', {
					url: '/item/:id',
					templateUrl:'app/item/viewitem/viewitem.html',
					data: {
						menuType: 'mainSub',
						menuName: 'View Item'
					},
                    params: {
                        messageData: null,
                        item: null
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
				.state('user', {
					url:'/user',
					templateUrl: 'app/user/user.html',
					data: {
						menuType: 'main',
						menuName: 'User'
					}
				})

			$locationProvider.html5Mode(true);
		}
		
})();