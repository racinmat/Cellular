/// <reference path="references.ts"/>

module FloodTactics {

    export class Square extends Phaser.Sprite {

        grid : Grid;
        gridPosition : Phaser.Point;
        neighborsProvider : INeighborsProvider;
        private color : Color;

        constructor(game: Phaser.Game, x: number, y: number, grid : Grid, position : Phaser.Point, neighborsProvider : INeighborsProvider, color : Color) {
            super(game, x, y, ColorHelper.getImage(color), 0);
            this.game.add.existing(this);
            this.grid = grid;
            this.gridPosition = position;
            this.neighborsProvider = neighborsProvider;
            this.color = color;

            this.inputEnabled = true;

            //var expand = ((square) => {
            //    return this.grid.expand(square);
            //})();
            var expand = (square : Square) => {
                return this.grid.expand(square);
            };
            this.events.onInputDown.add(expand, this);
        }

        getNeighborPoints() : Phaser.Point[] {
            return this.neighborsProvider.getNeighbors(this.gridPosition);
        }

        public setColor(color: Color) {
            this.color = color;
            this.key = ColorHelper.getImage(color);
            this.loadTexture(this.key);
        }

        public getColor() : Color {
            return this.color;
        }
    }

}
