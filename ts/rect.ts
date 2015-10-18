/// <reference path="references.ts"/>
class Rect {
    x : number;
    y : number;
    height : number;
    width : number;

    constructor(x : number, y : number, height : number, width : number) {
        if(x == null) {
            this.x = Math.floor(Math.random() * (640 - 30));
        } else {
            this.x = x;
        }
        if(y == null) {
            this.y = Math.floor(Math.random() * (480 - 30));
        } else {
            this.y = y;
        }
        this.height = height;
        this.width = width;
    }

    draw(context : CanvasRenderingContext2D) {
        context.fillRect(this.x, this.y, this.height, this.width);
    }

    update() {

    }
}
