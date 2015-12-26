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
	this.backgroundColor = resources.colors.backgroundColor;
	this.context = context;
	this.mute = false;

	Button.prototype.select = function(){
		if(this.deselectfunc === undefined){
			if(this.sound && !this.mute) this.sound.play();
			this.selectfunc();
			return;
		}
		if(!this.selected){
			if(this.selectfunc()){
				this.pic = this.selectedPic;
				if(this.sound && !this.mute) this.sound.play();
				this.selected = !this.selected;
			}
		} else {
			if(this.deselectfunc()){
				this.pic = this.deselectedPic;
				if(this.sound && !this.mute) this.sound.play();
				this.selected = !this.selected;
			}
		}
	};
		
	Button.prototype.setPictures = function(selectedPic, deselectedPic){
		this.selectedPic = selectedPic;
		this.deselectedPic = deselectedPic;
		if(this.deselectedPic === undefined)
			this.pic = this.selectedPic;
		else
			this.pic = this.deselectedPic;
	};

	Button.prototype.setSound = function(sound){
		this.sound = sound;
	};

	Button.prototype.draw = function(){
		this.context.fillStyle = this.backgroundColor;
		this.context.fillRect(this.x, this.y, this.width, this.height);
		if(this.pic) this.context.drawImage(this.pic, this.x, this.y, this.width, this.height);
	};

	Button.prototype.resetState = function(){
		this.selected = false;
	};

	Button.prototype.toggleMute = function(){
		this.mute = !this.mute;
	};
};