/// <reference path="references.ts"/>

module FloodTactics {

    export class Grid extends Phaser.Sprite {

        private squares : Square[][];
	    private initialSquares : any[][];
        private rows : number;
        private columns : number;
        private colorRules : Map<Color, Color[]>;
		public rules : Phaser.Group;

        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, 'background', 0);
			this.tint = 0x000000;
	        this.game.add.existing(this);
            this.squares = [];

            //data pro level
            this.rows = 6;
            this.columns = 6;

            this.colorRules = new Map<Color, Color[]>();

	        // 4 barvy, každá barva pořáží jednu jinou, cyklus
	        //this.colorRules.set(Color.Blue, [Color.Brown]);
	        //this.colorRules.set(Color.Brown, [Color.Red]);
	        //this.colorRules.set(Color.Red, [Color.Yellow]);
	        //this.colorRules.set(Color.Yellow, [Color.Blue]);

	        //5 barev, každá barva poráží 2 jiné
	        //this.colorRules.set(Color.Blue, [Color.Brown, Color.Red]);
	        //this.colorRules.set(Color.Brown, [Color.Red, Color.Yellow]);
	        //this.colorRules.set(Color.Red, [Color.Yellow, Color.Green]);
	        //this.colorRules.set(Color.Yellow, [Color.Green, Color.Blue]);
	        //this.colorRules.set(Color.Green, [Color.Blue, Color.Brown]);

			//6 barev, z toho je jedna "neaktivní", na nic nereaguje, jako zeď
			this.colorRules.set(Color.Blue, [Color.Brown, Color.Red]);
			this.colorRules.set(Color.Brown, [Color.Red, Color.Yellow]);
			this.colorRules.set(Color.Red, [Color.Yellow, Color.Green]);
			this.colorRules.set(Color.Yellow, [Color.Green, Color.Blue]);
			this.colorRules.set(Color.Green, [Color.Blue, Color.Brown]);
			this.colorRules.set(Color.Black, []);

			//4 barvy, každá barva poráží všechny ostatní
            //this.colorRules.set(Color.Blue, [Color.Brown, Color.Red, Color.Yellow, Color.Blue]);
            //this.colorRules.set(Color.Brown, [Color.Brown, Color.Red, Color.Yellow, Color.Blue]);
            //this.colorRules.set(Color.Red, [Color.Brown, Color.Red, Color.Yellow, Color.Blue]);
            //this.colorRules.set(Color.Yellow, [Color.Brown, Color.Red, Color.Yellow, Color.Blue]);
            //konec dat pro level


	        //načítání typů čtverců

	        //data pro čtverce, budou se načítat z jsonu
	        var power : number = 1;

	        var directDirections : Phaser.Point[] = [];
	        directDirections[0] = new Phaser.Point(-1, 0);
	        directDirections[1] = new Phaser.Point(1, 0);
	        directDirections[2] = new Phaser.Point(0, -1);
	        directDirections[3] = new Phaser.Point(0, 1);

	        //var diagonalDirections : Phaser.Point[] = [];
	        //diagonalDirections[0] = new Phaser.Point(-1, -1);
	        //diagonalDirections[1] = new Phaser.Point(1, -1);
	        //diagonalDirections[2] = new Phaser.Point(-1, 1);
	        //diagonalDirections[3] = new Phaser.Point(1, 1);

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

			//vykreslení pravidel pro přebarvování
			this.rules = this.game.add.group();

			var i = 0;
			this.colorRules.forEach((values : Color[], key : Color) => {
				var square = this.game.add.sprite(500, 80 + 60 * i, ColorHelper.toString(key));
				square.anchor.setTo(0.5, 0.5);  //posunu, aby souřadnice určovaly střed a ne okraj spritu
				square.scale.set(0.5);
				var text = this.game.add.bitmapText(530, 80 + 60 * i, 'arial', ">", 30);
				text.anchor.setTo(0.5, 0.5);

				this.rules.add(square);
				this.rules.add(text);

				var j = 0;
				for(var color2 of values) {
					var square = this.game.add.sprite(560 + 40 * j, 80 + 60 * i, ColorHelper.toString(color2));
					square.anchor.setTo(0.5, 0.5);
					square.scale.set(0.5);
					j++;

					this.rules.add(square);
				}
				i++;
			});

	        //kopírování čverců
	        this.initialSquares = this.squaresToData();
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
	                neighbor.setSquareType(square.getSquareType());
                }
            }
        }

	    public flood(square : Square) : void {
		    for (var neighbor of this.getNeighbors(square)) {
			    var colorsToBeCaptured : Color[] = this.colorRules.get(square.getColor());
			    if(colorsToBeCaptured.indexOf(neighbor.getColor()) > -1) {
				    neighbor.setSquareType(square.getSquareType());
				    neighbor.flood();
			    }
		    }
	    }

        public getSquares() : Square[][] {
            return this.squares;
        }

	    public restartLevel() {
			this.squaresFromData(this.initialSquares);
		    console.log("level restarted");
	    }

	    private createSquareFromType(x : number, y : number, max : Phaser.Point, squareType : SquareType, number : number) {
		    return new Square(this.game, 42 + 64 * x, 42 + 64 * y, this, new Phaser.Point(x, y), max, squareType, number);
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
	    }

	    toJson() : string {
			return JSON.stringify(this.serialize(), null, 4);
	    }

	    fromJson(json : string) {
			this.deserialize(JSON.parse(json));
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