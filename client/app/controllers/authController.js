angular.module('mean_todo')

.controller('AuthController', AuthController)

AuthController.$inject = ['$state', '$rootScope', 'authFactory']

function AuthController($state, $rootScope, authFactory){
	var vm = this;
	console.log('AuthController loading')
	vm.test = "hello"
	var vm = this
	vm.user = {}
	vm.loggedIn = null
	vm.signup = signup
	vm.login = login
	vm.logout = logout
	vm.getUser = getUser
	vm.error = null

	$rootScope.$on('$stateChangeStart', function() {
		vm.loggedIn = authFactory.isLoggedIn();	
		vm.getUser()
		vm.error = null
	});	

	function logout(){
		$state.go('loggedOut')
		authFactory.logout();
	}

	function getUser(){
		authFactory.getUser()
		.then(function(response){
			console.log("getting user")
			console.log(response)
			vm.user = response.data
		})
	}

	function signup(){
		authFactory.signup(vm.user.username, vm.user.password)
		.then(function(response){
			if(response.data.success){
				vm.login()
			} else {
				vm.error = response.data.message
			}
		})
	}

	function login(){
		authFactory.login(vm.user.username, vm.user.password)
		.then(function(response){
			console.log(response)
			if(response.data.success){
				$state.go("home")
			} else {
				vm.error = response.data.message
			}
		})
	}	


}