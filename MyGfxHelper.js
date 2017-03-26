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
        var a = angle;
        a = angle * Math.PI / 180;
        var x2 = x1 + length * Math.cos(a);
        var y2 = y1 + length * Math.sin(a);
        drawLine(ctx, x1, y1, x2, y2);

        return {x: x2, y: y2, angle: angle, length: length};
    };

    var getLineEnd = function (x, y, length, angle) {
        var a = angle * Math.PI / 180;
        var x2 = x + length * Math.cos(a);
        var y2 = y + length * Math.sin(a);
        return {x: x2, y: y2};
    };

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

    // PUBLIC METHODS
    this.public_method = function () {

    }

    return GE = {
        drawLine: drawLine,
        drawLineLength: drawLineLength,
        getLineEnd: getLineEnd,
        MTH: {
            rand: rand,
            randf: randf,
            randomInt: randomInt,
            randomFloat: randomFloat
        }
    };
}());
