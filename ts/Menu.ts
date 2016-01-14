/// <reference path="references.ts"/>

module FloodTactics {

    export class Menu extends Phaser.State {

        create() {
			var background = this.game.add.sprite(0, 0, 'menuBackground');
			background.scale.set(0.25);

			var tutorialButton = this.game.add.button(313, 190, 'tutorial', () => {this.game.state.start('TutorialLevel', true, false, 'tutorial.json');}, this);	//4. parametr je parametrem init funkce
			tutorialButton.scale.set(0.25);

			var level1Button = this.game.add.button(313, 310, 'level1', () => {this.game.state.start('Level', true, false, 'level1.json'); }, this);	//4. parametr je parametrem init funkce
			level1Button.scale.set(0.25);

			var level2Button = this.game.add.button(313, 430, 'level2', () => {this.game.state.start('Level', true, false, 'level4.json'); }, this);	//4. parametr je parametrem init funkce
			level2Button.scale.set(0.25);

			var creditsButton = this.game.add.button(313, 550, 'credits', () => {this.game.state.start('Credits'); }, this);
			creditsButton.scale.set(0.25);
        }

    }

}
