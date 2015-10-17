class Rect {
    x : number;
    y : number;
    velocity : number;

    constructor() {
        this.x = Math.floor(Math.random() * (640 - 30));
        this.y = Math.floor(Math.random() * (480 - 30));
        this.velocity = Math.random() > 0.5 ? -1 : 1;
    }

    draw(context) {
        context.fillRect(this.x, this.y, 30, 30);
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
