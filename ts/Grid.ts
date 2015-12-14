/// <reference path="references.ts"/>
/// <reference path="../../../../Program Files (x86)\JetBrains\PhpStorm 9.0\plugins\JavaScriptLanguage\typescriptCompiler\external\lib.es6.d.ts"/>

module FloodTactics {

    export class Grid extends Phaser.Sprite {

        private squares : Square[][];
        private rows : number;
        private columns : number;
        private colorRules : Map<Color, Color[]>;

        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, 'background', 0);
			this.tint = 0x000000;
	        this.game.add.existing(this);
            this.squares = [];

            //data pro level
            this.rows = 6;
            this.columns = 6;

            this.colorRules = new Map<Color, Color[]>();
	        this.colorRules.set(Color.Blue, [Color.Brown]);
	        this.colorRules.set(Color.Brown, [Color.Red]);
	        this.colorRules.set(Color.Red, [Color.Yellow]);
	        this.colorRules.set(Color.Yellow, [Color.Blue]);
            //this.colorRules.set(Color.Blue, [Color.Brown, Color.Red, Color.Yellow, Color.Blue]);
            //this.colorRules.set(Color.Brown, [Color.Brown, Color.Red, Color.Yellow, Color.Blue]);
            //this.colorRules.set(Color.Red, [Color.Brown, Color.Red, Color.Yellow, Color.Blue]);
            //this.colorRules.set(Color.Yellow, [Color.Brown, Color.Red, Color.Yellow, Color.Blue]);
            //konec dat pro level

            var max : Phaser.Point = new Phaser.Point(this.rows - 1, this.columns - 1);
            for (var i = 0; i < this.rows; i++) {
                this.squares[i] = [];
                for (var j = 0; j < this.columns; j++) {

                    //data pro čtverce, budou se načítat z jsonu
                    var power : number = 1;
                    var directions : Phaser.Point[] = [];
                    directions[0] = new Phaser.Point(-1, 0);
                    directions[1] = new Phaser.Point(1, 0);
                    directions[2] = new Phaser.Point(0, -1);
                    directions[3] = new Phaser.Point(0, 1);
					var number : number = 3;
                    //konec dat pro čtverce

                    this.squares[i][j] = new Square(this.game, 42 + 64 * i, 42 + 64 * j, this, new Phaser.Point(i, j), power, directions, max, ColorHelper.getRandom(), number);
                    super.addChild(this.squares[i][j]);
                }
            }

			//vykreslení pravidel pro přebarvování
			var i = 0;
			this.colorRules.forEach((values : Color[], key : Color) => {
				var square = this.game.add.sprite(500, 80 + 80 * i, ColorHelper.toString(key));
				square.anchor.setTo(0.5, 0.5);  //posunu, aby souřadnice určovaly střed a ne okraj spritu
				square.scale.set(0.5);
				var text = this.game.add.bitmapText(530, 80 + 80 * i, 'arial', ">", 30);
				text.anchor.setTo(0.5, 0.5);
				var j = 0;
				for(var color2 of values) {
					var square = this.game.add.sprite(560 + 40 * j, 80 + 80 * i, ColorHelper.toString(color2));
					square.anchor.setTo(0.5, 0.5);
					square.scale.set(0.5);
					j++;
				}
				i++;
			});
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

        public expand(square : Square) {
            for (var neighbor of this.getNeighbors(square)) {
                var colorsToBeCaptured : Color[] = this.colorRules.get(square.getColor());
                if(colorsToBeCaptured.indexOf(neighbor.getColor()) > -1) {
	                neighbor.setColor(square.getColor());
                }
            }
        }

        public getSquares() : Square[][] {
            return this.squares;
        }

    }

}