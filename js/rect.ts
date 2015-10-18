/// <reference path="references.ts"/>
class Rect {
    x : number;
    y : number;
    velocity : number;
    size : number;

    constructor(x : number, y : number, size : number) {
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
        this.size = size;
        this.velocity = Math.random() > 0.5 ? -1 : 1;
    }

    draw(context : CanvasRenderingContext2D) {
        context.fillRect(this.x, this.y, this.size, this.size);
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
