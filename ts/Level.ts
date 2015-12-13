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
                this.game.add.sprite(120, 120, 'levelCompleted');
                var timer : Phaser.Timer = this.game.time.create(false);
                timer.add(3000, () => {this.game.state.start('Level', true, false);});
                timer.start();
            }
        }
    }

}