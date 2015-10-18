/// <reference path="references.ts"/>
class Rect {
    x : number;
    y : number;
    velocity : number;
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
        this.velocity = Math.random() > 0.5 ? -1 : 1;
    }

    draw(context : CanvasRenderingContext2D) {
        context.fillRect(this.x, this.y, this.height, this.width);
    }

    update() {
        if (this.y < 0) {
            this.velocity = 10;
        } else if (this.y > 450) {
            this.velocity = -5;
        }

        this.y += this.velocity;
    }
}
