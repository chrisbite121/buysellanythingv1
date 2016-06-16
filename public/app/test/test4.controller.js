(function(){
    'use strict';
    angular.module('app.test')
        .controller('testCtrl4', testCtrl4);
        
    testCtrl4.$inject = ['$scope', '$timeout'];
   
   function testCtrl4($scope, $timeout){
    $scope.bread = 'bread bread bread';
    
    $timeout(function(){
        $scope.bread = 'garbage garbage garbage';
    }, 3000)
    
    activate();
    function activate(){
        console.log('myCtrl activated');
    }       
       
   }
   
    
})();