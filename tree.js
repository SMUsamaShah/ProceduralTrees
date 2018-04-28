var ProceduralTree = function(){	
	var WIDTH;
	var HEIGHT;
	var canvas;
	var ctx;
	var MTH = GE.MTH;
	var datgui;

	this.initCanvas = function (element, width, height) {
		HEIGHT = height;
		WIDTH  = width;
		canvas = document.getElementById("cvs");
		canvas.setAttribute("width", WIDTH);
		canvas.setAttribute("height", HEIGHT);
		ctx = canvas.getContext("2d");
	}

	var color = {
		brown: 'rgba(130,90,30,1.0)',
		black: 'rgba(60,60,60,0.95)',
		greenLight: 'rgba(10,220,20,1.0)',
		greenDark: 'rgba(77,168,59,1.0)',
		orange: 'rgba(250,129,5,1.0)',
		red: 'rgba(250,29,5,1.0)',
	};

	var draw = function (treeParams) {
		ctx.clearRect(0,0,WIDTH, HEIGHT);

		MTH.rand = MTH.randomInt(treeParams.seed);
		MTH.randf = MTH.randomFloat(treeParams.seed);

		// tree properties
		var pos = treeParams.pos; // draw tree on these coords
		// var trunkWidth = treeParams.trunkWidth;
		var trunkLength = treeParams.trunkLength;
		var angleSpread = treeParams.angleSpread;
		var angleVar = treeParams.angleVar; // variation in angle
		var branchDepthMax = treeParams.branchDepthMax;
		var branchColor = treeParams.branchColor;
		var branchLengthMin = treeParams.branchLengthMin;
		var branchLengthLast = treeParams.branchLengthLast;
		var branchWidthMax = treeParams.branchWidthMax;
		var branchRatioSides = treeParams.branchRatioSides;
		var branchRatioMiddle = treeParams.branchRatioMiddle;
		var branchSplitsMin = treeParams.branchSplitsMin;
		var branchSplitsMax = treeParams.branchSplitsMax;
		var leafSizeMin = treeParams.leafSizeMin;
		var leafSizeMax = treeParams.leafSizeMax;
		var leafColors = treeParams.leafColors;

		ctx.strokeStyle = branchColor;
		ctx.lineWidth = branchWidthMax;// trunkWidth;

		var drawLeaf = function(ctx, params, colors){
			var pos = GE.getLineEnd(params.x, params.y, params.length, params.angle);
			ctx.arc(pos.x, pos.y, MTH.randf(leafSizeMin, leafSizeMax), 0, 2 * Math.PI, false);
			// ctx.ellipse(params.x, params.y,  MTH.rand(3, 4), MTH.rand(1, 2), params.angle * Math.PI/180, 0, 2 * Math.PI);
			ctx.fillStyle = colors[MTH.rand(0, colors.length - 1)];
			ctx.fill();
		};

		function drawBranch(branch) {
			branch.depth += MTH.rand(1, 2);

			if (branch.depth > branchDepthMax || branch.length < branchLengthMin)
				return;

			var res = [];
			var numberOfSplits = MTH.rand(branchSplitsMin, branchSplitsMax);
			for (var i = 0; i < numberOfSplits; i++) {
				if (branch.depth === branchDepthMax && branch.length < branchLengthLast) {
					drawLeaf(ctx, branch, leafColors);
				}
				else {
					ctx.strokeStyle = branchColor;
					ctx.lineWidth = branchWidthMax - branch.depth;
				}

				var v = MTH.rand(-angleVar, angleVar);
				var a = branch.angle + (angleSpread * (i - (numberOfSplits - 1) / 2)) + v;
				var dl = branch.length - branch.length / ((i === 0 || i === numberOfSplits - 1) ? branchRatioSides : branchRatioMiddle); // branches on sides are shorter than middle branch
				res.push(GE.drawLineLength(ctx, branch.x, branch.y, dl, a + v));
			}

			for (var j = 0; j < res.length; j++) {
				drawBranch({
					depth: branch.depth,
					x: res[j].x,
					y: res[j].y,
					length: res[j].length,
					angle: res[j].angle
				});
			}
		}

		// Initialize, draw trunk
		var res = GE.drawLineLength(ctx, pos.x, pos.y, trunkLength, 270);
		var params = {
			depth: 0,
			x: res.x,
			y: res.y,
			length: res.length,
			angle: res.angle
		};
		drawBranch(params);
	};

	function Tree(){
		this.seed = MTH.rand(1,100000);
		MTH.rand  = MTH.randomInt(this.seed);
		MTH.randf = MTH.randomFloat(this.seed);

		this.pos               = {x: 300, y: 400}; // draw tree on these coords
		// this.trunkWidth     = 8;
		this.trunkLength       = 100;
		this.angleSpread       = 35;
		this.angleVar          = 5; // variation in angle
		this.branchDepthMax    = 15;
		this.branchColor       = color.black;
		this.branchLengthMin   = 3;
		this.branchLengthLast  = 12;
		this.branchWidthMax    = 8;
		this.branchRatioSides  = 2;
		this.branchRatioMiddle = 3.8;
		this.branchSplitsMin   = 3;
		this.branchSplitsMax   = 4;
		this.leafSizeMin       = 0.2;
		this.leafSizeMax       = 1.8;
		this.leafColors        = [];
		// this.leafColors     = [color.red];

		this.leafColorGreenDark = true;
		this.leafColorOrange    = true;
		this.leafColorRed       = true;

		this.render = function(){
			this.leafColors = []; //clear
			if(this.leafColorGreenDark) this.leafColors.push(color.greenDark);
			if(this.leafColorOrange) this.leafColors.push(color.orange);
			if(this.leafColorRed) this.leafColors.push(color.red);

			draw(this);
		};

		this.renderNew = function(){
			this.seed = MTH.rand(1,100000);
			this.render();
			if(datgui){
				for (var i in datgui.__controllers) {
					datgui.__controllers[i].updateDisplay();
				}
			}
		};
	};

	function SetupDatGui(treeControls){
		var gui = new dat.GUI({ 
			load: {
				"preset": "Style",
				"closed": false,
				"remembered": {
					"Default": {
						"0": {
							"seed": 11627,
							"trunkLength": 100,
							"angleSpread": 35,
							"angleVar": 5,
							"branchDepthMax": 15,
							"branchColor": "rgba(60,60,60,0.95)",
							"branchLengthMin": 3,
							"branchLengthLast": 12,
							"branchWidthMax": 8,
							"branchRatioSides": 2,
							"branchRatioMiddle": 3.8,
							"branchSplitsMin": 3,
							"branchSplitsMax": 4,
							"leafSizeMin": 0.2,
							"leafSizeMax": 1.8,
							"leafColorGreenDark": true,
							"leafColorOrange": true,
							"leafColorRed": true
						}
					},
					"Style": {
						"0": {
							"seed": 56028,
							"trunkLength": 100,
							"angleSpread": 35,
							"angleVar": 5,
							"branchDepthMax": 15,
							"branchColor": "rgba(60,60,60,0.95)",
							"branchLengthMin": 3,
							"branchLengthLast": 12,
							"branchWidthMax": 8,
							"branchRatioSides": 2,
							"branchRatioMiddle": 3.8,
							"branchSplitsMin": 2,
							"branchSplitsMax": 4,
							"leafSizeMin": 2,
							"leafSizeMax": 3,
							"leafColorGreenDark": false,
							"leafColorOrange": false,
							"leafColorRed": true
						}
					}
				},
				"folders": {}
			}
		});

		gui.remember(treeControls);

		gui.add(treeControls, 'trunkLength');
		gui.add(treeControls, 'angleSpread');
		gui.add(treeControls, 'angleVar');

		// var b = gui.addFolder('Branch');
		var b = gui;
		b.add(treeControls, 'branchDepthMax').step(1);
		b.addColor(treeControls, 'branchColor');

		b.add(treeControls, 'branchLengthMin');
		b.add(treeControls, 'branchLengthLast');
		b.add(treeControls, 'branchWidthMax');
		b.add(treeControls, 'branchRatioSides');
		b.add(treeControls, 'branchRatioMiddle');
		b.add(treeControls, 'branchSplitsMin').step(1);
		b.add(treeControls, 'branchSplitsMax').step(1);

		gui.add(treeControls, 'leafSizeMin');
		gui.add(treeControls, 'leafSizeMax');
		gui.add(treeControls, 'leafColorGreenDark');
		gui.add(treeControls, 'leafColorOrange');
		gui.add(treeControls, 'leafColorRed');
		
		gui.add(treeControls, 'render');

		gui.add(treeControls, 'seed');
		gui.add(treeControls, 'renderNew');

		datgui = gui;
	};

	// expose methods
	this.addDatGui = SetupDatGui;
	this.create = function(){
		return new Tree();
	};
	this.tree = Tree;

};