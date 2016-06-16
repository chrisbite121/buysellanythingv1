(function(){
    'use strict';
    angular.module('app.core')
        .directive('viewComments', viewComments);
    
    viewComments.$inject = [];
            
    function viewComments() {
        var directive = {
            require: ['^commentSection','viewComments'],
            link: viewCommentLink,
            bindToController: true,
            controller: viewCommentsCtrl,
            controllerAs: 'vm',
            restrict: 'E',
            scope: {
            
            },
            templateUrl: 'app/core/comment/view_comment.html'
        };
        
    function viewCommentsCtrl($scope) {
        var vm = this;
        $scope.$on('commentData', function(event, results) {
           console.log('results received');
           console.log(results); 
           vm.comments = results;
        });
        

        
        activate();
        function activate() {
            console.log('view comment Ctrl')
        }
        
    }        
    
    function viewCommentLink(scope, element, attrs, ctrlArray){
        var commentSectionCtrl = ctrlArray[0];
        var viewCommentsCtrl = ctrlArray[1];
        scope.$on('newCommentData', function(event, results) {
           console.log('results received by the link function');
           console.log(results); 
        });
        
                 
         scope.$on('test', function(event, testme) {
             console.log(testme);
         });
         
         console.log('view comment Link')
    }

    return directive
}   
})();