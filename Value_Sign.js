/*
 * This class holds the weight for the signs and range of the values
 */
 
var Value_Sign = function(){
	//this.valueWeight = [];
	this.valueRandom = new Randomizer(6, 1);
	//this.valueRandom.setWeight(this.valueWeight)
	this.signWeight = [50, 25, 15, 10];
	this.randomSign = new Randomizer(4);
	this.randomSign.setWeight(this.signWeight);

	// Sets the weight of the sign
	Value_Sign.prototype.setLevel = function(weight){
		this.signWeight = weight;
	};

	// Set randomSign weight
	Value_Sign.prototype.setSignWeight = function(weight){
		this.signWeight = weight;
		this.randomSign.setWeight(this.signWeight);
	};

	// Get a random sign
	Value_Sign.prototype.getSign = function(){
		return this.randomSign.value();
	};

	// Set range of values
	Value_Sign.prototype.setValueRange = function(range){
		this.valueRandom.setRange(range);
	};

	// Adds to the range of the value
	Value_Sign.prototype.addToValueRange = function(num){
		this.valueRandom.setRange(this.valueRandom.getRange() + num);
	};

	// Get a random value
	Value_Sign.prototype.getValue = function(){
		return this.valueRandom.value();
	};
};