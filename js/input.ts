/// <reference path="references.ts"/>
class Input {

    private oldCommanderTarget : Point;
    private commanderTarget : Point;
    private keyboardCommanderVelocity : number;
    private canvas : HTMLCanvasElement;
    currentCommander : Point;

    constructor(canvas : HTMLCanvasElement, keyboardCommanderVelocity : number) {
        window.addEventListener("keydown", (e) => {this.loadKeyboardInput(e)}, false);
        window.addEventListener("click", (e) => {this.click(e)}, false);
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

    loadKeyboardInput(event) {
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

    click(event) {
        if(event.isTrusted) {
            var rect = this.canvas.getBoundingClientRect();
            this.commanderTarget.x = event.clientX - rect.left;
            this.commanderTarget.y = event.clientY - rect.top;
        }
    }
}

