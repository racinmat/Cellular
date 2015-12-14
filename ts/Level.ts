/// <reference path="references.ts"/>

module FloodTactics {

    export class Level extends Phaser.State {

        private grid : Grid;
        private winChecker : IWinChecker;
        private tween : Phaser.Tween;

        create() {
            this.winChecker = new OneColorWinChecker(Color.Blue);
            this.grid = new Grid(this.game, 0, 0);
            this.tween = null;
            this.game.add.bitmapText(30, 400, 'arial', "Winning condition: " + this.winChecker.getDescription(), 32);
        }

        update() {
            if(this.winChecker.checkWin(this.grid.getSquares())) {
                if(this.tween === null) {
                    var popup : Phaser.Sprite = this.game.add.sprite(400, 400, 'levelCompleted');
                    popup.anchor.setTo(0.5, 0.5);
                    popup.scale.set(0.2);

                    this.tween = this.game.add.tween(popup.scale);
                    this.tween.to( { x: 1, y: 1 }, 2000, Phaser.Easing.Elastic.Out, true);
                    this.tween.onComplete.add(() => {this.game.state.start('Level');});


                }
            }

        }
    }

}