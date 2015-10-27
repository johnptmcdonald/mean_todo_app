angular.module('authService')


.factory('authInterceptorFactory', authInterceptorFactory)
authInterceptorFactory.$inject = ['$q', '$location', 'authTokenFactory']
function authInterceptorFactory($q, $location, authTokenFactory){

	var authInterceptorFactory = {}
	// attach the token to every request
	authInterceptorFactory.request = function(config){
		var token = authTokenFactory.getToken()
		if(token){
			config.headers['x-access-token'] = token;
		}
		return config
	}

	authInterceptorFactory.responseError = function(response){
		if(response.status == 403){
			$location.path('/login')
		}
		return $q.reject(response)
	}

	// redirect if the token doesn't authenticate

	return authInterceptorFactory
}
