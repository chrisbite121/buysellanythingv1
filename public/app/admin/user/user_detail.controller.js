(function(){
    'use strict';
    angular.module('app.manageUsers')
        .controller('userDetailCtrl');
        
    userDetailCtrl.$inject = [];
    
    function userDetailCtrl(){
        var vm = this;
        
        activate();
        function activate(){
            console.log('userDetail Controller activated');
        }
        
    }
    
})();