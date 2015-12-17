/// <reference path="references.ts"/>

module FloodTactics {

    export class TutorialLevel extends AbstractLevel {

        create() {
	        super.create();
			this.grid.deserialize(games["tutorial.json"]);	//proměnní, kterou jsem sem dal z PHPčka, které načetlo jsony
	        this.popupOne();
        }

        update() {
	        super.update();
        }

	    popupOne() {
		    var popup = this.game.add.sprite(400, 200, 'whiteBackground');
		    popup.scale.setTo(1.5);
		    popup.anchor.set(0.5);

		    var content : string = "Welcome to Flood Tactics.\n" +
			    "In every level, goal is written below grid.\n" +
			    "Now, goal is to change color of all squares to blue.";      //zde udělat zvýraznění textu
		    //var text = this.game.add.text(0, 0, content, style);    //souřadnice relativně k parentovi
		    var text = this.game.add.bitmapText(0, -30, 'arialBlack', content, 18);
		    text.maxWidth = 190;    //zalamování, aby byl text na více řádků, pokud je moc dlouhý
			text.anchor.set(0.5);
			popup.addChild(text);

		    var button = this.game.add.button(0, 60, 'button', () => {
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
		    //var text = this.game.add.text(0, 0, content, style);    //souřadnice relativně k parentovi
		    var text = this.game.add.bitmapText(0, -30, 'arialBlack', content, 18);
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
		    var popup = this.game.add.sprite(400, 400, 'whiteBackground');
		    popup.scale.setTo(1.5);
		    popup.anchor.set(0.5);

		    var content : string = "Welcome to Flood Tactics.\n" +
			    "In every level, goal is written below grid.\n" +
			    "Now, it is to change color of all squares to blue.";      //zde udělat zvýraznění textu
		    //var text = this.game.add.text(0, 0, content, style);    //souřadnice relativně k parentovi
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