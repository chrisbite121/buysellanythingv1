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
                //Test Routes
                .state('test', {
                    url:'/test',
                    abstract: true,
                    templateUrl: 'app/test/test.html',
                    data: {
                        menuType: 'abstract'
                    },
                    controller: 'testCtrl'
                })
                .state('test.home', {
                    url:'/testhome',
                    templateUrl: 'app/test/test_home.html',
                    data: {
                        menuType: ['main', 'test'],
                        menuName: 'Test'
                    }
                })
                .state('test.test1', {
                    url:'/test1',
                    templateUrl: 'app/test/test1.html',
                    data: {
                        menuType: 'test',
                        menuName: 'Test1'
                    }
                })
                .state('test.test2', {
                    url:'/test2',
                    templateUrl: 'app/test/test2.html',
                    data: {
                        menuType: 'test',
                        menuName: 'Test2'
                    }
                })
                .state('test.test3', {
                    url:'/test3',
                    templateUrl: 'app/test/test3.html',
                    data: {
                        menuType: 'test',
                        menuName: 'Test3'
                    }
                })
                .state('test.test4', {
                    url: '/test4',
                    templateUrl: 'app/test/test4.html',
                    data: {
                        menuType: 'test',
                        menuName: 'Test4'
                    }
                });
			
		}
		
})();