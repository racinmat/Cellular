/// <reference path="references.ts"/>

module FloodTactics {

    export enum Color {Red, Brown, Blue, Yellow};

    export class ColorHelper {

        static getImage(color : Color) : string {
            switch (color) {
                case Color.Blue: return "blue";
                case Color.Yellow: return "yellow";
                case Color.Brown: return "brown";
                case Color.Red: return "red";
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