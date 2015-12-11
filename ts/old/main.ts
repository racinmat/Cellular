/// <reference path="references.ts"/>
var game = new Game();

var run = (() => {
    return game.run();
})();

interface Window {
    webkitRequestAnimationFrame(callback: any, element?: any): void;
    mozRequestAnimationFrame(callback: any, element?: any): void;
    onEachFrame(callback: any, element?: any): void;
}

(function() {
    var onEachFrame;
    if (window.webkitRequestAnimationFrame) {
        onEachFrame = function(cb) {
            var _cb = function() { cb(); window.webkitRequestAnimationFrame(_cb); }
            _cb();
        };
    } else if (window.mozRequestAnimationFrame) {
        onEachFrame = function(cb) {
            var _cb = function() { cb(); window.mozRequestAnimationFrame(_cb); }
            _cb();
        };
    } else {
        onEachFrame = function(cb) {
            setInterval(cb, 1000 / game.fps);
        }
    }

    window.onEachFrame = onEachFrame;
})();

window.onEachFrame(run);