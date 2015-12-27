/// <reference path="references.ts"/>

module FloodTactics {

    export class TutorialLevel extends AbstractLevel {

        create() {
	        super.create();
			//this.grid.deserialize(games["tutorial.json"]);	//proměnní, kterou jsem sem dal z PHPčka, které načetlo jsony
	        this.popupOne();
        }

        update() {
	        super.update();
        }

	    popupOne() {
		    var popup = this.game.add.sprite(400, 200, 'whiteBackground300x300');
		    popup.anchor.set(0.5);

		    var content : string = "Welcome to Flood Tactics.\n" +
			    "In every level, goal is written below grid.\n" +
			    "Now, goal is to change color of all squares to blue.";
		    var text = this.game.add.bitmapText(0, -30, 'arialBlack', content, 27);
		    text.maxWidth = 285;    //zalamování, aby byl text na více řádků, pokud je moc dlouhý
			text.anchor.set(0.5);
			popup.addChild(text);

		    var button = this.game.add.button(0, 90, 'button', () => {
			    popup.destroy(true); //destroyChildren = true;
			    this.popupTwo();
		    }, this);
		    button.scale.set(0.3);
		    button.anchor.set(0.5);
		    var style = { font: "30px Arial", fill: "#000000", align: "center" };
		    var buttonText = this.game.add.text(0, 0, "Next", style);
		    buttonText.scale.set(4);
		    buttonText.anchor.set(0.5);
			button.addChild(buttonText);

		    popup.addChild(button);

			//var tween = this.game.add.tween(this.winningDescription.scale);
			//tween.to( { x: 1.05, y: 1.05 }, 1000, Phaser.Easing.Bounce.InOut, true, 1, true, true);
	    }

	    popupTwo() {
		    var popup = this.game.add.sprite(300, 200, 'whiteBackground300x360');
		    popup.anchor.set(0.5);

		    var content : string = "Here are flooding rules.\n" +
			    "Every color is able to absorb its neighbors, according to rules.\n" +
			    "In this scenario, blue spreads over brown and red, brown spreads over red and yellow, and so on.";
		    var text = this.game.add.bitmapText(0, -30, 'arialBlack', content, 27);
		    text.maxWidth = 285;    //zalamování, aby byl text na více řádků, pokud je moc dlouhý
		    text.anchor.set(0.5);
		    popup.addChild(text);

		    var button = this.game.add.button(0, 110, 'button', () => {
			    popup.destroy(true); //destroyChildren = true;
			    this.popupThree();
		    }, this);
		    button.scale.set(0.3);
		    button.anchor.set(0.5);
		    var style = { font: "30px Arial", fill: "#000000", align: "center" };
		    var buttonText = this.game.add.text(0, 0, "Next", style);
		    buttonText.scale.set(4);
		    buttonText.anchor.set(0.5);
		    button.addChild(buttonText);

		    popup.addChild(button);


			//var tween = this.game.add.tween(this.grid.rules.scale);
			//tween.to( { x: 1.05, y: 1.05 }, 1000, Phaser.Easing.Bounce.InOut, true, 1, true, true);
	    }

	    popupThree() {
		    var popup = this.game.add.sprite(600, 500, 'whiteBackground300x300');
		    popup.anchor.set(0.5);

		    var content : string = "Lets see, how flooding works.\n" +
			    "Here we have blue square.\n" +
			    "It will flood over red and brown, but not over green and yellow.\n" +
				"Click on the blue square.";
		    var text = this.game.add.bitmapText(0, -30, 'arialBlack', content, 27);
		    text.maxWidth = 285;    //zalamování, aby byl text na více řádků, pokud je moc dlouhý
		    text.anchor.set(0.5);
		    popup.addChild(text);

		    var button = this.game.add.button(0, 90, 'button', () => {
			    popup.destroy(true); //destroyChildren = true;
		    }, this);
		    button.scale.set(0.3);
		    button.anchor.set(0.5);
		    var style = { font: "30px Arial", fill: "#000000", align: "center" };
		    var buttonText = this.game.add.text(0, 0, "Next", style);
		    buttonText.scale.set(4);
		    buttonText.anchor.set(0.5);
		    button.addChild(buttonText);

		    popup.addChild(button);

			this.grid.onClick.push((square : Square) => {
				if(square.getColor() == Color.Blue) {
					this.popupFour();
					return true;
				}
				return false;
			});
	    }

