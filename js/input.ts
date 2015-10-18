/// <reference path="references.ts"/>
class Input {

    private oldCommanderTarget : Point;
    private commanderTarget : Point;
    private keyboardCommanderVelocity : number;
    private canvas : HTMLCanvasElement;
    currentCommander : Point;

    constructor(canvas : HTMLCanvasElement, keyboardCommanderVelocity : number) {
        window.addEventListener("keydown", (e) => {this.loadCommanderKeyboardInput(e)}, false);
        window.addEventListener("click", (e) => {this.loadCommanderClick(e)}, false);
        this.canvas = canvas;
        this.keyboardCommanderVelocity = keyboardCommanderVelocity;
        this.commanderTarget = this.getMiddleOfScreenPoint(canvas);
        this.oldCommanderTarget = this.getMiddleOfScreenPoint(canvas);
    }

    private getMiddleOfScreenPoint(canvas : HTMLCanvasElement) : Point {
        return new Point(canvas.width / 2, canvas.height / 2);
    }

    getCommanderTarget() : Point {
        return this.commanderTarget.clone();
    }

    loadCommanderKeyboardInput(event) {
        this.commanderTarget = this.currentCommander.clone(); //kvůli tomu, aby klávesnice nemusela "přervat" vstup z myši
        console.log(this.commanderTarget);
        switch(event.keyCode) {
            case 37:    // left key pressed
                this.commanderTarget.x -= this.keyboardCommanderVelocity;
                break;
            case 38:    // up key pressed
                this.commanderTarget.y -= this.keyboardCommanderVelocity;
                break;
            case 39:    // right key pressed
                this.commanderTarget.x += this.keyboardCommanderVelocity;
                break;
            case 40:    // down key pressed
                this.commanderTarget.y += this.keyboardCommanderVelocity;
                break;
        }
        this.oldCommanderTarget = this.commanderTarget.clone();
    }

    loadCommanderClick(event) {
        if(event.isTrusted) {
            var rect = this.canvas.getBoundingClientRect();
            var x : number = Math.min(event.clientX - rect.left, 1024);
            var y : number = Math.min(event.clientY - rect.top, 768);
        }
        if (y > 100 && x < 600) { //podmínka, že je kliknuto dovnitř herní plochy
            this.commanderTarget.x = x;
            this.commanderTarget.y = y;
        }
    }
}

