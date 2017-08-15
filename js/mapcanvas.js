/**
 *  All script related to the map object
 *  This should be linked up with some UI script controller
 *  
 *  Copyright Travis Nicholson 2017
 */

function MapCanvas(){
	
	// simple private members
	var local = {
			
	}
	
	// setup function
	local.init = function(){
		
	}
	
	// public alias
	var self = this;
	
	// public members
	self.canvasWrapper = {};
	self.canvas = {};
	
	// Set up the canvas container and make the canvas
	self.canvasWrapper = $("#app-area");
	self.canvas = new fabric.Canvas("map-canvas");
	
	self.canvas.setBackgroundColor('rgb(0, 0, 0)', self.canvas.renderAll.bind(self.canvas));
	self.canvas.setBackgroundImage('../img/maps/CallahansHD.png', self.canvas.renderAll.bind(self.canvas), {
	    backgroundImageStretch: false
	});
	
	// Simply set the canvas size to the size of the wrapper
	self.resizeCanvas = function() {
		self.canvas.setWidth(self.canvasWrapper.width());
		self.canvas.setHeight(self.canvasWrapper.height());
		self.canvas.renderAll();
	}
	
	self.resizeCanvas();
	
	// TODO: Separate the panning logic from the UI events
	self.startPan = function(event) {
		if (event.button != 2) {
			return;
		}
		var x0 = event.screenX,
		y0 = event.screenY;
		function continuePan(event) {
			var x = event.screenX,
			y = event.screenY;
			self.canvas.relativePan({ x: x - x0, y: y - y0 });
			x0 = x;
			y0 = y;
		}
		function stopPan(event) {
			$(window).off('mousemove', continuePan);
			$(window).off('mouseup', stopPan);
		};
		$(window).mousemove(continuePan);
		$(window).mouseup(stopPan);
		$(window).contextmenu(self.cancelMenu);
	};
	self.cancelMenu = function() {
		$(window).off('contextmenu', self.cancelMenu);
		return false;
	}
	$(self.canvasWrapper).mousedown(self.startPan);
	
	// TODO: Put these binds in the UI script, and create Zoom functions.
	
    self.canvasWrapper.bind('mousewheel', function(e){
        if(e.originalEvent.wheelDelta /120 > 0) {
        	self.canvas.setZoom(self.canvas.getZoom() * 1.1);
        }
        else{
        	self.canvas.setZoom(self.canvas.getZoom() * 0.9);
        }
    });
    
    $( window ).resize(function() {
    	self.resizeCanvas();
    });

}

