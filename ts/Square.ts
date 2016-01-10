/// <reference path="references.ts"/>

module FloodTactics {

	export class Square extends Phaser.Sprite {

		private grid : Grid;
		private gridPosition : Phaser.Point;
		private squareType : SquareType;
		private max : Phaser.Point;
		private number : number;
		private text : Phaser.BitmapText;
		private showNumber : boolean;

		constructor(game : Phaser.Game, x : number, y : number, grid : Grid, position : Phaser.Point, max : Phaser.Point, squareType : SquareType, number : number) {
			super(game, x, y, ColorHelper.toString(squareType.color), 0);
			this.grid = grid;
			this.gridPosition = position;
			this.squareType = squareType;
			this.max = max;
			this.number = number;
			this.initialize();
		}

		private initialize() : void {
			this.showNumber = false;    //určuje, zda se vypíše číslo či ne

			this.inputEnabled = true;
			this.game.add.existing(this);

			var clicked = (square : Square) => {
				var expand : boolean;
				var flood : boolean;

				if(this.game.device.desktop) {
					//menší hack?, abych rozlišil, jakým tlačítkem se kliknulo
					var leftButton : Phaser.DeviceButton = this.game.input.activePointer.leftButton;    //nechápu proč, ale i když je v typescriptu napsáno, že to vrací boolean, tak to ve skutečnosti vrací objekt Phaser.DeviceButton
					var rightButton : Phaser.DeviceButton = this.game.input.activePointer.rightButton;
					if(leftButton.isDown) {
						expand = true;
					} else if(rightButton.isDown) {
						flood = true;
					}
				} else {
					//mobilní zařízení mají zatím pouze expand, nemají flood
					expand = true;
				}

				if(expand) {
					square.expand();
					return;
				}

				if(flood) {
					square.flood();
					return;
				}
			};

			this.events.onInputDown.add(clicked, this);
			this.anchor.setTo(0.5, 0.5);

			if(this.showNumber) {
				this.text = this.game.add.bitmapText(this.x, this.y, 'arial', String(this.number), 40);
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
			for(var direction of this.squareType.directions) {
				for(var i = 1; i <= this.squareType.power; i++) {
					var x = this.gridPosition.x + i * direction.x;
					var y = this.gridPosition.y + i * direction.y;
					if(x >= 0 && y >= 0 && x <= this.max.x && y <= this.max.y) {
						neighbors.push(new Phaser.Point(x, y));
					}
				}
			}
			return neighbors;
		}

		public setSquareType(squareType : SquareType) {
			this.squareType = squareType;
			this.key = ColorHelper.toString(squareType.color);
			this.loadTexture(this.key);
			//this.scale.set(0.25);

		}

		public getSquareType() : SquareType {
			return this.squareType;
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

		//v budoucnu na natahování z jsonu
		deserialize(data) {
			this.number = data.number;
			this.setSquareType(data.squareType);
		}

		//v budoucnu na ukládání do jsonu
		serialize() {
			var data : any = {};
			data.number = this.number;
			data.squareType = this.squareType;
			return data;
		}

		getColor() : Color {
			return this.squareType.color;
		}

		public getGridPosition() : Phaser.Point {
			return this.gridPosition;
		}
	}

}
