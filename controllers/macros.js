var app = angular.module('macros',['toggle-fullscreen','account-module','macros-module']);

app.controller('macrosCtrl',function($scope,fullscreen,form) {
	
	$scope.formHolder = {};
	$scope.views = {};

	form.data($scope);
	form.list($scope);
	
	$scope.form = form;

});