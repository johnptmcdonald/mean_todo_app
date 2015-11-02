angular.module('mean_todo')

.controller('AuthController', AuthController)

AuthController.$inject = ['$state', '$rootScope', 'authFactory']

function AuthController($state, $rootScope, authFactory){
	var vm = this;

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

		if(vm.loggedIn){
			vm.getUser()	
		}
		vm.error = null
	});	

	function logout(){
		vm.user = {}
		authFactory.logout();
		$state.go('loggedOut')
		
	}

	function getUser(){
		authFactory.getUser()
		.then(function(response){
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

			if(response.data.success){
				$state.go("home")
			} else {
				vm.error = response.data.message
			}
		})
	}	


}