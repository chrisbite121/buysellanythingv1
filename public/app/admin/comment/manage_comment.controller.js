(function(){
    'use strict';
    angular.module('app.manageComment')
        .controller('manageCommentCtrl', manageCommentCtrl);
        
    manageCommentCtrl.$inject = [];
    
    function manageCommentCtrl(){
        var vm = this;
        
        activate();
        function activate() {
            console.log('manageController activted');
        }
    }
    
    
})();