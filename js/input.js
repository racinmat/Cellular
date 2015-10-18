/// <reference path="references.ts"/>
var Input = (function () {
    function Input(canvas, keyboardCommanderVelocity) {
        var _this = this;
        window.addEventListener("keydown", function (e) {
            _this.loadCommanderKeyboardInput(e);
        }, false);
        window.addEventListener("click", function (e) {
            _this.loadCommanderClick(e);
        }, false);
        this.canvas = canvas;
        this.keyboardCommanderVelocity = keyboardCommanderVelocity;
        this.commanderTarget = Input.getMiddleOfScreenPoint(canvas);
        this.oldCommanderTarget = Input.getMiddleOfScreenPoint(canvas);
    }
    Input.getMiddleOfScreenPoint = function (canvas) {
        return new Point(canvas.width / 2, canvas.height / 2);
    };
    Input.prototype.getCommanderTarget = function () {
        return this.commanderTarget.clone();
    };
    Input.prototype.loadCommanderKeyboardInput = function (event) {
        this.commanderTarget = this.currentCommander.clone(); //kvůli tomu, aby klávesnice nemusela "přervat" vstup z myši
        console.log(this.commanderTarget);
        switch (event.keyCode) {
            case 37:
                this.commanderTarget.x -= this.keyboardCommanderVelocity;
                break;
            case 38:
                this.commanderTarget.y -= this.keyboardCommanderVelocity;
                break;
            case 39:
                this.commanderTarget.x += this.keyboardCommanderVelocity;
                break;
            case 40:
                this.commanderTarget.y += this.keyboardCommanderVelocity;
                break;
        }
        this.oldCommanderTarget = this.commanderTarget.clone();
    };
    Input.prototype.loadCommanderClick = function (event) {
        if (event.isTrusted) {
            var point = this.loadClick();
            if (point.y > 100 && point.x < 600) {
                this.commanderTarget.x = point.x;
                this.commanderTarget.y = point.y;
            }
        }
    };
    Input.prototype.loadClick = function () {
        var rect = this.canvas.getBoundingClientRect();
        var x = Math.min(event.clientX - rect.left, 1024);
        var y = Math.min(event.clientY - rect.top, 768);
        return new Point(x, y);
    };
    //vrací číslo boxu
    Input.prototype.minionBoxClicked = function () {
        var point = this.loadClick();
        //todo: dodělat
    };
    return Input;
})();
//# sourceMappingURL=input.js.map