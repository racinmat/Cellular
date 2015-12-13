/// <reference path="references.ts"/>

module FloodTactics {

    export class Level extends Phaser.State {

        grid: Grid;

        create() {
            this.grid = new Grid(this.game, 0, 0);
        }

    }

}