/// <reference path="references.ts"/>
/// <reference path="../../../../Program Files (x86)\JetBrains\PhpStorm 9.0\plugins\JavaScriptLanguage\typescriptCompiler\external\lib.d.ts"/>

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
                    //konec dat pro čtverce

                    this.squares[i][j] = new Square(this.game, 10 + 64 * i, 10 + 64 * j, this, new Phaser.Point(i, j), power, directions, max, ColorHelper.getRandom());
                    super.addChild(this.squares[i][j]);
                }
            }
        }

        private getSquare(point : Phaser.Point) : Square {
            return this.squares[point.x][point.y];
        }

        public expand(square : Square) {
            for (var neighbor of square.getNeighborPoints()) {
                var neighborSquare : Square = this.getSquare(neighbor);
                var colorsToBeCaptured : Color[] = this.colorRules.get(square.getColor());
                if(colorsToBeCaptured.indexOf(neighborSquare.getColor()) > -1) {
                    neighborSquare.setColor(square.getColor());
                }
            }
        }

        public getSquares() : Square[][] {
            return this.squares;
        }

    }

}