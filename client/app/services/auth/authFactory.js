angular.module('authService')

.factory('authFactory', authFactory)

authFactory.$inject = ['$http', '$q', 'authTokenFactory']
function authFactory($http, $q, authTokenFactory){

	var authFactory = {}

	authFactory.index = function(){
		return $http.get('http://localhost:8080/api/users')
	}
	// handle login
	authFactory.login = function(username, password){
		return $http.post('http://localhost:8080/api/sessions', {
			username: username,
			password: password
		}).then(function(response){
			authTokenFactory.setToken(response.data.token)
			return response
		})
	}

	authFactory.signup = function(username, password){
		return $http.post('http://localhost:8080/api/users', {
			username: username,
			password: password
		})
	}

	// handle logout
	authFactory.logout = function(){
		authTokenFactory.setToken()
	}

	// check if a user is logged in
	authFactory.isLoggedIn = function(){
		if(authTokenFactory.getToken()){
			return true
		} else {
			return false
		}
	}

	// get that user's info
	authFactory.getUser = function(){
		if(authTokenFactory.getToken()){
			return $http.get('http://localhost:8080/api/sessions/me')
		} else {
			return $q.reject({message: 'User has no token'})
		}
	}

	return authFactory
}