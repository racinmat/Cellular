/// <reference path="references.ts"/>

module FloodTactics {

    export class Grid extends Phaser.Sprite {

        private squares : Square[][];
        private rows : number;
        private columns : number;

        parent : Phaser.Sprite;

        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, 'background', 0);
            this.rows = 6;
            this.columns = 6;
            this.game.add.existing(this);
            this.squares = [];

            var max : Phaser.Point = new Phaser.Point(this.rows - 1, this.columns - 1);
            for (var i = 0; i < this.rows; i++) {
                this.squares[i] = [];
                for (var j = 0; j < this.columns; j++) {

                    var power : number = 1;
                    var directions : Phaser.Point[] = [];
                    directions[0] = new Phaser.Point(-1, 0);
                    directions[1] = new Phaser.Point(1, 0);
                    directions[2] = new Phaser.Point(0, -1);
                    directions[3] = new Phaser.Point(0, 1);

                    this.squares[i][j] = new Square(this.game, 10 + 64 * i, 10 + 64 * j, this, new Phaser.Point(i, j), power, directions, max, ColorHelper.getRandom());
                    super.addChild(this.squares[i][j]);
                }
            }
        }

        getSquare(point : Phaser.Point) : Square {
            return this.squares[point.x][point.y];
        }

        expand(square : Square) {
            for (var neighbor of square.getNeighborPoints()) {
                var neighborSquare : Square = this.getSquare(neighbor);
                neighborSquare.setColor(square.getColor());
            }
        }

        public getSquares() : Square[][] {
            return this.squares;
        }
    }

}