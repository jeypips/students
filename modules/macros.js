angular.module('macros-module',['bootstrap-modal']).factory('form', function($compile,$timeout,$http,bootstrapModal) {
	
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
				add: {
					btn: false,
					label: 'Add'
				},
			};

			scope.macros = {};
			scope.macros.macros_id = 0;

			scope.macros = []; // list
	
			scope.sector_filters = [];
			scope.sector_parameter = {};
			scope.sector_parameters = [];

			scope.views.subMenu = 0;

		};

		function validate(scope) {
			
			var controls = scope.formHolder.macros.$$controls;
			
			angular.forEach(controls,function(elem,i) {
				
				if (elem.$$attr.$attr.required) elem.$touched = elem.$invalid;
									
			});

			return scope.formHolder.macros.$invalid;
			
		};			
		

		self.physical = function(scope,row) {			
			
			scope.controls.add.label = 'List';	// changed value
			scope.controls.add.btn = true;
			
			scope.macros = {};
			scope.macros.macros_id = 0;

			$('#x_content').html(loading);
			$('#x_content').load('forms/physical.html',function() {
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

				if (scope.$macros_id> 2) scope = scope.$parent;				

				$http({
				  method: 'POST',
				  url: 'handlers/physical-view.php',
				  data: {macros_id: row.macros_id}
				}).then(function mySucces(response) {
					
					angular.copy(response.data, scope.macros);
					
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
			  url: 'handlers/physical-save.php',
			  data: {macros: scope.macros}
			}).then(function mySucces(response) {
				
				if (scope.macros.macros_id == 0) scope.macros.macros_id = response.data;

				
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
			  url: 'handlers/physical-delete.php',
			  data: {macros_id: [row.macros_id]}
			}).then(function mySucces(response) {

				self.list(scope);
				
			}, function myError(response) {
				 
			  // error
				
			});

		};

		bootstrapModal.confirm(scope,'Confirmation','Are you sure you want to delete this record?',onOk,function() {});
			
		};
		
		function filter(scope) {
	
			$http({
			  method: 'POST',
			  url: 'handlers/sector-filter-list.php',
			}).then(function mySucces(response) {
				
				angular.copy(response.data, scope.sector_filters);
				
			}, function myError(response) {
				 
			  // error
				
			});		
			
		};
		
		self.filter_sector_parameters = function(scope,sector_id) {

			$http({
			  method: 'POST',
			  url: 'handlers/sector-parameters.php',
			  data: {sector_id: sector_id}
			}).then(function mySucces(response) {
				
				angular.copy(response.data, scope.sector_parameters);
				
			}, function myError(response) {
				 
			  // error
				
			});				
			
		};		
		
		/* self.filterGo = function(scope,filter) {				
			
			blockUI.show('Please wait');			
			
			scope.filter.by = filter;
			
			$http({
			  method: 'POST',
			  url: 'handlers/profile-filter.php',
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
			scope.mode = 'list';
			scope.macro = {};
			scope.macro.macros_id = 0;			
			$http({
			  method: 'POST',
			  url: 'handlers/physical-list.php',
			}).then(function mySucces(response) {
				
				scope.macros = response.data;
				
			}, function myError(response) {
				 
			  // error
				
			});
			//

			$('#x_content').html(loading);
			$('#x_content').load('lists/physical.html', function() {
				$timeout(function() { $compile($('#x_content')[0])(scope); },100);								
				// instantiate datable
				$timeout(function() {
					$('#physical').DataTable({
						"ordering": false
					});	
				},200);
				
			});

			filter(scope);
			self.filter_sector_parameters(scope,0);			
			
		};
		
		self.subMenu = function(scope) {			
				
			var off = '0px';
			var on = '240px';
			
			var tog = (scope.views.subMenu == 0)?on:off;
			scope.views.subMenu = (scope.views.subMenu == 0)?240:0;

			$("#sub-menu").animate({right: tog}, "fast");
			
		};
		
	};
	
	return new form();
	
});