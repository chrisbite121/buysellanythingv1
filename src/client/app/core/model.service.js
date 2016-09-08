(function(){
    'use strict';
    angular.module('app.core')
        .service('modelService', modelService);
        
    modelService.$inject = ['$rootScope'];
    
    function modelService($rootScope) {
        
        $rootScope.$on('$stateChangeSuccess',
            function(event, toState, toParams, fromState, fromParams) {

            });
    }
    
    
})();