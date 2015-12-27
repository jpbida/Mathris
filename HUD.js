/* 
 * This class creates a HUD that shows the problem, 
 * the equation bar, level, highscore, and score.
 */

var HUD = function(context, buttons){
	this.level = 1;
	this.score = 0;
	this.highscore = 0;
	this.problem = '';
	this.helper = '';
	this.buttons = buttons;

	// Draws all of the variables above and the buttons
	HUD.prototype.draw = function(){
		// Drawing the sidebar
		context.fillStyle = resources.colors.sidebar;
		context.fillRect(resources.xyDim.sidebar.x, resources.xyDim.sidebar.y, 
							resources.xyDim.sidebar.width, resources.xyDim.sidebar.height);
		// Draw questionBar and helpBar
		context.fillStyle = resources.colors.bar;
		context.fillRect(resources.xyDim.PH_Bar.x, resources.xyDim.PH_Bar.y, 
							resources.xyDim.PH_Bar.width, resources.xyDim.PH_Bar.height);
	    context.strokeStyle = resources.colors.stroke;
	    context.strokeRect(resources.xyDim.PH_Bar.x, resources.xyDim.PH_Bar.y, 
							resources.xyDim.PH_Bar.width, resources.xyDim.PH_Bar.height);
	    // Draw a line between the two bars
	    context.fillStyle = resources.colors.stroke;
	    context.fillRect(resources.xyDim.PH_line.x, resources.xyDim.PH_line.y, 
							resources.xyDim.PH_line.width, resources.xyDim.PH_line.height);
	    // Write question and helper
	    var problem_text = "Problem: " + this.problem;
	    context.font = resources.fonts.writing;
	    context.fillStyle = resources.colors.writing;
	    context.fillText(problem_text, 120, 19);
	    context.fillText(this.helper, 5, 50);
	    // Write level, score, highscore
	    context.fillStyle = resources.colors.text;
	    context.fillText("Level", 263, 90);
	    context.fillText(""+this.level, 279, 115);
	    context.fillText("Score", 262, 142);
	    context.fillText(""+this.score, 279, 167);
	    context.fillText("Highscore", 247, 202);
	    context.fillText(""+this.highscore, 279, 227);
	    // Draw buttons
		for(var index in this.buttons){
			this.buttons[index].draw();
		}
	};

	// Checks if the buttons were pressed
	HUD.prototype.pointInButton = function(mouseX, mouseY){
		for(var index in this.buttons){
			if (pointInBlock.call(this.buttons[index], mouseX, mouseY)){
				this.buttons[index].select();
				//draw the pressed button after it was pressed to show its changed image
				this.buttons[index].draw();
				return true;
			}		
		}
	};

	// Sets the problem and helper
	HUD.prototype.setPH = function(problem, helper){
		this.problem = problem;
		this.helper = helper;
	};

	// Sets the problem
	HUD.prototype.setProblem = function(problem){
		this.problem = problem;
	};

	// Sets the helper
	HUD.prototype.setHelper = function(helper){
		this.helper = helper;
	};

	// Adds one to the level
	HUD.prototype.nextLevel = function(){
		++this.level;
	};

	// Sets the level
	HUD.prototype.setLevel = function(level){
		this.level = level;
	};

	// Adds to the score
	HUD.prototype.setScore = function(score){
		this.score = score;
		if(this.score > this.highscore)
			this.highscore = this.score;
	};

	// Resets the score to 0
	HUD.prototype.resetScore = function(){
		this.score = 0;
	};

	// Resets the level = 1
	HUD.prototype.resetLevel = function(){
		this.level = 1;
	};
};