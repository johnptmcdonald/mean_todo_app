angular.module('todosService', [])

.factory('todosService', todosService)

todosService.$inject = ['$http']

function todosService($http){

	var todosService = {}

	todosService.index = function(){
		
	}
}