(function(){
    'use strict';
    angular.module('app.manageUsers')
        .controller('adminManageUserCtrl', adminManageUserCtrl);
    
    adminManageUserCtrl.$inject = [];
    
    function adminManageUserCtrl(){
        var vm = this;
        
        activate();
        
        function activate(){
            console.log('adminManageUserCtrl activated');
        }
    }
    
    
    
})();