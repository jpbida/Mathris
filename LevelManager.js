/*
 * This class is for managing the hardness of the game as 
 * player goes higher levels.
 */

var LevelManager = function(){
	this.level = 1;
	this.signWeight = [50, 25, 15, 10];
	this.valueSign = new Value_Sign(6, this.signWeight);

	// Set the signWeight which depends on the level
	var setSignWeight = function(level){
		this.signWeight[0] = 50 + (level-1) * 2;
		this.signWeight[1] = 25 + (level-1) * 2;
		this.signWeight[2] = 15 + (level-1) * 4;
		this.signWeight[3] = 10 + (level-1) * 3;
	};

	// Sets the weight of the sign
	LevelManager.prototype.setLevel = function(level){
		// setting the range of the random values
		this.valueSign.setValueRange(6 + (level - 1) * 3);
		setSignWeight(level);
		this.valueSign.setSignWeight(this.signWeight);
		this.level = level;
	};

	LevelManager.prototype.setScore = function(score){
		var level = 1 + (score / 50);
		if(this.level < level)
			LevelManager.prototype.setLevel(level);
	};

	// Get a random value
	LevelManager.prototype.getValue = function(){
		return this.valueSign.getValue();
	};

	// Get a random sign
	LevelManager.prototype.getSign = function(){
		return this.valueSign.getSign();
	};
};