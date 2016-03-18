/*
 * This class is for making a button. each button dose 
 * task by passing it a one or two functions.
 */

var Button = function(context, x, y, width, height, selectfunc, deselectfunc){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.selected = false;
	this.selectedPic;
	this.deselectedPic;
	this.pic;
	this.sound;
	this.selectfunc = selectfunc;
	this.deselectfunc = deselectfunc;
	this.backgroundColor = resources.colors.button;
	this.context = context;
	this.mute = false;

	// This function manages the button presses 
	Button.prototype.select = function(){
		// If the button only does one thing (not a switch)
		if(this.deselectfunc === undefined){
			// If the button does its job successfully
			if(this.selectfunc()){
				if(this.sound && !this.mute) this.sound.play();
			}
			return;
		}
		// If the button is a switch
		if(!this.selected){
			// If the button does its job successfully
			if(this.selectfunc()){
				this.pic = this.selectedPic;
				if(this.sound && !this.mute) this.sound.play();
				this.selected = !this.selected;
			}
		} else {
			// If the button does its job successfully
			if(this.deselectfunc()){
				this.pic = this.deselectedPic;
				if(this.sound && !this.mute) this.sound.play();
				this.selected = !this.selected;
			}
		}
	};
		
	// This function is the setter for pictures of the button
	Button.prototype.setPictures = function(selectedPic, deselectedPic){
		this.selectedPic = selectedPic;
		this.deselectedPic = deselectedPic;
		// If the button is not a switch
		if(this.deselectedPic === undefined)
			this.pic = this.selectedPic;
		else
			this.pic = this.deselectedPic;
	};

	// This function is the setter for the sound that the button makes
	Button.prototype.setSound = function(sound){
		this.sound = sound;
	};

	// Draw function for the button
	Button.prototype.draw = function(){
		this.context.fillStyle = this.backgroundColor;
		this.context.fillRect(this.x, this.y, this.width, this.height);
		if(this.pic) this.context.drawImage(this.pic, this.x, this.y, this.width, this.height);
	};

	// resets the button
	Button.prototype.resetState = function(){
		this.selected = false;
		this.pic = this.deselectedPic;
	};

	// Toggles the button mute and unmute
	Button.prototype.toggleMute = function(){
		this.mute = !this.mute;
	};
};