var game = new Game();

var mouse = new Mouse();
// Add some moving rectangles
var i = 5;
while (i--) {
    game.addRect();
}

game.run = (function() {
    var loops = 0, skipTicks = 1000 / game.fps,
        nextGameTick = (new Date).getTime();

    return function() {
        loops = 0;

        while ((new Date).getTime() > nextGameTick) {
            game.update(mouse);
            nextGameTick += skipTicks;
            loops++;
        }

        game.draw(mouse);
    };
})();

window.setInterval(game.run, 0);
