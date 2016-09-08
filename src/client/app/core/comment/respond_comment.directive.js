(function(){
    'use strict';
    angular.module('app.core')
        .directive('respondComment', respondComment);
        
    respondComment.$inject = ['messageService'];
    
    function respondComment(messageService) {
        var directive = {
            require : ['respondComment', '^viewComments', '^commentSection'],
            bindToController: true,
            link: respondCommentLink,
            controller: respondCommentCtrl,
            controllerAs: 'vm',
            restrict: 'E',
            scope: {
                'parentSlug' : '='
            },
            templateUrl: 'app/core/comment/respond_comment.html'
        };
        
        function respondCommentCtrl($scope) {
            var vm = this;
            
        vm.postResponse = function() {
             var commentText = vm.commentText;
             var parentSlug = vm.parentSlug;
             var authorName = '<AUTHOR_NAME>'; //To be updated
             var authorId = null; // to be updated
             $scope.$broadcast('respondMessage', commentText, authorName, authorId, parentSlug);
         } 
        
        $scope.$on('messageAdded', function(event) {
            console.log('creating message');
           messageService.createMessage(3000, 'Comment Added', 'success', vm); 
        });
        
            activate();
            function activate() {

            }
        }
        
        function respondCommentLink(scope, element, attrs, ctrlArray) {
            var respondCommentCtrl = ctrlArray[0];
            var viewCommentsCtrl = ctrlArray[1];
            var commentSectionCtrl = ctrlArray[2];
            
         scope.$on('respondMessage', function(event, commentText, authorName, authorId, parentSlug){
             console.log('respondMessage received');
             commentSectionCtrl.postComment(commentText, authorName, authorId, parentSlug);
         });
        }
        
        return directive
    }
    
    
})();