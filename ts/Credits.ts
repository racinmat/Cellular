/// <reference path="references.ts"/>

module FloodTactics {

    export class Credits extends Phaser.State {

        create() {
			var background = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'creditsBackground');
			background.scale.set(0.25);
			background.anchor.set(0.5);

        }

    }

}
