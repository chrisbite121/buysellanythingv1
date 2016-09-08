(function(){
    'use strict';
    angular.module('app.additem')
        .controller('additem_detailCtrl', additem_detailCtrl);
    
    additem_detailCtrl.$inject = ['$rootScope','$scope'];
    
    function additem_detailCtrl($rootScope, $scope){
        $scope.cat = '';
        $rootScope.$on('categoriesUpdated', function(e){
           $scope.$apply;
           console.log('categories updated'); 
        });
        
        $rootScope.$on('locationsUpdated', function(e){
           $scope.$apply; 
           console.log('locations updated');
        });
        
        activate();
        function activate(){
            console.log('additem_detailsCtrl activated');
        }
        
    }
    
})();