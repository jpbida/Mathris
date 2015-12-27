/* 
 * This class creates a curtain over a region and 
 * it can be opened and closed vertically and horizontally.
 */

var Curtain = function(x, y, width, height, color, time, type, moveForward, context, drawFunc){
	var x = x;
	var y = y;
	var height = height;
	var width = width;
	var color = color;
	var time = time;
	var type = type;
	var barLength;
	var interval = undefined;
	var state = false;
	var moveForward = moveForward; // How much the curtain has to move.
	var image;	// Where the image under the curtain will be saved.
	var context = context;
	var drawFuncBackground = drawFunc;
	
	
	///////////////////////////////////////////////////////////////////////////
	//							Closing	Curtain								 //
	///////////////////////////////////////////////////////////////////////////

	// Closes the curtain by moveForward amount.
  	var _closeHorizontally = function(){
		context.fillStyle = color;
		context.fillRect(x, y, barLength += moveForward, height);
		context.fillRect(x+width, y, -barLength, height);
		if(barLength === width/2){		// The curtain is completely close
			state = true;
			clearInterval(interval);
			interval = undefined;
		}
	}

	// Update function for closing the curtain Horizontally.
	var closeHorizontally = function (){
		interval = setInterval(_closeHorizontally, calculateInterval());
	}

	// Closes the curtain by moveForward amount.
	var _closeVertically = function (){
		context.fillStyle = color;
		context.fillRect(x, y, width, barLength += moveForward);
		context.fillRect(x, y+height, width, -barLength);
		if(barLength === height/2){		// The curtain is completely close
			state = true;
			clearInterval(interval);
			interval = undefined;
		}
	}

	// Update function for closing the curtain Horizontally.
	var closeVertically = function (){
		interval = setInterval(_closeVertically, calculateInterval());
	}

	// Closing Curtain manager.
	this.closeCurtain = function(){
		if(!state && interval === undefined){
			// Saving the image of what is goin to be under the fully closed curtain.
			//image = context.getImageData(x, y, width, height); 
			barLength = 0;
			if(type === 'H'){
				closeHorizontally();
			} else if(type === 'V'){
				closeVertically();
			} 
			return true;
		}
		return false;
	}


	///////////////////////////////////////////////////////////////////////////
	//						     Openning Curtain							 //
	///////////////////////////////////////////////////////////////////////////

	// Opens the curtain by moveForward amount.
	var _openHorizontally = function(){
		// Drawing what was under the curtain before it closed.
		//context.putImageData(image, x, y); 
		if(drawFuncBackground !== undefined) drawFuncBackground(); 
		context.fillStyle = color;
		context.fillRect(x, y, barLength -= moveForward, height);
		context.fillRect(x+width, y, -barLength, height);
		if(barLength === 0){	// The curtain is completely open
			clearInterval(interval);
			interval = undefined;
			state = false;
		}
	}

	// Update function for opening the curtain Horizontally.
	var openHorizontally = function (){
		interval = setInterval(_openHorizontally, calculateInterval());
	}

	// Opens the curtain by moveForward amount.
	var _openVertically = function (){
		// Drawing what was under the curtain before it closed.
		//context.putImageData(image, x, y);	
		if(drawFuncBackground !== undefined) drawFuncBackground(); 
		context.fillStyle = color;
		context.fillRect(x, y, width, barLength -= moveForward);
		context.fillRect(x, y+height, width, -barLength);
		if(barLength === 0){  	// The curtain is completely open
			clearInterval(interval);
			interval = undefined;
			state = false;
		}
	}

	// Update function for opening the curtain vertically.
	var openVertically = function (){
		interval = setInterval(_openVertically, calculateInterval());
	}

	// Openning Curtain manager.
  	this.openCurtain = function (){
  		if(state && interval === undefined){
	  		if(type === 'H'){
	  			barLength = width / 2;
				openHorizontally();
			} else if(type === 'V'){
				barLength = height / 2;
				openVertically();
			}
			return true;
		}
		return false;
	}

	///////////////////////////////////////////////////////////////////////////
	//						     	 Utilities								 //
	///////////////////////////////////////////////////////////////////////////

	// Calculates the interval that the curtain has to updated.
	var calculateInterval = function (){
		if(type === 'H'){
			return Math.ceil((time * 1000) / ((width / 2) / moveForward));
		} else if(type === 'V'){
			return Math.ceil((time * 1000) / ((height / 2) / moveForward));
		}	
	}

	// returns the state of theis curtain(open or close)
	this.getState = function(){
		return state;
	}

	// resets the state of the curtain
	this.resetState = function(){
		state = false;
		clearInterval(interval);
		interval = undefined;
	}
};