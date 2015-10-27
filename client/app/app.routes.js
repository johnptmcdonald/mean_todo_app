angular.module('app.routes', ['ui.router'])

.config(mainRouter)

function mainRouter($stateProvider, $urlRouterProvider, $httpProvider){
	$httpProvider.interceptors.push('authInterceptorFactory')

	$urlRouterProvider.otherwise('home');

	$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: 'app/views/templates/home.html'
		})

	$stateProvider
		.state('login', {
			url: '/login',
			templateUrl: 'app/views/templates/login.html'
		})

	$stateProvider
		.state('signup', {
			url: '/signup',
			templateUrl: 'app/views/templates/signup.html'
		})
}