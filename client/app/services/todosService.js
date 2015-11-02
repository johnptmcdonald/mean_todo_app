angular.module('todosService', [])

.factory('todosService', todosService)

todosService.$inject = ['$http']

function todosService($http){

	var path = "http://localhost:8080/api/users/"
	var todosService = {}

	todosService.index = function(user_id){
		return $http.get(path + user_id + "/todos")
	}

	todosService.create = function(user_id, todo){
		return $http.post(path + user_id + "/todos", todo)
	}

	todosService.update = function(user_id, todo_id){
		return $http.put(path + user_id + "/todos/" + todo_id)
	}

	return todosService
}