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

			this.load.spritesheet('black-left', 'animations/black/doleva-startCell', 267, 267);
			this.load.spritesheet('black-right', 'animations/black/doprava-startCell', 267, 267);
			this.load.spritesheet('black-up', 'animations/black/nahoru-startCell', 267, 267);
			this.load.spritesheet('black-down', 'animations/black/dolů-startCell', 267, 267);
			this.load.spritesheet('black-left-t', 'animations/black/doleva-targetCell', 267, 267);
			this.load.spritesheet('black-right-t', 'animations/black/doprava-targetCell', 267, 267);
			this.load.spritesheet('black-up-t', 'animations/black/nahoru-targetCell', 267, 267);
			this.load.spritesheet('black-down-t', 'animations/black/dolů-targetCell', 267, 267);

			this.load.spritesheet('blue-left', 'animations/blue/doleva-startCell', 267, 267);
			this.load.spritesheet('blue-right', 'animations/blue/doprava-startCell', 267, 267);
			this.load.spritesheet('blue-up', 'animations/blue/nahoru-startCell', 267, 267);
			this.load.spritesheet('blue-down', 'animations/blue/dolů-startCell', 267, 267);
			this.load.spritesheet('blue-left-t', 'animations/blue/doleva-targetCell', 267, 267);
			this.load.spritesheet('blue-right-t', 'animations/blue/doprava-targetCell', 267, 267);
			this.load.spritesheet('blue-up-t', 'animations/blue/nahoru-targetCell', 267, 267);
			this.load.spritesheet('blue-down-t', 'animations/blue/dolů-targetCell', 267, 267);

			this.load.spritesheet('violet-left', 'animations/violet/doleva-startCell', 267, 267);
			this.load.spritesheet('violet-right', 'animations/violet/doprava-startCell', 267, 267);
			this.load.spritesheet('violet-up', 'animations/violet/nahoru-startCell', 267, 267);
			this.load.spritesheet('violet-down', 'animations/violet/dolů-startCell', 267, 267);
			this.load.spritesheet('violet-left-t', 'animations/violet/doleva-targetCell', 267, 267);
			this.load.spritesheet('violet-right-t', 'animations/violet/doprava-targetCell', 267, 267);
			this.load.spritesheet('violet-up-t', 'animations/violet/nahoru-targetCell', 267, 267);
			this.load.spritesheet('violet-down-t', 'animations/violet/dolů-targetCell', 267, 267);

			this.load.spritesheet('green-left', 'animations/green/doleva-startCell', 267, 267);
			this.load.spritesheet('green-right', 'animations/green/doprava-startCell', 267, 267);
			this.load.spritesheet('green-up', 'animations/green/nahoru-startCell', 267, 267);
			this.load.spritesheet('green-down', 'animations/green/dolů-startCell', 267, 267);
			this.load.spritesheet('green-left-t', 'animations/green/doleva-targetCell', 267, 267);
			this.load.spritesheet('green-right-t', 'animations/green/doprava-targetCell', 267, 267);
			this.load.spritesheet('green-up-t', 'animations/green/nahoru-targetCell', 267, 267);
			this.load.spritesheet('green-down-t', 'animations/green/dolů-targetCell', 267, 267);

		    this.load.spritesheet('red-left', 'animations/red/doleva-startCell', 267, 267);
			this.load.spritesheet('red-right', 'animations/red/doprava-startCell', 267, 267);
			this.load.spritesheet('red-up', 'animations/red/nahoru-startCell', 267, 267);
			this.load.spritesheet('red-down', 'animations/red/dolů-startCell', 267, 267);
			this.load.spritesheet('red-left-t', 'animations/red/doleva-targetCell', 267, 267);
			this.load.spritesheet('red-right-t', 'animations/red/doprava-targetCell', 267, 267);
			this.load.spritesheet('red-up-t', 'animations/red/nahoru-targetCell', 267, 267);
			this.load.spritesheet('red-down-t', 'animations/red/dolů-targetCell', 267, 267);

		}

        create() {
            this.game.state.start('Menu', true, false);
        }

    }

}
