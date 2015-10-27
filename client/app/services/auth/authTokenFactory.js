angular.module('authService')

.factory('authTokenFactory', authTokenFactory)
authTokenFactory.$inject = ['$window']

function authTokenFactory($window){

	var authTokenFactory = {}

	// get the token
	authTokenFactory.getToken = function(){
		return $window.localStorage.getItem('token')
	}

	// set the token
	authTokenFactory.setToken = function(token){
		if(token){
			$window.localStorage.setItem('token', token)
		} else {
			$window.localStorage.removeItem('token')
		}
	}

	return authTokenFactory
}