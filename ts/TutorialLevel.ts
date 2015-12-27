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
		    //var popup = this.game.add.sprite(400, 200, 'whiteBackground300x300');
			var popup = this.game.add.sprite(400, 200, 'whiteBackground');
		    popup.scale.setTo(1.5);
		    popup.anchor.set(0.5);

		    var content : string = "Welcome to Flood Tactics.\n" +
			    "In every level, goal is written below grid.\n" +
			    "Now, goal is to change color of all squares to blue.";
			var text = this.game.add.bitmapText(0, -30, 'arialBlack', content, 18);
		    //var text = this.game.add.bitmapText(0, -30, 'arialBlack', content, 27);
		    text.maxWidth = 190;    //zalamování, aby byl text na více řádků, pokud je moc dlouhý
			text.anchor.set(0.5);
			popup.addChild(text);

		    var button = this.game.add.button(0, 60, 'button', () => {
		    //var button = this.game.add.button(0, 110, 'button', () => {
			    popup.destroy(true); //destroyChildren = true;
			    this.popupTwo();
		    }, this);
		    button.scale.set(0.2);
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
		    var popup = this.game.add.sprite(300, 200, 'whiteBackground');
		    popup.scale.setTo(1.5, 1.8);
		    popup.anchor.set(0.5);

		    var content : string = "Here are flooding rules.\n" +
			    "Every color is able to absorb its neighbors, according to rules.\n" +
			    "In this scenario, blue spreads over brown and red, brown spreads over red and yellow, and so on.";
		    var text = this.game.add.bitmapText(0, -30, 'arialBlack', content, 27);
		    text.maxWidth = 190;    //zalamování, aby byl text na více řádků, pokud je moc dlouhý
			text.scale.set(1, 0.833333);
		    text.anchor.set(0.5);
		    popup.addChild(text);

		    var button = this.game.add.button(0, 70, 'button', () => {
			    popup.destroy(true); //destroyChildren = true;
			    this.popupThree();
		    }, this);
		    button.scale.set(0.2, 0.16666);
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
		    var popup = this.game.add.sprite(600, 500, 'whiteBackground');
		    popup.scale.setTo(1.5);
		    popup.anchor.set(0.5);

		    var content : string = "Lets see, how flooding works.\n" +
			    "Here we have blue square.\n" +
			    "It will flood over red and brown, but not over green and yellow.\n" +
				"Click on the blue square.";
		    var text = this.game.add.bitmapText(0, -30, 'arialBlack', content, 20);
		    text.maxWidth = 190;    //zalamování, aby byl text na více řádků, pokud je moc dlouhý
		    text.anchor.set(0.5);
		    popup.addChild(text);

		    var button = this.game.add.button(0, 60, 'button', () => {
			    popup.destroy(true); //destroyChildren = true;
		    }, this);
		    button.scale.set(0.2);
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
			var popup = this.game.add.sprite(600, 500, 'whiteBackground');
			popup.scale.setTo(1.7);
			popup.anchor.set(0.5);

			var content : string = "Well done. As you see, now you have 3 blue squares.\n" +
				"But green and yellow squares are not changed.\n" +
				"To get rid of green, look at the table of rules on the right.\n" +
				"Green can be flooded by red and yellow.\n" +
				"Click any yellow square next to green one.";
			var text = this.game.add.bitmapText(0, -30, 'arialBlack', content, 20);
			text.maxWidth = 190;    //zalamování, aby byl text na více řádků, pokud je moc dlouhý
			text.anchor.set(0.5);
			popup.addChild(text);

			var button = this.game.add.button(0, 60, 'button', () => {
				popup.destroy(true); //destroyChildren = true;
			}, this);
			button.scale.set(0.2);
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
			var popup = this.game.add.sprite(600, 500, 'whiteBackground');
			popup.scale.setTo(1.5);
			popup.anchor.set(0.5);

			var content : string = "Well done. Now you have only blue and yellow colors.\n" +
				"But green and yellow squares are not changed.\n" +
				"To get rid of green, look at the table of rules on the right.\n" +
				"Green can be flooded by red and yellow.\n" +
				"Click any yellow square next to green one.";
			var text = this.game.add.bitmapText(0, -30, 'arialBlack', content, 20);
			text.maxWidth = 190;    //zalamování, aby byl text na více řádků, pokud je moc dlouhý
			text.anchor.set(0.5);
			popup.addChild(text);

			var button = this.game.add.button(0, 60, 'button', () => {
				popup.destroy(true); //destroyChildren = true;
			}, this);
			button.scale.set(0.2);
			button.anchor.set(0.5);
			var style = { font: "30px Arial", fill: "#000000", align: "center" };
			var buttonText = this.game.add.text(0, 0, "Next", style);
			buttonText.scale.set(4);
			buttonText.anchor.set(0.5);
			button.addChild(buttonText);

			popup.addChild(button);
		}

    }

}