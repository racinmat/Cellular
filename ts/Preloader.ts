/// <reference path="references.ts"/>

module FloodTactics {

    export class Preloader extends Phaser.State {

        preload() {

            //  Load our actual games assets
            this.load.image('background', 'images/background.png');
			this.load.image('backgroundSquare', 'images/backgroundSquare.png');
			this.load.image('playground', 'images/playground-plain.png');

            this.load.image('violet', 'images/yellow-cell.png');
            this.load.image('black', 'images/brown-cell.png');
            this.load.image('red', 'images/red-cell.png');
            this.load.image('blue', 'images/blue-cell.png');
	        this.load.image('green', 'images/green-cell.png');
			this.load.image('empty', 'images/obstacle.png');

            this.load.image('levelCompleted', 'images/LEVEL-COMPLET.png');

	        this.load.image('button', 'images/button.jpg');

			this.load.image('buttonGenerate', 'images/buttonGenerateLevel.png');
			this.load.image('buttonReset', 'images/buttonResetLevel.png');
			this.load.image('buttonMenu', 'images/buttonMenu.png');

			this.load.image('soundSilent', 'images/sound off.png');
			this.load.image('soundLoud', 'images/sound on.png');

			this.load.bitmapFont('sego', 'fonts/segoeprbBlackTransparent.png', 'fonts/segoeprb.xml');

			this.load.audio('backgroundSound', 'audio/rain_song.mp3');
			this.load.audio('bubbling', 'audio/bubbling2.wav');

			this.load.image('rules', 'images/rules.png');

			this.load.image('notebook', 'images/notebook2.png');
			this.load.image('nextButton', 'images/NEXT-02.png');
			this.load.image('score', 'images/score-02-02.png');

			this.load.image('menuBackground', 'images/MENU-01.png');

			this.load.image('creditsBackground', 'images/Credits-01.png');

			this.load.image('credits', 'images/credits.png');
			this.load.image('level1', 'images/level 1.png');
			this.load.image('level2', 'images/level 2.png');
			this.load.image('tutorial', 'images/tutorial.png');


			var directions : Map<string, string> = new Map<string, string>();
			directions.set('left', 'doleva');
			directions.set('right', 'doprava');
			directions.set('up', 'nahoru');
			directions.set('down', 'dolu');

			var colors = ['black', 'red', 'blue', 'green', 'violet'];

			directions.forEach((value : string, key : string) => {
				for (let color of colors) {
					this.load.spritesheet(color + '-' + key, 'animations/' + color + '/' + value + '-startCell.png', 267, 267, 8, 0, 1);

					this.load.spritesheet(color + '-' + key + '-part1-t', 'animations/' + color + '/' + value + '-targetCell-part1.png', 267, 267, 4, 0, 1);
					this.load.spritesheet(color + '-' + key + '-part2-t', 'animations/' + color + '/' + value + '-targetCell-part2.png', 267, 267, 4, 0, 1);
				}
			});

		}

        create() {
            this.game.state.start('Menu', true, false);
        }

    }

}
