(function(){
    'user strict';
    
    angular.module('app.core')
        .factory('commentService', commentService)
        
    commentService.$inject = ['$http'];
    
    function commentService($http){
        var service = {
            postComment: postComment,
            respondComment: respondComment,
            getThread: getThread,
            getByUser: getByUser,
            removeComment: removeComment,
            updateComment: updateComment
        }
        
        return service;
        
        function postComment(data){
            return $http.post('/comment/post', data)
                .success(success)
				.catch(fail);
				
			function success(response) {
                return response;
			}
			
			function fail(e) {
				return console.log('XHR Failed for add Comment');
			}
        }
        
        function respondComment(data){
            return $http.post('/comment/respond', data)
                .success(success)
                .catch(fail);
                
            function success(response){
                return response;
            }
            
            function fail(e) {
                return console.log('XHR Failed for respond Comment');
            }
        }
        
        function getThread(discussionId, discussionType, pageNumber, pageSize){
           console.log('get Thread called');
           var cache = true;
           // cache except if for page 1
           if (pageNumber == 1  || pageNumber ==  "1") cache = false;
           
           var config = {
               params: {
                   pageNumber: pageNumber,
                   pageSize: pageSize,
                   discussionId: discussionId,
                   discussionType: discussionType
               },
               cache: cache
           }
           
            return $http.get('/comment/' + discussionId + '/' + pageNumber, config)
                .then(success)
                .catch(fail);
                
            function success(response){
                return response.data;
            }
            
            function fail(e){
                console.log('XHR Failed for getComments');
            }
        }
        
        function getByUser(userId, pageSize, pageNumber){
           var cache = true;
           // cache except if for page 1
           if (pageNumber == 1  || pageNumber ==  "1") cache = false;
           
           var config = {
               params: {
                   pageNumber: pageNumber,
                   pageSize: pageSize,
                   userId: userId
               },
               cache: cache
           } 
            
            return $http.get('comment/byUser/' +  userId, config)
                .then(success)
                .catch(fail);
            
            function success(response){
                return response.data;
            }
            
            function fail(e){
                console.log('XHR Failed for get Comments by User')
            }
        }
        
        function removeComment(commentId){
            return $http.delete('comment/remove/:commentId')
                .success(success)
				.catch(fail);
				
			function success(response){
				return response;
			}
			
			function fail(e){
				return console.log('XHR Failed for delete Comment');
			}
        }
        
        function updateComment(data){
            var commentId = data.commentId
            return $http.put('comment/update/' + commentId, data)
        		.success(success)
				.catch(fail);
				
			function success(response) {
				return response;
			}
			
			function fail(e) {
				return console.log('XHR Failed for update Comment');
			}
		}
    }
    
})();