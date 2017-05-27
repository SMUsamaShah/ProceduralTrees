// Author: SMUsamaShah
// Date: 26-03-2017
// Description: A set of methods to help HTML5 2D canvas drawing.

window.GE = (function () {
	var drawLine = function (ctx, x1, y1, x2, y2) {
		ctx.beginPath();
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);
		ctx.stroke();
	};

	var drawLineLength = function (ctx, x1, y1, length, angle) {
		var a = angle * Math.PI / 180;
		var x2 = x1 + length * Math.cos(a);
		var y2 = y1 + length * Math.sin(a);
		drawLine(ctx, x1, y1, x2, y2);

		return {x: x2, y: y2, angle: angle, length: length};
	};

	var _drawCircle = function(context, x, y, r, props){
		context.beginPath();
		context.arc(x, y, r, 0, 2 * Math.PI, false);
		context.fillStyle = props.color;
		context.fill();
		//context.lineWidth = 5;
		//context.strokeStyle = '#003300';
		//context.stroke();
	};

	var _drawSquare = function(context, pos, size){
		context.fillRect(pos.x, pos.y, size, size);
	};

	var getLineEnd = function (x, y, length, angle) {
		var a = angle * Math.PI / 180;
		var x2 = x + length * Math.cos(a);
		var y2 = y + length * Math.sin(a);
		return {x: x2, y: y2};
	};

	var _getMousePos = function(canvas, evt) {
		var rect = canvas.getBoundingClientRect();
		return {
  			x: evt.clientX - rect.left,
			y: evt.clientY - rect.top
		};
	};

	var _drawText = function(context, message) {
		//context.clearRect(0, 0, canvas.width, canvas.height);
		context.font = '18pt Calibri';
		context.fillStyle = 'black';
		context.fillText(message, 10, 25);
	}

	// ********************** Math functions **************************//

	// random seed http://stackoverflow.com/a/23304189/342095 
	var randomInt = function (seed) {
		return function (min, max) {
			seed = Math.sin(seed) * 10000;
			return Math.floor(min + (seed - Math.floor(seed)) * (max - min + 1));
		};
	};

	var randomFloat = function (seed) {
		return function (min, max) {
			seed = Math.sin(seed) * 10000;
			return min + (seed - Math.floor(seed)) * (max - min + 1);
		};
	};

	var rand = function (min, max) {
		if (max-min === 0) return max;
		return Math.floor(min + Math.random() * (max - min + 1));
	};

	var randf = function (min, max) {
		if (max-min === 0) return max;
		return min + Math.random() * (max - min + 1);
	};

	var _dist2 = function (v1, v2) {
		return Math.sqrt(Math.pow(v1, 2) + Math.pow(v2, 2));
	};

	var _dist = function (obj1, obj2) {
		return Math.sqrt(Math.pow(obj2.x-obj1.x, 2) + Math.pow(obj2.y-obj1.y, 2));
	};

	// PUBLIC METHODS
	this.public_method = function () {

	}

	return GE = {
		drawLine: drawLine,
		drawLineLength: drawLineLength,
		drawCircle: _drawCircle,
		drawText: _drawText,
		drawSquare: _drawSquare,
		getLineEnd: getLineEnd,
		getMousePos: _getMousePos,
		MTH: {
			rand: rand,
			randf: randf,
			randomInt: randomInt,
			randomFloat: randomFloat,
			dist: _dist,
			dist2: _dist2
		}
	};
}());
