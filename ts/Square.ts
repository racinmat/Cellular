/// <reference path="references.ts"/>

module FloodTactics {

	export class Square extends Phaser.Sprite {

		private grid : Grid;
		private gridPosition : Phaser.Point;
		private color : Color;
		private power : number;
		private directions : Phaser.Point[];
		private max : Phaser.Point;
		private number : number;
		private text : Phaser.BitmapText;
		private showNumber : boolean;

		constructor(game : Phaser.Game, x : number, y : number, grid : Grid, position : Phaser.Point, power : number, directions : Phaser.Point[], max : Phaser.Point, color : Color, number : number) {
			super(game, x, y, ColorHelper.toString(color), 0);
			this.grid = grid;
			this.gridPosition = position;
			this.color = color;
			this.power = power;
			this.directions = directions;
			this.max = max;
			this.number = number;

			this.showNumber = false;    //určuje, zda se vypíše číslo či ne

			this.inputEnabled = true;
			this.game.add.existing(this);

			var clicked = (square : Square) => {
				//menší hack?, abych rozlišil, jakým tlačítkem se kliknulo
				var leftButton : Phaser.DeviceButton = this.game.input.activePointer.leftButton;    //nechápu proč, ale i když je v typescriptu napsáno, že to vrací boolean, tak to ve skutečnosti vrací objekt Phaser.DeviceButton
				var rightButton : Phaser.DeviceButton = this.game.input.activePointer.rightButton;
				if(leftButton.isDown) {
					square.expand();
				} else if(rightButton.isDown) {
					square.flood();
				}
			};

			this.events.onInputDown.add(clicked, this);

			this.anchor.setTo(0.5, 0.5);

			if(this.showNumber) {
				this.text = this.game.add.bitmapText(x, y, 'arial', String(number), 40);
				this.text.anchor.setTo(0.5, 0.5);
			}
		}

		flood() : void {
			this.decrementNumber();
			this.grid.flood(this);
		}

		expand() : void {
			this.decrementNumber();
			this.grid.expand(this);
		}

		getNeighborPoints() : Phaser.Point[] {
			var neighbors : Phaser.Point[] = [];
			for(var direction of this.directions) {
				for(var i = 1; i <= this.power; i++) {
					var x = this.gridPosition.x + i * direction.x;
					var y = this.gridPosition.y + i * direction.y;
					if(x >= 0 && y >= 0 && x <= this.max.x && y <= this.max.y) {
						neighbors.push(new Phaser.Point(x, y));
					}
				}
			}
			return neighbors;
		}

		public setColor(color : Color) {
			this.color = color;
			this.key = ColorHelper.toString(color);
			this.loadTexture(this.key);
		}

		public getColor() : Color {
			return this.color;
		}

		public getNumber() : number {
			return this.number;
		}

		public decrementNumber() {
			if(this.number > 0) {
				this.number--;
				if(this.showNumber) {
					this.text.setText(String(this.number));
				}
			}
		}
	}

}
