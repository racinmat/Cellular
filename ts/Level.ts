/// <reference path="references.ts"/>
declare var games: string[];	//proměnná je ze souboru game.php

module FloodTactics {

    export class Level extends AbstractLevel {

		//init se volá před createm
		init(levelName : string) {
			super.init(levelName);
		}

        create() {
	        super.create();

			var winningDescription = this.game.add.bitmapText(622, 515, 'sego', "Winning condition: " + this.winChecker.getDescription(), 28);
			winningDescription.maxWidth = 204;    //zalamování, aby byl text na více řádků, pokud je moc dlouhý

			var score = this.game.add.sprite(620, 770, 'score');
			score.scale.set(0.25);
			var content : string = String(this.game.score);
			var text = this.game.add.bitmapText(740, 780, 'sego', content, 28);


			var button = this.game.add.button(180, 640, 'button', () => {this.saveGame();}, this);
			button.scale.set(0.2);
			button.anchor.set(0.5);
			var style = { font: "25px Arial", fill: "#ffffff", align: "center" };
			var buttonText = this.game.add.text(0, 0, "save level", style);
			button.addChild(buttonText);
			buttonText.scale.set(5);
			buttonText.anchor.set(0.5);
        }

        update() {
	        super.update();
        }

	    saveGame() {
		    var json : string = this.grid.toJson();
		    Utils.download(json);
	    }

    }

}