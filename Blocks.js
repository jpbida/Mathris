/* 
 * This class has the basic functions to create blocks.
 */
var Block = function(column, value, sign){

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

	var collision = function(objs){
		if(objs != undefined){
			if((this.y + resources.xyDim.block.height) === objs.y){
				this.speed = 0;
				return true;
			}
		}
		this.speed = resources.speed;
		return false;
	};

	var onCollision = function(collision){
		if(collision){
			this.speed = 0;
			return true;
		}
		this.speed = resources.speed;
		return false;
	};

	Block.prototype.select = function(){
		this.selected = !this.selected;
		if(this.selected){
			this.color = resources.colors.selectedBlock;
		} else {
			this.color = resources.colors.deselectedBlock;
		}
	}

	Block.prototype.update = function(objs){
		if(this.alive){
			collision.call(this, objs);
			if(this.y !== (resources.xyDim.field.y + resources.xyDim.field.height) - resources.xyDim.block.height){
				this.y += this.speed;
			}
		}
	};
};


var BlockPool = function(){
	this.deadBlocks = new Array();

	BlockPool.prototype.getBlock = function(column, value, sign){
		var retBlock;

		if(this.deadBlocks.length === 0){
			retBlock = new Block(column, value, sign);
		}
		else {
			retBlock = this.deadBlocks[this.deadBlocks.length-1];
			this.deadBlocks.pop();
			retBlock.setBlock(column, value, sign);
		}
		return retBlock;
	};

	BlockPool.prototype.add = function(obj){
		obj.alive = false;
		this.deadBlocks.push(obj);
	};
};


var BlockManager = function(){	
	var pool = new BlockPool();
	var randomColumn = new Randomizer(resources.numberOfBlocks.column, 5);

	this.spawnRandBlock = function(value, sign){
		return pool.getBlock(randomColumn.value(), value, sign);
	};
	
	this.spawnAt = function(column, row, value, sign){
		var b = pool.getBlock(column, value, sign);
		b.y = (resources.xyDim.field.y + resources.xyDim.field.height) 
						- (resources.xyDim.block.height * (row+1));
		return b;
	};

	this.returnToPool = function(block){
		pool.add(block);
	};
};

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

var killBlock = function(context, image){
	context.fillStyle = resources.colors.background;
	context.fillRect(this.x, this.y, resources.xyDim.block.width, resources.xyDim.block.height);
	context.drawImage(image, this.x, this.y, this.width, this.height);
	this.alive = false;
};
		