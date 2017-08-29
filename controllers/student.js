var app = angular.module('students',['toggle-fullscreen','account-module','students-module']);

app.controller('studentsCtrl',function($scope,fullscreen,form) {
	
	$scope.formHolder = {};
	$scope.views = {};

	form.data($scope);
	form.list($scope);
	
	$scope.form = form;

});