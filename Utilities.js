var signs = {
	0 : '+',
	1 : '-',
	2 : '*',
	3 : '/'
};

// Checks if the passed x, y are in the given blocked
// This function has to be called (pointInBlock.call(block, x, y))
var pointInBlock = function(x, y) {
	var minX = this.x;
	var maxX = this.x + this.width;
	var minY = this.y;
	var maxY = this.y + this.height;

	if (x >= minX && x <= maxX && y >= minY && y <= maxY) {
		return true;
	}
	return false;
};
