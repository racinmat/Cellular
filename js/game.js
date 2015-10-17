/// <reference path="references.ts"/>
var Game = (function () {
    function Game() {
        this.fps = 50;
        this.entities = [];
        this.canvas = document.getElementById("viewport");
        this.context = this.canvas.getContext("2d");
        this.mouseX = 0;
        this.mouseY = 0;
        var that = this;
        this.canvas.addEventListener('mousemove', function (evt) {
            var mousePos = that.getMousePos(that.canvas, evt);
            that.mouseX = mousePos.x;
            that.mouseY = mousePos.y;
        }, false);
    }
    Game.prototype.draw = function () {
        this.context.clearRect(0, 0, 640, 480);
        for (var i = 0; i < this.entities.length; i++) {
            this.entities[i].draw(this.context);
        }
        this.context.fillText(this.mouseX, 30, 30);
        this.context.fillText(this.mouseY, 30, 40);
    };
    Game.prototype.update = function () {
        for (var i = 0; i < this.entities.length; i++) {
            this.entities[i].update();
        }
    };
    Game.prototype.addRect = function () {
        this.entities.push(new Rect());
        console.log('adding rectangle');
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
    Game.prototype.getMousePos = function (canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    };
    return Game;
})();
//# sourceMappingURL=game.js.map