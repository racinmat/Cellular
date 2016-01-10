/// <reference path="references.ts"/>

module FloodTactics {

    export class Grid extends Phaser.Sprite {

        private squares : Square[][];
	    private initialSquares : any[][];
        private rows : number;
        private columns : number;
        private colorRules : Map<Color, Color[]>;
		//public rules : Phaser.Group;
		private rules : Phaser.Sprite;
		public onClick : {(square : Square): boolean;}[];	//typ proměnné je pole callbacků. Pokud callback vrátí true, zmizí z pole, pokud vrátí false, zůstává.
		private bubbling : Phaser.Sound;

        constructor(game: Phaser.Game, x: number, y: number, background : string) {
            super(game, x, y, background, 0);
			//this.tint = 0x000000;
	        this.game.add.existing(this);
			this.scale.set(0.25);
            this.squares = [];
			this.onClick = [];

            //data pro level
            this.rows = 6;
            this.columns = 6;

            this.colorRules = new Map<Color, Color[]>();

			//6 barev, z toho je jedna "neaktivní", na nic nereaguje, jako zeď
			this.colorRules.set(Color.Blue, [Color.Brown, Color.Red]);
			this.colorRules.set(Color.Brown, [Color.Red, Color.Yellow]);
			this.colorRules.set(Color.Red, [Color.Yellow, Color.Green]);
			this.colorRules.set(Color.Yellow, [Color.Green, Color.Blue]);
			this.colorRules.set(Color.Green, [Color.Blue, Color.Brown]);
			this.colorRules.set(Color.Black, []);

	        //data pro čtverce, budou se načítat z jsonu
	        var power : number = 1;

	        var directDirections : Phaser.Point[] = [];
	        directDirections[0] = new Phaser.Point(-1, 0);
	        directDirections[1] = new Phaser.Point(1, 0);
	        directDirections[2] = new Phaser.Point(0, -1);
	        directDirections[3] = new Phaser.Point(0, 1);

	        var redType : SquareType = new SquareType(Color.Red, power, directDirections);
	        var blueType : SquareType = new SquareType(Color.Blue, power, directDirections);
	        var brownType : SquareType = new SquareType(Color.Brown, power, directDirections);
	        var yellowType : SquareType = new SquareType(Color.Yellow, power, directDirections);
	        var greenType : SquareType = new SquareType(Color.Green, power, directDirections);
			var blackType : SquareType = new SquareType(Color.Black, power, directDirections);

	        var types : SquareType[] = [];
	        types.push(redType);
	        types.push(brownType);
	        types.push(blueType);
	        types.push(yellowType);
	        types.push(greenType);
			types.push(blackType);

	        //konec načítání typů čtverců

	        var number : number = 3;
	        //konec dat pro čtverce

	        var max : Phaser.Point = new Phaser.Point(this.rows - 1, this.columns - 1);
            for (var i = 0; i < this.rows; i++) {
                this.squares[i] = [];
                for (var j = 0; j < this.columns; j++) {
	                this.squares[i][j] = this.createSquareFromType(i, j, max, Phaser.ArrayUtils.getRandomItem(types), number);

	                //každý čverec má stejné vlastnosti, ale náhodnou barvu
	                //this.squares[i][j] = this.createSquare(i, j, power, directions, max, ColorHelper.getRandom(), number);
                    super.addChild(this.squares[i][j]);
                }
            }

	        //kopírování čverců
	        this.initialSquares = this.squaresToData();

			this.bubbling = this.game.add.audio('bubbling');
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
            for (var neighbor of this.getNeighbors(square)) {
                var colorsToBeCaptured : Color[] = this.colorRules.get(square.getColor());
                if(colorsToBeCaptured.indexOf(neighbor.getColor()) > -1) {
					var x =  square.getGridPosition().x;
					var y =  square.getGridPosition().y;
					var x2 = neighbor.getGridPosition().x;
					var y2 = neighbor.getGridPosition().y;
					var dir;
					if (x === x2)
					{
						if (y < y2)
							dir = 'down';
						else
							dir = 'up';
					}
					else
					{
						if (x < x2)
							dir = 'right';
						else
							dir = 'left';
					}
					var animstr = ColorHelper.toString(neighbor.getColor()) + '-' + dir ;

					var centerCell = this.game.add.sprite(square.x, square.y, animstr);
					console.log('x: ' + sqaure.x + ', y: ' + square.y);
					centerCell.scale.set(0.25);
					centerCell.animations.add('expand');
					centerCell.animations.play('expand', 3, false, true);

					var targetCell = this.game.add.sprite(neighbor.x, neighbor.y,animstr + '-t');
					targetCell.scale.set(0.25);
					targetCell.animations.add('expand');
					targetCell.animations.play('expand', 3, false, true);

	                neighbor.setSquareType(square.getSquareType());
					this.bubbling.play();
                }
            }
			this.processOnClick(square);
        }

	    public flood(square : Square) : void {
		    for (var neighbor of this.getNeighbors(square)) {
			    var colorsToBeCaptured : Color[] = this.colorRules.get(square.getColor());
			    if(colorsToBeCaptured.indexOf(neighbor.getColor()) > -1) {
				    neighbor.setSquareType(square.getSquareType());
					this.bubbling.play();
				    neighbor.flood();
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
		    console.log("level restarted");
	    }

	    private createSquareFromType(x : number, y : number, max : Phaser.Point, squareType : SquareType, number : number) {
		    var square = new Square(this.game, 180 + 65 * 4 * x, 190  + 65 * 4 * y, this, new Phaser.Point(x, y), max, squareType, number);
			square.scale.setTo(1);
			return square;
	    }

	    serialize() : any {
			var data : any = {};
		    data.rows = this.rows;
		    data.columns = this.columns;
		    data.colorRules = this.mapToObject(this.colorRules);
		    data.squares = this.squaresToData();
		    return data;
	    }

	    deserialize(data : any) {
		    this.rows = data.rows;
		    this.columns = data.columns;
		    this.colorRules = this.objectToMap(data.colorRules);
			console.log(this.colorRules);
		    this.squaresFromData(data.squares);

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
			console.log(obj);
			var map = new Map<Color, Color[]>();
			for (let k of Object.keys(obj)) {
				map.set(Number(k), obj[k]);
			}
			console.log(map);
			return map;
		}

	    squaresToData() : any {
		    var data = [];
		    for (var i = 0; i < this.rows; i++) {
			    data[i] = [];
			    for (var j = 0; j < this.columns; j++) {
				    data[i][j] = this.squares[i][j].serialize();
			    }
		    }
		    return data;
	    }

	    squaresFromData(data : any) {
		    for (var i = 0; i < this.rows; i++) {
			    for (var j = 0; j < this.columns; j++) {
				    this.squares[i][j].deserialize(data[i][j]);
			    }
		    }
	    }

		//reads rules and returns colors, which can not be recolored and do not recolor anything
		getInactiveColors()  : Color[] {
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
     }

}