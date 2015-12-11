/// <reference path="references.ts"/>
class Rect {
    x : number;
    y : number;
    height : number;
    width : number;

    constructor(x : number, y : number, height : number, width : number) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
    }

    draw(context : CanvasRenderingContext2D) {
        context.fillRect(this.x, this.y, this.height, this.width);
    }

    update() {

    }
}
