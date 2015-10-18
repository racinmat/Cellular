/// <reference path="references.ts"/>
var Game = (function () {
    function Game() {
        var _this = this;
        this.fps = 50;
        this.entities = [];
        this.canvas = document.getElementById("viewport");
        this.context = this.canvas.getContext("2d");
        this.mouseX = 0;
        this.mouseY = 0;
        this.canvas.addEventListener('mousemove', function (evt) {
            var mousePos = Game.getMousePos(_this.canvas, evt);
            _this.mouseX = mousePos.x;
            _this.mouseY = mousePos.y;
        }, false);
        this.input = new Input();
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
    Game.getMousePos = function (canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    };
    return Game;
})();
/// <reference path="references.ts"/>
var game = new Game();
var run = (function () {
    return game.run();
})();
// Add some moving rectangles
var i = 20;
while (i--) {
    game.addRect();
}
(function () {
    var onEachFrame;
    if (window.webkitRequestAnimationFrame) {
        onEachFrame = function (cb) {
            var _cb = function () {
                cb();
                window.webkitRequestAnimationFrame(_cb);
            };
            _cb();
        };
    }
    else if (window.mozRequestAnimationFrame) {
        onEachFrame = function (cb) {
            var _cb = function () {
                cb();
                window.mozRequestAnimationFrame(_cb);
            };
            _cb();
        };
    }
    else {
        onEachFrame = function (cb) {
            setInterval(cb, 1000 / game.fps);
        };
    }
    window.onEachFrame = onEachFrame;
})();
window.onEachFrame(run);
/// <reference path="references.ts"/>
var Rect = (function () {
    function Rect() {
        this.x = Math.floor(Math.random() * (640 - 30));
        this.y = Math.floor(Math.random() * (480 - 30));
        this.velocity = Math.random() > 0.5 ? -1 : 1;
    }
    Rect.prototype.draw = function (context) {
        context.fillRect(this.x, this.y, 30, 30);
    };
    Rect.prototype.update = function () {
        if (this.y < 0) {
            this.velocity = 10;
        }
        else if (this.y > 450) {
            this.velocity = -5;
        }
        this.y += this.velocity;
    };
    return Rect;
})();
/// <reference path="references.ts"/>
var Input = (function () {
    function Input() {
        var _this = this;
        console.log('input loaded');
        window.addEventListener("keypress", function (e) {
            _this.loadKeyboardInput(e);
        }, false);
        window.addEventListener("keydown", checkKeyPressed, false);
    }
    Input.prototype.getCommanderTarget = function () {
    };
    Input.prototype.loadKeyboardInput = function (event) {
        console.log(event);
    };
    return Input;
})();
function checkKeyPressed(e) {
    console.log("The 'a' key is pressed.");
}
/// <reference path="game.ts" />
/// <reference path="main.ts" />
/// <reference path="rect.ts" />
/// <reference path="input.ts" />
//# sourceMappingURL=main.js.world