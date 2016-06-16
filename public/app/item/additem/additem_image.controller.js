(function(){
    'use strict';
    angular.module('app.additem')
        .controller('additem_imageCtrl', additem_imageCtrl);
        
    additem_imageCtrl.$inject = ['$scope'];
    
    function additem_imageCtrl($scope) {
       
        
        activate();
        function activate(){
            console.log('additem_imageCtrl activated');
        }
    } 
    
    
})();