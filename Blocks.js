/* 
 * This class has the basic functions to create blocks.
 */
var Block = function(column, value, sign){

	// Basically a constructer for block 
	Block.prototype.setBlock = function(column, value, sign){
		this.column = column;
		this.x = resources.xyDim.field.x + (column * resources.xyDim.block.width);
		this.y = resources.xyDim.field.y - resources.xyDim.block.height;
		this.width = resources.xyDim.block.width;
		this.height = resources.xyDim.block.height;
		this.value = value;
		this.sign = sign;
		this.selected = false;
		this.alive = true;
		this.color = resources.colors.deselectedBlock;
		this.speed = resources.speed;
	};

	this.setBlock(column, value, sign); // Initializing the block

	// checks if this blocks colides with objs
	var collision = function(objs){
		if(objs != undefined){
			if((this.y + resources.xyDim.block.height) === objs.y){
				this.speed = 0;
				return true;
			}
		}
		// if doesnt colide with anything set speed back
		this.speed = resources.speed;
		return false;
	};

	// what to incase of a collision
	var onCollision = function(collision){
		if(collision){
			this.speed = 0;
			return true;
		}
		this.speed = resources.speed;
		return false;
	};

	// if the button was selected
	Block.prototype.select = function(){
		this.selected = !this.selected;
		// change the blocks color
		if(this.selected){
			this.color = resources.colors.selectedBlock;
		} else {
			this.color = resources.colors.deselectedBlock;
		}
	}

	// checks for collision and lowers the block
	Block.prototype.update = function(objs){
		if(this.alive){
			collision.call(this, objs);
			if(this.y !== (resources.xyDim.field.y + resources.xyDim.field.height) - resources.xyDim.block.height){
				this.y += this.speed;
			}
		}
	};
};


// This class manages object pooling
var BlockPool = function(){
	this.deadBlocks = new Array();	// dead blocks get stored here

	// returns a block with the given attributes
	BlockPool.prototype.getBlock = function(column, value, sign){
		var retBlock;

		// allocates a block if the pool is empty
		if(this.deadBlocks.length === 0){
			retBlock = new Block(column, value, sign);
		}
		else {	// returns a block from the pool
			retBlock = this.deadBlocks[this.deadBlocks.length-1];
			this.deadBlocks.pop();
			retBlock.setBlock(column, value, sign);
		}
		return retBlock;
	};

	// adds block to the pool
	BlockPool.prototype.add = function(obj){
		obj.alive = false;
		this.deadBlocks.push(obj);
	};
};

// This spawns a block at given places or place it somewhere at random (weighted randomness)
// so it has a lower chance to come to one column multiple times in a row
var BlockManager = function(){	
	var pool = new BlockPool();
	var randomColumn = new Randomizer(resources.numberOfBlocks.column, 5);

	this.spawnRandBlock = function(value, sign){
		return pool.getBlock(randomColumn.value(), value, sign);
	};
	
	// this function for the start of the game so it spawns blocks at the buttom
	this.spawnAt = function(column, row, value, sign){
		var b = pool.getBlock(column, value, sign);
		b.y = (resources.xyDim.field.y + resources.xyDim.field.height) 
						- (resources.xyDim.block.height * (row+1));
		return b;
	};

	// puts the block to the pool
	this.returnToPool = function(block){
		pool.add(block);
	};
};

// draw function for blocks
var drawBlock = function(context){
	var text;
	context.fillStyle = this.color;
	context.fillRect(this.x, this.y, resources.xyDim.block.width, resources.xyDim.block.height);
	context.strokeStyle = resources.colors.stroke;
	context.strokeRect(this.x, this.y, resources.xyDim.block.width, resources.xyDim.block.height);
	context.fillStyle = resources.colors.num;
    context.font =	resources.fonts.block;
    if(this.sign === 0){ // +
    	text = this.value;
    	context.fillText(text, this.x+15, this.y+28);
    }
    else{
    	text = signs[this.sign] + this.value;
    	context.fillText(text, this.x+10, this.y+28);
    }
};

// draws the puff image on the block that dies
var killBlock = function(context, image){
	context.fillStyle = resources.colors.background;
	context.fillRect(this.x, this.y, resources.xyDim.block.width, resources.xyDim.block.height);
	context.drawImage(image, this.x, this.y, this.width, this.height);
	this.alive = false;
};
		