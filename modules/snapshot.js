angular.module('snapshot-module',['bootstrap-modal']).factory('snapshot',function($timeout,bootstrapModal) {
	
	function snapshot() {
		
		var self = this;
		
		self.start = function(scope,view) {
			
			self.view = view;
			self.data = null;
			
			var views = {left: 'Left Side View', front: 'Front View', right: 'Right Side View'};
			
			self.width = 260; 
			self.height = 0;
			self.streaming = false;

			self.video = null;
			self.canvas = null;

			self.photo = document.getElementById(view+'_picture');
			
			var onOk = function() {
				
				if (self.data == null) self.data = 'pictures/avatar.png';
				self.photo.setAttribute('src', self.data);
				
			};
			
			bootstrapModal.box(scope,views[view],'forms/take-photo.html',onOk);
			
			$timeout(function() {
				startup();
			},1000);
			
		};
		
		self.take = function(scope) {
			
			takepicture(scope);
			
		};
		
		self.clear = function(scope) {
			
			clearphoto(scope);
			
		};

		self.upload = function(scope) {

			$.ajax({
				type: "POST",
				url: "handlers/upload-photos.php",
				data: {student_id: scope.student_info.student_id, pictures: scope.pictures}
			}).done(function(reponse) {
				
			});
			
		};
		
		  function startup() {
			self.video = document.getElementById('video');
			self.canvas = document.getElementById('canvas');

			navigator.getMedia = ( navigator.getUserMedia ||
								   navigator.webkitGetUserMedia ||
								   navigator.mozGetUserMedia ||
								   navigator.msGetUserMedia);

			navigator.getMedia(
			  {
				video: true,
				audio: false
			  },
			  function(stream) {
				if (navigator.mozGetUserMedia) {
				  self.video.mozSrcObject = stream;
				} else {
				  var vendorURL = window.URL || window.webkitURL;
				  self.video.src = vendorURL.createObjectURL(stream);
				}
				self.video.play();
			  },
			  function(err) {
				console.log("An error occured! " + err);
			  }
			);

			self.video.addEventListener('canplay', function(ev){
			  if (!self.streaming) {
				self.height = self.video.videoHeight / (self.video.videoWidth/self.width);
			  
				// Firefox currently has a bug where the height can't be read from
				// the video, so we will make assumptions if this happens.
			  
				if (isNaN(self.height)) {
				  self.height = self.width / (4/3);
				}
			  
				self.video.setAttribute('width', self.width);
				self.video.setAttribute('height', self.height);
				self.canvas.setAttribute('width', self.width);
				self.canvas.setAttribute('height', self.height);
				self.streaming = true;
			  }
			}, false);
			
			// clearphoto();
		  }

		  // Fill the photo with an indication that none has been
		  // captured.

		  function clearphoto(scope) {
			var context = self.canvas.getContext('2d');
			context.fillStyle = "#fff";
			context.fillRect(0, 0, self.canvas.width, self.canvas.height);

			// self.data = canvas.toDataURL('image/png');
			self.photo.setAttribute('src', 'pictures/avatar.png');
			scope.pictures[scope.view] = null;
		  }
		  
		  // Capture a photo by fetching the current contents of the video
		  // and drawing it into a canvas, then converting that to a PNG
		  // format data URL. By drawing it on an offscreen canvas and then
		  // drawing that to the screen, we can change its size and/or apply
		  // other changes before drawing it.

		  function takepicture(scope) {
			var context = canvas.getContext('2d');

			if (self.width && self.height) {
			  self.canvas.width = self.width;
			  self.canvas.height = self.height;
			  context.scale(-1,1);
			  context.translate(-self.width, 0);
			  context.drawImage(self.video, 0, 0, self.width, self.height);
			
			  self.data = canvas.toDataURL('image/png');
			  scope.pictures[self.view] = self.data;
			} else {
			  clearphoto();
			}
		  }				
		
	};
	
	return new snapshot();
	
});