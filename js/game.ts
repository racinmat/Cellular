/// <reference path="references.ts"/>
class Game {
    fps : number;
    entities : Rect[];
    canvas : HTMLCanvasElement;
    context : CanvasRenderingContext2D;
    mouseX : number;
    mouseY : number;
    input : Input;
    commanderPosition : Point;
    commanderVelocity : number;
    minions : number[];
    world : World;

    constructor() {
        this.fps = 50;
        this.entities = [];
        this.canvas = <HTMLCanvasElement> document.getElementById("viewport");
        this.context = this.canvas.getContext("2d");
        this.mouseX = 0;
        this.mouseY = 0;
        this.commanderVelocity = 1;
        this.input = new Input(this.canvas, this.commanderVelocity);
        this.commanderPosition = this.input.getCommanderTarget();
        this.minions = [5, 4, 3];   //počet minionů, každý druh je jedno číslo v poli
        this.world = new World();
    }

    draw() {
        this.context.clearRect(0, 0, 640, 480);
        this.world.draw(this.context);

        for (var i=0; i < this.entities.length; i++) {
            this.entities[i].draw(this.context);
        }
        this.context.fillText('Commander', this.commanderPosition.x, this.commanderPosition.y);
    }

    update() {
        for (var i = 0; i < this.entities.length; i++) {
            this.entities[i].update();
        }
        this.commanderPosition.x += this.commanderVelocity * sign(this.input.getCommanderTarget().x - this.commanderPosition.x);
        this.commanderPosition.y += this.commanderVelocity * sign(this.input.getCommanderTarget().y - this.commanderPosition.y);
        this.input.currentCommander = this.commanderPosition.clone();
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

}

function sign(x) {
    return typeof x === 'number' ? x ? x < 0 ? -1 : 1 : x === x ? 0 : NaN : NaN;
}