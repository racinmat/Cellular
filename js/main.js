var game = new Game();
game.run = (function () {
    var loops = 0, skipTicks = 1000 / game.fps, maxFrameSkip = 10, nextGameTick = (new Date).getTime();
    return function () {
        loops = 0;
        while ((new Date).getTime() > nextGameTick) {
            game.update();
            nextGameTick += skipTicks;
            loops++;
        }
        game.draw();
    };
})();
// Add some moving rectangles
var i = 400;
while (i--) {
    game.addRect();
}
//game.start();
setInterval(game.run, 0);
(function () {
    var onEachFrame;
    if (window.webkitRequestAnimationFrame) {
        onEachFrame = function (cb) {
            var _cb = function () {
                cb();
                webkitRequestAnimationFrame(_cb);
            };
            _cb();
        };
    }
    else if (window.mozRequestAnimationFrame) {
        onEachFrame = function (cb) {
            var _cb = function () {
                cb();
                mozRequestAnimationFrame(_cb);
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
window.onEachFrame(Game.run);
//# sourceMappingURL=main.js.map