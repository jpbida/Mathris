$(document).ready(function(){
	var canvas = $("#canvas")[0];
	var context = canvas.getContext("2d");	


	///////////////////////////////////////////////////////////////////////////
	//								Initiallizing							 //
	///////////////////////////////////////////////////////////////////////////
	var gameLoop;
	var spawnInterval;
	var blocks;
	var selectedBlocks;
	var BM;
	var problem;
	var pauseFlag;
	var gameOver;
	var sound = true;
	var images = [];

	var buttons = new Array();				// An array that hold buttons
	var hud = new HUD(context, buttons);


	///////////////////////////////////////////////////////////////////////////
	//							Some Needed Functions						 //
	///////////////////////////////////////////////////////////////////////////


	// This function allocates two dimentional array for blocks 
	// first dimention is for columns and the second is for the rows
	var createBlockArray = function(){
		var arr = new Array(resources.numberOfBlocks.column);
		for(var i = 0; i < arr.length; ++i){
			arr[i] = new Array();
		}
		return arr;
	};

	// This function deselects all of the selected blocks
	var deselectAll = function(){
		for(var i in selectedBlocks){
			selectedBlocks[i].select();
		}
		selectedBlocks.splice(0, selectedBlocks.length);
		hud.setHelper("");
	};

	var curtain1 = new Curtain(resources.xyDim.PH_Bar.x, resources.xyDim.PH_Bar.y, resources.xyDim.PH_Bar.width, 
							resources.xyDim.PH_Bar.height, resources.colors.curtain2, 1.5, 'V', 1, context);
	var curtain2 = new Curtain(resources.xyDim.field.x, resources.xyDim.field.y, resources.xyDim.field.width, 
							resources.xyDim.field.height, resources.colors.curtain, 1.5, 'H', 1, context);

	var pause = function(){
		if(!gameOver && curtain1.closeCurtain() && curtain2.closeCurtain()){
 			clearIntervals();
 			pauseFlag = true;
 			return true;
 		}
 		return false;
	};

	var unpause = function(){
		if(curtain1.openCurtain() && curtain2.openCurtain()){
			setTimeout(function(){setIntervals();}, 1600);
			pauseFlag = false;
			return true;
		}
		return false;
	};

	var mute = function(){
		sound = false;
		return true;
	};

	var unmute = function(){
		sound = true;
		return true;
	};
	

	// This button deselects every selected blocks
	buttons.push(new Button(context, 248, 380, 20, 20, deselectAll));
	// This button pauses and unpauses the game
	buttons.push(new Button(context, 271, 380, 20, 20, pause, unpause));
	// This button mute and unmutes the game
	buttons.push(new Button(context, 294, 380, 20, 20, mute, unmute));


	
	// This function clears the intervals
	var clearIntervals = function(){
		// Loop that updates everything
		if(typeof gameLoop !== undefined) clearInterval(gameLoop);
		// Loop that spawns blocksd
		if(typeof spawnInterval != undefined) clearInterval(spawnInterval);
	};

	// This function manages the intervals (gameLoop and spawnInterval)
	var setIntervals = function(GLInv = 15, SPInv = 1000){
		clearIntervals();
		gameLoop = setInterval(function(){drawManager();
										  updateManager();
										  }, GLInv);
		spawnInterval = setInterval(function(){var temp = BM.spawnRandBlock(4, 1);
												blocks[temp.column].push(temp);
												}, SPInv);
	};

	// This function initializes the game
	var initGame = function(){
		gameOver = false;
		curtain1.resetState();
		curtain2.resetState();
		buttons[1].resetState(); // change the state of pause
		pauseFlag = false;
		hud.resetScore();
		hud.resetLevel();

		buttons[0].setPictures(images[1]);

		blocks = createBlockArray();		// Allocating array that holds every blocks
		selectedBlocks = new Array(); 		// An array that holds selected blocks
		BM = new BlockManager();
		problem = new Problem(blocks, selectedBlocks);
		
		for(var i = 0; i < blocks.length; ++i){	// Column
			for(var j = 0; j < resources.initialNumBlocks; ++j){ // Row
				blocks[i].push(BM.spawnAt(i, j, j, 0));
			}
		}
		problem.createProblem(); 				 // Creates a problem(question)
		hud.setPH(problem.getProblem(), "");	 // Passes the problem and the helper to the HUD

		setIntervals();	
	};


	// This button creates a new game
	buttons.push(new Button(context, 248, 410, 66, 40, initGame));


	// This function is a draw manager and calls all draw functions
	var drawManager = function(){
		// Draws the background
		context.fillStyle = resources.colors.background;
		context.fillRect(resources.xyDim.canvas.x, resources.xyDim.canvas.y, 
							resources.xyDim.canvas.width, resources.xyDim.canvas.height);
		// Draws the blocks
		for (index in blocks){
			for (i in blocks[index])
				drawBlock.call(blocks[index][i], context);
		}
		hud.draw(); // Draws the HUD and every button in the HUD
	};

	//checks to see if the game is over
	var endGame = function(){
		// if a column has reached the top
		for (var i in blocks){
			if (blocks[i].length === resources.numberOfBlocks.row){
				// if that block is stationary
				if(blocks[i][resources.numberOfBlocks.row-1].speed === 0)
					return true;
			}
		}
		return false;
	};

	// This function is an update manager and calls all update functions
	var updateManager = function(){
		// Updates the blocks
		for (var i = 0; i < blocks.length; ++i){
			for (var j = 0; j < blocks[i].length; ++j){
				var prev;
				if(j > 0)
					prev = blocks[i][j-1];
				else
					prev = undefined;
				// Passes the object under it, it it exists to check for collision check
				blocks[i][j].update(prev); 
			}
		}
		if(endGame()){
			clearInterval(spawnInterval);
			gameOver = true;
			return;
		}
	};

	var deleteElements = function(){

		// delete the selected block
		for (var i in selectedBlocks){
			for (var j in blocks){
				if(blocks[j].indexOf(selectedBlocks[i]) !== -1){
					// Return it to the object pool to be reused
					BM.returnToPool(selectedBlocks[i]);	
					// Remove it from the blocks array
					blocks[j].splice(blocks[j].indexOf(selectedBlocks[i]), 1); 
				}
			}
		}
		// Remove everything from the selected blocks array
		selectedBlocks.splice(0, selectedBlocks.length);

	};

	// This function calculates the score
	var calculateScore = function(){
		return selectedBlocks.length;
	};

	// What to do if the player got the answer
	var gotTheAnswer = function(){
		if(sound) resources.sounds.puff.play();		 // play the puff sound
		hud.addScore(calculateScore());			 // Add the score
		deleteElements();						 // Remove the selected blocks
		problem.createProblem(); 				 // Creates a problem(question)
		hud.setPH(problem.getProblem(), "");	 // Passes the problem and the helper to the HUD
	};

	// This function is a click handller 
	var handleClicks = function(e){
		var rect = canvas.getBoundingClientRect();
	    var mouseX = e.clientX - rect.left;
	    var mouseY = e.clientY - rect.top;

	    // Check to see what buttons were clicked
		var mouseInHUD = hud.pointInButton(mouseX, mouseY); 
		// if buttons were clicked return
		if(mouseInHUD || pauseFlag || gameOver) return; 
		// Check to see what blocks were clicked
		for(var i = 0; i < blocks.length; ++i){			// Columns
			for(var j = 0; j < blocks[i].length; ++j){  // Rows
				// If this blocked clicked
				if(pointInBlock.call(blocks[i][j], mouseX, mouseY)){
					// Change the selected status
					blocks[i][j].select();	
					// If selected, add to array of selected blocks
					if(blocks[i][j].selected)
						selectedBlocks.push(blocks[i][j]); 
					// if deselected, remove it from the array of selected blocks
					else	
						selectedBlocks.splice(selectedBlocks.indexOf(blocks[i][j]), 1); 
					// Check answer
					if(problem.checkAnswer())
						gotTheAnswer();
					else 
						hud.setHelper(problem.helper()); // Passes the helper to the HUD
				}
			}
		}
	};


	var loadImages = function(sources, startGame) {
		var loadedImages = 0;
		var numImages = 0;
		for (var i in sources) {
			numImages++;
		}
		for (var i in sources) {
			images.push(new Image());
			images[images.length-1].src = sources[i];
			images[images.length-1].onload = function(){
				if (++loadedImages === numImages) {
					startGame();
				}
			};
		}
	};

	///////////////////////////////////////////////////////////////////////////
	//									Main 								 //
	///////////////////////////////////////////////////////////////////////////

	//initGame(); // Initiallizes the game
	// calls initGame after all images have finished loading
    loadImages(resources.images, initGame); 

	document.addEventListener('click', handleClicks);

});