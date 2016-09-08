(function(){
    'use strict';
    angular.module('app.core')
        .directive('commentSection', commentSection);
        
    commentSection.$inject = ['commentService','$timeout', '$rootScope'];
    
    function commentSection(commentService, $timeout, $rootScope) {
        var directive = {
            require: 'commentSection',
            link: commentSectionLink,
            controller: commentSectionCtrl,
            controllerAs: 'vm',
            restrict: 'E',
            scope: {
                'commentDetails' : '='
            },
            bindToController: true,
        };
        
      function commentSectionCtrl($scope) {
          var vm = this;
          vm.details = {
              pageNumber: 1,
              pageSize: 20
          };  
                      
          activate();
          console.log($scope);
          function activate(){
            $scope.$watchCollection('vm.commentDetails', function(newValue, oldValue){
              if(vm.commentDetails.discussionId && vm.commentDetails.discussionType) {
                    vm.getComments();
                }                
            });
            
          }
          
          vm.getComments = function(){
            commentService.getThread(
                vm.discussionId, 
                vm.type, 
                vm.details.pageNumber, 
                vm.details.pageSize)
                    .then(function(results) {
                        console.log(results);
                        $rootScope.$broadcast('commentData', results);  
                    });
          }
          
          vm.postComment = function(commentText, authorName, authorId, parentSlug) {
              var data = {
                  parentId: vm.id, //id of Item or User object
                  parentSlug: parentSlug, //slug if exists
                  discussionId: vm.discussionId, //id of discussion (1 for comments, but multiple for users)
                  type: vm.type, //is this needed?
                  text: commentText,
                  authorName: authorName,
                  authorId: authorId,
                  
              };
              commentService.postComment(data)
                .then(function(results){
                    console.log('comment Added');
                    $rootScope.$broadcast('messageAdded');
                });
          }
      }
      
      function commentSectionLink(scope, element, attrs, controller) {
          console.log('comment section Link');
      }
      
      return directive
    }
    
})();