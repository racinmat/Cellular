class Game {
    fps : number;
    entities : Rect[];
    canvas;
    context;
    mouseX : number;
    mouseY : number;

    constructor() {
        this.fps = 50;
        this.entities = [];
        this.canvas = document.getElementById("viewport");
        this.context = this.canvas.getContext("2d");
        this.mouseX = 0;
        this.mouseY = 0;
        var that = this;
        this.canvas.addEventListener('mousemove', function(evt) {
            var mousePos = getMousePos(that.canvas, evt);
            that.mouseX = mousePos.x;
            that.mouseY = mousePos.y;
        }, false);
    }

    draw() {
        this.context.clearRect(0, 0, 640, 480);

        for (var i=0; i < this.entities.length; i++) {
            this.entities[i].draw(this.context);
        }
        this.context.fillText(this.mouseX,  30, 30);
        this.context.fillText(this.mouseY,  30, 40);
    }

    update() {
        for (var i = 0; i < this.entities.length; i++) {
            this.entities[i].update();
        }
    }

    addRect() {
        this.entities.push(new Rect());
        console.log('adding rectangle');
    }

    run() {
        var loops = 0, skipTicks = 1000 / this.fps,
            nextGameTick = (new Date).getTime();

        return () => {
            loops = 0;

            while ((new Date).getTime() > nextGameTick) {
                this.update();
                nextGameTick += skipTicks;
                loops++;
            }

            this.draw();
        };
    }

    start() {
        setInterval(() => {this.run()}, 0);
    }

}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

