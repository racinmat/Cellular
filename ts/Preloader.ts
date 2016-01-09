/// <reference path="references.ts"/>

module FloodTactics {

    export class Preloader extends Phaser.State {

        preload() {

            //  Load our actual games assets
            this.load.image('background', 'images/background.png');
			this.load.image('backgroundSquare', 'images/backgroundSquare.png');
			this.load.image('playground', 'images/playground-plain.png');

            this.load.image('yellow', 'images/yellow-cell.png');
            this.load.image('brown', 'images/brown-cell.png');
            this.load.image('red', 'images/red-cell.png');
            this.load.image('blue', 'images/blue-cell.png');
	        this.load.image('green', 'images/green-cell.png');
			this.load.image('black', 'images/obstacle.png');
            this.load.image('levelCompleted', 'images/level_completed.jpg');

	        this.load.image('button', 'images/button.jpg');

			this.load.image('buttonGenerate', 'images/buttonGenerateLevel.png');
			this.load.image('buttonReset', 'images/buttonResetLevel.png');
			this.load.image('buttonMenu', 'images/buttonMenu.png');

	        this.load.image('whiteBackground', 'images/whiteBackground.png');
			this.load.image('whiteBackground300x300', 'images/whiteBackground300x300.png');
			this.load.image('whiteBackground300x360', 'images/whiteBackground300x360.png');
			this.load.image('soundSilent', 'images/sound-silent.png');
			this.load.image('soundLoud', 'images/sound-loud.png');
            this.load.bitmapFont('arial', 'fonts/arial.png', 'fonts/arial.xml');
	        this.load.bitmapFont('arialBlack', 'fonts/arialBlack.png', 'fonts/arial.xml');
			this.load.audio('backgroundSound', 'audio/rain_song.mp3');
			this.load.audio('bubbling', 'audio/bubbling2.wav');

			this.load.image('rules', 'images/rules.png');
        }

        create() {
            this.game.state.start('Menu', true, false);
        }

    }

}
