/// <reference path="references.ts"/>

module FloodTactics {

    export class Preloader extends Phaser.State {

        preload() {

            //  Load our actual games assets
            this.load.image('background', 'images/background.jpg');
            this.load.image('yellow', 'images/yellow.png');
            this.load.image('brown', 'images/brown.png');
            this.load.image('red', 'images/red.png');
            this.load.image('blue', 'images/blue.png');
	        this.load.image('green', 'images/green.png');
            this.load.image('levelCompleted', 'images/level_completed.jpg');
	        this.load.image('button', 'images/button.jpg');
	        this.load.image('whiteBackground', 'images/whiteBackground.png');
            this.load.bitmapFont('arial', 'fonts/arial.png', 'fonts/arial.xml');
	        this.load.bitmapFont('arialBlack', 'fonts/arialBlack.png', 'fonts/arial.xml');
        }

        create() {
            this.game.state.start('Menu', true, false);
        }

    }

}
