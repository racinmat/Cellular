/// <reference path="references.ts"/>
var Input = (function () {
    function Input(canvas, keyboardCommanderVelocity) {
        var _this = this;
        window.addEventListener("keydown", function (e) {
            _this.loadKeyboardInput(e);
        }, false);
        window.addEventListener("click", function (e) {
            _this.click(e);
        }, false);
        this.canvas = canvas;
        this.keyboardCommanderVelocity = keyboardCommanderVelocity;
        this.commanderTarget = this.getMiddleOfScreenPoint(canvas);
        this.oldCommanderTarget = this.getMiddleOfScreenPoint(canvas);
    }
    Input.prototype.getMiddleOfScreenPoint = function (canvas) {
        return new Point(canvas.width / 2, canvas.height / 2);
    };
    Input.prototype.getCommanderTarget = function () {
        return this.commanderTarget.clone();
    };
    Input.prototype.loadKeyboardInput = function (event) {
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
    Input.prototype.click = function (event) {
        if (event.isTrusted) {
            var rect = this.canvas.getBoundingClientRect();
            this.commanderTarget.x = event.clientX - rect.left;
            this.commanderTarget.y = event.clientY - rect.top;
        }
    };
    return Input;
})();
//# sourceMappingURL=input.js.map