angular.module('mean_todo')

.controller('TodosController', TodosController)

TodosController.$inject = ['todosService', 'authFactory']

function TodosController(todosService, authFactory){
	console.log("TodosController loading")

	var vm = this
	vm.user = {}
	vm.todo = {}
	vm.create = create
	vm.user = getUser()
	vm.update = update


	function getUser(){
		authFactory.getUser()
		.then(function(response){
			vm.user = response.data
			todosService.index(vm.user._id)
				.then(function(response){
					console.log(response.data)
					vm.todos = response.data
				})			
		})
	}

	function update(todo_id){
		todosService.update(vm.user._id, todo_id)
			.then(function(response){
				console.log(response)
			})
	}

	function create(){

	}


}