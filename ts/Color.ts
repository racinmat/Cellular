/// <reference path="references.ts"/>

module FloodTactics {

    export enum Color {Red, Black, Blue, Violet, Green, Transparent}

    export class ColorHelper {

        static toString(color : Color) : string {
            switch (color) {
                case Color.Blue: return "blue";
                case Color.Violet: return "violet";
                case Color.Black: return "black";
                case Color.Red: return "red";
	            case Color.Green: return "green";
				case Color.Transparent: return "empty";
            }
        }

        static getRandom() : Color {
            var keys = Object.keys(Color),
                index = Math.floor(Math.random() * keys.length),
                k = keys[index];
            if (typeof Color[k] === 'number')
                return Color[k];
            return parseInt(k, 10);
        }
    }

}
