/// <reference path="references.ts"/>
var game = new Game();
var run = (function () {
    return game.run();
})();
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
//# sourceMappingURL=main.js.map