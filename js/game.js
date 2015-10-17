/// <reference path="references.ts"/>
var Game = (function () {
    function Game() {
        this.fps = 50;
        this.entities = [];
        this.canvas = document.getElementById("viewport");
        this.context = this.canvas.getContext("2d");
        this.mouseX = 0;
        this.mouseY = 0;
        this.commanderVelocity = 1;
        this.input = new Input(this.canvas, this.commanderVelocity);
        this.commanderPosition = this.input.getCommanderTarget();
    }
    Game.prototype.draw = function () {
        this.context.clearRect(0, 0, 640, 480);
        for (var i = 0; i < this.entities.length; i++) {
            this.entities[i].draw(this.context);
        }
        this.context.fillText('Commander', this.commanderPosition.x, this.commanderPosition.y);
    };
    Game.prototype.update = function () {
        for (var i = 0; i < this.entities.length; i++) {
            this.entities[i].update();
        }
        this.commanderPosition.x += this.commanderVelocity * sign(this.input.getCommanderTarget().x - this.commanderPosition.x);
        this.commanderPosition.y += this.commanderVelocity * sign(this.input.getCommanderTarget().y - this.commanderPosition.y);
        this.input.currentCommander = this.commanderPosition.clone();
    };
    Game.prototype.addRect = function () {
        this.entities.push(new Rect());
    };
    Game.prototype.run = function () {
        var _this = this;
        var loops = 0, skipTicks = 1000 / this.fps, nextGameTick = (new Date).getTime();
        return function () {
            loops = 0;
            while ((new Date).getTime() > nextGameTick) {
                _this.update();
                nextGameTick += skipTicks;
                loops++;
            }
            _this.draw();
        };
    };
    return Game;
})();
function sign(x) {
    return typeof x === 'number' ? x ? x < 0 ? -1 : 1 : x === x ? 0 : NaN : NaN;
}
//# sourceMappingURL=game.js.map