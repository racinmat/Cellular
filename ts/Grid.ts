/// <reference path="references.ts"/>

module FloodTactics {

    export class Grid extends Phaser.Sprite {

        private squares : Square[][];
	    private initialSquares : any[][];
        private columns : number;
        private rows : number;
        private colorRules : Map<Color, Color[]>;
		public onClick : {(square : Square): boolean;}[];	//typ proměnné je pole callbacků. Pokud callback vrátí true, zmizí z pole, pokud vrátí false, zůstává.
		private bubbling : Phaser.Sound;
		public initialized : boolean = false;
		public level : AbstractLevel;
		private winningColor : Color;
		private absorbtionQueue : Square[][];	//fronta na pořírání a animaci, abychom mohli spustit animaci postupně. Uvnitř je 2prvkové pole. Požírající a požíraná buňka.

        constructor(game: Phaser.Game, x: number, y: number, background : string, level : AbstractLevel) {
            super(game, x, y, background, 0);
			this.level = level;
	        this.game.add.existing(this);
			this.scale.set(0.25);
            this.squares = [];
			this.onClick = [];

            this.colorRules = new Map<Color, Color[]>();

			//6 barev, z toho je jedna "neaktivní", na nic nereaguje, jako zeď
			this.colorRules.set(Color.Blue, [Color.Black, Color.Red]);
			this.colorRules.set(Color.Black, [Color.Red, Color.Violet]);
			this.colorRules.set(Color.Red, [Color.Violet, Color.Green]);
			this.colorRules.set(Color.Violet, [Color.Green, Color.Blue]);
			this.colorRules.set(Color.Green, [Color.Blue, Color.Black]);
			this.colorRules.set(Color.Transparent, []);

	        //konec načítání typů čtverců

			this.bubbling = this.game.add.audio('bubbling');
			this.absorbtionQueue = [];
		}

        public getSquare(point : Phaser.Point) : Square {
            return this.squares[point.x][point.y];
        }

	    public getNeighbors(square : Square) : Square[] {
			var neighbors : Square[] = [];
		    for (var neighbor of square.getNeighborPoints()) {
			    neighbors.push(this.getSquare(neighbor));
		    }
		    return neighbors;
	    }

        public expand(square : Square) : void {
			if(!this.isColorActive(square.getColor())) {
			    return;
			}

			var colorsToBeCaptured : Color[] = this.colorRules.get(square.getColor());
            for (var neighbor of this.getNeighbors(square)) {
                if(colorsToBeCaptured.indexOf(neighbor.getColor()) > -1) {
					this.absorbtionQueue.push([square, neighbor]);
					//console.log('adding to queue');
                }
            }
			this.processOnClick(square);
        }

		public processAbsorptionQueue(flooding : boolean) {
			this.processNextAbsorption(flooding);
		}

		private processNextAbsorption(flooding : boolean) {
			if(this.absorbtionQueue.length == 0) {
			    return;
			}

			var pair = this.absorbtionQueue.shift();
			var square : Square = pair[0];
			var neighbor : Square = pair[1];
			//console.log('removing from queue, square: ' + ColorHelper.toString(square.getColor()) + ', ' + square.getGridPosition().toString() + ', neighbor: ' + ColorHelper.toString(neighbor.getColor()) + ', ' + neighbor.getGridPosition().toString());
			if(square.getColor() == neighbor.getColor()) {	//wtf ochrana
			    return;
			}

			this.expandWithAnimation(square, neighbor, () => {
				if(flooding) {
					//console.log('flooding');
					neighbor.flood();
				}
				this.processNextAbsorption(flooding);
			});
		}

