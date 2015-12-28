/* 
 * This class creates a problem and also has the function 
 * to check the answers and make the equation.
 */

var Problem = function(blocks, selectedBlocks){
	this.blocks = blocks;	// Refrence to all of the blocks
	this.selectedBlocks = selectedBlocks; // Refrence to all of the selected blocks
	this.problem;	// Holds the problem(question)
	this.random = new Randomizer(3);
	// This weight is for weighted randomness of how many blocks to add up for coming up with a problem  	
	this.random.setWeight([90, 60, 10]);

	// Changes the weight of the randomness (for making it harder for higher levels)
	var changeWeight = function(weight){
		this.random.setWeight(weight);
	};

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
					sum *= value;
					break;
				case '/':
					sum /= value;
					break;
			}
		}
		return sum;
	};

	// Checks to see if the block was already chosen (has to be called)
	var isDuplicate = function(colRow){
		for(var index in this.prevColRows){
			if(this.prevColRows[index].randomCol === colRow.randomCol){
				if(this.prevColRows[index].randomRow === colRow.randomRow)
					return true;
			}
		}
		this.prevColRows.push(colRow);
		return false;
	};

	// Checks to see if / or * has been selected because if it is the first move 0 / 2 = 0
	var isValidFirstChosen = function(block){
		if(block.sign === 2)
			return false;
		if(block.sign === 3)
			return false;
		return true;
	};

	// Checks to see if the selected blocks is the correct answer
	Problem.prototype.checkAnswer = function(){
		console.log(calculateBlocks(this.selectedBlocks));
		return (this.problem === calculateBlocks(this.selectedBlocks));
	};

	// Creates a new problem(question)
	Problem.prototype.createProblem = function(){
	    var minNumBlocks;
	    var chosenBlocks;
	    var colRow = {randomCol : undefined, randomRow : undefined};
	    var chosenColRows = new Array();
	    //var randomCol;
	    //var randomRow;
	    
	    minNumBlocks = 2 + this.random.value();
	
	    do{
	        //console.log("question:");
	    	chosenBlocks = [];
	    	//chosenColRows = [];
		    // Select random number of blocks (weighted randomness for different difficulties)
		    for(var i = 0; i < minNumBlocks; ++i){
		    	// making sure that sign of the first block is not multiply or devide and it has not been selected more than once
		    	do{	
		    		//var colRow = {randomCol : undefined, randomRow : undefined};
		    		colRow.randomCol = Math.round(Math.random()*(this.blocks.length-1));
		    		colRow.randomRow = Math.round(Math.random()*(this.blocks[colRow.randomCol].length-1));

		    	}while((i === 0 && !isValidFirstChosen(this.blocks[colRow.randomCol][colRow.randomRow])) );// || isDuplicate.call(chosenColRows, colRow));

		    	//console.log("	blocks[" + colRow.randomCol + "][" + colRow.randomRow + "]");
		    	chosenBlocks.push(this.blocks[colRow.randomCol][colRow.randomRow]); 
			}
			// Calculate value of chosen blocks (a new problem)
		    this.problem = calculateBlocks(chosenBlocks);
		}while(this.problem !== Math.round(this.problem) || this.problem === 0);
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
				if(sign !== '+')			
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