/*
 * This class holds the weight for the signs and range of the values
 */
 
var Value_Sign = function(valueRange, signWeight){
	//this.valueWeight = [];
	this.randomValue = new Randomizer(valueRange, 1);
	//this.randomValue.setWeight(this.valueWeight);
	//this.signWeight = [50, 25, 15, 10];
	this.randomSign = new Randomizer(4, 1);
	this.randomSign.setWeight(signWeight);

	// Set randomSign weight
	Value_Sign.prototype.setSignWeight = function(weight){
		//this.signWeight = weight;
		this.randomSign.setWeight(weight);
	};

	// Get a random sign
	Value_Sign.prototype.getSign = function(){
		return this.randomSign.value();
	};

	// Set range of values
	Value_Sign.prototype.setValueRange = function(range){
		this.randomValue.setRange(range);
	};

	// Adds to the range of the value
	Value_Sign.prototype.addToValueRange = function(num){
		this.randomValue.setRange(this.randomValue.getRange() + num);
	};

	// Get a random value
	Value_Sign.prototype.getValue = function(){
		return 1 + this.randomValue.value();
	};
};