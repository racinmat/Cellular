Game.initialize();

// Add some moving rectangles
var i = 400;
while (i--) Game.addRect();

Game.run = (function() {
    var loops = 0, skipTicks = 1000 / Game.fps,
        maxFrameSkip = 10,
        nextGameTick = (new Date).getTime();

    return function() {
        loops = 0;

        while ((new Date).getTime() > nextGameTick) {
            Game.update();
            nextGameTick += skipTicks;
            loops++;
        }

        Game.draw();
    };
})();

window.setInterval(Game.run, 0);