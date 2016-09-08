(function(){
    'use strict';
    angular.module('app.test')
        .controller('test3Ctrl', test3Ctrl);
    
    test3Ctrl.$inject = [];
    
    function test3Ctrl(){
        var vm = this;
        
        activate();
        function activate(){
            console.log('test3Ctrl activated');
        }
       
        
    }
    
    
})();