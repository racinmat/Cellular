/// <reference path="references.ts"/>

module FloodTactics {

    export class Grid extends Phaser.Sprite {

        private squares : FloodTactics.Square[][];
        private rows : number;
        private columns : number;

        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, 'simon', 0);
            this.rows = 6;
            this.columns = 6;
            this.squares = [];
            for (var i = 0; i < this.rows; i++) {
                this.squares[i] = [];
            }
        }

        public create() {
            for (var i = 0; i < this.rows; i++) {
                for (var j = 0; j < this.columns; j++) {
                    this.squares[i][j] = new Square(this.game, );
                }
            }
        }

        static click(button:Phaser.Button) {
            button.key = 'yellow';
        }

    }

}