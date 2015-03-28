angular.module('todoController', [])

	.controller('todoControl', function($scope, $http, Todos, Types){
		$scope.formData = {};

		// internal methods =============================================
		
		// get all the types
		var typeUpdate = function(){
			Types.getTypes()
				.success(function(data){
					$scope.types = data;
				});
		};

		// register typeUpdate to the typescallback observer notification
		Types.registerObserverCallbacks(typeUpdate);


		// on initial load, get all the todos
		Todos.getTodos()
			.success(function(data){
				$scope.todos = data;
			});

		// on initial load get all the types
		typeUpdate();


		// external methods for view ===========================================
		

		// when submitting the add form, send the text to the node api
		$scope.createTodo = function(){
			if (!$.isEmptyObject($scope.formData)){
				Todos.createTodo($scope.formData)
					.success(function(data){
						$scope.formData = {};
						$scope.todos = data;
					});
			}
		};

		// delete a todo after checking it
		$scope.deleteTodo = function(id){
			Todos.deleteTodo(id)
				.success(function(data){
					$scope.todos = data;
				});
		};

	});