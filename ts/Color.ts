/// <reference path="references.ts"/>

module FloodTactics {

    export enum Color {Red, Brown, Blue, Yellow};

    class ColorHelper {

        static getImage(color : Color) : string {
            switch (color) {
                case Color.Blue: return "blue";
                case Color.Yellow: return "yellow";
                case Color.Brown: return "brown";
                case Color.Red: return "red";
            }
        }

    }

}
