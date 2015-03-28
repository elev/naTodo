angular.module('typeController', [])
	.controller('typeControl', function($scope, $http, Todos, Types){
		$scope.formData = {};

		// internal processes ========================================
		
		// on initial load get all the types
		Types.getTypes()
			.success(function(data){
				$scope.types = data;
			});

		// methods for view ==========================================
		
		// create a type
		$scope.createType = function(){
			if (!$.isEmptyObject($scope.formData)){
				Types.createType($scope.formData)
					.success(function(data){
						$scope.formData = {};
						$scope.types = data;
					});
			}
		};

		// delete a type
		$scope.deleteType = function(id){
			Types.deleteType(id)
				.success(function(data){
					$scope.types = data;
				});
		}
		
	});

