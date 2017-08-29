var app = angular.module('login',['login-module']);

app.controller('loginCtrl',function($scope,loginService) {
	
	$scope.views = {};
	$scope.account = {account_username: '',account_password: ''};
	
	$scope.login = loginService.login;

});