		private expandWithAnimation(square : Square, neighbor : Square, onComplete : Function) {
			var animationSpeed = 10;

			var x =  square.getGridPosition().x;
			var y =  square.getGridPosition().y;
			var x2 = neighbor.getGridPosition().x;
			var y2 = neighbor.getGridPosition().y;
			var direction : string;
			if (x === x2)
			{
				if (y < y2)
					direction = 'down';
				else
					direction = 'up';
			}
			else
			{
				if (x < x2)
					direction = 'right';
				else
					direction = 'left';
			}

			var animationName = ColorHelper.toString(square.getColor()) + '-' + direction;
			var animation1Name = ColorHelper.toString(square.getColor()) + '-' + direction + '-' + 'part1';
			var animation2Name = ColorHelper.toString(square.getColor()) + '-' + direction + '-' + 'part2';

			var centerCell = this.game.add.sprite(square.x, square.y, animationName);
			centerCell.anchor.set(0.5);
			super.addChild(centerCell);
			centerCell.animations.add('expand');
			centerCell.animations.play('expand', animationSpeed, false, true);

			var targetCellPart1 = this.game.add.sprite(neighbor.x, neighbor.y, animation1Name + '-t');
			targetCellPart1.anchor.set(0.5);
			super.addChild(targetCellPart1);
			var animation = targetCellPart1.animations.add('expand');
			animation.onComplete.add((sprite : Phaser.Sprite, animation : Phaser.Animation,  neighbor : Square, targetCellPart1 : Phaser.Sprite, animation2Name : string) => {
				var targetCellPart2 = this.game.add.sprite(neighbor.x, neighbor.y, animation2Name + '-t');
				targetCellPart2.anchor.set(0.5);
				super.addChild(targetCellPart2);
				var animation2 = targetCellPart2.animations.add('expand');
				targetCellPart2.animations.play('expand', animationSpeed, false, true);
				neighbor.setSquareType(square.getSquareType());
				animation2.onComplete.add(onComplete);
			}, this, null, neighbor, targetCellPart1, animation2Name);
			targetCellPart1.animations.play('expand', animationSpeed, false, true);

			this.bubbling.play();
		}

	    public flood(square : Square) : void {
			var colorsToBeCaptured : Color[] = this.colorRules.get(square.getColor());
		    for (var neighbor of this.getNeighbors(square)) {
			    if(colorsToBeCaptured.indexOf(neighbor.getColor()) > -1) {
					this.absorbtionQueue.push([square, neighbor]);
					//console.log('adding to queue, square: ' + ColorHelper.toString(square.getColor()) + ', ' + square.getGridPosition().toString() + ', neighbor: ' + ColorHelper.toString(neighbor.getColor()) + ', ' + neighbor.getGridPosition().toString());
					//console.log('flooding');
					//neighbor.setSquareType(square.getSquareType());
					//this.bubbling.play();
					//neighbor.flood();
			    }
		    }
			this.processOnClick(square);
	    }

		private processOnClick(square : Square) {
			var newOnClick : {(square : Square): boolean;}[] = [];
			for(var callback of this.onClick) {
				if(!callback(square)) {
				    newOnClick.push(callback);
				}
			}
			this.onClick = newOnClick;
		}

        public getSquares() : Square[][] {
            return this.squares;
        }

	    public restartLevel() {
			this.squaresFromData(this.initialSquares);
	    }

	    private createSquareFromType(x : number, y : number, max : Phaser.Point, squareType : SquareType, number : number) {
		    var square = new Square(this.game, 180 + 65 * 4 * x, 190 + 65 * 4 * y, this, new Phaser.Point(x, y), max, squareType, number);
			square.scale.setTo(1);
			return square;
	    }

	    serialize() : any {
			var data : any = {};
		    data.rows = this.rows;
		    data.columns = this.columns;
			data.winningColor = this.winningColor;
		    data.colorRules = this.mapToObject(this.colorRules);
		    data.squares = this.squaresToData();
		    return data;
	    }

	    deserialize(data : any) {
		    this.columns = data.columns;
		    this.rows = data.rows;
		    this.colorRules = this.objectToMap(data.colorRules);
			this.setWinningColor(data.winningColor);
			console.log('winning color');
			console.log(ColorHelper.toString(data.winningColor));
			this.initialize();
		    this.squaresFromData(data.squares);

			this.chooseBackgroundFromSize();
			//kopírování čverců
			this.initialSquares = this.squaresToData();
	    }

	    toJson() : string {
			return JSON.stringify(this.serialize(), null, 4);
	    }

		mapToObject(map : Map<Color, Color[]>) : any {
			let obj = Object.create(null);
			this.colorRules.forEach((values : Color[], key : Color) => {
				obj[key] = values;
			});
			return obj;
		}

		objectToMap(obj : any) : Map<Color, Color[]> {
			var map = new Map<Color, Color[]>();
			for (let k of Object.keys(obj)) {
				map.set(Number(k), obj[k]);
			}
			return map;
		}

