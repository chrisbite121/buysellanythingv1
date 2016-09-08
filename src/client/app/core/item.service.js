(function() {
	'use strict';
	
	angular.module('app.core')
		.factory('itemService', itemService);
	//Can we remove $cacheFactory dependency??	
	itemService.$inject = ['$http', '$cacheFactory']
	
	function itemService($http, $cacheFactory) {
		var service = {
			getItems: getItems,
            getAllItems: getAllItems,
            getOneItem: getOneItem,
			updateItem: updateItem,
			addItem: addItem,
			deleteItem: deleteItem,
            getDateFromId: getDateFromId
		}
		
		return service;
		
        function getOneItem(id){
            var config = {
                cache: true    
            };
            
            return $http.get('/item/getOneItem/' + id, config)
                .then(success)
                .catch(fail);
                
            function success(response){
                return response.data
            }
            
            function fail(e) {
                return console.log('XHR Failed for getOneItem');
            }
        }
        
        function getAllItems(){
            return $http.get('/item/getAllItems')
                .then(success)
                .catch(fail);
                
            function success(response) {
                return response.data
            }
            
            function fail(e) {
                return console.log('XHR Failed for getAllItems');
            }
        }
        
		function getItems(pageNumber, pageSize, category){

          if (pageNumber == undefined) pageNumber = "1";
          if (pageSize == undefined) pageSize = "10";
          if (category == (undefined || 'All Items')) category = "all"
            
           var cache = true;
           // cache except if for page 1
           if (pageNumber == 1  || pageNumber ==  "1") cache = false;
           
            var config = {
                  params: {
                     pageNumber: pageNumber,
                     pageSize: pageSize,
                     category: category
                    },
                    cache: cache 
                }

            return $http.get('/item/getItems/' + category + '/' + pageNumber, config)
				.then(success)
				.catch(fail);
				
			function success(response) {
 				return response.data;
			}
			
			function fail(e) {
				return console.log('XHR Failed for getItems');
			}
		}
		
		function updateItem(data){
			return $http.put('/item/updateItem', data)
				.success(success)
				.catch(fail);
				
			function success(response) {
				return response;
			}
			
			function fail(e) {
				return console.log('XHR Failed for updateItem');
			}
		}
		
		function addItem(fd){
			return $http.post('/item/createItem', fd, {
                transforRequest: angular.identity,
                headers: {'Content-Type': undefined}
                })
				.success(success)
				.catch(fail);
				
			function success(response) {
			}
			
			function fail(e) {
				return console.log('XHR Failed for addItem');
			}
		}
		
		function deleteItem(data){
			return $http.delete('/item/deleteItem/' + data.id)
				.success(success)
				.catch(fail);
				
			function success(response){
				return response;
			}
			
			function fail(e){
				return console.log('XHR Failed for deleteItem');
			}
		}
        
        function getDateFromId(id){
                // first 4 bytes are the timestamp portion (8 hex chars)
                var timehex = id.substring(0,8);
                // convert to a number... base 16
                var secondsSinceEpoch = parseInt(timehex, 16);
                //convert to milliseconds, and create a new data
                var dt = new Date(secondsSinceEpoch*1000);
                return dt;
            
        }
		
	}
})();