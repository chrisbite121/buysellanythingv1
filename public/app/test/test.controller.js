(function(){
    'use strict';
    
    angular.module('app.test')
        .controller('testCtrl', testCtrl);
        
    testCtrl.$inject = [];
    
    function testCtrl(){
        var vm = this;
        vm.subMenuType = {
            menuType: 'test'
        }
        
        
        activate();
        function activate(){
            console.log('abstract test controller activated');
        }
        
    }    
    
})();