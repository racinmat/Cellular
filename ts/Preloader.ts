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
            this.load.image('levelCompleted', 'images/level_completed.jpg');

	        this.load.image('button', 'images/button.jpg');

			this.load.image('buttonGenerate', 'images/buttonGenerateLevel.png');
			this.load.image('buttonReset', 'images/buttonResetLevel.png');
			this.load.image('buttonMenu', 'images/buttonMenu.png');

	        this.load.image('whiteBackground', 'images/whiteBackground.png');
			this.load.image('whiteBackground300x300', 'images/whiteBackground300x300.png');
			this.load.image('whiteBackground300x360', 'images/whiteBackground300x360.png');
			this.load.image('soundSilent', 'images/sound off.png');
			this.load.image('soundLoud', 'images/sound on.png');
            this.load.bitmapFont('arial', 'fonts/arial.png', 'fonts/arial.xml');
	        this.load.bitmapFont('arialBlack', 'fonts/arialBlack.png', 'fonts/arial.xml');
			this.load.audio('backgroundSound', 'audio/rain_song.mp3');
			this.load.audio('bubbling', 'audio/bubbling2.wav');

			this.load.image('rules', 'images/rules.png');

			this.load.image('menuBackground', 'images/MENU-01.png');

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
					this.load.spritesheet(color + '-' + key, 'animations/' + color + '/' + value + '-startCell.png', 267, 267);
					//this.load.spritesheet(color + '-' + key + '-t', 'animations/' + color + '/' + value + '-targetCell.png', 267, 267);

					//this.load.spritesheet(color + '-' + key + '-part1', 'animations/' + color + '/' + value + '-startCell-part1.png', 267, 267);
					this.load.spritesheet(color + '-' + key + '-part1-t', 'animations/' + color + '/' + value + '-targetCell-part1.png', 267, 267);
					//this.load.spritesheet(color + '-' + key + '-part2', 'animations/' + color + '/' + value + '-startCell-part2.png', 267, 267);
					this.load.spritesheet(color + '-' + key + '-part2-t', 'animations/' + color + '/' + value + '-targetCell-part2.png', 267, 267);
				}
			});

		}

        create() {
            this.game.state.start('Menu', true, false);
        }

    }

}
