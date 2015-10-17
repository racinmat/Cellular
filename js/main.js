Game.initialize();

var mouse = new Mouse();
// Add some moving rectangles
var i = 5;
while (i--) {
    Game.addRect();
}

Game.run = (function() {
    var loops = 0, skipTicks = 1000 / Game.fps,
        nextGameTick = (new Date).getTime();

    return function() {
        loops = 0;

        while ((new Date).getTime() > nextGameTick) {
            Game.update(mouse);
            nextGameTick += skipTicks;
            loops++;
        }

        Game.draw(mouse);
    };
})();

window.setInterval(Game.run, 0);
