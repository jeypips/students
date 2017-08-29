angular.module('maintenance-module',['bootstrap-modal']).factory('manage', function($compile,$timeout,$http,bootstrapModal) {
	
	function manage() {
		
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

			scope.sectors = {};
			scope.sectors.sector_id = 0;

			scope.sectors = []; // list

		};

		function validate(scope) {
			
			var controls = scope.formHolder.sectors.$$controls;
			
			angular.forEach(controls,function(elem,i) {
				
				if (elem.$$attr.$attr.required) elem.$touched = elem.$invalid;
									
			});
			return scope.formHolder.sectors.$invalid;
			
		};
		

		self.sector = function(scope,row) {			
		
			scope.sectors = {};
			scope.sectors.sector_id = 0;

			$('#x_content').html(loading);
			$('#x_content').load('forms/sector.html',function() {
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
				
				if (scope.$sector_id > 2) scope = scope.$parent;				
				$http({
				  method: 'POST',
				  url: 'handlers/sector-view.php',
				  data: {sector_id: row.sector_id}
				}).then(function mySucces(response) {
					
					angular.copy(response.data, scope.sectors);
					
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
			  url: 'handlers/sector-save.php',
			  data: {sectors: scope.sectors}
			}).then(function mySucces(response) {
				
				if (scope.sectors.sector_id == 0) scope.sectors.sector_id = response.data;
	
				
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
			  url: 'handlers/sector-delete.php',
			  data: {sector_id: [row.sector_id]}
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
			
			scope.sector = {};
			scope.sector.sector_id = 0;			
			$http({
			  method: 'POST',
			  url: 'handlers/sector-list.php',
			}).then(function mySucces(response) {
				
				scope.sectors = response.data;
				
			}, function myError(response) {
				 
			  // error
				
			});
			//

			$('#x_content').html(loading);
			$('#x_content').load('lists/maintenance.html', function() {
				$timeout(function() { $compile($('#x_content')[0])(scope); },100);								
				// instantiate datable
				$timeout(function() {
					$('#maintenance').DataTable({
						"ordering": false
					});	
				},200);
				
			});
		};
	};
	
	return new manage();
	
});