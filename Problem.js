/* 
 * This class creates a problem and also has the function 
 * to check the answers and make the equation.
 */

var Problem = function(blocks, selectedBlocks){
	this.blocks = blocks;	// Refrence to all of the blocks
	this.selectedBlocks = selectedBlocks; // Refrence to all of the selected blocks
	this.problem;	// Holds the problem(question)
	//this.random = new Randomizer(4);

	// Calculates the value of the passed in blocks considering their signs
	var calculateBlocks = function(chosenBlocks){
		var sum = 0.0;
		var sign;
		var value;

		for(var i = 0; i < chosenBlocks.length; ++i){
			sign = signs[chosenBlocks[i].sign];
			value = chosenBlocks[i].value;
			switch(sign) {
				case '+':
					sum += value;
					break;
				case '-':
					sum -= value;
					break;
				case '*':
					sum /= value;
					break;
				case '/':
					sum *= value;
					break;
			}
		}
		return sum;
	};

	// Checks to see if the selected blocks is the correct answer
	Problem.prototype.checkAnswer = function(){
		return (this.problem === calculateBlocks(this.selectedBlocks));
	};

	// Creates a new problem(question)
	Problem.prototype.createProblem = function(){
	    var minNumBlocks;
	    var chosenBlocks = new Array();
	    var randomCol;
	    var randomRow;
	    
	    minNumBlocks = 2 ;//+ myRandom(questionWeight);
	    //console.log("question:");
	    // Select random number of blocks (weighted randomness for different difficulties)
	    for(var i = 0; i < minNumBlocks; ++i){	 
	    	randomCol = Math.round(Math.random()*(this.blocks.length-1));
	    	randomRow = Math.round(Math.random()*(this.blocks[randomCol].length-1));
	    	//console.log("	blocks[" + randomCol + "][" + randomRow + "]");
	    	chosenBlocks.push(this.blocks[randomCol][randomRow]); 
		}
		// Calculate value of chosen blocks (a new problem)
	    this.problem = calculateBlocks(chosenBlocks);
	};

	// Returns the problem
	Problem.prototype.getProblem = function(){
		return this.problem;
	};

	// Returns what equation they player have as a string
	Problem.prototype.helper = function(){		
		var sign;
		var value;
		var answerBar = '';
		var helper = [];

		// Go though the selected blocks
		for (var i = 0; i < this.selectedBlocks.length; ++i){
			sign = signs[this.selectedBlocks[i].sign];
			value = this.selectedBlocks[i].value;

			if(i === 0){
				// If there there is no number before divistion or multipication put a 0 behind the sign
				if(sign === '/' || sign === '*')	
					helper.push(0);
				// If the sign is not plus put it behind the value
				if(sign === '-')			
					helper.push(sign);
				helper.push(value);
			}
			else{
				// If the sign is * or / put everything before it in the parenthesis
				if((sign === '/' || sign === '*') && helper.length > 2){  
					helper.push(')');
					helper.unshift('(');
				}
				helper.push(sign);
				helper.push(value);
			}
		}

		// Convert the array to a string
		for(var j in helper) {				
			answerBar += " " + helper[j];
		}
		return answerBar;
	};
};