(function(){
    'use strict';
    angular.module('app.manageComment')
        .controller('commentDetailCtrl', commentDetailCtrl);
        
    commentDetailCtrl.$inject = [];
    
    function commentDetailCtrl() {
        var vm = this;
        
        activate();
        function activate(){
            console.log('commentDetailCtrl activated');
        }
        
    }
    
    
})();