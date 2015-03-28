angular.module('todoService', [])

	.factory('Todos', function($http){
		return {

			// methods for other objects to utilize =======================
			
			getTodos : function(){
				return $http.get('/api/todos');
			},
			createTodo : function(todoData){
				return $http.post('/api/todos', todoData);
			},
			deleteTodo : function(id){
				return $http.delete('/api/todos/' + id);
			}
		}
	});