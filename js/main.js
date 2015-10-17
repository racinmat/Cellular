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
            var _cb = function () { cb(); webkitRequestAnimationFrame(_cb); };
            _cb();
        };
    }
    else if (window.mozRequestAnimationFrame) {
        onEachFrame = function (cb) {
            var _cb = function () { cb(); mozRequestAnimationFrame(_cb); };
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
//# sourceMappingURL=main.js.map