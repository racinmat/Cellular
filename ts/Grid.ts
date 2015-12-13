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

            var max : Phaser.Point = new Phaser.Point(this.rows, this.columns);
            for (var i = 0; i < this.rows; i++) {
                this.squares[i] = [];
                for (var j = 0; j < this.columns; j++) {
                    this.squares[i][j] = new Square(this.game, 10 + 64 * i, 10 + 64 * j, this, new Phaser.Point(i, j), new DirectProvider(max), ColorHelper.getRandom());
                    super.addChild(this.squares[i][j]);
                }
            }
        }

        getSquare(point : Phaser.Point) : Square {
            return this.squares[point.x][point.y];
        }

        expand(square : Square) {
            for (var neighbor of square.getNeighborPoints()) {
                console.log(neighbor);
                var neighborSquare : Square = this.getSquare(neighbor);
                neighborSquare.key = ColorHelper.getImage(square.color);
            }
        }

    }

}