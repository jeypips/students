angular.module('students-module',['bootstrap-modal']).factory('form', function($compile,$timeout,$http,bootstrapModal) {
	
	function form() {
		
		var self = this;
		
		var loading = '<div class="col-sm-offset-4 col-sm-8"><button type="button" class="btn btn-inverse" title="Loading" disabled><i class="fa fa-spin fa-refresh"></i>&nbsp; Please wait...</button></div>';
		
		self.data = function(scope) { // initialize data	
		
			scope.controls = {
				ok: {
					btn: false,
					label: 'Save'
				},
				cancel: {
					btn: false,
					label: 'Cancel'
				},
			};			

			scope.student_info = {};
			scope.student_info.student_id = 0;

			scope.student_infos = []; // list

		};

		function validate(scope) {
			
			var controls = scope.formHolder.student_info.$$controls;
			
			angular.forEach(controls,function(elem,i) {
				
				if (elem.$$attr.$attr.required) elem.$touched = elem.$invalid;
									
			});
			return scope.formHolder.student_info.$invalid;
			
		};
		
		self.student = function(scope,row) {			
		
			scope.student_info = {};
			scope.student_info.student_id = 0;

			$('#x_content').html(loading);
			$('#x_content').load('forms/student.html',function() {
				$timeout(function() { $compile($('#x_content')[0])(scope); },200);
			});
			
			scope.controls.ok.label = 'Save';
			scope.controls.ok.btn = false;
			scope.controls.cancel.label = 'Cancel';
			scope.controls.cancel.btn = false;
			
			if (row != null) {		
				
				scope.controls.ok.label = 'Update';
				scope.controls.ok.btn = true;
				scope.controls.cancel.label = 'Close';
				scope.controls.cancel.btn = false;
				
				if (scope.$id > 2) scope = scope.$parent;				
				$http({
				  method: 'POST',
				  url: 'handlers/student-view.php',
				  data: {student_id: row.student_id}
				}).then(function mySucces(response) {
					
					angular.copy(response.data, scope.student_info);
					
				}, function myError(response) {
					 
				  // error
					
				});					
			};
			
		};
		
		
		self.edit = function(scope) {
			
			scope.controls.ok.btn = !scope.controls.ok.btn;
			
		};
		
		self.save = function(scope) {
			
			if (validate(scope)) return;
			
			$http({
			  method: 'POST',
			  url: 'handlers/student-save.php',
			  data: {student_info: scope.student_info}
			}).then(function mySucces(response) {					
				
				if (scope.student_info.student_id == 0) scope.student_info.student_id = response.data;
				
				$timeout(function() { self.list(scope); },200);
				
			}, function myError(response) {
				 
			  // error
				
			});			
			
		};		
		
		self.delete = function(scope,row) {
			
		var onOk = function() {
			
			if (scope.$id > 2) scope = scope.$parent;			
			
			$http({
			  method: 'POST',
			  url: 'handlers/student-delete.php',
			  data: {student_id: [row.student_id]}
			}).then(function mySucces(response) {

				self.list(scope);
				
			}, function myError(response) {
				 
			  // error
				
			});

		};

		bootstrapModal.confirm(scope,'Confirmation','Are you sure you want to delete this record?',onOk,function() {});
			
		};		
		
		
		self.list = function(scope) {
			
			// load list
			
			scope.student_info = {};
			scope.student_info.student_id = 0;			
			$http({
			  method: 'POST',
			  url: 'handlers/student-list.php',
			}).then(function mySucces(response) {
				
				scope.student_infos = response.data;
				
			}, function myError(response) {
				 
			  // error
				
			});
			//

			$('#x_content').html(loading);
			$('#x_content').load('lists/student.html', function() {
				$timeout(function() { $compile($('#x_content')[0])(scope); },100);								
				// instantiate datable
				$timeout(function() {
					$('#student').DataTable({
						"ordering": false
					});	
				},200);
				
			});
		};
	};
	
	return new form();
	
});