(function(){
    'use strict';
    angular.module('app.core')
        .directive('addComment', addComment);
        
    addComment.$inject = ['messageService'];
    
    function addComment(messageService) {
        var directive = {
            require: ['^commentSection', 'addComment'],
            bindToController: true,
            link: addCommentLink,
            controller: addCommentCtrl,
            controllerAs: 'vm',
            restrict: 'E',
            scope: {
                
            },
            templateUrl: 'app/core/comment/add_comment.html'
        };
        
     function addCommentCtrl($scope){
         var vm = this;
         vm.postComment = function() {
             var commentText = vm.commentText;
             var authorName = '<AUTHOR_NAME>'; //To be updated
             var authorId = null; // to be updated
             var parentSlug = null; // to be updated
             $scope.$broadcast('postMessage', commentText, authorName, authorId, parentSlug);
         } 

        $scope.$on('messageAdded', function(event) {
            console.log('creating message');
           messageService.createMessage(3000, 'Comment Added', 'success', vm); 
        });
        
        activate();
        function activate() {
            console.log('add comment Ctrl');
        }
     
     }
     
     function addCommentLink(scope, element, attrs, ctrlArray) {
         var commentSectionCtrl, addCommentCtrl;
         if (ctrlArray[0]) commentSectionCtrl = ctrlArray[0];
         if (ctrlArray[1]) addCommentCtrl = ctrlArray[1];
         
         scope.$on('postMessage', function(event, commentText, authorName, authorId, parentSlug){
             commentSectionCtrl.postComment(commentText, authorName, authorId, parentSlug);
         });
         
     }
     
     return directive
    }
    
    
})();