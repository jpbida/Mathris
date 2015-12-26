/* 
 * This class is a weighted randomizer class.
 */

var Randomizer = function(range, coefficient = 2, fixed = false){
	var range = range;
	var coefficient = coefficient;
	var fixed = fixed;
	var weights; 

	///////////////////////////////////////////////////////////////////////////
	//						     	 Utilities								 //
	///////////////////////////////////////////////////////////////////////////

	// Initializes the weight of every block
	var initWeight = function(){
		weights = new Array(range);
	    for(var i = 0; i < range; ++i)
	        weights[i] = 1;
	};

	if(!fixed)
		initWeight();
	
	// Updates the weight of random numbers
	var updateWeight = function(lastRandNum){
	    weights[lastRandNum] = 1;
	    for(var i = 0; i < range; ++i){
	        if(i != lastRandNum)
	        	weights[i] *= coefficient;
	    }
	};
	
	// Changes the weight of the randomizer
	this.setWeight = function(_weights, _fixed = true){
		if(_weights.length === range){
			weights = _weights;
			fixed = _fixed;
		}
		else {
			console.log("Wrong number of weights!");
		}
	};

	// Changes the coefficient of the randomizer
	this.setCoefficient = function(_coefficient){
		coefficient = _coefficient;
	};

	///////////////////////////////////////////////////////////////////////////
	//						    	 Random Value							 //
	///////////////////////////////////////////////////////////////////////////

	// Returns a random number using the weights
	this.value = function(){
		var randNum;
	    var weightSum = 0; 
	    var num = range-1;
	    
	    for(var i = 0; i < range; ++i)
	        weightSum += weights[i];
	    
	    randNum = Math.round(Math.random()*weightSum);
	   
	    while((randNum -= weights[num]) > 0)
	        --num;               

	    if (!fixed)
	    	updateWeight(num);

	    return num;
	};
};
