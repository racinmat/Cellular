/// <reference path="references.ts"/>

module FloodTactics {

	export class SquareType {

		color : Color;
		power : number;
		directions : Phaser.Point[];

		constructor(color : Color, power : number, directions : Phaser.Point[]) {
			this.color = color;
			this.power = power;
			this.directions = directions;
		}

	}

}
