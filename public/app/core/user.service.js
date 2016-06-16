(function(){
    'use strict';
    
    angular.module('app.core')
        .factory('userService', userService)
        
    userService.$inject = ['$http'];
    
    function userService($http){
        
        var service = {
             getOneUser: getOneUser,
             addUser: addUser,
             updateUser: updateUser,
             deleteUser: deleteUser,
             getUsers: getUsers   
        }
        
        function getOneUser(userId){
            $http.get('/getUser/' + userId)
                .then(success)
                .catch(fail);
                
            function success(response){
                return response.data;
            }
            
            function fail(e){
                console.log('XHR Failed for getComments');
            }
        }
        
        function addUser(data){
            $http.post('/add', data)
                .success(success)
				.catch(fail);
				
			function success(response) {
                return response;
			}
			
			function fail(e) {
				return console.log('XHR Failed for add User');
			}
        }
        
        function updateUser(data){
            var userId = data.userId
            $http.put('/update/' + userId, data)
                .success(success)
                .catch(fail);
                    
            function success(response) {
                return response;
            }
            
            function fail(e) {
                return console.log('XHR Failed for update User');
            }
        }
        
        function deleteUser(userId){
            $http.delete('/delete/' + userId)
                .success(success)
				.catch(fail);
				
			function success(response){
				return response;
			}
			
			function fail(e){
				return console.log('XHR Failed for delete User');
			}            
        }
        
        function getUsers(pageNumber, pageSize){
            var config = {
                params: {
                    pageNumber: pageNumber,
                    pageSize: pageSize
                }    
            };
            
            $http.get('/users/' + pageNumber, config)
                .then(success)
                .catch(fail);
            
            function success(response){
                return response.data;
            }
            
            function fail(e){
                console.log('XHR Failed for get users')
            }
        }
        
        return service;
        
        
    }
    
})();