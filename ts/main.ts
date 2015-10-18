/// <reference path="references.ts"/>
var game = new Game();

var run = (() => {
    return game.run();
})();

// Add some moving rectangles
var i = 20;
while (i--) {
    game.addRect();
}

(function() {
    var onEachFrame;
    if (window.requestAnimationFrame) {
        onEachFrame = function(cb) {
            var _cb = function() { cb(); requestAnimationFrame(_cb); }
            _cb();
        };
    } else if (window.requestAnimationFrame) {
        onEachFrame = function(cb) {
            var _cb = function() { cb(); requestAnimationFrame(_cb); }
            _cb();
        };
    } else {
        onEachFrame = function(cb) {
            setInterval(cb, 1000 / game.fps);
        }
    }

    window.requestAnimationFrame = onEachFrame;
})();

window.requestAnimationFrame(run);