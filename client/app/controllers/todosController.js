angular.module('mean_todo')

.controller('TodosController', TodosController)

function TodosController(){
	console.log("TodosController loading")

	var vm = this
	vm.todo = {}
	vm.create = create
	vm.index = index

	function index(){

	}

	function create(){

	}


}