	    squaresToData() : any {
		    var data = [];
		    for (var i = 0; i < this.columns; i++) {
			    data[i] = [];
			    for (var j = 0; j < this.rows; j++) {
				    data[i][j] = this.squares[i][j].serialize();
			    }
		    }
		    return data;
	    }

	    squaresFromData(data : any) {
		    for (var i = 0; i < this.columns; i++) {
			    for (var j = 0; j < this.rows; j++) {
				    this.squares[i][j].deserialize(data[i][j]);
			    }
		    }
	    }

		//reads rules and returns colors, which can not be recolored and do not recolor anything
		public getInactiveColors() : Color[] {
			var inactiveColors : Color[] = [];
			//přidám všechny barvy, které nikoho nepřebarvují
			this.colorRules.forEach((values : Color[], key : Color) => {
				if(values.length == 0) {
					inactiveColors.push(key);
				}
			});
			//kontrola, zda barva, která nikoho nepřebarvuje, není sama přebarvovaná někým jiným
			this.colorRules.forEach((values : Color[], key : Color) => {
				for(var color of inactiveColors) {
					if(values.indexOf(color) > -1) {
						//odejme barvu z pole
						inactiveColors = inactiveColors.filter((col : Color) => {return col != color;});
					}
				}
			});

			return inactiveColors;
		}

		private chooseBackgroundFromSize() {
			if (this.columns == 6 && this.rows == 6) {
				if(this.key == 'background') {
					this.x += 166;
				}
			    this.key = 'backgroundSquare';
			} else if (this.columns == 12 && this.rows == 6) {
				if(this.key == 'backgroundSquare') {
					this.x -= 166;
				}
				this.key = 'background';
			}
			this.loadTexture(this.key);
		}

		public initialize() {
			if(typeof this.columns == 'undefined' && typeof this.rows == 'undefined') {
				this.columns = 12;
				this.rows = 6;
			}

			if(typeof this.winningColor == 'undefined') {
				this.setWinningColor(this.getRandomActiveColor());
			}

			if(this.squares.length == 0) {	//nenaloadováno
				var power = 1;
				var directDirections : Phaser.Point[] = [];
				directDirections[0] = new Phaser.Point(-1, 0);
				directDirections[1] = new Phaser.Point(1, 0);
				directDirections[2] = new Phaser.Point(0, -1);
				directDirections[3] = new Phaser.Point(0, 1);

				var redType : SquareType = new SquareType(Color.Red, power, directDirections);
				var blueType : SquareType = new SquareType(Color.Blue, power, directDirections);
				var blackType : SquareType = new SquareType(Color.Black, power, directDirections);
				var violetType : SquareType = new SquareType(Color.Violet, power, directDirections);
				var greenType : SquareType = new SquareType(Color.Green, power, directDirections);
				var transparentType : SquareType = new SquareType(Color.Transparent, power, directDirections);

				var types : SquareType[] = [];
				types.push(redType);
				types.push(blackType);
				types.push(blueType);
				types.push(violetType);
				types.push(greenType);
				types.push(transparentType);

				var number : number = 3;
				//konec dat pro čtverce

				var max : Phaser.Point = new Phaser.Point(this.columns - 1, this.rows - 1);
				for (var i = 0; i < this.columns; i++) {
					this.squares[i] = [];
					for (var j = 0; j < this.rows; j++) {
						this.squares[i][j] = this.createSquareFromType(i, j, max, Phaser.ArrayUtils.getRandomItem(types), number);
						super.addChild(this.squares[i][j]);
					}
				}

				this.chooseBackgroundFromSize();
				//kopírování čverců
				this.initialSquares = this.squaresToData();
			}

			this.initialized = true;
		}

		private getRandomActiveColor() {
			var pickedColor : Color;
			var colors : Color[] = [];
			this.colorRules.forEach((values : Color[], key : Color) => {
				colors.push(key);
			});
			do {
				pickedColor = Phaser.ArrayUtils.getRandomItem(colors);
			} while (!this.isColorActive(pickedColor));
			return pickedColor;
		}

		public isColorActive(color : Color) {
			return this.getInactiveColors().indexOf(color) == -1;
		}

		private setWinningColor(color : Color) {
			this.winningColor = color;
			if(typeof this.level.winChecker != 'undefined') {
				this.level.winChecker.setData(color);
			}
		}
	}

}