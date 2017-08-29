var app = angular.module('login',['login-module']);

app.controller('loginCtrl',function($scope,loginService) {
	
	$scope.views = {};
	$scope.account = {student_username: '',student_password: ''};
	
	$scope.login = loginService.login;

});