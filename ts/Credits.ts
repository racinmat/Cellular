/// <reference path="references.ts"/>

module FloodTactics {

    export class Credits extends Phaser.State {

        create() {
			var background = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'creditsBackground');
			background.anchor.set(0.5);
			background.scale.set(0.25);

			var content : string = "Matěj Račinský \n" +
				" - Main programmer\n" +
				" - Level designer\n" +
				"Michal Bureš \n" +
				" - Game designer  \n" +
				" - Programmer \n" +
				"Pavel Liška  \n" +
				" - Graphic designer \n" +
				" - Animator \n";
			var text = this.game.add.bitmapText(300, 200, 'sego', content, 40);
		}

    }

}
