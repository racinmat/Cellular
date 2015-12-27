/// <reference path="references.ts"/>

module FloodTactics {

    export class Menu extends Phaser.State {

        create() {
	        //tutorial tlačítko
	        var button = this.game.add.button(400, 100, 'button', () => {this.game.state.start('TutorialLevel', true, false, 'tutorial.json');}, this);	//4. parametr je parametrem init funkce
	        button.scale.set(0.3);
	        button.anchor.set(0.5);
	        var style = { font: "25px Arial", fill: "#ffffff", align: "center" };
	        var buttonText = this.game.add.text(400, 100, "Tutorial", style);
	        buttonText.anchor.set(0.5);

			//random level 1 tlačítko
			var button = this.game.add.button(400, 200, 'button', () => {this.game.state.start('Level', true, false, 'level1.json'); }, this);
			button.scale.set(0.3);
			button.anchor.set(0.5);
			var style = { font: "25px Arial", fill: "#ffffff", align: "center" };
			var buttonText = this.game.add.text(400, 200, "Level 1", style);
			buttonText.anchor.set(0.5);

			//random level 2 tlačítko
			var button = this.game.add.button(400, 300, 'button', () => {this.game.state.start('Level', true, false, 'level2.json'); }, this);
			button.scale.set(0.3);
			button.anchor.set(0.5);
			var style = { font: "25px Arial", fill: "#ffffff", align: "center" };
			var buttonText = this.game.add.text(400, 300, "Level 2", style);
			buttonText.anchor.set(0.5);

	        //random level tlačítko
	        var button = this.game.add.button(400, 400, 'button', () => {this.game.state.start('Level', true, false);}, this);
	        button.scale.set(0.3);
	        button.anchor.set(0.5);
	        var style = { font: "25px Arial", fill: "#ffffff", align: "center" };
	        var buttonText = this.game.add.text(400, 400, "Random level", style);
	        buttonText.anchor.set(0.5);
        }

    }

}