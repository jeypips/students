angular.module('parameter-module',['bootstrap-modal']).factory('param', function($compile,$timeout,$http,bootstrapModal) {
	
	function param() {
		
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

			scope.parameter = {};
			scope.parameter.parameter_id = 0;

			scope.parameters = []; // list

		};

		function validate(scope) {
			
			var controls = scope.formHolder.parameter.$$controls;
			
			angular.forEach(controls,function(elem,i) {
				
				if (elem.$$attr.$attr.required) elem.$touched = elem.$invalid;
									
			});
			return scope.formHolder.parameter.$invalid;
			
		};
		
		function sectors(scope) {

			$http({
			  method: 'POST',
			  url: 'handlers/sector-form-add.php'
			}).then(function mySucces(response) {					
				
				scope.sectors_add = response.data;
				
			}, function myError(response) {
				 
			  // error
				
			});				
		
		}
		
		self.parameter = function(scope,row) {			
		
			scope.parameter = {};
			scope.parameter.parameter_id = 0;

			$('#parameter-list').html(loading);
			$('#parameter-list').load('forms/parameter.html',function() {
				$timeout(function() { $compile($('#parameter-list')[0])(scope); },200);
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
				
				if (scope.$parameter_id > 2) scope = scope.$parent;				
				$http({
				  method: 'POST',
				  url: 'handlers/parameter-view.php',
				  data: {parameter_id: row.parameter_id}
				}).then(function mySucces(response) {
					
					angular.copy(response.data, scope.parameter);
					
				}, function myError(response) {
					 
				  // error
					
				});					
			};
			
			sectors(scope);
			
		};
		
		
		self.edit = function(scope) {
			
			scope.controls.ok.btn = !scope.controls.ok.btn;
			
		};
		
		self.save = function(scope) {
			
			if (validate(scope)) return;
			
			$http({
			  method: 'POST',
			  url: 'handlers/parameter-save.php',
			  data: scope.parameter
			}).then(function mySucces(response) {					
				
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
			  url: 'handlers/parameter-delete.php',
			  data: {parameter_id: [row.parameter_id]}
			}).then(function mySucces(response) {

				self.list(scope);
				
			}, function myError(response) {
				 
			  // error
				
			});

		};

		bootstrapModal.confirm(scope,'Confirmation','Are you sure you want to delete this record?',onOk,function() {});
			
		};		
		
		/* self.filter = function(scope,filter) {				
					
			scope.filter.by = filter;
			
			$http({
			  method: 'POST',
			  url: 'handlers/filter.php',
			  data: {filter: scope.filter.by}
			}).then(function mySucces(response) {
				
				scope.filter.filters = response.data;
				scope.filter.label = response.data[0];
				self.filterGo(scope);
				
			}, function myError(response) {
				 
			  // error
				
			});				
			
		}; */
		
		
		self.list = function(scope) {
			
			// load list
			
			scope.parameter = {};
			scope.parameter.parameter_id = 0;			
			$http({
			  method: 'POST',
			  url: 'handlers/parameter-list.php',
			}).then(function mySucces(response) {
				
				scope.parameters = response.data;
				
			}, function myError(response) {
				 
			  // error
				
			});
			//

			$('#parameter-list').html(loading);
			$('#parameter-list').load('lists/parameter.html', function() {
				$timeout(function() { $compile($('#parameter-list')[0])(scope); },100);								
				// instantiate datable
				$timeout(function() {
					$('#parameterList').DataTable({
						"ordering": false
					});	
				},200);
				
			});
		};
	};
	
	return new param();
	
});