		popupFour() {
			var popup = this.game.add.sprite(600, 500, 'whiteBackground300x360');
			popup.anchor.set(0.5);

			var content : string = "Well done. As you see, now you have 3 blue squares.\n" +
				"But green and yellow squares are not changed.\n" +
				"To get rid of green, look at the table of rules on the right.\n" +
				"Green can be flooded by red and yellow.\n" +
				"Click any yellow square next to green one.";
			var text = this.game.add.bitmapText(0, -30, 'arialBlack', content, 27);
			text.maxWidth = 285;    //zalamování, aby byl text na více řádků, pokud je moc dlouhý
			text.anchor.set(0.5);
			popup.addChild(text);

			var button = this.game.add.button(0, 140, 'button', () => {
				popup.destroy(true); //destroyChildren = true;
			}, this);
			button.scale.set(0.3);
			button.anchor.set(0.5);
			var style = { font: "30px Arial", fill: "#000000", align: "center" };
			var buttonText = this.game.add.text(0, 0, "Next", style);
			buttonText.scale.set(4);
			buttonText.anchor.set(0.5);
			button.addChild(buttonText);

			popup.addChild(button);

			this.grid.onClick.push((square : Square) => {
				var pos : Phaser.Point = square.getGridPosition();
				var yellowNeighborOfGreen : boolean = (pos.x == 3 && pos.y == 1) || (pos.x == 3 && pos.y == 3) || (pos.x == 4 && pos.y == 2);	//nějaký žlutý soused zeléného čtverce
				yellowNeighborOfGreen = yellowNeighborOfGreen && square.getColor() == Color.Yellow;
				if(yellowNeighborOfGreen) {
					this.popupFive();
				    return true;
				}
				return false;
			});
		}

		popupFive() {
			var popup = this.game.add.sprite(600, 500, 'whiteBackground300x360');
			popup.anchor.set(0.5);

			var content : string = "Well done. Now you have only blue and yellow colors, and brown color in corner.\n" +
				"To get rid of yellow all yellow squares, you have to flood brown or red color.\n" +
				"Green can be flooded by red and yellow.\n" +
				"Click the brown square in corner.";
			var text = this.game.add.bitmapText(0, -30, 'arialBlack', content, 27);
			text.maxWidth = 285;    //zalamování, aby byl text na více řádků, pokud je moc dlouhý
			text.anchor.set(0.5);
			popup.addChild(text);

			var button = this.game.add.button(0, 140, 'button', () => {
				popup.destroy(true); //destroyChildren = true;
			}, this);
			button.scale.set(0.3);
			button.anchor.set(0.5);
			var style = { font: "30px Arial", fill: "#000000", align: "center" };
			var buttonText = this.game.add.text(0, 0, "Next", style);
			buttonText.scale.set(4);
			buttonText.anchor.set(0.5);
			button.addChild(buttonText);

			popup.addChild(button);

			this.grid.onClick.push((square : Square) => {
				if(square.getColor() == Color.Brown) {
					this.popupSix();
					return true;
				}
				return false;
			});
		}

		popupSix() {
			var popup = this.game.add.sprite(600, 500, 'whiteBackground300x360');
			popup.anchor.set(0.5);

			var content : string = "Well done. As you can see, brown floods over yellow and blue floods over brown.\n" +
				"With these rules (visualized on the right) in mind, completing the level should be piece of cake.\n" +
				"Level is completed, when all squares are blue (as written under the grid).";
			var text = this.game.add.bitmapText(0, -30, 'arialBlack', content, 27);
			text.maxWidth = 285;    //zalamování, aby byl text na více řádků, pokud je moc dlouhý
			text.anchor.set(0.5);
			popup.addChild(text);

			var button = this.game.add.button(0, 140, 'button', () => {
				popup.destroy(true); //destroyChildren = true;
			}, this);
			button.scale.set(0.3);
			button.anchor.set(0.5);
			var style = {font : "30px Arial", fill : "#000000", align : "center"};
			var buttonText = this.game.add.text(0, 0, "Next", style);
			buttonText.scale.set(4);
			buttonText.anchor.set(0.5);
			button.addChild(buttonText);

			popup.addChild(button);

		}
    }

}