/// <reference path="references.ts"/>

module FloodTactics {

    export enum Color {Red, Brown, Blue, Yellow, Green, Black}

    export class ColorHelper {

        static toString(color : Color) : string {
            switch (color) {
                case Color.Blue: return "blue";
                case Color.Yellow: return "violet";
                case Color.Brown: return "black";
                case Color.Red: return "red";
	            case Color.Green: return "green";
				case Color.Black: return "empty";
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
