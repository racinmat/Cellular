/// <reference path="references.ts"/>

module FloodTactics {

    export class Square extends Phaser.Sprite {

        grid : Grid;
        gridPosition : Phaser.Point;
        neighborsProvider : INeighborsProvider;
        color : Color;

        constructor(game: Phaser.Game, x: number, y: number, grid : Grid, position : Phaser.Point, neighborsProvider : INeighborsProvider, color : Color) {
            super(game, x, y, ColorHelper.getImage(color), 0);
            this.game.add.existing(this);
            this.grid = grid;
            this.gridPosition = position;
            this.neighborsProvider = neighborsProvider;

            this.inputEnabled = true;
            this.events.onInputDown.add(grid.expand, this);
        }

        getNeighborPoints() : Phaser.Point[] {
            return this.neighborsProvider.getNeighbors(this.gridPosition);
        }

    }

}
