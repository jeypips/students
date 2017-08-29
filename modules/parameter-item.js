angular.module('parameterItem-module',['bootstrap-modal']).factory('paramItem', function($compile,$timeout,$http,bootstrapModal) {
	
	function paramItem() {
		
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

			scope.parameter_items = {};
			scope.parameter_items.item_id = 0;

			scope.parameter_items = []; // list

		};

		function validate(scope) {
			
			var controls = scope.formHolder.parameter_items.$$controls;
			
			angular.forEach(controls,function(elem,i) {
				
				if (elem.$$attr.$attr.required) elem.$touched = elem.$invalid;
									
			});
			return scope.formHolder.parameter_items.$invalid;
			
		};
		
		
		
			function parameters(scope) {

			$http({
			  method: 'POST',
			  url: 'handlers/parameter-form-add.php'
			}).then(function mySucces(response) {					
				
				scope.parameters_add = response.data;
				
			}, function myError(response) {
				 
			  // error
				
			});				
		
		}

		self.parameter_item = function(scope,row) {			
		
			scope.parameter_items = {};
			scope.parameter_items.item_id = 0;

			$('#parameter-item').html(loading);
			$('#parameter-item').load('forms/parameter-item.html',function() {
				$timeout(function() { $compile($('#parameter-item')[0])(scope); },200);
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
				
				if (scope.$item_id > 2) scope = scope.$parent;				
				$http({
				  method: 'POST',
				  url: 'handlers/parameter-item-view.php',
				  data: {item_id: row.item_id}
				}).then(function mySucces(response) {
					
					angular.copy(response.data, scope.parameter_items);
					
				}, function myError(response) {
					 
				  // error
					
				});					
			};
			
			parameters(scope);
		};
		
		
		self.edit = function(scope) {
			
			scope.controls.ok.btn = !scope.controls.ok.btn;
			
		};
		
		self.save = function(scope) {
			
			if (validate(scope)) return;
			
			$http({
			  method: 'POST',
			  url: 'handlers/parameter-item-save.php',
			  data: {item_id: scope.item_id}
			}).then(function mySucces(response) {
				
				if (scope.parameter_items.item_id == 0) scope.parameter_items.item_id = response.data;
	
				
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
			  url: 'handlers/parameter-item-delete.php',
			  data: {item_id: [row.item_id]}
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
			
			scope.parameter_item = {};
			scope.parameter_item.item_id = 0;			
			$http({
			  method: 'POST',
			  url: 'handlers/parameter-item-list.php',
			}).then(function mySucces(response) {
				
				scope.parameter_items = response.data;
				
			}, function myError(response) {
				 
			  // error
				
			});
			//

			$('#parameter-item').html(loading);
			$('#parameter-item').load('lists/parameter-item.html', function() {
				$timeout(function() { $compile($('#parameter-item')[0])(scope); },100);								
				// instantiate datable
				$timeout(function() {
					$('#parameter-item-list').DataTable({
						"ordering": false
					});	
				},200);
				
			});
		};
	};
	
	return new paramItem();
	
});