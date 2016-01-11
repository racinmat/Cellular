/// <reference path="references.ts"/>
declare var games: string[];	//proměnná je ze souboru game.php

module FloodTactics {

    export class TutorialLevel extends AbstractLevel {

		//init se volá před createm
		init(levelName : string) {
			super.init(levelName);
			this.grid = new Grid(this.game, 38, 47, 'backgroundSquare');
			if(levelName != undefined) {
				this.grid.deserialize(games[levelName]);
			}
		}

        create() {
	        super.create();
			var notebook = this.game.add.sprite(582, 476, 'notebook');
			notebook.scale.set(0.25);
	        this.popupOne();
        }

        update() {
	        super.update();
        }

	    popupOne() {
		    var content : string = "Welcome to Cellular!\n" +
		        "Your goal is to help a particular cell to dominate the field.\n" +
			    "In every level, we will tell you which cell needs your help.\n" +
			    "Now, the blue cell needs your help.";
		    var text = this.game.add.bitmapText(622, 513, 'sego', content, 28);
		    text.maxWidth = 204;    //zalamování, aby byl text na více řádků, pokud je moc dlouhý

		    var button = this.game.add.button(620, 770, 'nextButton', () => {
			    text.destroy(true); //destroyChildren = true;
				button.destroy(true); //destroyChildren = true;
			    this.popupTwo();
		    }, this);
		    button.scale.set(0.25);
	    }

	    popupTwo() {
		    var content : string = "Here you can see the capability of each cell.\n" +
			    "Every cell is able to absorb other cells, but not all of them!.\n" +
			    "In this scenario, blue spreads over brown and red, brown spreads over red and yellow, and so on.";
		    var text = this.game.add.bitmapText(622, 513, 'sego', content, 28);
		    text.maxWidth = 204;    //zalamování, aby byl text na více řádků, pokud je moc dlouhý

			var button = this.game.add.button(620, 770, 'nextButton', () => {
				text.destroy(true); //destroyChildren = true;
				button.destroy(true); //destroyChildren = true;
				this.popupThree();
			}, this);
			button.scale.set(0.25);
	    }

	    popupThree() {
		    var content : string = "Lets see, how absorption works!\n" +
			    "Here we have blue cell.\n" +
			    "It will absorb all red and brown cells next to it, but green and \n" +
				"yellow cells will remain unabsorbed. Now, click on the blue cell.";
			var text = this.game.add.bitmapText(622, 513, 'sego', content, 28);
			text.maxWidth = 204;    //zalamování, aby byl text na více řádků, pokud je moc dlouhý

			var button = this.game.add.button(620, 770, 'nextButton', () => {
				text.destroy(true); //destroyChildren = true;
				button.destroy(true); //destroyChildren = true;
		    }, this);
			button.scale.set(0.25);

			this.grid.onClick.push((square : Square) => {
				if(square.getColor() == Color.Blue) {
					this.popupFour();
					return true;
				}
				return false;
			});
	    }

		popupFour() {
			var content : string = "Well done. As you see, now you have 3 blue cells.\n" +
				"But green and yellow cells are still there.\n" +
				"To get rid of green, look at the table of rules on the right.\n" +
				"Green cells can be absorbed by red and yellow.\n" +
				"Try clicking  on any yellow cell next to a green one.";
			var text = this.game.add.bitmapText(622, 513, 'sego', content, 28);
			text.maxWidth = 204;    //zalamování, aby byl text na více řádků, pokud je moc dlouhý

			var button = this.game.add.button(620, 770, 'nextButton', () => {
				text.destroy(true); //destroyChildren = true;
				button.destroy(true); //destroyChildren = true;
			}, this);
			button.scale.set(0.25);

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
			var content : string = "Well done. Now you have only blue and yellow cells, and brown cell in the corner.\n" +
				"To get rid of all yellow cells, you have to stimulate brown or red cells.\n" +
				"Now, click on the brown cell.";
			var text = this.game.add.bitmapText(622, 513, 'sego', content, 28);
			text.maxWidth = 204;    //zalamování, aby byl text na více řádků, pokud je moc dlouhý

			var button = this.game.add.button(620, 770, 'nextButton', () => {
				text.destroy(true); //destroyChildren = true;
				button.destroy(true); //destroyChildren = true;
			}, this);
			button.scale.set(0.25);

			this.grid.onClick.push((square : Square) => {
				if(square.getColor() == Color.Brown) {
					this.popupSix();
					return true;
				}
				return false;
			});
		}

		popupSix() {
			var content : string = "Well done. As you can see, brown cell absorbs yellow and blue absorbs brown.\n" +
				"With these rules (visualized on the right) in mind, completing the level should be piece of cake.\n" +
				"Remember, level is completed, when all cells are blue.";
			var text = this.game.add.bitmapText(622, 513, 'sego', content, 28);
			text.maxWidth = 204;    //zalamování, aby byl text na více řádků, pokud je moc dlouhý

			var button = this.game.add.button(620, 770, 'nextButton', () => {
				text.destroy(true); //destroyChildren = true;
				button.destroy(true); //destroyChildren = true;
			}, this);
			button.scale.set(0.25);

		}
    }

}