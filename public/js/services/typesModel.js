angular.module('typeService', [])
	.factory('Types', function($http){
		return {

			// observer internals ===========================================
			
			// array of observers
			observerCallbacks : [],

			// other objects use this to register callbacks
			// whenever this service updates the db.
			registerObserverCallbacks : function(callback){
				this.observerCallbacks.push(callback);
			},

			// notify observers to run their callbacks
			notifyObserverCallbacks : function(){
				angular.forEach(this.observerCallbacks, function(callback){
					callback();
				});
			},

			// code for other objects =======================================
			
			// get all types from the api
			getTypes : function(){
				return $http.get('/api/types');
			},
			
			// tell the api to create a type, sending it typeData
			createType : function(typeData){
				var self = this;
				return $http.post('/api/types', typeData)
					.success(function(){
						self.notifyObserverCallbacks();
					});
			},

			// delete a type
			deleteType : function(id){
				var self = this;
				return $http.delete('api/types/' + id).
					success(function(){
						self.notifyObserverCallbacks();
					});
			}
		}
	});