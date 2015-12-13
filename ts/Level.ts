/// <reference path="references.ts"/>

module FloodTactics {

    export class Level extends Phaser.State {

        grid: Grid;
        winChecker: IWinChecker;


        create() {
            this.grid = new Grid(this.game, 0, 0);
            this.winChecker = new OneColorWinChecker(Color.Blue);
        }

        update() {
            if(this.winChecker.checkWin(this.grid.getSquares())) {

            }
        }
    }

}