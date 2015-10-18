/// <reference path="references.ts"/>
class World {

    buildings : number[][];
    squareSize : number;

    constructor() {
        this.buildings = [];
        for (var i : number = 0; i < 10; i++) {
            this.buildings[i] = [];
            for (var j : number = 0; j < 10; j++) {
                this.buildings[i][j] = 0;
            }
        }
        for (var i : number = 0; i < 5; i++) {
            this.buildings[Math.floor(Math.random() * 10)][Math.floor(Math.random() * 10)] = 1; //číslo 1 je nějaký důl
        }
        this.squareSize = 60;
    }

    draw(context : CanvasRenderingContext2D) {
        var dark : boolean = true;
        for (var i : number = 0; i < this.buildings.length; i++) {
            if (this.buildings[i].length % 2 == 0) {
                dark = !dark;
            }
            for (var j : number = 0; j < this.buildings[i].length; j++) {
                var oldStyle : string = context.fillStyle;
                if (dark) {
                    context.fillStyle="#88888B";
                } else {
                    context.fillStyle="#C4C4C5";
                }
                dark = !dark;
                if(this.buildings[i][j] == 1) {
                    context.fillStyle="#4DB8FF";
                }
                new Rect(this.squareSize * i, this.squareSize * j, this.squareSize, this.squareSize).draw(context);
                context.fillStyle = oldStyle;
            }
        }
    }
}